/*
 * Googleログインの「呼び出し方」だけを切り出したものです。
 *
 * ブラウザは、利用者のタップから続くひとまとまりの処理の中で開かれた窓しか許可しません。
 * 途中に await（保存領域への書き込みなど）を挟むとこの許可が切れ、
 * ホーム画面のwebアプリでは窓が開いても中身を読み込めず、白いまま止まります。
 * そのため、ログイン開始は await を挟まず同期的にポップアップを呼びます。
 *
 * 保持方式（ログイン状態を維持するか）は、タップより前のチェックボックス操作時に
 * 適用しておきます。ログイン時に適用しようとすると上記の許可が切れます。
 */

/**
 * チェックボックスの状態に対応する保持方式を返します。
 * @param {{browserLocalPersistence: unknown, browserSessionPersistence: unknown}} authApi
 * @param {boolean} shouldRemember ログイン状態を端末に維持するか
 * @returns {unknown} Firebaseの保持方式
 */
export function persistenceFor(authApi, shouldRemember) {
  return shouldRemember
    ? authApi.browserLocalPersistence
    : authApi.browserSessionPersistence;
}

/**
 * 保持方式を先に適用します。タップより前に呼ぶ前提で、失敗しても画面は止めません。
 * @param {{setPersistence: Function, browserLocalPersistence: unknown, browserSessionPersistence: unknown}} authApi
 * @param {unknown} auth Firebaseのauthインスタンス
 * @param {boolean} shouldRemember ログイン状態を端末に維持するか
 * @returns {Promise<void>}
 */
export async function applyPersistenceChoice(authApi, auth, shouldRemember) {
  try {
    await authApi.setPersistence(auth, persistenceFor(authApi, shouldRemember));
  } catch (error) {
    // 保持方式を切り替えられなくてもログイン自体は可能なため、記録だけ残す。
    console.error("ログイン状態の保持方式を切り替えられませんでした。", error);
  }
}

/**
 * ログインを開始します。
 *
 * この関数は async にしません。async にすると呼び出し側が await を挟みやすく、
 * ポップアップがタップと切り離されてホーム画面のwebアプリで開けなくなります。
 * 戻り値のPromiseは、呼び出し側が結果を待つためだけに使います。
 *
 * @param {{signInWithPopup: Function}} authApi
 * @param {unknown} auth Firebaseのauthインスタンス
 * @param {unknown} provider Googleのプロバイダ
 * @returns {Promise<unknown>} ログイン結果
 */
export function startGoogleSignIn(authApi, auth, provider) {
  return authApi.signInWithPopup(auth, provider);
}

/**
 * ログイン失敗が「利用者が自分で閉じた・やり直した」ものかを判定します。
 * これらはエラー表示にせず、通常の案内に戻します。
 * @param {{code?: string}|null|undefined} error
 * @returns {boolean}
 */
export function isUserCancelled(error) {
  return error?.code === "auth/popup-closed-by-user"
    || error?.code === "auth/cancelled-popup-request";
}

/**
 * ポップアップ自体が開けなかった失敗かを判定します。
 * ホーム画面のwebアプリで許可が切れた場合や、ポップアップ抑止の場合に該当します。
 * @param {{code?: string}|null|undefined} error
 * @returns {boolean}
 */
export function isPopupUnavailable(error) {
  return error?.code === "auth/popup-blocked"
    || error?.code === "auth/operation-not-supported-in-this-environment";
}
