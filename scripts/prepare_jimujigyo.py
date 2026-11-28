"""事務事業評価シート（PDF）から、事業ごとの記録のデータを作る。

対象は評価シートが部署別PDFで公開されている3年度分（令和5〜7年度評価＝令和4〜6年度実施事業）。
評価シートは1頁＝1小事業で、部署ごとのPDFに分かれて品川区公式サイトで公開されている。
年度によって様式（用紙の向き・列の位置）が違うので、列の境目は頁の見出しの位置から決める。

表の文字を上から順に取り出すと列が混ざるため、各行の座標を取り（scripts/pdf_text.py、
標準ライブラリのみ）、「ラベルと同じ高さにある値」「見出し列の真下にある値」という形で読む。

使い方:
  python scripts/prepare_jimujigyo.py --fetch            # PDFを scripts/cache/jimujigyo-<年度>/ に取得
  python scripts/prepare_jimujigyo.py --fetch --year r06 # 1年度だけ取得
  python scripts/prepare_jimujigyo.py                    # data/jimujigyo-<年度>.js を全年度書き出す（年度間の対応づけも）
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import unicodedata
import urllib.request
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Optional

sys.path.insert(0, str(Path(__file__).resolve().parent))
import pdf_text  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
CACHE_ROOT = Path(__file__).resolve().parent / "cache"
SITE = "https://www.city.shinagawa.tokyo.jp"


@dataclass(frozen=True)
class EvaluationYear:
    """1年度分の評価シートの所在と、公式の集計（読み取り結果と突き合わせる）。"""

    key: str                  # データのID・ファイル名に使う（例 r07）
    evaluation_year: str      # 評価した年度（例 令和7年度）
    fiscal_year: str          # 評価対象の事業を実施した年度（例 令和6年度）
    fiscal_western: int       # 実施年度の西暦。指標表の「(2024年度)」列を読むのに使う
    result_page: str          # 公式の結果ページ
    pdf_base: str             # 部署別PDFのURL（{n} に番号が入る）
    sheet_label: str          # 区が付けている資料名
    sheets: tuple[tuple[int, str], ...]  # (PDFの番号, 部署名)。全部局版は部署別の写しなので読まない
    official_total: int
    official_evaluations: dict[str, int]

    @property
    def cache(self) -> Path:
        return CACHE_ROOT / f"jimujigyo-{self.key}"

    @property
    def out(self) -> Path:
        return ROOT / "data" / f"jimujigyo-{self.key}.js"

    @property
    def variable(self) -> str:
        return f"SHINAGAWA_JIMUJIGYO_{self.key.upper()}"


# 公式の集計は各年度の「事務事業評価の結果について」の結果概要（評価区分別の事業数）
YEARS: dict[str, EvaluationYear] = {year.key: year for year in (
    EvaluationYear(
        key="r07", evaluation_year="令和7年度", fiscal_year="令和6年度", fiscal_western=2024,
        result_page=f"{SITE}/kusei/shisakukeikaku/1005171/1005172/1005173.html",
        pdf_base=f"{SITE}/_res/projects/default_project/_page_/001/005/173/20240222105532_{{n}}.pdf",
        sheet_label="事務事業評価シート",
        sheets=((37, "企画経営部"), (38, "区長室"), (39, "地域振興部"), (40, "文化観光スポーツ振興部"),
                (41, "子ども未来部"), (42, "品川区児童相談所"), (43, "福祉部"), (44, "健康推進部"),
                (45, "都市環境部"), (46, "防災まちづくり部"), (47, "教育委員会事務局"), (48, "会計管理室"),
                (49, "区議会事務局"), (50, "選挙管理委員会事務局"), (51, "監査委員事務局")),
        official_total=652, official_evaluations={"A": 16, "B": 339, "C": 271, "D": 26},
    ),
    EvaluationYear(
        key="r06", evaluation_year="令和6年度", fiscal_year="令和5年度", fiscal_western=2023,
        result_page=f"{SITE}/kusei/shisakukeikaku/1005171/1005176/1005177.html",
        pdf_base=f"{SITE}/_res/projects/default_project/_page_/001/005/177/20240222105532_{{n}}.pdf",
        sheet_label="事務事業評価シート",
        sheets=((20, "企画経営部"), (21, "区長室"), (22, "地域振興部"), (23, "文化観光スポーツ振興部"),
                (24, "子ども未来部"), (25, "福祉部"), (26, "健康推進部"), (27, "都市環境部"),
                (28, "防災まちづくり部"), (29, "教育委員会事務局"), (30, "会計管理室"),
                (31, "区議会事務局"), (32, "選挙管理委員会事務局"), (33, "監査委員事務局")),
        official_total=669, official_evaluations={"A": 34, "B": 271, "C": 319, "D": 45},
    ),
    EvaluationYear(
        key="r05", evaluation_year="令和5年度", fiscal_year="令和4年度", fiscal_western=2022,
        result_page=f"{SITE}/kusei/shisakukeikaku/1005171/1005180/1005181.html",
        pdf_base=f"{SITE}/_res/projects/default_project/_page_/001/005/181/20240222105532_{{n}}.pdf",
        sheet_label="行政評価シート",
        sheets=((1, "企画部"), (2, "総務部"), (3, "地域振興部"), (4, "文化スポーツ振興部"),
                (5, "子ども未来部"), (6, "福祉部"), (7, "健康推進部"), (8, "都市環境部"),
                (9, "防災まちづくり部"), (10, "教育委員会事務局"), (11, "会計管理室"),
                (12, "区議会事務局"), (13, "選挙管理委員会事務局"), (14, "監査委員事務局")),
        official_total=665, official_evaluations={"A": 40, "B": 262, "C": 324, "D": 39},
    ),
)}

# 評価の4区分（区の行政評価基本方針）
EVALUATION_LABELS = {"A": "拡大する事業", "B": "継続する事業", "C": "改善・見直しする事業", "D": "完了・廃止する事業"}

# 頁の左半分（基本情報・目的・実績）と右半分（予算・決算・財務・評価）の境目。
# 様式によって変わるので頁ごとに right_edge() で決め、見出しが無いときだけこの値を使う
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


def right_edge(lines: list[Line]) -> float:
    """頁の左半分の右端。右半分の先頭にある「４ 予算・決算」の見出しのすぐ左とする。

    令和7年度評価は x≈628、令和6年度評価（A4横）は x≈451 から右半分が始まる。
    """
    heading = next((ln for ln in lines if ln[3].startswith("４") and "予算・決算" in ln[3]), None)
    return heading[1] - 8 if heading else RIGHT_HALF_X


def right_of(lines: list[Line], label: str, right_x: float, stop_at: Optional[str] = None) -> str:
    """ラベルの右に同じ高さで並ぶ値を読む。stop_at のラベルが出たらそこで止める。"""
    anchor = find(lines, label, right_x)
    if not anchor:
        return ""
    values: list[str] = []
    for ln in same_row(lines, anchor[0]):
        if ln[1] <= anchor[1] or ln[1] >= right_x:
            continue
        if stop_at and ln[3] == stop_at:
            break
        values.append(ln[3])
    return values[0] if values and not stop_at else " ".join(values)


def block_text(lines: list[Line], start: str, ends: list[str], right_x: float) -> str:
    """見出し start の下から、ends のうち最も近い見出しの手前まで（左半分）の文章をつなげる。

    小見出しが欠けるシートがあるので、終端は候補を並べて渡す（例：【概要】が無ければ次の節で止める）。
    """
    head = find(lines, start, right_x)
    if not head:
        return ""
    tails = [tail[0] for tail in (find(lines, end, right_x) for end in ends if end) if tail and tail[0] > head[0]]
    bottom = min(tails) if tails else head[0] + 200
    body = [ln for ln in sorted(lines) if head[0] < ln[0] < bottom and ln[1] < right_x]
    return "".join(ln[3] for ln in body).strip()


def settlement_total(lines: list[Line], right_x: float) -> dict[str, Any]:
    """「4 予算・決算（概要）」の「計」の行を読む。列は 予算現額・決算額・翌年度繰越額・不用額・執行率。"""
    header = next((ln for ln in lines if ln[3].startswith("４") and "予算・決算" in ln[3]), None)
    breakdown = find(lines, "決算額の主な内訳")
    if not header:
        return {}
    bottom = breakdown[0] if breakdown else header[0] + 200
    total = next((ln for ln in sorted(lines)
                  if ln[3] == "計" and ln[1] >= right_x and header[0] < ln[0] < bottom), None)
    if not total:
        return {}
    cells = [ln[3] for ln in same_row(lines, total[0]) if ln[1] > total[2]]
    if len(cells) != 5:
        return {"error": f"計の行の列数が{len(cells)}"}
    budget, settled, carry, unused = (thousand_yen(c) for c in cells[:4])
    return {"budgetYen": budget, "settledYen": settled, "carryYen": carry, "unusedYen": unused, "rate": percent(cells[4])}


def column_center(lines: list[Line], label: str) -> Optional[float]:
    """年度の見出し（例「(2024年度)」）の中心x。2列が1行にくっついていたら幅で割り振る。"""
    for _top, x0, x1, text in lines:
        if label not in text:
            continue
        parts = re.findall(r"\(\d{4}年度\)|（達成年度）", text)
        if label not in parts:
            continue
        width = (x1 - x0) / len(parts)
        index = parts.index(label)
        return x0 + width * index + width / 2
    return None


def indicators(lines: list[Line], fiscal_year: int, right_x: float = RIGHT_HALF_X) -> list[dict[str, str]]:
    """「3 事業の実績・課題」の指標表から、実施年度の目標と実績を読む。

    列の位置は様式ごとに違うので、見出しの行から決める。
    指標名は「単位 区分」の見出しより左、単位はその見出しの左端から「目標／実績」の手前まで、
    指標の定義は「（達成年度）」の見出しより右。値は実施年度の列の真下にあるもの。
    """
    header = next((ln for ln in lines if ln[3].startswith("３") and "実績・課題" in ln[3]), None)
    stop = find(lines, "取組内容・実績")
    if not header or not stop:
        return []
    area = [ln for ln in lines if header[0] < ln[0] < stop[0] and ln[1] < right_x]
    kind_head = next((ln for ln in sorted(area) if "区分" in ln[3]), None)
    year_x = column_center(area, f"({fiscal_year}年度)")
    goal_x = column_center(area, "（達成年度）")
    goal_head = next((ln for ln in area if "（達成年度）" in ln[3]), None)
    if not kind_head or year_x is None:
        return []
    definition_x = goal_head[2] - 4 if goal_head else right_x
    header_bottom = max(ln[0] for ln in area if "年度)" in ln[3] or ln is kind_head)

    def is_label(ln: Line, word: str) -> bool:
        # 「実績 2,536,656」のように、すぐ右の値と1行にくっつくことがあるので先頭一致で見る
        return ln[3].startswith(word) and ln[1] < kind_head[2] and ln[2] > kind_head[1] and ln[0] > kind_head[0]

    targets = sorted(ln for ln in area if is_label(ln, "目標"))
    actuals = sorted(ln for ln in area if is_label(ln, "実績"))
    if not targets:
        return []
    label_x0 = min(ln[1] for ln in targets)
    label_x1 = max(ln[1] for ln in targets) + 12
    result: list[dict[str, str]] = []
    previous_actual = header_bottom
    for index, target_row in enumerate(targets):
        actual_row = next((a for a in actuals if a[0] > target_row[0]), None)
        if not actual_row:
            continue
        # 1つの指標の欄は、前の指標の「実績」行とこの「目標」行の中間から、
        # この「実績」行と次の「目標」行の中間まで。名前や定義は「目標」行より上から始まることがある
        top = (previous_actual + target_row[0]) / 2 if previous_actual > header_bottom else header_bottom
        next_target = targets[index + 1][0] if index + 1 < len(targets) else stop[0]
        bottom = (actual_row[0] + next_target) / 2
        previous_actual = actual_row[0]
        rows = [ln for ln in sorted(area) if top < ln[0] <= bottom]
        name = "".join(ln[3] for ln in rows if ln[2] < kind_head[1])
        if not name:
            continue
        unit = "".join(ln[3] for ln in rows if kind_head[1] - 2 <= ln[1] < label_x0)
        definition = "".join(ln[3] for ln in rows if ln[1] >= definition_x)

        def cell(row: Line, center: Optional[float]) -> str:
            if center is None:
                return ""
            hits = [ln[3] for ln in same_row(area, row[0])
                    if label_x1 < ln[1] < definition_x and abs((ln[1] + ln[2]) / 2 - center) <= 16]
            return hits[0] if hits else ""

        result.append({
            "label": name, "unit": unit, "definition": definition,
            "target": cell(target_row, year_x), "actual": cell(actual_row, year_x),
            "goal": cell(target_row, goal_x),
        })
    return result


def read_page(lines: list[Line], fiscal_year: int) -> dict[str, Any]:
    """評価シート1頁分を読む。fiscal_year は実施年度の西暦（指標表の列を選ぶ）。"""
    right_x = right_edge(lines)
    full_text = "\n".join(ln[3] for ln in sorted(lines, key=lambda ln: (ln[1] >= right_x, ln[0], ln[1])))
    period_row = find(lines, "事業期間", right_x)
    legal_label = find(lines, "根拠法令要綱", right_x)
    purpose_head = next((ln for ln in lines if ln[3].startswith("２") and "目的・概要" in ln[3]), None)
    legal = ""
    if period_row and purpose_head:
        legal_x = legal_label[2] if legal_label else 100
        legal = "".join(ln[3] for ln in sorted(lines)
                        if period_row[0] + 4 < ln[0] < purpose_head[0] and legal_x <= ln[1] < right_x
                        and ln is not legal_label)
    overview_end = next((ln[3] for ln in lines if ln[3].startswith("３") and "実績・課題" in ln[3]), "")
    purpose = block_text(lines, "【目的】", ["【概要】", overview_end], right_x)
    overview = block_text(lines, "【概要】", [overview_end], right_x) if overview_end else ""
    if not purpose and overview_end:
        # 【目的】【概要】の小見出しが無いシートは、「目的・概要」欄全体を目的として持つ
        purpose = block_text(lines, "目的・概要", [overview_end], right_x)
    record: dict[str, Any] = {
        "name": right_of(lines, "小事業名", right_x),
        # 会計（一般会計・国民健康保険事業会計など）。同じ名前の事業を見分けるのに使う。空欄なら次の「款」で止める
        "kaikei": right_of(lines, "会計", right_x, stop_at="款"),
        "section": right_of(lines, "担当課", right_x),
        "unit": right_of(lines, "担当係", right_x),
        "account": {"kan": right_of(lines, "款", right_x), "kou": right_of(lines, "項", right_x),
                    "moku": right_of(lines, "目", right_x)},
        "jigyo": right_of(lines, "事業", right_x),
        "pillar": right_of(lines, "政策の柱", right_x),
        "period": right_of(lines, "事業期間", right_x, stop_at="関連する個別計画等"),
        "legal": legal,
        "purpose": purpose,
        "overview": overview,
        "indicators": indicators(lines, fiscal_year, right_x),
        "evaluation": final_evaluation(full_text),
    }
    record.update(settlement_total(lines, right_x))
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


def read_pdf(pdf: Path, department: str, year: EvaluationYear) -> list[dict[str, Any]]:
    """部署別の評価シートPDFを全頁読む。頁番号は1始まり。"""
    rows: list[dict[str, Any]] = []
    for index, lines in enumerate(page_lines(pdf), start=1):
        row = read_page(lines, year.fiscal_western)
        row["department"] = department
        row["page"] = index
        rows.append(row)
    return rows


# ── 取得と書き出し ─────────────────────────────────

def fetch(year: EvaluationYear) -> None:
    """評価シートPDFを公式サイトから取得する（1件ごとに2秒あける）。"""
    year.cache.mkdir(parents=True, exist_ok=True)
    for number, department in year.sheets:
        target = year.cache / f"s{number}.pdf"
        if target.exists():
            continue
        request = urllib.request.Request(year.pdf_base.format(n=number),
                                         headers={"User-Agent": "shinagawa-gikai-db (data build)"})
        try:
            with urllib.request.urlopen(request, timeout=60) as response:
                target.write_bytes(response.read())
        except OSError as error:
            raise SystemExit(f"{year.evaluation_year} {department} の評価シートを取得できませんでした: {error}") from error
        print(f"取得: {year.evaluation_year} {department} ({target.stat().st_size:,} bytes)")
        time.sleep(2)


def problems(row: dict[str, Any]) -> list[str]:
    """読み取れなかった項目を挙げる。空なら全項目そろっている。"""
    missing = [key for key in ("name", "section", "budgetYen", "settledYen", "rate", "evaluation") if row.get(key) in (None, "")]
    if row.get("error"):
        missing.append(row["error"])
    return missing


def build(year: EvaluationYear) -> dict[str, Any]:
    """1年度分の全部署の評価シートを読み、書き出す形にまとめる。"""
    projects: list[dict[str, Any]] = []
    issues: list[str] = []
    for number, department in year.sheets:
        pdf = year.cache / f"s{number}.pdf"
        if not pdf.exists():
            raise SystemExit(f"{pdf} がありません。先に --fetch で取得してください。")
        for row in read_pdf(pdf, department, year):
            gaps = problems(row)
            if gaps:
                issues.append(f"{department} {row['page']}頁 {row.get('name') or '（名称なし）'}: {'・'.join(gaps)}")
            row["id"] = f"{year.key}-{number}-{row['page']}"
            row["source"] = {
                "label": f"{year.evaluation_year}{year.sheet_label}（{department}）",
                "url": year.pdf_base.format(n=number) + f"#page={row['page']}",
                "locator": f"{row['page']}頁",
            }
            row.pop("error", None)
            projects.append(row)
    # 公式の集計と件数・評価区分の内訳が合うか（合わなければ読み違いがある）
    counts = {code: sum(1 for p in projects if (p.get("evaluation") or {}).get("code") == code)
              for code in year.official_evaluations}
    if len(projects) != year.official_total or counts != year.official_evaluations:
        issues.append(f"公式集計と不一致: 件数{len(projects)}（公式{year.official_total}）"
                      f"評価{counts}（公式{year.official_evaluations}）")
    return {"projects": projects, "issues": issues}


# ── 年度をまたぐ対応づけ ───────────────────────────

def pair_links(newer: list[dict[str, Any]], older: list[dict[str, Any]]) -> dict[str, str]:
    """隣り合う2年度で同じ事業を対応づける（新しい年度のID → 古い年度のID）。

    小事業名と会計の組が両年度で1件ずつなら結ぶ。同じ組が複数あるときは担当課まで含めて
    1件ずつになったものだけ結ぶ。それでも決まらないもの、名前が変わったものは結ばない。
    """
    links: dict[str, str] = {}
    used: set[str] = set()
    keys = (lambda r: (r.get("name"), r.get("kaikei")),
            lambda r: (r.get("name"), r.get("kaikei"), r.get("section")))
    for key in keys:
        newer_count = Counter(key(r) for r in newer)
        older_count = Counter(key(r) for r in older)
        older_by_key = {key(r): r for r in older}
        for row in newer:
            k = key(row)
            if row["id"] in links or not row.get("name") or newer_count[k] != 1 or older_count[k] != 1:
                continue
            match = older_by_key[k]["id"]
            if match not in used:
                links[row["id"]] = match
                used.add(match)
    return links


def link_years(by_year: dict[str, list[dict[str, Any]]]) -> None:
    """各事業に、対応づいた他年度の要約（予算・決算・執行率・評価）を history として付ける。

    by_year は評価年度のキー（r07 など）→ その年度の事業。隣り合う年度どうしで結び、鎖にする。
    """
    order = sorted(by_year, reverse=True)
    parent: dict[str, str] = {}

    def root(id_: str) -> str:
        while parent.get(id_, id_) != id_:
            id_ = parent[id_]
        return id_

    for newer, older in zip(order, order[1:]):
        for a, b in pair_links(by_year[newer], by_year[older]).items():
            parent[root(b)] = root(a)
    rows = {row["id"]: (year, row) for year in order for row in by_year[year]}
    chains: dict[str, list[str]] = {}
    for year in order:
        for row in by_year[year]:
            chains.setdefault(root(row["id"]), []).append(row["id"])
    for members in chains.values():
        for id_ in members:
            rows[id_][1]["history"] = [{
                "id": other, "year": rows[other][0],
                "budgetYen": rows[other][1].get("budgetYen"), "settledYen": rows[other][1].get("settledYen"),
                "rate": rows[other][1].get("rate"), "evaluation": (rows[other][1].get("evaluation") or {}).get("code"),
            } for other in members if other != id_]


def write(year: EvaluationYear, data: dict[str, Any]) -> None:
    """data/jimujigyo-<年度>.js に書き出す。"""
    payload = {
        "key": year.key,
        "evaluationYear": year.evaluation_year,
        "fiscalYear": year.fiscal_year,
        "resultUrl": year.result_page,
        "note": "品川区の事務事業評価シート（PDF）から機械的に読み取った値です。正確な内容は各シートの該当頁で確認してください。",
        "count": len(data["projects"]),
        "projects": data["projects"],
    }
    body = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    year.out.write_text(
        f"// 品川区議会DB データファイル（事業ごとの記録：{year.evaluation_year}事務事業評価＝{year.fiscal_year}実施事業）\n"
        "// scripts/prepare_jimujigyo.py が評価シートPDFから生成。手で編集しない。\n"
        f"window.{year.variable} = {body};\n",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--fetch", action="store_true", help="評価シートPDFを取得する")
    parser.add_argument("--year", choices=sorted(YEARS), help="--fetch で1年度だけ取得する（省略時は全年度）")
    args = parser.parse_args()
    if args.fetch:
        for year in [YEARS[args.year]] if args.year else YEARS.values():
            fetch(year)
        return 0
    # 年度をまたいで同じ事業をつなぐので、書き出しは常に全年度まとめて行う
    built = {key: build(year) for key, year in YEARS.items()}
    link_years({key: data["projects"] for key, data in built.items()})
    failed = False
    for key, data in built.items():
        year = YEARS[key]
        write(year, data)
        linked = sum(1 for row in data["projects"] if row.get("history"))
        print(f"{year.evaluation_year}: {len(data['projects'])}件（他年度とつながった{linked}件）を書き出しました: "
              f"{year.out.relative_to(ROOT)}")
        for issue in data["issues"]:
            print("要確認:", issue, file=sys.stderr)
            failed = failed or issue.startswith("公式集計と不一致")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
