/*
 * Googleログインを完了できない環境の判定です。
 *
 * FirebaseのGoogleログインは、認証ハンドラー（shinagawakugiakidb.firebaseapp.com/__/auth/handler）が
 * Googleへ移動する前にsessionStorageへ状態を書き、戻ってきた後にそれを読む作りになっています。
 * このサイトは taku3516.github.io から配信しているためドメインが異なり、
 * WebKitのストレージ分割によってこの読み書きが別扱いになります。結果、戻ってきた時点で
 * 「Unable to process request due to missing initial state」となり、ログインを完了できません。
 *
 * iOS・iPadOSはブラウザの種類によらず中身がWebKitなので、Chromeを使っても同じです。
 * 恒久的に解決するには、サイトの配信元と authDomain のドメインをそろえる必要があります
 * （docs/firebase-sync-setup.md 参照）。それまでは、エラー画面を見せる代わりに
 * 事前に案内します。
 *
 * 判定は控えめにします。取りこぼすと分かりにくいエラーが出るだけですが、
 * 巻き込むと現に動いている環境のログインまで使えなくなるためです。
 */

/**
 * Googleログインを完了できない環境かどうかを判定します。
 * @param {string|null|undefined} userAgent navigator.userAgent
 * @param {number|null|undefined} maxTouchPoints navigator.maxTouchPoints
 * @returns {boolean} 完了できない環境なら true
 */
export function isPopupSignInBlocked(userAgent, maxTouchPoints) {
  const agent = String(userAgent || "");
  if (!agent) return false;

  // iPhone・iPod、およびiPadOS 13より前のiPad。
  if (/iPhone|iPod|iPad/.test(agent)) return true;

  // iPadOS 13以降のiPadは、UserAgentがMacと同じ表記になる。
  // Macにはタッチ画面がないため、タッチ対応の有無で見分けられる。
  const touchPoints = Number(maxTouchPoints);
  return /Macintosh/.test(agent) && Number.isFinite(touchPoints) && touchPoints > 1;
}
