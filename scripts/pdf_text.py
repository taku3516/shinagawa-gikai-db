"""標準ライブラリだけで、PDFの文字を座標つきの行として取り出す。

区の事務事業評価シートのように、ToUnicode を持つ Type0（Identity-H）フォントで
書かれ、圧縮が FlateDecode だけの素直なPDFを対象にする。汎用のPDF読み取りではない。

行のまとめ方は pdfminer.six の既定（LAParams の line_overlap=0.5、word_margin=0.1）に
char_margin=1.0 を合わせた規則を写している。
  ・描画順に文字を見て、直前の文字と高さが半分以上重なり、横の隙間が文字幅の1倍未満なら同じ行
  ・同じ行で、隙間が文字幅の0.1倍を超えたら空白を1つ挟む
座標は左下原点（PDFの座標）で返す。
"""

from __future__ import annotations

import re
import zlib
from pathlib import Path
from typing import Any, Optional, Union

Matrix = tuple[float, float, float, float, float, float]
IDENTITY: Matrix = (1.0, 0.0, 0.0, 1.0, 0.0, 0.0)

LINE_OVERLAP = 0.5
CHAR_MARGIN = 1.0
WORD_MARGIN = 0.1


class PdfError(Exception):
    """対象外の形式や壊れたPDFに出会ったとき。"""


class Ref:
    """間接参照（例: 7 0 R）。"""

    def __init__(self, number: int) -> None:
        self.number = number

    def __repr__(self) -> str:
        return f"Ref({self.number})"


class Name(str):
    """PDFの名前（/Font など）。先頭の / は外して持つ。"""


def multiply(m: Matrix, n: Matrix) -> Matrix:
    """行列の積 m×n（PDFの座標変換の順序）。"""
    a, b, c, d, e, f = m
    p, q, r, s, t, u = n
    return (a * p + b * r, a * q + b * s, c * p + d * r, c * q + d * s, e * p + f * r + t, e * q + f * s + u)


def apply(m: Matrix, x: float, y: float) -> tuple[float, float]:
    """点 (x, y) を行列 m で写す。"""
    a, b, c, d, e, f = m
    return a * x + c * y + e, b * x + d * y + f


# ── 字句解析 ──────────────────────────────────────

TOKEN = re.compile(
    rb"\s*(?:"
    rb"(?P<comment>%[^\r\n]*)"
    rb"|(?P<dictopen><<)|(?P<dictclose>>>)"
    rb"|(?P<hex><[0-9A-Fa-f\s]*>)"
    rb"|(?P<arropen>\[)|(?P<arrclose>\])"
    rb"|(?P<name>/[^\s/\[\]<>(){}%]*)"
    rb"|(?P<string>\()"
    rb"|(?P<number>[+-]?(?:\d+\.?\d*|\.\d+))"
    rb"|(?P<word>[A-Za-z'\"*][A-Za-z0-9'\"*]*)"
    rb")"
)


def read_literal(data: bytes, pos: int) -> tuple[bytes, int]:
    """丸括弧の文字列を読む（pos は「(」の直後）。入れ子とエスケープに対応。"""
    depth, out, i = 1, bytearray(), pos
    escapes = {ord("n"): b"\n", ord("r"): b"\r", ord("t"): b"\t", ord("b"): b"\b", ord("f"): b"\f"}
    while i < len(data):
        ch = data[i]
        if ch == 0x5C:  # バックスラッシュ
            nxt = data[i + 1]
            if nxt in escapes:
                out += escapes[nxt]
                i += 2
            elif 0x30 <= nxt <= 0x37:
                digits = re.match(rb"[0-7]{1,3}", data[i + 1:i + 4]).group(0)
                out.append(int(digits, 8) & 0xFF)
                i += 1 + len(digits)
            elif nxt in b"\r\n":
                i += 2 + (nxt == 0x0D and data[i + 2:i + 3] == b"\n")
            else:
                out.append(nxt)
                i += 2
            continue
        if ch == 0x28:
            depth += 1
        elif ch == 0x29:
            depth -= 1
            if depth == 0:
                return bytes(out), i + 1
        out.append(ch)
        i += 1
    raise PdfError("文字列が閉じていません")


def tokens(data: bytes, pos: int = 0, end: Optional[int] = None):
    """字句を順に返す。(種類, 値) の組。"""
    end = len(data) if end is None else end
    while pos < end:
        match = TOKEN.match(data, pos, end)
        if not match or match.end() == pos:
            if data[pos:end].strip() == b"":
                return
            raise PdfError(f"読めない字句: {data[pos:pos + 20]!r}")
        kind = match.lastgroup
        pos = match.end()
        if kind == "comment":
            continue
        if kind == "string":
            value, pos = read_literal(data, pos)
            yield "string", value
        elif kind == "hex":
            digits = re.sub(rb"\s", b"", match.group(kind)[1:-1])
            yield "string", bytes.fromhex((digits + b"0" * (len(digits) % 2)).decode())
        elif kind == "number":
            text = match.group(kind)
            yield "number", float(text) if b"." in text else int(text)
        elif kind == "name":
            yield "name", Name(match.group(kind)[1:].decode("latin1"))
        elif kind == "word":
            yield "word", match.group(kind).decode("latin1")
        else:
            yield kind, None


def parse_value(stream: Any) -> Any:
    """字句列から値を1つ組み立てる（辞書・配列・参照・数・名前・文字列）。"""
    kind, value = next(stream)
    return build(kind, value, stream)


def build(kind: str, value: Any, stream: Any) -> Any:
    """先頭の字句が分かっている値を組み立てる。参照の字句（_ref_tokens が作る）はそのまま値。"""
    if kind == "ref":
        return value
    if kind == "dictopen":
        result: dict[str, Any] = {}
        while True:
            key_kind, key = next(stream)
            if key_kind == "dictclose":
                return result
            if key_kind != "name":
                raise PdfError("辞書のキーが名前ではありません")
            result[key] = parse_value(stream)
    if kind == "arropen":
        items: list[Any] = []
        for item_kind, item in stream:
            if item_kind == "arrclose":
                return items
            items.append(build(item_kind, item, stream))
        raise PdfError("配列が閉じていません")
    if kind == "word":
        return {"true": True, "false": False, "null": None}.get(value, value)
    return value


# ── 文書 ──────────────────────────────────────────

class Document:
    """PDF1つ分。オブジェクトは本文を走査して集める（従来型の xref を前提にしない）。"""

    OBJ = re.compile(rb"(?<![0-9])(\d+)\s+(\d+)\s+obj\b")

    def __init__(self, data: bytes) -> None:
        self.data = data
        self.offsets: dict[int, int] = {}
        for match in self.OBJ.finditer(data):
            self.offsets[int(match.group(1))] = match.end()
        if not self.offsets:
            raise PdfError("オブジェクトが見つかりません")
        self.cache: dict[int, Any] = {}
        self.streams: dict[int, bytes] = {}

    def get(self, number: int) -> Any:
        """番号でオブジェクトを読む。ストリームなら辞書を返し、中身は stream() で読む。"""
        if number in self.cache:
            return self.cache[number]
        start = self.offsets.get(number)
        if start is None:
            raise PdfError(f"オブジェクト {number} がありません")
        end_obj = self.data.find(b"endobj", start)
        stream_at = self.data.find(b"stream", start, end_obj if end_obj >= 0 else None)
        head_end = stream_at if stream_at >= 0 else end_obj
        value = self._parse_dict_aware(self.data[start:head_end])
        if stream_at >= 0 and isinstance(value, dict):
            body_start = stream_at + len(b"stream")
            if self.data[body_start:body_start + 2] == b"\r\n":
                body_start += 2
            elif self.data[body_start:body_start + 1] in (b"\n", b"\r"):
                body_start += 1
            length = self.resolve(value.get("Length"))
            if not isinstance(length, int):
                raise PdfError(f"オブジェクト {number} のストリーム長が読めません")
            self.streams[number] = self.data[body_start:body_start + length]
        self.cache[number] = value
        return value

    def _parse_dict_aware(self, body: bytes) -> Any:
        """辞書の中の「数 数 R」も参照として読む。"""
        stream = _ref_tokens(tokens(body))
        try:
            return parse_value(stream)
        except StopIteration:
            return None

    def resolve(self, value: Any) -> Any:
        """参照なら中身を読む。"""
        while isinstance(value, Ref):
            value = self.get(value.number)
        return value

    def stream(self, ref: Any) -> bytes:
        """ストリームの中身を展開して返す。FlateDecode だけに対応。"""
        if not isinstance(ref, Ref):
            raise PdfError("ストリームは参照で指定されている必要があります")
        head = self.get(ref.number)
        raw = self.streams.get(ref.number)
        if raw is None:
            raise PdfError(f"オブジェクト {ref.number} はストリームではありません")
        filters = self.resolve(head.get("Filter"))
        filters = [] if filters is None else filters if isinstance(filters, list) else [filters]
        for name in filters:
            if name != "FlateDecode":
                raise PdfError(f"未対応の圧縮形式: {name}")
            try:
                raw = zlib.decompress(raw)
            except zlib.error as error:
                raise PdfError(f"オブジェクト {ref.number} を展開できません: {error}") from error
        return raw

    def pages(self) -> list[dict[str, Any]]:
        """頁の辞書を文書順に返す（親から継承する Resources・MediaBox も補う）。"""
        trailer_root = re.search(rb"/Root\s+(\d+)\s+\d+\s+R", self.data)
        if trailer_root:
            catalog = self.get(int(trailer_root.group(1)))
        else:
            catalog = next((self.get(n) for n in self.offsets
                            if isinstance(self.get(n), dict) and self.get(n).get("Type") == "Catalog"), None)
        if not isinstance(catalog, dict):
            raise PdfError("Catalog が見つかりません")
        result: list[dict[str, Any]] = []

        def walk(node_ref: Any, inherited: dict[str, Any]) -> None:
            node = self.resolve(node_ref)
            merged = {**inherited, **{k: node[k] for k in ("Resources", "MediaBox") if k in node}}
            if node.get("Type") == "Pages" or "Kids" in node:
                for kid in self.resolve(node["Kids"]):
                    walk(kid, merged)
            else:
                result.append({**node, **merged})

        walk(catalog["Pages"], {})
        return result


def _ref_tokens(stream: Any):
    """字句列を3つ先読みし、「数 数 R」を参照の字句 ("ref", Ref) にまとめて流す。"""
    buffer: list[tuple[str, Any]] = []
    for item in stream:
        buffer.append(item)
        if len(buffer) >= 3 and buffer[-1] == ("word", "R") and buffer[-2][0] == "number" and buffer[-3][0] == "number":
            number = buffer[-3][1]
            del buffer[-3:]
            buffer.append(("ref", Ref(number)))
        while len(buffer) > 3:
            yield buffer.pop(0)
    yield from buffer


# ── フォント ──────────────────────────────────────

class Font:
    """Type0（Identity-H）フォント。CID→文字、CID→幅、ディセントを持つ。"""

    def __init__(self, doc: Document, font: dict[str, Any]) -> None:
        if font.get("Subtype") != "Type0" or font.get("Encoding") != "Identity-H":
            raise PdfError(f"未対応のフォント: {font.get('Subtype')} {font.get('Encoding')}")
        self.unicode = parse_tounicode(doc.stream(font["ToUnicode"]).decode("latin1")) if "ToUnicode" in font else {}
        descendant = doc.resolve(doc.resolve(font["DescendantFonts"])[0])
        self.default_width = float(doc.resolve(descendant.get("DW", 1000)))
        self.widths = parse_widths(doc.resolve(descendant.get("W", [])), doc)
        descriptor = doc.resolve(descendant.get("FontDescriptor")) or {}
        self.descent = float(doc.resolve(descriptor.get("Descent", 0)))

    def width(self, cid: int) -> float:
        """字幅（1000分の1単位）。"""
        return self.widths.get(cid, self.default_width)

    def text(self, cid: int) -> str:
        """CIDに対応する文字。対応表に無ければ (cid:番号)。"""
        return self.unicode.get(cid, f"(cid:{cid})")


def parse_widths(spec: list[Any], doc: Document) -> dict[int, float]:
    """W 配列（c [w1 w2 …] または c1 c2 w）を CID→幅 の表にする。"""
    widths: dict[int, float] = {}
    i = 0
    while i < len(spec):
        first = doc.resolve(spec[i])
        nxt = doc.resolve(spec[i + 1])
        if isinstance(nxt, list):
            for offset, w in enumerate(nxt):
                widths[first + offset] = float(doc.resolve(w))
            i += 2
        else:
            w = float(doc.resolve(spec[i + 2]))
            for cid in range(first, nxt + 1):
                widths[cid] = w
            i += 3
    return widths


def _utf16(hexdigits: str) -> str:
    """ToUnicode の16進（UTF-16BE）を文字列に。"""
    return bytes.fromhex(hexdigits).decode("utf-16-be", errors="replace")


def parse_tounicode(cmap: str) -> dict[int, str]:
    """ToUnicode CMap の bfchar・bfrange を読む。"""
    table: dict[int, str] = {}
    for block in re.findall(r"beginbfchar(.*?)endbfchar", cmap, re.S):
        for src, dst in re.findall(r"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>", block):
            table[int(src, 16)] = _utf16(dst)
    for block in re.findall(r"beginbfrange(.*?)endbfrange", cmap, re.S):
        for lo, hi, rest in re.findall(r"<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*(\[[^\]]*\]|<[0-9A-Fa-f]+>)", block):
            start, end = int(lo, 16), int(hi, 16)
            if rest.startswith("["):
                for offset, dst in enumerate(re.findall(r"<([0-9A-Fa-f]+)>", rest)):
                    table[start + offset] = _utf16(dst)
            else:
                base = int(rest[1:-1], 16)
                width = len(rest[1:-1])
                for offset in range(end - start + 1):
                    table[start + offset] = _utf16(f"{base + offset:0{width}X}")
    return table


# ── 描画命令の解釈と行のまとめ ──────────────────────

class Glyph:
    """1文字分の箱（左下原点）。"""

    __slots__ = ("x0", "y0", "x1", "y1", "text")

    def __init__(self, x0: float, y0: float, x1: float, y1: float, text: str) -> None:
        self.x0, self.y0, self.x1, self.y1, self.text = x0, y0, x1, y1, text

    @property
    def width(self) -> float:
        return self.x1 - self.x0

    @property
    def height(self) -> float:
        return self.y1 - self.y0


def page_glyphs(doc: Document, page: dict[str, Any]) -> list[Glyph]:
    """頁の文字を描画順に並べて返す。"""
    resources = doc.resolve(page.get("Resources")) or {}
    font_dict = doc.resolve(resources.get("Font")) or {}
    fonts: dict[str, Font] = {}
    contents = doc.resolve(page.get("Contents"))
    refs = contents if isinstance(contents, list) else [page.get("Contents")]
    data = b"\n".join(doc.stream(ref) for ref in refs)

    glyphs: list[Glyph] = []
    ctm: Matrix = IDENTITY
    # q／Q で退避・復元するのは座標変換だけでなく、フォントや字間などの文字の状態も含む
    stack: list[tuple[Any, ...]] = []
    tm: Matrix = IDENTITY
    tlm: Matrix = IDENTITY
    font: Optional[Font] = None
    size = 0.0
    char_space = word_space = rise = leading = 0.0
    scale = 1.0
    operands: list[Any] = []

    def show(raw: bytes) -> None:
        nonlocal tm
        if font is None:
            raise PdfError("フォント未指定のまま文字を描こうとしています")
        for i in range(0, len(raw) - 1, 2):
            cid = (raw[i] << 8) | raw[i + 1]
            advance = font.width(cid) / 1000 * size * scale
            matrix = multiply(tm, ctm)
            descent = font.descent / 1000 * size
            x0, y0 = apply(matrix, 0, descent + rise)
            x1, y1 = apply(matrix, advance, descent + rise + size)
            glyphs.append(Glyph(min(x0, x1), min(y0, y1), max(x0, x1), max(y0, y1), font.text(cid)))
            shift = advance + char_space * scale + (word_space * scale if cid == 32 else 0)
            tm = multiply((1, 0, 0, 1, shift, 0), tm)

    stream = _ref_tokens(tokens(data))
    for kind, value in stream:
        if kind != "word":
            operands.append(build(kind, value, stream))
            continue
        op = value
        if op == "q":
            stack.append((ctm, font, size, char_space, word_space, scale, leading, rise))
        elif op == "Q":
            if not stack:
                raise PdfError("対応する q の無い Q があります")
            ctm, font, size, char_space, word_space, scale, leading, rise = stack.pop()
        elif op == "cm":
            ctm = multiply(tuple(float(v) for v in operands[-6:]), ctm)
        elif op == "BT":
            tm = tlm = IDENTITY
        elif op == "Tf":
            name, size = operands[-2], float(operands[-1])
            if name not in fonts:
                fonts[name] = Font(doc, doc.resolve(font_dict[name]))
            font = fonts[name]
        elif op == "Tc":
            char_space = float(operands[-1])
        elif op == "Tw":
            word_space = float(operands[-1])
        elif op == "Tz":
            scale = float(operands[-1]) / 100
        elif op == "TL":
            leading = float(operands[-1])
        elif op == "Ts":
            rise = float(operands[-1])
        elif op == "Tm":
            tm = tlm = tuple(float(v) for v in operands[-6:])
        elif op in ("Td", "TD"):
            tx, ty = float(operands[-2]), float(operands[-1])
            if op == "TD":
                leading = -ty
            tm = tlm = multiply((1, 0, 0, 1, tx, ty), tlm)
        elif op == "T*":
            tm = tlm = multiply((1, 0, 0, 1, 0, -leading), tlm)
        elif op == "Tj":
            show(operands[-1])
        elif op == "'":
            tm = tlm = multiply((1, 0, 0, 1, 0, -leading), tlm)
            show(operands[-1])
        elif op == '"':
            word_space, char_space = float(operands[-3]), float(operands[-2])
            tm = tlm = multiply((1, 0, 0, 1, 0, -leading), tlm)
            show(operands[-1])
        elif op == "TJ":
            for item in operands[-1]:
                if isinstance(item, bytes):
                    show(item)
                else:
                    tm = multiply((1, 0, 0, 1, -float(item) / 1000 * size * scale, 0), tm)
        operands = []
    return glyphs


def _voverlap(a: Glyph, b: Glyph) -> float:
    return max(0.0, min(a.y1, b.y1) - max(a.y0, b.y0))


def _hdistance(a: Glyph, b: Glyph) -> float:
    if a.x1 >= b.x0 and b.x1 >= a.x0:
        return 0.0
    return min(abs(a.x0 - b.x1), abs(a.x1 - b.x0))


def group_lines(glyphs: list[Glyph]) -> list[tuple[float, float, float, float, str]]:
    """描画順の文字を行にまとめる。戻り値は (x0, y0, x1, y1, 文字) の並び。"""
    lines: list[list[Glyph]] = []
    previous: Optional[Glyph] = None
    for glyph in glyphs:
        aligned = (previous is not None
                   and _voverlap(previous, glyph) > min(previous.height, glyph.height) * LINE_OVERLAP
                   and _hdistance(previous, glyph) < max(previous.width, glyph.width) * CHAR_MARGIN)
        if aligned:
            lines[-1].append(glyph)
        else:
            lines.append([glyph])
        previous = glyph
    result = []
    for line in lines:
        text, right = "", None
        for glyph in line:
            if right is not None and glyph.x0 - right > WORD_MARGIN * max(glyph.width, glyph.height):
                text += " "
            text += glyph.text
            right = glyph.x1
        result.append((min(g.x0 for g in line), min(g.y0 for g in line),
                       max(g.x1 for g in line), max(g.y1 for g in line), text))
    return result


def pdf_lines(path: Union[str, Path]) -> list[tuple[float, list[tuple[float, float, float, float, str]]]]:
    """PDFの各頁について、(頁の高さ, 行の並び) を返す。"""
    doc = Document(Path(path).read_bytes())
    result = []
    for page in doc.pages():
        box = [float(v) for v in doc.resolve(page.get("MediaBox", [0, 0, 595, 842]))]
        result.append((box[3] - box[1], group_lines(page_glyphs(doc, page))))
    return result
