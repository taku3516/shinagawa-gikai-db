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
    # 荏原神社・利田神社の住所は、この公式ページのどこにも書かれていない。
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
    # 地点名が「その場所の名前」から付いたのか、たまたま最初の所蔵品の名前を
    # 借りただけなのかを覚えておく。後から場所の名前が分かったら差し替える。
    name_from_holder: bool = False


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
        if candidate and not GOVERNMENT.match(candidate):
            return candidate
    return ""


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

    そこで2つ確かめる。
      1. 聞いた住所に番地の数字があること（数字が無ければ代表点しか返らない）
      2. 返ってきた住所にも数字が含まれ、町名が一致すること
    どちらかを満たさないものは保留に回す。
    """
    if not re.search(r"\d", address):
        return False
    normalized = unicodedata.normalize("NFKC", title)
    if not re.search(r"[0-9０-９一二三四五六七八九十]", normalized.replace("東京都品川区", "")):
        return False
    town = town_of(address)
    return bool(town) and town in normalized


def geocode(address: str, cache: dict[str, Any]) -> tuple[float, float] | None:
    """国土地理院の住所検索APIで緯度経度を引く。結果はキャッシュする。"""
    if address in cache:
        hit = cache[address]
        if not hit:
            return None
        if not accept_geocode(address, hit.get("title", "")):
            return None
        return hit["lat"], hit["lng"]

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
    if not accept_geocode(address, title):
        return None
    return lat, lng


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
        if entry.owner:
            item["owner"] = entry.owner
        if entry.visit:
            item["visit"] = entry.visit
        items.append(item)
    return items


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
        "locationKind": "current",
        "certainty": "fact",
        "heritage": heritage,
        "sources": [
            {"ref": "sgw-bunkazai", "locator": f"{place.entries[0].source_label} {place.entries[0].name}"}
        ],
        "verifiedAt": verified_at,
    }
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


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--refresh", action="store_true", help="キャッシュを無視して取得し直す")
    parser.add_argument("--dry-run", action="store_true", help="書き出さずに内訳だけ表示する")
    parser.add_argument("--verified-at", default=time.strftime("%Y-%m-%d"), help="確認日")
    args = parser.parse_args()

    entries = collect_entries(args.refresh)
    print(f"指定文化財を{len(entries)}件読み取りました。")
    if not entries:
        print("1件も読み取れませんでした。ページの作りが変わった可能性があります。", file=sys.stderr)
        return 1

    places = build_places(entries)
    print(f"地点に{len(places)}件まとめました。")

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
            place.lat, place.lng = found
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

    print(f"公開できるのは{len(records)}件、保留は{len(pending)}件です。")
    for item in pending:
        print(f"  保留: {item['name']}（{item['address']}）— {item['reason']}")

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
