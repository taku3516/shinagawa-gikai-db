(() => {
  "use strict";

  const site = window.SHINAGAWA_DB && window.SHINAGAWA_DB.site;
  const roots = document.querySelectorAll("[data-site-nav]");
  if (!site || !Array.isArray(site.heroLinks) || !roots.length) return;

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  const currentFile = decodeURIComponent(window.location.pathname).split("/").pop() || "index.html";
  const classByType = {
    video: "site-function-nav__link site-function-nav__link--video",
    minutes: "site-function-nav__link site-function-nav__link--minutes",
    minutesDraft: "site-function-nav__link site-function-nav__link--minutes"
  };

  function resolvedUrl(url) {
    const value = String(url || "");
    return value.startsWith("#") && currentFile !== "index.html" ? `index.html${value}` : value;
  }

  function isCurrentPage(url) {
    if (/^https?:/i.test(url) || url.startsWith("#")) return false;
    const targetFile = url.split(/[?#]/)[0] || "index.html";
    return targetFile === currentFile;
  }

  const linksHtml = site.heroLinks.map(link => {
    const url = resolvedUrl(link.url);
    const external = /^https?:/i.test(url);
    const className = classByType[link.type] || "site-function-nav__link";
    const current = isCurrentPage(url) ? ' aria-current="page"' : "";
    const externalAttrs = external ? ' target="_blank" rel="noopener"' : "";
    const externalLabel = external
      ? '<span class="site-function-nav__external-mark" aria-hidden="true">↗</span><span class="site-function-nav__sr-only">（外部サイト、新しいタブで開きます）</span>'
      : "";
    return `<a class="${className}" href="${escapeHtml(url)}"${externalAttrs}${current}>${escapeHtml(link.label)}${externalLabel}</a>`;
  }).join("");

  roots.forEach(root => {
    root.classList.add("site-function-nav");
    root.setAttribute("aria-label", "品川区議会DBの主な機能");
    root.innerHTML = `<p class="site-function-nav__label">主な機能</p><div class="site-function-nav__links">${linksHtml}</div>`;
  });
})();
