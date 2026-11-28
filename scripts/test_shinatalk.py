#!/usr/bin/env python3
"""しなトーク（しながわオープントーク）の公開APIの応答から事実を取り出す処理を確かめる。

取り出すのは件名・副題・期間・段階（区が付けたステップ名と日程）・参加の方法（部品の種類）。
説明文や利用者の投稿本文は取り出さない（リンクでしなトークへ案内する）。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

import shinatalk


def process(**overrides: object) -> dict:
    """APIが返す参加型プロセス1件の骨格。"""
    base = {
        "id": "544",
        "slug": "gomi",
        "title": {"translation": "ごみの減量を考えよう"},
        "subtitle": {"translation": "意見募集：10月21日〜11月30日"},
        "startDate": "2026-10-21",
        "endDate": "2027-03-31",
        "publishedAt": "2026-10-05T23:14:56+09:00",
        "steps": [
            {"title": {"translation": "知る・答える"}, "startDate": "2026-10-21T00:00:00+09:00",
             "endDate": "2026-11-30T00:00:00+09:00", "active": True},
            {"title": {"translation": "集計・整理"}, "startDate": "2026-12-01T00:00:00+09:00",
             "endDate": "2026-12-31T00:00:00+09:00", "active": False},
            {"title": {"translation": "効果を確かめる"}, "startDate": None, "endDate": None, "active": False},
        ],
        "components": [
            {"__typename": "Blogs"}, {"__typename": "Surveys"}, {"__typename": "Proposals"},
            {"__typename": "Pages"}, {"__typename": "Surveys"},
        ],
    }
    base.update(overrides)
    return base


class NormalizeTest(unittest.TestCase):
    def test_takes_facts_and_links_to_the_process(self) -> None:
        item = shinatalk.normalize(process())
        self.assertEqual(item["id"], "gomi")
        self.assertEqual(item["title"], "ごみの減量を考えよう")
        self.assertEqual(item["subtitle"], "意見募集：10月21日〜11月30日")
        self.assertEqual(item["url"], "https://shinagawa.makeour.city/ja/processes/gomi")
        self.assertEqual((item["start"], item["end"]), ("2026-10-21", "2027-03-31"))

    def test_steps_keep_dates_as_days_and_the_active_flag(self) -> None:
        steps = shinatalk.normalize(process())["steps"]
        self.assertEqual(steps[0], {"title": "知る・答える", "start": "2026-10-21", "end": "2026-11-30", "active": True})
        self.assertEqual(steps[2], {"title": "効果を確かめる", "start": None, "end": None, "active": False})

    def test_ways_to_take_part_are_listed_once_in_fixed_order(self) -> None:
        # 記事・やさしいにほんご（Blogs/Pages）は参加の方法ではないので数えない
        self.assertEqual(shinatalk.normalize(process())["ways"], ["アンケート", "意見の投稿"])

    def test_missing_subtitle_becomes_null(self) -> None:
        item = shinatalk.normalize(process(subtitle={"translation": "  "}))
        self.assertIsNone(item["subtitle"])

    def test_rejects_process_without_title_or_slug(self) -> None:
        with self.assertRaises(ValueError):
            shinatalk.normalize(process(title={"translation": None}))
        with self.assertRaises(ValueError):
            shinatalk.normalize(process(slug="../evil"))

    def test_api_errors_are_raised(self) -> None:
        with self.assertRaises(RuntimeError):
            shinatalk.processes_from_response({"errors": [{"message": "Field 'x' doesn't exist"}]})

    def test_newest_first(self) -> None:
        older = process(slug="charter", startDate="2025-09-01")
        items = shinatalk.processes_from_response({"data": {"participatoryProcesses": [older, process()]}})
        self.assertEqual([item["id"] for item in items], ["gomi", "charter"])


if __name__ == "__main__":
    unittest.main()
