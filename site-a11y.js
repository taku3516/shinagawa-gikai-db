(() => {
  "use strict";

  const STORAGE_KEY = "shinagawa-db-a11y-v1";
  const DEFAULTS = { fontSize: "normal", contrast: "normal", motion: "normal" };
  const allowed = {
    fontSize: new Set(["normal", "large", "xlarge"]),
    contrast: new Set(["normal", "high"]),
    motion: new Set(["normal", "reduced"])
  };
  let settings = { ...DEFAULTS };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    for (const key of Object.keys(DEFAULTS)) {
      if (allowed[key].has(saved[key])) settings[key] = saved[key];
    }
  } catch (_error) {
    // localStorage が使えなくても、そのページ内では設定を利用できる。
  }

  function applySettings() {
    const root = document.documentElement;
    root.dataset.fontSize = settings.fontSize;
    root.dataset.contrast = settings.contrast;
    root.dataset.motion = settings.motion;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (_error) {}
    document.querySelectorAll("[data-a11y-setting]").forEach((input) => {
      input.checked = settings[input.dataset.a11ySetting] === input.value;
    });
  }

  function init() {
    applySettings();

    const main = document.querySelector("main");
    if (main && !main.id) main.id = "main-content";
    if (main && !document.querySelector(".skip-link")) {
      const skip = document.createElement("a");
      skip.className = "skip-link";
      skip.href = `#${main.id}`;
      skip.textContent = "本文へ移動";
      document.body.prepend(skip);
    }

    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <button class="a11y-launcher" type="button" aria-expanded="false" aria-controls="a11y-panel">表示設定</button>
      <section class="a11y-panel" id="a11y-panel" aria-labelledby="a11y-title" hidden>
        <div class="a11y-panel__head">
          <h2 id="a11y-title">表示・操作の設定</h2>
          <button class="a11y-panel__close" type="button" aria-label="表示設定を閉じる">×</button>
        </div>
        <fieldset class="a11y-group">
          <legend>文字の大きさ</legend>
          <div class="a11y-options">
            <label><input type="radio" name="a11y-font" value="normal" data-a11y-setting="fontSize">標準</label>
            <label><input type="radio" name="a11y-font" value="large" data-a11y-setting="fontSize">大きい</label>
            <label><input type="radio" name="a11y-font" value="xlarge" data-a11y-setting="fontSize">最大</label>
          </div>
        </fieldset>
        <fieldset class="a11y-group">
          <legend>色の見やすさ</legend>
          <div class="a11y-options">
            <label><input type="radio" name="a11y-contrast" value="normal" data-a11y-setting="contrast">標準</label>
            <label><input type="radio" name="a11y-contrast" value="high" data-a11y-setting="contrast">高コントラスト</label>
          </div>
        </fieldset>
        <fieldset class="a11y-group">
          <legend>画面の動き</legend>
          <div class="a11y-options">
            <label><input type="radio" name="a11y-motion" value="normal" data-a11y-setting="motion">標準</label>
            <label><input type="radio" name="a11y-motion" value="reduced" data-a11y-setting="motion">動きを減らす</label>
          </div>
        </fieldset>
        <button class="a11y-reset" type="button">設定を初期状態に戻す</button>
        <p class="a11y-note">設定はこの端末のブラウザに保存され、ほかのページにも引き継がれます。</p>
      </section>`;
    document.body.appendChild(wrapper);

    const launcher = wrapper.querySelector(".a11y-launcher");
    const panel = wrapper.querySelector(".a11y-panel");
    const close = wrapper.querySelector(".a11y-panel__close");

    function setOpen(open) {
      panel.hidden = !open;
      launcher.setAttribute("aria-expanded", String(open));
      if (open) close.focus();
    }
    launcher.addEventListener("click", () => setOpen(panel.hidden));
    close.addEventListener("click", () => { setOpen(false); launcher.focus(); });
    wrapper.addEventListener("change", (event) => {
      const input = event.target.closest("[data-a11y-setting]");
      if (!input) return;
      settings[input.dataset.a11ySetting] = input.value;
      applySettings();
    });
    wrapper.querySelector(".a11y-reset").addEventListener("click", () => {
      settings = { ...DEFAULTS };
      applySettings();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        setOpen(false);
        launcher.focus();
      }
    });
    applySettings();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
