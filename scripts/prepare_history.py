#!/usr/bin/env python3
"""平成30年〜令和7年の全件化に必要な公式データと会議録要約キューを生成する。

実行例:
  python3 scripts/prepare_history.py
  python3 scripts/prepare_history.py --years 7 6 --refresh
  python3 scripts/prepare_history.py --with-contexts

生成先（git管理外）:
  scripts/out/history/rXX_official.json
  scripts/out/history/manifest.json
  scripts/out/history/qa_queue.json
  scripts/out/history/contexts/rXX/*.txt
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import time
import urllib.error
import urllib.request
from collections import defaultdict
from datetime import date
from pathlib import Path
from typing import Iterable

from bs4 import BeautifulSoup, Comment

COUNCIL_BASE = "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/"
MINUTES_BASE = "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000"
UA = {"User-Agent": "Mozilla/5.0 (shinagawa-gikai-db history preparation)"}
ROOT = Path(__file__).resolve().parents[1]
CACHE_DIR = ROOT / "scripts/cache/history"
OUT_DIR = ROOT / "scripts/out/history"


def year_id(year: int) -> str:
    return "h30" if year == 0 else f"r{year:02d}"


def year_label(year: int) -> str:
    return "平成30年" if year == 0 else ("令和元年" if year == 1 else f"令和{year}年")


def western_year(year: int) -> int:
    return 2018 if year == 0 else 2018 + year


def compact(text: str) -> str:
    return re.sub(r"\s+", " ", text or "").strip()


def normalized(text: str) -> str:
    return re.sub(r"[\s　◯○・]", "", text or "").lower()


def cache_path(url: str) -> Path:
    digest = hashlib.sha256(url.encode("utf-8")).hexdigest()
    return CACHE_DIR / f"{digest}.html"


def fetch(url: str, refresh: bool = False) -> str:
    path = cache_path(url)
    if path.exists() and not refresh:
        return path.read_text(encoding="utf-8")
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as response:
        body = response.read().decode("utf-8", "replace")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(body, encoding="utf-8")
    time.sleep(0.4)
    return body


def fetch_first(urls: Iterable[str], refresh: bool = False) -> tuple[str, str]:
    last_error: Exception | None = None
    for url in urls:
        try:
            return fetch(url, refresh), url
        except (urllib.error.HTTPError, urllib.error.URLError) as exc:
            last_error = exc
    raise last_error or RuntimeError("取得候補URLがありません")


def clean_soup(raw_html: str) -> BeautifulSoup:
    soup = BeautifulSoup(raw_html, "html.parser")
    for node in soup.find_all(string=lambda value: isinstance(value, Comment)):
        node.extract()
    return soup


def text_without_document_suffix(cell) -> str:
    clone = BeautifulSoup(str(cell), "html.parser")
    for anchor in clone.select("a"):
        anchor.decompose()
    value = compact(clone.get_text(" ", strip=True))
    return re.sub(r"[（(]\s*(?:/\s*)*[）)]\s*$", "", value).strip()


def document_links(cell) -> list[dict]:
    links = []
    for anchor in cell.select("a[href]"):
        url = anchor.get("href", "")
        if not url:
            continue
        label_text = compact(anchor.get_text(" ", strip=True)).lower()
        if ".pdf" in label_text or ".pdf" in url.lower():
            label = "議案資料PDF"
        elif ".doc" in label_text or ".doc" in url.lower():
            label = "議案資料Word"
        else:
            label = "議案資料"
        if not any(item["url"] == url for item in links):
            links.append({"type": "official", "label": label, "url": url})
    return links


def parse_proposals_and_petitions(raw_html: str, page_url: str, meeting_id: str) -> tuple[list[dict], list[dict]]:
    soup = clean_soup(raw_html)
    entry = soup.select_one(".entry-content") or soup
    bills: list[dict] = []
    petitions: list[dict] = []

    for table in entry.select("table"):
        headers = [compact(cell.get_text(" ", strip=True)) for cell in table.select("thead th")]
        header_text = " ".join(headers)

        if "請願・陳情件名" in header_text or "受理番号" in header_text:
            for row in table.select("tr"):
                cells = row.select("td")
                if len(cells) < 4:
                    continue
                values = [compact(cell.get_text(" ", strip=True)) for cell in cells]
                # 令和2〜6年形式は末尾が「結果・備考」、令和7年形式は末尾が「結果」。
                # 件名自体に「撤回」「採択」を含む例があるため、文言検索で列判定しない。
                result_index = len(values) - 2 if "付託委員会" in header_text else len(values) - 1
                before_result = values[:result_index]
                title_candidates = [
                    value for value in before_result
                    if value
                    and not re.fullmatch(r"令和(?:元|\d+)年", value)
                    and not re.fullmatch(r"(?:請願|陳情)?第?\d+号", value)
                    and not ("委員会" in value and len(value) <= 12)
                ]
                title = max(title_candidates, key=len, default="")
                number_parts = [
                    value for value in before_result
                    if value != title and re.search(r"令和(?:元|\d+)年|請願|陳情|第\d+号", value)
                ]
                petitions.append({
                    "meetingId": meeting_id,
                    "number": compact(" ".join(number_parts)),
                    "title": title,
                    "result": values[result_index],
                    "links": [{"type": "official", "label": "公式資料を見る", "url": page_url}],
                })
            continue

        if "議案名" not in header_text or "結果" not in header_text:
            continue

        previous_h3 = table.find_previous("h3")
        is_member_proposal = bool(previous_h3 and "議員提案" in compact(previous_h3.get_text(" ", strip=True)))
        previous_h4 = table.find_previous("h4")
        category = compact(previous_h4.get_text(" ", strip=True)) if previous_h4 else "議員提案"
        category = re.sub(r"^[（(]?\d+[）)]?", "", category).strip() or "議案"

        for row in table.select("tr"):
            cells = row.select("td")
            if len(cells) < 3:
                continue
            number = compact(cells[0].get_text(" ", strip=True))
            if "議案" not in number:
                continue
            title = text_without_document_suffix(cells[1])
            result = compact(cells[-1].get_text(" ", strip=True))
            summary = compact(cells[2].get_text(" ", strip=True)) if len(cells) >= 4 else "議員提出の意見書・決議です。"
            links = [{"type": "official", "label": "公式の議案一覧を見る", "url": page_url}]
            links.extend(document_links(cells[1]))
            bills.append({
                "meetingId": meeting_id,
                "number": number,
                "proposer": "議員提出" if is_member_proposal or "議員提出" in number else "区長提出",
                "title": compact(f"{number} {title}"),
                "summary": summary,
                "tags": [category],
                "result": result,
                "links": links,
            })

    return bills, petitions


def parse_questions(raw_html: str, meeting_id: str, page_url: str) -> list[dict]:
    soup = clean_soup(raw_html)
    entry = soup.select_one(".entry-content") or soup
    questions: list[dict] = []

    for table in entry.select("table.shitsumon, table"):
        headers = [compact(cell.get_text(" ", strip=True)) for cell in table.select("thead th")]
        if "発言事項" not in " ".join(headers) or "議員名" not in " ".join(headers):
            continue
        heading = table.find_previous("h3")
        heading_text = compact(heading.get_text(" ", strip=True)) if heading else ""
        date_match = re.search(r"(\d+)月(\d+)日", heading_text)
        date_label = f"{int(date_match.group(1))}月{int(date_match.group(2))}日" if date_match else ""
        kind = "代表質問" if "代表質問" in heading_text else "一般質問"

        for row in table.select("tr"):
            cells = row.select("td")
            if len(cells) < 3:
                continue
            topics = [compact(item.get_text(" ", strip=True)) for item in cells[1].select("li")]
            who_lines = [compact(part) for part in cells[2].get_text("\n", strip=True).splitlines() if compact(part)]
            if not topics or not who_lines:
                continue
            member = who_lines[0]
            party_match = re.search(r"[（(](.*?)[）)]", " ".join(who_lines[1:]))
            party = party_match.group(1).strip() if party_match else ""
            questions.append({
                "meetingId": meeting_id,
                "date": date_label,
                "kind": kind,
                "member": member,
                "party": party,
                "topics": topics,
                "officialQuestionUrl": page_url,
            })

    return questions


def load_current_year(year: int) -> dict:
    identifier = year_id(year)
    path = ROOT / f"data/{identifier}.js"
    if not path.exists():
        return {"id": identifier, "label": year_label(year), "meetings": [], "questions": []}
    source = path.read_text(encoding="utf-8")
    marker = f'years["{identifier}"] = '
    start = source.index(marker) + len(marker)
    end = source.rfind("};") + 1
    return json.loads(source[start:end])


def page_candidates(slug: str, page_number: int, year: int) -> list[str]:
    if page_number == 1:
        suffixes = [slug, f"{slug}1"] if year == 1 else [f"{slug}1", slug]
    else:
        suffixes = [f"{slug}{page_number}"]
    return [f"{COUNCIL_BASE}{slug}/{suffix}" for suffix in suffixes]


def minutes_index(question_dates: Iterable[str], refresh: bool = False) -> dict[str, list[dict]]:
    by_date: dict[str, list[dict]] = defaultdict(list)
    # 年間検索は10件ごとにPOSTページングされるため、質問日単位で検索する。
    # 本会議の質問日は1日2文書程度なので、取りこぼさずGETだけで収集できる。
    for question_date in sorted(set(filter(None, question_dates))):
        url = (
            f"{MINUTES_BASE}?QueryType=new&Template=list&Cabinet=1"
            f"&TermStart={question_date}&TermEnd={question_date}"
        )
        soup = clean_soup(fetch(url, refresh))
        for item in soup.select(".result-document__item"):
            anchor = item.select_one('a[href*="Template=document"][href*="Id="]')
            date_node = item.select_one(".ans-title__date")
            if not anchor or not date_node:
                continue
            entry = {
                "title": compact(anchor.get_text(" ", strip=True)),
                "url": anchor.get("href"),
                "date": compact(date_node.get_text(" ", strip=True)),
            }
            by_date[entry["date"]].append(entry)
    return dict(by_date)


def iso_question_date(year: int, date_label: str) -> str:
    match = re.search(r"(\d+)月(\d+)日", date_label)
    if not match:
        return ""
    return date(western_year(year), int(match.group(1)), int(match.group(2))).isoformat()


def find_minutes_url(index: dict[str, list[dict]], iso_date: str) -> str:
    documents = index.get(iso_date, [])
    if not documents:
        return ""
    body = [item for item in documents if "本文" in item["title"]]
    named = [item for item in documents if "定例会" in item["title"] or "臨時会" in item["title"]]
    return (body or named or documents)[0]["url"]


def parse_minutes_voices(raw_html: str) -> list[dict]:
    soup = clean_soup(raw_html)
    speakers: dict[str, str] = {}
    for item in soup.select(".voicelist__item[data-voice_code]"):
        name = item.select_one(".speaker__name")
        if name:
            speakers[item.get("data-voice_code", "")] = compact(name.get_text(" ", strip=True))
    voices = []
    for node in soup.select(".voice-text[data-voice_code], .voice_text[data-voice_code]"):
        code = node.get("data-voice_code", "")
        text = compact(node.get_text(" ", strip=True))
        if text:
            voices.append({"code": code, "speaker": speakers.get(code, ""), "text": text})
    return voices


def question_start_score(voice: dict, topics: list[str]) -> float:
    text = voice.get("text", "")
    compact_text = normalized(text)
    score = min(len(text), 10000) / 100
    if "一般質問" in text or "代表質問" in text:
        score += 1000
    if "質問を行" in text or "質問いた" in text:
        score += 300
    if "提案理由" in text or "討論を行" in text:
        score -= 1000
    for topic in topics:
        for term in re.findall(r"[一-龠々ァ-ヶーぁ-んA-Za-z0-9]{2,}", topic):
            term = normalized(re.sub(r"について$", "", term))
            if len(term) >= 2 and term in compact_text:
                score += min(len(term), 20)
    return score


def attach_contexts(queue: list[dict], refresh: bool = False) -> None:
    groups: dict[str, list[dict]] = defaultdict(list)
    for item in queue:
        if item.get("minutesUrl"):
            groups[item["minutesUrl"]].append(item)

    for sequence, (url, items) in enumerate(groups.items(), start=1):
        print(f"  会議録 {sequence}/{len(groups)}: {url}")
        voices = parse_minutes_voices(fetch(url, refresh))
        starts: list[tuple[int, dict]] = []
        for item in items:
            target = normalized(item["member"])
            candidates = [
                (question_start_score(voice, item["topics"]), index)
                for index, voice in enumerate(voices)
                if target and target in normalized(voice["speaker"])
            ]
            found = max(candidates)[1] if candidates else None
            if found is None:
                # 質問通告後に取り下げられた場合、本人の発言はなく議長発言に氏名が残る。
                found = next((
                    index for index, voice in enumerate(voices)
                    if target and target in normalized(voice["text"]) and "取下げ" in voice["text"]
                ), None)
                if found is not None:
                    item["sourceStatus"] = "withdrawn"
                    item["summaryStatus"] = "complete"
                    item["qaSummaries"] = [{
                        "title": topic,
                        "question": "公式の発言事項には質問通告として掲載されていた項目です。",
                        "answer": "会議録には質問通告の取り下げが記録されており、この項目について本会議での質問・答弁は行われていません。",
                    } for topic in item["topics"]]
            if found is not None:
                starts.append((found, item))
        starts.sort(key=lambda pair: pair[0])

        for index, (start, item) in enumerate(starts):
            end = starts[index + 1][0] if index + 1 < len(starts) else len(voices)
            context_dir = OUT_DIR / "contexts" / item["yearId"]
            context_dir.mkdir(parents=True, exist_ok=True)
            filename = f"{item['meetingId']}-{item['questionIndex']:02d}-{item['memberId']}.txt"
            path = context_dir / filename
            lines = [
                f"出典: {url}",
                f"質問者: {item['member']}（{item['party']}）",
                "質問項目:",
                *[f"- {topic}" for topic in item["topics"]],
                "",
                "会議録抜粋:",
            ]
            for voice in voices[start:end]:
                lines.extend(["", f"【{voice['speaker'] or '発言者不明'}】", voice["text"]])
            path.write_text("\n".join(lines) + "\n", encoding="utf-8")
            item["contextPath"] = str(path.relative_to(ROOT))


def compare_topics(official: list[dict], current: list[dict]) -> list[dict]:
    mismatches = []
    for index, (left, right) in enumerate(zip(official, current)):
        if normalized(left.get("member", "")) != normalized(right.get("member", "")) or [
            normalized(topic) for topic in left.get("topics", [])
        ] != [normalized(topic) for topic in right.get("topics", [])]:
            mismatches.append({"index": index, "official": left, "current": right})
    if len(official) != len(current):
        mismatches.append({"length": {"official": len(official), "current": len(current)}})
    return mismatches


def prepare_year(year: int, refresh: bool = False) -> tuple[dict, list[dict]]:
    current = load_current_year(year)
    identifier = year_id(year)
    meetings: dict[str, dict] = {}
    all_bills: list[dict] = []
    all_petitions: list[dict] = []
    all_questions: list[dict] = []

    for kind, maximum in (("t", 4), ("r", 3)):
        for number in range(1, maximum + 1):
            if year == 0:
                # 平成30年ページは、フォルダー名に t/r がなく、本文ページ名に付く。
                folder = f"h30_{number:02d}"
                slug = f"h30_{number:02d}{kind}"
                meeting_id = f"h30-{number}{kind}"
                def candidates(page_number: int) -> list[str]:
                    suffix = slug if page_number == 1 else f"{slug}{page_number}"
                    return [f"{COUNCIL_BASE}{folder}/{suffix}"]
            else:
                slug = f"r{year:02d}_{number:02d}{kind}"
                meeting_id = f"r{year:02d}-{number}{kind}"
                def candidates(page_number: int) -> list[str]:
                    return page_candidates(slug, page_number, year)
            try:
                page1, page1_url = fetch_first(candidates(1), refresh)
            except Exception:
                continue
            bills, petitions = parse_proposals_and_petitions(page1, page1_url, meeting_id)
            questions: list[dict] = []
            page2_url = ""
            if kind == "t":
                try:
                    page2, page2_url = fetch_first(candidates(2), refresh)
                    questions = parse_questions(page2, meeting_id, page2_url)
                except Exception:
                    questions = []
            meetings[meeting_id] = {
                "slug": slug,
                "officialBillsUrl": page1_url,
                "officialQuestionsUrl": page2_url,
                "bills": bills,
                "petitions": petitions,
                "questions": questions,
            }
            all_bills.extend(bills)
            all_petitions.extend(petitions)
            all_questions.extend(questions)

    question_dates = [iso_question_date(year, item.get("date", "")) for item in all_questions]
    index = minutes_index(question_dates, refresh)
    current_questions = current.get("questions", [])
    current_meeting_ids = {item.get("id") for item in current.get("meetings", [])}
    official_meeting_ids = {
        meeting_id for meeting_id, item in meetings.items()
        if item["bills"] or item["petitions"] or item["questions"]
    }
    queue: list[dict] = []
    for question_index, question in enumerate(all_questions):
        current_match = current_questions[question_index] if question_index < len(current_questions) else {}
        iso_date = iso_question_date(year, question.get("date", ""))
        queue.append({
            "yearId": identifier,
            "yearLabel": current.get("label", year_label(year)),
            "meetingId": question["meetingId"],
            "questionIndex": question_index,
            "member": question["member"],
            "memberId": current_match.get("memberId", f"speaker-{question_index + 1:02d}"),
            "party": question["party"],
            "kind": question["kind"],
            "date": iso_date,
            "topics": question["topics"],
            "topicCount": len(question["topics"]),
            "officialQuestionUrl": question["officialQuestionUrl"],
            "minutesUrl": find_minutes_url(index, iso_date),
            "summaryStatus": "pending",
            "qaSummaries": [],
        })

    manifest = {
        "yearId": identifier,
        "yearLabel": current.get("label"),
        "official": {
            "meetings": len(meetings),
            "bills": len(all_bills),
            "petitions": len(all_petitions),
            "questioners": len(all_questions),
            "topics": sum(len(item.get("topics", [])) for item in all_questions),
        },
        "current": {
            "meetings": len(current.get("meetings", [])),
            "bills": len(current.get("bills", [])),
            "petitions": len(current.get("petitions", [])),
            "questioners": len(current_questions),
            "topics": sum(len(item.get("topics", [])) for item in current_questions),
            "qaSummaries": sum(len(item.get("qaSummaries", [])) for item in current_questions),
        },
        "gaps": {
            "bills": len(all_bills) - len(current.get("bills", [])),
            "petitions": len(all_petitions) - len(current.get("petitions", [])),
            "questioners": len(all_questions) - len(current_questions),
            "topics": sum(len(item.get("topics", [])) for item in all_questions)
            - sum(len(item.get("topics", [])) for item in current_questions),
            "qaSummaries": sum(len(item.get("topics", [])) for item in all_questions)
            - sum(len(item.get("qaSummaries", [])) for item in current_questions),
        },
        "questionMismatchCount": len(compare_topics(all_questions, current_questions)),
        "missingMeetingIds": sorted(official_meeting_ids - current_meeting_ids),
        "minutesMatched": sum(1 for item in queue if item["minutesUrl"]),
        "minutesMissing": sum(1 for item in queue if not item["minutesUrl"]),
    }

    payload = {
        "generatedAt": date.today().isoformat(),
        "year": manifest,
        "meetings": meetings,
        "bills": all_bills,
        "petitions": all_petitions,
        "questions": all_questions,
    }
    return payload, queue


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--years", nargs="+", type=int, default=list(range(7, 0, -1)))
    parser.add_argument("--refresh", action="store_true")
    parser.add_argument("--with-contexts", action="store_true")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifests = []
    queue: list[dict] = []
    for year in args.years:
        print(f"{year_label(year)}を収集中...")
        payload, year_queue = prepare_year(year, args.refresh)
        path = OUT_DIR / f"{year_id(year)}_official.json"
        path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        manifests.append(payload["year"])
        queue.extend(year_queue)
        print(json.dumps(payload["year"], ensure_ascii=False))

    if args.with_contexts:
        attach_contexts(queue, args.refresh)

    manifest_path = OUT_DIR / "manifest.json"
    queue_path = OUT_DIR / "qa_queue.json"
    manifest_path.write_text(json.dumps({
        "generatedAt": date.today().isoformat(),
        "years": manifests,
        "totals": {
            "officialBills": sum(item["official"]["bills"] for item in manifests),
            "currentBills": sum(item["current"]["bills"] for item in manifests),
            "officialPetitions": sum(item["official"]["petitions"] for item in manifests),
            "currentPetitions": sum(item["current"]["petitions"] for item in manifests),
            "questioners": sum(item["official"]["questioners"] for item in manifests),
            "topics": sum(item["official"]["topics"] for item in manifests),
            "qaSummariesRemaining": sum(item["gaps"]["qaSummaries"] for item in manifests),
        },
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    queue_path.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    batch_dir = OUT_DIR / "batches"
    batch_dir.mkdir(parents=True, exist_ok=True)
    for year in args.years:
        identifier = year_id(year)
        year_queue = [item for item in queue if item["yearId"] == identifier]
        (batch_dir / f"{identifier}.json").write_text(
            json.dumps(year_queue, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
    print(f"監査結果: {manifest_path.relative_to(ROOT)}")
    print(f"要約キュー: {queue_path.relative_to(ROOT)} ({len(queue)}名)")


if __name__ == "__main__":
    main()
