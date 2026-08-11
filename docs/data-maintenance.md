# データの更新方法

品川区議会DBのデータを取得・再生成するための保守手順です。自動実行される処理とGitHub Actionsでの手動実行は[自動更新とGitHub Actions](automation.md)を参照してください。

## 必要な環境

基本的な生成処理にはPython 3を使います。会議録PDFの取得・解析にはpopplerの`pdfinfo`と`pdftotext`が必要です。

```bash
# Ubuntu / Debian
sudo apt-get install poppler-utils

# macOS
brew install poppler
```

## 質問・答弁要約

本会議の代表・一般質問と委員会質疑の要約は、「何について質問したか」「何について答弁したか」が読み取れることを条件にしています。判定と整形は`scripts/qa_summary.py`に集約し、生成、修復、検査で同じ定義を使います。

```bash
python3 scripts/check_qa_summaries.py           # 検査。要修正が1件でもあれば終了コード1
python3 scripts/check_qa_summaries.py --details # 問題のある要約も表示
python3 scripts/repair_qa_summaries.py --write  # 機械的に直せるものを修復
```

書き方、品質基準、公開前の検査は[質問・答弁要約の作成ルール](qa-summary-rules.md)を参照してください。

## 委員会質疑

過去年の委員会データは、西暦年を指定して再生成します。

```bash
python3 scripts/prepare_committees.py --year 2025
```

開発環境から会議録へ到達できない場合は、GitHub Actionsの「委員会質疑を会議録から作り直す」を実行してください。popplerと依存ライブラリの準備から、要約の検査、更新の保存までを行います。

## 本会議の質問・答弁

平成年の本会議要約は、平成の年数を指定して再生成します。

```bash
python3 scripts/build_heisei_year.py 20
```

GitHub Actionsの「本会議の質問・答弁を会議録から作り直す」でも実行できます。**委員会のローカル生成は西暦、本会議は平成年**を指定する点に注意してください。

平成30年〜令和7年の全件化・会議録要約と、平成13〜29年へ議案・請願陳情を追加する方法は[実装準備・監査手順](history-expansion.md)を参照してください。

## 意見書・決議等

品川区議会公式「意見書・決議等」ページの追加・更新を`data/resolutions.js`へ反映します。

```bash
python3 scripts/prepare_resolutions.py
```

## 品川区ニュース

### 関連ファイル

- `news.html` — ニュース一覧、タグ検索、保存済みニュースの表示
- `data/news-sources.json` — 地域語、タグ規則、RSS、RSSのない公式サイトの設定
- `data/news-items.js` — 収集済みニュース
- `scripts/collect_news.py` — 収集、重複排除、関連度判定、タグ付け
- `news-sync.js` / `data/firebase-config.js` — 希望者向けのGoogleログインと端末間同期。Git上では無効で、公開時に専用設定を注入
- `firebase/firestore.rules` — 利用者本人の同期領域だけを許可するルール

追加ライブラリなしで収集を試せます。

```bash
python3 scripts/collect_news.py
```

記事本文の転載を避けるため、保存する概要は最大240文字です。東京都公式RSSは再配信を伴う利用に事前申請が必要なため、設定には登録していますが無効にしています。

任意ログイン・同期を有効にする場合は[Firebase同期の設定手順](firebase-sync-setup.md)に沿って所有者設定を行います。未設定でもニュースページは動作します。

## 請願・陳情

`seigan.html`は、年データに入っている定例会ごとの請願・陳情を受理番号で名寄せした`data/petitions.js`を読みます。年データや委員会データを更新したら、外部サイトへ接続せずに台帳を作り直せます。

```bash
python3 scripts/prepare_petitions.py
```

- 継続審査で複数の定例会にまたがる案件は1件にまとめ、定例会ごとの議決結果を審査経過として並べます。
- 委員会会議録の議題名に受理番号があるものを委員会審査として紐付けます。
- 平成30年・令和元年の一部にある列ずれは、番号として読み直し、議決結果を「未収録」として扱います。
- 受理年は、委員会会議録の議題名と件名が一致する場合だけ補います。確定できない内容は推測で補完しません。
- 件数、未確定案件、取り込めなかった行は[請願・陳情データの収録状況](petition-inventory.md)に記録します。

### 公式ページからの取得

付託委員会、受理年月日、議決結果は、公式の[請願・陳情の審議状況](https://gikai.city.shinagawa.tokyo.jp/katsudou/petition)から取得し、`data/petitions-official.js`へ保存します。

```bash
python3 scripts/fetch_petitions.py --write     # 取得結果を書き込む
python3 scripts/fetch_petitions.py --inspect   # ページ構造だけを確認する
python3 scripts/prepare_petitions.py           # 年データと突き合わせて台帳を再生成する
```

- 対象は平成27年〜令和8年です。
- 公式ページの表は、令和元年以降の「委員会審査」「本会議結果」の2列と、平成31年以前の「結果」1列の両方に対応します。
- 備考が「〇〇委員会へ参考送付」の案件は、付託も議決もされていないため結果を空欄にします。

## 政務活動費

品川区議会公式サイトで公開されている令和7〜3年度の収支一覧と会派・議員別資料から`data/seimu.js`を再生成します。

```bash
python3 scripts/prepare_seimu.py
```

## 町会・自治会

東京都・品川区の町会一覧と住所区域、公式Shape境界、品川区町会自治会連合会としながわすまいるネットの公開プロフィールを取得します。

```bash
python3 scripts/prepare_chokai.py
python3 scripts/prepare_chokai_boundaries.py
python3 scripts/prepare_chokai_profiles.py
python3 scripts/export_chokai_kml.py
```

プロフィール取得は各サイトの公開条件に従い、ためまっぷの詳細ページを60秒間隔で取得します。公開されていない項目は推測せず、掲載しません。

生成された`exports/shinagawa-chokai-map.kml`は、Googleマイマップの「レイヤを追加」→「インポート」から読み込めます。町会・自治会区域を淡い4色で表示し、町会名、地域区分、住所区域、公開プロフィール、出典を各区域の属性として取り込めます。

## 過去年・未来年の追加

1. `data/r09.js`など、新しい年のファイルを既存年と同じ形式で作成します。登録先は`window.SHINAGAWA_DB.years["r09"]`のようにします。
2. `data/site.js`の`years`配列へ追加し、`available`を`true`にします。

```json
{
  "id": "r09",
  "label": "令和9年",
  "file": "data/r09.js",
  "available": true
}
```

`years`は会議録ページと横断検索の共通一覧なので、ここへ追加すると両方が新しい年を扱います。
