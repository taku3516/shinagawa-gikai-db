(() => {
  "use strict";

  const site = window.SHINAGAWA_DB && window.SHINAGAWA_DB.site;
  const roots = document.querySelectorAll("[data-site-nav]");
  if (!roots.length) return;

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const currentFile = (decodeURIComponent(window.location.pathname).split("/").pop() || "index.html").toLowerCase();

  // データ未読込時や旧メニューがキャッシュされている場合の控え。
  const DEFAULT_NAV_GROUPS = [
    {
      label: "議会",
      items: [
        { label: "会議のまとめ", url: "kaigi.html" },
        { label: "会議録・録画", url: "kaigiroku.html" },
        { label: "議案トラッカー", url: "gian.html" },
        { label: "会派別・議員別の賛否", url: "sanpi.html" },
        { label: "請願・陳情", url: "seigan.html" },
        { label: "意見書・決議", url: "ikensho.html" }
      ]
    },
    {
      label: "議員・選挙",
      items: [
        { label: "政治家名簿", url: "giin.html" },
        { label: "議員ダッシュボード", url: "giin-katsudo.html" },
        { label: "選挙", url: "senkyo.html" },
        { label: "選挙収支", url: "senkyo-shushi.html" },
        { label: "政務活動費", url: "seimu.html" },
        { label: "政治資金", url: "seijishikin.html" },
        { label: "政務活動費・政治資金の資料", url: "shikin-shiryo.html" }
      ]
    },
    {
      label: "区政・財政",
      items: [
        { label: "事業カルテ", url: "jigyo.html" },
        { label: "予算・決算", url: "yosan-kessan.html" },
        { label: "お金の見える化", url: "yosan-kessan.html#fiscal-comparison" },
        { label: "行政評価", url: "gyosei.html" }
      ]
    },
    {
      label: "地域・参加",
      items: [
        { label: "わたしの地域", url: "watashi-no-chiiki.html" },
        { label: "区のニュース", url: "news.html" },
        { label: "イベントカレンダー", url: "events.html" },
        { label: "町会区域", url: "chokai-map.html" },
        { label: "区民の声", url: "kumin-no-koe.html" }
      ]
    },
    {
      label: "品川の歴史",
      items: [
        { label: "歴史トップ", url: "rekishi.html" },
        { label: "年表", url: "rekishi-nenpyo.html" },
        { label: "歴史マップ", url: "rekishi-map.html" },
        { label: "地域別", url: "rekishi-chiiki.html" },
        { label: "人物事典", url: "rekishi-jinbutsu.html" },
        { label: "地名の由来", url: "rekishi-chimei.html" },
        { label: "古地図・今昔", url: "rekishi-kochizu.html" }
      ]
    },
    {
      label: "検索・データ",
      items: [
        { label: "横断検索", url: "kensaku.html" },
        { label: "フォロー・新着", url: "follow.html" },
        { label: "CSV・JSONダウンロード", url: "open-data.html" },
        { label: "データ収録状況", url: "data-status.html" }
      ]
    },
    {
      label: "公式サイト",
      items: [
        { type: "minutes", label: "会議録検索システム", url: "https://gikai.city.shinagawa.tokyo.jp/search" },
        { type: "video", label: "インターネット中継", url: "https://gikaichukei.city.shinagawa.tokyo.jp/" },
        { type: "video", label: "録画（会議名から）", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_list" },
        { type: "video", label: "録画（議員名から）", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=speaker_list" }
      ]
    }
  ];

  const configuredGroups = site?.navGroups;
  const navGroups = Array.isArray(configuredGroups) && configuredGroups.length
    && !configuredGroups.some(group => group.items?.some(item => item.url === "katsuyo.html"))
    ? configuredGroups : DEFAULT_NAV_GROUPS;
  const navItems = navGroups.flatMap(group => group.items || []);

  // ニュースページだけは Firebase Hosting から配信している。Googleログインは
  // 配信元と authDomain のドメインが一致していないと iPhone・iPad で完了できないため
  // （理由は docs/firebase-sync-setup.md）。どのページから押しても直接そこへ向ける。
  const NEWS_URL = "https://shinagawakugiakidb.firebaseapp.com/news.html";
  // イベントカレンダーも同じ配信元に置いている（ニュースの★と同じ仕組みに
  // 乗せられるようにするため）。どのページから押しても直接そこへ向ける。
  const EVENTS_URL = "https://shinagawakugiakidb.firebaseapp.com/events.html";

  function resolveUrl(rawUrl) {
    const u = String(rawUrl || "");
    if (u === "news.html") return NEWS_URL;
    if (u === "events.html") return EVENTS_URL;
    // ニュースページ自身は別ドメインにあるため、他ページへのリンクを絶対URLにする
    // （site-url.js）。同じドメインから配信されるページでは従来どおり相対リンク。
    if (window.SHINAGAWA_SITE_BASE && window.SHINAGAWA_URL) {
      return window.SHINAGAWA_URL.resolve(u);
    }
    if (u.startsWith("#")) {
      return currentFile === "index.html" ? u : `index.html${u}`;
    }
    return u;
  }

  /** @returns {object|undefined} */
  function currentItem() {
    const hash = window.location.hash || "";
    return navItems.find(item => item.url === currentFile + hash)
      || navItems.find(item => item.url === currentFile);
  }

  function renderLink(item) {
    const url = resolveUrl(item.url);
    // 外部かどうかは、書かれたURL（item.url）で判定する。resolveUrl の結果で
    // 判定すると、別ドメインから配信している news.html を開いたときに
    // サイト内のリンクが絶対URLになり、すべて外部リンクの見た目になって
    // 新しいタブで開いてしまう。行き先が同じサイトかどうかはデータ側が持っている。
    const isExternal = /^https?:/i.test(String(item.url || ""));
    const active = item === currentItem();

    const classNames = ["site-nav__link"];
    if (isExternal) classNames.push("site-nav__link--external");
    if (item.type === "video") classNames.push("site-nav__link--video");

    const target = isExternal ? ' target="_blank" rel="noopener"' : "";
    const currentAttr = active ? ' aria-current="page"' : "";

    return `<li><a class="${classNames.join(" ")}" data-nav-url="${escapeHtml(item.url)}" href="${escapeHtml(url)}"${target}${currentAttr}>${escapeHtml(item.label)}</a></li>`;
  }

  function renderGroup(group, panelId, index) {
    const labelId = `${panelId}-label-${index + 1}`;
    const items = (group.items || []).map(renderLink).join("");
    return `
      <div class="site-nav__group">
        <span class="site-nav__group-label" id="${labelId}">${escapeHtml(group.label)}</span>
        <ul class="site-nav__list" aria-labelledby="${labelId}">${items}</ul>
      </div>`;
  }

  // スマートフォンでは折りたたみメニューにするため、現在地の短い名前を用意する
  function currentPageLabel() {
    if (currentFile === "index.html") return "トップ";
    return currentItem()?.label || "";
  }

  const currentLabel = currentPageLabel();
  const currentHtml = currentLabel
    ? `<span class="site-nav-toggle__current">表示中：${escapeHtml(currentLabel)}</span>`
    : "";

  function navHtml(panelId) {
    const groups = navGroups.map((group, index) => renderGroup(group, panelId, index)).join("");
    return `
    <div class="site-nav" data-nav-open="false">
      <button class="site-nav-toggle" type="button" aria-expanded="false" aria-controls="${panelId}">
        <span class="site-nav-toggle__bars" aria-hidden="true"></span>
        <span class="site-nav-toggle__text">メニュー</span>
        ${currentHtml}
        <span class="site-nav-toggle__chevron" aria-hidden="true"></span>
      </button>
      <div class="site-nav__panel" id="${panelId}">${groups}</div>
    </div>`;
  }

  roots.forEach((root, index) => {
    root.innerHTML = navHtml(`site-nav-panel-${index + 1}`);

    const wrapper = root.querySelector(".site-nav");
    const toggle = root.querySelector(".site-nav-toggle");
    if (!wrapper || !toggle) return;

    function setOpen(open) {
      wrapper.setAttribute("data-nav-open", open ? "true" : "false");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }

    toggle.addEventListener("click", () => {
      setOpen(wrapper.getAttribute("data-nav-open") !== "true");
    });

    wrapper.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      if (wrapper.getAttribute("data-nav-open") !== "true") return;
      setOpen(false);
      toggle.focus();
    });

    window.addEventListener("hashchange", () => {
      const currentUrl = currentItem()?.url;
      wrapper.querySelectorAll("[data-nav-url]").forEach(link => {
        if (link.dataset.navUrl === currentUrl) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
      const label = toggle.querySelector(".site-nav-toggle__current");
      if (label) label.textContent = `表示中：${currentPageLabel()}`;
    });
  });
})();
