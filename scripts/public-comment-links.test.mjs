// 区の意見募集の照合結果（生成データ）を、実データの具体例で確かめる。
//
// 照合の関数は public-comment-council.test.mjs と public-comment-jigyo.test.mjs で単体に確かめている。
// ここでは、レビューで見つかった誤りが生成データに戻ってこないこと、
// つながり先のIDが実在すること、件数が急に減らないことを、書き出した data/*.js に対して確かめる。
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";

const context = createContext({ window: {} });
for (const path of ["data/public-comments.js", "data/public-comment-council.js", "data/public-comment-jigyo.js",
  "data/jimujigyo-r07.js", "data/jimujigyo-r06.js", "data/jimujigyo-r05.js"]) {
  runInContext(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });
}
// vm の中で作った値は別の realm なので、比べる前に JSON で通常の値へ直す
const plain = value => JSON.parse(JSON.stringify(value));
const comments = plain(context.window.SHINAGAWA_PUBLIC_COMMENTS.items);
const council = plain(context.window.SHINAGAWA_PUBLIC_COMMENT_COUNCIL.items);
const jigyo = plain(context.window.SHINAGAWA_PUBLIC_COMMENT_JIGYO.items);
const sheetIds = new Set(["R07", "R06", "R05"].flatMap(key => context.window["SHINAGAWA_JIMUJIGYO_" + key].projects.map(project => project.id)));

test("地域防災計画（令和5年度修正）に前年版の議題をつながない（#139 のレビュー指摘）", () => {
  const titles = council["2023-003"].map(entry => entry.title);
  assert.ok(titles.some(title => title.includes("地域防災計画の素案")), "令和5年度版の素案の報告はつながる");
  assert.ok(!titles.some(title => /令和[4４]年度/.test(title)), "令和4年度版の修正の報告はつながらない");
});

test("年度で記載欄が違う事業は、その年度の評価シートの欄を持つ（#141 のレビュー指摘）", () => {
  const project = jigyo["2023-001"].find(entry => entry.name === "社会を明るくする運動経費");
  const field = id => project.sheets.find(sheet => sheet.id === id)?.field;
  assert.equal(field("r05-3-22"), "概要", "令和5年度評価は概要に記載");
  assert.equal(field("r07-39-22"), "目的", "令和7年度評価は目的に記載");
});

test("つながり先は、収録している案件と事業ごとの記録に実在する", () => {
  const commentIds = new Set(comments.map(item => item.id));
  for (const id of [...Object.keys(council), ...Object.keys(jigyo)]) assert.ok(commentIds.has(id), `案件 ${id}`);
  for (const [id, projects] of Object.entries(jigyo)) {
    for (const project of projects) {
      assert.equal(project.id, project.sheets[0].id, `${id} ${project.name}: リンクは最新年度の頁`);
      for (const sheet of project.sheets) assert.ok(sheetIds.has(sheet.id), `${id} ${project.name}: ${sheet.id}`);
    }
  }
  for (const reports of Object.values(council)) {
    for (const report of reports) assert.match(report.url, /^(kaigiroku\.html#committee-|kaigi\.html\?year=)/);
  }
});

test("つながる案件の数が、照合を作ったときから大きく減っていない", () => {
  // 委員会34件・事業21件（2026年11月）。データの更新で増えるのはよいが、
  // 照合の書き換えや元データの形の変化で急に減ったら気づけるようにする
  assert.ok(Object.keys(council).length >= 30, `委員会とつながる案件 ${Object.keys(council).length}件`);
  assert.ok(Object.keys(jigyo).length >= 18, `事業とつながる案件 ${Object.keys(jigyo).length}件`);
});
