#!/usr/bin/env python3
"""全国文化財総覧（sitereports.nabunken.go.jp）から、品川区の遺跡の事実を集める。

使う入口は発行機関一覧（東京都 → 品川区）と、そこから開く報告書の個別ページだけ。
`robots.txt` が禁じる `/ja/search*`（遺跡・文化財データ検索を含む）には触れない。

取り出すのは遺跡名・調査期間・調査原因・時代・主な遺構と遺物・緯度経度という事実だけで、
報告書の本文は転載しない。著作権は発行元の自治体等にあり（`/ja/abouts/guide`）、
引用の範囲を超える利用は許諾が要るため、ここでは事実の確認にだけ使う。

実行例:
  python3 scripts/nabunken_sites.py list            # 品川区の報告書の一覧（ID）を作る
  python3 scripts/nabunken_sites.py fetch           # 報告書の個別ページを取る（間隔をあける）
  python3 scripts/nabunken_sites.py parse           # 所収遺跡をJSONにまとめる

出力は scripts/out/nabunken/ の下（git管理外）。外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts" / "out" / "nabunken"
BASE = "https://sitereports.nabunken.go.jp"
LIST_URL = f"{BASE}/ja/list/13/13109"
USER_AGENT = (
    "shinagawa-gikai-db-rekishi-collector/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)
# robots.txt に Crawl-Delay は無いが、相手は公的機関なので ADEAC と同じく11秒あける
DELAY_SECONDS = 11


class NabunkenError(Exception):
    """取得や解析に失敗したときに投げる。"""


def plain_text(source: str) -> str:
    """HTMLからタグを除き、空白を1つにまとめる。"""
    body = re.sub(r"<script.*?</script>|<style.*?</style>", "", source, flags=re.S)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html.unescape(body))).strip()


def parse_report(text: str) -> dict[str, str]:
    """報告書のタイトルと発行年月を取る。"""
    title = text.split(" - 全国文化財総覧")[0].strip()
    date = re.search(r"発行年月日 (\d{8})", text)
    published = ""
    if date:
        raw = date.group(1)
        published = f"{raw[:4]}-{raw[4:6]}" if raw[6:] == "00" else f"{raw[:4]}-{raw[4:6]}-{raw[6:]}"
    return {"title": title, "published": published}


def _iso(raw: str) -> str:
    return f"{raw[:4]}-{raw[4:6]}-{raw[6:8]}" if len(raw) == 8 else ""


def parse_sites(text: str) -> list[dict[str, Any]]:
    """「所収遺跡」の欄から、遺跡ごとの事実を取る。"""
    start = text.find("所収遺跡")
    if start < 0:
        return []
    body = text[start + len("所収遺跡"):]
    # 「遺跡名かな」と区別して、「遺跡名 ○○」で始まる塊に分ける
    chunks = re.split(r"(?=遺跡名 (?!かな))", body)
    sites: list[dict[str, Any]] = []
    for chunk in chunks:
        match = re.match(r"遺跡名 (.+?) 遺跡名かな", chunk)
        if not match:
            continue
        name = match.group(1).strip()
        coords = re.search(r"10進数\(自動生成\) ([0-9.]+) ([0-9.]+)", chunk)
        period = re.search(r"調査期間 (\d{8})(?:-(\d{8}))?", chunk)
        cause = re.search(r"調査原因 (.*?) 遺跡概要", chunk)
        eras = re.search(r"時代 (.*?) 主な遺構", chunk)
        features = re.search(r"主な遺構 (.*?) 主な遺物", chunk)
        finds = re.search(r"主な遺物 (.*?) 特記事項", chunk)
        notes = re.search(r"特記事項 (.*?)(?= 種別 | 遺跡名 | 要約 |$)", chunk)
        sites.append({
            "name": name,
            "lat": float(coords.group(1)) if coords else None,
            "lng": float(coords.group(2)) if coords else None,
            "surveyStart": _iso(period.group(1)) if period else "",
            "surveyEnd": _iso(period.group(2) or "") if period else "",
            "cause": cause.group(1).strip() if cause else "",
            "eras": eras.group(1).split() if eras else [],
            "features": features.group(1).split() if features else [],
            "finds": finds.group(1).split() if finds else [],
            "note": notes.group(1).strip() if notes else "",
        })
    return sites


def base_name(name: str) -> str:
    """「御殿山遺跡11次」「居木橋遺跡（D地区）」から、遺跡そのものの名前を取り出す。"""
    cleaned = re.sub(r"（.*?）|\(.*?\)", "", name)
    cleaned = re.sub(r"\s+第?[0-9０-９]+次(?:・第?[0-9０-９]+次)*・?$", "", cleaned)  # 「池田山北遺跡 第2次・第3次」
    cleaned = re.sub(r"第?[0-9０-９]+(?:・[0-9０-９]+)*次(?:調査)?$", "", cleaned)
    cleaned = re.sub(r"[A-ZＡ-Ｚ]地区[0-9０-９]*$", "", cleaned)  # 「居木橋遺跡B地区２」
    cleaned = re.sub(r"遺跡[0-9０-９]+$", "遺跡", cleaned)  # 「池田山遺跡１」
    return cleaned.strip()


def fetch(url: str) -> str:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return response.read().decode("utf-8", "replace")
    except (urllib.error.URLError, TimeoutError) as error:
        raise NabunkenError(f"取得に失敗しました: {url}（{error}）") from error


def extract_item_ids(source: str) -> list[str]:
    """一覧ページから報告書のIDを取る。2ページ目以降は /p/N/item/ の形になる。"""
    found = re.findall(r"/ja/list/13/13109/(?:p/\d+/)?item/(\d+)", source)
    return list(dict.fromkeys(found))


def command_list() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    ids: list[str] = []
    page = 1
    while True:
        url = LIST_URL if page == 1 else f"{LIST_URL}/p/{page}"
        source = fetch(url)
        new = [x for x in extract_item_ids(source) if x not in ids]
        if not new:
            break
        ids.extend(new)
        print(f"  {page}ページ目: {len(new)}件")
        page += 1
        time.sleep(DELAY_SECONDS)
    (OUT / "ids.json").write_text(json.dumps(ids, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"報告書{len(ids)}件のIDを書き出しました。")
    return 0


def command_fetch() -> int:
    ids = json.loads((OUT / "ids.json").read_text(encoding="utf-8"))
    items = OUT / "items"
    items.mkdir(parents=True, exist_ok=True)
    for index, item_id in enumerate(ids, 1):
        target = items / f"{item_id}.html"
        if target.exists():
            continue
        target.write_text(fetch(f"{LIST_URL}/item/{item_id}"), encoding="utf-8")
        print(f"[{index}/{len(ids)}] {item_id} 取得")
        time.sleep(DELAY_SECONDS)
    return 0


def command_parse() -> int:
    ids = json.loads((OUT / "ids.json").read_text(encoding="utf-8"))
    reports = []
    for item_id in ids:
        path = OUT / "items" / f"{item_id}.html"
        if not path.exists():
            continue
        text = plain_text(path.read_text(encoding="utf-8"))
        report = parse_report(text)
        report["id"] = item_id
        report["url"] = f"{BASE}/{item_id}"
        report["sites"] = parse_sites(text)
        reports.append(report)
    (OUT / "reports.json").write_text(json.dumps(reports, ensure_ascii=False, indent=2), encoding="utf-8")
    total = sum(len(r["sites"]) for r in reports)
    print(f"報告書{len(reports)}件、所収遺跡{total}件を書き出しました。")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("command", choices=["list", "fetch", "parse"])
    args = parser.parse_args()
    try:
        return {"list": command_list, "fetch": command_fetch, "parse": command_parse}[args.command]()
    except NabunkenError as error:
        print(str(error), file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
