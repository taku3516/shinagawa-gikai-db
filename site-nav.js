(() => {
  "use strict";

  const site = window.SHINAGAWA_DB && window.SHINAGAWA_DB.site;
  const roots = document.querySelectorAll("[data-site-nav]");
  if (!roots.length) return;

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const currentFile = (decodeURIComponent(window.location.pathname).split("/").pop() || "index.html").toLowerCase();

  // ------------------------------------------------------------------
  // ナビの中身。data/site.js の navGroups が正で、ここは同じ内容の控え
  // （data/site.js が古いまま配信されても表示が壊れないようにするため）。
  //
  // 群の分け方と並び順を変えたいときは、まず data/site.js の navGroups を
  // 直すこと。ラベルは名詞にする（「会議録を見る」ではなく「会議録・録画」）。
  // ------------------------------------------------------------------
  const DEFAULT_NAV_GROUPS = [
    {
      label: "議会",
      items: [
        { label: "会議のまとめ", url: "kaigi.html" },
        { label: "会議録・録画", url: "kaigiroku.html" },
        { label: "請願・陳情", url: "seigan.html" },
        { label: "意見書・決議", url: "ikensho.html" },
        { label: "予算・決算", url: "yosan-kessan.html" },
        { label: "行政評価", url: "gyosei.html" }
      ]
    },
    {
      label: "人とお金",
      items: [
        { label: "政治家名簿", url: "giin.html" },
        { label: "選挙", url: "senkyo.html" },
        { label: "政務活動費", url: "seimu.html" },
        { label: "政治資金", url: "seijishikin.html" },
        { label: "選挙収支", url: "senkyo-shushi.html" }
      ]
    },
    {
      label: "地域・検索",
      items: [
        { label: "区のニュース", url: "news.html" },
        { label: "町会区域", url: "chokai-map.html" },
        { label: "横断検索", url: "kensaku.html" }
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

  const navGroups = (site && Array.isArray(site.navGroups) && site.navGroups.length)
    ? site.navGroups
    : DEFAULT_NAV_GROUPS;

  // ニュースページだけは Firebase Hosting から配信している。Googleログインは
  // 配信元と authDomain のドメインが一致していないと iPhone・iPad で完了できないため
  // （理由は docs/firebase-sync-setup.md）。どのページから押しても直接そこへ向ける。
  const NEWS_URL = "https://shinagawakugiakidb.firebaseapp.com/news.html";

  function resolveUrl(rawUrl) {
    const u = String(rawUrl || "");
    if (u === "news.html") return NEWS_URL;
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

  // 現在地の判定はファイル名の一致だけで足りる。navGroups の url は
  // すべてページのファイル名そのものなので、ラベルごとの対応表は要らない。
  // news.html は Firebase Hosting でもファイル名が news.html のままなので
  // 同じ判定で当たる。
  function isCurrent(rawUrl) {
    const cleanUrl = (String(rawUrl || "").split(/[?#]/)[0] || "").toLowerCase();
    return Boolean(cleanUrl) && cleanUrl === currentFile && cleanUrl !== "index.html";
  }

  function renderLink(item) {
    const url = resolveUrl(item.url);
    const isExternal = /^https?:/i.test(url);
    const active = isCurrent(item.url);

    const classNames = ["site-nav__link"];
    if (isExternal) classNames.push("site-nav__link--external");
    if (item.type === "video") classNames.push("site-nav__link--video");

    const target = isExternal ? ' target="_blank" rel="noopener"' : "";
    const currentAttr = active ? ' aria-current="page"' : "";

    return `<li><a class="${classNames.join(" ")}" href="${escapeHtml(url)}"${target}${currentAttr}>${escapeHtml(item.label)}</a></li>`;
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
    for (const group of navGroups) {
      const hit = (group.items || []).find(item => isCurrent(item.url));
      if (hit) return hit.label;
    }
    return "";
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
  });
})();
