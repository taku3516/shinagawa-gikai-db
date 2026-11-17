#!/usr/bin/env python3
"""収集済みニュースの出典URLを、公式サイトのリニューアル後のURLへ張り替える。

品川区公式サイトは2026年10月20日のリニューアルで全ページのアドレスが変わった。
当初は旧URLが301せず404だったが、区が後から転送を用意したため、
旧URLを叩けば新URLを機械的に引ける。転送が無い記事は新サイトから消えている。

方針:
  * 転送先が200で応答する記事はURLだけ書き換え、IDは据え置く。
    ★（お気に入り）が端末内とFirestoreにID単位で保存されているため。
    収集側は scripts/collect_news.py の reuse_existing_id() でURLでも
    突き合わせるので、IDとURLがずれても記事が二重に増えることはない。
  * 新サイトに無い記事は項目ごと落とす。出典を辿れない記事は載せない方針のため。
  * 実測できなかったURLは触らない。黙って消さない。

使い方:
  python3 scripts/repair_news_urls.py            # 実測して書き換える
  python3 scripts/repair_news_urls.py --dry-run  # 件数だけ出す
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_NEWS = ROOT / "data" / "news-items.js"
DEFAULT_SOURCES = ROOT / "data" / "news-sources.json"
HEADER = "// 自動生成ファイル。scripts/collect_news.py で更新する。"
OLD_PREFIXES = (
    "https://www.city.shinagawa.tokyo.jp/PC/",
    "https://www.city.shinagawa.tokyo.jp/ct/",
    "http://www.city.shinagawa.tokyo.jp/PC/",
    "http://www.city.shinagawa.tokyo.jp/ct/",
)
USER_AGENT = (
    "shinagawa-gikai-db-link-repair/1.0 "
    "(+https://github.com/taku3516/shinagawa-gikai-db)"
)
TIMEOUT = 30
REDIRECT_CODES = (301, 302, 303, 307, 308)


class TransientFailure(RuntimeError):
    """一時的な失敗。記事を消す根拠にならないので、張り替え自体を中断する。"""


def is_old_official(url: str) -> bool:
    """リニューアル前の公式サイトURLかどうか。"""
    return str(url or "").startswith(OLD_PREFIXES)


def is_gone(code: int) -> bool:
    """ページが無いと断定できる応答か。

    404と410だけを根拠にする。429や503は混雑や一時停止であって、
    記事を消す理由にはならない。
    """
    return code in (404, 410)


def apply_resolution(
    items: list[dict], resolution: dict[str, str | None]
) -> tuple[list[dict], dict[str, int]]:
    """対応表に従ってURLを張り替え、新サイトに無い記事を落とす。

    resolution は 旧URL -> 新URL。値が None なら新サイトに無いという実測結果。
    対応表に載っていない旧URLは実測できなかったものとして、そのまま残す。
    同じURLに行き着いた記事は、先に出てきた1件だけ残す。
    """
    kept: list[dict] = []
    seen_urls: set[str] = set()
    report = {"rewritten": 0, "dropped": 0, "unresolved": 0, "untouched": 0, "merged": 0}
    for item in items:
        url = item.get("url", "")
        if not is_old_official(url):
            final_url, kind = url, "untouched"
        elif url not in resolution:
            final_url, kind = url, "unresolved"
        elif not resolution[url]:
            report["dropped"] += 1
            continue
        elif resolution[url] == url:
            # 転送が無くても200を返すURL。消えたわけではないので残す。
            final_url, kind = url, "untouched"
        else:
            final_url, kind = resolution[url], "rewritten"

        if final_url in seen_urls:
            # 別の記事が同じページに行き着いた。先に出てきた方を残す。
            # 旧URLからの張り替えでも、既に新URLを持つ記事とぶつかることがある。
            report["merged"] += 1
            continue
        seen_urls.add(final_url)
        report[kind] += 1
        if kind == "rewritten":
            item = dict(item)
            item["url"] = final_url
        kept.append(item)
    return kept, report


def refresh_sources(payload: dict, config: dict) -> dict:
    """収集元一覧を data/news-sources.json から作り直す。

    news-items.js の sources は収集時点の写しなので、
    設定側のURLを直しただけでは古いURLが残る。scripts/collect_news.py の
    write_output() と同じ形に揃える。
    """
    sources = []
    for key, source_type in (("rssFeeds", "rss"), ("htmlSources", "html")):
        for source in config.get(key, []):
            sources.append(
                {
                    "id": source["id"],
                    "name": source["name"],
                    "url": source["url"],
                    "type": source_type,
                    "enabled": bool(source.get("enabled")),
                    "requiresApproval": bool(source.get("requiresApproval")),
                    "note": source.get("note", ""),
                }
            )
    payload["sources"] = sources
    return payload


def resolve(url: str) -> tuple[str, str | None]:
    """旧URLの転送先を調べる。200で応答する転送先だけを採る。"""

    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, req, fp, code, msg, headers, newurl):  # noqa: ANN001, D102
            return None

    opener = urllib.request.build_opener(NoRedirect)
    location = ""
    try:
        opener.open(
            urllib.request.Request(url, headers={"User-Agent": USER_AGENT}, method="HEAD"),
            timeout=TIMEOUT,
        )
        return url, url  # 旧URLがそのまま200を返すなら張り替えない
    except urllib.error.HTTPError as error:
        if error.code in REDIRECT_CODES:
            location = error.headers.get("Location", "") or ""
        elif is_gone(error.code):
            return url, None  # 新サイトに無い
        else:
            raise TransientFailure(f"{url}: HTTP {error.code}") from error
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        raise TransientFailure(f"{url}: {error}") from error
    if not location:
        return url, None
    target = urllib.parse.urljoin(url, location)
    try:
        response = urllib.request.urlopen(
            urllib.request.Request(target, headers={"User-Agent": USER_AGENT}, method="HEAD"),
            timeout=TIMEOUT,
        )
    except urllib.error.HTTPError as error:
        if is_gone(error.code):
            return url, None  # 転送先も消えている
        raise TransientFailure(f"{target}: HTTP {error.code}") from error
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        raise TransientFailure(f"{target}: {error}") from error
    return url, response.url


def build_resolution(urls: list[str], workers: int = 5) -> dict[str, str | None]:
    """旧URLを実測し、対応表を作る。

    1件でも一時的な失敗（429・503・通信断など）があれば TransientFailure を投げて中断する。
    混雑を「ページが消えた」と取り違えて記事を消さないため。
    """
    with ThreadPoolExecutor(max_workers=workers) as pool:
        return dict(pool.map(resolve, urls))


def load_items(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    match = re.search(r"window\.SHINAGAWA_NEWS\s*=\s*(.*);\s*$", text, re.S)
    if not match:
        raise RuntimeError(f"データを解析できません: {path}")
    return json.loads(match.group(1))


def save_items(path: Path, payload: dict) -> None:
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text(f"{HEADER}\nwindow.SHINAGAWA_NEWS = {body};\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--news", type=Path, default=DEFAULT_NEWS)
    parser.add_argument("--sources", type=Path, default=DEFAULT_SOURCES)
    parser.add_argument("--dry-run", action="store_true", help="書き換えずに件数だけ出す")
    args = parser.parse_args()

    payload = load_items(args.news)
    config = json.loads(args.sources.read_text(encoding="utf-8"))
    items = payload.get("items", [])
    targets = sorted({item["url"] for item in items if is_old_official(item.get("url", ""))})
    if not targets:
        print("記事の旧URLは残っていません。収集元一覧だけ作り直します。")
        if not args.dry_run:
            refresh_sources(payload, config)
            save_items(args.news, payload)
        return 0
    print(f"旧URL {len(targets)} 件を実測します。")
    try:
        resolution = build_resolution(targets)
    except TransientFailure as error:
        print(f"一時的な失敗のため中断します（書き換えていません）: {error}", file=sys.stderr)
        return 1
    kept, report = apply_resolution(items, resolution)
    print(
        f"張り替え {report['rewritten']} / 削除 {report['dropped']} / "
        f"統合 {report['merged']} / 実測できず据え置き {report['unresolved']} / "
        f"対象外 {report['untouched']}"
    )
    if args.dry_run:
        return 0
    payload["items"] = kept
    refresh_sources(payload, config)
    save_items(args.news, payload)
    print(f"書き換えました: {args.news}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
