"""事務事業評価シート（PDF）から、事業ごとの記録のデータを作る。

対象は直近1年分（令和7年度評価＝令和6年度実施事業）。評価シートは1頁＝1小事業で、
部署ごとのPDFに分かれて品川区公式サイトで公開されている（data/gyosei.js の sheets）。

表の文字を上から順に取り出すと列が混ざるため、各行の座標を取り（scripts/pdf_text.py、
標準ライブラリのみ）、「ラベルと同じ高さにある値」「見出し列の真下にある値」という形で読む。

使い方:
  python scripts/prepare_jimujigyo.py --fetch   # PDFを scripts/cache/jimujigyo-r07/ に取得
  python scripts/prepare_jimujigyo.py           # data/jimujigyo-r07.js を書き出す
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import unicodedata
import urllib.request
from pathlib import Path
from typing import Any, Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))
import pdf_text  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
CACHE = Path(__file__).resolve().parent / "cache" / "jimujigyo-r07"
OUT = ROOT / "data" / "jimujigyo-r07.js"

EVALUATION_YEAR = "令和7年度"
FISCAL_YEAR = "令和6年度"
RESULT_PAGE = "https://www.city.shinagawa.tokyo.jp/kusei/shisakukeikaku/1005171/1005172/1005173.html"
PDF_BASE = "https://www.city.shinagawa.tokyo.jp/_res/projects/default_project/_page_/001/005/173/20240222105532_{n}.pdf"

# 部署別の評価シート。番号は公式PDFのファイル名の末尾（data/gyosei.js の sheets と同じ）。
# 全部局をまとめた _36.pdf は部署別の写しなので読まない。
SHEETS: list[tuple[int, str]] = [
    (37, "企画経営部"), (38, "区長室"), (39, "地域振興部"), (40, "文化観光スポーツ振興部"),
    (41, "子ども未来部"), (42, "品川区児童相談所"), (43, "福祉部"), (44, "健康推進部"),
    (45, "都市環境部"), (46, "防災まちづくり部"), (47, "教育委員会事務局"), (48, "会計管理室"),
    (49, "区議会事務局"), (50, "選挙管理委員会事務局"), (51, "監査委員事務局"),
]

# 公式の集計（「令和7年度事務事業評価の結果について」3頁の結果概要）。読み取り結果と突き合わせる
OFFICIAL_TOTAL = 652
OFFICIAL_EVALUATIONS = {"A": 16, "B": 339, "C": 271, "D": 26}

# 評価の4区分（区の行政評価基本方針）
EVALUATION_LABELS = {"A": "拡大する事業", "B": "継続する事業", "C": "改善・見直しする事業", "D": "完了・廃止する事業"}

# 頁の左半分（基本情報・目的・実績）と右半分（予算・決算・財務・評価）の境目
RIGHT_HALF_X = 620

Line = tuple[float, float, float, str]  # (上端からの距離, 左端x, 右端x, 文字)


# ── 小さな読み取り部品 ─────────────────────────────

def nfkc(text: str) -> str:
    """全角英数を半角に寄せる（Ａ→A、１→1）。"""
    return unicodedata.normalize("NFKC", text)


def thousand_yen(text: str) -> Optional[int]:
    """評価シートの「千円」単位の数字を円に直す。数字でなければ None。"""
    value = nfkc(text).strip().replace(",", "")
    if not re.fullmatch(r"-?\d+", value):
        return None
    return int(value) * 1000


def percent(text: str) -> Optional[float]:
    """「94.5%」を 94.5 に。数字でなければ None。"""
    match = re.fullmatch(r"(-?\d+(?:\.\d+)?)\s*[%％]", nfkc(text).strip())
    return float(match.group(1)) if match else None


def final_evaluation(text: str) -> Optional[dict[str, str]]:
    """「(2)最終評価」の区分（A〜D）と今後の方向性を読む。無ければ None。"""
    normalized = nfkc(text)
    head = re.search(r"\(2\)\s*最終評価", normalized)
    if not head:
        return None
    match = re.search(r"◆\s*([ABCD])\s*([^\s◆]+)(?:\s*◆\s*([^\n]+))?", normalized[head.end():])
    if not match:
        return None
    return {"code": match.group(1), "label": match.group(2).strip(), "direction": (match.group(3) or "").strip()}


# ── 頁単位の読み取り ───────────────────────────────

def same_row(lines: list[Line], top: float, tolerance: float = 3.5) -> list[Line]:
    """指定した高さとほぼ同じ行に並ぶ文字を、左から順に返す。"""
    return sorted((ln for ln in lines if abs(ln[0] - top) <= tolerance), key=lambda ln: ln[1])


def find(lines: list[Line], text: str, x_max: float = 9999) -> Optional[Line]:
    """完全一致する行（最初の1つ）を探す。"""
    return next((ln for ln in sorted(lines) if ln[3] == text and ln[1] < x_max), None)


def right_of(lines: list[Line], label: str, stop_at: Optional[str] = None) -> str:
    """ラベルの右に同じ高さで並ぶ値を読む。stop_at のラベルが出たらそこで止める。"""
    anchor = find(lines, label, RIGHT_HALF_X)
    if not anchor:
        return ""
    values: list[str] = []
    for ln in same_row(lines, anchor[0]):
        if ln[1] <= anchor[1] or ln[1] >= RIGHT_HALF_X:
            continue
        if stop_at and ln[3] == stop_at:
            break
        values.append(ln[3])
    return values[0] if values and not stop_at else " ".join(values)


def block_text(lines: list[Line], start: str, ends: list[str], x_max: float = RIGHT_HALF_X) -> str:
    """見出し start の下から、ends のうち最も近い見出しの手前まで（左半分）の文章をつなげる。

    小見出しが欠けるシートがあるので、終端は候補を並べて渡す（例：【概要】が無ければ次の節で止める）。
    """
    head = find(lines, start, x_max)
    if not head:
        return ""
    tails = [tail[0] for tail in (find(lines, end, x_max) for end in ends if end) if tail and tail[0] > head[0]]
    bottom = min(tails) if tails else head[0] + 200
    body = [ln for ln in sorted(lines) if head[0] < ln[0] < bottom and ln[1] < x_max]
    return "".join(ln[3] for ln in body).strip()


def settlement_total(lines: list[Line]) -> dict[str, Any]:
    """「4 予算・決算（概要）」の「計」の行を読む。列は 予算現額・決算額・翌年度繰越額・不用額・執行率。"""
    header = next((ln for ln in lines if ln[3].startswith("４") and "予算・決算" in ln[3]), None)
    breakdown = find(lines, "決算額の主な内訳")
    if not header:
        return {}
    bottom = breakdown[0] if breakdown else header[0] + 200
    total = next((ln for ln in sorted(lines)
                  if ln[3] == "計" and ln[1] >= RIGHT_HALF_X and header[0] < ln[0] < bottom), None)
    if not total:
        return {}
    cells = [ln[3] for ln in same_row(lines, total[0]) if ln[1] > total[2]]
    if len(cells) != 5:
        return {"error": f"計の行の列数が{len(cells)}"}
    budget, settled, carry, unused = (thousand_yen(c) for c in cells[:4])
    return {"budgetYen": budget, "settledYen": settled, "carryYen": carry, "unusedYen": unused, "rate": percent(cells[4])}


def column_center(lines: list[Line], label: str, default: float) -> float:
    """年度の見出し（例「(2024年度)」）の中心x。2列が1行にくっついていたら幅で割り振る。"""
    for top, x0, x1, text in lines:
        if label not in text:
            continue
        parts = re.findall(r"\(\d{4}年度\)|（達成年度）", text)
        if label not in parts:
            continue
        width = (x1 - x0) / len(parts)
        index = parts.index(label)
        return x0 + width * index + width / 2
    return default


def indicators(lines: list[Line]) -> list[dict[str, str]]:
    """「3 事業の実績・課題」の指標表から、実施年度（令和6年度）の目標と実績を読む。"""
    header = next((ln for ln in lines if ln[3].startswith("３") and "実績・課題" in ln[3]), None)
    stop = find(lines, "取組内容・実績")
    if not header or not stop:
        return []
    area = [ln for ln in lines if header[0] < ln[0] < stop[0] and ln[1] < RIGHT_HALF_X]
    year_x = column_center(area, "(2024年度)", 312)
    goal_x = column_center(area, "（達成年度）", 406)
    # 「実績 2,536,656」のように、すぐ右の値と1行にくっつくことがあるので先頭一致で見る
    targets = sorted(ln for ln in area if ln[3].startswith("目標") and 165 < ln[1] < 195)
    actuals = sorted(ln for ln in area if ln[3].startswith("実績") and 165 < ln[1] < 195)
    result: list[dict[str, str]] = []
    for index, target_row in enumerate(targets):
        actual_row = next((a for a in actuals if a[0] > target_row[0]), None)
        if not actual_row:
            continue
        top, bottom = target_row[0] - 14, actual_row[0] + 6
        if index + 1 < len(targets):
            # 次の指標の欄に食い込まないよう、次の「目標」行の手前で止める
            bottom = min(bottom, targets[index + 1][0] - 14 - 0.1)
        name = "".join(ln[3] for ln in sorted(area) if top <= ln[0] <= bottom and ln[2] < 148)
        if not name:
            continue
        unit = "".join(ln[3] for ln in sorted(area) if top <= ln[0] <= bottom and 148 <= ln[1] < 170)
        definition = "".join(ln[3] for ln in sorted(area) if top <= ln[0] <= bottom and ln[1] >= 428)

        def cell(row: Line, center: float) -> str:
            hits = [ln[3] for ln in same_row(area, row[0]) if 195 < ln[1] < 428 and abs((ln[1] + ln[2]) / 2 - center) <= 16]
            return hits[0] if hits else ""

        result.append({
            "label": name, "unit": unit, "definition": definition,
            "target": cell(target_row, year_x), "actual": cell(actual_row, year_x),
            "goal": cell(target_row, goal_x),
        })
    return result


def read_page(lines: list[Line]) -> dict[str, Any]:
    """評価シート1頁分を読む。"""
    full_text = "\n".join(ln[3] for ln in sorted(lines, key=lambda ln: (ln[1] >= RIGHT_HALF_X, ln[0], ln[1])))
    period_row = find(lines, "事業期間", RIGHT_HALF_X)
    legal_label = find(lines, "根拠法令要綱", RIGHT_HALF_X)
    purpose_head = next((ln for ln in lines if ln[3].startswith("２") and "目的・概要" in ln[3]), None)
    legal = ""
    if period_row and purpose_head:
        legal = "".join(ln[3] for ln in sorted(lines)
                        if period_row[0] + 4 < ln[0] < purpose_head[0] and 100 <= ln[1] < RIGHT_HALF_X
                        and ln is not legal_label)
    overview_end = next((ln[3] for ln in lines if ln[3].startswith("３") and "実績・課題" in ln[3]), "")
    purpose = block_text(lines, "【目的】", ["【概要】", overview_end])
    overview = block_text(lines, "【概要】", [overview_end]) if overview_end else ""
    if not purpose and overview_end:
        # 【目的】【概要】の小見出しが無いシートは、「目的・概要」欄全体を目的として持つ
        purpose = block_text(lines, "目的・概要", [overview_end])
    record: dict[str, Any] = {
        "name": right_of(lines, "小事業名"),
        "section": right_of(lines, "担当課"),
        "unit": right_of(lines, "担当係"),
        "account": {"kan": right_of(lines, "款"), "kou": right_of(lines, "項"), "moku": right_of(lines, "目")},
        "jigyo": right_of(lines, "事業"),
        "pillar": right_of(lines, "政策の柱"),
        "period": right_of(lines, "事業期間", stop_at="関連する個別計画等"),
        "legal": legal,
        "purpose": purpose,
        "overview": overview,
        "indicators": indicators(lines),
        "evaluation": final_evaluation(full_text),
    }
    record.update(settlement_total(lines))
    return record


def page_lines(pdf: Path) -> list[list[Line]]:
    """PDFの各頁から、文字の行を座標つきで取り出す（上端からの距離に直す）。"""
    try:
        pages = pdf_text.pdf_lines(pdf)
    except pdf_text.PdfError as error:
        raise SystemExit(f"{pdf.name} を読めませんでした: {error}") from error
    return [[(round(height - y1, 1), round(x0, 1), round(x1, 1), text.strip())
             for x0, _y0, x1, y1, text in lines if text.strip()]
            for height, lines in pages]


def read_pdf(pdf: Path, department: str) -> list[dict[str, Any]]:
    """部署別の評価シートPDFを全頁読む。頁番号は1始まり。"""
    rows: list[dict[str, Any]] = []
    for index, lines in enumerate(page_lines(pdf), start=1):
        row = read_page(lines)
        row["department"] = department
        row["page"] = index
        rows.append(row)
    return rows


# ── 取得と書き出し ─────────────────────────────────

def fetch() -> None:
    """評価シートPDFを公式サイトから取得する（1件ごとに2秒あける）。"""
    CACHE.mkdir(parents=True, exist_ok=True)
    for number, department in SHEETS:
        target = CACHE / f"s{number}.pdf"
        if target.exists():
            continue
        request = urllib.request.Request(PDF_BASE.format(n=number), headers={"User-Agent": "shinagawa-gikai-db (data build)"})
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                target.write_bytes(response.read())
        except OSError as error:
            raise SystemExit(f"{department} の評価シートを取得できませんでした: {error}") from error
        print(f"取得: {department} ({target.stat().st_size:,} bytes)")
        time.sleep(2)


def problems(row: dict[str, Any]) -> list[str]:
    """読み取れなかった項目を挙げる。空なら全項目そろっている。"""
    missing = [key for key in ("name", "section", "budgetYen", "settledYen", "rate", "evaluation") if row.get(key) in (None, "")]
    if row.get("error"):
        missing.append(row["error"])
    return missing


def build() -> dict[str, Any]:
    """全部署の評価シートを読み、書き出す形にまとめる。"""
    projects: list[dict[str, Any]] = []
    issues: list[str] = []
    for number, department in SHEETS:
        pdf = CACHE / f"s{number}.pdf"
        if not pdf.exists():
            raise SystemExit(f"{pdf} がありません。先に --fetch で取得してください。")
        for row in read_pdf(pdf, department):
            gaps = problems(row)
            if gaps:
                issues.append(f"{department} {row['page']}頁 {row.get('name') or '（名称なし）'}: {'・'.join(gaps)}")
            row["id"] = f"r07-{number}-{row['page']}"
            row["source"] = {
                "label": f"{EVALUATION_YEAR}事務事業評価シート（{department}）",
                "url": PDF_BASE.format(n=number) + f"#page={row['page']}",
                "locator": f"{row['page']}頁",
            }
            row.pop("error", None)
            projects.append(row)
    # 公式の集計と件数・評価区分の内訳が合うか（合わなければ読み違いがある）
    counts = {code: sum(1 for p in projects if (p.get("evaluation") or {}).get("code") == code) for code in OFFICIAL_EVALUATIONS}
    if len(projects) != OFFICIAL_TOTAL or counts != OFFICIAL_EVALUATIONS:
        issues.append(f"公式集計と不一致: 件数{len(projects)}（公式{OFFICIAL_TOTAL}）評価{counts}（公式{OFFICIAL_EVALUATIONS}）")
    return {"projects": projects, "issues": issues}


def write(data: dict[str, Any]) -> None:
    """data/jimujigyo-r07.js に書き出す。"""
    payload = {
        "evaluationYear": EVALUATION_YEAR,
        "fiscalYear": FISCAL_YEAR,
        "resultUrl": RESULT_PAGE,
        "note": "品川区の事務事業評価シート（PDF）から機械的に読み取った値です。正確な内容は各シートの該当頁で確認してください。",
        "count": len(data["projects"]),
        "projects": data["projects"],
    }
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUT.write_text(
        "// 品川区議会DB データファイル（事業ごとの記録：令和7年度事務事業評価＝令和6年度実施事業）\n"
        "// scripts/prepare_jimujigyo.py が評価シートPDFから生成。手で編集しない。\n"
        f"window.SHINAGAWA_JIMUJIGYO_R07 = {body};\n",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--fetch", action="store_true", help="評価シートPDFを取得する")
    args = parser.parse_args()
    if args.fetch:
        fetch()
        return 0
    data = build()
    write(data)
    print(f"{len(data['projects'])}件を書き出しました: {OUT.relative_to(ROOT)}")
    for issue in data["issues"]:
        print("要確認:", issue, file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
