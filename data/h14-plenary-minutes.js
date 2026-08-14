/* 平成14年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h14;
  if (!year) throw new Error("平成14年データの読み込み後に h14-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h14-20020227-honkaigi",
    "meetingId": "h14-1t",
    "meetingName": "平成14年第1回定例会",
    "dateIso": "2002-02-27",
    "date": "2002年2月27日",
    "dayLabel": "第1日目",
    "title": "2002年2月27日 平成14年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=20#one",
    "characters": 83318,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h14-20020228-honkaigi",
    "meetingId": "h14-1t",
    "meetingName": "平成14年第1回定例会",
    "dateIso": "2002-02-28",
    "date": "2002年2月28日",
    "dayLabel": "第2日目",
    "title": "2002年2月28日 平成14年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=22#one",
    "characters": 80601,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h14-20020301-honkaigi",
    "meetingId": "h14-1t",
    "meetingName": "平成14年第1回定例会",
    "dateIso": "2002-03-01",
    "date": "2002年3月1日",
    "dayLabel": "第3日目",
    "title": "2002年3月1日 平成14年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=24#one",
    "characters": 81226,
    "voices": 80,
    "hasFullText": true
  },
  {
    "id": "h14-20020311-honkaigi",
    "meetingId": "h14-1t",
    "meetingName": "平成14年第1回定例会",
    "dateIso": "2002-03-11",
    "date": "2002年3月11日",
    "dayLabel": "第4日目",
    "title": "2002年3月11日 平成14年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=26#one",
    "characters": 3335,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "h14-20020328-honkaigi",
    "meetingId": "h14-1t",
    "meetingName": "平成14年第1回定例会",
    "dateIso": "2002-03-28",
    "date": "2002年3月28日",
    "dayLabel": "第5日目",
    "title": "2002年3月28日 平成14年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=28#one",
    "characters": 27149,
    "voices": 76,
    "hasFullText": true
  },
  {
    "id": "h14-20020531-honkaigi",
    "meetingId": "h14-1r",
    "meetingName": "平成14年第1回臨時会",
    "dateIso": "2002-05-31",
    "date": "2002年5月31日",
    "dayLabel": "第1日目",
    "title": "2002年5月31日 平成14年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=698#one",
    "characters": 5381,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h14-20020627-honkaigi",
    "meetingId": "h14-2t",
    "meetingName": "平成14年第2回定例会",
    "dateIso": "2002-06-27",
    "date": "2002年6月27日",
    "dayLabel": "第1日目",
    "title": "2002年6月27日 平成14年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=30#one",
    "characters": 59062,
    "voices": 40,
    "hasFullText": true
  },
  {
    "id": "h14-20020628-honkaigi",
    "meetingId": "h14-2t",
    "meetingName": "平成14年第2回定例会",
    "dateIso": "2002-06-28",
    "date": "2002年6月28日",
    "dayLabel": "第2日目",
    "title": "2002年6月28日 平成14年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=32#one",
    "characters": 63751,
    "voices": 63,
    "hasFullText": true
  },
  {
    "id": "h14-20020712-honkaigi",
    "meetingId": "h14-2t",
    "meetingName": "平成14年第2回定例会",
    "dateIso": "2002-07-12",
    "date": "2002年7月12日",
    "dayLabel": "第3日目",
    "title": "2002年7月12日 平成14年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=34#one",
    "characters": 14741,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h14-20020919-honkaigi",
    "meetingId": "h14-3t",
    "meetingName": "平成14年第3回定例会",
    "dateIso": "2002-09-19",
    "date": "2002年9月19日",
    "dayLabel": "第1日目",
    "title": "2002年9月19日 平成14年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=36#one",
    "characters": 48336,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h14-20020920-honkaigi",
    "meetingId": "h14-3t",
    "meetingName": "平成14年第3回定例会",
    "dateIso": "2002-09-20",
    "date": "2002年9月20日",
    "dayLabel": "第2日目",
    "title": "2002年9月20日 平成14年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=38#one",
    "characters": 70720,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "h14-20020925-honkaigi",
    "meetingId": "h14-3t",
    "meetingName": "平成14年第3回定例会",
    "dateIso": "2002-09-25",
    "date": "2002年9月25日",
    "dayLabel": "第3日目",
    "title": "2002年9月25日 平成14年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=40#one",
    "characters": 5181,
    "voices": 20,
    "hasFullText": true
  },
  {
    "id": "h14-20021017-honkaigi",
    "meetingId": "h14-3t",
    "meetingName": "平成14年第3回定例会",
    "dateIso": "2002-10-17",
    "date": "2002年10月17日",
    "dayLabel": "第4日目",
    "title": "2002年10月17日 平成14年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=42#one",
    "characters": 24512,
    "voices": 98,
    "hasFullText": true
  },
  {
    "id": "h14-20021121-honkaigi",
    "meetingId": "h14-4t",
    "meetingName": "平成14年第4回定例会",
    "dateIso": "2002-11-21",
    "date": "2002年11月21日",
    "dayLabel": "第1日目",
    "title": "2002年11月21日 平成14年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=44#one",
    "characters": 42322,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h14-20021122-honkaigi",
    "meetingId": "h14-4t",
    "meetingName": "平成14年第4回定例会",
    "dateIso": "2002-11-22",
    "date": "2002年11月22日",
    "dayLabel": "第2日目",
    "title": "2002年11月22日 平成14年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=46#one",
    "characters": 57453,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h14-20021205-honkaigi",
    "meetingId": "h14-4t",
    "meetingName": "平成14年第4回定例会",
    "dateIso": "2002-12-05",
    "date": "2002年12月5日",
    "dayLabel": "第3日目",
    "title": "2002年12月5日 平成14年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=48#one",
    "characters": 15659,
    "voices": 42,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h14-1t:x-tsukidate-takeo": {
    "sessionId": "h14-20020227-honkaigi",
    "voiceIndex": 8
  },
  "h14-1t:x-sakai-naotaka": {
    "sessionId": "h14-20020227-honkaigi",
    "voiceIndex": 20
  },
  "h14-1t:x-sawada-eiji": {
    "sessionId": "h14-20020227-honkaigi",
    "voiceIndex": 33
  },
  "h14-1t:x-honda-giichi": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 4
  },
  "h14-1t:x-honma-takashi": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 14
  },
  "h14-1t:x-sato-yajiro": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 22
  },
  "h14-1t:x-ito-masahiro": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 30
  },
  "h14-1t:x-yamaji-yoshinari": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 39
  },
  "h14-1t:x-kikuchi-teiji": {
    "sessionId": "h14-20020228-honkaigi",
    "voiceIndex": 45
  },
  "h14-1t:x-doi-yoichi": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 5
  },
  "h14-1t:masanori_fujiwara": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 12
  },
  "h14-1t:hideo_ishida": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 18
  },
  "h14-1t:x-fujita-jiro": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 26
  },
  "h14-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 34
  },
  "h14-1t:x-yokoyama-hiroshi": {
    "sessionId": "h14-20020301-honkaigi",
    "voiceIndex": 49
  },
  "h14-2t:x-doi-yoichi": {
    "sessionId": "h14-20020627-honkaigi",
    "voiceIndex": 6
  },
  "h14-2t:x-honda-takenobu": {
    "sessionId": "h14-20020627-honkaigi",
    "voiceIndex": 15
  },
  "h14-2t:x-tsuji-yukio": {
    "sessionId": "h14-20020627-honkaigi",
    "voiceIndex": 23
  },
  "h14-2t:x-minami-keiko": {
    "sessionId": "h14-20020627-honkaigi",
    "voiceIndex": 29
  },
  "h14-2t:x-suzuki-masumi": {
    "sessionId": "h14-20020628-honkaigi",
    "voiceIndex": 5
  },
  "h14-2t:x-shima-kuniko": {
    "sessionId": "h14-20020628-honkaigi",
    "voiceIndex": 12
  },
  "h14-2t:hiroko_suzuki": {
    "sessionId": "h14-20020628-honkaigi",
    "voiceIndex": 19
  },
  "h14-2t:x-tsukidate-takeo": {
    "sessionId": "h14-20020628-honkaigi",
    "voiceIndex": 33
  },
  "h14-2t:x-kawanishi-kinuko": {
    "sessionId": "h14-20020628-honkaigi",
    "voiceIndex": 41
  },
  "h14-3t:x-yamaji-yoshinari": {
    "sessionId": "h14-20020919-honkaigi",
    "voiceIndex": 19
  },
  "h14-3t:x-sakurai-keiko": {
    "sessionId": "h14-20020919-honkaigi",
    "voiceIndex": 24
  },
  "h14-3t:masanori_fujiwara": {
    "sessionId": "h14-20020919-honkaigi",
    "voiceIndex": 35
  },
  "h14-3t:x-suto-yasumichi": {
    "sessionId": "h14-20020919-honkaigi",
    "voiceIndex": 40
  },
  "h14-3t:x-tsuru-hisashi": {
    "sessionId": "h14-20020920-honkaigi",
    "voiceIndex": 4
  },
  "h14-3t:x-ueyama-hirofumi": {
    "sessionId": "h14-20020920-honkaigi",
    "voiceIndex": 9
  },
  "h14-3t:x-matsuzawa-toshiyuki": {
    "sessionId": "h14-20020920-honkaigi",
    "voiceIndex": 18
  },
  "h14-3t:x-kitano-tomie": {
    "sessionId": "h14-20020920-honkaigi",
    "voiceIndex": 25
  },
  "h14-3t:x-takagi-akira": {
    "sessionId": "h14-20020920-honkaigi",
    "voiceIndex": 36
  },
  "h14-4t:x-nakajima-mie": {
    "sessionId": "h14-20021121-honkaigi",
    "voiceIndex": 6
  },
  "h14-4t:x-miyazaki-katsutoshi": {
    "sessionId": "h14-20021121-honkaigi",
    "voiceIndex": 14
  },
  "h14-4t:x-funanami-keiko": {
    "sessionId": "h14-20021121-honkaigi",
    "voiceIndex": 24
  },
  "h14-4t:x-hayashi-kazuya": {
    "sessionId": "h14-20021121-honkaigi",
    "voiceIndex": 34
  },
  "h14-4t:x-fujita-jiro": {
    "sessionId": "h14-20021122-honkaigi",
    "voiceIndex": 4
  },
  "h14-4t:x-iinuma-masako": {
    "sessionId": "h14-20021122-honkaigi",
    "voiceIndex": 12
  },
  "h14-4t:hideo_ishida": {
    "sessionId": "h14-20021122-honkaigi",
    "voiceIndex": 24
  },
  "h14-4t:x-kanetaka-masao": {
    "sessionId": "h14-20021122-honkaigi",
    "voiceIndex": 32
  },
  "h14-4t:x-hara-masami": {
    "sessionId": "h14-20021122-honkaigi",
    "voiceIndex": 39
  },
  "h14-4t:x-suto-yasumichi": {
    "sessionId": "h14-20021205-honkaigi",
    "voiceIndex": 36
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
