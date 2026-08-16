/*
 * site-url.js の検査です。
 * 実行: node --test scripts/site-url.test.mjs
 *
 * ニュースページだけを別ドメイン（Firebase Hosting）から配信するため、
 * サイト内リンクは配信元によって書き分ける必要があります。
 * 同じドメインから配信されているページでは、これまでどおりの相対リンクを保ちます。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/**
 * 実物の site-url.js をクラシックスクリプトとして読み込む。
 * 読み込み時点では基準URLが未設定なので、DOM書き換えの登録は行われない
 * （その経路はブラウザで確認する）。
 */
function loadSiteUrl(base) {
  const source = readFileSync(new URL("../site-url.js", import.meta.url), "utf-8");
  const window = {};
  new Function("window", source)(window);
  window.SHINAGAWA_SITE_BASE = base;
  return window.SHINAGAWA_URL;
}

const MAIN = "https://taku3516.github.io/shinagawa-gikai-db/";

test("基準URLが未設定なら、これまでどおり相対リンクのまま", () => {
  const url = loadSiteUrl(undefined);
  assert.equal(url.resolve("kaigi.html"), "kaigi.html");
  assert.equal(url.resolve("index.html"), "index.html");
});

test("基準URLがあれば、サイト内リンクを絶対URLにする", () => {
  const url = loadSiteUrl(MAIN);
  assert.equal(url.resolve("kaigi.html"), `${MAIN}kaigi.html`);
  assert.equal(url.resolve("kaigiroku.html"), `${MAIN}kaigiroku.html`);
});

test("外部サイトへのリンクは書き換えない", () => {
  const url = loadSiteUrl(MAIN);
  const external = "https://gikai.city.shinagawa.tokyo.jp/search";
  assert.equal(url.resolve(external), external);
  assert.equal(url.resolve("http://example.jp/a"), "http://example.jp/a");
  assert.equal(url.resolve("//example.jp/a"), "//example.jp/a");
});

test("すでに絶対URLになっているサイト内リンクも二重化しない", () => {
  const url = loadSiteUrl(MAIN);
  assert.equal(url.resolve(`${MAIN}giin.html`), `${MAIN}giin.html`);
});

test("ページ内の見出しリンク（#）はトップページ側へ向ける", () => {
  const url = loadSiteUrl(MAIN);
  // ニュースページから「#news」を押してもトップの該当箇所へ行けるようにする。
  assert.equal(url.resolve("#news"), `${MAIN}index.html#news`);
});

test("基準URLの末尾スラッシュの有無に左右されない", () => {
  const withoutSlash = loadSiteUrl("https://taku3516.github.io/shinagawa-gikai-db");
  assert.equal(withoutSlash.resolve("kaigi.html"), `${MAIN}kaigi.html`);
});

test("空文字やnullを渡しても壊れない", () => {
  const url = loadSiteUrl(MAIN);
  assert.equal(url.resolve(""), "");
  assert.equal(url.resolve(null), "");
  assert.equal(url.resolve(undefined), "");
});

test("mailto: や tel: のような別方式のリンクは書き換えない", () => {
  const url = loadSiteUrl(MAIN);
  assert.equal(url.resolve("mailto:a@example.jp"), "mailto:a@example.jp");
  assert.equal(url.resolve("data:text/plain,a"), "data:text/plain,a");
});
