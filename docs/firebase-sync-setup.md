# ニュース保存の任意ログイン・同期 設定手順

ニュースページは、Firebaseを設定しない状態でも従来どおり端末内保存で動きます。設定後は、希望する利用者だけがGoogleアカウントでログインし、「★ 保存済み」と配信元の表示設定を端末間で同期できます。

## 安全設計

- ログインは任意。未ログイン利用者の操作や端末内保存は変更しない
- Google認証では追加のGoogleサービス権限を要求しない
- 既定ではブラウザを閉じるとログイン状態を終了する
- 「この端末でログイン状態を維持」は利用者が明示的に選んだ場合だけ有効
- Firestoreのブラウザ永続キャッシュを使わず、共用端末に同期データを残しにくくする
- FirestoreにはニュースIDと非表示にした配信元だけを保存し、閲覧履歴・検索語・ニュース本文・メールアドレスは保存しない
- Firestoreルールで、自分のデータ以外は読み書きできないようにする
- クライアントシークレットや秘密鍵はGitHubに置かない

## 所有者が行う設定

### 1. Firebaseプロジェクトを作る

1. [Firebase Console](https://console.firebase.google.com/)を開き、「プロジェクトを追加」を選ぶ
2. 分かりやすいプロジェクト名を入力する
3. Google Analyticsは、この同期機能だけなら無効でも構わない
4. プロジェクトの概要からウェブアプリ（`</>`）を追加する
5. 表示された `firebaseConfig` を控える（これはウェブ公開用の識別情報で、秘密鍵ではない）

### 2. Googleログインを有効にする

1. 「Authentication」→「始める」→「Sign-in method」を開く
2. 「Google」を有効にし、サポートメールを選んで保存する
3. 「Authentication」→「Settings」→「Authorized domains」を開く
4. `taku3516.github.io` を許可ドメインに追加する

ローカルのHTTPサーバーでもログインを試す場合だけ、`localhost` も許可ドメインに追加します。`index.html` を直接ダブルクリックした `file://` 表示では、端末内保存は使えますがGoogleログインの確認はできません。

追加のGmail、Google Drive、連絡先などの権限は設定しません。

### 3. Firestoreを作り、ルールを公開する

1. 「Firestore Database」→「データベースを作成」を開く
2. 本番環境モードを選ぶ
3. 利用者に近いロケーションを選ぶ（作成後に変更しにくいため確認する）
4. 「ルール」タブを開く
5. リポジトリの `firebase/firestore.rules` の全文を貼り付け、「公開」を押す

テストモードのまま公開しないでください。用意したルールは、ログイン利用者本人の領域だけを許可し、それ以外を既定で拒否します。

### 4. サイト側の公開設定を入れる

`data/firebase-config.js` の空欄に、手順1で控えた値を貼り付けます。`messagingSenderId` が表示されていれば、それも貼り付けます。最後に先頭の `enabled` を `true` にします。

```js
window.SHINAGAWA_FIREBASE_SYNC = Object.freeze({
  enabled: true,
  sdkVersion: "12.16.0",
  firebaseConfig: Object.freeze({
    apiKey: "Firebase Consoleに表示された値",
    authDomain: "Firebase Consoleに表示された値",
    projectId: "Firebase Consoleに表示された値",
    appId: "Firebase Consoleに表示された値",
    messagingSenderId: "Firebase Consoleに表示された値"
  }),
  appCheck: Object.freeze({
    enabled: false,
    enterpriseSiteKey: ""
  })
});
```

サービスアカウントJSON、`private_key`、OAuthのクライアントシークレットは貼り付けません。

Google Cloud Consoleの「APIとサービス」→「認証情報」で、ウェブアプリが使うBrowser keyの「APIの制限」も確認します。Firebaseが自動設定したFirebase関連APIだけを許可し、Generative Language APIなど無関係なAPIを同じキーへ追加しないでください。既存の制限を変更する場合は、先にテストしてから本番へ反映します。

設定後は次の簡易検査を実行できます。

```bash
python3 scripts/check_firebase_sync.py
```

### 5. 2台で確認する

1. 公開サイトを開き、1台目でGoogleログインする
2. ニュースに★を付け、配信元を1つ非表示にする
3. 別のスマートフォンまたはパソコンで同じGoogleアカウントにログインする
4. ★と配信元設定が反映されることを確認する
5. 片方で★を外し、もう片方にも反映されることを確認する
6. ログアウト後、その端末がログイン前の端末内保存表示へ戻ることを確認する

## App Check（動作確認後に推奨）

不正な自動アクセスへの対策を強める場合は、Firebase App CheckでreCAPTCHA Enterpriseを登録できます。サイトキーを `enterpriseSiteKey` に入れ、`appCheck.enabled` を `true` にします。

最初から強制を有効にすると、設定ミスの際に正規利用者も同期できなくなります。まず監視だけで正規リクエストが確認できる状態にし、App Checkの指標を確認してからFirestoreで強制を有効にしてください。Authenticationについては、Firebase Consoleに対象として表示される場合だけ検討します。

## 削除と費用管理

- ログイン後の「同期データと連携を削除」から、Firestore上の保存内容とFirebase Authenticationの利用者情報を削除できます
- Firebase Consoleでは予算アラートを設定し、利用量を定期確認してください
- 無料枠や料金条件は変更される可能性があるため、公開前にFirebase公式料金ページを確認してください
