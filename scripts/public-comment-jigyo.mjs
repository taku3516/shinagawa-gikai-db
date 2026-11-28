#!/usr/bin/env node
// 区の意見募集（パブリックコメント）の計画と、その計画を根拠法令・目的・概要に挙げる事業
// （事務事業評価シートから作った「事業ごとの記録」）を結びつける。
//
// 事業名に計画名の一部が入っているだけの照合は誤りが多い（「介護保険」で特養の運営費まで拾う）。
// 評価シートの記載が計画名をはっきり挙げているものだけを結び、どの欄に書かれていたかも残す。
//
//   node scripts/public-comment-jigyo.mjs          照合結果を表示するだけ
//   node scripts/public-comment-jigyo.mjs --write  data/public-comment-jigyo.js を書き出す
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { createContext, runInContext } from "node:vm";
import { fileURLToPath } from "node:url";
import { normalize, planKeys, sameVersion } from "./public-comment-council.mjs";

const ROOT = new URL("../", import.meta.url);
const OUT = new URL("data/public-comment-jigyo.js", ROOT);

// 評価シートの欄。根拠として強い順に並べ、結果もこの順に出す
const FIELDS = [["legal", "根拠法令等"], ["purpose", "目的"], ["overview", "概要"], ["name", "事業名"]];
// 計画名の前後で版の印（第○期・令和○年度）を探す幅（文字数）
const AROUND = 12;

/** @param {string} title @returns {string[]} 事業の記載から探す計画名（版の印と中間改定を外す。版は別に比べる） */
export function citeKeys(title) {
  return planKeys(title)
    .map(key => key.replace(/^第\d+(次|期)/, "").replace(/(中間改定|改定)$/, ""))
    .filter(key => key.length >= 4);
}

/** @param {string} text @returns {string} 評価シートの【】書きを（）と同じに扱う */
function sheetText(text) {
  return normalize(String(text || "").replace(/【/g, "(").replace(/】/g, ")"));
}

/**
 * @param {{id: string, title: string}} item
 * @param {object[]} projects 事業ごとの記録（id・name・section・legal・purpose・overview）
 * @returns {{id: string, name: string, section: string, field: string}[]} 計画を挙げている事業と、挙げている欄
 */
export function matchProjects(item, projects) {
  const keys = citeKeys(item.title);
  const found = [];
  for (const project of projects) {
    for (const [field, label] of FIELDS) {
      const text = sheetText(project[field]);
      const cited = keys.some(key => {
        const at = text.indexOf(key);
        // 計画名の前後に別の版（第8期など）が書かれていれば、その版の計画として外す
        return at >= 0 && sameVersion(item.title, text.slice(Math.max(0, at - AROUND), at + key.length + AROUND));
      });
      if (cited) {
        found.push({ id: project.id, name: project.name, section: project.section || "", field: label, rank: FIELDS.findIndex(entry => entry[0] === field) });
        break;
      }
    }
  }
  return found
    .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, "ja"))
    .map(({ rank, ...entry }) => entry);
}

/**
 * 複数年度の評価シートに出る同じ事業（事業名と所管課が同じもの）を1件にまとめる。
 * リンクは最新年度の頁へ、記載欄も最新年度のものを使い、どの年度に記載があったかを years に残す。
 * @param {{id: string, name: string, section: string, field: string, evaluationYear: string}[]} entries 新しい年度が先
 * @returns {{id: string, ids: string[], name: string, section: string, field: string, years: string[]}[]}
 */
export function groupByProject(entries) {
  const groups = new Map();
  for (const entry of entries) {
    const key = entry.name + "|" + entry.section;
    const group = groups.get(key);
    if (group) {
      group.ids.push(entry.id);
      group.years.push(entry.evaluationYear);
    } else {
      groups.set(key, { id: entry.id, ids: [entry.id], name: entry.name, section: entry.section, field: entry.field, years: [entry.evaluationYear] });
    }
  }
  const rank = field => FIELDS.findIndex(entry => entry[1] === field);
  return [...groups.values()]
    .map(group => ({ ...group, years: [...new Set(group.years)].sort((a, b) => a.localeCompare(b, "ja", { numeric: true })) }))
    .sort((a, b) => rank(a.field) - rank(b.field) || a.name.localeCompare(b.name, "ja"));
}

/** @param {object} context @param {string} path @returns {void} */
function load(context, path) {
  const url = new URL(path, ROOT);
  if (!existsSync(url)) throw new Error(`データファイルがありません: ${path}`);
  runInContext(readFileSync(url, "utf8"), context, { filename: path });
}

/** @returns {{items: object[], sheets: {year: string, projects: object[]}[]}} パブコメと、年度ごとの事業ごとの記録 */
function collect() {
  const context = createContext({ window: {} });
  load(context, "data/public-comments.js");
  // 新しい年度を先に並べる（同じ事業は最新年度の頁へつなぐため）
  const files = readdirSync(new URL("data/", ROOT)).filter(name => /^jimujigyo-r\d{2}\.js$/.test(name)).sort().reverse();
  if (!files.length) throw new Error("事業ごとの記録（data/jimujigyo-r??.js）が見つかりません");
  const sheets = files.map(file => {
    load(context, `data/${file}`);
    const key = "SHINAGAWA_JIMUJIGYO_" + file.slice(10, 13).toUpperCase();
    const data = context.window[key];
    if (!data?.projects) throw new Error(`${file} に ${key}.projects がありません`);
    return { year: data.evaluationYear, projects: data.projects };
  });
  return { items: context.window.SHINAGAWA_PUBLIC_COMMENTS.items, sheets };
}

/** @param {Record<string, object[]>} links @returns {string} */
function render(links) {
  return "/* scripts/public-comment-jigyo.mjs が事業ごとの記録から生成。手で編集しない。 */\n"
    + "window.SHINAGAWA_PUBLIC_COMMENT_JIGYO = " + JSON.stringify({ items: links }, null, 1) + ";\n";
}

/** @returns {number} 終了コード */
function main() {
  const { items, sheets } = collect();
  const links = {};
  for (const item of items) {
    const matched = groupByProject(sheets.flatMap(sheet => matchProjects(item, sheet.projects).map(entry => ({ ...entry, evaluationYear: sheet.year }))));
    console.error(`${item.id} ${matched.length}件 ${item.title}${matched.length ? "：" + matched.map(entry => `${entry.name}（${entry.field}）`).join("、") : ""}`);
    if (matched.length) links[item.id] = matched;
  }
  const total = Object.values(links).reduce((sum, list) => sum + list.length, 0);
  console.error(`事業とつながった案件: ${Object.keys(links).length}/${items.length}件（のべ${total}事業）`);
  if (process.argv.includes("--write")) {
    const next = render(links);
    if (existsSync(OUT) && readFileSync(OUT, "utf8") === next) {
      console.error("内容に変更がないため書き換えません");
    } else {
      writeFileSync(OUT, next);
      console.error("data/public-comment-jigyo.js に書き出しました");
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
