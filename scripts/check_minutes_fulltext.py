#!/usr/bin/env python3
"""公開している会議録全文を検査する。

抜粋（索引層）と全文（全文層）は別のファイルに分かれていて、更新のきっかけも
違う。片方だけ作り直したまま気づかない、という壊れ方をするので、両者が噛み
合っているかをここで見る。

見ているのは次の6点。

1. `hasFullText` の会議に全文ファイルがある（逆に、余っている全文がない）
2. 全文の字数が、抜粋側の `sourceMeta.characters` と一致する
3. 抜粋の `voiceIndex` が、全文の同じ発言者を指している
4. 発言者を取れていない発言が多すぎない（行の結合に失敗すると跳ね上がる）
5. 1ファイルが大きすぎない（画面が開いたときに一度で読む単位）
6. 全文が正式会議録のものだけになっている（校正原稿PDFは全文にしない）

    python3 scripts/check_minutes_fulltext.py
    python3 scripts/check_minutes_fulltext.py --year r06 --details
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import minutes_fulltext as mf
import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
DECODER = json.JSONDecoder()

# 1ファイルの上限。実測の最大は約446KB（平成14年3月11日 予算特別委員会）なので、
# 1MBを超えたら分割の要否を考える合図とする。
MAX_BYTES = 1_000_000

# 発言者を取れなかった発言の割合。正式会議録はほぼ0%、校正原稿PDFは行の
# 結合に失敗すると跳ね上がる。
MAX_UNNAMED_RATIO = 0.20


def year_id(value: str) -> str:
    """`--year` の指定を年ID（h13〜r08）に直す。

    ワークフローの入力は「2025 / r07 / 令和7 / h30 / 平成30」を許しているので、
    ここでも同じ書き方を受ける。読み方は共通ルール（qa_summary）に持たせてある。
    """
    if re.fullmatch(r"[hr]\d{2}", value):
        return value
    try:
        year = qa.western_year(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError(str(error)) from error
    return f"r{year - 2018:02d}" if year >= 2019 else f"h{year - 1988:02d}"


def sessions_of(path: Path) -> list[dict]:
    """索引層の分割ファイルから会議の並びを読む。"""
    text = path.read_text(encoding="utf-8")
    marker = "push(..."
    index = text.find(marker)
    if index < 0:
        return []
    return DECODER.raw_decode(text, index + len(marker))[0]


def index_sessions(year: str | None) -> list[tuple[str, dict]]:
    found = []
    for path in sorted(DATA.glob("*-committees-part-*.js")):
        file_year = path.name.split("-", 1)[0]
        if year and file_year != year:
            continue
        for session in sessions_of(path):
            found.append((file_year, session))
    return found


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--year", type=year_id,
                        help="2025 / r07 / 令和7 / h30 / 平成30。省略すると全年")
    parser.add_argument("--details", action="store_true", help="問題のある会議を並べる")
    parser.add_argument("--limit", type=int, default=10, help="--details で出す件数")
    args = parser.parse_args()

    sessions = index_sessions(args.year)
    if not sessions and args.year:
        print(f"{args.year} の委員会データが見つかりません")
        return 1

    problems: list[str] = []
    notes: list[str] = []
    stats = defaultdict(int)
    by_year_total = defaultdict(int)
    by_year_full = defaultdict(int)

    expected: set[str] = set()
    for year, session in sessions:
        session_id = session["id"]
        by_year_total[year] += 1
        if not session.get("hasFullText"):
            continue
        by_year_full[year] += 1
        expected.add(session_id)
        path = mf.minutes_path(session_id)
        minutes = mf.read_minutes_file(path)

        # 1. 置いてあるか、読めるか
        if minutes is None:
            problems.append(
                f"{session_id}: hasFullText なのに全文が読めません（{mf.minutes_href(session_id)}）")
            continue
        stats["会議"] += 1

        size = path.stat().st_size
        stats["バイト"] += size
        stats["発言"] += len(minutes.get("voices") or [])

        # 2. 抜粋側が記録している字数と一致するか
        recorded = (session.get("sourceMeta") or {}).get("characters")
        if recorded and minutes.get("characters") != recorded:
            problems.append(
                f"{session_id}: 字数が食い違います（全文 {minutes.get('characters')} / 抜粋側 {recorded}）")

        # 3. 抜粋の voiceIndex が同じ発言者を指しているか
        speakers = {voice["i"]: voice.get("speaker", "") for voice in minutes.get("voices") or []}
        for topic in session.get("topics") or []:
            for exchange in topic.get("exchanges") or []:
                number = exchange.get("voiceIndex")
                if not number:
                    # 全文を入れる前に作った抜粋。作り直せば付く
                    stats["voiceIndex無し"] += 1
                    continue
                if number not in speakers:
                    problems.append(
                        f"{session_id} {exchange['id']}: 発言{number}が全文にありません")
                elif speakers[number] != exchange.get("speaker"):
                    problems.append(
                        f"{session_id} {exchange['id']}: 発言{number}の発言者が違います"
                        f"（全文 {speakers[number]} / 抜粋 {exchange.get('speaker')}）")

        # 4. 発言者を取れていない発言の割合
        voices = minutes.get("voices") or []
        unnamed = sum(1 for voice in voices if not voice.get("speaker"))
        if voices and unnamed / len(voices) > MAX_UNNAMED_RATIO:
            problems.append(
                f"{session_id}: 発言者を取れていない発言が{unnamed}/{len(voices)}件"
                f"（{minutes.get('sourceType')}）")

        # 5. 1ファイルの大きさ
        if size > MAX_BYTES:
            problems.append(f"{session_id}: 全文ファイルが大きすぎます（{size:,}バイト）")

        # 6. 全文にしてよいのは正式会議録だけ。校正原稿PDFは行の結合が崩れる
        #    うえ、正式版の公開後に公式サイトから消えるため全文では載せない
        #    （prepare_committees.py の process_document）。
        if minutes.get("sourceType") != "formal":
            problems.append(
                f"{session_id}: 正式会議録でない全文が置かれています"
                f"（sourceType={minutes.get('sourceType')}）")

    # 余っている全文（会議一覧から消えたのに残っている）
    years = {year for year, _ in sessions}
    for year in sorted(years):
        directory = mf.MINUTES_ROOT / year
        if not directory.exists():
            continue
        for path in sorted(directory.glob("*.js")):
            if path.stem not in expected:
                problems.append(
                    f"{path.stem}: 会議一覧に無い全文が残っています（{path.relative_to(ROOT)}）")

    scope = args.year or "全年"
    print(f"■ 会議録全文の検査（{scope}）")
    print(f"  全文のある会議 : {stats['会議']:,} / {sum(by_year_total.values()):,}会議")
    if stats["会議"]:
        print(f"  発言           : {stats['発言']:,}件（平均 {stats['発言'] // stats['会議']}件/会議）")
        print(f"  容量           : {stats['バイト'] / 1024 / 1024:.1f} MB"
              f"（平均 {stats['バイト'] // stats['会議'] // 1024} KB/会議）")
    if stats["voiceIndex無し"]:
        notes.append(f"voiceIndex を持たない質疑が{stats['voiceIndex無し']:,}件あります"
                     "（全文を入れる前に作った抜粋。作り直すと付きます）")

    if not args.year:
        print("\n  年別:")
        for year in sorted(by_year_total):
            print(f"    {year}: {by_year_full[year]:>4} / {by_year_total[year]:>4}会議")

    for note in notes:
        print(f"\n  ※ {note}")

    if problems:
        print(f"\n■ 要対応 {len(problems)}件")
        for line in problems[:args.limit if args.details else 20]:
            print(f"  - {line}")
        if len(problems) > (args.limit if args.details else 20):
            print(f"  … 他{len(problems) - (args.limit if args.details else 20)}件")
        return 1

    print("\n問題は見つかりませんでした。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
