# AGENTS.md

品川区議会DB。区議会の会議録・議案・選挙・政治資金と、郷土史「品川の歴史」を
公開する静的サイト。GitHub Pages で配信している。

このファイルは AI エージェント向けの作業規約。人向けの説明は `README.md`、
「品川の歴史」の設計と調査記録は `docs/rekishi-plan.md` にある。

---

## 言語

**応答・コミットメッセージ・コード内のコメントは、すべて日本語で書く。**

## コーディング規約

- 関数には型アノテーションを付ける
- エラーハンドリングを省略しない。失敗は黙って飲み込まず、何が起きたかを言う
- 外部ライブラリは増やさない。Python は標準ライブラリだけで書く
- 画面側はフレームワークを使わない素の HTML/CSS/JS。`file://` で開いても動くこと

## 作業ルール

- **ファイルを編集する前に必ず読む**
- **テストを書いてから実装する（TDD）**
- 大きな変更の前にユーザーに確認する
- **自動で push しない。** コミット前に変更内容を要約して確認を取る
- 破壊的な操作（`rm -rf` など）は必ず確認を取る
- シークレットや API キーをコードに直接書かない

## 検査とテスト

変更したら必ず両方を通す。

```bash
python3 scripts/check_rekishi_data.py
python3 -m unittest discover -s scripts -p 'test_*.py'
```

## 公開範囲

`scripts/build_pages.py` が git 管理下のファイルを `_site` にコピーする。

- 先頭が `.` のディレクトリと、`PRIVATE_DIRECTORIES`（`docs` / `scripts`）、
  `PRIVATE_FILES`（`AGENTS.md`）は公開されない
- **それ以外のリポジトリ直下のファイルは公開される。** 置き場所に注意すること
- `exports/` は公開する（`chokai-map.html` が KML を配信している）

---

# 「品川の歴史」のデータ

## ファイル

| ファイル | 中身 |
|---|---|
| `data/rekishi.js` | 時代区分・地区・カテゴリー・確実性・**出典台帳**の語彙（これが正） |
| `data/rekishi-events.js` | できごと（年表） |
| `data/rekishi-places.js` | 地点 — **生成物。** `scripts/prepare_rekishi_places.py` が作る |
| `data/rekishi-people.js` | 人物 |
| `data/rekishi-names.js` | 地名 |

`rekishi-places.js` を手で編集しない。手入れした情報は
`scripts/prepare_rekishi_places.py` の中の表（`EXTRA_PLACES` など）に書く。

## 掲載の10の約束

1. **出典で確認できたことだけを載せる。** 推測で埋めない
2. 出典の URL と、該当箇所（節の見出し・ページ番号など）を `locator` に記録する
3. 事実・伝承・俗説・推定を `certainty` で区別する
4. **分からない年を無理に埋めない。** `year: null` と `yearText` で載せてよい
5. 資料によって記述が違うときは `variants` に食い違いを記録する
6. **出典自身が間違っていることがある。** 黙って直さず、裏を取って `variants` に残す
7. 利用条件を確認してから使う
8. **本文を転載しない。** 読んで事実を取り出し、自分の言葉で書く
9. 大量取得が禁じられていないか、`robots.txt` の `Crawl-Delay` を確かめる
10. 裏が取れていないものは保留にする。載せない

## 関係は出来事の側だけに書く

`event.relatedPeople` は画面が読むが、**`person.relatedEvents` はどの画面も
読まない。** 人物と出来事を結ぶときは必ず出来事の側に書く。検査が弾く。

## 和暦の検算

1つの出典から多数の項目を起こすときの安全網。`scripts/check_rekishi_data.py` が
`yearText` の和暦と `year` を突き合わせる。

- 元号表 `ERA_FIRST_YEAR` は保元（1156年）から令和まで
- **表に無い元号は黙って飛ばさず報告する。** 報告が出たら表に足す
- 改元の年は2つの元号が同じ西暦を指すので、`明治45年` も `大正元年` も 1912 年
- ただし**時代区分（`era`）との対応は近代以降だけ**。`明治45年2月` は改元
  （7月30日）より前なので `meiji`
- 近世以前の元号は時代区分と一対一に対応しないため、西暦だけを突き合わせる
- **人物の `era` は「その人が属する時代」**で生没年の元号とは別物
  （明治生まれで `showa-post` など）。この検算は出来事だけに掛けている

---

# 出典を増やすときの手順

## しながわデジタルアーカイブ（ADEAC）

`https://adeac.jp/shinagawa-city/top/` の区分は `topg/NN_*` で10個ある。

| 区分 | 中身 | 状態 |
|---|---|---|
| `01_history` | 品川区史・旧町村史ほか | 通史編 上巻・下巻を使用中 |
| `02_prpaper` | 区広報紙バックナンバー | 未使用 |
| `03_news` | 地域ニュースバックナンバー | 未使用 |
| `04_ukiyoe` | 浮世絵 | 未使用 |
| `05_document` | 古文書・古地図 | 未使用 |
| `06`〜`08_movie*` | 映像 | 未使用 |
| `09_statistics` | 品川区の統計 | 未使用 |
| `10_address` | 住居表示新旧対照表 | 旧町名37件に使用済み |

**利用規定が禁じるのは商用目的のプログラム取得だけ。** 非営利なら当たらない。
ただし本文は転載しない。`robots.txt` は `Crawl-Delay: 10` なので11秒あける。

### 区史から出来事を起こす

目次も本文も JavaScript で差し込まれるため、ページ URL を curl しても空が返る。
実体は iframe の中の静的 HTML。これを扱う道具がある。

```bash
# 目次を取って節を探す（--grep で見出しを絞る）
python3 scripts/adeac_sections.py --volume jo toc --grep '貝塚|工場'

# 節の本文を取る（11秒あけるので、まとまった数なら背後で走らせる）
python3 scripts/adeac_sections.py --volume jo fetch --range ht000650-ht001119

# 見出し・底本ページ・本文に分ける
python3 scripts/adeac_sections.py --volume jo extract

# 和暦を含む文だけ拾って、出来事の候補を探す
python3 scripts/adeac_sections.py --volume jo dated --contains '品川|大井|大崎'
```

`--volume jo` が上巻、`ge` が下巻。出力は `scripts/out/adeac/<volume>/`（git 管理外）。

本文には底本のページ番号が入っているので、`locator` には
**「編・章・節の見出し＋何頁か」**を書く。例:

```
"locator": "二 原始・古代編（一）原始時代の品川「居木橋貝塚」128〜135頁"
```

### 起こした出来事を年表に足す

下書きを出来事の配列の JSON で書き、次で追記する。ID が既にあるものは飛ばす。

```bash
python3 scripts/merge_rekishi_events.py scripts/out/adeac/jo/draft-1.json --dry-run
python3 scripts/merge_rekishi_events.py scripts/out/adeac/jo/draft-1.json
python3 scripts/check_rekishi_data.py
```

### 収録の線引き

- **1節1件にしない。** 年が確定できて品川区内の出来事といえるものだけを拾う。
  分析や断面の記述（「区内小工場の実態」など）は出来事にしない
- **見出しが言う出来事と、`year` が指す事実を一致させる。** 人物を扱うときに
  起こしやすい。「邸内に寺子屋を開く」という見出しに生年を入れると、年表は
  生まれた年に寺子屋を開いたことにしてしまう。開設年が出典から分からなければ
  `year: null` にして、`yearText` には確認できた範囲だけを書く。
  **検査では捕まらない。** データとしては整合していて和暦の検算も通るのに、
  意味の層だけがずれているため
- **区史の「現在」は刊行時点**（上巻1973年・下巻1974年）。ただし「現在」には
  2種類あるので、機械的に全部書き換えないこと。
  - **地名や組織の言い換え**（「稲荷社（現在の品川神社）」「烏森（現在の新橋）」）は
    いまも成立するのでそのままでよい
  - **現況の主張**（「現在も年2回行われている」「現在は12座が伝わる」）は
    1973年の話なので、「区史が刊行された昭和48年（1973年）の時点では…」と
    時点を明記する。いま現在のことを書くなら、別途確認した出典を付ける
- **遺跡の年代と発掘の年は分ける。** 別々の出来事にする
- **「無いこと」も出典が述べていれば事実。** 「弥生の出土は区内に2点だけ」のような
  記述は、理由ごと載せてよい
- 会社の区外での出来事は入れない。品川区に関わる部分を出来事にする
- 個人名は慎重に。公人・歴史上の人物は書くが、市民運動に加わった一個人などは
  「区内◯◯の住民」とする

---

# Git と PR

- コミットメッセージは日本語
- **自動で push しない。** コミット前に変更内容を要約して確認を取る
- `main` への直接 push は禁止。強制 push も禁止
- squash マージなので、**マージ済みブランチで作業を続けない。**
  `git push` が `* [new branch]` を返したら、元 PR がマージされてブランチが
  消えていた合図。`origin/main` から切り直すこと

## マージ前に確かめる4点

1. CI が通っている（`gh pr checks <n>`）
2. Codex のレビューが `completed`
3. **レビュー対象の `commit_sha` が head と一致している**
4. 未解決のレビュースレッドが 0

```bash
gh pr view <n> --json headRefOid --jq '.headRefOid'
gh api repos/taku3516/shinagawa-gikai-db/issues/<n>/comments \
  --jq '.[] | select(.user.login=="chatgpt-codex-connector[bot]") | .body' \
  | grep -o 'codex-review-state:v1 {.*}' | tail -1
```

**Codex は push だけでは再レビューしない**（PR 作成・ドラフト解除・
`@codex review` コメントが引き金）。修正を push したら明示的に依頼する。

## 公開の確認

GitHub Pages は `Cache-Control: max-age=600`。デプロイ直後はエッジが古い版を
返し、クエリ文字列を足しても `x-cache: HIT` になる。**古い版が返るのは
キャッシュであって、デプロイの失敗ではない。** `last-modified` を見て判断する。

ブラウザで確かめるときは、データファイルを `fetch(..., {cache:'reload'})` して
から `location.reload()` する。**件数ではなく、DOM に何件描画されているかを数える。**

---

# セッションログ

作業の区切りに `/Users/apple/my-claude-project/session-logs/YYYY-MM-DD.md` へ
追記する（リポジトリ外）。作業内容・変更したファイル・重要な決定事項・
未完了のタスクを、1セッション30行以内で。
