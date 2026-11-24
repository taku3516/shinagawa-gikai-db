#!/usr/bin/env python3
"""区史 資料編（人物略伝）から起こした人物を確かめる。

出典は sgw-kushi-shiryo で、locator に略伝の見出しと底本のページがあること。
生没年が出典に無い人物は null のまま（推測で埋めない）。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
REF = "sgw-kushi-shiryo"

# バッチごとに足していく
PEOPLE_IDS = [
    "pe-ota-dokan", "pe-suzuki-doin", "pe-udagawa-nagakiyo", "pe-tsukinomoto-izan",
    "pe-hattori-nankaku", "pe-shirai-chosui", "pe-shunjuan-hakuyu", "pe-matsudaira-fumai",
    "pe-myosen-nissen", "pe-tsuruoka-fuyukage", "pe-ryutei-tanehiko", "pe-egawa-tarozaemon",
    "pe-iwakura-tomomi", "pe-terashima-munenori", "pe-nishimura-katsuzo",
    "pe-james", "pe-kawase-hideharu", "pe-hara-rokuro", "pe-ogaki-kikusaburo",
    "pe-hibiya-heizaemon", "pe-kuriyama-tomojiro", "pe-suematsu-kencho", "pe-uehara-yusaku",
    "pe-oshige-nakazaemon", "pe-ogino-teijiro", "pe-toriyama-teijiro", "pe-sakurai-kashichi",
    "pe-morita-setsu", "pe-murabayashi-hikoyuki", "pe-nawa-nagenori", "pe-samejima-sokichi",
    "pe-sugiura-tetsugoro", "pe-honda-nissho", "pe-yoshine-yasaburo", "pe-sakurai-otaro",
    "pe-nishimura-kikujiro", "pe-shigemune-hosui",
    "pe-fukuoka-heiemon", "pe-toyomichi-shunkai", "pe-ishihara-eimei", "pe-ohashi-seitaro",
    "pe-hara-kunizo", "pe-yamamura-koka", "pe-kuramoto-hikogoro", "pe-matsuoka-komakichi",
    "pe-ito-koan", "pe-nishimoto-kei", "pe-murata-kakuko", "pe-kamijo-hidesuke",
    "pe-takabayashi-katsutaro", "pe-shiomi-hiroshi", "pe-arisaka-yotaro",
]


def load(name: str, key: str) -> dict:
    source = (ROOT / "data" / name).read_text(encoding="utf-8")
    return extract_object(source, f"window.SHINAGAWA_DB.{key}")


class PeopleFromShiryoTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.people = {p["id"]: p for p in load("rekishi-people.js", "rekishiPeople")["items"]}

    def test_people_exist(self) -> None:
        for pid in PEOPLE_IDS:
            self.assertIn(pid, self.people, pid)

    def test_source_has_heading_and_page(self) -> None:
        for pid in PEOPLE_IDS:
            sources = [s for s in self.people[pid]["sources"] if s["ref"] == REF]
            self.assertTrue(sources, pid)
            self.assertRegex(sources[0]["locator"], r"「.+」\d+(〜\d+)?頁", pid)

    def test_basic_fields_are_filled(self) -> None:
        for pid in PEOPLE_IDS:
            person = self.people[pid]
            self.assertTrue(person["summary"], pid)
            self.assertTrue(person["shinagawaRelation"], pid)
            self.assertIn("birthYear", person, pid)

    def test_conflicts_with_kushi_are_recorded(self) -> None:
        # 区史と資料編で記述が食い違う人物は variants に残す
        for pid in ["pe-ebisawa-keizaburo", "pe-takahashi-katsuzo", "pe-urushi-shogan"]:
            self.assertTrue(self.people[pid].get("variants"), pid)


if __name__ == "__main__":
    unittest.main()
