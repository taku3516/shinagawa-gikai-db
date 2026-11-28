import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

const root = new URL("../", import.meta.url);
const base = "https://taku3516.github.io/shinagawa-gikai-db/";
const context = createContext({ window: {}, URLSearchParams, TextEncoder });

/** @param {string} file @returns {void} */
function load(file) {
  runInContext(readFileSync(new URL(file, root), "utf8"), context, { filename: file });
}

/** @param {unknown} value @returns {string} */
function xml(value) {
  return String(value ?? "").replace(/[<>&"']/g, char => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]);
}

/** @param {string} output @returns {void} */
function build(output) {
  for (const file of ["data/site.js", "data/petitions.js", "data/news-items.js", "civic-data.js",
    "data/public-comments.js", "data/shinatalk.js", "events-ics.js", "public-comment-feed.js"]) load(file);
  const { SHINAGAWA_DB: db, SHINAGAWA_CIVIC: civic, SHINAGAWA_PETITIONS: petitions, SHINAGAWA_NEWS: news,
    SHINAGAWA_PUBLIC_COMMENTS: publicComments, SHINAGAWA_SHINATALK: shinatalk, SHINAGAWA_EVENTS_ICS: ics,
    SHINAGAWA_PUBLIC_COMMENT_FEED: commentFeed } = context.window;
  const current = db.site.years.find(item => item.id === db.site.defaultYear && item.available);
  load(current.file);
  if (current.supplement) load(current.supplement);
  const bills = civic.bills();
  if (petitions.summary.itemCount !== petitions.items.length || bills.some(item => !item.meeting)) {
    throw new Error("トップページの集計対象データが一致しません。");
  }
  const counts = { year: current.label, bills: bills.length, petitions: petitions.items.length, coverage: "収録件数" };
  writeFileSync(resolve(output, "data/civic-counts.js"), "window.SHINAGAWA_CIVIC_COUNTS = " + JSON.stringify(counts) + ";\n");
  const file = resolve(output, "exports/shinagawa-updates.xml");
  mkdirSync(dirname(file), { recursive: true });
  // 区の意見募集の締切を購読用の .ics にする（イベントの .ics と同じ書式。締切が1年以上前のものは入れない）。
  // しなトークは最初の段階の終了日を「【しなトーク】」付きで同じカレンダーに入れる。日付順に並べ直す
  const deadlines = [...commentFeed.deadlineEvents(publicComments.items, civic.today(), base),
    ...commentFeed.talkDeadlineEvents(shinatalk.items, civic.today(), base)]
    .sort((a, b) => a.dates[0].localeCompare(b.dates[0]) || a.id.localeCompare(b.id));
  writeFileSync(resolve(output, "exports/shinagawa-public-comments.ics"), ics.buildCalendar(deadlines,
    "品川区の意見募集（締切）", "品川区のパブリックコメント（意見募集）の締切日と、しなトーク（区のオンライン意見交換）の最初の段階の終了日です。品川区議会DBが区の公式サイトとしなトークから集めています。", base));
  const items = [
    ...bills.map(item => ({ id: item.id, title: item.title, url: new URL(civic.billUrl(item), base).href, sort: item.updatedAt })),
    ...news.items.filter(item => /^https:\/\//.test(item.url)).map(item => ({
      id: "news:" + item.id, title: item.title, url: item.url, sort: item.publishedAt,
      published: item.dateKind === "published" && Number.isFinite(Date.parse(item.publishedAt)) ? new Date(item.publishedAt).toUTCString() : null
    }))
  ].sort((a, b) => String(b.sort || "").localeCompare(String(a.sort || ""))).slice(0, 100);
  // 区の意見募集（募集は掲載日、結果公表は区のページの更新日）。年に数件しかなく、
  // 毎日数十件入るニュースと同じ「新しい順に100件」で切ると押し出されるので、1年以内のものは別枠で必ず載せる
  const since = new Date(Date.now() - 365 * 864e5).toISOString().slice(0, 10);
  items.push(...[...commentFeed.feedItems(publicComments.items), ...commentFeed.talkFeedItems(shinatalk.items)].filter(item => item.date >= since)
    .map(item => ({ id: item.id, title: item.title, url: new URL(item.url, base).href, sort: item.date })));
  items.sort((a, b) => String(b.sort || "").localeCompare(String(a.sort || "")));
  const entries = items.map(item => `  <item><title>${xml(item.title)}</title><link>${xml(item.url)}</link><guid isPermaLink="false">${xml(item.id)}</guid>${item.published ? "<pubDate>" + xml(item.published) + "</pubDate>" : ""}</item>`);
  writeFileSync(file, ['<?xml version="1.0" encoding="UTF-8"?>', '<rss version="2.0"><channel>',
    "  <title>品川区議会DBの新着</title>", `  <link>${base}</link>`,
    "  <description>収録した議案・区の意見募集・しなトークと地域ニュース</description>", ...entries, "</channel></rss>", ""].join("\n"));
}
const output = process.argv[2];
if (!output) throw new Error("公開用出力ディレクトリを指定してください。");
build(output);
