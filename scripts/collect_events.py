#!/usr/bin/env python3
"""品川区内のイベントを集め、静的サイト用の data/events.js を生成する。

収集元は4つ。確度（events_core の CONFIDENCE_*）が違うので混ぜたままにせず、
1件ずつどこから来たかを残す。

  city-calendar  区の公式イベントカレンダー。開催日が構造化されていて最も確か
  gikai-*        区議会の各委員会の予定・結果。ページに年月日が明記されている
  kanko          しながわ観光協会のイベント。ページに開催日時が明記されている
  news           data/news-items.js の記事本文から開催日を推定したもの

取得できなかった収集元があっても、前回の結果は消さずに残す。
一度の通信失敗でカレンダーが空になるのを避けるため（collect_news.py と同じ方針）。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parent))

import events_core as core  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "data" / "events.js"
DEFAULT_NEWS = ROOT / "data" / "news-items.js"
USER_AGENT = (
    "ShinagawaCouncilDB-EventCollector/1.0 "
    "(+https://taku3516.github.io/shinagawa-gikai-db/)"
)

# 区の公式イベントカレンダーの実データ。event_calendar.html がこれを読んで描画している。
CITY_EVENT_JS = "https://www.city.shinagawa.tokyo.jp/event.js"
CITY_CALENDAR_PAGE = "https://www.city.shinagawa.tokyo.jp/event_calendar.html"
CITY_BASE = "https://www.city.shinagawa.tokyo.jp/"

# 区議会の各委員会。「予定・結果」の表に年月日と付議事件が載る。
GIKAI_BASE = "https://gikai.city.shinagawa.tokyo.jp/katsudou/inkai-schedule/"
COMMITTEES = [
    ("soumu", "総務委員会"),
    ("kumin", "区民委員会"),
    ("kosei", "厚生委員会"),
    ("bunkyo", "文教委員会"),
    ("kensetsu", "建設委員会"),
    ("gikai_unei", "議会運営委員会"),
    ("yosan", "予算特別委員会"),
    ("kessan", "決算特別委員会"),
    ("koukyo", "公共施設等整備特別委員会"),
    ("kyosei", "共生社会推進特別委員会"),
    ("sdgs", "SDGs推進特別委員会"),
]

# しながわ観光協会。新しい順に並ぶので、先頭の数ページだけ見る。
KANKO_INDEX = "https://shinagawa-kanko.or.jp/event/"
KANKO_INDEX_PAGES = 3
KANKO_MAX_DETAILS = 60
KANKO_DETAIL = re.compile(r"https://shinagawa-kanko\.or\.jp/event/(?!page/)[^/\"?#]+/")

# ニュースから拾うのは、イベントらしいタグが付いた記事だけにする。
# 全記事を対象にすると、日付を含むだけの記事（事故の発生日など）が大量に入る。
NEWS_EVENT_TAGS = {"地域イベント"}
NEWS_MAX_ITEMS = 400

# 過ぎたイベントをいつまで残すか。カレンダーを遡って見られるようにする。
KEEP_PAST_DAYS = 400


# ---------------------------------------------------------------- 取得


def fetch(url: str, timeout: int = 15, attempts: int = 3) -> str:
    """ページを取って文字列で返す。取れなければ例外を投げる。"""
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept": "text/html,application/xhtml+xml,application/javascript;q=0.9,*/*;q=0.7",
        },
    )
    last_error: Exception | None = None
    for _ in range(attempts):
        try:
            with urlopen(request, timeout=timeout) as response:
                raw = response.read()
            break
        except (HTTPError, URLError, TimeoutError, OSError) as error:
            last_error = error
    else:
        raise last_error if last_error else OSError(url)
    for encoding in ("utf-8", "cp932", "euc-jp"):
        try:
            return raw.decode(encoding)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", "replace")


# ------------------------------------------------- 収集元1: 区公式カレンダー


def _js_value(body: str, key: str) -> str:
    """`key: ...` の値をそのまま切り出す。括弧の対応を数えて終わりを見つける。"""
    match = re.search(rf"(?:^|\n)\s*{re.escape(key)}\s*:\s*", body)
    if not match:
        return ""
    start = match.end()
    if start >= len(body) or body[start] not in "[{":
        return ""
    opening = body[start]
    closing = "]" if opening == "[" else "}"
    depth = 0
    in_string = False
    escaped = False
    for index in range(start, len(body)):
        char = body[index]
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == '"':
                in_string = False
            continue
        if char == '"':
            in_string = True
        elif char == opening:
            depth += 1
        elif char == closing:
            depth -= 1
            if depth == 0:
                return body[start : index + 1]
    return ""


def parse_city_calendar(js_text: str) -> tuple[list[dict], list[str]]:
    """区の event.js を読んでイベントと休日の一覧にする。"""
    if "event_data" not in js_text:
        raise ValueError("区のイベントデータの形が変わっています（event_data が見当たりません）")
    body = js_text[js_text.index("{") :]
    raw_events = json.loads(_js_value(body, "events") or "[]")
    categories = json.loads(_js_value(body, "categories") or "{}")
    applications = json.loads(_js_value(body, "applications") or "{}")
    holidays = [core.normalize_date(d) for d in json.loads(_js_value(body, "holidays") or "[]")]

    events: list[dict] = []
    for raw in raw_events:
        title = core.clean_text(raw.get("eventtitle"))
        if not title:
            continue
        # opendays は期間ものも定期開催も1日ずつ展開済み。これを開催日の正とする。
        dates = sorted({d for d in (core.normalize_date(x) for x in raw.get("opendays") or []) if d})
        if not dates:
            continue
        # kikandays は「いつからいつまで」。1日ずつではなく期間として持つ。
        # 期間を1日ずつカレンダーに入れると、259日続く催しが259件になってしまう。
        periods = []
        for span in raw.get("kikandays") or []:
            if not isinstance(span, dict):
                continue
            begin, finish = core.normalize_date(span.get("from")), core.normalize_date(span.get("to"))
            if begin and finish:
                periods.append({"from": begin, "to": finish})
        time_source = " ".join(raw.get("times") or []) or core.clean_text(raw.get("time_texts"))
        start_time, end_time = core.parse_time_range(time_source)
        url = urljoin(CITY_BASE, raw.get("url") or "")
        events.append(
            {
                "id": core.event_id("city-calendar", url, title),
                "title": title,
                "summary": core.summary_text(raw.get("description")),
                "url": url,
                "sourceId": "city-calendar",
                "source": "品川区 イベントカレンダー",
                "category": categories.get((raw.get("category") or [""])[0], ""),
                "dates": dates,
                "startTime": start_time,
                "endTime": end_time,
                "timeText": core.clean_text(
                    " ".join(raw.get("times") or []) + " " + core.clean_text(raw.get("time_texts"))
                ),
                "place": core.clean_text(raw.get("place2")),
                "application": applications.get(str(raw.get("application") or ""), ""),
                "deadline": core.normalize_date(raw.get("offer_endday")),
                "periods": periods,
                "confidence": core.CONFIDENCE_OFFICIAL,
            }
        )
    return events, sorted({d for d in holidays if d})


# ------------------------------------------------- 収集元2: 区議会 委員会日程

_ROW = re.compile(r"<tr\b.*?</tr>", re.S | re.I)
_CELL = re.compile(r"<t[hd]\b[^>]*>(.*?)</t[hd]>", re.S | re.I)


def parse_committee_schedule(html_text: str, committee: str, url: str) -> list[dict]:
    """委員会の「予定・結果」の表から開催日と付議事件を読む。

    年月日のセルは rowspan で複数行にまたがる。日付の無い行は直前の日付の続きなので、
    拾った日付を引き継ぐ。引き継がないと2件目以降の付議事件が日付を失う。
    """
    tables = re.findall(r"<table\b.*?</table>", html_text, re.S | re.I)
    if not tables:
        return []
    by_date: dict[str, list[str]] = {}
    order: list[str] = []
    current = ""
    for row in _ROW.findall(tables[0]):
        cells = [core.clean_text(c) for c in _CELL.findall(row)]
        if not cells:
            continue
        head = cells[0]
        if head.startswith("年月日"):
            found = core.normalize_date(head)
            if found:
                current = found
                if current not in by_date:
                    by_date[current] = []
                    order.append(current)
        if not current:
            continue
        # 件名のセルを拾う。「件名○…」の形で入っている。
        for cell in cells[1:]:
            if cell.startswith("件名"):
                subject = cell[2:].strip()
                if subject:
                    by_date[current].append(subject)

    events: list[dict] = []
    for day in order:
        subjects = by_date.get(day) or []
        # 添付PDFの表記（「（ .pdf.1,320KB ）」）は中身ではないので落とす
        joined = re.sub(r"[（(]\s*\.pdf\.[0-9,]+\s*KB\s*[）)]", "", " ".join(subjects))
        summary = core.summary_text(joined)
        title = f"{committee}"
        events.append(
            {
                "id": core.event_id("gikai-committee", url, f"{committee} {day}"),
                "title": title,
                "summary": summary,
                "url": url,
                "sourceId": "gikai-committee",
                "source": "品川区議会",
                "category": "区議会",
                "dates": [day],
                "startTime": "",
                "endTime": "",
                "timeText": "",
                "place": "品川区議会議事堂",
                "application": "",
                "deadline": "",
                "confidence": core.CONFIDENCE_PUBLISHED,
            }
        )
    return events


# ------------------------------------------------- 収集元3: しながわ観光協会

_KANKO_DATE_LABEL = re.compile(r"(開催日時|開催日|日時|会期)")


def parse_kanko_event(html_text: str, url: str) -> dict | None:
    """観光協会のイベントページから題と開催日を読む。"""
    title_match = re.search(r"<title>(.*?)</title>", html_text, re.S | re.I)
    title = core.clean_text(title_match.group(1)) if title_match else ""
    title = re.sub(r"\s*[|｜]\s*(一般社団法人\s*)?しながわ観光協会.*$", "", title).strip()
    if not title:
        return None

    text = core.clean_text(re.sub(r"<script.*?</script>|<style.*?</style>", " ", html_text, flags=re.S | re.I))
    normalized = unicodedata.normalize("NFKC", text)

    # 「開催日時」の後ろの一節だけを見る。ページ全体を見ると関連記事の日付を拾う。
    label = _KANKO_DATE_LABEL.search(normalized)
    window = normalized[label.end() : label.end() + 160] if label else ""
    dates = [d for d in (core.normalize_date(m.group(0)) for m in re.finditer(r"\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日", window)) if d]
    if not dates:
        return None
    start_time, end_time = core.parse_time_range(window)
    return {
        "id": core.event_id("kanko", url, title),
        "title": title,
        "summary": core.summary_text(window),
        "url": url,
        "sourceId": "kanko",
        "source": "しながわ観光協会",
        "category": "文化・観光・スポーツ",
        "dates": sorted(set(dates)),
        "startTime": start_time,
        "endTime": end_time,
        "timeText": core.clean_text(window)[:80],
        "place": "",
        "application": "",
        "deadline": "",
        "confidence": core.CONFIDENCE_PUBLISHED,
    }


# ------------------------------------------------- 収集元4: ニュース記事


def read_news_items(path: Path) -> list[dict]:
    """data/news-items.js から記事一覧を読む。"""
    if not path.exists():
        return []
    text = path.read_text(encoding="utf-8")
    start = text.find("{")
    end = text.rfind("}")
    if start < 0 or end < 0:
        return []
    try:
        return json.loads(text[start : end + 1]).get("items", [])
    except json.JSONDecodeError:
        return []


def events_from_news(items: list[dict]) -> list[dict]:
    """イベントらしい記事の本文から開催日を推定する。確度は estimated。"""
    events: list[dict] = []
    for item in items[:NEWS_MAX_ITEMS]:
        if not (set(item.get("tags") or []) & NEWS_EVENT_TAGS):
            continue
        reference = item.get("publishedAt") or item.get("collectedAt") or ""
        text = f"{item.get('title', '')} {item.get('summary', '')}"
        dates = core.extract_dates_from_text(text, reference)
        if not dates:
            continue
        url = item.get("url") or ""
        title = core.clean_text(item.get("title"))
        if not url or not title:
            continue
        start_time, end_time = core.parse_time_range(text)
        events.append(
            {
                "id": core.event_id("news", url, title),
                "title": title,
                "summary": core.summary_text(item.get("summary")),
                "url": url,
                "sourceId": "news",
                "source": item.get("source") or "ニュース",
                "category": "地域イベント",
                "dates": dates,
                "startTime": start_time,
                "endTime": end_time,
                "timeText": "",
                "place": " ".join(item.get("locations") or [])[:80],
                "application": "",
                "deadline": "",
                "confidence": core.CONFIDENCE_ESTIMATED,
                "newsId": item.get("id", ""),
            }
        )
    return events


# ---------------------------------------------------------------- 取りまとめ


def _kanko_detail_urls(index_html: str) -> list[str]:
    found: list[str] = []
    for match in KANKO_DETAIL.finditer(index_html):
        url = match.group(0)
        if url.rstrip("/").endswith("/event"):
            continue
        if url not in found:
            found.append(url)
    return found


def collect_city(reports: list[dict]) -> tuple[list[dict], list[str]]:
    try:
        events, holidays = parse_city_calendar(fetch(CITY_EVENT_JS))
        reports.append({"sourceId": "city-calendar", "source": "品川区 イベントカレンダー", "status": "ok", "accepted": len(events)})
        return events, holidays
    except (ValueError, json.JSONDecodeError, HTTPError, URLError, TimeoutError, OSError) as error:
        reports.append({"sourceId": "city-calendar", "source": "品川区 イベントカレンダー", "status": "error", "accepted": 0, "message": str(error)[:180]})
        print(f"WARN: 区のイベントカレンダー: {error}", file=sys.stderr)
        return [], []


def collect_gikai(reports: list[dict]) -> list[dict]:
    events: list[dict] = []
    failures = 0
    for slug, name in COMMITTEES:
        url = GIKAI_BASE + slug
        try:
            events.extend(parse_committee_schedule(fetch(url), name, url))
        except (HTTPError, URLError, TimeoutError, OSError, ValueError) as error:
            failures += 1
            print(f"WARN: {name}: {error}", file=sys.stderr)
    status = "ok" if events else ("error" if failures else "ok")
    reports.append({"sourceId": "gikai-committee", "source": "品川区議会 委員会日程", "status": status, "accepted": len(events), "failed": failures})
    return events


def collect_kanko(reports: list[dict]) -> list[dict]:
    detail_urls: list[str] = []
    try:
        for page in range(1, KANKO_INDEX_PAGES + 1):
            index_url = KANKO_INDEX if page == 1 else f"{KANKO_INDEX}page/{page}/"
            for url in _kanko_detail_urls(fetch(index_url)):
                if url not in detail_urls:
                    detail_urls.append(url)
    except (HTTPError, URLError, TimeoutError, OSError) as error:
        reports.append({"sourceId": "kanko", "source": "しながわ観光協会", "status": "error", "accepted": 0, "message": str(error)[:180]})
        print(f"WARN: しながわ観光協会の一覧: {error}", file=sys.stderr)
        return []

    events: list[dict] = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(fetch, url): url for url in detail_urls[:KANKO_MAX_DETAILS]}
        for future in as_completed(futures):
            url = futures[future]
            try:
                event = parse_kanko_event(future.result(), url)
            except (HTTPError, URLError, TimeoutError, OSError, ValueError) as error:
                print(f"WARN: {url}: {error}", file=sys.stderr)
                continue
            if event:
                events.append(event)
    reports.append({"sourceId": "kanko", "source": "しながわ観光協会", "status": "ok", "accepted": len(events), "scanned": len(detail_urls)})
    return events


def read_existing(path: Path) -> dict:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8")
    start, end = text.find("{"), text.rfind("}")
    if start < 0 or end < 0:
        return {}
    try:
        return json.loads(text[start : end + 1])
    except json.JSONDecodeError:
        return {}


def carry_over(fresh: list[dict], previous: list[dict], failed_sources: set[str]) -> list[dict]:
    """取得に失敗した収集元のイベントは、前回の結果をそのまま残す。

    一度の通信失敗でカレンダーからごっそり消えるのを避ける。
    成功した収集元については、今回の結果で置き換える（消えたものは消す）。
    """
    if not failed_sources:
        return fresh
    kept_ids = {event["id"] for event in fresh}
    carried = [
        event
        for event in previous
        if event.get("sourceId") in failed_sources and event.get("id") not in kept_ids
    ]
    return fresh + carried


def build_payload(events: list[dict], holidays: list[str], reports: list[dict], today: str) -> dict:
    cutoff = (datetime.fromisoformat(today) - timedelta(days=KEEP_PAST_DAYS)).date().isoformat()
    trimmed = []
    for event in events:
        dates = sorted({d for d in (event.get("dates") or []) if d >= cutoff})
        if not dates:
            continue
        event = dict(event)
        event["dates"] = dates
        event["startDate"] = dates[0]
        event["endDate"] = dates[-1]
        trimmed.append(event)
    trimmed.sort(key=lambda e: (e["startDate"], e.get("title", "")))
    return {
        "generatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "events": trimmed,
        "holidays": holidays,
        "sources": [
            {"id": "city-calendar", "name": "品川区 イベントカレンダー", "url": CITY_CALENDAR_PAGE, "confidence": core.CONFIDENCE_OFFICIAL},
            {"id": "gikai-committee", "name": "品川区議会 委員会の予定・結果", "url": GIKAI_BASE, "confidence": core.CONFIDENCE_PUBLISHED},
            {"id": "kanko", "name": "しながわ観光協会", "url": KANKO_INDEX, "confidence": core.CONFIDENCE_PUBLISHED},
            {"id": "news", "name": "区のニュース（本文から開催日を推定）", "url": "news.html", "confidence": core.CONFIDENCE_ESTIMATED},
        ],
        "reports": reports,
    }


def write_output(path: Path, payload: dict) -> bool:
    existing = read_existing(path)
    if existing.get("events") == payload["events"] and existing.get("holidays") == payload["holidays"]:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text(
        "// 自動生成ファイル。scripts/collect_events.py で更新する。\n"
        "window.SHINAGAWA_EVENTS = " + body + ";\n",
        encoding="utf-8",
    )
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--news", type=Path, default=DEFAULT_NEWS)
    parser.add_argument("--skip-network", action="store_true", help="ニュースからの抽出だけを行う（検査用）")
    args = parser.parse_args()

    reports: list[dict] = []
    events: list[dict] = []
    holidays: list[str] = []
    failed: set[str] = set()

    if not args.skip_network:
        city_events, holidays = collect_city(reports)
        events.extend(city_events)
        events.extend(collect_gikai(reports))
        events.extend(collect_kanko(reports))
        failed = {report["sourceId"] for report in reports if report["status"] == "error" and report.get("sourceId")}

    news_events = events_from_news(read_news_items(args.news))
    reports.append({"sourceId": "news", "source": "区のニュース", "status": "ok", "accepted": len(news_events)})
    events.extend(news_events)

    previous = read_existing(args.output)
    if not holidays:
        holidays = previous.get("holidays") or []
    events = carry_over(events, previous.get("events") or [], {s for s in failed if s})
    events = core.merge_events(events)

    payload = build_payload(events, holidays, reports, datetime.now(timezone.utc).isoformat())
    changed = write_output(args.output, payload)
    errors = sum(report["status"] == "error" for report in reports)
    print(
        f"events: {len(payload['events'])} 件 / 収集元の失敗 {errors} 件 / "
        + ("更新しました" if changed else "変更なし")
    )
    return 1 if errors and len(payload["events"]) == 0 else 0


if __name__ == "__main__":
    raise SystemExit(main())
