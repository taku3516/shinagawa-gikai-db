/*
 * news-sync-environment.js の検査です。
 * 実行: node --test scripts/news-sync-environment.test.mjs
 *
 * 遮る条件は「iOS・iPadOS」かつ「ドメインが不一致」の両方です。
 * ここでは3方向を確かめます。
 *   1. iOSを取りこぼさない（取りこぼすと分かりにくいエラーが出る）
 *   2. それ以外の環境を巻き込まない（巻き込むと動いているログインが壊れる）
 *   3. ドメインをそろえた配信元では、iOSでも遮らない（移行の成果を打ち消さない）
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  isPopupSignInBlocked,
  isWebKitOnlyPlatform,
  isSameAuthDomain
} from "../news-sync-environment.js";

const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1";
const iphoneChrome = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1";
const ipadOld = "Mozilla/5.0 (iPad; CPU OS 12_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Mobile/15E148 Safari/604.1";
const ipadOS = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15";
const macChrome = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const windowsChrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const androidChrome = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36";

const AUTH = "shinagawakugiakidb.firebaseapp.com";
const OLD_HOST = "taku3516.github.io";

/* ---------- 1. iOSを取りこぼさない（旧URL＝ドメイン不一致） ---------- */

test("旧URLのiPhone Safariは遮る", () => {
  assert.equal(isPopupSignInBlocked(iphone, 5, OLD_HOST, AUTH), true);
});

test("旧URLのiPhone Chromeも遮る（中身はWebKitのため）", () => {
  assert.equal(isPopupSignInBlocked(iphoneChrome, 5, OLD_HOST, AUTH), true);
});

test("旧URLのiPadOS13より前のiPadは遮る", () => {
  assert.equal(isPopupSignInBlocked(ipadOld, 5, OLD_HOST, AUTH), true);
});

test("旧URLのiPadOS（Mac表記）は、タッチ対応から見分けて遮る", () => {
  assert.equal(isPopupSignInBlocked(ipadOS, 5, OLD_HOST, AUTH), true);
});

/* ---------- 2. それ以外の環境を巻き込まない ---------- */

test("MacのSafariは遮らない（タッチ非対応で見分ける）", () => {
  assert.equal(isPopupSignInBlocked(ipadOS, 0, OLD_HOST, AUTH), false);
});

test("MacのChromeは遮らない", () => {
  assert.equal(isPopupSignInBlocked(macChrome, 0, OLD_HOST, AUTH), false);
});

test("WindowsのChromeは遮らない", () => {
  assert.equal(isPopupSignInBlocked(windowsChrome, 0, OLD_HOST, AUTH), false);
});

test("AndroidのChromeは遮らない（WebKitではないため）", () => {
  assert.equal(isPopupSignInBlocked(androidChrome, 5, OLD_HOST, AUTH), false);
});

/* ---------- 3. ドメインをそろえた配信元では遮らない ---------- */

test("新URLのiPhoneは遮らない。移行の成果を打ち消してはいけない", () => {
  assert.equal(isPopupSignInBlocked(iphone, 5, AUTH, AUTH), false);
});

test("新URLのiPadOSも遮らない", () => {
  assert.equal(isPopupSignInBlocked(ipadOS, 5, AUTH, AUTH), false);
});

test("大文字小文字や前後の空白が違ってもドメイン一致とみなす", () => {
  assert.equal(isSameAuthDomain("ShinagawaKugiakiDB.FirebaseApp.com", ` ${AUTH} `), true);
  assert.equal(isPopupSignInBlocked(iphone, 5, AUTH.toUpperCase(), AUTH), false);
});

test("紛らわしい別ドメインは一致とみなさない", () => {
  // 前方一致や部分一致で通してしまうと、認証が通らない配信元を見逃す。
  assert.equal(isSameAuthDomain("evil-shinagawakugiakidb.firebaseapp.com", AUTH), false);
  assert.equal(isSameAuthDomain("shinagawakugiakidb.firebaseapp.com.example.jp", AUTH), false);
  assert.equal(isSameAuthDomain("shinagawakugiakidb.web.app", AUTH), false);
});

/* ---------- 判定材料が欠けている場合 ---------- */

test("判定材料が欠けているときは遮らない", () => {
  // 判定できないなら従来どおりログインを試させる。
  // 誤って遮ると、動いている環境まで使えなくなる。
  assert.equal(isPopupSignInBlocked("", 0, OLD_HOST, AUTH), false);
  assert.equal(isPopupSignInBlocked(undefined, undefined, undefined, undefined), false);
  assert.equal(isPopupSignInBlocked(iphone, 5, "", AUTH), false);
  assert.equal(isPopupSignInBlocked(iphone, 5, OLD_HOST, ""), false);
});

test("環境判定そのものは単体でも使える", () => {
  assert.equal(isWebKitOnlyPlatform(iphone, 5), true);
  assert.equal(isWebKitOnlyPlatform(windowsChrome, 0), false);
});
