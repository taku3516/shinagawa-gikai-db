#!/usr/bin/env python3
"""品川区ニュースをRSSと公開Webページから収集し、静的サイト用JSを生成する。"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import time
import unicodedata
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qsl, urlencode, urljoin, urlparse, urlunparse
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


# 計測用のクエリ。記事の中身は変わらないので、重複判定のときだけ落とす。
TRACKING_PARAMS = re.compile(
    r"^(?:utm_[a-z_]+|gclid|fbclid|yclid|dclid|msclkid|mc_cid|mc_eid|igshid|_ga|ref|ref_src|"
    r"cmpid|cmp|spm|at_medium|at_campaign|from|src|source)$",
    re.I,
)
# Googleニュースが見出しの末尾に付ける媒体名。「タイトル - 媒体名」の形。
GOOGLE_TITLE_OUTLET = re.compile(r"\s+[-–—]\s+([^-–—]{2,60})$")
# 配信元がtitleタグに付ける名乗り。「記事名｜品川区公式ウェブサイト」の形。
SITE_NAME_SUFFIX = re.compile(r"\s*[|｜]\s*[^|｜]{2,40}$")
# まとめサイト経由の記事を元記事と突き合わせるときに見る見出しの頭の長さ。
# 短すぎると別の記事まで同じと見なす。長すぎると表記のゆれで取りこぼす。
AGGREGATOR_TITLE_PREFIX = 30


def dedupe_key(url: str) -> str:
    """重複判定にだけ使うURLの鍵。

    記事IDは normalized_url から作る。★（お気に入り）がID単位で保存されているため、
    IDの作り方は変えられない（scripts/test_collect_news_identity.py）。
    計測用パラメータを落とすのはこちらだけにして、IDには影響させない。
    """
    parsed = urlparse(normalized_url(url))
    kept = [
        (key, value)
        for key, value in parse_qsl(parsed.query, keep_blank_values=True)
        if not TRACKING_PARAMS.match(key)
    ]
    query = urlencode(sorted(kept))
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", query, ""))


def normalized_title(title: str) -> str:
    """見出しの表記ゆれを吸収する。媒体名・サイト名・飾り・記号・空白を落とす。

    「記事名 - 媒体名」（Googleニュース）と「記事名｜サイト名」（配信元のtitleタグ）は
    どちらも同じ記事を指すことがあるため、末尾の名乗りを落としてから比べる。
    """
    value = unicodedata.normalize("NFKC", clean_text(title))
    value = GOOGLE_TITLE_OUTLET.sub("", value)
    value = SITE_NAME_SUFFIX.sub("", value)
    value = re.sub(r"^[【\[（(][^】\]）)]{1,12}[】\]）)]\s*", "", value)
    value = re.sub(r"[\s　|｜/／:：・,，.。!！?？\"'“”‘’\[\]【】（）()<>《》~〜～ー-]+", "", value)
    return value.lower()


def is_already_collected_outlet(raw: dict, excluded_hosts: list[str]) -> bool:
    """その媒体を直接取得しているなら True。まとめサイト経由では採らない。"""
    host = urlparse(raw.get("outletUrl") or "").netloc.lower()
    label = (raw.get("outlet") or "").lower()
    for excluded in excluded_hosts:
        excluded = excluded.lower()
        if host == excluded or host.endswith("." + excluded):
            return True
        if label == excluded or label.endswith("." + excluded):
            return True
    return False


def published_day(value: str) -> str:
    return (value or "")[:10]


def deduplicate(items: list[dict]) -> tuple[list[dict], int]:
    """同じ記事を1件に寄せる。優先度の高い配信元を残す。

    - 計測用パラメータを除いたURLが一致すれば同じ記事。
    - 見出しが一致する場合は、片方がGoogleニュース経由（viaAggregator）で
      掲載日が3日以内のときだけ同じ記事とみなす。別の報道機関が独自に
      取材した記事まで消さないため、直接取得した記事どうしは寄せない。
    """
    order = sorted(
        range(len(items)),
        key=lambda index: (
            -int(items[index].get("sourcePriority", 0)),
            bool(items[index].get("viaAggregator")),
            index,
        ),
    )
    kept: list[dict] = []
    by_url: dict[str, dict] = {}
    by_title: dict[str, list[dict]] = {}
    dropped = 0
    for index in order:
        item = items[index]
        url_key = dedupe_key(item.get("url", ""))
        if url_key in by_url:
            dropped += 1
            continue
        title_key = normalized_title(item.get("title", ""))
        twin = None
        if title_key:
            for candidate in kept:
                if same_article(item, candidate):
                    twin = candidate
                    break
        if twin is not None:
            dropped += 1
            continue
        by_url[url_key] = item
        by_title.setdefault(title_key, []).append(item)
        kept.append(item)
    kept.sort(key=lambda item: items.index(item))
    return kept, dropped


def _days_between(left: str | None, right: str | None) -> float:
    try:
        a = datetime.fromisoformat((left or "").replace("Z", "+00:00"))
        b = datetime.fromisoformat((right or "").replace("Z", "+00:00"))
    except ValueError:
        return 0.0
    return (a - b).total_seconds() / 86400


def build_url_index(items: list[dict]) -> dict[str, str]:
    """既存記事を正規化URLで引ける索引にする。URLかIDが無い記事は入れない。"""
    index: dict[str, str] = {}
    for item in items:
        url = (item.get("url") or "").strip()
        stored_id = item.get("id")
        if url and stored_id:
            index.setdefault(normalized_url(url), stored_id)
    return index


def reuse_existing_id(item: dict, url_index: dict[str, str]) -> dict:
    """同じURLの記事が既にあれば、そのIDを引き継ぐ。

    公式サイトのリニューアルで既存記事のURLだけを書き換えたため、
    id ≠ sha256(url) の記事がある。IDだけで突き合わせると同じ記事を
    新IDでもう1件足してしまうので、URLでも突き合わせる。
    """
    previous_id = url_index.get(normalized_url(item.get("url", "")))
    if previous_id:
        item["id"] = previous_id
    return item


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


def fetch(url: str, timeout: int = 12, attempts: int = 3) -> tuple[bytes, str]:
    request = Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept": "application/rss+xml, application/xml, text/html;q=0.9, */*;q=0.7"},
    )
    last_error: Exception | None = None
    for attempt in range(attempts):
        try:
            with urlopen(request, timeout=timeout) as response:
                return response.read(), response.headers.get_content_charset() or "utf-8"
        except HTTPError as error:
            last_error = error
            if error.code < 500 and error.code != 429:
                raise
        except (URLError, TimeoutError, OSError) as error:
            last_error = error
        if attempt + 1 < attempts:
            time.sleep(1.5 * (attempt + 1))
    assert last_error is not None
    raise last_error


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


# XMLとして読めない文字。配信元の手違いで混ざることがある。
INVALID_XML_CHARS = re.compile(rb"[\x00-\x08\x0b\x0c\x0e-\x1f]")
BARE_AMPERSAND = re.compile(rb"&(?!#\d+;|#x[0-9A-Fa-f]+;|[A-Za-z][A-Za-z0-9]{1,30};)")


def lenient_xml(payload: bytes) -> bytes:
    """壊れたXMLを読める形に直す。

    日テレNEWSのRSSのように、裸の「&」や制御文字が混ざると
    ElementTree が丸ごと読めなくなり、そのフィードが1件も取れなくなる。
    """
    payload = INVALID_XML_CHARS.sub(b"", payload)
    return BARE_AMPERSAND.sub(b"&amp;", payload)


def parse_xml(payload: bytes) -> ET.Element:
    try:
        return ET.fromstring(payload)
    except ET.ParseError:
        return ET.fromstring(lenient_xml(payload))


def split_google_title(title: str) -> tuple[str, str]:
    """Googleニュースの「見出し - 媒体名」を分ける。"""
    match = GOOGLE_TITLE_OUTLET.search(title)
    if not match:
        return title, ""
    return title[: match.start()].strip(), match.group(1).strip()


def rss_items(payload: bytes, google_news: bool = False) -> list[dict[str, str]]:
    root = parse_xml(payload)
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
        if not (title and link.startswith(("http://", "https://"))):
            continue
        entry = {"title": title, "summary": description, "publishedAt": published, "url": link}
        if google_news:
            # Googleの description は元記事へのリンクと媒体名だけで、本文ではない。
            # 要約として載せても読めないうえ、転載にもあたるので空にする。
            entry["summary"] = ""
            entry["title"], outlet = split_google_title(title)
            outlet_url = ""
            for child in node.iter():
                if local_name(child.tag) == "source":
                    outlet = clean_text(child.text) or outlet
                    outlet_url = child.attrib.get("url", "")
                    break
            entry["outlet"] = outlet
            entry["outletUrl"] = outlet_url
        found.append(entry)
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


# 本文ではなく、どのページにも出る定型のお断り文。要約に混ざると中身が読めなくなる。
# 2026年10月20日のリニューアルで表記が変わった（「JavaScriptを有効」→「javascriptの使用を有効」）ため、
# 大文字小文字を無視して判定する。
BOILERPLATE_MARKERS = (
    "文字の大きさや色を変更する機能", "正しく動作させるには", "トップページ >",
    "copyright", "〒", "このサイトでは", "javascriptを有効", "javascriptの使用を有効",
    "当ウェブサイトではjavascript",
    # リニューアル後のパンくずとページ情報
    "現在の位置", "ページid：",
)


def is_boilerplate(paragraph: str) -> bool:
    """定型のお断り文なら True。"""
    lowered = paragraph.lower()
    return any(marker.lower() in lowered for marker in BOILERPLATE_MARKERS)


def article_details(url: str) -> dict[str, str]:
    payload, charset = fetch(url)
    parser = ArticleParser()
    parser.feed(decode(payload, charset))
    useful_paragraphs = [
        paragraph for paragraph in parser.paragraphs
        if not is_boilerplate(paragraph)
    ]
    summary = " ".join(useful_paragraphs[:2]) or parser.description
    return {"title": parser.title, "summary": shorten(summary), "publishedAt": iso_date(parser.published)}


def html_index_items(source: dict, known_ids: set[str]) -> list[dict[str, str]]:
    payload, charset = fetch(source["url"], timeout=25)
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
    """記事が品川区の話かどうかを点数で判定する。

    「品川」が入っているだけでは区の話とは限らない。品川駅は港区にあり、
    区内の地名（大井・平塚・小山・大崎）は他の自治体とも同名である。
    そこで語を3種に分ける。

    - areas / stations / landmarks: 区内と判る固有の手がかり。そのまま加点する。
    - ambiguousAreas: 他地域にもある地名。ほかに区内の手がかりがあるときだけ加点する。
    - negativeTerms: 区外を指す語。「品川区」と書かれていないときだけ減点する。
    """

    def __init__(self, config: dict) -> None:
        self.base = config["baseTerms"]
        self.areas = config["areas"]
        self.stations = config["stations"]
        self.landmarks = config["landmarks"]
        self.related = config["relatedTerms"]
        self.tag_rules = config["tagRules"]
        self.ambiguous = config.get("ambiguousAreas", [])
        self.negative = config.get("negativeTerms", [])
        # 区外語を探す前に伏せる語。長いものから当てる。
        self._local_terms = sorted(
            set(self.areas + self.stations + self.landmarks), key=len, reverse=True
        )

    def score(self, text: str, extra_terms: list[str] | None = None) -> int:
        base_hits = sum(term in text for term in self.base)
        strong_hits = (
            sum(term in text for term in self.areas)
            + sum(term in text for term in self.stations)
            + sum(term in text for term in self.landmarks)
        )
        score = 8 * base_hits + 4 * strong_hits
        score += 8 * sum(term in text for term in (extra_terms or []))
        if base_hits or strong_hits:
            # 紛らわしい地名は、区内の手がかりと一緒に出たときだけ効かせる。
            score += 2 * min(3, sum(term in text for term in self.ambiguous))
        score += 2 * min(3, sum(term in text for term in self.related))
        if not base_hits:
            # 「品川区」と明記されていれば、品川駅などの語があっても区の話として扱う。
            score -= 4 * min(3, sum(term in self.without_local_terms(text) for term in self.negative))
        return max(0, score)

    def without_local_terms(self, text: str) -> str:
        """区内の地名・駅名を伏せた文を返す。区外語の部分一致を防ぐ。

        「北品川駅」には区外を指す「品川駅」が含まれる。そのまま探すと
        区内の駅を巻き添えにして減点してしまう（北品川駅の人身事故が落ちた）。
        長い語から先に伏せて、短い区外語が中に残らないようにする。
        紛らわしい地名（大井町など）は伏せない。「足柄上郡大井町」のような
        区外語を打ち消してしまうため。
        """
        for term in self._local_terms:
            if term in text:
                text = text.replace(term, "\u3000")
        return text

    def tags(self, text: str) -> list[str]:
        tags = [tag for tag, terms in self.tag_rules.items() if any(term in text for term in terms)]
        return tags or ["その他"]

    def locations(self, text: str) -> list[str]:
        terms = self.areas + self.ambiguous + self.stations + self.landmarks
        return list(dict.fromkeys(term for term in terms if term in text))[:8]


def read_existing(path: Path) -> list[dict]:
    return read_existing_payload(path).get("items", [])


def read_existing_payload(path: Path) -> dict:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.SHINAGAWA_NEWS\s*=\s*(\{.*\});?\s*$", text, re.S)
    if not match:
        return {}
    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError:
        return {}


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
    outlet = clean_text(raw.get("outlet", ""))
    if source.get("format") == "googleNews" and is_already_collected_outlet(raw, source.get("excludedHosts", [])):
        return None
    combined = f"{title} {summary} {outlet}"
    score = classifier.score(combined, source.get("extraTerms"))
    if not source.get("trustedLocal") and score < int(source.get("minScore", 0)):
        return None
    item = {
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
        "sourcePriority": int(source.get("priority", 50)),
    }
    if source.get("format") == "googleNews":
        # Googleニュースは元記事に直接つながらない転送URLを配る。
        # 無理に元記事URLを割り出さず、媒体名を添えてGoogle経由で開いてもらう。
        item["viaAggregator"] = "Googleニュース"
        if outlet:
            item["outlet"] = outlet
        if raw.get("outletUrl"):
            item["outletUrl"] = raw["outletUrl"]
    return item


def fetch_source(source: dict, known_ids: set[str]) -> list[dict[str, str]]:
    """1つの配信元から記事の素を取る。失敗はそのまま投げ、呼び元で1件ずつ受ける。"""
    if source["sourceType"] == "rss":
        payload, _ = fetch(source["url"], timeout=int(source.get("timeout", 12)))
        raw_items = rss_items(payload, google_news=source.get("format") == "googleNews")
        raw_items = raw_items[: int(source.get("maxItems", 200))]
        if source.get("fetchDetails"):
            raw_items = fill_missing_summaries(raw_items, source, known_ids)
        return raw_items
    return html_index_items(source, known_ids)


def fill_missing_summaries(raw_items: list[dict[str, str]], source: dict, known_ids: set[str]) -> list[dict[str, str]]:
    """要約が空のRSS（品川区公式など）を、記事ページから補う。

    すでに取り込み済みの記事は取りに行かない。1回の実行で取りに行く本数も絞り、
    配信元に負荷をかけない。
    """
    targets = [
        raw for raw in raw_items
        if not clean_text(raw.get("summary", "")) and item_id(raw.get("url", "")) not in known_ids
    ][: int(source.get("detailMaxItems", 10))]
    details: dict[str, dict[str, str]] = {}
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(article_details, raw["url"]): raw["url"] for raw in targets}
        for future in as_completed(futures):
            try:
                details[futures[future]] = future.result()
            except (HTTPError, URLError, TimeoutError, UnicodeError, OSError):
                details[futures[future]] = {}
    for raw in raw_items:
        detail = details.get(raw.get("url", ""))
        if detail:
            raw["summary"] = raw.get("summary") or detail.get("summary", "")
            raw["publishedAt"] = raw.get("publishedAt") or detail.get("publishedAt", "")
    return raw_items


def collect(config: dict, existing: list[dict]) -> tuple[list[dict], list[dict]]:
    classifier = Classifier(config)
    collected_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    items_by_id = {item["id"]: item for item in existing if item.get("id")}
    url_index = build_url_index(existing)
    known_ids = set(items_by_id)
    reports: list[dict] = []

    sources: list[dict] = []
    for key, source_type in (("rssFeeds", "rss"), ("htmlSources", "html")):
        for configured_source in config.get(key, []):
            source = dict(configured_source)
            source["sourceType"] = source_type
            source.setdefault("excludedHosts", config.get("aggregatorExcludedHosts", []))
            sources.append(source)

    # 取得は並列、取り込みは設定順に行う。1つの配信元が落ちても他は止めない。
    active = [source for source in sources if source.get("enabled")]
    fetched: dict[str, list[dict[str, str]]] = {}
    failures: dict[str, Exception] = {}
    elapsed: dict[str, int] = {}
    max_workers = max(1, int(config.get("maxConcurrentFetches", 4)))

    def run(source: dict) -> None:
        started = time.monotonic()
        try:
            fetched[source["id"]] = fetch_source(source, known_ids)
        except (ET.ParseError, HTTPError, URLError, TimeoutError, UnicodeError, OSError) as error:
            failures[source["id"]] = error
        finally:
            elapsed[source["id"]] = int((time.monotonic() - started) * 1000)

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        list(executor.map(run, active))

    # 既存記事を重複判定の土台にする。既にある記事は消さない。
    seen_urls = {dedupe_key(item.get("url", "")): item for item in items_by_id.values()}
    seen_titles: dict[str, list[dict]] = {}
    for item in items_by_id.values():
        index_title(item, seen_titles)
    duplicates = 0

    for source in sources:
        if not source.get("enabled"):
            reports.append({"source": source["name"], "sourceId": source["id"], "status": "disabled", "accepted": 0})
            continue
        report = {
            "source": source["name"],
            "sourceId": source["id"],
            "fetchedAt": collected_at,
            "durationMs": elapsed.get(source["id"], 0),
        }
        error = failures.get(source["id"])
        if error is not None:
            report.update({"status": "error", "accepted": 0, "message": str(error)[:180]})
            reports.append(report)
            print(f"WARN: {source['name']}: {error}", file=sys.stderr)
            continue
        raw_items = fetched.get(source["id"], [])
        accepted = 0
        skipped = 0
        for raw in raw_items:
            item = build_item(raw, source, classifier, collected_at)
            if item is None:
                continue
            reuse_existing_id(item, url_index)
            previous = items_by_id.get(item["id"])
            if previous is None:
                replaced = find_duplicate(item, seen_urls, seen_titles)
                if replaced is not None:
                    if int(replaced.get("sourcePriority", 50)) >= item["sourcePriority"]:
                        skipped += 1
                        duplicates += 1
                        continue
                    # 配信元として確かな側（公式RSSなど）に入れ替える。
                    # IDは元の記事のものを引き継ぐ。★と非表示がID単位のため。
                    drop_from_index(replaced, seen_urls, seen_titles)
                    items_by_id.pop(replaced.get("id", ""), None)
                    inherit_identity(item, replaced)
                    duplicates += 1
            if previous:
                item["collectedAt"] = previous.get("collectedAt", item["collectedAt"])
                if not item["summary"]:
                    item["summary"] = previous.get("summary", "")
                    item["tags"] = previous.get("tags", item["tags"])
                    item["locations"] = previous.get("locations", item["locations"])
                    item["relevanceScore"] = previous.get("relevanceScore", item["relevanceScore"])
                if not raw.get("publishedAt"):
                    item["publishedAt"] = previous.get("publishedAt", item["publishedAt"])
                    item["dateKind"] = previous.get("dateKind", item["dateKind"])
            items_by_id[item["id"]] = item
            url_index.setdefault(normalized_url(item["url"]), item["id"])
            seen_urls[dedupe_key(item["url"])] = item
            index_title(item, seen_titles)
            accepted += 1
        report.update({"status": "ok", "scanned": len(raw_items), "accepted": accepted, "duplicates": skipped})
        reports.append(report)

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
    reports.append({"source": "（重複除去）", "sourceId": "_dedupe", "status": "ok", "accepted": 0, "duplicates": duplicates})
    return items, reports


def find_duplicate(item: dict, seen_urls: dict[str, dict], seen_titles: dict[str, list[dict]]) -> dict | None:
    """すでに持っている記事のうち、同じ記事と言えるものを返す。"""
    twin = seen_urls.get(dedupe_key(item.get("url", "")))
    if twin is not None:
        return twin
    title_key = normalized_title(item.get("title", ""))
    if not title_key:
        return None
    for candidate in seen_titles.get(title_key, []):
        if same_article(item, candidate):
            return candidate
    for candidate in seen_titles.get(title_key[:AGGREGATOR_TITLE_PREFIX], []):
        if same_article(item, candidate):
            return candidate
    return None


def same_article(item: dict, candidate: dict) -> bool:
    """見出しから見て同じ記事かどうか。

    見出し一致で消すのは、片方がまとめサイト（Googleニュース）経由のときだけにする。
    別の報道機関が独自に取材した記事まで消さないため。
    まとめサイトは見出しを切り詰めたり媒体名を足したりするので、
    完全一致に加えて、見出しの頭が十分長く一致する場合も同じ記事とみなす。
    """
    if item is candidate or item.get("id") == candidate.get("id"):
        return False
    if not (item.get("viaAggregator") or candidate.get("viaAggregator")):
        return False
    if abs(_days_between(item.get("publishedAt"), candidate.get("publishedAt"))) > 3:
        return False
    left = normalized_title(item.get("title", ""))
    right = normalized_title(candidate.get("title", ""))
    if not left or not right:
        return False
    if left == right:
        return True
    shortest = min(len(left), len(right))
    if shortest < AGGREGATOR_TITLE_PREFIX:
        return False
    return left[:AGGREGATOR_TITLE_PREFIX] == right[:AGGREGATOR_TITLE_PREFIX]


def index_title(item: dict, seen_titles: dict[str, list[dict]]) -> None:
    """見出しの全体と頭の両方で引けるようにする。"""
    key = normalized_title(item.get("title", ""))
    if not key:
        return
    for variant in {key, key[:AGGREGATOR_TITLE_PREFIX]}:
        seen_titles.setdefault(variant, []).append(item)


def inherit_identity(item: dict, replaced: dict) -> dict:
    """入れ替え先の記事に、元の記事のIDと初出日時を引き継ぐ。

    ★（お気に入り）と非表示は端末内とFirestoreに記事ID単位で保存されている
    （news.html の state.favorites.has(item.id)）。まとめサイト経由で先に入った
    記事を公式RSSの記事へ差し替えるときにIDを振り直すと、利用者の★が外れる。
    id ≠ sha256(url) になるが、公式サイトのURL張り替えで既にそうなっており、
    収集側はURLでも突き合わせる（reuse_existing_id）。
    """
    if replaced.get("id"):
        item["id"] = replaced["id"]
    if replaced.get("collectedAt"):
        item["collectedAt"] = replaced["collectedAt"]
    return item


def drop_from_index(item: dict, seen_urls: dict[str, dict], seen_titles: dict[str, list[dict]]) -> None:
    seen_urls.pop(dedupe_key(item.get("url", "")), None)
    key = normalized_title(item.get("title", ""))
    for variant in {key, key[:AGGREGATOR_TITLE_PREFIX]}:
        bucket = seen_titles.get(variant)
        if bucket and item in bucket:
            bucket.remove(item)


def write_output(path: Path, config: dict, items: list[dict], reports: list[dict]) -> bool:
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
                    "via": "googleNews" if source.get("format") == "googleNews" else "",
                    "note": source.get("note", ""),
                }
            )
    existing = read_existing_payload(path)
    if existing.get("items") == items and existing.get("sources") == public_sources:
        return False

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "items": items,
        "sources": public_sources,
        "reports": reports,
    }
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text("// 自動生成ファイル。scripts/collect_news.py で更新する。\nwindow.SHINAGAWA_NEWS = " + body + ";\n", encoding="utf-8")
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--fresh", action="store_true", help="既存記事を引き継がず、現在の収集結果だけで再生成する")
    args = parser.parse_args()

    config = json.loads(args.config.read_text(encoding="utf-8"))
    existing = [] if args.fresh else read_existing(args.output)
    items, reports = collect(config, existing)
    changed = write_output(args.output, config, items, reports)
    ok_count = sum(report["status"] == "ok" for report in reports)
    error_count = sum(report["status"] == "error" for report in reports)
    update_status = "updated" if changed else "no article changes"
    print(f"sources: {ok_count} ok / {error_count} errors, archive: {len(items)} items, {update_status}")
    return 1 if ok_count == 0 and error_count else 0


if __name__ == "__main__":
    raise SystemExit(main())
