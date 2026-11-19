#!/usr/bin/env python3
"""Build the Firebase Hosting artifact that serves the login-backed pages.

ニュースページとイベントカレンダーを Firebase Hosting から配信する。
Googleログインは配信元と authDomain のドメインが一致していないと
iPhone・iPad で完了できないため（docs/firebase-sync-setup.md）。

会議録全文をはじめとする残りのサイトは GitHub Pages に置いたままにする。
Firebase Hosting の無料枠は転送量 360MB/日で、サイト全体を移すと届いてしまう。

転送量は「圧縮後」で数えること。Firebase Hosting は text/javascript などを
brotli（対応していない相手にはgzip）で配る。実測（2026-11-19、記事816件）:

    data/news-items.js   ディスク 0.70MB → 配信 0.10MB
    data/events.js       ディスク 0.33MB → 0.05MB
    1回の閲覧あたり      ニュース 約0.13MB / カレンダー 約0.07MB

ディスク上の大きさで数えると7倍ほど多く見積もってしまい、
記事の保存件数を削るといった要らない判断につながる。本番のヘッダで
content-encoding と content-length を見れば、いつでも確かめられる:

    curl -sI -H 'Accept-Encoding: br' \
      https://shinagawakugiakidb.firebaseapp.com/data/news-items.js

0.13MB/閲覧なら無料枠で1日およそ2700閲覧。記事を上限の2500件まで
ためても1日1000閲覧ほどは収まる。

FILES に足すとこの数字が増える。足す前に、本当にこの配信元から
配る必要があるかを確かめること。ビルド時に配信量を表示するので、
増え方はそこで追える。購読用の .ics を exports/ に置いて
GitHub Pages から配っているのは、Googleが定期的に取りに来るため。
"""

from argparse import ArgumentParser
import gzip
import json
import os
from pathlib import Path
import re
import shutil


ROOT = Path(__file__).resolve().parents[1]
GOOGLE_API_KEY = re.compile(r"AIza[0-9A-Za-z_-]{35}")

# サイト本体の公開先。ニュースページから他ページへのリンクはここへ向ける。
SITE_BASE = "https://taku3516.github.io/shinagawa-gikai-db/"

# ニュースページの表示に必要なファイルだけを列挙する。
# ここに足すと Firebase Hosting の転送量が増える。追加前に必要性を確かめること。
#
# news.html が読み込んでいるのにここに無いファイルがあると、
# 配信先だけ見た目が崩れる（CSS変数が未定義になり、地色も枠線も消える）。
# 取りこぼしは check_referenced_assets() がビルド時に検出する。
FILES = [
    "news.html",
    "events.html",
    "events-page.js",
    "events-ics.js",
    "news-sync.js",
    "news-sync-environment.js",
    "news-migration.js",
    "site-url.js",
    "site-nav.js",
    "site-theme.css",
    "site-base.css",
    "site-nav.css",
    "site-controls.css",
    "site-a11y.js",
    "site-a11y.css",
    "site-mobile.css",
    "data/site.js",
    "data/news-items.js",
    "data/events.js",
]

# 基準URLの差し込みが要るページ。site-url.js より前に window.SHINAGAWA_SITE_BASE を
# 置かないと、他ページへのリンクが別ドメインのまま解決されない。
PAGES = ("news.html", "events.html")

# 配信時に生成するので、コピー対象には無くてよいファイル。
GENERATED_FILES = {"data/firebase-config.js"}

# news.html が読み込んでいる同一ディレクトリ配下のファイルを拾う。
# 絶対URL（https://…）とデータURIは対象外。
LOCAL_ASSET = re.compile(
    r"""(?:href|src)\s*=\s*["'](?!https?:|data:|//|#)([^"']+)["']"""
)

# script・style の中身は取り除いてから探す。JSのテンプレート文字列にも
# href="${...}" のような書き方が出てきて、ファイル名と紛れるため。
# 開始タグは残すので <script src="..."> は拾える。
INLINE_CODE = re.compile(
    r"(<(script|style)\b[^>]*>).*?(</\2\s*>)", re.DOTALL | re.IGNORECASE
)

# 別ドメインから配信するため、サイト内リンクの基準URLを渡す（site-url.js）。
SITE_BASE_SNIPPET = (
    '<script>window.SHINAGAWA_SITE_BASE = "%s";</script>\n  ' % SITE_BASE
)

# Firebase Hosting のトップに置く案内。ここはニュース専用でサイト本体ではない。
INDEX_HTML = f"""<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>品川区議会DB</title>
<meta http-equiv="refresh" content="0; url={SITE_BASE}" />
<link rel="canonical" href="{SITE_BASE}" />
</head>
<body>
<p>品川区議会DBへ移動します。切り替わらない場合は
<a href="{SITE_BASE}">こちら</a>からお進みください。</p>
<script>window.location.replace("{SITE_BASE}");</script>
</body>
</html>
"""


def firebase_config(api_key: str) -> str:
    if not GOOGLE_API_KEY.fullmatch(api_key):
        raise ValueError("FIREBASE_API_KEYがGoogle APIキーの形式ではありません")

    config = {
        "apiKey": api_key,
        # 配信元と同じドメインであること。ここがずれるとiPhone・iPadでログインできない。
        "authDomain": "shinagawakugiakidb.firebaseapp.com",
        "projectId": "shinagawakugiakidb",
        "appId": "1:938034569960:web:64240cfc36db741526df5d",
        "messagingSenderId": "938034569960",
    }
    entries = ",\n".join(
        f"    {key}: {json.dumps(value)}" for key, value in config.items()
    )
    return f"""/* Firebase Hostingのデプロイ時に生成されるFirebase公開設定です。 */
window.SHINAGAWA_FIREBASE_SYNC = Object.freeze({{
  enabled: true,
  sdkVersion: "12.16.0",
  firebaseConfig: Object.freeze({{
{entries}
  }}),
  appCheck: Object.freeze({{
    enabled: false,
    enterpriseSiteKey: ""
  }})
}});
"""


def referenced_assets(html: str) -> list[str]:
    """news.html が読み込んでいるサイト内ファイルの一覧を返す。"""
    markup = INLINE_CODE.sub(r"\1\3", html)
    found: list[str] = []
    for path in LOCAL_ASSET.findall(markup):
        # ページ内リンク（news.html#top）やクエリは取り除く
        path = path.split("#", 1)[0].split("?", 1)[0]
        if path and path not in found:
            found.append(path)
    return found


def check_referenced_assets(html: str, name: str = "news.html") -> None:
    """ページの読み込み先が配信対象から漏れていないか確かめる。

    漏れていても表示自体は出るため、崩れたまま公開されてしまう。
    ここで止めて気づけるようにする。
    """
    deliverable = set(FILES) | GENERATED_FILES
    # 他ページへのリンクは site-url.js が SITE_BASE 側へ向け直すので対象外
    missing = [
        path
        for path in referenced_assets(html)
        if path not in deliverable and not path.endswith(".html")
    ]
    if missing:
        raise ValueError(
            f"{name} が読み込んでいるファイルが配信対象にありません: "
            + ", ".join(missing)
            + "\nscripts/build_news_app.py の FILES と "
            ".github/workflows/firebase-hosting.yml の paths に足してください。"
        )


def page_html(name: str) -> str:
    """基準URLの指定を差し込んだページを返す。"""
    source = (ROOT / name).read_text(encoding="utf-8")
    check_referenced_assets(source, name)
    marker = '<script src="site-url.js"></script>'
    if marker not in source:
        raise ValueError(f"{name} に site-url.js の読み込みが見当たりません")
    # site-url.js より前に基準URLを置く必要がある。
    return source.replace(marker, SITE_BASE_SNIPPET + marker, 1)


def build(output: Path, api_key: str) -> None:
    # 出力を作る前に検査する。読み込み先の漏れはここで止める。
    pages = {name: page_html(name) for name in PAGES}

    if output.exists() and any(output.iterdir()):
        raise ValueError(f"出力先が空ではありません: {output}")
    output.mkdir(parents=True, exist_ok=True)

    for relative in FILES:
        source = ROOT / relative
        if not source.exists():
            raise ValueError(f"配信対象が見つかりません: {relative}")
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    for name, page in pages.items():
        (output / name).write_text(page, encoding="utf-8")
    (output / "index.html").write_text(INDEX_HTML, encoding="utf-8")
    (output / "data" / "firebase-config.js").write_text(
        firebase_config(api_key), encoding="utf-8"
    )


def compressed_size(data: bytes) -> int:
    """配信されるおおよその大きさ。

    Firebase Hosting は brotli で配るが、標準ライブラリに brotli が無いので
    gzip で測る。brotli はこれより2〜3割小さくなるため、多めの見積もりになる。
    """
    return len(gzip.compress(data, 9))


def transfer_report(output: Path) -> list[tuple[str, int, int]]:
    """ページごとの配信量（ページ本体＋読み込むファイル）を返す。"""
    rows: list[tuple[str, int, int]] = []
    for name in PAGES:
        page = output / name
        if not page.exists():
            continue
        paths = [page]
        for relative in referenced_assets(page.read_text(encoding="utf-8")):
            if relative.endswith(".html"):
                continue
            asset = output / relative
            if asset.exists():
                paths.append(asset)
        payloads = [path.read_bytes() for path in paths]
        rows.append((name, sum(len(p) for p in payloads), sum(compressed_size(p) for p in payloads)))
    return rows


def print_transfer_report(output: Path) -> None:
    print("配信量（gzip換算の多め見積もり。実際のbrotliはこれより2〜3割小さい）:")
    for name, raw, sent in transfer_report(output):
        print(f"  {name}: ディスク {raw / 1048576:.2f}MB → 配信 {sent / 1048576:.2f}MB/閲覧"
              f"（無料枠360MB/日で約{int(360 * 1048576 / sent):,}閲覧以上）")


def main() -> int:
    parser = ArgumentParser()
    parser.add_argument("--output", type=Path, default=ROOT / "_news-app")
    args = parser.parse_args()
    api_key = os.environ.get("FIREBASE_API_KEY", "").strip()
    if not api_key:
        parser.error("FIREBASE_API_KEYが設定されていません")
    build(args.output.resolve(), api_key)
    print(f"Firebase Hosting用ファイルを生成しました: {args.output}")
    print_transfer_report(args.output.resolve())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
