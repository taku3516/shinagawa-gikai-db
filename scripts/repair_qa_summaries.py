#!/usr/bin/env python3
"""すでに書き出した質問・答弁要約を、共通ルールに合わせて直す。

`scripts/qa_summary.py` のルールに沿って、次の2つを直す。

0. **中身の無い前置き**
   「区側は、まず初めに、〜」のように、何を答えたのかを伝えない語で始まっている
   ものから前置きを落とす。
1. **文の途中で切れている要約**
   文字数で切ったあとに「…」を付けていたため、何について述べたのかが
   読み取れないものがある。最後の完結した文まで戻す。切り詰めで語尾だけが
   欠けたもの（「〜との意見を述べまし…」）は語尾を補う。
2. **答弁が無いことを示す文言**
   意見・要望のように答弁を求めていない発言と、答弁があるはずなのに
   拾えていない発言が、同じ「記録されていません」という文言になっていた。
   発言の種類に応じて書き分ける。

会議録本文はリポジトリに無いため、切り落とされた文そのものは復元できない。
できるのは「完結した文まで戻す」ところまでで、それ以上は再生成
（`scripts/prepare_committees.py`）が必要になる。

データファイルは書式が一様でないため、対象の文字列だけを差し替える。
その他の桁下げや並びは元のまま残る。
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DECODER = json.JSONDecoder()


def payload_start(text: str, marker: str) -> int:
    """`marker` の直後にある JSON 値の開始位置を返す。無ければ -1。"""
    index = text.find(marker)
    if index < 0:
        return -1
    cursor = index + len(marker)
    while cursor < len(text) and text[cursor] not in "[{":
        if not text[cursor].isspace() and text[cursor] not in "=:":
            return -1
        cursor += 1
    return cursor if cursor < len(text) else -1


def targets(path: Path) -> list[tuple[str, str]]:
    """ファイルごとの (種類, 目印) を返す。"""
    name = path.name
    if "-committees-part-" in name:
        return [("committee", "push(...")]
    if name.endswith("-complete.js"):
        return [("patches", "const patches = ")]
    stem = name[:-3]
    return [("year", f'years["{stem}"] = ')]


def collect_fixes(kind_of_file: str, value) -> list[tuple[str, str]]:
    """直すべき (元の文字列, 直した文字列) を、ファイル内の出現順に集める。"""
    fixes: list[tuple[str, str]] = []

    def fix_question(text: str) -> None:
        if not qa.check_question(text):
            return
        repaired = qa.normalize_question(text)
        if not qa.is_complete(repaired) or len(repaired) > qa.QUESTION_LIMIT:
            repaired = qa.finish(repaired, qa.QUESTION_LIMIT)
        if repaired and repaired != text:
            fixes.append((text, repaired))

    def fix_answer(text: str, kind: str) -> None:
        problems = qa.check_answer(text, kind)
        if not problems:
            return
        if "旧文言" in problems:
            fixes.append((text, qa.no_answer_text(kind)))
            return
        repaired = qa.restore_broken_head(qa.strip_answer_lead(text))
        if not qa.is_complete(repaired) or len(repaired) > qa.ANSWER_LIMIT:
            repaired = qa.finish(repaired, qa.ANSWER_LIMIT)
        if not repaired:
            repaired = qa.no_answer_text(kind)
        if repaired != text:
            fixes.append((text, repaired))

    if kind_of_file == "committee":
        for session in value:
            for topic in session.get("topics") or []:
                for exchange in topic.get("exchanges") or []:
                    fix_question(exchange.get("question") or "")
                    fix_answer(exchange.get("answer") or "", exchange.get("kind") or "")
    else:
        entries = value.get("questions") or [] if kind_of_file == "year" else value
        for entry in entries:
            for item in entry.get("qaSummaries") or []:
                fix_question(item.get("question") or "")
                # 本会議の要約に発言の種類は無い。答弁があるはずのものとして扱う。
                fix_answer(item.get("answer") or "", "質問")
    return fixes


def apply_fixes(text: str, start: int, fixes: list[tuple[str, str]]) -> tuple[str, int]:
    """出現順に1件ずつ差し替える。JSONの並び順とファイルの並び順は一致する。"""
    pieces = [text[:start]]
    cursor = start
    applied = 0
    for old, new in fixes:
        old_json = json.dumps(old, ensure_ascii=False)
        new_json = json.dumps(new, ensure_ascii=False)
        index = text.find(old_json, cursor)
        if index < 0:
            continue  # 同じ文字列を先に消費した場合など。次で拾う
        pieces.append(text[cursor:index])
        pieces.append(new_json)
        cursor = index + len(old_json)
        applied += 1
    pieces.append(text[cursor:])
    return "".join(pieces), applied


def repair_file(path: Path, write: bool, stats: Counter) -> None:
    text = path.read_text(encoding="utf-8")
    for kind_of_file, marker in targets(path):
        start = payload_start(text, marker)
        if start < 0:
            return
        value, _ = DECODER.raw_decode(text, start)
        fixes = collect_fixes(kind_of_file, value)
        if not fixes:
            return
        updated, applied = apply_fixes(text, start, fixes)
        stats[f"{kind_of_file}:修復"] += applied
        stats[f"{kind_of_file}:未適用"] += len(fixes) - applied
        if write and applied:
            # 壊していないことを確かめてから書く
            check_start = payload_start(updated, marker)
            DECODER.raw_decode(updated, check_start)
            path.write_text(updated, encoding="utf-8")
        print(f"  {path.name}: {applied}件" + (f"（未適用 {len(fixes) - applied}）" if applied < len(fixes) else ""))


def data_files() -> list[Path]:
    files = sorted(DATA.glob("*-committees-part-*.js"))
    files += sorted(DATA.glob("*-complete.js"))
    files += sorted(
        p for p in DATA.glob("[hr][0-9][0-9].js")
        if "-" not in p.name
    )
    return files


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--write", action="store_true", help="ファイルを書き換える（既定は確認のみ）")
    args = parser.parse_args()

    stats: Counter = Counter()
    print("修復対象:")
    for path in data_files():
        repair_file(path, args.write, stats)

    print()
    for key, count in sorted(stats.items()):
        print(f"{key}: {count}件")
    if not args.write:
        print("\n確認のみです。書き換えるには --write を付けてください。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
