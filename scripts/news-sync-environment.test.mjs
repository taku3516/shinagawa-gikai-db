/*
 * news-sync-environment.js の検査です。
 * 実行: node --test scripts/news-sync-environment.test.mjs
 *
 * ログイン方式は環境とドメインの組み合わせで3通りに分かれます。
 *
 *   パソコン           → popup      （今動いている。壊さない）
 *   iOS・ドメイン一致  → redirect   （ポップアップは完了できないが、遷移なら通る）
 *   iOS・ドメイン不一致 → unavailable（どの方式でも完了できない。案内を出す）
 *
 * iOS でポップアップが使えないのは、認証ハンドラーがGoogleへ行く前に書いた
 * sessionStorage を、戻ってきた後に読めないためです。遷移方式なら、その印は
 * アプリ自身のドメインの領域に置かれるため、ドメインが一致していれば残ります。
 * ドメインが不一致だと遷移方式でも印が別領域になり、やはり完了できません。
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  signInMethod,
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

/* ---------- iOS・ドメイン一致 → 遷移方式 ---------- */

test("新URLのiPhone Safariは遷移方式", () => {
  assert.equal(signInMethod(iphone, 5, AUTH, AUTH), "redirect");
});

test("新URLのiPhone Chromeも遷移方式（中身はWebKitのため）", () => {
  assert.equal(signInMethod(iphoneChrome, 5, AUTH, AUTH), "redirect");
});

test("新URLのiPadOS（Mac表記）も、タッチ対応から見分けて遷移方式", () => {
  assert.equal(signInMethod(ipadOS, 5, AUTH, AUTH), "redirect");
});

test("新URLの古いiPadも遷移方式", () => {
  assert.equal(signInMethod(ipadOld, 5, AUTH, AUTH), "redirect");
});

/* ---------- パソコン → ポップアップ方式（今動いている。壊さない） ---------- */

test("MacのChromeはポップアップ方式のまま", () => {
  assert.equal(signInMethod(macChrome, 0, AUTH, AUTH), "popup");
});

test("WindowsのChromeはポップアップ方式のまま", () => {
  assert.equal(signInMethod(windowsChrome, 0, AUTH, AUTH), "popup");
});

test("AndroidのChromeはポップアップ方式のまま（WebKitではないため）", () => {
  assert.equal(signInMethod(androidChrome, 5, AUTH, AUTH), "popup");
});

test("MacのSafariはポップアップ方式のまま（タッチ非対応で見分ける）", () => {
  assert.equal(signInMethod(ipadOS, 0, AUTH, AUTH), "popup");
});

/* ---------- iOS・ドメイン不一致 → 案内 ---------- */

test("旧URLのiPhoneはどの方式でも完了できないので案内する", () => {
  // 遷移方式にしても、印が別ドメインの領域に置かれるため戻れない。
  assert.equal(signInMethod(iphone, 5, OLD_HOST, AUTH), "unavailable");
});

test("旧URLのiPadOSも案内する", () => {
  assert.equal(signInMethod(ipadOS, 5, OLD_HOST, AUTH), "unavailable");
});

test("旧URLでもパソコンはポップアップ方式で通る", () => {
  // 実際に旧URLのパソコンでは動いていた。巻き込まない。
  assert.equal(signInMethod(windowsChrome, 0, OLD_HOST, AUTH), "popup");
});

/* ---------- ドメイン判定 ---------- */

test("大文字小文字や前後の空白が違ってもドメイン一致とみなす", () => {
  assert.equal(isSameAuthDomain("ShinagawaKugiakiDB.FirebaseApp.com", ` ${AUTH} `), true);
  assert.equal(signInMethod(iphone, 5, AUTH.toUpperCase(), AUTH), "redirect");
});

test("紛らわしい別ドメインは一致とみなさない", () => {
  assert.equal(isSameAuthDomain("evil-shinagawakugiakidb.firebaseapp.com", AUTH), false);
  assert.equal(isSameAuthDomain("shinagawakugiakidb.firebaseapp.com.example.jp", AUTH), false);
  assert.equal(isSameAuthDomain("shinagawakugiakidb.web.app", AUTH), false);
});

/* ---------- 判定材料が欠けている場合 ---------- */

test("判定材料が欠けているときはポップアップ方式にする", () => {
  // 判定できないなら従来の動きに任せる。誤って遮ると動いている環境が壊れる。
  assert.equal(signInMethod("", 0, AUTH, AUTH), "popup");
  assert.equal(signInMethod(undefined, undefined, undefined, undefined), "popup");
  assert.equal(signInMethod(iphone, 5, "", AUTH), "popup");
  assert.equal(signInMethod(iphone, 5, AUTH, ""), "popup");
});

test("環境判定そのものは単体でも使える", () => {
  assert.equal(isWebKitOnlyPlatform(iphone, 5), true);
  assert.equal(isWebKitOnlyPlatform(windowsChrome, 0), false);
});
