"""公式の質問者ページが無い年を、会議録本文だけから構築する（平成13・14年用）。"""
import collections, json, re, sys, unicodedata, urllib.request, time
from pathlib import Path
ROOT = Path("/Users/apple/my-claude-project/shinagawa-gikai ver2")
KAI = "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000"
UA = {"User-Agent": "Mozilla/5.0"}
OFFICIAL = r'区長|教育長|次長|部長|議長|委員長|監査|室長|所長|管理者|収入役|助役'
norm = lambda s: unicodedata.normalize("NFKC", re.sub(r'[\s　]|（.*?）', '', s or ""))

def get(u):
    for _ in range(3):
        try: return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read().decode("utf-8", "replace")
        except Exception: time.sleep(2)
    return ""

def collect(hy, western, cache):
    cache.mkdir(parents=True, exist_ok=True)
    docs = {}
    for m in range(1, 13):
        last = 29 if (m == 2 and western % 4 == 0) else (28 if m == 2 else (30 if m in (4, 6, 9, 11) else 31))
        h = get(f"{KAI}?QueryType=new&Template=list&Cabinet=1&TermStart={western}-{m:02d}-01&TermEnd={western}-{m:02d}-{last}")
        for i, n in re.findall(r'Template=document[^"]*?Id=(\d+)[^"]*"[^>]*>([^<]+)<', h):
            if f"平成{hy}年" in n: docs[i] = n.strip()
        time.sleep(0.25)
    for i in docs:
        p = cache / f"doc{i}.html"
        if not p.exists() or p.stat().st_size < 5000:
            p.write_text(get(f"{KAI}?Template=document&Id={i}"), encoding="utf-8")
            time.sleep(0.35)
    return docs

def flat(p):
    t = re.sub(r'\s+', '', re.sub(r'<[^>]+>', '', re.sub(r'<!--.*?-->', '', p.read_text(encoding="utf-8", errors="replace"), flags=re.S)))
    return re.sub(r'\d+:◯[^）]{2,25}）', '', t)

def spaced(p):
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', re.sub(r'<!--.*?-->', ' ', p.read_text(encoding="utf-8", errors="replace"), flags=re.S)))

def pick(text, key, maxlen):
    for k in [key[:8], key[:6], key[:4], key[-5:]]:
        if len(k) < 3: continue
        for m in re.finditer(re.escape(k), text):
            for s in [x for x in text[m.start():].split("。") if x.strip()][:3]:
                if re.search(r'お答え|申し上げ|お尋ね|伺いま', s) and len(s) < 60: continue
                if 14 < len(s) < maxlen * 2: return re.sub(r'^[」「、]', '', s)[:maxlen] + "。"
            break
    return ""

def topics_of(span):
    out = []
    for p in [r'(?:まず初めに|初めに|次に|最後に|まず|第[一二三四五六]に|続いて)、?「?([^。、「」]{4,32}?)」?について',
              r'「([^」]{4,32})」について(?:伺|質問|お聞き)']:
        for m in re.finditer(p, span):
            tp = re.sub(r'^[」「]', '', m.group(1).strip())
            if tp not in out and not re.search(r'答弁|お答え|再質問|以上|伺いま', tp): out.append(tp)
    return out[:7]

def main():
    hy = int(sys.argv[1]); western = 1988 + hy; yid = f"h{hy}"
    cache = ROOT / f"scripts/cache/{yid}"
    docs = collect(hy, western, cache)
    info = {}
    for i, n in docs.items():
        m = re.search(r'第(\d)回定例会（第(\d)日目）', n)
        if m: info[i] = (int(m.group(1)), int(m.group(2)), "本文" in n)
    people = json.loads((ROOT / "data/people.js").read_text().split("peopleData = ", 1)[1].rstrip().rstrip(";"))
    known = {}
    for p in people["people"]:
        for a in [p["name"]] + p.get("aliases", []): known[norm(a)] = p["id"]
    PARTY = [("自民", "自民"), ("公明", "公明"), ("共産", "共産"), ("民主", "民主"), ("ネット", "ネット"), ("無所属", "無所属")]
    by_sess = collections.defaultdict(list)
    for i, (sess, day, body) in sorted(info.items(), key=lambda x: int(x[0])):
        if not body: continue
        p = cache / f"doc{i}.html"
        dm = re.search(r'(\d{4})-(\d{2})-(\d{2})', spaced(p)[:2000])
        date = f"{int(dm.group(2))}月{int(dm.group(3))}日" if dm else ""
        t = flat(p)
        marks = [(x.start(), x.end(), x.group(1)) for x in re.finditer(r'〔([^〕]{2,15}?)君登壇〕', t)]
        k = 0
        while k < len(marks):
            _, e0, who = marks[k]
            if re.search(OFFICIAL, who): k += 1; continue
            qspan = t[e0:(marks[k + 1][0] if k + 1 < len(marks) else e0 + 9000)]
            if "質問" not in qspan[:300]: k += 1; continue
            ans, j = [], k + 1
            while j < len(marks) and re.search(OFFICIAL, marks[j][2]):
                ae = marks[j + 1][0] if j + 1 < len(marks) else marks[j][1] + 8000
                ans.append(t[marks[j][1]:ae][:8000]); j += 1
            tps = topics_of(qspan)
            party = next((sh for full, sh in PARTY if full in qspan[:200]), "―")
            kind = "代表質問" if "代表質問" in qspan[:200] else "一般質問"
            sums = []
            for tp in tps:
                q = pick(qspan, tp, 150); a = pick("".join(ans), tp, 170)
                sums.append({"title": tp, "question": q or f"「{tp}」について、現状の認識と区の対応を質問しました。",
                             "answer": ("区側は、" + a) if a else "答弁の全文は会議録を参照してください。"})
            if not sums:
                sums = [{"title": "質問の概要", "question": qspan[:150] + "。",
                         "answer": "答弁の全文は会議録を参照してください。"}]
            by_sess[sess].append({"member": who, "party": party, "kind": kind, "date": date,
                                  "topics": tps or ["（発言項目は会議録参照）"], "qaSummaries": sums, "doc": i})
            k = j if j > k + 1 else k + 1
    MONTH = {1: "2月〜3月", 2: "6月〜7月", 3: "9月〜10月", 4: "11月〜12月"}
    meetings, qout, newc = [], [], set()
    for sess in sorted(by_sess):
        mid = f"{yid}-{sess}t"; items = by_sess[sess]
        ev = collections.defaultdict(list)
        for it in items: ev[(it["date"], it["kind"])].append(it)
        events = []
        for (d, kind), mem in sorted(ev.items(), key=lambda x: (int(x[0][0].split("月")[0] or 0), x[0][0])):
            events.append({"date": d, "title": kind, "description": "質問者: " + "、".join(m["member"] for m in mem),
                           "links": [{"type": "minutes", "label": "公式会議録を読む", "url": f"{KAI}?Template=document&Id={mem[0]['doc']}#one"}]})
        tot = sum(len(i["topics"]) for i in items)
        meetings.append({"id": mid, "monthLabel": MONTH.get(sess, ""), "name": f"平成{hy}年第{sess}回定例会", "type": "定例会",
                         "summary": f"代表質問・一般質問{len(items)}名、全{tot}項目の質問・答弁要約を掲載しています。",
                         "stats": [{"value": f"{len(items)}名", "label": "代表・一般質問者"}, {"value": f"{tot}項目", "label": "質問項目"}],
                         "detailTitle": f"平成{hy}年第{sess}回定例会の詳細",
                         "detailLead": "公式の質問者ページが無い年のため、正式会議録の本文から質問者・発言項目を抽出しています。",
                         "events": events,
                         "questionsSection": {"title": "代表質問・一般質問（会議録から抽出）",
                                              "lead": f"会議録から抽出した{len(items)}名・{tot}項目です。正確な内容は各リンク先の会議録原文を確認してください。"}})
        for it in items:
            e = {"meetingId": mid, "member": it["member"], "party": it["party"], "kind": it["kind"], "date": it["date"],
                 "topics": it["topics"], "qaSummaries": it["qaSummaries"],
                 "links": [{"type": "minutes", "label": "公式会議録を読む", "url": f"{KAI}?Template=document&Id={it['doc']}#one"}]}
            pid = known.get(norm(it["member"]))
            if pid: e["memberId"] = pid
            else: newc.add(it["member"])
            qout.append(e)
    data = {"id": yid, "label": f"平成{hy}年", "updatedAt": "2026-07-30",
            "yearSummary": {"title": f"平成{hy}年（{western}年）の本会議",
                            "text": "この年は公式サイトに質問者・発言事項のページが無いため、正式会議録の本文から質問者と発言項目を機械抽出して掲載しています。抽出漏れの可能性があるため、正確な内容は各リンク先の会議録原文を確認してください。"},
            "meetings": meetings, "bills": [], "petitions": [], "questions": qout}
    (ROOT / f"data/{yid}.js").write_text(
        f"// 品川区議会DB データファイル（平成{hy}年・会議録本文からの抽出）\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };\n"
        f'window.SHINAGAWA_DB.years["{yid}"] = ' + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    ok = sum(1 for q in qout for s in q["qaSummaries"] if s["answer"].startswith("区側は"))
    tot = sum(len(q["qaSummaries"]) for q in qout)
    print(f"{yid}: 会議{len(meetings)} 質問{len(qout)}名 項目{tot} 答弁抽出{ok}({100*ok//max(1,tot)}%)")
    print("台帳未登録:", sorted(newc) or "なし")

main()
