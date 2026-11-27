"""標準ライブラリだけのPDF文字読み取り（pdf_text.py）の検査。

評価シートの読み取り全体は test_prepare_jimujigyo.py で確かめる。ここでは、
読み違えると全頁に響く部品（文字の対応表・字幅・行のまとめ方）を固定する。
"""

import sys
import unittest
import zlib
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import pdf_text  # noqa: E402


class ToUnicodeTest(unittest.TestCase):
    def test_単独の対応と範囲の対応を読む(self) -> None:
        cmap = ("2 beginbfchar\n<0003> <0020>\n<15BA> <5E74>\nendbfchar\n"
                "1 beginbfrange\n<0010> <0012> <0041>\nendbfrange\n")
        table = pdf_text.parse_tounicode(cmap)
        self.assertEqual(table[0x03], " ")
        self.assertEqual(table[0x15BA], "年")
        self.assertEqual([table[c] for c in (0x10, 0x11, 0x12)], ["A", "B", "C"])


class WidthsTest(unittest.TestCase):
    def test_W配列の2つの書き方を読む(self) -> None:
        doc = pdf_text.Document(b"1 0 obj\n<< >>\nendobj\n")
        widths = pdf_text.parse_widths([1, [500, 600], 10, 12, 1000], doc)
        self.assertEqual(widths, {1: 500.0, 2: 600.0, 10: 1000.0, 11: 1000.0, 12: 1000.0})


class GroupLinesTest(unittest.TestCase):
    def test_近い文字は1行にまとめ離れた文字は別の行(self) -> None:
        g = pdf_text.Glyph
        glyphs = [g(0, 0, 10, 10, "計"), g(50, 0, 60, 10, "1"), g(60, 0, 65, 10, "2")]
        lines = pdf_text.group_lines(glyphs)
        self.assertEqual([line[4] for line in lines], ["計", "12"])

    def test_字幅の1割を超える隙間には空白を挟む(self) -> None:
        g = pdf_text.Glyph
        lines = pdf_text.group_lines([g(0, 0, 10, 10, "令"), g(12, 0, 22, 10, "和")])
        self.assertEqual(lines[0][4], "令 和")


class DocumentTest(unittest.TestCase):
    def test_最小のPDFから文字と座標を読む(self) -> None:
        content = zlib.compress(b"BT /F0 10 Tf 1 0 0 1 100 700 Tm <00010002> Tj ET")
        cmap = zlib.compress(b"beginbfchar\n<0001> <8A08>\n<0002> <0031>\nendbfchar")
        objects = [
            b"<< /Type /Catalog /Pages 2 0 R >>",
            b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 800] /Resources << /Font << /F0 5 0 R >> >> /Contents 4 0 R >>",
            b"<< /Filter /FlateDecode /Length %d >>\nstream\n" % len(content) + content + b"\nendstream",
            b"<< /Type /Font /Subtype /Type0 /Encoding /Identity-H /DescendantFonts [6 0 R] /ToUnicode 7 0 R >>",
            b"<< /Type /Font /Subtype /CIDFontType2 /DW 1000 /W [2 [500]] /FontDescriptor 8 0 R >>",
            b"<< /Filter /FlateDecode /Length %d >>\nstream\n" % len(cmap) + cmap + b"\nendstream",
            b"<< /Type /FontDescriptor /Descent -140 >>",
        ]
        body = b"%PDF-1.4\n" + b"".join(b"%d 0 obj\n" % (i + 1) + obj + b"\nendobj\n" for i, obj in enumerate(objects))
        doc = pdf_text.Document(body + b"trailer\n<< /Root 1 0 R >>\n%%EOF")
        pages = doc.pages()
        self.assertEqual(len(pages), 1)
        lines = pdf_text.group_lines(pdf_text.page_glyphs(doc, pages[0]))
        self.assertEqual(len(lines), 1)
        x0, y0, x1, y1, text = lines[0]
        self.assertEqual(text, "計1")
        self.assertAlmostEqual(x0, 100)
        self.assertAlmostEqual(x1, 115)  # 全角10＋半角5
        self.assertAlmostEqual(y0, 698.6)  # ベースライン700＋ディセント-1.4
        self.assertAlmostEqual(y1, 708.6)

    def test_Qでフォントも元に戻す(self) -> None:
        # 1文字だけ別フォントで描き、Q で元のフォントに戻る（区長室の評価シートで実際に出る形）
        content = zlib.compress(b"BT /F0 10 Tf 1 0 0 1 100 700 Tm <0001> Tj q /F1 10 Tf <0001> Tj Q <0001> Tj ET")
        cmap0 = zlib.compress(b"beginbfchar\n<0001> <8A08>\nendbfchar")
        cmap1 = zlib.compress(b"beginbfchar\n<0001> <9577>\nendbfchar")
        objects = [
            b"<< /Type /Catalog /Pages 2 0 R >>",
            b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 600 800] /Resources << /Font << /F0 5 0 R /F1 8 0 R >> >> /Contents 4 0 R >>",
            b"<< /Filter /FlateDecode /Length %d >>\nstream\n" % len(content) + content + b"\nendstream",
            b"<< /Subtype /Type0 /Encoding /Identity-H /DescendantFonts [6 0 R] /ToUnicode 7 0 R >>",
            b"<< /DW 1000 >>",
            b"<< /Filter /FlateDecode /Length %d >>\nstream\n" % len(cmap0) + cmap0 + b"\nendstream",
            b"<< /Subtype /Type0 /Encoding /Identity-H /DescendantFonts [6 0 R] /ToUnicode 9 0 R >>",
            b"<< /Filter /FlateDecode /Length %d >>\nstream\n" % len(cmap1) + cmap1 + b"\nendstream",
        ]
        body = b"".join(b"%d 0 obj\n" % (i + 1) + obj + b"\nendobj\n" for i, obj in enumerate(objects))
        doc = pdf_text.Document(body + b"trailer\n<< /Root 1 0 R >>")
        glyphs = pdf_text.page_glyphs(doc, doc.pages()[0])
        self.assertEqual("".join(g.text for g in glyphs), "計長計")

    def test_未対応の圧縮形式は理由を添えて止まる(self) -> None:
        body = b"1 0 obj\n<< /Filter /DCTDecode /Length 1 >>\nstream\nx\nendstream\nendobj\n"
        doc = pdf_text.Document(body)
        with self.assertRaisesRegex(pdf_text.PdfError, "DCTDecode"):
            doc.stream(pdf_text.Ref(1))


if __name__ == "__main__":
    unittest.main()
