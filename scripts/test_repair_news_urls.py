"""repair_news_urls.py の検査。

品川区公式サイトのリニューアル（2026年10月20日）で、収集済みニュースの
出典URLが一斉に変わった。区は後日301リダイレクトを用意したので、
それを辿って新URLへ張り替える。新サイトから消えた記事は落とす。

IDは据え置く。★（お気に入り）が端末内とFirestoreにID単位で保存されているため。
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import repair_news_urls  # noqa: E402


OLD = "https://www.city.shinagawa.tokyo.jp/PC/kurashi/20260902135700.html"
NEW = "https://www.city.shinagawa.tokyo.jp/kurashi/sumai/1003539/1011558.html"
GONE = "https://www.city.shinagawa.tokyo.jp/PC/kurashi/20260815120000.html"
KEPT = "https://prtimes.jp/main/html/rd/p/000000274.000032205.html"


def items() -> list[dict]:
    return [
        {"id": "aaa", "url": OLD, "title": "住まいのお知らせ"},
        {"id": "bbb", "url": GONE, "title": "終了したイベント"},
        {"id": "ccc", "url": KEPT, "title": "よその記事"},
    ]


class RepairTest(unittest.TestCase):
    def test_旧URLを新URLへ張り替えIDは変えない(self) -> None:
        result, report = repair_news_urls.apply_resolution(items(), {OLD: NEW, GONE: None})
        self.assertEqual(result[0]["url"], NEW)
        self.assertEqual(result[0]["id"], "aaa")
        self.assertEqual(report["rewritten"], 1)

    def test_新サイトに無い記事は落とす(self) -> None:
        result, report = repair_news_urls.apply_resolution(items(), {OLD: NEW, GONE: None})
        self.assertNotIn(GONE, [item["url"] for item in result])
        self.assertEqual(report["dropped"], 1)

    def test_公式サイト以外の記事は触らない(self) -> None:
        result, report = repair_news_urls.apply_resolution(items(), {OLD: NEW, GONE: None})
        self.assertEqual(result[-1], items()[-1])
        self.assertEqual(report["untouched"], 1)

    def test_並び順を保つ(self) -> None:
        result, _ = repair_news_urls.apply_resolution(items(), {OLD: NEW, GONE: None})
        self.assertEqual([item["id"] for item in result], ["aaa", "ccc"])

    def test_対応表に無い旧URLはそのまま残す(self) -> None:
        """実測できなかったURLを黙って消さない。"""
        result, report = repair_news_urls.apply_resolution(items(), {})
        self.assertEqual(len(result), 3)
        self.assertEqual(report["unresolved"], 2)

    def test_旧URLがまだ生きているなら落とさない(self) -> None:
        """転送が無く200を返すURLは、消えたのではなく残っている。"""
        result, report = repair_news_urls.apply_resolution(items(), {OLD: OLD, GONE: None})
        self.assertEqual(result[0]["url"], OLD)
        self.assertEqual(report["rewritten"], 0)
        self.assertEqual(report["untouched"], 2)

    def test_張り替えでURLが重なったら1件にまとめる(self) -> None:
        """別々の旧URLが同じ新ページへ転送されることがある。"""
        pair = [
            {"id": "aaa", "url": OLD, "title": "同じ記事"},
            {"id": "bbb", "url": OLD + "?x=1", "title": "同じ記事"},
        ]
        result, report = repair_news_urls.apply_resolution(pair, {OLD: NEW, OLD + "?x=1": NEW})
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["id"], "aaa")  # 先に出てきた方を残す
        self.assertEqual(report["merged"], 1)

    def test_収集元一覧を設定ファイルから作り直す(self) -> None:
        payload = {"sources": [{"id": "shinagawa-city-new", "name": "旧", "url": OLD,
                                "type": "html", "enabled": True, "requiresApproval": False,
                                "note": ""}]}
        config = {"htmlSources": [{"id": "shinagawa-city-new", "name": "品川区 新着情報",
                                   "url": NEW, "enabled": True}], "rssFeeds": []}
        repair_news_urls.refresh_sources(payload, config)
        self.assertEqual(payload["sources"][0]["url"], NEW)
        self.assertEqual(payload["sources"][0]["name"], "品川区 新着情報")

    def test_旧URLの見分け(self) -> None:
        self.assertTrue(repair_news_urls.is_old_official(OLD))
        self.assertTrue(repair_news_urls.is_old_official(
            "https://www.city.shinagawa.tokyo.jp/ct/other000026200/shisei.pdf"))
        self.assertFalse(repair_news_urls.is_old_official(NEW))
        self.assertFalse(repair_news_urls.is_old_official(KEPT))


if __name__ == "__main__":
    unittest.main()
