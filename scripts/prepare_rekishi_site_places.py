#!/usr/bin/env python3
"""全国文化財総覧の遺跡抄録から、地図に載せる遺跡の地点を作る。

`nabunken_sites.py parse` が作る scripts/out/nabunken/reports.json を読み、
遺跡ごとに1地点にする。座標は遺跡抄録の値（世界測地系・秒単位）をそのまま使う。
調査地点ごとに座標が少しずつ違うので、座標のある最新の調査の値を使い、
位置の種類は「おおよその位置」にして注記に書く。

実行例:
  python3 scripts/prepare_rekishi_site_places.py

出力: scripts/rekishi-site-places.json（prepare_rekishi_places.py が取り込む）
外部ライブラリは使わない。
"""

from __future__ import annotations

import hashlib
import json
import sys
import time
from collections import defaultdict
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from nabunken_sites import base_name  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
REPORTS = ROOT / "scripts" / "out" / "nabunken" / "reports.json"
OUTPUT = ROOT / "scripts" / "rekishi-site-places.json"
ERA_ORDER = ["縄文", "弥生", "古墳", "奈良", "平安", "古代(細分不明)", "中世(細分不明)", "江戸", "近世(細分不明)", "近代(細分不明)"]
# 遺跡ごとの地区（座標から決める）
AREAS = {
    "居木橋遺跡": "osaki", "御殿山遺跡": "shinagawa", "池田山北遺跡": "osaki", "大井鹿島遺跡": "oi",
    "仙台坂遺跡": "oi", "妙国寺北遺跡": "shinagawa", "池田山遺跡": "osaki",
    "寿昌寺遺跡": "osaki", "播磨国三日月藩森家上屋敷跡遺跡": "osaki",
}


def wareki_range(years: list[int]) -> str:
    return f"{min(years)}年〜{max(years)}年" if min(years) != max(years) else f"{min(years)}年"


def build(verified_at: str) -> list[dict[str, Any]]:
    reports = json.loads(REPORTS.read_text(encoding="utf-8"))
    groups: dict[str, list[tuple[str, dict[str, Any], str]]] = defaultdict(list)
    for report in reports:
        for site in report["sites"]:
            groups[base_name(site["name"])].append((site["surveyStart"], site, report["title"]))
    records: list[dict[str, Any]] = []
    for name, rows in sorted(groups.items()):
        with_coords = [r for r in rows if r[1]["lat"] is not None]
        if not with_coords or name not in AREAS:
            continue
        latest = max(with_coords, key=lambda r: r[0])
        eras = [e for e in ERA_ORDER if any(e in r[1]["eras"] for r in rows)]
        labels = list(dict.fromkeys(("近世" if e == "江戸" else e.replace("(細分不明)", "")) for e in eras))
        years = [int(r[0][:4]) for r in rows if r[0]]
        digest = hashlib.sha1(f"遺跡|{name}".encode("utf-8")).hexdigest()[:10]
        records.append({
            "id": f"pl-{digest}",
            "name": name,
            "summary": (
                f"発掘調査が{len(rows)}回行われた遺跡です（{wareki_range(years)}）。"
                f"出土した遺物や遺構の時代は{'・'.join(labels)}にわたります。"
            ),
            "address": "",
            "areas": [AREAS[name]],
            "categories": ["site"],
            "lat": latest[1]["lat"],
            "lng": latest[1]["lng"],
            "locationKind": "approximate",
            "locationNote": (
                "全国文化財総覧の遺跡抄録にある緯度経度（秒単位）です。調査地点ごとに座標が少しずつ違い、"
                f"ここでは座標のある最新の調査（{latest[0][:4]}年）の値を使っています。遺跡の範囲そのものではありません。"
            ),
            "certainty": "fact",
            "sources": [{
                "ref": "nabunken-sitereports",
                "locator": f"全国文化財総覧「{latest[2]}」ほか{len(rows)}件の遺跡抄録",
            }],
            "verifiedAt": verified_at,
        })
    return records


def main() -> int:
    records = build(time.strftime("%Y-%m-%d"))
    OUTPUT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(records)}件の遺跡の地点を書き出しました: {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
