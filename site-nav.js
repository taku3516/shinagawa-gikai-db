(() => {
  "use strict";

  const site = window.SHINAGAWA_DB && window.SHINAGAWA_DB.site;
  const roots = document.querySelectorAll("[data-site-nav]");
  if (!roots.length) return;

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const currentFile = (decodeURIComponent(window.location.pathname).split("/").pop() || "index.html").toLowerCase();

  const row1Data = (site && Array.isArray(site.heroRow1)) ? site.heroRow1 : [
    { type: "minutes", label: "会議録を読む", url: "https://gikai.city.shinagawa.tokyo.jp/search" },
    { type: "video", label: "品川区議会インターネット中継へ", url: "https://gikaichukei.city.shinagawa.tokyo.jp/" },
    { type: "video", label: "録画を会議名で探す", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_list" },
    { type: "video", label: "録画を議員名で探す", url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=speaker_list" }
  ];

  const row2Data = (site && Array.isArray(site.heroRow2)) ? site.heroRow2 : [
    { type: "official", label: "会議録を見る", url: "kaigiroku.html" },
    { type: "official", label: "予算・決算を見る", url: "yosan-kessan.html" },
    { type: "official", label: "政治家名簿を見る", url: "giin.html" },
    { type: "official", label: "品川区の選挙を見る", url: "senkyo.html" },
    { type: "official", label: "政務活動費を見る", url: "seimu.html" },
    { type: "official", label: "政治資金収支報告書を見る", url: "seijishikin.html" },
    { type: "official", label: "選挙収支報告書を読む", url: "senkyo-shushi.html" },
    { type: "official", label: "品川区ニュースを見る", url: "news.html" },
    { type: "official", label: "横断検索", url: "kensaku.html" }
  ];

  const classByType = {
    official: "pill",
    video: "pill pill--video",
    minutes: "pill pill--minutes",
    minutesDraft: "pill pill--minutes"
  };

  function resolveUrl(rawUrl) {
    const u = String(rawUrl || "");
    if (u.startsWith("#")) {
      return currentFile === "index.html" ? u : `index.html${u}`;
    }
    return u;
  }

  function isCurrent(rawUrl, label) {
    const cleanUrl = (rawUrl.split(/[?#]/)[0] || "").toLowerCase();
    
    // サブページファイル名との完全一致 (例: giin.html === currentFile)
    if (cleanUrl && cleanUrl === currentFile && cleanUrl !== "index.html") {
      return true;
    }

    // 各機能ページとボタンの正確なマッピング
    if (currentFile === "giin.html" && label === "政治家名簿を見る") return true;
    if (currentFile === "senkyo.html" && label === "品川区の選挙を見る") return true;
    if (currentFile === "news.html" && label === "品川区ニュースを見る") return true;
    if (currentFile === "yosan-kessan.html" && label === "予算・決算を見る") return true;
    if (currentFile === "kensaku.html" && label === "横断検索") return true;
    if (currentFile === "seimu.html" && label === "政務活動費を見る") return true;
    if (currentFile === "seijishikin.html" && label === "政治資金収支報告書を見る") return true;
    if (currentFile === "senkyo-shushi.html" && label === "選挙収支報告書を読む") return true;
    if (currentFile === "kaigiroku.html" && label === "会議録を見る") return true;

    return false;
  }

  function renderLink(item) {
    const url = resolveUrl(item.url);
    const isExternal = /^https?:/i.test(url);
    const target = isExternal ? ' target="_blank" rel="noopener"' : "";
    const active = isCurrent(item.url, item.label);
    const baseClass = classByType[item.type] || "pill";
    const className = active ? `${baseClass} is-active` : baseClass;
    const currentAttr = active ? ' aria-current="page"' : "";
    const badge = active ? ' <span class="nav-active-badge">📍表示中</span>' : "";
    const externalMark = isExternal ? ' <span style="font-size:0.9em;opacity:0.85">↗</span>' : "";

    return `<a class="${className}" href="${escapeHtml(url)}"${target}${currentAttr}>${escapeHtml(item.label)}${externalMark}${badge}</a>`;
  }

  const row1Html = row1Data.map(renderLink).join("\n");
  const row2Html = row2Data.map(renderLink).join("\n");

  const navHtml = `
    <div class="hero-links">
      <div class="hero-links-row">${row1Html}</div>
      <div class="hero-links-row">${row2Html}</div>
    </div>`;

  roots.forEach(root => {
    root.innerHTML = navHtml;
  });
})();
