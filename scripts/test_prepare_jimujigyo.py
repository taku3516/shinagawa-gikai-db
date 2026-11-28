"""事務事業評価シートの読み取りの検査。

正解は、事業ごとの記録（児童相談所）を作るときに評価シートと手で突き合わせた値。
評価シートは表の文字を順に取り出すと列が混ざるので、座標で読む。
その読み方がずれていないかを、確かめ済みの4小事業で固定する。

評価シートPDFは scripts/cache/jimujigyo-<年度>/ に置く（取得は prepare_jimujigyo.py --fetch）。
無い環境では、PDFを使う検査だけ飛ばす。
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import prepare_jimujigyo as pj  # noqa: E402

R07 = pj.YEARS["r07"]
R06 = pj.YEARS["r06"]
CHILD_GUIDANCE_PDF = R07.cache / "s42.pdf"
R06_PLANNING_PDF = R06.cache / "s20.pdf"


class ParseHelpersTest(unittest.TestCase):
    def test_千円の数字を円に直す(self) -> None:
        self.assertEqual(pj.thousand_yen("83,460"), 83_460_000)
        self.assertEqual(pj.thousand_yen("0"), 0)
        self.assertIsNone(pj.thousand_yen("－"))

    def test_執行率を読む(self) -> None:
        self.assertEqual(pj.percent("94.5%"), 94.5)
        self.assertEqual(pj.percent("0.0% "), 0.0)
        self.assertIsNone(pj.percent("－"))

    def test_最終評価の区分を読む(self) -> None:
        text = "(1)所管評価\n◆Ｂ　継続する事業\n(2)最終評価\n【評価結果・今後の取組の方向性】\n◆Ａ　拡大する事業　　　◆対象の拡大\n【説明】"
        self.assertEqual(pj.final_evaluation(text), {"code": "A", "label": "拡大する事業", "direction": "対象の拡大"})

    def test_最終評価が無ければNone(self) -> None:
        self.assertIsNone(pj.final_evaluation("(1)所管評価\n◆Ｂ　継続する事業"))


@unittest.skipUnless(CHILD_GUIDANCE_PDF.exists(), "評価シートPDFが未取得")
class ChildGuidanceSheetTest(unittest.TestCase):
    """児童相談所の評価シート（4頁）。手で確かめた値と一致すること。"""

    @classmethod
    def setUpClass(cls) -> None:
        cls.rows = pj.read_pdf(CHILD_GUIDANCE_PDF, department="品川区児童相談所", year=R07)

    def test_4小事業を読む(self) -> None:
        self.assertEqual([r["name"] for r in self.rows], [
            "児童相談所移管推進事業", "児童相談所運営費", "一時保護所運営費", "児童相談所維持管理経費"])

    def test_予算現額と決算額と執行率(self) -> None:
        expected = [
            (83_460_000, 78_844_000, 94.5),
            (172_439_000, 149_439_000, 86.7),
            (49_434_000, 40_106_000, 81.1),
            (82_501_000, 76_933_000, 93.3),
        ]
        got = [(r["budgetYen"], r["settledYen"], r["rate"]) for r in self.rows]
        self.assertEqual(got, expected)

    def test_最終評価(self) -> None:
        self.assertEqual([r["evaluation"]["code"] for r in self.rows], ["D", "A", "B", "B"])

    def test_頁番号と基本情報(self) -> None:
        first = self.rows[0]
        self.assertEqual(first["page"], 1)
        self.assertEqual(first["department"], "品川区児童相談所")
        self.assertEqual(first["section"], "児童相談課")
        self.assertEqual(first["account"], {"kan": "民生費", "kou": "児童福祉費", "moku": "児童相談所費"})
        self.assertEqual(first["period"], "平成29年度 ～ 令和 6年度")
        self.assertIn("児童福祉法第12条", first["legal"])
        self.assertTrue(first["purpose"].startswith("◆住民生活に身近な基礎自治体として"))

    def test_成果指標(self) -> None:
        operations = self.rows[1]
        abuse = next(i for i in operations["indicators"] if i["label"].startswith("虐待相談対応件数"))
        self.assertEqual((abuse["target"], abuse["actual"]), ("913", "602"))


@unittest.skipUnless(R06_PLANNING_PDF.exists(), "評価シートPDFが未取得")
class R06PlanningSheetTest(unittest.TestCase):
    """令和6年度評価（A4横の様式）の企画経営部。区のPDFと見比べた値。"""

    @classmethod
    def setUpClass(cls) -> None:
        cls.rows = pj.read_pdf(R06_PLANNING_PDF, department="企画経営部", year=R06)

    def test_予算と決算を読む(self) -> None:
        project = self.rows[1]
        self.assertEqual(project["name"], "全庁共通プロジェクト推進経費")
        self.assertEqual((project["budgetYen"], project["settledYen"], project["unusedYen"], project["rate"]),
                         (70_695_000, 29_758_000, 40_937_000, 42.1))

    def test_実施年度の実績を読む(self) -> None:
        indicator = self.rows[1]["indicators"][0]
        self.assertEqual((indicator["label"], indicator["unit"], indicator["actual"]), ("区有地活用方針決定件数", "件", "3"))


class LayoutTest(unittest.TestCase):
    """頁の左右の境目は様式で変わるので、「４ 予算・決算」の見出しから決める。"""

    def test_予算決算の見出しの左が境目(self) -> None:
        self.assertAlmostEqual(pj.right_edge([(35.9, 451.3, 538.1, "４\u3000予算・決算（概要）")]), 443.3)
        self.assertAlmostEqual(pj.right_edge([(38.2, 628.3, 751.1, "４\u3000予算・決算（概要）")]), 620.3)

    def test_見出しが無ければ従来の境目(self) -> None:
        self.assertEqual(pj.right_edge([]), pj.RIGHT_HALF_X)


def sheet(id_: str, name: str, kaikei: str = "一般会計", section: str = "企画課", budget: int = 1000) -> dict:
    """年度をまたぐ対応づけの検査用に、評価シート1頁分の記録を最小限の項目で作る。"""
    return {"id": id_, "name": name, "kaikei": kaikei, "section": section, "budgetYen": budget, "settledYen": budget // 2,
            "rate": 50.0, "evaluation": {"code": "B", "label": "継続する事業", "direction": ""}}


class LinkYearsTest(unittest.TestCase):
    """同じ事業を年度間でつなぐ。根拠が一意に定まるものだけを結ぶ。"""

    def link(self, by_year: dict) -> dict:
        pj.link_years(by_year)
        return {row["id"]: [h["id"] for h in row.get("history", [])] for rows in by_year.values() for row in rows}

    def test_名前と会計が一意なら3年度をつなぐ(self) -> None:
        got = self.link({"r07": [sheet("r07-1-1", "計画策定経費")], "r06": [sheet("r06-1-1", "計画策定経費")],
                         "r05": [sheet("r05-1-1", "計画策定経費")]})
        self.assertEqual(got["r07-1-1"], ["r06-1-1", "r05-1-1"])
        self.assertEqual(got["r05-1-1"], ["r07-1-1", "r06-1-1"])

    def test_同じ名前は会計で見分ける(self) -> None:
        got = self.link({
            "r07": [sheet("r07-1-1", "葬祭費"), sheet("r07-2-1", "葬祭費", kaikei="国民健康保険事業会計")],
            "r06": [sheet("r06-2-1", "葬祭費", kaikei="国民健康保険事業会計"), sheet("r06-1-1", "葬祭費")],
        })
        self.assertEqual((got["r07-1-1"], got["r07-2-1"]), (["r06-1-1"], ["r06-2-1"]))

    def test_会計でも重なれば担当課で見分け_それでも重なればつながない(self) -> None:
        got = self.link({
            "r07": [sheet("r07-1-1", "審査支払手数料", section="高齢者福祉課"), sheet("r07-1-2", "審査支払手数料", section="国保医療年金課"),
                    sheet("r07-1-3", "事務費"), sheet("r07-1-4", "事務費")],
            "r06": [sheet("r06-1-1", "審査支払手数料", section="国保医療年金課"), sheet("r06-1-2", "審査支払手数料", section="高齢者福祉課"),
                    sheet("r06-1-3", "事務費"), sheet("r06-1-4", "事務費")],
        })
        self.assertEqual((got["r07-1-1"], got["r07-1-2"]), (["r06-1-2"], ["r06-1-1"]))
        self.assertEqual((got["r07-1-3"], got["r07-1-4"]), ([], []))

    def test_名前が変わった事業はつながない(self) -> None:
        got = self.link({"r07": [sheet("r07-1-1", "区政モニター経費")], "r06": [sheet("r06-1-1", "広聴経費")]})
        self.assertEqual(got["r07-1-1"], [])

    def test_他年度の要約は予算と評価だけを持つ(self) -> None:
        by_year = {"r07": [sheet("r07-1-1", "計画策定経費", budget=3000)], "r06": [sheet("r06-1-1", "計画策定経費", budget=2000)]}
        pj.link_years(by_year)
        self.assertEqual(by_year["r07"][0]["history"], [{
            "id": "r06-1-1", "year": "r06", "budgetYen": 2000, "settledYen": 1000, "rate": 50.0, "evaluation": "B"}])


class SummaryTest(unittest.TestCase):
    """事務事業評価ページに出す集計（評価区分別・部署別の件数と予算・決算の合計）。"""

    def test_部署ごとと全体の件数と金額を足し上げる(self) -> None:
        rows = [
            dict(sheet("r06-1-1", "甲", budget=1000), department="企画経営部"),
            dict(sheet("r06-1-2", "乙", budget=3000), department="企画経営部", evaluation={"code": "A"}),
            dict(sheet("r06-2-1", "丙", budget=500), department="区長室", evaluation={"code": "D"}),
        ]
        got = pj.summarize(R06, rows)
        self.assertEqual((got["key"], got["evaluationYear"], got["fiscalYear"], got["total"]), ("r06", "令和6年度", "令和5年度", 3))
        self.assertEqual(got["evaluations"], {"A": 1, "B": 1, "C": 0, "D": 1})
        self.assertEqual((got["budgetYen"], got["settledYen"]), (4500, 2250))
        # 部署は評価シートの並び順（区の部局順）
        self.assertEqual([d["name"] for d in got["departments"]], ["企画経営部", "区長室"])
        self.assertEqual(got["departments"][0], {"name": "企画経営部", "count": 2, "evaluations": {"A": 1, "B": 1, "C": 0, "D": 0},
                                                 "budgetYen": 4000, "settledYen": 2000})

    def test_読めなかった金額は合計から除き_件数に数える(self) -> None:
        rows = [dict(sheet("r06-1-1", "甲"), department="企画経営部", budgetYen=None, settledYen=None)]
        got = pj.summarize(R06, rows)
        self.assertEqual((got["total"], got["budgetYen"], got["missingAmounts"]), (1, 0, 1))


class BudgetBillsTest(unittest.TestCase):
    """事業が属する年度・会計の予算議案（当初予算と補正予算）を、議案の件名から拾う。"""

    BILLS = [
        {"meetingId": "r06-1t", "number": "第5号 議案", "title": "第5号 議案 令和６年度品川区一般会計予算", "result": "原案可決"},
        {"meetingId": "r06-1t", "number": "第6号 議案", "title": "第6号 議案 令和６年度品川区国民健康保険事業会計予算", "result": "原案可決"},
        {"meetingId": "r06-1t", "number": "第1号 議案", "title": "第1号 議案 令和５年度品川区一般会計補正予算", "result": "原案可決"},
        {"meetingId": "r06-2t", "number": "第45号 議案", "title": "第45号 議案 令和６年度品川区一般会計補正予算", "result": "原案可決"},
        {"meetingId": "r06-1t", "number": "第22号 議案", "title": "第22号 議案 品川区立大原児童発達支援センター条例", "result": "原案可決"},
    ]

    def test_議案のIDは画面と同じ作り方(self) -> None:
        self.assertEqual(pj.bill_id({"meetingId": "r05-4t", "number": "第80号 議案"}), "r05-4t:第80号議案")
        self.assertEqual(pj.bill_id({"meetingId": "r08-1r", "number": "第５６号"}), "r08-1r:第56号")

    def test_年度と会計ごとに当初予算と補正予算を分ける(self) -> None:
        got = pj.budget_bills(self.BILLS, reiwa=6)
        self.assertEqual(sorted(got), ["一般会計", "国民健康保険事業会計"])
        self.assertEqual([(b["id"], b["kind"]) for b in got["一般会計"]],
                         [("r06-1t:第5号議案", "当初予算"), ("r06-2t:第45号議案", "補正予算")])
        self.assertEqual(got["一般会計"][0]["title"], "令和６年度品川区一般会計予算")

    def test_補正予算は暦年と議案番号の順(self) -> None:
        bills = [{"meetingId": m, "number": f"第{n}号 議案", "title": f"第{n}号 議案 令和６年度品川区一般会計補正予算"}
                 for m, n in [("r07-1t", 1), ("r06-3r", 108), ("r06-3t", 75), ("r06-4t", 87)]]
        self.assertEqual([b["id"] for b in pj.budget_bills(bills, reiwa=6)["一般会計"]],
                         ["r06-3t:第75号議案", "r06-4t:第87号議案", "r06-3r:第108号議案", "r07-1t:第1号議案"])

    def test_品川区の付かない件名も拾う(self) -> None:
        bills = [{"meetingId": "r08-1r", "number": "第56号", "title": "第56号 令和8年度一般会計補正予算", "result": "原案可決"}]
        self.assertEqual([b["id"] for b in pj.budget_bills(bills, reiwa=8)["一般会計"]], ["r08-1r:第56号"])

    def test_年別データの全件ファイルから議案を読む(self) -> None:
        source = """/* 補足 */\n(() => {\n  year.bills = [\n  {"meetingId": "r06-1t", "number": "第5号 議案", "title": "x"}\n];\n  year.other = [];\n})();\n"""
        self.assertEqual(pj.bills_from_supplement(source), [{"meetingId": "r06-1t", "number": "第5号 議案", "title": "x"}])


class PurposeBlockTest(unittest.TestCase):
    """目的・概要欄の切り出し（【概要】の小見出しが無いシートで実際に起きた崩れ）。"""

    def test_概要が無ければ目的は次の節の手前で止まる(self) -> None:
        lines = [
            (60.0, 46.0, 140.0, "２　目的・概要"),
            (72.0, 46.0, 80.0, "【目的】"),
            (84.0, 46.0, 400.0, "◆計画を策定する。"),
            (110.0, 46.0, 158.0, "３　事業の実績・課題"),
            (130.0, 172.7, 189.5, "目標"),
            (130.0, 290.0, 330.0, "20"),
        ]
        record = pj.read_page(lines, fiscal_year=2024)
        self.assertEqual(record["purpose"], "◆計画を策定する。")
        self.assertEqual(record["overview"], "")


class IndicatorRowsTest(unittest.TestCase):
    """指標表の行の切り分け（評価シートで実際に出た崩れ方を再現）。"""

    @staticmethod
    def area(rows: list) -> list:
        header = [(343.0, 46.0, 158.0, "３　事業の実績・課題"), (362.2, 82.4, 107.6, "指標名"),
                  (362.2, 148.9, 189.5, "単位 区分"), (367.9, 290.6, 332.5, "(2024年度)"),
                  (367.9, 338.0, 431.5, "(2025年度) （達成年度）")]
        return header + rows + [(535.2, 45.7, 104.4, "取組内容・実績")]

    def test_実績のラベルに値がくっついても次の指標に流れない(self) -> None:
        lines = self.area([
            (383.1, 172.7, 189.5, "目標"), (388.2, 48.7, 140.9, "地区図書館における貸出"), (392.8, 153.1, 161.5, "点"),
            (397.6, 82.2, 107.4, "資料数"), (402.7, 172.7, 235.6, "実績 2,536,656"), (402.7, 292.7, 330.4, "2,397,241"),
            (422.1, 172.7, 189.5, "目標"), (422.1, 307.3, 315.7, "85"), (427.3, 48.7, 140.9, "図書館利用者アンケート"),
            (432.0, 153.1, 161.5, "％"), (436.6, 69.7, 119.9, "による満足度"),
            (441.7, 172.7, 189.5, "実績"), (441.7, 303.1, 319.9, "86.4"),
        ])
        rows = pj.indicators(lines, fiscal_year=2024)
        self.assertEqual([(r["label"], r["unit"], r["actual"]) for r in rows], [
            ("地区図書館における貸出資料数", "点", "2,397,241"),
            ("図書館利用者アンケートによる満足度", "％", "86.4"),
        ])

    def test_A4横の様式では列の位置を見出しから決める(self) -> None:
        # 令和6年度評価（令和5年度実施）。年度の列が4つあり、名前・単位・区分の列が左に寄っている
        lines = [
            (242.6, 40.0, 118.8, "３\u3000事業の実績・課題"),
            (255.5, 64.4, 82.0, "指標名"), (255.5, 109.7, 137.5, "単位 区分"), (255.5, 336.6, 365.3, "指標の定義"),
            (259.2, 140.9, 170.5, "(2021年度)"), (259.2, 173.2, 234.9, "(2022年度) (2023年度)"),
            (259.2, 237.5, 302.3, "(2024年度)（達成年度）"),
            (266.6, 301.3, 378.3, "活用方針を区長決定した件数"),
            (269.3, 125.8, 137.5, "目標"), (275.8, 40.3, 105.5, "区有地活用方針決定件数"), (275.8, 112.6, 118.5, "件"),
            (282.1, 125.8, 137.5, "実績"), (282.1, 154.2, 157.2, "3"), (282.1, 186.5, 189.4, "1"), (282.1, 218.6, 221.6, "3"),
            (295.0, 125.8, 137.5, "目標"), (307.8, 125.8, 137.5, "実績"),
            (400.0, 40.0, 100.0, "取組内容・実績"),
        ]
        rows = pj.indicators(lines, fiscal_year=2023)
        self.assertEqual([(r["label"], r["unit"], r["definition"], r["actual"]) for r in rows],
                         [("区有地活用方針決定件数", "件", "活用方針を区長決定した件数", "3")])

    def test_行の間隔が狭い様式でも指標名が前後の欄に混ざらない(self) -> None:
        # 令和6年度評価 区長室17頁。名前や定義が「目標」の行より上から始まり、次の指標と近い
        lines = [
            (242.6, 40.0, 118.8, "３\u3000事業の実績・課題"),
            (255.5, 64.4, 82.0, "指標名"), (255.5, 109.7, 137.5, "単位 区分"), (255.5, 336.6, 365.3, "指標の定義"),
            (259.2, 140.9, 170.5, "(2021年度)"), (259.2, 173.2, 234.9, "(2022年度) (2023年度)"),
            (259.2, 237.5, 302.3, "(2024年度)（達成年度）"),
            (266.6, 301.3, 372.4, "品川区世論調査の回答結果"),
            (269.0, 40.3, 105.5, "区に関する情報をふれあ"), (269.3, 125.8, 137.5, "目標"),
            (269.3, 280.1, 288.9, "7.0"), (275.8, 46.3, 99.5, "い掲示板（統合ポス"), (275.8, 112.6, 118.5, "％"),
            (282.1, 125.8, 137.5, "実績"), (282.1, 183.5, 192.4, "6.3"), (282.4, 43.3, 102.5, "ター）で得ている割合"),
            (292.2, 301.3, 372.4, "品川区世論調査の回答結果"),
            (294.7, 40.3, 105.5, "区に関する情報を町会回"), (295.0, 125.8, 137.5, "目標"),
            (301.4, 40.3, 105.5, "覧板（統合ちらし）で得"), (301.4, 112.6, 118.5, "％"),
            (307.8, 125.8, 137.5, "実績"), (307.8, 213.0, 225.0, "13.5"), (308.0, 58.1, 87.6, "ている割合"),
            (400.0, 40.0, 100.0, "取組内容・実績"),
        ]
        rows = pj.indicators(lines, fiscal_year=2023)
        self.assertEqual([(r["label"], r["unit"], r["definition"], r["actual"], r["goal"]) for r in rows], [
            ("区に関する情報をふれあい掲示板（統合ポスター）で得ている割合", "％", "品川区世論調査の回答結果", "", "7.0"),
            ("区に関する情報を町会回覧板（統合ちらし）で得ている割合", "％", "品川区世論調査の回答結果", "13.5", ""),
        ])


if __name__ == "__main__":
    unittest.main()
