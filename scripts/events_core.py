#!/usr/bin/env python3
"""イベント収集の共通処理。日付・時刻の正規化と、イベントの同一判定を置く。

収集元ごとの取得処理は collect_events.py にある。ここは取得したテキストを
整える純粋な処理だけを置き、テストから直接呼べるようにしている。
"""

from __future__ import annotations

import hashlib
import html
import re
import unicodedata
from datetime import date, datetime, timedelta
from urllib.parse import urlparse, urlunparse

# 確度。カレンダーに並べるとき、推定した開催日は見た目で区別する。
#   official  … 収集元が開催日として発表しているもの（区公式カレンダー）
#   published … 収集元のページに開催日が明記されているもの（議会・観光協会）
#   estimated … 本文から抽出した推定（ニュース記事）
CONFIDENCE_OFFICIAL = "official"
CONFIDENCE_PUBLISHED = "published"
CONFIDENCE_ESTIMATED = "estimated"

# 確度の強さ。重複を統合するとき、強いほうの記録を残す。
CONFIDENCE_RANK = {
    CONFIDENCE_OFFICIAL: 3,
    CONFIDENCE_PUBLISHED: 2,
    CONFIDENCE_ESTIMATED: 1,
}

# 元号の開始年。元年を1年として (開始年 - 1) + 年 で西暦にする。
ERA_BASE = {"令和": 2018, "平成": 1988, "昭和": 1925}


def clean_text(value: str | None) -> str:
    """タグと実体参照を落として、空白を詰めた一行にする。"""
    if not value:
        return ""
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    # 全角空白もまとめて詰める
    return re.sub(r"\s+", " ", value.replace("　", " ")).strip()


# 本文に紛れたURL。要約には要らないうえ、収集元が古いURLを書いたままのことがある
# （しながわ観光協会のページに区公式の旧URLが残っていた）。要約に混ぜると、
# このリポジトリのデータに死んだURLが入り込み、出典リンクの見張りにも引っかかる。
_URL_IN_TEXT = re.compile(r"https?://[^\s　、。）)」】]+")


def summary_text(value: str | None, limit: int = 240) -> str:
    """表示用の要約にする。タグとURLを落として、長さを切りそろえる。"""
    cleaned = _URL_IN_TEXT.sub(" ", clean_text(value))
    cleaned = re.sub(r"\s+", " ", cleaned).strip(" ・,、")
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 1].rstrip() + "…"


def normalized_url(value: str) -> str:
    """同じページを指すURLを1つの形にそろえる（IDの材料にする）。"""
    parsed = urlparse((value or "").strip())
    scheme = parsed.scheme.lower() or "https"
    host = parsed.netloc.lower()
    path = re.sub(r"/{2,}", "/", parsed.path) or "/"
    if path != "/":
        path = path.rstrip("/")
    return urlunparse((scheme, host, path, "", parsed.query, ""))


def event_id(source_id: str, url: str, title: str) -> str:
    """イベントIDを作る。

    ニュースの★がID単位で保存されている前例（docs/data-maintenance.md）に合わせ、
    IDは後から振り直さない前提で決める。収集元・URL・タイトルの3つから作るのは、
    1つのページに複数のイベントが載ることがあるため。
    """
    key = f"{source_id}|{normalized_url(url)}|{clean_text(title)}"
    return hashlib.sha256(key.encode("utf-8")).hexdigest()[:20]


def normalize_date(value: str | None) -> str:
    """いろいろな書き方の日付を YYYY-MM-DD にする。引けなければ空文字。

    受け付ける形:
      2026/11/03, 2026-11-03, 2026年11月3日, 令和8年11月4日
    """
    if not value:
        return ""
    text = unicodedata.normalize("NFKC", clean_text(value))

    era = re.search(r"(令和|平成|昭和)\s*(元|\d{1,2})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日", text)
    if era:
        year_part = 1 if era.group(2) == "元" else int(era.group(2))
        year = ERA_BASE[era.group(1)] + year_part
        return _as_iso(year, int(era.group(3)), int(era.group(4)))

    western = re.search(r"(\d{4})\s*[年/.\-]\s*(\d{1,2})\s*[月/.\-]\s*(\d{1,2})\s*日?", text)
    if western:
        return _as_iso(int(western.group(1)), int(western.group(2)), int(western.group(3)))
    return ""


def _as_iso(year: int, month: int, day: int) -> str:
    try:
        return date(year, month, day).isoformat()
    except ValueError:
        # 2月30日のような実在しない日付は捨てる（誤読を通さない）
        return ""


# 「午前10時00分から午後0時30分まで」「10:00～16:00」「10時から12時」
_CLOCK = r"(?:(午前|午後)\s*)?(\d{1,2})\s*(?:時|:)\s*(\d{1,2})?\s*分?"
_RANGE = re.compile(_CLOCK + r"\s*(?:から|～|~|-|−|ー|から)\s*" + _CLOCK)
_SINGLE = re.compile(_CLOCK)


def parse_time_range(value: str | None) -> tuple[str, str]:
    """開始・終了時刻を HH:MM で返す。読めなければ空文字の組。

    午後0時30分は12:30、午後1時は13:00。午前12時は0時として扱う。
    """
    if not value:
        return ("", "")
    text = unicodedata.normalize("NFKC", clean_text(value))
    ranged = _RANGE.search(text)
    if ranged:
        head_meridiem = ranged.group(1)
        tail_meridiem = ranged.group(4)
        start = _to_clock(head_meridiem, ranged.group(2), ranged.group(3))
        # 「午後2時～4時」の4時は午後4時。後半に午前・午後が書かれていなければ
        # 前半のものを引き継ぐ。引き継がないと04:00になり、
        # 終了が開始より前という壊れた時刻になる。
        end = _to_clock(tail_meridiem or head_meridiem, ranged.group(5), ranged.group(6))
        # 引き継いでもなお逆転するとき（「午前10時～1時」など）は、
        # 午後として読み直す。日をまたぐ催しより、書き手が午後を略した方がずっと多い。
        if start and end and end <= start and not tail_meridiem:
            retry = _to_clock("午後", ranged.group(5), ranged.group(6))
            if retry and retry > start:
                end = retry
        if start and end:
            return (start, end)
        return (start, "")
    single = _SINGLE.search(text)
    if single:
        return (_to_clock(single.group(1), single.group(2), single.group(3)), "")
    return ("", "")


def _to_clock(meridiem: str | None, hour: str, minute: str | None) -> str:
    try:
        h = int(hour)
    except (TypeError, ValueError):
        return ""
    m = int(minute) if minute else 0
    if meridiem == "午後":
        if h < 12:
            h += 12
    elif meridiem == "午前":
        if h == 12:
            h = 0
    if not (0 <= h <= 23 and 0 <= m <= 59):
        return ""
    return f"{h:02d}:{m:02d}"


# 「11月28日」「1月5日(月)」。年の書いていない日付を拾う。
_MONTH_DAY = re.compile(r"(?<!\d)(\d{1,2})\s*月\s*(\d{1,2})\s*日")

# 告知より何日前までなら「過去の話」として同じ年に寄せるか。
# イベントは先に告知されるので、配信日より大きく前に出る日付は翌年とみなす。
PAST_TOLERANCE_DAYS = 31


def infer_year(month: int, day: int, reference: date) -> str:
    """年の書いていない「M月D日」に年を補って YYYY-MM-DD にする。

    イベント告知は開催より前に出る。基準日（記事の配信日）と同じ年に置いてみて、
    基準日より PAST_TOLERANCE_DAYS 日より前になってしまうときだけ翌年とみなす。
    11月配信の「1月5日」が翌年になるのはこの規則による。
    """
    for year in (reference.year, reference.year + 1):
        try:
            candidate = date(year, month, day)
        except ValueError:
            continue
        if candidate >= reference - timedelta(days=PAST_TOLERANCE_DAYS):
            return candidate.isoformat()
    return ""


def extract_dates_from_text(text: str, reference_iso: str, limit: int = 6) -> list[str]:
    """本文から開催日らしい日付を拾う。確度は estimated 扱いにすること。

    年つきの日付を優先し、年の無い「M月D日」は infer_year() で補う。
    """
    reference = _as_date(reference_iso)
    if reference is None:
        return []
    normalized = unicodedata.normalize("NFKC", clean_text(text))
    found: list[str] = []

    # 先に年つきを拾い、拾った部分は伏せてから年なしを探す（二重に数えない）
    def take(iso: str) -> None:
        if iso and iso not in found:
            found.append(iso)

    def mask(match: re.Match[str]) -> str:
        return " " * len(match.group(0))

    with_year = re.compile(r"(?:令和|平成|昭和)\s*(?:元|\d{1,2})\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日|\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日")
    for match in with_year.finditer(normalized):
        take(normalize_date(match.group(0)))
    remainder = with_year.sub(mask, normalized)

    for match in _MONTH_DAY.finditer(remainder):
        month, day = int(match.group(1)), int(match.group(2))
        if not (1 <= month <= 12 and 1 <= day <= 31):
            continue
        take(infer_year(month, day, reference))
    return found[:limit]


def _as_date(value: str | None) -> date | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00")).date()
    except ValueError:
        pass
    iso = normalize_date(value)
    if iso:
        return date.fromisoformat(iso)
    return None


# 同一判定で無視する飾り。タイトルの揺れを吸収する。
_TITLE_NOISE = re.compile(r"[\s　]|[「」『』【】（）()\[\]・,、。．.!！?？~〜～\-ー－/／|｜]")


def title_key(title: str) -> str:
    """同一判定に使うタイトルの骨。記号と空白を落として比べる。"""
    return _TITLE_NOISE.sub("", unicodedata.normalize("NFKC", clean_text(title))).lower()


def same_event(left: dict, right: dict) -> bool:
    """2件が同じイベントかを判定する。

    収集元をまたぐと同じ催しが別々に入る（区公式とニュースと観光協会）。
    URLは収集元ごとに違うので使えない。ここでは
      ・開催日が1日でも重なっていること
      ・タイトルの骨が一致するか、片方がもう片方を含んでいること
    の両方がそろったときだけ同じとみなす。

    「含む」まで許すのは、ニュース見出しが「品川歴史館で『品川らくご会』開催へ」
    のように会場や語尾を足してくるため。日付の一致を必須にしているので、
    短い一般語（「講座」など）だけで結びつく誤統合は起きにくい。
    """
    if not set(left.get("dates") or []) & set(right.get("dates") or []):
        return False
    a, b = title_key(left.get("title", "")), title_key(right.get("title", ""))
    if not a or not b:
        return False
    if a == b:
        return True
    # 短すぎる語の包含は偶然当たるので、ある程度の長さを求める
    shorter, longer = (a, b) if len(a) <= len(b) else (b, a)
    return len(shorter) >= 6 and shorter in longer


def merge_events(events: list[dict]) -> list[dict]:
    """同じイベントをまとめる。確度の高い記録を残し、低いほうは出典に回す。"""
    merged: list[dict] = []
    for event in events:
        for kept in merged:
            if same_event(kept, event):
                _absorb(kept, event)
                break
        else:
            merged.append(dict(event))
    return merged


def _absorb(kept: dict, other: dict) -> None:
    """other を kept に取り込む。強い確度の側が本体になる。

    入れ替えが起きるため、弱いほうの出典は書き換える前に控えておく。
    控えずに参照すると、kept を置き換えた時点で弱いほうの出典が消える。
    """
    keep_rank = CONFIDENCE_RANK.get(kept.get("confidence", ""), 0)
    other_rank = CONFIDENCE_RANK.get(other.get("confidence", ""), 0)
    weaker = other if other_rank <= keep_rank else kept
    origin = {
        "sourceId": weaker.get("sourceId", ""),
        "source": weaker.get("source", ""),
        "url": weaker.get("url", ""),
        "title": weaker.get("title", ""),
    }
    carried = list(kept.get("alsoSeenIn") or []) + list(other.get("alsoSeenIn") or [])
    dates = sorted(set(kept.get("dates") or []) | set(other.get("dates") or []))

    if other_rank > keep_rank:
        # 取り込む側のほうが確か。中身を入れ替える。
        # IDは先に出たものを保つ（★の保存先が変わらないようにする）。
        kept_id = kept["id"]
        kept.clear()
        kept.update(other)
        kept["id"] = kept_id

    also = kept.setdefault("alsoSeenIn", [])
    also[:] = carried
    if origin["url"] and origin["url"] != kept.get("url") and origin not in also:
        also.append(origin)
    kept["dates"] = dates
