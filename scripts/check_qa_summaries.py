#!/usr/bin/env python3
"""質問・答弁要約が共通ルールを満たしているか検査する。

会議録を遡って実装したり、新しい会議録から要約を足したりするたびに、
「何について質問したか」「何について答弁したか」が読み取れる形になっているかを
ここで確かめる。判定は `scripts/qa_summary.py` に集約している。

検査項目は2種類ある。

- **要修正**  文の途中で切れている、空、古い文言のまま、など。
  機械的に直せる（`scripts/repair_qa_summaries.py`）ので0件でなければならない。
  1件でもあると終了コード1で終わる。
- **要改善**  「〜についてお伺いします」だけで中身が入っていない、定型文のまま、など。
  会議録から取り直さないと直らない。件数を出すだけで、失敗にはしない。
  再生成（`scripts/prepare_committees.py` など）のときに減らしていく。

使い方:

    python3 scripts/check_qa_summaries.py           # 全データを検査
    python3 scripts/check_qa_summaries.py --details # 問題のある要約を実際に表示
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DECODER = json.JSONDecoder()


def payload(text: str, marker: str):
    """`marker` の直後の JSON 値を読む。見つからなければ None。"""
    index = text.find(marker)
    if index < 0:
        return None
    cursor = index + len(marker)
    while cursor < len(text) and text[cursor] not in "[{":
        if not text[cursor].isspace() and text[cursor] not in "=:":
            return None
        cursor += 1
    if cursor >= len(text):
        return None
    return DECODER.raw_decode(text, cursor)[0]


def records():
    """検査対象の要約を (出典, 見出し, 質問, 答弁, 発言の種類) で返す。"""
    for path in sorted(DATA.glob("*-committees-part-*.js")):
        value = payload(path.read_text(encoding="utf-8"), "push(...")
        for session in value or []:
            for topic in session.get("topics") or []:
                for exchange in topic.get("exchanges") or []:
                    yield (
                        path.name, topic.get("title") or "",
                        exchange.get("question") or "", exchange.get("answer") or "",
                        exchange.get("kind") or "",
                    )

    def plenary(path: Path, entries):
        for entry in entries or []:
            for item in entry.get("qaSummaries") or []:
                yield (
                    path.name, item.get("title") or "",
                    item.get("question") or "", item.get("answer") or "", "質問",
                )

    for path in sorted(DATA.glob("*-complete.js")):
        yield from plenary(path, payload(path.read_text(encoding="utf-8"), "const patches = "))
    for path in sorted(DATA.glob("[hr][0-9][0-9].js")):
        if "-" in path.name:
            continue
        year = payload(path.read_text(encoding="utf-8"), f'years["{path.stem}"] = ')
        yield from plenary(path, (year or {}).get("questions"))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--details", action="store_true", help="問題のある要約を表示する")
    parser.add_argument("--limit", type=int, default=5, help="--details で表示する件数（項目ごと）")
    args = parser.parse_args()

    blocking: Counter = Counter()
    advisory: Counter = Counter()
    by_file: dict[str, Counter] = defaultdict(Counter)
    examples: dict[str, list] = defaultdict(list)
    total = 0

    for source, title, question, answer, kind in records():
        total += 1
        for field, problems in (
            ("質問", qa.check_question(question)),
            ("答弁", qa.check_answer(answer, kind)),
        ):
            for problem in problems:
                key = f"{field}:{problem}"
                if problem in qa.BLOCKING_ISSUES:
                    blocking[key] += 1
                    by_file[source][key] += 1
                else:
                    advisory[key] += 1
                if len(examples[key]) < args.limit:
                    examples[key].append((source, title, question if field == "質問" else answer))

    print(f"検査した要約: {total:,}件")
    print()
    print("■ 要修正（0件でなければなりません）")
    if blocking:
        for key, count in blocking.most_common():
            reason = qa.ISSUES.get(key.split(":", 1)[1], "")
            print(f"  {key}: {count:,}件  — {reason}")
        print()
        print("  多いファイル:")
        for name, counter in sorted(by_file.items(), key=lambda kv: -sum(kv[1].values()))[:5]:
            print(f"    {name}: {sum(counter.values()):,}件")
        print()
        print("  `python3 scripts/repair_qa_summaries.py --write` で直せる場合があります。")
    else:
        print("  なし")

    print()
    print("■ 要改善（会議録からの取り直しが必要。失敗にはしません）")
    if advisory:
        for key, count in advisory.most_common():
            reason = qa.ISSUES.get(key.split(":", 1)[1], "")
            print(f"  {key}: {count:,}件 ({count / total * 100:.1f}%)  — {reason}")
    else:
        print("  なし")

    if args.details:
        print()
        print("■ 例")
        for key in list(blocking) + list(advisory):
            if not examples[key]:
                continue
            print(f"\n--- {key} ---")
            for source, title, text in examples[key]:
                print(f"  [{source}] {title[:40]}")
                print(f"    {text[:150]}")

    return 1 if blocking else 0


if __name__ == "__main__":
    sys.exit(main())
