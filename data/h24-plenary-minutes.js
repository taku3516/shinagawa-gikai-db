/* 平成24年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h24;
  if (!year) throw new Error("平成24年データの読み込み後に h24-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h24-20120222-honkaigi",
    "meetingId": "h24-1t",
    "dateIso": "2012-02-22",
    "date": "2012年2月22日",
    "dayLabel": "第1日目",
    "title": "2012年2月22日 平成24年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=318#one",
    "characters": 61088,
    "voices": 34,
    "hasFullText": true
  },
  {
    "id": "h24-20120223-honkaigi",
    "meetingId": "h24-1t",
    "dateIso": "2012-02-23",
    "date": "2012年2月23日",
    "dayLabel": "第2日目",
    "title": "2012年2月23日 平成24年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=320#one",
    "characters": 68309,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h24-20120224-honkaigi",
    "meetingId": "h24-1t",
    "dateIso": "2012-02-24",
    "date": "2012年2月24日",
    "dayLabel": "第3日目",
    "title": "2012年2月24日 平成24年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=322#one",
    "characters": 76946,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "h24-20120308-honkaigi",
    "meetingId": "h24-1t",
    "dateIso": "2012-03-08",
    "date": "2012年3月8日",
    "dayLabel": "第4日目",
    "title": "2012年3月8日 平成24年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=324#one",
    "characters": 2192,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "h24-20120323-honkaigi",
    "meetingId": "h24-1t",
    "dateIso": "2012-03-23",
    "date": "2012年3月23日",
    "dayLabel": "第5日目",
    "title": "2012年3月23日 平成24年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=326#one",
    "characters": 28477,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "h24-20120621-honkaigi",
    "meetingId": "h24-2t",
    "dateIso": "2012-06-21",
    "date": "2012年6月21日",
    "dayLabel": "第1日目",
    "title": "2012年6月21日 平成24年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=328#one",
    "characters": 59153,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h24-20120622-honkaigi",
    "meetingId": "h24-2t",
    "dateIso": "2012-06-22",
    "date": "2012年6月22日",
    "dayLabel": "第2日目",
    "title": "2012年6月22日 平成24年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=330#one",
    "characters": 48942,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "h24-20120705-honkaigi",
    "meetingId": "h24-2t",
    "dateIso": "2012-07-05",
    "date": "2012年7月5日",
    "dayLabel": "第3日目",
    "title": "2012年7月5日 平成24年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=332#one",
    "characters": 18764,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "h24-20120920-honkaigi",
    "meetingId": "h24-3t",
    "dateIso": "2012-09-20",
    "date": "2012年9月20日",
    "dayLabel": "第1日目",
    "title": "2012年9月20日 平成24年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=334#one",
    "characters": 46289,
    "voices": 45,
    "hasFullText": true
  },
  {
    "id": "h24-20120921-honkaigi",
    "meetingId": "h24-3t",
    "dateIso": "2012-09-21",
    "date": "2012年9月21日",
    "dayLabel": "第2日目",
    "title": "2012年9月21日 平成24年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=336#one",
    "characters": 72504,
    "voices": 85,
    "hasFullText": true
  },
  {
    "id": "h24-20121019-honkaigi",
    "meetingId": "h24-3t",
    "dateIso": "2012-10-19",
    "date": "2012年10月19日",
    "dayLabel": "第3日目",
    "title": "2012年10月19日 平成24年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=338#one",
    "characters": 24032,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "h24-20121121-honkaigi",
    "meetingId": "h24-4t",
    "dateIso": "2012-11-21",
    "date": "2012年11月21日",
    "dayLabel": "第1日目",
    "title": "2012年11月21日 平成24年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=340#one",
    "characters": 58630,
    "voices": 42,
    "hasFullText": true
  },
  {
    "id": "h24-20121122-honkaigi",
    "meetingId": "h24-4t",
    "dateIso": "2012-11-22",
    "date": "2012年11月22日",
    "dayLabel": "第2日目",
    "title": "2012年11月22日 平成24年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=342#one",
    "characters": 56493,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h24-20121127-honkaigi",
    "meetingId": "h24-4t",
    "dateIso": "2012-11-27",
    "date": "2012年11月27日",
    "dayLabel": "第3日目",
    "title": "2012年11月27日 平成24年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=344#one",
    "characters": 2228,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "h24-20121207-honkaigi",
    "meetingId": "h24-4t",
    "dateIso": "2012-12-07",
    "date": "2012年12月7日",
    "dayLabel": "第4日目",
    "title": "2012年12月7日 平成24年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=346#one",
    "characters": 16660,
    "voices": 57,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h24-1t:x-suto-yasumichi": {
    "sessionId": "h24-20120222-honkaigi",
    "voiceIndex": 8
  },
  "h24-1t:x-takeuchi-shinobu": {
    "sessionId": "h24-20120222-honkaigi",
    "voiceIndex": 16
  },
  "h24-1t:x-abe-yumiko": {
    "sessionId": "h24-20120222-honkaigi",
    "voiceIndex": 25
  },
  "h24-1t:yukihiro_sugai": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 4
  },
  "h24-1t:x-minami-keiko": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 15
  },
  "h24-1t:masanori_fujiwara": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 31
  },
  "h24-1t:x-hara-kozo": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 38
  },
  "h24-1t:hiroo_akutsu": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 44
  },
  "h24-1t:x-inagawa-takayuki": {
    "sessionId": "h24-20120223-honkaigi",
    "voiceIndex": 52
  },
  "h24-1t:x-iinuma-masako": {
    "sessionId": "h24-20120224-honkaigi",
    "voiceIndex": 4
  },
  "h24-1t:x-yoshida-atsumi": {
    "sessionId": "h24-20120224-honkaigi",
    "voiceIndex": 20
  },
  "h24-1t:hideo_ishida": {
    "sessionId": "h24-20120224-honkaigi",
    "voiceIndex": 30
  },
  "h24-1t:takako_konno": {
    "sessionId": "h24-20120224-honkaigi",
    "voiceIndex": 39
  },
  "h24-1t:x-ishida-shingo": {
    "sessionId": "h24-20120224-honkaigi",
    "voiceIndex": 49
  },
  "h24-2t:ryo_nakatsuka": {
    "sessionId": "h24-20120621-honkaigi",
    "voiceIndex": 6
  },
  "h24-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h24-20120621-honkaigi",
    "voiceIndex": 21
  },
  "h24-2t:shinichiro_tsuru": {
    "sessionId": "h24-20120621-honkaigi",
    "voiceIndex": 32
  },
  "h24-2t:takako_nishimoto": {
    "sessionId": "h24-20120621-honkaigi",
    "voiceIndex": 41
  },
  "h24-2t:x-sawada-hirokazu": {
    "sessionId": "h24-20120621-honkaigi",
    "voiceIndex": 49
  },
  "h24-2t:x-mukai-megumi": {
    "sessionId": "h24-20120622-honkaigi",
    "voiceIndex": 4
  },
  "h24-2t:x-watabe-shigeru": {
    "sessionId": "h24-20120622-honkaigi",
    "voiceIndex": 13
  },
  "h24-2t:x-asano-hiroyuki": {
    "sessionId": "h24-20120622-honkaigi",
    "voiceIndex": 21
  },
  "h24-2t:x-hara-kozo": {
    "sessionId": "h24-20120622-honkaigi",
    "voiceIndex": 28
  },
  "h24-3t:x-ito-masahiro": {
    "sessionId": "h24-20120920-honkaigi",
    "voiceIndex": 6
  },
  "h24-3t:yoshihiro_tsukamoto": {
    "sessionId": "h24-20120920-honkaigi",
    "voiceIndex": 13
  },
  "h24-3t:masanori_fujiwara": {
    "sessionId": "h24-20120920-honkaigi",
    "voiceIndex": 22
  },
  "h24-3t:x-honda-takenobu": {
    "sessionId": "h24-20120920-honkaigi",
    "voiceIndex": 31
  },
  "h24-3t:kengo_kimura": {
    "sessionId": "h24-20120920-honkaigi",
    "voiceIndex": 37
  },
  "h24-3t:hiroko_suzuki": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 4
  },
  "h24-3t:x-osawa-shinichi": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 19
  },
  "h24-3t:takako_konno": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 25
  },
  "h24-3t:yukihiro_sugai": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 33
  },
  "h24-3t:x-abe-yumiko": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 40
  },
  "h24-3t:x-iinuma-masako": {
    "sessionId": "h24-20120921-honkaigi",
    "voiceIndex": 52
  },
  "h24-4t:x-yamamoto-keiko": {
    "sessionId": "h24-20121121-honkaigi",
    "voiceIndex": 6
  },
  "h24-4t:shinji_takahashi": {
    "sessionId": "h24-20121121-honkaigi",
    "voiceIndex": 14
  },
  "h24-4t:yuichi_watanabe": {
    "sessionId": "h24-20121121-honkaigi",
    "voiceIndex": 21
  },
  "h24-4t:takahiro_okura": {
    "sessionId": "h24-20121121-honkaigi",
    "voiceIndex": 26
  },
  "h24-4t:x-minami-keiko": {
    "sessionId": "h24-20121121-honkaigi",
    "voiceIndex": 31
  },
  "h24-4t:shinichiro_tsuru": {
    "sessionId": "h24-20121122-honkaigi",
    "voiceIndex": 4
  },
  "h24-4t:x-yamauchi-akira": {
    "sessionId": "h24-20121122-honkaigi",
    "voiceIndex": 13
  },
  "h24-4t:x-suzuki-hiroshi": {
    "sessionId": "h24-20121122-honkaigi",
    "voiceIndex": 20
  },
  "h24-4t:x-inoue-yaeko": {
    "sessionId": "h24-20121122-honkaigi",
    "voiceIndex": 27
  },
  "h24-4t:x-suto-yasumichi": {
    "sessionId": "h24-20121122-honkaigi",
    "voiceIndex": 38
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
