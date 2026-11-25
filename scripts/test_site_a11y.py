"""配色のコントラストと表示設定の動作を検査する。"""
import re
import subprocess
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def luminance(color: str) -> float:
    """WCAG の相対輝度を返す。"""
    channels = [int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    linear = [v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in channels]
    return sum(v * weight for v, weight in zip(linear, (0.2126, 0.7152, 0.0722)))


class DisplaySettingsTests(unittest.TestCase):
    def test_settings_script_loads_before_the_body(self) -> None:
        script = '<script src="site-a11y.js"></script>'
        for page in ROOT.glob('*.html'):
            html = page.read_text(encoding='utf-8')
            if 'href="site-a11y.css"' not in html:
                continue
            with self.subTest(page=page.name):
                self.assertEqual(html.count(script), 1)
                self.assertIn(script, html.split('</head>', 1)[0])

    def test_settings(self) -> None:
        result = subprocess.run(['node', '--test', 'scripts/site-a11y.test.mjs'], cwd=ROOT,
                                capture_output=True, text=True, check=False)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_palette_contrast(self) -> None:
        css = (ROOT / 'site-theme.css').read_text()
        base = css.split(':root {', 1)[1].split('\n}', 1)[0]
        high = css.split('html[data-contrast="high"] {', 1)[1].split('}', 1)[0]
        for theme in ('warm', 'cool', 'teal', 'public-blue'):
            selector = f'html[data-color-theme="{theme}"]'
            self.assertIn(selector, css)
            block = css.split(selector + ' {', 1)[1].split('}', 1)[0]
            self.assertLess(css.index(selector), css.index('html[data-contrast="high"]'))
            for contrast in ('normal', 'high'):
                tokens = dict(re.findall(r'(--[\w-]+):\s*([^;]+);', base + block + (high if contrast == 'high' else '')))

                def resolve(name: str) -> str:
                    value = tokens[name]
                    return resolve(value[4:-1]) if value.startswith('var(') else value

                pairs = [(fg, bg, 4.5) for fg in ('--c-ink', '--c-ink-soft', '--c-ink-mute', '--c-main-dark')
                         for bg in ('--c-bg', '--c-card', '--c-surface-sub', '--c-main-pale', '--c-main-pale-2')]
                pairs += [('--c-border-strong', bg, 3) for bg in ('--c-bg', '--c-card', '--c-surface-sub')]
                tokens['--white'] = '#ffffff'
                pairs += [('--white', bg, 4.5) for bg in ('--c-main', '--c-main-dark', '--c-main-deep')]
                if theme == 'public-blue':
                    pairs += [('--c-border-strong', bg, 3) for bg in ('--c-main-pale', '--c-main-pale-2')]
                    pairs += [(f'--c-{status}', f'--c-{status}-bg', 4.5) for status in ('pass', 'fail', 'hold')]
                for fg, bg, minimum in pairs:
                    levels = sorted((luminance(resolve(fg)), luminance(resolve(bg))))
                    ratio = (levels[1] + 0.05) / (levels[0] + 0.05)
                    self.assertGreaterEqual(ratio, minimum, (theme, contrast, fg, bg, ratio))
