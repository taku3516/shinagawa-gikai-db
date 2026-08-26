#!/usr/bin/env python3
"""平成の年データに議案・請願陳情だけを追記する。

build_heisei_year.py は年ファイルを丸ごと作り直すため、精査済みの質問・答弁要約まで
書き換えてしまう。このスクリプトは既存ファイルを読み、bills / petitions と会議の見出しだけを
差し替えて書き戻す。質問・答弁要約や会議の記述には触れない。

使い方:
  python3 scripts/add_heisei_bills.py 20        # 平成20年
  python3 scripts/add_heisei_bills.py 14 29     # 平成14〜29年
  python3 scripts/add_heisei_bills.py 20 --dry-run   # 書き込まず件数だけ表示
"""
from __future__ import annotations

import argparse
import json
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from prepare_history import parse_proposals_and_petitions

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule"
UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> str | None:
    """資料ページを取得する。存在しない回は None を返す（平成13年など未掲載の年がある）。"""
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as response:
            return response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as error:
        if error.code == 404:
            return None
        raise


def load_year(year_id: str) -> tuple[dict, str]:
    """年データを読み込み、辞書と登録行の先頭部分を返す。"""
    path = ROOT / f"data/{year_id}.js"
    source = path.read_text(encoding="utf-8")
    marker = f'years["{year_id}"] = '
    head, body = source.split(marker, 1)
    return json.loads(body.rstrip().rstrip(";")), head + marker


def collect(heisei_year: int, dry_run: bool) -> bool:
    year_id = f"h{heisei_year}"
    path = ROOT / f"data/{year_id}.js"
    if not path.exists():
        print(f"{year_id}: データファイルがありません")
        return False

    data, head = load_year(year_id)
    known_meetings = {meeting["id"] for meeting in data.get("meetings", [])}

    bills: list[dict] = []
    petitions: list[dict] = []
    for session in range(1, 5):
        meeting_id = f"{year_id}-{session}t"
        url = f"{BASE}/{year_id}_{session:02d}/{year_id}_{session:02d}t"
        body = fetch(url)
        if body is None:
            print(f"  第{session}回: 資料ページが公開されていません")
            continue
        found_bills, found_petitions = parse_proposals_and_petitions(body, url, meeting_id)
        if meeting_id not in known_meetings:
            # 年データに無い回は、取り込んでも画面に出ないので入れない
            print(f"  第{session}回: 議案{len(found_bills)}件 請願陳情{len(found_petitions)}件"
                  f" → 会議 {meeting_id} が年データに無いため取り込まない")
            continue
        print(f"  第{session}回: 議案{len(found_bills)}件 請願陳情{len(found_petitions)}件")
        bills.extend(found_bills)
        petitions.extend(found_petitions)
        time.sleep(0.4)

    if not bills and not petitions:
        print(f"{year_id}: 取り込む件数が0件のため、ファイルは変更しない")
        return False

    data["bills"] = bills
    data["petitions"] = petitions
    # 件数が取れた回にだけ、全件掲載であることを示す見出しを付ける
    for meeting in data.get("meetings", []):
        bill_count = sum(1 for item in bills if item["meetingId"] == meeting["id"])
        petition_count = sum(1 for item in petitions if item["meetingId"] == meeting["id"])
        if bill_count:
            meeting["billsSection"] = {
                "title": "提出議案（全件）",
                "lead": f"公式ページ掲載の{bill_count}件を省略せず掲載しています。",
            }
        else:
            meeting.pop("billsSection", None)
        if petition_count:
            meeting["petitionsSection"] = {
                "title": "請願・陳情（全件）",
                "lead": f"公式ページ掲載の{petition_count}件を省略せず掲載しています。",
            }
        else:
            meeting.pop("petitionsSection", None)

    print(f"{year_id}: 合計 議案{len(bills)}件 請願陳情{len(petitions)}件")
    if dry_run:
        print(f"{year_id}: --dry-run のため書き込まない")
        return False

    path.write_text(head + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    print(f"{year_id}: 書き込み完了 {path.relative_to(ROOT)}")
    return True


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("start", type=int, help="開始する平成の年（例: 14）")
    parser.add_argument("end", type=int, nargs="?", help="終了する平成の年（省略時は開始年のみ）")
    parser.add_argument("--dry-run", action="store_true", help="書き込まずに件数だけ表示する")
    args = parser.parse_args()

    end = args.end if args.end is not None else args.start
    written = 0
    for heisei_year in range(args.start, end + 1):
        print(f"=== 平成{heisei_year}年 ===")
        if collect(heisei_year, args.dry_run):
            written += 1
    print(f"\n書き込んだ年: {written}年")


if __name__ == "__main__":
    main()
