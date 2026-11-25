import unittest

from civic_answer import AnswerService, Evidence

RECORD = Evidence(
    "project-1", "史料", "https://example.invalid/source", "第1節", "2024年度",
    "記録のある事実です。",
)


class AnswerServiceTest(unittest.TestCase):
    def test_出典の候補以外を回答に入れない(self) -> None:
        selector = lambda request: ["unknown", "project-1", "project-1"]
        service = AnswerService(lambda _: [RECORD], selector, daily_limit=5)
        result = service.answer("記録について")
        self.assertEqual(result["evidence"], [{
            "id": RECORD.id, "title": RECORD.title, "url": RECORD.url,
            "locator": RECORD.locator, "period": RECORD.period, "excerpt": RECORD.excerpt,
        }])

    def test_候補がなければモデルを呼ばない(self) -> None:
        def unexpected(_: dict) -> list:
            self.fail("出典がない場合にモデルを呼びました。")
        service = AnswerService(lambda _: [], unexpected, daily_limit=5)
        self.assertEqual(service.answer("情報がない質問")["evidence"], [])

    def test_質問の長さと利用回数を制限する(self) -> None:
        service = AnswerService(lambda _: [RECORD], lambda _: ["project-1"], daily_limit=1)
        with self.assertRaises(ValueError):
            service.answer("あ" * 501)
        self.assertTrue(service.answer("質問")["evidence"])
        with self.assertRaises(OverflowError):
            service.answer("別の質問")

    def test_出典欄と本文を分離してモデルには本文と識別子を渡す(self) -> None:
        def select(request: dict) -> list[str]:
            self.assertEqual(request["candidates"], [{"id": RECORD.id, "text": RECORD.excerpt}])
            self.assertEqual(request["max_output_tokens"], 128)
            return [RECORD.id]
        service = AnswerService(lambda _: [RECORD], select, daily_limit=5)
        self.assertEqual(service.answer("質問")["evidence"][0]["url"], RECORD.url)
