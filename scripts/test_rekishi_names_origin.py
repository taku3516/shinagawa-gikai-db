#!/usr/bin/env python3
"""地名の由来が、品川区史を出典として載っていることを確かめる。

区史 通史編 上巻から由来を足した地名について、
 - origin が空のままになっていないこと
 - 区史が出典に入っていて、locator に底本のページがあること
 - 説が分かれるものは variants に並んでいること
 - 「由来は分かりません」という注記が、由来を載せたあとも残っていないこと
を、リポジトリの本物のデータで確かめる。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
KUSHI_JO = "sgw-kushi-tsushi-jo"

# 区史から由来を足す地名（ID → 説が分かれるものは variants の最低件数）
TARGETS: dict[str, int] = {
    "nm-oi-mura": 3,  # 井戸説を origin に、ほか3説を variants に
    "nm-kamiosaki-mura": 0,
    "nm-togoshi-mura": 2,  # 千戸万戸説と、本来の読み
    "nm-kamihebikubo-mura": 0,
    "nm-1e47dee7": 0,  # 五反田
    "nm-b7d90ffb": 1,  # 大井鮫洲町（鮫洲の地名伝説）
    "nm-e6243bbc": 1,  # 大井鈴ヶ森町（遊女町説）
}

# 由来を載せたあとに残っていてはいけない注記
STALE_NOTES = ("由来は確認できていません", "由来はこの資料からは分かりません")


def load_names() -> dict[str, dict]:
    source = (ROOT / "data" / "rekishi-names.js").read_text(encoding="utf-8")
    data = extract_object(source, "window.SHINAGAWA_DB.rekishiNames")
    return {item["id"]: item for item in data["items"]}


class NameOriginTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.names = load_names()

    def test_targets_exist(self) -> None:
        for name_id in TARGETS:
            self.assertIn(name_id, self.names, name_id)

    def test_origin_is_filled(self) -> None:
        for name_id in TARGETS:
            origin = self.names[name_id].get("origin")
            self.assertTrue(origin, f"{name_id} の origin が空")

    def test_kushi_is_cited_with_page(self) -> None:
        for name_id in TARGETS:
            sources = self.names[name_id]["sources"]
            kushi = [s for s in sources if s["ref"] == KUSHI_JO]
            self.assertTrue(kushi, f"{name_id} に区史の出典が無い")
            for source in kushi:
                self.assertRegex(
                    source["locator"], r"\d+(〜\d+)?頁", f"{name_id} にページが無い"
                )

    def test_divided_theories_are_in_variants(self) -> None:
        for name_id, minimum in TARGETS.items():
            variants = self.names[name_id].get("variants", [])
            self.assertGreaterEqual(len(variants), minimum, name_id)
            for variant in variants:
                self.assertTrue(variant.get("ref"), f"{name_id} の variants に出典が無い")
                self.assertTrue(variant.get("locator"), f"{name_id} の variants に箇所が無い")

    def test_stale_notes_are_removed(self) -> None:
        for name_id in TARGETS:
            item = self.names[name_id]
            text = item["summary"] + item.get("description", "")
            for note in STALE_NOTES:
                self.assertNotIn(note, text, f"{name_id} に古い注記が残っている")

    def test_samesu_legend_year_matches_timeline(self) -> None:
        # 建長元年は1249年なので建長3年は1251年。年表の出来事と食い違わないこと。
        # 和暦検査は variants の claim 内の換算を見ないため、ここで固定する
        claims = " ".join(v["claim"] for v in self.names["nm-b7d90ffb"]["variants"])
        self.assertIn("建長3年（1251年）", claims)
        self.assertNotIn("1252", claims)

    def test_oi_keeps_temple_origin_and_gains_kushi_variants(self) -> None:
        # 大井は指定文化財の寺伝を origin に持つ。区史の別説は variants に足す
        item = self.names["nm-oi"]
        self.assertIn("光福寺", item["origin"])
        refs = [v["ref"] for v in item.get("variants", [])]
        self.assertIn(KUSHI_JO, refs)


if __name__ == "__main__":
    unittest.main()
