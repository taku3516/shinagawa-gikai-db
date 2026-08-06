#!/usr/bin/env python3
"""品川区議会公式サイトから請願・陳情の公開情報を取得する。

このリポジトリの開発環境からは公式サイトへ到達できないことがあるため、
GitHub Actions（.github/workflows/collect-petitions.yml）から実行する前提で書いている。

モード:

- ``--inspect``  ページの構造を実行ログへ書き出す。解析処理を書くための下調べ用で、
  ファイルは書き換えない。HTMLをそのまま流し込むとログが読めなくなるため、
  見出し・表・リンクの形だけを要約して出す。
- ``--write``    取得した内容を ``data/petitions-official.js`` へ書き出す。

標準ライブラリだけで動く（`scripts/collect_news.py` と同じ方針）。
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT_PATH = DATA / "petitions-official.js"

INDEX_URL = "https://gikai.city.shinagawa.tokyo.jp/katsudou/petition"
ALLOWED_HOSTS = {
    "gikai.city.shinagawa.tokyo.jp",
    "kaigiroku.city.shinagawa.tokyo.jp",
}
USER_AGENT = "shinagawa-gikai-db/1.0 (public data indexer; +https://github.com/taku3516/shinagawa-gikai-db)"
REQUEST_INTERVAL = 1.0  # 公式サイトへの連続アクセスを避けるための待ち時間（秒）

_last_request_at = 0.0


def fetch(url: str, retries: int = 3) -> str:
    """公式サイトのページを取得する。許可したホスト以外へは出ない。"""
    host = urlparse(url).hostname or ""
    if host not in ALLOWED_HOSTS:
        raise ValueError(f"許可していないホストです: {host}")

    global _last_request_at
    wait = REQUEST_INTERVAL - (time.monotonic() - _last_request_at)
    if wait > 0:
        time.sleep(wait)

    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request, timeout=30) as response:
                raw = response.read()
                charset = response.headers.get_content_charset() or "utf-8"
            _last_request_at = time.monotonic()
            return raw.decode(charset, errors="replace")
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = error
            time.sleep(2 ** attempt)
    raise RuntimeError(f"{url} の取得に失敗しました: {last_error}")


def text_of(markup: str) -> str:
    """タグを落として1行の文字列にする。"""
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", markup, flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def clip(value: str, limit: int = 70) -> str:
    value = value.replace("|", "／")
    return value if len(value) <= limit else value[:limit] + "…"


class PageOutline(HTMLParser):
    """見出し・表・リンクの形だけを拾う。解析処理を書くための下調べに使う。"""

    def __init__(self, base_url: str):
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.headings: list[tuple[str, str]] = []
        self.links: list[tuple[str, str]] = []
        self.tables: list[dict] = []
        self._heading_level = ""
        self._buffer: list[str] = []
        self._href = ""
        self._in_link = False
        self._table_stack: list[dict] = []
        self._cell: list[str] | None = None
        self._cell_is_header = False

    # --- 開始タグ ---
    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in ("h1", "h2", "h3", "h4"):
            self._heading_level = tag
            self._buffer = []
        elif tag == "a":
            self._in_link = True
            self._href = attributes.get("href", "")
            self._buffer = []
        elif tag == "table":
            self._table_stack.append({
                "rows": [],
                "class": attributes.get("class", ""),
                "caption": "",
            })
        elif tag == "tr" and self._table_stack:
            self._table_stack[-1]["rows"].append([])
        elif tag in ("td", "th") and self._table_stack:
            self._cell = []
            self._cell_is_header = tag == "th"

    # --- 終了タグ ---
    def handle_endtag(self, tag):
        if tag in ("h1", "h2", "h3", "h4") and self._heading_level == tag:
            self.headings.append((tag, " ".join(self._buffer).strip()))
            self._heading_level = ""
            self._buffer = []
        elif tag == "a" and self._in_link:
            label = " ".join(self._buffer).strip()
            if self._href:
                self.links.append((urljoin(self.base_url, self._href), label))
            self._in_link = False
            self._href = ""
            self._buffer = []
        elif tag in ("td", "th") and self._cell is not None and self._table_stack:
            rows = self._table_stack[-1]["rows"]
            if not rows:
                rows.append([])
            marker = "＊" if self._cell_is_header else ""
            rows[-1].append(marker + " ".join(self._cell).strip())
            self._cell = None
        elif tag == "table" and self._table_stack:
            self.tables.append(self._table_stack.pop())

    def handle_data(self, data):
        value = re.sub(r"\s+", " ", data)
        if not value.strip():
            return
        if self._cell is not None:
            self._cell.append(value.strip())
        if self._heading_level or self._in_link:
            self._buffer.append(value.strip())


def report_outline(url: str, markup: str, max_tables: int = 8, max_links: int = 50) -> PageOutline:
    """1ページ分の構造をログへ書き出す。"""
    outline = PageOutline(url)
    outline.feed(markup)

    title = re.search(r"<title[^>]*>(.*?)</title>", markup, re.S | re.I)
    print(f"\n{'=' * 78}")
    print(f"URL   : {url}")
    print(f"TITLE : {text_of(title.group(1)) if title else '(なし)'}")
    print(f"SIZE  : {len(markup):,} 文字")

    print(f"\n-- 見出し ({len(outline.headings)}件) --")
    for level, text in outline.headings[:30]:
        print(f"  <{level}> {clip(text, 90)}")

    print(f"\n-- 表 ({len(outline.tables)}件) --")
    for index, table in enumerate(outline.tables[:max_tables], 1):
        rows = [row for row in table["rows"] if row]
        print(f"  [表{index}] class={table['class'] or '(なし)'} 行数={len(rows)}")
        for row in rows[:4]:
            print("        | " + " | ".join(clip(cell, 34) for cell in row[:8]))
        if len(rows) > 4:
            print(f"        …ほか{len(rows) - 4}行")

    interesting = [
        (href, label) for href, label in outline.links
        if re.search(r"petition|lobbying|chinjo|seigan|honkaigi|iken", href, re.I)
        or re.search(r"請願|陳情", label)
    ]
    print(f"\n-- 請願・陳情に関係しそうなリンク ({len(interesting)}件 / 全{len(outline.links)}件) --")
    for href, label in interesting[:max_links]:
        print(f"  {clip(label, 44).ljust(46)} {href}")

    return outline


def inspect(index_url: str, follow: int) -> None:
    """一覧ページと、そこから辿れるページの構造を書き出す。"""
    print("公式サイトの構造を調べます（ファイルは書き換えません）")
    markup = fetch(index_url)
    outline = report_outline(index_url, markup)

    if follow <= 0:
        return

    seen = {index_url}
    targets = []
    for href, label in outline.links:
        if href in seen:
            continue
        if urlparse(href).hostname not in ALLOWED_HOSTS:
            continue
        if not re.search(r"petition|lobbying|chinjo|seigan", href, re.I) and not re.search(r"請願|陳情", label):
            continue
        seen.add(href)
        targets.append(href)
        if len(targets) >= follow:
            break

    print(f"\n\n{'#' * 78}\n# リンク先 {len(targets)}件の構造\n{'#' * 78}")
    for href in targets:
        try:
            report_outline(href, fetch(href), max_tables=5, max_links=20)
        except Exception as error:  # 1ページ失敗しても残りを続ける
            print(f"\n[取得失敗] {href}: {error}")


def write_placeholder(index_url: str) -> int:
    """解析処理が未実装のうちは、取得できたことだけを記録して終わる。

    公式ページの構造を確認したうえで、この関数に抽出処理を実装する。
    中途半端な推測で `data/petitions.js` を書き換えないよう、別ファイルに出す。
    """
    markup = fetch(index_url)
    outline = PageOutline(index_url)
    outline.feed(markup)
    payload = {
        "generatedAt": date.today().isoformat(),
        "sourceUrl": index_url,
        "status": "解析処理は未実装です。--inspect の結果を見て実装してください。",
        "tables": len(outline.tables),
        "links": len(outline.links),
    }
    OUT_PATH.write_text(
        "// 品川区議会公式サイトから取得した請願・陳情の情報（scripts/fetch_petitions.py で生成）\n"
        f"window.SHINAGAWA_PETITIONS_OFFICIAL = {json.dumps(payload, ensure_ascii=False, indent=2)};\n",
        encoding="utf-8",
    )
    print(f"書き出し: {OUT_PATH.relative_to(ROOT)}（解析処理は未実装）")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inspect", action="store_true", help="ページ構造をログへ書き出す（下調べ用）")
    parser.add_argument("--write", action="store_true", help="取得結果をデータファイルへ書き出す")
    parser.add_argument("--url", default=INDEX_URL, help="取得する一覧ページのURL")
    parser.add_argument("--follow", type=int, default=3, help="--inspect で辿るリンク先の数")
    args = parser.parse_args()

    if not args.inspect and not args.write:
        parser.error("--inspect か --write のどちらかを指定してください")

    if args.inspect:
        inspect(args.url, args.follow)
    if args.write:
        return write_placeholder(args.url)
    return 0


if __name__ == "__main__":
    sys.exit(main())
