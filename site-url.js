/*
 * サイト内リンクの解決です。
 *
 * ニュースページだけは Firebase Hosting（shinagawakugiakidb.firebaseapp.com）から
 * 配信します。Googleログインは配信元と authDomain のドメインが一致していないと
 * 完了できないためです（理由は docs/firebase-sync-setup.md）。
 *
 * その結果、ニュースページから見ると他のページは別ドメインにあります。相対リンクの
 * ままだと存在しない場所を指してしまうため、配信時に window.SHINAGAWA_SITE_BASE を
 * 与えて絶対URLへ書き換えます。
 *
 * GitHub Pages から配信される他のページでは SHINAGAWA_SITE_BASE を設定しないため、
 * これまでどおり相対リンクのまま動きます。file:// でダブルクリックしても壊れません。
 *
 * モジュールではなくクラシックスクリプトにしています。file:// での動作を保つためです。
 */
(() => {
  "use strict";

  // 「https:」「http:」「mailto:」「data:」などの方式付き、および「//」で始まるURL。
  // これらはサイト内リンクではないので書き換えない。
  const ABSOLUTE = /^([a-z][a-z0-9+.-]*:|\/\/)/i;

  function base() {
    const value = String(window.SHINAGAWA_SITE_BASE || "").trim();
    if (!value) return "";
    return value.endsWith("/") ? value : `${value}/`;
  }

  /**
   * サイト内リンクを、配信元に応じた形へ解決します。
   * @param {string|null|undefined} rawUrl
   * @returns {string}
   */
  function resolve(rawUrl) {
    const url = String(rawUrl ?? "");
    if (!url) return "";

    const prefix = base();
    if (!prefix) return url;
    if (ABSOLUTE.test(url)) return url;

    // ページ内の見出しリンクは、トップページの該当箇所へ向ける。
    if (url.startsWith("#")) return `${prefix}index.html${url}`;

    return `${prefix}${url}`;
  }

  window.SHINAGAWA_URL = { resolve };

  // 別ドメインから配信されている場合だけ、HTMLに直接書かれたサイト内リンクを
  // 絶対URLへ書き換える。基準URLが未設定なら何もしないので、他のページには影響しない。
  // ニュース記事へのリンクは配信元の絶対URLなので、ここでは対象外になる。
  if (base()) {
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("a[href]").forEach(anchor => {
        const raw = anchor.getAttribute("href");
        const resolved = resolve(raw);
        if (resolved !== raw) anchor.setAttribute("href", resolved);
      });
    });
  }
})();
