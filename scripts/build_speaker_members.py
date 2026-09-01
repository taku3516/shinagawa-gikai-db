#!/usr/bin/env python3
"""委員会の発言者名と議員IDの対応表（`data/speaker-members.js`）を作る。

索引層の `exchanges[].speaker` は「安藤委員」のような文字列で議員IDを持たない。
議員ごとに質疑を横断するにはIDが要るが、索引層そのものに `memberId` を足すと
`data/<年>-committees-part-NN.js` 約370本すべてが差分になる。そこで**対応表だけを
別ファイルに出す**。索引層は一切変更しない。

対応表は「発言者名 → この期間は誰」の区間で持つ。ある発言者名はある期間は
1人に対応する（「田中委員」は2023年4月の区議選を境に切り替わるだけ）ので、
26,434組をそのまま持つ必要がない。

**区間には終わりを持たせる。** 開始日だけだと最後の区間が未来永劫続く形になり、
落選して在職していない日にも自信ありげな答えを返してしまう（石田しんごは
2019〜2023年が落選期間で、この間の「石田（し）委員」は存在しない）。
実際に発言した日の外は答えない。

解決できなかった区間は `null` を入れる。落とすと、画面側で「対応表に無い＝
まだ生成していない」のか「特定できなかった」のか区別が付かなくなる。

    python3 scripts/build_speaker_members.py            # data/speaker-members.js を書く
    python3 scripts/build_speaker_members.py --check    # 書かずに差分の有無だけ見る
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from check_speaker_resolution import OVERRIDES_PATH, collect_pairs
from resolve_speaker import OverrideError, Registry, load_overrides

ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PATH = ROOT / "data" / "speaker-members.js"

HEADER = """\
/* 品川区議会DB データファイル（委員会の発言者名と議員IDの対応。自動生成）。
   scripts/build_speaker_members.py で作る。索引層は変更していない。

   speakerMembers[発言者名] = [[この日から, この日まで, 議員ID], ...]（日付の昇順）
   区間の端は、その発言者が実際に発言した日。**発言のない日は答えない**
   （落選中など、在職していない日に自信ありげな誤答を返さないため）。
   議員IDが null の区間は、同姓を絞れなかったなどで特定できなかったもの。
   scripts/speaker-overrides.tsv に書けば埋まる。 */
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.speakerMembers = """

MIDDLE = """;

/* memberQuestionIndex[議員ID] = { 年度ID: 質疑の件数 }
   議員ページから「この議員はどの年に質疑しているか」を、年データ（1年6MB）を
   読まずに出すための索引。年度IDは索引層のファイル名に合わせている。 */
window.SHINAGAWA_DB.memberQuestionIndex = """

FOOTER = """;
/* 発言者名と会議の日付から議員IDを引く。特定できていなければ null を返す。 */
window.SHINAGAWA_DB.resolveSpeakerMember = function (speaker, dateIso) {
  var spans = (window.SHINAGAWA_DB.speakerMembers || {})[speaker];
  if (!spans || !dateIso) return null;
  // 区間の外は答えない。表に無い日付は「特定できていない」ではなく「見ていない」。
  for (var i = 0; i < spans.length; i += 1) {
    if (spans[i][0] > dateIso) break;
    if (dateIso <= spans[i][1]) return spans[i][2];
  }
  return null;
};
"""


def build_spans(pairs: dict[tuple[str, str, str], int],
                registry: Registry) -> tuple[dict[str, list[list]], dict[str, int]]:
    """発言者名ごとに「この日から誰」の区切りを作る。

    同じ議員IDが続く区間はまとめる。まとめないと26,434行になり、
    まとめれば数百行で足りる。
    """
    dates_by_speaker: dict[str, list[str]] = defaultdict(list)
    voices_by_speaker: dict[str, int] = defaultdict(int)
    for (_year, date, speaker), count in pairs.items():
        dates_by_speaker[speaker].append(date)
        voices_by_speaker[speaker] += count

    spans: dict[str, list[list]] = {}
    stats = {"speakers": 0, "spans": 0, "unresolved_spans": 0,
             "resolved_voices": 0, "unresolved_voices": 0}
    for speaker, dates in sorted(dates_by_speaker.items()):
        rows: list[list] = []
        previous_key: tuple[str | None, int | None] | None = None
        for date in sorted(set(dates)):
            member_id = registry.resolve(speaker, date).member_id
            # 同じ議員でも任期が別なら区間を分ける。落選を挟んで返り咲いた
            # 議員（石田しんご）で、空白期間をまたいで繋がってしまうため。
            person = registry.by_id.get(member_id) if member_id else None
            key = (member_id, person.term_index(date) if person else None)
            if rows and previous_key == key:
                rows[-1][1] = date
                continue
            rows.append([date, date, member_id])
            previous_key = key
        spans[speaker] = rows
        stats["speakers"] += 1
        stats["spans"] += len(rows)
        stats["unresolved_spans"] += sum(1 for _, _, member_id in rows if member_id is None)

    for (_year, date, speaker), count in pairs.items():
        if registry.resolve(speaker, date).member_id:
            stats["resolved_voices"] += count
        else:
            stats["unresolved_voices"] += count
    return spans, stats


def build_member_index(pairs: dict[tuple[str, str, str], int],
                       registry: Registry) -> dict[str, dict[str, int]]:
    """議員ID → { 年度ID: 質疑の件数 }。特定できなかった分は数えない。"""
    index: dict[str, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    for (year, date, speaker), count in pairs.items():
        member_id = registry.resolve(speaker, date).member_id
        if not member_id:
            continue
        index[member_id][year] += count
    return {member_id: dict(sorted(years.items()))
            for member_id, years in sorted(index.items())}


def lookup(spans: dict[str, list[list]], speaker: str, date: str) -> str | None:
    """データファイルの resolveSpeakerMember と同じ引き当てをPython側でも行う。"""
    for start, end, member_id in spans.get(speaker, []):
        if start > date:
            break
        if date <= end:
            return member_id
    return None


def verify(pairs: dict[tuple[str, str, str], int], spans: dict[str, list[list]],
           registry: Registry) -> list[str]:
    """索引層に実在する全ての (日付, 発言者) で、表と判定器が一致するか見る。"""
    problems: list[str] = []
    for _year, date, speaker in pairs:
        expected = registry.resolve(speaker, date).member_id
        got = lookup(spans, speaker, date)
        if expected != got:
            problems.append(f"{date} {speaker}: 判定器={expected} 表={got}")
    return problems


def render(spans: dict[str, list[list]], member_index: dict[str, dict[str, int]]) -> str:
    """データファイルの中身を組み立てる。差分を安定させるためキーは昇順。"""
    dump = lambda value: json.dumps(value, ensure_ascii=False, sort_keys=True,
                                    separators=(",", ":"))
    return HEADER + dump(spans) + MIDDLE + dump(member_index) + FOOTER


def main() -> int:
    parser = argparse.ArgumentParser(description="発言者名と議員IDの対応表を作る")
    parser.add_argument("--check", action="store_true",
                        help="書き込まず、既存ファイルと差があるかだけ見る")
    args = parser.parse_args()

    try:
        overrides = load_overrides(OVERRIDES_PATH)
        registry = Registry.from_data_dir(ROOT, overrides=overrides)
        registry.validate_overrides()
        pairs = collect_pairs(ROOT / "data")
    except (OverrideError, FileNotFoundError, ValueError, OSError) as error:
        print(f"読み込みに失敗しました:\n{error}")
        return 1

    spans, stats = build_spans(pairs, registry)

    # 表と判定器がずれていないかを全件で確かめる。ずれたまま書き出すと、
    # 画面には出るのに誰も気づけない誤りになる。
    mismatched = verify(pairs, spans, registry)
    if mismatched:
        print(f"表と判定器が食い違っています（{len(mismatched)}件）:")
        for row in mismatched[:5]:
            print(f"  {row}")
        return 1

    member_index = build_member_index(pairs, registry)
    text = render(spans, member_index)

    total_voices = stats["resolved_voices"] + stats["unresolved_voices"]
    print(f"発言者名 {stats['speakers']:,}種類 → 区切り {stats['spans']:,}行"
          f"（うち特定できず {stats['unresolved_spans']:,}行）")
    print(f"発言件数 {total_voices:,}  特定 {stats['resolved_voices']:,} "
          f"({stats['resolved_voices'] / total_voices * 100:.2f}%)  "
          f"未特定 {stats['unresolved_voices']:,}")
    years_total = sum(len(years) for years in member_index.values())
    print(f"議員ごとの年度索引 {len(member_index):,}名 / {years_total:,}行")
    print(f"ファイル {len(text.encode('utf-8')) / 1024:.0f} KB")

    existing = OUTPUT_PATH.read_text(encoding="utf-8") if OUTPUT_PATH.exists() else None
    if existing == text:
        print(f"{OUTPUT_PATH.relative_to(ROOT)} は最新です。")
        return 0
    if args.check:
        print(f"{OUTPUT_PATH.relative_to(ROOT)} が古くなっています。"
              " 引数なしで実行すると作り直します。")
        return 1

    try:
        OUTPUT_PATH.write_text(text, encoding="utf-8")
    except OSError as error:
        print(f"{OUTPUT_PATH} に書けません: {error}")
        return 1
    print(f"{OUTPUT_PATH.relative_to(ROOT)} を書きました。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
