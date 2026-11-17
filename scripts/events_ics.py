#!/usr/bin/env python3
"""イベント一覧を iCalendar (.ics) に書き出す。

Googleカレンダーの「URLで追加」で購読させるためのファイルを作る。
購読したカレンダーはGoogleが数時間から1日おきに取りに来るので、
ここの生成が止まると利用者のカレンダーは古いまま固まる。
収集が失敗してもファイルを空にしないこと（collect_events.py の carry_over）。

RFC 5545 のうち、購読に必要な範囲だけを実装している。
"""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone

# 日本標準時。夏時間が無いので固定の +09:00 として書ける。
JST = timezone(timedelta(hours=9))

PRODID = "-//Shinagawa Council DB//Event Calendar//JA"

# 1行は75オクテットまで。続きは行頭に空白を置いて折り返す（RFC 5545 3.1）。
FOLD_LIMIT = 75


def escape_text(value: str) -> str:
    """TEXT型の値をエスケープする。順番が大事で、\\ を最初に置き換える。"""
    return (
        str(value or "")
        .replace("\\", "\\\\")
        .replace(";", "\\;")
        .replace(",", "\\,")
        .replace("\r\n", "\\n")
        .replace("\n", "\\n")
        .replace("\r", "\\n")
    )


def fold(line: str) -> str:
    """75オクテットを超える行を折り返す。

    文字単位ではなくバイト単位で数える。日本語は1文字3バイトなので、
    文字数で折ると制限を超えたまま出てしまう。
    多バイト文字の途中で切らないよう、1文字ずつ積む。
    """
    encoded = line.encode("utf-8")
    if len(encoded) <= FOLD_LIMIT:
        return line
    chunks: list[str] = []
    current = ""
    current_bytes = 0
    limit = FOLD_LIMIT
    for char in line:
        size = len(char.encode("utf-8"))
        if current_bytes + size > limit:
            chunks.append(current)
            current = char
            current_bytes = size
            # 2行目以降は行頭の空白1つぶん使う
            limit = FOLD_LIMIT - 1
        else:
            current += char
            current_bytes += size
    chunks.append(current)
    return "\r\n ".join(chunks)


def _stamp(moment: datetime) -> str:
    return moment.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def _date_compact(value: str) -> str:
    return value.replace("-", "")


def _local(day: str, clock: str) -> str:
    """開催日と時刻から、日本時間つきの日時表記を作る。"""
    hour, minute = clock.split(":")
    return f"{_date_compact(day)}T{hour}{minute}00"


def occurrences(event: dict) -> list[tuple[str, str]]:
    """イベントを (開始日, 終了日) の並びにする。

    期間もの（periods）は1件にまとめる。1日ずつに割ると、
    259日続く催しがカレンダーに259件入ってしまう。
    期間に入っていない開催日は、それぞれ1件として出す。
    """
    periods = [p for p in (event.get("periods") or []) if p.get("from") and p.get("to")]
    spans = [(p["from"], p["to"]) for p in periods]
    covered = set()
    for begin, finish in spans:
        start = date.fromisoformat(begin)
        end = date.fromisoformat(finish)
        step = start
        while step <= end:
            covered.add(step.isoformat())
            step += timedelta(days=1)
    for day in event.get("dates") or []:
        if day not in covered:
            spans.append((day, day))
    return sorted(set(spans))


def vevent(event: dict, occurrence: tuple[str, str], now: datetime, site_base: str) -> list[str]:
    begin, finish = occurrence
    start_time = event.get("startTime") or ""
    end_time = event.get("endTime") or ""
    uid = f"{event['id']}-{_date_compact(begin)}@shinagawa-gikai-db"

    lines = ["BEGIN:VEVENT", f"UID:{uid}", f"DTSTAMP:{_stamp(now)}"]
    if begin == finish and start_time:
        lines.append(f"DTSTART;TZID=Asia/Tokyo:{_local(begin, start_time)}")
        # 終了時刻が無いときは1時間の予定にする。終了が無いと
        # Googleカレンダーの表示が収集元ごとにばらつくため。
        if end_time and end_time > start_time:
            lines.append(f"DTEND;TZID=Asia/Tokyo:{_local(finish, end_time)}")
        else:
            later = datetime.fromisoformat(f"{begin}T{start_time}:00") + timedelta(hours=1)
            lines.append(f"DTEND;TZID=Asia/Tokyo:{later.strftime('%Y%m%dT%H%M%S')}")
    else:
        # 終日の予定。DTEND は「翌日」を指す（終わりは含まない）。
        last = date.fromisoformat(finish) + timedelta(days=1)
        lines.append(f"DTSTART;VALUE=DATE:{_date_compact(begin)}")
        lines.append(f"DTEND;VALUE=DATE:{_date_compact(last.isoformat())}")

    lines.append(f"SUMMARY:{escape_text(event.get('title', ''))}")

    description_parts = []
    if event.get("summary"):
        description_parts.append(event["summary"])
    if event.get("timeText"):
        description_parts.append(f"時間: {event['timeText']}")
    if event.get("application"):
        description_parts.append(f"申込: {event['application']}")
    if event.get("deadline"):
        description_parts.append(f"申込締切: {event['deadline']}")
    if event.get("confidence") == "estimated":
        description_parts.append("※この開催日は記事本文から推定したものです。出典で確かめてください。")
    description_parts.append(f"出典: {event.get('source', '')}")
    if event.get("url"):
        description_parts.append(event["url"])
    description_parts.append(f"品川区議会DB {site_base}events.html")
    lines.append("DESCRIPTION:" + escape_text("\n".join(description_parts)))

    if event.get("place"):
        lines.append(f"LOCATION:{escape_text(event['place'])}")
    if event.get("url"):
        lines.append(f"URL:{escape_text(event['url'])}")
    if event.get("category"):
        lines.append(f"CATEGORIES:{escape_text(event['category'])}")
    # 推定の開催日は「未確定」として出す。カレンダー側で薄く表示される。
    lines.append("STATUS:TENTATIVE" if event.get("confidence") == "estimated" else "STATUS:CONFIRMED")
    lines.append("TRANSP:TRANSPARENT")
    lines.append("END:VEVENT")
    return lines


def build_calendar(events: list[dict], name: str, description: str, site_base: str, now: datetime | None = None) -> str:
    now = now or datetime.now(timezone.utc)
    lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        f"PRODID:{PRODID}",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        f"X-WR-CALNAME:{escape_text(name)}",
        f"X-WR-CALDESC:{escape_text(description)}",
        "X-WR-TIMEZONE:Asia/Tokyo",
        # 購読側に取り直しの目安を伝える（Googleは参考程度に扱う）
        "REFRESH-INTERVAL;VALUE=DURATION:PT6H",
        "X-PUBLISHED-TTL:PT6H",
        "BEGIN:VTIMEZONE",
        "TZID:Asia/Tokyo",
        "BEGIN:STANDARD",
        "DTSTART:19700101T000000",
        "TZOFFSETFROM:+0900",
        "TZOFFSETTO:+0900",
        "TZNAME:JST",
        "END:STANDARD",
        "END:VTIMEZONE",
    ]
    for event in events:
        for occurrence in occurrences(event):
            lines.extend(vevent(event, occurrence, now, site_base))
    lines.append("END:VCALENDAR")
    return "\r\n".join(fold(line) for line in lines) + "\r\n"
