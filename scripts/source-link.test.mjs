/*
 * 出典リンクの描画と、公式サイト旧URLの残存を検査します。
 * 実行: node --test scripts/source-link.test.mjs
 *
 * 品川区公式サイトは2026年10月20日のリニューアルで全ページのアドレスが変わり、
 * 旧形式 `https://www.city.shinagawa.tokyo.jp/PC/...` と `/ct/...` が404になりました。
 * 区は後日301リダイレクトを用意しましたが、消えたページには転送がありません。
 * 新サイトに該当ページが無い出典は、URLを落として文言だけを残す方針にしています。
 * そのため各ページは「URLの無い出典」を押せない見た目で描ける必要があります。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const OLD_URL_PREFIXES = [
  "https://www.city.shinagawa.tokyo.jp/PC/",
  "https://www.city.shinagawa.tokyo.jp/ct/",
];

/** 文字列に含まれる旧URLの件数を数える。 */
function countOldUrls(text) {
  return OLD_URL_PREFIXES.reduce((total, prefix) => total + text.split(prefix).length - 1, 0);
}

/** HTMLに埋め込まれた名前付き関数を、波かっこを数えて切り出す。 */
function extractFunction(htmlPath, name) {
  const source = readFileSync(new URL(`../${htmlPath}`, import.meta.url), "utf-8");
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${htmlPath} に function ${name} が見つかりません`);
  let depth = 0;
  let i = source.indexOf("{", start);
  const open = i;
  for (; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  assert.ok(i < source.length, `${htmlPath} の ${name} を切り出せませんでした`);
  return source.slice(start, i + 1) + `\nreturn ${name};`;
}

/**
 * esc() を与えて、切り出した描画関数を評価する。
 * 関数が外側の定数を参照している場合は preamble にその行を渡す。
 */
function loadRenderer(htmlPath, name, preamble = "") {
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const body = preamble + "\n" + extractFunction(htmlPath, name);
  return new Function("esc", body)(esc);
}

/** HTMLから `const <name> = ...;` の1行を切り出す。 */
function extractConst(htmlPath, name) {
  const source = readFileSync(new URL(`../${htmlPath}`, import.meta.url), "utf-8");
  const line = source.split("\n").find((l) => l.includes(`const ${name} =`));
  assert.ok(line, `${htmlPath} に const ${name} が見つかりません`);
  return line.trim();
}

test("senkyo.html: URLの無い出典は破線のpillになり、リンクにならない", () => {
  const render = loadRenderer("senkyo.html", "sourceLinksHtml");
  const html = render([{ label: "提供された集計表" }]);
  assert.match(html, /pill-plain/);
  assert.doesNotMatch(html, /<a\b/);
});

test("yosan-kessan.html: URLの無い出典をhref無しで描く", () => {
  const pill = loadRenderer("yosan-kessan.html", "pill");
  const html = pill("平成27年度当初予算", undefined, "pill--fiscal");
  assert.doesNotMatch(html, /href="(undefined|null|)"/);
  assert.match(html, /pill-plain/);
});

test("gyosei.html: URLの無い出典をhref無しで描く", () => {
  const linkPill = loadRenderer("gyosei.html", "linkPill", extractConst("gyosei.html", "KIND_LABEL"));
  const html = linkPill({ label: "平成24年度行政評価", kind: "page" });
  assert.doesNotMatch(html, /href="(undefined|null|)"/);
  assert.match(html, /pill-plain/);
});

/**
 * 旧URLの残存検査。自動生成ファイル（data/news-items.js、exports/*.kml）も含めます。
 * ニュースは記事IDがURLから作られるため作り直しが効かず、
 * scripts/repair_news_urls.py で張り替えました。KMLは書き出し直しが要ります。
 */
function assertNoOldUrls(dirPath, matches) {
  const dir = new URL(dirPath, import.meta.url);
  const offenders = [];
  for (const name of readdirSync(dir)) {
    if (!matches(name)) continue;
    const hits = countOldUrls(readFileSync(new URL(name, dir), "utf-8"));
    if (hits > 0) offenders.push(`${name}: ${hits}件`);
  }
  assert.deepEqual(offenders, [], `旧URLが残っています → ${offenders.join(", ")}`);
}

test("data/*.js に公式サイトの旧URLが残っていない", () => {
  assertNoOldUrls("../data/", (name) => name.endsWith(".js"));
});

test("ルートの*.htmlに公式サイトの旧URLが残っていない", () => {
  assertNoOldUrls("../", (name) => name.endsWith(".html"));
});

test("書き出し済みのexportsに公式サイトの旧URLが残っていない", () => {
  assertNoOldUrls("../exports/", (name) => name.endsWith(".kml"));
});

test("収集スクリプトが公式サイトの旧URLを叩いていない", () => {
  // repair_news_urls.py は旧URLを見分けるのが仕事なので、定義として持っています。
  const exempt = new Set(["repair_news_urls.py"]);
  assertNoOldUrls(
    "../scripts/",
    (name) => name.endsWith(".py") && !name.startsWith("test_") && !exempt.has(name),
  );
});
