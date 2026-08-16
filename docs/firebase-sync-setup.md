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

### 4. サイト側の公開設定を入れる（公開情報として扱う）

Firebaseのウェブ設定はブラウザへ配信されるため、リポジトリを非公開にしても利用者からは参照できます。特に `apiKey` は秘密鍵の代わりにはなりません。共有中の古いキーは直ちに削除せず、サイト専用キーへ切り替えたあと、他の利用箇所も移行してからローテーションしてください。

リポジトリ内の `data/firebase-config.js` は、Secret scanningへの再混入を防ぐため空欄・無効のまま管理します。公開時はリポジトリSecret `FIREBASE_API_KEY` を `scripts/build_pages.py` が生成物だけに差し込み、Git履歴やPull Requestにはキーを残しません。

FirebaseのウェブAPIキーはブラウザへ送られる公開識別子であり、GitHub Secretsに置いても公開サイトの利用者からは確認できます。秘密にする目的ではなく、Gitへの誤コミットを防ぐ目的で使用します。実際の保護は、サイト専用キー、HTTPリファラー制限、Firebase APIだけのAPI制限、Firestoreルール、App Checkで行います。他のGoogle APIと同じキーを共有しないでください。

サイト専用キーを作成したら、GitHubのリポジトリで「Settings」→「Secrets and variables」→「Actions」→「New repository secret」を開き、名前を `FIREBASE_API_KEY` として保存します。サービスアカウントJSON、`private_key`、OAuthのクライアントシークレットは保存しません。

Google Cloud Consoleの「APIとサービス」→「認証情報」で、サイト専用キーの「アプリケーションの制限」をウェブサイトにし、`taku3516.github.io`、`taku3516.github.io/*`、`shinagawakugiakidb.firebaseapp.com/*` だけを許可します。最後のドメインはGoogleログインの認証ハンドラー（`/__/auth/handler`）で必要です。「APIの制限」ではFirebase Management API、Identity Toolkit API、Token Service API、Cloud Datastore API、Google Cloud Firestore APIだけを許可し、Generative Language APIなど無関係なAPIを同じキーへ追加しないでください。既存の共有キーは変更せず、利用箇所を移行してから別途ローテーションします。

設定後は次の簡易検査を実行できます。

```bash
python3 scripts/check_firebase_sync.py
```

同じ検査はPull Requestとpushでも自動実行され、Google APIキー形式や秘密情報らしい値がリポジトリ内の公開設定へ入ると失敗します。GitHub Pagesの公開処理は `FIREBASE_API_KEY` が未設定または形式不正なら停止します。

### 5. Firebase Hostingのデプロイを設定する（所有者のみ・初回だけ）

ニュースページの配信に必要です。**この操作にはFirebaseプロジェクトへのログインが必要なため、所有者ご自身での実行が必要です。**

**先に `firebase.json` の hosting 設定と `.firebaserc` がmainに入っていることを確認してください。** 未反映のまま実行すると `Didn't find a Hosting config in firebase.json` で止まります。

実行はリポジトリの直下です。親フォルダで実行しないでください。

```bash
cd /Users/apple/my-claude-project/shinagawa-gikai-db
```

```bash
npx firebase login
```

```bash
npx firebase init hosting:github
```

対話では次のように答えます。

- 対象プロジェクト: `shinagawakugiakidb`
- 公開ディレクトリ: `_news-app`（`.firebaserc` と `firebase.json` は用意済みなので、上書きするか聞かれたら **No**）
- ビルド用のワークフローを作るか: **No**（`.github/workflows/firebase-hosting.yml` を用意済み）
- GitHubリポジトリ: `taku3516/shinagawa-gikai-db`

完了すると、GitHub Secretsに `FIREBASE_SERVICE_ACCOUNT_SHINAGAWAKUGIAKIDB` が登録されます。ワークフローはこの名前を参照します。別の名前で登録された場合は `.github/workflows/firebase-hosting.yml` の該当箇所を合わせてください。

初回はGitHub Actionsの「Firebase Hostingへ公開（ニュースページ）」を手動実行して確認できます。

### 6. 2台で確認する

1. 公開サイトを開き、1台目でGoogleログインする
2. ニュースに★を付け、配信元を1つ非表示にする
3. 別のスマートフォンまたはパソコンで同じGoogleアカウントにログインする
4. ★と配信元設定が反映されることを確認する
5. 片方で★を外し、もう片方にも反映されることを確認する
6. ログアウト後、その端末がログイン前の端末内保存表示へ戻ることを確認する

## iPhone・iPadでログインできない理由（既知の制限）

**iOS・iPadOSではGoogleログインを完了できません。** ブラウザの種類は関係ありません（iOSではChromeも中身がWebKitのため、Safariと同じ挙動になります）。パソコンのブラウザでは従来どおり利用できます。

### 仕組み

FirebaseのGoogleログインは、認証ハンドラーが2段階でsessionStorageを使います。

1. ポップアップが `shinagawakugiakidb.firebaseapp.com/__/auth/handler` を開く
2. ハンドラーが**sessionStorageへ状態を書き**、Googleのログイン画面へ移動する
3. ログイン後、Googleがハンドラーへ戻す
4. ハンドラーが**sessionStorageから状態を読む**

このサイトは `taku3516.github.io` から配信しているため、ハンドラーは別ドメインです。WebKitはストレージ分割（Storage Partitioning）を行うため、2で書いた領域と4で読む領域が別扱いになり、次のエラーになります。

```
Unable to process request due to missing initial state.
This may happen if browser sessionStorage is inaccessible or accidentally cleared.
```

エラー文には `signInWithRedirect` も挙がりますが、これは原因候補の列挙です。このサイトはポップアップ方式のみを使っています。

### 試したが解決しなかった方法

- **リダイレクト方式へ切り替える**: 解決しません。Firebase SDKは「リダイレクト中」の印をsessionStorageに置くため、webアプリが終了すると資格情報を受け取れません
- **ポップアップをタップと同じ処理のかたまりの中で呼ぶ**: これは別の問題（ポップアップが開かない）への正しい対処ですが、本件は解決しません。PR #69 で試し、#70 で差し戻しました

### 解決方法：ニュースページだけを移す

**配信元と `authDomain` のドメインをそろえる**必要があります。ただし移すのは**ログインするページだけ**で十分です。

| | 配信元 | URL |
| --- | --- | --- |
| ニュースページ | Firebase Hosting | `https://shinagawakugiakidb.firebaseapp.com/news.html` |
| それ以外すべて | GitHub Pages | `https://taku3516.github.io/shinagawa-gikai-db/` |

サイト全体を移してはいけません。無料枠の転送量に収まらなくなります。

| 項目 | 実測（圧縮後） |
| --- | --- |
| ニュースページ一式 | **0.076 MB** → 1日あたり約4,700表示ぶん |
| トップページ | 0.65 MB → 約550表示ぶん |
| 会議録全文ページ | 0.75 MB → 約480表示ぶん |
| 会議録全文 `data/minutes` | 493 MB（GitHub Pagesに据え置き） |
| Firebase Hosting 無料枠 | 転送 360 MB/日、保存 10 GB |

ログインするページはニュースページだけなので、他を巻き込む必要はありません。**制約に収まらないときは、動かす範囲を疑ってください。**

### 仕組み

- `scripts/build_news_app.py` が Firebase Hosting 用の配信物（`_news-app/`）を作ります。配信対象は `FILES` に列挙したものだけです。**ここに足すと転送量が増えます。**
- 別ドメインになるため、ニュースページから他ページへのリンクは絶対URLへ書き換えます（`site-url.js`）。基準URLは配信時に差し込みます。GitHub Pages 側のページでは基準URLが無いので、従来どおり相対リンクのまま動きます
- どのページからでもニュースへ直接行けるよう、ナビゲーションのニュースリンクだけは常に絶対URLです（`site-nav.js` の `NEWS_URL`）
- 旧URL（`taku3516.github.io/.../news.html`）は転送ページになります。`scripts/build_pages.py` が `news-moved.html` を `news.html` として配ります。リポジトリの `news.html` は本体のままなので、ローカルでダブルクリックしたときは従来どおり開きます

### 端末内保存の引き継ぎ

端末内保存の領域はURLごとに分かれるため、配信元が変わると★と表示設定が空から始まります。ログインした利用者はクラウドから復元されますが、ログインしない利用者のために転送時に引き継ぎます（`news-migration.js`）。

- 受け渡しはURLの `#` 以降を使います。`#` 以降はサーバーへ送られず、アクセス記録に残りません
- 運ぶのは★・非表示にした配信元・非表示にした記事だけです
- 取り込むのは**この端末にまだ保存が無いときだけ**で、既存の内容は上書きしません
- URLは誰でも書き換えられるため、受け取り側は形式と件数を検査してから保存します
- 取り込んだ直後にURLから消し、再読み込みで二度実行されないようにします

```bash
node --test scripts/news-migration.test.mjs
node --test scripts/site-url.test.mjs
```

### 現在の対応

移行までの間、iOS・iPadOSでは**ログインボタンを無効にし、事前に案内を表示します**。分かりにくいエラー画面へ進ませないためです。判定は `news-sync-environment.js` にあり、次の検査で確認できます。

```bash
node --test scripts/news-sync-environment.test.mjs
```

遮る条件は「iOS・iPadOS」**かつ**「配信元と `authDomain` が不一致」の両方です。片方だけで判断してはいけません。

- iOSだけで判断すると、**ドメインをそろえた配信元でもiOS利用者が押せなくなり、移行の成果を打ち消します**
- ドメインだけで判断すると、パソコンのブラウザまで巻き込みます（不一致でも動くため）

この条件により、移行期間中に旧URLと新URLが併存しても、それぞれ正しく振る舞います。旧URLでは案内を出し、新URLでは通常どおりログインできます。移行後にこの判定を取り除く作業も不要です。

判定は控えめにしています。判定材料（UserAgent・配信元・authDomain）のいずれかが取れない場合は遮りません。取りこぼしても分かりにくいエラーが出るだけですが、巻き込むと現に動いている環境のログインまで使えなくなるためです。

## App Check（動作確認後に推奨）

不正な自動アクセスへの対策を強める場合は、Firebase App CheckでreCAPTCHA Enterpriseを登録できます。サイトキーを `enterpriseSiteKey` に入れ、`appCheck.enabled` を `true` にします。

最初から強制を有効にすると、設定ミスの際に正規利用者も同期できなくなります。まず監視だけで正規リクエストが確認できる状態にし、App Checkの指標を確認してからFirestoreで強制を有効にしてください。Authenticationについては、Firebase Consoleに対象として表示される場合だけ検討します。

## 削除と費用管理

- ログイン後の「同期データと連携を削除」から、Firestore上の保存内容とFirebase Authenticationの利用者情報を削除できます
- Firebase Consoleでは予算アラートを設定し、利用量を定期確認してください
- 無料枠や料金条件は変更される可能性があるため、公開前にFirebase公式料金ページを確認してください
