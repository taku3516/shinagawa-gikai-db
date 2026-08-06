#!/usr/bin/env python3
"""請願・陳情を1件ずつ追える台帳（data/petitions.js）を生成する。

年データ（data/h13.js〜data/r08.js と data/*-complete.js）には、請願・陳情が
「どの定例会で、どう議決されたか」という単位で入っている。同じ請願・陳情が
継続審査で複数の定例会にまたがると、その数だけ別々の行として現れる。

このスクリプトは、

1. 受理番号（例: 令和5年陳情第31号）で名寄せして1件＝1案件にまとめ、
2. 定例会ごとの議決結果を受理順の審査経過として並べ、
3. 委員会会議録データ（data/*-committees-part-*.js）の議題名から
   同じ受理番号を参照している委員会審査を紐付ける。

外部サイトへは接続せず、リポジトリ内の公開済みデータだけを読む。番号が
欠けている行は、委員会会議録の議題名と件名が一致する場合にかぎり元号年を
補い（推測での補完はしない）、確定できないものは未確定として書き出す。
"""

from __future__ import annotations

import argparse
import json
import re
from collections import OrderedDict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data"
OUT_PATH = DATA / "petitions.js"
OFFICIAL_PATH = DATA / "petitions-official.js"
LEDGER_PATH = ROOT / "docs" / "petition-inventory.md"

DECODER = json.JSONDecoder()
ZEN_DIGITS = str.maketrans("０１２３４５６７８９", "0123456789")

# 受理番号（例: 令和5年 陳情第31号 / 平成30年請願第1号 / 令和2年陳情第48-2号）
NUMBER_RE = re.compile(r"^(平成|令和)(元|\d{1,2})年(請願|陳情)第(\d{1,3})(?:-(\d{1,2}))?号$")
# 元号年が欠けた番号（例: 陳情第5号）。年データの取り込み時に列がずれた行で現れる。
BARE_NUMBER_RE = re.compile(r"^(請願|陳情)第(\d{1,3})(?:-(\d{1,2}))?号$")
# 元号年だけの値（例: 令和元年）
ERA_ONLY_RE = re.compile(r"^(平成|令和)(元|\d{1,2})年$")
# 委員会の議題名に現れる受理番号
REFERENCE_RE = re.compile(r"(平成|令和)(元|\d{1,2})年(請願|陳情)第(\d{1,3})(?:-(\d{1,2}))?号")

ERA_BASE = {"平成": 1988, "令和": 2018}
ERA_PREFIX = {"平成": "h", "令和": "r"}
KIND_PREFIX = {"請願": "s", "陳情": "c"}

# 議決結果の分類。公式ページの表記をそのまま残しつつ、一覧の絞り込み用に束ねる。
CLOSED_RESULTS = ("採択", "不採択", "趣旨採択", "取り下げ", "撤回", "みなし")
PENDING_RESULTS = ("継続審査", "審査未了", "閉会中の継続審査")


def compact(value: str) -> str:
    """全角数字を半角にし、空白を落とした比較用の文字列を返す。"""
    return re.sub(r"\s+", "", (value or "").translate(ZEN_DIGITS))


def title_key(value: str) -> str:
    """件名の表記ゆれ（読点・かっこ・空白）を落とした照合用キーを返す。"""
    return re.sub(r"[\s、。，．,.・「」『』（）()［］\[\]〔〕【】]", "", compact(value))


def read_json_value(text: str, marker: str):
    """`marker` の直後に現れる JSON 値（配列またはオブジェクト）を読む。"""
    index = text.find(marker)
    if index < 0:
        return None
    cursor = index + len(marker)
    while cursor < len(text) and text[cursor] not in "[{":
        if not text[cursor].isspace() and text[cursor] not in "=:":
            return None
        cursor += 1
    if cursor >= len(text):
        return None
    value, _ = DECODER.raw_decode(text, cursor)
    return value


def load_site() -> dict:
    text = (DATA / "site.js").read_text(encoding="utf-8")
    return {"years": read_json_value(text, '"years"') or []}


def load_year(meta: dict) -> dict:
    """年データ本体を読み、`-complete.js` があれば請願・陳情を差し替える。"""
    path = DATA / Path(meta["file"]).name
    text = path.read_text(encoding="utf-8")
    year = read_json_value(text, 'years["%s"]' % meta["id"])
    if year is None:
        raise SystemExit(f"{path.name} から年データを読み取れませんでした")
    supplement = meta.get("supplement")
    if supplement:
        sup_text = (DATA / Path(supplement).name).read_text(encoding="utf-8")
        petitions = read_json_value(sup_text, "year.petitions =")
        if petitions is not None:
            year["petitions"] = petitions
    return year


def load_committee_sessions(year_id: str) -> list[dict]:
    """委員会データの分割ファイルから会議一覧を読む（質疑本文は使わない）。"""
    sessions: list[dict] = []
    for path in sorted(DATA.glob(f"{year_id}-committees-part-*.js")):
        value = read_json_value(path.read_text(encoding="utf-8"), "push(...")
        if value:
            sessions.extend(value)
    return sessions


def parse_number(value: str):
    """受理番号を (元号, 年, 種別, 番号, 枝番) に分解する。読めなければ None。"""
    match = NUMBER_RE.match(compact(value))
    if not match:
        return None
    era, year_text, kind, number, branch = match.groups()
    return era, 1 if year_text == "元" else int(year_text), kind, int(number), branch


def era_label(era: str, year_number: int) -> str:
    return f"{era}元年" if year_number == 1 else f"{era}{year_number}年"


def western_year(era: str, year_number: int) -> int:
    return ERA_BASE[era] + year_number


def petition_key(era: str, year_number: int, kind: str, number: int, branch: str | None) -> str:
    suffix = f"-{branch}" if branch else ""
    return f"{era}{year_number}-{kind}-{number}{suffix}"


def petition_id(era: str, year_number: int, kind: str, number: int, branch: str | None) -> str:
    suffix = f"-{branch}" if branch else ""
    return f"p-{ERA_PREFIX[era]}{year_number:02d}-{KIND_PREFIX[kind]}{number}{suffix}"


def number_label(era: str, year_number: int, kind: str, number: int, branch: str | None) -> str:
    suffix = f"-{branch}" if branch else ""
    return f"{era_label(era, year_number)}{kind}第{number}{suffix}号"


def result_status(result: str) -> str:
    """議決結果を「審議終了 / 継続審査 / 結果未収録」に束ねる。"""
    if not result:
        return "結果未収録"
    if any(word in result for word in PENDING_RESULTS):
        return "継続審査"
    if any(word in result for word in CLOSED_RESULTS):
        return "審議終了"
    return "その他"


def normalize_records(meta: dict, year: dict) -> tuple[list[dict], list[dict]]:
    """1年分の請願・陳情行を正規化する。戻り値は (正規化済み, 取り込めなかった行)。

    `-complete.js` の一部の年は、公式ページの表から取り込む際に列がずれており、
    受理番号の欄に元号年だけ（または空）が入り、議決結果の欄に「陳情第5号」の
    ような番号が入っている。その形が明確な行は番号として読み直し、議決結果は
    「未収録」として扱う（結果を推測して埋めることはしない）。
    """
    meeting_names = {m.get("id"): m.get("name") for m in year.get("meetings") or []}
    meeting_order = {m.get("id"): i for i, m in enumerate(year.get("meetings") or [])}
    records: list[dict] = []
    dropped: list[dict] = []
    # 番号欄が壊れた行が重複かどうかを見分けるため、読める行の件名を先に集める
    readable_titles = {
        (raw.get("meetingId") or "", title_key(raw.get("title") or ""))
        for raw in year.get("petitions") or []
        if parse_number(raw.get("number") or "")
    }

    for raw in year.get("petitions") or []:
        raw_number = raw.get("number") or ""
        raw_result = raw.get("result") or ""
        title = (raw.get("title") or "").strip()
        parsed = parse_number(raw_number)
        result = raw_result.strip()
        number_note = ""

        if parsed is None:
            bare = BARE_NUMBER_RE.match(compact(raw_result))
            era_only = ERA_ONLY_RE.match(compact(raw_number))
            if bare and (era_only or not compact(raw_number)):
                # 列ずれ行。番号は結果欄の値、議決結果は公式ページから取り込めていない。
                kind, number, branch = bare.group(1), int(bare.group(2)), bare.group(3)
                result = ""
                number_note = "公式ページの取り込み時に列がずれているため、議決結果は未収録です。"
                if era_only:
                    era = era_only.group(1)
                    year_number = 1 if era_only.group(2) == "元" else int(era_only.group(2))
                    parsed = (era, year_number, kind, number, branch)
                else:
                    parsed = (None, None, kind, number, branch)
            elif len(compact(raw_number)) > 60 and (raw.get("meetingId") or "", title_key(title)) in readable_titles:
                # 番号欄に表の列全体が流れ込んだ行。同じ会議に同じ件名の正常な行があるため重複。
                dropped.append({"reason": "番号欄が壊れた重複行", "record": raw})
                continue
            else:
                dropped.append({"reason": "受理番号を読み取れない行", "record": raw})
                continue

        era, year_number, kind, number, branch = parsed
        meeting_id = raw.get("meetingId") or ""
        records.append({
            "yearId": meta["id"],
            "yearLabel": meta["label"],
            "meetingId": meeting_id,
            "meetingName": meeting_names.get(meeting_id, meeting_id),
            "meetingOrder": meeting_order.get(meeting_id, 99),
            "era": era,
            "eraYear": year_number,
            "kind": kind,
            "number": number,
            "branch": branch,
            "title": title,
            "result": result,
            "note": number_note,
            "links": raw.get("links") or [],
        })

    # 同じ会議に同じ件名・結果の行が2つ以上ある場合は、後から現れた壊れた行を落とす。
    return records, dropped


def collect_committee_references(year_id: str) -> list[dict]:
    """委員会の議題名から請願・陳情の参照を抜き出す。"""
    references: list[dict] = []
    for session in load_committee_sessions(year_id):
        for topic in session.get("topics") or []:
            topic_title = topic.get("title") or ""
            matches = list(REFERENCE_RE.finditer(compact(topic_title)))
            if not matches:
                continue
            seen = set()
            for match in matches:
                era, year_text, kind, number, branch = match.groups()
                year_number = 1 if year_text == "元" else int(year_text)
                key = petition_key(era, year_number, kind, int(number), branch)
                if key in seen:
                    continue
                seen.add(key)
                references.append({
                    "key": key,
                    "era": era,
                    "eraYear": year_number,
                    "kind": kind,
                    "number": int(number),
                    "branch": branch,
                    "yearId": year_id,
                    "sessionId": session.get("id"),
                    "meetingId": session.get("meetingId"),
                    "committee": session.get("committee"),
                    "date": session.get("date"),
                    "dateIso": session.get("dateIso"),
                    "status": session.get("status"),
                    "topicId": topic.get("id"),
                    "topicTitle": topic_title,
                    "exchanges": len(topic.get("exchanges") or []),
                })
    return references


def load_official() -> list[dict]:
    """公式サイトから取得した情報（scripts/fetch_petitions.py の出力）を読む。

    ファイルが無い場合は空で返す。GitHub Actions で収集する前でも、年データだけで
    台帳を作れるようにするため。
    """
    if not OFFICIAL_PATH.exists():
        return []
    items: list[dict] = []
    for line in OFFICIAL_PATH.read_text(encoding="utf-8").splitlines():
        stripped = line.strip().rstrip(",")
        if stripped.startswith("{") and stripped.endswith("}"):
            try:
                items.append(json.loads(stripped))
            except json.JSONDecodeError:
                continue
    return items


def official_by_key(official: list[dict]) -> dict[str, dict]:
    return {
        petition_key(item["era"], item["eraYear"], item["kind"], item["number"], item["branch"]): item
        for item in official
    }


def resolve_era_from_official(records: list[dict], official: list[dict]) -> int:
    """元号年が欠けた行を、公式ページの一覧と件名が一致する場合に補う。

    公式ページは受理番号と件名を並べて掲載しているため、委員会会議録より確実。
    """
    by_kind_number: dict[tuple[str, int, str | None], list[dict]] = {}
    for item in official:
        by_kind_number.setdefault((item["kind"], item["number"], item["branch"]), []).append(item)

    resolved = 0
    for record in records:
        if record["era"]:
            continue
        candidates = by_kind_number.get((record["kind"], record["number"], record["branch"]), [])
        key = title_key(record["title"])
        matched = [item for item in candidates if title_key(item.get("title", "")) == key]
        if len(matched) != 1:
            # 件名が完全一致しない場合は、先頭12文字での一致まで許す（表記ゆれ対策）
            matched = [
                item for item in candidates
                if key[:12] and title_key(item.get("title", "")).startswith(key[:12])
            ]
        if len({(item["era"], item["eraYear"]) for item in matched}) != 1:
            continue
        record["era"] = matched[0]["era"]
        record["eraYear"] = matched[0]["eraYear"]
        record["note"] = " ".join(filter(None, [
            record.get("note", ""),
            "受理年は公式ページの一覧から補いました。",
        ])).strip()
        resolved += 1
    return resolved


def resolve_missing_era(records: list[dict], references: list[dict]) -> int:
    """元号年が欠けた行を、委員会の議題名から一意に決まる場合だけ補う。"""
    by_kind_number: dict[tuple[str, int, str | None], list[dict]] = {}
    for reference in references:
        by_kind_number.setdefault(
            (reference["kind"], reference["number"], reference["branch"]), []
        ).append(reference)

    resolved = 0
    for record in records:
        if record["era"]:
            continue
        candidates = by_kind_number.get((record["kind"], record["number"], record["branch"]), [])
        eras = {(item["era"], item["eraYear"]) for item in candidates}
        if len(eras) == 1:
            era, year_number = next(iter(eras))
        else:
            # 複数の年に同じ番号がある場合は、件名が一致する議題だけを見る。
            key = title_key(record["title"])[:12]
            narrowed = {
                (item["era"], item["eraYear"])
                for item in candidates
                if key and key in title_key(item["topicTitle"])
            }
            if len(narrowed) != 1:
                continue
            era, year_number = next(iter(narrowed))
        record["era"] = era
        record["eraYear"] = year_number
        record["note"] = " ".join(filter(None, [
            record.get("note", ""),
            "受理年は委員会会議録の議題名から補いました。",
        ])).strip()
        resolved += 1
    return resolved


def build_meetings(records: list[dict]) -> "OrderedDict[str, dict]":
    """定例会の表示名と公式リンクの一覧を作る。

    同じ定例会の請願・陳情はすべて同じ公式ページを指すため、案件ごとに持たずに
    ここへ集約する（生成ファイルの肥大化を避ける）。
    """
    meetings: "OrderedDict[str, dict]" = OrderedDict()
    for record in sorted(records, key=lambda r: (r["yearId"], r["meetingOrder"])):
        meeting = meetings.get(record["meetingId"])
        if meeting is None:
            meetings[record["meetingId"]] = {
                "yearId": record["yearId"],
                "yearLabel": record["yearLabel"],
                "name": record["meetingName"],
                "links": record["links"],
            }
        elif not meeting["links"]:
            meeting["links"] = record["links"]
    return meetings


OFFICIAL_FIELDS = (
    "committee", "receivedDate", "receivedDateIso", "referredDate",
    "committeeVoteDate", "plenaryVoteDate", "committeeResult", "plenaryResult", "note",
)


def committee_name(value: str) -> str:
    """公式ページの表記（例:「文教」）を委員会名（例:「文教委員会」）にそろえる。"""
    value = (value or "").strip()
    if not value:
        return ""
    return value if value.endswith("委員会") else f"{value}委員会"


def official_block(item: dict) -> dict:
    """公式ページ由来の項目だけを取り出す（空の項目は落とす）。"""
    block = {field: item.get(field, "") for field in OFFICIAL_FIELDS if item.get(field)}
    if item.get("sourceUrl"):
        block["url"] = item["sourceUrl"]
    return block


def build_items(records: list[dict], references: list[dict], official: list[dict]) -> list[dict]:
    """受理番号で名寄せし、審査経過・委員会審査・公式ページの情報を持つ一覧にする。"""
    references_by_key: dict[str, list[dict]] = {}
    for reference in references:
        references_by_key.setdefault(reference["key"], []).append(reference)
    official_index = official_by_key(official)

    grouped: "OrderedDict[str, dict]" = OrderedDict()
    for record in records:
        if record["era"]:
            key = petition_key(record["era"], record["eraYear"], record["kind"], record["number"], record["branch"])
            item_id = petition_id(record["era"], record["eraYear"], record["kind"], record["number"], record["branch"])
            label = number_label(record["era"], record["eraYear"], record["kind"], record["number"], record["branch"])
            accepted_year = era_label(record["era"], record["eraYear"])
            sort_year = western_year(record["era"], record["eraYear"])
        else:
            # 受理年が確定しない行は、種別・番号・件名が完全に一致するものだけまとめる。
            key = f"未確定-{record['kind']}-{record['number']}-{title_key(record['title'])}"
            item_id = f"p-x-{record['yearId']}-{KIND_PREFIX[record['kind']]}{record['number']}"
            label = f"{record['kind']}第{record['number']}号"
            accepted_year = ""
            sort_year = 0

        item = grouped.get(key)
        if item is None:
            item = {
                "id": item_id,
                "key": key,
                "kind": record["kind"],
                "number": record["number"],
                "branch": record["branch"],
                "acceptedYear": accepted_year,
                "numberLabel": label,
                "sortYear": sort_year,
                "title": record["title"],
                "history": [],
                "committees": [],
                "notes": [],
            }
            grouped[key] = item
        if record["note"] and record["note"] not in item["notes"]:
            item["notes"].append(record["note"])
        item["history"].append({
            "yearId": record["yearId"],
            "meetingId": record["meetingId"],
            "meetingName": record["meetingName"],
            "meetingOrder": record["meetingOrder"],
            "title": record["title"],
            "result": record["result"],
        })

    # id の重複（受理年が確定しない行）に連番を振る
    used_ids: dict[str, int] = {}
    for item in grouped.values():
        base_id = item["id"]
        count = used_ids.get(base_id, 0)
        used_ids[base_id] = count + 1
        if count:
            item["id"] = f"{base_id}-{count + 1}"

    # 公式ページにしかない案件（年データが平成30年からのため、平成27〜29年など）を足す
    known_keys = set(grouped.keys())
    for item in official:
        key = petition_key(item["era"], item["eraYear"], item["kind"], item["number"], item["branch"])
        if key in known_keys:
            continue
        grouped[key] = {
            "id": petition_id(item["era"], item["eraYear"], item["kind"], item["number"], item["branch"]),
            "key": key,
            "kind": item["kind"],
            "number": item["number"],
            "branch": item["branch"],
            "acceptedYear": era_label(item["era"], item["eraYear"]),
            "numberLabel": number_label(item["era"], item["eraYear"], item["kind"], item["number"], item["branch"]),
            "sortYear": western_year(item["era"], item["eraYear"]),
            "title": item.get("title", ""),
            "history": [],
            "committees": [],
            "notes": ["この案件は公式ページの一覧から収録しています。定例会ごとの審査経過は未収録です。"],
        }

    for item in grouped.values():
        item["history"].sort(key=lambda h: (h["yearId"], h["meetingOrder"]))
        official_item = official_index.get(item.get("key", ""))
        if official_item:
            item["official"] = official_block(official_item)
            if not item["title"]:
                item["title"] = official_item.get("title", "")
        if not item["history"]:
            # 公式ページだけの案件。定例会ごとの記録がないため、公式の議決結果を使う。
            official_data = item.get("official", {})
            item["firstYearId"] = ""
            item["firstMeetingId"] = ""
            item["firstMeetingLabel"] = official_data.get("referredDate", "") or "公式ページのみ"
            item["latestMeetingLabel"] = official_data.get("plenaryVoteDate", "") or "公式ページのみ"
            item["latestResult"] = official_data.get("plenaryResult") or official_data.get("committeeResult") or ""
            item["status"] = result_status(item["latestResult"])
            item["meetingCount"] = 0
            item["yearIds"] = []
            referred = committee_name(official_data.get("committee", ""))
            item["committeeNames"] = [referred] if referred else []
            item["exchangeCount"] = 0
            item.pop("key", None)
            continue
        first = item["history"][0]
        last = item["history"][-1]
        # 件名は最初に付託された定例会の表記を採る（公式ページの表記ゆれ対策）
        item["title"] = first["title"] or item["title"] or ""
        item["firstYearId"] = first["yearId"]
        item["firstMeetingId"] = first["meetingId"]
        item["firstMeetingLabel"] = first["meetingName"]
        item["latestResult"] = last["result"]
        item["latestMeetingLabel"] = last["meetingName"]
        if not item["latestResult"]:
            # 年データの取り込みで議決結果が欠けている行は、公式ページの結果で補う
            official_data = item.get("official", {})
            fallback = official_data.get("plenaryResult") or official_data.get("committeeResult") or ""
            if fallback:
                item["latestResult"] = fallback
                item["notes"] = [
                    note for note in item["notes"]
                    if "議決結果は未収録" not in note
                ] + ["議決結果は公式ページの一覧から補いました。"]
        item["status"] = result_status(item["latestResult"])
        item["meetingCount"] = len(item["history"])
        item["yearIds"] = sorted({entry["yearId"] for entry in item["history"]})
        # 定例会の名前とリンクは meetings 表から引く。件名が定例会ごとに違う場合だけ残す。
        item["history"] = [{
            "meetingId": entry["meetingId"],
            "result": entry["result"],
            **({"title": entry["title"]} if entry["title"] and entry["title"] != item["title"] else {}),
        } for entry in item["history"]]

        committees = references_by_key.get(item["key"], [])
        committees = sorted(committees, key=lambda c: (c.get("dateIso") or "", c.get("committee") or ""))
        item["committees"] = [{
            "yearId": c["yearId"],
            "sessionId": c["sessionId"],
            "committee": c["committee"],
            "date": c["date"],
            "dateIso": c["dateIso"],
            "status": c["status"],
            "topicId": c["topicId"],
            "topicTitle": c["topicTitle"],
            "exchanges": c["exchanges"],
        } for c in committees]
        # 委員会名は、会議録で質疑が見つかった委員会と、公式ページの付託先を合わせる
        names = {c["committee"] for c in committees if c.get("committee")}
        referred = committee_name(item.get("official", {}).get("committee", ""))
        if referred:
            names.add(referred)
        item["committeeNames"] = sorted(names)
        item["exchangeCount"] = sum(c["exchanges"] for c in committees)
        item.pop("key", None)

    items = list(grouped.values())
    items.sort(key=lambda item: (
        -item["sortYear"],
        0 if item["kind"] == "請願" else 1,
        item["number"],
        item["branch"] or "",
    ))
    return items


def js_payload(items: list[dict], meetings: dict, summary: dict) -> str:
    dumps = lambda value: json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    lines = [
        "// 品川区議会DB 請願・陳情の台帳（scripts/prepare_petitions.py で生成）",
        "window.SHINAGAWA_PETITIONS = {",
        f"  generatedAt: {dumps(summary['generatedAt'])},",
        f"  summary: {dumps(summary)},",
        f"  meetings: {dumps(meetings)},",
        "  items: [",
    ]
    lines += [f"    {dumps(item)}," for item in items]
    lines += ["  ]", "};", ""]
    return "\n".join(lines)


def ledger_markdown(summary: dict, items: list[dict], meetings: dict, dropped: list[dict]) -> str:
    lines = [
        "# 請願・陳情データの収録状況",
        "",
        "`scripts/prepare_petitions.py` が `data/petitions.js` を生成したときの記録です。",
        "外部サイトへは接続せず、リポジトリ内の年データと委員会データだけを読んでいます。",
        "",
        f"- 生成日: {summary['generatedAt']}",
        f"- 収録案件数: {summary['itemCount']}件（延べ審査 {summary['recordCount']}件）",
        f"- 委員会審査を紐付けられた案件: {summary['withCommittee']}件",
        f"- 受理年を委員会会議録から補った行: {summary['eraResolved']}件",
        f"- 受理年が未確定の案件: {summary['unresolvedItems']}件",
        f"- 取り込めなかった行: {len(dropped)}件",
        "",
        "## 年ごとの件数",
        "",
        "| 年 | 延べ審査件数 |",
        "|---|---|",
    ]
    for year_id, count in summary["recordsByYear"].items():
        lines.append(f"| {year_id} | {count} |")
    lines += [
        "",
        "## 議決結果の内訳（最新の審査時点）",
        "",
        "| 結果 | 件数 |",
        "|---|---|",
    ]
    for result, count in summary["resultCounts"].items():
        lines.append(f"| {result or '未収録'} | {count} |")

    unresolved = [item for item in items if not item["acceptedYear"]]
    if unresolved:
        lines += [
            "",
            "## 受理年が未確定の案件",
            "",
            "公式ページの取り込み時に受理番号の列がずれており、委員会会議録の議題名からも",
            "受理年を一意に決められなかったものです。番号と件名はそのまま掲載しています。",
            "",
            "| 番号 | 件名 | 定例会 |",
            "|---|---|---|",
        ]
        for item in unresolved:
            names = " / ".join(
                meetings.get(entry["meetingId"], {}).get("name", entry["meetingId"])
                for entry in item["history"]
            )
            lines.append(f"| {item['numberLabel']} | {item['title']} | {names} |")

    if dropped:
        lines += ["", "## 取り込めなかった行", "", "| 理由 | 件名 |", "|---|---|"]
        for entry in dropped:
            lines.append(f"| {entry['reason']} | {(entry['record'].get('title') or '')[:60]} |")

    lines += [
        "",
        "## 残っている作業（公式サイトへ接続できる環境で実施）",
        "",
        "このスクリプトはリポジトリ内のデータだけを読むため、公式ページにしかない項目は入っていません。",
        "次の作業には、品川区議会公式サイトへ到達できる環境（ネットワークを許可した環境）が必要です。",
        "",
        "| 残作業 | 参照先 |",
        "|---|---|",
        "| 提出者・受理日・付託委員会の取り込み | https://gikai.city.shinagawa.tokyo.jp/katsudou/petition |",
        "| 平成30年・令和元年の議決結果の補完（上記「受理年が未確定の案件」と結果未収録分） | 各定例会の公式ページ |",
        "| 平成13〜29年の請願・陳情の収集 | `scripts/build_heisei_year.py`（[実装準備・監査手順](history-expansion.md)） |",
        "",
        "必要なドメイン: `gikai.city.shinagawa.tokyo.jp` / `kaigiroku.city.shinagawa.tokyo.jp`",
        "",
    ]

    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true", help="ファイルを書かずに件数だけ表示する")
    args = parser.parse_args()

    site = load_site()
    official = load_official()
    records: list[dict] = []
    references: list[dict] = []
    dropped: list[dict] = []
    records_by_year: "OrderedDict[str, int]" = OrderedDict()

    for meta in site["years"]:
        if not meta.get("available"):
            continue
        year = load_year(meta)
        year_records, year_dropped = normalize_records(meta, year)
        year_references = collect_committee_references(meta["id"])
        resolve_missing_era(year_records, year_references)
        records.extend(year_records)
        references.extend(year_references)
        dropped.extend(year_dropped)
        if year_records:
            records_by_year[meta["id"]] = len(year_records)

    # 年をまたぐ継続審査があるため、年内で決まらなかった行は全年の参照でもう一度試す。
    era_resolved = sum(1 for record in records if "受理年は委員会会議録" in (record.get("note") or ""))
    era_resolved += resolve_missing_era(records, references)
    # 公式ページの一覧があれば、そちらでも受理年の補完を試みる（委員会会議録より確実）
    era_resolved += resolve_era_from_official(records, official)

    meetings = build_meetings(records)
    items = build_items(records, references, official)

    result_counts: "OrderedDict[str, int]" = OrderedDict()
    for item in items:
        result_counts[item["latestResult"]] = result_counts.get(item["latestResult"], 0) + 1
    summary = {
        "generatedAt": date.today().isoformat(),
        "itemCount": len(items),
        "recordCount": len(records),
        "withCommittee": sum(1 for item in items if item["committees"]),
        "eraResolved": era_resolved,
        "unresolvedItems": sum(1 for item in items if not item["acceptedYear"]),
        "withOfficial": sum(1 for item in items if item.get("official")),
        "officialOnlyItems": sum(1 for item in items if not item["history"]),
        "recordsByYear": records_by_year,
        "resultCounts": result_counts,
        "yearsCovered": sorted(records_by_year.keys(), reverse=True),
    }

    print(f"案件 {summary['itemCount']}件 / 延べ審査 {summary['recordCount']}件")
    print(f"委員会審査あり {summary['withCommittee']}件 / 受理年未確定 {summary['unresolvedItems']}件")
    print(f"取り込めなかった行 {len(dropped)}件")
    if args.dry_run:
        return

    OUT_PATH.write_text(js_payload(items, meetings, summary), encoding="utf-8")
    LEDGER_PATH.write_text(ledger_markdown(summary, items, meetings, dropped), encoding="utf-8")
    print(f"書き出し: {OUT_PATH.relative_to(ROOT)} / {LEDGER_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
