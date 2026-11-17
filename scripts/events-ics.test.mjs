/*
 * events-ics.js の検査です。
 * 実行: node --test scripts/events-ics.test.mjs
 *
 * 同じ .ics を2か所で作っています。
 *   購読用            scripts/events_ics.py   （CIが exports/ に書き出す）
 *   絞り込み分の保存  events-ics.js           （ブラウザで組み立てる）
 * 出力が食い違うと、購読したカレンダーと手元に落とした .ics で
 * 同じ催しが別の予定として二重に入ります。UIDまで含めて突き合わせます。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

function loadIcs() {
  const source = readFileSync(new URL("../events-ics.js", import.meta.url), "utf-8");
  const window = {};
  new Function("window", source)(window);
  return window.SHINAGAWA_EVENTS_ICS;
}

const ics = loadIcs();
const BASE = "https://taku3516.github.io/shinagawa-gikai-db/";
const NOW = new Date(Date.UTC(2026, 10, 17, 4, 0, 0));

function sample(overrides = {}) {
  return {
    id: "abc123", title: "品川らくご会", summary: "落語の会",
    url: "https://example.com/e/1", source: "品川区", sourceId: "city-calendar",
    category: "文化", dates: ["2026-11-28"], startTime: "", endTime: "",
    timeText: "", place: "品川歴史館", application: "", deadline: "",
    periods: [], confidence: "official", ...overrides
  };
}

test("記号と改行を逃がす", () => {
  assert.equal(ics.escapeText("a,b;c"), "a\\,b\\;c");
  assert.equal(ics.escapeText("上\n下"), "上\\n下");
  assert.equal(ics.escapeText("a\\b,c"), "a\\\\b\\,c");
});

test("日本語の行をバイト数で折り返す", () => {
  const line = "SUMMARY:" + "品".repeat(60);
  const folded = ics.fold(line);
  assert.ok(folded.includes("\r\n "));
  for (const part of folded.split("\r\n")) {
    assert.ok(Buffer.byteLength(part, "utf8") <= 75, `75オクテット超過: ${part}`);
  }
  assert.equal(folded.replaceAll("\r\n ", ""), line);
});

test("期間ものは1件にまとまる", () => {
  const event = sample({
    dates: ["2026-11-20", "2026-11-21", "2026-11-22"],
    periods: [{ from: "2026-11-20", to: "2026-11-22" }]
  });
  assert.deepEqual(ics.occurrences(event), [["2026-11-20", "2026-11-22"]]);
});

test("期間の外の開催日は別に出す", () => {
  const event = sample({
    dates: ["2026-11-20", "2026-12-25"],
    periods: [{ from: "2026-11-20", to: "2026-11-21" }]
  });
  assert.deepEqual(ics.occurrences(event), [["2026-11-20", "2026-11-21"], ["2026-12-25", "2026-12-25"]]);
});

test("終日の予定はDTENDが翌日", () => {
  const lines = ics.vevent(sample(), ["2026-11-28", "2026-11-28"], NOW, BASE);
  assert.ok(lines.includes("DTSTART;VALUE=DATE:20261128"));
  assert.ok(lines.includes("DTEND;VALUE=DATE:20261129"));
});

test("月末をまたぐ翌日を正しく出す", () => {
  assert.equal(ics.nextDay("2026-11-30"), "2026-12-01");
  assert.equal(ics.nextDay("2026-12-31"), "2027-01-01");
  // うるう年
  assert.equal(ics.nextDay("2028-02-28"), "2028-02-29");
});

test("終了時刻が無ければ1時間の予定にする", () => {
  const lines = ics.vevent(sample({ startTime: "14:00" }), ["2026-11-28", "2026-11-28"], NOW, BASE);
  assert.ok(lines.includes("DTEND;TZID=Asia/Tokyo:20261128T150000"));
});

test("日をまたぐ1時間の繰り上げ", () => {
  const lines = ics.vevent(sample({ startTime: "23:30" }), ["2026-11-30", "2026-11-30"], NOW, BASE);
  assert.ok(lines.includes("DTEND;TZID=Asia/Tokyo:20261201T003000"));
});

test("推定の開催日は未確定として出す", () => {
  const lines = ics.vevent(sample({ confidence: "estimated" }), ["2026-11-28", "2026-11-28"], NOW, BASE);
  assert.ok(lines.includes("STATUS:TENTATIVE"));
  assert.ok(lines.some(line => line.includes("推定")));
});

test("Googleカレンダーのリンク（時刻つき）", () => {
  const url = new URL(ics.googleCalendarUrl(sample({ startTime: "10:00", endTime: "12:30" }), ["2026-11-28", "2026-11-28"], BASE));
  assert.equal(url.origin + url.pathname, "https://calendar.google.com/calendar/render");
  assert.equal(url.searchParams.get("action"), "TEMPLATE");
  assert.equal(url.searchParams.get("dates"), "20261128T100000/20261128T123000");
  assert.equal(url.searchParams.get("ctz"), "Asia/Tokyo");
  assert.equal(url.searchParams.get("text"), "品川らくご会");
  assert.equal(url.searchParams.get("location"), "品川歴史館");
});

test("Googleカレンダーのリンク（終日は翌日まで）", () => {
  const url = new URL(ics.googleCalendarUrl(sample(), ["2026-11-28", "2026-11-28"], BASE));
  // 終わりの日は含まれないので翌日を渡す
  assert.equal(url.searchParams.get("dates"), "20261128/20261129");
  assert.equal(url.searchParams.get("ctz"), null);
});

test("カレンダー全体の骨格", () => {
  const text = ics.buildCalendar([sample()], "品川区のイベント", "説明", BASE, NOW);
  assert.ok(text.startsWith("BEGIN:VCALENDAR\r\n"));
  assert.ok(text.endsWith("END:VCALENDAR\r\n"));
  assert.equal((text.match(/BEGIN:VEVENT/g) || []).length, 1);
  assert.ok(!text.replaceAll("\r\n", "").includes("\n"));
});

test("Python側と1バイトも違わない", () => {
  const events = [
    sample(),
    sample({ id: "t1", title: "健診, 第1回", startTime: "10:00", endTime: "12:30", dates: ["2026-11-03", "2026-12-05"], application: "必要", deadline: "2026-11-15" }),
    sample({ id: "t2", title: "障害者作品展", dates: ["2026-11-20", "2026-11-21", "2026-11-22"], periods: [{ from: "2026-11-20", to: "2026-11-22" }] }),
    sample({ id: "t3", title: "推定の催し; 詳細は本文", confidence: "estimated", summary: "改行\nを含む説明", startTime: "23:30" }),
    sample({ id: "t4", title: "と".repeat(60), place: "長い会場名" + "あ".repeat(40) })
  ];
  const fromJs = ics.buildCalendar(events, "品川区のイベント", "説明", BASE, NOW);

  const script = `
import json, sys, datetime
sys.path.insert(0, ${JSON.stringify(new URL("./", import.meta.url).pathname)})
import events_ics
events = json.loads(sys.stdin.read())
now = datetime.datetime(2026, 11, 17, 4, 0, 0, tzinfo=datetime.timezone.utc)
sys.stdout.write(events_ics.build_calendar(events, "品川区のイベント", "説明", ${JSON.stringify(BASE)}, now))
`;
  const fromPython = execFileSync("python3", ["-c", script], {
    input: JSON.stringify(events),
    encoding: "utf-8"
  });
  assert.equal(fromJs, fromPython);
});
