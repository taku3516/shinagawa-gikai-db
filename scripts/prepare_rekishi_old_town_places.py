#!/usr/bin/env python3
"""旧町名を、地図に載せる「おおよその位置」の地点にする。

旧町名（昭和39〜42年の住居表示の実施まで使われた町名）は、いまは存在しない。
しながわデジタルアーカイブの住居表示新旧対照表（address.json）には、旧住所と
現在の住所の対応が載っているので、旧町名ごとに「いまのどの丁目にあたるか」は分かる。
ただし旧町名の区域そのものの形は分からない。

そこで旧町名ごとに、住所がいちばん多く対応する現在の丁目を選び、その丁目の
中心を「おおよその位置」として出す。区域が複数の丁目にまたがる旧町名も、
地点は1つで、注記にその旨を書く。

住所から緯度経度への変換は prepare_rekishi_places.py と同じ国土地理院の住所検索で、
丁目の代表点として返ってきたものだけを使う（町や区の代表点は使わない）。

実行例:
  python3 scripts/prepare_rekishi_old_town_places.py             # 地点データを作る
  python3 scripts/prepare_rekishi_old_town_places.py --apply-names  # 地名から地点へ結ぶ

出力:
  scripts/rekishi-old-town-places.json   prepare_rekishi_places.py が取り込む地点（git管理）

外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.request
from collections import Counter
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from check_rekishi_data import extract_object  # noqa: E402
from prepare_rekishi_places import (  # noqa: E402
    CACHE,
    USER_AGENT,
    geocode,
    load_geocode_cache,
    place_id_for,
    save_geocode_cache,
)

ROOT = Path(__file__).resolve().parents[1]
NAMES = ROOT / "data" / "rekishi-names.js"
OUTPUT = ROOT / "scripts" / "rekishi-old-town-places.json"
ADDRESS_URL = "https://adeac.jp/shinagawa-city/top/topg/js/address.json"
ADDRESS_CACHE = CACHE / "address.json"
SOURCE_REF = "adeac-shinagawa"
TABLE_LABEL = "住居表示新旧対照表（平成23年11月時点）"


def load_address_rows() -> list[dict[str, Any]]:
    """住居表示新旧対照表を読む。無ければ1回だけ取りに行く。"""
    if not ADDRESS_CACHE.exists():
        CACHE.mkdir(parents=True, exist_ok=True)
        request = urllib.request.Request(ADDRESS_URL, headers={"User-Agent": USER_AGENT})
        with urllib.request.urlopen(request, timeout=60) as response:
            ADDRESS_CACHE.write_bytes(response.read())
    return json.loads(ADDRESS_CACHE.read_text(encoding="utf-8"))


def load_old_towns() -> list[dict[str, Any]]:
    source = NAMES.read_text(encoding="utf-8")
    data = extract_object(source, "window.SHINAGAWA_DB.rekishiNames")
    return [item for item in data["items"] if item["nameKind"] == "old-town"]


def main_chome(rows: list[dict[str, Any]], old_name: str) -> tuple[str, int, int] | None:
    """旧町名に住所がいちばん多く対応する現在の丁目と、その件数・全体の件数を返す。"""
    counter: Counter[str] = Counter()
    for row in rows:
        if row.get("oldname") == old_name and row.get("name") and row.get("chome"):
            counter[f"{row['name']}{row['chome']}丁目"] += 1
    if not counter:
        return None
    chome, count = counter.most_common(1)[0]
    return chome, count, sum(counter.values())


def build_records(verified_at: str) -> list[dict[str, Any]]:
    rows = load_address_rows()
    cache = load_geocode_cache()
    used: set[str] = set()
    records: list[dict[str, Any]] = []
    try:
        for town in sorted(load_old_towns(), key=lambda item: item["name"]):
            name = town["name"]
            chosen = main_chome(rows, name)
            if chosen is None:
                print(f"  保留: {name}（対照表に現在の丁目が見つかりません）", file=sys.stderr)
                continue
            chome, count, total = chosen
            found = geocode(chome, cache)
            if found is None or not found[2]:
                print(f"  保留: {name}（{chome}の代表点を引けませんでした）", file=sys.stderr)
                continue
            lat, lng, _ = found
            share = f"{count:,}件／{total:,}件"
            records.append({
                "id": place_id_for(f"旧町名|{name}", used),
                "name": f"旧{name}",
                "summary": (
                    f"昭和39年から42年の住居表示の実施まで使われていた旧町名「{name}」の区域です。"
                    f"現在の{chome}などにあたります。"
                ),
                "address": chome,
                "areas": list(town["areas"]),
                "categories": ["placename", "lost"],
                "lat": lat,
                "lng": lng,
                "locationKind": "approximate",
                "locationNote": (
                    f"旧町名の区域の形は分かりません。住居表示新旧対照表で住所が最も多く対応する"
                    f"{chome}の中心を指しています（{share}）。区域は他の丁目にもまたがります。"
                ),
                "certainty": "fact",
                "sources": [{"ref": SOURCE_REF, "locator": f"{TABLE_LABEL}旧町名「{name}」"}],
                "verifiedAt": verified_at,
            })
            print(f"  {name} → {chome}（{share}）")
    finally:
        save_geocode_cache(cache)
    return records


def apply_names(records: list[dict[str, Any]]) -> int:
    """地名の項目に relatedPlaces を足す（すでにあれば何もしない）。"""
    by_name = {record["name"][1:]: record["id"] for record in records}
    text = NAMES.read_text(encoding="utf-8")
    changed = 0
    for name, place_id in by_name.items():
        marker = f'"name": "{name}",'
        start = text.find(marker)
        if start < 0:
            print(f"  地名が見つかりません: {name}", file=sys.stderr)
            continue
        # この項目の終わり（次の "id" の手前）までを対象にする
        end = text.find('"id":', start)
        end = len(text) if end < 0 else end
        block = text[start:end]
        if '"relatedPlaces"' in block:
            continue
        indent = re.search(r"\n( *)\"sources\"", block)
        if not indent:
            print(f"  sources 行が見つかりません: {name}", file=sys.stderr)
            continue
        pad = indent.group(1)
        new_block = block.replace(
            f"\n{pad}\"sources\"",
            f"\n{pad}\"relatedPlaces\": [\"{place_id}\"],\n{pad}\"sources\"",
            1,
        )
        text = text[:start] + new_block + text[end:]
        changed += 1
    NAMES.write_text(text, encoding="utf-8")
    return changed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply-names", action="store_true", help="地名の項目に relatedPlaces を足す")
    parser.add_argument("--verified-at", default=time.strftime("%Y-%m-%d"), help="確認日")
    args = parser.parse_args()

    if OUTPUT.exists() and args.apply_names:
        records = json.loads(OUTPUT.read_text(encoding="utf-8"))
    else:
        records = build_records(args.verified_at)
        OUTPUT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{len(records)}件を書き出しました: {OUTPUT}")

    if args.apply_names:
        print(f"地名{apply_names(records)}件に relatedPlaces を足しました。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
