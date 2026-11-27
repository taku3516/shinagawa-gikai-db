"""事務事業評価シートの読み取りの検査。

正解は、事業ごとの記録（児童相談所）を作るときに評価シートと手で突き合わせた値。
評価シートは表の文字を順に取り出すと列が混ざるので、座標で読む。
その読み方がずれていないかを、確かめ済みの4小事業で固定する。

評価シートPDFは scripts/cache/jimujigyo-r07/ に置く（取得は prepare_jimujigyo.py --fetch）。
無い環境では、PDFを使う検査だけ飛ばす。
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import prepare_jimujigyo as pj  # noqa: E402

CACHE = Path(__file__).resolve().parent / "cache" / "jimujigyo-r07"
CHILD_GUIDANCE_PDF = CACHE / "s42.pdf"


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
        cls.rows = pj.read_pdf(CHILD_GUIDANCE_PDF, department="品川区児童相談所")

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


if __name__ == "__main__":
    unittest.main()
