import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

/** @param {string|null} saved @param {boolean} blocked @param {string} readyState @returns {object} */
function load(saved = null, blocked = false, readyState = 'complete') {
  const handlers = {};
  const inputs = [];
  const note = {};
  const controls = {};
  const wrapper = {
    set innerHTML(html) {
      for (const match of html.matchAll(/value="([^"]+)" data-a11y-setting="([^"]+)"/g)) {
        inputs.push({ value: match[1], dataset: { a11ySetting: match[2] } });
      }
    },
    querySelector(selector) {
      if (selector === '.a11y-storage-note') return note;
      return controls[selector] ||= { addEventListener: (type, fn) => { handlers[selector + type] = fn; } };
    },
    addEventListener: (type, fn) => { handlers[type] = fn; }
  };
  const document = {
    documentElement: { dataset: {} }, readyState,
    querySelector: () => null, querySelectorAll: () => inputs,
    createElement: () => wrapper, body: { appendChild() {} },
    addEventListener: (type, fn) => { handlers[type] = fn; }
  };
  const warnings = [];
  runInNewContext(readFileSync(new URL('../site-a11y.js', import.meta.url), 'utf8'), {
    document, console: { warn: (...args) => warnings.push(args) },
    localStorage: {
      getItem() { if (blocked) throw new Error('保存禁止'); return saved; },
      setItem(key, value) { if (blocked) throw new Error('保存禁止'); saved = value; }
    }
  });
  return { document, inputs, handlers, note, warnings, saved: () => saved };
}

test('初期状態と旧設定では標準配色を維持する', () => {
  for (const saved of [null, '{"fontSize":"large","contrast":"high"}']) {
    const app = load(saved);
    assert.equal(app.document.documentElement.dataset.colorTheme, 'normal');
    assert.ok(app.inputs.find(i => i.dataset.a11ySetting === 'colorTheme' && i.value === 'normal').checked);
    if (saved) assert.equal(app.document.documentElement.dataset.contrast, 'high');
  }
});

test('配色の変更・再読込・リセットと他の設定の併用', () => {
  for (const value of ['warm', 'cool', 'teal', 'public-blue']) {
    const app = load('{"fontSize":"large","contrast":"high","motion":"reduced"}');
    const input = app.inputs.find(i => i.value === value && i.dataset.a11ySetting === 'colorTheme');
    assert.ok(input);
    app.handlers.change({ target: { closest: () => input } });
    assert.equal(app.document.documentElement.dataset.colorTheme, value);
    const restored = load(app.saved());
    assert.equal(restored.document.documentElement.dataset.colorTheme, value);
    assert.equal(restored.document.documentElement.dataset.fontSize, 'large');
    assert.equal(restored.document.documentElement.dataset.contrast, 'high');
    assert.equal(restored.document.documentElement.dataset.motion, 'reduced');
    const contrast = restored.inputs.find(i => i.dataset.a11ySetting === 'contrast' && i.value === 'normal');
    restored.handlers.change({ target: { closest: () => contrast } });
    assert.equal(restored.document.documentElement.dataset.colorTheme, value);
    restored.handlers['.a11y-resetclick']();
    assert.equal(restored.document.documentElement.dataset.colorTheme, 'normal');
    assert.equal(restored.document.documentElement.dataset.contrast, 'normal');
  }
});

test('本文の描画前に保存済み配色を反映し、配色の末尾に新しい選択肢を表示する', () => {
  const saved = '{"colorTheme":"public-blue","contrast":"high"}';
  const app = load(saved, false, 'loading');
  assert.equal(app.document.documentElement.dataset.colorTheme, 'public-blue');
  assert.equal(app.document.documentElement.dataset.contrast, 'high');
  assert.equal(app.saved(), saved);
  assert.equal(app.inputs.length, 0);
  app.handlers.DOMContentLoaded();
  const themes = app.inputs.filter(i => i.dataset.a11ySetting === 'colorTheme');
  assert.deepEqual(themes.map(i => i.value), ['normal', 'warm', 'cool', 'teal', 'public-blue']);
  assert.ok(themes.at(-1).checked);
});

test('不正な保存値でも標準で開ける', () => {
  for (const saved of ['null', '{', '{"colorTheme":"unknown"}']) {
    assert.equal(load(saved).document.documentElement.dataset.colorTheme, 'normal');
  }
});

test('保存禁止でも変更でき、保存できない旨を表示する', () => {
  const app = load(null, true);
  const input = app.inputs.find(i => i.value === 'warm');
  assert.ok(input);
  app.handlers.change({ target: { closest: () => input } });
  assert.equal(app.document.documentElement.dataset.colorTheme, 'warm');
  assert.match(app.note.textContent, /保存できません/);
  assert.ok(app.warnings.length > 0);
});
