"""collect_news.py の記事要約から、定型のお断り文を除く検査。

品川区公式サイトは2026年10月20日のリニューアルでお断り文の表記が変わり
（「JavaScriptを有効」→「javascriptの使用を有効」）、従来の除外語に当たらなくなった。
除外判定は大文字小文字を無視する。
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import collect_news  # noqa: E402


class SummaryExclusionTest(unittest.TestCase):
    def test_リニューアル後のお断り文を要約に含めない(self):
        boilerplate = (
            "当ウェブサイトではjavascriptを使用しています。"
            "javascriptの使用を有効にしなければ、一部の機能が正確に動作しない恐れがあります。"
        )
        body = "夏期防犯パトロールを実施しました。"
        self.assertTrue(collect_news.is_boilerplate(boilerplate))
        self.assertFalse(collect_news.is_boilerplate(body))

    def test_リニューアル前のお断り文も引き続き除く(self):
        self.assertTrue(collect_news.is_boilerplate("JavaScriptを有効にしてください。"))
        self.assertTrue(collect_news.is_boilerplate("Copyright © Shinagawa City."))

    def test_パンくずとページ情報を要約に含めない(self):
        self.assertTrue(collect_news.is_boilerplate(
            "現在の位置 ： トップページ くらし 地域活動・コミュニティ 地域センター"))
        self.assertTrue(collect_news.is_boilerplate("ページID：1011308 更新日：2026年10月16日"))


if __name__ == "__main__":
    unittest.main()
