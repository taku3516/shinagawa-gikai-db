#!/usr/bin/env python3
"""続資料編（一）の地名辞典から足した、北品川宿・歩行新宿の小地名を確かめる。

 - 足した地名が、出典（続資料編（一））とページ付きで載っていること
 - 由来が分からないものは、分からないと正直に書いてあること
 - 北品川宿の由来が、南北に分かれた経緯として入っていること
 - 町目の数え方が明治8年に変わったことが、歩行新宿の記述に入っていること
を、リポジトリの本物のデータで確かめる。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
REF = "sgw-kushi-zokushiryo-1"

# 続資料編（一）から起こした地名（ID → 由来を載せるか。False は由来不明と書く）
NEW_NAMES: dict[str, bool] = {
    "nm-kuromon-yokocho": True,
    "nm-oyokocho": True,
    "nm-toriya-yokocho": True,
    "nm-jinya-yokocho": True,
    "nm-mondo-gashi": True,
    "nm-dainichiyama": True,
    "nm-kita-shinagawa-honshuku": True,
    "nm-kachishinshuku-uramachi": True,
    "nm-kita-shinagawa-uramachi": True,
    "nm-kita-baba-machi": True,
    "nm-takeya-yokocho": False,
    "nm-kachishinshuku-chome": True,
    "nm-kita-shinagawa-chome": True,
}


def load_names() -> dict[str, dict]:
    source = (ROOT / "data" / "rekishi-names.js").read_text(encoding="utf-8")
    data = extract_object(source, "window.SHINAGAWA_DB.rekishiNames")
    return {item["id"]: item for item in data["items"]}


class Zoku1NamesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.names = load_names()

    def test_new_names_exist(self) -> None:
        for name_id in NEW_NAMES:
            self.assertIn(name_id, self.names, name_id)

    def test_origin_is_filled_or_marked_unknown(self) -> None:
        for name_id, has_origin in NEW_NAMES.items():
            item = self.names[name_id]
            if has_origin:
                self.assertTrue(item.get("origin"), f"{name_id} の origin が空")
            else:
                self.assertIsNone(item.get("origin"), name_id)
                self.assertIn("由来は不明", item["summary"], name_id)

    def test_cited_with_page(self) -> None:
        for name_id in NEW_NAMES:
            sources = [s for s in self.names[name_id]["sources"] if s["ref"] == REF]
            self.assertTrue(sources, f"{name_id} に続資料編（一）の出典が無い")
            for source in sources:
                self.assertRegex(source["locator"], r"\d+(〜\d+)?頁", name_id)

    def test_kita_shinagawa_shuku_has_origin(self) -> None:
        # 品川が南北に分かれ、目黒川の北側が北品川宿になった経緯。正式な時期は不明
        item = self.names["nm-kita-shinagawa-shuku"]
        self.assertTrue(item.get("origin"))
        self.assertIn("目黒川", item["origin"])
        self.assertNotIn("由来は確認できていません", item["summary"])
        self.assertIn(REF, [s["ref"] for s in item["sources"]])

    def test_kachishinshuku_gains_reason_for_name(self) -> None:
        # 歩行人足だけを負担したので「歩行」新宿
        item = self.names["nm-kachishinshuku"]
        self.assertIn("歩行人足", item["origin"])
        self.assertIn(REF, [s["ref"] for s in item["sources"]])

    def test_chome_numbering_changed_in_meiji8(self) -> None:
        for name_id in ("nm-kachishinshuku-chome", "nm-kita-shinagawa-chome"):
            text = self.names[name_id]["origin"] + self.names[name_id]["description"]
            self.assertIn("明治8年", text, name_id)

    def test_related_names_resolve(self) -> None:
        for name_id in NEW_NAMES:
            for other in self.names[name_id].get("relatedNames", []):
                self.assertIn(other, self.names, f"{name_id} → {other}")


# 地名そのものの由来（諸説）。説の数だけ variants に並べる
ORIGIN_THEORIES: dict[str, int] = {
    "nm-shinagawa": 4,  # 目黒川の古名説を origin に、ほか4説を variants に
    "nm-osaki": 3,  # 三説とも決め手を欠くので、三説とも variants に
}


class OriginTheoriesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.names = load_names()

    def test_theories_are_listed_with_sources(self) -> None:
        for name_id, count in ORIGIN_THEORIES.items():
            self.assertIn(name_id, self.names, name_id)
            item = self.names[name_id]
            self.assertTrue(item.get("origin"), name_id)
            variants = item.get("variants", [])
            self.assertEqual(len(variants), count, name_id)
            for variant in variants:
                self.assertEqual(variant["ref"], REF, name_id)
                self.assertRegex(variant["locator"], r"\d+(〜\d+)?頁", name_id)

    def test_shinagawa_origin_names_meguro_river(self) -> None:
        # 区史が主に紹介するのは目黒川の古名説。年は文明8年（1476年）
        origin = self.names["nm-shinagawa"]["origin"]
        self.assertIn("目黒川", origin)
        self.assertIn("1476", origin)

    def test_osaki_admits_no_conclusion(self) -> None:
        text = self.names["nm-osaki"]["summary"] + self.names["nm-osaki"]["origin"]
        self.assertIn("確証", text)


if __name__ == "__main__":
    unittest.main()
