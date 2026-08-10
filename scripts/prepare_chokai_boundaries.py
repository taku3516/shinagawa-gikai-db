#!/usr/bin/env python3
"""しながわMAPの公式Shapeから町会境界GeoJSONを生成する。

外部ライブラリを使わず、GitHub Actions の Python 標準環境だけで動作する。
出力は file:// で開いた場合にも読み込める JavaScript 形式とする。
"""

from __future__ import annotations

import argparse
from collections import defaultdict
import json
import re
import struct
import unicodedata
import urllib.error
import urllib.request
import zipfile
from io import BytesIO
from pathlib import Path


SHAPE_URL = (
    "https://www2.wagmap.jp/shinagawa/shinagawa/opendatafile/"
    "map_110/SHAPE/opendata_2100.zip"
)
DETAIL_URL = "https://www2.wagmap.jp/shinagawa/OpenDataDetail?lid=2100&mids=110"
USER_AGENT = (
    "shinagawa-gikai-db-chokai-boundary-updater/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ASSOCIATIONS = ROOT / "data" / "chokai.js"
DEFAULT_OUTPUT = ROOT / "data" / "chokai-boundaries.js"


def fetch_bytes(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read()


def load_association_names(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.SHINAGAWA_DB\.chokai\s*=\s*(\{.*\});\s*$", text, re.S)
    if not match:
        raise RuntimeError(f"町会データを解析できません: {path}")
    data = json.loads(match.group(1))
    return [
        association["name"]
        for region in data["regions"]
        for association in region["associations"]
    ]


def name_key(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).replace("ッ", "ツ")
    return re.sub(r"[^0-9A-Za-zぁ-んァ-ヶ一-龥々]", "", value)


def association_lookup(names: list[str]) -> dict[str, str]:
    lookup = {name_key(name): name for name in names}
    # 公式Shapeと現行住所一覧で長音符の有無だけが異なる名称。
    if "シティーコープ八潮台自治会" in names:
        lookup[name_key("シティコープ八潮台自治会")] = "シティーコープ八潮台自治会"
    return lookup


def parse_dbf(raw: bytes) -> list[dict[str, str]]:
    record_count = struct.unpack_from("<I", raw, 4)[0]
    header_length = struct.unpack_from("<H", raw, 8)[0]
    record_length = struct.unpack_from("<H", raw, 10)[0]
    fields: list[tuple[str, int]] = []
    offset = 32
    while raw[offset] != 0x0D:
        descriptor = raw[offset : offset + 32]
        name = descriptor[:11].split(b"\0", 1)[0].decode("cp932", errors="replace")
        fields.append((name, descriptor[16]))
        offset += 32

    records = []
    for index in range(record_count):
        record = raw[
            header_length + index * record_length : header_length + (index + 1) * record_length
        ]
        if not record or record[0:1] == b"*":
            continue
        values: dict[str, str] = {}
        cursor = 1
        for name, length in fields:
            values[name] = record[cursor : cursor + length].decode(
                "cp932", errors="replace"
            ).strip()
            cursor += length
        records.append(values)
    return records


def parse_shp(raw: bytes) -> list[list[list[list[float]]]]:
    if struct.unpack_from(">I", raw, 0)[0] != 9994:
        raise RuntimeError("Shapeファイルのヘッダーが不正です")
    geometries: list[list[list[list[float]]]] = []
    cursor = 100
    while cursor + 8 <= len(raw):
        content_length = struct.unpack_from(">I", raw, cursor + 4)[0] * 2
        content = raw[cursor + 8 : cursor + 8 + content_length]
        cursor += 8 + content_length
        if len(content) < 4:
            continue
        shape_type = struct.unpack_from("<I", content, 0)[0]
        if shape_type == 0:
            geometries.append([])
            continue
        if shape_type != 5:
            raise RuntimeError(f"未対応のShape形式です: {shape_type}")
        part_count, point_count = struct.unpack_from("<II", content, 36)
        part_starts = list(struct.unpack_from(f"<{part_count}I", content, 44))
        points_offset = 44 + part_count * 4
        points = [
            list(struct.unpack_from("<2d", content, points_offset + index * 16))
            for index in range(point_count)
        ]
        rings = []
        for index, start in enumerate(part_starts):
            end = part_starts[index + 1] if index + 1 < part_count else point_count
            ring = points[start:end]
            if ring and ring[0] != ring[-1]:
                ring.append(ring[0])
            rings.append(ring)
        geometries.append(rings)
    return geometries


def signed_area(ring: list[list[float]]) -> float:
    return sum(
        ring[index][0] * ring[index + 1][1] - ring[index + 1][0] * ring[index][1]
        for index in range(len(ring) - 1)
    ) / 2


def point_in_ring(point: list[float], ring: list[list[float]]) -> bool:
    x, y = point
    inside = False
    previous = ring[-1]
    for current in ring:
        x1, y1 = previous
        x2, y2 = current
        if (y1 > y) != (y2 > y):
            crossing = (x2 - x1) * (y - y1) / (y2 - y1) + x1
            if x < crossing:
                inside = not inside
        previous = current
    return inside


def as_geojson_geometry(rings: list[list[list[float]]]) -> dict:
    rings = [ring for ring in rings if len(ring) >= 4 and abs(signed_area(ring)) > 1e-14]
    ordered = sorted(range(len(rings)), key=lambda index: abs(signed_area(rings[index])), reverse=True)
    depths: dict[int, int] = {}
    parents: dict[int, int | None] = {}
    for position, index in enumerate(ordered):
        containers = [
            candidate
            for candidate in ordered[:position]
            if point_in_ring(rings[index][0], rings[candidate])
        ]
        parent = min(containers, key=lambda candidate: abs(signed_area(rings[candidate]))) if containers else None
        parents[index] = parent
        depths[index] = depths[parent] + 1 if parent is not None else 0

    polygons: dict[int, list[list[list[float]]]] = {}
    for index in ordered:
        rounded = [[round(x, 6), round(y, 6)] for x, y in rings[index]]
        if depths[index] % 2 == 0:
            polygons[index] = [rounded]
            continue
        parent = parents[index]
        while parent is not None and depths[parent] % 2:
            parent = parents[parent]
        if parent is not None:
            polygons[parent].append(rounded)

    coordinates = list(polygons.values())
    if len(coordinates) == 1:
        return {"type": "Polygon", "coordinates": coordinates[0]}
    return {"type": "MultiPolygon", "coordinates": coordinates}


def geometry_vertices(geometry: dict) -> set[tuple[float, float]]:
    polygons = (
        [geometry["coordinates"]]
        if geometry["type"] == "Polygon"
        else geometry["coordinates"]
    )
    return {
        (round(point[0], 5), round(point[1], 5))
        for polygon in polygons
        for ring in polygon
        for point in ring
    }


def assign_map_colors(features: list[dict]) -> int:
    """共有境界を持つ区域が同色にならないようDSATUR法で少数色を割り当てる。"""
    vertex_owners: dict[tuple[float, float], list[int]] = defaultdict(list)
    for index, feature in enumerate(features):
        if feature["properties"]["unassigned"]:
            continue
        for vertex in geometry_vertices(feature["geometry"]):
            vertex_owners[vertex].append(index)

    shared_vertex_counts: dict[tuple[int, int], int] = defaultdict(int)
    for owners in vertex_owners.values():
        unique = sorted(set(owners))
        for position, left in enumerate(unique):
            for right in unique[position + 1 :]:
                shared_vertex_counts[(left, right)] += 1

    neighbors: dict[int, set[int]] = defaultdict(set)
    for (left, right), count in shared_vertex_counts.items():
        if count >= 2:
            neighbors[left].add(right)
            neighbors[right].add(left)

    colored: dict[int, int] = {}
    candidates = {
        index
        for index, feature in enumerate(features)
        if not feature["properties"]["unassigned"]
    }
    while candidates:
        current = max(
            candidates,
            key=lambda index: (
                len({colored[neighbor] for neighbor in neighbors[index] if neighbor in colored}),
                len(neighbors[index]),
                -index,
            ),
        )
        used = {colored[neighbor] for neighbor in neighbors[current] if neighbor in colored}
        color = 0
        while color in used:
            color += 1
        colored[current] = color
        candidates.remove(current)

    for index, feature in enumerate(features):
        feature["properties"]["colorIndex"] = colored.get(index, -1)
    return max(colored.values(), default=-1) + 1


def build_feature_collection(shape_zip: bytes, association_names: list[str]) -> dict:
    with zipfile.ZipFile(BytesIO(shape_zip)) as archive:
        dbf_name = next(name for name in archive.namelist() if name.lower().endswith(".dbf"))
        shp_name = next(name for name in archive.namelist() if name.lower().endswith(".shp"))
        records = parse_dbf(archive.read(dbf_name))
        geometries = parse_shp(archive.read(shp_name))
    if len(records) != len(geometries):
        raise RuntimeError(f"属性と図形の件数が一致しません: {len(records)} / {len(geometries)}")

    lookup = association_lookup(association_names)
    matched_names: set[str] = set()
    unmatched_official: list[str] = []
    features = []
    for index, (record, rings) in enumerate(zip(records, geometries), start=1):
        official_name = record.get("町会名_2") or record.get("町会名_1") or ""
        region_name = record.get("地域センター名", "")
        parts = [part.strip() for part in re.split(r"[,、]", official_name) if part.strip()]
        names = []
        for part in parts:
            matched = lookup.get(name_key(part))
            if matched:
                names.append(matched)
                matched_names.add(matched)
            else:
                unmatched_official.append(part)
        features.append(
            {
                "type": "Feature",
                "id": index,
                "properties": {
                    "name": "・".join(names) or official_name or "町会名未登録区域",
                    "officialName": official_name,
                    "associationNames": names,
                    "regionName": region_name,
                    "unassigned": not official_name,
                },
                "geometry": as_geojson_geometry(rings),
            }
        )

    unmatched_current = sorted(set(association_names) - matched_names)
    if unmatched_official or unmatched_current:
        raise RuntimeError(
            "町会名の対応に不一致があります: "
            f"Shapeのみ={sorted(set(unmatched_official))}, 住所一覧のみ={unmatched_current}"
        )
    color_count = assign_map_colors(features)
    return {
        "type": "FeatureCollection",
        "source": {
            "name": "品川区 しながわMAP オープンデータ『町会』",
            "detailUrl": DETAIL_URL,
            "shapeUrl": SHAPE_URL,
            "listedDate": "2017年7月31日",
        },
        "featureCount": len(features),
        "namedFeatureCount": sum(not feature["properties"]["unassigned"] for feature in features),
        "unassignedFeatureCount": sum(feature["properties"]["unassigned"] for feature in features),
        "colorCount": color_count,
        "features": features,
    }


def render_javascript(data: dict) -> str:
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return (
        "// このファイルは scripts/prepare_chokai_boundaries.py で公式Shapeから自動生成されます。\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || {};\n"
        f"window.SHINAGAWA_DB.chokaiBoundaries = {payload};\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--associations", type=Path, default=DEFAULT_ASSOCIATIONS)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        data = build_feature_collection(fetch_bytes(SHAPE_URL), load_association_names(args.associations))
    except (OSError, RuntimeError, urllib.error.URLError, zipfile.BadZipFile) as error:
        print(f"町会境界データの取得に失敗しました: {error}")
        return 1
    rendered = render_javascript(data)
    if args.check:
        if not args.output.exists() or args.output.read_text(encoding="utf-8") != rendered:
            print("町会境界データに更新があります")
            return 1
        print("町会境界データは最新です")
        return 0
    args.output.parent.mkdir(parents=True, exist_ok=True)
    previous = args.output.read_text(encoding="utf-8") if args.output.exists() else ""
    args.output.write_text(rendered, encoding="utf-8")
    message = "変更なし" if previous == rendered else "更新"
    print(
        f"{message}: {args.output} "
        f"({data['featureCount']}区域、町会名未登録{data['unassignedFeatureCount']}区域)"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
