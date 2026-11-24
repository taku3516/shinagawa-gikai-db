#!/usr/bin/env python3
"""全国文化財総覧の報告書ページから、所収遺跡の事実を取り出す処理を確かめる。

取り出すのは遺跡名・調査期間・調査原因・時代・主な遺構と遺物・世界測地系の緯度経度。
報告書の本文は転載しない（著作権は発行元にある）。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

import nabunken_sites

# 実際のページ（御殿山遺跡 第11・12次）から、所収遺跡の部分だけを抜いた見本
SAMPLE = """御殿山遺跡 - 全国文化財総覧 品川区教育委員会 2025 『御殿山遺跡』 発行年月日 20251200 所収遺跡 \
遺跡名 御殿山遺跡11次 遺跡名かな ごてんやまいせき 本内順位 遺跡所在地 所在地ふりがな 市町村コード 13109 遺跡番号 8 \
北緯（日本測地系）度分秒 東経（日本測地系）度分秒 北緯（世界測地系）度分秒 353715 東経（世界測地系）度分秒 1394403 \
経緯度（世界測地系）10進数(自動生成) 35.620833 139.734166 文化財総覧WebGISで確認する ※当該位置周辺を表示し、同一名称の遺跡データが存在する場合は遺跡をポイント表示します。 \
調査期間 20230327-20230530 調査面積（㎡） 146 調査原因 個人住宅兼集合住宅建設 遺跡概要 種別 時代 縄文 古墳 近世(細分不明) \
主な遺構 住居 土坑 溝状遺構 礎石 主な遺物 縄文土器 土師器 須恵器 磁器 陶器 特記事項 縄文時代では早期後半から前期を主体とする土器が出土した。 \
種別 集落 時代 縄文 古墳 近世(細分不明) 主な遺構 住居跡 土坑 主な遺物 縄文土器 土師器 特記事項 \
遺跡名 御殿山遺跡12次 遺跡名かな ごてんやまいせき 本内順位 遺跡所在地 所在地ふりがな 市町村コード 13109 遺跡番号 8 \
北緯（世界測地系）度分秒 353716 東経（世界測地系）度分秒 1394403 経緯度（世界測地系）10進数(自動生成) 35.621111 139.734166 \
文化財総覧WebGISで確認する 調査期間 20240729-20240917 調査面積（㎡） 61 調査原因 個人住宅建設 遺跡概要 種別 集落 時代 縄文 古墳 江戸 近代(細分不明) \
主な遺構 主な遺物 特記事項 古墳時代では中期に帰属する住居跡を検出した。 要約 関連文化財データ一覧"""


class ParseSitesTest(unittest.TestCase):
    def test_two_sites_are_found(self) -> None:
        sites = nabunken_sites.parse_sites(SAMPLE)
        self.assertEqual([s["name"] for s in sites], ["御殿山遺跡11次", "御殿山遺跡12次"])

    def test_coordinates_are_world_geodetic_decimal(self) -> None:
        site = nabunken_sites.parse_sites(SAMPLE)[0]
        self.assertAlmostEqual(site["lat"], 35.620833)
        self.assertAlmostEqual(site["lng"], 139.734166)

    def test_period_and_cause(self) -> None:
        site = nabunken_sites.parse_sites(SAMPLE)[0]
        self.assertEqual(site["surveyStart"], "2023-03-27")
        self.assertEqual(site["surveyEnd"], "2023-05-30")
        self.assertEqual(site["cause"], "個人住宅兼集合住宅建設")
        self.assertEqual(site["eras"], ["縄文", "古墳", "近世(細分不明)"])

    def test_features_and_finds(self) -> None:
        site = nabunken_sites.parse_sites(SAMPLE)[0]
        self.assertIn("住居", site["features"])
        self.assertIn("縄文土器", site["finds"])

    def test_report_title_and_date(self) -> None:
        report = nabunken_sites.parse_report(SAMPLE)
        self.assertEqual(report["title"], "御殿山遺跡")
        self.assertEqual(report["published"], "2025-12")

    def test_base_name_drops_the_survey_number(self) -> None:
        self.assertEqual(nabunken_sites.base_name("御殿山遺跡11次"), "御殿山遺跡")
        self.assertEqual(nabunken_sites.base_name("居木橋遺跡（D地区）"), "居木橋遺跡")
        self.assertEqual(nabunken_sites.base_name("大井鹿島遺跡"), "大井鹿島遺跡")
        self.assertEqual(nabunken_sites.base_name("池田山北遺跡 第2次・"), "池田山北遺跡")
        self.assertEqual(nabunken_sites.base_name("居木橋遺跡B地区２"), "居木橋遺跡")
        self.assertEqual(nabunken_sites.base_name("池田山遺跡１"), "池田山遺跡")
        self.assertEqual(nabunken_sites.base_name("池田山北遺跡 第2次・第3次"), "池田山北遺跡")

    def test_missing_coordinates_give_none(self) -> None:
        text = "所収遺跡 遺跡名 ある遺跡 遺跡名かな あるいせき 調査期間 20000101-20000201 調査原因 道路 遺跡概要 種別 時代 縄文 主な遺構 主な遺物 特記事項 要約"
        site = nabunken_sites.parse_sites(text)[0]
        self.assertIsNone(site["lat"])


class ItemIdsTest(unittest.TestCase):
    def test_ids_on_first_and_later_pages(self) -> None:
        source = (
            '<a href="/ja/list/13/13109/item/146832?sort=publish_date%3Ar">a</a>'
            '<a href="/ja/list/13/13109/p/2/item/77781?sort=publish_date%3Ar">b</a>'
            '<a href="/ja/list/13/13109/p/3/item/77790">c</a>'
            '<a href="/ja/list/13/13109/p/2/item/77781">dup</a>'
        )
        self.assertEqual(nabunken_sites.extract_item_ids(source), ["146832", "77781", "77790"])


if __name__ == "__main__":
    unittest.main()
