#!/usr/bin/env python3
"""会議録の発言者名を議員IDに解決する処理を、実データなしで確かめる。

委員会の `exchanges[].speaker` は「安藤委員」「石田（ち）委員」のような
姓＋役職の文字列で、議員IDを持っていない（本会議の `questions` は持っている）。
これを議員IDへ名寄せする `resolve_speaker` の振る舞いを、小さな合成データで見る。

見るのは、実データの調査で実際に踏んだ落とし穴ばかり。

1. 任期は区議選の当選記録から作る（`seenIn` は在職年ではないので使わない）
2. 判定は会議の「日付」で行う。選挙は4月下旬なので、選挙年は前後で構成が違う
3. 括弧の中身は名の先頭1文字（石田（ち）→ちひろ）
4. 別名の姓でも引ける（阿久津委員＝あくつ広王）
5. 落選を挟む議員は、その空白期間で候補から外れる
6. 絞れないときは黙って1名を選ばず、候補を返す

    python3 scripts/test_speaker_resolution.py
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import resolve_speaker as rs

FAILURES: list[str] = []


def check(name: str, condition: bool, detail: str = "") -> None:
    if condition:
        print(f"  ok   {name}")
    else:
        print(f"  NG   {name}")
        if detail:
            print(f"       {detail}")
        FAILURES.append(name)


# ---------------------------------------------------------------- 合成データ

def sample_elections() -> list[dict]:
    """区議選3回と補選1回。実データと同じ形（当選・落選が混ざる）。"""
    return [
        {
            "title": "品川区議会議員選挙",
            "electionDate": "2015-04-26",
            "candidates": [
                {"result": "当選", "name": "石田 秀男"},
                {"result": "当選", "name": "石田 慎吾"},
                {"result": "当選", "name": "石田 ちひろ"},
                {"result": "当選", "name": "阿久津 広王"},
                {"result": "落選", "name": "田中 たけし"},
            ],
        },
        {
            "title": "品川区議会議員補欠選挙",
            "electionDate": "2018-09-30",
            "candidates": [{"result": "当選", "name": "田中 さやか"}],
        },
        {
            "title": "品川区議会議員選挙",
            "electionDate": "2019-04-21",
            "candidates": [
                {"result": "当選", "name": "石田 ひでお"},
                {"result": "当選", "name": "石田 ちひろ"},
                {"result": "当選", "name": "田中 さやか"},
                {"result": "落選", "name": "石田 しんご"},
            ],
        },
        {
            "title": "品川区議会議員選挙",
            "electionDate": "2023-04-23",
            "candidates": [
                {"result": "当選", "name": "石田 ひでお"},
                {"result": "当選", "name": "石田 ちひろ"},
                {"result": "当選", "name": "石田 しんご"},
                {"result": "当選", "name": "田中 たけし"},
                {"result": "落選", "name": "田中 さやか"},
            ],
        },
        # 区議選以外は任期に使わない
        {
            "title": "東京都議会議員選挙",
            "electionDate": "2021-07-04",
            "candidates": [{"result": "当選", "name": "石田 しんご"}],
        },
    ]


def sample_people() -> list[dict]:
    """人物台帳。`aliases` に漢字・かなの揺れが入る。"""
    return [
        {"id": "hideo_ishida", "name": "石田　秀男", "aliases": ["石田ひでお"]},
        {"id": "chihiro_ishida", "name": "石田　ちひろ", "aliases": []},
        {"id": "x-ishida-shingo", "name": "石田 しんご", "aliases": ["石田慎吾"]},
        {"id": "takeshi_tanaka", "name": "田中　たけし", "aliases": []},
        {"id": "x-tanaka-sayaka", "name": "田中 さやか", "aliases": []},
        {"id": "hiroo_akutsu", "name": "あくつ　広王", "aliases": ["阿久津広王"]},
    ]


def registry(**overrides) -> rs.Registry:
    return rs.Registry.from_sources(
        people=sample_people(),
        kana_by_id={"hiroo_akutsu": "あくつ　ひろお"},
        elections=sample_elections(),
        **overrides,
    )


# -------------------------------------------------------------------- 試験

def test_parse_speaker() -> None:
    """発言者名を、姓・括弧のヒント・役職に分ける。"""
    cases = [
        ("西本委員", "西本", None, "委員"),
        ("石田（ち）委員", "石田", "ち", "委員"),
        ("石田（秀）副委員長", "石田", "秀", "副委員長"),
        ("こしば委員長", "こしば", None, "委員長"),
        ("石田（秀）議員", "石田", "秀", "議員"),
        # 役職が付かない発言者（参考人など）は姓だけが残る
        ("参考人", "参考人", None, None),
    ]
    for raw, surname, hint, role in cases:
        got = rs.parse_speaker(raw)
        check(f"{raw} を分解できる",
              (got.surname, got.hint, got.role) == (surname, hint, role),
              f"{got.surname!r} {got.hint!r} {got.role!r}")


def test_terms_from_elections() -> None:
    """任期は「当選した選挙の日〜次の一般選挙の日」。落選と区議選以外は含めない。"""
    terms = rs.terms_from_elections(sample_elections())
    hideo = terms["石田秀男"]
    check("当選日から任期が始まる", hideo[0][0] == "2015-04-26", str(hideo))
    check("次の一般選挙で任期が切れる", hideo[0][1] == "2019-04-21", str(hideo))

    # 石田しんご: 2015当選 → 2019落選 → 2023当選。都議選は数えない
    shingo = terms["石田しんご"] + terms.get("石田慎吾", [])
    starts = sorted(start for start, _ in shingo)
    check("落選した選挙では任期が生まれない", starts == ["2015-04-26", "2023-04-23"], str(starts))

    check("区議選以外は任期にしない",
          all(start != "2021-07-04" for start, _ in shingo), str(shingo))

    sayaka = terms["田中さやか"]
    check("補選の当選も任期になる",
          any(start == "2018-09-30" for start, _ in sayaka), str(sayaka))


def test_resolves_by_date_not_year() -> None:
    """選挙のあった年は、前後で別人に解決する。

    区議選は4月下旬で、このDBの年度IDは暦年（令和5年＝2023年）。年単位で
    判定すると、2023年の1月と6月の「田中委員」が同じ人になってしまう。
    """
    reg = registry()
    before = reg.resolve("田中委員", "2023-03-10")
    after = reg.resolve("田中委員", "2023-06-15")
    check("選挙前はさやか", before.member_id == "x-tanaka-sayaka", before.describe())
    check("選挙後はたけし", after.member_id == "takeshi_tanaka", after.describe())


def test_resolves_by_bracket_hint() -> None:
    """括弧の中身は名の先頭1文字。かなでも漢字でも引ける。"""
    reg = registry()
    cases = [
        ("石田（ち）委員", "2017-06-01", "chihiro_ishida"),
        ("石田（秀）委員", "2017-06-01", "hideo_ishida"),
        ("石田（慎）委員", "2017-06-01", "x-ishida-shingo"),
        # 2013年以降の会議録は「し」表記。同じ人を指す
        ("石田（し）委員", "2017-06-01", "x-ishida-shingo"),
    ]
    for speaker, date, expected in cases:
        got = reg.resolve(speaker, date)
        check(f"{speaker} → {expected}", got.member_id == expected, got.describe())


def test_resolves_via_alias_surname() -> None:
    """別名の姓でも引ける。会議録は「阿久津委員」、台帳は「あくつ　広王」。"""
    reg = registry()
    for speaker in ("あくつ委員", "阿久津委員"):
        got = reg.resolve(speaker, "2017-06-01")
        check(f"{speaker} → hiroo_akutsu", got.member_id == "hiroo_akutsu", got.describe())


def test_gap_term_excludes_candidate() -> None:
    """落選を挟む議員は、その空白期間では候補にならない。

    石田しんごは2019年に落選し2023年に返り咲いている。名簿の在職期間を
    連続した1期として扱うと、2020〜2022年の「石田（し）委員」に解決して
    しまう（実際には在職していない）。
    """
    reg = registry()
    gap = reg.resolve("石田（し）委員", "2021-06-01")
    check("落選期間中は解決しない", gap.member_id is None, gap.describe())
    check("理由が分かる", "在職" in gap.reason, gap.reason)

    back = reg.resolve("石田（し）委員", "2024-06-01")
    check("返り咲き後はまた解決する", back.member_id == "x-ishida-shingo", back.describe())


def test_unresolved_reports_candidates() -> None:
    """同姓を絞れないときは、黙って1名を選ばずに候補を返す。

    名寄せは推測を含む処理なので、誤ってもデータ上は正常に見えてしまう。
    ここで1名に決め打つと、別人の発言が議員ページに混ざる。
    """
    reg = registry()
    got = reg.resolve("石田委員", "2017-06-01")
    check("括弧なしの同姓は解決しない", got.member_id is None, got.describe())
    check("候補を返す",
          sorted(got.candidates) == ["chihiro_ishida", "hideo_ishida", "x-ishida-shingo"],
          str(got.candidates))

    unknown = reg.resolve("架空委員", "2017-06-01")
    check("台帳にない姓は理由が分かる", unknown.member_id is None and "台帳" in unknown.reason,
          unknown.describe())


def test_term_index_splits_on_defeat() -> None:
    """落選を挟んだ議員は、任期が別物として数えられる。"""
    reg = registry()
    person = reg.by_id["x-ishida-shingo"]
    check("2期ある", len(person.terms) == 2, str(person.terms))
    check("1期目", person.term_index("2017-06-01") == 0)
    check("落選期間は任期に入らない", person.term_index("2021-06-01") is None)
    check("2期目は別の番号", person.term_index("2024-06-01") == 1)


def test_spans_split_on_term_gap() -> None:
    """対応表の区間は、落選期間をまたいで繋がらない。

    区間を「同じ議員IDが続く限り伸ばす」だけにすると、落選期間に会議が
    無いせいで前後が1本に繋がり、在職していない日にも議員IDを返してしまう。
    """
    import build_speaker_members as bsm

    reg = registry()
    # 落選（2019-04-21〜2023-04-23）を挟んで発言している並び
    pairs = {(date, "石田（し）委員"): 1 for date in
             ("2017-06-01", "2018-06-01", "2024-06-01", "2025-06-01")}
    spans, _ = bsm.build_spans(pairs, reg)
    rows = spans["石田（し）委員"]
    check("2区間に分かれる", len(rows) == 2, str(rows))
    check("1区間目は落選前で閉じる", rows[0][1] == "2018-06-01", str(rows[0]))
    check("2区間目は返り咲き後から", rows[1][0] == "2024-06-01", str(rows[1]))
    check("落選期間は答えない",
          bsm.lookup(spans, "石田（し）委員", "2021-06-01") is None)
    check("区間の内側は答える",
          bsm.lookup(spans, "石田（し）委員", "2018-06-01") == "x-ishida-shingo")
    check("観測した日の外は答えない",
          bsm.lookup(spans, "石田（し）委員", "2026-06-01") is None)


def test_override_table() -> None:
    """上書き表があれば、自動で絞れないものもそれで決まる。"""
    reg = registry(overrides={("2017-06-01", "石田委員"): "hideo_ishida"})
    got = reg.resolve("石田委員", "2017-06-01")
    check("上書き表が効く", got.member_id == "hideo_ishida", got.describe())
    check("上書きしたことが分かる", got.by_override is True, got.describe())

    other = reg.resolve("石田委員", "2017-07-01")
    check("上書きは指定した日付だけに効く", other.member_id is None, other.describe())

    # 在職していない人を指す上書きは、書き間違いとして弾く
    try:
        bad = rs.Registry.from_sources(
            people=sample_people(),
            kana_by_id={},
            elections=sample_elections(),
            overrides={("2021-06-01", "石田委員"): "x-ishida-shingo"},
        )
        bad.validate_overrides()
        check("在職外を指す上書きを弾く", False, "例外が上がらなかった")
    except rs.OverrideError as error:
        check("在職外を指す上書きを弾く", True)
        check("どの行が悪いか分かる", "2021-06-01" in str(error), str(error))


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
