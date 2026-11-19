"""品川区との関連性判定・重複除去・Googleニュース取り込みの検査。

「品川」を含むだけでは品川区の話とは限らない。品川駅は港区にあり、
区内の地名（大井・平塚・小山・目黒・大崎）は他の自治体とも同名である。
逆に区内の地名には「品川」を含まないものが多い。
ここではその取り違えが起きないことを確かめる。
"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import collect_news  # noqa: E402


def classifier() -> "collect_news.Classifier":
    import json
    config = json.loads((Path(__file__).resolve().parents[1] / "data" / "news-sources.json").read_text(encoding="utf-8"))
    return collect_news.Classifier(config)


class RelevanceTest(unittest.TestCase):
    def setUp(self) -> None:
        self.classifier = classifier()

    def test_品川区の明記は強く効く(self) -> None:
        self.assertGreaterEqual(self.classifier.score("品川区が子育て支援の補助金を拡充"), 8)

    def test_品川駅だけの記事は区の話として拾わない(self) -> None:
        # 品川駅は港区にある。一般紙の minScore=8 を超えてはいけない。
        score = self.classifier.score("品川駅の港南口で再開発ビルが開業　高輪ゲートウェイと接続")
        self.assertLess(score, 8)

    def test_品川ナンバーの記事は区の話として拾わない(self) -> None:
        self.assertLess(self.classifier.score("品川ナンバーの車が事故を起こした"), 8)

    def test_品川区と書いてあれば品川駅の話でも拾う(self) -> None:
        score = self.classifier.score("品川区は品川駅周辺の再開発について港区と協議する")
        self.assertGreaterEqual(score, 8)

    def test_区内固有の地名は品川を含まなくても拾う(self) -> None:
        for text in ("武蔵小山商店街でイルミネーションが点灯", "戸越銀座の店舗が建て替え", "旗の台の保育園が開園"):
            with self.subTest(text=text):
                self.assertGreaterEqual(self.classifier.score(text), 4, text)

    def test_他自治体と同名の地名だけでは拾わない(self) -> None:
        # 平塚市・小山市・大崎市の話を品川区の記事にしない。
        for text in ("神奈川県平塚市で花火大会", "栃木県小山市の小山駅前が再整備", "宮城県大崎市で大雨"):
            with self.subTest(text=text):
                self.assertLess(self.classifier.score(text), 8, text)

    def test_紛らわしい地名も区内の手がかりがあれば加点する(self) -> None:
        with_hint = self.classifier.score("品川区平塚の小山台で町会が防災訓練")
        without_hint = self.classifier.score("平塚の小山台で町会が防災訓練")
        self.assertGreater(with_hint, without_hint)


    def test_紛らわしい地名も単独では満点にしない(self) -> None:
        # 「大井」は区内の地名だが、他地域にもある。区内の手がかりと一緒のときだけ効かせる。
        alone = self.classifier.score("大井で工事が始まる")
        with_hint = self.classifier.score("品川区の大井で工事が始まる")
        self.assertLess(alone, 4)
        self.assertGreater(with_hint, self.classifier.score("品川区で工事が始まる"))

    def test_大井町だけでは神奈川県大井町と見分けられない(self) -> None:
        # 足柄上郡大井町（神奈川県）の記事を品川区の記事にしない。
        self.assertLess(self.classifier.score("大井町と町社協が認知症を考える講座"), 8)
        self.assertLess(self.classifier.score("大井町、福祉避難所開設へ民間事業者3者と協定"), 8)

    def test_大井町も区内の手がかりがあれば拾う(self) -> None:
        self.assertGreaterEqual(self.classifier.score("イトーヨーカドー大井町店が改装　東京都品川区"), 8)
        self.assertGreaterEqual(self.classifier.score("大井町駅前の再開発が進む"), 4)

    def test_区内の駅名に区外の駅名が含まれていても減点しない(self) -> None:
        # 「北品川駅」には「品川駅」が含まれる。部分一致で区内の駅を巻き添えにしない。
        self.assertGreaterEqual(self.classifier.score("北品川駅で人身事故"), 8)
        self.assertGreaterEqual(self.classifier.score("新馬場駅と北品川駅の間で工事"), 8)

    def test_区内の駅名を巻き込んでも区外の駅は減点したまま(self) -> None:
        self.assertLess(self.classifier.score("大崎駅から品川駅へ向かう利用者が増えた"), 8)
        self.assertLess(self.classifier.score("品川駅の港南口で再開発ビルが開業"), 8)

    def test_区外を指す語が並ぶ記事は落とす(self) -> None:
        # 大崎駅という区内の手がかりはあるが、記事の中心は港区側。
        score = self.classifier.score(
            "品川プリンスホテルと高輪ゲートウェイの周辺で再開発　大崎駅からもアクセス"
        )
        self.assertLess(score, 4)

    def test_区外の語があっても品川区と明記されていれば落とさない(self) -> None:
        score = self.classifier.score("品川区が品川プリンスホテルで区民向けの催しを開く")
        self.assertGreaterEqual(score, 8)


class DedupeTest(unittest.TestCase):
    def test_計測用パラメータを落として同じURLとみなす(self) -> None:
        a = "https://example.com/news/1?utm_source=google&utm_medium=rss"
        b = "https://example.com/news/1"
        self.assertEqual(collect_news.dedupe_key(a), collect_news.dedupe_key(b))

    def test_記事IDはURL正規化のままで変えない(self) -> None:
        # ★（お気に入り）が id 単位で保存されているため、id の作り方は変えない。
        url = "https://example.com/news/1?utm_source=google"
        self.assertEqual(collect_news.item_id(url), collect_news.item_id(url))
        self.assertNotEqual(collect_news.item_id(url), collect_news.item_id("https://example.com/news/1"))

    def test_見出しの正規化で媒体名と飾りを落とす(self) -> None:
        self.assertEqual(
            collect_news.normalized_title("【品川区】戸越銀座でイベント - 号外NET 品川区"),
            collect_news.normalized_title("戸越銀座でイベント"),
        )

    def test_媒体公式RSSがGoogleニュース経由より優先される(self) -> None:
        official = {"id": "a", "title": "戸越銀座でイベント", "url": "https://shinagawa.keizai.biz/headline/1/",
                    "publishedAt": "2026-11-18T00:00:00Z", "sourcePriority": 50}
        via_google = {"id": "b", "title": "戸越銀座でイベント - 品川経済新聞", "url": "https://news.google.com/rss/articles/XYZ",
                      "publishedAt": "2026-11-18T03:00:00Z", "sourcePriority": 10, "viaAggregator": True}
        kept, dropped = collect_news.deduplicate([official, via_google])
        self.assertEqual([item["id"] for item in kept], ["a"])
        self.assertEqual(dropped, 1)

    def test_別の報道機関が独自に書いた記事は残す(self) -> None:
        a = {"id": "a", "title": "品川区で火災", "url": "https://www.asahi.com/articles/1.html",
             "publishedAt": "2026-11-18T00:00:00Z", "sourcePriority": 50}
        b = {"id": "b", "title": "品川区で火災", "url": "https://news.ntv.co.jp/category/2.html",
             "publishedAt": "2026-11-18T01:00:00Z", "sourcePriority": 50}
        kept, dropped = collect_news.deduplicate([a, b])
        self.assertEqual(len(kept), 2)
        self.assertEqual(dropped, 0)

    def test_掲載日が離れた同名見出しは別の記事として残す(self) -> None:
        a = {"id": "a", "title": "区民まつり開催", "url": "https://shinagawa.keizai.biz/headline/9/",
             "publishedAt": "2025-10-01T00:00:00Z", "sourcePriority": 50}
        b = {"id": "b", "title": "区民まつり開催 - 品川経済新聞", "url": "https://news.google.com/rss/articles/AAA",
             "publishedAt": "2026-10-01T00:00:00Z", "sourcePriority": 10, "viaAggregator": True}
        kept, dropped = collect_news.deduplicate([a, b])
        self.assertEqual(len(kept), 2)
        self.assertEqual(dropped, 0)


    def test_サイト名の付いた見出しを同じ記事とみなす(self) -> None:
        self.assertEqual(
            collect_news.normalized_title("品川区福祉オンブズマン制度｜品川区公式ウェブサイト"),
            collect_news.normalized_title("品川区福祉オンブズマン制度"),
        )

    def test_直接取得している媒体の記事はGoogle経由では採らない(self) -> None:
        # 公式RSSから同じ記事が入るため、Google経由の重複を入口で断つ。
        self.assertTrue(collect_news.is_already_collected_outlet(
            {"outletUrl": "https://www.city.shinagawa.tokyo.jp", "outlet": "www.city.shinagawa.tokyo.jp"},
            ["city.shinagawa.tokyo.jp"],
        ))
        self.assertFalse(collect_news.is_already_collected_outlet(
            {"outletUrl": "https://www.tokyo-np.co.jp", "outlet": "東京新聞"},
            ["city.shinagawa.tokyo.jp"],
        ))

    def test_前置きが同じ長い見出しもGoogle経由なら同じ記事とみなす(self) -> None:
        official = {"id": "a", "sourcePriority": 50, "publishedAt": "2026-11-19T05:00:00Z",
                    "url": "https://www.tokyu.co.jp/company/information/detail/62556.html",
                    "title": "【イベントレポート】 「縁線図鑑」開設２周年「１１月５日(木) いいご縁の日 縁線図鑑の奢りデー」 学芸大学駅、武蔵小山駅、三軒茶屋駅など東急線沿線の２６店舗で開催！ ～新たな“ご縁”～"}
        via_google = {"id": "b", "sourcePriority": 10, "viaAggregator": "Googleニュース",
                      "publishedAt": "2026-11-19T05:00:02Z",
                      "url": "https://news.google.com/rss/articles/ZZZ",
                      "title": "【イベントレポート】「縁線図鑑」開設２周年「１１月５日(木) いいご縁の日 縁線図鑑の奢りデー」学芸大学駅、武蔵小山駅、三軒茶屋駅など東急線沿線の２６店舗で開催！ - PR TIMES"}
        kept, dropped = collect_news.deduplicate([official, via_google])
        self.assertEqual([item["id"] for item in kept], ["a"])
        self.assertEqual(dropped, 1)

    def test_前置きが違えば別の記事として残す(self) -> None:
        a = {"id": "a", "sourcePriority": 50, "publishedAt": "2026-11-19T00:00:00Z",
             "url": "https://www.yomiuri.co.jp/1/", "title": "品川区長選挙、森沢恭子さんの経歴と主張…子育て支援の拡充を"}
        b = {"id": "b", "sourcePriority": 10, "viaAggregator": "Googleニュース",
             "publishedAt": "2026-11-19T01:00:00Z", "url": "https://news.google.com/rss/articles/QQQ",
             "title": "品川区長選挙、現職の森沢恭子氏が再選果たす…投票率３４・３９％ - 読売新聞オンライン"}
        kept, dropped = collect_news.deduplicate([a, b])
        self.assertEqual(len(kept), 2)
        self.assertEqual(dropped, 0)


    def test_配信元を入れ替えても記事IDを引き継ぐ(self) -> None:
        # ★（お気に入り）と非表示はID単位で保存されている。
        # Googleニュース経由で先に入った記事を公式RSSの記事に差し替えるとき、
        # IDを振り直すと利用者の★が外れる。
        archived = {"id": "0123456789abcdef0123", "title": "戸越銀座でイベント",
                    "url": "https://news.google.com/rss/articles/XYZ",
                    "collectedAt": "2026-11-01T00:00:00Z", "sourcePriority": 10,
                    "viaAggregator": "Googleニュース"}
        replacement = {"id": collect_news.item_id("https://shinagawa.keizai.biz/headline/1/"),
                       "title": "戸越銀座でイベント",
                       "url": "https://shinagawa.keizai.biz/headline/1/",
                       "collectedAt": "2026-11-19T00:00:00Z", "sourcePriority": 50}

        collect_news.inherit_identity(replacement, archived)

        self.assertEqual(replacement["id"], "0123456789abcdef0123")
        self.assertEqual(replacement["collectedAt"], "2026-11-01T00:00:00Z")
        self.assertEqual(replacement["url"], "https://shinagawa.keizai.biz/headline/1/")

    def test_引き継ぐIDが無ければそのまま(self) -> None:
        replacement = {"id": "abc", "collectedAt": "2026-11-19T00:00:00Z"}
        collect_news.inherit_identity(replacement, {})
        self.assertEqual(replacement["id"], "abc")
        self.assertEqual(replacement["collectedAt"], "2026-11-19T00:00:00Z")


class GoogleNewsTest(unittest.TestCase):
    FEED = b"""<?xml version="1.0"?><rss version="2.0"><channel>
    <item><title>&#12304;&#21697;&#24029;&#21306;&#12305;&#25144;&#36234;&#37504;&#24231; - &#21495;&#22806;NET</title>
    <link>https://news.google.com/rss/articles/CBMiABC?oc=5</link>
    <pubDate>Wed, 18 Nov 2026 02:10:00 GMT</pubDate>
    <description>&lt;a href="https://news.google.com/rss/articles/CBMiABC"&gt;x&lt;/a&gt;&amp;nbsp;&lt;font color="#6f6f6f"&gt;&#21495;&#22806;NET&lt;/font&gt;</description>
    <source url="https://shinagawa.goguynet.jp">&#21495;&#22806;NET</source></item>
    </channel></rss>"""

    def test_見出しから媒体名を切り出す(self) -> None:
        items = collect_news.rss_items(self.FEED, google_news=True)
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["title"], "【品川区】戸越銀座")
        self.assertEqual(items[0]["outlet"], "号外NET")
        self.assertEqual(items[0]["outletUrl"], "https://shinagawa.goguynet.jp")

    def test_要約は空にする(self) -> None:
        # Googleの description は本文ではなくリンクと媒体名だけ。転載にもあたる。
        items = collect_news.rss_items(self.FEED, google_news=True)
        self.assertEqual(items[0]["summary"], "")


class LenientXmlTest(unittest.TestCase):
    def test_裸のアンパサンドを含むRSSでも読める(self) -> None:
        payload = b"<rss><channel><item><title>A & B</title><link>https://example.com/1</link></item></channel></rss>"
        items = collect_news.rss_items(payload)
        self.assertEqual(len(items), 1)

    def test_制御文字を含むRSSでも読める(self) -> None:
        payload = b"<rss><channel><item><title>A\x0bB</title><link>https://example.com/1</link></item></channel></rss>"
        items = collect_news.rss_items(payload)
        self.assertEqual(len(items), 1)


if __name__ == "__main__":
    unittest.main()
