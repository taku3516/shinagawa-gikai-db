#!/usr/bin/env python3
"""町会・自治会の公開プロフィールを取得してJavaScriptデータを生成する。"""

from __future__ import annotations

import argparse
import html
from html.parser import HTMLParser
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


UNION_INDEX_URL = "https://www.shinagawa-choukaijichikai.jp/association/"
TAMEMAP_INDEX_URL = (
    "https://pc.tamemap.net/1310901/activities?utf8=%E2%9C%93&area=&"
    "category=%E7%94%BA%E4%BC%9A%E3%83%BB%E8%87%AA%E6%B2%BB%E4%BC%9A&word="
)
USER_AGENT = (
    "shinagawa-gikai-db-chokai-profile-updater/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ASSOCIATIONS = ROOT / "data" / "chokai.js"
DEFAULT_OUTPUT = ROOT / "data" / "chokai-profiles.js"


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "text/html,*/*;q=0.8"},
    )
    with urllib.request.urlopen(request, timeout=60) as response:
        raw = response.read()
        encoding = response.headers.get_content_charset() or "utf-8"
    return raw.decode(encoding, errors="replace")


def clean_text(value: str) -> str:
    value = html.unescape(value).replace("\u3000", " ").replace("\xa0", " ")
    return re.sub(r"\s+", " ", value).strip()


def name_key(value: str) -> str:
    value = unicodedata.normalize("NFKC", value)
    value = value.replace("ヶ", "ケ").replace("ヵ", "カ").replace("ッ", "ツ")
    value = value.translate(str.maketrans("一二三四五六七八九", "123456789"))
    return re.sub(r"[^0-9A-Za-zぁ-んァ-ヶ一-龥々]", "", value)


def load_associations(path: Path) -> tuple[list[str], dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.SHINAGAWA_DB\.chokai\s*=\s*(\{.*\});\s*$", text, re.S)
    if not match:
        raise RuntimeError(f"町会データを解析できません: {path}")
    data = json.loads(match.group(1))
    names = [
        association["name"]
        for region in data["regions"]
        for association in region["associations"]
    ]
    lookup = {name_key(name): name for name in names}
    aliases = {
        "八潮42号棟自治会": "42号棟自治会",
        "シティコープ八潮台自治会": "シティーコープ八潮台自治会",
    }
    for source, target in aliases.items():
        if target in names:
            lookup[name_key(source)] = target
    return names, lookup


class LinkParser(HTMLParser):
    def __init__(self, pattern: str) -> None:
        super().__init__(convert_charrefs=True)
        self.pattern = re.compile(pattern)
        self.links: list[tuple[str, str]] = []
        self._href = ""
        self._parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        href = dict(attrs).get("href") or ""
        if self.pattern.search(href):
            self._href = href
            self._parts = []

    def handle_data(self, data: str) -> None:
        if self._href:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self._href:
            self.links.append((self._href, clean_text("".join(self._parts))))
            self._href = ""
            self._parts = []


class UnionDetailParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.values: dict[str, str] = {}
        self._mode = ""
        self._parts: list[str] = []
        self._pending_label = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        classes = (dict(attrs).get("class") or "").split()
        if tag == "p" and any(name.endswith("contListItemTitle__text") for name in classes):
            self._mode = "label"
            self._parts = []
        elif tag == "p" and any(name.endswith("contListItemText__text") for name in classes):
            self._mode = "value"
            self._parts = []
        elif self._mode and tag in {"br", "div", "li"}:
            self._parts.append(" ")

    def handle_data(self, data: str) -> None:
        if self._mode:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag != "p" or not self._mode:
            return
        value = clean_text("".join(self._parts))
        if self._mode == "label":
            self._pending_label = value
        elif self._pending_label:
            self.values[self._pending_label] = value
            self._pending_label = ""
        self._mode = ""
        self._parts = []


def decode_cloudflare_email(encoded: str) -> str:
    try:
        key = int(encoded[:2], 16)
        return "".join(
            chr(int(encoded[index : index + 2], 16) ^ key)
            for index in range(2, len(encoded), 2)
        )
    except (ValueError, IndexError):
        return ""


class TamemapDetailParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.name = ""
        self.description = ""
        self.sections: dict[str, dict[str, dict[str, object]]] = {}
        self._capture = ""
        self._parts: list[str] = []
        self._section = ""
        self._term = ""
        self._links: list[str] = []
        self._cfemail = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_map = dict(attrs)
        classes = (attrs_map.get("class") or "").split()
        if tag == "h1" and "heading-lv1" in classes:
            self._capture, self._parts = "name", []
        elif tag == "span" and "description-content" in classes:
            self._capture, self._parts = "description", []
        elif tag == "h3" and "heading-lv3__core" in classes:
            self._capture, self._parts = "section", []
        elif tag == "dt" and "profile__term" in classes:
            self._capture, self._parts = "term", []
        elif tag == "dd" and "profile__data" in classes:
            self._capture, self._parts, self._links, self._cfemail = "value", [], [], ""
        elif self._capture in {"description", "value"} and tag == "br":
            self._parts.append(" / ")
        if self._capture == "value" and tag == "a":
            href = attrs_map.get("href") or ""
            if href and not href.startswith("/cdn-cgi/l/email-protection"):
                self._links.append(href)
        if self._capture == "value" and attrs_map.get("data-cfemail"):
            self._cfemail = attrs_map["data-cfemail"] or ""

    def handle_data(self, data: str) -> None:
        if self._capture:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        expected = {"h1": "name", "span": "description", "h3": "section", "dt": "term", "dd": "value"}
        if expected.get(tag) != self._capture:
            return
        value = clean_text("".join(self._parts)).replace(" / / ", " / ")
        if self._capture == "name":
            self.name = value
        elif self._capture == "description":
            self.description = value
        elif self._capture == "section":
            self._section = value
            self.sections.setdefault(value, {})
        elif self._capture == "term":
            self._term = value
        elif self._capture == "value" and self._section and self._term:
            if self._cfemail:
                value = decode_cloudflare_email(self._cfemail)
            self.sections.setdefault(self._section, {})[self._term] = {
                "text": value,
                "links": self._links,
            }
        self._capture = ""
        self._parts = []


def field(section: dict[str, dict[str, dict[str, object]]], group: str, name: str) -> str:
    item = section.get(group, {}).get(name, {})
    text = str(item.get("text", ""))
    links = item.get("links", [])
    if name.endswith("URL") or name in {"YouTube", "その他SNSページURL"}:
        return str(links[0]) if links else text
    return text


def scrape_union(lookup: dict[str, str], delay: float) -> tuple[dict[str, dict], list[str]]:
    index_parser = LinkParser(r"/(?:shinagawa|osaki|oi|ebara|yashio|other)area/\d+/?$")
    index_parser.feed(fetch_text(UNION_INDEX_URL))
    targets: dict[str, str] = {}
    unmatched = []
    for href, label in index_parser.links:
        matched = lookup.get(name_key(label))
        if matched:
            targets[matched] = urllib.parse.urljoin(UNION_INDEX_URL, href)
        elif label:
            unmatched.append(label)

    profiles: dict[str, dict] = {}
    for position, (name, url) in enumerate(sorted(targets.items())):
        if position and delay:
            time.sleep(delay)
        parser = UnionDetailParser()
        parser.feed(fetch_text(url))
        values = parser.values
        profiles[name] = {
            "url": url,
            "leaderName": values.get("町会・自治会長名", ""),
            "contact": values.get("連絡先", ""),
            "description": values.get("町会・自治会の説明", ""),
        }
    return profiles, sorted(set(unmatched))


def scrape_tamemap(lookup: dict[str, str], delay: float) -> tuple[dict[str, dict], list[str]]:
    index_parser = LinkParser(r"/1310901/activities/\d+$")
    index_parser.feed(fetch_text(TAMEMAP_INDEX_URL))
    targets: dict[str, str] = {}
    unmatched = []
    for href, label in index_parser.links:
        if not label or label.startswith("["):
            continue
        matched = lookup.get(name_key(label))
        if matched:
            targets[matched] = urllib.parse.urljoin(TAMEMAP_INDEX_URL, href)
        else:
            unmatched.append(label)

    profiles: dict[str, dict] = {}
    for name, url in sorted(targets.items()):
        if delay:
            time.sleep(delay)
        parser = TamemapDetailParser()
        parser.feed(fetch_text(url))
        sections = parser.sections
        profiles[name] = {
            "url": url,
            "description": parser.description,
            "representative": field(sections, "代表者", "氏名"),
            "contactName": field(sections, "連絡先", "氏名"),
            "postalCode": field(sections, "連絡先", "郵便番号"),
            "address": field(sections, "連絡先", "住所"),
            "phone": field(sections, "連絡先", "電話番号"),
            "fax": field(sections, "連絡先", "FAX番号"),
            "email": field(sections, "連絡先", "E-mail"),
            "homepage": field(sections, "基本情報", "ホームページURL"),
            "facebook": field(sections, "基本情報", "FacebookページURL"),
            "x": field(sections, "基本情報", "X URL"),
            "instagram": field(sections, "基本情報", "Instagram URL"),
            "youtube": field(sections, "基本情報", "YouTube"),
            "otherSocial": field(sections, "基本情報", "その他SNSページURL"),
            "founded": field(sections, "基本情報", "設立年月日"),
            "membership": field(sections, "基本情報", "会員構成"),
            "targetAge": field(sections, "基本情報", "対象年齢"),
            "activityArea": field(sections, "基本情報", "活動地域"),
            "activitySchedule": field(sections, "基本情報", "活動日時"),
            "admissionFee": field(sections, "基本情報", "入会金"),
            "dues": field(sections, "基本情報", "会費"),
            "recruiting": field(sections, "基本情報", "会員募集の状況"),
            "achievements": field(sections, "基本情報", "活動実績"),
            "notes": field(sections, "基本情報", "備考"),
        }
    return profiles, sorted(set(unmatched))


def build_data(
    association_path: Path,
    union_delay: float,
    tamemap_delay: float,
    skip_tamemap: bool,
    reused_union: dict[str, dict] | None = None,
) -> dict:
    names, lookup = load_associations(association_path)
    union, unmatched_union = (
        (reused_union, []) if reused_union is not None else scrape_union(lookup, union_delay)
    )
    tamemap, unmatched_tamemap = ({}, []) if skip_tamemap else scrape_tamemap(lookup, tamemap_delay)
    profiles = {
        name: {
            "name": name,
            "union": union.get(name),
            "tamemap": tamemap.get(name),
        }
        for name in names
        if name in union or name in tamemap
    }
    return {
        "schemaVersion": 1,
        "sources": {
            "unionIndexUrl": UNION_INDEX_URL,
            "tamemapIndexUrl": TAMEMAP_INDEX_URL,
        },
        "associationCount": len(names),
        "profileCount": len(profiles),
        "unionProfileCount": len(union),
        "tamemapProfileCount": len(tamemap),
        "unmatchedUnionNames": unmatched_union,
        "unmatchedTamemapNames": unmatched_tamemap,
        "profiles": profiles,
    }


def render_javascript(data: dict) -> str:
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return (
        "// このファイルは scripts/prepare_chokai_profiles.py で公開情報から自動生成されます。\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || {};\n"
        f"window.SHINAGAWA_DB.chokaiProfiles = {payload};\n"
    )


def load_existing_union(path: Path) -> dict[str, dict]:
    if not path.exists():
        raise RuntimeError(f"再利用するプロフィールデータがありません: {path}")
    text = path.read_text(encoding="utf-8")
    match = re.search(
        r"window\.SHINAGAWA_DB\.chokaiProfiles\s*=\s*(\{.*\});\s*$",
        text,
        re.S,
    )
    if not match:
        raise RuntimeError(f"既存プロフィールデータを解析できません: {path}")
    data = json.loads(match.group(1))
    return {
        name: profile["union"]
        for name, profile in data.get("profiles", {}).items()
        if profile.get("union")
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--associations", type=Path, default=DEFAULT_ASSOCIATIONS)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--union-delay", type=float, default=0.15)
    parser.add_argument("--tamemap-delay", type=float, default=60)
    parser.add_argument("--skip-tamemap", action="store_true")
    parser.add_argument("--reuse-union", action="store_true")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    try:
        data = build_data(
            args.associations,
            max(0, args.union_delay),
            max(0, args.tamemap_delay),
            args.skip_tamemap,
            load_existing_union(args.output) if args.reuse_union else None,
        )
    except (OSError, RuntimeError, urllib.error.URLError) as error:
        print(f"町会プロフィールの取得に失敗しました: {error}", file=sys.stderr)
        return 1
    rendered = render_javascript(data)
    if args.check:
        if not args.output.exists() or args.output.read_text(encoding="utf-8") != rendered:
            print("町会プロフィールに更新があります")
            return 1
        print("町会プロフィールは最新です")
        return 0
    args.output.parent.mkdir(parents=True, exist_ok=True)
    previous = args.output.read_text(encoding="utf-8") if args.output.exists() else ""
    args.output.write_text(rendered, encoding="utf-8")
    message = "変更なし" if previous == rendered else "更新"
    print(
        f"{message}: {args.output} "
        f"(連合会{data['unionProfileCount']}件、ためまっぷ{data['tamemapProfileCount']}件)"
    )
    if data["unmatchedUnionNames"]:
        print(f"連合会で名称不一致: {len(data['unmatchedUnionNames'])}件")
    if data["unmatchedTamemapNames"]:
        print(f"ためまっぷで町会名と不一致: {data['unmatchedTamemapNames']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
