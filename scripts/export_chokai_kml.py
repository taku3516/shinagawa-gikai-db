#!/usr/bin/env python3
"""町会・自治会の区域と公開プロフィールをGoogleマイマップ用KMLへ書き出す。"""

from __future__ import annotations

import argparse
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ASSOCIATIONS = ROOT / "data" / "chokai.js"
DEFAULT_BOUNDARIES = ROOT / "data" / "chokai-boundaries.js"
DEFAULT_PROFILES = ROOT / "data" / "chokai-profiles.js"
DEFAULT_OUTPUT = ROOT / "exports" / "shinagawa-chokai-map.kml"
KML_NS = "http://www.opengis.net/kml/2.2"
ET.register_namespace("", KML_NS)


def tag(name: str) -> str:
    return f"{{{KML_NS}}}{name}"


def load_javascript_data(path: Path, variable: str) -> dict:
    text = path.read_text(encoding="utf-8")
    match = re.search(
        rf"window\.SHINAGAWA_DB\.{re.escape(variable)}\s*=\s*(.*);\s*$",
        text,
        re.S,
    )
    if not match:
        raise RuntimeError(f"データを解析できません: {path}")
    return json.loads(match.group(1))


def add_text(parent: ET.Element, name: str, value: object) -> ET.Element:
    element = ET.SubElement(parent, tag(name))
    element.text = "" if value is None else str(value)
    return element


def add_extended_data(parent: ET.Element, fields: list[tuple[str, str]]) -> None:
    extended = ET.SubElement(parent, tag("ExtendedData"))
    for name, value in fields:
        data = ET.SubElement(extended, tag("Data"), {"name": name})
        add_text(data, "value", value)


def join_unique(values: list[str], separator: str = " / ") -> str:
    result: list[str] = []
    for value in values:
        value = value.strip()
        if value and value not in result:
            result.append(value)
    return separator.join(result)


def labelled_values(items: list[tuple[str, str]]) -> str:
    populated = [(name, value.strip()) for name, value in items if value and value.strip()]
    if not populated:
        return ""
    if len(populated) == 1:
        return populated[0][1]
    return " / ".join(f"{name}: {value}" for name, value in populated)


def address_text(associations: list[dict]) -> str:
    parts: list[str] = []
    for association in associations:
        for area in association.get("areas", []):
            text = " ".join(
                value for value in [area.get("town", ""), area.get("range", "")] if value
            )
            if text and text not in parts:
                parts.append(text)
    return " / ".join(parts)


def social_text(tamemap_profiles: list[tuple[str, dict]]) -> str:
    labels = [
        ("Facebook", "facebook"),
        ("X", "x"),
        ("Instagram", "instagram"),
        ("YouTube", "youtube"),
        ("その他SNS", "otherSocial"),
    ]
    values: list[str] = []
    for association_name, profile in tamemap_profiles:
        for label, key in labels:
            url = str(profile.get(key, "")).strip()
            if url:
                prefix = f"{association_name} " if len(tamemap_profiles) > 1 else ""
                values.append(f"{prefix}{label}: {url}")
    return " / ".join(values)


def polygon_parts(geometry: dict) -> list[list[list[list[float]]]]:
    geometry_type = geometry.get("type")
    coordinates = geometry.get("coordinates", [])
    if geometry_type == "Polygon":
        return [coordinates]
    if geometry_type == "MultiPolygon":
        # My MapsではMultiGeometryの一部が取り込まれないことがあるため分割する。
        return coordinates
    raise RuntimeError(f"未対応の形状です: {geometry_type}")


def coordinate_text(ring: list[list[float]]) -> str:
    return " ".join(f"{point[0]:.6f},{point[1]:.6f},0" for point in ring)


def add_polygon(parent: ET.Element, rings: list[list[list[float]]]) -> None:
    polygon = ET.SubElement(parent, tag("Polygon"))
    add_text(polygon, "tessellate", "1")
    add_text(polygon, "altitudeMode", "clampToGround")
    for index, ring in enumerate(rings):
        boundary_name = "outerBoundaryIs" if index == 0 else "innerBoundaryIs"
        boundary = ET.SubElement(polygon, tag(boundary_name))
        linear_ring = ET.SubElement(boundary, tag("LinearRing"))
        add_text(linear_ring, "coordinates", coordinate_text(ring))


def add_style(document: ET.Element, style_id: str, fill: str) -> None:
    style = ET.SubElement(document, tag("Style"), {"id": style_id})
    line_style = ET.SubElement(style, tag("LineStyle"))
    add_text(line_style, "color", "ff776a59")
    add_text(line_style, "width", "1.5")
    poly_style = ET.SubElement(style, tag("PolyStyle"))
    add_text(poly_style, "color", fill)
    add_text(poly_style, "fill", "1")
    add_text(poly_style, "outline", "1")


def build_feature_fields(
    feature: dict,
    association_lookup: dict[str, tuple[str, str, dict]],
    profiles: dict[str, dict],
    sources: dict,
    boundary_source: dict,
) -> list[tuple[str, str]]:
    properties = feature.get("properties", {})
    association_names = properties.get("associationNames", [])
    associations = [association_lookup[name][2] for name in association_names if name in association_lookup]
    region_names = [association_lookup[name][0] for name in association_names if name in association_lookup]
    region_name = join_unique(region_names) or properties.get("regionName", "")
    region_label = region_name.replace("地域センター", "地域")

    union_profiles: list[tuple[str, dict]] = []
    tamemap_profiles: list[tuple[str, dict]] = []
    for name in association_names:
        profile = profiles.get(name, {})
        if profile.get("union"):
            union_profiles.append((name, profile["union"]))
        if profile.get("tamemap"):
            tamemap_profiles.append((name, profile["tamemap"]))

    leaders = labelled_values(
        [(name, str(profile.get("leaderName", ""))) for name, profile in union_profiles]
    )
    representatives = labelled_values(
        [(name, str(profile.get("representative", ""))) for name, profile in tamemap_profiles]
    )
    contacts = labelled_values(
        [(name, str(profile.get("contact", ""))) for name, profile in union_profiles]
    )
    phones = labelled_values(
        [(name, str(profile.get("phone", ""))) for name, profile in tamemap_profiles]
    )
    emails = labelled_values(
        [(name, str(profile.get("email", ""))) for name, profile in tamemap_profiles]
    )
    descriptions = labelled_values(
        [(name, str(profile.get("description", ""))) for name, profile in union_profiles]
        + [(name, str(profile.get("description", ""))) for name, profile in tamemap_profiles]
    )
    achievements = labelled_values(
        [(name, str(profile.get("achievements", ""))) for name, profile in tamemap_profiles]
    )
    homepages = labelled_values(
        [(name, str(profile.get("homepage", ""))) for name, profile in tamemap_profiles]
    )
    profile_sources = [
        str(profile.get("url", ""))
        for _, profile in union_profiles + tamemap_profiles
        if profile.get("url")
    ]
    source_urls = join_unique(
        [
            str(boundary_source.get("detailUrl", "")),
            *(association_lookup[name][1] for name in association_names if name in association_lookup),
            str(sources.get("unionIndexUrl", "")),
            str(sources.get("tamemapIndexUrl", "")),
            *profile_sources,
        ],
        "\n",
    )

    return [
        ("町会・自治会名", properties.get("name", "")),
        ("公式町会名", properties.get("officialName", "")),
        ("地域区分", region_label),
        ("住所区域", address_text(associations)),
        ("町会長", leaders),
        ("代表者", representatives),
        ("連絡先", contacts),
        ("電話", phones),
        ("メール", emails),
        ("町会の紹介", descriptions),
        ("活動実績", achievements),
        ("ホームページ", homepages),
        ("SNS", social_text(tamemap_profiles)),
        ("出典", source_urls),
    ]


def description_text(fields: list[tuple[str, str]]) -> str:
    return "\n".join(f"{name}: {value}" for name, value in fields if value)


def build_kml(associations_data: dict, boundaries: dict, profiles_data: dict) -> tuple[ET.ElementTree, int]:
    association_lookup: dict[str, tuple[str, str, dict]] = {}
    for region in associations_data.get("regions", []):
        for association in region.get("associations", []):
            association_lookup[association["name"]] = (
                region["name"],
                region.get("sourceUrl", ""),
                association,
            )

    kml = ET.Element(tag("kml"))
    document = ET.SubElement(kml, tag("Document"))
    add_text(document, "name", "品川区 町会・自治会区域")
    add_text(
        document,
        "description",
        "品川区の公開データを基に、町会・自治会区域を淡い4色で塗り分けたGoogleマイマップ用データです。",
    )

    # KMLの色は AABBGGRR。背景地図を読みやすくするため半透明の淡色にする。
    fills = ["b8ebdcc7", "b8c5e5d8", "b8c8d8ea", "b8e8d3dd"]
    for index, fill in enumerate(fills):
        add_style(document, f"area-{index}", fill)
    add_style(document, "area-unassigned", "80a19991")

    placemark_count = 0
    covered_names: set[str] = set()
    for feature in boundaries.get("features", []):
        properties = feature.get("properties", {})
        fields = build_feature_fields(
            feature,
            association_lookup,
            profiles_data.get("profiles", {}),
            profiles_data.get("sources", {}),
            boundaries.get("source", {}),
        )
        parts = polygon_parts(feature.get("geometry", {}))
        base_name = properties.get("name") or "町会名未登録区域"
        color_index = int(properties.get("colorIndex", 0)) % len(fills)
        style_id = "area-unassigned" if properties.get("unassigned") else f"area-{color_index}"
        covered_names.update(properties.get("associationNames", []))

        for index, rings in enumerate(parts, start=1):
            placemark = ET.SubElement(document, tag("Placemark"))
            display_name = base_name if len(parts) == 1 else f"{base_name}（区域{index}）"
            add_text(placemark, "name", display_name)
            add_text(placemark, "description", description_text(fields))
            add_text(placemark, "styleUrl", f"#{style_id}")
            add_extended_data(placemark, fields)
            add_polygon(placemark, rings)
            placemark_count += 1

    missing = set(association_lookup) - covered_names
    if missing:
        raise RuntimeError(f"区域に対応していない町会があります: {', '.join(sorted(missing))}")
    return ET.ElementTree(kml), placemark_count


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--associations", type=Path, default=DEFAULT_ASSOCIATIONS)
    parser.add_argument("--boundaries", type=Path, default=DEFAULT_BOUNDARIES)
    parser.add_argument("--profiles", type=Path, default=DEFAULT_PROFILES)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    args = parser.parse_args()

    tree, placemark_count = build_kml(
        load_javascript_data(args.associations, "chokai"),
        load_javascript_data(args.boundaries, "chokaiBoundaries"),
        load_javascript_data(args.profiles, "chokaiProfiles"),
    )
    args.output.parent.mkdir(parents=True, exist_ok=True)
    ET.indent(tree, space="  ")
    tree.write(args.output, encoding="utf-8", xml_declaration=True)
    print(f"KMLを生成しました: {args.output}（{placemark_count}区域）")


if __name__ == "__main__":
    main()
