import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";

const context = createContext({ window: {}, URLSearchParams });
function load(path) {
  runInContext(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });
}
load("data/site.js");
load("civic-data.js");
const { SHINAGAWA_DB: db, SHINAGAWA_CIVIC: civic } = context.window;

test("年別データと詳細リンクで議案の識別子が一致する", () => {
  const ids = new Set();
  for (const year of db.site.years.filter(year => year.available)) {
    load(year.file);
    const complete = year.file.replace(".js", "-complete.js");
    if (existsSync(new URL(`../${complete}`, import.meta.url))) load(complete);
  }
  for (const bill of civic.bills()) {
    assert.ok(!ids.has(bill.id), bill.id);
    ids.add(bill.id);
    assert.ok(bill.meeting);
    assert.equal(new URL(civic.billUrl(bill), "https://example.invalid").searchParams.get("id"), bill.id);
  }
  assert.ok(ids.size > 100);
});

test("会期の開始・終了の日付を含み、日本の暦日で数える", () => {
  const session = { start: "2026-12-03", end: "2026-12-17" };
  assert.equal(civic.today(new Date("2026-12-02T15:05:00Z")), "2026-12-03");
  assert.equal(civic.sessionProgress(session, "2026-12-02").daysUntil, 1);
  assert.equal(civic.sessionProgress(session, "2026-12-03").day, 1);
  assert.equal(civic.sessionProgress(session, "2026-12-17").percent, 100);
  assert.equal(civic.sessionProgress(session, "2026-12-18").state, "ended");
});

test("CSVの構文と数式対策を適用し、ゼロと未収録を区別する", () => {
  assert.equal(civic.csv([{ text: ' a,"b"\nc', count: 0 }, { text: "  =cmd", count: null }, { text: "＠SUM(1)", count: -1 }]),
    '\ufeff"text","count"\r\n" a,""b""\nc","0"\r\n"\'  =cmd",""\r\n"\'＠SUM(1)","-1"\r\n');
});

test("出典付き財政データの歳入・歳出は同じ年度の当初予算額に一致する", () => {
  load("data/civic-sources.js");
  const { budgets } = context.window.SHINAGAWA_CIVIC_SOURCES;
  for (const rows of [budgets.income, budgets.spending]) {
    assert.equal(rows.reduce((sum, entry) => sum + entry[1], 0), 236914000000);
    assert.equal(rows.reduce((sum, entry) => sum + entry[2], 0), 234763000000);
  }
  assert.equal(budgets.income.find(row => row[0] === "特別区債")[1], 0);
});

test("政務活動費の費目別支出は公式資料の支出額に一致する", () => {
  const { seimuSummary } = context.window.SHINAGAWA_CIVIC_SOURCES;
  for (const [id, , expenditure, categories] of seimuSummary.rows) {
    assert.equal(categories.reduce((sum, value) => sum + value, 0), expenditure, id);
  }
});

test("公式資料と結び付けた議案・事業IDが台帳に存在する", () => {
  const sources = context.window.SHINAGAWA_CIVIC_SOURCES;
  const ids = new Set(civic.bills().map(item => item.id));
  for (const id of [...Object.keys(sources.votes), ...Object.keys(sources.billDetails), ...sources.projects.flatMap(project => project.bills)]) {
    assert.ok(ids.has(id), id);
  }
  load("data/petitions.js");
  load("data/members.js");
  load("civic-content.js");
  assert.equal(context.window.SHINAGAWA_PETITIONS.summary.itemCount, context.window.SHINAGAWA_PETITIONS.items.length);
  assert.equal(new Set(db.membersData.members.map(item => item.id)).size, db.membersData.members.length);
  for (const [, href] of context.window.SHINAGAWA_CIVIC_CONTENT.pages) {
    assert.ok(existsSync(new URL(`../${href.split("#")[0]}`, import.meta.url)), href);
  }
});

test("表決の39列が既存議員IDに対応し、議長の扱いと賛否の分類が一致する", () => {
  load("data/people.js");
  const { votes, voteRoster } = context.window.SHINAGAWA_CIVIC_SOURCES;
  assert.equal(voteRoster.length, 39);
  const members = new Set(db.peopleData.people.map(item => item.id));
  assert.equal(new Set(voteRoster.map(item => item.memberId)).size, voteRoster.length);
  for (const person of voteRoster) assert.ok(members.has(person.memberId), person.memberId);
  for (const vote of Object.values(votes)) {
    assert.equal(vote.symbols.length, voteRoster.length);
    assert.equal(vote.symbols[8], "長");
    assert.ok(/^[〇×欠除－棄長]+$/.test(vote.symbols));
    assert.equal(vote.type, vote.symbols.includes("×") ? "split" : "unanimous");
  }
});

test("請願の事後対応は既存台帳の案件だけを参照する", () => {
  const ids = new Set(context.window.SHINAGAWA_PETITIONS.items.map(item => item.id));
  const { petitionFollowup, sessions } = context.window.SHINAGAWA_CIVIC_SOURCES;
  for (const id of Object.keys(petitionFollowup)) assert.ok(ids.has(id), id);
  for (const item of sessions) assert.ok(item.start <= item.end);
});

test("事業評価シートの予算現額・決算額から公式の執行率を再計算できる", () => {
  const { projects } = context.window.SHINAGAWA_CIVIC_SOURCES;
  for (const project of projects) {
    for (const item of project.finance) {
      assert.equal(Number((item.settledYen / item.budgetYen * 100).toFixed(1)), item.rate, item.label);
      assert.ok(item.source.url.includes("#page="));
    }
  }
});
