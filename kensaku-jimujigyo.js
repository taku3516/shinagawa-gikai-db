/* 横断検索（kensaku.html）に載せる「事業ごとの記録」の項目づくり。
   評価シートから機械的に読み取った小事業（data/jimujigyo-<評価年度>.js、1年度分ずつ）を、
   検索の addItem にそのまま渡せる形へ変える。DOM には触れない。 */
(function () {
  "use strict";

  /** 「令和6年度」→ 2024。読めなければ null。 @param {string} label @returns {number|null} */
  function fiscalYearNumber(label) {
    const match = String(label || "").match(/令和(元|\d+)年度/);
    if (!match) return null;
    return 2018 + (match[1] === "元" ? 1 : Number(match[1]));
  }

  /** @param {object} data 評価シート全件のデータ @returns {object[]} 検索項目 */
  function items(data) {
    const year = fiscalYearNumber(data && data.fiscalYear);
    const evaluationYear = (data && data.evaluationYear) || "";
    return ((data && data.projects) || []).map(project => {
      const evaluation = project.evaluation;
      const indicators = (project.indicators || []).map(item => item.label).filter(Boolean);
      return {
        id: `jimujigyo-${project.id}`,
        category: "gyosei",
        type: "事業ごとの記録",
        year,
        title: project.name || "名称未設定",
        meta: [
          project.department,
          project.section,
          evaluation ? `${evaluationYear}評価 ${evaluation.code} ${evaluation.label}` : "",
          Number.isFinite(project.rate) ? `執行率 ${project.rate.toFixed(1)}%` : ""
        ].filter(Boolean).join("／"),
        body: [project.purpose, project.overview, indicators.length ? `成果指標：${indicators.join("、")}` : ""]
          .filter(Boolean).join("\n"),
        primary: [project.name, project.jigyo, project.department, project.section, project.unit,
          project.account && project.account.moku].filter(Boolean),
        tags: [evaluation ? `最終評価${evaluation.code}` : "", project.department].filter(Boolean),
        links: [
          { type: "internal", label: "事業ごとの記録で見る", url: `jigyo.html?id=${encodeURIComponent(project.id)}` },
          project.source && project.source.url
            ? { type: "official", label: project.source.label || "評価シート", url: project.source.url } : null
        ].filter(Boolean)
      };
    });
  }

  window.SHINAGAWA_JIMUJIGYO_SEARCH = { items, fiscalYearNumber };
})();
