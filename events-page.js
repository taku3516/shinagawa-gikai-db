/*
 * イベントカレンダーの画面。
 *
 * データは data/events.js（scripts/collect_events.py が生成）。
 * .ics とGoogleカレンダーのリンクは events-ics.js が組み立てる。
 *
 * 開催日の確度が3段階あり、特に「推定」は発信元が発表した日ではない。
 * 見た目（破線）と文言の両方で区別し、表示するかどうかも選べるようにしている。
 */
(() => {
  "use strict";

  const data = window.SHINAGAWA_EVENTS || { events: [], sources: [], holidays: [] };
  const ics = window.SHINAGAWA_EVENTS_ICS;
  const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
  const MAX_CHIPS = 3;

  // その月に何日以上かかるイベントを「長期開催」としてマスの外に出すか。
  // 出さないと、259日続く催し（ACPなど）が全部のマスを埋めてしまい、
  // その日だけのイベントが「ほか◯件」に押し出されて見えなくなる。
  const LONG_RUN_DAYS = 8;

  // 購読用の .ics は exports/ に置いてある（scripts/build_events_ics.py が生成）。
  const FEEDS = [
    {
      file: "exports/shinagawa-events.ics",
      name: "品川区のイベント（すべて）",
      note: "区公式・区議会・観光協会・ニュースから集めた全部です。推定した開催日も含みます。"
    },
    {
      file: "exports/shinagawa-events-confirmed.ics",
      name: "開催日が確かなものだけ",
      note: "発信元が開催日として出しているものだけ。予定表を確かな情報で埋めたいときはこちら。"
    },
    {
      file: "exports/shinagawa-gikai.ics",
      name: "品川区議会の日程",
      note: "委員会の予定・結果だけを集めたものです。"
    },
    {
      // こちらは公開時に scripts/build_civic_feeds.mjs が作る（data/public-comments.js と data/shinatalk.js から）
      file: "exports/shinagawa-public-comments.ics",
      name: "区の意見募集（締切）",
      note: "品川区のパブリックコメントの締切日と、しなトーク（区のオンライン意見交換）の最初の段階の終了日です。意見の出しそびれを防ぎたいときに。"
    }
  ];

  const state = {
    view: "calendar",
    month: "",
    query: "",
    category: "",
    source: "",
    includeEstimated: true
  };

  const elements = {
    search: document.getElementById("search"),
    category: document.getElementById("category-filter"),
    source: document.getElementById("source-filter"),
    calendarButton: document.getElementById("calendar-button"),
    listButton: document.getElementById("list-button"),
    includeEstimated: document.getElementById("include-estimated"),
    calendarView: document.getElementById("calendar-view"),
    listView: document.getElementById("list-view"),
    calendarBody: document.getElementById("calendar-body"),
    longRunning: document.getElementById("long-running"),
    monthLabel: document.getElementById("month-label"),
    prevMonth: document.getElementById("prev-month"),
    nextMonth: document.getElementById("next-month"),
    thisMonth: document.getElementById("this-month"),
    title: document.getElementById("list-title"),
    status: document.getElementById("result-status"),
    feeds: document.getElementById("feeds"),
    sourceList: document.getElementById("source-list"),
    generatedAt: document.getElementById("generated-at"),
    download: document.getElementById("download-filtered")
  };

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const pad = n => String(n).padStart(2, "0");
  const isoOf = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const TODAY = isoOf(new Date());

  const holidays = new Set(data.holidays || []);
  const events = (data.events || []).filter(event => event && event.id && (event.dates || []).length);

  // サイトの基準URL。別ドメイン（Firebase Hosting）から配信されることがあるため、
  // 相対リンクではなく site-url.js の解決を通す。
  function resolve(path) {
    if (window.SHINAGAWA_URL && window.SHINAGAWA_URL.resolve) return window.SHINAGAWA_URL.resolve(path);
    return path;
  }
  // 購読用URLは、Googleカレンダーに貼り付けて使うので必ず絶対URLにする。
  // 相対パスのままだと貼り付け先で解決できない。
  // Firebase Hosting から配信されているときは SHINAGAWA_SITE_BASE に
  // GitHub Pages 側の基準URLが入る。exports/ の .ics はそちらにある。
  const siteBase = (() => {
    try {
      return new URL(window.SHINAGAWA_SITE_BASE || "./", window.location.href).href;
    } catch {
      return "";
    }
  })();

  // ------------------------------------------------------------ 絞り込み

  function matches(event) {
    if (!state.includeEstimated && event.confidence === "estimated") return false;
    if (state.category && event.category !== state.category) return false;
    if (state.source && event.sourceId !== state.source) return false;
    if (state.query) {
      const haystack = [event.title, event.summary, event.place, event.source, event.category]
        .join(" ").toLowerCase();
      if (!state.query.toLowerCase().split(/\s+/).filter(Boolean).every(word => haystack.includes(word))) {
        return false;
      }
    }
    return true;
  }

  function visibleEvents() {
    return events.filter(matches);
  }

  // 日付 → その日のイベント、の索引を作る。
  function byDate(list) {
    const index = new Map();
    for (const event of list) {
      for (const day of event.dates || []) {
        if (!index.has(day)) index.set(day, []);
        index.get(day).push(event);
      }
    }
    for (const dayEvents of index.values()) {
      // 時刻のあるものを先に、その中では早い順に並べる
      dayEvents.sort((a, b) => {
        const left = a.startTime || "99:99";
        const right = b.startTime || "99:99";
        return left === right ? String(a.title).localeCompare(String(b.title), "ja") : left.localeCompare(right);
      });
    }
    return index;
  }

  // ------------------------------------------------------------ カレンダー

  function monthStart(month) {
    const [year, mon] = month.split("-").map(Number);
    return new Date(year, mon - 1, 1);
  }

  function shiftMonth(month, step) {
    const start = monthStart(month);
    start.setMonth(start.getMonth() + step);
    return `${start.getFullYear()}-${pad(start.getMonth() + 1)}`;
  }

  // その月のうち何日ぶんを占めるかを数え、長く続くものを選り分ける。
  function splitLongRunning(index, month) {
    const daysInMonth = new Map();
    for (const [day, dayEvents] of index) {
      if (!day.startsWith(month)) continue;
      for (const event of dayEvents) {
        daysInMonth.set(event.id, (daysInMonth.get(event.id) || 0) + 1);
      }
    }
    const longIds = new Set();
    for (const [id, count] of daysInMonth) {
      if (count >= LONG_RUN_DAYS) longIds.add(id);
    }
    const longRunning = [];
    const seen = new Set();
    for (const [day, dayEvents] of index) {
      if (!day.startsWith(month)) continue;
      for (const event of dayEvents) {
        if (longIds.has(event.id) && !seen.has(event.id)) {
          seen.add(event.id);
          longRunning.push(event);
        }
      }
    }
    longRunning.sort((a, b) => String(a.title).localeCompare(String(b.title), "ja"));
    return { longIds, longRunning };
  }

  function renderLongRunning(longRunning) {
    if (!longRunning.length) {
      elements.longRunning.hidden = true;
      elements.longRunning.innerHTML = "";
      return;
    }
    const chips = longRunning.map(event => {
      const span = event.startDate === event.endDate
        ? event.startDate
        : `${event.startDate}〜${event.endDate}`;
      return `<button class="chip long-chip" type="button" data-event-id="${escapeHtml(event.id)}"` +
        ` data-day="${escapeHtml(event.startDate || event.dates[0])}"` +
        ` data-confidence="${escapeHtml(event.confidence || "")}"` +
        ` title="${escapeHtml(event.title)}（${escapeHtml(span)}）">${escapeHtml(event.title)}</button>`;
    }).join("");
    elements.longRunning.hidden = false;
    elements.longRunning.innerHTML =
      `<h4 class="long-title">この月のあいだ続くもの（${longRunning.length}件）</h4>` +
      `<div class="long-list">${chips}</div>`;
  }

  function renderCalendar(index) {
    const start = monthStart(state.month);
    const label = `${start.getFullYear()}年${start.getMonth() + 1}月`;
    elements.monthLabel.textContent = label;
    const { longIds, longRunning } = splitLongRunning(index, state.month);
    renderLongRunning(longRunning);

    // 週は日曜はじまり。前月分をさかのぼって最初のマスを決める。
    const first = new Date(start);
    first.setDate(1 - first.getDay());

    const rows = [];
    const cursor = new Date(first);
    for (let week = 0; week < 6; week += 1) {
      const cells = [];
      for (let day = 0; day < 7; day += 1) {
        const iso = isoOf(cursor);
        const classes = [];
        if (cursor.getMonth() !== start.getMonth()) classes.push("other-month");
        if (cursor.getDay() === 0) classes.push("sun");
        if (holidays.has(iso)) classes.push("holiday");
        if (iso === TODAY) classes.push("today");
        // 長期開催はマスの外（上の帯）に出しているので、ここでは除く
        const dayEvents = (index.get(iso) || []).filter(event => !longIds.has(event.id));
        const chips = dayEvents.slice(0, MAX_CHIPS).map(event => {
          const time = event.startTime ? `${event.startTime} ` : "";
          return `<button class="chip" type="button" data-event-id="${escapeHtml(event.id)}" data-day="${iso}"` +
            ` data-confidence="${escapeHtml(event.confidence || "")}"` +
            ` data-source="${escapeHtml(event.sourceId || "")}"` +
            ` title="${escapeHtml(time + event.title)}">${escapeHtml(time + event.title)}</button>`;
        }).join("");
        const more = dayEvents.length > MAX_CHIPS
          ? `<span class="more-link">ほか${dayEvents.length - MAX_CHIPS}件</span>`
          : "";
        // 狭い画面ではチップの文字が「01:0…」までしか出ず読めないので、
        // 件数だけを出して、押すとその日の一覧へ移れるようにする（CSSで切り替え）。
        const count = dayEvents.length
          ? `<button class="day-count" type="button" data-day="${iso}">${dayEvents.length}件</button>`
          : "";
        cells.push(
          `<td class="${classes.join(" ")}">` +
          `<span class="day-number">${cursor.getDate()}</span>` +
          `<span class="day-events">${chips}${more}</span>${count}</td>`
        );
        cursor.setDate(cursor.getDate() + 1);
      }
      rows.push(`<tr>${cells.join("")}</tr>`);
      // 翌月に入りきったら、空の週は描かない
      if (cursor.getMonth() !== start.getMonth() && cursor > start) break;
    }
    elements.calendarBody.innerHTML = rows.join("");
  }

  // ------------------------------------------------------------ 一覧

  function eventCard(event, day) {
    const span = [day, day];
    const period = (event.periods || []).find(p => p.from <= day && day <= p.to);
    const occurrence = period ? [period.from, period.to] : span;
    const googleUrl = ics ? ics.googleCalendarUrl(event, occurrence, siteBase) : "";
    const estimated = event.confidence === "estimated";
    const meta = [];
    if (event.startTime) {
      meta.push(escapeHtml(event.endTime ? `${event.startTime}〜${event.endTime}` : `${event.startTime}〜`));
    }
    if (period) meta.push(`${escapeHtml(period.from)} 〜 ${escapeHtml(period.to)}`);
    if (event.place) meta.push(escapeHtml(event.place));
    if (event.application) meta.push(`申込 ${escapeHtml(event.application)}`);
    if (event.deadline) meta.push(`申込締切 ${escapeHtml(event.deadline)}`);

    const badges = [`<span class="badge">${escapeHtml(event.source || "")}</span>`];
    if (estimated) badges.push('<span class="badge estimated">開催日は推定</span>');
    else if (event.category) badges.push(`<span class="badge">${escapeHtml(event.category)}</span>`);

    const alsoSeen = (event.alsoSeenIn || [])
      .filter(entry => entry && entry.url)
      .map(entry => ` / <a href="${escapeHtml(entry.url)}" target="_blank" rel="noopener">${escapeHtml(entry.source || "別の収集元")}</a>`)
      .join("");

    return `<article class="event-card" data-confidence="${escapeHtml(event.confidence || "")}">
      <div>
        <h4 class="event-title">${escapeHtml(event.title)}</h4>
        <div class="event-meta">${badges.join(" ")}${meta.length ? " " + meta.join(" ・ ") : ""}</div>
        ${event.summary ? `<p class="event-summary">${escapeHtml(event.summary)}</p>` : ""}
        ${estimated ? '<p class="event-summary"><strong>この開催日は記事本文から推定したものです。</strong>出典で確かめてください。</p>' : ""}
        <p class="event-meta" style="margin-top:7px">出典：<a href="${escapeHtml(event.url)}" target="_blank" rel="noopener">${escapeHtml(event.source || "元のページ")}</a>${alsoSeen}</p>
      </div>
      <div class="event-actions">
        ${googleUrl ? `<a class="action-button primary" href="${escapeHtml(googleUrl)}" target="_blank" rel="noopener">Googleカレンダーに追加</a>` : ""}
        <button class="action-button" type="button" data-download-id="${escapeHtml(event.id)}" data-day="${escapeHtml(day)}">.ics で保存</button>
      </div>
    </article>`;
  }

  function renderList(index) {
    // 今日以降を先に見せる。過去はその後ろに新しい順で続ける。
    const days = [...index.keys()].sort();
    const upcoming = days.filter(day => day >= TODAY);
    const past = days.filter(day => day < TODAY).reverse();
    const sections = [];

    const groupHtml = day => {
      const date = new Date(`${day}T00:00:00`);
      const weekday = WEEKDAYS[date.getDay()];
      const holiday = holidays.has(day) ? "（祝）" : "";
      const cards = index.get(day).map(event => eventCard(event, day)).join("");
      return `<div class="day-group">
        <h3 class="day-heading">${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${weekday}）${holiday}</h3>
        ${cards}
      </div>`;
    };

    if (upcoming.length) {
      sections.push('<h3 class="visually-hidden">これからのイベント</h3>');
      sections.push(upcoming.map(groupHtml).join(""));
    }
    if (past.length) {
      sections.push('<h3 class="day-heading" style="margin-top:28px;border-bottom-color:var(--border)">終了したイベント</h3>');
      sections.push(past.map(groupHtml).join(""));
    }
    if (!sections.length) {
      sections.push('<p class="empty">条件に合うイベントがありません。絞り込みを変えてみてください。</p>');
    }
    elements.listView.innerHTML = sections.join("");
  }

  // ------------------------------------------------------------ 保存

  function download(filename, text) {
    const blob = new Blob([text], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    // すぐ解放すると保存前に切れる環境があるので、少し待ってから捨てる
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function downloadFiltered() {
    if (!ics) return;
    const chosen = visibleEvents();
    const text = ics.buildCalendar(chosen, "品川区のイベント（絞り込み）", "品川区議会DBで絞り込んだイベントです。", siteBase);
    download("shinagawa-events-filtered.ics", text);
  }

  function downloadOne(id) {
    if (!ics) return;
    const event = events.find(item => item.id === id);
    if (!event) return;
    const text = ics.buildCalendar([event], event.title, "品川区議会DBのイベントです。", siteBase);
    download(`shinagawa-event-${id}.ics`, text);
  }

  // ------------------------------------------------------------ 画面の更新

  function render() {
    const chosen = visibleEvents();
    const index = byDate(chosen);
    const upcoming = chosen.filter(event => (event.endDate || event.dates[event.dates.length - 1]) >= TODAY).length;
    elements.status.textContent = `${chosen.length}件（これからのイベント ${upcoming}件）`;

    elements.calendarView.hidden = state.view !== "calendar";
    elements.listView.hidden = state.view !== "list";
    elements.calendarButton.setAttribute("aria-pressed", String(state.view === "calendar"));
    elements.listButton.setAttribute("aria-pressed", String(state.view === "list"));
    elements.title.textContent = state.view === "calendar" ? "月ごとのイベント" : "イベントの一覧";

    if (state.view === "calendar") renderCalendar(index);
    else renderList(index);
  }

  function fillFilters() {
    const categories = [...new Set(events.map(event => event.category).filter(Boolean))].sort((a, b) => a.localeCompare(b, "ja"));
    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      elements.category.appendChild(option);
    }
    const sources = new Map();
    for (const event of events) {
      if (event.sourceId && !sources.has(event.sourceId)) sources.set(event.sourceId, event.source || event.sourceId);
    }
    for (const [id, name] of sources) {
      const option = document.createElement("option");
      option.value = id;
      option.textContent = name;
      elements.source.appendChild(option);
    }
  }

  function renderFeeds() {
    elements.feeds.innerHTML = FEEDS.map(feed => {
      const url = siteBase + feed.file;
      return `<div class="feed">
        <span class="feed-name">${escapeHtml(feed.name)}</span>
        <a class="action-button" href="${escapeHtml(url)}">ファイルを開く</a>
        <button class="action-button primary" type="button" data-copy="${escapeHtml(url)}">URLをコピー</button>
        <p class="feed-note">${escapeHtml(feed.note)}</p>
        <code class="feed-url">${escapeHtml(url)}</code>
      </div>`;
    }).join("");
  }

  function renderSources() {
    elements.sourceList.innerHTML = (data.sources || []).map(source => {
      const note = source.confidence === "estimated"
        ? "記事本文から開催日を推定しています。発信元が開催日として発表したものではありません。"
        : "発信元のページに開催日が示されています。";
      const href = source.url && source.url.startsWith("http") ? source.url : resolve(source.url || "");
      return `<p class="source-line">・<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(source.name)}</a> — ${escapeHtml(note)}</p>`;
    }).join("");
    if (data.generatedAt) {
      const moment = new Date(data.generatedAt);
      elements.generatedAt.textContent = Number.isNaN(moment.getTime())
        ? ""
        : `最終更新：${moment.getFullYear()}年${moment.getMonth() + 1}月${moment.getDate()}日 ${pad(moment.getHours())}:${pad(moment.getMinutes())}`;
    }
  }

  // ------------------------------------------------------------ 組み立て

  function initialMonth() {
    // 今月に表示できるものが無ければ、直近のイベントがある月から始める。
    const current = TODAY.slice(0, 7);
    if (events.some(event => (event.dates || []).some(day => day.startsWith(current)))) return current;
    const future = events.flatMap(event => event.dates || []).filter(day => day >= TODAY).sort();
    return (future[0] || TODAY).slice(0, 7);
  }

  function bind() {
    elements.search.addEventListener("input", () => { state.query = elements.search.value.trim(); render(); });
    elements.category.addEventListener("change", () => { state.category = elements.category.value; render(); });
    elements.source.addEventListener("change", () => { state.source = elements.source.value; render(); });
    elements.includeEstimated.addEventListener("change", () => {
      state.includeEstimated = elements.includeEstimated.checked;
      render();
    });
    elements.calendarButton.addEventListener("click", () => { state.view = "calendar"; render(); });
    elements.listButton.addEventListener("click", () => { state.view = "list"; render(); });
    elements.prevMonth.addEventListener("click", () => { state.month = shiftMonth(state.month, -1); render(); });
    elements.nextMonth.addEventListener("click", () => { state.month = shiftMonth(state.month, 1); render(); });
    elements.thisMonth.addEventListener("click", () => { state.month = TODAY.slice(0, 7); render(); });
    elements.download.addEventListener("click", downloadFiltered);

    // カレンダーのチップを押したら、その日の一覧へ移る
    elements.calendarView.addEventListener("click", clickEvent => {
      // チップ（広い画面）も件数ボタン（狭い画面）も、どちらもその日の一覧へ移る
      const target = clickEvent.target.closest("[data-day]");
      if (!target) return;
      state.view = "list";
      render();
      const label = formatDayLabel(target.dataset.day);
      const heading = [...elements.listView.querySelectorAll(".day-heading")]
        .find(node => node.textContent.includes(label));
      if (heading) heading.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    document.addEventListener("click", clickEvent => {
      const saveOne = clickEvent.target.closest("[data-download-id]");
      if (saveOne) {
        downloadOne(saveOne.dataset.downloadId);
        return;
      }
      const copy = clickEvent.target.closest("[data-copy]");
      if (copy && navigator.clipboard) {
        navigator.clipboard.writeText(copy.dataset.copy).then(() => {
          const before = copy.textContent;
          copy.textContent = "コピーしました";
          setTimeout(() => { copy.textContent = before; }, 1600);
        }).catch(() => {
          // クリップボードが使えない環境（権限なし・古いブラウザ）では
          // URLをそのまま見せているので、手で選んでコピーできる
        });
      }
    });
  }

  function formatDayLabel(day) {
    const date = new Date(`${day}T00:00:00`);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  state.month = initialMonth();
  fillFilters();
  renderFeeds();
  renderSources();
  bind();
  render();
})();
