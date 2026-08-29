#!/usr/bin/env python3
"""会議録の発言者名（「安藤委員」「石田（ち）委員」）を議員IDに名寄せする。

本会議の `questions` には `memberId` があるが、委員会の `exchanges[].speaker` は
姓＋役職の文字列しか持たない。議員ごとに質疑を横断するには、この文字列を
議員IDへ解決する必要がある。

**名寄せは推測を含む処理なので、ここで黙って1名を選ばない。** 絞れなければ
`member_id=None` と候補を返し、呼んだ側（`check_speaker_resolution.py`）が
報告する。誤って1名に決めると、別人の発言が議員ページに混ざったまま、
画面上は正常に見えてしまう。

判定の材料は次の4つ。実データで99.5%が解ける。

1. **任期は区議選の当選記録から作る**（`data/elections.js`）。
   人物台帳の `seenIn` は「発言を確認できた年」で在職年ではないため使わない。
2. **会議の「日付」で判定する。** 区議選は4月下旬で、このDBの年度IDは暦年
   （令和7年＝2025年、1月の委員会が r07 に入る）。年単位で判定すると、
   選挙のあった年に前後で入れ替わった議員を取り違える。
3. **括弧の中身は名の先頭1文字**（石田（ち）→ちひろ、原（雅）→雅美）。
   漢字・かなのどちらでも書かれるので、別名も含めて突き合わせる。
4. **別名の姓でも引く**（阿久津委員＝あくつ広王、小芝＝こしば）。
   議員本人の届出表記が任期の途中で変わることがある。
"""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

# 任期の終わりが分からない（最新の一般選挙で当選した）ときの番人。
# 日付の文字列比較で必ず未来になる値を使い、None の分岐を増やさない。
OPEN_END = "9999-12-31"

# 発言者名の末尾に付く役職。長いものから順に見る（「副委員長」が「委員長」に
# 食われないように）。
ROLE_PATTERN = re.compile(r"(副委員長|委員長|副議長|議長|委員|議員)$")
# 同姓を区別する括弧。全角・半角のどちらも会議録に現れる。
BRACKET_PATTERN = re.compile(r"[（(]([^）)]*)[）)]$")
WHITESPACE_PATTERN = re.compile(r"[\s　]+")


class OverrideError(Exception):
    """上書き表の行が、選挙記録と食い違っているときに上げる。"""


def normalize(name: str) -> str:
    """姓名の間の空白を落として突き合わせ用の形にする。

    会議録・名簿・選挙記録で区切りが半角空白・全角空白・無しと揺れるため。
    """
    return WHITESPACE_PATTERN.sub("", str(name))


def split_name(name: str) -> tuple[str, str]:
    """氏名を（姓, 名）に分ける。空白で区切られていなければ名は空になる。"""
    parts = WHITESPACE_PATTERN.split(str(name).strip())
    return parts[0], "".join(parts[1:])


@dataclass(frozen=True)
class ParsedSpeaker:
    """発言者名を分解した結果。"""

    surname: str
    hint: str | None
    role: str | None


def parse_speaker(speaker: str) -> ParsedSpeaker:
    """「石田（ち）副委員長」→ 姓=石田 / ヒント=ち / 役職=副委員長。

    役職が付かない発言者（参考人・陳情者など）は、姓の欄にそのまま残る。
    呼んだ側で候補が見つからず「台帳にない」として報告される。
    """
    raw = str(speaker).strip()
    role_match = ROLE_PATTERN.search(raw)
    role = role_match.group(1) if role_match else None
    base = ROLE_PATTERN.sub("", raw)

    bracket_match = BRACKET_PATTERN.search(base)
    hint = bracket_match.group(1) if bracket_match else None
    surname = BRACKET_PATTERN.sub("", base).strip()
    return ParsedSpeaker(surname=surname, hint=hint, role=role)


def terms_from_elections(elections: list[dict]) -> dict[str, list[tuple[str, str]]]:
    """区議選の当選記録から、氏名ごとの任期（半開区間）を作る。

    任期は「当選した選挙の日」から「次の一般選挙の日」まで。補欠選挙の当選も
    任期になるが、次の一般選挙で切れる。落選は任期を生まない。
    区議選以外（都議選・衆院選など）は議員の在職と関係しないので除く。

    戻り値のキーは空白を落とした氏名。同じ人物が表記を変えている場合
    （高橋 慎司 → 高橋 しんじ）は別のキーになるので、呼んだ側で人物の
    全表記を引いて束ねる。
    """
    general: list[str] = sorted(
        e["electionDate"] for e in elections
        if str(e.get("title", "")).endswith("区議会議員選挙")
    )

    def next_general(after: str) -> str:
        """次の一般選挙の日。以降が無ければ番人を返す（現任期）。"""
        for date in general:
            if date > after:
                return date
        return OPEN_END

    terms: dict[str, list[tuple[str, str]]] = {}
    for election in elections:
        title = str(election.get("title", ""))
        # 補選も任期を生むので「区議会議員」を含むかで見る
        if "区議会議員" not in title:
            continue
        date = election.get("electionDate")
        if not date:
            continue
        for candidate in election.get("candidates") or []:
            if candidate.get("result") != "当選":
                continue
            key = normalize(candidate.get("name", ""))
            if not key:
                continue
            terms.setdefault(key, []).append((date, next_general(date)))
    return terms


def merge_spans(spans: list[tuple[str, str]]) -> list[tuple[str, str]]:
    """重なり・連続する任期をまとめる。落選を挟む切れ目はまとめない。"""
    merged: list[tuple[str, str]] = []
    for start, end in sorted(spans):
        if merged and start <= merged[-1][1]:
            previous_start, previous_end = merged[-1]
            merged[-1] = (previous_start, max(previous_end, end))
        else:
            merged.append((start, end))
    return merged


@dataclass
class Person:
    """名寄せの対象となる人物。"""

    id: str
    name: str
    forms: list[str] = field(default_factory=list)      # 本名・かな・別名
    terms: list[tuple[str, str]] = field(default_factory=list)

    def in_office(self, date: str) -> bool:
        return any(start <= date < end for start, end in self.terms)

    def given_names(self) -> list[str]:
        """括弧のヒントと突き合わせる「名」の候補。

        別名は「阿久津広王」のように区切りが無いことがあるので、本名の姓・
        かなの姓を手がかりに切り落とす。
        """
        surnames = {split_name(form)[0] for form in self.forms if split_name(form)[1]}
        out: list[str] = []
        for form in self.forms:
            surname, given = split_name(form)
            if given:
                out.append(given)
                continue
            for known in surnames:
                if known and form.startswith(known) and len(form) > len(known):
                    out.append(form[len(known):])
        return [g for g in out if g]

    def surnames(self) -> list[str]:
        """姓の索引に載せる表記。別名の姓も含める。"""
        out: list[str] = []
        givens = {split_name(form)[1] for form in self.forms if split_name(form)[1]}
        for form in self.forms:
            surname, given = split_name(form)
            if given:
                out.append(surname)
                continue
            # 区切りが無い別名は、既知の「名」を後ろから削って姓を得る
            flat = normalize(form)
            for known in givens:
                if known and flat.endswith(known) and len(flat) > len(known):
                    out.append(flat[: -len(known)])
        return [s for s in out if s]


@dataclass
class Resolution:
    """1件の解決結果。解けなかった理由も持つ。"""

    speaker: str
    date: str
    member_id: str | None = None
    reason: str = ""
    candidates: list[str] = field(default_factory=list)
    by_override: bool = False

    def describe(self) -> str:
        if self.member_id:
            suffix = "（上書き表）" if self.by_override else ""
            return f"{self.date} {self.speaker} → {self.member_id}{suffix}"
        candidates = f" 候補: {', '.join(self.candidates)}" if self.candidates else ""
        return f"{self.date} {self.speaker} → 未解決: {self.reason}{candidates}"


class Registry:
    """人物台帳と選挙記録から、発言者名を議員IDに解決する。"""

    def __init__(self, people: list[Person],
                 overrides: dict[tuple[str, str], str] | None = None) -> None:
        self.people = people
        self.by_id = {person.id: person for person in people}
        self.overrides = dict(overrides or {})
        self._by_surname: dict[str, list[Person]] = {}
        for person in people:
            for surname in set(person.surnames()):
                self._by_surname.setdefault(surname, []).append(person)

    # -------------------------------------------------------------- 組み立て

    @classmethod
    def from_sources(cls, people: list[dict], kana_by_id: dict[str, str],
                     elections: list[dict], former_by_id: dict[str, dict] | None = None,
                     overrides: dict[tuple[str, str], str] | None = None) -> "Registry":
        """台帳・かな・元職名簿・選挙記録から組み立てる。

        `kana_by_id` は現職名簿の `kana`、`former_by_id` は元職名簿。どちらも
        その人物の別表記を増やすためだけに使う。在職期間には使わない
        （元職名簿の `serviceHistory` は表示用の文字列で、落選を挟む任期が
        連続表記になっていることがある）。
        """
        terms_by_name = terms_from_elections(elections)
        former_by_id = former_by_id or {}

        built: list[Person] = []
        for entry in people:
            person_id = entry.get("id")
            if not person_id:
                continue
            forms = [entry.get("name", "")]
            kana = kana_by_id.get(person_id)
            if kana:
                forms.append(kana)
            former = former_by_id.get(person_id)
            if former and former.get("name"):
                forms.append(former["name"])
            forms.extend(str(alias) for alias in (entry.get("aliases") or []))
            forms = [form for form in dict.fromkeys(forms) if form]

            spans: list[tuple[str, str]] = []
            for form in {normalize(form) for form in forms}:
                spans.extend(terms_by_name.get(form, []))
            built.append(Person(id=person_id, name=entry.get("name", ""),
                                forms=forms, terms=merge_spans(spans)))
        return cls(built, overrides=overrides)

    @classmethod
    def from_data_dir(cls, root: Path | None = None,
                      overrides: dict[tuple[str, str], str] | None = None) -> "Registry":
        """`data/` の名簿・選挙記録を読んで組み立てる。"""
        data = (root or ROOT) / "data"
        people = _load_js(data / "people.js", "peopleData")["people"]
        members = _load_js(data / "members.js", "membersData")["members"]
        former_data = _load_js(data / "former-members.js", "formerMembersData")
        former_list = former_data.get("formerMembers") or former_data.get("members") or []
        elections = _load_js(data / "elections.js", "electionsData")["elections"]

        kana_by_id = {m["id"]: m["kana"] for m in members if m.get("id") and m.get("kana")}
        former_by_id = {f["id"]: f for f in former_list if f.get("id")}
        return cls.from_sources(people=people, kana_by_id=kana_by_id, elections=elections,
                                former_by_id=former_by_id, overrides=overrides)

    # ------------------------------------------------------------------ 解決

    def resolve(self, speaker: str, date: str) -> Resolution:
        """発言者名と会議の日付から議員IDを決める。

        絞れなかったときは `member_id=None` のまま理由と候補を返す。
        ここで1名に決め打たないことが、この処理の一番の役割。
        """
        result = Resolution(speaker=speaker, date=date)

        override = self.overrides.get((date, speaker))
        if override:
            result.member_id = override
            result.by_override = True
            return result

        parsed = parse_speaker(speaker)
        candidates = self._by_surname.get(parsed.surname, [])
        if not candidates:
            result.reason = f"姓「{parsed.surname}」が人物台帳にない"
            return result

        # 括弧のヒントで先に絞る。誰にも当たらなければ絞り込みを使わない
        # （表記の揺れでヒントを拾えないことがあるため、候補は残す）。
        if parsed.hint:
            by_hint = [p for p in candidates
                       if any(g.startswith(parsed.hint) for g in p.given_names())]
            if by_hint:
                candidates = by_hint

        in_office = [p for p in candidates if p.in_office(date)]
        if len(in_office) == 1:
            result.member_id = in_office[0].id
            return result
        if not in_office:
            result.reason = "候補はいるが、この日に在職している人がいない"
            result.candidates = sorted(p.id for p in candidates)
            return result

        result.reason = f"同姓{len(in_office)}名を絞れない"
        result.candidates = sorted(p.id for p in in_office)
        return result

    # ------------------------------------------------------------ 上書き表の検査

    def validate_overrides(self) -> None:
        """上書き表の行が選挙記録と矛盾していないか確かめる。

        手で書く表なので、議員IDの打ち間違いと、在職していない人を指す行を
        ここで弾く。通してしまうと、誤りが画面上は正常に見えてしまう。
        """
        problems: list[str] = []
        for (date, speaker), member_id in sorted(self.overrides.items()):
            person = self.by_id.get(member_id)
            if person is None:
                problems.append(f"{date} {speaker}: 議員ID「{member_id}」が人物台帳にない")
                continue
            if not person.in_office(date):
                spans = "、".join(f"{s}〜{e}" for s, e in person.terms) or "（当選記録なし）"
                problems.append(
                    f"{date} {speaker}: {person.name} はこの日に在職していない（任期 {spans}）")
        if problems:
            raise OverrideError("上書き表に誤りがあります:\n  " + "\n  ".join(problems))


def _load_js(path: Path, variable: str) -> dict:
    """`window.SHINAGAWA_DB.<variable> = {...};` の形のデータファイルを読む。"""
    try:
        text = path.read_text(encoding="utf-8")
    except OSError as error:
        raise FileNotFoundError(f"{path} を読めません: {error}") from error
    marker = f"{variable} = "
    if marker not in text:
        raise ValueError(f"{path} に {marker} が見つかりません")
    body = text.split(marker, 1)[1].rstrip().rstrip(";")
    try:
        return json.loads(body)
    except json.JSONDecodeError as error:
        raise ValueError(f"{path} のJSONを読めません: {error}") from error


def load_overrides(path: Path) -> dict[tuple[str, str], str]:
    """上書き表（TSV: 日付・発言者・議員ID）を読む。`#` 以降は注記。"""
    overrides: dict[tuple[str, str], str] = {}
    if not path.exists():
        return overrides
    for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        row = line.split("#", 1)[0].strip()
        if not row:
            continue
        columns = [c.strip() for c in row.split("\t")]
        if len(columns) < 3 or not columns[2]:
            raise OverrideError(f"{path}:{number}: 日付・発言者・議員IDの3列が要ります: {line!r}")
        overrides[(columns[0], columns[1])] = columns[2]
    return overrides
