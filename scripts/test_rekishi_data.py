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
    "nameKinds": [
        {"id": "current-town", "label": "現町名"},
        {"id": "old-village", "label": "旧村名"},
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


class HeritageAndDateTest(unittest.TestCase):
    """指定文化財と日付の決まりを確かめる。"""

    def run_with(self, place: dict) -> list:
        meta = dict(MINIMAL_META, files={"places": "data/rekishi-places.js"})
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = " + json.dumps(meta, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-places.js").write_text(
                "window.SHINAGAWA_DB.rekishiPlaces = "
                + json.dumps({"items": [place]}, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            return Checker(root).check()

    def place(self, **overrides) -> dict:
        base = {
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
        base.update(overrides)
        return base

    def test_future_verified_at_is_reported(self) -> None:
        problems = self.run_with(self.place(verifiedAt="2099-01-01"))
        self.assertTrue(any("verifiedAt が未来" in p for p in problems), problems)

    def test_future_year_is_reported(self) -> None:
        problems = self.run_with(self.place(year=2999))
        self.assertTrue(any("year が未来の年" in p for p in problems), problems)

    def test_heritage_url_must_be_official(self) -> None:
        heritage = [{"name": "見本", "kind": "史跡", "url": "https://example.test/a.html"}]
        problems = self.run_with(self.place(heritage=heritage))
        self.assertTrue(any("公式（品川区・文化庁）のページではありません" in p for p in problems), problems)

    def test_future_designation_is_reported(self) -> None:
        heritage = [{
            "name": "見本", "kind": "史跡",
            "url": "https://www.city.shinagawa.tokyo.jp/a.html",
            "designatedOn": "2099-03-01",
        }]
        problems = self.run_with(self.place(heritage=heritage))
        self.assertTrue(any("designatedOn が未来" in p for p in problems), problems)

    def test_valid_heritage_passes(self) -> None:
        heritage = [{
            "name": "見本", "kind": "史跡",
            "url": "https://www.city.shinagawa.tokyo.jp/a.html",
            "designatedOn": "1978-02-14",
        }]
        self.assertEqual(self.run_with(self.place(heritage=heritage)), [])


class HeritageUrlTest(unittest.TestCase):
    """文化財のURLを、どの範囲まで許すか。

    もともと品川区公式に限っていた。区の「指定文化財」ページだけを出典にしていたため。
    登録有形文化財など、区のページに載らないものを足すときに文化庁のページが要るが、
    ここを野放しにすると「公式で確認した」という前提が静かに崩れる。
    官公庁だけの許可制にして、それ以外は今までどおり落とす。
    """

    META = dict(MINIMAL_META, files={"places": "data/rekishi-places.js"})
    PLACE = {
        "id": "pl-sample",
        "name": "見本の地点",
        "summary": "見本です。",
        "address": "北品川1-1-1",
        "areas": ["shinagawa"],
        "categories": ["site"],
        "lat": 35.62,
        "lng": 139.74,
        "locationKind": "current",
        "certainty": "fact",
        "heritage": [],
        "sources": [{"ref": "src-a", "locator": "1ページ"}],
        "verifiedAt": "2026-11-19",
    }

    def run_with(self, url: str) -> list:
        item = dict(self.PLACE)
        item["heritage"] = [{"name": "見本の文化財", "kind": "史跡", "url": url}]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = " + json.dumps(self.META, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-places.js").write_text(
                "window.SHINAGAWA_DB.rekishiPlaces = "
                + json.dumps({"items": [item]}, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            return Checker(root).check()

    def test_ward_url_passes(self) -> None:
        self.assertEqual(
            self.run_with("https://www.city.shinagawa.tokyo.jp/bunka/1.html"), [])

    def test_bunka_online_passes(self) -> None:
        # 区のページが無い登録有形文化財などは、文化庁のページを指す。
        self.assertEqual(
            self.run_with("https://online.bunka.go.jp/heritages/detail/664869"), [])

    def test_kunishitei_passes(self) -> None:
        self.assertEqual(
            self.run_with("https://kunishitei.bunka.go.jp/bsys/maindetails/401/689"), [])

    def test_other_site_is_still_reported(self) -> None:
        # ここが緩むと「公式で確認した」という前提が崩れる。
        problems = self.run_with("https://ja.wikipedia.org/wiki/見本")
        self.assertTrue(any("公式" in p for p in problems), problems)

    def test_lookalike_domain_is_reported(self) -> None:
        # 似せたドメインを通さない。
        problems = self.run_with("https://online.bunka.go.jp.example.com/heritages/detail/1")
        self.assertTrue(any("公式" in p for p in problems), problems)


class RegisteredOnTest(unittest.TestCase):
    """「登録」と「指定」を取り違えないこと。

    文化財保護法では、登録有形文化財（登録）と重要文化財など（指定）は別の制度。
    登録のものに「指定」と書くと事実が違う。日付の欄も registeredOn と
    designatedOn で分け、画面の文言もそれに従う。
    """

    META = dict(MINIMAL_META, files={"places": "data/rekishi-places.js"})
    PLACE = {
        "id": "pl-sample", "name": "見本の地点", "summary": "見本です。",
        "address": "北品川1-1-1", "areas": ["shinagawa"], "categories": ["site"],
        "lat": 35.62, "lng": 139.74, "locationKind": "current", "certainty": "fact",
        "heritage": [], "sources": [{"ref": "src-a", "locator": "1ページ"}],
        "verifiedAt": "2026-11-19",
    }

    def run_with(self, heritage: dict) -> list:
        item = dict(self.PLACE)
        item["heritage"] = [dict({
            "name": "見本", "kind": "建造物",
            "url": "https://online.bunka.go.jp/heritages/detail/1",
        }, **heritage)]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = " + json.dumps(self.META, ensure_ascii=False) + ";\n",
                encoding="utf-8")
            (data / "rekishi-places.js").write_text(
                "window.SHINAGAWA_DB.rekishiPlaces = "
                + json.dumps({"items": [item]}, ensure_ascii=False) + ";\n", encoding="utf-8")
            return Checker(root).check()

    def test_registered_on_passes(self) -> None:
        self.assertEqual(self.run_with({"registeredOn": "2020-04-03"}), [])

    def test_registered_on_must_be_iso(self) -> None:
        problems = self.run_with({"registeredOn": "2020/04/03"})
        self.assertTrue(any("registeredOn" in p for p in problems), problems)

    def test_future_registered_on_is_reported(self) -> None:
        problems = self.run_with({"registeredOn": "2099-01-01"})
        self.assertTrue(any("未来" in p for p in problems), problems)

    def test_both_dates_is_reported(self) -> None:
        # 登録と指定は別の制度。両方持つことはない。
        problems = self.run_with({"registeredOn": "2020-04-03", "designatedOn": "1953-08-29"})
        self.assertTrue(
            any("registeredOn" in p and "designatedOn" in p for p in problems), problems)


class AcceptGeocodeTest(unittest.TestCase):
    """住所検索の答えを受け入れてよいかの判定。

    国土地理院は番地まで見つからないと、近い単位の代表点を返す。
    町の代表点（「東京都品川区荏原」）は弾けていたが、丁目の代表点
    （「東京都品川区上大崎四丁目」）は漢数字の「四」を含むため通ってしまう。
    地番の住所（「平塚一丁目584」など）を聞くとこれが返るので、
    丁目の中心に黙ってピンが立つ。番地まで引けたものだけを通す。
    """

    def setUp(self) -> None:
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        from prepare_rekishi_places import accept_geocode
        self.accept = accept_geocode

    def test_banchi_is_accepted(self) -> None:
        # 既存101件はこの形。番地まで引けている。
        self.assertTrue(self.accept("北品川3-7-15", "東京都品川区北品川三丁目７番１５号"))
        self.assertTrue(self.accept("西五反田4-12-1", "東京都品川区西五反田四丁目１２番"))

    def test_chome_centroid_is_rejected(self) -> None:
        # 丁目で終わる答えは代表点。ここが通っていた。
        self.assertFalse(self.accept("上大崎4-245-1", "東京都品川区上大崎四丁目"))
        self.assertFalse(self.accept("平塚1-584", "東京都品川区平塚一丁目"))

    def test_town_centroid_is_rejected(self) -> None:
        # もともと弾けていたもの。壊していないこと。
        self.assertFalse(self.accept("荏原神社周辺", "東京都品川区荏原"))
        self.assertFalse(self.accept("利田神社周辺", "東京都品川区"))

    def test_ebara_shrine_resolves_to_registered_address(self) -> None:
        # 荏原神社の住所は町会の区域データ（北品川2丁目 30番28号）で確かめられる。
        # 「荏原神社周辺」を住所に読み替えれば、代表点ではなく番地まで引ける。
        from prepare_rekishi_places import ADDRESS_HINTS
        self.assertEqual("北品川2-30-28", ADDRESS_HINTS.get("荏原神社周辺"))
        self.assertEqual("北品川2-30-28", ADDRESS_HINTS.get("荏原神社"))
        self.assertTrue(self.accept("北品川2-30-28", "東京都品川区北品川二丁目３０番２８号"))

    def test_shrine_vicinity_keeps_shrine_as_facility(self) -> None:
        # 「荏原神社周辺」は住所に読み替えるが、地点の名前は神社名にしたい。
        # 施設名を落とすと、所有者名（ゆきわ会）が地点名になってしまう。
        from prepare_rekishi_places import split_address
        self.assertEqual(("北品川2-30-28", "荏原神社", ""), split_address("荏原神社周辺"))

    def test_other_town_is_rejected(self) -> None:
        # 町名が違う答えは使わない。
        self.assertFalse(self.accept("北品川3-7-15", "東京都品川区荏原三丁目７番"))


class NameKindTest(unittest.TestCase):
    """地名の種類の決まりを確かめる。"""

    META = dict(MINIMAL_META, files={"names": "data/rekishi-names.js"})
    NAME = {
        "id": "nm-sample",
        "name": "見本",
        "summary": "見本です。",
        "nameKind": "old-village",
        "certainty": "fact",
        "sources": [{"ref": "src-a"}],
        "verifiedAt": "2026-11-19",
    }

    def run_with(self, name: dict) -> list:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = " + json.dumps(self.META, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-names.js").write_text(
                "window.SHINAGAWA_DB.rekishiNames = "
                + json.dumps({"items": [name]}, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            return Checker(root).check()

    def test_valid_name_passes(self) -> None:
        self.assertEqual(self.run_with(self.NAME), [])

    def test_missing_name_kind_is_reported(self) -> None:
        item = dict(self.NAME)
        item.pop("nameKind")
        problems = self.run_with(item)
        self.assertTrue(any("nameKind がありません" in p for p in problems), problems)

    def test_unknown_name_kind_is_reported(self) -> None:
        problems = self.run_with(dict(self.NAME, nameKind="old-castle"))
        self.assertTrue(any("nameKind の old-castle" in p for p in problems), problems)

    def test_origin_may_be_null(self) -> None:
        # 由来が分からない地名も、公式資料に現れるなら載せられる。
        self.assertEqual(self.run_with(dict(self.NAME, origin=None)), [])


class PersonRelationTest(unittest.TestCase):
    """人物と出来事の関係が、画面が読む側に書かれているかを確かめる。

    rekishi-jinbutsu.html は event.relatedPeople だけから逆引きの索引を組み立て、
    年表も同じ event.relatedPeople を読む。人物側の relatedEvents はどのページも
    読まないため、そこに書くと検査は通るのに画面には何も出ない。
    実際に出来事28件・人物8人を足したとき、人物側にだけ書いて8人全員が
    不可視になった。参照整合性では捕まらないので、置き場所そのものを検査する。
    """

    META = dict(
        MINIMAL_META,
        files={"people": "data/rekishi-people.js", "events": "data/rekishi-events.js"},
    )
    PERSON = {
        "id": "pe-sample",
        "name": "見本の人物",
        "summary": "見本です。",
        "deathYear": 1700,
        "era": "kinsei",
        "areas": ["shinagawa"],
        "shinagawaRelation": "見本の関係。",
        "certainty": "fact",
        "sources": [{"ref": "src-a", "locator": "1ページ"}],
        "verifiedAt": "2026-11-19",
    }

    def run_with(self, person: dict, event: dict) -> list:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            data = root / "data"
            data.mkdir(parents=True)
            (data / "rekishi.js").write_text(
                "window.SHINAGAWA_DB.rekishi = "
                + json.dumps(self.META, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-people.js").write_text(
                "window.SHINAGAWA_DB.rekishiPeople = "
                + json.dumps({"items": [person]}, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            (data / "rekishi-events.js").write_text(
                "window.SHINAGAWA_DB.rekishiEvents = "
                + json.dumps({"items": [event]}, ensure_ascii=False) + ";\n",
                encoding="utf-8",
            )
            return Checker(root).check()

    def test_person_side_relation_is_reported(self) -> None:
        # IDは実在するので参照整合性は通る。それでも落ちること。
        person = dict(self.PERSON, relatedEvents=["ev-sample"])
        problems = self.run_with(person, VALID_EVENT)
        self.assertTrue(
            any("relatedEvents" in p and "出来事の側" in p for p in problems), problems
        )

    def test_event_side_relation_passes(self) -> None:
        # 正しい置き場所。画面もここを読む。
        event = dict(VALID_EVENT, relatedPeople=["pe-sample"])
        self.assertEqual(self.run_with(self.PERSON, event), [])

    def test_person_without_relation_passes(self) -> None:
        self.assertEqual(self.run_with(self.PERSON, VALID_EVENT), [])

    def test_empty_person_side_relation_is_still_reported(self) -> None:
        # 空の配列を残すと、書き足す場所を間違えたままになる。
        problems = self.run_with(dict(self.PERSON, relatedEvents=[]), VALID_EVENT)
        self.assertTrue(any("relatedEvents" in p for p in problems), problems)


class KuniDesignationTest(unittest.TestCase):
    """国指定分の指定年月日を手で補う表が、取り違えを起こさないか。

    区公式の「区内にある都および国の指定文化財」のページには指定年月日の欄が
    無く、30件すべてが空のままだった。国指定文化財等データベースで埋まるのは
    国指定分だけで、都指定は載っていない。しかも同名の別物がある
    （銅造地蔵菩薩坐像は品川寺のものと観福寺のものがある）ため、
    名称だけで突き合わせると静かに他区の文化財の日付が入る。所有者まで一致を見る。
    """

    def setUp(self) -> None:
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        from prepare_rekishi_places import KUNI_DESIGNATED, kuni_designated_on
        self.table = KUNI_DESIGNATED
        self.lookup = kuni_designated_on

    def test_matches_on_name_and_owner(self) -> None:
        self.assertEqual(self.lookup("金小札色々威胴丸", "西光寺"), "1976-06-05")

    def test_same_name_different_owner_is_not_matched(self) -> None:
        # 観福寺の銅造地蔵菩薩坐像（鎌倉・1309年）を品川寺のものと取り違えない。
        self.assertIsNone(self.lookup("銅造地蔵菩薩坐像", "品川寺"))

    def test_unknown_item_returns_none(self) -> None:
        self.assertIsNone(self.lookup("存在しない文化財", "どこかの寺"))

    def test_every_entry_has_iso_date_and_source(self) -> None:
        for key, value in self.table.items():
            with self.subTest(key=key):
                self.assertRegex(value["designatedOn"], r"^\d{4}-\d{2}-\d{2}$")
                self.assertTrue(value["source"].strip(), "照合の根拠を書くこと")

    def test_owner_is_part_of_the_key(self) -> None:
        # 鍵が名称だけだと取り違えが起きる。所有者を鍵に含めていること。
        for key in self.table:
            self.assertIsInstance(key, tuple)
            self.assertEqual(len(key), 2)

    def test_name_only_entries_match_whatever_the_owner_is(self) -> None:
        # 区側の所有者欄は「（空欄）」という文字列で、あとで記入されることがある。
        # 名称が全国で一意な国の史跡は、所有者が変わっても引けること。
        self.assertEqual(self.lookup("大森貝塚", "（空欄）"), "1955-03-24")
        self.assertEqual(self.lookup("大森貝塚", "品川区"), "1955-03-24")
        self.assertEqual(self.lookup("旧白金御料地", ""), "1949-04-12")


class EraYearTest(unittest.TestCase):
    """yearText の和暦と year が食い違っていないかを見る。

    1つの出典から多数の項目を起こすときの検算用。元号の換算を1件ずつ
    手でやると取り違えが混ざるため、機械で当てられるようにしている。
    """

    def run_with(self, events: list[dict]) -> list[str]:
        # 近代の元号を使うので、時代区分を足した台帳で試す。
        meta = dict(MINIMAL_META)
        meta["eras"] = [
            {"id": "kinsei", "label": "近世"},
            {"id": "meiji", "label": "明治"},
            {"id": "taisho", "label": "大正"},
            {"id": "showa-pre", "label": "昭和戦前・戦中"},
            {"id": "showa-post", "label": "昭和戦後"},
            {"id": "chusei", "label": "中世"},
        ]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            write_fixture(root, meta, events)
            return Checker(root).check()

    def test_matching_era_year_passes(self) -> None:
        # 明治41年 = 1868 + 41 - 1 = 1908
        event = dict(VALID_EVENT, year=1908, era="meiji",
                     yearText="明治41年（1908年）")
        self.assertEqual(self.run_with([event]), [])

    def test_mismatched_era_year_is_reported(self) -> None:
        # 明治41年は1908年なので、1909 と書いてあれば取り違え。
        event = dict(VALID_EVENT, year=1909, era="meiji",
                     yearText="明治41年（1909年）")
        problems = self.run_with([event])
        self.assertTrue(any("和暦" in p for p in problems), problems)

    def test_first_year_of_era_passes(self) -> None:
        # 「元年」は改元の年。明治元年 = 1868。
        event = dict(VALID_EVENT, year=1868, era="meiji",
                     yearText="明治元年（1868年）")
        self.assertEqual(self.run_with([event]), [])

    def test_era_boundary_year_passes_either_way(self) -> None:
        # 改元の年は2つの元号が同じ西暦を指す。明治45年7月30日に改元した
        # ので、明治45年も大正元年も1912年。西暦はどちらでも通るが、
        # 時代区分はそれぞれの元号に合わせること。
        for text, era in (("明治45年（1912年）", "meiji"),
                          ("大正元年（1912年）", "taisho")):
            with self.subTest(text=text):
                event = dict(VALID_EVENT, year=1912, era=era, yearText=text)
                self.assertEqual(self.run_with([event]), [])

    def test_year_range_matches_the_first_era(self) -> None:
        # 範囲で書いたときは、最初の和暦が year と合っていればよい。
        event = dict(VALID_EVENT, year=1906, yearEnd=1909, era="meiji",
                     yearText="明治39年から42年にかけて")
        self.assertEqual(self.run_with([event]), [])

    def test_era_name_must_match_the_era_field(self) -> None:
        # 明治45年2月は改元（7月30日）より前なので明治。年だけ見ると
        # 1912年で合ってしまうため、元号そのものも突き合わせる。
        event = dict(VALID_EVENT, year=1912, era="taisho",
                     yearText="明治45年（1912年）2月")
        problems = self.run_with([event])
        self.assertTrue(any("元号" in p for p in problems), problems)

    def test_era_name_matching_the_era_field_passes(self) -> None:
        event = dict(VALID_EVENT, year=1912, era="meiji",
                     yearText="明治45年（1912年）2月")
        self.assertEqual(self.run_with([event]), [])

    def test_showa_accepts_both_halves(self) -> None:
        # 昭和は戦前・戦中と戦後の2つに分かれているので、どちらも通す。
        meta_eras = ["showa-pre", "showa-post"]
        for era in meta_eras:
            with self.subTest(era=era):
                event = dict(VALID_EVENT, year=1930, era=era,
                             yearText="昭和5年（1930年）")
                self.assertEqual(self.run_with([event]), [])

    def test_premodern_era_is_converted(self) -> None:
        # 近世以前の元号も換算する。慶長6年 = 1596 + 6 - 1 = 1601。
        event = dict(VALID_EVENT, year=1601, era="kinsei",
                     yearText="慶長6年（1601年）正月")
        self.assertEqual(self.run_with([event]), [])

    def test_premodern_mismatch_is_reported(self) -> None:
        event = dict(VALID_EVENT, year=1602, era="kinsei",
                     yearText="慶長6年（1602年）")
        problems = self.run_with([event])
        self.assertTrue(any("和暦" in p for p in problems), problems)

    def test_unknown_era_name_is_reported(self) -> None:
        # 表に無い元号を黙って飛ばすと、検算の穴が見えないまま残る。
        event = dict(VALID_EVENT, year=1601, era="kinsei",
                     yearText="架空5年（1601年）")
        problems = self.run_with([event])
        self.assertTrue(any("元号" in p and "表にありません" in p
                            for p in problems), problems)

    def test_period_name_is_not_treated_as_an_era(self) -> None:
        # 「縄文時代後期〜晩期」「鎌倉時代後期」は元号ではない。
        # 西暦が括弧で続く形になっていないので、未知の元号とはしない。
        for text in ("縄文時代後期〜晩期（前2000年〜前400年ごろ）",
                     "鎌倉時代後期（13世紀末〜14世紀初め）",
                     "文明年間（1469〜1487年）"):
            with self.subTest(text=text):
                event = dict(VALID_EVENT, year=None, era="kinsei",
                             yearText=text)
                self.assertEqual(self.run_with([event]), [])

    def test_premodern_era_name_does_not_constrain_the_era_field(self) -> None:
        # 近世以前の元号は時代区分との対応が一対一でないため、
        # 西暦だけを突き合わせ、era の値は縛らない。
        event = dict(VALID_EVENT, year=1601, era="chusei",
                     yearText="慶長6年（1601年）")
        self.assertEqual(self.run_with([event]), [])

    def test_kanji_year_numerals_are_accepted(self) -> None:
        # 「明治四十一年」のように年を漢数字で書いても、元号は「明治」。
        # 漢字の並びから元号を推測すると「明治四十」まで食い込むので、
        # 既知の元号名を先に当てる。
        for text, year, era in (("明治四十一年（1908年）", 1908, "meiji"),
                                ("昭和二十年（1945年）", 1945, "showa-pre"),
                                ("元禄十六年（1703年）", 1703, "kinsei")):
            with self.subTest(text=text):
                event = dict(VALID_EVENT, year=year, era=era, yearText=text)
                self.assertEqual(self.run_with([event]), [])

    def test_unknown_era_with_kanji_numerals_is_reported(self) -> None:
        # 表に無い元号は、年が漢数字でも報告されること。
        event = dict(VALID_EVENT, year=1601, era="kinsei",
                     yearText="架空五年（1601年）")
        problems = self.run_with([event])
        self.assertTrue(any("元号" in p and "表にありません" in p
                            for p in problems), problems)

    def test_text_without_era_is_skipped(self) -> None:
        # 和暦が書かれていないものは、この検算の対象外。
        event = dict(VALID_EVENT, year=None, era="kinsei",
                     yearText="江戸時代初期")
        self.assertEqual(self.run_with([event]), [])


class RepositoryDataTest(unittest.TestCase):
    def test_actual_data_passes(self) -> None:
        self.assertEqual(Checker().check(), [])


if __name__ == "__main__":
    unittest.main()
