# 品川区議会 公式ページ解析スクリプト
# 使い方: python3 scripts/parse_year.py 6
#   → 令和6年の提出議案・請願陳情・質問者を公式サイトから取得し、
#     scripts/out/r06_parsed.json に保存する（データ生成の下ごしらえ用）
#
# 注意:
# - 番号が重複するため、区長提出と議員提出は「議員提案」見出しの前後で分割して判定する
# - HTMLコメント（非表示部分）は必ず除去してから解析する（過去の教訓）
# - アクセスは0.4秒間隔（サーバー配慮）

import json
import re
import sys
import time
import urllib.request
import html as H

BASE = "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/"
UA = {"User-Agent": "Mozilla/5.0 (shinagawa-gikai-db data collection)"}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers=UA)
    data = urllib.request.urlopen(req, timeout=20).read().decode("utf-8", "replace")
    time.sleep(0.4)
    return data


def strip_comments(html: str) -> str:
    return re.sub(r"<!--.*?-->", " ", html, flags=re.S)


def flat_text(html: str) -> str:
    t = re.sub(r"<[^>]+>", " ", strip_comments(html))
    return re.sub(r"\s+", " ", t)


def table_bills(html_part: str) -> list:
    """表の行から議案（番号・題名・内容等・結果）を取り出す。3列の行（内容等なし）にも対応。"""
    out = []
    for tr in re.findall(r"<tr.*?</tr>", html_part, re.S):
        cells = [
            re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", c))).strip()
            for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", tr, re.S)
        ]
        if len(cells) < 3:
            continue
        m = re.match(r"(?:議員提出 ?)?第(\d+)号", cells[0])
        if not m:
            continue
        naiyo = cells[2] if len(cells) >= 4 else ""
        result = cells[3] if len(cells) >= 4 else cells[2]
        out.append({
            "n": int(m.group(1)),
            "title": re.sub(r"（ ?\.pdf.*?）", "", cells[1]).strip(),
            "naiyo": re.sub(r"（ ?\.pdf.*?）", "", naiyo).strip()[:90],
            "result": result.strip()[:8],
        })
    return out


def parse_bills(html: str) -> list:
    html = strip_comments(html)
    if "議員提案" in html:
        before, rest = html.split("議員提案", 1)
        giin_part = rest.split("請願・陳情")[0] if "請願・陳情" in rest else rest
    else:
        before, giin_part = html, ""
    return ([dict(b, giin=False) for b in table_bills(before)]
            + [dict(b, giin=True) for b in table_bills(giin_part)])


def parse_petitions(html: str) -> list:
    t = flat_text(html)
    if "請願・陳情" not in t:
        return []
    out = []
    pat = r"令和(\d+)年(請願|陳情) ?第?(\d+)号 ?(.{4,70}?) ?(採択|不採択|一部採択|継続審査|取り下げ|撤回|審議未了)"
    for m in re.finditer(pat, t.split("請願・陳情", 1)[1]):
        title = re.sub(r"（ ?\.pdf.*?）", "", m.group(4)).replace("趣旨", "").strip()
        out.append({
            "number": f"令和{m.group(1)}年{m.group(2)} 第{m.group(3)}号",
            "title": title,
            "result": m.group(5),
        })
    return out


def parse_questions(html: str) -> list:
    """h3見出し（日付+種別）ごとの表から質問者・会派・発言事項を取り出す。"""
    html = strip_comments(html)
    body = html[html.find("entry-content"):]
    out = []
    parts = re.split(r"<h3>([^<]+)</h3>", body)
    for i in range(1, len(parts), 2):
        head, seg = parts[i].strip(), parts[i + 1]
        dm = re.search(r"(\d+)月(\d+)日", head)
        kind = "代表質問" if "代表質問" in head else "一般質問"
        date = f"{dm.group(1)}月{dm.group(2)}日" if dm else ""
        for tr in re.findall(r"<tr.*?</tr>", seg, re.S):
            tds = re.findall(r"<td[^>]*>(.*?)</td>", tr, re.S)
            if len(tds) < 3:
                continue
            topics = [
                re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", li))).strip()
                for li in re.findall(r"<li[^>]*>(.*?)</li>", tds[1], re.S)
            ]
            who = re.sub(r"\s+", " ", H.unescape(re.sub(r"<[^>]+>", " ", tds[2]))).strip()
            wm = re.match(r"(.+?) ?（(.+?)）", who)
            if not wm or not topics:
                continue
            out.append({
                "date": date, "kind": kind,
                "member": wm.group(1).strip(), "party": wm.group(2).strip(),
                "topics": topics,
            })
    return out


def main() -> None:
    if len(sys.argv) < 2:
        print("使い方: python3 scripts/parse_year.py <令和の年（数字）>")
        sys.exit(1)
    y = int(sys.argv[1])
    result = {}
    # 定例会1〜4回・臨時会1〜3回を試し、存在するものだけ解析する（令和6年は臨時会3回）
    for kind, nmax in [("t", 4), ("r", 3)]:
        for n in range(1, nmax + 1):
            slug = f"r{y:02d}_{n:02d}{kind}"
            try:
                page1 = fetch(f"{BASE}{slug}/{slug}1")
            except Exception:
                continue
            entry = {
                "slug": slug,
                "bills": parse_bills(page1),
                "petitions": parse_petitions(page1),
                "questions": [],
            }
            if kind == "t":
                try:
                    entry["questions"] = parse_questions(fetch(f"{BASE}{slug}/{slug}2"))
                except Exception:
                    pass
            result[f"r{y:02d}-{n}{kind}"] = entry
            ku = [b for b in entry["bills"] if not b["giin"]]
            gi = [b for b in entry["bills"] if b["giin"]]
            print(f"{slug}: 区長{len(ku)} 議員{len(gi)} 請願陳情{len(entry['petitions'])} 質問{len(entry['questions'])}")
    import os
    os.makedirs("scripts/out", exist_ok=True)
    out = f"scripts/out/r{y:02d}_parsed.json"
    json.dump(result, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("保存:", out)


if __name__ == "__main__":
    main()
