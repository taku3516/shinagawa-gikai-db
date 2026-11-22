// 古地図の資料と、共有URLで受け渡す表示条件。
(() => {
  "use strict";

  const historical = [
    { id: "meiji", period: "1896〜1909年（明治）", folder: "2man" },
    { id: "taisho", period: "1917〜1924年（大正）", folder: "00" }
  ].map(({ id, period, folder }) => ({
    id, label: period + " 地形図", minNativeZoom: 8, maxNativeZoom: 16,
    url: `https://ktgis.net/kjmapw/kjtilemap/tokyo50/${folder}/{z}/{x}/{-y}.png`,
    credit: '<a href="https://ktgis.net/kjmapw/tilemapservice.html" target="_blank" rel="noopener">今昔マップ on the web</a>',
    note: "首都圏の旧版地形図です。図幅ごとに測量・刊行時期が異なります。"
  }));

  /** @param {string} search @param {string[]} eras @param {string[]} bases @param {string[]} areas */
  function readView(search, eras, bases, areas) {
    const params = new URLSearchParams(search);
    /** @param {string} key @param {number} min @param {number} max @param {number} fallback @param {number} step */
    function number(key, min, max, fallback, step = 0) {
      const raw = params.get(key)?.trim();
      const value = Number(raw);
      return raw && Number.isFinite(value) && value >= min && value <= max && (!step || value % step === 0)
        ? value : fallback;
    }
    /** @param {string} key @param {string[]} choices @param {string} fallback */
    function choice(key, choices, fallback) {
      const value = params.get(key);
      return choices.includes(value) ? value : fallback;
    }
    return {
      lat: number("lat", -85, 85, 35.6095), lng: number("lng", -180, 180, 139.7305),
      zoom: number("zoom", 10, 19, 13, 1), era: choice("era", eras, "ort_riku10"),
      base: choice("base", bases, "pale"), mode: choice("mode", ["split", "fade"], "fade"),
      opacity: number("opacity", 0, 100, 70, 5), split: number("split", 0, 100, 50, 1),
      area: choice("area", areas, ""), places: params.get("places") === "1"
    };
  }

  /** @param {string} location @param {object} state */
  function shareUrl(location, state) {
    const url = new URL(location);
    if (url.protocol === "file:") url.href = "https://taku3516.github.io/shinagawa-gikai-db/rekishi-kochizu.html";
    url.search = new URLSearchParams({ ...state, places: state.places ? "1" : "0" }).toString();
    url.hash = "";
    return url.href;
  }

  /** @param {{x:number,y:number}} origin @param {{x:number,y:number}} size @param {number} percent */
  function clip(origin, size, percent) {
    const { x, y } = origin;
    const right = x + size.x * percent / 100;
    const bottom = y + size.y;
    return `polygon(${x}px ${y}px, ${right}px ${y}px, ${right}px ${bottom}px, ${x}px ${bottom}px)`;
  }

  globalThis.KochizuState = { historical, readView, shareUrl, clip };
})();
