#!/usr/bin/env node
// 区の意見募集（パブリックコメント）と、委員会で区が報告した議題を結びつける。
//
// 計画そのものは議案にならず、委員会への報告（素案とパブコメ実施 → 結果 → 策定）として
// 扱われることが多い。委員会データは年ごとに十数ファイルあり画面で毎回読むと重いので、
// ここで照合して data/public-comment-council.js に書き出し、画面はそれだけを読む。
//
//   node scripts/public-comment-council.mjs          照合結果を表示するだけ
//   node scripts/public-comment-council.mjs --write  data/public-comment-council.js を書き出す
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../", import.meta.url);
const OUT = new URL("data/public-comment-council.js", ROOT);

// 募集期間の前後どこまでの議題を対象にするか（月数）。
// 素案の報告は募集の数か月前、策定の報告は半年〜1年後が多い。
// 何年も離れた議題は、同じ名前の別の版（前回の策定や次の改定）であることが多い。
const MONTHS_BEFORE = 18;
const MONTHS_AFTER = 15;

/** @param {string} text @returns {string} 全角・空白・区名の違いを吸収した照合用の文字列 */
function normalize(text) {
  return String(text || "").normalize("NFKC").replace(/\s/g, "").replace(/品川区/g, "")
    // 「第九期」と「第9期」を同じ鍵にする
    .replace(/第([一二三四五六七八九十]+)(次|期)/g, (whole, value, kind) => {
      const number = toNumber(value);
      return number === null ? whole : `第${number}${kind}`;
    });
}

/** @param {string} title @returns {string[]} 件名から作る照合用の鍵（複数の計画をまとめた案件は計画ごと） */
export function planKeys(title) {
  const base = normalize(title).replace(/\([^)]*\)/g, "");
  const parts = base.split("・");
  // 「障害者計画・第7期障害福祉計画」のように、どの部分も計画名として独立しているときだけ分ける
  const separate = parts.length > 1 && parts.every(part => part.length >= 4 && /(計画|方針|プラン)$/.test(part));
  return (separate ? parts : [base]).filter(key => key.length >= 4);
}

/**
 * 委員会データの議題名には、会議録から切り出すときに発言の一部が先頭に残ったものがある
 * （例: 「を聴取したいと思います。 初めに、(1)…」）。句読点のあとに続く議事番号までを外す。
 * @param {string} title @returns {string}
 */
export function cleanTitle(title) {
  return String(title || "").replace(/^[^「」]*[。、]\s*[(（]\d+[)）]\s*/, "").trim();
}

const KANJI_DIGITS = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };

/** @param {string} text 「九」「十二」「12」など @returns {number|null} */
function toNumber(text) {
  if (/^\d+$/.test(text)) return Number(text);
  const match = /^([一二三四五六七八九])?(十)?([一二三四五六七八九])?$/.exec(text);
  if (!match || !text) return null;
  if (!match[2]) return KANJI_DIGITS[match[1]] ?? null;
  return (match[1] ? KANJI_DIGITS[match[1]] : 1) * 10 + (match[3] ? KANJI_DIGITS[match[3]] : 0);
}

/**
 * 件名に明記された版の印（年度・第○次・第○期）を種類ごとに集める。
 * @param {string} title @returns {Record<string, Set<number>>}
 */
export function versionMarks(title) {
  const text = String(title || "").normalize("NFKC");
  const marks = { year: new Set(), ji: new Set(), ki: new Set() };
  for (const [, era, year] of text.matchAll(/(令和|平成)(元|\d+)年度/g)) {
    marks.year.add((era === "令和" ? 2018 : 1988) + (year === "元" ? 1 : Number(year)));
  }
  for (const [, value, kind] of text.matchAll(/第([0-9一二三四五六七八九十]+)(次|期)/g)) {
    const number = toNumber(value);
    if (number !== null) marks[kind === "次" ? "ji" : "ki"].add(number);
  }
  return marks;
}

/**
 * 両方に同じ種類の印があって値が1つも重ならなければ、同じ名前の別の版とみなす
 * （例: 「令和5年度修正」の案件に「令和4年度…の修正」の議題）。片方にしか無い印は問わない。
 * @param {string} itemTitle @param {string} topicTitle @returns {boolean}
 */
function sameVersion(itemTitle, topicTitle) {
  const own = versionMarks(itemTitle);
  const other = versionMarks(topicTitle);
  return Object.keys(own).every(kind => !own[kind].size || !other[kind].size
    || [...own[kind]].some(value => other[kind].has(value)));
}

/** @param {string} iso @param {number} months @returns {string} */
function addMonths(iso, months) {
  const date = new Date(iso + "T00:00:00Z");
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString().slice(0, 10);
}

/** @param {{start?: string|null, end?: string|null}} item @param {string} dateIso @returns {boolean} */
export function withinWindow(item, dateIso) {
  const start = item.start || item.end;
  const end = item.end || item.start;
  if (!start || !dateIso) return false;
  return dateIso >= addMonths(start, -MONTHS_BEFORE) && dateIso <= addMonths(end, MONTHS_AFTER);
}

/**
 * @param {{title: string, start?: string|null, end?: string|null}} item
 * @param {{dateIso: string, title: string, sessionId: string}[]} topics
 * @returns {object[]} 計画名を含み、募集期間の前後にある議題（日付順・重複なし）
 */
export function matchTopics(item, topics) {
  const keys = planKeys(item.title);
  if (!keys.length) return [];
  const seen = new Set();
  return topics
    .filter(topic => withinWindow(item, topic.dateIso) && keys.some(key => normalize(topic.title).includes(key))
      && sameVersion(item.title, topic.title))
    .filter(topic => {
      const id = topic.sessionId + "|" + topic.title;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    })
    .sort((a, b) => a.dateIso.localeCompare(b.dateIso) || a.title.localeCompare(b.title, "ja"));
}

/** @param {object} context @param {string} path @returns {void} */
function load(context, path) {
  const url = new URL(path, ROOT);
  if (!existsSync(url)) throw new Error(`データファイルがありません: ${path}`);
  runInContext(readFileSync(url, "utf8"), context, { filename: path });
}

/** @returns {{items: object[], topics: object[]}} パブコメと、対象年度の委員会議題 */
function collect() {
  const context = createContext({ window: {}, URLSearchParams });
  load(context, "data/site.js");
  load(context, "civic-data.js");
  load(context, "data/public-comments.js");
  const db = context.window.SHINAGAWA_DB;
  const items = context.window.SHINAGAWA_PUBLIC_COMMENTS.items;
  // 最も古い案件の前年から読む（それより前の年は照合の対象外なので読まない）
  const firstYear = Math.min(...items.map(item => item.fiscalYear)) - 1;
  const topics = [];
  for (const meta of db.site.years.filter(year => year.available && year.committees)) {
    const calendar = /^r(\d{2})$/.exec(meta.id);
    if (!calendar || 2018 + Number(calendar[1]) < firstYear) continue;
    load(context, meta.file);
    if (meta.supplement) load(context, meta.supplement);
    load(context, `data/${meta.id}-committees.js`);
    const year = db.years[meta.id];
    if (!year) throw new Error(`${meta.id} の年データが登録されませんでした`);
    for (const part of year.committeeDataParts || []) load(context, `data/${part}`);
    for (const session of year.committeeSessions || []) {
      for (const topic of session.topics || []) {
        // 会議録の全文がある回は、その議題の最初の発言へ直接送る（横断検索と同じ形式）
        const voice = session.hasFullText && (topic.exchanges || []).find(exchange => exchange.voiceIndex)?.voiceIndex;
        topics.push({ yearId: meta.id, meetingId: session.meetingId, sessionId: session.id,
          committee: session.committee, dateIso: session.dateIso, title: topic.title || topic.agenda || "",
          voiceUrl: voice ? `kaigiroku.html#committee-${session.id}-v${String(voice).padStart(4, "0")}` : null });
      }
    }
  }
  return { items, topics };
}

/** @param {Record<string, object[]>} links @returns {string} */
function render(links) {
  return "/* scripts/public-comment-council.mjs が委員会データから生成。手で編集しない。 */\n"
    + "window.SHINAGAWA_PUBLIC_COMMENT_COUNCIL = " + JSON.stringify({ items: links }, null, 1) + ";\n";
}

/** @returns {number} 終了コード */
function main() {
  const { items, topics } = collect();
  const links = {};
  for (const item of items) {
    const matched = matchTopics(item, topics);
    console.error(`${item.id} ${matched.length}件 ${item.title}`);
    if (matched.length) {
      links[item.id] = matched.map(topic => ({ date: topic.dateIso, committee: topic.committee, title: cleanTitle(topic.title),
        url: topic.voiceUrl || `kaigi.html?year=${topic.yearId}&meeting=${encodeURIComponent(topic.meetingId)}#committee-${topic.sessionId}` }));
    }
  }
  console.error(`委員会の議題とつながった案件: ${Object.keys(links).length}/${items.length}件（対象の議題 ${topics.length}件）`);
  if (process.argv.includes("--write")) {
    const next = render(links);
    if (existsSync(OUT) && readFileSync(OUT, "utf8") === next) {
      console.error("内容に変更がないため書き換えません");
    } else {
      writeFileSync(OUT, next);
      console.error("data/public-comment-council.js に書き出しました");
    }
  }
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}
