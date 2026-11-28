#!/usr/bin/env python3
"""ホーム画面に追加したときのアイコンを、DADSの青に保つための検査。"""

import json
import re
import sys
from pathlib import Path

# scripts/ を import 先に加える（単独実行でも他の検査と同時でも同じ結果にするため）
sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# デジタル庁デザインシステム（DADS）の主色 = 青900。
# サイト共通の site-theme.css と同じ値でなければならない。
DADS_BLUE = "#0017c1"
DADS_BLUE_RGB = (0x00, 0x17, 0xC1)


# 開いたらすぐ別のページへ転送するだけのページ。ホーム画面に追加させるページではないので、
# アイコンの対象にしない（追加しようとしても、その時点で転送先のページが開いている）。
# - news-moved.html: 旧URLに置く「移転のお知らせ」。公開時は news.html として配られる
# - shikin-shiryo.html: 廃止した「政務活動費・政治資金の資料」の旧URL（#149）
EXCLUDED_PAGES = {"news-moved.html", "shikin-shiryo.html"}


def top_level_pages() -> list[Path]:
    # ホーム画面に追加されうるページ
    return sorted(p for p in ROOT.glob("*.html") if p.name not in EXCLUDED_PAGES)


class HomeScreenIconTest(unittest.TestCase):
    def test_site_theme_blue_is_the_dads_primary(self) -> None:
        # 基準にしている色が site-theme.css とずれていないか
        css = (ROOT / "site-theme.css").read_text(encoding="utf-8")
        match = re.search(r"--dads-blue-900:\s*(#[0-9a-fA-F]{6})", css)
        self.assertIsNotNone(match, "site-theme.css に --dads-blue-900 がありません")
        self.assertEqual(match.group(1).lower(), DADS_BLUE)

    def test_apple_touch_icon_is_opaque_dads_blue(self) -> None:
        path = ROOT / "apple-touch-icon.png"
        self.assertTrue(path.exists(), "apple-touch-icon.png がありません")
        image = Image.open(path)
        # iOS は 180x180 を使う。透明部分は黒く塗られるので不透明にする
        self.assertEqual(image.size, (180, 180))
        self.assertNotIn("A", image.getbands(), "透明を含むと iOS で黒く塗られます")
        rgb = image.convert("RGB")
        # 四隅（角丸を掛けるのは iOS 側）と、記号の外側が青であること
        for point in [(0, 0), (179, 0), (0, 179), (179, 179), (10, 90)]:
            self.assertEqual(rgb.getpixel(point), DADS_BLUE_RGB, f"{point} が青ではありません")

    def test_manifest_icons_exist_and_use_the_same_blue(self) -> None:
        manifest = json.loads((ROOT / "manifest.webmanifest").read_text(encoding="utf-8"))
        self.assertEqual(manifest["theme_color"].lower(), DADS_BLUE)
        # 起動時の背景が白だと、青いアイコンの後に白い画面が一瞬出る
        self.assertEqual(manifest["background_color"].lower(), DADS_BLUE)
        sizes = set()
        for icon in manifest["icons"]:
            path = ROOT / icon["src"]
            self.assertTrue(path.exists(), f"{icon['src']} がありません")
            image = Image.open(path).convert("RGB")
            self.assertEqual(f"{image.width}x{image.height}", icon["sizes"])
            self.assertEqual(image.getpixel((0, 0)), DADS_BLUE_RGB)
            sizes.add(icon["sizes"])
        self.assertTrue({"192x192", "512x512"} <= sizes, "192 と 512 の両方が要ります")

    def test_excluded_pages_only_redirect(self) -> None:
        # 対象外にしたページが、本当に転送するだけのページであること。
        # 普通のページを誤って外すと、アイコンの宣言が抜けても気付けなくなる。
        # 通常のページ（index.html など）にも条件付きの転送はあるので、サイトのナビを持たないことも見る
        for name in sorted(EXCLUDED_PAGES):
            with self.subTest(page=name):
                path = ROOT / name
                self.assertTrue(path.exists(), f"{name} がありません。対象外の一覧から外してください")
                text = path.read_text(encoding="utf-8")
                self.assertIn("location.replace(", text, f"{name} は転送していません")
                self.assertNotIn("data-site-nav", text, f"{name} はサイトのナビを持つ通常のページです")

    def test_every_page_declares_icon_and_manifest(self) -> None:
        pages = top_level_pages()
        self.assertGreater(len(pages), 0)
        for page in pages:
            head = page.read_text(encoding="utf-8").split("</head>")[0]
            with self.subTest(page=page.name):
                self.assertIn(
                    '<link rel="apple-touch-icon" href="apple-touch-icon.png" />', head
                )
                self.assertIn('<link rel="manifest" href="manifest.webmanifest" />', head)
                # 同じ宣言を二重に入れない
                self.assertEqual(head.count('rel="apple-touch-icon"'), 1)
                self.assertEqual(head.count('rel="manifest"'), 1)

    def test_every_page_theme_color_is_dads_blue(self) -> None:
        for page in top_level_pages():
            head = page.read_text(encoding="utf-8").split("</head>")[0]
            with self.subTest(page=page.name):
                self.assertIn(f'<meta name="theme-color" content="{DADS_BLUE}" />', head)


if __name__ == "__main__":
    unittest.main()
