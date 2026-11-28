/* 区の意見募集（パブリックコメント）を、締切のカレンダーと新着に載せる形へ変える。DOM には触れない。
   - deadlineEvents: events-ics.js の buildCalendar・googleCalendarUrl にそのまま渡せる予定（締切日の終日予定）
   - feedItems: フォロー・新着（civic-services.js）とサイト全体のRSS（scripts/build_civic_feeds.mjs）の項目
   ブラウザと公開時のビルドの両方で使う（scripts/public-comment-feed.test.mjs で確認）。 */
(function () {
  "use strict";

  // 締切を過ぎてもこの日数のあいだはカレンダーに残す。購読中のカレンダーから予定が急に消えないように
  const KEEP_DAYS = 365;

  /** @param {string} iso "2026-12-15" @returns {string} "2026年12月15日" */
  function jaDate(iso) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ""));
    return match ? `${match[1]}年${Number(match[2])}月${Number(match[3])}日` : "";
  }

  /** @param {string} iso @param {number} days @returns {string} */
  function addDays(iso, days) {
    const date = new Date(iso + "T00:00:00Z");
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  /** @param {object} item @returns {string} サイト内の案件の位置 */
  function pagePath(item) {
    return `kumin-no-koe.html?nendo=${item.fiscalYear}#pc-${item.id}`;
  }

  /**
   * @param {object[]} items 区の意見募集の案件
   * @param {string} today "YYYY-MM-DD"（日本の暦日）
   * @param {string} siteBase サイトのURL（末尾は /）
   * @returns {object[]} 締切日の終日予定（締切が KEEP_DAYS より前の案件は除く）
   */
  function deadlineEvents(items, today, siteBase) {
    const since = addDays(today, -KEEP_DAYS);
    return (items || [])
      .filter(item => item.end && item.end >= since)
      .sort((a, b) => a.end.localeCompare(b.end) || a.id.localeCompare(b.id))
      .map(item => ({
        id: `public-comment-${item.id}`,
        title: `【意見募集の締切】${item.title}`,
        dates: [item.end],
        summary: [
          `品川区の意見募集（パブリックコメント、案件番号${item.id}）の締切日です。`,
          item.start ? `募集期間は${jaDate(item.start)}から${jaDate(item.end)}まで。` : `${jaDate(item.end)}まで。`,
          item.department ? `担当：${item.department}` : "",
          "意見の出し方は区の募集ページで確認してください。",
          `品川区議会DBの案件ページ：${siteBase}${pagePath(item)}`
        ].filter(Boolean).join("\n"),
        source: "品川区（パブリックコメント）",
        // 意見の提出方法が載っている区の募集ページへ送る
        url: item.url,
        category: "意見募集"
      }));
  }

  /**
   * @param {object[]} items 区の意見募集の案件
   * @returns {{id: string, title: string, url: string, date: string, note: string, type: string, body: string[]}[]}
   *   募集は掲載日（start）、結果公表は当サイトが募集中から結果公表に変わったのを見つけた日（resultSeenAt）。
   *   区のページの更新日（updatedAt）はサイト改修でそろって書き換わるので使わない。公表日の分からない結果は載せない
   */
  function feedItems(items) {
    return (items || []).filter(item => item.status !== "result" || item.resultSeenAt).map(item => {
      const result = item.status === "result";
      const until = item.end ? item.end.slice(5).replace(/^0?(\d+)-0?(\d+)$/, "$1月$2日") : "";
      return {
        id: `pc:${item.id}`,
        title: result ? `意見募集の結果：${item.title}` : `意見募集：${item.title}${until ? `（${until}まで）` : ""}`,
        url: pagePath(item),
        date: (result ? item.resultSeenAt : item.start || item.end) || "",
        note: result ? "結果の公表を確認した日" : "意見募集の開始日",
        type: "意見募集",
        body: [item.department || "", "パブリックコメント 意見募集"]
      };
    });
  }

  window.SHINAGAWA_PUBLIC_COMMENT_FEED = { deadlineEvents, feedItems, KEEP_DAYS };
})();
