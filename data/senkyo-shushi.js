// 選挙運動費用収支報告書の案内データ
// reports の想定項目:
// id, personId, candidateName, electionId, electionName, electionType, electionDate,
// reportKind, status, summaryUrl, fullReportUrl, sourceLabel, sourceUrl, verifiedAt, note
window.SHINAGAWA_SENKYO_SHUSHI = {
  title: "選挙運動費用収支報告書",
  checkedAt: "2026-07-22",
  note: "候補者別の資料は、公式の公表ページと資料名を確認したものから追加します。報告書全文ではなく要旨のみが公表されている場合は、要旨として区別して掲載します。",
  sources: [
    {
      label: "品川区 公費負担・収支報告など",
      url: "https://www.city.shinagawa.tokyo.jp/kusei/senkyo/1009265/1009267.html",
      role: "品川区選挙管理委員会の制度案内"
    },
    {
      label: "品川区 過去の選挙結果",
      url: "https://www.city.shinagawa.tokyo.jp/kusei/senkyo/1010843/1010763.html",
      role: "選挙名・候補者・執行日の確認"
    },
    {
      label: "東京都選挙管理委員会",
      url: "https://www.senkyo.metro.tokyo.lg.jp/",
      role: "都議選・国政選挙などの確認"
    }
  ],
  electionTypes: [
    { id: "ward-assembly", label: "品川区議会議員選挙" },
    { id: "ward-assembly-by", label: "品川区議会議員補欠選挙" },
    { id: "ward-mayor", label: "品川区長選挙" },
    { id: "tokyo-assembly", label: "東京都議会議員選挙" },
    { id: "tokyo-assembly-by", label: "東京都議会議員補欠選挙" },
    { id: "house", label: "衆議院議員選挙" }
  ],
  statuses: [
    { id: "published", label: "公式資料掲載済み" },
    { id: "summary-only", label: "要旨のみ掲載" },
    { id: "checking", label: "公式資料確認中" }
  ],
  reports: []
};
