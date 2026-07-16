# 会議録要約バッチ用プロンプト

`scripts/out/history/batches/rXX.json` と、各項目の `contextPath` にある会議録抜粋を使い、未完了の質問者を処理してください。

## 作業ルール

- `topics` の各項目を削除・統合・言い換えせず、同じ順序で `qaSummaries` を作る。
- `qaSummaries` は各要素を `title`、`question`、`answer` の3項目にする。
- `title` は対応する `topics` の文字列と完全に同じにする。
- `question` は、議員が何を問題として何を求めたかを、原則1〜2文でまとめる。
- `answer` は、区長・教育長・担当部長などの答弁を、原則1〜3文でまとめる。
- 質問者の主張と区側答弁を混同しない。評価や推測を加えない。
- 数値、時期、制度名、賛否は会議録にある範囲で正確に残す。
- 複数の答弁者がいる場合は、重要な回答を統合してよい。
- 答弁が明確でない場合は、何が示されなかったかを断定しすぎずに記載する。
- `sourceStatus` が `withdrawn` の項目は自動処理済みなので変更しない。
- `minutesUrl`、`officialQuestionUrl`、`topics`、`memberId` など既存フィールドは変更しない。
- 完了した質問者だけ `summaryStatus` を `complete` にする。

## 完了条件

保存後、次を実行して件数・対応順・空欄を検証してください。

```sh
python3 scripts/build_history_supplements.py --years 7 6 5 4 3 2 1
```

全年度が検証完了した後だけ、次で公開用補足ファイルを生成してください。

```sh
python3 scripts/build_history_supplements.py --years 7 6 5 4 3 2 1 --write
```
