// 品川区議会DB データファイル（品川区の選挙アーカイブ）
// 具体的な選挙名・得票数・参考リンクは、情報源の共有・確認後に追加する。
// elections の想定項目:
// id, type, subtype, title, electionDate, noticeDate, district, seats,
// candidateCount, electorate, voters, turnout, previousTurnout, summary,
// candidates[{ personId, name, party, result, rank, votesDisplay, votesValue, voteShare }],
// proportionalResults[{ name, votesDisplay, votesValue }], sources[{ label, url }], verifiedAt
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.electionsData = {
  "updatedAt": "2026-07-17",
  "note": "選挙アーカイブは枠組みのみ準備済みです。具体的な選挙結果は参考資料の確認後に掲載します。",
  "types": [
    { "id": "ward-assembly", "label": "品川区議会議員選挙" },
    { "id": "ward-mayor", "label": "品川区長選挙" },
    { "id": "tokyo-assembly", "label": "東京都議会議員選挙" },
    { "id": "house", "label": "衆議院議員選挙" }
  ],
  "elections": []
};
