#!/usr/bin/env python3
"""質問者別の公式会議録抜粋から、質問項目ごとの短い抽出要約を生成する。

外部AIサービスへ会議録を送らず、質問者発言と区側答弁を分離した上で、質問項目との
語句一致、質問・答弁を示す表現、発言位置を使って重要文を選ぶ。生成後は必ず
build_history_supplements.py の厳格検証を通す。
"""

from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
QUEUE_PATH = ROOT / "scripts/out/history/qa_queue.json"

QUESTION_CUES = (
    "伺", "質問", "見解", "お考え", "考えを", "求め", "べき", "でしょうか",
    "いただきたい", "お示し", "聞かせ", "対応", "検討", "実施", "要望",
)
ANSWER_CUES = (
    "答え", "区では", "区は", "考えて", "進め", "実施", "検討", "努め", "予定",
    "取り組", "対応", "支援", "連携", "行って", "まいり", "図って", "設置",
)
CHAIR_TERMS = ("議長", "副議長", "委員長")
BOILERPLATE = (
    "ご質問についてお答え", "一般質問にお答え", "代表質問にお答え",
    "私からは", "初めに", "次に", "続きまして", "最後に",
)

# 自動照合では同じ答弁ブロック内の別見出しを選びやすかった項目を、
# 公式会議録で個別確認した上で固定する。
ANSWER_OVERRIDES = {
    ("r06-1t", "高橋 伸明", "新庁舎整備について"):
        "広町地区と商店街や大井町駅周辺地域との歩行者の回遊性を高めるため、動線の確保など具体的な整備内容を関係者と検討し、地域のにぎわい創出につなげてまいります。",
    ("r06-1t", "大倉 たかひろ", "DX推進の取り組みについて"):
        "デジタル技術は加速度的に進化しており、区民の利便性向上や業務改善が大きく見込まれるものについては、年度途中においても積極的に取り組んでまいります。",
    ("r06-1t", "大倉 たかひろ", "安心安全の取り組みについて"):
        "安全・安心な地域社会を構築するために再犯防止が重要であると認識し、必要な方を保健医療や福祉などの支援につなげるため、関係機関と連携して庁内横断的に取り組む計画を策定しました。",
    ("r06-1t", "せお 麻里", "施政方針"):
        "区民目線に立つ職員の柔軟な発想を生かした事業展開と政策形成能力の向上を目的に、全職員から事業提案を募集し、９事業を予算化しました。",
    ("r06-1t", "せお 麻里", "教育"):
        "特別支援学級では区独自の学習支援員を配置して個々の特性に配慮し、通常学級との交流・共同学習を通じて、互いを尊重し合う大切さを学ぶ機会を設けております。",
    ("r06-1t", "ゆきた 政春", "災害対策について"):
        "トイレトレーラーの導入および職員の牽引免許取得については、他自治体の事例も参考にしながら研究してまいります。",
    ("r06-1t", "ゆきた 政春", "AEDについて"):
        "区内コンビニエンスストア90か所への設置が加われば、夜間・休日を問わず24時間対応でき、全308か所・380台へ大幅に拡充できます。",
    ("r06-1t", "ひがし ゆき", "包括的性教育について"):
        "保護者に対しては、区民団体による未就学児等対象の性教育セミナーが開催されていることから、そうした機会も活用し、周知・啓発を図ってまいります。",
    ("r06-1t", "やなぎさわ聡", "家計のひっ迫はウェルビーイングの大敵。 今こそ区の貯金（基金）の積極活用を！"):
        "区民の生活状況等の把握に努め、国や東京都の動向も注視しながら、区民に最も身近な基礎自治体として各種支援策を推進してまいります。",
    ("r06-1t", "やなぎさわ聡", "こどものウェルビーイングを守れ！ STOP！大人によるこどもへの人権侵犯（品川翔英高校について）"):
        "私立学校について区は直接指導・監督する立場にはありませんが、区内在学の生徒から相談がある場合は、関係窓口を通じて所管する東京都などにつないでまいります。",
    ("r06-1t", "せりざわ裕次郎", "妊娠、出産の支援"):
        "妊娠中でもオンラインで就業相談やセミナーに参加できるようにし、女性向けの創業支援や託児サービスも提供しながら、女性のキャリア形成を支援してまいります。",
    ("r06-2t", "松永 よしひろ", "防災対策について"):
        "災害時は緊急輸送道路を確保し、陸路以外にもヘリポートを活用した空輸や船着場を活用した水上輸送の体制を整備しております。",
    ("r06-2t", "吉田 ゆみこ", "障がい者の多様な働き方の確保について"):
        "現在行っている超短時間雇用のマッチングを検証する際に、就労継続支援事業の受注拡大を含め、どのような範囲に応用できるか検討していきたいと考えております。",
    ("r06-3t", "せお 麻里", "障がい児支援"):
        "５歳児健診を円滑な就学に向けた必要な支援につなげる重要な機会と捉え、母子保健、子育ておよび教育に関する部署が協働し、実施に向けて準備を進めております。",
    ("r06-3t", "せお 麻里", "子育て支援"):
        "病児保育に対応可能なベビーシッターは区の利用支援事業で利用できるため周知に努め、区独自支援や対象年齢の拡大も検討してまいります。",
    ("r06-3t", "大倉 たかひろ", "再犯防止について"):
        "保護司の人材確保に向けて他自治体の先行事例を研究し、広報しながわなどを活用して保護司活動の周知に努めてまいります。",
    ("r06-3t", "藤原 正則", "民生委員の現状と課題について"):
        "地域の身近な相談相手として区民と行政・専門機関をつなぎ、地域福祉の根幹を培ってきた民生委員・児童委員に、あらゆる機会を捉えて感謝を伝えております。",
    ("r06-3t", "せらく 真央", "子ども達がのびのび過ごせる場について"):
        "平日の放課後の校庭利用について、保護者や子ども、地域の声を伺い、既存の放課後活動との関係や他自治体の事例も踏まえて検討してまいります。",
    ("r06-3t", "せらく 真央", "水辺の安全教育について"):
        "オンライン教材については、年間指導計画等を作成する際の参考にできるよう、各校に情報提供してまいります。",
    ("r06-3t", "石田 しんご", "人づくりこそ地域づくりについて"):
        "国や都に先駆けて学校給食や補助教材費を無償化し、本定例会では補助教材費無償化の対象を特別支援学校へ広げる補正予算を提案しております。",
    ("r06-4t", "えのした 正人", "子育て支援について"):
        "朝の時間帯に児童の安全・安心な居場所を学校内に設ける事業の検討を開始し、数校でのモデル実施を経て全校展開を目指します。",
    ("r06-4t", "山本 やすゆき", "教育の質Ｎｏ．1のまち、しながわ 子どもたちの無限の可能性を引き出す学校教育の仕組み、実現へ"):
        "学習用のマインクラフトや桃太郎電鉄など複数校で導入実績がある教材を含め、教育系アプリの事例を集めて各校に紹介してまいります。",
    ("r06-4t", "山本 やすゆき", "リアルの感動体験で子どもたちに夢を、区民の皆さまに活力を 防災拠点施設としても有効な、品川アリーナ構想、実現へ"):
        "東京都競馬株式会社との包括連携協定に基づき、同社が行うスポーツ・文化・エンターテインメント施設等の整備や施設の区民利用、周辺エリアの付加価値向上について連携・協力してまいります。",
    ("r07-1t", "若林 ひろき", "人権について"):
        "こうしたことから、今回、同性パートナーの方が事実婚の方と同様の権利を得られるよう各種社会保障制度等の改正についての検討などを、品川区のほか賛同した９区と共に国に対して申し入れたものです。",
    ("r07-1t", "大倉 たかひろ", "安心安全を守る取り組みについて"):
        "マンションごとの防災対策の進捗に応じた支援を進め、防災区民組織との連携や地域の防災訓練への参加など、共助の仕組みづくりを推進します。",
    ("r07-1t", "おぎの あやか", "外国人との共存社会について"):
        "今後も区民と在住外国人や訪日外国人との交流を深め、互いに安心して暮らしていけるよう取り組むことが重要と捉えています。",
    ("r07-3t", "こしば 新", "海外からの人材受け入れと外国人との共生について"):
        "モンゴルとの交流をさらに深めながら、引き続き技術人材の採用支援に力を入れます。",
    ("r07-4t", "澤田 えみこ", "性被害について"):
        "盗撮目的のカメラ探索機については、探知方法や精度の違い、探知作業を誰が行うかといった課題の整理が必要と考えています。",
    ("r07-4t", "須貝 行宏", "監査の識見がない上に監査される側にいる議員を、 区長はなぜ時給６万円の監査委員に選ぶのか"):
        "議員選出監査委員は政策的な知見を有し、政策の実効性や妥当性の視点から監査が期待できるため、議会の同意を得て選任しています。",
    ("r07-4t", "藤原 正則", "選挙公費負担について"):
        "選挙公費負担に関する答弁の詳細は、公式会議録で確認できます。",
    ("r07-4t", "高橋 しんじ", "産業振興施策について"):
        "社会経済情勢を的確に把握し、中小企業の新たな挑戦や区内産業の振興・活性化に必要な取組を切れ目なく実施するよう検討します。",
}

# 発言順とデータ上の大項目順が一致せず、別項目の質問文を選びやすい箇所を
# 公式会議録の質問内容に沿った短文へ固定する。
QUESTION_OVERRIDES = {
    ("r06-1t", "大倉 たかひろ", "DX推進の取り組みについて"):
        "議員は、先進技術による区民サービス向上、導入時のセキュリティや不具合への対策、効果が見込める技術を機動的に採用する方針について質問しました。",
    ("r06-1t", "大倉 たかひろ", "安心安全の取り組みについて"):
        "議員は、再犯防止推進計画の策定経緯と今後の取組、更生保護活動への支援について質問しました。",
    ("r06-3t", "せお 麻里", "障がい児支援"):
        "議員は、５歳児健診、保育園・幼稚園の巡回相談、作業療法士の活用など、発達障害児への切れ目ない支援について質問しました。",
    ("r06-3t", "せお 麻里", "子育て支援"):
        "議員は、病児保育でのベビーシッター活用とニーズ調査、利用対象を小学校低学年まで広げることについて質問しました。",
    ("r06-3t", "石田 しんご", "人づくりこそ地域づくりについて"):
        "議員は、人への投資で地域の未来を切り開く観点から、貧困や格差に左右されず学べる教育環境と教育費負担の軽減について質問しました。",
    ("r06-4t", "山本 やすゆき", "リアルの感動体験で子どもたちに夢を、区民の皆さまに活力を 防災拠点施設としても有効な、品川アリーナ構想、実現へ"):
        "議員は、東京都競馬のアリーナ建設への区の支援、区民利用の仕組み、防災拠点機能、区による事業参画について質問しました。",
}


def normalized(value: str) -> str:
    value = (value or "").replace("障がい", "障害").replace("障碍", "障害").replace("こども", "子ども")
    return re.sub(r"[\s　◯○・、。！？「」『』（）()\[\]【】,.!?：:;；/／・―─〜～]", "", value).lower()


def ngrams(value: str, size: int = 2) -> set[str]:
    text = normalized(value)
    return {text[index:index + size] for index in range(max(0, len(text) - size + 1))}


def parse_context(path: Path, member: str) -> tuple[list[str], list[dict]]:
    text = path.read_text(encoding="utf-8")
    excerpt = text.split("会議録抜粋:", 1)[-1]
    parts = re.split(r"^【(.+?)】\s*$", excerpt, flags=re.MULTILINE)
    question_sentences: list[str] = []
    answer_blocks: list[dict] = []
    member_key = normalized(member)
    for index in range(1, len(parts), 2):
        speaker = parts[index]
        body = parts[index + 1] if index + 1 < len(parts) else ""
        body = re.sub(r"^\s*\d+:\s*◯[^\s]+\s*", "", body.strip())
        # 最後の質問者では、会議録抜粋に質問終了後の議案説明まで含まれることが
        # ある。議長が質問終了を宣告した時点で止め、後続議案を答弁として選ばない。
        if any(term in speaker for term in CHAIR_TERMS) and re.search(
            r"(?:議員の質問|一般質問|代表質問)を終わります", body
        ):
            break
        sentences = split_sentences(body)
        if member_key and member_key in normalized(speaker):
            question_sentences.extend(sentences)
        elif not any(term in speaker for term in CHAIR_TERMS):
            answer_blocks.append({"speaker": speaker, "sentences": sentences})
    return question_sentences, answer_blocks


def split_sentences(text: str) -> list[str]:
    text = re.sub(r"\s+", " ", text).strip()
    pieces = re.split(r"(?<=[。！？?])\s+|(?<=。)|(?<=！)|(?<=？)", text)
    result = []
    for piece in pieces:
        value = piece.strip(" \n\t")
        value = re.sub(r"^[〔\[].*?[〕\]]\s*", "", value)
        if len(normalized(value)) >= 8:
            result.append(value)
    return result


def topic_core(topic: str) -> str:
    value = re.sub(r"(?:について|に関して|に関する|を問う|への対応|の取組(?:み)?|の推進)[。．\s]*$", "", topic)
    return value.strip() or topic.strip()


def sentence_score(topic: str, sentence: str, cues: tuple[str, ...], index: int, total: int) -> float:
    topic_value = topic_core(topic)
    topic_bigrams = ngrams(topic_value)
    sentence_bigrams = ngrams(sentence)
    overlap = len(topic_bigrams & sentence_bigrams)
    coverage = overlap / max(1, len(topic_bigrams))
    core = normalized(topic_value)
    text = normalized(sentence)
    substring_bonus = 2.5 if len(core) >= 3 and core in text else 0.0
    cue_weight = 1.5 if cues is QUESTION_CUES else 0.35
    cue_bonus = sum(cue_weight for cue in cues if cue in sentence)
    position_bonus = 0.08 * (1 - index / max(1, total))
    length_penalty = max(0, len(sentence) - 260) / 500
    boilerplate_penalty = 0.25 * sum(1 for term in BOILERPLATE if term in sentence)
    short_heading = (
        len(normalized(sentence)) < 90
        and ("についてお答え" in sentence or re.search(r"について[。．]?$", sentence))
    )
    heading_penalty = 7.0 if short_heading else 0.0
    very_short_penalty = 3.0 if len(normalized(sentence)) < 20 else 0.0
    return (
        coverage * 5 + math.log1p(overlap) * 0.4 + substring_bonus + cue_bonus + position_bonus
        - length_penalty - boilerplate_penalty - heading_penalty - very_short_penalty
    )


def select_sentence(topic: str, sentences: list[str], cues: tuple[str, ...]) -> tuple[str, float]:
    if not sentences:
        return "", 0.0
    ranked = [
        (sentence_score(topic, sentence, cues, index, len(sentences)), -index, sentence)
        for index, sentence in enumerate(sentences)
    ]
    score, _, sentence = max(ranked)
    return clean_sentence(sentence), score


def heading_like(sentence: str) -> bool:
    return (
        len(normalized(sentence)) < 110
        and (
            "お答え" in sentence
            or re.search(r"について(?:です|であります)?[。．]?$", sentence) is not None
        )
    )


def question_heading_like(sentence: str) -> bool:
    """質問演説中の節見出しらしい文を判定する。"""
    text = sentence.strip()
    return (
        len(normalized(text)) < 100
        and "について" in text
        and (
            text.startswith(("次に", "続いて", "続きまして", "まず", "最後に"))
            or re.search(r"について(?:伺|質問|お聞き)", text) is not None
            or re.search(r"について[。．]?$", text) is not None
        )
    )


def ordered_question_selections(topics: list[str], sentences: list[str]) -> list[tuple[str, float, str]]:
    if not sentences:
        return [("", 0.0, "") for _ in topics]
    anchors: list[int] = []
    cursor = 0
    for topic_index, topic in enumerate(topics):
        core = normalized(topic_core(topic))
        remaining_topics = len(topics) - topic_index - 1
        hard_last = len(sentences) - remaining_topics
        expected_last = int(len(sentences) * min(1.0, (topic_index + 1.4) / max(1, len(topics)))) + 1
        last_index = min(hard_last, max(cursor + 1, expected_last))
        candidates = list(range(cursor, last_index)) or [min(cursor, len(sentences) - 1)]
        full_candidates = list(range(cursor, hard_last)) or candidates
        exact = [
            index for index in full_candidates
            if core and core in normalized(sentences[index]) and question_heading_like(sentences[index])
        ]
        topic_terms = ngrams(topic_core(topic))
        section_headings = [index for index in full_candidates if question_heading_like(sentences[index])]
        similar_headings = [
            index for index in section_headings
            if len(topic_terms & ngrams(sentences[index])) >= min(2, len(topic_terms))
        ]
        contained = [index for index in full_candidates if core and core in normalized(sentences[index])]
        if exact:
            anchor = exact[0]
        elif similar_headings:
            anchor = max(
                similar_headings,
                key=lambda index: sentence_score(topic, sentences[index], tuple(), index, len(sentences)),
            )
        elif contained:
            anchor = contained[0]
        else:
            anchor = max(
                candidates,
                key=lambda index: sentence_score(topic, sentences[index], tuple(), index, len(sentences)),
            )
        anchors.append(anchor)
        cursor = min(anchor + 1, len(sentences) - 1)

    selections: list[tuple[str, float]] = []
    for index, (topic, start) in enumerate(zip(topics, anchors)):
        end = anchors[index + 1] if index + 1 < len(anchors) else len(sentences)
        segment = sentences[start:max(start + 1, end)]
        substantive = [sentence for sentence in segment if not question_heading_like(sentence)] or segment
        cue_sentences = [
            sentence for sentence in substantive if any(cue in sentence for cue in QUESTION_CUES)
        ]
        selected, score = select_sentence(topic, cue_sentences or substantive, QUESTION_CUES)
        selections.append((selected, score, " ".join(substantive)))
    return selections


def answer_selection(
    topic: str,
    blocks: list[dict],
    question_hint: str = "",
    question_context: str = "",
) -> tuple[str, float]:
    if not blocks:
        return "", 0.0
    core = normalized(topic_core(topic))
    topic_terms = ngrams(topic_core(topic))
    # 「教育」「防災」など広い大項目名より、実際に選ばれた具体的な質問文を
    # 優先する。大項目名は担当答弁ブロックを探す補助として残す。
    topic_weight = 1.0 if not question_hint else 0.35
    hint_terms = ngrams(question_hint, 3)
    context_terms = ngrams(question_context, 3)
    ranked_blocks = []
    for block_index, block in enumerate(blocks):
        sentences = block["sentences"]
        intro = " ".join(sentences[:2])
        body = " ".join(sentences)
        headings = [sentence for sentence in sentences if heading_like(sentence)]
        intro_terms = ngrams(intro)
        body_terms = ngrams(body)
        speaker_terms = ngrams(block["speaker"])
        hint_bigrams = ngrams(question_hint, 2)
        heading_affinity = max((
            len(hint_bigrams & ngrams(heading, 2))
            + 12 * len(hint_bigrams & ngrams(heading, 2)) / max(1, len(ngrams(heading, 2)))
            for heading in headings
        ), default=0.0)
        score = (
            len(topic_terms & intro_terms) * 1.2 * topic_weight
            + len(topic_terms & body_terms) * 0.35 * topic_weight
            + len(topic_terms & speaker_terms) * 0.8 * topic_weight
            # 選ばれた具体的な質問文を最優先し、その項目の発言全体を補助に使う。
            # これにより「愛の手帳」「防災教材」などの固有語を落とさず、短い
            # 題名だけで別の担当答弁を選ぶことを防ぐ。
            + min(60, len(hint_terms & ngrams(body, 3))) * 0.50
            + min(120, len(context_terms & ngrams(body, 3))) * 0.02
            + heading_affinity * 1.5
            - block_index * 0.002
        )
        if core and core in normalized(body):
            score += 6
        if core and core in normalized(intro):
            score += 4
        ranked_blocks.append((score, -block_index, block))
    block_score, _, selected_block = max(ranked_blocks)
    block_sentences = selected_block["sentences"]
    heading_anchors = [index for index, sentence in enumerate(block_sentences) if heading_like(sentence)]
    if heading_anchors:
        anchor = max(
            heading_anchors,
            key=lambda index: (
                (8 if core and core in normalized(block_sentences[index]) else 0)
                + (
                    len(topic_terms & ngrams(block_sentences[index], 2))
                    + 8 * len(topic_terms & ngrams(block_sentences[index], 2))
                    / max(1, len(ngrams(block_sentences[index], 2)))
                ) * topic_weight
                + min(30, len(hint_terms & ngrams(block_sentences[index], 3))) * 1.2
                + min(30, len(context_terms & ngrams(block_sentences[index], 3))) * 0.12
                + 1.5 * len(hint_terms & ngrams(block_sentences[index], 3))
                / max(1, len(ngrams(block_sentences[index], 3)))
                + index * 0.0001
                - (1.0 if index == heading_anchors[0] and len(heading_anchors) > 1 else 0.0)
            ),
        )
        next_heading = next((index for index in heading_anchors if index > anchor), len(block_sentences))
        candidates = block_sentences[anchor + 1:min(next_heading, anchor + 12)]
        substantive = [sentence for sentence in candidates if not heading_like(sentence)]
    else:
        substantive = [sentence for sentence in block_sentences if not heading_like(sentence)]
    if not substantive:
        substantive = [sentence for sentence in block_sentences if not heading_like(sentence)] or block_sentences
    ranked_sentences = []
    for index, sentence in enumerate(substantive):
        base = sentence_score(topic, sentence, ANSWER_CUES, index, len(substantive))
        hint_bonus = min(24, len(hint_terms & ngrams(sentence, 3))) * 0.9
        context_bonus = min(24, len(context_terms & ngrams(sentence, 3))) * 0.04
        ranked_sentences.append((base + hint_bonus + context_bonus, -index, sentence))
    score, _, sentence = max(ranked_sentences)
    return clean_sentence(sentence), score + block_score * 0.03


def clean_sentence(sentence: str, limit: int = 210) -> str:
    value = re.sub(r"^\d+:\s*", "", sentence).strip()
    value = re.sub(r"^(?:初めに|次に|続きまして|最後に)[、,]\s*", "", value)
    value = re.sub(r"^私からは、?", "", value)
    value = re.sub(r"^(?:.+?議員の)?(?:一般|代表)質問にお答え(?:いた)?します[。．]?", "", value)
    value = re.sub(r"^(?:.+?に関する)?ご質問についてお答え(?:いた)?します[。．]?", "", value)
    value = value.strip()
    if len(value) > limit:
        value = value[:limit].rstrip("、, ") + "…"
    return value


def ensure_ending(value: str) -> str:
    if not value:
        return value
    return value if value.endswith(("。", "？", "！", "…")) else value + "。"


def make_summary(topic: str, question_choice: tuple[str, float, str], answer_blocks: list[dict]) -> dict:
    question, question_score, question_context = question_choice
    topic_question_overlap = len(ngrams(topic_core(topic)) & ngrams(question))
    minimum_overlap = max(1, min(4, len(ngrams(topic_core(topic))) // 6))
    reliable_question = (
        question
        if question_score >= 0.65 and topic_question_overlap >= minimum_overlap
        else ""
    )
    reliable_context = (
        question_context
        if reliable_question or len(normalized(question_context)) >= 150
        else ""
    )
    answer, answer_score = answer_selection(topic, answer_blocks, reliable_question, reliable_context)

    if not reliable_question:
        question_text = f"「{topic}」について、現状の認識と区の対応方針を質問しました。"
    else:
        question_text = ensure_ending(f"議員は、{question}")

    if answer_score < 0.45 or not answer:
        answer_text = "会議録では複数分野にまたがって答弁されているため、詳細は公式会議録で確認できます。"
    else:
        answer_text = ensure_ending(f"区側は、{answer}")

    return {
        "title": topic,
        "question": question_text,
        "answer": answer_text,
        "_questionScore": round(question_score, 3),
        "_answerScore": round(answer_score, 3),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--years", nargs="+", type=int, default=list(range(7, 0, -1)))
    parser.add_argument("--write", action="store_true")
    parser.add_argument("--preview", type=int, default=0, help="先頭から指定人数分を表示")
    parser.add_argument("--member", default="", help="プレビュー対象の議員名またはmemberId")
    args = parser.parse_args()

    queue = json.loads(QUEUE_PATH.read_text(encoding="utf-8"))
    selected_years = {f"r{year:02d}" for year in args.years}
    generated_topics = 0
    low_question = 0
    low_answer = 0

    for item in queue:
        if item["yearId"] not in selected_years or item.get("sourceStatus") == "withdrawn":
            continue
        context_path = ROOT / item["contextPath"]
        question_sentences, answer_blocks = parse_context(context_path, item["member"])
        question_choices = ordered_question_selections(item["topics"], question_sentences)
        summaries = [
            make_summary(topic, question_choice, answer_blocks)
            for topic, question_choice in zip(item["topics"], question_choices)
        ]
        for summary in summaries:
            question_override = QUESTION_OVERRIDES.get(
                (item["meetingId"], item["member"], summary["title"])
            )
            if question_override:
                summary["question"] = ensure_ending(question_override)
            override = ANSWER_OVERRIDES.get((item["meetingId"], item["member"], summary["title"]))
            if override:
                summary["answer"] = ensure_ending(f"区側は、{override}")
        low_question += sum(summary["_questionScore"] < 0.65 for summary in summaries)
        low_answer += sum(summary["_answerScore"] < 0.45 for summary in summaries)
        generated_topics += len(summaries)
        for summary in summaries:
            summary.pop("_questionScore", None)
            summary.pop("_answerScore", None)
        item["qaSummaries"] = summaries
        item["summaryStatus"] = "complete"

    if args.preview:
        shown = 0
        for item in queue:
            if item["yearId"] not in selected_years:
                continue
            if args.member and args.member not in item["member"] and args.member != item["memberId"]:
                continue
            print(f"\n{item['yearLabel']} {item['member']}")
            for summary in item.get("qaSummaries", []):
                print(json.dumps(summary, ensure_ascii=False))
            shown += 1
            if shown >= args.preview:
                break

    print(json.dumps({
        "generatedTopics": generated_topics,
        "lowQuestionFallbacks": low_question,
        "lowAnswerFallbacks": low_answer,
        "write": args.write,
    }, ensure_ascii=False))
    if args.write:
        QUEUE_PATH.write_text(json.dumps(queue, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
