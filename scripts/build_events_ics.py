#!/usr/bin/env python3
"""data/events.js から購読用の .ics を書き出す。

Googleカレンダーの「他のカレンダーを追加 → URLで追加」に貼るためのファイル。
一度登録すると以後は自動で更新されるので、ここが古いままになると
利用者は気づかないまま古い予定を見続ける。CIで毎回作り直すこと。
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import events_ics  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "data" / "events.js"
DEFAULT_OUTPUT_DIR = ROOT / "exports"
SITE_BASE = "https://taku3516.github.io/shinagawa-gikai-db/"

# 書き出す束。購読する人は目的がはっきりしているので、全部入りだけだと使いにくい。
#   すべて  … 区内のイベント全般
#   確かな分 … 推定した開催日を外したもの。予定表を汚したくない人向け
#   区議会  … 本会議・委員会。このDBの中心
CALENDARS = [
    {
        "file": "shinagawa-events.ics",
        "name": "品川区のイベント",
        "description": "品川区の公式イベントカレンダー・区議会・観光協会・区内ニュースから集めた催しです。推定の開催日を含みます。",
        "filter": lambda event: True,
    },
    {
        "file": "shinagawa-events-confirmed.ics",
        "name": "品川区のイベント（開催日が確かなもの）",
        "description": "開催日が収集元に明記されているものだけを集めた版です。記事本文から推定した日は含みません。",
        "filter": lambda event: event.get("confidence") != "estimated",
    },
    {
        "file": "shinagawa-gikai.ics",
        "name": "品川区議会の日程",
        "description": "品川区議会の委員会の予定・結果です。",
        "filter": lambda event: event.get("sourceId") == "gikai-committee",
    },
]


def read_events(path: Path) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end < 0:
        raise ValueError(f"イベントデータが読めません: {path}")
    return json.loads(text[start : end + 1]).get("events", [])


def build(input_path: Path, output_dir: Path) -> list[tuple[str, int, int]]:
    events = read_events(input_path)
    output_dir.mkdir(parents=True, exist_ok=True)
    results: list[tuple[str, int, int]] = []
    for calendar in CALENDARS:
        chosen = [event for event in events if calendar["filter"](event)]
        text = events_ics.build_calendar(
            chosen, calendar["name"], calendar["description"], SITE_BASE
        )
        destination = output_dir / calendar["file"]
        # 生成時刻（DTSTAMP）だけが変わった場合は書き換えない。
        # 毎回書き換えると、中身が同じでも差分が出てコミットが増える。
        if destination.exists():
            before = _without_stamps(destination.read_text(encoding="utf-8"))
            if before == _without_stamps(text):
                results.append((calendar["file"], len(chosen), text.count("BEGIN:VEVENT")))
                continue
        # CRLF をそのまま書き出す（newline="" を付けないと環境により変換される）。
        # Python 3.9 の Path.write_text は newline を取らないので open() を使う。
        with open(destination, "w", encoding="utf-8", newline="") as handle:
            handle.write(text)
        results.append((calendar["file"], len(chosen), text.count("BEGIN:VEVENT")))
    return results


def _without_stamps(text: str) -> str:
    return "\r\n".join(
        line for line in text.split("\r\n") if not line.startswith("DTSTAMP:")
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=Path, default=DEFAULT_INPUT)
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR)
    args = parser.parse_args()
    for name, events, entries in build(args.input, args.output_dir):
        print(f"{name}: イベント {events} 件 / 予定 {entries} 件")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
