/*
 * ログイン方式の選択です。
 *
 * FirebaseのGoogleログインは、認証ハンドラーがGoogleへ移動する前にsessionStorageへ
 * 状態を書き、戻ってきた後にそれを読む作りになっています。この読み書きがどの領域に
 * 置かれるかで、使える方式が変わります。
 *
 * ポップアップ方式は、iOS・iPadOSでは完了できません。ハンドラーが別窓で動くため、
 * 書いた領域と読む領域がWebKitのストレージ分割で別扱いになり、
 * 「Unable to process request due to missing initial state」になります。
 * iOSはブラウザの種類によらず中身がWebKitなので、Chromeを使っても同じです。
 *
 * 遷移方式（signInWithRedirect）は、印がアプリ自身のドメインの領域に置かれます。
 * 配信元と authDomain のドメインが一致していれば往復しても残るため、完了できます。
 * 一致していないと、遷移方式でも印が別領域になり、やはり完了できません。
 *
 * パソコンのブラウザではストレージ分割が起きないため、ポップアップ方式のまま
 * 従来どおり利用できます。動いているものを変えません。
 *
 * 判定は控えめにします。材料が取れないときはポップアップ方式に任せます。
 */

/**
 * iOS・iPadOSかどうかを判定します。
 * @param {string|null|undefined} userAgent navigator.userAgent
 * @param {number|null|undefined} maxTouchPoints navigator.maxTouchPoints
 * @returns {boolean}
 */
export function isWebKitOnlyPlatform(userAgent, maxTouchPoints) {
  const agent = String(userAgent || "");
  if (!agent) return false;

  // iPhone・iPod、およびiPadOS 13より前のiPad。
  if (/iPhone|iPod|iPad/.test(agent)) return true;

  // iPadOS 13以降のiPadは、UserAgentがMacと同じ表記になる。
  // Macにはタッチ画面がないため、タッチ対応の有無で見分けられる。
  const touchPoints = Number(maxTouchPoints);
  return /Macintosh/.test(agent) && Number.isFinite(touchPoints) && touchPoints > 1;
}

/**
 * サイトの配信元と authDomain が同じドメインかを判定します。
 * @param {string|null|undefined} currentHost location.hostname
 * @param {string|null|undefined} authDomain 設定のauthDomain
 * @returns {boolean} 同じなら true
 */
export function isSameAuthDomain(currentHost, authDomain) {
  const host = String(currentHost || "").trim().toLowerCase();
  const auth = String(authDomain || "").trim().toLowerCase();
  if (!host || !auth) return false;
  return host === auth;
}

/**
 * この環境で使うログイン方式を返します。
 * @param {string|null|undefined} userAgent navigator.userAgent
 * @param {number|null|undefined} maxTouchPoints navigator.maxTouchPoints
 * @param {string|null|undefined} currentHost location.hostname
 * @param {string|null|undefined} authDomain 設定のauthDomain
 * @returns {"popup"|"redirect"|"unavailable"}
 */
export function signInMethod(userAgent, maxTouchPoints, currentHost, authDomain) {
  if (!isWebKitOnlyPlatform(userAgent, maxTouchPoints)) return "popup";
  // ドメインが分からないときは従来の動きに任せる。
  if (!currentHost || !authDomain) return "popup";
  return isSameAuthDomain(currentHost, authDomain) ? "redirect" : "unavailable";
}
