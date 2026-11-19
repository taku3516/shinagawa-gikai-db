#!/usr/bin/env python3

import sys
from pathlib import Path

# scripts/ を import 先に加える。これが無いと単独では実行できず、
# 他の検査と同時に走ったときだけ通るという紛らわしい状態になる。
sys.path.insert(0, str(Path(__file__).resolve().parent))

import tempfile
import unittest

from build_news_app import (
    FILES,
    build,
    check_referenced_assets,
    compressed_size,
    referenced_assets,
    transfer_report,
)


ROOT = Path(__file__).resolve().parents[1]


class BuildNewsAppTest(unittest.TestCase):
    def test_delivers_every_file_news_html_loads(self) -> None:
        """news.html の読み込み先が配信対象から漏れていないこと。

        漏れると配信先だけ CSS変数が未定義になり、地色も枠線も消えたまま
        公開されてしまう（2026-08-16に site-theme.css で実際に起きた）。
        """
        check_referenced_assets((ROOT / "news.html").read_text(encoding="utf-8"))

    def test_theme_is_delivered(self) -> None:
        # 配色はサイト共通の site-theme.css が定義している。
        # これが無いと var(--bg) などが解決できず、ページが素のHTMLになる。
        self.assertIn("site-theme.css", FILES)

    def test_reports_missing_asset(self) -> None:
        html = '<link rel="stylesheet" href="wasureta.css" />'
        with self.assertRaisesRegex(ValueError, "wasureta.css"):
            check_referenced_assets(html)

    def test_ignores_external_and_generated_references(self) -> None:
        html = (
            '<link rel="stylesheet" href="https://example.com/a.css" />'
            '<img src="data:image/svg+xml,%3Csvg%3E" />'
            '<script src="data/firebase-config.js"></script>'
            '<a href="index.html">トップへ</a>'
        )
        # 例外が出ないこと（外部URL・データURI・生成物・他ページは対象外）
        check_referenced_assets(html)

    def test_strips_fragment_and_query(self) -> None:
        found = referenced_assets('<a href="news.html?v=2#top">再読み込み</a>')
        self.assertEqual(found, ["news.html"])

    def test_ignores_paths_written_inside_scripts(self) -> None:
        """JSの中の href="${...}" をファイル名と取り違えないこと。

        news.html は記事一覧をJSで組み立てており、テンプレート文字列に
        href= が出てくる。開始タグの src= は拾えなければならない。
        """
        html = (
            '<script src="site-nav.js"></script>'
            "<script>const row = `<a href=\"${safeUrl(item.url)}\">${item.title}</a>`;</script>"
            '<style>.x { background: url("hidden.png"); }</style>'
        )
        self.assertEqual(referenced_assets(html), ["site-nav.js"])

    def test_build_writes_theme_and_page(self) -> None:
        api_key = "AIza" + "A" * 35
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "news-app"
            build(output, api_key)

            self.assertTrue((output / "site-theme.css").exists())
            page = (output / "news.html").read_text(encoding="utf-8")
            self.assertIn('href="site-theme.css"', page)
            self.assertIn("SHINAGAWA_SITE_BASE", page)


class TransferReportTest(unittest.TestCase):
    """配信量はディスク上の大きさではなく圧縮後で数える。

    Firebase Hosting は brotli（またはgzip）で配る。ディスク上の大きさで
    見積もると7倍ほど多く見え、記事の保存件数を削るといった要らない判断につながる。
    """

    def test_圧縮後の大きさで数える(self) -> None:
        payload = ("window.X = " + "{\"title\":\"品川区のニュース\"}," * 500).encode("utf-8")
        self.assertLess(compressed_size(payload), len(payload) / 4)

    def test_ページごとに配信量を出す(self) -> None:
        api_key = "AIza" + "A" * 35
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "news-app"
            build(output, api_key)
            rows = transfer_report(output)

            names = [name for name, _, _ in rows]
            self.assertIn("news.html", names)
            for name, raw, sent in rows:
                with self.subTest(page=name):
                    self.assertGreater(sent, 0)
                    self.assertLess(sent, raw)

    def test_読み込むファイルを合算する(self) -> None:
        api_key = "AIza" + "A" * 35
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "news-app"
            build(output, api_key)
            rows = dict((name, sent) for name, _, sent in transfer_report(output))

            page_only = compressed_size((output / "news.html").read_bytes())
            # ページ単体より大きいこと＝記事データなどを足して数えている。
            self.assertGreater(rows["news.html"], page_only)


if __name__ == "__main__":
    unittest.main()
