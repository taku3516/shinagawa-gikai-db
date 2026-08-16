/*
 * news-sync-environment.js の検査です。
 * 実行: node --test scripts/news-sync-environment.test.mjs
 *
 * iOSではGoogleログインを完了できません。理由は news-sync-environment.js の冒頭に書いています。
 * ここでは「iOSを取りこぼさない」ことと「それ以外を巻き込まない」ことの両方を確かめます。
 * 巻き込むと、今動いているパソコンのログインまで使えなくなります。
 */

import test from "node:test";
import assert from "node:assert/strict";
import { isPopupSignInBlocked } from "../news-sync-environment.js";

const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const iphoneChrome = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1";
const ipadOld = "Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1";
const ipadOS = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const macSafari = ipadOS;
const macChrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const windowsChrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const androidChrome = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";

test("iPhoneのSafariは対象", () => {
  assert.equal(isPopupSignInBlocked(iphone, 5), true);
});

test("iPhoneのChromeも対象（中身はWebKitのため）", () => {
  assert.equal(isPopupSignInBlocked(iphoneChrome, 5), true);
});

test("iPadOS13より前のiPadは対象", () => {
  assert.equal(isPopupSignInBlocked(ipadOld, 5), true);
});

test("Mac表記になるiPadOSも、タッチ対応から見分けて対象にする", () => {
  assert.equal(isPopupSignInBlocked(ipadOS, 5), true);
});

test("MacのSafariは対象外（タッチ非対応で見分ける）", () => {
  assert.equal(isPopupSignInBlocked(macSafari, 0), false);
});

test("MacのChromeは対象外", () => {
  assert.equal(isPopupSignInBlocked(macChrome, 0), false);
});

test("WindowsのChromeは対象外", () => {
  assert.equal(isPopupSignInBlocked(windowsChrome, 0), false);
});

test("AndroidのChromeは対象外（WebKitではないため）", () => {
  assert.equal(isPopupSignInBlocked(androidChrome, 5), false);
});

test("判定材料が欠けているときは巻き込まない", () => {
  // 判定できないなら従来どおりログインを試させる。
  // 誤って遮ると、動いている環境まで使えなくなる。
  assert.equal(isPopupSignInBlocked("", 0), false);
  assert.equal(isPopupSignInBlocked(undefined, undefined), false);
  assert.equal(isPopupSignInBlocked(null, null), false);
});
