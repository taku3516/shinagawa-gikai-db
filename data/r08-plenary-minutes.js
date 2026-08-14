/* 令和8年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r08;
  if (!year) throw new Error("令和8年データの読み込み後に r08-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r08-20260218-honkaigi",
    "meetingId": "r08-1t",
    "meetingName": "令和8年第1回定例会",
    "dateIso": "2026-02-18",
    "date": "2026年2月18日",
    "dayLabel": "第1日目",
    "title": "2026年2月18日 令和８年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7347#one",
    "characters": 65143,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "r08-20260219-honkaigi",
    "meetingId": "r08-1t",
    "meetingName": "令和8年第1回定例会",
    "dateIso": "2026-02-19",
    "date": "2026年2月19日",
    "dayLabel": "第2日目",
    "title": "2026年2月19日 令和８年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7349#one",
    "characters": 73009,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "r08-20260220-honkaigi",
    "meetingId": "r08-1t",
    "meetingName": "令和8年第1回定例会",
    "dateIso": "2026-02-20",
    "date": "2026年2月20日",
    "dayLabel": "第3日目",
    "title": "2026年2月20日 令和８年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7351#one",
    "characters": 39471,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "r08-20260306-honkaigi",
    "meetingId": "r08-1t",
    "meetingName": "令和8年第1回定例会",
    "dateIso": "2026-03-06",
    "date": "2026年3月6日",
    "dayLabel": "第4日目",
    "title": "2026年3月6日 令和８年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7353#one",
    "characters": 3173,
    "voices": 16,
    "hasFullText": true
  },
  {
    "id": "r08-20260327-honkaigi",
    "meetingId": "r08-1t",
    "meetingName": "令和8年第1回定例会",
    "dateIso": "2026-03-27",
    "date": "2026年3月27日",
    "dayLabel": "第5日目",
    "title": "2026年3月27日 令和８年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7355#one",
    "characters": 49654,
    "voices": 107,
    "hasFullText": true
  },
  {
    "id": "r08-20260527-honkaigi",
    "meetingId": "r08-1r",
    "meetingName": "令和8年第1回臨時会",
    "dateIso": "2026-05-27",
    "date": "2026年5月27日",
    "dayLabel": "第1日目",
    "title": "2026年5月27日 令和８年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7395#one",
    "characters": 9911,
    "voices": 49,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r08-1t:kazumasa_matsuzawa": {
    "sessionId": "r08-20260218-honkaigi",
    "voiceIndex": 8
  },
  "r08-1t:yasuyuki_yamamoto": {
    "sessionId": "r08-20260218-honkaigi",
    "voiceIndex": 19
  },
  "r08-1t:hiroki_wakabayashi": {
    "sessionId": "r08-20260218-honkaigi",
    "voiceIndex": 31
  },
  "r08-1t:chihiro_ishida": {
    "sessionId": "r08-20260219-honkaigi",
    "voiceIndex": 4
  },
  "r08-1t:mari_seo": {
    "sessionId": "r08-20260219-honkaigi",
    "voiceIndex": 20
  },
  "r08-1t:ayaka_ogino": {
    "sessionId": "r08-20260219-honkaigi",
    "voiceIndex": 27
  },
  "r08-1t:hiroko_suzuki": {
    "sessionId": "r08-20260219-honkaigi",
    "voiceIndex": 34
  },
  "r08-1t:nobuaki_takahashi": {
    "sessionId": "r08-20260219-honkaigi",
    "voiceIndex": 56
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
