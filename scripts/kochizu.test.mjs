import test from "node:test";
import assert from "node:assert/strict";
import "../kochizu-state.js";

const { readView, shareUrl, historical, photos, terrains, clip } = globalThis.KochizuState;
test("共有リンクを別端末で開いても位置と比較条件を復元する", () => {
  const state = { lat:35.615, lng:139.74, zoom:16, era:"meiji", base:"std", mode:"split",
    opacity:45, split:35, area:"oi", places:true, terrain:"swale" };
  const url = new URL(shareUrl("file:///tmp/rekishi-kochizu.html", state));
  assert.equal(url.origin, "https://taku3516.github.io");
  assert.deepEqual(readView(url.search, ["meiji"], ["std"], ["oi"]), state);
});
test("不正な位置や選択値は初期値に戻る", () => {
  const parse = (q) => readView(q, ["ort_riku10"], ["pale"], []);
  assert.deepEqual(parse("?lat=&lng=999&zoom=99&era=invalid&split=-1"), parse(""));
});
test("今昔マップの地形図は明治から昭和40年代まで、南西原点のタイルで並ぶ", () => {
  const folders = historical.map((map) => map.url.match(/tokyo50\/([^/]+)\/\{z\}\/\{x\}\/\{-y\}\.png$/)?.[1]);
  assert.deepEqual(folders, ["2man", "00", "01", "02", "03"]);
});
test("資料の ID は地形図・空中写真を通して重ならず、どれも出典を示せる", () => {
  const all = [...historical, ...photos];
  assert.equal(new Set(all.map((x) => x.id)).size, all.length);
  for (const source of all) assert.ok(source.label && source.maxNativeZoom >= 16, source.id);
  for (const photo of photos) assert.match(photo.ext, /^(png|jpg)$/, photo.id);
});
test("地形の重ね合わせは地理院タイルだけで、既定は何も重ねない", () => {
  assert.deepEqual(terrains.map((x) => x.id), ["swale", "hillshademap"]);
  for (const layer of terrains) {
    assert.match(layer.url, /^https:\/\/cyberjapandata\.gsi\.go\.jp\/xyz\/[a-z]+\/\{z\}\/\{x\}\/\{y\}\.png$/);
    assert.ok(layer.opacity > 0 && layer.opacity <= 1);
  }
  assert.equal(readView("", ["meiji"], ["std"], []).terrain, "");
  assert.equal(readView("?terrain=swale", ["meiji"], ["std"], []).terrain, "swale");
  assert.equal(readView("?terrain=bogus", ["meiji"], ["std"], []).terrain, "");
});
test("パン後も地図の表示幅に対し指定の割合だけ左側を切り出す", () => {
  assert.equal(clip({x:-120,y:20},{x:800,y:400},25), "polygon(-120px 20px, 80px 20px, 80px 420px, -120px 420px)");
});
