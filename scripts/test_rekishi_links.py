#!/usr/bin/env python3
"""出典リンクの確認と、件数の関門が働いているかを確かめる。

監視は「鳴らないこと」で安心してしまいがちなので、わざと壊した状態で
ちゃんと鳴ることを確かめる。通信はしない（probe を差し替える）。
"""

import sys
from pathlib import Path

# scripts/ を import 先に加える。これが無いと単独では実行できず、
# 他の検査と同時に走ったときだけ通るという紛らわしい状態になる。
sys.path.insert(0, str(Path(__file__).resolve().parent))

import json
import tempfile
import unittest

from check_rekishi_links import check, collect_urls
from prepare_rekishi_places import shrank_too_much


META = {
    "sources": [
        {"id": "src-a", "label": "出典A", "url": "https://example.test/a"},
        {"id": "src-b", "label": "URLの無い出典"},
    ],
    "files": {"places": "data/rekishi-places.js"},
}

PLACES = {
    "items": [
        {
            "id": "pl-sample",
            "name": "見本の地点",
            "heritage": [
                {"name": "見本の文化財", "kind": "史跡", "url": "https://example.test/b"},
                {"name": "もう1件", "kind": "史跡", "url": "https://example.test/c"},
            ],
        }
    ]
}


def write_fixture(root: Path) -> None:
    data = root / "data"
    data.mkdir(parents=True, exist_ok=True)
    (data / "rekishi.js").write_text(
        "window.SHINAGAWA_DB.rekishi = " + json.dumps(META, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )
    (data / "rekishi-places.js").write_text(
        "window.SHINAGAWA_DB.rekishiPlaces = " + json.dumps(PLACES, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )


class CollectUrlsTest(unittest.TestCase):
    def test_collects_ledger_and_heritage_urls(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            write_fixture(root)
            urls = dict(collect_urls(root))
        self.assertEqual(
            sorted(urls),
            ["https://example.test/a", "https://example.test/b", "https://example.test/c"],
        )
        # どこに書かれているURLなのかが分かること。直すときに探せないと困る。
        self.assertIn("出典A", urls["https://example.test/a"])
        self.assertIn("見本の文化財", urls["https://example.test/b"])

    def test_source_without_url_is_skipped(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            write_fixture(root)
            urls = dict(collect_urls(root))
        self.assertNotIn("", urls)
        self.assertEqual(len(urls), 3)


class CheckTest(unittest.TestCase):
    URLS = [("https://example.test/alive", "生きている"), ("https://example.test/dead", "死んでいる")]

    def test_dead_url_is_reported(self) -> None:
        def probe(url: str):
            return (200, "") if url.endswith("alive") else (404, "")

        dead, suspect = check(self.URLS, delay=0, retry_delay=0, probe_fn=probe)
        self.assertEqual([x["url"] for x in dead], ["https://example.test/dead"])
        self.assertEqual(suspect, [])

    def test_all_alive_reports_nothing(self) -> None:
        dead, suspect = check(self.URLS, delay=0, probe_fn=lambda url: (200, ""))
        self.assertEqual(dead, [])
        self.assertEqual(suspect, [])

    def test_redirect_counts_as_alive(self) -> None:
        # 公式サイトのリニューアルで301が張られた場合は、生きている扱いにする。
        dead, _ = check(self.URLS, delay=0, probe_fn=lambda url: (301, ""))
        self.assertEqual(dead, [])

    def test_forbidden_is_suspect_not_dead(self) -> None:
        # 403は自動アクセスを断る設定のことがあり、ページが消えたとは限らない。
        dead, suspect = check(self.URLS, delay=0, probe_fn=lambda url: (403, ""))
        self.assertEqual(dead, [])
        self.assertEqual(len(suspect), 2)

    def test_transient_failure_is_retried(self) -> None:
        # 一度の失敗では死んだと決めない。二度目で返ってきたら生きている扱い。
        seen: dict[str, int] = {}

        def flaky(url: str):
            seen[url] = seen.get(url, 0) + 1
            return (None, "一時的な失敗") if seen[url] == 1 else (200, "")

        dead, _ = check(self.URLS, delay=0, retry_delay=0, probe_fn=flaky)
        self.assertEqual(dead, [])
        self.assertTrue(all(count == 2 for count in seen.values()), seen)


class ShrinkGuardTest(unittest.TestCase):
    """公式ページの作りが変わって件数が静かに減る事故を止められるか。"""

    def test_large_drop_is_blocked(self) -> None:
        self.assertTrue(shrank_too_much(101, 20))

    def test_small_drop_is_allowed(self) -> None:
        # 区が指定を1件取り消した、程度の変化は通す。
        self.assertFalse(shrank_too_much(101, 100))

    def test_growth_is_allowed(self) -> None:
        self.assertFalse(shrank_too_much(101, 105))

    def test_first_run_is_allowed(self) -> None:
        # 初回はまだ比べる相手がいない。
        self.assertFalse(shrank_too_much(None, 101))


if __name__ == "__main__":
    unittest.main()
