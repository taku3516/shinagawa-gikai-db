#!/usr/bin/env python3
"""ホーム画面用アイコンを作る。

デジタル庁デザインシステム（DADS）の主色・青900（#0017c1）の地に、白い「品」。
色の基準は site-theme.css の --dads-blue-900 で、ずれたら
scripts/test_home_screen_icon.py が落ちる。

    python3 scripts/make_home_icon.py

作るもの:
    apple-touch-icon.png  180x180  iOS（Safariの「ホーム画面に追加」）
    icon-192.png          192x192  Android / manifest
    icon-512.png          512x512  Android / manifest

iOS は透明部分を黒く塗り、角丸も自分で掛ける。なので完全な不透明の正方形にする。
Pillow が要る（無ければ `python3 -m pip install pillow`）。
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent

BLUE = (0x00, 0x17, 0xC1)  # DADS 青900
WHITE = (255, 255, 255)

# 日本語が描ける太字のフォント。上から順に、あるものを使う。
FONT_CANDIDATES = [
    "/System/Library/Fonts/ヒラギノ角ゴシック W7.ttc",
    "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc",
    "/System/Library/Fonts/Hiragino Sans GB.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
]

GLYPH = "品"
# 文字の高さが辺に占める割合。iOS の角丸で欠けないよう、余白を十分に残す。
GLYPH_RATIO = 0.56

OUTPUTS = {
    "apple-touch-icon.png": 180,
    "icon-192.png": 192,
    "icon-512.png": 512,
}


def load_font(size: int) -> ImageFont.FreeTypeFont:
    for candidate in FONT_CANDIDATES:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    raise FileNotFoundError(
        "日本語フォントが見つかりません。FONT_CANDIDATES に足してください: "
        + ", ".join(FONT_CANDIDATES)
    )


def draw_icon(side: int) -> Image.Image:
    # RGB で作る。アルファを持たせないことで、透明→黒の塗りつぶしを起こさない
    image = Image.new("RGB", (side, side), BLUE)
    draw = ImageDraw.Draw(image)
    font = load_font(round(side * GLYPH_RATIO / 0.9))
    # 字の見た目の箱で中央に置く（フォントの上下の余白に引きずられない）
    left, top, right, bottom = draw.textbbox((0, 0), GLYPH, font=font)
    x = (side - (right - left)) / 2 - left
    y = (side - (bottom - top)) / 2 - top
    draw.text((x, y), GLYPH, font=font, fill=WHITE)
    return image


def main() -> int:
    for name, side in OUTPUTS.items():
        draw_icon(side).save(ROOT / name, optimize=True)
        print(f"{name} ({side}x{side})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
