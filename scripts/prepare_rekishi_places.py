#!/usr/bin/env python3
"""品川区公式「指定文化財」から歴史マップ用の地点データを生成する。

公式ページは地区別の表になっていて、1行が1件の指定文化財にあたる。
このうち史跡・旧跡・建造物・天然記念物は、それ自体が地図に載せられる地点なので
1件を1地点にする。絵画・彫刻・古文書などの動産は、置かれている寺社そのものを
地点にし、その地点の持ち物として並べる（1つの寺社に何本もピンが立たないように）。

資料の本文は書き写さない。種別・指定番号・指定年月日・名称・所在地・所有者・
見学可否という事実だけを取り出し、解説は公式の詳細ページへ案内する。

住所から緯度経度への変換は国土地理院の住所検索APIを使う。結果は
scripts/cache/rekishi/ に残し、2回目以降は取りに行かない。

実行例:
  python3 scripts/prepare_rekishi_places.py
  python3 scripts/prepare_rekishi_places.py --refresh      # 取得し直す
  python3 scripts/prepare_rekishi_places.py --dry-run      # 書き出さずに内訳だけ見る

出力:
  data/rekishi-places.js          公開する地点データ
  scripts/out/rekishi/pending.json 緯度経度を引けなかったもの（git管理外・非公開）

外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import hashlib
import html
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable


ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "scripts" / "cache" / "rekishi"
OUT = ROOT / "scripts" / "out" / "rekishi"
OUTPUT = ROOT / "data" / "rekishi-places.js"

USER_AGENT = (
    "shinagawa-gikai-db-rekishi-collector/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)

BASE = "https://www.city.shinagawa.tokyo.jp/bunka/bunkazaikanko/1003758/"

# 公式ページと、そのページが受け持つ地区。地区は区が割り当てたものをそのまま使う。
# 「その他の地区」と都国指定は住所から地区を決める（下の TOWN_AREAS）。
PAGES: list[tuple[str, str, str]] = [
    ("1003759/index.html", "shinagawa", "品川地区の指定文化財"),
    ("1003818/index.html", "osaki", "大崎地区の指定文化財"),
    ("1003842/index.html", "oi", "大井地区の指定文化財"),
    ("1003875/index.html", "ebara", "荏原地区の指定文化財"),
    ("1003894/index.html", "", "その他の地区の指定文化財"),
    ("1003893.html", "", "区内にある都および国の指定文化財"),
]

# 町名から地区を決める表。区公式「区の紹介」の5地区区分に合わせ、
# 地区別ページに実際に出てくる町名から作っている。
# ここに無い町名は "unknown" になり、保留として書き出す。
TOWN_AREAS: dict[str, str] = {
    "北品川": "shinagawa", "南品川": "shinagawa", "東品川": "shinagawa",
    "上大崎": "osaki", "東五反田": "osaki", "西五反田": "osaki",
    "大崎": "osaki", "西品川": "osaki", "広町": "osaki",
    "大井": "oi", "西大井": "oi", "東大井": "oi", "南大井": "oi",
    "勝島": "oi", "二葉": "oi", "豊町": "ebara",
    "荏原": "ebara", "中延": "ebara", "戸越": "ebara", "平塚": "ebara",
    "旗の台": "ebara", "小山": "ebara", "小山台": "ebara", "西中延": "ebara",
    "東中延": "ebara",
    "八潮": "yashio", "東八潮": "yashio",
}

# 不動産（それ自体が地点になるもの）を見分ける語と、割り当てるカテゴリー。
# 「天然記念物および史跡」のように2つ重なる書き方があるので、
# 完全一致ではなく含まれるかどうかで判定する。
IMMOVABLE_CATEGORIES: list[tuple[str, str]] = [
    ("史跡", "site"),
    ("旧跡", "site"),
    ("建造物", "building"),
    ("天然記念物", "nature"),
]

# 種別だけでは拾えない分類を、公式解説の記述を根拠に足す。
#
# 語句の一致で自動的に付けてはいけない。「品川」の「川」で水辺と判定され、
# 「殖産興業」で由利公正の墓が産業遺産になる（実際に試して73件の誤判定が出た）。
# 1件ずつ公式ページの解説を読み、根拠を添えて手で書く。
#
# 鍵は公式ページに載っている文化財の名称。値は (足す分類, 根拠)。
CATEGORY_HINTS: dict[str, tuple[tuple[str, ...], str]] = {
    "官営品川硝子製造所跡": (
        ("industry", "lost"),
        "政府の殖産興業政策による官営工場で、京浜工業地帯成立の第一歩の地。"
        "明治25年に解散し、建物は昭和43年に博物館明治村へ移築された",
    ),
    "東海道品川宿本陣跡": (
        ("road", "lost"),
        "東海道品川宿の本陣。明治5年の宿駅制度廃止後に役割を終え、"
        "昭和13年に公園となって建物は残っていない",
    ),
    "東海道品川宿石積護岸": (
        ("road", "water"),
        "東海道と品川宿の家並みを波から守るために築かれた護岸",
    ),
    "流民叢塚碑 附 南無阿彌陀佛碑萬霊納骨堂碑": (
        ("war",),
        "天保の大飢饉で亡くなった人たちを祀る供養塔",
    ),
    "海蔵寺無縁塔群": (
        ("war",),
        "天保の大飢饉の犠牲者215人を祀る塚や、津波溺死者供養塔を含む",
    ),
    "大井の井": (("water",), "横穴式の井戸で、いまも水が湧いている"),
    "大井の水神": (("water",), "湧水に感謝して祀られた水神。湧水は柳の清水と呼ばれた"),
    "大井・原の水神池": (("water",), "農家が野菜を洗った湧水池"),
    "天妙国寺五重塔礎石": (
        ("lost",),
        "五重塔は慶長19年に倒壊し、再建後も元禄15年に焼失した。残るのは礎石のみ",
    ),
    # 道標は街道の標識。どれも旧街道・古道をたどる手がかりになる。
    "享保二十一年銘道標": (("road",), "東海道から目黒に至る道が碑文谷道に分かれる地点に建っていた"),
    "文政十一年銘道標": (("road",), "街道の分かれ道に建てられた道標"),
    "文政十一年銘道標（2）": (("road",), "品川宿から居木橋村に入ってすぐの分かれ道に建っていたと推定される"),
    "大正六年銘道標": (("road",), "街道の分かれ道に建てられた道標"),
    "元禄八年銘道標": (("road",), "区内の道標のうち最古のもの"),
    "天保二年銘道標": (("road",), "街道の分かれ道に建てられた道標"),
    "天明三年銘石造道標": (("road",), "街道の分かれ道に建てられた道標"),
    "寛政元年銘石造道標": (("road",), "街道の分かれ道に建てられた道標"),
    "大原不動堂内石造供養塔群": (
        ("road",),
        "旧上蛇窪村から品川道・洗足道・池上道が分かれる地点にあり、"
        "六十六部廻国供養塔を兼ねた道標を含む",
    ),
}


# 種別の頭に付く指定の区分。種別そのものではないので落とす。
DESIGNATION_PREFIXES = re.compile(
    r"^(重要無形民俗文化財|無形民俗文化財|重要有形民俗文化財|重要文化財|有形文化財)\s*[（(]?\s*"
)

# 元号の始まりの西暦。指定年月日を西暦にするのに使う。
ERA_STARTS: list[tuple[str, int]] = [
    ("令和", 2019), ("平成", 1989), ("昭和", 1926), ("大正", 1912), ("明治", 1868),
]

GEOCODE_URL = "https://msearch.gsi.go.jp/address-search/AddressSearch"

# 住所の書き方が公式ページでそろっていないもの。建物名や「〜周辺」が
# 住所欄に入っていて、そのままでは住所検索にかけられない。
# 置き換え先は、同じ公式ページに書かれている住所だけを使う（推測しない）。
# 読み替えてよいのは、同じ公式ページの別の行に書かれている住所だけにする。
# 外から持ってきた住所を混ぜると、出典を確認できた情報だけを載せるという
# 決まりが崩れる。裏が取れないものは保留にして公開しない。
ADDRESS_HINTS: dict[str, str] = {
    # 「江戸の里神楽」の所在地が「品川3-7-15（品川神社）」となっている。
    # 品川区に「品川3丁目」という町名は無く、同じページの他の行はすべて
    # 品川神社を「北品川3-7-15」としているので、そちらにそろえる。
    "品川3-7-15": "北品川3-7-15",
    # 品川拍子・富士塚山開き行事は、住所欄に神社名が書かれている。
    # 品川神社の住所は同じページの他の行から分かる。
    "品川神社": "北品川3-7-15",
    "品川神社周辺": "北品川3-7-15",
    # 利田神社の住所は、同じ「品川地区の指定文化財」の鯨碑の行に
    # 「東品川1-7-17」と書かれている。同じページの別の行なので読み替えてよい。
    "利田神社": "東品川1-7-17",
    "利田神社周辺": "東品川1-7-17",
    # 荏原神社の住所は、この公式ページのどこにも書かれていない。
    # 推測で埋めずに保留へ回す（scripts/out/rekishi/pending.json）。
}


@dataclass
class Entry:
    """公式ページの表の1行。"""

    kind: str
    number: str
    designated: str
    name: str
    extra: str
    address: str
    owner: str
    visit: str
    url: str
    area: str
    designator: str
    source_label: str


@dataclass
class Place:
    """地図に載せる1地点。"""

    place_id: str
    name: str
    address: str
    area: str
    categories: list[str]
    entries: list[Entry] = field(default_factory=list)
    lat: float | None = None
    lng: float | None = None
    # 丁目までしか引けなかったか。True なら「おおよその位置」と明示する。
    approximate: bool = False
    # 地点名が「その場所の名前」から付いたのか、たまたま最初の所蔵品の名前を
    # 借りただけなのかを覚えておく。後から場所の名前が分かったら差し替える。
    name_from_holder: bool = False
    # 分類を足した根拠。画面で「なぜこの分類なのか」を示せるようにする。
    category_notes: list[str] = field(default_factory=list)


def clean(value: str) -> str:
    """HTMLから取り出した文字列を整える。"""
    value = html.unescape(value).replace("　", " ").replace("\xa0", " ")
    return re.sub(r"\s+", " ", value).strip()


def fetch(url: str, refresh: bool) -> str:
    """ページを取得する。取得済みならキャッシュを返す。"""
    CACHE.mkdir(parents=True, exist_ok=True)
    name = re.sub(r"[^0-9A-Za-z]+", "_", url.replace(BASE, "")) + ".html"
    path = CACHE / name
    if path.exists() and not refresh:
        return path.read_text(encoding="utf-8")

    request = urllib.request.Request(
        url, headers={"User-Agent": USER_AGENT, "Accept": "text/html"}
    )
    try:
        with urllib.request.urlopen(request, timeout=45) as response:
            raw = response.read()
            encoding = response.headers.get_content_charset() or "utf-8"
    except (urllib.error.URLError, TimeoutError) as error:
        raise SystemExit(f"取得に失敗しました: {url}: {error}") from error

    text = raw.decode(encoding, errors="replace")
    path.write_text(text, encoding="utf-8")
    # 公式サイトに続けて負荷をかけない。
    time.sleep(2)
    return text


def body_of(source: str) -> str:
    """本文だけを切り出す。ナビゲーションの表を拾わないため。"""
    match = re.search(r'id="HONBUN".*?(?=<footer|id="footer")', source, flags=re.S)
    return match.group(0) if match else source


def parse_rows(source: str) -> list[list[tuple[list[str], str | None]]]:
    """表の各行を、セルの配列として取り出す。

    セルの中は <p> で区切られていることが多いので、改行で分けた文字列の
    配列にする（「種別」と「指定番号」が別の <p> に入っているため）。
    """
    rows: list[list[tuple[list[str], str | None]]] = []
    for table in re.findall(r"<table.*?</table>", body_of(source), flags=re.S):
        for row in re.findall(r"<tr>(.*?)</tr>", table, flags=re.S):
            if "<th" in row:
                continue
            cells: list[tuple[list[str], str | None]] = []
            for cell in re.findall(r"<td[^>]*>(.*?)</td>", row, flags=re.S):
                link = re.search(r'href="([^"]+)"', cell)
                parts = [clean(x) for x in re.sub(r"<[^>]+>", "\n", cell).split("\n")]
                cells.append(([x for x in parts if x], link.group(1) if link else None))
            if cells:
                rows.append(cells)
    return rows


def split_kind(parts: list[str]) -> tuple[str, str]:
    """「建造物」「第1号」から種別と指定番号を取り出す。

    行によって書き方が3通りある。
      ["建造物", "第1号"]              … 種別と番号が別の段落
      ["天然記念物第2号"]              … ひと続き
      ["天然記念物", "第13号", "第14号"] … 1件に番号が2つ（2本の木など）
    番号をすべて拾い、残りを種別にする。
    """
    joined = " ".join(parts)
    numbers = re.findall(r"第[^\s第]*?号", joined)
    kind = clean(re.sub(r"第[^\s第]*?号", " ", joined))
    stripped = clean(DESIGNATION_PREFIXES.sub("", kind).rstrip("）)"))
    # 「重要無形民俗文化財」のように、指定の区分そのものが種別として
    # 書かれている行がある。落とすと空になるので、そのときは元のまま残す。
    return (stripped or kind), "・".join(numbers)


def classify(kind: str) -> list[str]:
    """種別から、地点そのものになるかどうかを判定する。

    戻り値が空なら動産（絵画・古文書など）で、置かれている場所にまとめる。
    """
    return [category for word, category in IMMOVABLE_CATEGORIES if word in kind]


def to_iso_date(value: str) -> str:
    """「昭和53年 11月22日」を 1978-11-22 にする。読めなければ空にする。"""
    text = unicodedata.normalize("NFKC", value).replace(" ", "")
    match = re.match(r"^(明治|大正|昭和|平成|令和)(\d+|元)年(?:(\d+)月)?(?:(\d+)日)?", text)
    if not match:
        return ""
    for name, start in ERA_STARTS:
        if match.group(1) == name:
            offset = 1 if match.group(2) == "元" else int(match.group(2))
            year = start + offset - 1
            month = int(match.group(3) or 1)
            day = int(match.group(4) or 1)
            return f"{year:04d}-{month:02d}-{day:02d}"
    return ""


# 所在地の後ろに付く施設名として認めるもの。「品川神社裏」のような
# 場所の説明を所有者と取り違えないよう、語尾で見分ける。
FACILITY_TAIL = re.compile(r"(寺|院|庵|神社|神宮|八幡|館|宮|墓地)$")


def split_address(value: str) -> tuple[str, str, str]:
    """所在地を、住所・施設名（丸括弧の中）・末尾の施設名に分ける。

    公式ページの所在地は3通りの書き方が混ざっている。
      「北品川 3-7-15」                 … 住所だけ
      「大井6-11-1 （品川歴史館）」     … 丸括弧で預け先を書いている
      「東五反田1-2-29 宝塔寺」         … 住所のあとに寺社名を書いている
    預け先と所有者は別なので（品川歴史館に預けられた天妙国寺の所蔵品など）、
    地点としてまとめるときは預け先を使う。
    """
    text = unicodedata.normalize("NFKC", clean(value))
    parenthetical = ""
    match = re.search(r"[（(]([^）)]*)[）)]", text)
    if match:
        parenthetical = clean(match.group(1))
    text = re.sub(r"[（(][^）)]*[）)]", " ", text)

    # 「北品川 3-7-15 品川神社裏」のように、住所のあとに説明が続くことがある。
    found = re.search(r"([^\s]*?[一-龥ぁ-んァ-ヶ]+\s*\d+(?:-\d+)*)", text)
    if not found:
        address = text.replace(" ", "")
        return ADDRESS_HINTS.get(address, address), parenthetical, ""

    address = found.group(1).replace(" ", "")
    address = ADDRESS_HINTS.get(address, address)
    tail = clean(text[found.end():])
    return address, parenthetical, tail if FACILITY_TAIL.search(tail) else ""


def town_of(address: str) -> str:
    """住所の先頭から町名を取り出す。"""
    match = re.match(r"^([一-龥ぁ-んァ-ヶの]+?)(?=\d|丁目)", address)
    return match.group(1) if match else ""


def area_of(address: str, fallback: str) -> str:
    """住所から地区を決める。

    公式ページの地区別の区分は、持ち主や由来のある地区で分けられていることがある
    （品川歴史館に預けられている所蔵品は、品川地区のページにも載る）。
    地点は場所なので、住所から決めるほうを優先する。町名が表に無いときだけ、
    ページ側の地区に頼る。
    """
    area = TOWN_AREAS.get(town_of(address), "")
    return area or fallback or "unknown"


def collect_entries(refresh: bool) -> list[Entry]:
    """6ページ分の指定文化財を読み取る。"""
    entries: list[Entry] = []
    for relative, area, label in PAGES:
        url = urllib.parse.urljoin(BASE, relative)
        source = fetch(url, refresh)
        designator = "国・都" if "1003893" in relative else "区"
        rows = parse_rows(source)
        for cells in rows:
            entry = build_entry(cells, area, label, designator, url)
            if entry:
                entries.append(entry)
        if not rows:
            # 表を持たないページ（その他の地区）は、本文のリンクから拾う。
            entries.extend(collect_from_links(source, url, area, label, refresh))
    return entries


def build_entry(
    cells: list[tuple[list[str], str | None]],
    area: str,
    label: str,
    designator: str,
    page_url: str,
) -> Entry | None:
    """表の1行を Entry にする。列の数で区指定と都国指定を見分ける。"""
    if len(cells) == 7:
        kind, number = split_kind(cells[0][0])
        name_parts = cells[2][0]
        detail = cells[2][1]
        return Entry(
            kind=kind,
            number=number,
            designated=to_iso_date(" ".join(cells[1][0])),
            name=name_parts[0] if name_parts else "",
            extra=" ".join(name_parts[1:]),
            address=" ".join(cells[3][0]),
            owner=" ".join(cells[4][0]),
            visit=" ".join(cells[6][0]),
            url=urllib.parse.urljoin(page_url, detail) if detail else page_url,
            area=area,
            designator=designator,
            source_label=label,
        )
    if len(cells) == 4:
        kind, _ = split_kind(cells[0][0])
        name_parts = cells[1][0]
        return Entry(
            kind=kind,
            number="",
            designated="",
            name=name_parts[0] if name_parts else "",
            extra=" ".join(name_parts[1:]),
            address=" ".join(cells[2][0]),
            owner=" ".join(cells[3][0]),
            visit="",
            url=page_url,
            area=area,
            designator=designator,
            source_label=label,
        )
    return None


def collect_from_links(
    source: str, page_url: str, area: str, label: str, refresh: bool
) -> list[Entry]:
    """表を持たないページから、詳細ページをたどって読み取る。"""
    entries: list[Entry] = []
    for href, text in re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', body_of(source), flags=re.S):
        title = clean(re.sub(r"<[^>]+>", "", text))
        if not title or "戻る" in title or href.startswith(("javascript:", "#")):
            continue
        detail_url = urllib.parse.urljoin(page_url, href)
        entry = parse_detail(fetch(detail_url, refresh), detail_url, area, label)
        if entry:
            entries.append(entry)
    return entries


def parse_detail(source: str, url: str, area: str, label: str) -> Entry | None:
    """詳細ページから、項目名と値の組を読み取る。"""
    text = re.sub(r"<[^>]+>", "\n", body_of(source))
    lines = [clean(x) for x in text.split("\n")]
    lines = [x for x in lines if x and x not in {"印刷", "前のページへ戻る", "トップページへ戻る"}]
    if not lines:
        return None

    fields: dict[str, str] = {}
    keys = {"種別", "指定番号", "所在地", "指定年月日", "見学", "所有者"}
    index = 0
    while index < len(lines) - 1:
        if lines[index] in keys:
            fields[lines[index]] = lines[index + 1]
            index += 2
            continue
        index += 1

    name = lines[0].replace('id="HONBUN">ここから本文です。', "").strip() or lines[1]
    if not fields.get("種別"):
        return None
    # 詳細ページの種別も、表の行と同じ書き方にそろえる
    # （「有形文化財（彫刻）」→「彫刻」）。
    kind, _ = split_kind([fields.get("種別", "")])
    return Entry(
        kind=kind,
        number=fields.get("指定番号", ""),
        designated=to_iso_date(fields.get("指定年月日", "")),
        name=name,
        extra="",
        address=fields.get("所在地", ""),
        owner=fields.get("所有者", ""),
        visit=fields.get("見学", ""),
        url=url,
        area=area,
        designator="区",
        source_label=label,
    )


def place_id_for(seed: str, used: set[str]) -> str:
    """地点IDを作る。

    通し番号にはしない。公式ページに1行足されただけで、それより後ろの
    IDがすべてずれてしまい、人物や年表から張ったリンクが黙って別の地点を
    指すようになるため。住所と名前から決めれば、並び順が変わっても動かない。
    日本語はIDに使えないので短いハッシュにする。
    """
    digest = hashlib.sha1(seed.encode("utf-8")).hexdigest()[:10]
    candidate = f"pl-{digest}"
    suffix = 2
    while candidate in used:
        candidate = f"pl-{digest}-{suffix}"
        suffix += 1
    used.add(candidate)
    return candidate


# 所有者の欄に入るが、場所の名前にはならないもの。
GOVERNMENT = re.compile(r"^(品川区|東京都|国|文化庁)$")

# 所有者が決まっていない行は「－」などが入る。これを地点名にすると、
# 地図に「－」という名前のピンが立つ（文政十一年銘道標（2）で実際に起きた）。
PLACEHOLDER = re.compile(r"^[－\-—ー‐–~〜\s]*$|^(なし|不明|未定)$")


def category_for_holder(holder: str) -> str:
    """地点の名前から、カテゴリーを決める。

    文化財の名称は見ない。「紙本着色妙国寺絵図」のような所蔵品の名前に
    寺の字が入っていると、預け先の博物館まで寺に見えてしまうため。
    """
    if re.search(r"神社|神宮|八幡|稲荷|天祖|天満", holder):
        return "temple"
    if re.search(r"寺|院|庵|坊", holder):
        return "temple"
    if re.search(r"館|museum", holder, flags=re.I):
        return "building"
    return "site"


def pick_holder(facility: str, tail: str, owner: str) -> str:
    """その場所を指す名前を選ぶ。

    預け先（丸括弧の中）がいちばん強い。所有者は、預けられている所蔵品では
    別の場所にある寺社を指してしまうため最後にする。「品川区」のような
    自治体名は場所の名前にならないので使わない。
    """
    for candidate in (facility, tail, owner):
        if not candidate or PLACEHOLDER.match(candidate):
            continue
        if GOVERNMENT.match(candidate):
            continue
        return candidate
    return ""


def apply_hints(place: Place, entry: Entry) -> None:
    """公式解説を根拠に、種別だけでは拾えない分類を足す。"""
    extra, reason = CATEGORY_HINTS.get(entry.name, ((), ""))
    for category in extra:
        if category not in place.categories:
            place.categories.append(category)
    if reason and reason not in place.category_notes:
        place.category_notes.append(reason)


# 区の「指定文化財」ページに載らない、区内の国の文化財。
#
# 登録有形文化財と、区のページが個別に用意されていない重要文化財。
# 区の一覧から機械的に集められないので、文化遺産オンラインの個別ページを
# 1件ずつ読んで手で書いた。
#
# 緯度経度は文化遺産オンラインのページに埋まっている値をそのまま使う。
# ここの住所は住居表示ではなく地番（「平塚一丁目584」など）で、
# 国土地理院の住所検索にかけると丁目の代表点しか返らない。
# このプロジェクトは代表点を使わない方針なので、出典側の座標を使う。
EXTRA_PLACES: list[dict[str, Any]] = [
    {"name": "十四世喜多六平太記念能楽堂", "kind": "建造物", "address": "上大崎4-245-1",
     "lat": 35.633629, "lng": 139.714778, "area": "osaki",
     "categories": ["building", "culture"], "registeredOn": "2026-02-10",
     "url": "https://online.bunka.go.jp/heritages/detail/664869",
     "note": "昭和48年の建築。鉄骨鉄筋コンクリート造地上2階地下2階建、舞台及び橋掛付。"},
    {"name": "旧三井文庫第二書庫", "kind": "建造物", "address": "豊町1-1131-1",
     "lat": 35.612283, "lng": 139.720536, "area": "ebara",
     "categories": ["building", "culture"], "registeredOn": "2020-04-03",
     "url": "https://online.bunka.go.jp/heritages/detail/445143",
     "note": "大正11年の建築。鉄筋コンクリート造3階建、金属板葺。現在の所有は品川区。"},
    {"name": "長濱家住宅主屋", "kind": "建造物", "address": "平塚1-584",
     "lat": 35.616225, "lng": 139.716044, "area": "ebara",
     "categories": ["building", "life"], "registeredOn": "2020-04-03",
     "url": "https://online.bunka.go.jp/heritages/detail/402501",
     "note": "大正10年の建築。木造2階建、瓦葺、床下倉庫付。"},
    {"name": "長濱家住宅門", "kind": "建造物", "address": "平塚1-584",
     "lat": 35.616225, "lng": 139.716044, "area": "ebara",
     "categories": ["building", "life"], "registeredOn": "2020-04-03",
     "url": "https://online.bunka.go.jp/heritages/detail/430542",
     "note": "大正10年の建築。主屋と同じ敷地にある。"},
    {"name": "小池家住宅主屋", "kind": "建造物", "address": "北品川5-740-10",
     "lat": 35.620742, "lng": 139.734910, "area": "shinagawa",
     "categories": ["building", "life"], "registeredOn": "2011-01-26",
     "url": "https://online.bunka.go.jp/heritages/detail/146704",
     "note": "昭和13年の建築。木造2階建、瓦葺。"},
    {"name": "旧品川警察署品川橋交通待機所", "kind": "建造物", "address": "南品川1-223-5",
     "lat": 35.616597, "lng": 139.744361, "area": "shinagawa",
     "categories": ["building", "transport"], "registeredOn": "2023-08-07",
     "url": "https://online.bunka.go.jp/heritages/detail/560735",
     "note": "昭和4年の建築。木造平屋建、建築面積13平方メートル。"},
    {"name": "旗岡八幡神社絵馬殿", "kind": "建造物", "address": "旗の台3-852-1",
     "lat": 35.604522, "lng": 139.708343, "area": "ebara",
     "categories": ["building", "temple"], "registeredOn": "2013-06-21",
     "url": "https://online.bunka.go.jp/heritages/detail/229368",
     "note": "昭和3年ごろの建築。木造平屋建、銅板葺。のちに2度移築されている。"},
    {"name": "宝篋印塔（１）", "kind": "建造物", "address": "西五反田4-12-1",
     "lat": 35.626408, "lng": 139.710022, "area": "osaki",
     "categories": ["temple", "site"], "designatedOn": "1953-08-29",
     "url": "https://online.bunka.go.jp/heritages/detail/199549",
     "note": "鎌倉時代後期・1317年の石造宝篋印塔。安養院に伝わる。重要文化財。"},
    {"name": "宝篋印塔（２）", "kind": "建造物", "address": "西五反田4-12-1",
     "lat": 35.626408, "lng": 139.710022, "area": "osaki",
     "categories": ["temple", "site"], "designatedOn": "1953-08-29",
     "url": "https://online.bunka.go.jp/heritages/detail/193280",
     "note": "鎌倉時代後期・1317年の石造宝篋印塔。安養院に伝わる。重要文化財。"},
]


def build_places(entries: list[Entry]) -> list[Place]:
    """指定文化財を地点にまとめる。

    不動産（史跡・旧跡・建造物・天然記念物）は1件で1地点。
    動産は、置かれている場所（住所）ごとにまとめて1地点にする。
    """
    places: list[Place] = []
    used_ids: set[str] = set()
    movable: dict[str, Place] = {}

    for entry in entries:
        address, facility, tail = split_address(entry.address)
        area = area_of(address, entry.area)
        categories = classify(entry.kind)

        if categories:
            place = Place(
                place_id=place_id_for(f"{address}|{entry.name}", used_ids),
                name=entry.name,
                address=address,
                area=area,
                categories=categories,
            )
            apply_hints(place, entry)
            place.entries.append(entry)
            places.append(place)
            continue

        # 動産は、置かれている住所でひとまとめにする。地図のピンは場所に立つので、
        # 同じ住所に所有者ごとのピンを並べても意味がない（品川歴史館には
        # 複数の寺の所蔵品が預けられている）。
        holder = pick_holder(facility, tail, entry.owner)
        place = movable.get(address)
        if place is None:
            place = Place(
                place_id=place_id_for(address, used_ids),
                name=holder or entry.name,
                address=address,
                area=area,
                categories=[category_for_holder(holder)],
                name_from_holder=bool(holder),
            )
            movable[address] = place
            places.append(place)
        elif not place.name_from_holder and holder:
            # 先にできた地点の名前が所蔵品の名前だったときは、場所の名前に差し替える。
            place.name = holder
            place.categories = [category_for_holder(holder)]
            place.name_from_holder = True
        apply_hints(place, entry)
        place.entries.append(entry)

    return places


def load_geocode_cache() -> dict[str, Any]:
    path = CACHE / "geocode.json"
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}


def save_geocode_cache(cache: dict[str, Any]) -> None:
    CACHE.mkdir(parents=True, exist_ok=True)
    (CACHE / "geocode.json").write_text(
        json.dumps(cache, ensure_ascii=False, indent=2, sort_keys=True), encoding="utf-8"
    )


def accept_geocode(address: str, title: str) -> bool:
    """住所検索の答えが、聞いた住所に本当に対応しているかを確かめる。

    国土地理院のAPIは、番地まで見つからなくても近い単位の代表点を返す。
    「利田神社周辺」と聞くと区全体の代表点「東京都品川区」が返り、
    「荏原神社周辺」と聞くと町の代表点「東京都品川区荏原」が返る。
    荏原神社は北品川にあるので、これをそのまま使うと地図に嘘を置くことになる。

    丁目の代表点も同じように返る。「平塚一丁目584」のような地番の住所を聞くと
    「東京都品川区平塚一丁目」が返り、丁目の中心に黙ってピンが立つ。
    数字が含まれるかだけを見ると、漢数字の「一」を数字と数えて通ってしまう。

    そこで3つ確かめる。
      1. 聞いた住所に番地の数字があること（数字が無ければ代表点しか返らない）
      2. 返ってきた住所が「…丁目」で終わっていないこと（終わっていれば丁目の代表点）
      3. 返ってきた住所に番・号の数字があり、町名が一致すること
    どれかを満たさないものは保留に回す。
    """
    if not re.search(r"\d", address):
        return False
    normalized = unicodedata.normalize("NFKC", title)
    # 「東京都品川区上大崎四丁目」のように丁目で終わるのは、丁目の代表点。
    if re.search(r"丁目$", normalized):
        return False
    rest = normalized.replace("東京都品川区", "")
    # 丁目より細かい単位（番・号）まで引けていること。
    if not re.search(r"[0-9０-９]+\s*(番|号|-)", rest):
        return False
    town = town_of(address)
    return bool(town) and town in normalized


def is_chome_centroid(address: str, title: str) -> bool:
    """丁目の代表点かどうか。

    番地まで引けていれば accept_geocode が True を返す。そうでなくても、
    丁目までは合っているなら、地図から消すより「おおよその位置」として
    出したほうが親切。町や区の代表点（荏原神社の事故）はここでも落とす。
    """
    if not re.search(r"\d", address):
        return False
    normalized = unicodedata.normalize("NFKC", title)
    if not re.search(r"丁目$", normalized):
        return False
    town = town_of(address)
    return bool(town) and town in normalized


def geocode(address: str, cache: dict[str, Any]) -> tuple[float, float, bool] | None:
    """国土地理院の住所検索APIで緯度経度を引く。結果はキャッシュする。

    返すのは (緯度, 経度, おおよその位置か)。丁目までしか引けなかったものは
    第3要素を True にして、呼び出し側で「おおよその位置」と明示させる。
    """
    def judge(hit: dict[str, Any]) -> tuple[float, float, bool] | None:
        title = hit.get("title", "")
        if accept_geocode(address, title):
            return hit["lat"], hit["lng"], False
        if is_chome_centroid(address, title):
            return hit["lat"], hit["lng"], True
        return None

    if address in cache:
        hit = cache[address]
        return judge(hit) if hit else None

    query = urllib.parse.quote(f"東京都品川区{address}")
    request = urllib.request.Request(
        f"{GEOCODE_URL}?q={query}", headers={"User-Agent": USER_AGENT}
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        print(f"  住所検索に失敗しました（{address}）: {error}", file=sys.stderr)
        return None
    time.sleep(1)

    if not payload:
        cache[address] = None
        return None
    coordinates = payload[0].get("geometry", {}).get("coordinates") or []
    if len(coordinates) != 2:
        cache[address] = None
        return None
    lng, lat = float(coordinates[0]), float(coordinates[1])
    title = payload[0].get("properties", {}).get("title", "")
    cache[address] = {"lat": lat, "lng": lng, "title": title}
    return judge(cache[address])


# 国指定分の指定年月日を手で補う表。
#
# 区公式の「区内にある都および国の指定文化財」のページには指定年月日の欄が無く、
# 30件すべて空のままだった。国指定文化財等データベース
# （https://kunishitei.bunka.go.jp/bsys/maindetails/<種別>/<id>）には載っているが、
# 載るのは国指定だけで、都指定（妙国寺文書・岩倉具視墓・鈴ヶ森遺跡など）は出てこない。
#
# 鍵を名称だけにしない。同名の別物があり、静かに他所の文化財の日付が入る。
# 実際に「銅造地蔵菩薩坐像」で検索すると観福寺のもの（鎌倉・延慶2年＝1309年）が出る。
# 品川寺のものは江戸六地蔵の一で別物なので、この表には入れていない。
# 熊本藩主細川家墓所も、DB側の所在地が熊本県で品川区分を確認できないため入れていない。
#
# 値の source は、品川区のものだと判断した根拠。1件ずつページを開いて確かめた。
KUNI_DESIGNATED: dict[tuple[str, str | None], dict[str, str]] = {
    ("沢庵墓", "東海寺大山墓地"): {
        "designatedOn": "1926-10-20",
        "source": "国指定文化財等データベース 401/689。所在地「品川区北品川三丁目」",
    },
    ("賀茂真淵墓", "東海寺大山墓地"): {
        "designatedOn": "1926-10-20",
        "source": "国指定文化財等データベース 401/690「加茂真淵墓」。所在地「品川区北品川三丁目」",
    },
    # 所有者を None にしてあるのは、国の史跡として名称が全国で一意で、
    # 取り違えようが無いもの。区側の所有者欄は「（空欄）」という文字列で、
    # あとで記入されると鍵が一致しなくなるため、所有者を見ない。
    ("旧白金御料地", None): {
        "designatedOn": "1949-04-12",
        "source": "国指定文化財等データベース 401/713。所在地「品川区上大崎二丁目」",
    },
    ("大森貝塚", None): {
        "designatedOn": "1955-03-24",
        "source": "国指定文化財等データベース 401/721。所在地「大田区山王一丁目、品川区大井六丁目」",
    },
    ("金小札色々威胴丸", "西光寺"): {
        "designatedOn": "1976-06-05",
        "source": "国指定文化財等データベース 201/7142。所有者「西光寺」",
    },
    ("江戸の里神楽（品川神社）", "間宮社中"): {
        "designatedOn": "1994-12-13",
        "source": "国指定文化財等データベース 302/44（重要無形民俗文化財）。保持者に間宮社中（品川区東大井）を含む",
    },
    ("旧島津家本邸", "清泉女子大学"): {
        "designatedOn": "2019-12-27",
        "source": "文化遺産オンライン 411775・441386。所在地「東京都品川区東五反田三丁目191番地39」",
    },
}


def kuni_designated_on(name: str, owner: str | None) -> str | None:
    """手で確かめた指定年月日を返す。見つからなければ None。

    鍵は（名称, 所有者）。名称だけで引くと同名の別物を拾うため、原則として
    所有者まで一致を見る。所有者を None にした項目だけは名称だけで引く。
    これは国の史跡として名称が全国で一意なものに限っており、表の側に理由を書いてある。
    """
    key = name.strip()
    found = KUNI_DESIGNATED.get((key, (owner or "").strip()))
    if found is None:
        found = KUNI_DESIGNATED.get((key, None))
    return found["designatedOn"] if found else None


def heritage_of(place: Place) -> list[dict[str, Any]]:
    """地点が持つ指定文化財を、事実だけの形にする。"""
    items: list[dict[str, Any]] = []
    for entry in place.entries:
        item: dict[str, Any] = {
            "name": entry.name,
            "kind": entry.kind,
            "designator": entry.designator,
            "url": entry.url,
        }
        if entry.extra:
            item["extra"] = entry.extra
        if entry.number:
            item["number"] = entry.number
        if entry.designated:
            item["designatedOn"] = entry.designated
        else:
            # 区公式に欄が無い国指定分だけ、手で確かめた日付で補う。
            supplied = kuni_designated_on(entry.name, entry.owner)
            if supplied:
                item["designatedOn"] = supplied
        if entry.owner:
            item["owner"] = entry.owner
        if entry.visit:
            item["visit"] = entry.visit
        items.append(item)
    return items


def extra_records(verified_at: str, used: set[str]) -> list[dict[str, Any]]:
    """EXTRA_PLACES を公開データの形にする。

    区の一覧から来ないので、出典は文化遺産オンライン。緯度経度も出典側の値。
    IDの作り方は区の地点と同じ（住所と名前のハッシュ）なので、
    並び順が変わってもリンクは動かない。
    """
    records: list[dict[str, Any]] = []
    for item in EXTRA_PLACES:
        place_id = place_id_for(f"{item['address']}|{item['name']}", used)
        records.append({
            "id": place_id,
            "name": item["name"],
            "summary": f"{item['address']}にある{item['kind']}です。{item['note']}",
            "address": item["address"],
            "areas": [item["area"]],
            "categories": item["categories"],
            "lat": item["lat"],
            "lng": item["lng"],
            "locationKind": "current",
            "certainty": "fact",
            "heritage": [dict({
                "name": item["name"],
                "kind": item["kind"],
                "designator": "国",
                "url": item["url"],
            }, **({"registeredOn": item["registeredOn"]} if "registeredOn" in item
                  else {"designatedOn": item["designatedOn"]}))],
            "sources": [{"ref": "bunka-online", "locator": f"文化遺産オンライン「{item['name']}」"}],
            "verifiedAt": verified_at,
            "designatedFrom": item.get("designatedOn") or item["registeredOn"],
        })
    return records


def to_record(place: Place, verified_at: str) -> dict[str, Any]:
    """公開するデータの1件を組み立てる。"""
    heritage = heritage_of(place)
    designated = [x["designatedOn"] for x in heritage if x.get("designatedOn")]
    kinds = sorted({x["kind"] for x in heritage})
    count = len(heritage)
    summary = (
        f"{place.address}にある{'・'.join(kinds)}です。"
        if count == 1
        else f"{place.address}。指定文化財{count}件（{'・'.join(kinds)}）があります。"
    )

    record: dict[str, Any] = {
        "id": place.place_id,
        "name": place.name,
        "summary": summary,
        "address": place.address,
        "areas": [place.area],
        "categories": place.categories,
        "lat": place.lat,
        "lng": place.lng,
        "locationKind": "approximate" if place.approximate else "current",
        "certainty": "fact",
        "heritage": heritage,
        "sources": [
            {"ref": "sgw-bunkazai", "locator": f"{place.entries[0].source_label} {place.entries[0].name}"}
        ],
        "verifiedAt": verified_at,
    }
    if place.approximate:
        # 公式の住所が丁目までしか無いもの。丁目の中心を指している。
        record["locationNote"] = "出典の住所が丁目までのため、丁目のおおよその位置を指しています。"
    if place.category_notes:
        record["categoryNote"] = "／".join(place.category_notes)

    # 指定年月日が分かるものは、いちばん古い指定の年を時代の目安にする。
    # 指定された年は文化財そのものの年代ではないので、era には使わない。
    if designated:
        record["designatedFrom"] = min(designated)
    return record


def render(records: list[dict[str, Any]], verified_at: str) -> str:
    """ブラウザが <script> で読める形に書き出す。"""
    payload = {
        "schemaVersion": 1,
        "updatedAt": verified_at,
        "note": (
            "品川区公式「指定文化財」から、史跡・旧跡・建造物・天然記念物は1件を1地点とし、"
            "絵画・古文書などの動産は置かれている場所ごとにまとめています。"
            "解説は転載せず、公式の詳細ページへ案内しています。"
            "緯度経度は国土地理院の住所検索APIによるもので、建物の正確な位置ではなく住所の代表点です。"
        ),
        "items": records,
    }
    return (
        "// 品川区議会DB データファイル（「品川の歴史」の地点）\n"
        "// このファイルは scripts/prepare_rekishi_places.py で自動生成されます。\n"
        "// 手で直さないこと。直すときはスクリプトか、その中の住所の読み替え表を直す。\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };\n"
        "window.SHINAGAWA_DB.rekishiPlaces = "
        + json.dumps(payload, ensure_ascii=False, indent=2)
        + ";\n"
    )


def existing_count() -> int | None:
    """いま公開しているデータの件数を読む。初回は None。"""
    if not OUTPUT.exists():
        return None
    match = re.findall(r'"id":\s*"pl-', OUTPUT.read_text(encoding="utf-8"))
    return len(match) or None


# 公式ページの作りが変わると、解析が半分だけ失敗して件数が静かに減ることがある。
# 全滅なら気づけるが、「174件のうち20件しか取れない」は気づきにくい。
# 前回より大きく減ったら書き出さずに止める。
SHRINK_LIMIT = 0.9


def shrank_too_much(previous: int | None, current: int) -> bool:
    """前回より大きく減っていないかを判定する。初回（previous が None）は通す。"""
    if not previous:
        return False
    return current < previous * SHRINK_LIMIT


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="キャッシュを無視して取得し直す")
    parser.add_argument("--dry-run", action="store_true", help="書き出さずに内訳だけ表示する")
    parser.add_argument("--verified-at", default=time.strftime("%Y-%m-%d"), help="確認日")
    parser.add_argument(
        "--allow-shrink",
        action="store_true",
        help="件数が前回より大きく減っても書き出す（区が指定を取り消した場合など）",
    )
    args = parser.parse_args()

    entries = collect_entries(args.refresh)
    print(f"指定文化財を{len(entries)}件読み取りました。")
    if not entries:
        print("1件も読み取れませんでした。ページの作りが変わった可能性があります。", file=sys.stderr)
        return 1

    places = build_places(entries)
    print(f"地点に{len(places)}件まとめました。")
    print(f"区の一覧に載らない国の文化財を{len(EXTRA_PLACES)}件足します。")

    cache = load_geocode_cache()
    pending: list[dict[str, Any]] = []
    records: list[dict[str, Any]] = []
    try:
        for place in places:
            found = geocode(place.address, cache)
            if found is None:
                pending.append({
                    "id": place.place_id,
                    "name": place.name,
                    "address": place.address,
                    "reason": "住所から番地までの緯度経度を引けませんでした（代表点は使わない）",
                    "entries": [x.name for x in place.entries],
                })
                continue
            place.lat, place.lng, place.approximate = found
            if place.area == "unknown":
                pending.append({
                    "id": place.place_id,
                    "name": place.name,
                    "address": place.address,
                    "reason": "地区を決められませんでした",
                    "entries": [x.name for x in place.entries],
                })
                continue
            records.append(to_record(place, args.verified_at))
    finally:
        save_geocode_cache(cache)

    # 区の一覧に載らない国の文化財を足す。IDの衝突を避けるため既存のIDを渡す。
    used_ids = {x["id"] for x in records}
    records.extend(extra_records(args.verified_at, used_ids))

    print(f"公開できるのは{len(records)}件、保留は{len(pending)}件です。")
    for item in pending:
        print(f"  保留: {item['name']}（{item['address']}）— {item['reason']}")

    previous = existing_count()
    if shrank_too_much(previous, len(records)) and not args.allow_shrink:
        print(
            f"\n件数が前回より大きく減りました（{previous}件 → {len(records)}件）。"
            "\n公式ページの作りが変わって、解析が途中までしかできていない可能性があります。"
            "\n中身を確かめてから、意図した減少であれば --allow-shrink を付けて実行してください。"
            f"\n書き出しは行いませんでした: {OUTPUT}",
            file=sys.stderr,
        )
        return 1

    if args.dry_run:
        return 0

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "pending.json").write_text(
        json.dumps(pending, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    OUTPUT.write_text(render(records, args.verified_at), encoding="utf-8")
    print(f"書き出しました: {OUTPUT}")
    print(f"保留データ（非公開）: {OUT / 'pending.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
