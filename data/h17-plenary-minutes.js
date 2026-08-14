/* 平成17年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h17;
  if (!year) throw new Error("平成17年データの読み込み後に h17-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h17-20050222-honkaigi",
    "meetingId": "h17-1t",
    "meetingName": "平成17年第1回定例会",
    "dateIso": "2005-02-22",
    "date": "2005年2月22日",
    "dayLabel": "第1日目",
    "title": "2005年2月22日 平成17年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=108#one",
    "characters": 55184,
    "voices": 30,
    "hasFullText": true
  },
  {
    "id": "h17-20050223-honkaigi",
    "meetingId": "h17-1t",
    "meetingName": "平成17年第1回定例会",
    "dateIso": "2005-02-23",
    "date": "2005年2月23日",
    "dayLabel": "第2日目",
    "title": "2005年2月23日 平成17年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=110#one",
    "characters": 72794,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "h17-20050224-honkaigi",
    "meetingId": "h17-1t",
    "meetingName": "平成17年第1回定例会",
    "dateIso": "2005-02-24",
    "date": "2005年2月24日",
    "dayLabel": "第3日目",
    "title": "2005年2月24日 平成17年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=112#one",
    "characters": 56851,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h17-20050310-honkaigi",
    "meetingId": "h17-1t",
    "meetingName": "平成17年第1回定例会",
    "dateIso": "2005-03-10",
    "date": "2005年3月10日",
    "dayLabel": "第4日目",
    "title": "2005年3月10日 平成17年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=114#one",
    "characters": 1972,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h17-20050329-honkaigi",
    "meetingId": "h17-1t",
    "meetingName": "平成17年第1回定例会",
    "dateIso": "2005-03-29",
    "date": "2005年3月29日",
    "dayLabel": "第5日目",
    "title": "2005年3月29日 平成17年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=116#one",
    "characters": 27987,
    "voices": 75,
    "hasFullText": true
  },
  {
    "id": "h17-20050527-honkaigi",
    "meetingId": "h17-1r",
    "meetingName": "平成17年第1回臨時会",
    "dateIso": "2005-05-27",
    "date": "2005年5月27日",
    "dayLabel": "第1日目",
    "title": "2005年5月27日 平成17年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=708#one",
    "characters": 7907,
    "voices": 79,
    "hasFullText": true
  },
  {
    "id": "h17-20050622-honkaigi",
    "meetingId": "h17-2t",
    "meetingName": "平成17年第2回定例会",
    "dateIso": "2005-06-22",
    "date": "2005年6月22日",
    "dayLabel": "第1日目",
    "title": "2005年6月22日 平成17年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=118#one",
    "characters": 48181,
    "voices": 45,
    "hasFullText": true
  },
  {
    "id": "h17-20050623-honkaigi",
    "meetingId": "h17-2t",
    "meetingName": "平成17年第2回定例会",
    "dateIso": "2005-06-23",
    "date": "2005年6月23日",
    "dayLabel": "第2日目",
    "title": "2005年6月23日 平成17年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=120#one",
    "characters": 74297,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "h17-20050714-honkaigi",
    "meetingId": "h17-2t",
    "meetingName": "平成17年第2回定例会",
    "dateIso": "2005-07-14",
    "date": "2005年7月14日",
    "dayLabel": "第3日目",
    "title": "2005年7月14日 平成17年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=122#one",
    "characters": 14183,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h17-20050921-honkaigi",
    "meetingId": "h17-3t",
    "meetingName": "平成17年第3回定例会",
    "dateIso": "2005-09-21",
    "date": "2005年9月21日",
    "dayLabel": "第1日目",
    "title": "2005年9月21日 平成17年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=124#one",
    "characters": 50451,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h17-20050922-honkaigi",
    "meetingId": "h17-3t",
    "meetingName": "平成17年第3回定例会",
    "dateIso": "2005-09-22",
    "date": "2005年9月22日",
    "dayLabel": "第2日目",
    "title": "2005年9月22日 平成17年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=126#one",
    "characters": 67990,
    "voices": 78,
    "hasFullText": true
  },
  {
    "id": "h17-20050927-honkaigi",
    "meetingId": "h17-3t",
    "meetingName": "平成17年第3回定例会",
    "dateIso": "2005-09-27",
    "date": "2005年9月27日",
    "dayLabel": "第3日目",
    "title": "2005年9月27日 平成17年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=128#one",
    "characters": 3360,
    "voices": 11,
    "hasFullText": true
  },
  {
    "id": "h17-20051021-honkaigi",
    "meetingId": "h17-3t",
    "meetingName": "平成17年第3回定例会",
    "dateIso": "2005-10-21",
    "date": "2005年10月21日",
    "dayLabel": "第4日目",
    "title": "2005年10月21日 平成17年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=130#one",
    "characters": 27997,
    "voices": 85,
    "hasFullText": true
  },
  {
    "id": "h17-20051124-honkaigi",
    "meetingId": "h17-4t",
    "meetingName": "平成17年第4回定例会",
    "dateIso": "2005-11-24",
    "date": "2005年11月24日",
    "dayLabel": "第1日目",
    "title": "2005年11月24日 平成17年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=132#one",
    "characters": 42567,
    "voices": 31,
    "hasFullText": true
  },
  {
    "id": "h17-20051125-honkaigi",
    "meetingId": "h17-4t",
    "meetingName": "平成17年第4回定例会",
    "dateIso": "2005-11-25",
    "date": "2005年11月25日",
    "dayLabel": "第2日目",
    "title": "2005年11月25日 平成17年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=134#one",
    "characters": 76956,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "h17-20051208-honkaigi",
    "meetingId": "h17-4t",
    "meetingName": "平成17年第4回定例会",
    "dateIso": "2005-12-08",
    "date": "2005年12月8日",
    "dayLabel": "第3日目",
    "title": "2005年12月8日 平成17年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=136#one",
    "characters": 21604,
    "voices": 59,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h17-1t:x-hara-masami": {
    "sessionId": "h17-20050222-honkaigi",
    "voiceIndex": 9
  },
  "h17-1t:x-mikami-hiroshi": {
    "sessionId": "h17-20050222-honkaigi",
    "voiceIndex": 18
  },
  "h17-1t:x-takahoshi-masatoshi": {
    "sessionId": "h17-20050222-honkaigi",
    "voiceIndex": 24
  },
  "h17-1t:x-sawada-eiji": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 4
  },
  "h17-1t:takako_nishimoto": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 12
  },
  "h17-1t:x-nakajima-mie": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 19
  },
  "h17-1t:x-iinuma-masako": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 26
  },
  "h17-1t:x-honda-takenobu": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 40
  },
  "h17-1t:x-kinoshita-fuminori": {
    "sessionId": "h17-20050223-honkaigi",
    "voiceIndex": 45
  },
  "h17-1t:hiroki_wakabayashi": {
    "sessionId": "h17-20050224-honkaigi",
    "voiceIndex": 4
  },
  "h17-1t:x-osawa-shinichi": {
    "sessionId": "h17-20050224-honkaigi",
    "voiceIndex": 8
  },
  "h17-1t:x-kikuchi-teiji": {
    "sessionId": "h17-20050224-honkaigi",
    "voiceIndex": 14
  },
  "h17-1t:x-tsukamoto-toshimitsu": {
    "sessionId": "h17-20050224-honkaigi",
    "voiceIndex": 25
  },
  "h17-2t:x-doi-yoichi": {
    "sessionId": "h17-20050622-honkaigi",
    "voiceIndex": 17
  },
  "h17-2t:x-mimura-ritsuko": {
    "sessionId": "h17-20050622-honkaigi",
    "voiceIndex": 23
  },
  "h17-2t:hideo_ishida": {
    "sessionId": "h17-20050622-honkaigi",
    "voiceIndex": 32
  },
  "h17-2t:hiroki_wakabayashi": {
    "sessionId": "h17-20050622-honkaigi",
    "voiceIndex": 41
  },
  "h17-2t:x-takahoshi-masatoshi": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 4
  },
  "h17-2t:hiroko_suzuki": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 9
  },
  "h17-2t:x-suzuki-masumi": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 23
  },
  "h17-2t:masanori_fujiwara": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 30
  },
  "h17-2t:x-fujita-jiro": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 36
  },
  "h17-2t:x-tsukidate-takeo": {
    "sessionId": "h17-20050623-honkaigi",
    "voiceIndex": 43
  },
  "h17-3t:x-miyazaki-katsutoshi": {
    "sessionId": "h17-20050921-honkaigi",
    "voiceIndex": 7
  },
  "h17-3t:yukihiro_sugai": {
    "sessionId": "h17-20050921-honkaigi",
    "voiceIndex": 19
  },
  "h17-3t:x-hayashi-hiroshi": {
    "sessionId": "h17-20050921-honkaigi",
    "voiceIndex": 31
  },
  "h17-3t:x-takeuchi-shinobu": {
    "sessionId": "h17-20050921-honkaigi",
    "voiceIndex": 39
  },
  "h17-3t:x-kawanishi-kinuko": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 4
  },
  "h17-3t:ryo_nakatsuka": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 11
  },
  "h17-3t:x-matsuzawa-toshiyuki": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 25
  },
  "h17-3t:x-honda-giichi": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 32
  },
  "h17-3t:x-kinoshita-fuminori": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 38
  },
  "h17-3t:x-honda-takenobu": {
    "sessionId": "h17-20050922-honkaigi",
    "voiceIndex": 44
  },
  "h17-4t:x-suto-yasumichi": {
    "sessionId": "h17-20051124-honkaigi",
    "voiceIndex": 6
  },
  "h17-4t:x-inoue-yaeko": {
    "sessionId": "h17-20051124-honkaigi",
    "voiceIndex": 14
  },
  "h17-4t:hiroki_wakabayashi": {
    "sessionId": "h17-20051124-honkaigi",
    "voiceIndex": 23
  },
  "h17-4t:x-honma-takashi": {
    "sessionId": "h17-20051124-honkaigi",
    "voiceIndex": 27
  },
  "h17-4t:x-iinuma-masako": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 4
  },
  "h17-4t:x-hayashi-kazuya": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 17
  },
  "h17-4t:hideo_ishida": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 23
  },
  "h17-4t:takako_nishimoto": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 32
  },
  "h17-4t:x-yamaji-yoshinari": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 41
  },
  "h17-4t:x-yamamura-akitsugu": {
    "sessionId": "h17-20051125-honkaigi",
    "voiceIndex": 47
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
