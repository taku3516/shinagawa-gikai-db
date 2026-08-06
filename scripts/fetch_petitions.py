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


##############################################################################
# 年ごとのページ（/petition/NNN.html・/lobbying/NNN.html）の解析
##############################################################################

# 一覧ページのリンク（例: 「令和8年請願」→ /petition/20047.html）
YEAR_LINK_RE = re.compile(r"^(平成|令和)(元|\d{1,2})年(請願|陳情)$")
# 表の番号欄（例: 第1号 / 第48-2号）
CELL_NUMBER_RE = re.compile(r"第\s*(\d{1,3})(?:-(\d{1,2}))?\s*号")
# 4つの日付が1つのセルにまとまっているため、ラベルで切り分ける
# 日付欄のラベル。令和元年以降と平成31年以前で呼び方が違う。
DATE_LABELS = (
    "受理年月日", "付託年月日",
    "委員会採決年月日", "本会議採決年月日",  # 令和元年〜
    "審査年月日", "議決年月日",              # 〜平成31年
)
DATE_SPLIT_RE = re.compile(r"(" + "|".join(DATE_LABELS) + r")\s*[：:]")
# 新旧のラベルを同じ項目名に寄せる
DATE_ALIASES = {
    "受理年月日": "receivedDate",
    "付託年月日": "referredDate",
    "委員会採決年月日": "committeeVoteDate",
    "審査年月日": "committeeVoteDate",
    "本会議採決年月日": "plenaryVoteDate",
    "議決年月日": "plenaryVoteDate",
}
# 和暦の日付（公式ページは「令和 8年 2月10日」のように空白が入ることがある）
JP_DATE_RE = re.compile(r"(平成|令和)\s*(\d{1,2})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日")
ERA_BASE = {"平成": 1988, "令和": 2018}


def strip_label(value: str) -> str:
    """セル先頭の見出しラベル（例: 「件名：」）を落とす。

    公式ページの表は、狭い画面用に各セルへ項目名を埋め込んでいる。
    """
    return re.sub(r"^[^：:]{1,12}[：:]\s*", "", value).strip()


def normalize_date(value: str) -> str:
    """「令和 8年 2月10日」のような表記の空白を落とす。"""
    match = JP_DATE_RE.search(value)
    if not match:
        return ""
    era, year, month, day = match.groups()
    return f"{era}{int(year)}年{int(month)}月{int(day)}日"


def date_to_iso(value: str) -> str:
    """和暦の日付を西暦（YYYY-MM-DD）にする。読めなければ空文字。"""
    match = JP_DATE_RE.search(value)
    if not match:
        return ""
    era, year, month, day = match.groups()
    return f"{ERA_BASE[era] + int(year):04d}-{int(month):02d}-{int(day):02d}"


def split_labeled(value: str) -> dict[str, str]:
    """4つの日付が入った1つのセルを、ラベルごとに分ける。

    公式ページのこのセルは「受理年月日： 付託年月日： 委員会採決年月日：
    本会議採決年月日： 令和 8年 2月10日 令和 8年 2月20日 …」のように、
    ラベルが先にすべて並び、そのあとに日付が同じ順で並ぶ。日付は途中で
    途切れる（継続審査で採決がまだ、など）。

    ラベルと値が交互に並ぶ書き方に変わっても読めるよう、両方に対応する。
    """
    parts = DATE_SPLIT_RE.split(value)
    labels = [parts[index] for index in range(1, len(parts), 2)]
    segments = [parts[index] for index in range(2, len(parts) + 1, 2)]
    if not labels:
        return {}

    # ラベルと値が交互（ラベル直後に日付がある）の場合
    if any(JP_DATE_RE.search(segment) for segment in segments[:-1]):
        return {
            label: normalize_date(segment)
            for label, segment in zip(labels, segments)
            if JP_DATE_RE.search(segment)
        }

    # ラベルがすべて先に並び、そのあとに日付が同じ順で並ぶ場合
    tail = segments[-1] if segments else ""
    dates = [normalize_date(match.group(0)) for match in JP_DATE_RE.finditer(tail)]
    return {label: date for label, date in zip(labels, dates)}


def year_pages(index_url: str, markup: str) -> list[dict]:
    """一覧ページから、年ごとのページの一覧を作る。"""
    outline = PageOutline(index_url)
    outline.feed(markup)
    pages: list[dict] = []
    seen = set()
    for href, label in outline.links:
        match = YEAR_LINK_RE.match(label.strip())
        if not match or href in seen:
            continue
        if not re.search(r"/(petition|lobbying)/\d+\.html$", href):
            continue
        seen.add(href)
        era, year_text, kind = match.groups()
        pages.append({
            "url": href,
            "label": label.strip(),
            "kind": kind,
            "era": era,
            "eraYear": 1 if year_text == "元" else int(year_text),
        })
    return pages


def parse_year_page(page: dict, markup: str, verbose: bool = False) -> list[dict]:
    """年ごとのページの表から、請願・陳情を1件ずつ取り出す。

    `verbose` を立てると、見つけた見出し行と、結果が空になった行の生セルを
    書き出す。年によって列の作りが違うことがあるため、実行ログで確かめられる
    ようにしている。
    """
    outline = PageOutline(page["url"])
    outline.feed(markup)
    records: list[dict] = []
    unresolved_sample: list[str] | None = None

    for table in outline.tables:
        rows = [row for row in table["rows"] if row]
        if not rows:
            continue
        header = [cell.lstrip("＊") for cell in rows[0]]
        if not any("番号" in cell for cell in header):
            continue
        if verbose:
            print(f"    見出し: {' | '.join(header)}")
        for row in rows[1:]:
            if any(cell.startswith("＊") for cell in row):
                continue  # 表の途中に現れる見出し行
            cells = [strip_label(cell) for cell in row]
            number_match = CELL_NUMBER_RE.search(cells[0] if cells else "")
            if not number_match:
                continue
            values = dict(zip(header, cells))
            # 4つの日付は1つのセルにまとまっている。そのセルだけをラベルで切り分ける。
            date_index = next(
                (i for i, cell in enumerate(header) if "受理年月日" in cell), None
            )
            labeled = split_labeled(row[date_index]) if date_index is not None and date_index < len(row) else {}
            dates = {DATE_ALIASES[label]: value for label, value in labeled.items() if label in DATE_ALIASES}
            # 議決結果の欄は、令和元年以降が「委員会審査」「本会議結果」の2列、
            # 平成31年以前は「結果」の1列。1列だけの年は本会議の議決結果として扱う。
            committee_result = next(
                (v for k, v in values.items() if "委員会" in k and "審査" in k), ""
            )
            plenary_result = next(
                (v for k, v in values.items() if "本会議" in k and "結果" in k), ""
            )
            if not committee_result and not plenary_result:
                plenary_result = values.get("結果", "")
            records.append({
                "kind": page["kind"],
                "era": page["era"],
                "eraYear": page["eraYear"],
                "number": int(number_match.group(1)),
                "branch": number_match.group(2),
                "title": values.get("件名", ""),
                "committee": values.get("付託委員会", ""),
                "receivedDate": dates.get("receivedDate", ""),
                "receivedDateIso": date_to_iso(dates.get("receivedDate", "")),
                "referredDate": dates.get("referredDate", ""),
                "committeeVoteDate": dates.get("committeeVoteDate", ""),
                "plenaryVoteDate": dates.get("plenaryVoteDate", ""),
                "committeeResult": committee_result,
                "plenaryResult": plenary_result,
                "note": values.get("備考", ""),
                # 「〇〇委員会へ参考送付」の案件は付託も議決もされない。
                # 結果が空なのは未収録ではなくそういう扱いだと分かるようにする。
                "reference": "参考送付" in values.get("備考", ""),
                "sourceUrl": page["url"],
            })
            if verbose and unresolved_sample is None and not records[-1]["committeeResult"] \
                    and not records[-1]["plenaryResult"]:
                unresolved_sample = list(row)

    if verbose and unresolved_sample:
        print("    結果が空になった行の生セル:")
        for index, cell in enumerate(unresolved_sample):
            print(f"      [{index}] {cell}")
    return records


def dump_rows(page: dict, markup: str, limit: int) -> None:
    """表のセルを省略せずに書き出す（解析処理を確かめるため）。"""
    outline = PageOutline(page["url"])
    outline.feed(markup)
    print(f"\n--- {page['label']} の生セル（先頭{limit}行） {page['url']} ---")
    for table in outline.tables:
        rows = [row for row in table["rows"] if row]
        if not rows or not any("番号" in cell for cell in rows[0]):
            continue
        for row in rows[:limit + 1]:
            for index, cell in enumerate(row):
                print(f"    [{index}] {cell}")
            print("    " + "-" * 60)


def inspect(index_url: str, follow: int) -> None:
    """一覧ページと、そこから辿れるページの構造を書き出す。"""
    print("公式サイトの構造を調べます（ファイルは書き換えません）")
    markup = fetch(index_url)
    outline = report_outline(index_url, markup)

    if follow <= 0:
        return

    pages = year_pages(index_url, markup)
    print(f"\n\n{'#' * 78}\n# 年ごとのページ {len(pages)}件\n{'#' * 78}")
    for page in pages:
        print(f"  {page['label'].ljust(12)} {page['url']}")

    targets = pages[:follow]
    print(f"\n\n{'#' * 78}\n# 先頭{len(targets)}件の中身と解析結果\n{'#' * 78}")
    for page in targets:
        try:
            page_markup = fetch(page["url"])
        except Exception as error:  # 1ページ失敗しても残りを続ける
            print(f"\n[取得失敗] {page['url']}: {error}")
            continue
        dump_rows(page, page_markup, limit=2)
        records = parse_year_page(page, page_markup)
        print(f"\n--- {page['label']} の解析結果 {len(records)}件 ---")
        for record in records[:5]:
            print("    " + json.dumps(record, ensure_ascii=False))


def era_label(era: str, year_number: int) -> str:
    return f"{era}元年" if year_number == 1 else f"{era}{year_number}年"


def collect(index_url: str) -> tuple[list[dict], list[dict]]:
    """一覧ページから年ごとのページを辿り、請願・陳情をすべて取り出す。"""
    pages = year_pages(index_url, fetch(index_url))
    if not pages:
        raise RuntimeError("一覧ページから年ごとのページを見つけられませんでした")

    items: list[dict] = []
    summaries: list[dict] = []
    for page in pages:
        try:
            print(f"\n  {page['label']}  {page['url']}")
            records = parse_year_page(page, fetch(page["url"]), verbose=True)
        except Exception as error:
            print(f"[取得失敗] {page['label']} {page['url']}: {error}")
            summaries.append({**{k: page[k] for k in ("label", "url", "kind")}, "count": 0, "error": str(error)})
            continue
        for record in records:
            suffix = f"-{record['branch']}" if record["branch"] else ""
            record["numberLabel"] = (
                f"{era_label(record['era'], record['eraYear'])}"
                f"{record['kind']}第{record['number']}{suffix}号"
            )
        items.extend(records)
        blank = sum(1 for r in records if not r["committeeResult"] and not r["plenaryResult"])
        summaries.append({"label": page["label"], "url": page["url"], "kind": page["kind"], "count": len(records)})
        print(f"    → {len(records)}件（うち結果が空 {blank}件）")
    return items, summaries


def write(index_url: str) -> int:
    """取得結果を data/petitions-official.js に書き出す。

    既存の `data/petitions.js` は年データから作っているため、公式ページ由来の
    情報は別ファイルへ出し、統合は `scripts/prepare_petitions.py` 側で行う。
    """
    items, summaries = collect(index_url)
    if not items:
        print("1件も取り出せませんでした。ページ構造が変わっていないか確認してください。")
        return 1

    items.sort(key=lambda item: (
        -(1988 if item["era"] == "平成" else 2018) - item["eraYear"],
        0 if item["kind"] == "請願" else 1,
        item["number"],
        item["branch"] or "",
    ))
    payload = {
        "generatedAt": date.today().isoformat(),
        "sourceUrl": index_url,
        "pages": summaries,
        "itemCount": len(items),
    }
    dumps = lambda value: json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    lines = [
        "// 品川区議会公式サイトの請願・陳情ページから取得した情報（scripts/fetch_petitions.py で生成）",
        "window.SHINAGAWA_PETITIONS_OFFICIAL = {",
        f"  generatedAt: {dumps(payload['generatedAt'])},",
        f"  sourceUrl: {dumps(payload['sourceUrl'])},",
        f"  summary: {dumps(payload)},",
        "  items: [",
    ]
    lines += [f"    {dumps(item)}," for item in items]
    lines += ["  ]", "};", ""]
    OUT_PATH.write_text("\n".join(lines), encoding="utf-8")
    print(f"\n書き出し: {OUT_PATH.relative_to(ROOT)}（{len(items)}件）")
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
        return write(args.url)
    return 0


if __name__ == "__main__":
    sys.exit(main())
