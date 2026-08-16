/*
 * news-migration.js の検査です。
 * 実行: node --test scripts/news-migration.test.mjs
 *
 * ニュースページの配信元が変わると、端末内保存の領域も別になります
 * （保存領域はURLごとに分かれるため）。ログインしていない利用者の★と表示設定が
 * 消えたように見えるのを防ぐため、旧URLから新URLへ一度だけ引き継ぎます。
 *
 * 受け取る側は「他人が作った文字列かもしれない」前提で扱います。
 * URLに載る値なので、細工された内容がそのまま保存されないようにする必要があります。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// クラシックスクリプトをこの実行環境のまま読み込む。
// vm の別コンテキストで動かすと配列やオブジェクトの生まれが変わり、
// deepEqual が「構造は同じだが別物」と判定してしまうため。
function loadMigration() {
  const source = readFileSync(new URL("../news-migration.js", import.meta.url), "utf-8");
  const window = {};
  new Function("window", source)(window);
  return window.SHINAGAWA_NEWS_MIGRATION;
}

const migration = loadMigration();

test("引き継ぎ内容を作って読み戻せる", () => {
  const encoded = migration.encode({
    favorites: ["news-a", "news-b"],
    hiddenSources: ["例の配信元"],
    hiddenItems: ["news-c"]
  });
  assert.deepEqual(migration.decode(encoded), {
    favorites: ["news-a", "news-b"],
    hiddenSources: ["例の配信元"],
    hiddenItems: ["news-c"]
  });
});

test("保存するものが何も無ければ、引き継ぎ自体を作らない", () => {
  // 空の引き継ぎでURLを長くしても意味がない。
  assert.equal(migration.encode({ favorites: [], hiddenSources: [], hiddenItems: [] }), "");
  assert.equal(migration.encode({}), "");
});

test("ニュースIDの形式に合わないものは捨てる", () => {
  const encoded = migration.encode({
    favorites: ["news-ok", "<script>", "../../etc", "a".repeat(200)],
    hiddenSources: [],
    hiddenItems: []
  });
  assert.deepEqual(migration.decode(encoded).favorites, ["news-ok"]);
});

test("配信元名は文字数で制限し、重複を除く", () => {
  const encoded = migration.encode({
    favorites: [],
    hiddenSources: ["同じ", "同じ", "b".repeat(300)],
    hiddenItems: []
  });
  assert.deepEqual(migration.decode(encoded).hiddenSources, ["同じ"]);
});

test("壊れた文字列を渡してもnullを返すだけで例外にしない", () => {
  assert.equal(migration.decode("こわれた"), null);
  assert.equal(migration.decode(""), null);
  assert.equal(migration.decode(null), null);
  assert.equal(migration.decode("%%%"), null);
});

test("配列以外が入った引き継ぎは受け付けない", () => {
  const hostile = encodeURIComponent(JSON.stringify({ favorites: "not-an-array" }));
  const result = migration.decode(hostile);
  assert.deepEqual(result?.favorites ?? [], []);
});

test("JSONではあるが形が違うものはnullを返す", () => {
  assert.equal(migration.decode(encodeURIComponent(JSON.stringify(["a", "b"]))), null);
  assert.equal(migration.decode(encodeURIComponent(JSON.stringify("文字列"))), null);
  assert.equal(migration.decode(encodeURIComponent(JSON.stringify(42))), null);
});

test("件数の上限を超える分は切り捨てる", () => {
  // URLに載せる都合と、細工で極端に大きな値を保存させられるのを防ぐため。
  const many = Array.from({ length: 5000 }, (_, index) => `news-${index}`);
  const decoded = migration.decode(migration.encode({ favorites: many }));
  assert.equal(decoded.favorites.length, migration.LIMIT);
  assert.equal(decoded.favorites[0], "news-0");
});

test("読み取り側は毎回同じ結果になる（副作用を持たない）", () => {
  const encoded = migration.encode({ favorites: ["news-a"] });
  assert.deepEqual(migration.decode(encoded), migration.decode(encoded));
});
