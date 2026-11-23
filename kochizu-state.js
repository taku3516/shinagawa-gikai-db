// 古地図の資料と、共有URLで受け渡す表示条件。
(() => {
  "use strict";

  const GSI = "https://cyberjapandata.gsi.go.jp/xyz";
  const GSI_CREDIT = '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル</a>（国土地理院）';

  // 今昔マップ on the web の首都圏（tokyo50）。時期フォルダは配信元の表のとおり。
  // 配信元は南西原点なので、Leaflet には {-y} で渡す。
  const historical = [
    { id: "meiji", period: "1896〜1909年（明治）", folder: "2man" },
    { id: "taisho", period: "1917〜1924年（大正）", folder: "00" },
    { id: "showa-early", period: "1927〜1939年（昭和初期）", folder: "01" },
    { id: "showa-war", period: "1944〜1954年（戦中・戦後）", folder: "02" },
    { id: "showa-40", period: "1965〜1968年（昭和40年代）", folder: "03" }
  ].map(({ id, period, folder }) => ({
    id, label: period + " 地形図", minNativeZoom: 8, maxNativeZoom: 16,
    url: `https://ktgis.net/kjmapw/kjtilemap/tokyo50/${folder}/{z}/{x}/{-y}.png`,
    credit: '<a href="https://ktgis.net/kjmapw/tilemapservice.html" target="_blank" rel="noopener">今昔マップ on the web</a>',
    note: "首都圏の旧版地形図です。図幅ごとに測量・刊行時期が異なります。"
  }));

  // 国土地理院の年代別の空中写真。品川区の上空で実際にタイルが配信されていることを
  // 1つずつ確かめたものだけを並べている。
  // maxNativeZoom は、その年代の写真が用意されている一番細かい段階。
  // これを超えて拡大したときは、最後の写真を引き伸ばして表示する
  // （指定しないと、拡大したとたんに写真が消えてしまう）。
  const photos = [
    { id: "ort_riku10", label: "1936〜1942年頃 空中写真", ext: "png", minNativeZoom: 13, maxNativeZoom: 18,
      note: "国土地理院が公開している、東京の戦前の空中写真です。" },
    { id: "ort_USA10", label: "1945〜1950年（米軍撮影）", ext: "png", maxNativeZoom: 17,
      note: "第二次世界大戦の直後に米軍が撮影した写真です。戦災を受けた市街地のようすや、埋め立て前の海岸線が分かります。" },
    { id: "ort_old10", label: "1961〜1969年", ext: "png", maxNativeZoom: 17,
      note: "東京オリンピック（1964年）を含む年代の写真です。" },
    { id: "gazo1", label: "1974〜1978年", ext: "jpg", maxNativeZoom: 17, note: "高度経済成長が終わったころのようすです。" },
    { id: "gazo2", label: "1979〜1983年", ext: "jpg", maxNativeZoom: 17, note: "" },
    { id: "gazo3", label: "1984〜1986年", ext: "jpg", maxNativeZoom: 17, note: "" },
    { id: "gazo4", label: "1987〜1990年", ext: "jpg", maxNativeZoom: 17, note: "" },
    { id: "seamlessphoto", label: "全国最新写真（シームレス）", ext: "jpg", maxNativeZoom: 18,
      note: "もっとも新しい空中写真です。撮影時期は場所によって異なります。" }
  ].map((photo) => ({ ...photo, url: `${GSI}/${photo.id}/{z}/{x}/{y}.${photo.ext}`, credit: GSI_CREDIT }));

  // 資料の上に重ねて地形を読む地理院タイル。どちらも拡大は16段階まで。
  const terrains = [
    { id: "swale", label: "明治期の低湿地", opacity: 0.7,
      note: "明治期の低湿地の分布です。凡例は国土地理院の解説を参照してください。" },
    { id: "hillshademap", label: "陰影起伏図", opacity: 0.5,
      note: "標高データから作った陰影です。台地と低地の境目が読み取れます。" }
  ].map((layer) => ({ ...layer, maxNativeZoom: 16, credit: GSI_CREDIT,
    url: `${GSI}/${layer.id}/{z}/{x}/{y}.png` }));

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
      area: choice("area", areas, ""), places: params.get("places") === "1",
      terrain: choice("terrain", terrains.map((x) => x.id), "")
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

  globalThis.KochizuState = { historical, photos, terrains, GSI_CREDIT, readView, shareUrl, clip };
})();
