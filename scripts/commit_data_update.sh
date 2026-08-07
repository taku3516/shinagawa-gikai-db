#!/usr/bin/env bash
# 自動生成したデータの更新をコミットして push する（GitHub Actions 用）。
#
# 会議録の取得や再生成には数分〜数十分かかる。その間に別のワークフロー
# （ニュース収集など）が main を進めていると、最後の push が
# 「! [rejected] main -> main (fetch first)」で落ちて成果が捨てられる。
# 取り直して積み直してから押す。
#
# 使い方: scripts/commit_data_update.sh "コミットメッセージ" data/ docs/

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "使い方: $0 <コミットメッセージ> <対象パス...>" >&2
  exit 2
fi

message="$1"
shift
paths=("$@")

if [ -z "$(git status --porcelain -- "${paths[@]}")" ]; then
  echo "更新はありません"
  exit 0
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -- "${paths[@]}"
git commit -m "$message"

branch="$(git rev-parse --abbrev-ref HEAD)"
for attempt in 1 2 3; do
  if git push origin "HEAD:${branch}"; then
    echo "${branch} に反映しました。"
    exit 0
  fi
  echo "push が拒否されました（${attempt}回目）。${branch} を取り直して積み直します。"
  if ! git pull --rebase origin "${branch}"; then
    git rebase --abort || true
    echo "取り直した ${branch} と衝突しました。同じデータを書き換える実行が重なっています。" >&2
    echo "他の実行が終わってから、このワークフローをもう一度実行してください。" >&2
    exit 1
  fi
  sleep $((attempt * 3))
done

echo "3回試しても push できませんでした。" >&2
exit 1
