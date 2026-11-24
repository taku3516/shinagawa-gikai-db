#!/usr/bin/env python3
"""旧町名を地図に載せるデータの整合を確かめる。

旧町名（昭和39〜42年の住居表示の実施まで使われた町名）は、いまは存在しない。
住居表示新旧対照表から「現在のどの丁目にあたるか」は分かるが、旧町名の区域そのものの
形は分からない。そこで、旧町名ごとに住所がいちばん多い現在の丁目の中心を
「おおよその位置」として地図に出す。この約束が守られていることを、本物のデータで確かめる。

  - 旧町名の地名ごとに地点が1件あり、地名から地点へ relatedPlaces で結ばれていること
  - 位置の種類が approximate で、locationNote に「丁目の中心」と書いてあること
  - 緯度経度が品川区の範囲に収まること
  - 同じ丁目に複数の旧町名が重なっても、地点は別に出ること
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent

# 品川区のおおよその外枠（check_rekishi_data.py の検査より広め）
LAT_RANGE = (35.57, 35.65)
LNG_RANGE = (139.68, 139.78)


def load(name: str, key: str) -> dict:
    source = (ROOT / "data" / name).read_text(encoding="utf-8")
    return extract_object(source, f"window.SHINAGAWA_DB.{key}")


class OldTownPlacesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        names = load("rekishi-names.js", "rekishiNames")["items"]
        places = load("rekishi-places.js", "rekishiPlaces")["items"]
        cls.old_towns = [n for n in names if n["nameKind"] == "old-town"]
        cls.places = {p["id"]: p for p in places}

    def test_every_old_town_has_one_place(self) -> None:
        for town in self.old_towns:
            linked = [pid for pid in town.get("relatedPlaces", []) if pid in self.places]
            self.assertEqual(len(linked), 1, f"{town['name']} の地点が1件でない: {linked}")

    def test_place_is_approximate_with_note(self) -> None:
        for town in self.old_towns:
            place = self.places[town["relatedPlaces"][0]]
            self.assertEqual(place["locationKind"], "approximate", town["name"])
            self.assertIn("丁目の中心", place.get("locationNote", ""), town["name"])

    def test_place_is_inside_shinagawa(self) -> None:
        for town in self.old_towns:
            place = self.places[town["relatedPlaces"][0]]
            self.assertTrue(LAT_RANGE[0] <= place["lat"] <= LAT_RANGE[1], town["name"])
            self.assertTrue(LNG_RANGE[0] <= place["lng"] <= LNG_RANGE[1], town["name"])

    def test_place_cites_the_address_table(self) -> None:
        for town in self.old_towns:
            place = self.places[town["relatedPlaces"][0]]
            refs = [s["ref"] for s in place["sources"]]
            self.assertIn("adeac-shinagawa", refs, town["name"])
            self.assertIn(f"旧町名「{town['name']}」", place["sources"][0]["locator"], town["name"])

    def test_place_is_marked_as_former_town(self) -> None:
        for town in self.old_towns:
            place = self.places[town["relatedPlaces"][0]]
            self.assertIn("placename", place["categories"], town["name"])
            self.assertIn("lost", place["categories"], town["name"])
            self.assertTrue(place["name"].startswith("旧"), town["name"])


class OldAddressPlacesTest(unittest.TestCase):
    """区史が旧番地で書く施設を、住居表示新旧対照表で現住所に直して地図に載せる。"""

    # 出来事ID → 結ばれるはずの地点名
    LINKS = {
        "ev-1934-shinagawa-kuyakusho-completed": "旧品川町役場・品川区役所庁舎",
        "ev-1889-chosonsei-shiko-ebara": "旧大井村役場",
        "ev-1923-osaki-shokugyo-shokaijo": "旧大崎町役場",
        "ev-1928-mitsubishi-oi": "旧三菱航空機東京製作所",
    }

    @classmethod
    def setUpClass(cls) -> None:
        events = load("rekishi-events.js", "rekishiEvents")["items"]
        places = load("rekishi-places.js", "rekishiPlaces")["items"]
        cls.events = {e["id"]: e for e in events}
        cls.places = {p["id"]: p for p in places}
        cls.by_name = {p["name"]: p for p in places}

    def test_places_exist_as_former(self) -> None:
        for name in self.LINKS.values():
            place = self.by_name.get(name)
            self.assertIsNotNone(place, f"{name} の地点が無い")
            self.assertEqual(place["locationKind"], "former", name)
            self.assertIn("旧", place.get("locationNote", ""), name)

    def test_places_cite_kushi_and_address_table(self) -> None:
        for name in self.LINKS.values():
            refs = [s["ref"] for s in self.by_name[name]["sources"]]
            self.assertIn("sgw-kushi-tsushi-ge", refs, name)
            self.assertIn("adeac-shinagawa", refs, name)

    def test_events_link_to_places(self) -> None:
        for event_id, name in self.LINKS.items():
            place_id = self.by_name[name]["id"]
            self.assertIn(place_id, self.events[event_id].get("relatedPlaces", []), event_id)

    def test_addresses_are_at_go_level(self) -> None:
        # 丁目の代表点ではなく、番・号まで引けていること
        for name in self.LINKS.values():
            self.assertRegex(self.by_name[name]["address"], r"\d+-\d+-\d+", name)


if __name__ == "__main__":
    unittest.main()
