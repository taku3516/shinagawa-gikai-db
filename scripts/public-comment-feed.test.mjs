// 区の意見募集を、締切のカレンダー（.ics・Googleカレンダー）と新着（フォロー・RSS）に載せる変換を確かめる。
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import test from "node:test";

const context = createContext({ window: {}, URLSearchParams, TextEncoder });
for (const path of ["events-ics.js", "public-comment-feed.js"]) {
  runInContext(readFileSync(new URL(`../${path}`, import.meta.url), "utf8"), context, { filename: path });
}
const { SHINAGAWA_EVENTS_ICS: ics, SHINAGAWA_PUBLIC_COMMENT_FEED: vmFeed } = context.window;
// vm の中で作った値は別の realm なので、比べる前に JSON で通常の値へ直す
const plain = value => JSON.parse(JSON.stringify(value));
const feed = { deadlineEvents: (...args) => plain(vmFeed.deadlineEvents(...args)), feedItems: (...args) => plain(vmFeed.feedItems(...args)) };
const BASE = "https://taku3516.github.io/shinagawa-gikai-db/";

const open = { id: "2026-005", fiscalYear: 2026, title: "品川区福祉オンブズマン制度(素案)", status: "open", url: "https://www.city.shinagawa.tokyo.jp/a.html",
  start: "2026-11-15", end: "2026-12-15", department: "福祉計画課 施設担当", updatedAt: "2026-11-15", resultPlanned: "令和9年3月中旬頃" };
const result = { id: "2024-012", fiscalYear: 2024, title: "品川区こども計画", status: "result", url: "https://www.city.shinagawa.tokyo.jp/b.html",
  start: "2025-02-01", end: "2025-02-21", department: "子ども育成課", updatedAt: "2026-10-01", applicants: 31, opinions: 95 };
const old = { ...result, id: "2019-007", fiscalYear: 2019, title: "古い計画", start: "2019-12-01", end: "2019-12-27", updatedAt: "2020-04-01" };

test("締切を終日の予定にし、締切が1年以上前の案件は入れない", () => {
  const events = feed.deadlineEvents([open, result, old], "2026-11-28", BASE);
  assert.deepEqual(events.map(event => event.id), ["public-comment-2026-005"]);
  const [event] = events;
  assert.deepEqual(event.dates, ["2026-12-15"]);
  assert.equal(event.title, "【意見募集の締切】品川区福祉オンブズマン制度(素案)");
  assert.equal(event.url, open.url, "意見の提出方法が載っている区の募集ページへ");
  assert.match(event.summary, /2026年11月15日から2026年12月15日まで/);
  assert.match(event.summary, /kumin-no-koe\.html\?nendo=2026#pc-2026-005/);
  // 1年以内に締切を迎えた案件は残す（購読中のカレンダーから急に消えないように）
  assert.equal(feed.deadlineEvents([result], "2026-01-31", BASE).length, 1);
});

test("締切の .ics は既存のカレンダー出力と同じ決まりで作り、UIDは案件ごとに変わらない", () => {
  const text = ics.buildCalendar(vmFeed.deadlineEvents([open], "2026-11-28", BASE), "品川区の意見募集（締切）", "説明", BASE, new Date("2026-11-28T00:00:00Z"));
  assert.match(text, /UID:public-comment-2026-005-20261215@shinagawa-gikai-db/);
  assert.match(text, /DTSTART;VALUE=DATE:20261215\r\nDTEND;VALUE=DATE:20261216/);
  assert.match(text, /CATEGORIES:意見募集/);
  // Googleカレンダーの登録リンクも同じ予定から作れる
  const url = new URL(ics.googleCalendarUrl(vmFeed.deadlineEvents([open], "2026-11-28", BASE)[0], null, BASE));
  assert.equal(url.searchParams.get("dates"), "20261215/20261216");
});

test("新着には募集開始は掲載日、結果公表は当サイトが見つけた日で載せる", () => {
  const seen = { ...result, resultSeenAt: "2026-12-20" };
  const items = feed.feedItems([open, seen]);
  assert.deepEqual(items.map(item => [item.id, item.date, item.note]), [
    ["pc:2026-005", "2026-11-15", "意見募集の開始日"],
    ["pc-result:2024-012", "2026-12-20", "結果の公表を確認した日"]
  ]);
  assert.equal(items[0].title, "意見募集：品川区福祉オンブズマン制度(素案)（12月15日まで）");
  assert.equal(items[1].title, "意見募集の結果：品川区こども計画");
  assert.equal(items[0].url, "kumin-no-koe.html?nendo=2026#pc-2026-005");
  assert.equal(items[0].type, "意見募集");
});

test("募集開始と結果公表は別の新着として扱う（募集を既読にしても結果は未読で届く）", () => {
  const opened = feed.feedItems([open])[0];
  const published = feed.feedItems([{ ...open, status: "result", resultSeenAt: "2027-03-20" }])[0];
  assert.notEqual(opened.id, published.id);
  assert.equal(opened.id, "pc:2026-005", "募集開始のIDは変えない（既読の記録を引き継ぐ）");
});

test("公表日の分からない結果は新着に載せない（区のページの更新日はサイト改修でそろって書き換わる）", () => {
  // result には resultSeenAt が無い（初めて取得したときにはもう公表済みだった）
  assert.deepEqual(feed.feedItems([result, { ...result, id: "x", resultSeenAt: null }]), []);
});
