/*
 * Googleログインを完了できない環境の判定です。
 *
 * FirebaseのGoogleログインは、認証ハンドラー（<authDomain>/__/auth/handler）が
 * Googleへ移動する前にsessionStorageへ状態を書き、戻ってきた後にそれを読む作りです。
 * サイトの配信元と authDomain のドメインが異なると、WebKitのストレージ分割によって
 * この読み書きが別扱いになり、戻ってきた時点で
 * 「Unable to process request due to missing initial state」となって完了できません。
 *
 * iOS・iPadOSはブラウザの種類によらず中身がWebKitなので、Chromeを使っても同じです。
 * パソコンのブラウザ（Blink系など）ではこの分割が起きないため、従来どおり利用できます。
 *
 * したがって完了できない条件は「iOS・iPadOS」かつ「ドメインが不一致」の両方です。
 * ドメインをそろえた配信元（docs/firebase-sync-setup.md 参照）から開かれた場合は、
 * iOSでも問題なく完了できるため遮ってはいけません。
 *
 * 判定は控えめにします。取りこぼすと分かりにくいエラーが出るだけですが、
 * 巻き込むと現に動いている環境のログインまで使えなくなるためです。
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
 * Googleログインを完了できない環境かどうかを判定します。
 * iOS・iPadOSであり、かつドメインが不一致のときだけ true を返します。
 * @param {string|null|undefined} userAgent navigator.userAgent
 * @param {number|null|undefined} maxTouchPoints navigator.maxTouchPoints
 * @param {string|null|undefined} currentHost location.hostname
 * @param {string|null|undefined} authDomain 設定のauthDomain
 * @returns {boolean} 完了できない環境なら true
 */
export function isPopupSignInBlocked(userAgent, maxTouchPoints, currentHost, authDomain) {
  if (!isWebKitOnlyPlatform(userAgent, maxTouchPoints)) return false;
  // ドメインが分からないときは遮らない。動く環境を巻き込む方が損害が大きい。
  if (!currentHost || !authDomain) return false;
  return !isSameAuthDomain(currentHost, authDomain);
}
