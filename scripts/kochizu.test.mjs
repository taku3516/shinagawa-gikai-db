import test from "node:test";
import assert from "node:assert/strict";
import "../kochizu-state.js";

const { readView, shareUrl, historical, clip } = globalThis.KochizuState;
test("共有リンクを別端末で開いても位置と比較条件を復元する", () => {
  const state = { lat:35.615, lng:139.74, zoom:16, era:"meiji", base:"std", mode:"split",
    opacity:45, split:35, area:"oi", places:true };
  const url = new URL(shareUrl("file:///tmp/rekishi-kochizu.html", state));
  assert.equal(url.origin, "https://taku3516.github.io");
  assert.deepEqual(readView(url.search, ["meiji"], ["std"], ["oi"]), state);
});
test("不正な位置や選択値は初期値に戻る", () => {
  const parse = (q) => readView(q, ["ort_riku10"], ["pale"], []);
  assert.deepEqual(parse("?lat=&lng=999&zoom=99&era=invalid&split=-1"), parse(""));
});
test("明治・大正の地図には南西原点のタイルを使う", () => {
  assert.equal(historical.length, 2);
  for (const map of historical) assert.match(map.url, /tokyo50\/(2man|00)\/\{z\}\/\{x\}\/\{-y\}\.png$/);
});
test("パン後も地図の表示幅に対し指定の割合だけ左側を切り出す", () => {
  assert.equal(clip({x:-120,y:20},{x:800,y:400},25), "polygon(-120px 20px, 80px 20px, 80px 420px, -120px 420px)");
});
