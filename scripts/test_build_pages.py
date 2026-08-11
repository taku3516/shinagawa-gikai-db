#!/usr/bin/env python3

from pathlib import Path
import tempfile
import unittest

from build_pages import GOOGLE_API_KEY, build


class BuildPagesTest(unittest.TestCase):
    def test_rejects_invalid_key(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaisesRegex(ValueError, "Google APIキー"):
                build(Path(directory) / "site", "not-an-api-key")

    def test_generated_config_uses_runtime_key_without_changing_source(self) -> None:
        api_key = "AIza" + "A" * 35
        source = Path(__file__).resolve().parents[1] / "data" / "firebase-config.js"
        before = source.read_text(encoding="utf-8")

        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "site"
            build(output, api_key)
            generated = (output / "data" / "firebase-config.js").read_text(
                encoding="utf-8"
            )

        self.assertRegex(api_key, GOOGLE_API_KEY)
        self.assertIn("enabled: true", generated)
        self.assertIn(api_key, generated)
        self.assertEqual(before, source.read_text(encoding="utf-8"))
        self.assertIn("enabled: false", before)
        self.assertNotRegex(before, GOOGLE_API_KEY)


if __name__ == "__main__":
    unittest.main()
