#!/usr/bin/env python3
"""品川区公式ページから町会・自治会の住所区域データを生成する。

出力はブラウザから file:// で開いても読める JavaScript 形式にする。
外部ライブラリは使わず、GitHub Actions の Python 標準環境だけで動作する。
"""

from __future__ import annotations

import argparse
import csv
import html
import io
import json
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path


INDEX_URL = "https://www.city.shinagawa.tokyo.jp/PC/chiiki/chiiki-tyokai/index.html"
CSV_URL = "https://www.opendata.metro.tokyo.lg.jp/shinagawa/131091_shinagawaku_chokai.csv"
OFFICIAL_MAP_URL = (
    "https://www.city.shinagawa.tokyo.jp/PC/chiiki/chiiki-tyokai/"
    "hpg000021724.html"
)
CENTERS_URL = (
    "https://www.city.shinagawa.tokyo.jp/PC/shisetsu/shisetsu-kuyakusyo/"
    "shisetsu-kuyakusyo-chiiki/shisetsu-kuyakusyo-chiiki-chiiki/hpg000022716.html"
)
USER_AGENT = (
    "shinagawa-gikai-db-chokai-updater/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)
DEFAULT_OUTPUT = Path(__file__).resolve().parents[1] / "data" / "chokai.js"


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "text/html,text/csv;q=0.9,*/*;q=0.8"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        raw = response.read()
        encoding = response.headers.get_content_charset() or "utf-8"
    return raw.decode(encoding, errors="replace")


def clean_text(value: str) -> str:
    value = html.unescape(value).replace("\u3000", " ").replace("\xa0", " ")
    return re.sub(r"\s+", " ", value).strip()


def name_key(value: str) -> str:
    value = unicodedata.normalize("NFKC", value)
    value = re.sub(r"[（(][ぁ-んァ-ヶー・･\s]+[）)]", "", value)
    value = value.replace("ヶ", "ケ").replace("ヵ", "カ")
    value = value.replace("ッ", "ツ")
    value = value.translate(str.maketrans("一二三四五六七八九", "123456789"))
    return re.sub(r"[^0-9A-Za-zぁ-んァ-ヶ一-龥々]", "", value)


def display_name(value: str) -> str:
    value = value.split("→", 1)[0]
    value = re.sub(r"[（(][ぁ-んァ-ヶー・･\s]+[）)]", "", value)
    return clean_text(value)


@dataclass
class Cell:
    text: str
    rowspan: int = 1
    colspan: int = 1


class ChokaiPageParser(HTMLParser):
    """地域センターページの見出し、更新日、区域表を読む。"""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.heading = ""
        self.updated = ""
        self.tables: list[list[list[Cell]]] = []
        self._capture_heading = False
        self._heading_parts: list[str] = []
        self._in_target_table = False
        self._table_depth = 0
        self._rows: list[list[Cell]] = []
        self._row: list[Cell] | None = None
        self._cell_attrs: dict[str, str] | None = None
        self._cell_parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {key: value or "" for key, value in attrs}
        if tag == "h2" and not self.heading:
            self._capture_heading = True
            self._heading_parts = []
        if tag == "table":
            if self._in_target_table:
                self._table_depth += 1
            elif "base-data" in attr_map.get("class", "").split():
                self._in_target_table = True
                self._table_depth = 1
                self._rows = []
        elif self._in_target_table and tag == "tr":
            self._row = []
        elif self._in_target_table and tag in {"td", "th"} and self._row is not None:
            self._cell_attrs = attr_map
            self._cell_parts = []
        elif self._cell_attrs is not None and tag in {"br", "p", "div", "li"}:
            self._cell_parts.append(" ")

    def handle_endtag(self, tag: str) -> None:
        if tag == "h2" and self._capture_heading:
            self.heading = clean_text("".join(self._heading_parts))
            self._capture_heading = False
        if self._in_target_table and tag in {"td", "th"} and self._cell_attrs is not None:
            self._row = self._row or []
            self._row.append(
                Cell(
                    text=clean_text("".join(self._cell_parts)),
                    rowspan=max(1, int(self._cell_attrs.get("rowspan", "1") or "1")),
                    colspan=max(1, int(self._cell_attrs.get("colspan", "1") or "1")),
                )
            )
            self._cell_attrs = None
            self._cell_parts = []
        elif self._in_target_table and tag == "tr" and self._row is not None:
            if self._row:
                self._rows.append(self._row)
            self._row = None
        elif self._in_target_table and tag == "table":
            self._table_depth -= 1
            if self._table_depth == 0:
                self.tables.append(self._rows)
                self._rows = []
                self._in_target_table = False

    def handle_data(self, data: str) -> None:
        if self._capture_heading:
            self._heading_parts.append(data)
        if self._cell_attrs is not None:
            self._cell_parts.append(data)
        if not self.updated:
            match = re.search(r"更新日[：:]\s*([^\r\n<]+)", data)
            if match:
                self.updated = clean_text(match.group(1))


class RegionLinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[str, str]] = []
        self._href = ""
        self._parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "a":
            self._href = dict(attrs).get("href") or ""
            self._parts = []

    def handle_data(self, data: str) -> None:
        if self._href:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self._href:
            label = clean_text("".join(self._parts))
            if "地域センター管内の町会・自治会" in label:
                self.links.append((self._href, label))
            self._href = ""
            self._parts = []


class CenterParser(HTMLParser):
    """公式施設一覧の各行から地域センターの表示座標を読む。"""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.rows: list[tuple[str, list[str]]] = []
        self._in_row = False
        self._parts: list[str] = []
        self._links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "tr":
            self._in_row = True
            self._parts = []
            self._links = []
        elif self._in_row and tag == "a":
            href = dict(attrs).get("href") or ""
            if href:
                self._links.append(href)

    def handle_data(self, data: str) -> None:
        if self._in_row:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "tr" and self._in_row:
            self.rows.append((clean_text(" ".join(self._parts)), self._links))
            self._in_row = False

    def centers(self) -> dict[str, dict[str, float | str]]:
        result: dict[str, dict[str, float | str]] = {}
        for text, links in self.rows:
            match = re.search(r"((?:品川|大崎|大井|荏原|八潮)(?:第[一二三四五])?地域センター)", text)
            if not match:
                continue
            map_url = next((link for link in links if "wagmap.jp" in link and "mpx=" in link), "")
            if not map_url:
                continue
            query = urllib.parse.parse_qs(urllib.parse.urlparse(map_url).query)
            try:
                result[match.group(1)] = {
                    "lat": float(query["mpy"][0]),
                    "lon": float(query["mpx"][0]),
                    "officialMapUrl": map_url,
                }
            except (KeyError, ValueError):
                continue
        return result

def expand_rows(rows: list[list[Cell]]) -> list[list[str]]:
    pending: dict[int, tuple[int, str]] = {}
    expanded_rows: list[list[str]] = []
    for cells in rows:
        expanded = {column: text for column, (_, text) in pending.items()}
        next_pending = {
            column: (remaining - 1, text)
            for column, (remaining, text) in pending.items()
            if remaining > 1
        }
        column = 0
        for cell in cells:
            while column in expanded:
                column += 1
            for offset in range(cell.colspan):
                current = column + offset
                expanded[current] = cell.text
                if cell.rowspan > 1:
                    next_pending[current] = (cell.rowspan - 1, cell.text)
            column += cell.colspan
        pending = next_pending
        if expanded:
            expanded_rows.append([expanded.get(i, "") for i in range(max(expanded) + 1)])
    return expanded_rows


def parse_csv_names(csv_text: str) -> dict[str, dict[str, str]]:
    rows = csv.DictReader(io.StringIO(csv_text.lstrip("\ufeff")))
    result: dict[str, dict[str, str]] = {}
    for row in rows:
        name = clean_text(row.get("名称", ""))
        if name:
            result[name_key(name)] = {
                "name": name,
                "kana": clean_text(row.get("名称_カナ", "")),
            }
    return result


def parse_region(page_text: str, url: str, csv_names: dict[str, dict[str, str]]) -> dict:
    parser = ChokaiPageParser()
    parser.feed(page_text)
    region_name = re.sub(r"管内.*$", "", parser.heading).strip()
    associations: dict[str, dict] = {}
    for table in parser.tables:
        for row in expand_rows(table):
            if len(row) < 3 or "町会・自治会名" in row[0]:
                continue
            raw_name, town, address_range = map(clean_text, row[:3])
            if not raw_name or not town or not address_range:
                continue
            parsed_name = display_name(raw_name)
            canonical = csv_names.get(name_key(parsed_name), {})
            key = canonical.get("name") or parsed_name
            association = associations.setdefault(
                key,
                {
                    "name": key,
                    "kana": canonical.get("kana", ""),
                    "areas": [],
                },
            )
            area = {"town": town, "range": address_range}
            if area not in association["areas"]:
                association["areas"].append(area)
    return {
        "name": region_name,
        "sourceUrl": url,
        "sourceUpdated": parser.updated,
        "associations": list(associations.values()),
    }


def build_data(index_text: str, csv_text: str, centers_text: str) -> dict:
    link_parser = RegionLinkParser()
    link_parser.feed(index_text)
    if len(link_parser.links) != 13:
        raise RuntimeError(f"地域センターページを13件取得できませんでした: {len(link_parser.links)}件")

    csv_names = parse_csv_names(csv_text)
    center_parser = CenterParser()
    center_parser.feed(centers_text)
    centers = center_parser.centers()
    regions = []
    for href, _ in link_parser.links:
        url = urllib.parse.urljoin(INDEX_URL, href)
        region = parse_region(fetch_text(url), url, csv_names)
        if not region["associations"]:
            raise RuntimeError(f"町会データを取得できませんでした: {url}")
        if region["name"] not in centers:
            raise RuntimeError(f"地域センターの表示座標を取得できませんでした: {region['name']}")
        region["center"] = centers[region["name"]]
        regions.append(region)

    all_names = {association["name"] for region in regions for association in region["associations"]}
    all_name_keys = {name_key(name) for name in all_names}
    unmatched_csv = sorted(item["name"] for key, item in csv_names.items() if key not in all_name_keys)
    return {
        "schemaVersion": 1,
        "source": {
            "areaIndexUrl": INDEX_URL,
            "associationCsvUrl": CSV_URL,
            "officialMapUrl": OFFICIAL_MAP_URL,
            "centersUrl": CENTERS_URL,
            "credit": (
                "町会名: 東京都オープンデータカタログ（CC BY 4.0）、"
                "住所区域・地域センター所在地: 品川区公式サイト"
            ),
        },
        "regionCount": len(regions),
        "associationCount": len(all_names),
        "regions": regions,
        "unmatchedCsvNames": unmatched_csv,
    }


def render_javascript(data: dict) -> str:
    payload = json.dumps(data, ensure_ascii=False, indent=2, sort_keys=False)
    return (
        "// このファイルは scripts/prepare_chokai.py で自動生成されます。\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || {};\n"
        f"window.SHINAGAWA_DB.chokai = {payload};\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--check", action="store_true", help="生成結果が既存ファイルと同じか確認する")
    args = parser.parse_args()
    try:
        data = build_data(fetch_text(INDEX_URL), fetch_text(CSV_URL), fetch_text(CENTERS_URL))
    except (OSError, RuntimeError, urllib.error.URLError) as error:
        print(f"町会データの取得に失敗しました: {error}", file=sys.stderr)
        return 1

    rendered = render_javascript(data)
    if args.check:
        if not args.output.exists() or args.output.read_text(encoding="utf-8") != rendered:
            print("町会データに更新があります")
            return 1
        print("町会データは最新です")
        return 0

    args.output.parent.mkdir(parents=True, exist_ok=True)
    previous = args.output.read_text(encoding="utf-8") if args.output.exists() else ""
    if previous == rendered:
        print(f"変更なし: {args.output}")
    else:
        args.output.write_text(rendered, encoding="utf-8")
        print(
            f"更新: {args.output} "
            f"({data['regionCount']}地域、{data['associationCount']}町会・自治会)"
        )
        if data["unmatchedCsvNames"]:
            print(f"住所表とCSVで名称不一致: {len(data['unmatchedCsvNames'])}件")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
