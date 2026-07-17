#!/usr/bin/env python3
"""品川区ニュースをRSSと公開Webページから収集し、静的サイト用JSを生成する。"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG = ROOT / "data" / "news-sources.json"
DEFAULT_OUTPUT = ROOT / "data" / "news-items.js"
USER_AGENT = "ShinagawaCouncilDB-NewsCollector/1.0 (+https://taku3516.github.io/shinagawa-gikai-db/)"
MAX_SUMMARY = 240
MAX_ARCHIVE_ITEMS = 2500


def clean_text(value: str | None) -> str:
    if not value:
        return ""
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def shorten(value: str, limit: int = MAX_SUMMARY) -> str:
    value = clean_text(value)
    if len(value) <= limit:
        return value
    return value[: limit - 1].rstrip() + "…"


def normalized_url(value: str) -> str:
    parsed = urlparse(value.strip())
    scheme = parsed.scheme.lower() or "https"
    host = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path) or "/"
    if path != "/":
        path = path.rstrip("/")
    return urlunparse((scheme, host, path, "", parsed.query, ""))


def item_id(url: str) -> str:
    return hashlib.sha256(normalized_url(url).encode("utf-8")).hexdigest()[:20]


def iso_date(value: str | None) -> str:
    if not value:
        return ""
    value = clean_text(value)
    try:
        result = parsedate_to_datetime(value)
        if result.tzinfo is None:
            result = result.replace(tzinfo=timezone.utc)
        return result.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except (TypeError, ValueError, OverflowError):
        pass
    candidate = value.replace("Z", "+00:00")
    try:
        result = datetime.fromisoformat(candidate)
        if result.tzinfo is None:
            result = result.replace(tzinfo=timezone.utc)
        return result.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except ValueError:
        pass
    match = re.search(r"(20\d{2})[年./-](\d{1,2})[月./-](\d{1,2})日?", value)
    if match:
        return f"{match.group(1)}-{int(match.group(2)):02d}-{int(match.group(3)):02d}T00:00:00Z"
    return ""


def fetch(url: str, timeout: int = 12) -> tuple[bytes, str]:
    request = Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/xml, text/html;q=0.9, */*;q=0.7"},
    )
    with urlopen(request, timeout=timeout) as response:
        return response.read(), response.headers.get_content_charset() or "utf-8"


def decode(payload: bytes, charset: str) -> str:
    for encoding in (charset, "utf-8", "cp932", "euc_jp"):
        try:
            return payload.decode(encoding)
        except (LookupError, UnicodeDecodeError):
            continue
    return payload.decode("utf-8", errors="replace")


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1].lower()


def first_child_text(node: ET.Element, names: Iterable[str]) -> str:
    wanted = {name.lower() for name in names}
    for child in node.iter():
        if child is node:
            continue
        if local_name(child.tag) in wanted and child.text:
            return child.text.strip()
    return ""


def rss_items(payload: bytes) -> list[dict[str, str]]:
    root = ET.fromstring(payload)
    candidates = [node for node in root.iter() if local_name(node.tag) in {"item", "entry"}]
    found: list[dict[str, str]] = []
    for node in candidates:
        title = first_child_text(node, ["title"])
        description = first_child_text(node, ["description", "summary", "content", "encoded"])
        published = first_child_text(node, ["pubdate", "published", "updated", "date"])
        link = first_child_text(node, ["link", "guid"])
        if not link:
            for child in node.iter():
                if local_name(child.tag) == "link" and child.attrib.get("href"):
                    link = child.attrib["href"]
                    break
        if title and link.startswith(("http://", "https://")):
            found.append({"title": title, "summary": description, "publishedAt": published, "url": link})
    return found


@dataclass
class Anchor:
    url: str
    text: str
    published_at: str = ""


class IndexParser(HTMLParser):
    VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}

    def __init__(self, base_url: str, required_class: str = "", date_class: str = "") -> None:
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.required_class = required_class
        self.date_class = date_class
        self.current_href = ""
        self.current_text: list[str] = []
        self.current_date = ""
        self._date_text: list[str] = []
        self._required_depth = 0
        self._date_depth = 0
        self._stack: list[tuple[str, bool, bool]] = []
        self.anchors: list[Anchor] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        attributes = dict(attrs)
        classes = set((attributes.get("class") or "").split())
        required_match = bool(self.required_class and self.required_class in classes)
        date_match = bool(self.date_class and self.date_class in classes)
        if required_match:
            self._required_depth += 1
        if date_match:
            self._date_depth += 1
            self._date_text = []
        if tag not in self.VOID_TAGS:
            self._stack.append((tag, required_match, date_match))
        if tag != "a":
            return
        if self.required_class and self._required_depth == 0:
            return
        href = attributes.get("href") or ""
        self.current_href = urljoin(self.base_url, href)
        self.current_text = []

    def handle_data(self, data: str) -> None:
        if self.current_href:
            self.current_text.append(data)
        if self._date_depth:
            self._date_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "a" and self.current_href:
            text = clean_text(" ".join(self.current_text))
            if text:
                self.anchors.append(Anchor(self.current_href, text, self.current_date))
            self.current_href = ""
            self.current_text = []
        while self._stack:
            open_tag, required_match, date_match = self._stack.pop()
            if date_match:
                self.current_date = clean_text(" ".join(self._date_text))
                self._date_text = []
                self._date_depth = max(0, self._date_depth - 1)
            if required_match:
                self._required_depth = max(0, self._required_depth - 1)
            if open_tag == tag:
                break


class ArticleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.description = ""
        self.published = ""
        self.paragraphs: list[str] = []
        self._capture_title = False
        self._capture_p = False
        self._buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = {key.lower(): value or "" for key, value in attrs}
        tag = tag.lower()
        if tag == "meta":
            key = (attributes.get("property") or attributes.get("name") or "").lower()
            content = attributes.get("content", "")
            if key in {"og:title", "twitter:title"} and not self.title:
                self.title = clean_text(content)
            elif key in {"og:description", "description", "twitter:description"} and not self.description:
                self.description = clean_text(content)
            elif key in {"article:published_time", "date", "dc.date", "datepublished"} and not self.published:
                self.published = clean_text(content)
        elif tag == "time" and not self.published:
            self.published = attributes.get("datetime", "")
        elif tag == "title" and not self.title:
            self._capture_title = True
            self._buffer = []
        elif tag == "p":
            self._capture_p = True
            self._buffer = []

    def handle_data(self, data: str) -> None:
        if self._capture_title or self._capture_p:
            self._buffer.append(data)

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title" and self._capture_title:
            self.title = clean_text(" ".join(self._buffer))
            self._capture_title = False
            self._buffer = []
        elif tag == "p" and self._capture_p:
            value = clean_text(" ".join(self._buffer))
            if 25 <= len(value) <= 1000:
                self.paragraphs.append(value)
            self._capture_p = False
            self._buffer = []


def article_details(url: str) -> dict[str, str]:
    payload, charset = fetch(url)
    parser = ArticleParser()
    parser.feed(decode(payload, charset))
    excluded = (
        "文字の大きさや色を変更する機能", "正しく動作させるには", "トップページ >",
        "Copyright", "〒", "このサイトでは", "JavaScriptを有効",
    )
    useful_paragraphs = [
        paragraph for paragraph in parser.paragraphs
        if not any(marker in paragraph for marker in excluded)
    ]
    summary = " ".join(useful_paragraphs[:2]) or parser.description
    return {"title": parser.title, "summary": shorten(summary), "publishedAt": iso_date(parser.published)}


def html_index_items(source: dict, known_ids: set[str]) -> list[dict[str, str]]:
    payload, charset = fetch(source["url"])
    parser = IndexParser(
        source["url"],
        source.get("requiredAncestorClass", ""),
        source.get("dateAncestorClass", ""),
    )
    parser.feed(decode(payload, charset))
    source_host = urlparse(source["url"]).netloc.lower()
    ignored_text = re.compile(r"^(トップ|ホーム|一覧|戻る|次へ|前へ|詳しくはこちら|お問い合わせ|サイトマップ)$")
    ignored_paths = re.compile(r"(?:/contact|/privacy|/sitemap|/access|javascript:|mailto:|\.pdf$)", re.I)
    unique: dict[str, Anchor] = {}
    for anchor in parser.anchors:
        url = normalized_url(anchor.url)
        parsed = urlparse(url)
        if parsed.scheme not in {"http", "https"}:
            continue
        if source.get("sameHostOnly") and parsed.netloc.lower() != source_host:
            continue
        if source.get("includeUrlRegex") and not re.search(source["includeUrlRegex"], url, re.I):
            continue
        if ignored_paths.search(url) or ignored_text.match(anchor.text) or len(anchor.text) < 8:
            continue
        unique.setdefault(url, Anchor(url, anchor.text, anchor.published_at))

    anchors = list(unique.values())[: int(source.get("maxItems", 30))]
    detail_targets = [
        anchor for anchor in anchors
        if item_id(anchor.url) not in known_ids
    ][: int(source.get("detailMaxItems", 10))]
    details_by_url: dict[str, dict[str, str]] = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(article_details, anchor.url): anchor.url for anchor in detail_targets}
        for future in as_completed(futures):
            try:
                details_by_url[futures[future]] = future.result()
            except (HTTPError, URLError, TimeoutError, UnicodeError, OSError):
                details_by_url[futures[future]] = {}

    result: list[dict[str, str]] = []
    for anchor in anchors:
        details = details_by_url.get(anchor.url, {})
        result.append(
            {
                "title": anchor.text or details.get("title", ""),
                "summary": details.get("summary", ""),
                "publishedAt": iso_date(anchor.published_at) or details.get("publishedAt", ""),
                "url": anchor.url,
            }
        )
    return result


class Classifier:
    def __init__(self, config: dict) -> None:
        self.base = config["baseTerms"]
        self.areas = config["areas"]
        self.stations = config["stations"]
        self.landmarks = config["landmarks"]
        self.related = config["relatedTerms"]
        self.tag_rules = config["tagRules"]

    def score(self, text: str, extra_terms: list[str] | None = None) -> int:
        score = 0
        score += 8 * sum(term in text for term in self.base)
        score += 4 * sum(term in text for term in self.areas)
        score += 4 * sum(term in text for term in self.stations)
        score += 4 * sum(term in text for term in self.landmarks)
        score += 2 * min(3, sum(term in text for term in self.related))
        score += 8 * sum(term in text for term in (extra_terms or []))
        return score

    def tags(self, text: str) -> list[str]:
        tags = [tag for tag, terms in self.tag_rules.items() if any(term in text for term in terms)]
        return tags or ["その他"]

    def locations(self, text: str) -> list[str]:
        terms = self.areas + self.stations + self.landmarks
        return list(dict.fromkeys(term for term in terms if term in text))[:8]


def read_existing(path: Path) -> list[dict]:
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.SHINAGAWA_NEWS\s*=\s*(\{.*\});?\s*$", text, re.S)
    if not match:
        return []
    try:
        return json.loads(match.group(1)).get("items", [])
    except json.JSONDecodeError:
        return []


def build_item(raw: dict[str, str], source: dict, classifier: Classifier, collected_at: str) -> dict | None:
    title = clean_text(raw.get("title"))
    title = re.sub(r"^\d{12}_\d{12}_\s*", "", title)
    if source.get("id") == "shinagawa-tourism":
        title = re.sub(r"^イベントカレンダー\s*", "", title)
        title = re.split(r"\s+20\d{2}年\d{1,2}月\d{1,2}日", title, maxsplit=1)[0].strip()
    summary = shorten(raw.get("summary", ""))
    url = raw.get("url", "").strip()
    if not title or not url.startswith(("http://", "https://")):
        return None
    combined = f"{title} {summary}"
    score = classifier.score(combined, source.get("extraTerms"))
    if not source.get("trustedLocal") and score < int(source.get("minScore", 0)):
        return None
    return {
        "id": item_id(url),
        "title": title,
        "summary": summary,
        "source": source["name"],
        "sourceId": source["id"],
        "sourceType": source.get("sourceType", "rss"),
        "url": normalized_url(url),
        "publishedAt": iso_date(raw.get("publishedAt")) or collected_at,
        "dateKind": "published" if iso_date(raw.get("publishedAt")) else "collected",
        "collectedAt": collected_at,
        "tags": classifier.tags(combined),
        "locations": classifier.locations(combined),
        "relevanceScore": score,
    }


def collect(config: dict, existing: list[dict]) -> tuple[list[dict], list[dict]]:
    classifier = Classifier(config)
    collected_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    items_by_id = {item["id"]: item for item in existing if item.get("id")}
    known_ids = set(items_by_id)
    reports: list[dict] = []

    source_groups = (("rssFeeds", "rss"), ("htmlSources", "html"))
    for key, source_type in source_groups:
        for configured_source in config.get(key, []):
            source = dict(configured_source)
            source["sourceType"] = source_type
            if not source.get("enabled"):
                reports.append({"source": source["name"], "status": "disabled", "accepted": 0})
                continue
            accepted = 0
            scanned = 0
            try:
                if source_type == "rss":
                    payload, _ = fetch(source["url"])
                    raw_items = rss_items(payload)
                else:
                    raw_items = html_index_items(source, known_ids)
                scanned = len(raw_items)
                for raw in raw_items:
                    item = build_item(raw, source, classifier, collected_at)
                    if item is None:
                        continue
                    previous = items_by_id.get(item["id"])
                    if previous:
                        item["collectedAt"] = previous.get("collectedAt", item["collectedAt"])
                        if not item["summary"]:
                            item["summary"] = previous.get("summary", "")
                        if not raw.get("publishedAt"):
                            item["publishedAt"] = previous.get("publishedAt", item["publishedAt"])
                            item["dateKind"] = previous.get("dateKind", item["dateKind"])
                    items_by_id[item["id"]] = item
                    accepted += 1
                reports.append({"source": source["name"], "status": "ok", "scanned": scanned, "accepted": accepted})
            except (ET.ParseError, HTTPError, URLError, TimeoutError, UnicodeError, OSError) as error:
                reports.append({"source": source["name"], "status": "error", "accepted": 0, "message": str(error)[:180]})
                print(f"WARN: {source['name']}: {error}", file=sys.stderr)

    repeated_summaries: dict[tuple[str, str], int] = {}
    for item in items_by_id.values():
        summary = item.get("summary", "")
        if summary:
            key = (item.get("sourceId", ""), summary)
            repeated_summaries[key] = repeated_summaries.get(key, 0) + 1
    for item in items_by_id.values():
        key = (item.get("sourceId", ""), item.get("summary", ""))
        if item.get("summary") and repeated_summaries.get(key, 0) >= 3:
            item["summary"] = ""

    items = sorted(
        items_by_id.values(),
        key=lambda item: (item.get("publishedAt", ""), item.get("collectedAt", ""), item.get("id", "")),
        reverse=True,
    )[:MAX_ARCHIVE_ITEMS]
    return items, reports


def write_output(path: Path, config: dict, items: list[dict], reports: list[dict]) -> None:
    public_sources = []
    for key, source_type in (("rssFeeds", "rss"), ("htmlSources", "html")):
        for source in config.get(key, []):
            public_sources.append(
                {
                    "id": source["id"],
                    "name": source["name"],
                    "url": source["url"],
                    "type": source_type,
                    "enabled": bool(source.get("enabled")),
                    "requiresApproval": bool(source.get("requiresApproval")),
                    "note": source.get("note", ""),
                }
            )
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "items": items,
        "sources": public_sources,
        "reports": reports,
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text("// 自動生成ファイル。scripts/collect_news.py で更新する。\nwindow.SHINAGAWA_NEWS = " + body + ";\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--fresh", action="store_true", help="既存記事を引き継がず、現在の収集結果だけで再生成する")
    args = parser.parse_args()

    config = json.loads(args.config.read_text(encoding="utf-8"))
    existing = [] if args.fresh else read_existing(args.output)
    items, reports = collect(config, existing)
    write_output(args.output, config, items, reports)
    ok_count = sum(report["status"] == "ok" for report in reports)
    error_count = sum(report["status"] == "error" for report in reports)
    print(f"sources: {ok_count} ok / {error_count} errors, archive: {len(items)} items")
    return 1 if ok_count == 0 and error_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
