#!/usr/bin/env python3
"""品川区議会公式「意見書・決議等」ページを data/resolutions.js へ変換する。"""

from __future__ import annotations

import argparse
import html
import json
import re
import unicodedata
import urllib.parse
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

SOURCE_URL = "https://gikai.city.shinagawa.tokyo.jp/katsudou/pass"


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def era_date(value: str) -> tuple[str, int | None]:
    normalized = unicodedata.normalize("NFKC", value)
    match = re.search(r"(令和|平成)(元|\d+)年(\d+)月(\d+)日", normalized)
    if not match:
        return "", None
    era, year_text, month_text, day_text = match.groups()
    era_year = 1 if year_text == "元" else int(year_text)
    year = era_year + (2018 if era == "令和" else 1988)
    try:
        iso = date(year, int(month_text), int(day_text)).isoformat()
    except ValueError:
        return "", year
    return iso, year


def slug(value: str) -> str:
    normalized = unicodedata.normalize("NFKC", value).lower()
    safe = re.sub(r"[^a-z0-9]+", "-", normalized).strip("-")
    return safe[:48] or "item"


class PassPageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.capture: str | None = None
        self.buffer: list[str] = []
        self.meeting = ""
        self.category = ""
        self.in_tr = False
        self.in_td = False
        self.td_buffer: list[str] = []
        self.cells: list[str] = []
        self.row_link = ""
        self.items: list[dict[str, object]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = dict(attrs)
        if tag in {"h3", "h4"}:
            self.capture = tag
            self.buffer = []
        elif tag == "tr":
            self.in_tr = True
            self.cells = []
            self.row_link = ""
        elif self.in_tr and tag == "td":
            self.in_td = True
            self.td_buffer = []
        elif self.in_td and tag == "a" and not self.row_link:
            self.row_link = urllib.parse.urljoin(SOURCE_URL, attr.get("href") or "")

    def handle_data(self, data: str) -> None:
        if self.capture:
            self.buffer.append(data)
        if self.in_td:
            self.td_buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == self.capture:
            text = clean("".join(self.buffer))
            if tag == "h3" and re.search(r"(令和|平成)\s*[元0-9０-９]+年", text):
                self.meeting = text
            elif tag == "h4":
                category = clean(re.sub(r"[〖〗【】\[\]]", "", text))
                if category:
                    self.category = category
            self.capture = None
            self.buffer = []
        elif tag == "td" and self.in_td:
            self.cells.append(clean("".join(self.td_buffer)))
            self.in_td = False
        elif tag == "tr" and self.in_tr:
            self.in_tr = False
            if len(self.cells) < 2 or not self.meeting or not self.category or not self.row_link:
                return
            date_label, title = self.cells[0], self.cells[-1]
            if not title or title.endswith("名"):
                return
            date_iso, year = era_date(date_label)
            self.items.append(
                {
                    "meetingLabel": self.meeting,
                    "category": self.category,
                    "dateLabel": date_label,
                    "dateIso": date_iso,
                    "year": year,
                    "title": title,
                    "url": self.row_link,
                }
            )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", default=SOURCE_URL)
    parser.add_argument("--output", default="data/resolutions.js")
    args = parser.parse_args()

    request = urllib.request.Request(args.source, headers={"User-Agent": "shinagawa-gikai-db/1.0"})
    with urllib.request.urlopen(request, timeout=45) as response:
        body = response.read().decode(response.headers.get_content_charset() or "utf-8", "replace")

    page = PassPageParser()
    page.feed(body)
    seen: set[tuple[str, str, str, str]] = set()
    items: list[dict[str, object]] = []
    counters: dict[str, int] = {}
    for item in page.items:
        key = (str(item["meetingLabel"]), str(item["category"]), str(item["dateLabel"]), str(item["url"]))
        if key in seen:
            continue
        seen.add(key)
        prefix = f"{item['year'] or 'unknown'}-{slug(str(item['category']))}"
        counters[prefix] = counters.get(prefix, 0) + 1
        item["id"] = f"resolution-{prefix}-{counters[prefix]:03d}"
        items.append(item)

    payload = {
        "source": args.source,
        "updatedAt": date.today().isoformat(),
        "count": len(items),
        "items": items,
    }
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(
        "// 品川区議会公式「意見書・決議等」から生成。scripts/prepare_resolutions.py で更新。\n"
        f"window.SHINAGAWA_RESOLUTIONS = {json.dumps(payload, ensure_ascii=False, separators=(',', ':'))};\n",
        encoding="utf-8",
    )
    print(f"{output}: {len(items)}件を生成")


if __name__ == "__main__":
    main()
