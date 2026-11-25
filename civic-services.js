(() => {
  "use strict";
  const db = window.SHINAGAWA_DB;
  const civic = window.SHINAGAWA_CIVIC;
  const data = window.SHINAGAWA_CIVIC_SOURCES;
  const { datasets, dataset, load } = window.SHINAGAWA_CATALOG;
  const { esc, link, list, sources, terms, select, input, filters, matches, showError } = window.SHINAGAWA_CIVIC_UI;
  const { glossary, pages } = window.SHINAGAWA_CIVIC_CONTENT;
  const params = new URLSearchParams(location.search);

  /** @param {HTMLElement} root @returns {void} */
  function tools(root) {
    root.innerHTML = '<div class="civic-grid">' + pages.map(([title, url, description]) =>
      `<article class="civic-card"><h2>${link(title, url)}</h2><p>${esc(description)}</p></article>`).join("") + "</div>";
  }

  /** @param {HTMLElement} root @returns {void} */
  function dictionary(root) {
    root.innerHTML = `<form class="civic-controls">${input("q", "用語・読み方・説明", params.get("q") || "")}<button>検索</button></form><div data-definitions></div>`;
    const form = root.querySelector("form");
    const result = root.querySelector("[data-definitions]");
    const render = () => {
      const entries = glossary.filter(item => matches(item, form.elements.q.value));
      result.innerHTML = entries.map(([word, reading, description, related]) => `<article class="civic-card">
        <h2><ruby>${esc(word)}<rt>${esc(reading)}</rt></ruby></h2><p>${esc(reading)} ／ ${esc(description)}</p>
        <p>関連用語 ${link(related, "yogo.html?q=" + encodeURIComponent(related))}</p></article>`).join("") || "<p>該当する用語はありません。</p>";
    };
    form.addEventListener("submit", event => { event.preventDefault(); render(); });
    form.addEventListener("input", render);
    render();
  }

  /** @param {HTMLElement} root @returns {void} */
  function exportsPage(root) {
    root.innerHTML = `<p>出力対象は件名・出典等のメタデータと集計済みの事実です。資料本文・画像・連絡先は含みません。再配布の際は各出典の利用条件をご確認ください。</p>
      <p>${link("品川区議会の著作権案内", "https://gikai.city.shinagawa.tokyo.jp/copyright")}</p>
      <form class="civic-controls">
      ${select("dataset", "データセット", Object.entries(datasets).map(([key, value]) => [key, value.label]))}
      ${input("q", "件名・対象期間・結果")}
      ${select("format", "形式", [["csv", "CSV（BOM付きUTF-8）"], ["json", "JSON"]])}
      <button>絞り込みを保存</button><button type="button" data-all>選んだデータセットの全件を保存</button>
      <button type="button" data-package>全データセットをJSONで保存</button></form>
      <p role="status"></p><div data-errors></div>
      <h2>主な項目</h2>${terms([["id", "サイト内識別子"], ["title", "件名・氏名など"], ["period", "対象期間"], ["url", "サイト内の参照先"], ["source", "公式資料等のURL"], ["updated", "台帳に記された更新日"], ["result", "議決結果・種別など"], ["金額・票数", "項目値に記載された単位"], ["空欄・null", "値を収録していない項目"]])}`;
    const form = root.querySelector("form");
    const status = root.querySelector("[role=status]");
    const errorBox = root.querySelector("[data-errors]");
    const save = async (all, archive = false) => {
      const buttons = [...form.querySelectorAll("button")];
      const settings = filters(form);
      const key = settings.get("dataset");
      errorBox.replaceChildren();
      status.textContent = "データを読み込んでいます。";
      buttons.forEach(button => { button.disabled = true; });
      try {
        if (archive) {
          const entries = await Promise.all(Object.keys(datasets).map(async id => [id, await dataset(id)]));
          civic.download("shinagawa-data.json", JSON.stringify(Object.fromEntries(entries), null, 2), "application/json");
          status.textContent = `全${entries.length}種を保存しました。`;
        } else {
          const full = await dataset(key);
          const rows = all ? full : full.filter(item => matches([item.title, item.period, item.result], settings.get("q")));
          const format = settings.get("format");
          if (format === "csv") civic.download(`shinagawa-${key}.csv`, civic.csv(rows, Object.keys(full[0] || {})), "text/csv;charset=utf-8");
          else civic.download(`shinagawa-${key}.json`, JSON.stringify(rows, null, 2), "application/json");
          status.textContent = `${rows.length}件の保存を開始しました。`;
        }
      } catch (error) {
        status.textContent = "";
        showError(errorBox, error);
      } finally {
        buttons.forEach(button => { button.disabled = false; });
      }
    };
    form.addEventListener("submit", event => { event.preventDefault(); save(false); });
    form.querySelector("[data-all]").addEventListener("click", () => save(true));
    form.querySelector("[data-package]").addEventListener("click", () => save(true, true));
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function statusPage(root) {
    await Promise.all([civic.loadYears(), load(["members", "petitions", "fiscal", "gyosei", "seimu", "seijishikin", "events", "news-items"])]);
    const byYear = db.site.years.filter(meta => db.years[meta.id]).map(meta => db.years[meta.id]);
    const news = window.SHINAGAWA_NEWS;
    const petitions = window.SHINAGAWA_PETITIONS;
    const seimu = window.SHINAGAWA_SEIMU;
    const funding = window.SHINAGAWA_SEIJISHIKIN;
    const events = window.SHINAGAWA_EVENTS;
    const fetched = news.reports.filter(item => item.status === "ok" && item.fetchedAt).map(item => item.fetchedAt).sort().at(-1);
    const count = new Intl.NumberFormat("ja-JP");
    const cards = [
      ["議案", civic.bills().length, "gian.html", byYear.filter(item => item.bills?.length).map(item => item.label).reverse().join("、"), null, null],
      ["請願・陳情", petitions.items.length, "seigan.html", "受理年は案件ごとに確認できます", null, null],
      ["現職区議名簿", db.membersData.members.length, "giin.html", null, db.membersData.updatedAt, null],
      ["財政資料", db.fiscalData.fiscalYears.length, "yosan-kessan.html", "年度数", db.fiscalData.updatedAt, null],
      ["行政評価", window.SHINAGAWA_GYOSEI.fiscalYears.length, "gyosei.html", "年度数", window.SHINAGAWA_GYOSEI.updatedAt, null],
      ["政務活動費", seimu.fiscalYears.length, "seimu.html", "年度数", null, seimu.checkedAt],
      ["政治資金", funding.organizations.length, "seijishikin.html", "団体数", null, funding.checkedAt],
      ["ニュース", news.items.length, "https://shinagawakugiakidb.firebaseapp.com/news.html", null, null, fetched],
      ["イベント", events.events.length, "https://shinagawakugiakidb.firebaseapp.com/events.html", null, null, null]
    ];
    root.innerHTML = `<div class="civic-grid">${cards.map(([label, total, url, period, update, retrieved]) => `<article class="civic-card">
      <h2>${link(label, url)}</h2><p>収録数 ${count.format(total)}</p>
      ${terms([["対象範囲", esc(period)], ["台帳の内容更新日", esc(update)], ["取得・確認の記録", esc(retrieved)]])}</article>`).join("")}</div>
      <h2>議案データの年別更新記録</h2>${list(byYear.filter(item => item.bills?.length).map(item => esc(item.label + "　" + (item.updatedAt || "更新日未収録"))))}
      <p>案件別の審議日、表決の内訳、事業別の決算額などには未収録の項目があります。</p>`;
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function follow(root) {
    const key = "shinagawa-civic-follow-v1";
    let state = { follows: [], read: [] };
    let warning = "";
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "null");
      if (saved && Array.isArray(saved.follows) && Array.isArray(saved.read)) state = saved;
    } catch (error) {
      console.warn("フォロー設定を読み込めません。", error);
      warning = "フォロー設定を読み込めませんでした。";
    }
    const kinds = ["議員", "会派", "議案", "事業", "地域", "政策分野", "キーワード"];
    const initialKey = params.get("value") || "";
    const billFollows = state.follows.filter(item => item.kind === "議案").map(item => item.value);
    if (params.get("kind") === "議案") billFollows.push(initialKey);
    const billYears = billFollows.filter(value => typeof value === "string").map(value => value.match(/^([rh]\d{2})-[^:]+:/)?.[1]).filter(Boolean);
    await Promise.all([load(["news-items"]), civic.loadYears([...new Set([db.site.defaultYear, ...billYears])])]);
    const bills = civic.bills();
    const feed = [
      ...window.SHINAGAWA_NEWS.items.map(item => ({
        id: "news:" + item.id, title: item.title, url: item.url, date: item.publishedAt?.slice(0, 10),
        body: [item.tags, item.locations, item.summary], note: item.dateKind === "collected" ? "取得日" : "公開日"
      })),
      ...bills.map(item => ({ id: item.id, title: item.title, url: civic.billUrl(item), date: item.updatedAt,
        body: [item.tags, item.proposer, item.summary], note: "年別台帳の更新日", type: "議案" }))
    ].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    const initialTitle = bills.find(item => item.id === initialKey)?.title || initialKey;
    root.innerHTML = `<p>フォローと既読はこのブラウザ内に保存します。新着は収録されたニュース、直近年の議案とフォローした議案から探します。</p>
      <form class="civic-controls">${select("kind", "フォロー対象", kinds, params.get("kind") || "キーワード")}
      ${input("value", "対象・キーワード", initialTitle)}<button>フォローする</button></form>
      <p role="status">${esc(warning)}</p><div data-follows></div>
      <details><summary>フォロー設定をリセット</summary><button type="button" data-reset>フォローと既読の設定を消去</button></details>
      ${location.hostname === "taku3516.github.io" ? '<p><a href="exports/shinagawa-updates.xml">サイト全体の更新RSSを購読</a></p>' : ""}
      <h2>フォロー対象の新着</h2><div class="civic-controls"><label><input type="checkbox" data-unread> 未読のみ</label></div>
      <div class="civic-stack" data-feed></div>`;
    const form = root.querySelector("form");
    const status = root.querySelector("[role=status]");
    const followed = root.querySelector("[data-follows]");
    const outlet = root.querySelector("[data-feed]");
    const save = () => {
      try { localStorage.setItem(key, JSON.stringify(state)); }
      catch (error) {
        console.warn("フォロー設定を保存できません。", error);
        status.textContent = "このブラウザに保存できません。ページを閉じるまで設定を保持します。";
      }
    };
    const render = () => {
      followed.innerHTML = list(state.follows.map((item, index) => `${esc(item.kind)} ／ ${esc(item.label)} <button type="button" data-remove="${index}">解除</button>`), "フォロー対象は未登録です。");
      const unread = root.querySelector("[data-unread]").checked;
      const rows = feed.filter(item => (!unread || !state.read.includes(item.id)) && state.follows.some(followed =>
        followed.kind === "議案" && followed.value.includes(":") && item.type === "議案" ? followed.value === item.id
          : matches([item.title, item.body], followed.label)));
      outlet.innerHTML = rows.slice(0, 60).map(item => `<article class="civic-card"><h3>${link(item.title, item.url)}</h3>
        <p>${esc(item.note)} ${esc(item.date || "未収録")}</p>
        <button type="button" data-read="${esc(item.id)}">${state.read.includes(item.id) ? "未読に戻す" : "既読にする"}</button></article>`).join("") || "<p>該当する新着はありません。</p>";
      const rss = root.querySelector("[data-rss]");
      if (rss) rss.onclick = () => {
        const xml = rows.map(item => {
          const url = new URL(item.url, "https://taku3516.github.io/shinagawa-gikai-db/");
          if (url.protocol !== "https:") return "";
          return `<item><title>${esc(item.title)}</title><link>${esc(url.href)}</link><guid isPermaLink="false">${esc(item.id)}</guid></item>`;
        }).join("");
        civic.download("shinagawa-follow.xml", '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>品川区議会DB フォロー中の新着</title><link>https://taku3516.github.io/shinagawa-gikai-db/</link><description>フォロー条件に一致したニュース・議案</description>' + xml + "</channel></rss>", "application/rss+xml");
      };
    };
    root.querySelector("[data-unread]").addEventListener("change", render);
    outlet.insertAdjacentHTML("beforebegin", '<p><button type="button" data-rss>該当する新着のRSSファイルを保存</button></p>');
    form.addEventListener("submit", event => {
      event.preventDefault();
      const kind = form.elements.kind.value;
      const label = form.elements.value.value.trim();
      const value = kind === "議案" && label === initialTitle ? initialKey : label;
      if (!label || !kinds.includes(kind)) return;
      if (!state.follows.some(item => item.kind === kind && item.value === value)) state.follows.push({ kind, value, label });
      status.textContent = label + "をフォローしています。";
      save();
      render();
    });
    root.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      if (button.hasAttribute("data-reset")) state = { follows: [], read: [] };
      else if (button.hasAttribute("data-remove")) state.follows.splice(Number(button.dataset.remove), 1);
      else if (button.hasAttribute("data-read")) {
        const id = button.dataset.read;
        state.read = state.read.includes(id) ? state.read.filter(value => value !== id) : state.read.concat(id);
      } else return;
      status.textContent = "フォロー設定を更新しました。";
      save();
      render();
      const replacement = [...outlet.querySelectorAll("[data-read]")].find(item => item.dataset.read === button.dataset.read);
      (replacement || form.querySelector("button")).focus();
    });
    render();
  }

  /** @param {HTMLElement} root @returns {void} */
  function reporting(root) {
    const url = params.get("page") || "";
    const id = params.get("id") || "";
    root.innerHTML = `<p>サイトの情報について訂正箇所と根拠を整理できます。報告先は未登録です。入力内容はブラウザでファイルに保存できます。</p>
      <form><div class="civic-controls"><label>対象ページ <input name="page" value="${esc(url)}" maxlength="500"></label>
      <label>対象データID <input name="id" value="${esc(id)}" maxlength="240"></label></div>
      <label>誤りの内容・訂正の根拠 <textarea name="description" rows="6" required maxlength="2000"></textarea></label>
      <p><button>報告内容をテキストに保存</button></p></form>`;
    const form = root.querySelector("form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const fields = filters(form);
      civic.download("shinagawa-report.txt", ["対象ページ " + fields.get("page"), "対象データID " + fields.get("id"), "", fields.get("description")].join("\n"), "text/plain;charset=utf-8");
    });
  }

  /** @param {HTMLElement} root @returns {void} */
  function voice(root) {
    const date = civic.today();
    root.innerHTML = `<p>区が公表した意見募集の案内です。意見の提出方法と個人情報の取扱いは品川区の募集ページで確認できます。</p>
      <p>意見募集は任意参加です。区民全体の世論を代表する調査とは性質が異なります。</p>
      ${data.surveys.map(item => `<article class="civic-card" id="${esc(item.id)}">
        <h2>${esc(item.title)}</h2><p>${date < item.start ? "募集予定" : date <= item.end ? "募集期間内" : "募集期間終了"}　${esc(item.start)} 〜 ${esc(item.end)}</p>
        <p>${link("品川区の募集要項・提出方法", item.url)}</p>
        ${terms([["回答件数", esc(item.count)], ["集計結果", esc(item.resultNote)], ["主な意見", esc(item.summary)]])}</article>`).join("")}
      <p>${link("品川区のパブリックコメント実施状況", "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1006648/1006650/1006651/index.html")}</p>
      <h2>サイト独自の意見募集</h2><p>受付サービスの接続待ちです。</p>
      <details><summary>意見を提出する前に端末で下書きを作る</summary>
      <form><div class="civic-controls">${select("stance", "意見の分類", ["期待", "懸念", "その他", "判断できない"])}</div>
        <label>意見 <textarea name="comment" rows="5" required maxlength="2000"></textarea></label>
        <p>氏名や連絡先は入力せずにお使いください。下書きは送信されません。</p>
        <button>下書きをテキストに保存</button></form></details>`;
    const form = root.querySelector("form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const fields = filters(form);
      civic.download("shinagawa-voice-draft.txt", fields.get("stance") + "\n\n" + fields.get("comment"), "text/plain;charset=utf-8");
    });
  }

  /** @param {HTMLElement} root @returns {void} */
  function questions(root) {
    const endpoint = window.SHINAGAWA_CIVIC_ANSWER_URL;
    const connected = typeof endpoint === "string" && /^https:\/\/[^\s]+$/.test(endpoint) && location.protocol === "https:";
    root.innerHTML = `<p>${connected ? "AIは質問に関連する収録資料を選びます。個人情報は入力しないでください。"
      : "AI回答は接続準備中です。質問に含まれる地名・議案番号・制度名などを入力すると、収録資料を探せます。"}</p>
      <form class="civic-controls">${input("q", connected ? "質問" : "地名・議案番号・制度名", params.get("q") || "")}
      <button name="mode" value="search">収録資料を探す</button>${connected ? '<button name="mode" value="ai">AIに質問する</button>' : ""}</form><div data-answer aria-live="polite"></div>`;
    const form = root.querySelector("form");
    const answer = root.querySelector("[data-answer]");
    form.elements.q.maxLength = 500;
    let request = 0;
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const q = String(filters(form).get("q") || "").trim();
      if (!q) return;
      const current = ++request;
      answer.textContent = "収録資料を検索しています。";
      try {
        if (connected && event.submitter?.value === "ai") {
          const response = await fetch(endpoint, {
            method: "POST", headers: { "Content-Type": "application/json" }, credentials: "omit",
            body: JSON.stringify({ question: q }), signal: AbortSignal.timeout(12000)
          });
          if (!response.ok) throw new Error(response.status === 429 ? "質問の利用上限に達しました。" : "AI回答を取得できませんでした。");
          const result = await response.json();
          if (current !== request) return;
          if (!Array.isArray(result.evidence) || typeof result.summary !== "string") throw new Error("回答の形式を確認できませんでした。");
          answer.innerHTML = `<h2>出典付き回答</h2><p>${esc(result.summary)}</p>
            ${list(result.evidence.slice(0, 3).map(item => `${link(item.title, item.url)}（${esc(item.period)}、${esc(item.locator)}）<br>${esc(item.excerpt)}`), "根拠として示せる資料はありません。")}`;
          return;
        }
        const all = (await Promise.all(["bills", "petitions", "projects", "finance", "meetings"].map(dataset))).flat();
        if (current !== request) return;
        const found = all.filter(item => matches([item.title, item.period, item.id, item.result], q)).slice(0, 15);
        answer.innerHTML = list(found.map(item => `${link(item.title, item.url)} ${esc(item.period)} ${item.source ? link("出典", item.source) : "出典URL未収録"}`), "収録資料からは確認できません。");
        answer.insertAdjacentHTML("beforeend", `<p>${link("質問・答弁も横断検索で探す", "kensaku.html?" + new URLSearchParams({ q }))}</p>`);
      } catch (error) {
        if (current === request) showError(answer, error);
      }
    });
  }

  window.SHINAGAWA_SERVICES = { tools, dictionary, exportsPage, statusPage, follow, reporting, voice, questions };
})();
