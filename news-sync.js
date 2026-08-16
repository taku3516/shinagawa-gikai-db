const settings = window.SHINAGAWA_FIREBASE_SYNC;
const bridge = window.SHINAGAWA_NEWS_SYNC_BRIDGE;
const panel = document.getElementById("news-sync-panel");

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"];
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

  elements.login.addEventListener("click", async () => {
    setBusy(true);
    setStatus("Googleログインを確認しています…");
    try {
      const persistence = elements.remember.checked
        ? authApi.browserLocalPersistence
        : authApi.browserSessionPersistence;
      await authApi.setPersistence(auth, persistence);
      await authApi.signInWithPopup(auth, provider);
    } catch (error) {
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
      await authApi.reauthenticateWithPopup(currentUser, provider);
      setStatus("同期データを削除しています…");
      await deleteAllUserData(currentUser.uid, db, firestoreApi);
      await authApi.deleteUser(currentUser);
      window.location.reload();
    } catch (error) {
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
