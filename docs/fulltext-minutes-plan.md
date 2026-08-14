# 会議録全文の掲載設計

更新日: 2026年8月14日

本会議・委員会の質疑を、要約（抜粋）だけでなく**会議録の全文**でも読めるようにするための設計です。GitHub Pagesのまま、既存のデータ形式・`file://`での直接起動・横断検索を壊さずに実現することを条件にしています。

## 1. なぜ全文が必要か

現在の掲載は、公式会議録から実質的な質問と答弁の文を抜き出したものです（[質問・答弁要約の作成ルール](qa-summary-rules.md)）。実測すると、抜き出せているのは次の分量です。

| | 件数・分量 |
|---|---:|
| 抜き出した質疑 | 161,818件 |
| 質問の平均 | 152字 |
| 答弁の平均 | 91字 |
| 抜粋の合計 | 3,950万字 |

答弁が平均91字しかなく、文の途中で切れているものが多くあります。会議録の全文は1億4,578万字（後述）なので、**掲載できているのは原文の約27%**です。抜き出しの精度をこれ以上上げるより、全文を読めるようにするほうが確実です。

## 2. 実測した分量

`sourceMeta.characters`（各会議の全発言の文字数）と `sourceMeta.voices`（発言数）を全データから集計しました。

### 委員会

| 項目 | 実測値 |
|---|---:|
| 会議数 | 3,300会議 |
| 全文の文字数 | 145,782,231字 |
| UTF-8での容量 | **417 MB** |
| 1会議の平均 | 44,176字（約132 KB） |
| 1会議の最大 | 152,297字（約446 KB、平成14年3月11日 予算特別委員会） |
| 発言数 | 451,001発言（平均136発言/会議） |
| 会議時間の合計 | 620,555分（平均192分/会議） |

### 本会議

本会議は `sourceMeta` を持たないため未計測です。同じ会議録検索システムから取得しており、1日あたりの時間が委員会より長いことから**約100 MB**と見込みます。段階4に着手する前に、委員会と同じ方法で実測します。

### 圧縮後

令和6年の委員会データ（6.75 MB）をgzipすると1.63 MB、**圧縮率24%**でした。GitHub Pagesは`.js`をgzipで配信するため、転送量はこの比率で見積もれます。1会議あたり平均**約33 KB**、最大でも**約107 KB**です。

## 3. 設計方針 — データを3層に分ける

全文をそのまま既存の年別ファイルへ入れると、年1本のファイルが約30 MBになり、`kaigiroku.html`が年データを同期読み込みしている現在の方式では表示できなくなります。JS文字列はUTF-16なので、30 MBのUTF-8日本語はメモリ上60 MB超、オブジェクトの構造を含めると150〜300 MBに達し、モバイルのタブが落ちます。

そこで、**更新頻度と読み込み単位が違うものを別の層に分けます**。

| 層 | ファイル | 読み込み単位 | 更新頻度 |
|---|---|---|---|
| **索引層**（既存） | `data/<year>-committees-part-NN.js` | 年ごと | **高い**（抽出ロジックを直すたび再生成） |
| **全文層**（新規） | `data/minutes/<year>/<sessionId>.js` | **会議ごと** | **なし**（一度書いたら書き換えない） |
| 検索層（段階5） | 別設計 | — | — |

この分離が、容量・Git履歴・表示速度の3つの問題を同時に解きます。

- **表示**: 開いた会議1件分（平均132 KB / gzip 33 KB）しか読み込まない
- **帯域**: 1閲覧33 KBなので、Pagesの100 GB/月に対して月70万会議閲覧まで耐える（年単位で読み込む方式だと月1.4万PVで到達する）
- **Git履歴**: 抽出ロジックを直して26年分を作り直しても、書き換わるのは索引層（1年6 MB）だけで、全文層（1年16 MB）は1バイトも動かない

**全文層をwrite-onceに保つことが、この設計の要です。** ここを守れないと、作り直しのたびに数百MBが履歴へ積まれます。

## 4. 全文ファイルの形式

### 配置

```
data/minutes/r06/r06-20240515-19.js
data/minutes/r06/r06-20240517-5.js
...
```

- 年ディレクトリに分けます（1ディレクトリあたり120〜160ファイル、全体で約3,300ファイル）
- ファイル名は索引層の `session.id` をそのまま使うため、対応表が不要です
- 読み込み先のパスは `data/minutes/${session.id.slice(0, 3)}/${session.id}.js` で導出でき、3,300件分のパス文字列を索引層に持つ必要がありません

### 中身

```js
/* 令和6年5月15日 災害・環境対策特別委員会 会議録全文（公式会議録の転載）。scripts/prepare_committees.py で生成。 */
window.SHINAGAWA_DB.registerMinutes({
  "id": "r06-20240515-19",
  "dateIso": "2024-05-15",
  "committee": "災害・環境対策特別委員会",
  "sourceType": "formal",
  "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?...",
  "fetchedAt": "2026-08-14",
  "characters": 44176,
  "voices": [
    { "i": 1, "speaker": "石田委員長", "text": "ただいまから災害・環境対策特別委員会を開会いたします。…" },
    { "i": 2, "speaker": "中西環境課長", "text": "…" }
  ]
});
```

### `.json` ではなく `.js` にする理由

READMEに記載のとおり、このサイトは `index.html` をダブルクリックして `file://` で開いても動くことを要件にしています。`fetch()` は `file://` ではCORSに阻まれて使えません。`<script>`タグでの読み込みならどちらでも動くため、**既存の `loadScript()` をそのまま流用します**。ビルドもCORS設定も不要です。

登録関数は `data/site.js` に置きます。

```js
window.SHINAGAWA_DB.minutes = {};
window.SHINAGAWA_DB.registerMinutes = function (payload) {
  window.SHINAGAWA_DB.minutes[payload.id] = payload;
};
```

生成時は `json.dumps(..., ensure_ascii=False, separators=(",", ":"))` の出力をそのまま埋め込みます。U+2028 / U+2029 のみ `\u2028` / `\u2029` へ置き換えます（JSONはES2019以降のJavaScriptの部分集合ですが、この2文字だけ例外があるため）。

### 索引層への追加

各 `session` に次を足します。

```json
"hasFullText": true
```

`characters` と `voices` は既存の `sourceMeta` にあるため、そのまま表示に使います。

## 5. 生成側の変更

### 共通処理を切り出す

`scripts/prepare_committees.py` の `parse_html_voices` / `parse_pdf_voices` と、`scripts/prepare_history.py` の `parse_minutes_voices` は、いずれも同じ会議録検索システムのHTMLから発言リストを作っています。全文ファイルの書き出しは共通なので、新規に `scripts/minutes_fulltext.py` を置いて両方から使います。

```python
def write_minutes_file(path, payload) -> bool:
    """全文ファイルを書く。発言の中身が変わらないときは書かない。

    戻り値は書き込んだかどうか。既存ファイルの voices が一致する場合は
    fetchedAt も据え置き、ファイルに一切触れない。ここで毎回 fetchedAt を
    更新すると、作り直しのたびに3,300ファイルが差分になり Git 履歴が壊れる。
    """
```

冪等性がこの関数の唯一かつ最重要の責務です。

### `scripts/prepare_committees.py`

`process_document()` は既に `voices` を組み立てているので、そこから全文を書き出します。

- `--skip-fulltext`（索引層だけ作り直す。抽出ロジックの調整中はこちら）
- `--fulltext-only`（全文層だけ入れる。初回投入用）

を `argparse` へ追加します。既定は両方を出力します。

### 校正原稿から正式会議録への差し替え

校正原稿PDF（`sourceType: "draft"`）は正式版の公開後に公式サイトから削除されます。全文を保持すると「公式には存在しない版」がこちらに残るため、同じ会議の正式会議録を取得できた時点で全文ファイルを上書きします。`discover_formal` / `discover_drafts` が同日・同委員会の重複を落とす判定を既に持っているので、それをそのまま使います。

### `scripts/prepare_history.py`（本会議・段階4）

`parse_minutes_voices()` の結果を同じ形式で `data/minutes/<year>/<sessionId>.js` へ書きます。会議IDの付け方は本会議側の既存IDに合わせます。

## 6. 表示側の変更

### `kaigiroku.html`

現在 `renderCommitteeSession(details)` が `<details>` を開いた時点で会議の中身を組み立てています。この中に、全文用の入れ子を1つ足します。

```js
function minutesFile(session) {
  return `data/minutes/${session.id.slice(0, 3)}/${session.id}.js`;
}

async function renderFullText(details, session) {
  const box = details.querySelector("[data-fulltext]");
  if (!box || details.dataset.fullTextState) return;
  details.dataset.fullTextState = "loading";
  box.innerHTML = `<p class="fine-print">会議録全文を読み込んでいます…</p>`;
  try {
    if (!window.SHINAGAWA_DB.minutes[session.id]) {
      await loadScript(minutesFile(session));
    }
    box.innerHTML = fullTextHtml(session, window.SHINAGAWA_DB.minutes[session.id]);
    details.dataset.fullTextState = "done";
    setupDetailsAccessibility(box);
  } catch (err) {
    details.dataset.fullTextState = "";   // 開き直しで再試行できるよう戻す
    box.innerHTML = `<p class="fine-print">全文を読み込めませんでした。
      <a href="${esc(session.links[0].url)}" target="_blank" rel="noopener">公式の会議録</a>をご確認ください。</p>`;
  }
}
```

表示の構成は次のとおりです。

```
▼ 2024年5月15日 災害・環境対策特別委員会          39件
  開催時間：午後 1時00分～午後 3時02分
  ▼ 気候変動適応法の改正                          12件     ← 既存の抜粋
  ▼ …
  ▼ 会議録全文（136発言・約44,000字）                       ← 新規
      出典：公式会議録（2026-08-14取得） / 正式会議録
      ○石田委員長  ただいまから…
      ○中西環境課長 …
```

- 抜粋は現状のまま上に残します。会議一覧・横断検索・アンカーが全部そこに乗っているためです
- 全文は既定で閉じています。開いたときだけ読み込みます
- 136発言のDOM生成量は、現在の抜粋描画（39件×2文）と同程度です

### アンカー

- 全文ブロック: `#committee-<sessionId>-full`
- 発言単位: `#committee-<sessionId>-v0012`

`openAccordionForHash()` に、既存の `committee-` 分岐と同じ形で全文の分岐を足します。ハッシュが全文内を指す場合は `renderFullText()` を待ってからスクロールします。

### 抜粋から全文へ飛べるようにする（精度問題への直接の手当て）

抽出時に `exchange.voiceIndex`（元の発言の連番）を持たせておき、抜粋の各質疑に「原文を読む」リンクを付けます。

```
質問・意見（発言の抜粋）
  この資料のところから伺いたいのですけれども、区の対応のところで…
答弁・対応（発言の抜粋）
  環境課として全課に網をかけまして、丁寧に対応してまいりたいと考えています。薬局です。
                                                     → 原文を読む（発言 #47）
```

抜粋が途中で切れていても1クリックで原文に到達できるため、**抜粋の精度が低いこと自体が実害でなくなります**。これが今回の変更で最も効く部分です。

### `kaigi.html`

会議ワンストップからは `kaigiroku.html#committee-<sessionId>-full` へ飛ばすだけで足ります。全文の描画コードを二重に持ちません。

## 7. 検索の扱い

**段階1〜4では横断検索を索引層のままにします。** 全文は検索対象に含めません。

- 5億文字規模の全文をブラウザ側で検索する方法は現実的にありません
- 索引層（3,950万字）で当たりを付けて全文の該当発言へ飛べれば、実用上はほぼ足ります
- 開いている会議の中はブラウザの `Ctrl+F` が効きます。必要なら発言者名・語での簡易フィルタを全文ブロック内に置きます

全文検索を本格的にやる段階5は別設計とします。候補は次の2つです。

- **Pagefind** — 静的サイト向けの全文検索。インデックスを分割して必要な分だけfetchする設計で、GitHub Pagesのまま動きます。日本語の分割に対応しています
- **Cloudflare Workers + D1（SQLite FTS5）** — 検索だけを外部に逃がします。無料枠で収まる規模です

どちらを採るにせよ、索引層は消さずに残します。検索の第一段として引き続き使えるためです。

## 8. 容量とGit履歴の見積もり

| | 現状 | 委員会の全文まで | 本会議の全文まで |
|---|---:|---:|---:|
| 公開ファイル合計 | 155 MB | 約 572 MB | 約 672 MB |
| GitHub Pages上限（1 GB）までの余裕 | 869 MB | 452 MB | 352 MB |
| 今後の増加 | 年 +6 MB | 年 +22 MB | 年 +26 MB |
| `.git` | 65 MB | 初回 +約130 MB | 初回 +約160 MB |

GitHub Pagesの公開サイト上限は1 GB（ハード）です。本会議まで入れて約672 MB、年26 MB増なので**10年以上の余裕**があります。

### 履歴を守るための実装上の約束

1. **全文ファイルは内容が変わらない限り書き込まない**（`write_minutes_file` の冪等性）
2. **`fetchedAt` を差分の原因にしない**（内容が同じなら据え置く）
3. 索引層の作り直しでは `--skip-fulltext` を使う

### 併せて直すもの

- **`scripts/build_pages.py`** — 現在 `git ls-files` の結果を丸ごと `_site` へコピーしているため、`docs/`（848 KB）・`scripts/`（540 KB）・`exports/*.kml`（914 KB）も公開されています。公開対象から除きます
- **`.github/workflows/rebuild-committees.yml`** — `fetch-depth: 0` でクローンしているため、全文投入後は取得量が増えます。`filter: blob:none` を足して部分クローンにします
- **`.github/workflows/pages.yml`** — `actions/checkout` は既定の `fetch-depth: 1` のままで問題ありません

### 採らない選択肢

- **Git LFS** — GitHub PagesはLFS管理ファイルをポインタファイルのまま配信します。中身が出ないため、この用途では機能しません
- **全文を別リポジトリへ分ける** — 上記の見積もりどおり単一リポジトリで10年以上もつため、現時点では複雑さに見合いません。将来1 GBに近づいた場合の退避先としては有効です（その際はCORSヘッダの確認が必要です）

## 9. 段階的な進め方

| 段階 | 内容 | 分量 |
|---|---|---:|
| **1** | `scripts/minutes_fulltext.py` 新設、`prepare_committees.py` 改修、`data/site.js` に `registerMinutes`。**令和6年だけ**投入して形式を固める | 151会議 / 約16 MB |
| **2** | `kaigiroku.html` の全文表示・アンカー・抜粋からのリンク。令和6年で表示速度と読み込み時間を実測 | — |
| **3** | 残り25年を年ごとに投入（`rebuild-committees.yml` を年指定で実行。1年1コミット） | 3,149会議 / 約401 MB |
| **4** | 本会議の全文（`prepare_history.py`） | 約100 MB |
| **5** | 全文検索（別設計） | — |

段階1と2が終わった時点で「令和6年だけ全文が読める」状態になります。そこで表示の重さ・読み込み時間・法務面を実データで確認してから、残りを入れる判断ができます。**段階3に進まなくても、そこまでで価値が出る**構成にしてあります。

## 10. 検査

新規に `scripts/check_minutes_fulltext.py` を置き、`.github/workflows/check-qa-summaries.yml` と同じ形でCIに足します。

1. 索引層で `hasFullText: true` の全会議に、対応する全文ファイルがある
2. 全文ファイルの `characters` が索引層の `sourceMeta.characters` と一致する
3. 発言者が空の発言が一定割合を超えていない（PDF由来で崩れやすい）
4. 会議IDが重複していない
5. 1ファイルが1 MBを超えていない
6. `sourceType: "draft"` のまま残っている会議を一覧に出す（正式版への差し替え漏れの検知）

## 11. 注意点

### `file://` での起動を壊さない

READMEの「`index.html`をブラウザで直接開くだけで動作します」を維持するため、全文の取得は `fetch()` ではなく `<script>` 読み込みにします。ここを `fetch()` にすると、ローカルでの確認手順が変わってしまいます。

### 校正原稿PDF由来の全文

`parse_pdf_voices` は行の結合とページ番号の除去を機械的に行っています。抜粋では目立たなかった崩れが、全文では見えます。`sourceType: "draft"` の全文には「校正原稿PDFから機械的に文字を取り出したもの」と明示し、正式版の公開後に差し替えます。段階1では draft の全文を載せず、正式会議録のみを対象にする選択もあります。

### 法務・出典表示

要約・抜粋と全文の転載では扱いが変わります。着手前に品川区議会公式サイトの利用条件を確認してください。各全文ブロックの先頭には、次を必ず表示します。

- 出典URL（公式会議録への直リンク）
- 取得日
- 正式会議録か校正原稿かの区別
- 正確な内容は公式サイトで確認する旨

### 免責文言の見直し

現在の「※質問・答弁は、会議録の該当発言から要点を含む文を抜き出して掲載しています（要約ではありません）」という注記は、全文が並ぶと意味が変わります。利用者が**いま見ているのが抜粋なのか全文なのか**が常に分かる見出しと注記にします。

### 既存ドキュメントの更新

段階1の完了時に次を更新します。

- [サイトとデータの構成](architecture.md) — 全文層のデータ形式と読み込み方式
- [データの更新方法](data-maintenance.md) — `--skip-fulltext` / `--fulltext-only` の使い分け
- [自動更新とGitHub Actions](automation.md) — 全文検査の追加
- [質問・答弁要約の作成ルール](qa-summary-rules.md) — 抜粋の位置づけ（全文への入口であること）
- `README.md` — 収録範囲に全文を追記
