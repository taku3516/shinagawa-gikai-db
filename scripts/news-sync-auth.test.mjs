/*
 * news-sync-auth.js の検査です。
 * 実行: node --test scripts/news-sync-auth.test.mjs
 *
 * 中心にあるのは「タップからポップアップまでの間に await を挟まない」という決まりです。
 * ここが崩れると、ホーム画面のwebアプリでログインが白いまま止まります。
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  persistenceFor,
  applyPersistenceChoice,
  startGoogleSignIn,
  isUserCancelled,
  isPopupUnavailable
} from "../news-sync-auth.js";

/** 検査用のFirebase authスタブを作ります。 */
function createAuthApiStub({ setPersistenceResult } = {}) {
  const calls = [];
  return {
    calls,
    browserLocalPersistence: Symbol("local"),
    browserSessionPersistence: Symbol("session"),
    setPersistence(auth, persistence) {
      calls.push({ name: "setPersistence", persistence });
      // 未解決のままにして「待たされる処理」を再現する。
      return setPersistenceResult ?? new Promise(() => {});
    },
    signInWithPopup(auth, provider) {
      calls.push({ name: "signInWithPopup", provider });
      return Promise.resolve({ user: { uid: "test-uid" } });
    }
  };
}

test("維持するを選んだときは端末に残る保持方式を返す", () => {
  const authApi = createAuthApiStub();
  assert.equal(persistenceFor(authApi, true), authApi.browserLocalPersistence);
});

test("維持しないときはブラウザを閉じると消える保持方式を返す", () => {
  const authApi = createAuthApiStub();
  assert.equal(persistenceFor(authApi, false), authApi.browserSessionPersistence);
});

test("ログイン開始は await を挟まず、同じ処理のかたまりの中でポップアップを呼ぶ", () => {
  const authApi = createAuthApiStub();

  // クリック処理を模して同期的に呼ぶ。
  startGoogleSignIn(authApi, {}, { id: "google" });

  // マイクロタスクを1回も進めていない時点で、すでに呼ばれていること。
  assert.deepEqual(
    authApi.calls.map(call => call.name),
    ["signInWithPopup"],
    "ポップアップの前に他の処理が入ると、タップとの結び付きが切れる"
  );
});

test("ログイン開始の前に保持方式の切り替えを挟まない", async () => {
  const authApi = createAuthApiStub();

  startGoogleSignIn(authApi, {}, { id: "google" });
  // マイクロタスクを進めても setPersistence が割り込まないことを確かめる。
  await Promise.resolve();

  assert.equal(
    authApi.calls.some(call => call.name === "setPersistence"),
    false,
    "保持方式はタップより前のチェックボックス操作時に適用する"
  );
});

test("保持方式の適用が失敗してもログイン導線は止めない", async () => {
  const authApi = createAuthApiStub({
    setPersistenceResult: Promise.reject(new Error("保存領域が使えません"))
  });

  await assert.doesNotReject(() => applyPersistenceChoice(authApi, {}, true));
  assert.equal(authApi.calls[0].name, "setPersistence");
});

test("保持方式はチェックボックスの状態どおりに適用する", async () => {
  const authApi = createAuthApiStub({ setPersistenceResult: Promise.resolve() });

  await applyPersistenceChoice(authApi, {}, false);

  assert.equal(authApi.calls[0].persistence, authApi.browserSessionPersistence);
});

test("利用者が閉じた・やり直した場合はエラー扱いにしない", () => {
  assert.equal(isUserCancelled({ code: "auth/popup-closed-by-user" }), true);
  assert.equal(isUserCancelled({ code: "auth/cancelled-popup-request" }), true);
  assert.equal(isUserCancelled({ code: "auth/network-request-failed" }), false);
  assert.equal(isUserCancelled(null), false);
});

test("ポップアップを開けなかった失敗を見分けられる", () => {
  assert.equal(isPopupUnavailable({ code: "auth/popup-blocked" }), true);
  assert.equal(
    isPopupUnavailable({ code: "auth/operation-not-supported-in-this-environment" }),
    true
  );
  assert.equal(isPopupUnavailable({ code: "auth/popup-closed-by-user" }), false);
  assert.equal(isPopupUnavailable(undefined), false);
});
