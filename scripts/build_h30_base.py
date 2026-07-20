#!/usr/bin/env python3
"""平成30年の年別ページ用ベースデータを公式収集結果から生成する。"""

from __future__ import annotations

import json
from collections import defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts/out/history"


def main() -> None:
    official = json.loads((OUT / "h30_official.json").read_text(encoding="utf-8"))
    queue = [
        item for item in json.loads((OUT / "qa_queue.json").read_text(encoding="utf-8"))
        if item.get("yearId") == "h30"
    ]
    by_meeting: dict[str, list[dict]] = defaultdict(list)
    for item in queue:
        by_meeting[item["meetingId"]].append(item)

    meetings = []
    for number in range(1, 5):
        meeting_id = f"h30-{number}t"
        questions = by_meeting.get(meeting_id, [])
        month_label = {
            1: "2月〜3月",
            2: "6月〜7月",
            3: "9月〜10月",
            4: "11月〜12月",
        }[number]
        question_count = len(questions)
        topic_count = sum(len(item.get("topics", [])) for item in questions)
        event_groups: dict[tuple[str, str], list[dict]] = defaultdict(list)
        for item in questions:
            event_groups[(item["date"], item.get("kind", "一般質問"))].append(item)
        events = []
        for (event_date, kind), members in sorted(event_groups.items()):
            names = "、".join(item["member"] for item in members)
            events.append({
                "date": f"{int(event_date[5:7])}月{int(event_date[8:10])}日",
                "title": kind,
                "description": f"質問者: {names}",
                "links": [{
                    "type": "official",
                    "label": "質問者・発言事項を見る",
                    "url": members[0]["officialQuestionUrl"],
                }, {
                    "type": "minutes",
                    "label": "公式会議録を読む",
                    "url": members[0]["minutesUrl"],
                }],
            })
        meetings.append({
            "id": meeting_id,
            "monthLabel": month_label,
            "name": f"平成30年第{number}回定例会",
            "type": "定例会",
            "summary": f"代表質問・一般質問{question_count}名、全{topic_count}項目の質問・答弁要約を掲載しています。",
            "links": [{
                "type": "official",
                "label": "本会議資料を見る",
                "url": official["meetings"][meeting_id]["officialBillsUrl"],
            }],
            "events": events,
            "stats": [
                {"value": f"{question_count}名", "label": "代表・一般質問者"},
                {"value": f"{topic_count}項目", "label": "質問項目"},
            ],
            "detailTitle": f"平成30年第{number}回定例会の詳細",
            "detailLead": "品川区議会公式ページと正式会議録から整理しています。",
            "questionsSection": {
                "title": "代表質問・一般質問（全項目・答弁要約）",
                "lead": f"公式掲載の{question_count}名・{topic_count}項目を省略せず掲載し、正式会議録から質問と答弁の要点をまとめています。",
            },
        })

    questions = [{
        "meetingId": item["meetingId"],
        "member": item["member"],
        "party": item["party"],
        "kind": item["kind"],
        "date": item["date"],
        "memberId": item["memberId"],
        "topics": item["topics"],
        "links": [{
            "type": "official",
            "label": "公式の発言事項を見る",
            "url": item["officialQuestionUrl"],
        }],
    } for item in queue]

    payload = {
        "id": "h30",
        "label": "平成30年",
        "updatedAt": date.today().isoformat(),
        "yearSummary": {
            "title": "平成30年（2018年）の本会議",
            "text": "第1回から第4回までの定例会について、公式掲載の代表質問・一般質問を全項目掲載し、正式会議録から質問と答弁の要点をまとめています。正確な内容は公式会議録も確認してください。",
        },
        "meetings": meetings,
        "bills": [],
        "petitions": [],
        "questions": questions,
    }
    source = (
        "// 品川区議会DB 平成30年データ（公式ページ・正式会議録から生成）\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };\n"
        f'window.SHINAGAWA_DB.years["h30"] = {json.dumps(payload, ensure_ascii=False, indent=2)};\n'
    )
    path = ROOT / "data/h30.js"
    path.write_text(source, encoding="utf-8")
    print(f"出力: {path.relative_to(ROOT)}（質問者{len(questions)}名）")


if __name__ == "__main__":
    main()
