#!/usr/bin/env python3
"""区史から出来事を起こすための道具の検査。

通信はしない。HTMLの解析と、下書きの追記だけを見る。
"""

from __future__ import annotations

import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import adeac_sections  # noqa: E402
import merge_rekishi_events  # noqa: E402


class ParseTocTest(unittest.TestCase):
    def test_picks_section_ids_and_labels(self) -> None:
        raw = """
        <a href="/shinagawa-city/text-list/d000010/ht000750">居木橋貝塚</a>
        <a href="/shinagawa-city/text-list/d000010/ht000760">上大崎と御殿山の貝塚</a>
        <a href="/shinagawa-city/top/">トップページ</a>
        """
        self.assertEqual(
            adeac_sections.parse_toc(raw),
            [("居木橋貝塚", "ht000750"), ("上大崎と御殿山の貝塚", "ht000760")],
        )

    def test_empty_toc_is_reported(self) -> None:
        # 入口が変わって節IDが取れなくなったら、黙って0件にせず止める。
        with self.assertRaises(adeac_sections.AdeacError):
            adeac_sections.parse_toc("<p>目次は工事中です</p>")


class SplitSectionTest(unittest.TestCase):
    def test_splits_heading_pages_and_body(self) -> None:
        text = "品川区 / しながわデジタルアーカイブ\n目次 /\n居木橋貝塚\n128～135\n大崎二丁目六番地を中心として。"
        heading, pages, body = adeac_sections.split_section(text)
        self.assertEqual(heading, "居木橋貝塚")
        self.assertEqual(pages, "128～135")
        self.assertEqual(body, "大崎二丁目六番地を中心として。")

    def test_single_page_number_is_accepted(self) -> None:
        heading, pages, _ = adeac_sections.split_section("パンくず\n西光寺貝塚\n145\n本文。")
        self.assertEqual((heading, pages), ("西光寺貝塚", "145"))

    def test_missing_page_number_keeps_the_body(self) -> None:
        # 底本のページが無い節もある。本文は失わないこと。
        heading, pages, body = adeac_sections.split_section("見出しらしき行\n本文だけの節。")
        self.assertEqual((heading, pages), ("", ""))
        self.assertIn("本文だけの節。", body)


class ExpandRangeTest(unittest.TestCase):
    KNOWN = ["ht000650", "ht000700", "ht000750", "ht001120", "ht001200"]

    def test_range_is_inclusive(self) -> None:
        self.assertEqual(
            adeac_sections.expand_range("ht000650-ht000750", self.KNOWN),
            ["ht000650", "ht000700", "ht000750"],
        )

    def test_comma_separated_ids(self) -> None:
        self.assertEqual(
            adeac_sections.expand_range("ht000700,ht001200", self.KNOWN),
            ["ht000700", "ht001200"],
        )

    def test_unknown_id_is_reported(self) -> None:
        with self.assertRaises(adeac_sections.AdeacError):
            adeac_sections.expand_range("ht999999", self.KNOWN)

    def test_empty_range_is_reported(self) -> None:
        with self.assertRaises(adeac_sections.AdeacError):
            adeac_sections.expand_range("ht002000-ht003000", self.KNOWN)


SAMPLE_FILE = """// 見本
window.SHINAGAWA_DB.rekishiEvents = {
  "items": [
      {
        "id": "ev-sample",
        "name": "見本",
        "sources": [{ "ref": "src-a" }]
      }
  ]
};
"""


class MergeEventsTest(unittest.TestCase):
    def draft(self, event_id: str) -> dict:
        return {
            "id": event_id,
            "name": "足す出来事",
            "summary": "見本です。",
            "year": 1703,
            "era": "kinsei",
            "areas": ["shinagawa"],
            "categories": ["site"],
            "certainty": "fact",
            "relatedEvents": [],
            "relatedPeople": [],
            "sources": [{"ref": "src-a", "locator": "1頁"}],
            "verifiedAt": "2026-11-22",
        }

    def test_adds_new_event(self) -> None:
        merged, added, skipped = merge_rekishi_events.merge([self.draft("ev-new")], SAMPLE_FILE)
        self.assertEqual((added, skipped), (["ev-new"], []))
        self.assertIn('"ev-new"', merged)
        self.assertTrue(merged.rstrip().endswith("};"))

    def test_existing_id_is_skipped(self) -> None:
        _, added, skipped = merge_rekishi_events.merge([self.draft("ev-sample")], SAMPLE_FILE)
        self.assertEqual((added, skipped), ([], ["ev-sample"]))

    def test_duplicate_within_the_draft_is_skipped_once(self) -> None:
        # 同じ下書きに同じIDが2回あっても、足すのは1回だけ。
        draft = [self.draft("ev-twice"), self.draft("ev-twice")]
        _, added, skipped = merge_rekishi_events.merge(draft, SAMPLE_FILE)
        self.assertEqual((added, skipped), (["ev-twice"], ["ev-twice"]))

    def test_unknown_field_is_reported(self) -> None:
        # 綴り違いの項目を黙って落とすと、書いたつもりのものが消える。
        event = self.draft("ev-typo")
        event["relatedPeoples"] = []
        with self.assertRaises(merge_rekishi_events.MergeError):
            merge_rekishi_events.merge([event], SAMPLE_FILE)

    def test_missing_sources_is_reported(self) -> None:
        event = self.draft("ev-nosource")
        del event["sources"]
        with self.assertRaises(merge_rekishi_events.MergeError):
            merge_rekishi_events.merge([event], SAMPLE_FILE)

    def test_broken_tail_is_reported(self) -> None:
        with self.assertRaises(merge_rekishi_events.MergeError):
            merge_rekishi_events.merge([self.draft("ev-new")], "window.X = { items: [] }")

    def test_merged_file_is_still_loadable(self) -> None:
        # 追記した結果が読み込めること（カンマ忘れで壊れていないこと）。
        from check_rekishi_data import load_js

        merged, _, _ = merge_rekishi_events.merge(
            [self.draft("ev-new"), self.draft("ev-another")], SAMPLE_FILE
        )
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "rekishi-events.js"
            path.write_text(merged, encoding="utf-8")
            payload = load_js(path, "window.SHINAGAWA_DB.rekishiEvents")
        self.assertEqual([item["id"] for item in payload["items"]],
                         ["ev-sample", "ev-new", "ev-another"])


class VolumeTest(unittest.TestCase):
    def test_known_volumes_have_a_source_ref(self) -> None:
        # 出典台帳のIDを書き忘れると、locator の書きようがなくなる。
        for name, volume in adeac_sections.VOLUMES.items():
            with self.subTest(volume=name):
                self.assertTrue(volume["source_ref"].startswith("sgw-"))
                self.assertTrue(volume["doc"].startswith("d"))
                self.assertTrue(volume["book"].startswith("mp"))

    def test_unknown_volume_is_reported(self) -> None:
        with self.assertRaises(adeac_sections.AdeacError):
            adeac_sections.volume_of("chu")

    def test_crawl_delay_respects_robots(self) -> None:
        # robots.txt は Crawl-Delay: 10。これを下回らないこと。
        self.assertGreaterEqual(adeac_sections.CRAWL_DELAY_SECONDS, 10)


class CrawlDelayTest(unittest.TestCase):
    """取得の間隔は、コマンドやプロセスをまたいでも空けること。

    `toc` の直後に `fetch` を走らせる、単一節の `fetch` を続けて走らせる、
    といった手順でも robots.txt の Crawl-Delay を下回らないようにする。
    """

    def setUp(self) -> None:
        self._directory = tempfile.TemporaryDirectory()
        self._original = adeac_sections.LAST_REQUEST_FILE
        adeac_sections.LAST_REQUEST_FILE = Path(self._directory.name) / ".last-request"

    def tearDown(self) -> None:
        adeac_sections.LAST_REQUEST_FILE = self._original
        self._directory.cleanup()

    def test_waits_when_the_previous_request_was_recent(self) -> None:
        adeac_sections.remember_request(now=1_000.0)
        slept: list[float] = []
        waited = adeac_sections.wait_for_crawl_delay(
            now=1_002.0, sleep=slept.append
        )
        self.assertAlmostEqual(waited, adeac_sections.CRAWL_DELAY_SECONDS - 2.0)
        self.assertEqual(len(slept), 1)

    def test_does_not_wait_when_enough_time_has_passed(self) -> None:
        adeac_sections.remember_request(now=1_000.0)
        slept: list[float] = []
        waited = adeac_sections.wait_for_crawl_delay(
            now=1_000.0 + adeac_sections.CRAWL_DELAY_SECONDS + 1, sleep=slept.append
        )
        self.assertEqual(waited, 0.0)
        self.assertEqual(slept, [])

    def test_first_request_does_not_wait(self) -> None:
        slept: list[float] = []
        self.assertEqual(
            adeac_sections.wait_for_crawl_delay(now=1_000.0, sleep=slept.append), 0.0
        )
        self.assertEqual(slept, [])

    def test_broken_record_waits_the_full_delay(self) -> None:
        # 記録が壊れていたら、取らない側ではなく待つ側に倒す。
        adeac_sections.LAST_REQUEST_FILE.parent.mkdir(parents=True, exist_ok=True)
        adeac_sections.LAST_REQUEST_FILE.write_text("こわれた", encoding="utf-8")
        slept: list[float] = []
        waited = adeac_sections.wait_for_crawl_delay(now=1_000.0, sleep=slept.append)
        self.assertEqual(waited, float(adeac_sections.CRAWL_DELAY_SECONDS))
        self.assertEqual(len(slept), 1)

    def test_a_clock_moved_backwards_waits_the_full_delay(self) -> None:
        # 記録が未来になっていても、負の秒数で寝かさない。
        adeac_sections.remember_request(now=2_000.0)
        slept: list[float] = []
        waited = adeac_sections.wait_for_crawl_delay(now=1_000.0, sleep=slept.append)
        self.assertEqual(waited, float(adeac_sections.CRAWL_DELAY_SECONDS))
        self.assertEqual(len(slept), 1)


class SourceLedgerTest(unittest.TestCase):
    def test_volume_source_refs_exist_in_the_ledger(self) -> None:
        # 巻に書いた出典IDが台帳に無いと、起こした出来事が検査で落ちる。
        from check_rekishi_data import load_js

        meta = load_js(Path(adeac_sections.ROOT) / "data" / "rekishi.js",
                       "window.SHINAGAWA_DB.rekishi")
        known = {source["id"] for source in meta.get("sources", [])}
        for name, volume in adeac_sections.VOLUMES.items():
            with self.subTest(volume=name):
                self.assertIn(volume["source_ref"], known)


if __name__ == "__main__":
    unittest.main()
