#!/usr/bin/env python3
"""全国文化財総覧の遺跡抄録から起こした地点が、約束どおりに載っていることを確かめる。

  - 座標は遺跡抄録の値（世界測地系の10進数）をそのまま使い、地点は遺跡ごとに1件
  - 位置の種類は「現在地」ではなく「おおよその位置」にする（秒単位で、調査地点ごとに少し違うため）
  - 出典は全国文化財総覧で、本文ではなく事実（遺跡名・時代・調査年）だけを載せる
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
SITES = [
    "居木橋遺跡", "御殿山遺跡", "池田山北遺跡", "大井鹿島遺跡", "仙台坂遺跡",
    "妙国寺北遺跡", "池田山遺跡", "寿昌寺遺跡", "播磨国三日月藩森家上屋敷跡遺跡",
]


class SitePlacesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        source = (ROOT / "data" / "rekishi-places.js").read_text(encoding="utf-8")
        places = extract_object(source, "window.SHINAGAWA_DB.rekishiPlaces")["items"]
        cls.by_name = {p["name"]: p for p in places}

    def test_every_site_is_a_place(self) -> None:
        for name in SITES:
            self.assertIn(name, self.by_name, name)

    def test_location_is_approximate_with_note(self) -> None:
        for name in SITES:
            place = self.by_name[name]
            self.assertEqual(place["locationKind"], "approximate", name)
            self.assertIn("遺跡抄録", place.get("locationNote", ""), name)

    def test_source_is_the_site_reports(self) -> None:
        for name in SITES:
            refs = [s["ref"] for s in self.by_name[name]["sources"]]
            self.assertEqual(refs[0], "nabunken-sitereports", name)

    def test_category_is_site(self) -> None:
        for name in SITES:
            self.assertIn("site", self.by_name[name]["categories"], name)


if __name__ == "__main__":
    unittest.main()
