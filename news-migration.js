/*
 * ニュースページの端末内保存を、旧URLから新URLへ一度だけ引き継ぐ処理です。
 *
 * ニュースページは Firebase Hosting（shinagawakugiakidb.firebaseapp.com）へ移しました。
 * Googleログインは配信元と authDomain のドメインが一致していないと完了できないためです
 * （理由は docs/firebase-sync-setup.md）。
 *
 * 端末内保存の領域はURLごとに分かれるため、そのままでは旧URLで付けた★が
 * 消えたように見えます。ログインした利用者はクラウドから復元されますが、
 * ログインしない利用者のために引き継ぎを用意します。
 *
 * 受け渡しはURLの「#」以降を使います。「#」以降はサーバーへ送られず、
 * アクセス記録にも残りません。引き継いだ直後にURLからも消します。
 *
 * 受け取る側は、渡された内容を信用しません。URLは誰でも書き換えられるため、
 * 保存する前に形式と件数を検査します。
 *
 * モジュールではなくクラシックスクリプトにしています。file:// での動作を保つためです。
 */
(() => {
  "use strict";

  // ニュースIDの形式。news-sync.js の同期処理と同じ条件にしている。
  const NEWS_ID = /^[a-zA-Z0-9_-]{1,80}$/;
  const SOURCE_MAX_LENGTH = 100;
  const LIMIT = 2000;

  function cleanIds(values) {
    if (!Array.isArray(values)) return [];
    return [...new Set(values.map(value => String(value)))]
      .filter(value => NEWS_ID.test(value))
      .slice(0, LIMIT);
  }

  function cleanSources(values) {
    if (!Array.isArray(values)) return [];
    return [...new Set(values.map(value => String(value).trim()).filter(Boolean))]
      .filter(value => value.length <= SOURCE_MAX_LENGTH)
      .slice(0, LIMIT);
  }

  /**
   * 引き継ぎ内容を文字列にします。保存するものが無ければ空文字を返します。
   * @param {{favorites?: string[], hiddenSources?: string[], hiddenItems?: string[]}} state
   * @returns {string}
   */
  function encode(state) {
    const payload = {
      favorites: cleanIds(state?.favorites),
      hiddenSources: cleanSources(state?.hiddenSources),
      hiddenItems: cleanIds(state?.hiddenItems)
    };
    const isEmpty = !payload.favorites.length
      && !payload.hiddenSources.length
      && !payload.hiddenItems.length;
    if (isEmpty) return "";
    return encodeURIComponent(JSON.stringify(payload));
  }

  /**
   * 引き継ぎ内容を読み戻します。読めなければ null を返します。
   * @param {string|null|undefined} encoded
   * @returns {{favorites: string[], hiddenSources: string[], hiddenItems: string[]}|null}
   */
  function decode(encoded) {
    const text = String(encoded || "");
    if (!text) return null;

    let parsed = null;
    try {
      parsed = JSON.parse(decodeURIComponent(text));
    } catch {
      // 壊れた値・細工された値は黙って無視する。引き継ぎは補助的な処理であり、
      // ここで失敗してもニュースページ自体は通常どおり使える。
      return null;
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    return {
      favorites: cleanIds(parsed.favorites),
      hiddenSources: cleanSources(parsed.hiddenSources),
      hiddenItems: cleanIds(parsed.hiddenItems)
    };
  }

  window.SHINAGAWA_NEWS_MIGRATION = { encode, decode, LIMIT };
})();
