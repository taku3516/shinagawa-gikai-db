#!/usr/bin/env python3
"""委員会の抜粋づくりが壊れていないかを、会議録なしで確かめる。

`prepare_committees.py` の入力は会議録検索システムの本文なので、手元では
動かせない。だが壊れ方はこれまで決まっていて、文の中から節を継ぎ足すことと、
語尾を第三者の言い方へ差し替えることの2つから出ていた。その2つが復活して
いないかは、発言らしい文字列を渡せば会議録なしで確かめられる。

置いている題材は、実際に公開データへ出ていたものを元にしている。

    python3 scripts/test_committee_excerpt.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import prepare_committees as pc
import qa_summary as qa

FAILURES: list[str] = []


def check(name: str, condition: bool, detail: str = "") -> None:
    if condition:
        print(f"  ok   {name}")
    else:
        print(f"  NG   {name}")
        if detail:
            print(f"       {detail}")
        FAILURES.append(name)


def question(text: str) -> str:
    return pc.concise_summary(text, pc.QUESTION_CUES, qa.QUESTION_LIMIT, "question")


def answer(text: str, limit: int = 130) -> str:
    return pc.concise_summary(text, pc.ANSWER_CUES, limit, "answer")


def test_keeps_the_sentence_that_carries_the_ask() -> None:
    """求めていることが書かれた文を落とさない。

    r07 を作り直したとき、質問529件がこの形で2文目を失った。残ったのは
    前置きだけで、何を求めたのかが読めなくなっていた。
    """
    speech = (
        "品川区は個別にどういうことをやっていくのかというのは、区民の方たちは、"
        "こういうふうにしていくのだということを納得してくださると思うのです。"
        "２３区の中でも取り組みが進んでいるところがあると聞いております。"
        "他区の事例も参考になるのではないかと考えているところです。"
        "我々が審議する前に具体的な数字として出していただきたい。"
        "また、進捗についても定期的に報告いただけるとありがたいと思っております。"
    )
    result = question(speech)
    check("求めている文が残る", "具体的な数字として出していただきたい" in result, f"→ {result}")


def test_no_clause_stitching() -> None:
    """文の中から節を抜き出して継ぎ足さない。

    継ぎ足すと原文に無い文ができる。抜き出した文はすべて、元の発言に
    そのまま含まれていなければならない。
    """
    speech = (
        "コンポストを置いていくことが難しい環境というのでしょうか、"
        "そういうこととの兼ね合いなのか、それをちょっとお伺いしたいと思います。"
        "品川ブランドとしてつくっていくのは難しいということなのでしょうか。"
    )
    result = question(speech)
    normalized = pc.clean_spoken_style(speech)
    for sentence in qa.sentences(result):
        check(
            f"抜粋の文が原文にある: {sentence[:24]}…",
            sentence in normalized,
            f"原文に無い文ができている → {sentence}",
        )


def test_no_reported_speech_rewriting() -> None:
    """語尾を「〜を求めました」へ差し替えない。

    差し替えると直前の助詞と噛み合わず、文末でない位置に付けると後ろに
    元の発言が残る。抜粋なので、発言の語尾のまま出す。
    """
    speech = (
        "その辺のところを分かっている限りで構わないので教えてください。"
        "西大井駅のトイレも改修してほしいと思いますが、いかがでしょうか。"
    )
    result = question(speech)
    for ending in qa.REPORTED_ENDINGS:
        check(f"「{ending}」を足していない", ending not in result, f"→ {result}")
    check("発言の語尾がそのまま残る", result.endswith("いかがでしょうか。"), f"→ {result}")
    check("語尾破綻がない", not qa.has_broken_ending(result), f"→ {result}")


def test_keeps_sentence_order() -> None:
    """抜き出した文は、原文に出てきた順に並べる。"""
    speech = (
        "１点目は保育園の待機児童についてです。"
        "２点目は学童クラブの定員についてお伺いします。"
        "３点目は児童センターの開館時間はどうなっているのでしょうか。"
    )
    result = question(speech)
    positions = [result.find(n) for n in ("１点目", "２点目", "３点目") if result.find(n) >= 0]
    check("原文の順序を保っている", positions == sorted(positions), f"→ {result}")


def test_stays_within_the_limit() -> None:
    """上限を超えない。超えるときも文として閉じる。"""
    speech = "".join(
        f"{n}番目の項目について、現在の取り組み状況と今後の方針をお伺いしたいと思います。"
        for n in range(1, 12)
    )
    result = question(speech)
    check("上限を超えない", len(result) <= qa.QUESTION_LIMIT, f"{len(result)}字 → {result[:60]}…")
    check("文として閉じている", qa.is_complete(result), f"→ {result[-30:]}")


def test_answer_keeps_whole_sentences() -> None:
    """答弁も節を継ぎ足さない。"""
    # 1文が上限を超える長さにする。以前はここで読点ごとに節を選び直していた
    speech = (
        "こども家庭庁より通知があった際には、毎月行われております保育園長会などでも"
        "取り上げて、各園の状況を確認しながら、必要に応じて個別にご説明をさせて"
        "いただいているところでございまして、今後も継続してまいります。"
        "ケースワーカーのほうにも、制度の変更点や運用上の留意事項について、"
        "研修の機会を通じて周知をしてまいりたいと考えてございます。"
    )
    result = answer(speech, limit=90)
    normalized = pc.clean_spoken_style(speech)
    for sentence in qa.sentences(result):
        check(
            f"答弁の文が原文にある: {sentence[:24]}…",
            sentence in normalized,
            f"原文に無い文ができている → {sentence}",
        )


def test_excerpt_style_allows_first_person_ending() -> None:
    """抜粋は「〜してください」で終わってよい（要約では直し損ね）。"""
    text = "その辺のところを分かっている限りで構わないので教えてください。"
    check("抜粋では一人称を問題にしない", "一人称" not in qa.check_question(text, qa.STYLE_EXCERPT))
    check("要約では一人称を問題にする", "一人称" in qa.check_question(text, qa.STYLE_SUMMARY))


def test_empty_input_is_empty() -> None:
    """中身が無ければ空を返す（作り話をしない）。"""
    check("空の発言は空", question("") == "")
    check("相づちだけの発言は空", question("はい。ありがとうございます。") == "")


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
