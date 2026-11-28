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

  // 評価シートを収録している評価年度（新しい順）。データは data/jimujigyo-<key>.js
  const sheetYears = [["r07", "令和7年度評価"], ["r06", "令和6年度評価"], ["r05", "令和5年度評価"]];

  /** 小事業のID（例 r06-20-2）から評価年度のキーを取る。読めなければ最新年度。 @param {string|null} id @returns {string} */
  function sheetYearOf(id) {
    const key = String(id || "").split("-")[0];
    return sheetYears.some(([year]) => year === key) ? key : sheetYears[0][0];
  }

  /** 評価シートから読み取った小事業（1評価年度分）を読み込む。 @param {string} key @returns {Promise<object>} */
  async function sheetData(key) {
    const name = "SHINAGAWA_JIMUJIGYO_" + key.toUpperCase();
    if (!window[name]) await civic.loadScript(`data/jimujigyo-${key}.js`);
    return window[name];
  }

  /** 評価年度のキー（r07）から実施年度の表記（令和6年度）。 @param {string} key @returns {string} */
  function fiscalLabel(key) {
    return `令和${Number(key.slice(1)) - 1}年度`;
  }

  /** 同じ事業の年度ごとの推移（評価シートの生成時に、名前と会計が一意に対応した年度と、
   * 名称が変わっても目的・概要の文章がほぼ同じ年度だけ）。
   * @param {object} sheets @param {object} item @returns {string} */
  function historyTable(sheets, item) {
    if (!item.history?.length) {
      return `<p class="civic-note">ほかの年度の評価シートに、同じ事業は見つかりませんでした（新しい事業か、統合・分割などで対応が決められなかった可能性があります）。</p>`;
    }
    const current = { id: item.id, year: sheets.key, name: item.name, budgetYen: item.budgetYen, settledYen: item.settledYen, rate: item.rate, evaluation: item.evaluation?.code };
    const renamed = item.history.some(row => row.renamed);
    const rows = [current, ...item.history].sort((a, b) => b.year.localeCompare(a.year));
    return `<table class="civic-table"><caption>評価シートの小事業名と会計が一致したものを並べています。${renamed
      ? "名称が違う年度は、会計と担当課（または予算科目）が同じで、目的・概要の文章がほぼ同じことから同じ事業とみなしたものです。" : ""}</caption>
      <thead><tr><th scope="col">実施年度</th><th scope="col">予算現額</th><th scope="col">決算額</th><th scope="col">執行率</th><th scope="col">最終評価</th></tr></thead><tbody>
      ${rows.map(row => `<tr><th scope="row">${row.id === item.id ? `${esc(fiscalLabel(row.year))}（この頁）` : link(fiscalLabel(row.year), "jigyo.html?id=" + encodeURIComponent(row.id))}${row.renamed ? `<br><small>名称：${esc(row.name)}</small>` : ""}</th>
        <td>${money(row.budgetYen)}</td><td>${money(row.settledYen)}</td><td>${esc(rateText(row.rate))}</td><td>${esc(row.evaluation || missing)}</td></tr>`).join("")}
      </tbody></table>`;
  }

  /** この事業が属する年度・会計の予算議案（当初予算と補正予算）。 @param {object} sheets @param {object} item @returns {string} */
  function budgetBillsHtml(sheets, item) {
    const bills = sheets.budgetBills?.[item.kaikei] || [];
    const initial = bills.filter(bill => bill.kind === "当初予算");
    const revisions = bills.filter(bill => bill.kind === "補正予算");
    const row = bill => `${link(bill.title, "gian.html?" + new URLSearchParams({ id: bill.id }))}${bill.result ? "（" + esc(bill.result) + "）" : ""}`;
    if (!initial.length) return `<p class="civic-note">この年度・会計の予算議案は未収録です。</p>`;
    return `<p>この事業の予算は、${esc(sheets.fiscalYear)}の${esc(item.kaikei)}の予算として議会で議決されています。</p>
      ${terms([["当初予算", initial.map(row).join("<br>")]])}
      ${revisions.length ? `<details><summary>同じ年度・会計の補正予算（${revisions.length}件）</summary>
        <p class="civic-note">この事業の予算を補正したとは限りません。補正の内容は各議案の資料で確認してください。</p>${list(revisions.map(row))}</details>` : ""}
      <p class="civic-note">決算の認定は議案とは別に審査されるため、ここには載せていません。</p>`;
  }

  /** 評価対象の事業を実施した年度の予算・決算ページ（評価年度の前年度）。 @param {string} key @returns {string} */
  function fiscalPage(key) {
    return `yosan-kessan.html#fy-r${String(Number(key.slice(1)) - 1).padStart(2, "0")}`;
  }

  /**
   * この事業が根拠・目的に挙げる計画の意見募集（パブリックコメント）。照合データを読めなければ null を返し、欄ごと出さない。
   * @param {string} id 事業ごとの記録のID @returns {Promise<{item: object, field: string}[]|null>}
   */
  async function commentsFor(id) {
    const [comments, links] = await Promise.allSettled([civic.loadScript("data/public-comments.js"), civic.loadScript("data/public-comment-jigyo.js")]);
    if (comments.status === "rejected" || links.status === "rejected") {
      console.warn("意見募集との照合データを読み込めませんでした", comments.reason || links.reason);
      return null;
    }
    const items = new Map((window.SHINAGAWA_PUBLIC_COMMENTS?.items || []).map(item => [item.id, item]));
    return Object.entries(window.SHINAGAWA_PUBLIC_COMMENT_JIGYO?.items || {})
      // 記載欄は年度で違うことがあるので、この頁（id）の評価シートで書かれていた欄を使う
      .flatMap(([commentId, projects]) => projects.flatMap(entry => (entry.sheets || [{ id: entry.id, field: entry.field }])
        .filter(sheet => sheet.id === id).map(sheet => ({ item: items.get(commentId), field: sheet.field }))))
      .filter(entry => entry.item)
      .sort((a, b) => b.item.id.localeCompare(a.item.id));
  }

  /** 手でつないだ記録のうち、この小事業（評価シートの頁）を含むもの。 @param {object} sheet @returns {object|undefined} */
  function curatedFor(sheet) {
    return data.projects.find(project => (project.finance || []).some(item => item.source?.url === sheet.source.url));
  }

  /** @param {object|null} evaluation @returns {string} */
  function evaluationText(evaluation) {
    return evaluation ? `${evaluation.code} ${evaluation.label}` : missing;
  }

  /** @param {number|null} value @returns {string} */
  function rateText(value) {
    return Number.isFinite(value) ? value.toFixed(1) + "%" : missing;
  }

  /** 事業ごとの記録の一覧（評価シート全件＋手でつないだ記録）。 @param {HTMLElement} root @param {object} sheets @returns {void} */
  function projectList(root, sheets) {
    const years = sheetYears.map(([key, label]) => key === sheets.key
      ? `<strong aria-current="page">${esc(label)}</strong>` : link(label, "jigyo.html?year=" + key));
    const departments = [...new Set(sheets.projects.map(item => item.department))];
    const accounts = [...new Set(sheets.projects.map(item => item.kaikei).filter(Boolean))];
    const codes = Object.entries({ A: "A 拡大", B: "B 継続", C: "C 改善・見直し", D: "D 完了・廃止" });
    const pageSize = 50;
    root.innerHTML = `<p>品川区の${esc(sheets.evaluationYear)}事務事業評価で評価された、${esc(sheets.fiscalYear)}実施の${sheets.count}事業（小事業）を、事業ごとに見られます。
        予算現額・決算額・執行率・成果指標・最終評価は、区が公開している評価シート（PDF）から機械的に読み取った値です。各事業の評価シートの該当頁へのリンクを付けています。</p>
      <p class="civic-note">これは区の事務事業評価そのものではなく、その結果を事業ごとに引けるようにした当サイトの記録です。年度ごとの評価資料は${link("事務事業評価", "gyosei.html")}を見てください。</p>
      <h2>議案などとつないだ記録</h2>
      ${list(data.projects.map(item => link(item.name, "jigyo.html?id=" + encodeURIComponent(item.id))))}
      <h2>${esc(sheets.evaluationYear)}評価の全事業</h2>
      <nav aria-label="評価年度"><p>評価年度：${years.join(" ／ ")}</p></nav>
      <form class="civic-controls">${input("q", "事業名・目的", query.get("q") || "")}
        ${select("department", "部署", [["", "すべて"], ...departments], query.get("department") || "")}
        ${select("evaluation", "最終評価", [["", "すべて"], ...codes], query.get("evaluation") || "")}
        ${select("kaikei", "会計", [["", "すべて"], ...accounts], query.get("kaikei") || "")}
        ${select("sort", "並び順", [["sheet", "評価シートの順"], ["budget", "予算現額の多い順"], ["rate", "執行率の低い順"]], query.get("sort") || "sheet")}</form>
      <p role="status" data-count></p><div class="civic-results" data-results></div>
      <p><button type="button" data-more hidden>さらに表示</button></p>
      <p>${link("年度別予算・決算", "yosan-kessan.html")}</p>`;
    const form = root.querySelector("form");
    const results = root.querySelector("[data-results]");
    const count = root.querySelector("[data-count]");
    const more = root.querySelector("[data-more]");
    let shown = pageSize;
    let rows = [];
    const draw = () => {
      results.innerHTML = rows.slice(0, shown).map(item => `<section class="civic-result-row">
          <div><h3>${link(item.name, "jigyo.html?id=" + encodeURIComponent(item.id))}</h3><p>${esc(item.department)} ${esc(item.section)}</p></div>
          <p>予算現額 ${money(item.budgetYen)}<br>決算額 ${money(item.settledYen)}（執行率 ${rateText(item.rate)}）</p>
          <p class="civic-result-row__result">${esc(evaluationText(item.evaluation))}</p></section>`).join("");
      more.hidden = rows.length <= shown;
    };
    const render = () => {
      const settings = filters(form);
      const sort = settings.get("sort");
      rows = sheets.projects.filter(item =>
        (!settings.get("department") || item.department === settings.get("department")) &&
        (!settings.get("evaluation") || item.evaluation?.code === settings.get("evaluation")) &&
        (!settings.get("kaikei") || item.kaikei === settings.get("kaikei")) &&
        matches([item.name, item.jigyo, item.purpose, item.overview, item.section], settings.get("q")));
      if (sort === "budget") rows = [...rows].sort((a, b) => (b.budgetYen ?? -1) - (a.budgetYen ?? -1));
      const before = rows.length;
      if (sort === "rate") rows = [...rows].filter(item => item.budgetYen > 0 && Number.isFinite(item.rate)).sort((a, b) => a.rate - b.rate);
      shown = pageSize;
      const excluded = before - rows.length;
      count.textContent = `${rows.length}件${excluded ? `（執行率を出せない${excluded}件を除く）` : ""}`;
      draw();
    };
    form.addEventListener("input", render);
    form.addEventListener("submit", event => event.preventDefault());
    more.addEventListener("click", () => { shown += pageSize; draw(); });
    render();
  }

  /** 評価シート1頁分（小事業）の記録。 @param {HTMLElement} root @param {object} sheets @param {object} item @param {{item: object, field: string}[]|null} comments @returns {void} */
  function sheetProject(root, sheets, item, comments) {
    // 意見募集とつながる事業は652件中20件ほど。該当のない頁に「見つかりません」を並べないよう、あるときだけ出す
    const commentSection = !comments?.length ? "" : `<h3>この事業が挙げる計画の意見募集</h3>
        ${list(comments.map(entry => `${link(entry.item.title, "kumin-no-koe.html?nendo=" + entry.item.fiscalYear + "#pc-" + entry.item.id)}（案件番号${esc(entry.item.id)}・評価シートの${esc(entry.field)}に記載）`))}
        <p class="civic-note">評価シートの根拠法令等・目的・概要に計画名が書かれているものを自動で照合しています。</p>`;
    const curated = curatedFor(item);
    const scale = Math.max(1, item.budgetYen || 0, item.settledYen || 0);
    const evaluation = item.evaluation;
    root.innerHTML = `<p>${link("事業一覧", "jigyo.html")} ／ ${link("事業をフォロー", "follow.html?" + new URLSearchParams({ kind: "事業", value: item.name }))}</p>
      <article><h2>${esc(item.name)}</h2>
        <p class="civic-note">${esc(item.source.label.replace(/（.*$/, ""))}（${esc(sheets.fiscalYear)}実施事業）から機械的に読み取った内容です。正確な内容は${link("評価シートの該当頁", item.source.url)}で確認してください。</p>
        ${curated ? `<p>${link(curated.name + "の記録（議案・経過とつないだもの）", "jigyo.html?id=" + encodeURIComponent(curated.id))}</p>` : ""}
        ${terms([["目的", annotate(item.purpose)], ["概要", annotate(item.overview)],
          ["所管", esc([item.department, item.section, item.unit].filter(Boolean).join(" "))],
          ["会計", esc(item.kaikei)],
          ["予算科目", esc([item.account?.kan, item.account?.kou, item.account?.moku, item.jigyo].filter(Boolean).join(" ＞ "))],
          ["政策の柱", esc(item.pillar)], ["事業期間", esc(item.period)], ["根拠法令・要綱", annotate(item.legal)]])}
        <h3>${esc(sheets.fiscalYear)}の予算と決算</h3>
        <section class="civic-project-row">
          <p>予算現額 ${money(item.budgetYen)}</p><progress max="${scale}" value="${item.budgetYen || 0}" aria-label="予算現額"></progress>
          <p>決算額 ${money(item.settledYen)}</p><progress max="${scale}" value="${item.settledYen || 0}" aria-label="決算額"></progress>
          ${terms([["執行率", esc(rateText(item.rate))], ["翌年度繰越額", money(item.carryYen)], ["不用額", money(item.unusedYen)]])}</section>
        <h3>年度ごとの推移</h3>
        ${historyTable(sheets, item)}
        <h3>議会で議決した予算</h3>
        ${budgetBillsHtml(sheets, item)}
        <h3>成果指標（${esc(sheets.fiscalYear)}）</h3>
        ${item.indicators.length ? `<table class="civic-table"><thead><tr><th scope="col">指標</th><th scope="col">目標</th><th scope="col">実績</th><th scope="col">最終目標</th></tr></thead><tbody>
          ${item.indicators.map(row => `<tr><th scope="row">${esc(row.label)}${row.definition ? `<br><small>${esc(row.definition)}</small>` : ""}</th>
            <td>${esc(row.target ? row.target + row.unit : "－")}</td><td>${esc(row.actual ? row.actual + row.unit : "－")}</td><td>${esc(row.goal ? row.goal + row.unit : "－")}</td></tr>`).join("")}</tbody></table>`
          : `<p class="civic-note">評価シートに指標の記載がありません。</p>`}
        <h3>最終評価（${esc(sheets.evaluationYear)}）</h3>
        ${terms([["評価結果", esc(evaluationText(evaluation))],
          // 令和5年度評価の様式には「今後の取組の方向性」の欄が無い
          ["今後の方向性", esc(evaluation?.direction || (evaluation ? "評価シートに記載欄なし" : ""))]])}
        ${commentSection}
        <h3>出典</h3>${sources([item.source, { label: `${sheets.evaluationYear}事務事業評価結果（品川区）`, url: sheets.resultUrl }])}
        <p>${link(sheets.fiscalYear + "の区全体の予算・決算", fiscalPage(sheets.key))} ／ ${link(sheets.evaluationYear + "評価の全事業", "jigyo.html?year=" + sheets.key)} ／ ${link("年度別の事務事業評価", "gyosei.html")}</p>
        ${review({ ai: false })}</article>`;
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function projects(root) {
    const id = query.get("id");
    const project = data.projects.find(item => item.id === id);
    if (!project) {
      const sheets = await sheetData(id ? sheetYearOf(id) : sheetYearOf(query.get("year")));
      const sheet = id ? sheets.projects.find(item => item.id === id) : null;
      if (sheet) return sheetProject(root, sheets, sheet, await commentsFor(sheet.id));
      projectList(root, sheets);
      if (id) root.insertAdjacentHTML("afterbegin", `<p role="alert">指定された事業は未収録です。</p>`);
      return;
    }
    const amounts = project.finance || [];
    const scale = Math.max(1, ...amounts.map(item => Math.max(item.budgetYen, item.settledYen)));
    const steps = [
      ["予算編成", ""], ["議会審議", "設置条例案（関連議案）"], ["予算成立", ""],
      ["事業実施", "事業の経過を参照"], ["決算", "事業別会計を参照"],
      ["事務事業評価", "最終評価を参照"], ["次年度予算", ""]
    ];
    const sheetIds = amounts.map(item => item.source?.url?.match(/_(\d+)\.pdf#page=(\d+)$/)).map(m => m ? `r07-${m[1]}-${m[2]}` : "");
    root.innerHTML = `<p>${link("事業一覧", "jigyo.html")} ／ ${link("事業をフォロー", "follow.html?" + new URLSearchParams({ kind: "事業", value: project.name }))}</p>
      <article><h2>${esc(project.name)}</h2>
        ${terms([["目的", annotate(project.purpose)], ["所管", esc(project.office)], ["対象者", annotate(project.audience)],
          ["根拠法令・条例", annotate(project.legal)], ["開始年度", esc(project.startYear)],
          ["財源構成", missing],
          ["名称・所管の変更、統廃合", esc(project.changes?.join("／"))]])}
        <h3>事業の経過</h3>
        <ol class="civic-steps">${steps.map(([label, status]) => `<li${status ? " data-confirmed" : ""}>${annotate(label)}<br>${esc(status || missing)}</li>`).join("")}</ol>
        <ol class="civic-timeline">${project.timeline.map(step => `<li>${esc(step.date)} ${annotate(step.label)}（${link(step.source.label, step.source.url)}）</li>`).join("")}</ol>
        <h3>小事業の予算現額・決算・評価</h3>
        <p>令和6年度実施分。予算額は決算審査時の予算現額、評価は令和7年度事務事業評価の最終評価です。</p>
        <div class="civic-results">${amounts.map((item, index) => `<section class="civic-project-row"><h4>${sheetIds[index] ? link(item.label, "jigyo.html?id=" + sheetIds[index]) : esc(item.label)}</h4>
          <p>予算現額 ${money(item.budgetYen)}</p><progress max="${scale}" value="${item.budgetYen}" aria-label="${esc(item.label)}の予算現額"></progress>
          <p>決算額 ${money(item.settledYen)}</p><progress max="${scale}" value="${item.settledYen}" aria-label="${esc(item.label)}の決算額"></progress>
          ${terms([["執行率", esc(item.rate + "%")], ["最終評価", esc(item.evaluation)]])}${sources([item.source])}</section>`).join("")}</div>
        <h3>成果指標</h3>
        ${list((project.indicators || []).map(item => `${esc(item.year)} ${esc(item.label)} 実績 ${esc(item.actual + item.unit)}（目標 ${esc(item.target + item.unit)}） ${link(item.source.label, item.source.url)}`))}
        <p>${link("同年度の区全体の予算・決算", "yosan-kessan.html#fy-r06")}</p>
        <h3>関連議案</h3>${list(project.bills.map(id => link("議案 " + id.split(":")[1], "gian.html?" + new URLSearchParams({ id }))))}
        <h3>公式資料・事務事業評価</h3>${sources(project.sources)}
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
