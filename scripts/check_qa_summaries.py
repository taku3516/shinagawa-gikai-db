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
- **量**  保持率と平均字数。**上下どちらに動きすぎても止める**。減る側を
  見ないと、本文を削るだけで品質の割合が下がってしまう（下記）。

なぜ品質の検査を分けているか
----------------------------

要修正が0件でも、要約として読めていないことがある。実際にそうなっていた。
要修正0件・要改善607件という表示のまま、委員会の質問の40.9%に話し言葉が残り、
本会議h15〜h29の46.1%が見出しの言い換えで終わっていた。形だけを見る検査は
「直したつもり」を通してしまう。だから割合を年ごとに記録して、悪化したら
落ちるようにしてある。

なぜ量も見るのか
----------------

品質の項目はすべて「悪さの割合」で、低いほど良い。これだけを見ていると、
**本文を削れば点数が上がる**。実際に起きた。r07 を作り直したとき、質問529件が
2文から1文になって35,115字が失われたにもかかわらず、話し言葉は33.3%→31.8%と
下がり、検査を通った。消えていたのは2文目——実際に何を求めたのかが書かれて
いる側だった。

そこで保持率と平均字数を基準値に入れ、**減る側も見る**ようにしてある。
悪さの割合は上限だけ、量は上下の両方。

基準値（`scripts/qa_baseline.json`）
-----------------------------------

品質の割合は年ごとに記録してある。現状が良いという意味ではなく、**ここから
悪くしない**ための線。生成を直して良くなったら `--update-baseline` で
引き直す。良くなった値で線を引き直すので、一方向にしか動かない。

使い方:

    python3 scripts/check_qa_summaries.py                   # 全データを検査
    python3 scripts/check_qa_summaries.py --details         # 問題のある要約を表示
    python3 scripts/check_qa_summaries.py --by-year         # 年ごとの内訳を出す
    python3 scripts/check_qa_summaries.py --year 2025 --details  # その年の実例と見本
    python3 scripts/check_qa_summaries.py --update-baseline # 改善後に基準値を引き直す

`--year` を付けると、実例をその年に絞ったうえで、問題の有無にかかわらず
掲載文そのものを何件か出す。作り直した年が読める文になっているかは、割合では
分からない。作り直しの流れ（`.github/workflows/rebuild-committees.yml`）は
ここで止まるとデータを捨てるので、判断に使う文はログに残しておく必要がある。
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

# 悪さの割合について、基準値と比べて許す悪化幅（ポイント）。
# 会議が数件増減するだけで割合はわずかに動くので、その分を吸収する。
TOLERANCE = 0.5

# 量について、基準値と比べて許す増減の幅（％）。
# 悪さの割合と違って上下どちらも見る。減る側を見ないと、本文を削るだけで
# 悪さの割合が下がり、内容が失われたのに「改善した」と読めてしまう。
VOLUME_TOLERANCE = 2.0

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


def year_id(value: str) -> str:
    """`--year` の指定を h13〜r08 の形にそろえる。

    作り直しの流れは西暦（2025）で年を受け取り、データは和暦（r07）で
    持っている。どちらで書いても通るようにして、指定を写し替える手間をなくす。
    """
    text = value.strip().lower()
    if not text:
        # argparse は文字列の既定値にも type を通す。指定なしはそのまま返す
        return ""
    if text.isdigit() and len(text) == 4:
        number = int(text)
        return f"r{number - 2018:02d}" if number >= 2019 else f"h{number - 1988:02d}"
    if text[:1] in ("h", "r") and text[1:].isdigit():
        return f"{text[0]}{int(text[1:]):02d}"
    raise argparse.ArgumentTypeError(f"年の指定が読めません: {value}（例: 2025 / r07 / h30）")


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
                        # 委員会は発言の抜粋を載せている。「〜してください」で
                        # 終わるのが正しい状態なので、一人称は問題としない
                        "style": qa.STYLE_EXCERPT,
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
                    # 本会議は第三者の言い方に直した要約を載せている
                    "style": qa.STYLE_SUMMARY,
                    "characters": 0,
                }

    for path in sorted(DATA.glob("*-complete.js")):
        yield from plenary(path, payload(path.read_text(encoding="utf-8"), "const patches = "))
    for path in sorted(DATA.glob("[hr][0-9][0-9].js")):
        if "-" in path.name:
            continue
        year = payload(path.read_text(encoding="utf-8"), f'years["{path.stem}"] = ')
        yield from plenary(path, (year or {}).get("questions"))


def measure(focus: str = "", limit: int = 5):
    """全データを走査して、年ごとの件数と品質の内訳を返す。

    `focus` に年（h13〜r08）を渡すと、**実例の収集だけ**をその年に絞る。
    数え上げと基準値の比較は全データのまま行う——年を絞ると、その年以外の
    悪化を見落とすため。実例は先に出会った順に溜まるので、絞らないと
    ファイル名の若い年（h13）で埋まり、作り直した年の文が1件も出てこない。

    `focus` を渡したときは、問題の有無にかかわらずその年の掲載文も集める。
    読める文になっているかは、悪い例だけを見ても分からない。
    """
    blocking: Counter = Counter()
    advisory: Counter = Counter()
    by_file: dict[str, Counter] = defaultdict(Counter)
    examples: dict[str, list] = defaultdict(list)
    # focus の年の掲載文。見本として何件か抜き出すために全件持つ
    focused: list[dict] = []
    # (dataset, year) -> Counter。品質の内訳と、割合の分母をここに集める
    stats: dict[tuple[str, str], Counter] = defaultdict(Counter)

    for record in records():
        in_focus = not focus or record["year"] == focus
        if focus and in_focus:
            focused.append(record)
        key = (record["dataset"], record["year"])
        counter = stats[key]
        counter["件数"] += 1
        counter["原文字数"] += record["characters"]
        counter["掲載字数"] += len(record["question"]) + len(record["answer"])
        counter["質問字数"] += len(record["question"])
        if not qa.is_no_answer(record["answer"]):
            # 答弁なしの定型文は本文ではないので、平均字数の材料にしない
            counter["答弁あり"] += 1
            counter["答弁字数"] += len(record["answer"])
        # 答弁欠落の分母は「答弁を求める発言」だけ。意見・提案は混ぜない
        if record["kind"] not in qa.KINDS_WITHOUT_ANSWER:
            counter["要答弁"] += 1

        for field, problems in (
            ("質問", qa.check_question(record["question"], record["style"])),
            ("答弁", qa.check_answer(record["answer"], record["kind"])),
        ):
            for problem in problems:
                name = f"{field}:{problem}"
                if problem in qa.BLOCKING_ISSUES:
                    blocking[name] += 1
                    by_file[record["source"]][name] += 1
                else:
                    advisory[name] += 1
                if in_focus and len(examples[name]) < limit:
                    examples[name].append((
                        record["source"], record["title"],
                        record["question"] if field == "質問" else record["answer"],
                    ))

        for name in qa.check_quality(
            record["title"], record["question"], record["answer"],
            record["kind"], record["style"],
        ):
            counter[name] += 1
            if in_focus and len(examples[name]) < limit:
                text = record["answer"] if name.startswith("答弁") else record["question"]
                examples[name].append((record["source"], record["title"], text))

    return blocking, advisory, by_file, examples, focused, stats


def rate(counter: Counter, name: str) -> float:
    """品質の項目を割合（％）にする。答弁の欠落だけ分母が違う。"""
    total = counter["要答弁"] if name == "答弁:答弁欠落" else counter["件数"]
    return round(100 * counter[name] / total, 1) if total else 0.0


def style_of(dataset: str) -> str:
    """データごとの掲載の仕方。委員会は抜粋、本会議は要約。"""
    return qa.STYLE_EXCERPT if dataset == "委員会" else qa.STYLE_SUMMARY


def quality_names(dataset: str = "") -> list[str]:
    """品質の項目名を、表示順に返す。

    掲載の仕方で見る項目が違う。抜粋（委員会）では話し言葉を見ない——
    発言そのままなので、口語が残っているのは正常な状態だから。
    """
    if not dataset:
        return list(qa.QUALITY_BY_STYLE[qa.STYLE_SUMMARY])
    return list(qa.QUALITY_BY_STYLE[style_of(dataset)])


def volume(counter: Counter, name: str) -> float:
    """量の項目を返す。基準値と比べて上下どちらの動きも見る。"""
    if name == "保持率":
        source = counter["原文字数"]
        return round(100 * counter["掲載字数"] / source, 1) if source else 0.0
    if name == "質問の平均字数":
        return round(counter["質問字数"] / counter["件数"], 1) if counter["件数"] else 0.0
    if name == "答弁の平均字数":
        # 答弁なしの定型文は本文ではないので、平均に混ぜない
        return round(counter["答弁字数"] / counter["答弁あり"], 1) if counter["答弁あり"] else 0.0
    raise KeyError(name)


def volume_names(counter: Counter) -> list[str]:
    """量の項目名を返す。保持率は原文の字数を持つ委員会だけ。"""
    names = ["質問の平均字数", "答弁の平均字数"]
    return (["保持率"] + names) if counter["原文字数"] else names


def build_baseline(stats) -> dict:
    """いまの値を、基準値として書き出せる形にする。"""
    out: dict = {}
    for (dataset, year), counter in stats.items():
        out.setdefault(dataset, {})[year] = {
            "件数": counter["件数"],
            **{name: rate(counter, name) for name in quality_names(dataset)},
            **{name: volume(counter, name) for name in volume_names(counter)},
        }
    return out


def load_baseline() -> dict:
    if not BASELINE_PATH.exists():
        return {}
    return json.loads(BASELINE_PATH.read_text(encoding="utf-8")).get("割合", {})


def regressions(stats, baseline) -> list[tuple[str, str, str, float, float, str]]:
    """基準値から外れた (データ, 年, 項目, 現在, 基準, 理由) を返す。

    項目によって見る向きが違う。

    - **悪さの割合**（話し言葉など）は上限だけ見る。下がるのは改善なので止めない
    - **量**（保持率・平均字数）は上下どちらも見る。**減る側を見ないと、
      本文を削るだけで悪さの割合が下がり、改善と誤判定される**。実際に起きた:
      r07 を作り直したとき、質問529件が2文から1文になって35,115字が失われた
      にもかかわらず、話し言葉は33.3%→31.8%と下がって検査を通った
    """
    found = []
    for (dataset, year), counter in sorted(stats.items(), key=lambda kv: year_order(kv[0][1])):
        recorded = baseline.get(dataset, {}).get(year)
        if not recorded:
            continue
        for name in quality_names(dataset):
            before = recorded.get(name)
            if before is None:
                continue
            now = rate(counter, name)
            if now > before + TOLERANCE:
                found.append((dataset, year, name, now, before, "悪化"))
        for name in volume_names(counter):
            before = recorded.get(name)
            if not before:
                continue
            now = volume(counter, name)
            allowed = before * VOLUME_TOLERANCE / 100
            if now < before - allowed:
                found.append((dataset, year, name, now, before, "減りすぎ"))
            elif now > before + allowed:
                found.append((dataset, year, name, now, before, "増えすぎ"))
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
        names = quality_names(dataset)
        print()
        note = "（抜粋なので話し言葉は見ません）" if dataset == "委員会" else ""
        print(f"■ {dataset}の年ごとの割合（％）{note}")
        header = "  年     件数  " + "  ".join(f"{name.split(':')[1]:>8}" for name in names)
        if dataset == "委員会":
            header += "   保持率"
        print(header)
        for year, counter in rows:
            line = f"  {year}  {counter['件数']:6,d}  "
            line += "  ".join(f"{rate(counter, name):8.1f}" for name in names)
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


def print_samples(focused: list[dict], year: str, count: int) -> None:
    """その年の掲載文を、間隔を空けて何件か全文で出す。

    悪い例だけを並べても、直した結果が読める文になったかは分からない。
    先頭から順に取ると同じ会議の同じ話題ばかりになるので、全体から等間隔で
    抜く。文は切り詰めない——上限（質問190字・答弁240字）まで見て判断する。
    """
    if not focused:
        print()
        print(f"■ {year} の掲載文は見つかりませんでした")
        return
    step = max(1, len(focused) // count)
    picked = focused[::step][:count]
    print()
    print(f"■ {year} の掲載文（{len(focused):,}件から{len(picked)}件・全文）")
    for record in picked:
        print()
        print(f"  [{record['dataset']}／{record['source']}] {record['title']}")
        print(f"    質問  {record['question']}")
        print(f"    答弁  {record['answer']}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--details", action="store_true", help="問題のある要約を表示する")
    parser.add_argument("--limit", type=int, default=5, help="--details で表示する件数（項目ごと）")
    parser.add_argument("--by-year", action="store_true", help="年ごとの割合を出す")
    parser.add_argument("--year", type=year_id, default="",
                        help="実例と見本をこの年に絞る（例: 2025 / r07）。検査自体は全データのまま")
    parser.add_argument("--update-baseline", action="store_true",
                        help="いまの割合で基準値を引き直す（改善したときだけ使う）")
    args = parser.parse_args()

    blocking, advisory, by_file, examples, focused, stats = measure(args.year, args.limit)
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
    for dataset in ("委員会", "本会議"):
        totals: Counter = Counter()
        for (owner, _), counter in stats.items():
            if owner == dataset:
                totals.update(counter)
        if not totals["件数"]:
            continue
        note = "（抜粋）" if dataset == "委員会" else "（要約）"
        print(f"  {dataset}{note}")
        for name in quality_names(dataset):
            reason = qa.QUALITY_ISSUES.get(name.split(":", 1)[1], "")
            print(f"    {name}: {totals[name]:,}件 ({rate(totals, name):.1f}%)  — {reason}")

    print()
    print("■ 量（上下どちらに動きすぎても失敗します）")
    for name in volume_names(overall):
        unit = "" if "字数" in name else "%"
        print(f"  {name}: {volume(overall, name):.1f}{unit}")

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
        print("■ 基準値から外れました")
        for dataset, year, name, now, before, reason in worse:
            unit = "" if "字数" in name else "%"
            print(f"  {dataset} {year} {name}［{reason}］: {before:.1f}{unit} → {now:.1f}{unit}")
        print()
        print("  意図した変更なら `--update-baseline` で基準値を引き直してください。")
    else:
        print("■ 悪化なし（基準値以内）")

    if args.details:
        print()
        print(f"■ 例{f'（{args.year}のみ）' if args.year else ''}")
        for key in list(blocking) + list(advisory) + quality_names():
            if not examples[key]:
                continue
            print(f"\n--- {key} ---")
            for source, title, text in examples[key][:args.limit]:
                print(f"  [{source}] {title[:40]}")
                print(f"    {text[:150]}")
        if args.year:
            print_samples(focused, args.year, args.limit)

    return 1 if (blocking or worse) else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except BrokenPipeError:
        # `| head` のように読み手が先に終わった場合。追跡情報は出さない。
        sys.stderr.close()
        sys.exit(0)
