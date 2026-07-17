// 品川区議会DB データファイル（品川区選出・品川区に関係する政治家名簿）
// 具体的な人物情報は、在職・選出を確認できる参考資料の共有・確認後に追加する。
// members の想定項目: id, name, kana, party, statusLabel, office,
// electoralDistrict, term, serviceHistory, profileUrl, websiteUrl, email,
// career, electionHistory, sns, fundReports, activityExpenses, sources
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.politiciansData = {
  "updatedAt": "2026-07-17",
  "note": "区議以外の政治家名簿は枠組みのみ準備済みです。具体的な人物情報は参考資料の確認後に掲載します。",
  "rosters": {
    "current-tokyo": { "members": [] },
    "former-tokyo": { "members": [] },
    "current-house": { "members": [] },
    "former-house": { "members": [] },
    "current-mayor": { "members": [] },
    "former-mayor": { "members": [] }
  }
};
