#!/usr/bin/env python3
"""区史 下巻から起こした人物が、出来事とつながっていることを確かめる。

人物と出来事の関係は出来事側の relatedPeople だけが画面に読まれる
（person.relatedEvents はどの画面も読まない）。人物だけ足して出来事に結ばないと、
人物ページから出来事へたどれない人物ができる。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
KUSHI = "sgw-kushi-tsushi-ge"

NEW_PEOPLE = [
    "pe-urushi-shogan", "pe-hirabayashi-kyubei", "pe-hayashi-kosyu", "pe-tanaka-hajime",
    "pe-ebisawa-shigeharu", "pe-ebisawa-keizaburo", "pe-takahashi-katsuzo",
    "pe-yamamoto-shigeoki", "pe-koga-ippei", "pe-rida-kunitaka", "pe-kaburaki-tadamasa",
    "pe-kosakai-keiyo", "pe-goto-joasaku", "pe-okada-tojuro", "pe-enomoto-takeaki",
    "pe-takaishi-hideyuki", "pe-suzuki-bunji", "pe-tateishi-tomomitsu",
]


def load(name: str, key: str) -> dict:
    source = (ROOT / "data" / name).read_text(encoding="utf-8")
    return extract_object(source, f"window.SHINAGAWA_DB.{key}")


class PeopleFromKushiTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.people = {p["id"]: p for p in load("rekishi-people.js", "rekishiPeople")["items"]}
        events = load("rekishi-events.js", "rekishiEvents")["items"]
        cls.linked = {pid for e in events for pid in e.get("relatedPeople", [])}

    def test_people_exist(self) -> None:
        for pid in NEW_PEOPLE:
            self.assertIn(pid, self.people, pid)

    def test_people_are_linked_from_an_event(self) -> None:
        for pid in NEW_PEOPLE:
            self.assertIn(pid, self.linked, f"{pid} を結ぶ出来事が無い")

    def test_people_cite_kushi_with_page(self) -> None:
        for pid in NEW_PEOPLE:
            sources = [s for s in self.people[pid]["sources"] if s["ref"] == KUSHI]
            self.assertTrue(sources, pid)
            self.assertRegex(sources[0]["locator"], r"\d+(〜\d+)?頁", pid)

    def test_unknown_years_are_not_filled(self) -> None:
        # 生没年が出典に無い人物は null のまま（推測で埋めない）
        for pid in ["pe-koga-ippei"]:
            self.assertIsNone(self.people[pid]["birthYear"], pid)
            self.assertIsNone(self.people[pid]["deathYear"], pid)

    def test_years_found_in_shiryo_are_filled(self) -> None:
        # 区史 資料編（人物略伝）で生没年が分かった人物は、空欄のままにしない
        self.assertEqual(self.people["pe-hayashi-kosyu"]["birthYear"], 1824)
        self.assertEqual(self.people["pe-hayashi-kosyu"]["deathYear"], 1895)
        self.assertEqual(self.people["pe-hirabayashi-kyubei"]["birthYear"], 1837)
        self.assertEqual(self.people["pe-hirabayashi-kyubei"]["deathYear"], 1909)


if __name__ == "__main__":
    unittest.main()
