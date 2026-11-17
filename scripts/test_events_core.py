"""イベントの日付・時刻の読み取りと、同一判定の検査。

開催日はカレンダーの土台なので、読み違えるとそのまま誤った日に並ぶ。
特に次の3つは外しやすいので固定しておく。
  ・和暦（令和8年＝2026年）
  ・午後0時30分＝12:30（午後1時＝13:00と地続きで間違えやすい）
  ・年の書いていない「1月5日」が、11月の記事では翌年を指すこと
"""

import sys
import unittest
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import events_core  # noqa: E402


class NormalizeDateTest(unittest.TestCase):
    def test_区公式の区切りを読む(self) -> None:
        self.assertEqual(events_core.normalize_date("2026/11/03"), "2026-11-03")

    def test_年月日の表記を読む(self) -> None:
        self.assertEqual(events_core.normalize_date("2026年11月21日（土）"), "2026-11-21")

    def test_和暦を西暦に直す(self) -> None:
        self.assertEqual(events_core.normalize_date("令和8年11月4日"), "2026-11-04")
        self.assertEqual(events_core.normalize_date("令和元年5月1日"), "2019-05-01")
        self.assertEqual(events_core.normalize_date("平成31年4月30日"), "2019-04-30")

    def test_全角の数字を読む(self) -> None:
        self.assertEqual(events_core.normalize_date("２０２６年１１月２１日"), "2026-11-21")

    def test_実在しない日付は捨てる(self) -> None:
        self.assertEqual(events_core.normalize_date("2026年2月30日"), "")

    def test_日付が無ければ空文字(self) -> None:
        self.assertEqual(events_core.normalize_date("開催日未定"), "")
        self.assertEqual(events_core.normalize_date(None), "")


class ParseTimeRangeTest(unittest.TestCase):
    def test_午前午後の表記を読む(self) -> None:
        self.assertEqual(
            events_core.parse_time_range("午前10時00分から午後0時30分まで"),
            ("10:00", "12:30"),
        )

    def test_午後1時は13時(self) -> None:
        self.assertEqual(events_core.parse_time_range("午後1時から午後3時"), ("13:00", "15:00"))

    def test_全角コロンと波ダッシュを読む(self) -> None:
        self.assertEqual(events_core.parse_time_range("10：00～16：00"), ("10:00", "16:00"))

    def test_後半が午前午後を引き継ぐ(self) -> None:
        # 「午後2時～4時」の4時は午後4時。引き継がないと04:00になり、
        # 終了が開始より前という壊れた時刻が出る
        self.assertEqual(events_core.parse_time_range("午後2時～4時"), ("14:00", "16:00"))
        self.assertEqual(events_core.parse_time_range("午後1時30分～4時30分"), ("13:30", "16:30"))
        self.assertEqual(events_core.parse_time_range("午後4時から7時30分"), ("16:00", "19:30"))

    def test_後半に午前午後があればそちらが優先(self) -> None:
        self.assertEqual(events_core.parse_time_range("午前10時00分から午後0時30分まで"), ("10:00", "12:30"))

    def test_午前午後の無い表記はそのまま(self) -> None:
        self.assertEqual(events_core.parse_time_range("10時から12時"), ("10:00", "12:00"))
        self.assertEqual(events_core.parse_time_range("9:00～17:00"), ("09:00", "17:00"))

    def test_開始だけの表記(self) -> None:
        self.assertEqual(events_core.parse_time_range("午前9時集合"), ("09:00", ""))

    def test_時刻が無ければ空文字(self) -> None:
        self.assertEqual(events_core.parse_time_range("終日"), ("", ""))
        self.assertEqual(events_core.parse_time_range(""), ("", ""))


class InferYearTest(unittest.TestCase):
    def test_先の月はその年(self) -> None:
        self.assertEqual(events_core.infer_year(11, 28, date(2026, 11, 16)), "2026-11-28")

    def test_年をまたぐ告知は翌年(self) -> None:
        # 11月の記事が告げる「1月5日」は翌年
        self.assertEqual(events_core.infer_year(1, 5, date(2026, 11, 16)), "2027-01-05")

    def test_少し前の日付は同じ年のまま(self) -> None:
        # 配信が開催直後になることがある。1か月以内は同じ年に置く
        self.assertEqual(events_core.infer_year(11, 1, date(2026, 11, 16)), "2026-11-01")

    def test_うるう日は存在する年に寄せる(self) -> None:
        self.assertEqual(events_core.infer_year(2, 29, date(2027, 11, 1)), "2028-02-29")


class ExtractDatesTest(unittest.TestCase):
    def test_本文から開催日を拾う(self) -> None:
        text = "「品川らくご会Vol.1」が11月28日、品川区立品川歴史館（品川区大井6）2階講堂で開催される。"
        self.assertEqual(
            events_core.extract_dates_from_text(text, "2026-11-16T07:35:06Z"),
            ["2026-11-28"],
        )

    def test_年つきの日付を優先して二重に数えない(self) -> None:
        text = "令和8年11月4日に開催。11月4日は休館日ではありません。"
        self.assertEqual(
            events_core.extract_dates_from_text(text, "2026-10-01T00:00:00Z"),
            ["2026-11-04"],
        )

    def test_複数の日付を順に拾う(self) -> None:
        text = "11月3日と12月5日の2回開催します。"
        self.assertEqual(
            events_core.extract_dates_from_text(text, "2026-10-01T00:00:00Z"),
            ["2026-11-03", "2026-12-05"],
        )

    def test_基準日が読めなければ何も返さない(self) -> None:
        self.assertEqual(events_core.extract_dates_from_text("11月3日", ""), [])


class SummaryTextTest(unittest.TestCase):
    def test_本文のURLを落とす(self) -> None:
        # 収集元が古いURLを本文に書いたままのことがある。要約に混ぜない
        text = "詳しくは https://www.city.shinagawa.tokyo.jp/PC/sangyo/x.html をご覧ください"
        self.assertEqual(events_core.summary_text(text), "詳しくは をご覧ください")

    def test_タグを落として詰める(self) -> None:
        self.assertEqual(events_core.summary_text("<p>あ  い</p>"), "あ い")

    def test_長い要約を切る(self) -> None:
        result = events_core.summary_text("あ" * 300, limit=50)
        self.assertEqual(len(result), 50)
        self.assertTrue(result.endswith("…"))


class SameEventTest(unittest.TestCase):
    def _event(self, title: str, dates: list[str], confidence: str = "official") -> dict:
        return {
            "id": events_core.event_id("x", "https://example.com/" + title, title),
            "title": title,
            "dates": dates,
            "confidence": confidence,
            "sourceId": "x",
            "source": "x",
            "url": "https://example.com/" + title,
        }

    def test_同じ日で同じ題なら同一(self) -> None:
        a = self._event("品川らくご会Vol.1", ["2026-11-28"])
        b = self._event("品川らくご会 Vol.1", ["2026-11-28"])
        self.assertTrue(events_core.same_event(a, b))

    def test_見出しが会場を足していても同一(self) -> None:
        a = self._event("品川らくご会Vol.1", ["2026-11-28"])
        b = self._event("品川歴史館で「品川らくご会Vol.1」開催へ", ["2026-11-28"])
        self.assertTrue(events_core.same_event(a, b))

    def test_日が違えば別物(self) -> None:
        a = self._event("品川らくご会Vol.1", ["2026-11-28"])
        b = self._event("品川らくご会Vol.1", ["2026-12-28"])
        self.assertFalse(events_core.same_event(a, b))

    def test_短い一般語だけでは結びつけない(self) -> None:
        a = self._event("講座", ["2026-11-28"])
        b = self._event("子育て講座のお知らせ", ["2026-11-28"])
        self.assertFalse(events_core.same_event(a, b))


class MergeEventsTest(unittest.TestCase):
    def test_確度の高い記録が本体になる(self) -> None:
        official = {
            "id": "aaa", "title": "品川らくご会Vol.1", "dates": ["2026-11-28"],
            "confidence": "official", "sourceId": "city-calendar", "source": "区",
            "url": "https://city.example/1", "place": "品川歴史館",
        }
        estimated = {
            "id": "bbb", "title": "品川歴史館で「品川らくご会Vol.1」開催へ",
            "dates": ["2026-11-28"], "confidence": "estimated", "sourceId": "news",
            "source": "品川経済新聞", "url": "https://news.example/5117",
        }
        merged = events_core.merge_events([estimated, official])
        self.assertEqual(len(merged), 1)
        kept = merged[0]
        self.assertEqual(kept["confidence"], "official")
        self.assertEqual(kept["place"], "品川歴史館")
        # 先に出たIDを保つ（★の保存先が変わらないようにする）
        self.assertEqual(kept["id"], "bbb")
        self.assertEqual([x["sourceId"] for x in kept["alsoSeenIn"]], ["news"])

    def test_開催日は両方の和をとる(self) -> None:
        a = {"id": "a", "title": "健診", "dates": ["2026-11-03"], "confidence": "official",
             "sourceId": "s", "source": "s", "url": "https://a.example/1"}
        b = {"id": "b", "title": "健診", "dates": ["2026-11-03", "2026-12-05"],
             "confidence": "published", "sourceId": "t", "source": "t", "url": "https://b.example/1"}
        merged = events_core.merge_events([a, b])
        self.assertEqual(merged[0]["dates"], ["2026-11-03", "2026-12-05"])

    def test_別のイベントは残る(self) -> None:
        a = {"id": "a", "title": "健診", "dates": ["2026-11-03"], "confidence": "official",
             "sourceId": "s", "source": "s", "url": "https://a.example/1"}
        b = {"id": "b", "title": "防災訓練", "dates": ["2026-11-03"], "confidence": "official",
             "sourceId": "s", "source": "s", "url": "https://a.example/2"}
        self.assertEqual(len(events_core.merge_events([a, b])), 2)


class EventIdTest(unittest.TestCase):
    def test_同じ材料なら同じID(self) -> None:
        first = events_core.event_id("city", "https://example.com/a/", "催し")
        second = events_core.event_id("city", "https://example.com/a", "催し")
        self.assertEqual(first, second)

    def test_収集元が違えば別のID(self) -> None:
        self.assertNotEqual(
            events_core.event_id("city", "https://example.com/a", "催し"),
            events_core.event_id("news", "https://example.com/a", "催し"),
        )


if __name__ == "__main__":
    unittest.main()
