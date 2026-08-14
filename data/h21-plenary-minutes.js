/* 平成21年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h21;
  if (!year) throw new Error("平成21年データの読み込み後に h21-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h21-20090119-honkaigi",
    "meetingId": "h21-1r",
    "meetingName": "平成21年第1回臨時会",
    "dateIso": "2009-01-19",
    "date": "2009年1月19日",
    "dayLabel": "第1日目",
    "title": "2009年1月19日 平成21年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=726#one",
    "characters": 9453,
    "voices": 32,
    "hasFullText": true
  },
  {
    "id": "h21-20090225-honkaigi",
    "meetingId": "h21-1t",
    "meetingName": "平成21年第1回定例会",
    "dateIso": "2009-02-25",
    "date": "2009年2月25日",
    "dayLabel": "第1日目",
    "title": "2009年2月25日 平成21年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=230#one",
    "characters": 65958,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h21-20090226-honkaigi",
    "meetingId": "h21-1t",
    "meetingName": "平成21年第1回定例会",
    "dateIso": "2009-02-26",
    "date": "2009年2月26日",
    "dayLabel": "第2日目",
    "title": "2009年2月26日 平成21年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=232#one",
    "characters": 72945,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h21-20090227-honkaigi",
    "meetingId": "h21-1t",
    "meetingName": "平成21年第1回定例会",
    "dateIso": "2009-02-27",
    "date": "2009年2月27日",
    "dayLabel": "第3日目",
    "title": "2009年2月27日 平成21年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=234#one",
    "characters": 78746,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "h21-20090310-honkaigi",
    "meetingId": "h21-1t",
    "meetingName": "平成21年第1回定例会",
    "dateIso": "2009-03-10",
    "date": "2009年3月10日",
    "dayLabel": "第4日目",
    "title": "2009年3月10日 平成21年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=236#one",
    "characters": 4629,
    "voices": 17,
    "hasFullText": true
  },
  {
    "id": "h21-20090330-honkaigi",
    "meetingId": "h21-1t",
    "meetingName": "平成21年第1回定例会",
    "dateIso": "2009-03-30",
    "date": "2009年3月30日",
    "dayLabel": "第5日目",
    "title": "2009年3月30日 平成21年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=238#one",
    "characters": 30268,
    "voices": 71,
    "hasFullText": true
  },
  {
    "id": "h21-20090528-honkaigi",
    "meetingId": "h21-2r",
    "meetingName": "平成21年第2回臨時会",
    "dateIso": "2009-05-28",
    "date": "2009年5月28日",
    "dayLabel": "第1日目",
    "title": "2009年5月28日 平成21年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=728#one",
    "characters": 11971,
    "voices": 84,
    "hasFullText": true
  },
  {
    "id": "h21-20090618-honkaigi",
    "meetingId": "h21-2t",
    "meetingName": "平成21年第2回定例会",
    "dateIso": "2009-06-18",
    "date": "2009年6月18日",
    "dayLabel": "第1日目",
    "title": "2009年6月18日 平成21年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=240#one",
    "characters": 61915,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h21-20090619-honkaigi",
    "meetingId": "h21-2t",
    "meetingName": "平成21年第2回定例会",
    "dateIso": "2009-06-19",
    "date": "2009年6月19日",
    "dayLabel": "第2日目",
    "title": "2009年6月19日 平成21年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=242#one",
    "characters": 62076,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h21-20090701-honkaigi",
    "meetingId": "h21-2t",
    "meetingName": "平成21年第2回定例会",
    "dateIso": "2009-07-01",
    "date": "2009年7月1日",
    "dayLabel": "第3日目",
    "title": "2009年7月1日 平成21年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=244#one",
    "characters": 21634,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "h21-20090917-honkaigi",
    "meetingId": "h21-3t",
    "meetingName": "平成21年第3回定例会",
    "dateIso": "2009-09-17",
    "date": "2009年9月17日",
    "dayLabel": "第1日目",
    "title": "2009年9月17日 平成21年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=246#one",
    "characters": 48267,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h21-20090918-honkaigi",
    "meetingId": "h21-3t",
    "meetingName": "平成21年第3回定例会",
    "dateIso": "2009-09-18",
    "date": "2009年9月18日",
    "dayLabel": "第2日目",
    "title": "2009年9月18日 平成21年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=248#one",
    "characters": 58490,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "h21-20090930-honkaigi",
    "meetingId": "h21-3t",
    "meetingName": "平成21年第3回定例会",
    "dateIso": "2009-09-30",
    "date": "2009年9月30日",
    "dayLabel": "第3日目",
    "title": "2009年9月30日 平成21年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=250#one",
    "characters": 8546,
    "voices": 18,
    "hasFullText": true
  },
  {
    "id": "h21-20091021-honkaigi",
    "meetingId": "h21-3t",
    "meetingName": "平成21年第3回定例会",
    "dateIso": "2009-10-21",
    "date": "2009年10月21日",
    "dayLabel": "第4日目",
    "title": "2009年10月21日 平成21年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=252#one",
    "characters": 11952,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "h21-20091126-honkaigi",
    "meetingId": "h21-4t",
    "meetingName": "平成21年第4回定例会",
    "dateIso": "2009-11-26",
    "date": "2009年11月26日",
    "dayLabel": "第1日目",
    "title": "2009年11月26日 平成21年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=254#one",
    "characters": 57938,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h21-20091127-honkaigi",
    "meetingId": "h21-4t",
    "meetingName": "平成21年第4回定例会",
    "dateIso": "2009-11-27",
    "date": "2009年11月27日",
    "dayLabel": "第2日目",
    "title": "2009年11月27日 平成21年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=256#one",
    "characters": 60582,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h21-20091130-honkaigi",
    "meetingId": "h21-4t",
    "meetingName": "平成21年第4回定例会",
    "dateIso": "2009-11-30",
    "date": "2009年11月30日",
    "dayLabel": "第3日目",
    "title": "2009年11月30日 平成21年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=258#one",
    "characters": 3482,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "h21-20091208-honkaigi",
    "meetingId": "h21-4t",
    "meetingName": "平成21年第4回定例会",
    "dateIso": "2009-12-08",
    "date": "2009年12月8日",
    "dayLabel": "第4日目",
    "title": "2009年12月8日 平成21年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=260#one",
    "characters": 17901,
    "voices": 68,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h21-1t:x-suzuki-masumi": {
    "sessionId": "h21-20090225-honkaigi",
    "voiceIndex": 8
  },
  "h21-1t:x-sakai-naotaka": {
    "sessionId": "h21-20090225-honkaigi",
    "voiceIndex": 19
  },
  "h21-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h21-20090225-honkaigi",
    "voiceIndex": 36
  },
  "h21-1t:x-doi-yoichi": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 4
  },
  "h21-1t:yukihiro_sugai": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 10
  },
  "h21-1t:x-kikuchi-teiji": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 21
  },
  "h21-1t:x-igeta-atsuko": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 32
  },
  "h21-1t:x-takeuchi-shinobu": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 39
  },
  "h21-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h21-20090226-honkaigi",
    "voiceIndex": 44
  },
  "h21-1t:x-ishida-shingo": {
    "sessionId": "h21-20090227-honkaigi",
    "voiceIndex": 4
  },
  "h21-1t:taisaku_ando": {
    "sessionId": "h21-20090227-honkaigi",
    "voiceIndex": 9
  },
  "h21-1t:masanori_fujiwara": {
    "sessionId": "h21-20090227-honkaigi",
    "voiceIndex": 28
  },
  "h21-1t:x-yamauchi-akira": {
    "sessionId": "h21-20090227-honkaigi",
    "voiceIndex": 36
  },
  "h21-1t:x-asano-hiroyuki": {
    "sessionId": "h21-20090227-honkaigi",
    "voiceIndex": 43
  },
  "h21-2t:x-abe-yumiko": {
    "sessionId": "h21-20090618-honkaigi",
    "voiceIndex": 6
  },
  "h21-2t:yukihiro_sugai": {
    "sessionId": "h21-20090618-honkaigi",
    "voiceIndex": 17
  },
  "h21-2t:x-suzuki-masumi": {
    "sessionId": "h21-20090618-honkaigi",
    "voiceIndex": 25
  },
  "h21-2t:x-yamamoto-keiko": {
    "sessionId": "h21-20090618-honkaigi",
    "voiceIndex": 32
  },
  "h21-2t:x-miyazaki-katsutoshi": {
    "sessionId": "h21-20090618-honkaigi",
    "voiceIndex": 39
  },
  "h21-2t:yuichi_watanabe": {
    "sessionId": "h21-20090619-honkaigi",
    "voiceIndex": 4
  },
  "h21-2t:x-inoue-yaeko": {
    "sessionId": "h21-20090619-honkaigi",
    "voiceIndex": 9
  },
  "h21-2t:x-yamaji-yoshinari": {
    "sessionId": "h21-20090619-honkaigi",
    "voiceIndex": 18
  },
  "h21-2t:ryo_nakatsuka": {
    "sessionId": "h21-20090619-honkaigi",
    "voiceIndex": 24
  },
  "h21-2t:x-hara-kozo": {
    "sessionId": "h21-20090619-honkaigi",
    "voiceIndex": 36
  },
  "h21-3t:x-watabe-shigeru": {
    "sessionId": "h21-20090917-honkaigi",
    "voiceIndex": 7
  },
  "h21-3t:x-ito-masahiro": {
    "sessionId": "h21-20090917-honkaigi",
    "voiceIndex": 12
  },
  "h21-3t:takako_konno": {
    "sessionId": "h21-20090917-honkaigi",
    "voiceIndex": 19
  },
  "h21-3t:x-minami-keiko": {
    "sessionId": "h21-20090917-honkaigi",
    "voiceIndex": 24
  },
  "h21-3t:x-inagawa-takayuki": {
    "sessionId": "h21-20090917-honkaigi",
    "voiceIndex": 37
  },
  "h21-3t:x-osawa-shinichi": {
    "sessionId": "h21-20090918-honkaigi",
    "voiceIndex": 4
  },
  "h21-3t:takako_nishimoto": {
    "sessionId": "h21-20090918-honkaigi",
    "voiceIndex": 9
  },
  "h21-3t:x-sakai-naotaka": {
    "sessionId": "h21-20090918-honkaigi",
    "voiceIndex": 20
  },
  "h21-3t:x-suto-yasumichi": {
    "sessionId": "h21-20090918-honkaigi",
    "voiceIndex": 26
  },
  "h21-3t:x-kawanishi-kinuko": {
    "sessionId": "h21-20090918-honkaigi",
    "voiceIndex": 34
  },
  "h21-4t:x-hayashi-hiroshi": {
    "sessionId": "h21-20091126-honkaigi",
    "voiceIndex": 6
  },
  "h21-4t:hiroki_wakabayashi": {
    "sessionId": "h21-20091126-honkaigi",
    "voiceIndex": 13
  },
  "h21-4t:x-honma-takashi": {
    "sessionId": "h21-20091126-honkaigi",
    "voiceIndex": 23
  },
  "h21-4t:taisaku_ando": {
    "sessionId": "h21-20091126-honkaigi",
    "voiceIndex": 28
  },
  "h21-4t:x-ichikawa-kazuko": {
    "sessionId": "h21-20091126-honkaigi",
    "voiceIndex": 44
  },
  "h21-4t:x-igeta-atsuko": {
    "sessionId": "h21-20091127-honkaigi",
    "voiceIndex": 4
  },
  "h21-4t:x-abe-yumiko": {
    "sessionId": "h21-20091127-honkaigi",
    "voiceIndex": 9
  },
  "h21-4t:x-yamaji-yoshinari": {
    "sessionId": "h21-20091127-honkaigi",
    "voiceIndex": 19
  },
  "h21-4t:x-matsuzawa-toshiyuki": {
    "sessionId": "h21-20091127-honkaigi",
    "voiceIndex": 24
  },
  "h21-4t:shinji_takahashi": {
    "sessionId": "h21-20091127-honkaigi",
    "voiceIndex": 32
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
