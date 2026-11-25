(() => {
  "use strict";
  const { readings } = window.SHINAGAWA_CIVIC_CONTENT;
  const { normalize } = window.SHINAGAWA_CIVIC;
  const missing = "未収録";

  /** @param {unknown} value @returns {string} */
  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  /** @param {string} label @param {string} url @returns {string} */
  function link(label, url) {
    const valid = /^(?:https:\/\/[^\s]+|[a-z][a-z0-9-]*\.html(?:[?#][^\s]*)?|#(?:[\w-]+)|exports\/[\w.-]+)$/i;
    return typeof url === "string" && valid.test(url) ? `<a href="${esc(url)}">${esc(label)}</a>` : esc(label);
  }

  /** @param {object[]} [links] @returns {string} */
  function sources(links = []) {
    return list(links.map(item => `${link(item.label, item.url)}${item.locator ? "（" + esc(item.locator) + "）" : ""}`), "関連資料未登録");
  }

  /** @param {string[]} items @param {string} [empty] @returns {string} */
  function list(items, empty = missing) {
    return items.length ? "<ul>" + items.map(item => "<li>" + item + "</li>").join("") + "</ul>" : `<p class="civic-note">${esc(empty)}</p>`;
  }

  /** @param {Array<[string,string]>} entries @returns {string} */
  function terms(entries) {
    return '<dl class="civic-data">' + entries.map(([key, value]) => `<dt>${esc(key)}</dt><dd>${value || missing}</dd>`).join("") + "</dl>";
  }

  /** @param {string} name @param {string} label @param {Array<string|[string,string]>} values @param {string} [current] @returns {string} */
  function select(name, label, values, current = "") {
    const options = values.map(item => {
      const [value, text] = Array.isArray(item) ? item : [item, item];
      return `<option value="${esc(value)}"${value === current ? " selected" : ""}>${esc(text)}</option>`;
    });
    return `<label>${esc(label)} <select name="${esc(name)}">${options.join("")}</select></label>`;
  }

  /** @param {string} name @param {string} label @param {string} [value] @returns {string} */
  function input(name, label, value = "") {
    return `<label>${esc(label)} <input type="search" name="${esc(name)}" value="${esc(value)}"></label>`;
  }

  /** @param {HTMLFormElement} form @returns {URLSearchParams} */
  function filters(form) {
    return new URLSearchParams(new FormData(form));
  }

  /** @param {unknown[]} values @param {string} query @returns {boolean} */
  function matches(values, query) {
    const target = normalize(values.flat(Infinity).join(" "));
    return String(query ?? "").trim().split(/\s+/).every(word => target.includes(normalize(word)));
  }

  const dictionary = new Map(readings);
  const pattern = new RegExp("(" + [...dictionary.keys()].sort((a, b) => b.length - a.length).join("|") + ")", "g");

  /** @param {string} text @returns {string} */
  function annotate(text) {
    return String(text ?? "").split(pattern).map(part => dictionary.has(part)
      ? `<ruby>${esc(part)}<rt>${esc(dictionary.get(part))}</rt></ruby>`
      : esc(part)).join("");
  }

  /** @param {object} [record] @returns {string} */
  function review(record = {}) {
    return `<details><summary>出典と確認状況</summary>${terms([
      ["AIによる要約", esc(record.ai === true ? "あり" : record.ai === false ? "なし" : "記録なし")],
      ["人による確認", esc(record.checkedAt ? "確認済み（" + record.checkedAt + "）" : "確認記録なし")],
      ["訂正履歴", esc(record.corrections?.join("／") || "登録なし")]
    ])}</details>`;
  }

  /** @param {HTMLElement} element @param {unknown} error @returns {void} */
  function showError(element, error) {
    console.error(error);
    element.innerHTML = `<p role="alert">${esc(error.message || error)} 再読み込みしてお試しください。</p>`;
  }

  window.SHINAGAWA_CIVIC_UI = { esc, link, sources, list, terms, select, input, filters, matches, annotate, review, showError, missing };
})();
