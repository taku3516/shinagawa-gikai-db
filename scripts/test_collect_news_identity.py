"""記事の同一判定の検査。

記事IDは正規化したURLのsha256から作る。
品川区公式サイトのリニューアル（2026年10月20日）で記事のURLが変わったため、
既存記事のURLだけを新URLへ書き換え、IDは据え置いた。
利用者の★（お気に入り）が端末内とFirestoreにID単位で保存されており、
IDを振り直すと★が外れるため。

その結果 id ≠ sha256(url) の記事が生まれる。収集側がIDだけで突き合わせると、
同じ記事を新IDでもう1件足してしまう。URLでも突き合わせて防ぐ。
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import collect_news  # noqa: E402


NEW_URL = "https://www.city.shinagawa.tokyo.jp/kurashi/sumai/1003539/1011558.html"
OLD_ID = "0123456789abcdef0123"  # 旧URLから作られ、据え置かれたID


class ItemIdentityTest(unittest.TestCase):
    def test_URLが一致する既存記事のIDを引き継ぐ(self) -> None:
        index = collect_news.build_url_index([{"id": OLD_ID, "url": NEW_URL}])
        item = {"id": collect_news.item_id(NEW_URL), "url": NEW_URL}
        self.assertNotEqual(item["id"], OLD_ID)
        collect_news.reuse_existing_id(item, index)
        self.assertEqual(item["id"], OLD_ID)

    def test_末尾スラッシュ等の揺れを吸収する(self) -> None:
        index = collect_news.build_url_index([{"id": OLD_ID, "url": NEW_URL}])
        item = {"id": "x" * 20, "url": NEW_URL.replace("https://", "HTTPS://") + "/"}
        collect_news.reuse_existing_id(item, index)
        self.assertEqual(item["id"], OLD_ID)

    def test_知らないURLはIDを変えない(self) -> None:
        index = collect_news.build_url_index([{"id": OLD_ID, "url": NEW_URL}])
        other = "https://www.city.shinagawa.tokyo.jp/kusei/senkyo/1010746/1010757.html"
        item = {"id": collect_news.item_id(other), "url": other}
        collect_news.reuse_existing_id(item, index)
        self.assertEqual(item["id"], collect_news.item_id(other))

    def test_URLの無い既存記事は索引に入れない(self) -> None:
        index = collect_news.build_url_index([{"id": OLD_ID, "url": ""}, {"id": "y" * 20}])
        self.assertEqual(index, {})


if __name__ == "__main__":
    unittest.main()
