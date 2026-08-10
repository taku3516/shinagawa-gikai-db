#!/usr/bin/env python3
"""質問・答弁要約の共通ルール。

会議録から作る要約は、次の3つの場面で同じ形になっている必要がある。

1. 生成    `scripts/prepare_committees.py`（委員会質疑）ほか
2. 修復    `scripts/repair_qa_summaries.py`（すでに書き出したデータの手当て）
3. 検査    `scripts/check_qa_summaries.py`（公開前・変更時の確認）

ルールを3か所に書くと必ずずれるため、判定と整形はこのモジュールに集約する。
文章の書き方そのものは docs/qa-summary-rules.md にまとめている。

要約が満たすべきこと:

- **何について述べたのかが分かる**。文の途中で切れていない
- **答弁が無いことと、答弁を取りこぼしたことを混ぜない**。
  意見・要望のように答弁を伴わない発言と、答弁があるはずなのに拾えていない
  発言は、別の文言で区別する
"""

from __future__ import annotations

import re

# 文の区切り。全角の句点・感嘆符・疑問符を文末とみなす。
SENTENCE_END = "。！？"

# 答弁が無いときの文言。発言の種類で使い分ける。
#   意見・提案・要望 … 答弁を求めていないので「無い」ことが自然な状態
#   質問・確認       … 答弁があるはずなので、拾えていない可能性を明示する
NO_ANSWER_NOT_EXPECTED = "答弁を求める発言ではないため、これに対する答弁はありません。"
NO_ANSWER_MISSING = "この発言に対する答弁を会議録から特定できませんでした。会議録の全文をご確認ください。"

# これまで使っていた文言。修復の対象として残しておく。
LEGACY_NO_ANSWER = "この発言に対する個別の答弁・回答は、会議録に記録されていません。"
LEGACY_FULL_TEXT = "答弁の全文は会議録を参照してください。"

# 答弁を求めていない発言の種類
KINDS_WITHOUT_ANSWER = ("意見", "提案")

# 掲載の仕方。項目によって、同じ文が問題にも正常にもなる。
#
#   要約 … 第三者の言い方に直したもの（本会議のバッチ要約）。
#          「〜してください」で終わっていたら直し損ねている
#   抜粋 … 発言をそのまま切り出したもの（委員会）。
#          「〜してください」で終わるのが正しい状態で、直す対象ではない
STYLE_SUMMARY = "要約"
STYLE_EXCERPT = "抜粋"

# 要約の長さの上限
QUESTION_LIMIT = 190
ANSWER_LIMIT = 240


def western_year(value: str) -> int:
    """年の指定を西暦に直す。西暦でも和暦でも受ける。

        2025 / r07 / r7 / 令和7 / 令和元 / h30 / 平成30

    作り直しは1年ずつ手で流し、同じ指定を生成側（`prepare_committees.py`）と
    検査側（`check_qa_summaries.py`）の両方に渡す。片方だけが受ける書き方が
    あると、生成が終わったあとの検査で落ちる。だから読み方はここに1つ置く。

    数字だけの和暦（「7」）は平成とも令和とも取れるので受けない。実際に「7」で
    落ちて1往復無駄になったが、勝手にどちらかへ寄せるほうが危ない。
    """
    text = value.strip().translate(str.maketrans("０１２３４５６７８９", "0123456789"))
    if text.isdigit() and len(text) == 4:
        return int(text)
    match = re.fullmatch(r"(?:令和|reiwa|r)\s*(元|\d{1,2})", text, re.IGNORECASE)
    if match:
        return 2018 + (1 if match[1] == "元" else int(match[1]))
    match = re.fullmatch(r"(?:平成|heisei|h)\s*(元|\d{1,2})", text, re.IGNORECASE)
    if match:
        return 1988 + (1 if match[1] == "元" else int(match[1]))
    raise ValueError(f"年の指定が読めません: {value}（例: 2025 / r07 / 令和7 / h30 / 平成30）")


def year_id(value: str) -> str:
    """年の指定を、データが使う h13〜r08 の形に直す。"""
    year = western_year(value)
    return f"r{year - 2018:02d}" if year >= 2019 else f"h{year - 1988:02d}"

# 間接話法の語尾（この形で終わっていれば、第三者の要約として完結している）
REPORTED_ENDINGS = (
    "述べました", "求めました", "尋ねました", "確認しました", "提案しました",
    "説明しました", "答えました", "示しました", "質問しました", "指摘しました",
)


def compact(value: str) -> str:
    """連続する空白を1つに詰める。"""
    return re.sub(r"\s+", " ", str(value or "")).strip()


def sentences(text: str) -> list[str]:
    """文末記号で区切った文の一覧を返す（記号は各文に残す）。"""
    parts = re.split(rf"(?<=[{SENTENCE_END}])", compact(text))
    return [part.strip() for part in parts if part.strip()]


def is_complete(text: str) -> bool:
    """要約として文が完結しているか。"""
    text = compact(text)
    if not text:
        return False
    if text.endswith("…"):
        return False
    return text[-1] in SENTENCE_END


def restore_reported_ending(text: str) -> str:
    """切り詰めで欠けた間接話法の語尾を補う。

    「…との意見を述べまし…」のように、要約の語尾を付けたあとで文字数を切ったため
    語尾自体が欠けているものがある。欠けているのが語尾の一部だけなら、元の語尾は
    一意に定まるので補う（本文を推測して足すわけではない）。
    """
    body = compact(text).rstrip("…")
    if not body or body[-1] in SENTENCE_END:
        return compact(text)
    for ending in REPORTED_ENDINGS:
        # 語尾の一部（2文字以上）で終わっていれば、その語尾だったとみなす
        for length in range(len(ending) - 1, 1, -1):
            if body.endswith(ending[:length]):
                return body[: -length] + ending + "。"
    return compact(text)


def finish(text: str, limit: int) -> str:
    """上限に収まる範囲で、最後の完結した文までを返す。

    途中で切って「…」を付けると、何について述べたのかが読み取れなくなる。
    そのため語の途中では切らず、必ず文の区切りで終える。末尾に残った未完結の
    断片は落とす。

    完結した文が1つも取れない場合は、まず欠けた語尾の復元を試し、それでも
    駄目なら読点で区切って「〜。」で閉じる。いずれもできなければ空文字を返し、
    扱いは呼び出し側に委ねる。
    """
    text = compact(text)
    if not text:
        return ""

    kept: list[str] = []
    length = 0
    for sentence in sentences(text):
        if not sentence or sentence[-1] not in SENTENCE_END:
            break  # 末尾の未完結な断片。ここで打ち切る
        if kept and length + len(sentence) > limit:
            break
        kept.append(sentence)
        length += len(sentence)
        if length >= limit:
            break
    if kept:
        joined = "".join(kept)
        if len(joined) <= limit:
            return joined
        # 1文だけで上限を超えている。文字数で切ると語の途中で終わるため、
        # 下の読点で閉じる処理に任せる。
        text = kept[0]

    restored = restore_reported_ending(text)
    if is_complete(restored) and len(restored) <= limit:
        return restored

    # 1文が上限より長い。読点で区切れる位置まで戻して文として閉じる。
    head = text.rstrip("…")[:limit]
    comma = max(head.rfind("、"), head.rfind("，"))
    if comma >= min(30, limit // 2):
        return head[:comma].rstrip("、， ") + "。"
    return ""


# 答弁の頭に残りやすい進行上の前置き。中身を伝えないので落とす。
ANSWER_LEAD_FILLER = re.compile(
    r"^区側は、(?:(?:初めに|はじめに|まず|まずは|次に|続いて|第一に|最初に)、?)+"
)


def strip_answer_lead(text: str) -> str:
    """「区側は、まず初めに、〜」の前置きを落として「区側は、〜」にする。

    何について答えたのかは、その後ろの本文にある。前置きが長いと、限られた
    文字数を中身の無い語で使ってしまう。
    """
    value = compact(text)
    replaced = ANSWER_LEAD_FILLER.sub("区側は、", value)
    # 「区側は、、」のような重複を整える
    return re.sub(r"区側は、[、 ]+", "区側は、", replaced)


def has_broken_head(text: str) -> bool:
    """「区側は、ィーゼル車」のように語の先頭が欠けていないか。

    小書き仮名や長音記号で語が始まることは通常ないため、
    切り出しで先頭が落ちた印とみなす。復元はできないので検査だけ行う。
    """
    body = re.sub(r"^区側は、", "", compact(text))
    return bool(body) and body[0] in "ァィゥェォャュョッーヮヵヶ"


def restore_broken_head(text: str) -> str:
    """先頭が欠けた語を、同じ文の中に完全な形があれば復元する。

    「区側は、ィーゼル車に関して…ディーゼル車は三十台でございます。」のように、
    同じ答弁の後ろに完全な語が出てくることがある。その場合にかぎり、欠けた
    文字を補う（文中の実例に基づくので、推測で足すわけではない）。
    """
    value = compact(text)
    match = re.match(r"^(区側は、)([ァィゥェォャュョッーヮヵヶ][ァ-ヶー]*)", value)
    if not match:
        return value
    prefix, fragment = match.group(1), match.group(2)
    found = re.search(r"([ァ-ヶ])" + re.escape(fragment), value[len(match.group(0)):])
    if not found:
        return value
    return prefix + found.group(1) + value[len(prefix):]


# 委員の発言をそのまま残してしまう語尾と、第三者の要約としての言い換え。
# docs/qa-summary-rules.md の変換表と対応する。
#
# 言い換えは**動詞の形のまま**行い、「〜の説明」のような名詞句にはしない。
# 名詞句にすると直前の助詞が「の」でなければ通らなくなり、「その辺を説明を求めました」
# のような重複が生まれる。動詞のままなら「その辺を説明するよう求めました」となり、
# 「を」「は」「が」のどれが前に来ても文が壊れない。
_PLEASE = r"(?:ください|下さい)[。！？]?$"
QUESTION_ENDING_FIXES = (
    (re.compile(r"[、 ]*(?:お答え|答えて|ご答弁|答弁して)" + _PLEASE), "答えるよう求めました。"),
    (re.compile(r"[、 ]*(?:お示し|示して|お知らせ|知らせて)" + _PLEASE), "示すよう求めました。"),
    (re.compile(r"[、 ]*(?:ご検討|検討して)" + _PLEASE), "検討を求めました。"),
    (re.compile(r"(?:お?聞かせて?|お?教えて?|ご説明|説明して|説明)を?(?:おいて)?" + _PLEASE),
     "説明するよう求めました。"),
    # 「〜させてください」型。何をさせてほしいのかで語尾を分ける
    (re.compile(r"(?:お伺い|伺い|伺|お尋ね|尋ね)[^。]{0,4}(?:させて|わせて)" + _PLEASE), "尋ねました。"),
    # 「その辺の確認だけさせてください」のように名詞として使われている場合は、
    # 「確認したい」を続けると助詞が合わない。名詞のまま受ける
    (re.compile(r"(?<=[のな])(?:確認|確かめ)[^。]{0,4}させて" + _PLEASE), "確認を求めました。"),
    (re.compile(r"(?:確認|確かめ)[^。]{0,4}させて" + _PLEASE), "確認したいと求めました。"),
    # 語尾を名詞句で置き換えた古い変換の後始末。助詞はそのまま活かす
    (re.compile(r"(?<=[をはが])説明を求めました[。！？]?$"), "説明するよう求めました。"),
    # 委員の問いかけをそのまま残したもの。「んですか」等は「のか」に寄せる
    (re.compile(r"(?:ん|の)(?:でしょうか|ですか)[。！？]?$"), "のか尋ねました。"),
    (re.compile(r"(?:でしょうか|ですか)[。！？]?$"), "か尋ねました。"),
    # 上のどれにも当てはまらない「〜ください」の受け皿。頼み方は数え切れないほど
    # あるので、一つずつ規則を足さず「いただくよう求めました」で受ける。
    # 「ぜひ頑張ってください」→「ぜひ頑張っていただくよう求めました」のように、
    # て形でも名詞でも文が通る。
    (re.compile(_PLEASE), "いただくよう求めました。"),
)


def normalize_question(text: str) -> str:
    """質問の要約を、第三者の言い方と重複の無い表現に整える。"""
    value = compact(text)
    # 「〜について」で終わる項目名に定型文を当てると「について」が重なる
    value = value.replace("について」について", "」について")
    value = value.replace("ととの意見を述べました", "との意見を述べました")
    for pattern, replacement in QUESTION_ENDING_FIXES:
        if pattern.search(value):
            value = pattern.sub(replacement, value)
            break
    return compact(value)


def no_answer_text(kind: str) -> str:
    """答弁が無いときの文言を、発言の種類に応じて返す。"""
    return NO_ANSWER_NOT_EXPECTED if kind in KINDS_WITHOUT_ANSWER else NO_ANSWER_MISSING


def is_no_answer(text: str) -> bool:
    """答弁本文ではなく、答弁が無いことを示す文言かどうか。"""
    return compact(text) in (
        NO_ANSWER_NOT_EXPECTED, NO_ANSWER_MISSING, LEGACY_NO_ANSWER, LEGACY_FULL_TEXT,
    )


def looks_reported(text: str) -> bool:
    """質問の要約が第三者の言い方で終わっているか。"""
    body = compact(text).rstrip("".join(SENTENCE_END))
    return any(body.endswith(ending) for ending in REPORTED_ENDINGS)


##############################################################################
# 検査
##############################################################################

# 検査の項目名と説明。check() が返す名前と対応する。
ISSUES = {
    "空": "要約が空",
    "未完結": "文の途中で切れている（語の途中・「…」で終わる）",
    "短すぎる": "内容を読み取れない短さ（質問が14字未満）",
    "長すぎる": "上限を超えている",
    "旧文言": "答弁が無いことを示す古い文言のまま",
    "二重について": "「〜について」について のような重複表現",
    "一人称": "発言をそのまま接ぎ木していて第三者の要約になっていない",
    "前置きのみ": "「〜についてお伺いします」だけで、何を尋ねたのかが入っていない",
    "定型のまま": "内容を取れず定型文のまま（会議録からの取り直しが必要）",
    "接続詞始まり": "「区側は、まず初めに、」など、中身の無い前置きで始まっている",
    "先頭が欠落": "語の先頭が欠けている（「ィーゼル車」など）",
    "助詞の重複": "「その辺を説明を求めました」のように助詞と語尾が噛み合っていない",
}

# 「〜についてお伺いします」だけの質問。何について、までは分かるが何を尋ねたかが無い。
TOPIC_ONLY = re.compile(
    r"^.{0,40}?について(?:お?伺い(?:いた)?します|質問(?:を)?(?:させていただきます|します|いたします)"
    r"|です|であります|お尋ねします)[。]?$"
)
# 内容を取れなかったときの定型文
TEMPLATE_QUESTION = re.compile(r"^「.*」について、現状の認識と区の(?:対応|対応方針)を質問しました。$")


# 機械的に直せる／防げる項目。CIではこれを0件にする。
BLOCKING_ISSUES = ("空", "未完結", "長すぎる", "旧文言", "二重について", "一人称",
                   "先頭が欠落", "助詞の重複")
# 会議録からの取り直しが要る項目。件数を記録して減らしていく。
ADVISORY_ISSUES = ("短すぎる", "前置きのみ", "定型のまま", "接続詞始まり")


##############################################################################
# 品質の検査
##############################################################################
#
# 上の検査は「文として壊れていないか」だけを見ている。それを全部通っていても、
# 発言をそのまま貼っただけで要約になっていない、という状態は起こる。実際に
# 起きていた（要修正0件のまま、委員会の質問の4割に話し言葉が残っていた）。
#
# ここに置くのは、その「壊れてはいないが要約として機能していない」を捕まえる
# 判定。1件ごとに真偽を返すものだけを置き、割合の集計と基準値との比較は
# scripts/check_qa_summaries.py が行う。

QUALITY_ISSUES = {
    "話し言葉": "発言をそのまま貼っていて第三者の要約になっていない",
    "タイトル反復": "見出しを言い換えただけで、何を尋ねたのかが入っていない",
    "語尾破綻": "語尾の差し替えが文の途中に入り、発言がそのまま後ろに残っている",
    "答弁欠落": "答弁を求める発言なのに答弁を特定できていない",
}

# 話し言葉が残っている印。会議録の口語そのままでしか出てこない言い回しを選ぶ。
# 「その辺」「ちょっと」のように、単独では何を指すか分からない語を含める。
SPOKEN_MARKERS = re.compile(
    r"(?:のですけれど|んですけれど|ちょっと|かなと思|なんですが|わけですけれ"
    r"|ですよね|そこら辺|その辺|といいますか|ですけれども)"
)

# 語尾の差し替えが失敗した跡。
#
# 大半は「文末だと思って語尾を付けたが、実際には文が続いていた」型で、
# 差し替えた語尾の直後に接続助詞が来て、元の発言がそのまま後ろに残る。
#   例: 「…改修してほしいと求めましたが、いかがでしょうか。」
#       「…使わせてほしいと求めましたけれども、よろしいか尋ねました。」
# 残りは直前の助詞とぶつかった型。
#   例: 「構わないので」＋「の説明を求めました」→「構わないのでの説明を求めました」
#
# 「〜から説明を求めました」「こととの兼ね合い」のように、字面が似ていても
# 文として正しいものは除く。ここが緩いと、直すべき件数が読めなくなる。
PARTICLE_COLLISION = re.compile(
    # 語尾の直後に文が続いている（差し替え位置を間違えた）
    r"(?:求めました|尋ねました|述べました|確認しました|示しました)"
    r"(?:けれども|けれど|けど|が、|ので|ですが)"
    # 直前の助詞とぶつかった
    r"|(?:ので|のに|たい|ほしい|よう)の説明を"
    r"|ととの意見を述べました"
    r"|をを"
)

# 見出しの反復とみなす、見出しから先に伸びてよい字数。
# 「孤立死の防止について」→「孤立死の防止について尋ねました。」は反復。
# 見出しに続けて実際の質問内容が書かれていれば、この幅を超える。
TITLE_ECHO_MARGIN = 28
# 見出しの照合に使う先頭の字数。長い見出しの全文一致を求めると取りこぼす。
TITLE_ECHO_STEM = 12


def has_spoken_style(text: str) -> bool:
    """発言の口語がそのまま残っているか。"""
    return bool(SPOKEN_MARKERS.search(compact(text)))


def has_broken_ending(text: str) -> bool:
    """語尾の差し替えが失敗した跡が残っているか。"""
    return bool(PARTICLE_COLLISION.search(compact(text)))


def echoes_title(title: str, question: str) -> bool:
    """質問が見出しの言い換えで終わっていないか。

    見出しの先頭部分がそのまま質問に含まれ、かつ質問がそこから
    ほとんど伸びていなければ、何を尋ねたのかが入っていないとみなす。
    """
    stem = re.sub(r"について$", "", compact(title).strip("「」"))[:TITLE_ECHO_STEM]
    body = compact(question)
    if not stem or stem not in body:
        return False
    return len(body) <= len(stem) + TITLE_ECHO_MARGIN


def answer_is_missing(answer: str, kind: str) -> bool:
    """答弁を求める発言なのに答弁が取れていないか。

    意見・提案は答弁を求めていないので、答弁が無いことは正常な状態であり
    欠落として数えない。ここを混ぜると改善したかどうかが読めなくなる。
    """
    if kind in KINDS_WITHOUT_ANSWER:
        return False
    return is_no_answer(answer)


# 掲載の仕方ごとに見る項目。
#
# 話し言葉は**要約にだけ**当てる。抜粋は発言そのままなので、口語が残っているのは
# 正常な状態であって欠陥ではない。ここを分けないと、抜粋を作り直すたびに
# 「悪化した」と出て毎回引っかかる（実際に r07 で 33.3%→49.4% と出た）。
QUALITY_BY_STYLE = {
    STYLE_SUMMARY: ("質問:話し言葉", "質問:タイトル反復", "質問:語尾破綻",
                    "答弁:答弁欠落", "答弁:話し言葉"),
    STYLE_EXCERPT: ("質問:タイトル反復", "質問:語尾破綻", "答弁:答弁欠落"),
}


def check_quality(title: str, question: str, answer: str, kind: str = "",
                  style: str = STYLE_SUMMARY) -> list[str]:
    """掲載文が読めるものになっているかを検査し、問題があれば項目名を返す。

    check_question / check_answer と違い、ここで挙がるものは文としては
    壊れていない。0件を求めるのではなく、割合を記録して下げていく。

    抜粋では話し言葉を見ない（上の QUALITY_BY_STYLE を参照）。
    """
    found = []
    if has_spoken_style(question):
        found.append("質問:話し言葉")
    if has_broken_ending(question):
        found.append("質問:語尾破綻")
    if echoes_title(title, question):
        found.append("質問:タイトル反復")
    if answer_is_missing(answer, kind):
        found.append("答弁:答弁欠落")
    elif has_spoken_style(answer):
        found.append("答弁:話し言葉")
    applicable = QUALITY_BY_STYLE.get(style, QUALITY_BY_STYLE[STYLE_SUMMARY])
    return [name for name in found if name in applicable]


def check_question(text: str, style: str = STYLE_SUMMARY) -> list[str]:
    """質問の掲載文を検査し、問題があれば項目名の一覧を返す。"""
    found = []
    value = compact(text)
    if not value:
        return ["空"]
    if not is_complete(value):
        found.append("未完結")
    if len(value) < 14:
        found.append("短すぎる")
    if len(value) > QUESTION_LIMIT:
        found.append("長すぎる")
    if "について」について" in value:
        found.append("二重について")
    if style == STYLE_SUMMARY and re.search(r"(?:ください|下さい|でしょうか|ですか)[。！？]?$", value):
        found.append("一人称")
    if re.search(r"(?<=[をはが])説明を求めました[。！？]?$", value):
        found.append("助詞の重複")
    if TEMPLATE_QUESTION.match(value):
        found.append("定型のまま")
    elif TOPIC_ONLY.match(value):
        found.append("前置きのみ")
    return found


def check_answer(text: str, kind: str = "") -> list[str]:
    """答弁の要約を検査し、問題があれば項目名の一覧を返す。"""
    found = []
    value = compact(text)
    if not value:
        return ["空"]
    if value in (LEGACY_NO_ANSWER, LEGACY_FULL_TEXT):
        return ["旧文言"]
    if is_no_answer(value):
        return []  # 答弁が無いことを正しく示している
    if not is_complete(value):
        found.append("未完結")
    # 「そのとおりです。」のような短い答弁は、直前の質問と並べて読めば意味が通る。
    # 画面では質問のすぐ下に表示されるため、長さの下限は設けない。
    if len(value) > ANSWER_LIMIT:
        found.append("長すぎる")
    if ANSWER_LEAD_FILLER.match(value):
        found.append("接続詞始まり")
    if has_broken_head(value):
        found.append("先頭が欠落")
    return found
