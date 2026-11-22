#!/usr/bin/env python3
"""しながわデジタルアーカイブ（ADEAC）の区史から、節の本文を取り出す。

「品川区史 通史編」の上巻・下巻は全文が公開されている。目次も本文も
JavaScriptで差し込まれるため、ページのURLをそのまま取っても空が返る。
実体は iframe の中にある静的HTMLで、`texthtml` の下に置かれている。

  目次: https://adeac.jp/shinagawa-city/texthtml/<doc>/<book>/Index.html
  本文: https://adeac.jp/shinagawa-city/texthtml/<doc>/<book>/<節ID>.html

本文には底本のページ番号（例「255 ～ 257」）が入っているので、出典の
locator に「節の見出しと何頁か」を書ける。

**本文は転載しない。** 読んで事実を取り出し、自分の言葉で書くこと。
利用規定が禁じているのは商用目的のプログラム取得で、非営利の利用は
禁止条項に当たらない。robots.txt は `Crawl-Delay: 10` なので11秒あける。

実行例:
  # 目次を取って節の一覧を見る
  python3 scripts/adeac_sections.py toc --volume jo

  # 節を範囲で取る（11秒あけるので時間がかかる。背後で走らせること）
  python3 scripts/adeac_sections.py fetch --volume jo --range ht000650-ht001119

  # 取った節を見出し・底本ページ・本文に分けてJSONにする
  python3 scripts/adeac_sections.py extract --volume jo

  # 和暦を含む文だけを拾う（出来事の候補を探すとき）
  python3 scripts/adeac_sections.py dated --volume jo --contains 品川

出力はすべて scripts/out/adeac/<volume>/ の下（git管理外）。

外部ライブラリは使わない。
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
from typing import Iterable

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "scripts" / "out" / "adeac"

BASE = "https://adeac.jp/shinagawa-city/texthtml"

# 上巻・下巻の資料ID。ADEACの資料グループのページから採った。
VOLUMES: dict[str, dict[str, str]] = {
    "jo": {
        "doc": "d000010",
        "book": "mp000010",
        "label": "品川区史 通史編 上巻",
        "source_ref": "sgw-kushi-tsushi-jo",
    },
    "ge": {
        "doc": "d000020",
        "book": "mp000020",
        "label": "品川区史 通史編 下巻",
        "source_ref": "sgw-kushi-tsushi-ge",
    },
}

# robots.txt の Crawl-Delay: 10 に従う。1秒の余裕をみる。
CRAWL_DELAY_SECONDS = 11

# 最後に取得した時刻を残しておくファイル。
# 間隔をプロセス内のループだけで空けると、`toc` の直後に `fetch` を走らせたり、
# 単一節の `fetch` を続けて走らせたりしたときに間隔が空かない。
# 時刻をファイルに残して、コマンドをまたいでも空くようにする。
LAST_REQUEST_FILE = OUT / ".last-request"

USER_AGENT = "Mozilla/5.0 (compatible; shinagawa-gikai-db/1.0)"


class AdeacError(RuntimeError):
    """取得や解析に失敗したときに投げる。"""


def volume_of(name: str) -> dict[str, str]:
    """巻の名前から資料IDなどを引く。知らない名前なら止める。"""
    try:
        return VOLUMES[name]
    except KeyError:
        known = "・".join(sorted(VOLUMES))
        raise AdeacError(f"知らない巻です: {name}（使えるのは {known}）") from None


def out_dir(name: str) -> Path:
    """この巻の作業フォルダ。無ければ作る。"""
    directory = OUT / name
    (directory / "pages").mkdir(parents=True, exist_ok=True)
    return directory


def last_request_time() -> float | None:
    """最後に取得した時刻。記録が無いか読めなければ None。"""
    try:
        return float(LAST_REQUEST_FILE.read_text(encoding="utf-8").strip())
    except FileNotFoundError:
        return None
    except (OSError, ValueError):
        # 壊れた記録は「直前に取った」とみなし、待つ側に倒す。
        return float("nan")


def remember_request(now: float | None = None) -> None:
    """取得した時刻を残す。残せなくても取得そのものは止めない。"""
    try:
        LAST_REQUEST_FILE.parent.mkdir(parents=True, exist_ok=True)
        LAST_REQUEST_FILE.write_text(str(time.time() if now is None else now), encoding="utf-8")
    except OSError as error:
        print(f"注意: 取得時刻を残せませんでした（{error}）", file=sys.stderr)


def wait_for_crawl_delay(now: float | None = None, sleep=time.sleep) -> float:
    """前回の取得から CRAWL_DELAY_SECONDS 経つまで待つ。待った秒数を返す。

    コマンドをまたいでも間隔が空くように、時刻はファイルから読む。
    記録が壊れている、あるいは未来を指しているときは、全量を待つ。
    """
    previous = last_request_time()
    if previous is None:
        return 0.0
    moment = time.time() if now is None else now
    elapsed = moment - previous
    # NaN との比較は常に False になるので、まず異常な値を弾く。
    if not (elapsed == elapsed) or elapsed < 0:
        remaining = float(CRAWL_DELAY_SECONDS)
    else:
        remaining = CRAWL_DELAY_SECONDS - elapsed
    if remaining <= 0:
        return 0.0
    sleep(remaining)
    return remaining


def get(url: str) -> str:
    """1ページ取る。HTTPのエラーはそのまま伝える。

    呼ぶたびに前回からの間隔を空ける。待ちは `fetch` のループだけでなく
    すべての取得に掛かるので、`toc` の直後に `fetch` を走らせても空く。
    """
    wait_for_crawl_delay()
    remember_request()
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as error:
        raise AdeacError(f"{url} が {error.code} を返しました") from error
    except urllib.error.URLError as error:
        raise AdeacError(f"{url} に接続できません: {error.reason}") from error


def toc_url(volume: dict[str, str]) -> str:
    return f"{BASE}/{volume['doc']}/{volume['book']}/Index.html"


def section_url(volume: dict[str, str], section_id: str) -> str:
    return f"{BASE}/{volume['doc']}/{volume['book']}/{section_id}.html"


def parse_toc(raw: str) -> list[tuple[str, str]]:
    """目次HTMLから (見出し, 節ID) を順に取り出す。

    節IDは `/shinagawa-city/text-list/<doc>/<節ID>` という形のリンクに入っている。
    同じ節IDを指す見出しが複数あることがあるので、重複は残したまま返す。
    """
    items: list[tuple[str, str]] = []
    for match in re.finditer(r'<a[^>]*href="([^"]+)"[^>]*>(.*?)</a>', raw, re.S | re.I):
        href = match.group(1)
        label = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", match.group(2)))).strip()
        found = re.search(r"/(ht\d+)$", href)
        if label and found:
            items.append((label, found.group(1)))
    if not items:
        raise AdeacError("目次から節IDを1つも取り出せませんでした。入口が変わった可能性があります")
    return items


def plain_text(raw: str) -> str:
    """HTMLからタグを落として読める文字列にする。"""
    body = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", raw)
    body = re.sub(r"(?i)<br\s*/?>", "\n", body)
    body = re.sub(r"(?i)</(p|div|tr|h[1-6])>", "\n", body)
    text = html.unescape(re.sub(r"(?s)<[^>]+>", " ", body))
    text = re.sub(r"[ \t　]+", " ", text)
    return re.sub(r"\n\s*\n+", "\n", text).strip()


def split_section(text: str) -> tuple[str, str, str]:
    """節の本文を (見出し, 底本ページ, 本文) に分ける。

    先頭はパンくず。そのあとに見出しが来て、次の行が「255 ～ 257」のような
    底本のページ番号になっている。見つからなければページ番号は空で返す。
    """
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    for index, line in enumerate(lines):
        if re.fullmatch(r"\d+\s*～\s*\d+|\d+", line):
            heading = lines[index - 1] if index else ""
            pages = re.sub(r"\s+", "", line)
            return heading, pages, "\n".join(lines[index + 1:])
    return "", "", "\n".join(lines)


def expand_range(spec: str, known: Iterable[str]) -> list[str]:
    """`ht000650-ht001119` や `ht000650,ht000700` を節IDの一覧にする。

    範囲は目次にある節IDのうち、両端を含む並びに絞る。目次に無いIDは落とす。
    """
    available = sorted(set(known))
    if "-" in spec:
        start, _, end = spec.partition("-")
        start, end = start.strip(), end.strip()
        if not (start and end):
            raise AdeacError(f"範囲の書き方が違います: {spec}")
        picked = [i for i in available if start <= i <= end]
        if not picked:
            raise AdeacError(f"範囲 {spec} に当たる節が目次にありません")
        return picked
    picked = [i.strip() for i in spec.split(",") if i.strip()]
    missing = [i for i in picked if i not in available]
    if missing:
        raise AdeacError(f"目次に無い節IDです: {'・'.join(missing)}")
    return picked


def command_toc(args: argparse.Namespace) -> int:
    volume = volume_of(args.volume)
    directory = out_dir(args.volume)
    raw = get(toc_url(volume))
    (directory / "toc.html").write_text(raw, encoding="utf-8")
    items = parse_toc(raw)
    unique: dict[str, list[str]] = {}
    for label, section_id in items:
        unique.setdefault(section_id, []).append(label)
    (directory / "toc.json").write_text(
        json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8"
    )
    print(f"{volume['label']}: 目次の項目 {len(items)} 件 / 節 {len(unique)} 件")
    print(f"  -> {directory / 'toc.json'}")
    if args.grep:
        pattern = re.compile(args.grep)
        print(f"\n「{args.grep}」に当たる見出し:")
        for section_id in sorted(unique):
            for label in unique[section_id]:
                if pattern.search(label):
                    print(f"  {section_id}  {label}")
    return 0


def command_fetch(args: argparse.Namespace) -> int:
    volume = volume_of(args.volume)
    directory = out_dir(args.volume)
    toc_path = directory / "toc.json"
    if not toc_path.exists():
        raise AdeacError(f"先に toc を実行してください（{toc_path} がありません）")
    items = json.loads(toc_path.read_text(encoding="utf-8"))
    targets = expand_range(args.range, (section_id for _, section_id in items))

    done = 0
    failed: list[str] = []
    for index, section_id in enumerate(targets, start=1):
        destination = directory / "pages" / f"{section_id}.html"
        if destination.exists() and destination.stat().st_size > 0:
            done += 1
            continue
        try:
            destination.write_text(get(section_url(volume, section_id)), encoding="utf-8")
            done += 1
            print(f"[{index}/{len(targets)}] {section_id} 取得")
        except AdeacError as error:
            failed.append(section_id)
            print(f"[{index}/{len(targets)}] {section_id} 失敗: {error}", file=sys.stderr)
        # 間隔は get() が空けるので、ここでは待たない。

    print(f"取得完了: 成功 {done} / 失敗 {len(failed)} / 合計 {len(targets)}")
    return 1 if failed else 0


def command_extract(args: argparse.Namespace) -> int:
    directory = out_dir(args.volume)
    pages = sorted((directory / "pages").glob("ht*.html"))
    if not pages:
        raise AdeacError(f"{directory / 'pages'} に節がありません。先に fetch を実行してください")
    records: list[dict[str, object]] = []
    for path in pages:
        heading, page_numbers, body = split_section(
            plain_text(path.read_text(encoding="utf-8", errors="replace"))
        )
        records.append(
            {
                "id": path.stem,
                "heading": heading,
                "pages": page_numbers,
                "chars": len(body),
                "body": body,
            }
        )
    destination = directory / "sections.json"
    destination.write_text(json.dumps(records, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(records)}節を取り出しました -> {destination}")
    for record in records:
        print(f"  {record['id']}  {str(record['pages']):<10} {str(record['heading'])[:34]:<36} {record['chars']}字")
    return 0


# 和暦を含む文を拾うためのパターン。出来事の候補を探すのに使う。
ERA_IN_TEXT = re.compile(r"(明治|大正|昭和|平成|令和|[一-鿿]{2})[〇一二三四五六七八九十元0-9]+年")


def command_dated(args: argparse.Namespace) -> int:
    directory = out_dir(args.volume)
    path = directory / "sections.json"
    if not path.exists():
        raise AdeacError(f"先に extract を実行してください（{path} がありません）")
    records = json.loads(path.read_text(encoding="utf-8"))
    place = re.compile(args.contains) if args.contains else None
    wanted = set(args.sections.split(",")) if args.sections else None

    for record in records:
        if wanted and record["id"] not in wanted:
            continue
        hits: list[str] = []
        for sentence in re.split(r"(?<=。)", str(record["body"])):
            sentence = sentence.strip()
            if not sentence or len(sentence) > args.max_length:
                continue
            if not ERA_IN_TEXT.search(sentence):
                continue
            if place and not place.search(sentence):
                continue
            hits.append(sentence)
        if not hits:
            continue
        print("=" * 60)
        print(f"{record['id']}  {record['heading']}  （{record['pages']}頁）")
        for sentence in hits[: args.limit]:
            print(" ・" + sentence)
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--volume", choices=sorted(VOLUMES), default="jo", help="巻（jo=上巻 / ge=下巻）")
    sub = parser.add_subparsers(dest="command", required=True)

    toc = sub.add_parser("toc", help="目次を取って節の一覧を出す")
    toc.add_argument("--grep", help="見出しをこの正規表現で絞って表示する")
    toc.set_defaults(func=command_toc)

    fetch = sub.add_parser("fetch", help="節の本文を取る（11秒あける）")
    fetch.add_argument("--range", required=True, help="ht000650-ht001119 または ht000650,ht000700")
    fetch.set_defaults(func=command_fetch)

    extract = sub.add_parser("extract", help="取った節を見出し・底本ページ・本文に分ける")
    extract.set_defaults(func=command_extract)

    dated = sub.add_parser("dated", help="和暦を含む文だけを拾う")
    dated.add_argument("--contains", help="この正規表現を含む文だけに絞る（例: 品川|大井）")
    dated.add_argument("--sections", help="節IDをカンマ区切りで指定する")
    dated.add_argument("--limit", type=int, default=8, help="1節あたり何文まで出すか")
    dated.add_argument("--max-length", type=int, default=330, help="この文字数より長い文は飛ばす")
    dated.set_defaults(func=command_dated)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except AdeacError as error:
        print(f"エラー: {error}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
