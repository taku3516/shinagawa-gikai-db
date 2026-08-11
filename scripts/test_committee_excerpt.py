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


def test_generated_output_passes_validate() -> None:
    """作ったものが validate() を通る。

    生成側の上限（qa.QUESTION_LIMIT）と validate() の上限がずれていると、
    156会議ぶんを取り直したあとの最後で落ちる。実際に落ちた——上限を 140 から
    190 に上げたとき、validate() に書いてあった 141 を直し忘れていた。
    ここで両者を突き合わせておけば、会議録を取りに行く前に分かる。

    題材はそのとき落ちた発言そのもの（186字）。
    """
    speech = (
        "最後に口頭で、パブリックコメントを受けての区のお考えを示されましたけれども、"
        "パブリックコメントの結果の公表に当たっては、パブリックコメントを受けて区としては"
        "こういうふうに取り組んでいきます、こういうふうなことを考えていますという区の見解"
        "というのですかね、この案のとおりでいきますという一言になってしまうと、"
        "そうかもしれないですけれども、そういった見解をつけるのでしょうか。"
    )
    generated = question(speech)
    check("上限より長い発言でも中身が出る", len(generated) > 140, f"{len(generated)}字")

    session = {
        "id": "test-session", "dateIso": f"{pc.YEAR}-01-20",
        "status": "正式会議録",
        "links": [{"type": "minutes", "label": "公式", "url": "https://example.invalid/"}],
        "topics": [{
            "id": "topic-01", "title": "テスト議題", "agenda": "テスト議題",
            "exchanges": [{
                "id": "exchange-001", "speaker": "テスト委員", "kind": "質問",
                "question": generated,
                "answer": answer("検討してまいりたいと考えてございます。", limit=qa.ANSWER_LIMIT),
                "respondent": "テスト課長",
            }],
        }],
    }
    try:
        pc.validate([session])
        check("validate() を通る", True)
    except AssertionError as error:
        check("validate() を通る", False, f"生成側と検査側の上限がずれている → {error}")


def test_excerpt_style_allows_first_person_ending() -> None:
    """抜粋は「〜してください」で終わってよい（要約では直し損ね）。"""
    text = "その辺のところを分かっている限りで構わないので教えてください。"
    check("抜粋では一人称を問題にしない", "一人称" not in qa.check_question(text, qa.STYLE_EXCERPT))
    check("要約では一人称を問題にする", "一人称" in qa.check_question(text, qa.STYLE_SUMMARY))


def test_empty_input_is_empty() -> None:
    """中身が無ければ空を返す（作り話をしない）。"""
    check("空の発言は空", question("") == "")
    check("相づちだけの発言は空", question("はい。ありがとうございます。") == "")


def test_answer_sentences_are_adjacent() -> None:
    """答弁は隣り合う文だけを採る。離れた文を並べない。

    r07 で「その中で、〜と認識しています。罹災証明書は個人の住家です。」という、
    関係のない2文が並ぶ抜粋ができていた。答弁は一続きの説明なので、点数の高い
    文を離れた位置から集めると話がつながらない。
    """
    # 間に長い文を挟む。以前は点数の高い文だけを拾っていたため、上限に入らない
    # 中の文が飛ばされ、離れた2文が並んだ抜粋になっていた
    speech = (
        "周りにまだ見舞金の申請等をされていない方がいらっしゃったらコールセンターへ"
        "とご案内していたので、遅れて申請される方もいると認識しています。"
        "本日お手元にお配りした一枚物の裏面をご覧いただきますと、そちらに全体の"
        "流れが書いてございますので、恐れ入りますがあわせてご覧いただければと"
        "存じますし、ご不明な点は個別にお申し出いただければ幸いに存じます。"
        "罹災証明書は個人の住家について発行するという扱いで対応してまいります。"
    )
    result = answer(speech, limit=130)
    picked = [sentence for sentence in qa.sentences(result)]
    normalized = qa.sentences(pc.clean_spoken_style(speech))
    # 抜き出した文が、原文の中で隣り合っていること
    positions = [normalized.index(sentence) for sentence in picked if sentence in normalized]
    check(
        "答弁の文が原文で隣り合っている",
        positions == list(range(min(positions), min(positions) + len(positions))),
        f"離れた位置の文が並んでいる: {positions} → {result}",
    )


def test_dangling_connective_pulls_in_what_it_refers_to() -> None:
    """先頭が前を受ける形なら、受ける文を前に足す。

    r08 で「ただ、車いすチャレンジにつきましては…」「ですから、区といたし
    ましても…」のように、逆接や帰結だけが宙に浮いた抜粋が出ていた。
    落とすと発言の位置づけが変わるので、受ける文のほうを足す。
    """
    # 受ける文（前）より点数の高い文を後ろに置く。点数だけで伸ばすと後ろを
    # 先に取り、受ける文が入らなくなって「ただ、」から始まる抜粋になる
    speech = (
        "定員につきましては、昨年の実績を踏まえて設定をしたところでございます。"
        "ただ、車いすチャレンジにつきましては、安全性の対応を検討し、"
        "まず今年は１２人で実施する予定です。"
        "その状況によっては、定員のところはまた考えていく必要があるかと思っております。"
    )
    result = answer(speech, limit=100)
    check("受ける文が前に付く", result.startswith("定員につきましては"), f"→ {result}")
    check("「ただ、」は残る", "ただ、車いすチャレンジ" in result, f"→ {result}")

    # 前の文が上限に入らないときは、落とさずそのまま出す（内容が変わるため）
    long_lead = "あ" * 200 + "。"
    kept = answer(long_lead + "ですから、区としては連携を進めてまいります。", limit=60)
    check("足せないときは逆接・帰結を落とさない", kept.startswith("ですから、"), f"→ {kept}")


def test_leading_connective_is_dropped() -> None:
    """受けるものが無くなった接続の語を、先頭から落とす。

    抜き出した先頭が「なお、」「その中で、」だと、前の文が無いまま話の途中から
    読まされる。落としても内容は変わらない語だけを対象にしている。
    """
    speech = (
        "なお、公園の設置につきましては、こちらは例外という説明をしております。"
        "基本は民間公衆喫煙所をベースに各地区で進めてまいる方針です。"
    )
    result = answer(speech, limit=130)
    check("先頭の「なお、」が落ちる", not result.startswith("なお、"), f"→ {result}")
    check("本文は残る", "公園の設置" in result, f"→ {result}")

    # 内容が変わる接続の語は落とさない
    kept = pc.drop_leading_connective("ただし、対象は世帯単位となります。")
    check("「ただし」は落とさない", kept.startswith("ただし、"), f"→ {kept}")


def test_voice_label_is_stripped() -> None:
    """発言本文に残る、画面用の連番と発言者ラベルを落とす。

    平成18年の作り直しが、9分かけて会議録を取り終えたあとに
    `validate` のアサーションで落ちた。連番が全角で入る年があり、
    半角しか見ていなかった。時刻（10:00）は消さない。
    """
    for given, want in (
        ("12: ○山田委員 その点について伺います。", "その点について伺います。"),
        ("１２：○山田委員 その点について伺います。", "その点について伺います。"),
        ("12：その点について伺います。", "その点について伺います。"),
        ("その点について伺います。", "その点について伺います。"),
    ):
        check(f"ラベルが落ちる: {given[:12]}…", pc.strip_voice_label(given) == want,
              f"→ {pc.strip_voice_label(given)}")
    for time_text in ("10:00から開催いたします。", "１０：００から開催いたします。"):
        check(f"時刻は消さない: {time_text[:8]}…", pc.strip_voice_label(time_text) == time_text,
              f"→ {pc.strip_voice_label(time_text)}")


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
