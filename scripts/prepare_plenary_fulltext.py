#!/usr/bin/env python3
"""本会議の会議録全文を、会議1日につき1ファイルで書き出す（段階4）。

委員会の全文（prepare_committees.py）と同じ形・同じ置き場所を使う。違うのは
索引層の作り方だけで、次の事情による。

## なぜ索引層に足さず、別の重ね合わせファイルにするのか

本会議の質問・答弁要約（`qaSummaries`）は `data/<年>.js` と
`data/<年>-complete.js` に入っていて、後者は `scripts/out/history/qa_queue.json`
から作られる。このキューはリポジトリに入っていない（`.gitignore`）ため、
`hasFullText` を足すためだけに要約づくりの一式を回すと、既に人手で確かめた
要約まで作り直すことになる。

そこで、全文への入口だけを `data/<年>-plenary-minutes.js` に重ねる。
`-complete.js` が `year.questions` を差し替えるのと同じやり方で、そのあとに
読み込んで `fullText` を足す。要約の中身には触らない。

    索引層    data/<年>.js / <年>-complete.js  既存。触らない
    入口      data/<年>-plenary-minutes.js     年1ファイル・数KB
    全文層    data/minutes/<年>/<会議ID>.js    会議1日1ファイル・書き換えない

## 会議IDの付け方

    r06-20240220-honkaigi

委員会は末尾が会議室番号（`r06-20240515-19`）なので、本会議は `honkaigi` で
区別する。年IDが先頭3文字という決まりは共通なので、読み込み先のパスは
委員会とまったく同じ導出（`data/minutes/<年ID>/<会議ID>.js`）で出せる。

## 質問者から原文へ飛べるようにする

本会議の要約は、質問項目の見出しを言い換えただけのものが3割以上ある
（`check_qa_summaries.py` の「タイトル反復」）。そこで、質問者ごとに
その人が質問を始めた発言の位置を記録し、「原文を読む」で全文の該当発言へ
直接飛べるようにする。委員会の `voiceIndex` と同じ考え方。

実行例:
  python3 scripts/prepare_plenary_fulltext.py --year r06
  python3 scripts/prepare_plenary_fulltext.py --year 令和6 --refresh

設計の全体は docs/fulltext-minutes-plan.md にある。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import minutes_fulltext as mf
import prepare_history as ph

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

MINUTES_BASE = ph.MINUTES_BASE

# 会議録検索システムの分類。本会議は定例会と臨時会で番号が分かれている。
# 3以降は委員会（prepare_committees.py が扱う）。
#
# ここを 1 だけにすると臨時会の会議録がまるごと抜ける。実際に抜けていた。
PLENARY_CABINETS = (1, 2)

# 本会議の会議録は「名簿・議事日程」と「本文」の2件で1日分になる。全文に
# するのは本文のほうだけ。
BODY_TITLE = "本文"

# 「令和６年_第１回定例会（第１日目）　本文」から回次と種別を取る。
MEETING_TITLE = re.compile(r"第([０-９0-9]+)回(定例会|臨時会)")
DAY_TITLE = re.compile(r"（第([０-９0-9]+)日目）")
# 会議の名前（「令和6年第1回臨時会」）。年データに載っていない臨時会は、
# 画面がこの名前で見出しを作る。画面側は目次にこれが無い場合、表題から
# 同じ規則で導くので、古い目次のままでも表示は壊れない。
MEETING_NAME = re.compile(r"([^_（\s]+年)_(第[０-９0-9]+回(?:定例会|臨時会))")

MEETING_SUFFIX = {"定例会": "t", "臨時会": "r"}

ZENKAKU_DIGITS = str.maketrans("０１２３４５６７８９", "0123456789")

# 1か月ぶんずつ検索する。年間検索は10件ごとにPOSTページングされるため。
MONTH_LAST_DAY = (31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)


def to_number(value: str) -> int:
    return int(value.translate(ZENKAKU_DIGITS))


def year_id(value: str) -> str:
    """`--year` の指定を年ID（h13〜r08）に直す。

    ワークフローの入力（2025 / r07 / 令和7 / h30 / 平成30）をそのまま受ける。
    """
    text = str(value).strip().lower()
    if re.fullmatch(r"[hr]\d{2}", text):
        return text
    try:
        return ph.year_token(text)
    except argparse.ArgumentTypeError:
        pass
    match = re.fullmatch(r"(令和|平成)(\d+|元)", str(value).strip())
    if match:
        number = 1 if match.group(2) == "元" else int(match.group(2))
        return f"{'r' if match.group(1) == '令和' else 'h'}{number:02d}"
    if re.fullmatch(r"(19|20)\d{2}", text):
        western = int(text)
        return f"r{western - 2018:02d}" if western >= 2019 else f"h{western - 1988:02d}"
    raise argparse.ArgumentTypeError(f"年の指定が不正です: {value}（例: r06, 2024, 令和6）")


def session_id_for(year: str, iso_date: str) -> str:
    return f"{year}-{iso_date.replace('-', '')}-honkaigi"


def meeting_id_for(year: str, title: str) -> str:
    """会議録の表題から、年データの会議ID（r06-1t）を導く。"""
    match = MEETING_TITLE.search(title)
    if not match:
        return ""
    return f"{year}-{to_number(match.group(1))}{MEETING_SUFFIX[match.group(2)]}"


def day_label_of(title: str) -> str:
    match = DAY_TITLE.search(title)
    return f"第{to_number(match.group(1))}日目" if match else ""


def meeting_name_of(title: str) -> str:
    """会議録の表題から会議の名前を作る（「令和6年第1回臨時会」）。

    臨時会は年データ（`data/<年>.js` の `meetings`）に載っていないことが多い。
    その場合、画面はこの名前で見出しを作って全文を出す。
    """
    match = MEETING_NAME.search(title)
    if not match:
        return ""
    return f"{match.group(1)}{match.group(2)}".translate(ZENKAKU_DIGITS)


def collect_month(year: str, cabinet: int, western: int, month: int, last: int,
                  found: dict[str, dict], refresh: bool) -> None:
    """1か月ぶんの一覧から、本文の会議録を拾って `found` へ入れる。"""
    url = (
        f"{MINUTES_BASE}?QueryType=new&Template=list&Cabinet={cabinet}"
        f"&TermStart={western}-{month:02d}-01&TermEnd={western}-{month:02d}-{last:02d}"
    )
    soup = ph.clean_soup(ph.fetch(url, refresh))
    for item in soup.select(".result-document__item"):
        anchor = item.select_one('a[href*="Template=document"][href*="Id="]')
        date_node = item.select_one(".ans-title__date")
        if not anchor or not date_node:
            continue
        title = ph.compact(anchor.get_text(" ", strip=True))
        if BODY_TITLE not in title:
            continue
        iso_date = ph.compact(date_node.get_text(" ", strip=True))
        # 定例会と臨時会が同じ日に開かれることはないが、月をまたぐ検索で
        # 重複したときは先に見つけたほうを残す（順序を安定させる）。
        found.setdefault(iso_date, {
            "dateIso": iso_date,
            "title": title,
            # 取得のたびに変わる番号を落としてから使う（minutes_fulltext.py）。
            # ここを素通しにすると、取得し直すたびに全文の出典URLが変わり、
            # write-once が崩れて全ファイルが差分になる。
            "url": mf.canonical_source_url(anchor.get("href")),
            "meetingId": meeting_id_for(year, title),
            "meetingName": meeting_name_of(title),
            "dayLabel": day_label_of(title),
        })


def discover(year: str, refresh: bool = False) -> list[dict]:
    """その年の本会議の会議録（本文）を、分類ごと・月ごとの検索で集める。

    定例会（Cabinet=1）と臨時会（Cabinet=2）の両方を見る。年間検索は10件ごとに
    POSTページングされるため、月単位のGETで取り切る。
    """
    western = ph.western_year(year)
    found: dict[str, dict] = {}
    for cabinet in PLENARY_CABINETS:
        for month, last in enumerate(MONTH_LAST_DAY, start=1):
            if month == 2 and western % 4 != 0:
                last = 28
            collect_month(year, cabinet, western, month, last, found, refresh)
    return [found[key] for key in sorted(found)]


def parse_voices(raw_html: str) -> list[dict]:
    """1日分の会議録から、発言者と段落つきの発言を取り出す。

    段落を残す理由は minutes_fulltext.voice_paragraphs にある。本会議は
    代表質問がひとつづきの発言として記録されるため、委員会よりも1発言が
    長い（1万字を超えるものがある）。ここで段落を捨てると読めない。
    """
    soup = ph.clean_soup(raw_html)
    speakers = {}
    for item in soup.select(".voicelist__item[data-voice_code]"):
        name = item.select_one(".speaker__name")
        if name:
            speakers[item.get("data-voice_code", "")] = mf.normalized_name(
                name.get_text(" ", strip=True))
    voices = []
    for node in soup.select(".voice-text[data-voice_code], .voice_text[data-voice_code]"):
        speaker = speakers.get(node.get("data-voice_code", ""), "")
        body = node.select_one(".voice__text")
        lines = mf.voice_paragraphs(body if body is not None else node, speaker)
        text = " ".join(lines).strip()
        if text:
            voices.append({"speaker": speaker, "text": text, "lines": lines})
    return voices


def date_label_of(year: str, iso_date: str) -> str:
    return f"{ph.western_year(year)}年{int(iso_date[5:7])}月{int(iso_date[8:10])}日"


def load_questions(year: str) -> list[dict]:
    """年データから質問者の並びを読む。要約の中身は見ない。"""
    path = DATA / f"{year}.js"
    if not path.exists():
        return []
    return ph.load_current_year(year).get("questions") or []


def find_question_start(voices: list[dict], member: str, topics: list[str]) -> int:
    """質問者が質問を始めた発言の位置（1始まり）を探す。見つからなければ0。

    採点は prepare_history.question_start_score と同じものを使う。挨拶や
    議事進行ではなく、質問項目の語が多く出てくる長い発言を選ぶ。
    """
    target = ph.normalized(member)
    if not target:
        return 0
    candidates = [
        (ph.question_start_score(voice, topics), index)
        for index, voice in enumerate(voices, start=1)
        if target in ph.normalized(voice["speaker"])
    ]
    return max(candidates)[1] if candidates else 0


def overlay_source(year: str, sessions: list[dict], starts: dict[str, dict]) -> str:
    """`data/<年>-plenary-minutes.js` の中身を作る。

    `-complete.js` と同じく、年データを読み込んだあとに重ねる形にする。
    全文そのものは入れない（1日6万字あるため）。ここに入るのは目次と、
    質問者ごとの入口だけ。
    """
    label = ph.year_label(year)
    return (
        f"/* {label}の本会議 会議録全文の目次。"
        f"scripts/prepare_plenary_fulltext.py で生成。 */\n"
        "(() => {\n"
        '  "use strict";\n'
        f"  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years"
        f" && window.SHINAGAWA_DB.years.{year};\n"
        f'  if (!year) throw new Error("{label}データの読み込み後に'
        f' {year}-plenary-minutes.js を読み込んでください");\n'
        "\n"
        "  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。\n"
        f"  year.plenaryMinutes = {json.dumps(sessions, ensure_ascii=False, indent=2)};\n"
        "\n"
        "  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに\n"
        "  // なっていても、ここから原文の該当発言へ1手で行ける。\n"
        f"  const starts = {json.dumps(starts, ensure_ascii=False, indent=2)};\n"
        "  year.questions = (year.questions || []).map((question) => {\n"
        "    const start = starts[`${question.meetingId}:${question.memberId}`];\n"
        "    return start ? { ...question, fullText: start } : question;\n"
        "  });\n"
        "})();\n"
    )


def write_overlay(year: str, sessions: list[dict], starts: dict[str, dict]) -> bool:
    """目次を書く。中身が変わらないときは書かない。"""
    path = DATA / f"{year}-plenary-minutes.js"
    source = overlay_source(year, sessions, starts)
    if path.exists() and path.read_text(encoding="utf-8") == source:
        return False
    path.write_text(source, encoding="utf-8")
    return True


SITE_MARKER = "window.SHINAGAWA_DB.site = "


def enable_in_site(year: str) -> bool:
    """`data/site.js` のその年に `plenaryMinutes` を立てる。

    画面はこの目印を見て目次を読み込むので、ここを忘れると、全文を入れたのに
    何も出ないという分かりにくい失敗になる。年ごとに手で足すのをやめて、
    データを作ったときに一緒に立てる。

    site.js は JSON をそのまま書いた形なので、読み直して同じ体裁で書き戻す
    （他の行が動かないことは scripts/test_plenary_fulltext.py で確かめている）。
    """
    path = DATA / "site.js"
    text = path.read_text(encoding="utf-8")
    start = text.index(SITE_MARKER) + len(SITE_MARKER)
    site, end = json.JSONDecoder().raw_decode(text, start)
    entry = next((item for item in site.get("years") or [] if item.get("id") == year), None)
    if entry is None or entry.get("plenaryMinutes"):
        return False
    # 読み込み順が分かるよう、委員会の目印の隣に置く
    rebuilt = {}
    for key, value in entry.items():
        rebuilt[key] = value
        if key == "committees":
            rebuilt["plenaryMinutes"] = True
    rebuilt.setdefault("plenaryMinutes", True)
    entry.clear()
    entry.update(rebuilt)
    path.write_text(
        text[:start] + json.dumps(site, ensure_ascii=False, indent=2) + text[end:],
        encoding="utf-8")
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--year", type=year_id, required=True,
                        help="2024 / r06 / 令和6 / h30 / 平成30")
    parser.add_argument("--refresh", action="store_true", help="取得済みの会議録を使わず取り直す")
    parser.add_argument("--skip-fulltext", action="store_true",
                        help="全文ファイルを書かず、目次だけ作り直す")
    args = parser.parse_args()
    year = args.year

    documents = discover(year, args.refresh)
    if not documents:
        print(f"{year}: 本会議の会議録が見つかりませんでした")
        return 1

    questions = load_questions(year)
    by_meeting: dict[str, list[tuple[dict, list[dict]]]] = defaultdict(list)
    sessions: list[dict] = []
    written = 0
    today = date.today().isoformat()

    for index, document in enumerate(documents, start=1):
        iso_date = document["dateIso"]
        session_id = session_id_for(year, iso_date)
        print(f"[{index}/{len(documents)}] {iso_date} {document['title']}")
        voices = parse_voices(ph.fetch(document["url"], args.refresh))
        title = f"{date_label_of(year, iso_date)} {document['title'].replace(BODY_TITLE, '').strip()}"
        payload = mf.build_payload(
            session_id,
            date_iso=iso_date,
            title=title,
            source_type="formal",
            source_url=document["url"],
            voices=voices,
            fetched_at=today,
        )
        if not args.skip_fulltext and mf.write_minutes_file(payload):
            written += 1
        sessions.append({
            "id": session_id,
            "meetingId": document["meetingId"],
            "meetingName": document.get("meetingName", ""),
            "dateIso": iso_date,
            "date": date_label_of(year, iso_date),
            "dayLabel": document["dayLabel"],
            "title": title,
            "sourceUrl": document["url"],
            "characters": payload["characters"],
            "voices": len(payload["voices"]),
            # 「書いたか」ではなく「在るか」で決める。--skip-fulltext で目次
            # だけ作り直したときも、既に置いてある全文をそのまま使えるように。
            "hasFullText": mf.minutes_path(session_id).exists(),
        })
        if document["meetingId"]:
            by_meeting[document["meetingId"]].append((sessions[-1], payload["voices"]))

    # 質問者ごとの入口。同じ定例会の複数日を見て、いちばん質問らしい発言を選ぶ。
    starts: dict[str, dict] = {}
    unmatched: list[str] = []
    for question in questions:
        days = by_meeting.get(question.get("meetingId") or "", [])
        member = question.get("member") or ""
        topics = question.get("topics") or []
        best = None
        for session, voices in days:
            found = find_question_start(voices, member, topics)
            if not found:
                continue
            score = ph.question_start_score(voices[found - 1], topics)
            if best is None or score > best[0]:
                best = (score, session["id"], found)
        if best is None:
            unmatched.append(f"{question.get('meetingId')} {member}")
            continue
        starts[f"{question['meetingId']}:{question.get('memberId') or member}"] = {
            "sessionId": best[1], "voiceIndex": best[2],
        }

    if not args.skip_fulltext:
        # 同じ年ディレクトリに委員会の全文も入っているので、本会議の分だけを見る
        removed = mf.prune_missing({item["id"] for item in sessions}, year, plenary=True)
        if removed:
            print(f"一覧から消えた全文を削除: {len(removed)}件 {'、'.join(removed)}")

    changed = write_overlay(year, sessions, starts)
    if enable_in_site(year):
        print(f"data/site.js の {year} に plenaryMinutes を立てました")
    characters = sum(item["characters"] for item in sessions)
    print(f"\n本会議の全文（{year}）: {len(sessions)}日 / {characters:,}字"
          f" / 新しく書いたファイル {written}件")
    print(f"質問者からの入口: {len(starts)}/{len(questions)}名"
          f"{'' if changed else '（目次に変更なし）'}")
    if unmatched:
        print(f"会議録に発言が見つからなかった質問者 {len(unmatched)}名: "
              f"{'、'.join(unmatched[:5])}{' …' if len(unmatched) > 5 else ''}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
