#!/usr/bin/env python3
"""平成◯年の会議録データを生成する（h29の手順を汎用化）。
使い方: python3 scripts/build_heisei_year.py 28

議案・請願陳情は公式の本会議資料ページ（hXX_NN/hXX_NNt）から取得し、
prepare_history.py の解析処理をそのまま使う（要 beautifulsoup4）。
取得できなかった年は bills/petitions を空のまま出力し、件数を表示する。
"""
import collections, json, os, re, sys, time, unicodedata, urllib.request, html as H
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from prepare_history import parse_proposals_and_petitions
import qa_summary as qa

ROOT = Path(__file__).resolve().parents[1]
UA = {"User-Agent": "Mozilla/5.0"}
KAI = "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000"
BASE = "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule"
MONTH = {1: "2月〜3月", 2: "6月〜7月", 3: "9月〜10月", 4: "11月〜12月"}
OFFICIAL = r'区長|教育長|次長|部長|議長|委員長|監査|室長|所長|管理者'
norm = lambda s: unicodedata.normalize("NFKC", re.sub(r'[\s　]|（.*?）', '', s or ""))

def get(u, retry=3):
    for _ in range(retry):
        try:
            return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=30).read().decode("utf-8", "replace")
        except Exception:
            time.sleep(2)
    return ""

def fetch_docs(hy, western, cache):
    docs = {}
    for m in range(1, 13):
        last = 29 if (m == 2 and western % 4 == 0) else (28 if m == 2 else (30 if m in (4, 6, 9, 11) else 31))
        h = get(f"{KAI}?QueryType=new&Template=list&Cabinet=1&TermStart={western}-{m:02d}-01&TermEnd={western}-{m:02d}-{last}")
        for i, n in re.findall(r'Template=document[^"]*?Id=(\d+)[^"]*"[^>]*>([^<]+)<', h):
            if f"平成{hy}年" in n:
                docs[i] = n.strip()
        time.sleep(0.3)
    for i in docs:
        p = cache / f"doc{i}.html"
        if not p.exists() or p.stat().st_size < 5000:
            p.write_text(get(f"{KAI}?Template=document&Id={i}"), encoding="utf-8")
            time.sleep(0.35)
    return docs

def inspect_questions(hy):
    """質問者ページの表の作りを実行ログへ書き出す（解析が噛み合わないときの調査用）。

    開発環境から公式ページへ到達できないため、実際のHTMLがどう並んでいるかを
    ここで見る。発言事項が <li> なのか <br> なのか、それとも行ごとに分かれて
    いるのかが分かれば、当て推量で直さずに済む。
    """
    for n in range(1, 5):
        u = f"{BASE}/h{hy}_{n:02d}/h{hy}_{n:02d}t2"
        h = get(u)
        body = re.sub(r'<!--.*?-->', ' ', h, flags=re.S)
        body = body[body.find("entry-content"):]
        rows = re.findall(r'<tr.*?</tr>', body, re.S)
        print(f"\n===== 第{n}回 {u}")
        print(f"  取得 {len(h):,}文字 / <tr> {len(rows)}行 / "
              f"<li> {body.count('<li')}個 / <br> {len(re.findall(r'<br', body, re.I))}個 / "
              f'class="giin" {body.count(chr(34)+"giin"+chr(34))}個')
        for index, tr in enumerate(rows[:3], 1):
            cells = re.findall(r'(<t[dh][^>]*>)(.*?)</t[dh]>', tr, re.S)
            print(f"  --- {index}行目（セル{len(cells)}個）")
            for tag, inner in cells:
                flat = re.sub(r'\s+', ' ', inner).strip()
                print(f"      {tag} {flat[:220]}")

        # 潰れている行を狙って出す。「について」が2つ以上あるのに1項目にしか
        # 割れないセルは、区切りを読み取れていないということ。
        flat = lambda x: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', H.unescape(x))).strip()
        lumped = 0
        for tr in rows:
            for tag, inner in re.findall(r'(<t[dh][^>]*>)(.*?)</t[dh]>', tr, re.S):
                if 'giin' in tag:
                    continue
                text = flat(inner)
                if text.count("について") < 2:
                    continue
                pieces = re.findall(r'<li[^>]*>(.*?)</li>', inner, re.S) \
                    or re.split(r'<br\s*/?>|</p>|</div>', inner, flags=re.I)
                if len([p for p in pieces if flat(p)]) >= 2:
                    continue  # 割れているので問題なし
                lumped += 1
                if lumped <= 3:
                    print(f"  ★ 潰れているセル（「について」{text.count('について')}個が1項目）")
                    print(f"      タグ: {tag}")
                    print(f"      中身: {re.sub(r'[ ]+', ' ', inner.strip())[:600]}")
        print(f"  潰れているセル: {lumped}個")


def fetch_questions(hy, cache):
    out = {}
    for n in range(1, 5):
        u = f"{BASE}/h{hy}_{n:02d}/h{hy}_{n:02d}t2"
        h = get(u)
        body = re.sub(r'<!--.*?-->', ' ', h, flags=re.S)
        body = body[body.find("entry-content"):]
        # 最初の表が<h3>より前にある年（h25第1回など）に対応: 冒頭の日付見出しを補う
        first_h3 = body.find("<h3>")
        head_text = re.sub(r"<[^>]+>", " ", body[:first_h3] if first_h3 > 0 else "")
        lead = re.search(r"(\d+)月(\d+)日[^【]*【([^】]+)】", head_text)
        if lead and first_h3 > 0 and "<tr" in body[:first_h3]:
            body = f"<h3>{lead.group(1)}月{lead.group(2)}日 【{lead.group(3)}】</h3>" + body
        qs, parts = [], re.split(r'<h3>([^<]+)</h3>', body)
        last_date = ""
        for i in range(1, len(parts), 2):
            head, seg = parts[i].strip(), parts[i + 1]
            dm = re.search(r'(\d+)月(\d+)日', head)
            if dm:
                last_date = f"{dm.group(1)}月{dm.group(2)}日"
            kind = "代表質問" if "代表質問" in head else "一般質問"
            cell = lambda x: re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()

            def cell_items(x):
                """発言事項のセルを、項目ごとの一覧にして返す。

                発言事項は1つのセルの中に <li> や <br> で並んでいる年がある。
                そのままタグを空白に置き換えると「防災意識の高揚について
                「しながわ防災体験館」について …」と全項目が1つに潰れ、
                何について質問したのかが読み取れなくなる。区切りで分けてから
                文字に直す。区切りが無いセルは1件として返す。
                """
                pieces = re.findall(r'<li[^>]*>(.*?)</li>', x, re.S)
                if not pieces:
                    pieces = re.split(r'<br\s*/?>|</p>|</div>', x, flags=re.I)
                return [item for item in (cell(p) for p in pieces) if item]

            pending = []          # 旧形式（項目が行ごとに分かれる年）用のバッファ
            for tr in re.findall(r'<tr.*?</tr>', seg, re.S):
                tds = [cell(x) for x in re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)]
                raw = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.S)
                if not tds:
                    continue
                # 議員名セル（class="giin"）がある年: 「姓 名<br>（会派）」を直接読む
                gm = re.search(r'<td[^>]*class="giin"[^>]*>(.*?)</td>', tr, re.S)
                if gm:
                    gtxt = cell(gm.group(1))
                    wm3 = re.match(r'(.+?)\s*[（(]([^）)]+)[）)]', gtxt)
                    # 議員名セルは項目ではないので、分割の対象から外す。
                    # （分けると「姓 名」「（会派）」が項目として混ざる）
                    tp = [item
                          for whole, inner in re.findall(r'(<td[^>]*>)(.*?)</td>', tr, re.S)
                          if 'class="giin"' not in whole
                          for item in cell_items(inner)]
                    tp = [t for t in tp if t and t != gtxt
                          and not re.fullmatch(r'[０-９0-9一二三四五六七八九十]+[．.]?', t)
                          and t not in ("順序", "発言事項", "議員名")]
                    body_topics = pending + tp
                    if wm3 and body_topics:
                        qs.append({"date": last_date, "kind": kind,
                                   "member": re.sub(r'\s+', '', wm3.group(1)),
                                   "party": wm3.group(2).strip(), "topics": body_topics, "url": u})
                    pending = []
                    continue
                # 新形式: <li>で項目が並び、3列目が議員名
                if len(raw) >= 3 and re.search(r'<li', raw[1]):
                    topics = [cell(li) for li in re.findall(r'<li[^>]*>(.*?)</li>', raw[1], re.S)]
                    wm = re.match(r'(.+?) ?（(.+?)）', tds[2])
                    if wm and topics:
                        qs.append({"date": last_date, "kind": kind, "member": wm.group(1).strip(),
                                   "party": wm.group(2).strip(), "topics": topics, "url": u})
                    continue
                # 旧形式: 「順序/1./項目」で始まり、議員名セルが現れるまで項目を積む
                is_noise = lambda t: (not t
                                      or re.fullmatch(r'[０-９0-9一二三四五六七八九十]+[．.]?', t)
                                      or t in ("順序", "発言事項", "議員名"))
                texts = [t for t in tds if not is_noise(t)]
                who = next((t for t in texts if re.match(r'.+ ?（.+?）$', t)), None)
                # 項目のセルは分けて数える。議員名のセルは「姓 名」「（会派）」に
                # 割れてしまうので、そのセルごと対象から外す
                items = [t for x in raw if cell(x) != who
                         for t in cell_items(x) if not is_noise(t)]
                if who:
                    wm = re.match(r'(.+?) ?（(.+?)）', who)
                    body_topics = pending + items
                    if wm and body_topics:
                        qs.append({"date": last_date, "kind": kind, "member": wm.group(1).strip(),
                                   "party": wm.group(2).strip(), "topics": body_topics, "url": u})
                    pending = []
                else:
                    pending += items
        # 表の外に議員名が置かれる年（h25第1回など）: table直後のテキストから補完する
        if not qs:
            body2 = re.sub(r'<!--.*?-->', ' ', h, flags=re.S)
            body2 = body2[body2.find("entry-content"):]
            blocks = re.split(r'(<table.*?</table>)', body2, flags=re.S)
            cell = lambda x: re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()
            cur_date, cur_kind, pend = "", "一般質問", []
            for blk in blocks:
                plain = cell(blk)
                dm2 = re.search(r'(\d+)月(\d+)日', plain)
                if dm2 and "<table" not in blk:
                    cur_date = f"{dm2.group(1)}月{dm2.group(2)}日"
                if "代表質問" in plain: cur_kind = "代表質問"
                elif "一般質問" in plain: cur_kind = "一般質問"
                if blk.startswith("<table"):
                    rows = [cell(x) for tr in re.findall(r'<tr.*?</tr>', blk, re.S)
                            for x in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, re.S)]
                    pend = [r for r in rows if r and not re.fullmatch(r'[０-９0-9一二三四五六七八九十]+[．.]?', r)
                            and r not in ("順序", "発言事項", "議員名")]
                else:
                    # 姓と名がタグで分断される年に備え、括弧直前の連続文字をまとめて拾う
                    wm2 = re.search(r'([^\s０-９0-9、。：:／/]{2,12})\s*[（(]([^）)]{1,8})[）)]', plain)
                    if wm2 and pend:
                        qs.append({"date": cur_date, "kind": cur_kind, "member": wm2.group(1).strip(),
                                   "party": wm2.group(2).strip(), "topics": pend, "url": u})
                        pend = []
        # 入れ子テーブルの年（h16など）: giinセルを起点に、直前の項目表とペアにする
        if any(x for x in qs if len(x["member"]) <= 3) or not qs:
            body3 = re.sub(r'<!--.*?-->', ' ', h, flags=re.S)
            body3 = body3[body3.find("entry-content"):]
            cell3 = lambda x: re.sub(r'\s+', ' ', H.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()
            gi = list(re.finditer(r'<td[^>]*class="giin"[^>]*>(.*?)</td>', body3, re.S))
            if gi:
                fixed, prev_end = [], 0
                for g in gi:
                    chunk = body3[prev_end:g.start()]
                    prev_end = g.end()
                    dm3 = re.findall(r'(\d+)月(\d+)日', cell3(chunk))
                    if dm3:
                        last_date = f"{dm3[-1][0]}月{dm3[-1][1]}日"
                    kind3 = "代表質問" if "代表質問" in cell3(chunk)[-400:] else kind
                    topics3 = [cell3(x) for x in re.findall(r'<td[^>]*>(.*?)</td>', chunk, re.S)]
                    topics3 = [t for t in topics3 if t and not re.fullmatch(r'[０-９0-9一二三四五六七八九十]+[．.]?', t)
                               and t not in ("順序", "発言事項", "議員名") and len(t) > 3]
                    wm3 = re.match(r'(.+?)\s*[（(]([^）)]+)[）)]', cell3(g.group(1)))
                    if wm3 and topics3:
                        fixed.append({"date": last_date, "kind": kind3,
                                      "member": re.sub(r'\s+', '', wm3.group(1)),
                                      "party": wm3.group(2).strip(), "topics": topics3, "url": u})
                if len(fixed) >= len(qs):
                    qs = fixed
        out[f"h{hy}-{n}t"] = qs
        time.sleep(0.4)
    return out

def fetch_bills(hy, cache):
    """本会議資料ページから議案・請願陳情を取得する。

    平成のページはフォルダー名に t/r が付かず、本文ページ名にだけ付く
    （例: h20_01/h20_01t）。取得や解析に失敗した回は黙って飛ばし、
    呼び出し元が件数を見て判断できるようにする。
    """
    bills, petitions = [], []
    for n in range(1, 5):
        mid = f"h{hy}-{n}t"
        url = f"{BASE}/h{hy}_{n:02d}/h{hy}_{n:02d}t"
        path = cache / f"bills{n:02d}.html"
        if path.exists() and path.stat().st_size > 3000:
            body = path.read_text(encoding="utf-8")
        else:
            body = get(url)
            if body:
                path.write_text(body, encoding="utf-8")
                time.sleep(0.35)
        if not body:
            print(f"  第{n}回: 資料ページを取得できませんでした（{url}）")
            continue
        try:
            b, p = parse_proposals_and_petitions(body, url, mid)
        except Exception as exc:
            print(f"  第{n}回: 解析に失敗しました（{exc}）")
            continue
        print(f"  第{n}回: 議案{len(b)}件 請願陳情{len(p)}件")
        bills.extend(b)
        petitions.extend(p)
    return bills, petitions

def extract_qa(docs, cache):
    def flat(i):
        t = re.sub(r'\s+', '', re.sub(r'<[^>]+>', '', re.sub(r'<!--.*?-->', '', (cache / f"doc{i}.html").read_text(encoding="utf-8", errors="replace"), flags=re.S)))
        return re.sub(r'\d+:◯[^）]{2,25}）', '', t)
    speeches = {}
    for i, name in sorted(docs.items(), key=lambda x: int(x[0])):
        m = re.search(r'第(\d)回定例会（第(\d)日目）', name)
        if not m or "本文" not in name:
            continue
        sess, t = int(m.group(1)), flat(i)
        marks = [(x.start(), x.end(), x.group(1)) for x in re.finditer(r'〔([^〕]{2,15}?)君登壇〕', t)]
        k = 0
        while k < len(marks):
            _, e0, who = marks[k]
            if re.search(OFFICIAL, who):
                k += 1; continue
            qspan = t[e0:(marks[k + 1][0] if k + 1 < len(marks) else e0 + 9000)]
            if "質問" not in qspan[:300]:
                k += 1; continue
            ans, j = [], k + 1
            while j < len(marks) and re.search(OFFICIAL, marks[j][2]):
                ae = marks[j + 1][0] if j + 1 < len(marks) else marks[j][1] + 8000
                ans.append(t[marks[j][1]:ae][:8000]); j += 1
            speeches.setdefault((sess, norm(who)), {"q": qspan[:9000], "ans": "".join(ans), "doc": i})
            k = j if j > k + 1 else k + 1
    return speeches

def pick(text, key, maxlen):
    for k in [key[:8], key[:6], key[:4], key[-5:]]:
        if len(k) < 3:
            continue
        for m in re.finditer(re.escape(k), text):
            for sent in [x for x in text[m.start():].split("。") if x.strip()][:3]:
                if re.search(r'お答え|申し上げ|お尋ね|伺いま', sent) and len(sent) < 60:
                    continue
                if 14 < len(sent) < maxlen * 2:
                    # 文字数で切ると語の途中で終わる。文として閉じられる形にする。
                    return qa.finish(re.sub(r'^[」「、]', '', sent) + "。", maxlen)
            break
    return ""

def fix_q(s):
    s = s.strip()
    for pat, rep in [(r'(?:ご)?見解を(?:お聞かせください|伺います|お聞かせ願います)。?$', '見解を尋ねました。'),
                     (r'お(?:聞かせ|示し|答え|知らせ)ください。?$', '説明を求めました。'),
                     (r'(?:検討|対応)(?:を|も)?いただきたい。?$', '検討を求めました。'),
                     (r'いかがでしょうか。?$', '見解を尋ねました。'),
                     (r'(?:について)?(?:お)?(?:伺い|尋ね)(?:いた)?します。?$', 'について尋ねました。'),
                     (r'(?:について)?質問(?:いた)?します。?$', 'について質問しました。')]:
        n = re.sub(pat, rep, s)
        if n != s:
            return n
    return s if s.endswith("。") else (s + "などについて質問しました。" if s else s)

def check_no_regression(yid, qout):
    """既にあるデータより発言項目が大きく減っていたら、書き出さずに止める。

    公式ページの作りが変わって解析が噛み合わなくなると、質問者は取れているのに
    発言項目だけが潰れる（6項目が1項目に合わさるなど）ことがある。件数は
    それなりに出るので気付きにくく、そのまま保存すると「何について質問したか」が
    読めないデータで上書きしてしまう。取り直しは何度でもできるので、
    減っているときは書かずに止めて、原因を見てからにする。
    """
    path = ROOT / f"data/{yid}.js"
    if not path.exists():
        return
    try:
        current = json.loads(path.read_text(encoding="utf-8")
                             .split(f'years["{yid}"] = ', 1)[1].rstrip().rstrip(";"))
    except (IndexError, ValueError):
        return  # 既存データを読めないときは、この確認は行わない
    before = sum(len(e.get("topics") or []) for e in current.get("questions") or [])
    after = sum(len(e["topics"]) for e in qout)
    if before and after < before * 0.9:
        raise SystemExit(
            f"{yid}: 発言項目が {before}件 から {after}件 に減りました。"
            f"公式ページの作りが変わった可能性があります。"
            f"data/{yid}.js は書き換えません。")
    print(f"{yid}: 発言項目 {before}件 → {after}件")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if not args or not args[0].strip().isdigit():
        raise SystemExit(
            "使い方: python3 scripts/build_heisei_year.py <平成の年（例: 28）> [--inspect]")
    hy = int(args[0].strip()); western = 1988 + hy
    if not 1 <= hy <= 31:
        raise SystemExit(f"平成{hy}年は存在しません。1〜31を指定してください。")
    if "--inspect" in sys.argv:
        # 表の作りを見るだけ。データは書き換えない
        inspect_questions(hy)
        return
    yid = f"h{hy}"
    cache = ROOT / f"scripts/cache/{yid}"
    cache.mkdir(parents=True, exist_ok=True)
    docs = fetch_docs(hy, western, cache)
    questions = fetch_questions(hy, cache)
    print(f"{yid}: 議案・請願陳情を取得中...")
    bills, petitions = fetch_bills(hy, cache)
    speeches = extract_qa(docs, cache)
    people = json.loads((ROOT / "data/people.js").read_text().split("peopleData = ", 1)[1].rstrip().rstrip(";"))
    known = {}
    for p in people["people"]:
        for a in [p["name"]] + p.get("aliases", []):
            known[norm(a)] = p["id"]
    meetings, qout, newcomers = [], [], set()
    for n in range(1, 5):
        mid = f"{yid}-{n}t"; items = questions.get(mid, [])
        if not items:
            continue
        for it in items:
            src = speeches.get((n, norm(it["member"])))
            sums = []
            for tp in it["topics"]:
                q = pick(src["q"], tp, 150) if src else ""
                a = pick(src["ans"], tp, 170) if src else ""
                sums.append({"title": tp,
                             "question": qa.normalize_question(
                                 fix_q(q) if q else f"「{tp}」について、現状の認識と区の対応を質問しました。"),
                             "answer": qa.strip_answer_lead("区側は、" + a) if a else qa.no_answer_text("質問")})
            it["qaSummaries"] = sums
            it["minutesDoc"] = src["doc"] if src else None
        ev = collections.defaultdict(list)
        for it in items:
            ev[(it["date"], it["kind"])].append(it)
        events = []
        for (d, kind), mem in sorted(ev.items(), key=lambda x: (int(x[0][0].split("月")[0] or 0), x[0][0])):
            links = [{"type": "official", "label": "質問者・発言事項を見る", "url": mem[0]["url"]}]
            if mem[0].get("minutesDoc"):
                links.append({"type": "minutes", "label": "公式会議録を読む", "url": f"{KAI}?Template=document&Id={mem[0]['minutesDoc']}#one"})
            events.append({"date": d, "title": kind,
                           "description": "質問者: " + "、".join(m["member"] for m in mem), "links": links})
        tot = sum(len(i["topics"]) for i in items)
        meetings.append({"id": mid, "monthLabel": MONTH[n], "name": f"平成{hy}年第{n}回定例会", "type": "定例会",
                         "summary": f"代表質問・一般質問{len(items)}名、全{tot}項目の質問・答弁要約を掲載しています。",
                         "stats": [{"value": f"{len(items)}名", "label": "代表・一般質問者"},
                                   {"value": f"{tot}項目", "label": "質問項目"}],
                         "detailTitle": f"平成{hy}年第{n}回定例会の詳細",
                         "detailLead": "品川区議会公式ページと正式会議録から整理しています。",
                         "events": events,
                         "questionsSection": {"title": "代表質問・一般質問（全項目・答弁要約）",
                                              "lead": f"公式掲載の{len(items)}名・{tot}項目を省略せず掲載し、正式会議録から質問と答弁の要点をまとめています。"}})
        for it in items:
            e = {"meetingId": mid, "member": it["member"], "party": it["party"], "kind": it["kind"],
                 "date": it["date"], "topics": it["topics"], "qaSummaries": it["qaSummaries"],
                 "links": [{"type": "official", "label": "公式の発言事項を見る", "url": it["url"]}]}
            if it.get("minutesDoc"):
                e["links"].append({"type": "minutes", "label": "公式会議録を読む", "url": f"{KAI}?Template=document&Id={it['minutesDoc']}#one"})
            pid = known.get(norm(it["member"]))
            if pid:
                e["memberId"] = pid
            else:
                newcomers.add(it["member"])
            qout.append(e)
    # 取得に失敗した年をここで書き出すと、既にある会議録データを空で潰してしまう
    if not qout:
        raise SystemExit(f"{yid}: 質問を1件も取得できませんでした。data/{yid}.js は書き換えません。")
    check_no_regression(yid, qout)
    data = {"id": yid, "label": f"平成{hy}年", "updatedAt": date.today().isoformat(),
            "yearSummary": {"title": f"平成{hy}年（{western}年）の本会議",
                            "text": "第1回から第4回までの定例会について、公式掲載の代表質問・一般質問を全項目掲載し、正式会議録から質問と答弁の要点をまとめています。正確な内容は公式会議録も確認してください。"},
            "meetings": meetings, "bills": bills, "petitions": petitions, "questions": qout}
    # 議案・請願陳情が取れた会議には、全件掲載であることを示す見出しを添える
    for m in meetings:
        bc = sum(1 for b in bills if b["meetingId"] == m["id"])
        pc = sum(1 for p in petitions if p["meetingId"] == m["id"])
        if bc:
            m["billsSection"] = {"title": "提出議案（全件）",
                                 "lead": f"公式ページ掲載の{bc}件を省略せず掲載しています。"}
        if pc:
            m["petitionsSection"] = {"title": "請願・陳情（全件）",
                                     "lead": f"公式ページ掲載の{pc}件を省略せず掲載しています。"}
    (ROOT / f"data/{yid}.js").write_text(
        f"// 品川区議会DB データファイル（平成{hy}年）\n"
        "window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };\n"
        f'window.SHINAGAWA_DB.years["{yid}"] = ' + json.dumps(data, ensure_ascii=False, indent=2) + ";\n", encoding="utf-8")
    ok = sum(1 for q in qout for s in q["qaSummaries"] if s["answer"].startswith("区側は"))
    tot = sum(len(q["qaSummaries"]) for q in qout)
    print(f"{yid}: 会議{len(meetings)} 議案{len(bills)} 請願陳情{len(petitions)} "
          f"質問{len(qout)}名 項目{tot} 答弁抽出{ok}({100*ok//max(1,tot)}%)")
    if not bills and not petitions:
        print("※ 議案・請願陳情は0件です。公式ページの構成が異なる可能性があるため、"
              f"{BASE}/h{hy}_01/h{hy}_01t を開いて確認してください。")
    print("台帳未登録:", sorted(newcomers) or "なし")

if __name__ == "__main__":
    main()
