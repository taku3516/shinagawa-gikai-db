/*
 * 出典リンクの描画と、公式サイト旧URLの残存を検査します。
 * 実行: node --test scripts/source-link.test.mjs
 *
 * 品川区公式サイトは2026年10月20日のリニューアルで全ページのアドレスが変わり、
 * 旧形式 `https://www.city.shinagawa.tokyo.jp/PC/...` は301せず404になりました。
 * 新サイトに該当ページが無い出典は、URLを落として文言だけを残す方針にしています。
 * そのため各ページは「URLの無い出典」を押せない見た目で描ける必要があります。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const OLD_URL_PREFIX = "https://www.city.shinagawa.tokyo.jp/PC/";

/**
 * 自動生成ファイルは収集側（data/news-sources.json）を直す方針なので、
 * 旧URLの残存検査から外します。次回の自動更新で入れ替わります。
 */
const GENERATED_FILES = new Set(["news-items.js"]);

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

test("data/*.js に公式サイトの旧URL(/PC/)が残っていない", () => {
  const dir = new URL("../data/", import.meta.url);
  const offenders = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".js") || GENERATED_FILES.has(name)) continue;
    const text = readFileSync(new URL(name, dir), "utf-8");
    const hits = text.split(OLD_URL_PREFIX).length - 1;
    if (hits > 0) offenders.push(`${name}: ${hits}件`);
  }
  assert.deepEqual(offenders, [], `旧URLが残っています → ${offenders.join(", ")}`);
});

test("ルートの*.htmlに公式サイトの旧URL(/PC/)が残っていない", () => {
  const dir = new URL("../", import.meta.url);
  const offenders = [];
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".html")) continue;
    const text = readFileSync(new URL(name, dir), "utf-8");
    const hits = text.split(OLD_URL_PREFIX).length - 1;
    if (hits > 0) offenders.push(`${name}: ${hits}件`);
  }
  assert.deepEqual(offenders, [], `旧URLが残っています → ${offenders.join(", ")}`);
});
