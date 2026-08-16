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
#
# news.html が読み込んでいるのにここに無いファイルがあると、
# 配信先だけ見た目が崩れる（CSS変数が未定義になり、地色も枠線も消える）。
# 取りこぼしは check_referenced_assets() がビルド時に検出する。
FILES = [
    "news.html",
    "news-sync.js",
    "news-sync-environment.js",
    "news-migration.js",
    "site-url.js",
    "site-nav.js",
    "site-theme.css",
    "site-nav.css",
    "site-a11y.js",
    "site-a11y.css",
    "site-mobile.css",
    "data/site.js",
    "data/news-items.js",
]

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


def check_referenced_assets(html: str) -> None:
    """news.html の読み込み先が配信対象から漏れていないか確かめる。

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
            "news.html が読み込んでいるファイルが配信対象にありません: "
            + ", ".join(missing)
            + "\nscripts/build_news_app.py の FILES と "
            ".github/workflows/firebase-hosting.yml の paths に足してください。"
        )


def news_html() -> str:
    """基準URLの指定を差し込んだ news.html を返す。"""
    source = (ROOT / "news.html").read_text(encoding="utf-8")
    check_referenced_assets(source)
    marker = '<script src="site-url.js"></script>'
    if marker not in source:
        raise ValueError("news.html に site-url.js の読み込みが見当たりません")
    # site-url.js より前に基準URLを置く必要がある。
    return source.replace(marker, SITE_BASE_SNIPPET + marker, 1)


def build(output: Path, api_key: str) -> None:
    # 出力を作る前に検査する。読み込み先の漏れはここで止める。
    page = news_html()

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

    (output / "news.html").write_text(page, encoding="utf-8")
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
