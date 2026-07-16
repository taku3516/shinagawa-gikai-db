#!/usr/bin/env python3
"""全件データと要約が揃った年度だけ rXX-complete.js を生成する。

prepare_history.py が生成した qa_queue.json の各項目に、topics と同じ順で
qaSummaries（title / question / answer）を入力してから実行する。未入力、件数違い、
公式データとの不一致、会議メタデータ不足が1件でもあれば出力しない。

実行例:
  python3 scripts/build_history_supplements.py --years 7
  python3 scripts/build_history_supplements.py --years 7 --write
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HISTORY_DIR = ROOT / "scripts/out/history"


def normalized(value: str) -> str:
    return re.sub(r"[\s　◯○・]", "", value or "").lower()


def load_current(year: int) -> dict:
    path = ROOT / f"data/r{year:02d}.js"
    source = path.read_text(encoding="utf-8")
    marker = f'years["r{year:02d}"] = '
    start = source.index(marker) + len(marker)
    return json.loads(source[start:source.rfind("};") + 1])


def js_json(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def validate_year(year: int, official: dict, queue: list[dict], current: dict) -> list[str]:
    year_id = f"r{year:02d}"
    errors: list[str] = []
    current_meeting_ids = {item.get("id") for item in current.get("meetings", [])}
    official_meeting_ids = {
        meeting_id for meeting_id, item in official["meetings"].items()
        if item["bills"] or item["petitions"] or item["questions"]
    }
    for meeting_id in sorted(official_meeting_ids - current_meeting_ids):
        errors.append(f"{meeting_id}: 現行データに会議メタデータがありません")

    current_questions = current.get("questions", [])
    if len(queue) != len(current_questions):
        errors.append(f"質問者数が不一致: queue={len(queue)} current={len(current_questions)}")

    for index, (item, current_question) in enumerate(zip(queue, current_questions)):
        prefix = f"質問者{index + 1} {item.get('member', '')}"
        if item.get("yearId") != year_id:
            errors.append(f"{prefix}: yearId が不一致")
        if item.get("meetingId") != current_question.get("meetingId"):
            errors.append(f"{prefix}: meetingId が不一致")
        if item.get("memberId") != current_question.get("memberId"):
            errors.append(f"{prefix}: memberId が不一致")
        topics = item.get("topics", [])
        current_topics = current_question.get("topics", [])
        if [normalized(x) for x in topics] != [normalized(x) for x in current_topics]:
            errors.append(f"{prefix}: 質問項目が現行データと不一致")
        summaries = item.get("qaSummaries", [])
        if len(summaries) != len(topics):
            errors.append(f"{prefix}: 要約 {len(summaries)}/{len(topics)}件")
            continue
        for topic_index, (topic, summary) in enumerate(zip(topics, summaries), start=1):
            if normalized(summary.get("title", "")) != normalized(topic):
                errors.append(f"{prefix} 項目{topic_index}: title が質問項目と不一致")
            if not summary.get("question", "").strip():
                errors.append(f"{prefix} 項目{topic_index}: question が空です")
            if not summary.get("answer", "").strip():
                errors.append(f"{prefix} 項目{topic_index}: answer が空です")
        if not item.get("minutesUrl"):
            errors.append(f"{prefix}: 公式会議録URLがありません")
    return errors


def build_js(year: int, official: dict, queue: list[dict]) -> str:
    year_id = f"r{year:02d}"
    question_patches = [{
        "meetingId": item["meetingId"],
        "memberId": item["memberId"],
        "topics": item["topics"],
        "qaSummaries": item["qaSummaries"],
        "officialQuestionUrl": item["officialQuestionUrl"],
        "minutesUrl": item["minutesUrl"],
    } for item in queue]

    return f'''/* 令和{year}年の全件表示用補足データ。prepare_history.py の監査を通過して生成。 */
(() => {{
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.{year_id};
  if (!year) throw new Error("令和{year}年データの読み込み後に {year_id}-complete.js を読み込んでください");

  year.bills = {js_json(official["bills"])};
  year.petitions = {js_json(official["petitions"])};

  const patches = {js_json(question_patches)};
  const patchMap = new Map(patches.map((item) => [`${{item.meetingId}}:${{item.memberId}}`, item]));
  year.questions = (year.questions || []).map((question) => {{
    const patch = patchMap.get(`${{question.meetingId}}:${{question.memberId}}`);
    if (!patch) return question;
    const links = (question.links || []).filter((link) => link.type !== "minutes");
    if (!links.some((link) => link.url === patch.officialQuestionUrl)) {{
      links.unshift({{ type: "official", label: "公式の発言事項を見る", url: patch.officialQuestionUrl }});
    }}
    links.push({{ type: "minutes", label: "公式会議録を読む", url: patch.minutesUrl }});
    return {{ ...question, topics: patch.topics, qaSummaries: patch.qaSummaries, links }};
  }});

  for (const meeting of year.meetings || []) {{
    const billCount = year.bills.filter((item) => item.meetingId === meeting.id).length;
    const petitionCount = year.petitions.filter((item) => item.meetingId === meeting.id).length;
    const meetingQuestions = year.questions.filter((item) => item.meetingId === meeting.id);
    const topicCount = meetingQuestions.reduce((sum, item) => sum + (item.topics || []).length, 0);
    if (billCount) meeting.billsSection = {{ title: "提出議案（全件）", lead: `公式ページ掲載の${{billCount}}件を省略せず掲載しています。` }};
    if (petitionCount) meeting.petitionsSection = {{ title: "請願・陳情（全件）", lead: `公式ページ掲載の${{petitionCount}}件を省略せず掲載しています。` }};
    if (topicCount) meeting.questionsSection = {{
      ...(meeting.questionsSection || {{}}),
      title: "代表質問・一般質問（全項目・答弁要約）",
      lead: `公式掲載の${{meetingQuestions.length}}名・${{topicCount}}項目を省略せず掲載し、正式会議録から質問と答弁の要点をまとめています。`
    }};
  }}
  year.updatedAt = "{date.today().isoformat()}";
}})();
'''


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--years", nargs="+", type=int, default=list(range(7, 0, -1)))
    parser.add_argument("--write", action="store_true", help="検証成功時に data/rXX-complete.js を出力")
    args = parser.parse_args()

    queue_path = HISTORY_DIR / "qa_queue.json"
    if not queue_path.exists():
        raise SystemExit("先に python3 scripts/prepare_history.py --with-contexts を実行してください")
    all_queue = json.loads(queue_path.read_text(encoding="utf-8"))
    failed = False
    prepared: list[tuple[int, dict, list[dict]]] = []

    for year in args.years:
        year_id = f"r{year:02d}"
        official_path = HISTORY_DIR / f"{year_id}_official.json"
        if not official_path.exists():
            print(f"{year_id}: 公式データがありません")
            failed = True
            continue
        official = json.loads(official_path.read_text(encoding="utf-8"))
        queue = [item for item in all_queue if item.get("yearId") == year_id]
        errors = validate_year(year, official, queue, load_current(year))
        if errors:
            failed = True
            print(f"{year_id}: 未完了（{len(errors)}件）")
            for error in errors[:12]:
                print(f"  - {error}")
            if len(errors) > 12:
                print(f"  - ほか {len(errors) - 12}件")
        else:
            print(f"{year_id}: 検証完了（質問者{len(queue)}名）")
            prepared.append((year, official, queue))

    if failed:
        print("未完了項目があるため、補足データは出力していません。")
        raise SystemExit(1)
    if args.write:
        for year, official, queue in prepared:
            path = ROOT / f"data/r{year:02d}-complete.js"
            path.write_text(build_js(year, official, queue), encoding="utf-8")
            print(f"出力: {path.relative_to(ROOT)}")
    else:
        print("検証のみ完了。出力する場合は --write を付けてください。")


if __name__ == "__main__":
    main()
