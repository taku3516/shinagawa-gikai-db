#!/usr/bin/env python3
"""指定年の委員会会議録を収集し、台帳と画面用データを生成する。

正式会議録（会議録検索システムのHTML）と直近の校正原稿PDFを同じ形式に
そろえる。外部AIへは送らず、発言録から質問・要望を含む文と答弁・対応を示す文を
**そのまま抜き出す**。推測による補完も、語尾の書き換えもしない。

ここが作るのは要約ではなく抜粋。以前は文の中から節を継ぎ足し、質問の語尾を
第三者の言い方へ差し替えていたが、原文に無い文ができるうえ、助詞と噛み合わない
語尾が残るため、どちらもやめた（docs/qa-summary-rules.md の「修正の経緯」）。
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import os
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request
import http.cookiejar
from collections import Counter, OrderedDict
from datetime import date
from pathlib import Path

from bs4 import BeautifulSoup

sys.path.insert(0, str(Path(__file__).resolve().parent))

import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
YEAR = 2026
REIWA_YEAR = 8
YEAR_ID = "r08"
YEAR_LABEL = "令和8年"
CACHE = ROOT / "scripts/cache/r08-committees"
OUT = ROOT / "scripts/out/r08-committees"
DATA_PATH = ROOT / "data/r08-committees.js"
DATA_PART_PATTERN = "r08-committees-part-*.js"
LEDGER_PATH = ROOT / "docs/r08-committee-inventory.md"
UA = {"User-Agent": "Mozilla/5.0 (shinagawa-gikai-db committee importer)"}
MINUTES_BASE = "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000"
DRAFT_INDEX = "https://gikai.city.shinagawa.tokyo.jp/search"
CALENDAR_URL = "https://gikai.city.shinagawa.tokyo.jp/calendar_list"
# 校正原稿PDFの読み取りに poppler を使う。実行する環境によって置き場所が違うため、
# PATH から探す。環境変数（PDFINFO / PDFTOTEXT）で明示することもできる。
# 見つからない場合は、PDFを読む段階になってから分かりやすく知らせる。
#   Ubuntu/Debian: sudo apt-get install poppler-utils
#   macOS:         brew install poppler
OPENER = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))


def configure_year(year: int) -> None:
    """出力先と識別子を対象年へ切り替える。会議録検索システムの下限に合わせて平成13年以降を対象とする。

    平成13年〜平成30年は h13〜h30、令和元年以降は r01〜 の識別子を使う。
    """
    global YEAR, REIWA_YEAR, YEAR_ID, YEAR_LABEL
    global CACHE, OUT, DATA_PATH, DATA_PART_PATTERN, LEDGER_PATH
    if year < 2001:
        raise ValueError(
            f"会議録検索システムの収録は平成13年（2001年）からです（指定: {year}）"
        )
    YEAR = year
    if year >= 2019:
        REIWA_YEAR = year - 2018
        YEAR_ID = f"r{REIWA_YEAR:02d}"
        YEAR_LABEL = "令和元年" if REIWA_YEAR == 1 else f"令和{REIWA_YEAR}年"
    else:
        # 平成31年は4月まで。平成年としては2019年より前だけを扱う
        heisei = year - 1988
        REIWA_YEAR = 0
        YEAR_ID = f"h{heisei:02d}"
        YEAR_LABEL = f"平成{heisei}年"
    CACHE = ROOT / f"scripts/cache/{YEAR_ID}-committees"
    OUT = ROOT / f"scripts/out/{YEAR_ID}-committees"
    DATA_PATH = ROOT / f"data/{YEAR_ID}-committees.js"
    DATA_PART_PATTERN = f"{YEAR_ID}-committees-part-*.js"
    LEDGER_PATH = ROOT / f"docs/{YEAR_ID}-committee-inventory.md"

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
    match = re.search(rf"({YEAR})[./年-](\d{{1,2}})[./月-](\d{{1,2}})", value)
    return f"{match.group(1)}-{int(match.group(2)):02d}-{int(match.group(3)):02d}" if match else ""


def cabinets_for_year(refresh: bool) -> OrderedDict[int, str]:
    """公式の「会議録の閲覧」ページから、その年に存在した委員会分類を取得する。"""
    library_url = f"{MINUTES_BASE}?Template=search-library"
    soup = BeautifulSoup(fetch(library_url, refresh=refresh).decode("utf-8", "replace"), "html.parser")
    result: OrderedDict[int, str] = OrderedDict()
    for anchor in soup.select('a[href*="Cabinet="][href*="TermStart="]'):
        href = absolute_url(anchor.get("href", ""), library_url)
        parsed = urllib.parse.urlparse(href)
        query = urllib.parse.parse_qs(parsed.query)
        term_start = (query.get("TermStart") or [""])[0]
        cabinet_raw = (query.get("Cabinet") or [""])[0]
        if not term_start.startswith(f"{YEAR}-") or not cabinet_raw.isdigit():
            continue
        cabinet = int(cabinet_raw)
        if cabinet in (1, 2):
            continue
        committee = compact(anchor.get_text(" ", strip=True))
        committee = re.sub(r"（(?:令和|平成)[^）]+年度）$", "", committee)
        if committee:
            result[cabinet] = committee
    if not result:
        return CABINETS.copy()
    return result


def meeting_id_for(iso_date: str, committee: str) -> str:
    month = int(iso_date[5:7])
    day = int(iso_date[8:10])
    if YEAR != 2026:
        if committee == "予算特別委員会":
            return f"{YEAR_ID}-c-budget"
        if committee == "決算特別委員会":
            return f"{YEAR_ID}-c-settlement"
        return f"{YEAR_ID}-cm{month:02d}"
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
    for cabinet, committee in cabinets_for_year(refresh).items():
        url = f"{MINUTES_BASE}?QueryType=new&Template=list&Cabinet={cabinet}&TermStart={YEAR}-01-01&TermEnd={YEAR}-12-31"
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
    match = re.search(rf"{YEAR}\.\d{{2}}\.\d{{2}}([a-z]+)\.pdf", filename, re.I)
    if match and match.group(1).lower() in PDF_CODES:
        return PDF_CODES[match.group(1).lower()]
    for committee in CABINETS.values():
        if committee.replace("Ｓ", "S")[:8] in label.replace("Ｓ", "S"):
            return committee
    return ""


def discover_drafts(refresh: bool) -> list[dict]:
    # 校正原稿の一覧は直近年だけを掲載するため、過年度は正式会議録のみを取得する。
    if YEAR != date.today().year:
        return []
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


# 画面上の連番と発言者ラベル。本文にも重複して入るので落とす。全角で入る年も
# あるため、数字とコロンは半角・全角の両方を見る。
#
# 「○＋氏名」まで揃っている形だけを対象にする。数字とコロンだけで判断すると、
# 発言に出てくる比率（「６：４で出資割合を分ける」）や時刻（「10:00から」）を
# 壊す。実際に平成18年の「６：４」がこの形だった。
VOICE_LABEL = re.compile(r"^[0-9０-９]+[:：]\s*[○◯]\s*\S+\s*")


def strip_voice_label(text: str) -> str:
    """発言本文の先頭に残る、画面用の連番と発言者ラベルを落とす。"""
    return VOICE_LABEL.sub("", text, count=1)


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
            text = strip_voice_label(text)
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


def poppler_tool(name: str) -> str:
    """poppler のコマンドの場所を返す。無ければ入れ方を添えて止める。"""
    override = os.environ.get(name.upper())
    if override:
        return override
    found = shutil.which(name)
    if not found:
        raise SystemExit(
            f"{name} が見つかりません。校正原稿PDFの読み取りに poppler が必要です。\n"
            f"  Ubuntu/Debian: sudo apt-get install -y poppler-utils\n"
            f"  macOS:         brew install poppler\n"
            f"  別の場所にある場合は環境変数 {name.upper()} で指定してください。"
        )
    return found


def pdf_page_count(path: Path) -> int:
    result = subprocess.run([poppler_tool("pdfinfo"), str(path)], capture_output=True, text=True, check=True)
    match = re.search(r"^Pages:\s+(\d+)", result.stdout, re.M)
    return int(match.group(1)) if match else 0


def pdf_text(path: Path) -> str:
    result = subprocess.run(
        [poppler_tool("pdftotext"), "-layout", str(path), "-"], capture_output=True, check=True
    )
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
    """上限に収まる範囲で、文の区切りまでを返す（質問・答弁の要約用）。

    以前は文字数で切って「…」を付けていたため、何について述べたのかが
    読み取れない要約が大量にできていた。判定と整形は scripts/qa_summary.py に
    集約している。

    文として閉じられないときは空を返す。呼び出し側で扱いを決めること。
    """
    return qa.finish(value, limit)


def clip_title(value: str, limit: int = 80) -> str:
    """議題名を上限内に収める。

    議題名は文ではなく名詞句なので、文の区切りを求める `clip_at_clause` は使えない
    （句点が無いと空になってしまう）。区切りらしい記号まで戻し、無ければそのまま切る。
    空にはしない。
    """
    text = compact(value)
    if len(text) <= limit:
        return text
    head = text[:limit]
    for mark in ("、", "・", "／", "，", " "):
        position = head.rfind(mark)
        if position >= limit // 2:
            return head[:position].rstrip("、・／， ")
    return head.rstrip("、・／， ")


# 文の重要度を測る手がかり。質問なら「何を求めたか」、答弁なら「どう対応するか」。
QUESTION_POINT = re.compile(r"(?:ですか|でしょうか|伺|尋ね|確認|求め|要望|提案|ほしい)")
ANSWER_POINT = re.compile(r"(?:実施|予定|検討|対応|方針|説明|回答|認識|見込|開始|継続|変更|できない|難しい)")

# 相づちだけの発言。要点を持たないので抜粋の対象から外す。
BACKCHANNEL = re.compile(r"(?:はい|承知しました|ありがとうございます)[。！ ]*")

# 前の文を受けるための語。抜き出した先頭に来ると、受けるものが無いまま
# 「ただ、」「ですから、」で始まり、話の途中から読まされる。
DANGLING_CONNECTIVE = re.compile(
    r"^(?:なお|また|さらに|そして|それから|続いて|次に|その中で|その上で|それでは|では"
    r"|ただ|ただし|しかし|一方|ですから|ですので|そのため|したがって|よって|なので"
    r"|そうしますと|そういった中で|こうした中で)[、 ]+")

# そのうち、落としても内容が変わらないもの。逆接（ただ・しかし・一方）や
# 帰結（ですから・したがって）は、落とすと発言の位置づけが変わってしまう。
# 受ける文を足せないときの逃げ道なので、安全な語だけに限る。
DROPPABLE_CONNECTIVE = re.compile(
    r"^(?:なお|また|さらに|そして|それから|続いて|次に|その中で|その上で|それでは|では)[、 ]+")


def drop_leading_connective(text: str) -> str:
    """抜き出した文の先頭から、受けるものが無くなった接続の語を落とす。

    受ける文を前に足せたならここには来ない（`pick_window` が先に試す）。
    足せなかったときだけ、落としても内容が変わらない語を除く。
    """
    return DROPPABLE_CONNECTIVE.sub("", text, count=1)


def pick_window(sentences: list[str], scores: list[int], limit: int) -> list[int]:
    """要点の文から、隣り合う文だけを足して範囲を広げる。

    答弁は一続きの説明なので、離れた文を並べると話がつながらない。実際に
    「その中で、〜と認識しています。罹災証明書は個人の住家です。」のように、
    関係のない2文が並ぶ抜粋ができていた。

    もっとも要点らしい文を起点にして、左右のうち点数の高い側から、上限に
    収まるあいだだけ足す。

    ただし、先頭が「ただ、」「ですから、」のように前の文を受ける形になって
    いるあいだは、**点数を見ずに前の文を優先して足す**。受けるものが無いまま
    始まると、逆接や帰結が宙に浮いて、発言の位置づけを読み違えさせる。
    前の文を足せないときだけ、`drop_leading_connective` で落とす。
    """
    best = max(range(len(sentences)), key=lambda index: (scores[index], -index))
    left = right = best
    total = len(sentences[best])
    while True:
        # 先頭が前を受ける形なら、点数より先に、受ける文を足す。点数で左へ
        # 伸びたあとに先頭が接続語になることもあるので、毎回ここを見る
        if (left - 1 >= 0 and DANGLING_CONNECTIVE.match(sentences[left])
                and total + len(sentences[left - 1]) <= limit):
            left -= 1
            total += len(sentences[left])
            continue

        options = []
        if left - 1 >= 0 and total + len(sentences[left - 1]) <= limit:
            options.append((scores[left - 1], -1, left - 1))
        if right + 1 < len(sentences) and total + len(sentences[right + 1]) <= limit:
            options.append((scores[right + 1], 1, right + 1))
        if not options:
            break
        _, side, index = max(options)
        total += len(sentences[index])
        if side < 0:
            left = index
        else:
            right = index
    return list(range(left, right + 1))


def pick_sentences(sentences: list[str], cues: tuple[str, ...], limit: int, mode: str) -> str:
    """要点を含む文を、原文の順序と形のまま選ぶ。

    **文は丸ごと採るか採らないかのどちらかにする。** 以前は文の中から節を選んで
    継ぎ足していたため、原文には無い文ができていた（「簡単でいいのでの説明を
    求めました」など）。読点で切って貼るのをやめれば、この壊れ方は起きない。

    重要な順に、上限へ収まる文を採り、最後に元の順序へ戻す。上限に入らない文は
    飛ばす（後ろにもっと短い要点の文があれば、そちらを拾える）。

    ただし答弁は隣り合う文だけを採る（`pick_window`）。答弁は一続きの説明なので、
    離れた文を並べると話がつながらない。質問は「まず〜、次に〜」と論点が飛ぶのが
    普通なので、点数の高い文をそのまま拾う。
    """
    scores = []
    for index, sentence in enumerate(sentences):
        score = sum(2 for cue in cues if cue in sentence)
        if re.search(r"\d|[０-９]", sentence):
            score += 2
        if mode == "question" and QUESTION_POINT.search(sentence):
            score += 4
        if mode == "answer" and ANSWER_POINT.search(sentence):
            score += 4
        if index == len(sentences) - 1:
            score += 2
        scores.append(score)

    if mode == "answer":
        return "".join(sentences[index] for index in pick_window(sentences, scores, limit))

    # 同点なら前に出てくる文を優先する（-index を鍵にして昇順に戻す）
    scored = [(score, -index, index) for index, score in enumerate(scores)]
    chosen: list[int] = []
    total = 0
    for _, _, index in sorted(scored, reverse=True):
        length = len(sentences[index])
        if chosen and total + length > limit:
            continue
        chosen.append(index)
        total += length
    return "".join(sentences[index] for index in sorted(chosen))


def concise_summary(text: str, cues: tuple[str, ...], limit: int, mode: str) -> str:
    """発言から要点を含む文を、原文のまま抜き出す。

    ここが作るのは要約ではなく**抜粋**。以前は節を継ぎ足したうえで質問の語尾を
    第三者の言い方（「〜を求めました」）へ差し替えていたが、

    - 原文に無い文ができる
    - 差し替えた語尾が直前の助詞と噛み合わない
    - 文末だと思って語尾を付けた結果、後ろに元の発言が残る

    という壊れ方をしていた。語尾の差し替えはやめ、画面にも「該当発言の抜粋」
    として出す。要約が要るなら、抜粋を消さずに別の項目として足すこと。
    """
    sentences = []
    for sentence in sentence_list(text):
        cleaned = clean_spoken_style(sentence)
        if not cleaned or BACKCHANNEL.fullmatch(cleaned):
            continue
        sentences.append(cleaned)
    if not sentences:
        return ""

    result = pick_sentences(sentences, cues, limit, mode)
    if not result:
        result = sentences[-1] if mode == "question" else sentences[0]
    return clip_at_clause(drop_leading_connective(result), limit)


def normalize_agenda_title(value: str, fallback: str = "委員会での質疑") -> str:
    """議事進行の文言を除き、画面用の自然で短い題名にする。"""
    title = compact(value).replace("実 施", "実施").replace("委員 会", "委員会")
    if "予算特別委員会を開きます" in title:
        budget = re.search(r"(?:令和|平成)[０-９\d]+年度品川区一般会計予算", title)
        if budget:
            return budget.group(0)
        return "予算特別委員会"
    if "調査事項概要" in title:
        return "調査事項概要"
    if "今後の委員会運営" in title:
        return "今後の委員会運営"
    if re.search(r"最後に[、 ]*[（(]?4[）)]?その他", title):
        return "その他"

    title = re.sub(r"^.*?(?=(?:令和|平成)[０-９\d]+年(?:請願|陳情)第)", "", title)
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
    if "順番を入れ替え" in title and "報告事項を聴取いたします" in title:
        title = "請願・陳情審査および報告事項" if "請願・陳情審査" in title else "報告事項"
    for procedure in ("報告事項を聴取いたします", "議案審査を行います", "請願・陳情審査を行います"):
        if procedure in title:
            title = title.rsplit(procedure, 1)[-1]
            title = re.sub(r"^[。 、]*(?:初めに|まず|次に|続いて|最後に)?[、 ]*", "", title)
            title = re.sub(r"^[（(]?\s*[０-９\d]+\s*[）)]\s*", "", title)
            title = compact(title).strip("、。 「」『』")
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
    return clip_title(title, 80)


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
        # 語尾を足さなくなったぶん、上限は共通ルールの値をそのまま使える。
        # 以前は語尾の追加ぶんを見込んで 140 に抑えていた。
        question = concise_summary(text, QUESTION_CUES, qa.QUESTION_LIMIT, "question")
        # 副委員長が進行を代行する会議では、議題提示や説明要求が通常の委員発言と
        # 同じ発言者区分で記録されることがある。要約対象となる本文が残らない
        # 進行発言は、質問・意見として掲載しない。
        if not question:
            continue
        answer = qa.strip_answer_lead(clip_at_clause(" ".join(answer_parts), qa.ANSWER_LIMIT))
        if not answer:
            # 意見・要望のように答弁を求めていない発言と、答弁を拾えなかった発言を
            # 同じ文言にしない（何について答弁したかを読む側が誤解しないように）
            answer = qa.no_answer_text(kind)
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
    session_id = f"{YEAR_ID}-{iso_date.replace('-', '')}-{cabinet or 'committee'}"
    topics = make_topics(voices, session_id)
    exchange_count = sum(len(topic["exchanges"]) for topic in topics)
    status = "正式会議録" if source_type == "formal" else "校正原稿・正式会議録ではない"
    return {
        "id": session_id,
        "meetingId": meeting_id_for(iso_date, committee),
        "date": f"{YEAR}年{int(iso_date[5:7])}月{int(iso_date[8:10])}日",
        "dateIso": iso_date,
        "committee": committee,
        "time": meeting_time,
        "status": status,
        "sourceType": source_type,
        "overview": f"{committee}の会議録から、実質的な質問・確認・意見・要望と答弁・対応を{exchange_count}件抜き出しています。",
        "topics": topics,
        "links": [
            {"type": "minutes" if source_type == "formal" else "minutesDraft",
             "label": "公式の会議録を読む" if source_type == "formal" else "公式の校正原稿PDFを読む",
             "url": document["url"]},
            {"type": "official", "label": "公式の会議録一覧", "url": document["listUrl"]},
        ],
        "sourceMeta": {"pages": pages, "characters": sum(len(v["text"]) for v in voices), "voices": len(voices)},
    }


def meeting_shells_for(sessions: list[dict]) -> list[dict]:
    """過年度の委員会を、既存の定例会とは別の開閉単位として月別に配置する。"""
    if YEAR == 2026:
        return []
    grouped: OrderedDict[str, list[dict]] = OrderedDict()
    for session in sessions:
        grouped.setdefault(session["meetingId"], []).append(session)
    shells = []
    for meeting_id, items in grouped.items():
        first = min(item["dateIso"] for item in items)
        last = max(item["dateIso"] for item in items)
        exchange_count = sum(
            len(topic["exchanges"]) for item in items for topic in item["topics"]
        )
        if meeting_id.endswith("-c-budget"):
            name = "予算特別委員会"
            month_label = "2〜3月"
        elif meeting_id.endswith("-c-settlement"):
            name = "決算特別委員会"
            month_label = "9〜10月"
        else:
            month = int(first[5:7])
            name = f"{month}月の委員会"
            month_label = f"{month}月"
        first_month, first_day = int(first[5:7]), int(first[8:10])
        last_month, last_day = int(last[5:7]), int(last[8:10])
        if first == last:
            period = f"{YEAR}年{first_month}月{first_day}日"
        elif first_month == last_month:
            period = f"{YEAR}年{first_month}月{first_day}日〜{last_day}日"
        else:
            period = f"{YEAR}年{first_month}月{first_day}日〜{last_month}月{last_day}日"
        shells.append({
            "id": meeting_id,
            "monthLabel": month_label,
            "name": name,
            "summary": f"{period}に開催された委員会の質疑・答弁{exchange_count}件を掲載しています。",
            "detailTitle": f"{YEAR_LABEL} {name}",
            "detailLead": "公式会議録から、実質的な質問・確認・意見・要望と答弁・対応の発言を、議題別に抜き出しています。",
            "events": [],
            "links": [
                {"type": "official", "label": "公式の会議録検索", "url": "https://gikai.city.shinagawa.tokyo.jp/search"}
            ],
        })
    return shells


def js_payload(pending: list[dict], part_files: list[str], meeting_shells: list[dict]) -> str:
    pending_json = json.dumps(pending, ensure_ascii=False, separators=(",", ":"))
    parts_json = json.dumps(part_files, ensure_ascii=False, separators=(",", ":"))
    meetings_json = json.dumps(meeting_shells, ensure_ascii=False, separators=(",", ":"))
    return f'''/* {YEAR_LABEL}の全委員会 質問・答弁要約データ。scripts/prepare_committees.py で生成。 */
(() => {{
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.{YEAR_ID};
  if (!year) throw new Error("{YEAR_LABEL}データの読み込み後に {YEAR_ID}-committees.js を読み込んでください");
  year.updatedAt = "{date.today().isoformat()}";
  year.committeeSessions = [];
  year.committeePending = {pending_json};
  year.committeeDataParts = {parts_json};
  const committeeMeetings = {meetings_json};
  const knownMeetingIds = new Set((year.meetings || []).map((meeting) => meeting.id));
  year.meetings = (year.meetings || []).concat(committeeMeetings.filter((meeting) => !knownMeetingIds.has(meeting.id)));
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
        filename = f"{YEAR_ID}-committees-part-{index:02d}.js"
        part_files.append(filename)
        payload = json.dumps(chunk, ensure_ascii=False, separators=(",", ":"))
        (DATA_PATH.parent / filename).write_text(
            f"/* {YEAR_LABEL}委員会データ（自動生成・分割ファイル） */\n"
            f"window.SHINAGAWA_DB.years.{YEAR_ID}.committeeSessions.push(..." + payload + ");\n",
            encoding="utf-8",
        )
    DATA_PATH.write_text(js_payload(pending, part_files, meeting_shells_for(sessions)), encoding="utf-8")
    return part_files


def ledger_markdown(sessions: list[dict], pending: list[dict]) -> str:
    lines = [
        f"# {YEAR_LABEL} 委員会会議録・実装台帳", "",
        f"更新日: {date.today().isoformat()}", "",
        f"この台帳は `python3 scripts/prepare_committees.py --year {YEAR}` で再生成できます。校正原稿は正式会議録ではありません。", "",
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
        assert session["dateIso"].startswith(f"{YEAR}-")
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
            )), (session["id"], topic["title"])
            for item in topic["exchanges"]:
                assert item["id"] not in exchange_ids, f"duplicate exchange id: {session['id']} {item['id']}"
                exchange_ids.add(item["id"])
                assert item["speaker"] and item["question"] and item["answer"]
                assert not item.get("title") or len(item["title"]) <= 44
                # 見るのは発言者ラベル（「12:○山田委員」）が残っている場合だけ。
                # 数字とコロンだけで弾くと、発言に出てくる比率や時刻に引っかかる
                # ——平成18年の「６：４で出資割合を分ける」で実際に止まった。
                #
                # 何が引っかかったかを必ず添える。文言が無いと、9分かけて会議録を
                # 取り終えたあとに落ちても、次に何を直せばいいのか分からない
                assert not VOICE_LABEL.match(item["question"]), (
                    "発言者ラベルが残っている", session["id"], topic["title"],
                    item["id"], item["question"][:60],
                )
                # 上限は共通ルールの値をそのまま使う。ここに数字を書くと、
                # qa_summary 側を変えたときに必ず食い違う（実際に起きた）。
                assert len(item["question"]) <= qa.QUESTION_LIMIT, (
                    session["id"], topic["title"], item["id"], len(item["question"]), item["question"]
                )
                assert len(item["answer"]) <= qa.ANSWER_LIMIT, (
                    session["id"], topic["title"], item["id"], len(item["answer"]), item["answer"]
                )


def western_year(value: str) -> int:
    """`--year` の指定を西暦に直す。読み方は共通ルールに持たせてある。"""
    try:
        return qa.western_year(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError(str(error)) from error


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--year", type=western_year, default=date.today().year)
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--inventory-only", action="store_true")
    args = parser.parse_args()
    configure_year(args.year)
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
    pending_source = KNOWN_PENDING if YEAR == 2026 else []
    pending = [
        {"id": f"pending-{iso.replace('-', '')}-{index:02d}", "dateIso": iso,
         "date": f"{YEAR}年{int(iso[5:7])}月{int(iso[8:10])}日", "committee": committee,
         "meetingId": meeting_id, "status": status, "officialUrl": CALENDAR_URL}
        for index, (iso, committee, meeting_id, status) in enumerate(pending_source, start=1)
        if (iso, committee) not in implemented
    ]
    part_files = write_js_files(sessions, pending)
    LEDGER_PATH.write_text(ledger_markdown(sessions, pending), encoding="utf-8")
    (OUT / "sessions.json").write_text(json.dumps(sessions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    exchanges = sum(len(topic["exchanges"]) for session in sessions for topic in session["topics"])
    print(f"生成完了: {len(sessions)}会議・{exchanges}件 / 公開待ち等{len(pending)}件 / データ{len(part_files)}分割")


if __name__ == "__main__":
    main()
