/* 平成22年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h22;
  if (!year) throw new Error("平成22年データの読み込み後に h22-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h22-20100224-honkaigi",
    "meetingId": "h22-1t",
    "meetingName": "平成22年第1回定例会",
    "dateIso": "2010-02-24",
    "date": "2010年2月24日",
    "dayLabel": "第1日目",
    "title": "2010年2月24日 平成22年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=262#one",
    "characters": 70446,
    "voices": 40,
    "hasFullText": true
  },
  {
    "id": "h22-20100225-honkaigi",
    "meetingId": "h22-1t",
    "meetingName": "平成22年第1回定例会",
    "dateIso": "2010-02-25",
    "date": "2010年2月25日",
    "dayLabel": "第2日目",
    "title": "2010年2月25日 平成22年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=264#one",
    "characters": 71132,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h22-20100226-honkaigi",
    "meetingId": "h22-1t",
    "meetingName": "平成22年第1回定例会",
    "dateIso": "2010-02-26",
    "date": "2010年2月26日",
    "dayLabel": "第3日目",
    "title": "2010年2月26日 平成22年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=266#one",
    "characters": 70759,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "h22-20100309-honkaigi",
    "meetingId": "h22-1t",
    "meetingName": "平成22年第1回定例会",
    "dateIso": "2010-03-09",
    "date": "2010年3月9日",
    "dayLabel": "第4日目",
    "title": "2010年3月9日 平成22年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=268#one",
    "characters": 2406,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "h22-20100326-honkaigi",
    "meetingId": "h22-1t",
    "meetingName": "平成22年第1回定例会",
    "dateIso": "2010-03-26",
    "date": "2010年3月26日",
    "dayLabel": "第5日目",
    "title": "2010年3月26日 平成22年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=270#one",
    "characters": 27355,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "h22-20100331-honkaigi",
    "meetingId": "h22-1r",
    "meetingName": "平成22年第1回臨時会",
    "dateIso": "2010-03-31",
    "date": "2010年3月31日",
    "dayLabel": "第1日目",
    "title": "2010年3月31日 平成22年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=730#one",
    "characters": 2957,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "h22-20100528-honkaigi",
    "meetingId": "h22-2r",
    "meetingName": "平成22年第2回臨時会",
    "dateIso": "2010-05-28",
    "date": "2010年5月28日",
    "dayLabel": "第1日目",
    "title": "2010年5月28日 平成22年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=732#one",
    "characters": 3381,
    "voices": 29,
    "hasFullText": true
  },
  {
    "id": "h22-20100624-honkaigi",
    "meetingId": "h22-2t",
    "meetingName": "平成22年第2回定例会",
    "dateIso": "2010-06-24",
    "date": "2010年6月24日",
    "dayLabel": "第1日目",
    "title": "2010年6月24日 平成22年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=272#one",
    "characters": 64795,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h22-20100625-honkaigi",
    "meetingId": "h22-2t",
    "meetingName": "平成22年第2回定例会",
    "dateIso": "2010-06-25",
    "date": "2010年6月25日",
    "dayLabel": "第2日目",
    "title": "2010年6月25日 平成22年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=274#one",
    "characters": 61211,
    "voices": 63,
    "hasFullText": true
  },
  {
    "id": "h22-20100707-honkaigi",
    "meetingId": "h22-2t",
    "meetingName": "平成22年第2回定例会",
    "dateIso": "2010-07-07",
    "date": "2010年7月7日",
    "dayLabel": "第3日目",
    "title": "2010年7月7日 平成22年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=276#one",
    "characters": 21046,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h22-20101021-honkaigi",
    "meetingId": "h22-3t",
    "meetingName": "平成22年第3回定例会",
    "dateIso": "2010-10-21",
    "date": "2010年10月21日",
    "dayLabel": "第1日目",
    "title": "2010年10月21日 平成22年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=278#one",
    "characters": 62313,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h22-20101022-honkaigi",
    "meetingId": "h22-3t",
    "meetingName": "平成22年第3回定例会",
    "dateIso": "2010-10-22",
    "date": "2010年10月22日",
    "dayLabel": "第2日目",
    "title": "2010年10月22日 平成22年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=280#one",
    "characters": 69560,
    "voices": 93,
    "hasFullText": true
  },
  {
    "id": "h22-20101116-honkaigi",
    "meetingId": "h22-3t",
    "meetingName": "平成22年第3回定例会",
    "dateIso": "2010-11-16",
    "date": "2010年11月16日",
    "dayLabel": "第3日目",
    "title": "2010年11月16日 平成22年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=282#one",
    "characters": 26274,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "h22-20101130-honkaigi",
    "meetingId": "h22-3r",
    "meetingName": "平成22年第3回臨時会",
    "dateIso": "2010-11-30",
    "date": "2010年11月30日",
    "dayLabel": "第1日目",
    "title": "2010年11月30日 平成22年_第３回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=734#one",
    "characters": 3810,
    "voices": 18,
    "hasFullText": true
  },
  {
    "id": "h22-20101209-honkaigi",
    "meetingId": "h22-4t",
    "meetingName": "平成22年第4回定例会",
    "dateIso": "2010-12-09",
    "date": "2010年12月9日",
    "dayLabel": "第1日目",
    "title": "2010年12月9日 平成22年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=284#one",
    "characters": 59459,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "h22-20101210-honkaigi",
    "meetingId": "h22-4t",
    "meetingName": "平成22年第4回定例会",
    "dateIso": "2010-12-10",
    "date": "2010年12月10日",
    "dayLabel": "第2日目",
    "title": "2010年12月10日 平成22年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=286#one",
    "characters": 46954,
    "voices": 40,
    "hasFullText": true
  },
  {
    "id": "h22-20101222-honkaigi",
    "meetingId": "h22-4t",
    "meetingName": "平成22年第4回定例会",
    "dateIso": "2010-12-22",
    "date": "2010年12月22日",
    "dayLabel": "第3日目",
    "title": "2010年12月22日 平成22年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=288#one",
    "characters": 13649,
    "voices": 46,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h22-1t:x-suzuki-masumi": {
    "sessionId": "h22-20100224-honkaigi",
    "voiceIndex": 8
  },
  "h22-1t:x-takeuchi-shinobu": {
    "sessionId": "h22-20100224-honkaigi",
    "voiceIndex": 20
  },
  "h22-1t:x-minami-keiko": {
    "sessionId": "h22-20100224-honkaigi",
    "voiceIndex": 30
  },
  "h22-1t:x-doi-yoichi": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 4
  },
  "h22-1t:yukihiro_sugai": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 10
  },
  "h22-1t:takako_konno": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 18
  },
  "h22-1t:x-yamauchi-akira": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 29
  },
  "h22-1t:x-iinuma-masako": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 39
  },
  "h22-1t:x-ishida-shingo": {
    "sessionId": "h22-20100225-honkaigi",
    "voiceIndex": 52
  },
  "h22-1t:masanori_fujiwara": {
    "sessionId": "h22-20100226-honkaigi",
    "voiceIndex": 4
  },
  "h22-1t:x-hara-kozo": {
    "sessionId": "h22-20100226-honkaigi",
    "voiceIndex": 12
  },
  "h22-1t:x-asano-hiroyuki": {
    "sessionId": "h22-20100226-honkaigi",
    "voiceIndex": 19
  },
  "h22-1t:ryo_nakatsuka": {
    "sessionId": "h22-20100226-honkaigi",
    "voiceIndex": 29
  },
  "h22-2t:x-miyazaki-katsutoshi": {
    "sessionId": "h22-20100624-honkaigi",
    "voiceIndex": 6
  },
  "h22-2t:x-suzuki-masumi": {
    "sessionId": "h22-20100624-honkaigi",
    "voiceIndex": 26
  },
  "h22-2t:x-yamaji-yoshinari": {
    "sessionId": "h22-20100624-honkaigi",
    "voiceIndex": 35
  },
  "h22-2t:x-inoue-yaeko": {
    "sessionId": "h22-20100624-honkaigi",
    "voiceIndex": 47
  },
  "h22-2t:yuichi_watanabe": {
    "sessionId": "h22-20100625-honkaigi",
    "voiceIndex": 4
  },
  "h22-2t:x-kikuchi-teiji": {
    "sessionId": "h22-20100625-honkaigi",
    "voiceIndex": 10
  },
  "h22-2t:hiroki_wakabayashi": {
    "sessionId": "h22-20100625-honkaigi",
    "voiceIndex": 23
  },
  "h22-2t:x-ito-masahiro": {
    "sessionId": "h22-20100625-honkaigi",
    "voiceIndex": 39
  },
  "h22-3t:x-ishida-shingo": {
    "sessionId": "h22-20101021-honkaigi",
    "voiceIndex": 9
  },
  "h22-3t:x-hayashi-hiroshi": {
    "sessionId": "h22-20101021-honkaigi",
    "voiceIndex": 14
  },
  "h22-3t:x-takeuchi-shinobu": {
    "sessionId": "h22-20101021-honkaigi",
    "voiceIndex": 23
  },
  "h22-3t:yukihiro_sugai": {
    "sessionId": "h22-20101021-honkaigi",
    "voiceIndex": 31
  },
  "h22-3t:taisaku_ando": {
    "sessionId": "h22-20101021-honkaigi",
    "voiceIndex": 40
  },
  "h22-3t:x-osawa-shinichi": {
    "sessionId": "h22-20101022-honkaigi",
    "voiceIndex": 4
  },
  "h22-3t:x-inagawa-takayuki": {
    "sessionId": "h22-20101022-honkaigi",
    "voiceIndex": 10
  },
  "h22-3t:x-sakai-naotaka": {
    "sessionId": "h22-20101022-honkaigi",
    "voiceIndex": 15
  },
  "h22-3t:takako_nishimoto": {
    "sessionId": "h22-20101022-honkaigi",
    "voiceIndex": 23
  },
  "h22-3t:x-suto-yasumichi": {
    "sessionId": "h22-20101022-honkaigi",
    "voiceIndex": 34
  },
  "h22-4t:shinji_takahashi": {
    "sessionId": "h22-20101209-honkaigi",
    "voiceIndex": 6
  },
  "h22-4t:x-igeta-atsuko": {
    "sessionId": "h22-20101209-honkaigi",
    "voiceIndex": 15
  },
  "h22-4t:x-yamamoto-keiko": {
    "sessionId": "h22-20101209-honkaigi",
    "voiceIndex": 21
  },
  "h22-4t:x-honma-takashi": {
    "sessionId": "h22-20101209-honkaigi",
    "voiceIndex": 29
  },
  "h22-4t:ryo_nakatsuka": {
    "sessionId": "h22-20101209-honkaigi",
    "voiceIndex": 34
  },
  "h22-4t:x-hara-kozo": {
    "sessionId": "h22-20101210-honkaigi",
    "voiceIndex": 4
  },
  "h22-4t:x-kawanishi-kinuko": {
    "sessionId": "h22-20101210-honkaigi",
    "voiceIndex": 10
  },
  "h22-4t:x-asano-hiroyuki": {
    "sessionId": "h22-20101210-honkaigi",
    "voiceIndex": 16
  },
  "h22-4t:x-yamauchi-akira": {
    "sessionId": "h22-20101210-honkaigi",
    "voiceIndex": 24
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
