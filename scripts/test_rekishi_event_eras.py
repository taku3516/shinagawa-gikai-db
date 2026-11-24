#!/usr/bin/env python3
"""昭和戦前と昭和戦後の境目（昭和20年8月15日）を、出来事の時代区分が守っていることを確かめる。

和暦の検算は西暦を見るだけで、1945年の前半の出来事が「昭和戦後」になっていても通る。
空襲を起点とする出来事が戦後に分類されると、時代で絞り込んだときに戦前の空襲と別になる。
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import unittest

from check_rekishi_data import extract_object

ROOT = Path(__file__).resolve().parent.parent
BEFORE_SURRENDER = re.compile(r"昭和20年（1945年）[1-7]月")


class EventErasTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        source = (ROOT / "data" / "rekishi-events.js").read_text(encoding="utf-8")
        cls.events = extract_object(source, "window.SHINAGAWA_DB.rekishiEvents")["items"]

    def test_events_starting_before_surrender_are_not_postwar(self) -> None:
        for event in self.events:
            if event["era"] == "showa-post" and BEFORE_SURRENDER.match(event.get("yearText", "")):
                self.fail(f"{event['id']} は昭和20年8月より前に始まるが showa-post になっている")


if __name__ == "__main__":
    unittest.main()
