#!/usr/bin/env python3
"""「品川の歴史」の出典リンクが生きているかを確かめる。

歴史コンテンツは「出典で確認できたことだけを載せる」という約束で成り立っている。
出典のURLが死ぬと、その約束を確かめる手段がなくなり、中身が空洞になる。
実際に2026年10月20日の品川区公式サイトのリニューアルで、広報しながわの
PDFが転送も無く消えた。だから定期的に見に行く。

検査するURL:
  - data/rekishi.js の出典台帳（sources[].url）
  - data/rekishi-places.js の指定文化財（heritage[].url）
  - 各データの sources[].ref が指す台帳のURL

一度の失敗では死んだと判断しない。相手のサーバーが一時的に重いだけのことが
あるので、間を置いてもう一度試してから報告する。

実行例:
  python3 scripts/check_rekishi_links.py
  python3 scripts/check_rekishi_links.py --sample 20     # 標本だけ見る
  python3 scripts/check_rekishi_links.py --delay 2       # 間隔を空ける

生きていないURLが1つでもあれば終了コード1を返す。
外部ライブラリは使わない。
"""

from __future__ import annotations

import argparse
import json
import random
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Callable

sys.path.insert(0, str(Path(__file__).resolve().parent))

from check_rekishi_data import DataError, load_js


ROOT = Path(__file__).resolve().parents[1]

USER_AGENT = (
    "shinagawa-gikai-db-linkcheck/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)

# 相手のサーバーに負担をかけない。既定で1秒あける。
DEFAULT_DELAY = 1.0
TIMEOUT = 30

# 生きているとみなすステータス。403はブラウザ以外を弾く設定のことがあり、
# ページが消えたわけではないので、死んだ扱いにはしない（警告として出す）。
ALIVE = {200, 301, 302, 303, 307, 308}
SUSPECT = {401, 403, 405, 429}


def collect_urls(root: Path | None = None) -> list[tuple[str, str]]:
    """検査するURLと、それがどこに書かれているかを集める。

    root を差し替えられるようにしてあるのは、仮のデータで検査そのものを
    試せるようにするため（scripts/test_rekishi_links.py）。
    """
    root = root or ROOT
    meta = load_js(root / "data" / "rekishi.js", "window.SHINAGAWA_DB.rekishi")
    found: dict[str, str] = {}

    for source in meta.get("sources", []):
        url = source.get("url")
        if url:
            found.setdefault(url, f"出典台帳「{source.get('label', source.get('id'))}」")

    for key, relative in (meta.get("files") or {}).items():
        path = root / relative
        if not path.exists():
            continue
        assignment = f"window.SHINAGAWA_DB.rekishi{key.capitalize()}"
        try:
            payload = load_js(path, assignment)
        except DataError as error:
            print(f"  {relative} を読めませんでした: {error}", file=sys.stderr)
            continue
        for item in payload.get("items", []):
            for entry in item.get("heritage") or []:
                url = entry.get("url")
                if url:
                    found.setdefault(url, f"{item.get('name')}／{entry.get('name')}")

    return sorted(found.items())


def probe(url: str) -> tuple[int | None, str]:
    """URLを1回だけ叩く。HEADを拒む相手にはGETで試し直す。"""
    for method in ("HEAD", "GET"):
        request = urllib.request.Request(
            url, method=method, headers={"User-Agent": USER_AGENT}
        )
        try:
            with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
                return response.status, ""
        except urllib.error.HTTPError as error:
            if method == "HEAD" and error.code in {403, 405, 501}:
                continue  # HEADを嫌う相手なのでGETで試す
            return error.code, ""
        except (urllib.error.URLError, TimeoutError, OSError) as error:
            if method == "HEAD":
                continue
            return None, str(error)
    return None, "応答がありません"


def check(
    urls: list[tuple[str, str]],
    delay: float,
    probe_fn: Callable[[str], tuple[int | None, str]] | None = None,
    retry_delay: float | None = None,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    """全URLを確かめる。落ちたものは間を置いてもう一度試す。

    probe_fn を差し替えられるようにしてあるのは、通信せずに判定の筋道を
    試せるようにするため。監視そのものが鳴らない状態に気づけなくなるのを防ぐ。
    """
    probe_fn = probe_fn or probe
    retry_delay = max(delay, 3) if retry_delay is None else retry_delay
    dead: list[dict[str, Any]] = []
    suspect: list[dict[str, Any]] = []

    for index, (url, where) in enumerate(urls, 1):
        status, detail = probe_fn(url)
        if status in ALIVE:
            pass
        elif status in SUSPECT:
            suspect.append({"url": url, "where": where, "status": status})
        else:
            # 一度の失敗で死んだとは決めない。相手が一時的に重いだけのことがある。
            time.sleep(retry_delay)
            retry_status, retry_detail = probe_fn(url)
            if retry_status in ALIVE:
                pass
            elif retry_status in SUSPECT:
                suspect.append({"url": url, "where": where, "status": retry_status})
            else:
                dead.append({
                    "url": url,
                    "where": where,
                    "status": retry_status,
                    "detail": retry_detail or detail,
                })
        if index % 25 == 0:
            print(f"  {index}/{len(urls)} 件を確認（切れ {len(dead)} 件）", flush=True)
        time.sleep(delay)

    return dead, suspect


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--sample", type=int, default=0, help="この件数だけ無作為に確かめる")
    parser.add_argument("--delay", type=float, default=DEFAULT_DELAY, help="1件ごとに空ける秒数")
    parser.add_argument("--seed", type=int, default=None, help="標本の選び方を固定する")
    args = parser.parse_args()

    try:
        urls = collect_urls()
    except DataError as error:
        print(f"データを読めませんでした: {error}", file=sys.stderr)
        return 1

    if not urls:
        print("検査するURLがありません。", file=sys.stderr)
        return 1

    total = len(urls)
    if args.sample and args.sample < total:
        random.seed(args.seed)
        urls = random.sample(urls, args.sample)
        print(f"出典URL {total}件のうち {len(urls)}件を確かめます。")
    else:
        print(f"出典URL {len(urls)}件を確かめます。")

    dead, suspect = check(urls, args.delay)

    if suspect:
        print(f"\n応答はあるが通常の成功ではないものが{len(suspect)}件あります"
              f"（自動アクセスを断る設定の可能性。ページが消えたとは限りません）:")
        for item in suspect:
            print(f"  [{item['status']}] {item['where']}\n      {item['url']}")

    if dead:
        print(f"\n到達できない出典が{len(dead)}件あります:", file=sys.stderr)
        for item in dead:
            status = item["status"] if item["status"] is not None else "応答なし"
            print(f"  [{status}] {item['where']}", file=sys.stderr)
            print(f"      {item['url']}", file=sys.stderr)
            if item["detail"]:
                print(f"      {item['detail']}", file=sys.stderr)
        print("\n出典が消えた項目は、別の出典に差し替えるか、公開を取り下げてください。",
              file=sys.stderr)
        return 1

    print(f"\nすべての出典に到達できました（{len(urls)}件）。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
