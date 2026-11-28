#!/usr/bin/env python3
"""しなトーク（しながわオープントーク）の参加型プロセスを取得する。

しなトークは品川区が運営するオンラインの意見交換の場（Decidim製）。
意見公募手続（パブリックコメント）とは別の取り組みなので、data/public-comments.js とは
分けて data/shinatalk.js に書き出す。

- 取得元: 公開の GraphQL API（https://shinagawa.makeour.city/api）。1回の問い合わせで全件取れる
  （robots.txt が高負荷を理由に禁じている一覧の絞り込みURLは使わない）
- 取り出す: 件名・副題・期間・段階（区が付けたステップ名と日程）・参加の方法（部品の種類）
- 取り出さない: 説明文・利用者の投稿やアンケート回答（しなトークへリンクで案内する）

使い方:
    python3 scripts/shinatalk.py --write   # data/shinatalk.js を書き出す
    python3 scripts/shinatalk.py           # 取得結果を表示するだけ

標準ライブラリだけで動く。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[1]
OUT_PATH = ROOT / "data" / "shinatalk.js"

SITE_URL = "https://shinagawa.makeour.city"
API_URL = SITE_URL + "/api"
PROCESSES_URL = SITE_URL + "/ja/processes"
USER_AGENT = "shinagawa-gikai-db/1.0 (public data indexer; +https://github.com/taku3516/shinagawa-gikai-db)"

QUERY = """{ participatoryProcesses {
  id slug publishedAt startDate endDate
  title { translation(locale: "ja") }
  subtitle { translation(locale: "ja") }
  steps { title { translation(locale: "ja") } startDate endDate active }
  components { __typename }
} }"""

# 部品の種類のうち、区民が意見を出す手段になるもの（表示順もこの順）。記事やページは含めない
WAYS = {"Surveys": "アンケート", "Proposals": "意見の投稿", "Meetings": "ワークショップ・会議", "Budgets": "予算の投票"}
SLUG = re.compile(r"^[a-z0-9][a-z0-9-]*$")


def text(field: dict | None) -> str | None:
    """翻訳つきの欄（{"translation": ...}）から前後の空白を除いた文字列を取り出す。空なら None。"""
    value = (field or {}).get("translation")
    value = value.strip() if isinstance(value, str) else ""
    return value or None


def day(value: str | None) -> str | None:
    """"2026-10-21T00:00:00+09:00" や "2026-10-21" を "2026-10-21" にする。"""
    if not value:
        return None
    match = re.match(r"\d{4}-\d{2}-\d{2}", value)
    if not match:
        raise ValueError(f"日付として読めません: {value}")
    return match.group(0)


def normalize(process: dict) -> dict:
    """APIのプロセス1件から、掲載する事実だけを取り出す。"""
    title = text(process.get("title"))
    slug = process.get("slug") or ""
    if not title or not SLUG.match(slug):
        raise ValueError(f"件名または識別子が読めないプロセスです: id={process.get('id')}")
    kinds = {component.get("__typename") for component in process.get("components") or []}
    return {
        "id": slug,
        "title": title,
        "subtitle": text(process.get("subtitle")),
        "url": f"{PROCESSES_URL}/{slug}",
        "start": day(process.get("startDate")),
        "end": day(process.get("endDate")),
        "steps": [{
            "title": text(step.get("title")) or "",
            "start": day(step.get("startDate")),
            "end": day(step.get("endDate")),
            "active": bool(step.get("active")),
        } for step in process.get("steps") or []],
        "ways": [label for kind, label in WAYS.items() if kind in kinds],
    }


def processes_from_response(response: dict) -> list[dict]:
    """APIの応答からプロセスの一覧を作る。開始日の新しい順。"""
    if response.get("errors"):
        raise RuntimeError("APIがエラーを返しました: " + "; ".join(error.get("message", "") for error in response["errors"]))
    processes = (response.get("data") or {}).get("participatoryProcesses")
    if processes is None:
        raise RuntimeError("APIの応答に participatoryProcesses がありません。構成が変わった可能性があります。")
    items = [normalize(process) for process in processes]
    return sorted(items, key=lambda item: (item["start"] or "", item["id"]), reverse=True)


def fetch(retries: int = 3) -> dict:
    """公開APIに一覧を1回だけ問い合わせる。"""
    body = json.dumps({"query": QUERY}).encode("utf-8")
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            request = urllib.request.Request(API_URL, data=body, method="POST", headers={
                "User-Agent": USER_AGENT, "Content-Type": "application/json", "Accept": "application/json"})
            with urllib.request.urlopen(request, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
            last_error = error
            time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"しなトークのAPIから取得できませんでした: {API_URL} ({last_error})")


def render(items: list[dict], fetched_at: str) -> str:
    payload = {
        "source": {"label": "しながわオープントーク（しなトーク）", "url": PROCESSES_URL},
        "fetchedAt": fetched_at,
        "items": items,
    }
    return ("/* scripts/shinatalk.py がしなトークの公開APIから生成。手で編集しない。 */\n"
            "window.SHINAGAWA_SHINATALK = " + json.dumps(payload, ensure_ascii=False, indent=1) + ";\n")


def previous_items() -> list[dict] | None:
    """前回書き出した一覧を読む。取得日だけの差分でコミットが増えないようにするため。"""
    if not OUT_PATH.exists():
        return None
    content = OUT_PATH.read_text(encoding="utf-8")
    try:
        return json.loads(content[content.index("{"):content.rindex("}") + 1])["items"]
    except (ValueError, KeyError) as error:
        print(f"前回のデータを読めませんでした（上書きします）: {error}", file=sys.stderr)
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--write", action="store_true", help="data/shinatalk.js を書き出す")
    args = parser.parse_args()
    items = processes_from_response(fetch())
    if not items:
        raise RuntimeError("プロセスが1件もありません。APIの公開範囲が変わった可能性があります。")
    for item in items:
        active = next((step["title"] for step in item["steps"] if step["active"]), "")
        print(item["id"], item["start"], item["end"], active, "・".join(item["ways"]), item["title"], file=sys.stderr)
    if args.write:
        if previous_items() == items:
            print("内容に変更がないため書き換えません", file=sys.stderr)
            return 0
        # 定期実行は UTC で動くので、日本の暦日で記録する
        today = datetime.now(ZoneInfo("Asia/Tokyo")).date().isoformat()
        OUT_PATH.write_text(render(items, today), encoding="utf-8")
        print(f"{len(items)}件を {OUT_PATH.relative_to(ROOT)} に書き出しました", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
