/* 横断検索（kensaku.html）に載せる「区の意見募集（パブリックコメント）」の項目づくり。
   data/public-comments.js の案件を、検索の addItem にそのまま渡せる形へ変える。DOM には触れない。
   委員会での報告（data/public-comment-council.js）の議題名も検索語に含め、
   「こども計画」と探したときに募集・結果・策定の流れがまとめて見つかるようにする。 */
(function () {
  "use strict";

  /** 2024 →「令和6年度」。案件番号の年は年度なので、暦年の表示（令和6年（2024年））にしない。 @param {number} year @returns {string} */
  function fiscalLabel(year) {
    const reiwa = Number(year) - 2018;
    if (!(reiwa > 0)) return "";
    return `令和${reiwa === 1 ? "元" : reiwa}年度`;
  }

  /**
   * @param {{items: object[]}} data 区の意見募集の案件
   * @param {{items: Record<string, object[]>}|null} council 委員会での報告（照合データ。読めなければ null）
   * @returns {object[]} 検索項目
   */
  function items(data, council) {
    const reportsById = (council && council.items) || {};
    return ((data && data.items) || []).map(comment => {
      const reports = reportsById[comment.id] || [];
      const result = comment.status === "result";
      const label = fiscalLabel(comment.fiscalYear);
      return {
        id: `public-comment-${comment.id}`,
        category: "public-comments",
        type: result ? "意見募集の結果" : "意見募集",
        // 絞り込みは数値の year で、結果の見出しは yearLabel（年度）で出す
        year: comment.fiscalYear,
        yearLabel: label,
        date: comment.end || comment.start || "",
        title: comment.title,
        meta: [label, `案件番号${comment.id}`, comment.department].filter(Boolean).join("／"),
        body: [
          comment.start && comment.end ? `募集期間 ${comment.start}〜${comment.end}` : comment.end ? `募集期限 ${comment.end}` : "",
          result && Number.isFinite(comment.opinions) ? `応募者${comment.applicants}人・意見${comment.opinions}件` : "",
          reports.length ? `委員会での報告${reports.length}件` : ""
        ].filter(Boolean).join("。"),
        source: "品川区",
        // 議題名は32字を超えるものが多くタグに入らないので、検索語（primary）に含める
        primary: ["パブリックコメント", "意見募集", comment.department].filter(Boolean)
          .concat(reports.flatMap(report => [report.committee, report.title])),
        tags: [result ? "結果公表済み" : "意見募集"],
        links: [
          { type: "internal", label: "区の意見募集・結果で見る", url: `kumin-no-koe.html?nendo=${comment.fiscalYear}#pc-${comment.id}` },
          { type: "official", label: "品川区の案件ページ", url: comment.url }
        ].concat(reports.slice(-1).map(report => ({ type: "internal", label: `委員会での報告（${report.committee}）`, url: report.url })))
      };
    });
  }

  window.SHINAGAWA_PUBLIC_COMMENT_SEARCH = { items, fiscalLabel };
})();
