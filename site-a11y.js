(() => {
  "use strict";

  const STORAGE_KEY = "shinagawa-db-a11y-v1";
  const DEFAULTS = { fontSize: "normal", colorTheme: "normal", contrast: "normal", motion: "normal" };
  const allowed = {
    fontSize: new Set(["normal", "large", "xlarge"]),
    colorTheme: new Set(["normal", "warm", "cool", "teal", "public-blue"]),
    contrast: new Set(["normal", "high"]),
    motion: new Set(["normal", "reduced"])
  };
  let settings = { ...DEFAULTS };
  let storageNote = null;

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    for (const key of Object.keys(DEFAULTS)) {
      if (allowed[key].has(saved[key])) settings[key] = saved[key];
    }
  } catch (error) {
    console.warn("表示設定を読み込めませんでした。標準設定で開きます。", error);
  }

  /** @returns {void} */
  function reflectSettings() {
    const root = document.documentElement;
    root.dataset.fontSize = settings.fontSize;
    root.dataset.colorTheme = settings.colorTheme;
    root.dataset.contrast = settings.contrast;
    root.dataset.motion = settings.motion;
  }

  /** @returns {void} */
  function applySettings() {
    reflectSettings();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      if (storageNote) storageNote.textContent = "設定はこの端末のブラウザに保存され、同じ配信元のほかのページにも引き継がれます。";
    } catch (error) {
      console.warn("表示設定を保存できません。このページ内でのみ適用します。", error);
      if (storageNote) storageNote.textContent = "設定を保存できません。このページ内では変更できますが、再読み込みやページ移動で元に戻る場合があります。";
    }
    document.querySelectorAll("[data-a11y-setting]").forEach((input) => {
      input.checked = settings[input.dataset.a11ySetting] === input.value;
    });
  }

  /** @returns {void} */
  function init() {
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
          <legend>サイトの配色</legend>
          <div class="a11y-options a11y-options--palette">
            <label><input type="radio" name="a11y-theme" value="normal" data-a11y-setting="colorTheme">標準（今の配色）</label>
            <label><input type="radio" name="a11y-theme" value="warm" data-a11y-setting="colorTheme">生成り</label>
            <label><input type="radio" name="a11y-theme" value="cool" data-a11y-setting="colorTheme">青みグレー</label>
            <label><input type="radio" name="a11y-theme" value="teal" data-a11y-setting="colorTheme">デモ配色</label>
            <label><input type="radio" name="a11y-theme" value="public-blue" data-a11y-setting="colorTheme">公共デザイン・ブルー</label>
          </div>
          <p class="a11y-note">見やすい配色を選んでください。生成りは淡いクリーム色、青みグレーは淡い青灰色の背景です。デモ配色は深い緑、公共デザイン・ブルーは深い青と白・ライトグレーを基調としています。</p>
        </fieldset>
        <fieldset class="a11y-group">
          <legend>色の見やすさ</legend>
          <div class="a11y-options">
            <label><input type="radio" name="a11y-contrast" value="normal" data-a11y-setting="contrast">標準</label>
            <label><input type="radio" name="a11y-contrast" value="high" data-a11y-setting="contrast">高コントラスト</label>
          </div>
          <p class="a11y-note">高コントラストでは、選んだ配色より白地と濃い文字を優先します。標準に戻すと選んだ配色に戻ります。</p>
        </fieldset>
        <fieldset class="a11y-group">
          <legend>画面の動き</legend>
          <div class="a11y-options">
            <label><input type="radio" name="a11y-motion" value="normal" data-a11y-setting="motion">標準</label>
            <label><input type="radio" name="a11y-motion" value="reduced" data-a11y-setting="motion">動きを減らす</label>
          </div>
        </fieldset>
        <button class="a11y-reset" type="button">設定を初期状態に戻す</button>
        <p class="a11y-note a11y-storage-note" role="status"></p>
      </section>`;
    document.body.appendChild(wrapper);
    storageNote = wrapper.querySelector(".a11y-storage-note");

    const launcher = wrapper.querySelector(".a11y-launcher");
    const panel = wrapper.querySelector(".a11y-panel");
    const close = wrapper.querySelector(".a11y-panel__close");

    /** @param {boolean} open @returns {void} */
    function setOpen(open) {
      panel.hidden = !open;
      launcher.setAttribute("aria-expanded", String(open));
      if (open) close.focus();
    }
    launcher.addEventListener("click", () => setOpen(panel.hidden));
    close.addEventListener("click", () => { setOpen(false); launcher.focus(); });
    wrapper.addEventListener("change", (event) => {
      const input = event.target.closest("[data-a11y-setting]");
      if (!input || !allowed[input.dataset.a11ySetting]?.has(input.value)) return;
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

  // head で属性を設定し、本文の初回描画から保存済みの配色を使う。
  reflectSettings();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
