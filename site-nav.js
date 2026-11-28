(() => {
  "use strict";

  const site = window.SHINAGAWA_DB && window.SHINAGAWA_DB.site;
  const roots = document.querySelectorAll("[data-site-nav]");
  const indexes = document.querySelectorAll("[data-site-index]");
  if (!roots.length && !indexes.length) return;

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const currentFile = (decodeURIComponent(window.location.pathname).split("/").pop() || "index.html").toLowerCase();

  // データ未読込時や旧メニューがキャッシュされている場合の控え。
  const DEFAULT_NAV_GROUPS = [
    {
      id: "council", section: "primary", label: "議会の動き",
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
      id: "members", section: "primary", label: "議員・選挙",
      items: [
        { label: "議員名簿", url: "giin.html" },
        { label: "議員の活動を比較", url: "giin-katsudo.html" },
        { label: "選挙", url: "senkyo.html" },
        { label: "選挙収支", url: "senkyo-shushi.html" },
        { label: "政務活動費", url: "seimu.html" },
        { label: "政治資金", url: "seijishikin.html" },
        { label: "政務活動費・政治資金の資料", url: "shikin-shiryo.html" }
      ]
    },
    {
      id: "budget", section: "primary", label: "予算・事業",
      items: [
        { label: "事業ごとの記録", url: "jigyo.html" },
        { label: "予算・決算", url: "yosan-kessan.html" },
        { label: "お金の見える化", url: "yosan-kessan.html#fiscal-comparison" },
        { label: "事務事業評価", url: "gyosei.html" }
      ]
    },
    {
      id: "community", section: "primary", label: "地域・参加",
      items: [
        { label: "わたしの地域", url: "watashi-no-chiiki.html" },
        { label: "区のニュース", url: "news.html" },
        { label: "イベントカレンダー", url: "events.html" },
        { label: "町会区域", url: "chokai-map.html" },
        { label: "区の意見募集・結果", url: "kumin-no-koe.html" }
      ]
    },
    {
      id: "history", section: "primary", label: "品川の歴史",
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
      id: "utility", section: "utility", label: "サイト内の機能",
      items: [
        { label: "サイト内検索", url: "kensaku.html" },
        { label: "フォロー・新着", url: "follow.html" }
      ]
    },
    {
      id: "data", section: "reference", label: "データ資料",
      items: [
        { label: "CSV・JSONダウンロード", url: "open-data.html" },
        { label: "データ収録状況", url: "data-status.html" }
      ]
    },
    {
      id: "official", section: "reference", label: "議会の公式サイト",
      items: [
        { type: "minutes", label: "会議録検索システム", url: "https://gikai.city.shinagawa.tokyo.jp/search" },
        { type: "video", label: "インターネット中継", url: "https://gikaichukei.city.shinagawa.tokyo.jp/" },
        { type: "video", label: "録画（会議名から）", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_list" },
        { type: "video", label: "録画（議員名から）", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=speaker_list" }
      ]
    }
  ];

  const configuredGroups = site?.navGroups;
  const navGroups = Array.isArray(configuredGroups) && configuredGroups.some(group => group.section === "primary")
    ? configuredGroups : DEFAULT_NAV_GROUPS;
  const mainGroups = navGroups.filter(group => group.section === "primary");
  const utility = navGroups.find(group => group.section === "utility").items;
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

  /** @param {object} group @param {string} prefix @returns {string} */
  function renderGroup(group, prefix) {
    const id = `${prefix}-${group.id}`;
    return `<section class="site-nav__group" id="${id}">
      <h3 class="site-nav__group-label" id="${id}-label">${escapeHtml(group.label)}</h3>
      <ul class="site-nav__list" aria-labelledby="${id}-label">${group.items.map(renderLink).join("")}</ul>
    </section>`;
  }

  indexes.forEach(root => {
    root.innerHTML = navGroups.filter(group => group.section !== "utility")
      .map(group => renderGroup(group, "index")).join("");
    const anchor = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
    if (anchor && root.contains(anchor)) anchor.scrollIntoView();
  });

  /** @param {string} prefix @returns {string} */
  function navHtml(prefix) {
    const activeGroup = mainGroups.find(group => group.items.includes(currentItem()));
    return `<div class="site-nav">
      <div class="site-nav__bar">
        <ul class="site-nav__categories">${mainGroups.map(group => `<li>
          <button type="button" aria-expanded="false" aria-controls="${prefix}-${group.id}-panel"${group === activeGroup ? ' data-current-group' : ""}>
          ${escapeHtml(group.label)}<span aria-hidden="true"></span></button></li>`).join("")}</ul>
        <ul class="site-nav__utility">${utility.map(renderLink).join("")}</ul>
      </div>
      ${mainGroups.map(group => `<div class="site-nav__panel" id="${prefix}-${group.id}-panel" hidden>
        <ul class="site-nav__list" aria-label="${escapeHtml(group.label)}">${group.items.map(renderLink).join("")}</ul>
      </div>`).join("")}
    </div>`;
  }

  roots.forEach((root, index) => {
    root.innerHTML = navHtml(`site-nav-${index + 1}`);
    const wrapper = root.querySelector(".site-nav");
    if (!wrapper) return;
    const buttons = [...wrapper.querySelectorAll(".site-nav__categories button")];
    let openButton = null;

    /** @param {HTMLButtonElement|null} next @returns {void} */
    function setOpen(next) {
      for (const button of buttons) {
        const open = button === next;
        button.setAttribute("aria-expanded", String(open));
        document.getElementById(button.getAttribute("aria-controls")).hidden = !open;
      }
      openButton = next;
    }

    buttons.forEach(button => {
      button.addEventListener("click", event => {
        setOpen(openButton === button ? null : button);
        if (openButton && event.detail === 0) {
          document.getElementById(button.getAttribute("aria-controls")).querySelector("a")?.focus();
        }
      });
    });
    wrapper.addEventListener("keydown", event => {
      if (event.key !== "Escape" || !openButton) return;
      openButton.focus();
      setOpen(null);
    });
    document.addEventListener("click", event => {
      if (openButton && !wrapper.contains(event.target)) setOpen(null);
    });

    window.addEventListener("hashchange", () => {
      const currentUrl = currentItem()?.url;
      wrapper.querySelectorAll("[data-nav-url]").forEach(link => {
        if (link.dataset.navUrl === currentUrl) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
      });
    });
  });
})();
