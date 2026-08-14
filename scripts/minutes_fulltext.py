#!/usr/bin/env python3
"""会議録の全文を、会議1件につき1ファイルで書き出す。

掲載しているのは公式会議録から抜き出した質問・答弁だが、抜き出せているのは
原文の3割ほどで、答弁は文の途中で切れているものが多い。原文へ1手で届くよう
にするため、全文を別ファイルで持つ。

## 索引層と全文層を分ける理由

`data/<year>-committees-part-NN.js` に全文を入れると、年1本が約30MBになる。
`kaigiroku.html` は年データを同期読み込みするので、その大きさは表示できない
（JS文字列はUTF-16なので、メモリ上ではさらに倍になる）。

そこで、読み込む単位と書き換わる頻度で層を分ける。

    索引層  data/<year>-committees-part-NN.js  年ごとに読む   よく作り直す
    全文層  data/minutes/<year>/<会議ID>.js    会議ごとに読む 書き換えない

## write-once を守る

全文層は「一度書いたら書き換えない」ことが前提になっている。会議録は公開後
に変わらないので、抜き出し方を直して26年分を作り直しても、動くのは索引層
（1年6MB）だけで全文層（1年16MB）は1バイトも動かない——はずだが、これは
`write_minutes_file` が中身を見て書き換えを避けているから成り立っている。

取得日を毎回書き込むような実装にすると、作り直しのたびに3,300ファイルが
差分になり、Gitの履歴が一度で数百MB増える。`fetchedAt` を比較から外して
据え置いているのはそのためで、ここは変えないこと。

設計の全体は docs/fulltext-minutes-plan.md にある。
"""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MINUTES_ROOT = ROOT / "data" / "minutes"

# 行区切り扱いになる2文字。JSONはJavaScriptの部分集合だが、ES2019より前は
# この2文字だけ文字列リテラルの中で構文エラーになる。古い端末で読めなく
# なるのを避けるため、書き出すときに逃がす。
LS = "\u2028"
PS = "\u2029"
ESCAPED_LS = "\\u2028"
ESCAPED_PS = "\\u2029"

# 会議IDの先頭3文字が年ID（r06-20240515-19 → r06）。索引層とキーを共有する
# ので、全文ファイルのパスを索引層に持たせる必要がない。
SESSION_ID = re.compile(r"^(?P<year>[hr]\d{2})-\d{8}-.+$")

# 発言本文の段落の区切り。空白ではなく改行で持つ（voice_paragraphs の説明）。
PARAGRAPH_SEPARATOR = "\n"

# 発言者ラベルの頭に付く丸印。全角・半角の両方が混在する。
NAME_MARK = r"[○◯]"

# 本会議の会議IDの末尾（r06-20240220-honkaigi）。委員会は会議室番号が入るので、
# これで見分けられる。画面側（kaigiroku.html の fullTextKind）も同じ決まり。
PLENARY_SUFFIX = "-honkaigi"

# 比較に使う項目。fetchedAt は入れない（理由はモジュールの説明にある）。
CONTENT_KEYS = ("id", "dateIso", "title", "sourceType", "sourceUrl", "characters", "voices")


def year_id_of(session_id: str) -> str:
    """会議IDから年IDを取り出す。"""
    match = SESSION_ID.match(session_id)
    if not match:
        raise ValueError(f"会議IDの形式が想定と違います: {session_id}")
    return match.group("year")


def minutes_path(session_id: str, root: Path | None = None) -> Path:
    """会議IDから全文ファイルの置き場所を決める。"""
    return (root or MINUTES_ROOT) / year_id_of(session_id) / f"{session_id}.js"


def minutes_href(session_id: str) -> str:
    """画面から読み込むときのパス。`kaigiroku.html` と同じ導出をPython側にも置く。"""
    return f"data/minutes/{year_id_of(session_id)}/{session_id}.js"


# 会議録検索システムのURLは `index.php/<数字>?Template=document&Id=2980` の形で、
# 先頭の数字が取得のたびに変わる（同じ会議でも 965719 / 877121 のように別の値が
# 返る）。中身は同じで、この数字を 100000 に固定しても同じ会議録が開く。
SOURCE_PATH = re.compile(r"(kaigiroku\.city\.shinagawa\.tokyo\.jp/index\.php/)\d+")
STABLE_PATH_ID = "100000"


def canonical_source_url(url: str) -> str:
    """会議録のURLから、取得のたびに変わる番号を落とす。

    ここを素通しにすると、取得し直すたびに全文の `sourceUrl` が変わって
    write-once が崩れ、3,300ファイルすべてが差分になる（Gitの履歴が一度で
    数百MB増える）。索引層のリンクと取得キャッシュのキーも同じ理由で揺れる
    ので、取得する前の段階で固定する。
    """
    return SOURCE_PATH.sub(rf"\g<1>{STABLE_PATH_ID}", url or "")


def normalized_name(value: str) -> str:
    """発言者名を照合用に均す。丸印・空白・コロンを落とす。"""
    return re.sub(r"[\s　○◯]", "", value or "").strip("：:")


def _label_pattern(speaker: str) -> re.Pattern | None:
    """発言本文の先頭に置かれた発言者ラベルを見つけるための照合を作る。

    公式のHTMLでは、名前と本文の間に全角空白が入ったり入らなかったりする。
    名前の1文字ずつの間に空白を許して照合する。
    """
    key = normalized_name(speaker)
    if not key:
        return None
    return re.compile(rf"^{NAME_MARK}?\s*" + r"\s*".join(map(re.escape, key)) + r"\s*")


def drop_speaker_label(lines: list[str], speaker: str) -> list[str]:
    """発言の頭に置かれた発言者ラベル（「◯石田委員長」）を落とす。

    発言者は `speaker` として別に持っているので、本文に重ねて残す意味がない。
    ラベルだけの行なら行ごと落とし、同じ行に本文が続くならラベルだけを削る。

    開議時刻や議題の見出し（「○午前１０時００分開会」）がラベルより前に
    来ることがあるため、先頭3行までを見る。それより後ろの同名は本文中の
    言及とみなして触らない。
    """
    pattern = _label_pattern(speaker)
    if not pattern:
        return lines
    result = list(lines)
    for index, line in enumerate(result[:3]):
        match = pattern.match(line)
        if not match:
            continue
        rest = line[match.end():].strip()
        if rest:
            result[index] = rest
        else:
            del result[index]
        break
    return result


def voice_paragraphs(node, speaker: str = "") -> list[str]:
    """1発言のHTMLから、公式会議録の改行どおりの段落を取り出す。

    会議録検索システムは1発言を `<p class="voice__text">` に入れ、段落の
    区切りを `<br>` で表している。ここを空白でつぶすと、4,000字を超える
    答弁が改行のない一続きになって読めない。要約が読みにくいから全文を
    載せるのに、全文が読めなければ意味がないので、区切りを段落として残す。

    引数は BeautifulSoup のノード。`<br>` を改行に置き換えてから取り出す
    ので、行の途中に別のタグが入っていても切れない。
    """
    for line_break in node.find_all("br"):
        line_break.replace_with(PARAGRAPH_SEPARATOR)
    lines = [
        re.sub(r"\s+", " ", line).strip()
        for line in node.get_text("").split(PARAGRAPH_SEPARATOR)
    ]
    return drop_speaker_label([line for line in lines if line], speaker)


def build_payload(
    session_id: str,
    *,
    date_iso: str,
    title: str,
    source_type: str,
    source_url: str,
    voices: list[dict],
    fetched_at: str | None = None,
) -> dict:
    """全文ファイルに書く内容を組み立てる。

    `voices` は [{"speaker": ..., "text": ..., "lines": [...]}] の並び。
    `lines` があればそれを段落として改行で綴じる。無ければ `text` をその
    まま使う（校正原稿PDFなど、段落を取り出せない経路）。

    段落の区切りを改行1文字で持つので、字数は空白で綴じたときと変わらない。
    索引層の `sourceMeta.characters` と突き合わせる検査（check_minutes_
    fulltext.py）が、ここを変えても通り続けるのはそのため。

    発言の連番 `i` は、空の発言を飛ばす前の位置で1から振る。抜粋側の
    `voiceIndex` が同じ数え方をしているので、ここを変えると抜粋から全文への
    リンクがずれる。
    """
    numbered = []
    for index, voice in enumerate(voices, start=1):
        lines = [line for line in (voice.get("lines") or []) if line.strip()]
        text = (PARAGRAPH_SEPARATOR.join(lines) if lines else (voice.get("text") or "")).strip()
        if not text:
            continue
        numbered.append({
            "i": index,
            "speaker": (voice.get("speaker") or "").strip(),
            "text": text,
        })
    return {
        "id": session_id,
        "dateIso": date_iso,
        "title": title,
        "sourceType": source_type,
        "sourceUrl": source_url,
        "fetchedAt": fetched_at or date.today().isoformat(),
        "characters": sum(len(voice["text"]) for voice in numbered),
        "voices": numbered,
    }


def render(payload: dict) -> str:
    """全文ファイルの中身を作る。

    `.json` ではなく `.js` にしているのは、`index.html` をダブルクリックして
    `file://` で開く使い方を残すため。`fetch()` は `file://` ではCORSで
    止まるが、`<script>` ならどちらでも読める。
    """
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    body = body.replace(LS, ESCAPED_LS).replace(PS, ESCAPED_PS)
    label = payload.get("title") or payload["id"]
    note = "正式会議録" if payload["sourceType"] == "formal" else "校正原稿・正式会議録ではない"
    return (
        f"/* {label} 会議録全文（{note}／公式会議録の転載）。"
        f"scripts/minutes_fulltext.py で生成。 */\n"
        f"window.SHINAGAWA_DB.registerMinutes({body});\n"
    )


def parse(text: str) -> dict | None:
    """`render` が書いた中身を読み戻す。読めない形なら None。"""
    start = text.find("registerMinutes(")
    end = text.rfind(");")
    if start < 0 or end < 0 or end <= start:
        return None
    body = text[start + len("registerMinutes("):end]
    body = body.replace(ESCAPED_LS, LS).replace(ESCAPED_PS, PS)
    try:
        parsed = json.loads(body)
    except json.JSONDecodeError:
        return None
    return parsed if isinstance(parsed, dict) else None


def read_minutes_file(path: Path) -> dict | None:
    """置いてある全文ファイルを読む。無ければ None。"""
    if not path.exists():
        return None
    return parse(path.read_text(encoding="utf-8"))


def same_content(stored: dict | None, payload: dict) -> bool:
    """書き換える必要があるかを判定する。取得日は見ない。"""
    if not stored:
        return False
    return all(stored.get(key) == payload.get(key) for key in CONTENT_KEYS)


def write_minutes_file(payload: dict, root: Path | None = None) -> bool:
    """全文ファイルを書く。中身が同じなら書かない。

    戻り値は実際に書いたかどうか。中身が同じ場合は書き込み自体を飛ばすので、
    既存の `fetchedAt` がそのまま残り、ファイルの更新時刻も動かない。この
    関数の責務はこの1点に尽きる（理由はモジュールの説明にある）。
    """
    path = minutes_path(payload["id"], root)
    if same_content(read_minutes_file(path), payload):
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(render(payload), encoding="utf-8")
    return True


def is_plenary(session_id: str) -> bool:
    """本会議の会議IDか。委員会は末尾が会議室番号（r06-20240515-19）。"""
    return str(session_id).endswith(PLENARY_SUFFIX)


def prune_missing(
    session_ids: set[str], year_id: str, root: Path | None = None, *, plenary: bool = False,
) -> list[str]:
    """その年の全文のうち、会議一覧から消えたものを削除する。

    会議録検索システム側で会議の区分が変わると、古い会議IDのファイルが
    残ってしまう。年単位で作り直すときに掃除する。

    **委員会と本会議の全文は同じ年ディレクトリに混ざっている。** 呼んだ側が
    持っている分だけを見る（`plenary` で切り替える）。ここを分けないと、
    委員会を作り直すたびにその年の本会議の全文が消える。
    """
    directory = (root or MINUTES_ROOT) / year_id
    if not directory.exists():
        return []
    removed = []
    for path in sorted(directory.glob("*.js")):
        if is_plenary(path.stem) != plenary:
            continue
        if path.stem not in session_ids:
            path.unlink()
            removed.append(path.stem)
    return removed
