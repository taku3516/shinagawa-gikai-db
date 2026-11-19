#!/usr/bin/env python3
"""「品川の歴史」データ検査の動作を確かめる。

検査そのものが働いているかを、わざと壊した仮のデータで確かめる。
検査が素通りするようになっていると、本物のデータが壊れても気づけないため。
最後に、リポジトリの本物のデータでも通ることを確かめる。
"""

import sys
from pathlib import Path

# scripts/ を import 先に加える。これが無いと単独では実行できず、
# 他の検査と同時に走ったときだけ通るという紛らわしい状態になる。
sys.path.insert(0, str(Path(__file__).resolve().parent))

import json
import tempfile
import unittest

from check_rekishi_data import Checker, DataError, extract_object


MINIMAL_META = {
    "schemaVersion": 1,
    "eras": [{"id": "kinsei", "label": "近世"}],
    "areas": [{"id": "shinagawa", "label": "品川地区"}],
    "categories": [{"id": "site", "label": "史跡・遺跡"}],
    "certainty": [{"id": "fact", "label": "確認済み"}],
    "locationKinds": [
        {"id": "current", "label": "現在地"},
        {"id": "former", "label": "かつての所在地"},
    ],
    "sources": [{"id": "src-a", "label": "出典A", "url": "https://example.test/"}],
    "files": {"events": "data/rekishi-events.js"},
}

VALID_EVENT = {
    "id": "ev-sample",
    "name": "見本の出来事",
    "summary": "見本です。",
    "year": 1700,
    "era": "kinsei",
    "areas": ["shinagawa"],
    "categories": ["site"],
    "certainty": "fact",
    "sources": [{"ref": "src-a", "locator": "1ページ"}],
    "verifiedAt": "2026-11-19",
}


def write_fixture(root: Path, meta: dict, events: list[dict]) -> None:
    """仮のデータファイル一式を作る。"""
    data = root / "data"
    data.mkdir(parents=True, exist_ok=True)
    (data / "rekishi.js").write_text(
        "window.SHINAGAWA_DB.rekishi = "
        + json.dumps(meta, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    (data / "rekishi-events.js").write_text(
        "window.SHINAGAWA_DB.rekishiEvents = "
        + json.dumps({"items": events}, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


class ExtractObjectTest(unittest.TestCase):
    def test_reads_assignment_with_comments(self) -> None:
        source = (
            "// 先頭のコメント\n"
            "window.SHINAGAWA_DB.rekishi = {\n"
            '  // 途中のコメント\n'
            '  "schemaVersion": 1\n'
            "};\n"
        )
        self.assertEqual(
            extract_object(source, "window.SHINAGAWA_DB.rekishi"),
            {"schemaVersion": 1},
        )

    def test_missing_assignment_raises(self) -> None:
        with self.assertRaises(DataError):
            extract_object("window.OTHER = {};", "window.SHINAGAWA_DB.rekishi")


class CheckerTest(unittest.TestCase):
    def run_with(self, meta: dict, events: list[dict]) -> list[str]:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            write_fixture(root, meta, events)
            return Checker(root).check()

    def test_valid_data_passes(self) -> None:
        self.assertEqual(self.run_with(MINIMAL_META, [VALID_EVENT]), [])

    def test_missing_source_is_reported(self) -> None:
        event = dict(VALID_EVENT, sources=[])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("sources が空" in p for p in problems), problems)

    def test_unknown_source_ref_is_reported(self) -> None:
        event = dict(VALID_EVENT, sources=[{"ref": "src-missing"}])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("出典台帳にありません" in p for p in problems), problems)

    def test_unknown_era_is_reported(self) -> None:
        event = dict(VALID_EVENT, era="sengoku")
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("era の sengoku" in p for p in problems), problems)

    def test_unknown_area_is_reported(self) -> None:
        event = dict(VALID_EVENT, areas=["meguro"])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("areas の meguro" in p for p in problems), problems)

    def test_duplicate_id_is_reported(self) -> None:
        problems = self.run_with(MINIMAL_META, [VALID_EVENT, dict(VALID_EVENT)])
        self.assertTrue(any("重複" in p for p in problems), problems)

    def test_id_prefix_is_required(self) -> None:
        event = dict(VALID_EVENT, id="sample-1")
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("ev- で始めて" in p for p in problems), problems)

    def test_dangling_relation_is_reported(self) -> None:
        event = dict(VALID_EVENT, relatedEvents=["ev-nowhere"])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("ev-nowhere が存在しません" in p for p in problems), problems)

    def test_relation_to_wrong_collection_is_reported(self) -> None:
        # 人物IDを relatedEvents に書いてしまった場合を想定する。
        event = dict(VALID_EVENT, relatedPeople=["ev-sample"])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("people ではなく events" in p for p in problems), problems)

    def test_missing_year_requires_year_text(self) -> None:
        event = dict(VALID_EVENT, year=None)
        event.pop("yearText", None)
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("yearText を書いて" in p for p in problems), problems)

    def test_year_text_alone_is_allowed(self) -> None:
        # 年が確定できないものは、年を空にしたまま掲載できる。
        event = dict(VALID_EVENT, year=None, yearText="江戸時代初期")
        self.assertEqual(self.run_with(MINIMAL_META, [event]), [])

    def test_year_end_before_year_is_reported(self) -> None:
        event = dict(VALID_EVENT, year=1700, yearEnd=1600)
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("より前です" in p for p in problems), problems)

    def test_coordinates_outside_shinagawa_are_reported(self) -> None:
        # 緯度と経度を取り違えた場合に気づけるようにする。
        event = dict(VALID_EVENT, lat=139.74, lng=35.62, locationKind="current")
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("lat が想定の範囲外" in p for p in problems), problems)

    def test_former_location_requires_note(self) -> None:
        event = dict(VALID_EVENT, lat=35.62, lng=139.74, locationKind="former")
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("locationNote を書いて" in p for p in problems), problems)

    def test_single_coordinate_is_reported(self) -> None:
        event = dict(VALID_EVENT, lat=35.62)
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("両方そろえて" in p for p in problems), problems)

    def test_bad_verified_at_is_reported(self) -> None:
        event = dict(VALID_EVENT, verifiedAt="2026/11/19")
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("YYYY-MM-DD" in p for p in problems), problems)

    def test_variant_without_source_is_reported(self) -> None:
        event = dict(VALID_EVENT, variants=[{"claim": "別の説"}])
        problems = self.run_with(MINIMAL_META, [event])
        self.assertTrue(any("variants[0] に ref" in p for p in problems), problems)


class PlacesTest(unittest.TestCase):
    """地点に固有の決まりを確かめる。"""

    META = dict(MINIMAL_META, files={"places": "data/rekishi-places.js"})
    PLACE = {
        "id": "pl-sample",
        "name": "見本の地点",
        "summary": "見本です。",
        "areas": ["shinagawa"],
        "categories": ["site"],
        "lat": 35.62,
        "lng": 139.74,
        "locationKind": "current",
        "certainty": "fact",
        "sources": [{"ref": "src-a"}],
        "verifiedAt": "2026-11-19",
    }

    def run_with(self, place: dict) -> list:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = "
                + json.dumps(self.META, ensure_ascii=False)
                + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-places.js").write_text(
                "window.SHINAGAWA_DB.rekishiPlaces = "
                + json.dumps({"items": [place]}, ensure_ascii=False)
                + ";\n",
                encoding="utf-8",
            )
            return Checker(root).check()

    def test_place_without_era_passes(self) -> None:
        # 神社や寺は1つの時代に収まらないので、時代は空のままでよい。
        self.assertEqual(self.run_with(self.PLACE), [])

    def test_place_without_coordinates_is_reported(self) -> None:
        place = dict(self.PLACE)
        place.pop("lat")
        place.pop("lng")
        problems = self.run_with(place)
        self.assertTrue(any("lat と lng が必要" in p for p in problems), problems)


class RepositoryDataTest(unittest.TestCase):
    def test_actual_data_passes(self) -> None:
        self.assertEqual(Checker().check(), [])


if __name__ == "__main__":
    unittest.main()
