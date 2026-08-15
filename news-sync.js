const settings = window.SHINAGAWA_FIREBASE_SYNC;
const bridge = window.SHINAGAWA_NEWS_SYNC_BRIDGE;
const panel = document.getElementById("news-sync-panel");

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"];
// ホーム画面から起動したwebアプリ（standalone表示）ではポップアップ方式のログインが完了しないため、
// 画面遷移方式へ切り替えた際の状態をこのキーで引き継ぐ
const pendingRedirectKey = "shinagawa-news-sync-redirect";
const pendingRedirectMaxAgeMs = 10 * 60 * 1000;
const popupTimeoutMs = 25000;
const hasCompleteConfig = Boolean(
  settings?.enabled
  && settings.firebaseConfig
  && requiredConfigKeys.every(key => String(settings.firebaseConfig[key] || "").trim())
);

if (panel && settings?.enabled && bridge) {
  panel.hidden = false;
}

if (panel && settings?.enabled && !hasCompleteConfig) {
  const status = document.getElementById("sync-status");
  const login = document.getElementById("sync-login");
  status.textContent = "同期設定が未完了です。管理者によるFirebase設定が必要です。";
  login.disabled = true;
}

if (panel && hasCompleteConfig && bridge) {
  startSync().catch(error => {
    console.error("Firebase同期の初期化に失敗しました。", error);
    setStatus("同期機能を読み込めませんでした。端末内保存は引き続き利用できます。", true);
    setBusy(false);
  });
}

async function startSync() {
  const version = /^[0-9]+\.[0-9]+\.[0-9]+$/.test(settings.sdkVersion || "")
    ? settings.sdkVersion
    : "12.16.0";
  const base = `https://www.gstatic.com/firebasejs/${version}`;
  const [appApi, authApi, firestoreApi] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-auth.js`),
    import(`${base}/firebase-firestore.js`)
  ]);

  const app = appApi.initializeApp(settings.firebaseConfig);
  const auth = authApi.getAuth(app);
  const db = firestoreApi.getFirestore(app);

  if (settings.appCheck?.enabled && settings.appCheck.enterpriseSiteKey) {
    const appCheckApi = await import(`${base}/firebase-app-check.js`);
    appCheckApi.initializeAppCheck(app, {
      provider: new appCheckApi.ReCaptchaEnterpriseProvider(settings.appCheck.enterpriseSiteKey),
      isTokenAutoRefreshEnabled: true
    });
  }

  const elements = {
    login: document.getElementById("sync-login"),
    logout: document.getElementById("sync-logout"),
    remove: document.getElementById("sync-remove-account"),
    remember: document.getElementById("sync-remember"),
    account: document.getElementById("sync-account")
  };
  const provider = new authApi.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  let currentUser = null;
  let unsubscribeFavorites = null;
  let unsubscribePreferences = null;
  let preferenceTimer = null;
  // standalone表示ではポップアップに親ウィンドウ参照が渡らず結果を受け取れないため、最初から画面遷移方式を使う
  let useRedirect = isStandaloneDisplay();
  let redirecting = false;

  window.SHINAGAWA_NEWS_CLOUD = Object.freeze({
    isActive: () => Boolean(currentUser),
    favoriteChanged: async (newsId, isSaved) => {
      if (!currentUser || !/^[a-zA-Z0-9_-]{1,80}$/.test(newsId)) return;
      setStatus("同期中…");
      const reference = firestoreApi.doc(db, "users", currentUser.uid, "favorites", newsId);
      try {
        if (isSaved) {
          await firestoreApi.setDoc(reference, {
            savedAt: firestoreApi.serverTimestamp(),
            schemaVersion: 1
          });
        } else {
          await firestoreApi.deleteDoc(reference);
        }
        setStatus("同期済み");
      } catch (error) {
        console.error("お気に入りの同期に失敗しました。", error);
        setStatus("同期に失敗しました。通信状態を確認してください。", true);
      }
    },
    preferencesChanged: hiddenSources => {
      if (!currentUser) return;
      window.clearTimeout(preferenceTimer);
      setStatus("同期中…");
      preferenceTimer = window.setTimeout(async () => {
        try {
          await firestoreApi.setDoc(
            firestoreApi.doc(db, "users", currentUser.uid, "preferences", "news"),
            {
              hiddenSources: sanitizeSources(hiddenSources),
              updatedAt: firestoreApi.serverTimestamp(),
              schemaVersion: 1
            }
          );
          setStatus("同期済み");
        } catch (error) {
          console.error("表示設定の同期に失敗しました。", error);
          setStatus("同期に失敗しました。通信状態を確認してください。", true);
        }
      }, 500);
    }
  });

  await resumeRedirect();

  elements.login.addEventListener("click", async () => {
    setBusy(true);
    setStatus("Googleログインを確認しています…");
    const remember = elements.remember.checked;
    try {
      await applyPersistence(remember);
      if (useRedirect) {
        await startRedirect("signin", remember);
        return;
      }
      // ポップアップが開けない環境では応答自体が返らないため、一定時間で画面遷移方式へ切り替えられるようにする
      const hangTimer = window.setTimeout(() => {
        useRedirect = true;
        setStatus("ログイン画面を確認できません。もう一度「Googleで同期」を押すと、ページを移動してログインします。", true);
        setBusy(false);
      }, popupTimeoutMs);
      try {
        await authApi.signInWithPopup(auth, provider);
      } finally {
        window.clearTimeout(hangTimer);
      }
    } catch (error) {
      if (redirecting) return;
      if (error?.code === "auth/popup-blocked" || error?.code === "auth/operation-not-supported-in-this-environment") {
        useRedirect = true;
        await startRedirect("signin", remember);
        return;
      }
      if (error?.code !== "auth/popup-closed-by-user" && error?.code !== "auth/cancelled-popup-request") {
        console.error("Googleログインに失敗しました。", error);
        setStatus("ログインできませんでした。設定または通信状態を確認してください。", true);
      } else {
        setStatus("ログインはキャンセルされました。端末内保存を利用しています。");
      }
      setBusy(false);
    }
  });

  elements.logout.addEventListener("click", async () => {
    setBusy(true);
    try {
      await authApi.signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("ログアウトに失敗しました。", error);
      setStatus("ログアウトできませんでした。もう一度お試しください。", true);
      setBusy(false);
    }
  });

  elements.remove.addEventListener("click", async () => {
    if (!currentUser) return;
    const confirmed = window.confirm(
      "クラウドに同期した保存済みニュースと表示設定を削除し、ログイン連携を解除します。端末内にログイン前から保存していた内容は削除しません。続けますか？"
    );
    if (!confirmed) return;
    setBusy(true);
    setStatus("本人確認をしています…");
    try {
      if (useRedirect) {
        await startRedirect("remove", elements.remember.checked);
        return;
      }
      await authApi.reauthenticateWithPopup(currentUser, provider);
      await removeAccount(currentUser);
    } catch (error) {
      if (redirecting) return;
      if (error?.code === "auth/popup-blocked" || error?.code === "auth/operation-not-supported-in-this-environment") {
        useRedirect = true;
        await startRedirect("remove", elements.remember.checked);
        return;
      }
      console.error("同期データまたはアカウントの削除に失敗しました。", error);
      setStatus("削除できませんでした。もう一度ログインしてお試しください。", true);
      setBusy(false);
    }
  });

  authApi.onAuthStateChanged(auth, async user => {
    stopListeners();
    currentUser = user;
    window.clearTimeout(preferenceTimer);
    if (!user) {
      bridge.setCloudActive(false);
      bridge.restoreGuestState();
      elements.account.textContent = "";
      elements.login.hidden = false;
      elements.remember.closest("label").hidden = false;
      elements.logout.hidden = true;
      elements.remove.hidden = true;
      setStatus("この端末だけに保存中。ログインは任意です。");
      setBusy(false);
      return;
    }

    bridge.setCloudActive(true);
    elements.account.textContent = user.displayName || user.email || "Googleアカウント";
    elements.login.hidden = true;
    elements.remember.closest("label").hidden = true;
    elements.logout.hidden = false;
    elements.remove.hidden = false;
    setStatus("初回同期を確認しています…");
    try {
      await mergeGuestData(user.uid, db, firestoreApi);
      startListeners(user.uid, db, firestoreApi);
      setStatus("同期済み");
    } catch (error) {
      console.error("初回同期に失敗しました。", error);
      setStatus("同期に失敗しました。通信状態を確認してください。", true);
    }
    setBusy(false);
  });

  async function applyPersistence(remember) {
    await authApi.setPersistence(
      auth,
      remember ? authApi.browserLocalPersistence : authApi.browserSessionPersistence
    );
  }

  // ポップアップが使えない環境向けに、Googleのログイン画面へページごと移動する
  async function startRedirect(mode, remember) {
    redirecting = true;
    savePendingRedirect(mode, remember);
    setStatus("Googleのログイン画面へ移動します…");
    try {
      if (mode === "remove") {
        await authApi.reauthenticateWithRedirect(currentUser, provider);
      } else {
        await authApi.signInWithRedirect(auth, provider);
      }
    } catch (error) {
      redirecting = false;
      clearPendingRedirect();
      console.error("Googleのログイン画面へ移動できませんでした。", error);
      setStatus("ログイン画面を開けませんでした。通信状態を確認するか、ブラウザで開き直してお試しください。", true);
      setBusy(false);
    }
  }

  // 画面遷移方式のログインから戻ってきたときに、結果を受け取って処理を続ける
  async function resumeRedirect() {
    const pending = takePendingRedirect();
    if (!pending) return;
    useRedirect = true;
    elements.remember.checked = pending.remember;
    setBusy(true);
    setStatus("Googleログインの結果を確認しています…");
    try {
      await applyPersistence(pending.remember);
      const result = await authApi.getRedirectResult(auth);
      if (!result) {
        setStatus("ログインを完了できませんでした。ブラウザで開いてからもう一度お試しください。", true);
        setBusy(false);
        return;
      }
      if (pending.mode === "remove") {
        await removeAccount(result.user);
      }
    } catch (error) {
      if (pending.mode === "remove") {
        console.error("同期データまたはアカウントの削除に失敗しました。", error);
        setStatus("削除できませんでした。もう一度ログインしてお試しください。", true);
      } else {
        console.error("Googleログインの結果を確認できませんでした。", error);
        setStatus("ログインできませんでした。設定または通信状態を確認してください。", true);
      }
      setBusy(false);
    }
  }

  async function removeAccount(user) {
    setStatus("同期データを削除しています…");
    await deleteAllUserData(user.uid, db, firestoreApi);
    await authApi.deleteUser(user);
    window.location.reload();
  }

  function startListeners(uid, database, api) {
    unsubscribeFavorites = api.onSnapshot(
      api.collection(database, "users", uid, "favorites"),
      snapshot => {
        bridge.applyCloudState({ favorites: snapshot.docs.map(document => document.id) });
        if (!snapshot.metadata.hasPendingWrites) setStatus("同期済み");
      },
      error => {
        console.error("お気に入りの受信に失敗しました。", error);
        setStatus("同期状態を確認できません。", true);
      }
    );
    unsubscribePreferences = api.onSnapshot(
      api.doc(database, "users", uid, "preferences", "news"),
      snapshot => {
        if (snapshot.exists()) {
          bridge.applyCloudState({ hiddenSources: sanitizeSources(snapshot.data().hiddenSources) });
        }
        if (!snapshot.metadata.hasPendingWrites) setStatus("同期済み");
      },
      error => {
        console.error("表示設定の受信に失敗しました。", error);
        setStatus("同期状態を確認できません。", true);
      }
    );
  }

  function stopListeners() {
    unsubscribeFavorites?.();
    unsubscribePreferences?.();
    unsubscribeFavorites = null;
    unsubscribePreferences = null;
  }

  async function mergeGuestData(uid, database, api) {
    const guest = bridge.getGuestState();
    const favoritesReference = api.collection(database, "users", uid, "favorites");
    const preferencesReference = api.doc(database, "users", uid, "preferences", "news");
    const [cloudFavorites, cloudPreferences] = await Promise.all([
      api.getDocs(favoritesReference),
      api.getDoc(preferencesReference)
    ]);
    const cloudIds = new Set(cloudFavorites.docs.map(document => document.id));
    const idsToAdd = guest.favorites.filter(id => /^[a-zA-Z0-9_-]{1,80}$/.test(id) && !cloudIds.has(id));

    for (let offset = 0; offset < idsToAdd.length; offset += 400) {
      const batch = api.writeBatch(database);
      idsToAdd.slice(offset, offset + 400).forEach(id => {
        batch.set(api.doc(database, "users", uid, "favorites", id), {
          savedAt: api.serverTimestamp(),
          schemaVersion: 1
        });
      });
      await batch.commit();
    }

    if (!cloudPreferences.exists()) {
      await api.setDoc(preferencesReference, {
        hiddenSources: sanitizeSources(guest.hiddenSources),
        updatedAt: api.serverTimestamp(),
        schemaVersion: 1
      });
    }
  }
}

async function deleteAllUserData(uid, database, api) {
  const snapshot = await api.getDocs(api.collection(database, "users", uid, "favorites"));
  for (let offset = 0; offset < snapshot.docs.length; offset += 400) {
    const batch = api.writeBatch(database);
    snapshot.docs.slice(offset, offset + 400).forEach(document => batch.delete(document.ref));
    await batch.commit();
  }
  await api.deleteDoc(api.doc(database, "users", uid, "preferences", "news"));
}

// ホーム画面から起動したwebアプリ（standalone表示）かどうかを判定する
function isStandaloneDisplay() {
  if (window.navigator.standalone === true) return true;
  const modes = ["standalone", "fullscreen", "minimal-ui", "window-controls-overlay"];
  return modes.some(mode => window.matchMedia(`(display-mode: ${mode})`).matches);
}

function savePendingRedirect(mode, remember) {
  try {
    window.sessionStorage.setItem(
      pendingRedirectKey,
      JSON.stringify({ mode, remember: remember === true, startedAt: Date.now() })
    );
  } catch (error) {
    console.warn("ログインの経過を一時保存できませんでした。", error);
  }
}

function clearPendingRedirect() {
  try {
    window.sessionStorage.removeItem(pendingRedirectKey);
  } catch (error) {
    console.warn("ログインの経過を消去できませんでした。", error);
  }
}

// 一度読み取ったら消し、古い記録は無視する（意図しない削除処理の再実行を防ぐ）
function takePendingRedirect() {
  let raw = null;
  try {
    raw = window.sessionStorage.getItem(pendingRedirectKey);
    window.sessionStorage.removeItem(pendingRedirectKey);
  } catch (error) {
    console.warn("ログインの経過を読み取れませんでした。", error);
    return null;
  }
  if (!raw) return null;
  try {
    const pending = JSON.parse(raw);
    const isFresh = Number.isFinite(pending?.startedAt)
      && Date.now() - pending.startedAt >= 0
      && Date.now() - pending.startedAt < pendingRedirectMaxAgeMs;
    if (!isFresh || (pending.mode !== "signin" && pending.mode !== "remove")) return null;
    return { mode: pending.mode, remember: pending.remember === true };
  } catch (error) {
    console.warn("ログインの経過を解析できませんでした。", error);
    return null;
  }
}

function sanitizeSources(values) {
  if (!Array.isArray(values)) return [];
  return [...new Set(values.map(value => String(value).trim()).filter(Boolean))]
    .filter(value => value.length <= 100)
    .slice(0, 100);
}

function setStatus(message, isError = false) {
  const status = document.getElementById("sync-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.error = String(isError);
}

function setBusy(busy) {
  ["sync-login", "sync-logout", "sync-remove-account"].forEach(id => {
    const button = document.getElementById(id);
    if (button && !button.hidden) button.disabled = busy;
  });
}
