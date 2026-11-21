#!/usr/bin/env python3
"""「品川の歴史」データの整合を検査する。

data/rekishi.js の語彙（時代区分・地区・カテゴリー・確実性・出典台帳）を正とし、
data/rekishi-*.js の各レコードがその語彙だけを使っているか、相互リンクの行き先が
実在するか、出典が付いているかを確かめる。

実行例:
  python3 scripts/check_rekishi_data.py
  python3 scripts/check_rekishi_data.py --quiet

検査に失敗すると終了コード1を返す。GitHub Actions から呼ぶことを想定している。
外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import datetime
import json
import re
import sys
from pathlib import Path
from typing import Any, Iterable


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"

# 品川区とその周辺を含む範囲。区外にある墓所なども扱うため少し広めに取る。
# この範囲を外れるものは、座標の取り違え（緯度と経度の入れ替えなど）を疑う。
LAT_RANGE = (35.54, 35.68)
LNG_RANGE = (139.66, 139.82)

# 日付は YYYY-MM-DD 形式でそろえる。
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")

# 文化財の出典は官公庁のページに限る。別のサイトが紛れ込むと、
# 「公式で確認した」という前提が静かに崩れる。
#
# もともと品川区公式だけだった。区の「指定文化財」ページだけを出典にしていたため。
# 登録有形文化財など区のページに載らないものを足すときに文化庁のページが要るので、
# 文化庁の2つを足した。足すのは官公庁だけ。似せたドメインを通さないよう、
# 前方一致ではなくホスト名そのものを見る。
OFFICIAL_HOSTS = (
    "www.city.shinagawa.tokyo.jp",   # 品川区「指定文化財」
    "online.bunka.go.jp",            # 文化庁「文化遺産オンライン」
    "kunishitei.bunka.go.jp",        # 文化庁「国指定文化財等データベース」
)


def is_official_url(url: str) -> bool:
    """官公庁のページかどうか。ホスト名が一致するものだけを通す。"""
    from urllib.parse import urlparse

    parsed = urlparse(url)
    return parsed.scheme == "https" and parsed.hostname in OFFICIAL_HOSTS

# ID は種別の接頭辞＋英数字。種別が分かると、相互リンクの誤りに気づきやすい。
ID_PREFIXES = {
    "events": "ev-",
    "places": "pl-",
    "people": "pe-",
    "names": "nm-",
    "areas": "ar-",
}

# 画面が読まない側に書いてはいけない関係。
# rekishi-jinbutsu.html は event.relatedPeople だけから人物→出来事の索引を
# 組み立て、年表も同じ event.relatedPeople を読む。人物側の relatedEvents は
# どのページも読まないので、そこに書くと検査は通るのに画面に出ない。
# 同じ関係を2か所に持たせない方針（rekishi-jinbutsu.html のコメント）でもある。
FORBIDDEN_RELATION_SIDES = {
    ("people", "relatedEvents"): "出来事の側の relatedPeople に書いてください",
}

# 相互リンクの項目名と、その行き先のコレクション。
RELATION_TARGETS = {
    "relatedEvents": "events",
    "relatedPlaces": "places",
    "relatedPeople": "people",
    "relatedNames": "names",
}


class DataError(Exception):
    """データファイルを読めなかったときに投げる。"""


def extract_object(source: str, assignment: str) -> dict[str, Any]:
    """`window.… = { … };` の形から中身の JSON を取り出す。

    データファイルはブラウザが <script> で読む形式なので、そのままでは
    json.loads に渡せない。代入の右辺だけを切り出し、行コメントを落としてから
    JSON として読む。末尾カンマは使わない約束にしている。
    """
    start = source.find(assignment)
    if start < 0:
        raise DataError(f"{assignment} が見つかりません")
    brace = source.find("{", start)
    if brace < 0:
        raise DataError(f"{assignment} の右辺が見つかりません")

    body = source[brace:].rstrip()
    if body.endswith(";"):
        body = body[:-1].rstrip()

    # 行頭のコメントだけを落とす。文字列の中の // を消さないよう、
    # 行全体がコメントの場合に限る。
    cleaned = "\n".join(
        "" if line.lstrip().startswith("//") else line for line in body.splitlines()
    )
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as error:
        raise DataError(f"{assignment} をJSONとして読めません: {error}") from error


def load_js(path: Path, assignment: str) -> dict[str, Any]:
    """データファイルを読んで辞書にする。"""
    if not path.exists():
        raise DataError(f"ファイルがありません: {path}")
    try:
        source = path.read_text(encoding="utf-8")
    except OSError as error:
        raise DataError(f"ファイルを読めません: {path}: {error}") from error
    return extract_object(source, assignment)


def ids_of(entries: Iterable[dict[str, Any]]) -> set[str]:
    """語彙リストからIDの集合を作る。"""
    return {str(entry.get("id", "")) for entry in entries if entry.get("id")}


class Checker:
    """1回の検査をまとめて行い、見つかった問題を集める。

    root を差し替えられるようにしてあるのは、検査そのものを
    仮のデータで試せるようにするため（scripts/test_rekishi_data.py）。
    """

    def __init__(self, root: Path | None = None) -> None:
        self.root = root or ROOT
        self.problems: list[str] = []

    def fail(self, where: str, message: str) -> None:
        self.problems.append(f"{where}: {message}")

    def check(self) -> list[str]:
        try:
            meta = load_js(self.root / "data" / "rekishi.js", "window.SHINAGAWA_DB.rekishi")
        except DataError as error:
            self.fail("data/rekishi.js", str(error))
            return self.problems

        eras = ids_of(meta.get("eras", []))
        areas = ids_of(meta.get("areas", []))
        categories = ids_of(meta.get("categories", []))
        certainty = ids_of(meta.get("certainty", []))
        location_kinds = ids_of(meta.get("locationKinds", []))
        name_kinds = ids_of(meta.get("nameKinds", []))
        sources = ids_of(meta.get("sources", []))

        for name, label in (
            ("eras", "時代区分"),
            ("areas", "地区"),
            ("categories", "カテゴリー"),
            ("certainty", "確実性"),
            ("locationKinds", "位置の種類"),
            ("nameKinds", "地名の種類"),
            ("sources", "出典"),
        ):
            if not meta.get(name):
                self.fail("data/rekishi.js", f"{label}（{name}）が空です")

        # 各コレクションを読み込む。ファイルがまだ無いものは飛ばす
        # （段階的に足していくため、欠けていること自体は誤りではない）。
        collections: dict[str, list[dict[str, Any]]] = {}
        for key, relative in (meta.get("files") or {}).items():
            path = self.root / relative
            if not path.exists():
                continue
            assignment = f"window.SHINAGAWA_DB.rekishi{key.capitalize()}"
            try:
                payload = load_js(path, assignment)
            except DataError as error:
                self.fail(relative, str(error))
                continue
            items = payload.get("items")
            if not isinstance(items, list):
                self.fail(relative, "items が配列ではありません")
                continue
            collections[key] = items

        if not collections:
            self.fail("data/rekishi.js", "読み込めるデータファイルが1つもありません")
            return self.problems

        all_ids: dict[str, str] = {}
        for key, items in collections.items():
            prefix = ID_PREFIXES.get(key, "")
            for index, item in enumerate(items):
                where = f"{key}[{index}]"
                item_id = item.get("id")
                if not item_id:
                    self.fail(where, "id がありません")
                    continue
                where = f"{key}/{item_id}"
                if item_id in all_ids:
                    self.fail(where, f"id が {all_ids[item_id]} と重複しています")
                else:
                    all_ids[item_id] = key
                if prefix and not str(item_id).startswith(prefix):
                    self.fail(where, f"id は {prefix} で始めてください")
                self.check_item(
                    where, key, item, eras, areas, categories,
                    certainty, location_kinds, name_kinds, sources,
                )

        # 相互リンクの行き先が実在するかは、全IDがそろってから確かめる。
        for key, items in collections.items():
            for item in items:
                where = f"{key}/{item.get('id')}"
                # 画面が読まない側に書かれていないか。参照整合性では捕まらない。
                for (coll, field), hint in FORBIDDEN_RELATION_SIDES.items():
                    if key == coll and field in item:
                        self.fail(where, f"{field} はこのコレクションに持たせません。{hint}")
                for field, target in RELATION_TARGETS.items():
                    for ref in item.get(field) or []:
                        if ref not in all_ids:
                            self.fail(where, f"{field} の {ref} が存在しません")
                        elif all_ids[ref] != target:
                            self.fail(
                                where,
                                f"{field} の {ref} は {target} ではなく {all_ids[ref]} です",
                            )
        return self.problems

    def check_item(
        self,
        where: str,
        key: str,
        item: dict[str, Any],
        eras: set[str],
        areas: set[str],
        categories: set[str],
        certainty: set[str],
        location_kinds: set[str],
        name_kinds: set[str],
        sources: set[str],
    ) -> None:
        """1件のレコードを検査する。"""
        if not str(item.get("name") or "").strip():
            self.fail(where, "name が空です")
        if not str(item.get("summary") or "").strip():
            self.fail(where, "summary が空です")

        era = item.get("era")
        if era and era not in eras:
            self.fail(where, f"era の {era} は data/rekishi.js にありません")
        # 時代はできごとにだけ必ず持たせる。神社や寺のように、ある時代に
        # 収まらず現在まで続いている地点は era を空のままにできる。
        # 無理に1つの時代を割り当てると、年表と地図で同じものが別の時代に見える。
        if key == "events" and not era:
            self.fail(where, "era がありません")

        for area in item.get("areas") or []:
            if area not in areas:
                self.fail(where, f"areas の {area} は data/rekishi.js にありません")
        if key in {"events", "places"} and not (item.get("areas") or []):
            self.fail(where, "areas が空です")

        for category in item.get("categories") or []:
            if category not in categories:
                self.fail(where, f"categories の {category} は data/rekishi.js にありません")

        value = item.get("certainty")
        if not value:
            self.fail(where, "certainty がありません")
        elif value not in certainty:
            self.fail(where, f"certainty の {value} は data/rekishi.js にありません")

        # 年が無いものは、代わりに時代や年代の表記を必ず持たせる。
        # 分からない年を無理に埋めないための約束。
        year = item.get("year")
        if year is not None and not isinstance(year, int):
            self.fail(where, "year は整数か null にしてください")
        if year is None and not str(item.get("yearText") or "").strip() and key in {"events"}:
            self.fail(where, "year が無い場合は yearText を書いてください")

        year_end = item.get("yearEnd")
        if year_end is not None:
            if not isinstance(year_end, int):
                self.fail(where, "yearEnd は整数か null にしてください")
            elif isinstance(year, int) and year_end < year:
                self.fail(where, f"yearEnd（{year_end}）が year（{year}）より前です")

        # 地名は、現町名と旧村名などを取り違えないよう種類を必ず持たせる。
        if key == "names":
            kind = item.get("nameKind")
            if not kind:
                self.fail(where, "nameKind がありません")
            elif kind not in name_kinds:
                self.fail(where, f"nameKind の {kind} は data/rekishi.js にありません")

        self.check_location(where, key, item, location_kinds)
        self.check_sources(where, item, sources)

        today = datetime.date.today().isoformat()
        verified = item.get("verifiedAt")
        if not verified:
            self.fail(where, "verifiedAt がありません")
        elif not DATE_PATTERN.match(str(verified)):
            self.fail(where, f"verifiedAt は YYYY-MM-DD 形式にしてください: {verified}")
        elif str(verified) > today:
            # 未来の日付は、まだしていない確認を済んだことにしてしまう。
            self.fail(where, f"verifiedAt が未来の日付です: {verified}")

        for field in ("year", "yearEnd", "birthYear", "deathYear"):
            value = item.get(field)
            if isinstance(value, int) and value > datetime.date.today().year:
                self.fail(where, f"{field} が未来の年です: {value}")

        self.check_heritage(where, item, today)

    def check_heritage(self, where: str, item: dict[str, Any], today: str) -> None:
        """地点が持つ指定文化財を検査する。"""
        for index, entry in enumerate(item.get("heritage") or []):
            spot = f"{where}/heritage[{index}]"
            if not str(entry.get("name") or "").strip():
                self.fail(spot, "name が空です")
            if not str(entry.get("kind") or "").strip():
                self.fail(spot, "kind が空です")
            url = str(entry.get("url") or "")
            if not url:
                self.fail(spot, "url がありません")
            elif not is_official_url(url):
                self.fail(spot, f"url が公式（品川区・文化庁）のページではありません: {url}")
            designated = entry.get("designatedOn")
            if designated is None:
                continue
            if not DATE_PATTERN.match(str(designated)):
                self.fail(spot, f"designatedOn は YYYY-MM-DD 形式にしてください: {designated}")
            elif str(designated) > today:
                self.fail(spot, f"designatedOn が未来の日付です: {designated}")

    def check_location(
        self, where: str, key: str, item: dict[str, Any], location_kinds: set[str]
    ) -> None:
        """緯度経度と、位置の種類を検査する。"""
        lat = item.get("lat")
        lng = item.get("lng")
        if lat is None and lng is None:
            if key == "places":
                self.fail(where, "地点には lat と lng が必要です")
            return
        if lat is None or lng is None:
            self.fail(where, "lat と lng は両方そろえてください")
            return
        if not isinstance(lat, (int, float)) or not isinstance(lng, (int, float)):
            self.fail(where, "lat と lng は数値にしてください")
            return
        if not LAT_RANGE[0] <= lat <= LAT_RANGE[1]:
            self.fail(where, f"lat が想定の範囲外です: {lat}")
        if not LNG_RANGE[0] <= lng <= LNG_RANGE[1]:
            self.fail(where, f"lng が想定の範囲外です: {lng}")

        kind = item.get("locationKind")
        if not kind:
            self.fail(where, "locationKind がありません")
        elif kind not in location_kinds:
            self.fail(where, f"locationKind の {kind} は data/rekishi.js にありません")
        # 現存しない施設は、当時の位置であることを必ず書き添える。
        # 現在地と取り違えさせないため。
        if kind in {"former", "approximate"} and not str(item.get("locationNote") or "").strip():
            self.fail(where, f"locationKind が {kind} のときは locationNote を書いてください")

    def check_sources(self, where: str, item: dict[str, Any], sources: set[str]) -> None:
        """出典を検査する。出典の無い項目は公開しない。"""
        entries = item.get("sources") or []
        if not entries:
            self.fail(where, "sources が空です。出典の無い項目は公開しません")
            return
        for entry in entries:
            if not isinstance(entry, dict):
                self.fail(where, "sources の要素は辞書にしてください")
                continue
            ref = entry.get("ref")
            if not ref:
                self.fail(where, "sources に ref がありません")
            elif ref not in sources:
                self.fail(where, f"sources の ref「{ref}」は出典台帳にありません")

        # 説が分かれるものは、説ごとに出典を持たせる。
        for index, variant in enumerate(item.get("variants") or []):
            if not str(variant.get("claim") or "").strip():
                self.fail(where, f"variants[{index}] の claim が空です")
            ref = variant.get("ref")
            if not ref:
                self.fail(where, f"variants[{index}] に ref がありません")
            elif ref not in sources:
                self.fail(where, f"variants[{index}] の ref「{ref}」は出典台帳にありません")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--quiet", action="store_true", help="問題が無いときは何も出力しない")
    args = parser.parse_args()

    checker = Checker()
    problems = checker.check()
    if problems:
        print(f"歴史データの検査で{len(problems)}件の問題が見つかりました:", file=sys.stderr)
        for problem in problems:
            print(f"  - {problem}", file=sys.stderr)
        return 1
    if not args.quiet:
        print("歴史データの検査を通過しました。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
