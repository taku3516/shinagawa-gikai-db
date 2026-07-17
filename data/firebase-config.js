/*
 * 任意ログイン・同期機能の公開設定です。
 * Firebase Console で取得した「ウェブアプリの設定」だけを記入してください。
 * OAuth クライアントシークレット、サービスアカウント鍵、秘密鍵は絶対に置かないでください。
 */
window.SHINAGAWA_FIREBASE_SYNC = Object.freeze({
  enabled: false,
  sdkVersion: "12.16.0",
  firebaseConfig: Object.freeze({
    apiKey: "",
    authDomain: "",
    projectId: "",
    appId: "",
    messagingSenderId: ""
  }),
  appCheck: Object.freeze({
    enabled: false,
    enterpriseSiteKey: ""
  })
});
