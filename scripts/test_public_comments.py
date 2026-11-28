#!/usr/bin/env python3
"""品川区のパブリックコメント（意見募集・結果公表）ページから事実を取り出す処理を確かめる。

取り出すのは案件番号・件名・募集期間・応募者数・意見件数・資料のリンク・担当課。
「区の考え方」などの本文は転載しない（リンクで公式ページへ案内する）。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

import public_comments

BASE = "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1006648/1006650/1006661/1006676.html"

# 結果公表ページ（2024-012 品川区こども計画）の骨格
RESULT_PAGE = """<html><body>
<a href="#">お問い合わせ</a><p>チャット</p>
<div id="tmp_contents">
<h1>2024-012「品川区こども計画」に関する結果公表</h1>
<p>ページID：1006676</p><p>更新日：2026年10月1日</p>
<p>「品川区こども計画」の作成に当たり、計画案に対する意見募集を行ったところ、31人の方から95件のご意見をいただきました。</p>
<h2>募集期間</h2><p>令和7年2月1日(土曜日)から令和7年2月21日(金曜日)まで</p>
<h2>意見応募状況</h2><p>応募者数　31人</p><p>意見件数　95件</p>
<p><a href="../../../../../_res/projects/default_project/_page_/001/006/676/20250501160413_1.pdf">ご意見と区の考え方 （PDF 519.5 KB）</a></p>
<p><a href="../../../../../_res/projects/default_project/_page_/001/006/676/20250501160413_2.pdf">品川区こども計画 （PDF 18.3 MB）</a></p>
<p><a href="../../../../../_res/projects/default_project/_page_/001/006/676/20250501160413_1.docx">【読み上げ原稿】品川区こども計画 （Word 175.7 KB）</a></p>
<p><a href="../../../../../kusei/other.html">関連ページ</a></p>
</div>
<div id="tmp_inquiry"><h2>お問い合わせ</h2><p>子ども育成課 子ども育成係</p><p>〒140-8715 品川区広町2-1-36</p></div>
</body></html>"""

# 募集中ページ（開始日は掲載日、募集期間は終了日だけ）
OPEN_PAGE = """<html><body><div id="tmp_contents">
<h1>2026-005「品川区福祉オンブズマン制度(素案)」に対する意見募集</h1>
<p>更新日：2026年11月15日</p>
<p>令和8年11月15日掲載「品川区福祉オンブズマン制度（素案）」に関する意見募集を行います。</p>
<p>区民の皆さんから頂いたご意見を踏まえ、令和9年3月中旬頃に結果を公表する予定です。</p>
<p><a href="../../../../../../_res/projects/default_project/_page_/001/012/243/publiccommet-2026-005-1.pdf">品川区福祉オンブズマン制度（素案） （PDF 410.9 KB）</a></p>
<h2>募集期間</h2><p>令和8年12月15日(火曜日)まで</p>
<p><a href="https://www.city.shinagawa.tokyo.jp/cgi-bin/enquetes/7ec23d69">意見投稿フォーム</a></p>
</div>
<div><h2>お問い合わせ</h2><p>福祉計画課 施設担当</p></div>
</body></html>"""

# 一覧ページ（年度別）の骨格
INDEX_PAGE = """<ul>
<li><a href="../../../../kusei/kohokocho/1006648/1006650/1006661/1006676.html">2024-012「品川区こども計画」に関する結果公表</a></li>
<li><a href="../../../../kusei/kohokocho/1006648/1006650/1006661/index.html">令和6年度</a></li>
<li><a href="../../../../kusei/kohokocho/1006648/1006650/1006717/1006734.html">2019-007　第二期品川区子ども・子育て支援事業計画(素案)に関する結果公表</a></li>
</ul>"""


class WarekiTest(unittest.TestCase):
    def test_reiwa_and_gannen(self) -> None:
        self.assertEqual(public_comments.wareki_to_iso("令和7年2月1日"), "2025-02-01")
        self.assertEqual(public_comments.wareki_to_iso("令和元年11月21日"), "2019-11-21")
        self.assertEqual(public_comments.wareki_to_iso("平成31年4月1日"), "2019-04-01")
        self.assertIsNone(public_comments.wareki_to_iso("日付なし"))


class IndexTest(unittest.TestCase):
    def test_lists_only_item_pages(self) -> None:
        links = public_comments.parse_index(INDEX_PAGE, "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1006648/1006650/1006661/index.html")
        self.assertEqual([item["id"] for item in links], ["2024-012", "2019-007"])
        self.assertTrue(links[0]["url"].endswith("/1006661/1006676.html"))


class DetailTest(unittest.TestCase):
    def test_result_page(self) -> None:
        item = public_comments.parse_detail(RESULT_PAGE, BASE)
        self.assertEqual(item["id"], "2024-012")
        self.assertEqual(item["fiscalYear"], 2024)
        self.assertEqual(item["title"], "品川区こども計画")
        self.assertEqual(item["status"], "result")
        self.assertEqual((item["start"], item["end"]), ("2025-02-01", "2025-02-21"))
        self.assertEqual((item["applicants"], item["opinions"]), (31, 95))
        self.assertEqual(item["department"], "子ども育成課 子ども育成係")
        self.assertEqual(item["updatedAt"], "2026-10-01")
        # 資料はPDF・Wordだけ。ラベルからファイルサイズの注記を外す
        self.assertEqual([doc["label"] for doc in item["documents"]],
                         ["ご意見と区の考え方", "品川区こども計画", "【読み上げ原稿】品川区こども計画"])
        self.assertEqual(item["documents"][0]["kind"], "PDF")
        self.assertTrue(item["documents"][0]["url"].startswith("https://www.city.shinagawa.tokyo.jp/_res/"))

    def test_open_page(self) -> None:
        item = public_comments.parse_detail(OPEN_PAGE, BASE)
        self.assertEqual(item["status"], "open")
        self.assertEqual(item["title"], "品川区福祉オンブズマン制度(素案)")
        self.assertEqual((item["start"], item["end"]), ("2026-11-15", "2026-12-15"))
        self.assertIsNone(item["applicants"])
        self.assertEqual(item["resultPlanned"], "令和9年3月中旬頃")
        self.assertEqual(item["department"], "福祉計画課 施設担当")

    def test_page_without_inquiry_block(self) -> None:
        # 2026-004 は末尾の「お問い合わせ」欄がなく、上部メニューにだけ同じ語がある
        page = """<title>2026-004「第12次品川区交通安全計画（素案）」に対する意見募集｜品川区公式ウェブサイト</title>
<ul><li><a href="#">お問い合わせ</a></li></ul>
<h1>2026-004「第12次品川区交通安全計画（素案）」に対する意見募集</h1>
<p>ページID：1009856</p>
<p>令和8年8月1日掲載「第12次品川区交通安全計画（素案）」に関する意見募集を行いました。</p>
<p>区民の皆さんから頂いたご意見を踏まえ、令和8年12月頃結果を公表する予定です。</p>
<h2>募集期間</h2><p>令和8年8月31日(月曜日)まで</p>"""
        item = public_comments.parse_detail(page, BASE)
        self.assertEqual(item["id"], "2026-004")
        self.assertEqual(item["title"], "第12次品川区交通安全計画（素案）")
        self.assertEqual((item["start"], item["end"]), ("2026-08-01", "2026-08-31"))
        self.assertEqual(item["resultPlanned"], "令和8年12月頃")
        self.assertIsNone(item["department"])

    def test_tilde_period_and_zero_counts(self) -> None:
        page = RESULT_PAGE.replace("令和7年2月1日(土曜日)から令和7年2月21日(金曜日)まで", "令和6年12月1日（日曜日）～令和6年12月27日（金曜日)")
        page = page.replace("応募者数　31人", "応募者数　0人").replace("意見件数　95件", "意見件数　0件")
        item = public_comments.parse_detail(page, BASE)
        self.assertEqual((item["start"], item["end"]), ("2024-12-01", "2024-12-27"))
        self.assertEqual((item["applicants"], item["opinions"]), (0, 0))

    def test_old_style_title_without_brackets(self) -> None:
        page = RESULT_PAGE.replace("2024-012「品川区こども計画」に関する結果公表", "2019-007　第二期品川区子ども・子育て支援事業計画(素案)に関する結果公表")
        item = public_comments.parse_detail(page, BASE)
        self.assertEqual(item["id"], "2019-007")
        self.assertEqual(item["title"], "第二期品川区子ども・子育て支援事業計画(素案)")


class ResultSeenTest(unittest.TestCase):
    """区のページには結果を公表した日が無い（更新日はサイト改修でそろって書き換わる）。
    当サイトが募集中から結果公表に変わったのを見つけた日を resultSeenAt として持つ。"""

    def item(self, status: str, **extra: object) -> dict:
        return {"id": "2026-005", "status": status, **extra}

    def test_records_the_day_a_result_first_appears(self) -> None:
        items = public_comments.carry_result_seen([self.item("result")], [self.item("open")], "2026-12-20")
        self.assertEqual(items[0]["resultSeenAt"], "2026-12-20")

    def test_keeps_the_first_day_on_later_runs(self) -> None:
        items = public_comments.carry_result_seen([self.item("result")], [self.item("result", resultSeenAt="2026-12-20")], "2027-01-10")
        self.assertEqual(items[0]["resultSeenAt"], "2026-12-20")

    def test_unknown_when_already_published_at_first_sight(self) -> None:
        # 初めて取得した時点で結果公表済みだった案件は、公表日が分からないので null のまま
        self.assertIsNone(public_comments.carry_result_seen([self.item("result")], [], "2026-12-20")[0]["resultSeenAt"])
        self.assertIsNone(public_comments.carry_result_seen([self.item("result")], None, "2026-12-20")[0]["resultSeenAt"])

    def test_open_items_have_no_result_date(self) -> None:
        self.assertIsNone(public_comments.carry_result_seen([self.item("open")], [self.item("open")], "2026-12-20")[0]["resultSeenAt"])


if __name__ == "__main__":
    unittest.main()
