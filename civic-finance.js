(() => {
  "use strict";
  const db = window.SHINAGAWA_DB;
  const civic = window.SHINAGAWA_CIVIC;
  const data = window.SHINAGAWA_CIVIC_SOURCES;
  const { esc, link, sources, list, terms, select, input, filters, matches, annotate, review, missing } = window.SHINAGAWA_CIVIC_UI;
  const query = new URLSearchParams(location.search);

  /** @param {number|null} value @returns {string} */
  function money(value) {
    return Number.isFinite(value) ? Math.round(value).toLocaleString("ja-JP") + "円" : missing;
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function fiscal(root) {
    if (!db.fiscalData) await civic.loadScript("data/fiscal.js");
    const { fiscalYears } = db.fiscalData;
    const { income, spending, population, source } = data.budgets;
    root.innerHTML = `<h2>お金の見える化</h2><form class="civic-controls">
      ${select("year", "年度", fiscalYears.map(year => [year.id, year.label]), fiscalYears[0].id)}
      ${select("unit", "単位", [["total", "総額"], ["person", "区民1人あたり"]], "total")}</form>
      <div data-budget aria-live="polite"></div>`;
    const form = root.querySelector("form");
    const result = root.querySelector("[data-budget]");
    const render = () => {
      const settings = filters(form);
      const id = settings.get("year");
      const year = fiscalYears.find(item => item.id === id);
      const perPerson = settings.get("unit") === "person";
      const pop = population[id];
      const columns = { "fy-r08": 1, "fy-r07": 2 };
      const column = columns[id];
      const budget = column ? spending.reduce((sum, row) => sum + row[column], 0) : null;
      const initial = year.initial?.detail?.match(/^一般会計 ([\d,]+)円$/)?.[1];
      const initialYen = budget ?? (initial ? Number(initial.replace(/,/g, "")) : null);
      const settlement = year.settlement;
      const previousPopulation = population["fy-r07"].count;
      const formatting = value => money(perPerson && Number.isFinite(value) ? (pop ? value / pop.count : null) : value);
      const charts = rows => rows.map(row => {
        const amount = row[column];
        const previous = perPerson ? row[2] / previousPopulation : row[2];
        const value = perPerson ? amount / pop.count : amount;
        const change = column === 1 ? value - previous : null;
        const percent = change !== null && previous > 0 ? (change / previous * 100).toFixed(1) + "%" : missing;
        return `<li>${esc(row[0])} ${formatting(amount)} <progress max="${budget}" value="${amount}" aria-label="${esc(row[0])}の構成比"></progress>
          ${change === null ? "" : `前年度比 ${money(change)}（${percent}）`}</li>`;
      });
      result.innerHTML = `<p>区民1人あたりの額は、金額（円）÷対象年度4月1日の住民基本台帳人口です。1円単位に丸めています。</p>
        ${pop ? `<p>${link(pop.date + "時点の人口 " + pop.count.toLocaleString("ja-JP") + "人", pop.url)}</p>` : ""}
        ${terms([
          ["一般会計当初予算", initialYen === null && !perPerson ? esc(year.initial?.amount) : formatting(initialYen)],
          ["決算審査時の予算現額", formatting(settlement?.budgetCurrentYen)],
          [`決算・歳入（${settlement?.accountBasis || "一般会計"}）`, settlement?.revenueYen ? formatting(settlement.revenueYen) : perPerson ? missing : esc(settlement?.revenue)],
          [`決算・歳出（${settlement?.accountBasis || "一般会計"}）`, settlement?.expenditureYen ? formatting(settlement.expenditureYen) : perPerson ? missing : esc(settlement?.expenditure)]
        ])}
        ${column ? `<div class="civic-grid"><section><h3>当初予算・歳入</h3>${list(charts(income))}</section><section><h3>当初予算・歳出</h3>${list(charts(spending))}</section></div>${sources([source])}` : "<p>この年度の款別比較は未収録です。</p>"}
        ${sources([...(year.initial?.links || []), ...(settlement?.links || []), ...settlement?.amountSource ? [settlement.amountSource] : []])}
        <p>${link("事業別に資料を探す", "jigyo.html")} ／ ${link("政務活動費と政治資金の資料を探す", "shikin-shiryo.html")}</p>`;
    };
    form.addEventListener("change", render);
    form.addEventListener("submit", event => event.preventDefault());
    render();
  }

  /** @param {HTMLElement} root @returns {void} */
  function projects(root) {
    const project = data.projects.find(item => item.id === query.get("id"));
    if (!project) {
      root.innerHTML = `<p>${query.has("id") ? "指定された事業は未収録です。" : "公式資料で対応を確認できた事業を掲載します。"}</p>
        ${list(data.projects.map(item => link(item.name, "jigyo.html?id=" + encodeURIComponent(item.id))))}
        <p>${link("年度別行政評価", "gyosei.html")} ／ ${link("年度別予算・決算", "yosan-kessan.html")}</p>`;
      return;
    }
    const amounts = project.finance || [];
    const scale = Math.max(1, ...amounts.map(item => Math.max(item.budgetYen, item.settledYen)));
    const steps = [
      ["予算編成", ""], ["議会審議", "設置条例案（関連議案）"], ["予算成立", ""],
      ["事業実施", "事業の経過を参照"], ["決算", "事業別会計を参照"],
      ["行政評価", "最終評価を参照"], ["次年度予算", ""]
    ];
    root.innerHTML = `<p>${link("事業一覧", "jigyo.html")} ／ ${link("事業をフォロー", "follow.html?" + new URLSearchParams({ kind: "事業", value: project.name }))}</p>
      <article class="civic-card"><h2>${esc(project.name)}</h2>
        ${terms([["目的", annotate(project.purpose)], ["所管", esc(project.office)], ["対象者", annotate(project.audience)],
          ["根拠法令・条例", annotate(project.legal)], ["開始年度", esc(project.startYear)],
          ["財源構成", missing],
          ["名称・所管の変更、統廃合", esc(project.changes?.join("／"))]])}
        <h3>事業の経過</h3>
        <ol class="civic-steps">${steps.map(([label, status]) => `<li${status ? " data-confirmed" : ""}>${annotate(label)}<br>${esc(status || missing)}</li>`).join("")}</ol>
        <ol class="civic-timeline">${project.timeline.map(step => `<li>${esc(step.date)} ${annotate(step.label)}（${link(step.source.label, step.source.url)}）</li>`).join("")}</ol>
        <h3>小事業の予算現額・決算・評価</h3>
        <p>令和6年度実施分。予算額は決算審査時の予算現額、評価は令和7年度事務事業評価の最終評価です。</p>
        <div class="civic-grid">${amounts.map(item => `<section class="civic-card"><h4>${esc(item.label)}</h4>
          <p>予算現額 ${money(item.budgetYen)}</p><progress max="${scale}" value="${item.budgetYen}" aria-label="${esc(item.label)}の予算現額"></progress>
          <p>決算額 ${money(item.settledYen)}</p><progress max="${scale}" value="${item.settledYen}" aria-label="${esc(item.label)}の決算額"></progress>
          ${terms([["執行率", esc(item.rate + "%")], ["最終評価", esc(item.evaluation)]])}${sources([item.source])}</section>`).join("")}</div>
        <h3>成果指標</h3>
        ${list((project.indicators || []).map(item => `${esc(item.year)} ${esc(item.label)} 実績 ${esc(item.actual + item.unit)}（目標 ${esc(item.target + item.unit)}） ${link(item.source.label, item.source.url)}`))}
        <p>${link("同年度の区全体の予算・決算", "yosan-kessan.html#fy-r06")}</p>
        <h3>関連議案</h3>${list(project.bills.map(id => link("議案 " + id.split(":")[1], "gian.html?" + new URLSearchParams({ id }))))}
        <h3>公式資料・行政評価</h3>${sources(project.sources)}
        ${review()}</article>`;
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function funding(root) {
    await Promise.all(["seimu", "seijishikin"].map(name => civic.loadScript("data/" + name + ".js")));
    const seimu = window.SHINAGAWA_SEIMU;
    const politics = window.SHINAGAWA_SEIJISHIKIN;
    const summary = data.seimuSummary;
    const activity = seimu.fiscalYears.flatMap(year => year.periods.flatMap(period => period.recipients.map(recipient => ({
      id: recipient.id, name: recipient.name, year: year.label, kind: recipient.kind, source: period.sourceUrl, links: recipient.documents
    }))));
    const reports = politics.organizations.flatMap(org => (org.reports || []).filter(report => report.url).map(report => ({
      id: org.id, name: org.name, year: report.year, kind: politics.categories.find(category => category.id === org.category)?.label || "政治団体",
      links: [{ label: "収支報告書", url: report.url }]
    })));
    root.innerHTML = `<p>収録されている報告書を探せます。令和7年度の政務活動費は会派別・費目別の集計額も確認できます。個別取引の構造化明細は未収録です。</p>
      <form class="civic-controls">${select("system", "制度", [["seimu", "政務活動費"], ["politics", "政治資金"]], query.get("system") || "seimu")}
      ${select("year", "期間", [["", "すべて"]])}${input("q", "会派・議員・政治団体")}${select("category", "費目集計", [["", "全費目"], ...summary.categories])}${select("cost", "表示順", [["year", "期間の新しい順"], ["amount", "収録支出額の多い順"]])}
      <button>絞り込む</button><button type="button" data-csv>絞り込み結果をCSVに保存</button></form>
      <p role="status"></p><div class="civic-grid" data-funding></div>`;
    const form = root.querySelector("form");
    const outlet = root.querySelector("[data-funding]");
    let rows = [];
    const render = () => {
      const system = form.elements.system.value;
      const source = system === "politics" ? reports : activity;
      const years = [...new Set(source.map(row => row.year))].sort((a, b) => b.localeCompare(a, "ja", { numeric: true }));
      const old = form.elements.year.value;
      form.elements.year.replaceChildren(new Option("すべて", ""), ...years.map(year => new Option(year, year)));
      form.elements.year.value = years.includes(old) ? old : "";
      form.elements.category.disabled = system === "politics";
      if (system === "politics") form.elements.category.value = "";
      const filter = filters(form);
      const categoryIndex = summary.categories.indexOf(filter.get("category"));
      const totals = new Map(summary.rows.map(row => [row[0], row.slice(1)]));
      rows = source.filter(row => (!filter.get("year") || row.year === filter.get("year")) && matches([row.name, row.kind], filter.get("q")))
        .map(row => ({ ...row, amounts: system === "seimu" ? totals.get(row.id) : null }))
        .filter(row => categoryIndex < 0 || row.amounts)
        .map(row => ({ ...row, category: categoryIndex < 0 ? null : summary.categories[categoryIndex], categoryAmount: row.amounts?.[2][categoryIndex] ?? null }))
        .sort((a, b) => filter.get("cost") === "amount" ? (b.categoryAmount ?? b.amounts?.[1] ?? -1) - (a.categoryAmount ?? a.amounts?.[1] ?? -1)
          : years.indexOf(a.year) - years.indexOf(b.year));
      root.querySelector("[role=status]").textContent = `該当する報告主体・期間 ${rows.length}件（画面は先頭60件を表示）`;
      outlet.innerHTML = rows.slice(0, 60).map(row => `<article class="civic-card"><h2>${esc(row.name)}</h2><p>${esc(row.year)} ／ ${esc(row.kind)}</p>
        ${row.amounts ? `<p>収入 ${money(row.amounts[0])} ／ 支出 ${money(row.amounts[1])}</p>${row.category ? `<p>${esc(row.category)} ${money(row.categoryAmount)}</p>` : ""}
          <details><summary>支出の内訳</summary>${list(row.amounts[2].map((amount, index) => `${esc(summary.categories[index])} ${money(amount)}
            <progress aria-label="${esc(summary.categories[index])}の支出割合" max="${row.amounts[1]}" value="${amount}"></progress>`))}${sources([summary.source])}</details>` : "<p>収支額の集計は未収録</p>"}
        ${sources(row.links)}</article>`).join("") || "<p>条件に一致する報告書はありません。</p>";
    };
    form.addEventListener("change", render);
    form.addEventListener("submit", event => { event.preventDefault(); render(); });
    root.querySelector("[data-csv]").addEventListener("click", () => {
      const items = rows.map(row => ({ 主体: row.name, 期間: row.year, 区分: row.kind, 収入円: row.amounts?.[0] ?? null, 支出円: row.amounts?.[1] ?? null, 費目: row.category, 費目集計円: row.categoryAmount, 資料: row.links.map(item => item.url).join(" "), 集計出典: row.amounts ? summary.source.url : null }));
      civic.download("shinagawa-funding.csv", civic.csv(items, ["主体", "期間", "区分", "収入円", "支出円", "費目", "費目集計円", "資料", "集計出典"]), "text/csv;charset=utf-8");
    });
    render();
  }

  window.SHINAGAWA_FINANCE = { fiscal, projects, funding };
})();
