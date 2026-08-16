#!/usr/bin/env python3
"""Build the Firebase Hosting artifact that serves only the news page.

ニュースページだけを Firebase Hosting から配信する。Googleログインは配信元と
authDomain のドメインが一致していないと iPhone・iPad で完了できないため
（docs/firebase-sync-setup.md）。

会議録全文をはじめとする残りのサイトは GitHub Pages に置いたままにする。
Firebase Hosting の無料枠は転送量 360MB/日で、サイト全体を移すと届いてしまう。
ここで配るのは 0.1MB 未満なので、無料枠のまま毎日確実に配信できる。
"""

from argparse import ArgumentParser
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
FILES = [
    "news.html",
    "news-sync.js",
    "news-sync-environment.js",
    "news-migration.js",
    "site-url.js",
    "site-nav.js",
    "site-nav.css",
    "site-a11y.js",
    "site-a11y.css",
    "site-mobile.css",
    "data/site.js",
    "data/news-items.js",
]

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


def news_html() -> str:
    """基準URLの指定を差し込んだ news.html を返す。"""
    source = (ROOT / "news.html").read_text(encoding="utf-8")
    marker = '<script src="site-url.js"></script>'
    if marker not in source:
        raise ValueError("news.html に site-url.js の読み込みが見当たりません")
    # site-url.js より前に基準URLを置く必要がある。
    return source.replace(marker, SITE_BASE_SNIPPET + marker, 1)


def build(output: Path, api_key: str) -> None:
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

    (output / "news.html").write_text(news_html(), encoding="utf-8")
    (output / "index.html").write_text(INDEX_HTML, encoding="utf-8")
    (output / "data" / "firebase-config.js").write_text(
        firebase_config(api_key), encoding="utf-8"
    )


def main() -> int:
    parser = ArgumentParser()
    parser.add_argument("--output", type=Path, default=ROOT / "_news-app")
    args = parser.parse_args()
    api_key = os.environ.get("FIREBASE_API_KEY", "").strip()
    if not api_key:
        parser.error("FIREBASE_API_KEYが設定されていません")
    build(args.output.resolve(), api_key)
    print(f"Firebase Hosting用ファイルを生成しました: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
