#!/usr/bin/env python3
"""品川区議会公式サイトから政務活動費の公開資料台帳を生成する。"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import urljoin


BASE_URL = "https://gikai.city.shinagawa.tokyo.jp/state-affairs"
PAGE_DEFS = (
    ("r07", "令和7年度", "通年", f"{BASE_URL}/r07"),
    ("r06", "令和6年度", "通年", f"{BASE_URL}/r06"),
    ("r05", "令和5年度", "5月〜翌3月", f"{BASE_URL}/r05_1"),
    ("r05", "令和5年度", "4月", f"{BASE_URL}/r05_2"),
    ("r04", "令和4年度", "通年", f"{BASE_URL}/r04"),
    ("r03", "令和3年度", "通年", f"{BASE_URL}/r03"),
)


def fetch(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "shinagawa-gikai-db/1.0 (public data indexer)"},
    )
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read().decode("utf-8")


def plain_text(markup: str) -> str:
    text = re.sub(r"<[^>]+>", " ", markup)
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def anchors(markup: str, base_url: str) -> list[dict[str, str]]:
    found = []
    pattern = re.compile(
        r"<a\b[^>]*?href=(?P<quote>['\"])(?P<href>.*?)(?P=quote)[^>]*>(?P<label>.*?)</a>",
        re.IGNORECASE | re.DOTALL,
    )
    for match in pattern.finditer(markup):
        label = plain_text(match.group("label"))
        if label:
            found.append({"label": label, "url": urljoin(base_url, html.unescape(match.group("href")))})
    return found


def parse_period(page_id: str, period_label: str, page_url: str) -> dict:
    markup = fetch(page_url)
    page_links = anchors(markup, page_url)
    summary = next((link for link in page_links if "収支一覧" in link["label"]), None)
    if not summary:
        raise RuntimeError(f"収支一覧PDFが見つかりません: {page_url}")

    recipients = []
    for row_match in re.finditer(r"<tr\b[^>]*>(.*?)</tr>", markup, re.IGNORECASE | re.DOTALL):
        row = row_match.group(1)
        name_match = re.search(r"<th\b[^>]*>(.*?)</th>", row, re.IGNORECASE | re.DOTALL)
        if not name_match:
            continue
        name = plain_text(name_match.group(1))
        documents = [
            link for link in anchors(row, page_url)
            if "政務活動のあらまし" in link["label"] or "収支報告書" in link["label"]
        ]
        if name and documents:
            recipients.append({
                "id": f"{page_id}-{len(recipients) + 1:02d}",
                "name": name,
                "kind": "議員" if "議員" in name else "会派",
                "documents": documents,
            })

    if not recipients:
        raise RuntimeError(f"会派・議員別資料が見つかりません: {page_url}")

    return {
        "id": page_id,
        "label": period_label,
        "sourceUrl": page_url,
        "summaryDocument": summary,
        "recipients": recipients,
    }


def parse_rules() -> list[dict[str, str]]:
    markup = fetch(BASE_URL)
    expected = ("政務活動費の交付に関する条例", "政務活動費に関する運用指針")
    result = []
    for link in anchors(markup, BASE_URL):
        if any(label in link["label"] for label in expected):
            result.append(link)
    if len(result) != 2:
        raise RuntimeError(f"条例・運用指針PDFの件数が想定外です: {len(result)}")
    return result


def build_data() -> dict:
    years: dict[str, dict] = {}
    for index, (year_id, year_label, period_label, page_url) in enumerate(PAGE_DEFS):
        page_id = page_url.rstrip("/").split("/")[-1]
        period = parse_period(page_id, period_label, page_url)
        if year_id not in years:
            years[year_id] = {
                "id": year_id,
                "label": year_label,
                "year": 2025 - index if year_id != "r05" else 2023,
                "periods": [],
            }
        years[year_id]["periods"].append(period)

    numeric_years = {"r07": 2025, "r06": 2024, "r05": 2023, "r04": 2022, "r03": 2021}
    for year_id, year in years.items():
        year["year"] = numeric_years[year_id]
        year["recipientCount"] = sum(len(period["recipients"]) for period in year["periods"])
        year["documentCount"] = sum(
            1 + sum(len(recipient["documents"]) for recipient in period["recipients"])
            for period in year["periods"]
        )

    return {
        "title": "政務活動費",
        "officialUrl": BASE_URL,
        "checkedAt": dt.date.today().isoformat(),
        "overview": {
            "description": "会派または議員が行う調査研究、研修、広報、会議への参加など、区政の課題や区民の意思を把握して区政に反映させる活動に必要な経費として交付されます。",
            "monthlyAmount": 190000,
            "caucusRule": "会派の所属議員数に月額19万円を乗じた金額",
            "memberRule": "議員1人につき月額19万円",
        },
        "rules": parse_rules(),
        "fiscalYears": list(years.values()),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="data/seimu.js")
    args = parser.parse_args()

    data = build_data()
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(data, ensure_ascii=False, indent=2)
    output.write_text(
        "// 品川区議会公式サイトの政務活動費公開資料（scripts/prepare_seimu.py で更新）\n"
        f"window.SHINAGAWA_SEIMU = {payload};\n",
        encoding="utf-8",
    )

    periods = sum(len(year["periods"]) for year in data["fiscalYears"])
    recipients = sum(year["recipientCount"] for year in data["fiscalYears"])
    documents = sum(year["documentCount"] for year in data["fiscalYears"])
    print(f"years={len(data['fiscalYears'])} periods={periods} recipients={recipients} documents={documents}")


if __name__ == "__main__":
    main()
