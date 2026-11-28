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

test("政務活動費の費目別支出は公式資料の支出額に一致し、政務活動費ページの交付先に結び付く", () => {
  load("data/seimu.js");
  load("data/seimu-summary.js");
  const summary = context.window.SHINAGAWA_SEIMU_SUMMARY;
  const periods = context.window.SHINAGAWA_SEIMU.fiscalYears.flatMap(year => year.periods);
  // 公開している年度・期間すべてに集計がある（令和3〜7年度、令和5年度は4月と5月〜翌3月の2本）
  assert.deepEqual(Object.keys(summary.periods).sort(), Array.from(periods, period => period.id).sort());
  for (const period of periods) {
    const entry = summary.periods[period.id];
    // 出典は政務活動費ページが案内している収支一覧PDFそのもの
    assert.equal(entry.source.url, period.summaryDocument.url, period.id);
    // 会派だけでなく無所属議員も含め、その期間の交付先すべてに集計がある
    assert.deepEqual(Array.from(entry.rows, row => row[0]).sort(), Array.from(period.recipients, recipient => recipient.id).sort(), period.id);
    for (const [id, , expenditure, categories] of entry.rows) {
      assert.equal(categories.length, summary.categories.length, id);
      assert.equal(categories.reduce((sum, value) => sum + value, 0), expenditure, id);
    }
    // 収支一覧の「合計」行と、収入・支出・費目ごとの縦の合計が一致する
    const column = index => entry.rows.reduce((sum, row) => sum + row[index], 0);
    assert.equal(column(1), entry.total.income, period.id);
    assert.equal(column(2), entry.total.expenditure, period.id);
    summary.categories.forEach((label, index) => {
      assert.equal(entry.rows.reduce((sum, row) => sum + row[3][index], 0), entry.total.categories[index], `${period.id} ${label}`);
    });
  }
  assert.equal(context.window.SHINAGAWA_CIVIC_SOURCES.seimuSummary, undefined);
  assert.match(readFileSync(new URL("../seimu.html", import.meta.url), "utf8"), /<script src="data\/seimu-summary\.js"><\/script>/);
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

test("表決の列は会期ごとの並び順で既存議員IDに対応し、議長の扱いと賛否の分類が一致する", () => {
  load("data/people.js");
  const { votes, voteSessions } = context.window.SHINAGAWA_CIVIC_SOURCES;
  const members = new Set(db.peopleData.people.map(item => item.id));
  // 会期ごとに列数・議長の列が違う。公式PDFの列順をそのまま持つ
  const expected = {
    "r07-1t": [39, "yuichi_watanabe"], "r07-4t": [37, "yuichi_watanabe"], "r08-1t": [37, "yuichi_watanabe"],
    "r08-2t": [37, "yuichi_watanabe"], "r08-3t": [37, "yuichi_watanabe"]
  };
  for (const [sessionId, [columns, chair]] of Object.entries(expected)) {
    const session = voteSessions[sessionId];
    assert.ok(session, sessionId);
    assert.equal(session.roster.length, columns, sessionId);
    assert.equal(new Set(session.roster.map(item => item.memberId)).size, columns, sessionId);
    for (const person of session.roster) assert.ok(members.has(person.memberId), person.memberId);
    assert.equal(session.roster[session.chairColumn].memberId, chair, sessionId);
    assert.match(session.source.url, /^https:\/\/gikai\.city\.shinagawa\.tokyo\.jp\//);
  }
  for (const [billId, vote] of Object.entries(votes)) {
    const session = voteSessions[vote.session];
    assert.ok(session, billId);
    assert.ok(billId.startsWith(vote.session + ":"), billId);
    assert.equal(vote.symbols.length, session.roster.length, billId);
    assert.equal(vote.symbols.indexOf("長"), session.chairColumn, billId);
    assert.equal(vote.symbols.lastIndexOf("長"), session.chairColumn, billId);
    assert.ok(/^[〇×欠除－棄長]+$/.test(vote.symbols), billId);
    assert.equal(vote.type, vote.symbols.includes("×") ? "split" : "unanimous", billId);
  }
});

test("令和8年第3回定例会の表決24件を公式PDFの記号どおりに収録する", () => {
  const { votes } = context.window.SHINAGAWA_CIVIC_SOURCES;
  const session = Object.keys(votes).filter(id => id.startsWith("r08-3t:"));
  assert.equal(session.length, 24);
  // 第106号議案（区道の認定）だけ賛否が割れた。共産4人と無所属3人が反対
  const split = session.filter(id => votes[id].type === "split");
  assert.deepEqual(split, ["r08-3t:第106号議案"]);
  assert.equal(votes["r08-3t:第106号議案"].symbols, "〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇××××〇〇〇〇〇×〇×〇×");
  assert.ok(votes["r08-3t:議員提出第3号議案"]);
});

test("令和7年第4回定例会の表決24件を公式PDFの2頁の記号どおりに収録する", () => {
  const { votes } = context.window.SHINAGAWA_CIVIC_SOURCES;
  const session = Object.keys(votes).filter(id => id.startsWith("r07-4t:"));
  assert.equal(session.length, 24);
  assert.equal(session.filter(id => votes[id].type === "split").length, 13);
  assert.equal(votes["r07-4t:第142号議案"].page, 1);
  assert.equal(votes["r07-4t:第143号議案"].page, 2);
  // この会期の公式PDFは反対を「✕」（U+2715）で表す。データでは他の会期と同じ「×」にそろえる
  for (const id of session) assert.ok(!votes[id].symbols.includes("✕"), id);
  // 第134号（議員報酬）は未来のおぎの・筒井・藤原議員も反対
  const pay = votes["r07-4t:第134号議案"];
  assert.equal(pay.symbols, "〇〇〇〇〇〇〇長〇×欠〇××〇〇〇欠〇〇〇〇〇×××××××〇欠×〇×〇×");
  for (const member of ["ayaka_ogino", "tsutsui_yosuke", "masanori_fujiwara"]) assert.equal(civic.memberVote(pay, member), "×", member);
  // こんの孝子議員は全件欠席
  for (const id of session) assert.equal(civic.memberVote(votes[id], "takako_konno"), "欠", id);
  // 補正予算（第121号）は中塚議員だけが反対
  assert.equal(civic.memberVote(votes["r07-4t:第121号議案"], "ryo_nakatsuka"), "×");
  assert.equal([...votes["r07-4t:第121号議案"].symbols].filter(symbol => symbol === "×").length, 1);
  assert.ok(votes["r07-4t:議員提出第5号議案"]);
});

test("令和8年第1回定例会の表決57件を公式PDFの3頁の記号どおりに収録する", () => {
  const { votes, voteSessions } = context.window.SHINAGAWA_CIVIC_SOURCES;
  const session = Object.keys(votes).filter(id => id.startsWith("r08-1t:"));
  assert.equal(session.length, 57);
  // 区長提出の第1号・第2号（補正予算）と議員提出の第1号・第2号は別の表決
  assert.notEqual(votes["r08-1t:第2号議案"].symbols, votes["r08-1t:議員提出第2号議案"].symbols);
  assert.equal(votes["r08-1t:第2号議案"].locator, "3頁 第2号議案");
  assert.equal(votes["r08-1t:第10号議案"].page, 1);
  assert.equal(votes["r08-1t:第49号議案"].page, 2);
  assert.equal(session.filter(id => votes[id].type === "split").length, 22);
  // 西本たか子議員はこの会期では無所属の34列目。木村健悟議員は全件欠席
  const roster = voteSessions["r08-1t"].roster;
  assert.deepEqual({ ...roster[33] }, { group: "無所属", memberId: "takako_nishimoto" });
  for (const id of session) assert.equal(civic.memberVote(votes[id], "kengo_kimura"), "欠", id);
  // 第17号は須貝議員だけが反対。第5号（令和8年度一般会計予算）は西本議員だけが反対
  assert.equal(civic.memberVote(votes["r08-1t:第17号議案"], "yukihiro_sugai"), "×");
  assert.equal([...votes["r08-1t:第17号議案"].symbols].filter(symbol => symbol === "×").length, 1);
  assert.equal(civic.memberVote(votes["r08-1t:第5号議案"], "takako_nishimoto"), "×");
  assert.equal([...votes["r08-1t:第5号議案"].symbols].filter(symbol => symbol === "×").length, 1);
  // 否決された議員提出第2号は、共産4人などが賛成し、多数が反対
  assert.equal(votes["r08-1t:議員提出第2号議案"].symbols, "×××××××長××欠××××××××××××〇〇〇〇××〇××〇×〇×〇");
});

test("令和8年第2回定例会の表決25件を公式PDFの記号どおりに収録する", () => {
  const { votes, voteSessions } = context.window.SHINAGAWA_CIVIC_SOURCES;
  const session = Object.keys(votes).filter(id => id.startsWith("r08-2t:"));
  assert.equal(session.length, 25);
  // 第60号（特別区税条例）と第66号（地区計画の建築物制限）が割れた。共産4人と無所属3人が反対
  const split = session.filter(id => votes[id].type === "split").sort();
  assert.deepEqual(split, ["r08-2t:第60号議案", "r08-2t:第66号議案"]);
  const opposed = "〇〇〇〇〇〇〇〇〇〇〇〇〇〇欠〇長〇〇〇〇〇〇〇××××〇〇〇〇〇××〇×";
  assert.equal(votes["r08-2t:第60号議案"].symbols, opposed);
  assert.equal(votes["r08-2t:第66号議案"].symbols, opposed);
  // 第3回と違い、西村直子議員は自民（自民党・無所属の会）の列。この会期は全件欠席
  const roster = voteSessions["r08-2t"].roster;
  assert.deepEqual({ ...roster[14] }, { group: "自民", memberId: "naoko_nishimura" });
  for (const id of session) assert.equal(civic.memberVote(votes[id], "naoko_nishimura"), "欠", id);
  // 補正予算（第59号）と人事案件（第83号）も表に載っている
  assert.equal(votes["r08-2t:第59号議案"].type, "unanimous");
  assert.equal(votes["r08-2t:第83号議案"].type, "unanimous");
});

test("議員ごとの賛否は会期の並び順から引き、会期をまたいでも列がずれない", () => {
  const { votes } = context.window.SHINAGAWA_CIVIC_SOURCES;
  // 吉田ゆみこ議員は令和7年第1回で22列目、令和8年第3回で37列目
  assert.equal(civic.memberVote(votes["r07-1t:第10号議案"], "yumiko_yoshida"), "〇");
  assert.equal(civic.memberVote(votes["r08-3t:第106号議案"], "yumiko_yoshida"), "×");
  assert.equal(civic.memberVote(votes["r08-3t:第106号議案"], "yuichi_watanabe"), "長");
  // 令和8年第3回の表に無い議員は記録なし
  assert.equal(civic.memberVote(votes["r08-3t:第106号議案"], "x-higashi-yuki"), null);
  const entries = civic.voteEntries(votes["r08-3t:第106号議案"]);
  assert.equal(entries.length, 37);
  // vm の別領域で作られたオブジェクトなので、こちらの領域に写してから比べる
  assert.deepEqual({ ...entries[36] }, { group: "無所属", memberId: "yumiko_yoshida", symbol: "×" });
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

test("機能は所属する共通メニューから直接開ける", () => {
  const expected = {
    "sanpi.html": "議会の動き",
    "giin-katsudo.html": "議員・選挙",
    "jigyo.html": "予算・事業",
    "yosan-kessan.html#fiscal-comparison": "予算・事業",
    "open-data.html": "データ資料",
    "kumin-no-koe.html": "地域・参加",
    "data-status.html": "データ資料"
  };
  assert.deepEqual(Array.from(db.site.navGroups.filter(group => group.section === "primary"), group => group.label),
    ["議会の動き", "議員・選挙", "予算・事業", "地域・参加", "品川の歴史"]);
  assert.deepEqual(Array.from(db.site.navGroups.find(group => group.section === "utility").items, item => item.url),
    ["kensaku.html", "follow.html"]);
  const groups = new Map(db.site.navGroups.flatMap(group => group.items.map(item => [item.url, group.label])));
  for (const [href, group] of Object.entries(expected)) {
    assert.equal(groups.get(href), group, href);
  }
  for (const href of ["katsuyo.html", "yogo.html", "report.html", "shitsumon.html", "shikin-shiryo.html"]) {
    assert.ok(!groups.has(href), href);
  }
});

test("政務活動費・政治資金の資料ページは各制度のページと重複するため、旧URLを転送するだけにする", () => {
  const nav = readFileSync(new URL("../site-nav.js", import.meta.url), "utf8");
  assert.ok(!nav.includes("shikin-shiryo.html"));
  load("civic-content.js");
  assert.ok(!context.window.SHINAGAWA_CIVIC_CONTENT.pages.some(([, href]) => href === "shikin-shiryo.html"));
  for (const path of ["civic-finance.js", "civic-page.js", "seimu.html", "seijishikin.html"]) {
    const text = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
    assert.ok(!text.includes("shikin-shiryo.html") && !/funding/.test(text), path);
  }
  const stub = readFileSync(new URL("../shikin-shiryo.html", import.meta.url), "utf8");
  assert.match(stub, /noindex/);
  assert.match(stub, /seijishikin\.html/);
  assert.match(stub, /seimu\.html/);
  assert.doesNotMatch(stub, /data-civic-page|data-site-nav/);
});

test("財政ページの現在地はURLの表示箇所に対応する", () => {
  for (const hash of ["", "#fy-r07", "#fiscal-comparison"]) {
    const root = { innerHTML: "", querySelector: () => null };
    const context = createContext({
      window: { SHINAGAWA_DB: db, location: { pathname: "/yosan-kessan.html", hash } },
      document: { querySelectorAll: selector => selector === "[data-site-nav]" ? [root] : [] }
    });
    runInContext(readFileSync(new URL("../site-nav.js", import.meta.url), "utf8"), context);
    const current = [...root.innerHTML.matchAll(/href="([^"]+)" aria-current="page"/g)].map(match => match[1]);
    assert.deepEqual(current, [hash === "#fiscal-comparison" ? "yosan-kessan.html#fiscal-comparison" : "yosan-kessan.html"]);
  }
});

test("トップの目次は折りたたまず機能に直接リンクする", () => {
  const root = { innerHTML: "" };
  const context = createContext({
    window: { SHINAGAWA_DB: db, location: { pathname: "/index.html", hash: "" } },
    document: { querySelectorAll: selector => selector === "[data-site-index]" ? [root] : [] }
  });
  runInContext(readFileSync(new URL("../site-nav.js", import.meta.url), "utf8"), context);
  assert.match(root.innerHTML, /id="index-council"/);
  assert.match(root.innerHTML, /id="index-data"/);
  for (const path of ["gian.html", "sanpi.html", "giin-katsudo.html", "open-data.html", "data-status.html"]) {
    assert.ok(root.innerHTML.includes('href="' + path + '"'), path);
  }
  assert.doesNotMatch(root.innerHTML, /aria-expanded| hidden|katsuyo.html/);
});

test("廃止した機能と旧ハブを検索結果に出さず、ふりがなを表示できる", () => {
  const paths = ["yogo.html", "report.html", "shitsumon.html"];
  for (const path of paths) {
    assert.ok(!existsSync(new URL(`../${path}`, import.meta.url)), path);
  }
  load("civic-content.js");
  load("civic-ui.js");
  assert.equal(context.window.SHINAGAWA_CIVIC_UI.annotate("議案"), "<ruby>議案<rt>ぎあん</rt></ruby>");
  for (const [, href] of context.window.SHINAGAWA_CIVIC_CONTENT.pages) {
    assert.ok(![...paths, "katsuyo.html"].includes(href), href);
  }
  const search = readFileSync(new URL("../kensaku.html", import.meta.url), "utf8");
  assert.ok(paths.every(path => !search.includes(path)));
  assert.ok(!readFileSync(new URL("../site-a11y.js", import.meta.url), "utf8").includes("report.html"));
});

test("事業ごとの記録が指す予算議案は、議案ページに実在する", () => {
  // 年別データ（全件）は先頭の検査で読み込み済み
  const ids = new Set(civic.bills().map(bill => bill.id));
  for (const key of ["r07", "r06", "r05"]) {
    load(`data/jimujigyo-${key}.js`);
    const sheets = context.window[`SHINAGAWA_JIMUJIGYO_${key.toUpperCase()}`];
    const kaikei = new Set(sheets.projects.map(project => project.kaikei).filter(Boolean));
    for (const name of kaikei) {
      const bills = sheets.budgetBills[name] || [];
      assert.equal(bills.filter(bill => bill.kind === "当初予算").length, 1, `${key} ${name} の当初予算`);
      for (const bill of bills) assert.ok(ids.has(bill.id), `${key} ${name} ${bill.id}`);
    }
  }
});

test("わたしの地域は、地区をまたぐ町丁目を主な地区だけに通常表示する", () => {
  load("data/civic-sources.js");
  load("data/chokai.js");
  const { regions } = context.window.SHINAGAWA_DB.chokai;
  const { townDistricts } = context.window.SHINAGAWA_CIVIC_SOURCES.areas;
  const names = ["品川", "大崎", "大井", "荏原", "八潮"];
  // 町会データで2地区以上に出る町丁目は、すべて主な地区が条例に基づいて決まっている
  const seen = {};
  for (const district of names) {
    for (const town of civic.districtTowns(regions, district, {}).towns) (seen[town] ??= []).push(district);
  }
  const split = Object.entries(seen).filter(([, list]) => list.length > 1);
  assert.ok(split.length >= 12);
  for (const [town, list] of split) assert.ok(list.includes(townDistricts[town]), town);
  // 主な地区の表から外れた町丁目がない（データ更新で消えた町丁目を残さない）
  for (const town of Object.keys(townDistricts)) assert.ok(seen[town]?.length > 1, town);

  const osaki = civic.districtTowns(regions, "大崎", townDistricts);
  for (const town of ["荏原1丁目", "小山1丁目", "小山台1丁目", "戸越1丁目", "豊町1丁目"]) {
    assert.ok(!osaki.towns.includes(town), town);
    const part = osaki.partial.find(entry => entry.town === town);
    assert.equal(part.primary, "荏原", town);
    assert.ok(part.ranges.length > 0, town);
  }
  assert.ok(osaki.towns.includes("東五反田2丁目") && osaki.towns.includes("西品川1丁目"));
  const shinagawa = civic.districtTowns(regions, "品川", townDistricts);
  assert.ok(!shinagawa.towns.includes("東五反田2丁目"));
  assert.deepEqual([...shinagawa.partial.find(entry => entry.town === "東五反田2丁目").ranges], ["16番～22番"]);
  // どの町丁目も、主な地区としてはちょうど1つの地区に出る
  const primary = names.flatMap(district => civic.districtTowns(regions, district, townDistricts).towns);
  assert.equal(new Set(primary).size, primary.length);
  assert.equal(new Set(primary).size, Object.keys(seen).length);
});
