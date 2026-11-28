import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";

// 横断検索に載せる「事業ごとの記録」の項目づくり。評価シート全件が、
// 事業ごとの記録の詳細と評価シートの該当頁へ案内できる形で並ぶことを確かめる。
const context = createContext({ window: {} });
for (const path of ["data/jimujigyo-r07.js", "kensaku-jimujigyo.js"]) {
  runInContext(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });
}
const { SHINAGAWA_JIMUJIGYO_R07: data, SHINAGAWA_JIMUJIGYO_SEARCH: vmSearch } = context.window;
// vm の中で作った配列は別の realm なので、比べる前に JSON で通常の値へ直す
const search = { items: input => JSON.parse(JSON.stringify(vmSearch.items(input))) };

test("評価シートの全事業を1件ずつ検索項目にする", () => {
  const items = search.items(data);
  assert.equal(items.length, data.count);
  assert.equal(new Set(items.map(item => item.id)).size, data.count);
  for (const item of items) {
    assert.equal(item.category, "gyosei");
    assert.equal(item.type, "事業ごとの記録");
    assert.equal(item.year, 2024, "令和6年度に実施した事業");
  }
});

test("事業名・部署・最終評価で引け、詳細と評価シートの頁へ案内する", () => {
  const item = search.items(data).find(entry => entry.id === "jimujigyo-r07-42-2");
  assert.equal(item.title, "児童相談所運営費");
  assert.ok(item.primary.includes("品川区児童相談所"));
  assert.ok(item.primary.includes("児童相談課"));
  assert.ok(item.tags.includes("最終評価A"));
  assert.match(item.meta, /執行率 86\.7%/);
  assert.match(item.body, /虐待相談対応件数/, "成果指標の名前でも引ける");
  assert.deepEqual(item.links.map(link => [link.type, link.url]), [
    ["internal", "jigyo.html?id=r07-42-2"],
    ["official", data.projects.find(project => project.id === "r07-42-2").source.url]
  ]);
});

test("執行率や評価を読めない事業でも項目を作る", () => {
  const [item] = search.items({ fiscalYear: "令和6年度", evaluationYear: "令和7年度",
    projects: [{ id: "r07-99-1", name: "仮の事業", department: "仮部", rate: null, evaluation: null,
      indicators: [], source: { label: "評価シート", url: "https://example.invalid/a.pdf#page=1" } }] });
  assert.equal(item.title, "仮の事業");
  assert.doesNotMatch(item.meta, /執行率|undefined|null/);
  assert.deepEqual(item.tags, ["仮部"]);
});
