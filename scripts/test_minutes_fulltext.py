#!/usr/bin/env python3
"""会議録全文の書き出しが壊れていないかを、会議録なしで確かめる。

会議録検索システムへは手元から到達できないので、発言らしい並びを自分で作って
確かめる。見るのは次の3点。

1. 中身が同じなら書き換えない（履歴が壊れる一番の原因）
2. 抜粋の `voiceIndex` が全文の `i` と同じ発言を指す（ずれると別人の発言へ飛ぶ）
3. 行区切り扱いの文字を含む発言でも、書いて読み戻せる

    python3 scripts/test_minutes_fulltext.py
"""

from __future__ import annotations

import json
import sys
import tempfile
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import minutes_fulltext as mf
import prepare_committees as pc

FAILURES: list[str] = []


def check(name: str, condition: bool, detail: str = "") -> None:
    if condition:
        print(f"  ok   {name}")
    else:
        print(f"  NG   {name}")
        if detail:
            print(f"       {detail}")
        FAILURES.append(name)


def sample_voices() -> list[dict]:
    """委員会1回分に近い並び。委員長→委員→理事者→委員…と続く。"""
    return [
        {"speaker": "石田委員長", "text": "ただいまから災害・環境対策特別委員会を開会いたします。"},
        {"speaker": "石田委員長", "text": "気候変動適応法の改正を議題に供します。ご発言願います。"},
        {"speaker": "のだて委員", "text": "特別警戒アラートが発表された場合の熱中症対策本部会議について、構成員や役割を伺いたいと思います。"},
        {"speaker": "中西環境課長", "text": "構成員としましては、部長級の出席を予定しています。役割は関係各課の対応方針の決定です。"},
        {"speaker": "のだて委員", "text": "避暑シェルターの開設に向けて、薬局とどのように協議しているのか伺います。"},
        {"speaker": "中西環境課長", "text": "調剤薬局と待合スペースの活用について協議を進めており、年度内の開設を目指しています。"},
        {"speaker": "石田委員長", "text": "以上で本日の日程はすべて終了いたします。閉会いたします。"},
    ]


def payload_for(voices: list[dict], **overrides) -> dict:
    base = dict(
        date_iso="2024-05-15",
        title="2024年5月15日 災害・環境対策特別委員会",
        source_type="formal",
        source_url="https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?x=1",
        voices=voices,
        fetched_at="2026-08-14",
    )
    base.update(overrides)
    return mf.build_payload("r06-20240515-19", **base)


def test_write_once() -> None:
    """同じ会議録から作り直しても、ファイルを書き換えない。"""
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        first = mf.write_minutes_file(payload_for(sample_voices()), root)
        check("初回は書き込む", first is True)

        path = mf.minutes_path("r06-20240515-19", root)
        check("年ディレクトリの下に置く", path.parent.name == "r06", str(path))

        before = path.stat().st_mtime_ns
        time.sleep(0.01)
        # 取得日だけが変わった状態。ここで書き換わると、作り直しのたびに
        # 全ファイルが差分になり、Gitの履歴が一度で数百MB増える
        again = mf.write_minutes_file(payload_for(sample_voices(), fetched_at="2027-01-01"), root)
        check("取得日だけ違っても書き換えない", again is False)
        check("ファイルの更新時刻も動かない", path.stat().st_mtime_ns == before)
        check("取得日は最初のまま", mf.read_minutes_file(path)["fetchedAt"] == "2026-08-14",
              mf.read_minutes_file(path)["fetchedAt"])

        changed = sample_voices()
        changed[3]["text"] = "構成員としましては、部長級に加えて学識経験者の出席を予定しています。"
        wrote = mf.write_minutes_file(payload_for(changed, fetched_at="2027-01-01"), root)
        check("発言が変われば書き換える", wrote is True)
        check("書き換えたときは取得日も進む",
              mf.read_minutes_file(path)["fetchedAt"] == "2027-01-01")


def test_source_type_change_rewrites() -> None:
    """出典の種類が変われば書き換える。

    掲載する全文は正式会議録だけに絞っている（prepare_committees.py が
    formal 以外を書かない）。ただし書き出し側は種類を見ないので、
    校正原稿から正式会議録へ差し替わる場合に追随できることを確かめておく。
    """
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        mf.write_minutes_file(payload_for(sample_voices(), source_type="draft"), root)
        path = mf.minutes_path("r06-20240515-19", root)
        check("正式でない旨の注記が入る", "正式会議録ではない" in path.read_text(encoding="utf-8"))

        wrote = mf.write_minutes_file(payload_for(sample_voices(), source_type="formal"), root)
        check("正式会議録が来たら書き換える", wrote is True)
        check("正式会議録として記録される",
              mf.read_minutes_file(path)["sourceType"] == "formal")


def test_round_trip() -> None:
    """書いたものをそのまま読み戻せる。"""
    voices = sample_voices()
    # 行区切り扱いになる文字と、JSONで逃がす必要のある文字を混ぜる
    voices[2]["text"] = 'それでは「区の対応」について 伺います。<script>と"引用"と\\も含みます。 '
    payload = payload_for(voices)
    text = mf.render(payload)

    check("行区切り文字を生のまま書かない", " " not in text and " " not in text)
    parsed = mf.parse(text)
    check("読み戻せる", parsed is not None)
    # 前後の空白は落とす（末尾の行区切り文字も空白として落ちる）
    check("発言がそのまま戻る", parsed and parsed["voices"][2]["text"] == voices[2]["text"].strip(),
          parsed and repr(parsed["voices"][2]["text"]))
    check("文中の行区切り文字は残る", parsed and mf.LS in parsed["voices"][2]["text"])
    check("字数が発言の合計と一致する",
          parsed and parsed["characters"] == sum(len(v["text"]) for v in parsed["voices"]))
    check("壊れた中身は None を返す", mf.parse("registerMinutes({壊れている});") is None)


def test_voice_index_matches() -> None:
    """抜粋の voiceIndex が、全文の同じ発言を指す。"""
    voices = sample_voices()
    topics = pc.make_topics(voices, "r06-20240515-19")
    payload = payload_for(voices)
    by_number = {voice["i"]: voice for voice in payload["voices"]}

    exchanges = [item for topic in topics for item in topic["exchanges"]]
    check("抜粋が作れている", len(exchanges) >= 2, f"{len(exchanges)}件")
    for item in exchanges:
        voice = by_number.get(item["voiceIndex"])
        check(f"発言{item['voiceIndex']}を指す（{item['speaker']}）",
              voice is not None and voice["speaker"] == item["speaker"],
              f"全文側は {voice and voice['speaker']}")
        # 抜粋は原文から抜き出した文なので、原文に含まれていなければならない
        check(f"発言{item['voiceIndex']}の本文に抜粋が含まれる",
              voice is not None and item["question"][:12] in voice["text"],
              f"{item['question'][:30]} / {voice and voice['text'][:40]}")


def test_paths_and_prune() -> None:
    """パスの導出と、会議一覧から消えた全文の掃除。"""
    check("画面用のパスを導ける",
          mf.minutes_href("r06-20240515-19") == "data/minutes/r06/r06-20240515-19.js",
          mf.minutes_href("r06-20240515-19"))
    check("平成の年IDも扱える", mf.year_id_of("h13-20010518-5") == "h13")
    try:
        mf.year_id_of("2024-05-15-committee")
        check("形式の違う会議IDは弾く", False)
    except ValueError:
        check("形式の違う会議IDは弾く", True)

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        for session_id in ("r06-20240515-19", "r06-20240517-5"):
            mf.write_minutes_file(payload_for(sample_voices()) | {"id": session_id}, root)
        removed = mf.prune_missing({"r06-20240515-19"}, "r06", root)
        check("一覧から消えた全文を削除する", removed == ["r06-20240517-5"], str(removed))
        check("残すものは消さない", mf.minutes_path("r06-20240515-19", root).exists())


def test_generated_file_is_loadable() -> None:
    """書き出したファイルが、画面と同じ形で読み込める。"""
    text = mf.render(payload_for(sample_voices()))
    check("registerMinutes を呼ぶ形になっている",
          text.strip().endswith(");") and "window.SHINAGAWA_DB.registerMinutes(" in text)
    check("先頭に出典の注記が入る", text.startswith("/*"))
    # data/site.js が用意する受け皿と同じ形で読めるか（JSONとして妥当か）
    body = text[text.index("registerMinutes(") + len("registerMinutes("):text.rindex(");")]
    body = body.replace(mf.ESCAPED_LS, mf.LS).replace(mf.ESCAPED_PS, mf.PS)
    try:
        json.loads(body)
        check("引数がJSONとして妥当", True)
    except json.JSONDecodeError as error:
        check("引数がJSONとして妥当", False, str(error))


def main() -> int:
    tests = [value for name, value in sorted(globals().items()) if name.startswith("test_")]
    for test in tests:
        print(f"\n{test.__name__}")
        print(f"  {(test.__doc__ or '').strip().splitlines()[0]}")
        test()
    print()
    if FAILURES:
        print(f"失敗 {len(FAILURES)}件: {', '.join(FAILURES)}")
        return 1
    print("すべて通りました。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
