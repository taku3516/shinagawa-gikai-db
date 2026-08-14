#!/usr/bin/env python3
"""本会議の全文づくりが壊れていないかを、会議録なしで確かめる。

会議録検索システムへは手元から到達できないことがあるので、本会議の会議録に
似せたHTMLを自分で作って確かめる。見るのは次の4点。

1. 会議録の表題から、年データの会議ID（r06-1t）と開催日を導ける
2. 発言が段落に分かれ、発言者ラベルが本文に残らない
3. 質問者の入口が、その議員が質問を始めた発言を指す（別人・挨拶へ飛ばない）
4. 書き出した目次を、検査（check_minutes_fulltext.py）が読み戻せる

    python3 scripts/test_plenary_fulltext.py
"""

from __future__ import annotations

import collections
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import check_minutes_fulltext as check
import minutes_fulltext as mf
import prepare_plenary_fulltext as pp

FAILURES: list[str] = []


def ok(name: str, condition: bool, detail: str = "") -> None:
    if condition:
        print(f"  ok   {name}")
    else:
        print(f"  NG   {name}")
        if detail:
            print(f"       {detail}")
        FAILURES.append(name)


def sample_voices() -> list[dict]:
    """本会議1日分に近い並び。議長→議員の質問→区長の答弁→…と続く。

    代表質問は、質問項目をまとめてひとつづきに述べる形で記録される。
    """
    return [
        ("あくつ副議長", ["○午前９時59分開議", "ただいまから本日の会議を開きます。"]),
        ("あくつ副議長", ["これより日程に入ります。", "本日の日程は議事日程のとおりであります。"]),
        ("高橋伸明議員", [
            "品川区議会自民党・無所属の会を代表いたしまして、代表質問をさせていただきます。",
            "まず初めに、新庁舎整備について伺います。歩行者動線が変わることで商店街のにぎわいに"
            "影響が出ることが心配されますが、区の見解を求めます。",
            "次に、教育について伺います。いじめ防止対策の強化について、ご答弁をお願いいたします。",
        ]),
        ("森澤区長", [
            "高橋伸明議員のご質問にお答えいたします。",
            "新庁舎整備についてですが、動線の確保など具体的な整備内容を関係者と検討し、"
            "地域のにぎわい創出につなげてまいります。",
        ]),
        ("高橋伸明議員", ["ご答弁ありがとうございました。以上で質問を終わります。"]),
        ("あくつ副議長", ["以上で本日の日程は全部終了いたしました。"]),
    ]


def minutes_html(voices: list[tuple[str, list[str]]]) -> str:
    """本会議の会議録に似せたHTML。発言者ラベルが本文の先頭にも入る形。"""
    items, texts = [], []
    for index, (speaker, lines) in enumerate(voices, start=1):
        items.append(
            f'<li class="voicelist__item" data-voice_code="{index}">'
            f'<span class="speaker__name">◯{speaker}</span></li>')
        body = list(lines)
        # 公式のHTMLは、発言者ラベルと本文の1行目が同じ行に入る（全角空白区切り）。
        # 開議時刻の見出しがある発言では、ラベルはその次の行に来る。
        head = 1 if body and body[0].startswith("○") else 0
        body[head] = f"◯{speaker}　{body[head]}"
        texts.append(
            f'<div class="voice voice-text" data-voice_code="{index}">'
            f'<div class="voice__detail">{index}:</div>'
            f'<p class="voice__text">{"<br />".join(body)}<br /></p></div>')
    return ("<html><body><ul>" + "".join(items) + "</ul>" + "".join(texts) + "</body></html>")


def test_titles() -> None:
    """会議録の表題から、会議IDと日付の見出しを導ける。"""
    title = "令和６年_第１回定例会（第３日目）　本文"
    ok("定例会の会議IDを導ける", pp.meeting_id_for("r06", title) == "r06-1t",
       pp.meeting_id_for("r06", title))
    ok("臨時会は別の記号になる",
       pp.meeting_id_for("r06", "令和６年_第２回臨時会（第１日目）　本文") == "r06-2r")
    ok("日目を取り出せる", pp.day_label_of(title) == "第3日目", pp.day_label_of(title))
    ok("表題に回次が無ければ空", pp.meeting_id_for("r06", "令和６年_議会運営委員会") == "")
    ok("会議IDに本会議の印が付く",
       pp.session_id_for("r06", "2024-02-22") == "r06-20240222-honkaigi")
    # 全文ファイルの置き場所は委員会とまったく同じ導出で出る
    ok("委員会と同じ導出でパスが出る",
       mf.minutes_href("r06-20240222-honkaigi")
       == "data/minutes/r06/r06-20240222-honkaigi.js")
    for value, expected in (("2024", "r06"), ("r06", "r06"), ("令和6", "r06"),
                            ("平成30", "h30"), ("h20", "h20")):
        ok(f"年の指定「{value}」を読める", pp.year_id(value) == expected, pp.year_id(value))


def test_parse_voices() -> None:
    """発言が段落に分かれ、発言者ラベルが本文に残らない。"""
    parsed = pp.parse_voices(minutes_html(sample_voices()))
    ok("発言の数が合う", len(parsed) == len(sample_voices()),
       f"{len(parsed)} / {len(sample_voices())}")
    ok("発言者を取れている", parsed[2]["speaker"] == "高橋伸明議員", parsed[2]["speaker"])
    ok("代表質問が段落に分かれる", len(parsed[2]["lines"]) == 3, str(parsed[2]["lines"]))
    ok("発言者ラベルが本文に残らない",
       not parsed[2]["text"].startswith("◯"), parsed[2]["text"][:20])
    ok("開議時刻の見出しは残る", parsed[0]["lines"][0] == "○午前９時59分開議",
       str(parsed[0]["lines"]))
    ok("見出しの後ろのラベルも落とす",
       not any(line.startswith("◯") for line in parsed[0]["lines"]), str(parsed[0]["lines"]))


def test_question_start() -> None:
    """質問者の入口が、その議員が質問を始めた発言を指す。"""
    parsed = pp.parse_voices(minutes_html(sample_voices()))
    topics = ["新庁舎整備について", "教育について"]
    found = pp.find_question_start(parsed, "高橋 伸明", topics)
    ok("質問の発言を選ぶ", found == 3, f"発言{found}")
    # お礼だけの5番を選ぶと、抜粋より短い文へ飛ばすことになる
    ok("お礼の発言を選ばない", found != 5)
    ok("会議録にいない議員は0", pp.find_question_start(parsed, "存在しない議員", topics) == 0)


def test_overlay_round_trip() -> None:
    """書き出した目次を、検査がそのまま読み戻せる。"""
    sessions = [{
        "id": "r06-20240220-honkaigi", "meetingId": "r06-1t", "dateIso": "2024-02-20",
        "date": "2024年2月20日", "dayLabel": "第1日目",
        "title": "2024年2月20日 令和６年_第１回定例会（第１日目）",
        "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/1?Id=684",
        "characters": 61233, "voices": 39, "hasFullText": True,
    }]
    starts = {"r06-1t:nobuaki_takahashi": {"sessionId": "r06-20240220-honkaigi", "voiceIndex": 8}}
    source = pp.overlay_source("r06", sessions, starts)

    ok("年データの後に読む形になっている", "window.SHINAGAWA_DB.years.r06" in source)
    ok("質問へ入口を足す形になっている", "year.questions = (year.questions || []).map" in source)
    read_sessions = check.json_after(source, "year.plenaryMinutes = ")
    read_starts = check.json_after(source, "const starts = ")
    ok("検査が目次を読み戻せる", read_sessions == sessions, str(read_sessions)[:80])
    ok("検査が入口を読み戻せる", read_starts == starts, str(read_starts))

    with tempfile.TemporaryDirectory() as tmp:
        original = pp.DATA
        try:
            pp.DATA = Path(tmp)
            ok("初回は書き込む", pp.write_overlay("r06", sessions, starts) is True)
            ok("中身が同じなら書かない", pp.write_overlay("r06", sessions, starts) is False)
        finally:
            pp.DATA = original


SITE_FIXTURE = """// 品川区議会DB データファイル（自動生成の書式）
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.site = {
  "siteName": "品川区議会DB",
  "years": [
    {
      "id": "r07",
      "label": "令和7年",
      "file": "data/r07.js",
      "committees": true,
      "available": true
    },
    {
      "id": "r06",
      "label": "令和6年",
      "file": "data/r06.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    }
  ],
  "defaultYear": "r07"
};
"""


def test_site_flag() -> None:
    """`data/site.js` の目印を、他の行を動かさずに立てられる。

    ここを忘れると、全文を入れたのに画面に何も出ない（読み込む合図が無い）
    という分かりにくい失敗になるので、生成のたびに自動で立てている。

    本物の `data/site.js` は年を足すたびに変わるので、試験は自前の見本を使う
    （実データを見に行くと、目印が増えただけで試験が落ちる）。
    """
    with tempfile.TemporaryDirectory() as tmp:
        original = pp.DATA
        try:
            pp.DATA = Path(tmp)
            (pp.DATA / "site.js").write_text(SITE_FIXTURE, encoding="utf-8")
            # 既に立っている年は触らない（生成のたびに差分を出さない）
            ok("立っている年は触らない", pp.enable_in_site("r06") is False)
            ok("一覧に無い年は触らない", pp.enable_in_site("h13") is False)
            ok("立っていない年には立てる", pp.enable_in_site("r07") is True)

            changed = (pp.DATA / "site.js").read_text(encoding="utf-8")
            before, after = SITE_FIXTURE.splitlines(), changed.splitlines()
            ok("増えるのは1行だけ", len(after) - len(before) == 1, f"{len(before)} → {len(after)}")
            # 目印の行はもともと別の年にもあるので、行の集まりの差で見る
            added = collections.Counter(after) - collections.Counter(before)
            ok("増えたのは目印の行だけ",
               list(added.elements()) == ['      "plenaryMinutes": true,'], str(dict(added)))
            ok("消えた行は無い", not (collections.Counter(before) - collections.Counter(after)),
               str(dict(collections.Counter(before) - collections.Counter(after))))
            ok("委員会の目印の隣に置く",
               '      "committees": true,\n      "plenaryMinutes": true,' in changed)
            ok("他の年は動かない", changed.count('"plenaryMinutes": true') == 2)
        finally:
            pp.DATA = original


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
