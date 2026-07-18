#!/usr/bin/env python3
"""令和8年の委員会会議録を収集し、台帳と画面用データを生成する。

正式会議録（会議録検索システムのHTML）と直近の校正原稿PDFを同じ形式に
そろえる。要約は外部AIへ送らず、発言録から質問・要望を含む文と答弁・対応を
示す文を抽出する。推測による補完は行わない。
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import subprocess
import time
import urllib.parse
import urllib.request
import http.cookiejar
from collections import Counter, OrderedDict
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts/cache/r08-committees"
OUT = ROOT / "scripts/out/r08-committees"
DATA_PATH = ROOT / "data/r08-committees.js"
DATA_PART_PATTERN = "r08-committees-part-*.js"
LEDGER_PATH = ROOT / "docs/r08-committee-inventory.md"
UA = {"User-Agent": "Mozilla/5.0 (shinagawa-gikai-db committee importer)"}
MINUTES_BASE = "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000"
DRAFT_INDEX = "https://gikai.city.shinagawa.tokyo.jp/search"
CALENDAR_URL = "https://gikai.city.shinagawa.tokyo.jp/calendar_list"
PDFINFO = Path("/Users/apple/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/override/pdfinfo")
PDFTOTEXT = Path("/Users/apple/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/bin/pdftotext")
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

CABINETS = OrderedDict([
    (3, "予算特別委員会"),
    (4, "決算特別委員会"),
    (5, "総務委員会"),
    (6, "区民委員会"),
    (7, "厚生委員会"),
    (8, "建設委員会"),
    (9, "文教委員会"),
    (10, "議会運営委員会"),
    (20, "ＳＤＧｓ推進・行財政改革特別委員会"),
    (21, "子ども若者支援・共生社会推進特別委員会"),
    (22, "まちづくり・公共交通推進特別委員会"),
])

STANDING_COMMITTEES = ["総務委員会", "区民委員会", "厚生委員会", "建設委員会", "文教委員会"]

PDF_CODES = {
    "so": "総務委員会", "ku": "区民委員会", "ko": "厚生委員会",
    "ke": "建設委員会", "bu": "文教委員会", "gu": "議会運営委員会",
    "sd": "ＳＤＧｓ推進・行財政改革特別委員会",
    "kw": "子ども若者支援・共生社会推進特別委員会",
    "ma": "まちづくり・公共交通推進特別委員会",
}

# 現時点で日程が判明しているが、会議録が未公開または未開催の委員会。
# 公式会議録を取得できた同日・同委員会は生成時に自動で除外する。
KNOWN_PENDING = [
    ("2026-06-24", "議会運営委員会", "r08-2t", "開催済み・会議録公開待ち"),
    *[("2026-06-29", name, "r08-2t", "開催済み・会議録公開待ち") for name in STANDING_COMMITTEES],
    *[("2026-06-30", name, "r08-2t", "開催済み・会議録公開待ち") for name in STANDING_COMMITTEES],
    ("2026-07-01", "ＳＤＧｓ推進・行財政改革特別委員会", "r08-2t", "開催済み・会議録公開待ち"),
    ("2026-07-01", "子ども若者支援・共生社会推進特別委員会", "r08-2t", "開催済み・会議録公開待ち"),
    ("2026-07-02", "まちづくり・公共交通推進特別委員会", "r08-2t", "開催済み・会議録公開待ち"),
    ("2026-07-08", "議会運営委員会", "r08-2t", "開催済み・会議録公開待ち"),
    *[("2026-07-27", name, "r08-m0708", "開催予定") for name in STANDING_COMMITTEES],
    ("2026-07-28", "ＳＤＧｓ推進・行財政改革特別委員会", "r08-m0708", "開催予定"),
    ("2026-07-28", "子ども若者支援・共生社会推進特別委員会", "r08-m0708", "開催予定"),
    ("2026-07-29", "まちづくり・公共交通推進特別委員会", "r08-m0708", "開催予定"),
    ("2026-07-30", "議会運営委員会", "r08-m0708", "開催予定"),
    ("2026-08-06", "建設委員会", "r08-m0708", "開催予定"),
    *[("2026-08-24", name, "r08-m0708", "開催予定") for name in STANDING_COMMITTEES],
    ("2026-08-25", "ＳＤＧｓ推進・行財政改革特別委員会", "r08-m0708", "開催予定"),
    ("2026-08-25", "子ども若者支援・共生社会推進特別委員会", "r08-m0708", "開催予定"),
    ("2026-08-26", "まちづくり・公共交通推進特別委員会", "r08-m0708", "開催予定"),
    ("2026-08-27", "議会運営委員会", "r08-m0708", "開催予定"),
    ("2026-09-16", "議会運営委員会", "r08-3t", "開催予定"),
    *[("2026-09-24", name, "r08-3t", "開催予定") for name in STANDING_COMMITTEES],
    *[("2026-09-25", name, "r08-3t", "開催予定") for name in STANDING_COMMITTEES],
    ("2026-09-28", "ＳＤＧｓ推進・行財政改革特別委員会", "r08-3t", "開催予定"),
    ("2026-09-28", "子ども若者支援・共生社会推進特別委員会", "r08-3t", "開催予定"),
    ("2026-09-29", "まちづくり・公共交通推進特別委員会", "r08-3t", "開催予定"),
    *[(iso, "決算特別委員会", "r08-3t", "開催予定") for iso in (
        "2026-10-02", "2026-10-05", "2026-10-06", "2026-10-14",
        "2026-10-15", "2026-10-16", "2026-10-20",
    )],
    ("2026-10-22", "議会運営委員会", "r08-3t", "開催予定"),
]

QUESTION_CUES = (
    "伺", "質問", "確認", "教えて", "お聞き", "見解", "お考え", "どう", "なぜ",
    "でしょうか", "ですか", "求め", "要望", "提案", "いただきたい", "お願いしたい", "べき",
)
ANSWER_CUES = (
    "答え", "説明", "考え", "認識", "実施", "予定", "検討", "対応", "進め", "行い",
    "まいり", "取り組", "努め", "設置", "支援", "連携", "見込", "できません", "ありません",
)
PROCEDURAL = (
    "開会いたします", "閉会いたします", "議題に供します", "ご発言願います", "ほかにございますか",
    "採決いたします", "異議ございませんか", "休憩いたします", "再開いたします", "予定に入ります",
    "説明を聴取いたします", "お諮りいたします", "ご異議ありません", "本日はお手元",
)


def compact(value: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(value or "")).strip()


def normalize_name(value: str) -> str:
    return re.sub(r"[\s　○◯]", "", value or "").strip("：:")


def cache_path(url: str, suffix: str) -> Path:
    return CACHE / f"{hashlib.sha256(url.encode()).hexdigest()}{suffix}"


def fetch(url: str, suffix: str = ".html", refresh: bool = False) -> bytes:
    path = cache_path(url, suffix)
    if path.exists() and not refresh:
        return path.read_bytes()
    req = urllib.request.Request(url, headers=UA)
    with OPENER.open(req, timeout=60) as response:
        body = response.read()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(body)
    time.sleep(0.45)
    return body


def fetch_post(url: str, fields: dict[str, str], cache_key: str, refresh: bool = False) -> bytes:
    path = cache_path(cache_key, ".html")
    if path.exists() and not refresh:
        return path.read_bytes()
    data = urllib.parse.urlencode(fields).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers=UA)
    with OPENER.open(req, timeout=60) as response:
        body = response.read()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(body)
    time.sleep(0.45)
    return body


def absolute_url(url: str, base: str = MINUTES_BASE) -> str:
    return urllib.parse.urljoin(base, url)


def parse_iso_date(value: str) -> str:
    match = re.search(r"(2026)[./年-](\d{1,2})[./月-](\d{1,2})", value)
    return f"{match.group(1)}-{int(match.group(2)):02d}-{int(match.group(3)):02d}" if match else ""


def meeting_id_for(iso_date: str, committee: str) -> str:
    month = int(iso_date[5:7])
    day = int(iso_date[8:10])
    if committee == "予算特別委員会":
        return "r08-yosan"
    if committee == "決算特別委員会":
        return "r08-3t"
    if month == 1:
        return "r08-m01"
    if month in (2, 3):
        return "r08-1t"
    if month == 4 or (month == 5 and day <= 21):
        return "r08-m0405"
    if month == 5:
        return "r08-1r"
    if month == 6 and day <= 12:
        return "r08-m06"
    if month <= 7 and day <= 9:
        return "r08-2t"
    if month <= 8:
        return "r08-m0708"
    return "r08-3t"


def discover_formal(refresh: bool) -> list[dict]:
    documents: list[dict] = []
    for cabinet, committee in CABINETS.items():
        url = f"{MINUTES_BASE}?QueryType=new&Template=list&Cabinet={cabinet}&TermStart=2026-01-01&TermEnd=2026-12-31"
        raw_pages = [fetch(url, refresh=refresh)]
        first_soup = BeautifulSoup(raw_pages[0].decode("utf-8", "replace"), "html.parser")
        pager = first_soup.select_one("nav.pagination form")
        page_values = [int(node.get("value")) for node in first_soup.select('nav.pagination button[name="Page"][value]')]
        last_page = max(page_values, default=1)
        if pager and last_page > 1:
            action = absolute_url(pager.get("action", ""), url)
            token = pager.select_one('input[name="_token"]')
            for page in range(2, last_page + 1):
                fields = {"Template": "list", "Page": str(page)}
                if token:
                    fields["_token"] = token.get("value", "")
                raw_pages.append(fetch_post(action, fields, f"{url}#page={page}", refresh))
        for raw in raw_pages:
            soup = BeautifulSoup(raw.decode("utf-8", "replace"), "html.parser")
            for item in soup.select(".result-document__item"):
                anchor = item.select_one('a[href*="Template=document"][href*="Id="]')
                date_node = item.select_one(".ans-title__date")
                if not anchor:
                    continue
                if "本文" not in compact(anchor.get_text(" ", strip=True)):
                    continue
                text = compact(item.get_text(" ", strip=True))
                iso_date = parse_iso_date(compact(date_node.get_text(" ", strip=True)) if date_node else text)
                if not iso_date:
                    continue
                documents.append({
                    "sourceType": "formal", "committee": committee, "cabinet": cabinet,
                    "dateIso": iso_date, "url": absolute_url(anchor.get("href", "")),
                    "listUrl": url, "title": compact(anchor.get_text(" ", strip=True)),
                })
    return documents


def committee_from_pdf(url: str, label: str) -> str:
    filename = urllib.parse.urlparse(url).path.rsplit("/", 1)[-1]
    match = re.search(r"2026\.\d{2}\.\d{2}([a-z]+)\.pdf", filename, re.I)
    if match and match.group(1).lower() in PDF_CODES:
        return PDF_CODES[match.group(1).lower()]
    for committee in CABINETS.values():
        if committee.replace("Ｓ", "S")[:8] in label.replace("Ｓ", "S"):
            return committee
    return ""


def discover_drafts(refresh: bool) -> list[dict]:
    soup = BeautifulSoup(fetch(DRAFT_INDEX, refresh=refresh).decode("utf-8", "replace"), "html.parser")
    documents: list[dict] = []
    heading = next((h for h in soup.find_all(["h2", "h3"]) if compact(h.get_text()) == "委員会"), None)
    if not heading:
        return documents
    for node in heading.find_all_next():
        if node is not heading and node.name in ("h2", "h3"):
            break
        if node.name != "a" or not node.get("href") or ".pdf" not in node.get("href", "").lower():
            continue
        url = absolute_url(node.get("href", ""), DRAFT_INDEX)
        label = compact(node.get_text(" ", strip=True))
        iso_date = parse_iso_date(label + " " + url)
        committee = committee_from_pdf(url, label)
        if iso_date and committee:
            documents.append({
                "sourceType": "draft", "committee": committee, "dateIso": iso_date,
                "url": url, "listUrl": DRAFT_INDEX, "title": label,
            })
    return documents


def parse_html_voices(raw: bytes) -> tuple[list[dict], str]:
    soup = BeautifulSoup(raw.decode("utf-8", "replace"), "html.parser")
    speakers = {}
    for item in soup.select(".voicelist__item[data-voice_code]"):
        name = item.select_one(".speaker__name")
        if name:
            speakers[item.get("data-voice_code", "")] = normalize_name(name.get_text(" ", strip=True))
    voices = []
    for node in soup.select(".voice-text[data-voice_code], .voice_text[data-voice_code]"):
        text = compact(node.get_text(" ", strip=True))
        if text:
            code = node.get("data-voice_code", "")
            # 画面上の連番と発言者ラベルは別に保持されているが、本文にも重複して入る。
            text = re.sub(r"^\d+:\s*[○◯]\s*\S+\s*", "", text)
            voices.append({"speaker": speakers.get(code, ""), "text": text})
    full_text = compact(soup.get_text(" ", strip=True))
    time_marks = re.findall(
        r"[○◯]?\s*(午[前後]\s*[０-９\d]{1,2}時[０-９\d]{1,2}分)\s*(開会|閉会)",
        full_text,
    )
    opened = next((compact(value) for value, kind in time_marks if kind == "開会"), "")
    closed = next((compact(value) for value, kind in reversed(time_marks) if kind == "閉会"), "")
    meeting_time = f"{opened}～{closed}" if opened and closed else opened or closed
    return voices, meeting_time


def pdf_page_count(path: Path) -> int:
    result = subprocess.run([str(PDFINFO), str(path)], capture_output=True, text=True, check=True)
    match = re.search(r"^Pages:\s+(\d+)", result.stdout, re.M)
    return int(match.group(1)) if match else 0


def pdf_text(path: Path) -> str:
    result = subprocess.run([str(PDFTOTEXT), "-layout", str(path), "-"], capture_output=True, check=True)
    return result.stdout.decode("utf-8", "replace")


def parse_pdf_voices(raw: bytes, url: str) -> tuple[list[dict], str, int]:
    path = cache_path(url, ".pdf")
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(raw)
    text = pdf_text(path)
    pages = pdf_page_count(path)
    time_match = re.search(r"(午[前後]\s*\d{1,2}時\d{1,2}分\s*[～〜-]\s*午[前後]\s*\d{1,2}時\d{1,2}分)", text)
    voices: list[dict] = []
    current: dict | None = None
    for raw_line in text.replace("\f", "\n").splitlines():
        line = compact(re.sub(r"[－―-]\s*\d+\s*[－―-]$", "", raw_line))
        if not line or re.match(r"^令\s*和\s*８\s*年", raw_line):
            continue
        match = re.match(r"^[○◯]\s*(.{1,32})$", line)
        if match:
            speaker = normalize_name(match.group(1))
            if re.match(r"^(午[前後]|開会|閉会|休憩|再開)", speaker):
                current = None
                continue
            current = {"speaker": speaker, "text": ""}
            voices.append(current)
            continue
        inline = re.match(r"^[○◯]\s*([^ 　]{2,32})[ 　]+(.+)$", raw_line.strip())
        if inline:
            speaker = normalize_name(inline.group(1))
            current = {"speaker": speaker, "text": compact(inline.group(2))}
            voices.append(current)
            continue
        if current:
            current["text"] = compact(current["text"] + " " + line)
    return [v for v in voices if v["text"]], compact(time_match.group(1)) if time_match else "", pages


def is_member(speaker: str) -> bool:
    value = normalize_name(speaker)
    # 副委員長は、理事者側ではなく質問・意見を述べる議員側として扱う。
    return value.endswith("委員") or value.endswith("副委員長")


def is_chair(speaker: str) -> bool:
    value = normalize_name(speaker)
    # 委員長は議事進行を挟むため特別扱いする。一方、議会運営委員会では
    # 議長が研修時間などを実質的に回答するため、通常の答弁者として扱う。
    return value.endswith("委員長") and not value.endswith("副委員長")


def chair_has_substantive_question(text: str) -> bool:
    """委員長自身が委員として行った質疑を、議事進行と区別する。"""
    if chair_asks_for_answer(text) or chair_closes_exchange(text):
        return False
    if any(term in text for term in ("議題に供します", "説明を聴取", "ご発言願います", "お諮りいたします")):
        return False
    # 「ほかにいかがでしょうか」「ご確認をお願いします」などの進行発言は
    # QUESTION_CUES に一致しやすい。委員長本人の発言であることが明示された
    # 場合だけを拾い、質問者・答弁者の誤結合を避ける。
    personal_turn = re.search(
        r"(?:私から|私のほうから|私も|私として|委員長として|委員長において).{0,80}"
        r"(?:質問|伺|確認|意見|要望|提案)",
        text,
    )
    return bool(personal_turn) and is_substantive(text)


def is_substantive(text: str) -> bool:
    if len(text) < 24:
        return False
    greeting_terms = ("よろしくお願いいたします", "自己紹介", "お疲れさまでした", "ありがとうございました", "お世話になりました")
    policy_terms = ("質問", "伺", "確認", "要望", "提案", "求め", "いただきたい", "べき", "問題", "取り組")
    if any(term in text for term in greeting_terms) and not any(term in text for term in policy_terms):
        return False
    if any(term in text for term in QUESTION_CUES):
        return True
    return len(text) >= 90 and not all(term in text for term in ("賛成", "採決"))


def sentence_list(text: str) -> list[str]:
    cleaned = compact(text)
    # HTML/PDFの段組みにより次の議題本文まで同一発言へ結合された場合は、
    # 議題終了の定型句より後を要約へ混ぜない。
    cleaned = re.split(
        r"(?:─{6,}|ほかにご発言がない|以上で(?:本件|報告事項|所管事務調査)|"
        r"次の議題に移ります|\s[０-９\d]+\s+(?:所管事務調査|報告事項|議案審査))",
        cleaned,
        maxsplit=1,
    )[0]
    parts = re.split(r"(?<=[。！？])", cleaned)
    return [compact(p) for p in parts if compact(p) and not any(term in p for term in PROCEDURAL)]


def clean_spoken_style(value: str) -> str:
    """会議録の意味を変えず、要約に不要な話し言葉を整える。"""
    text = compact(value)
    text = re.sub(
        r"^(?:(?:ご)?説明(?:を)?ありがとうございます[。 ]*|ありがとうございます[。 ]*|"
        r"よろしくお願いいたします[。 ]*|(?:それでは|まず|あと|また)[、 ]*)+",
        "",
        text,
    )
    replacements = (
        ("しているというところでございます", "しています"),
        ("というところでございます", "です"),
        ("ということでございます", "です"),
        ("となってございます", "となっています"),
        ("してございます", "しています"),
        ("しているところでございます", "しています"),
        ("させていただいております", "しています"),
        ("させていただきます", "します"),
        ("させていただく", "する"),
        ("と思っております", "と考えています"),
        ("と考えてございます", "と考えています"),
        ("でございますが", "ですが"),
        ("でございます", "です"),
        ("ございますが", "ありますが"),
        ("ございます", "あります"),
    )
    for source, replacement in replacements:
        text = text.replace(source, replacement)
    text = re.sub(r"^私(?:も|から)?[^。]{0,50}?質問させてほしいと求めました[。 ]*", "", text)
    text = re.sub(r"^(?:最後に)?意見として[。 、]*", "", text)
    text = re.sub(r"^(?:まず)?状況をもう少しお聞きしたいと思うのですが[、 ]*", "", text)
    text = re.sub(r"^どうしても所用があって伺えなかったのですけれども[、 ]*", "", text)
    text = re.sub(r"(?<=[ぁ-んァ-ヶ一-龥々]) (?=[ぁ-んァ-ヶ一-龥々])", "", text)
    text = re.sub(r"^は、\s*", "", text)
    return compact(text)


def clip_at_clause(value: str, limit: int) -> str:
    text = compact(value)
    if len(text) <= limit:
        return text
    floor = max(50, int(limit * 0.58))
    positions = [match.end() for match in re.finditer(r"[。！？、]", text[:limit + 1])]
    cut = max((position for position in positions if position >= floor), default=limit)
    clipped = text[:cut].rstrip("、 ")
    return clipped[:limit - 1].rstrip("、 ") + "…"


def condense_sentence(value: str, cues: tuple[str, ...], limit: int, mode: str) -> str:
    """長い一文から、結論・数字・対応を示す節だけを残す。"""
    sentence = clean_spoken_style(value)
    if len(sentence) <= limit:
        return sentence
    clauses = [compact(part) for part in re.split(r"(?<=、)", sentence) if compact(part)]
    if len(clauses) <= 1:
        return clip_at_clause(sentence, limit)
    ranked = []
    for index, clause in enumerate(clauses):
        score = sum(2 for cue in cues if cue in clause)
        if re.search(r"\d|[０-９]", clause):
            score += 2
        if mode == "question" and re.search(r"(?:ですか|でしょうか|伺|尋ね|確認|求め|要望|提案|教えて|ほしい)", clause):
            score += 5
        if mode == "answer" and re.search(r"(?:実施|予定|検討|対応|方針|説明|回答|認識|見込|開始|継続|変更|設置|支援)", clause):
            score += 4
        if index == len(clauses) - 1:
            score += 3
        ranked.append((score, index, clause))

    selected_indexes = []
    total = 0
    for _, index, clause in sorted(ranked, reverse=True):
        if index in selected_indexes:
            continue
        if selected_indexes and total + len(clause) > limit:
            continue
        selected_indexes.append(index)
        total += len(clause)
        if len(selected_indexes) >= 3:
            break
    result = "".join(clauses[index] for index in sorted(selected_indexes))
    result = re.sub(r"^(?:それで|そこで|そのため|一方|また|あと|ということで)[、 ]*", "", result)
    result = compact(result or clauses[-1]).rstrip("、 ")
    if result and result[-1] not in "。！？…":
        result += "。"
    return clip_at_clause(result, limit)


def reported_question(value: str, kind: str) -> str:
    """質問文の語尾を、短い第三者要約として読みやすくする。"""
    text = compact(value)
    text = text.replace("いただければと思います", "ほしいと求めました")
    text = text.replace("いただきたいと思います", "ほしいと求めました")
    text = re.sub(r"(?:ので、)?よろしく(?:お願いいたします|お願いします)[。 ]*$", "", text)
    text = re.sub(r"(?:教えて|お聞かせ|説明して)(?:いただければと思います|いただきたいと思います|ください)[。 ]*$", "説明を求めました。", text)
    text = re.sub(r"(?:でしょうか|ですか)[。 ]*$", "か尋ねました。", text)
    text = re.sub(r"という認識でよろしいのか[。 ]*$", "との認識でよいか確認しました。", text)
    if kind in ("意見", "提案") and not re.search(r"(?:述べました|提案しました|求めました|尋ねました|確認しました)[。 ]*$", text):
        text = text.rstrip("。") + "との意見を述べました。"
    text = text.replace("ととの意見を述べました", "との意見を述べました")
    if text and text[-1] not in "。！？…":
        text += "。"
    return compact(text)


def concise_summary(text: str, cues: tuple[str, ...], limit: int, mode: str, kind: str = "") -> str:
    """重要文を選び、質問・答弁を短い読み言葉に整える。"""
    raw_sentences = sentence_list(text)
    sentences = []
    for sentence in raw_sentences:
        cleaned = clean_spoken_style(sentence)
        if not cleaned:
            continue
        if re.fullmatch(r"(?:はい|承知しました|ありがとうございます)[。！ ]*", cleaned):
            continue
        sentences.append(cleaned)
    if not sentences:
        return ""

    scored = []
    for index, sentence in enumerate(sentences):
        score = sum(2 for cue in cues if cue in sentence)
        if re.search(r"\d|[０-９]", sentence):
            score += 2
        if mode == "question" and re.search(r"(?:ですか|でしょうか|伺|尋ね|確認|求め|要望|提案|ほしい)", sentence):
            score += 4
        if mode == "answer" and re.search(r"(?:実施|予定|検討|対応|方針|説明|回答|認識|見込|開始|継続|変更|できない|難しい)", sentence):
            score += 4
        if index == len(sentences) - 1:
            score += 2
        scored.append((score, index, sentence))

    # 質問は結論に近い文、答弁は結論・数字・対応方針を優先する。
    wanted = 2
    chosen_indexes = sorted(index for _, index, _ in sorted(scored, reverse=True)[:wanted])
    sentence_limit = max(70, limit // max(1, len(chosen_indexes)))
    selected = [condense_sentence(sentences[index], cues, sentence_limit, mode) for index in chosen_indexes]
    result = "".join(selected)
    if not result:
        result = sentences[-1] if mode == "question" else sentences[0]
    result = clip_at_clause(result, limit)
    return clip_at_clause(reported_question(result, kind), limit) if mode == "question" else result


def normalize_agenda_title(value: str, fallback: str = "委員会での質疑") -> str:
    """議事進行の文言を除き、画面用の自然で短い題名にする。"""
    title = compact(value).replace("実 施", "実施").replace("委員 会", "委員会")
    if "予算特別委員会を開きます" in title:
        if "令和８年度品川区一般会計予算" in title:
            return "令和８年度品川区一般会計予算"
        return "予算特別委員会"
    if "調査事項概要" in title:
        return "調査事項概要"
    if "今後の委員会運営" in title:
        return "今後の委員会運営"
    if re.search(r"最後に[、 ]*[（(]?4[）)]?その他", title):
        return "その他"

    title = re.sub(r"^.*?(?=令和[０-９\d]+年(?:請願|陳情)第)", "", title)
    prefixes = (
        r"報告事項を聴取いたします[。 、]*",
        r"議案審査を行います[。 、]*",
        r"請願・陳情審査を行います[。 、]*",
        r"特定事件調査を行います[。 、]*",
        r"その他を行います[。 、]*",
        r"所管事務調査を行います[。 、]*",
        r"査を行います[。 、]*",
        r"少し配付物がございますので、少しお待ちください[。 、]*",
        r"(?:初めに|まず|次に|続いて|最後に|それでは)[、 ]*",
    )
    changed = True
    while changed:
        changed = False
        for prefix in prefixes:
            cleaned = re.sub("^" + prefix, "", title)
            if cleaned != title:
                title = cleaned
                changed = True
    title = re.sub(r"^[（(]?\s*[０-９\d]+\s*[）)]\s*", "", title)
    title = re.sub(r"^[⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽]\s*", "", title)
    title = re.sub(r"^予定(?:表)?[０-９\d、 ]*[。 、]*", "", title)
    title = re.sub(r"(?:を議題に供します|についてを議題に供します)[。 ]*$", "", title)
    title = compact(title).strip("、。 「」『』")

    if title.startswith("請願・陳情審査および"):
        title = "請願・陳情審査および報告事項"
    if title.startswith("その他、") and "所管質問" in title:
        title = "所管質問"
    if "の順番を入れ替え" in title and "第４０号議案" in title:
        title = "第４０号議案、電線共同溝等工事（競馬場通り）委託契約の変更"
    title = re.sub(r"^報告事項[、 ]*", "", title)
    if "第一回臨時総会定足数規約違反" in title:
        title = "再開発準備組合の運営等に関する陳情"
    if title.startswith("法律の施行に伴う関係条例の整備"):
        title = "関係条例の整備等（3議案）"
    if title.startswith("特別養護老人ホーム条例の一部を改正"):
        title = "福祉施設関係条例の改正等（4議案）"
    if title.startswith("品川区立障害児者総合支援施設条例"):
        title = "障害福祉関係条例の改正等（3議案）"
    if title.startswith("第１９号議案") and "第２１号議案" in title:
        title = "第１９号・第２１号議案（児童センター・保育所条例）"
    if title.startswith("第２２号議案") and "第２３号議案" in title:
        title = "第２２号・第２３号議案（乳児等通園支援事業）"
    if title.startswith("特定事件調査") and "まとめ" in title:
        title = "特定事件調査のまとめ"
    petition_short_titles = {
        "令和７年陳情第５８号": "令和７年陳情第５８号（品川浦南地区再開発）",
        "令和８年陳情第１２号": "令和８年陳情第１２号（監査実施判断と弁護士相談費用）",
        "令和８年陳情第１３号": "令和８年陳情第１３号（品川浦周辺地区まちづくりガイドライン）",
    }
    for prefix, short_title in petition_short_titles.items():
        if title.startswith(prefix):
            title = short_title
            break
    if title.count("」") > title.count("「"):
        title = "「" + title
    if title.count("「") > title.count("」"):
        title += "」"
    if not title or len(title) < 2:
        title = fallback
    return clip_at_clause(title, 80)


GENERIC_TOPIC_TITLES = {
    "その他", "委員会での質疑", "所管事務調査", "所管質問", "予算特別委員会",
    "事務事業概要", "特定事件調査", "特定事件調査のまとめ",
}


def exchange_display_title(question: str, topic_title: str, previous: str = "") -> str:
    """大項目が抽象的な場合だけ、質疑内容から短い小見出しを付ける。"""
    if topic_title not in GENERIC_TOPIC_TITLES:
        return ""
    text = compact(question)
    rules = (
        (r"一般質問.*原稿|原稿.*差し替え", "一般質問原稿の差し替え"),
        (r"議員研修|研修会|亀井会長", "議員研修会の内容と所要時間"),
        (r"大井町トラックス|高輪ゲートウェイ|品川圏", "議員研修会の内容"),
        (r"議員バッジ.*(?:価格|費用|金製|レプリカ)", "議員バッジの価格"),
        (r"議員バッジ.*(?:改選|紛失|購入|対象)", "議員バッジの見直し対象"),
        (r"議員バッジ", "議員バッジの仕様見直し"),
        (r"しながわ電気・ガス料金緊急支援事業|電気・ガス料金", "電気・ガス料金緊急支援事業"),
        (r"町会・自治会|町会長|地域連絡調整員", "町会・自治会支援"),
    )
    for pattern, title in rules:
        if re.search(pattern, text):
            return title

    referential = re.match(r"^(?:内容|その点|その辺|その中|今の話|現状|もう一点|分かりました|そういった|できれば)", text)
    if referential and previous:
        return previous
    return ""


def classify_kind(text: str) -> str:
    if "提案" in text:
        return "提案"
    if "要望" in text or "求め" in text or "いただきたい" in text:
        return "質問・要望"
    if "確認" in text:
        return "確認"
    if any(cue in text for cue in ("伺", "質問", "お聞き", "教えて", "ですか", "でしょうか")):
        return "質問"
    if "お願いします" in text and any(cue in text for cue in ("答弁", "評価", "見解", "説明", "内訳", "理由")):
        return "質問"
    return "意見"


def agenda_from_chair(text: str, fallback: str) -> str:
    patterns = (
        r"予定表(?:第)?[０-９\d]+(?:の)?(.{2,100}?)(?:を議題に供します|について)",
        r"(.{2,100}?)についてを議題に供します",
        r"(.{2,100}?)を議題に供します",
    )
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            value = compact(match.group(1)).strip("、。 「」『』")
            value = re.sub(r"^(?:初めに|次に|続いて|それでは)[、 ]*", "", value)
            if 2 <= len(value) <= 100:
                return value
    return fallback


def chair_asks_for_answer(text: str) -> bool:
    return any(term in text for term in ("答弁願います", "お答え願います", "理事者より", "説明願います"))


def chair_is_response(text: str) -> bool:
    if any(term in text for term in ("そのとおり", "検討させて", "正副で", "対応します", "考えています", "方向で進め")):
        return True
    return (
        len(text) >= 40
        and any(term in text for term in ANSWER_CUES)
        and not any(term in text for term in QUESTION_CUES)
        and not any(term in text for term in PROCEDURAL)
    )


def chair_closes_exchange(text: str) -> bool:
    return any(term in text for term in (
        "以上で本件", "ほかにございます", "ほかにありません", "次に、予定表", "次の予定",
        "ほかにご発言がない", "以上で報告事項", "その他を議題", "説明が終わりました",
        "理事者の皆様、どうぞよろしく",
    ))


def make_topics(voices: list[dict], session_id: str) -> list[dict]:
    agenda = "委員会での質疑"
    exchanges: list[dict] = []
    for index, voice in enumerate(voices):
        speaker = normalize_name(voice.get("speaker", ""))
        text = compact(voice.get("text", ""))
        if is_chair(speaker):
            agenda = agenda_from_chair(text, agenda)
            if not chair_has_substantive_question(text):
                continue
        elif not is_member(speaker) or not is_substantive(text):
            continue
        answer_voices = []
        for following in voices[index + 1:]:
            next_speaker = normalize_name(following.get("speaker", ""))
            if is_member(next_speaker):
                break
            following_text = compact(following.get("text", ""))
            if not following_text:
                continue
            if is_chair(next_speaker):
                if chair_asks_for_answer(following_text):
                    continue
                if chair_has_substantive_question(following_text):
                    break
                if chair_closes_exchange(following_text):
                    break
                if chair_is_response(following_text):
                    answer_voices.append(following)
                    continue
                break
                continue
            answer_voices.append(following)
        respondents = []
        answer_parts = []
        per_answer_limit = max(70, min(130, 220 // max(1, len(answer_voices))))
        for answer_voice in answer_voices:
            respondent = normalize_name(answer_voice.get("speaker", ""))
            if respondent and respondent not in respondents:
                respondents.append(respondent)
            summary = concise_summary(
                answer_voice.get("text", ""), ANSWER_CUES, per_answer_limit, "answer"
            )
            if summary:
                answer_parts.append(summary)
        kind = classify_kind(text)
        question = concise_summary(text, QUESTION_CUES, 140, "question", kind)
        answer = clip_at_clause(" ".join(answer_parts), 240)
        if not answer:
            answer = "この発言に対する個別の答弁・回答は、会議録に記録されていません。"
        exchanges.append({
            "agenda": agenda,
            "speaker": speaker,
            "kind": kind,
            "question": question,
            "respondent": "、".join(respondents),
            "answer": answer,
        })

    grouped: OrderedDict[str, list[dict]] = OrderedDict()
    for item in exchanges:
        title = normalize_agenda_title(item.pop("agenda"))
        grouped.setdefault(title, []).append(item)
    topics = []
    sequence = 0
    for topic_index, (title, items) in enumerate(grouped.items(), start=1):
        previous_display_title = ""
        for item in items:
            sequence += 1
            item["id"] = f"exchange-{sequence:03d}"
            display_title = exchange_display_title(item["question"], title, previous_display_title)
            if display_title:
                item["title"] = display_title
                previous_display_title = display_title
        topics.append({
            "id": f"topic-{topic_index:02d}", "title": title, "agenda": title,
            "exchanges": items,
        })
    return topics


def process_document(document: dict, refresh: bool) -> dict:
    iso_date = document["dateIso"]
    committee = document["committee"]
    source_type = document["sourceType"]
    suffix = ".pdf" if source_type == "draft" else ".html"
    raw = fetch(document["url"], suffix=suffix, refresh=refresh)
    if source_type == "draft":
        voices, meeting_time, pages = parse_pdf_voices(raw, document["url"])
    else:
        voices, meeting_time = parse_html_voices(raw)
        pages = 0
    cabinet = document.get("cabinet") or next((key for key, name in CABINETS.items() if name == committee), 0)
    session_id = f"r08-{iso_date.replace('-', '')}-{cabinet or 'committee'}"
    topics = make_topics(voices, session_id)
    exchange_count = sum(len(topic["exchanges"]) for topic in topics)
    status = "正式会議録" if source_type == "formal" else "校正原稿・正式会議録ではない"
    return {
        "id": session_id,
        "meetingId": meeting_id_for(iso_date, committee),
        "date": f"2026年{int(iso_date[5:7])}月{int(iso_date[8:10])}日",
        "dateIso": iso_date,
        "committee": committee,
        "time": meeting_time,
        "status": status,
        "sourceType": source_type,
        "overview": f"{committee}の会議録から、実質的な質問・確認・意見・要望と答弁・対応を{exchange_count}件整理しています。",
        "topics": topics,
        "links": [
            {"type": "minutes" if source_type == "formal" else "minutesDraft",
             "label": "公式の会議録を読む" if source_type == "formal" else "公式の校正原稿PDFを読む",
             "url": document["url"]},
            {"type": "official", "label": "公式の会議録一覧", "url": document["listUrl"]},
        ],
        "sourceMeta": {"pages": pages, "characters": sum(len(v["text"]) for v in voices), "voices": len(voices)},
    }


def js_payload(pending: list[dict], part_files: list[str]) -> str:
    pending_json = json.dumps(pending, ensure_ascii=False, separators=(",", ":"))
    parts_json = json.dumps(part_files, ensure_ascii=False, separators=(",", ":"))
    return f'''/* 令和8年の全委員会 質問・答弁要約データ。scripts/prepare_r08_committees.py で生成。 */
(() => {{
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r08;
  if (!year) throw new Error("令和8年データの読み込み後に r08-committees.js を読み込んでください");
  year.updatedAt = "{date.today().isoformat()}";
  year.committeeSessions = [];
  year.committeePending = {pending_json};
  year.committeeDataParts = {parts_json};
}})();
'''


def write_js_files(sessions: list[dict], pending: list[dict], max_bytes: int = 440_000) -> list[str]:
    """GitHub Pagesでキャッシュ・更新しやすい大きさにデータを分割する。"""
    chunks: list[list[dict]] = []
    current: list[dict] = []
    current_size = 0
    for session in sessions:
        encoded_size = len(json.dumps(session, ensure_ascii=False, separators=(",", ":")).encode("utf-8"))
        if current and current_size + encoded_size > max_bytes:
            chunks.append(current)
            current = []
            current_size = 0
        current.append(session)
        current_size += encoded_size
    if current:
        chunks.append(current)

    for old_part in DATA_PATH.parent.glob(DATA_PART_PATTERN):
        old_part.unlink()
    part_files = []
    for index, chunk in enumerate(chunks, start=1):
        filename = f"r08-committees-part-{index:02d}.js"
        part_files.append(filename)
        payload = json.dumps(chunk, ensure_ascii=False, separators=(",", ":"))
        (DATA_PATH.parent / filename).write_text(
            "/* 令和8年委員会データ（自動生成・分割ファイル） */\n"
            "window.SHINAGAWA_DB.years.r08.committeeSessions.push(..." + payload + ");\n",
            encoding="utf-8",
        )
    DATA_PATH.write_text(js_payload(pending, part_files), encoding="utf-8")
    return part_files


def ledger_markdown(sessions: list[dict], pending: list[dict]) -> str:
    lines = [
        "# 令和8年 委員会会議録・実装台帳", "",
        f"更新日: {date.today().isoformat()}", "",
        "この台帳は `scripts/prepare_r08_committees.py` で再生成できます。校正原稿は正式会議録ではありません。", "",
        "## 実装済み", "",
        "| 開催日 | 委員会 | 出典 | 分量 | 質疑件数 | 状態 | 公式URL |", "|---|---|---|---:|---:|---|---|",
    ]
    for session in sessions:
        count = sum(len(topic["exchanges"]) for topic in session["topics"])
        meta = session["sourceMeta"]
        amount = f"{meta['pages']}ページ" if meta["pages"] else f"{meta['characters']:,}文字"
        url = session["links"][0]["url"]
        lines.append(f"| {session['dateIso']} | {session['committee']} | {session['status']} | {amount} | {count} | 実装・自動検証済み | [公式]({url}) |")
    lines.extend(["", "## 会議録公開待ち・開催予定", "", "| 開催日 | 委員会 | 状態 | 公式URL |", "|---|---|---|---|"])
    for item in pending:
        lines.append(f"| {item['dateIso']} | {item['committee']} | {item['status']} | [公式カレンダー]({item['officialUrl']}) |")
    total = sum(len(topic["exchanges"]) for session in sessions for topic in session["topics"])
    source_counts = Counter(session["status"] for session in sessions)
    committee_counts = Counter()
    month_counts = Counter()
    for session in sessions:
        count = sum(len(topic["exchanges"]) for topic in session["topics"])
        committee_counts[session["committee"]] += count
        month_counts[session["dateIso"][:7]] += count
    lines.extend([
        "", "## 集計", "", f"- 実装済み会議: {len(sessions)}件", f"- 質疑・答弁: {total}件",
        f"- 正式会議録: {source_counts['正式会議録']}会議",
        f"- 校正原稿: {source_counts['校正原稿・正式会議録ではない']}会議",
        f"- 公開待ち・開催予定: {len(pending)}件", "",
        "### 委員会別", "", "| 委員会 | 質疑件数 |", "|---|---:|",
    ])
    for committee, count in sorted(committee_counts.items()):
        lines.append(f"| {committee} | {count} |")
    lines.extend(["", "### 月別", "", "| 月 | 質疑件数 |", "|---|---:|"])
    for month, count in sorted(month_counts.items()):
        lines.append(f"| {month} | {count} |")
    lines.extend(["", "## 自動検証", "", "- 会議ID・質疑IDの重複なし", "- 発言者・質問要約・答弁要約・公式URLの必須値を検査", "- 校正原稿と正式会議録の状態をデータ上で分離", "- 正式会議録が公開された会議は同日の校正原稿より優先", ""])
    return "\n".join(lines)


def validate(sessions: list[dict]) -> None:
    ids = set()
    for session in sessions:
        assert session["id"] not in ids, f"duplicate session id: {session['id']}"
        ids.add(session["id"])
        assert session["dateIso"].startswith("2026-")
        assert session["status"] in ("正式会議録", "校正原稿・正式会議録ではない")
        assert session["links"] and session["links"][0]["url"].startswith("https://")
        exchange_ids = set()
        # 質疑が行われず、説明・確認だけで終了する短い議会運営委員会もある。
        # その会議自体を台帳から落とさないため、0件を正当な状態として扱う。
        for topic in session["topics"]:
            assert topic["exchanges"]
            assert 2 <= len(topic["title"]) <= 81
            assert not any(term in topic["title"] for term in (
                "報告事項を聴取いたします", "議案審査を行います", "請願・陳情審査を行います",
            ))
            for item in topic["exchanges"]:
                assert item["id"] not in exchange_ids, f"duplicate exchange id: {session['id']} {item['id']}"
                exchange_ids.add(item["id"])
                assert item["speaker"] and item["question"] and item["answer"]
                assert not item.get("title") or len(item["title"]) <= 44
                assert not re.match(r"^[0-9０-９]+[:：]", item["question"])
                assert len(item["question"]) <= 141, (
                    session["id"], topic["title"], item["id"], len(item["question"]), item["question"]
                )
                assert len(item["answer"]) <= 241, (
                    session["id"], topic["title"], item["id"], len(item["answer"]), item["answer"]
                )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--inventory-only", action="store_true")
    args = parser.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    formal = discover_formal(args.refresh)
    drafts = discover_drafts(args.refresh)
    documents = sorted(formal + drafts, key=lambda item: (item["dateIso"], item["committee"]))
    # 正式版と校正原稿が同じ会議に存在した場合は正式版を優先する。
    deduped = OrderedDict()
    for document in documents:
        key = (document["dateIso"], document["committee"])
        if key not in deduped or document["sourceType"] == "formal":
            deduped[key] = document
    documents = list(deduped.values())
    (OUT / "discovered.json").write_text(json.dumps(documents, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.inventory_only:
        print(f"発見: 正式{len(formal)} 校正原稿{len(drafts)} 重複除外後{len(documents)}")
        return
    sessions = []
    for index, document in enumerate(documents, start=1):
        print(f"[{index}/{len(documents)}] {document['dateIso']} {document['committee']}")
        sessions.append(process_document(document, args.refresh))
    validate(sessions)
    implemented = {(item["dateIso"], item["committee"]) for item in sessions}
    pending = [
        {"id": f"pending-{iso.replace('-', '')}-{index:02d}", "dateIso": iso,
         "date": f"2026年{int(iso[5:7])}月{int(iso[8:10])}日", "committee": committee,
         "meetingId": meeting_id, "status": status, "officialUrl": CALENDAR_URL}
        for index, (iso, committee, meeting_id, status) in enumerate(KNOWN_PENDING, start=1)
        if (iso, committee) not in implemented
    ]
    part_files = write_js_files(sessions, pending)
    LEDGER_PATH.write_text(ledger_markdown(sessions, pending), encoding="utf-8")
    (OUT / "sessions.json").write_text(json.dumps(sessions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    exchanges = sum(len(topic["exchanges"]) for session in sessions for topic in session["topics"])
    print(f"生成完了: {len(sessions)}会議・{exchanges}件 / 公開待ち等{len(pending)}件 / データ{len(part_files)}分割")


if __name__ == "__main__":
    main()
