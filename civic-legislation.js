(() => {
  "use strict";
  const civic = window.SHINAGAWA_CIVIC;
  const data = window.SHINAGAWA_CIVIC_SOURCES;
  const { esc, link, sources, list, terms, select, input, filters, matches, annotate, review, showError, missing } = window.SHINAGAWA_CIVIC_UI;
  const db = window.SHINAGAWA_DB;
  const params = new URLSearchParams(location.search);
  const councilCalendar = "https://gikai.city.shinagawa.tokyo.jp/katsudou/result";

  const voteNames = { "〇": "賛成", "×": "反対", "欠": "欠席", "－": "退席", "除": "除斥", "棄": "棄権", "長": "議長・表決不参加" };
  const groupNames = {
    自民: "品川区議会自民党・無所属の会", 公明: "品川区議会公明党",
    未来: "しながわ未来", 共産: "日本共産党品川区議団", 品改: "品川改革連合", 維新: "品川区議会日本維新の会"
  };

  /** @param {object} vote @returns {string} */
  function voteBreakdown(vote) {
    const people = new Map(db.peopleData.people.map(person => [person.id, person.name]));
    const groups = new Map();
    data.voteRoster.forEach(({ group, memberId }, index) => {
      const result = voteNames[vote.symbols[index]] || "不明";
      const groupVotes = groups.get(group) || [];
      groupVotes.push({ name: people.get(memberId) || memberId, memberId, result });
      groups.set(group, groupVotes);
    });
    return [...groups].map(([group, entries]) => {
      const totals = new Map();
      entries.forEach(entry => totals.set(entry.result, (totals.get(entry.result) || 0) + 1));
      const counts = [...totals].map(([label, count]) => label + count + "人").join("・");
      const label = group === "無所属" ? "無所属議員の個人票" : groupNames[group] + "の所属議員";
      return `<details><summary>${esc(label)}${group === "無所属" ? "" : " 　" + esc(counts)}</summary>${list(entries.map(entry => link(entry.name, "giin-katsudo.html?" + new URLSearchParams({ id: entry.memberId, year: "r07" })) + "　" + esc(entry.result)))}</details>`;
    }).join("");
  }

  /** @param {object} bill @returns {string} */
  function billDetail(bill) {
    const configured = data.billDetails?.[bill.id] || {};
    const steps = [
      ["提出", bill.proposer], ["上程", bill.introducedOn],
      ["委員会付託", bill.referral], ["審査", bill.committeeResult],
      ["表決", bill.voteDate], ["結果", bill.result]
    ];
    const proof = bill.links || [];
    const original = proof.find(item => item.label.includes("PDF")) || proof[0];
    const sameSession = civic.bills().filter(item => item.meetingId === bill.meetingId && item.id !== bill.id);
    const fields = [
      ["主なポイント", configured.points], ["提案の背景・理由", configured.background],
      ["現行制度からの変更点", configured.changes], ["主な論点", configured.issues],
      ["議会で表明された意見", configured.statements], ["一般に想定される論点", configured.questionsForDiscussion],
      ["区民生活への影響", configured.impact], ["影響を受ける人・団体", configured.affected],
      ["財政的な影響", configured.cost], ["よくある質問", configured.faq]
    ];
    return `<p>${link("議案一覧", "gian.html?year=" + bill.yearId)} ／ ${link(bill.meeting?.name || "会議のまとめ", "kaigi.html?year=" + bill.yearId + "&meeting=" + bill.meetingId)}</p>
      <article class="civic-card">
      <h2>${esc(bill.title)}</h2>
      ${terms([["議案番号", esc(bill.number)], ["提出者", esc(bill.proposer)], ["提出日", esc(configured.timeline?.find(item => item.label.includes("提出"))?.date || bill.submittedOn)], ["議決結果", annotate(bill.result || missing)]])}
      <p>${link("この議案をフォロー", "follow.html?" + new URLSearchParams({ kind: "議案", value: bill.id }))}</p>
      <h3>議案の概要</h3>
      ${configured.easy || configured.detail
        ? Object.entries({ easy: configured.easy, standard: bill.summary, detail: configured.detail }).map(([level, value]) =>
          `<p data-reading-copy="${level}">${annotate(value || bill.summary || missing)}</p>`).join("")
        : `<p>${annotate(bill.summary || missing)}</p>`}
      <details><summary>原資料を確認する</summary><p>${original ? link(original.label, original.url) : missing}</p></details>
      ${fields.map(([title, value]) => `<h3>${esc(title)}</h3><p>${annotate(value || missing)}</p>`).join("")}
      <h3>審議経過・議決結果</h3>
      <ol class="civic-steps">${steps.map(([label, value]) => `<li${value ? " data-confirmed" : ""}>${annotate(label)}<br>${annotate(value || missing)}</li>`).join("")}</ol>
      <h3>案件別の時系列</h3>
      ${list((configured.timeline || []).map(item => `${esc(item.date)} ${esc(item.planned ? "予定" : "実績")} ${link(item.label, item.url)}`), "案件別の日付は未収録")}
      <h3>関連資料</h3>${sources(configured.related)}
      <p>${link("表決資料を探す", "sanpi.html?" + new URLSearchParams({ year: bill.yearId, meeting: bill.meetingId, q: bill.number }))}</p>
      <details><summary>同じ会議の議案（${sameSession.length}件）</summary>${list(sameSession.map(item => link(item.title, civic.billUrl(item))))}</details>
      <h3>公式資料・出典</h3>${sources([...proof, ...data.reviewedSources?.[bill.id] || []])}
      ${review(data.reviews[bill.id])}</article>`;
  }

  /** @param {HTMLFormElement} form @param {string} name @param {string[]} values @param {string} heading @param {string|null} [initial] @returns {void} */
  function makeOptions(form, name, values, heading, initial) {
    const field = form.elements[name];
    const value = initial ?? field.value;
    field.innerHTML = `<option value="">${esc(heading)}</option>` + [...new Set(values.filter(Boolean))]
      .map(item => `<option value="${esc(item)}">${esc(item)}</option>`).join("");
    field.value = [...field.options].some(option => option.value === value) ? value : "";
  }

  /** @param {HTMLElement} root @param {boolean} matrix @returns {Promise<void>} */
  async function legislation(root, matrix) {
    const directId = matrix ? "" : params.get("id");
    const available = db.site.years.filter(year => year.available);
    const requested = directId ? directId.split(":")[0]?.split("-")[0] : params.get("year");
    const firstVoteYear = Object.keys(data.votes)[0]?.split("-")[0];
    const defaultYear = matrix && available.some(year => year.id === firstVoteYear) ? firstVoteYear : available[0].id;
    const yearId = available.some(year => year.id === requested) ? requested : defaultYear;
    await Promise.all([civic.loadYears([yearId]), matrix ? civic.loadScript("data/people.js") : Promise.resolve()]);
    if (directId) {
      const bill = civic.bills().find(item => item.id === directId);
      root.innerHTML = bill ? billDetail(bill) : `<p>指定された議案は収録されていません。</p><p>${link("議案一覧", "gian.html")}</p>`;
      if (bill) document.title = bill.title + " | 品川区議会DB";
      return;
    }
    const initial = params.get("year") === "all" ? "all" : yearId;
    root.innerHTML = `<p>${matrix ? "令和7年第1回定例会の公式表決資料1頁を収録しています。会派別の数値は表決時に所属していた議員の票の内訳です。全会一致の絞り込みは表決した全員が賛成の議案を表示します。" : "会期ごとの議案、議決結果、公式資料を確認できます。"}</p>
      <form class="civic-controls">
      ${select("year", "暦年", [["all", "全収録年"], ...available.map(year => [year.id, year.label])], initial)}
      ${select("meeting", "会議", [""])}
      ${select("tag", "種別", [""])}
      ${select("policy", "政策分野", [""])}
      ${select("result", matrix ? "賛否" : "議決結果", matrix ? [["", "すべて"], ["split", "賛否が割れた"], ["unanimous", "全会一致（表決参加者）"]] : [""], params.get("result") || "")}
      ${input("q", "件名・議案番号", params.get("q") || "")}
      <button>絞り込む</button></form><p role="status"></p><div class="civic-stack" data-results></div>
      <button type="button" data-more hidden>さらに表示</button>`;
    const form = root.querySelector("form");
    const status = root.querySelector("[role=status]");
    const result = root.querySelector("[data-results]");
    const more = root.querySelector("[data-more]");
    let limit = 30;
    let currentRequest = 0;
    let initialFilters = params;
    const render = async () => {
      const request = ++currentRequest;
      const selection = form.elements.year.value;
      status.textContent = "議案を読み込んでいます。";
      try {
        await civic.loadYears(selection === "all" ? undefined : [selection]);
        if (request !== currentRequest) return;
        const rows = civic.bills().filter(item => selection === "all" || item.yearId === selection);
        makeOptions(form, "meeting", rows.map(item => item.meetingId), "すべての会議", initialFilters?.get("meeting"));
        for (const option of form.elements.meeting.options) {
          option.textContent = rows.find(item => item.meetingId === option.value)?.meeting?.name || option.textContent;
        }
        makeOptions(form, "tag", rows.flatMap(item => item.tags || []), "すべての種別", initialFilters?.get("tag"));
        makeOptions(form, "policy", rows.map(item => data.billDetails[item.id]?.policy || "分野未収録"), "すべての分野", initialFilters?.get("policy"));
        if (!matrix) makeOptions(form, "result", rows.map(item => item.result), "すべての議決結果", initialFilters?.get("result"));
        initialFilters = null;
        const filter = filters(form);
        const filtered = rows.filter(item => (!filter.get("meeting") || item.meetingId === filter.get("meeting"))
          && (!filter.get("tag") || item.tags?.includes(filter.get("tag")))
          && (!filter.get("policy") || (data.billDetails[item.id]?.policy || "分野未収録") === filter.get("policy"))
          && (!filter.get("result") || (matrix ? data.votes[item.id]?.type : item.result) === filter.get("result"))
          && matches([item.number, item.title, item.summary], filter.get("q")));
        const text = matrix && filter.get("result") === "unanimous" ? "全会一致を確認できた案件は未収録です。" : "条件に一致する収録データがありません。";
        result.innerHTML = filtered.slice(0, limit).map(item => {
          const vote = data.votes[item.id];
          const voteLinks = (item.meeting?.links || []).filter(source => source.label.includes("賛否"));
          return `<article class="civic-card"><h2>${link(item.title, civic.billUrl(item))}</h2>
            <p>${esc([item.meeting?.name, item.number, item.result || "議決結果未収録"].filter(Boolean).join(" ／ "))}</p>
            ${matrix ? `<p>${vote ? (vote.type === "split" ? "賛成・反対の票を確認" : "表決参加者が全員賛成") : "賛否の内訳未収録"}</p>${sources(vote ? [{ ...data.voteSource, locator: vote.locator }] : voteLinks)}${vote ? voteBreakdown(vote) : ""}` : ""}</article>`;
        }).join("") || `<p>${esc(text)}</p>`;
        status.textContent = `${filtered.length.toLocaleString("ja-JP")}件中 ${Math.min(limit, filtered.length)}件を表示`;
        more.hidden = filtered.length <= limit;
      } catch (error) {
        if (request === currentRequest) {
          status.textContent = "";
          more.hidden = true;
          showError(result, error);
        }
      }
    };
    form.addEventListener("submit", event => { event.preventDefault(); limit = 30; render(); });
    form.addEventListener("change", () => { limit = 30; render(); });
    more.addEventListener("click", () => { limit += 30; render(); });
    await render();
  }

  /** @param {HTMLElement} root @returns {void} */
  function session(root) {
    const date = civic.today();
    const candidates = data.sessions.filter(item => item.end >= date).sort((a, b) => a.start.localeCompare(b.start));
    const current = candidates.find(item => item.start <= date) || candidates[0];
    if (!current) {
      root.innerHTML = `<h2>区議会の会期</h2><p>次回の会期は未収録です。</p><p>${link("公式日程", councilCalendar)}</p>`;
      return;
    }
    const info = civic.sessionProgress(current, date);
    root.innerHTML = `<h2>${esc(current.name)}</h2><p>${esc(current.start)} 〜 ${esc(current.end)}（公式予定）</p>
      <p><time datetime="${date}">${date}</time>（日本時間）</p>
      <p>${info.state === "upcoming" ? `開会まであと${info.daysUntil}日` : `会期${info.day}日目（全${info.duration}日）、あと${info.remaining}日`}</p>
      ${info.state === "active" ? `<progress value="${info.day}" max="${info.duration}" aria-label="予定会期の暦日の経過率"></progress><p>予定会期の暦日の経過率 ${info.percent}%</p>` : ""}
      <details><summary>会期前後と会期中の日程</summary>${list(current.events.map(([day, label]) => `<time datetime="${esc(day)}">${esc(day)}</time> ${esc(label)}（公式予定）`))}</details>
      <p>${link("公式日程", current.source.url)} ／ ${link("議案トラッカー", "gian.html")}</p>`;
  }

  /** @param {object} item @returns {string} */
  function petition(item) {
    const followup = data.petitionFollowup[item.id] || [];
    const stages = ["議会からの意見書", "行政による対応", "予算化", "事業実施", "実施結果", "継続的な課題"];
    return `<section class="civic civic-card"><h3>${annotate("請願・陳情のその後")}</h3>
      <p>議会の議決結果は上の審査経過、要望の実施状況は下の行政資料で確認できます。</p>
      ${terms(stages.map(stage => [stage, followup.filter(entry => entry.stage === stage)
        .map(entry => `${esc(entry.date)} ${annotate(entry.text)} ${link(entry.source.label, entry.source.url)}${entry.relation ? " ／ " + link(entry.relation.label, entry.relation.url) : ""}`).join("<br>")]))}
      ${review(data.reviews[item.id])}</section>`;
  }
  window.SHINAGAWA_LEGISLATION = { legislation, session, petition, voteNames };
})();
