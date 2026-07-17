#!/usr/bin/env python3
"""Firebase同期設定に秘密情報や設定漏れがないかを簡易確認する。"""

from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
CONFIG = ROOT / "data" / "firebase-config.js"
RULES = ROOT / "firebase" / "firestore.rules"
FORBIDDEN = ("private_key", "client_secret", "service_account", "BEGIN PRIVATE KEY")
REQUIRED = ("apiKey", "authDomain", "projectId", "appId")


def main() -> int:
    errors: list[str] = []
    config_text = CONFIG.read_text(encoding="utf-8")
    rules_text = RULES.read_text(encoding="utf-8")
    lowered = config_text.lower()

    for keyword in FORBIDDEN:
        if keyword.lower() in lowered:
            errors.append(f"公開設定に秘密情報らしい文字列があります: {keyword}")

    enabled_match = re.search(
        r"SHINAGAWA_FIREBASE_SYNC\s*=.*?enabled\s*:\s*(true|false)",
        config_text,
        flags=re.DOTALL,
    )
    enabled = bool(enabled_match and enabled_match.group(1) == "true")
    if enabled:
        for key in REQUIRED:
            match = re.search(rf"{key}\s*:\s*\"([^\"]*)\"", config_text)
            if not match or not match.group(1).strip():
                errors.append(f"同期を有効にするには {key} が必要です")

    if "request.auth.uid == userId" not in rules_text:
        errors.append("Firestoreルールに利用者本人の確認条件がありません")
    if "firebase.sign_in_provider == 'google.com'" not in rules_text:
        errors.append("FirestoreルールにGoogleログインの確認条件がありません")
    if "match /{document=**}" not in rules_text or "allow read, write: if false" not in rules_text:
        errors.append("Firestoreルールの既定拒否がありません")

    if errors:
        print("Firebase同期設定の確認で問題が見つかりました:")
        for error in errors:
            print(f"- {error}")
        return 1

    state = "有効" if enabled else "無効（安全な初期状態）"
    print(f"Firebase同期設定: {state}")
    print("秘密情報の混入とFirestoreルールの基本条件に問題はありません。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
