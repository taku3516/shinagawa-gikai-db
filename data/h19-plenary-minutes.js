/* 平成19年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h19;
  if (!year) throw new Error("平成19年データの読み込み後に h19-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h19-20070221-honkaigi",
    "meetingId": "h19-1t",
    "dateIso": "2007-02-21",
    "date": "2007年2月21日",
    "dayLabel": "第1日目",
    "title": "2007年2月21日 平成19年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=172#one",
    "characters": 62896,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "h19-20070222-honkaigi",
    "meetingId": "h19-1t",
    "dateIso": "2007-02-22",
    "date": "2007年2月22日",
    "dayLabel": "第2日目",
    "title": "2007年2月22日 平成19年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=174#one",
    "characters": 70581,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h19-20070223-honkaigi",
    "meetingId": "h19-1t",
    "dateIso": "2007-02-23",
    "date": "2007年2月23日",
    "dayLabel": "第3日目",
    "title": "2007年2月23日 平成19年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=176#one",
    "characters": 53936,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h19-20070308-honkaigi",
    "meetingId": "h19-1t",
    "dateIso": "2007-03-08",
    "date": "2007年3月8日",
    "dayLabel": "第4日目",
    "title": "2007年3月8日 平成19年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=178#one",
    "characters": 4849,
    "voices": 24,
    "hasFullText": true
  },
  {
    "id": "h19-20070327-honkaigi",
    "meetingId": "h19-1t",
    "dateIso": "2007-03-27",
    "date": "2007年3月27日",
    "dayLabel": "第5日目",
    "title": "2007年3月27日 平成19年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=180#one",
    "characters": 24888,
    "voices": 71,
    "hasFullText": true
  },
  {
    "id": "h19-20070621-honkaigi",
    "meetingId": "h19-2t",
    "dateIso": "2007-06-21",
    "date": "2007年6月21日",
    "dayLabel": "第1日目",
    "title": "2007年6月21日 平成19年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=182#one",
    "characters": 52665,
    "voices": 39,
    "hasFullText": true
  },
  {
    "id": "h19-20070622-honkaigi",
    "meetingId": "h19-2t",
    "dateIso": "2007-06-22",
    "date": "2007年6月22日",
    "dayLabel": "第2日目",
    "title": "2007年6月22日 平成19年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=184#one",
    "characters": 68174,
    "voices": 65,
    "hasFullText": true
  },
  {
    "id": "h19-20070704-honkaigi",
    "meetingId": "h19-2t",
    "dateIso": "2007-07-04",
    "date": "2007年7月4日",
    "dayLabel": "第3日目",
    "title": "2007年7月4日 平成19年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=186#one",
    "characters": 13612,
    "voices": 42,
    "hasFullText": true
  },
  {
    "id": "h19-20070920-honkaigi",
    "meetingId": "h19-3t",
    "dateIso": "2007-09-20",
    "date": "2007年9月20日",
    "dayLabel": "第1日目",
    "title": "2007年9月20日 平成19年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=188#one",
    "characters": 48717,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h19-20070921-honkaigi",
    "meetingId": "h19-3t",
    "dateIso": "2007-09-21",
    "date": "2007年9月21日",
    "dayLabel": "第2日目",
    "title": "2007年9月21日 平成19年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=190#one",
    "characters": 81118,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "h19-20070926-honkaigi",
    "meetingId": "h19-3t",
    "dateIso": "2007-09-26",
    "date": "2007年9月26日",
    "dayLabel": "第3日目",
    "title": "2007年9月26日 平成19年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=192#one",
    "characters": 1439,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h19-20071019-honkaigi",
    "meetingId": "h19-3t",
    "dateIso": "2007-10-19",
    "date": "2007年10月19日",
    "dayLabel": "第4日目",
    "title": "2007年10月19日 平成19年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=194#one",
    "characters": 31626,
    "voices": 111,
    "hasFullText": true
  },
  {
    "id": "h19-20071121-honkaigi",
    "meetingId": "h19-4t",
    "dateIso": "2007-11-21",
    "date": "2007年11月21日",
    "dayLabel": "第1日目",
    "title": "2007年11月21日 平成19年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=196#one",
    "characters": 59817,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h19-20071122-honkaigi",
    "meetingId": "h19-4t",
    "dateIso": "2007-11-22",
    "date": "2007年11月22日",
    "dayLabel": "第2日目",
    "title": "2007年11月22日 平成19年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=198#one",
    "characters": 80551,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "h19-20071207-honkaigi",
    "meetingId": "h19-4t",
    "dateIso": "2007-12-07",
    "date": "2007年12月7日",
    "dayLabel": "第3日目",
    "title": "2007年12月7日 平成19年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=200#one",
    "characters": 17867,
    "voices": 58,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h19-1t:x-suto-yasumichi": {
    "sessionId": "h19-20070221-honkaigi",
    "voiceIndex": 8
  },
  "h19-1t:x-minami-keiko": {
    "sessionId": "h19-20070221-honkaigi",
    "voiceIndex": 15
  },
  "h19-1t:x-mikami-hiroshi": {
    "sessionId": "h19-20070221-honkaigi",
    "voiceIndex": 29
  },
  "h19-1t:x-doi-yoichi": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 4
  },
  "h19-1t:masanori_fujiwara": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 11
  },
  "h19-1t:x-fujita-jiro": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 22
  },
  "h19-1t:x-hayashi-kazuya": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 28
  },
  "h19-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 33
  },
  "h19-1t:x-yamauchi-akira": {
    "sessionId": "h19-20070222-honkaigi",
    "voiceIndex": 46
  },
  "h19-1t:x-honma-takashi": {
    "sessionId": "h19-20070223-honkaigi",
    "voiceIndex": 4
  },
  "h19-1t:x-hara-kozo": {
    "sessionId": "h19-20070223-honkaigi",
    "voiceIndex": 10
  },
  "h19-1t:x-sawada-eiji": {
    "sessionId": "h19-20070223-honkaigi",
    "voiceIndex": 17
  },
  "h19-1t:x-honda-takenobu": {
    "sessionId": "h19-20070223-honkaigi",
    "voiceIndex": 27
  },
  "h19-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h19-20070621-honkaigi",
    "voiceIndex": 6
  },
  "h19-2t:x-yamaji-yoshinari": {
    "sessionId": "h19-20070621-honkaigi",
    "voiceIndex": 11
  },
  "h19-2t:x-minami-keiko": {
    "sessionId": "h19-20070621-honkaigi",
    "voiceIndex": 17
  },
  "h19-2t:x-abe-yumiko": {
    "sessionId": "h19-20070621-honkaigi",
    "voiceIndex": 29
  },
  "h19-2t:x-yamauchi-akira": {
    "sessionId": "h19-20070621-honkaigi",
    "voiceIndex": 35
  },
  "h19-2t:hiroki_wakabayashi": {
    "sessionId": "h19-20070622-honkaigi",
    "voiceIndex": 4
  },
  "h19-2t:yukihiro_sugai": {
    "sessionId": "h19-20070622-honkaigi",
    "voiceIndex": 13
  },
  "h19-2t:x-suzuki-masumi": {
    "sessionId": "h19-20070622-honkaigi",
    "voiceIndex": 22
  },
  "h19-2t:ryo_nakatsuka": {
    "sessionId": "h19-20070622-honkaigi",
    "voiceIndex": 28
  },
  "h19-2t:x-inoue-yaeko": {
    "sessionId": "h19-20070622-honkaigi",
    "voiceIndex": 45
  },
  "h19-3t:x-yamamoto-keiko": {
    "sessionId": "h19-20070920-honkaigi",
    "voiceIndex": 6
  },
  "h19-3t:x-miyazaki-katsutoshi": {
    "sessionId": "h19-20070920-honkaigi",
    "voiceIndex": 12
  },
  "h19-3t:x-ishida-shingo": {
    "sessionId": "h19-20070920-honkaigi",
    "voiceIndex": 27
  },
  "h19-3t:x-honda-takenobu": {
    "sessionId": "h19-20070920-honkaigi",
    "voiceIndex": 31
  },
  "h19-3t:x-watabe-shigeru": {
    "sessionId": "h19-20070920-honkaigi",
    "voiceIndex": 37
  },
  "h19-3t:x-takeuchi-shinobu": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 4
  },
  "h19-3t:yuichi_watanabe": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 9
  },
  "h19-3t:hiroko_suzuki": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 15
  },
  "h19-3t:x-inagawa-takayuki": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 30
  },
  "h19-3t:takako_nishimoto": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 38
  },
  "h19-3t:x-hara-kozo": {
    "sessionId": "h19-20070921-honkaigi",
    "voiceIndex": 44
  },
  "h19-4t:taisaku_ando": {
    "sessionId": "h19-20071121-honkaigi",
    "voiceIndex": 6
  },
  "h19-4t:x-honma-takashi": {
    "sessionId": "h19-20071121-honkaigi",
    "voiceIndex": 18
  },
  "h19-4t:hideo_ishida": {
    "sessionId": "h19-20071121-honkaigi",
    "voiceIndex": 26
  },
  "h19-4t:x-asano-hiroyuki": {
    "sessionId": "h19-20071121-honkaigi",
    "voiceIndex": 34
  },
  "h19-4t:shinji_takahashi": {
    "sessionId": "h19-20071121-honkaigi",
    "voiceIndex": 43
  },
  "h19-4t:x-osawa-shinichi": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 4
  },
  "h19-4t:x-kikuchi-teiji": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 8
  },
  "h19-4t:x-abe-yumiko": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 21
  },
  "h19-4t:x-ichikawa-kazuko": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 31
  },
  "h19-4t:x-suto-yasumichi": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 40
  },
  "h19-4t:hiroki_wakabayashi": {
    "sessionId": "h19-20071122-honkaigi",
    "voiceIndex": 49
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
