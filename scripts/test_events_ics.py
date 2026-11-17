"""ICS（カレンダー購読ファイル）の検査。

Googleカレンダーは取り込みに失敗しても黙っていることが多く、
壊れていても利用者からは「増えない」としか見えない。
崩れやすいところを固定しておく。
  ・75オクテットでの折り返し（日本語は1文字3バイト）
  ・終日の予定の DTEND が翌日であること
  ・期間ものが1件にまとまること
"""

import sys
import unittest
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import events_ics  # noqa: E402

NOW = datetime(2026, 11, 17, 4, 0, 0, tzinfo=timezone.utc)
BASE = "https://taku3516.github.io/shinagawa-gikai-db/"


def event(**overrides) -> dict:
    base = {
        "id": "abc123", "title": "品川らくご会", "summary": "落語の会",
        "url": "https://example.com/e/1", "source": "品川区", "sourceId": "city-calendar",
        "category": "文化", "dates": ["2026-11-28"], "startTime": "", "endTime": "",
        "timeText": "", "place": "品川歴史館", "application": "", "deadline": "",
        "periods": [], "confidence": "official",
    }
    base.update(overrides)
    return base


class EscapeTest(unittest.TestCase):
    def test_記号を逃がす(self) -> None:
        self.assertEqual(events_ics.escape_text("a,b;c"), "a\\,b\;c")

    def test_改行は文字列のnに直す(self) -> None:
        self.assertEqual(events_ics.escape_text("上\n下"), "上\\n下")

    def test_円記号を先に逃がす(self) -> None:
        # \ を後から置換すると、他のエスケープで入れた \ を二重に逃がしてしまう
        self.assertEqual(events_ics.escape_text("a\\b,c"), "a\\\\b\\,c")


class FoldTest(unittest.TestCase):
    def test_短い行はそのまま(self) -> None:
        self.assertEqual(events_ics.fold("SUMMARY:短い"), "SUMMARY:短い")

    def test_日本語の行をバイト数で折る(self) -> None:
        line = "SUMMARY:" + "品" * 60  # 8 + 180バイト
        folded = events_ics.fold(line)
        self.assertIn("\r\n ", folded)
        for part in folded.split("\r\n"):
            self.assertLessEqual(len(part.encode("utf-8")), events_ics.FOLD_LIMIT)

    def test_折り返しても中身は変わらない(self) -> None:
        line = "DESCRIPTION:" + "あ" * 100
        restored = events_ics.fold(line).replace("\r\n ", "")
        self.assertEqual(restored, line)


class OccurrencesTest(unittest.TestCase):
    def test_単発は1件(self) -> None:
        self.assertEqual(events_ics.occurrences(event()), [("2026-11-28", "2026-11-28")])

    def test_複数日はそれぞれ1件(self) -> None:
        self.assertEqual(
            events_ics.occurrences(event(dates=["2026-11-03", "2026-12-05"])),
            [("2026-11-03", "2026-11-03"), ("2026-12-05", "2026-12-05")],
        )

    def test_期間ものは1件にまとまる(self) -> None:
        # 期間に含まれる開催日は、個別の予定として重ねて出さない
        occurrences = events_ics.occurrences(
            event(
                dates=["2026-11-20", "2026-11-21", "2026-11-22", "2026-11-23", "2026-11-24"],
                periods=[{"from": "2026-11-20", "to": "2026-11-24"}],
            )
        )
        self.assertEqual(occurrences, [("2026-11-20", "2026-11-24")])

    def test_期間の外の開催日は別に出す(self) -> None:
        occurrences = events_ics.occurrences(
            event(dates=["2026-11-20", "2026-12-25"], periods=[{"from": "2026-11-20", "to": "2026-11-21"}])
        )
        self.assertEqual(occurrences, [("2026-11-20", "2026-11-21"), ("2026-12-25", "2026-12-25")])


class VeventTest(unittest.TestCase):
    def _lines(self, ev: dict) -> list[str]:
        return events_ics.vevent(ev, events_ics.occurrences(ev)[0], NOW, BASE)

    def test_終日の予定はDTENDが翌日(self) -> None:
        lines = self._lines(event())
        self.assertIn("DTSTART;VALUE=DATE:20261128", lines)
        # 終わりは含まないので翌日を書く
        self.assertIn("DTEND;VALUE=DATE:20261129", lines)

    def test_時刻つきは日本時間で出す(self) -> None:
        lines = self._lines(event(startTime="10:00", endTime="12:30"))
        self.assertIn("DTSTART;TZID=Asia/Tokyo:20261128T100000", lines)
        self.assertIn("DTEND;TZID=Asia/Tokyo:20261128T123000", lines)

    def test_終了時刻が無ければ1時間にする(self) -> None:
        lines = self._lines(event(startTime="14:00"))
        self.assertIn("DTEND;TZID=Asia/Tokyo:20261128T150000", lines)

    def test_推定の開催日は未確定として出す(self) -> None:
        lines = self._lines(event(confidence="estimated"))
        self.assertIn("STATUS:TENTATIVE", lines)
        self.assertTrue(any("推定" in line for line in lines))

    def test_UIDは開催日ごとに分かれる(self) -> None:
        ev = event(dates=["2026-11-03", "2026-12-05"])
        uids = [
            line
            for occurrence in events_ics.occurrences(ev)
            for line in events_ics.vevent(ev, occurrence, NOW, BASE)
            if line.startswith("UID:")
        ]
        self.assertEqual(len(set(uids)), 2)
        self.assertTrue(all(uid.endswith("@shinagawa-gikai-db") for uid in uids))


class BuildCalendarTest(unittest.TestCase):
    def test_全体の骨格(self) -> None:
        text = events_ics.build_calendar([event()], "品川区のイベント", "説明", BASE, NOW)
        self.assertTrue(text.startswith("BEGIN:VCALENDAR\r\n"))
        self.assertTrue(text.endswith("END:VCALENDAR\r\n"))
        self.assertIn("VERSION:2.0", text)
        self.assertIn("TZID:Asia/Tokyo", text)
        self.assertIn("X-WR-CALNAME:品川区のイベント", text)
        # BEGIN と END の数が合っていること
        self.assertEqual(text.count("BEGIN:VEVENT"), text.count("END:VEVENT"))

    def test_改行はCRLF(self) -> None:
        text = events_ics.build_calendar([event()], "名", "説明", BASE, NOW)
        self.assertNotIn("\n", text.replace("\r\n", ""))

    def test_イベントが無くても壊れない(self) -> None:
        text = events_ics.build_calendar([], "名", "説明", BASE, NOW)
        self.assertIn("END:VCALENDAR", text)
        self.assertEqual(text.count("BEGIN:VEVENT"), 0)


if __name__ == "__main__":
    unittest.main()
