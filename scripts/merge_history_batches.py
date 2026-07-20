#!/usr/bin/env python3
"""年度別キューを結合し、既に作成済みの要約を失わずに再開できるようにする。"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts/out/history"
YEARS = ("r05", "r04", "r03", "r02", "r01", "h30")


def key(item: dict) -> tuple[str, str, str]:
    return item.get("yearId", ""), item.get("meetingId", ""), item.get("memberId", "")


def main() -> None:
    queue_path = OUT / "qa_queue.json"
    existing = json.loads(queue_path.read_text(encoding="utf-8")) if queue_path.exists() else []
    completed = {
        key(item): item
        for item in existing
        if item.get("qaSummaries") and len(item.get("qaSummaries", [])) == len(item.get("topics", []))
    }
    merged = []
    for year_id in YEARS:
        batch = json.loads((OUT / "batches" / f"{year_id}.json").read_text(encoding="utf-8"))
        for item in batch:
            previous = completed.get(key(item))
            if previous:
                item["qaSummaries"] = previous["qaSummaries"]
                item["summaryStatus"] = previous.get("summaryStatus", "complete")
            merged.append(item)
    queue_path.write_text(json.dumps(merged, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"結合: {len(merged)}名（要約済み{sum(bool(item.get('qaSummaries')) for item in merged)}名）")


if __name__ == "__main__":
    main()
