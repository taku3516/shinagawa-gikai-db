// 横断検索（kensaku.html）に載せる「区の意見募集」の項目づくりを確かめる。
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";

const context = createContext({ window: {} });
for (const path of ["data/public-comments.js", "data/public-comment-council.js", "kensaku-public-comments.js"]) {
  runInContext(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });
}
const { SHINAGAWA_PUBLIC_COMMENTS: comments, SHINAGAWA_PUBLIC_COMMENT_COUNCIL: council, SHINAGAWA_PUBLIC_COMMENT_SEARCH: vmSearch } = context.window;
// vm の中で作った配列は別の realm なので、比べる前に JSON で通常の値へ直す
const search = { items: (...args) => JSON.parse(JSON.stringify(vmSearch.items(...args))), fiscalLabel: vmSearch.fiscalLabel };

test("年度の表示は「令和○年度」（暦年の「令和○年（20xx年）」ではない）", () => {
  assert.equal(search.fiscalLabel(2024), "令和6年度");
  assert.equal(search.fiscalLabel(2019), "令和元年度");
  const items = search.items(comments, council);
  const kodomo = items.find(item => item.id === "public-comment-2024-012");
  // 年の絞り込みは数値の year で行い、表示だけ yearLabel を使う
  assert.equal(kodomo.year, 2024);
  assert.equal(kodomo.yearLabel, "令和6年度");
  assert.equal(items.find(item => item.id === "public-comment-2019-007").yearLabel, "令和元年度");
});

test("全案件を1件ずつ載せ、委員会での報告の議題名でも見つかるようにする", () => {
  const items = search.items(comments, council);
  assert.equal(items.length, comments.items.length);
  const kodomo = items.find(item => item.id === "public-comment-2024-012");
  assert.equal(kodomo.category, "public-comments");
  assert.equal(kodomo.type, "意見募集の結果");
  assert.ok(kodomo.primary.includes("品川区こども計画の策定"));
  assert.deepEqual(kodomo.links.map(link => link.url).slice(0, 1), ["kumin-no-koe.html?nendo=2024#pc-2024-012"]);
  assert.match(kodomo.links.at(-1).url, /^kaigiroku\.html#committee-r07-20250415-/, "最後に報告した委員会へ");
});

test("委員会との照合データが無くても、案件そのものは載せる", () => {
  const items = search.items(comments, null);
  assert.equal(items.length, comments.items.length);
  assert.ok(items.every(item => !/委員会での報告/.test(item.body)));
});
