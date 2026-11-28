#!/usr/bin/env python3
"""品川区のパブリックコメント（意見募集・結果公表）を年度別に取得する。

入口: https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1006648/1006650/index.html
年度別の一覧（令和8年度〜令和4年度以前）から各案件ページを開き、事実だけを取り出す。

- 取り出す: 案件番号・件名・募集期間・応募者数・意見件数・結果公表予定・資料リンク・担当課
- 取り出さない: 「区の考え方」などの本文（公式ページとPDFへ案内する）

使い方:
    python3 scripts/public_comments.py --write   # data/public-comments.js を書き出す
    python3 scripts/public_comments.py           # 取得結果を表示するだけ

標準ライブラリだけで動く（scripts/fetch_petitions.py と同じ方針）。
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
from datetime import date, datetime
from zoneinfo import ZoneInfo
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "data" / "public-comments.js"

INDEX_URL = "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1006648/1006650/index.html"
ALLOWED_HOST = "www.city.shinagawa.tokyo.jp"
USER_AGENT = "shinagawa-gikai-db/1.0 (public data indexer; +https://github.com/taku3516/shinagawa-gikai-db)"
REQUEST_INTERVAL = 2.0  # 区サイトへの連続アクセスを避けるための待ち時間（秒）

ERAS = {"令和": 2018, "平成": 1988}
ITEM_ID = re.compile(r"(\d{4})-(\d{3})")
DOCUMENT_EXT = re.compile(r"\.(pdf|docx?|xlsx?)$", re.I)
DATE = r"(?:令和|平成)(?:元|\d+)年\d+月\d+日"

_last_request_at = 0.0


def wareki_to_iso(text: str) -> str | None:
    """「令和7年2月1日」を "2025-02-01" にする。元年にも対応する。"""
    match = re.search(r"(令和|平成)(元|\d+)年(\d+)月(\d+)日", text)
    if not match:
        return None
    era, year, month, day = match.groups()
    western = ERAS[era] + (1 if year == "元" else int(year))
    return date(western, int(month), int(day)).isoformat()


def to_lines(markup: str) -> list[str]:
    """HTMLをブロック単位の行に分け、タグを外した本文の行の並びにする。"""
    text = re.sub(r"<(script|style)\b.*?</\1>", "", markup, flags=re.S | re.I)
    text = re.sub(r"<(br|/p|/li|/h\d|/tr|/dt|/dd|/td|/th|/div)\b[^>]*>", "\n", text, flags=re.I)
    text = html.unescape(re.sub(r"<[^>]+>", "", text))
    return [line.strip() for line in text.split("\n") if line.strip()]


def links(markup: str, base: str) -> list[tuple[str, str]]:
    """リンク先（絶対URL）とリンク文字列の組を出現順に返す。"""
    found = []
    for match in re.finditer(r'<a\s[^>]*href="([^"]+)"[^>]*>(.*?)</a>', markup, re.S | re.I):
        label = " ".join(html.unescape(re.sub(r"<[^>]+>", "", match.group(2))).split())
        found.append((urljoin(base, html.unescape(match.group(1))), label))
    return found


def parse_index(markup: str, base: str) -> list[dict]:
    """年度別一覧から案件ページ（案件番号つきのリンク）を取り出す。"""
    items = []
    for url, label in links(markup, base):
        match = ITEM_ID.match(label)
        if match and urlparse(url).hostname == ALLOWED_HOST and not url.endswith("/index.html"):
            items.append({"id": match.group(0), "url": url})
    return items


def split_title(heading: str) -> tuple[str, str]:
    """見出し「2024-012「件名」に関する結果公表」から案件番号と件名を取り出す。"""
    match = ITEM_ID.match(heading)
    if not match:
        raise ValueError(f"案件番号のない見出しです: {heading}")
    rest = heading[match.end():].strip()
    quoted = re.match(r"「(.+)」", rest)
    if quoted:
        return match.group(0), quoted.group(1)
    # 古い書式（2019-007 など）は鉤括弧がない
    return match.group(0), re.sub(r"(に関する|に対する).*$", "", rest).strip()


def count(lines: list[str], label: str, unit: str) -> int | None:
    for line in lines:
        match = re.match(label + r"\s*(\d+)\s*" + unit, line)
        if match:
            return int(match.group(1))
    return None


def parse_detail(markup: str, url: str) -> dict:
    """案件ページ1件から事実を取り出す。"""
    # 本文は「ページID」の直前の見出しから。上部メニューにも「お問い合わせ」があるため、
    # 担当課は本文より後ろにある「お問い合わせ」の直後の行に限る（欄のないページもある）
    lines = to_lines(markup)
    page_id = next((index for index, line in enumerate(lines) if line.startswith("ページID")), None)
    if page_id is None:
        page_id = next((index + 1 for index, line in enumerate(lines) if ITEM_ID.match(line) and "｜" not in line), None)
    heading_at = next((index for index in range(page_id - 1, -1, -1) if ITEM_ID.match(lines[index])), None) if page_id else None
    if heading_at is None:
        raise ValueError(f"見出しが見つかりません: {url}")
    heading = lines[heading_at]
    inquiry = next((index for index in range(page_id, len(lines)) if lines[index] == "お問い合わせ"), None)
    department = lines[inquiry + 1] if inquiry is not None and inquiry + 1 < len(lines) else None
    body = lines[heading_at:inquiry]
    item_id, title = split_title(heading)
    status = "result" if re.search(r"結果", heading) else "open"

    # 募集期間: 見出し「募集期間」の次の行。「から」または「～」で開始と終了を分ける
    start = end = None
    for index, line in enumerate(body):
        if re.search(r"募集期間$", line) and index + 1 < len(body):
            dates = re.findall(DATE, body[index + 1])
            if len(dates) >= 2:
                start, end = wareki_to_iso(dates[0]), wareki_to_iso(dates[1])
            elif dates:
                end = wareki_to_iso(dates[0])
            break
    if start is None:
        posted = next((line for line in body if re.search(DATE + r"掲載", line)), None)
        start = wareki_to_iso(posted) if posted else None

    planned = next((re.search(r"((?:令和|平成)\S+?頃)に?結果を公表", line) for line in body
                    if re.search(r"頃に?結果を公表", line)), None)
    updated = next((line for line in body if line.startswith("更新日")), "")
    updated_match = re.search(r"(\d{4})年(\d+)月(\d+)日", updated)

    content = re.split(r"<h2[^>]*>\s*お問い合わせ", markup)[0]
    documents = []
    for href, label in links(content, url):
        ext = DOCUMENT_EXT.search(urlparse(href).path)
        if not ext or urlparse(href).hostname != ALLOWED_HOST:
            continue
        clean = re.sub(r"\s*[（(](?:PDF|Word|Excel)[^）)]*[）)]\s*$", "", label).strip()
        kind = {"pdf": "PDF", "doc": "Word", "docx": "Word", "xls": "Excel", "xlsx": "Excel"}[ext.group(1).lower()]
        documents.append({"label": clean, "url": href, "kind": kind})

    return {
        "id": item_id,
        "fiscalYear": int(item_id[:4]),
        "title": title,
        "status": status,
        "url": url,
        "start": start,
        "end": end,
        "applicants": count(body, "応募者数", "人"),
        "opinions": count(body, "意見件数", "件"),
        "resultPlanned": planned.group(1) if planned else None,
        "department": department,
        "updatedAt": date(*map(int, updated_match.groups())).isoformat() if updated_match else None,
        "documents": documents,
    }


def fetch(url: str, retries: int = 3) -> str:
    """区サイトのページを取得する。区サイト以外へは出ない。"""
    if urlparse(url).hostname != ALLOWED_HOST:
        raise ValueError(f"許可していないホストです: {url}")
    global _last_request_at
    wait = REQUEST_INTERVAL - (time.monotonic() - _last_request_at)
    if wait > 0:
        time.sleep(wait)
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request, timeout=30) as response:
                _last_request_at = time.monotonic()
                return response.read().decode("utf-8")
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = error
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"取得できませんでした: {url} ({last_error})")


def year_pages(markup: str) -> list[str]:
    """入口ページから年度別一覧（〜パブリックコメント実施状況）のURLを取り出す。"""
    return [url for url, label in links(markup, INDEX_URL) if "パブリックコメント実施状況" in label]


def collect() -> list[dict]:
    pages = year_pages(fetch(INDEX_URL))
    if not pages:
        raise RuntimeError("年度別一覧が見つかりません。入口ページの構成が変わった可能性があります。")
    targets: dict[str, str] = {}
    for page in pages:
        for item in parse_index(fetch(page), page):
            targets.setdefault(item["id"], item["url"])
    items = [parse_detail(fetch(url), url) for url in targets.values()]
    return sorted(items, key=lambda item: item["id"], reverse=True)


def render(items: list[dict]) -> str:
    payload = {
        "source": {"label": "品川区 パブリックコメント（意見公募手続）", "url": INDEX_URL},
        "fetchedAt": date.today().isoformat(),
        "items": items,
    }
    return ("/* scripts/public_comments.py が品川区サイトから生成。手で編集しない。 */\n"
            "window.SHINAGAWA_PUBLIC_COMMENTS = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n")


def previous_items() -> list[dict] | None:
    """前回書き出した案件一覧を読む。取得日だけの差分でコミットが増えないようにするため。"""
    if not OUT_PATH.exists():
        return None
    text = OUT_PATH.read_text(encoding="utf-8")
    try:
        return json.loads(text[text.index("{"):text.rindex("}") + 1])["items"]
    except (ValueError, KeyError) as error:
        print(f"前回のデータを読めませんでした（上書きします）: {error}", file=sys.stderr)
        return None


def carry_result_seen(items: list[dict], previous: list[dict] | None, today: str) -> list[dict]:
    """結果公表を当サイトが見つけた日（resultSeenAt）を付ける。

    区のページには結果を公表した日が無く、更新日はサイトの改修でそろって書き換わるため、
    新着の日付には使えない。前回の取得で募集中（open）だった案件が結果公表（result）に
    変わった日を記録し、以後の取得では最初の日を引き継ぐ。初めて見た時点で結果公表済みの
    案件は公表日が分からないので None のままにする。
    """
    before = {item["id"]: item for item in previous or []}
    carried = []
    for item in items:
        old = before.get(item["id"])
        seen = None
        if item["status"] == "result" and old is not None:
            seen = old.get("resultSeenAt") or (today if old.get("status") != "result" else None)
        carried.append({**item, "resultSeenAt": seen})
    return carried


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--write", action="store_true", help="data/public-comments.js を書き出す")
    args = parser.parse_args()
    previous = previous_items()
    # 定期実行は UTC で動くので、日本の暦日で記録する（月曜朝5時半の実行が日曜の日付にならないように）
    today = datetime.now(ZoneInfo("Asia/Tokyo")).date().isoformat()
    items = carry_result_seen(collect(), previous, today)
    missing = [item["id"] for item in items if item["status"] == "result" and (item["start"] is None or item["opinions"] is None)]
    for item in items:
        print(item["id"], item["status"], item["start"], item["end"], item["applicants"], item["opinions"], item["title"], file=sys.stderr)
    if missing:
        print("期間または件数を読めなかった結果公表: " + ", ".join(missing), file=sys.stderr)
    if args.write:
        if previous == items:
            print("内容に変更がないため書き換えません", file=sys.stderr)
            return 0
        OUT_PATH.write_text(render(items), encoding="utf-8")
        print(f"{len(items)}件を {OUT_PATH.relative_to(ROOT)} に書き出しました", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
