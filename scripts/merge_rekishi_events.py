#!/usr/bin/env python3
"""下書きJSONの出来事を data/rekishi-events.js の末尾に足す。

出来事は手書きのデータファイルなので、既存の書式（2スペース字下げ、
配列が短ければ1行）に揃えて差し込む。IDが既にあるものは飛ばすので、
同じ下書きを2度流しても重複しない。

下書きは「出来事の配列」そのままのJSON。1件の形は data/rekishi-events.js
の既存項目と同じにする（id・name・summary・description・year・yearEnd・
yearText・era・areas・categories・certainty・relatedEvents・relatedPeople・（必要なら relatedPlaces・）
sources・verifiedAt、必要なら variants）。

足したあとは必ず検査と画面の確認をすること:
  python3 scripts/check_rekishi_data.py
  python3 -m unittest discover -s scripts -p 'test_*.py'

実行例:
  python3 scripts/merge_rekishi_events.py scripts/out/adeac/jo/draft-1.json
  python3 scripts/merge_rekishi_events.py draft.json --dry-run

外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "data" / "rekishi-events.js"

# 書き出す順。既存の項目と並びを揃える。
FIELD_ORDER = [
    "id", "name", "summary", "description", "year", "yearEnd", "yearText",
    "era", "areas", "categories", "certainty", "variants",
    "relatedEvents", "relatedPeople", "relatedPlaces", "sources", "verifiedAt",
]

# 末尾の閉じ方。ここを目印に差し込む。
TAIL_MARKER = "\n  ]\n};"

# 1件の字下げ（既存ファイルに合わせる）。
INDENT = "      "


class MergeError(RuntimeError):
    """下書きや追記先の形がおかしいときに投げる。"""


def render(event: dict[str, Any]) -> str:
    """1件を既存の字下げに合わせたJSONの断片にする。"""
    missing = [key for key in ("id", "name", "sources") if not event.get(key)]
    if missing:
        raise MergeError(f"下書きに {'・'.join(missing)} がありません: {event.get('id') or '(id不明)'}")
    unknown = [key for key in event if key not in FIELD_ORDER]
    if unknown:
        raise MergeError(f"{event['id']}: 知らない項目があります: {'・'.join(unknown)}")

    ordered = {key: event[key] for key in FIELD_ORDER if key in event}
    body = json.dumps(ordered, ensure_ascii=False, indent=2)
    # 文字列1つだけの配列と空配列は1行にまとめる（既存の見た目に合わせる）。
    body = re.sub(r'\[\s*\n\s*("(?:[^"\\]|\\.)*")\s*\n\s*\]', r"[\1]", body)
    body = re.sub(r"\[\s*\n\s*\]", "[]", body)
    return "\n".join(INDENT + line if line else line for line in body.split("\n")).lstrip()


def merge(draft: list[dict[str, Any]], source: str) -> tuple[str, list[str], list[str]]:
    """追記後の中身と、足したID・飛ばしたIDを返す。"""
    if not isinstance(draft, list):
        raise MergeError("下書きは出来事の配列にしてください")

    existing = set(re.findall(r'"id":\s*"(ev-[^"]+)"', source))
    fresh: list[dict[str, Any]] = []
    skipped: list[str] = []
    seen: set[str] = set()
    for event in draft:
        if not isinstance(event, dict):
            raise MergeError("下書きの要素は辞書にしてください")
        event_id = str(event.get("id") or "")
        if event_id in existing or event_id in seen:
            skipped.append(event_id)
            continue
        seen.add(event_id)
        fresh.append(event)

    if not fresh:
        return source, [], skipped

    if source.count(TAIL_MARKER) != 1:
        raise MergeError("data/rekishi-events.js の末尾が想定と違います。手で確かめてください")
    head, tail = source.rsplit(TAIL_MARKER, 1)
    added = ",\n" + INDENT + (",\n" + INDENT).join(render(event) for event in fresh)
    return head + added + TAIL_MARKER + tail, [event["id"] for event in fresh], skipped


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("draft", help="下書きJSONのパス")
    parser.add_argument("--dry-run", action="store_true", help="書き込まずに結果だけ出す")
    args = parser.parse_args(argv)

    draft_path = Path(args.draft)
    try:
        if not draft_path.exists():
            raise MergeError(f"下書きがありません: {draft_path}")
        draft = json.loads(draft_path.read_text(encoding="utf-8"))
        source = TARGET.read_text(encoding="utf-8")
        merged, added, skipped = merge(draft, source)
    except json.JSONDecodeError as error:
        print(f"エラー: 下書きのJSONが壊れています（{error}）", file=sys.stderr)
        return 1
    except MergeError as error:
        print(f"エラー: {error}", file=sys.stderr)
        return 1

    if not added:
        print(f"足すものがありません（既出 {len(skipped)} 件）")
        return 0

    if args.dry_run:
        print(f"{len(added)}件を足せます（既出で飛ばすもの {len(skipped)} 件）: {'・'.join(added)}")
        return 0

    TARGET.write_text(merged, encoding="utf-8")
    print(f"{len(added)}件を足しました（既出で飛ばしたもの {len(skipped)} 件）")
    print("続けて検査を走らせてください: python3 scripts/check_rekishi_data.py")
    return 0


if __name__ == "__main__":
    sys.exit(main())
