#!/usr/bin/env python3
"""質問・答弁要約が共通ルールを満たしているか検査する。

会議録を遡って実装したり、新しい会議録から要約を足したりするたびに、
「何について質問したか」「何について答弁したか」が読み取れる形になっているかを
ここで確かめる。判定は `scripts/qa_summary.py` に集約している。

検査項目は3種類ある。

- **要修正**  文の途中で切れている、空、古い文言のまま、など。
  機械的に直せる（`scripts/repair_qa_summaries.py`）ので0件でなければならない。
  1件でもあると終了コード1で終わる。
- **要改善**  「〜についてお伺いします」だけで中身が入っていない、定型文のまま、など。
  会議録から取り直さないと直らない。件数を出すだけで、失敗にはしない。
- **品質**  文としては壊れていないが、発言をそのまま貼っただけで要約に
  なっていないもの。**0件は求めず、割合を基準値と比べて悪化だけを止める**。

なぜ品質の検査を分けているか
----------------------------

要修正が0件でも、要約として読めていないことがある。実際にそうなっていた。
要修正0件・要改善607件という表示のまま、委員会の質問の40.9%に話し言葉が残り、
本会議h15〜h29の46.1%が見出しの言い換えで終わっていた。形だけを見る検査は
「直したつもり」を通してしまう。だから割合を年ごとに記録して、悪化したら
落ちるようにしてある。

基準値（`scripts/qa_baseline.json`）
-----------------------------------

品質の割合は年ごとに記録してある。現状が良いという意味ではなく、**ここから
悪くしない**ための線。生成を直して良くなったら `--update-baseline` で
引き直す。良くなった値で線を引き直すので、一方向にしか動かない。

使い方:

    python3 scripts/check_qa_summaries.py                   # 全データを検査
    python3 scripts/check_qa_summaries.py --details         # 問題のある要約を表示
    python3 scripts/check_qa_summaries.py --by-year         # 年ごとの内訳を出す
    python3 scripts/check_qa_summaries.py --update-baseline # 改善後に基準値を引き直す
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
BASELINE_PATH = ROOT / "scripts" / "qa_baseline.json"
DECODER = json.JSONDecoder()

# 基準値と比べるときに許す悪化幅（ポイント）。
# 会議が数件増減するだけで割合はわずかに動くので、その分を吸収する。
TOLERANCE = 0.5

# 本会議は年によって作り方が違い、品質もそこで切り替わる。年ごとの数字だけでは
# 読みにくいので、まとめて表示するための区分を持つ。CIの判定は年ごとに行う。
PLENARY_BANDS = (
    ("h13-h14", "機械生成（語尾変換なし）"),
    ("h15-h29", "機械生成"),
    ("h30-r05", "バッチ要約"),
    ("r06-r07", "機械生成（バッチ未完了）"),
    ("r08-", "進行中"),
)


def year_order(year: str) -> tuple[int, int]:
    """h13→r08 の順に並べるための鍵。"""
    return (0 if year.startswith("h") else 1, int(year[1:]))


def plenary_band(year: str) -> str:
    """本会議の年を、作り方が同じ区間にまとめる。"""
    era, number = year[0], int(year[1:])
    if era == "h" and number <= 14:
        return "h13-h14"
    if era == "h" and number <= 29:
        return "h15-h29"
    if (era == "h" and number == 30) or (era == "r" and number <= 5):
        return "h30-r05"
    if era == "r" and number <= 7:
        return "r06-r07"
    return "r08-"


def payload(text: str, marker: str):
    """`marker` の直後の JSON 値を読む。見つからなければ None。"""
    index = text.find(marker)
    if index < 0:
        return None
    cursor = index + len(marker)
    while cursor < len(text) and text[cursor] not in "[{":
        if not text[cursor].isspace() and text[cursor] not in "=:":
            return None
        cursor += 1
    if cursor >= len(text):
        return None
    return DECODER.raw_decode(text, cursor)[0]


def records():
    """検査対象の要約を1件ずつ返す。

    返す辞書の `dataset` は委員会／本会議、`year` は h13〜r08。
    年ごとに割合を出すため、どちらも欠かさない。
    """
    for path in sorted(DATA.glob("*-committees-part-*.js")):
        year = path.name.split("-", 1)[0]
        value = payload(path.read_text(encoding="utf-8"), "push(...")
        for session in value or []:
            characters = (session.get("sourceMeta") or {}).get("characters") or 0
            for topic in session.get("topics") or []:
                for exchange in topic.get("exchanges") or []:
                    yield {
                        "source": path.name, "dataset": "委員会", "year": year,
                        "title": topic.get("title") or "",
                        "question": exchange.get("question") or "",
                        "answer": exchange.get("answer") or "",
                        "kind": exchange.get("kind") or "",
                        # 原文の字数は会議に1つなので、その会議の先頭の質疑にだけ載せる
                        "characters": characters,
                    }
                    characters = 0

    def plenary(path: Path, entries):
        year = path.name.split("-", 1)[0].removesuffix(".js")
        for entry in entries or []:
            for item in entry.get("qaSummaries") or []:
                yield {
                    "source": path.name, "dataset": "本会議", "year": year,
                    "title": item.get("title") or "",
                    "question": item.get("question") or "",
                    "answer": item.get("answer") or "",
                    # 本会議は kind を持たない。答弁を求める発言として扱う
                    "kind": "質問",
                    "characters": 0,
                }

    for path in sorted(DATA.glob("*-complete.js")):
        yield from plenary(path, payload(path.read_text(encoding="utf-8"), "const patches = "))
    for path in sorted(DATA.glob("[hr][0-9][0-9].js")):
        if "-" in path.name:
            continue
        year = payload(path.read_text(encoding="utf-8"), f'years["{path.stem}"] = ')
        yield from plenary(path, (year or {}).get("questions"))


def measure():
    """全データを走査して、年ごとの件数と品質の内訳を返す。"""
    blocking: Counter = Counter()
    advisory: Counter = Counter()
    by_file: dict[str, Counter] = defaultdict(Counter)
    examples: dict[str, list] = defaultdict(list)
    # (dataset, year) -> Counter。品質の内訳と、割合の分母をここに集める
    stats: dict[tuple[str, str], Counter] = defaultdict(Counter)

    for record in records():
        key = (record["dataset"], record["year"])
        counter = stats[key]
        counter["件数"] += 1
        counter["原文字数"] += record["characters"]
        counter["掲載字数"] += len(record["question"]) + len(record["answer"])
        # 答弁欠落の分母は「答弁を求める発言」だけ。意見・提案は混ぜない
        if record["kind"] not in qa.KINDS_WITHOUT_ANSWER:
            counter["要答弁"] += 1

        for field, problems in (
            ("質問", qa.check_question(record["question"])),
            ("答弁", qa.check_answer(record["answer"], record["kind"])),
        ):
            for problem in problems:
                name = f"{field}:{problem}"
                if problem in qa.BLOCKING_ISSUES:
                    blocking[name] += 1
                    by_file[record["source"]][name] += 1
                else:
                    advisory[name] += 1
                if len(examples[name]) < 5:
                    examples[name].append((
                        record["source"], record["title"],
                        record["question"] if field == "質問" else record["answer"],
                    ))

        for name in qa.check_quality(
            record["title"], record["question"], record["answer"], record["kind"]
        ):
            counter[name] += 1
            if len(examples[name]) < 5:
                text = record["answer"] if name.startswith("答弁") else record["question"]
                examples[name].append((record["source"], record["title"], text))

    return blocking, advisory, by_file, examples, stats


def rate(counter: Counter, name: str) -> float:
    """品質の項目を割合（％）にする。答弁の欠落だけ分母が違う。"""
    total = counter["要答弁"] if name == "答弁:答弁欠落" else counter["件数"]
    return round(100 * counter[name] / total, 1) if total else 0.0


def quality_names() -> list[str]:
    """品質の項目名を、表示順に返す。"""
    return ["質問:話し言葉", "質問:タイトル反復", "質問:語尾破綻",
            "答弁:答弁欠落", "答弁:話し言葉"]


def build_baseline(stats) -> dict:
    """いまの割合を、基準値として書き出せる形にする。"""
    out: dict = {}
    for (dataset, year), counter in stats.items():
        out.setdefault(dataset, {})[year] = {
            "件数": counter["件数"],
            **{name: rate(counter, name) for name in quality_names()},
        }
    return out


def load_baseline() -> dict:
    if not BASELINE_PATH.exists():
        return {}
    return json.loads(BASELINE_PATH.read_text(encoding="utf-8")).get("割合", {})


def regressions(stats, baseline) -> list[tuple[str, str, str, float, float]]:
    """基準値より悪化した (データ, 年, 項目, 現在, 基準) を返す。"""
    found = []
    for (dataset, year), counter in sorted(stats.items(), key=lambda kv: year_order(kv[0][1])):
        recorded = baseline.get(dataset, {}).get(year)
        if not recorded:
            continue
        for name in quality_names():
            before = recorded.get(name)
            if before is None:
                continue
            now = rate(counter, name)
            if now > before + TOLERANCE:
                found.append((dataset, year, name, now, before))
    return found


def print_by_year(stats) -> None:
    """年ごとの割合を出す。どこが悪いのかを絞り込むときに使う。"""
    for dataset in ("委員会", "本会議"):
        rows = sorted(
            ((year, counter) for (owner, year), counter in stats.items() if owner == dataset),
            key=lambda kv: year_order(kv[0]),
        )
        if not rows:
            continue
        print()
        print(f"■ {dataset}の年ごとの割合（％）")
        header = "  年     件数  " + "  ".join(f"{name.split(':')[1]:>8}" for name in quality_names())
        if dataset == "委員会":
            header += "   保持率"
        print(header)
        for year, counter in rows:
            line = f"  {year}  {counter['件数']:6,d}  "
            line += "  ".join(f"{rate(counter, name):8.1f}" for name in quality_names())
            if dataset == "委員会":
                kept = counter["原文字数"]
                line += f"  {100 * counter['掲載字数'] / kept:7.1f}" if kept else "        -"
            print(line)


def print_bands(stats) -> None:
    """本会議は作り方が年で切り替わるので、区間ごとにまとめて出す。"""
    grouped: dict[str, Counter] = defaultdict(Counter)
    for (dataset, year), counter in stats.items():
        if dataset != "本会議":
            continue
        grouped[plenary_band(year)].update(counter)
    if not grouped:
        return
    print()
    print("■ 本会議の区間別（作り方が切り替わる境目でまとめたもの）")
    print("  区間       件数  " + "  ".join(f"{name.split(':')[1]:>8}" for name in quality_names()))
    for band, note in PLENARY_BANDS:
        counter = grouped.get(band)
        if not counter:
            continue
        line = f"  {band:9} {counter['件数']:5,d}  "
        line += "  ".join(f"{rate(counter, name):8.1f}" for name in quality_names())
        print(f"{line}   {note}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--details", action="store_true", help="問題のある要約を表示する")
    parser.add_argument("--limit", type=int, default=5, help="--details で表示する件数（項目ごと）")
    parser.add_argument("--by-year", action="store_true", help="年ごとの割合を出す")
    parser.add_argument("--update-baseline", action="store_true",
                        help="いまの割合で基準値を引き直す（改善したときだけ使う）")
    args = parser.parse_args()

    blocking, advisory, by_file, examples, stats = measure()
    total = sum(counter["件数"] for counter in stats.values())

    print(f"検査した要約: {total:,}件")
    print()
    print("■ 要修正（0件でなければなりません）")
    if blocking:
        for key, count in blocking.most_common():
            reason = qa.ISSUES.get(key.split(":", 1)[1], "")
            print(f"  {key}: {count:,}件  — {reason}")
        print()
        print("  多いファイル:")
        for name, counter in sorted(by_file.items(), key=lambda kv: -sum(kv[1].values()))[:5]:
            print(f"    {name}: {sum(counter.values()):,}件")
        print()
        print("  `python3 scripts/repair_qa_summaries.py --write` で直せる場合があります。")
    else:
        print("  なし")

    print()
    print("■ 要改善（会議録からの取り直しが必要。失敗にはしません）")
    if advisory:
        for key, count in advisory.most_common():
            reason = qa.ISSUES.get(key.split(":", 1)[1], "")
            print(f"  {key}: {count:,}件 ({count / total * 100:.1f}%)  — {reason}")
    else:
        print("  なし")

    print()
    print("■ 品質（0件は求めません。基準値より悪化したら失敗します）")
    overall: Counter = Counter()
    for counter in stats.values():
        overall.update(counter)
    for name in quality_names():
        reason = qa.QUALITY_ISSUES.get(name.split(":", 1)[1], "")
        print(f"  {name}: {overall[name]:,}件 ({rate(overall, name):.1f}%)  — {reason}")

    print_bands(stats)
    if args.by_year:
        print_by_year(stats)

    if args.update_baseline:
        BASELINE_PATH.write_text(
            json.dumps({
                "説明": "品質の割合（％）の基準値。これより悪化すると検査が失敗する。"
                        "生成を直して改善したら --update-baseline で引き直す。",
                "許容幅": TOLERANCE,
                "割合": build_baseline(stats),
            }, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print()
        print(f"基準値を書き直しました: {BASELINE_PATH.relative_to(ROOT)}")
        return 1 if blocking else 0

    baseline = load_baseline()
    worse = regressions(stats, baseline) if baseline else []
    print()
    if not baseline:
        print("■ 基準値が未記録です。`--update-baseline` で作成してください。")
    elif worse:
        print("■ 悪化（基準値を超えました）")
        for dataset, year, name, now, before in worse:
            print(f"  {dataset} {year} {name}: {before:.1f}% → {now:.1f}%")
        print()
        print("  意図した変更なら `--update-baseline` で基準値を引き直してください。")
    else:
        print("■ 悪化なし（基準値以内）")

    if args.details:
        print()
        print("■ 例")
        for key in list(blocking) + list(advisory) + quality_names():
            if not examples[key]:
                continue
            print(f"\n--- {key} ---")
            for source, title, text in examples[key][:args.limit]:
                print(f"  [{source}] {title[:40]}")
                print(f"    {text[:150]}")

    return 1 if (blocking or worse) else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        # `| head` のように読み手が先に終わった場合。追跡情報は出さない。
        sys.stderr.close()
        sys.exit(0)
