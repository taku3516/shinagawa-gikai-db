#!/usr/bin/env python3
"""委員会の発言者名が、どこまで議員IDに解決できるかを実データで確かめる。

索引層（`data/<年>-committees-part-NN.js`）の `speaker` を会議の日付ごとに
拾い、`resolve_speaker` で議員IDに名寄せして、解決率と未解決の一覧を出す。

**索引層には `memberId` を入れない。** 入れると約370ファイルが差分になり容量も
約4.8MB増えるため、対応表だけを `data/speaker-members.js` に出す方式を採った
（`build_speaker_members.py`、32KB）。この検査はデータを1バイトも変えず、
その対応表を作れる状態が保たれているかを見る。

    python3 scripts/check_speaker_resolution.py            # 報告するだけ
    python3 scripts/check_speaker_resolution.py --strict   # 未解決があれば失敗（CIはこちら）

上書き表（`scripts/speaker-overrides.tsv`）に誤りがあるときは、`--strict` の
有無にかかわらず失敗する。手で書く表なので、打ち間違いを通すと、
別人の発言が議員ページに混ざったまま画面上は正常に見えてしまう。
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from resolve_speaker import OverrideError, Registry, load_overrides

ROOT = Path(__file__).resolve().parent.parent
OVERRIDES_PATH = ROOT / "scripts" / "speaker-overrides.tsv"

# 索引層は1ファイル400KB超が370本ある。JSONとして丸ごと読むと遅いので、
# 会議の日付と発言者だけを順に拾う。並びは必ず dateIso が先に来る。
FIELD_PATTERN = re.compile(r'"dateIso":"(\d{4}-\d{2}-\d{2})"|"speaker":"((?:[^"\\]|\\.)*)"')


def collect_pairs(data_dir: Path) -> dict[tuple[str, str, str], int]:
    """索引層から (年度ID, 会議の日付, 発言者名) と、その出現件数を集める。

    年度IDはファイル名の先頭（`r07-committees-part-01.js` なら `r07`）。
    会議の日付から導かず、ファイルの置かれ方に従う。年度の境目は暦年と
    ずれることがあり、導出すると索引層と食い違うため。
    """
    paths = sorted(data_dir.glob("*-committees-part-*.js"))
    if not paths:
        raise FileNotFoundError(f"{data_dir} に委員会の索引層が見つかりません")

    pairs: dict[tuple[str, str, str], int] = defaultdict(int)
    for path in paths:
        year = path.name.split("-", 1)[0]
        try:
            text = path.read_text(encoding="utf-8")
        except OSError as error:
            raise OSError(f"{path} を読めません: {error}") from error
        date: str | None = None
        for match in FIELD_PATTERN.finditer(text):
            if match.group(1) is not None:
                date = match.group(1)
                continue
            if date is None:
                # 会議の日付より前に発言者が出るのは索引層の作りが変わったとき。
                # 黙って捨てると解決率だけが下がって原因が分からなくなる。
                raise ValueError(f"{path}: dateIso より先に speaker が現れました")
            pairs[(year, date, match.group(2))] += 1
    return dict(pairs)


def main() -> int:
    parser = argparse.ArgumentParser(description="発言者名の名寄せ状況を確かめる")
    parser.add_argument("--strict", action="store_true",
                        help="未解決が1件でもあれば失敗する")
    parser.add_argument("--list", type=int, default=30,
                        help="未解決の一覧に出す発言者名の数（既定30）")
    args = parser.parse_args()

    try:
        overrides = load_overrides(OVERRIDES_PATH)
        registry = Registry.from_data_dir(ROOT, overrides=overrides)
        registry.validate_overrides()
    except (OverrideError, FileNotFoundError, ValueError) as error:
        print(f"名簿・上書き表を読めません:\n{error}")
        return 1

    print(f"上書き表: {len(overrides)}行（{OVERRIDES_PATH.relative_to(ROOT)}）")

    try:
        pairs = collect_pairs(ROOT / "data")
    except (OSError, ValueError) as error:
        print(f"索引層を読めません:\n{error}")
        return 1

    resolved = resolved_voices = 0
    by_override = 0
    total_voices = 0
    unresolved: dict[str, list[tuple[str, int, str, list[str]]]] = defaultdict(list)

    for (_year, date, speaker), count in pairs.items():
        total_voices += count
        result = registry.resolve(speaker, date)
        if result.member_id:
            resolved += 1
            resolved_voices += count
            if result.by_override:
                by_override += 1
            continue
        unresolved[speaker].append((date, count, result.reason, result.candidates))

    unresolved_voices = total_voices - resolved_voices
    print(f"\n(会議日, 発言者) {len(pairs):,}組  "
          f"解決 {resolved:,} ({resolved / len(pairs) * 100:.1f}%)"
          f"{f'  うち上書き表 {by_override:,}' if by_override else ''}")
    print(f"発言件数 {total_voices:,}  解決 {resolved_voices:,} "
          f"({resolved_voices / total_voices * 100:.2f}%)  未解決 {unresolved_voices:,}")

    if unresolved:
        print(f"\n── 未解決 {len(unresolved)}種類 ──")
        ranked = sorted(unresolved.items(),
                        key=lambda kv: sum(c for _, c, _, _ in kv[1]), reverse=True)
        for speaker, rows in ranked[:args.list]:
            voices = sum(count for _, count, _, _ in rows)
            dates = sorted(date for date, _, _, _ in rows)
            reason = rows[0][2]
            candidates = rows[0][3]
            print(f"  {speaker:<14} {voices:>5}件 {len(rows):>3}会議 "
                  f"{dates[0]}〜{dates[-1]}  {reason}"
                  f"{'  → ' + ' / '.join(candidates) if candidates else ''}")
        if len(ranked) > args.list:
            print(f"   …ほか {len(ranked) - args.list}種類")

    if args.strict and unresolved:
        print(f"\n未解決が {unresolved_voices:,}件 あります。"
              f"{OVERRIDES_PATH.relative_to(ROOT)} に追記してください。")
        return 1
    print("\n索引層は変更していません。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
