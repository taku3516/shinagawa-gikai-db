#!/usr/bin/env python3
"""Build the static Pages artifact without storing Firebase's API key in Git."""

from argparse import ArgumentParser
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


ROOT = Path(__file__).resolve().parents[1]
GOOGLE_API_KEY = re.compile(r"AIza[0-9A-Za-z_-]{35}")

# 公開しないディレクトリ。開発・保守用で、画面からは参照していない。
# GitHub Pagesの1GB制限は会議録全文に使いたい（docs/fulltext-minutes-plan.md）。
#
# `exports/` は入れないこと。chokai-map.html が
# `exports/shinagawa-chokai-map.kml` をダウンロードさせている。
# ここに足すときは、画面のリンク先になっていないことを必ず確かめる。
PRIVATE_DIRECTORIES = {"docs", "scripts"}


def tracked_files() -> list[Path]:
    output = subprocess.check_output(
        ["git", "ls-files", "-z"], cwd=ROOT
    ).decode("utf-8")
    return [Path(item) for item in output.split("\0") if item]


def firebase_config(api_key: str) -> str:
    if not GOOGLE_API_KEY.fullmatch(api_key):
        raise ValueError("FIREBASE_API_KEYがGoogle APIキーの形式ではありません")

    config = {
        "apiKey": api_key,
        "authDomain": "shinagawakugiakidb.firebaseapp.com",
        "projectId": "shinagawakugiakidb",
        "appId": "1:938034569960:web:64240cfc36db741526df5d",
        "messagingSenderId": "938034569960",
    }
    entries = ",\n".join(
        f"    {key}: {json.dumps(value)}" for key, value in config.items()
    )
    return f"""/* GitHub Pagesのデプロイ時に生成されるFirebase公開設定です。 */
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


def build(output: Path, api_key: str) -> None:
    if output.exists() and any(output.iterdir()):
        raise ValueError(f"出力先が空ではありません: {output}")
    output.mkdir(parents=True, exist_ok=True)

    for relative in tracked_files():
        if relative.parts[0].startswith("."):
            continue
        if relative.parts[0] in PRIVATE_DIRECTORIES:
            continue
        source = ROOT / relative
        destination = output / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, destination)

    (output / "data" / "firebase-config.js").write_text(
        firebase_config(api_key), encoding="utf-8"
    )

    # ニュースページは Firebase Hosting へ移した（scripts/build_news_app.py）。
    # Googleログインは配信元と authDomain のドメインが一致していないと
    # iPhone・iPad で完了できないため（docs/firebase-sync-setup.md）。
    # 旧URLからは転送する。リポジトリの news.html はそのまま残すので、
    # ローカルでダブルクリックしたときは従来どおり本体が開く。
    shutil.copy2(ROOT / "news-moved.html", output / "news.html")
    (output / "news-moved.html").unlink(missing_ok=True)

    (output / ".nojekyll").touch()


def main() -> int:
    parser = ArgumentParser()
    parser.add_argument("--output", type=Path, default=ROOT / "_site")
    args = parser.parse_args()
    api_key = os.environ.get("FIREBASE_API_KEY", "").strip()
    if not api_key:
        parser.error("FIREBASE_API_KEYが設定されていません")
    build(args.output.resolve(), api_key)
    print(f"GitHub Pages用ファイルを生成しました: {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
