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

## ログイン方式は環境で変わる

FirebaseのGoogleログインは、認証ハンドラーがGoogleへ移動する**前にsessionStorageへ状態を書き**、戻ってきた**後にそれを読む**作りです。この読み書きがどの領域に置かれるかで、使える方式が変わります。

| 環境 | 方式 | 理由 |
| --- | --- | --- |
| パソコンのブラウザ | ポップアップ | ストレージ分割が起きないため従来どおり通る |
| iPhone・iPad（新URL） | **遷移**（`signInWithRedirect`） | ポップアップは完了できないが、遷移なら印が自分のドメインに残る |
| iPhone・iPad（旧URL） | 利用不可 | ドメインが不一致だと、どちらの方式でも印が別領域になる |

iOSはブラウザの種類によらず中身がWebKitなので、Chromeを使ってもSafariと同じです。

### なぜポップアップがiOSで完了できないか

ハンドラーが別窓で動くため、書いた領域と読む領域がWebKitのストレージ分割で別扱いになり、次のエラーになります。

```
Unable to process request due to missing initial state.
This may happen if browser sessionStorage is inaccessible or accidentally cleared.
```

### なぜ遷移方式なら通るか

遷移方式は別窓を開かず、アプリ自身が移動します。印はアプリ自身のドメインの領域に置かれるため、**配信元と `authDomain` が一致していれば**往復しても残ります。

**順序が大切です。** ドメインを揃える前に遷移方式を試しても失敗します（PR #68 で試して行き止まりでした）。印が別ドメインの領域に置かれるためです。ニュースページをFirebase Hostingへ移してドメインを揃えたことで、初めて遷移方式が使えるようになりました。

### 経緯

| PR | 内容 | 結果 |
| --- | --- | --- |
| #68 | ドメイン不一致のまま遷移方式へ | 行き止まり。クローズ |
| #69 | ポップアップをタップと同じ処理のかたまりで呼ぶ | 改善せず。#70 で差し戻し |
| #70 | #69 の差し戻し | **戻しても症状が変わらず、#69 が無関係と確定** |
| #71 | iOSで事前に案内 | 暫定対応 |
| #72 / #73 | ニュースページをFirebase Hostingへ移しドメイン一致 | ポップアップはなお失敗 |
| 本対応 | ドメイン一致を前提に、iOSは遷移方式へ | — |

### 実装

判定は `news-sync-environment.js` の `signInMethod()` にあります。

```bash
node --test scripts/news-sync-environment.test.mjs
```

判定材料（UserAgent・配信元・authDomain）が取れないときはポップアップ方式に任せます。誤って遷移方式にすると、現に動いているパソコンの体験を変えてしまうためです。

「ログイン状態を維持」の選択はページ移動をまたぐため、出発前に自分のドメインのsessionStorageへ預け、戻ったときに読み戻して消します。遷移方式が使えるのはドメイン一致時だけなので、この領域は必ず読み戻せます。

## App Check（動作確認後に推奨）

不正な自動アクセスへの対策を強める場合は、Firebase App CheckでreCAPTCHA Enterpriseを登録できます。サイトキーを `enterpriseSiteKey` に入れ、`appCheck.enabled` を `true` にします。

最初から強制を有効にすると、設定ミスの際に正規利用者も同期できなくなります。まず監視だけで正規リクエストが確認できる状態にし、App Checkの指標を確認してからFirestoreで強制を有効にしてください。Authenticationについては、Firebase Consoleに対象として表示される場合だけ検討します。

## 削除と費用管理

- ログイン後の「同期データと連携を削除」から、Firestore上の保存内容とFirebase Authenticationの利用者情報を削除できます
- Firebase Consoleでは予算アラートを設定し、利用量を定期確認してください
- 無料枠や料金条件は変更される可能性があるため、公開前にFirebase公式料金ページを確認してください
