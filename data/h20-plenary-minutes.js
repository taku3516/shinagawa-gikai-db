/* 平成20年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h20;
  if (!year) throw new Error("平成20年データの読み込み後に h20-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h20-20080220-honkaigi",
    "meetingId": "h20-1t",
    "meetingName": "平成20年第1回定例会",
    "dateIso": "2008-02-20",
    "date": "2008年2月20日",
    "dayLabel": "第1日目",
    "title": "2008年2月20日 平成20年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=202#one",
    "characters": 64673,
    "voices": 39,
    "hasFullText": true
  },
  {
    "id": "h20-20080221-honkaigi",
    "meetingId": "h20-1t",
    "meetingName": "平成20年第1回定例会",
    "dateIso": "2008-02-21",
    "date": "2008年2月21日",
    "dayLabel": "第2日目",
    "title": "2008年2月21日 平成20年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=204#one",
    "characters": 64035,
    "voices": 47,
    "hasFullText": true
  },
  {
    "id": "h20-20080222-honkaigi",
    "meetingId": "h20-1t",
    "meetingName": "平成20年第1回定例会",
    "dateIso": "2008-02-22",
    "date": "2008年2月22日",
    "dayLabel": "第3日目",
    "title": "2008年2月22日 平成20年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=206#one",
    "characters": 60242,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h20-20080306-honkaigi",
    "meetingId": "h20-1t",
    "meetingName": "平成20年第1回定例会",
    "dateIso": "2008-03-06",
    "date": "2008年3月6日",
    "dayLabel": "第4日目",
    "title": "2008年3月6日 平成20年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=208#one",
    "characters": 4028,
    "voices": 16,
    "hasFullText": true
  },
  {
    "id": "h20-20080327-honkaigi",
    "meetingId": "h20-1t",
    "meetingName": "平成20年第1回定例会",
    "dateIso": "2008-03-27",
    "date": "2008年3月27日",
    "dayLabel": "第5日目",
    "title": "2008年3月27日 平成20年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=210#one",
    "characters": 28689,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "h20-20080527-honkaigi",
    "meetingId": "h20-1r",
    "meetingName": "平成20年第1回臨時会",
    "dateIso": "2008-05-27",
    "date": "2008年5月27日",
    "dayLabel": "第1日目",
    "title": "2008年5月27日 平成20年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=722#one",
    "characters": 4238,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h20-20080528-honkaigi",
    "meetingId": "h20-1r",
    "meetingName": "平成20年第1回臨時会",
    "dateIso": "2008-05-28",
    "date": "2008年5月28日",
    "dayLabel": "第2日目",
    "title": "2008年5月28日 平成20年_第１回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=724#one",
    "characters": 8816,
    "voices": 36,
    "hasFullText": true
  },
  {
    "id": "h20-20080619-honkaigi",
    "meetingId": "h20-2t",
    "meetingName": "平成20年第2回定例会",
    "dateIso": "2008-06-19",
    "date": "2008年6月19日",
    "dayLabel": "第1日目",
    "title": "2008年6月19日 平成20年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=212#one",
    "characters": 68540,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h20-20080620-honkaigi",
    "meetingId": "h20-2t",
    "meetingName": "平成20年第2回定例会",
    "dateIso": "2008-06-20",
    "date": "2008年6月20日",
    "dayLabel": "第2日目",
    "title": "2008年6月20日 平成20年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=214#one",
    "characters": 66408,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "h20-20080703-honkaigi",
    "meetingId": "h20-2t",
    "meetingName": "平成20年第2回定例会",
    "dateIso": "2008-07-03",
    "date": "2008年7月3日",
    "dayLabel": "第3日目",
    "title": "2008年7月3日 平成20年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=216#one",
    "characters": 28021,
    "voices": 90,
    "hasFullText": true
  },
  {
    "id": "h20-20080925-honkaigi",
    "meetingId": "h20-3t",
    "meetingName": "平成20年第3回定例会",
    "dateIso": "2008-09-25",
    "date": "2008年9月25日",
    "dayLabel": "第1日目",
    "title": "2008年9月25日 平成20年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=218#one",
    "characters": 54024,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h20-20080926-honkaigi",
    "meetingId": "h20-3t",
    "meetingName": "平成20年第3回定例会",
    "dateIso": "2008-09-26",
    "date": "2008年9月26日",
    "dayLabel": "第2日目",
    "title": "2008年9月26日 平成20年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=220#one",
    "characters": 95695,
    "voices": 94,
    "hasFullText": true
  },
  {
    "id": "h20-20081022-honkaigi",
    "meetingId": "h20-3t",
    "meetingName": "平成20年第3回定例会",
    "dateIso": "2008-10-22",
    "date": "2008年10月22日",
    "dayLabel": "第3日目",
    "title": "2008年10月22日 平成20年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=222#one",
    "characters": 28455,
    "voices": 96,
    "hasFullText": true
  },
  {
    "id": "h20-20081120-honkaigi",
    "meetingId": "h20-4t",
    "meetingName": "平成20年第4回定例会",
    "dateIso": "2008-11-20",
    "date": "2008年11月20日",
    "dayLabel": "第1日目",
    "title": "2008年11月20日 平成20年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=224#one",
    "characters": 48884,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h20-20081121-honkaigi",
    "meetingId": "h20-4t",
    "meetingName": "平成20年第4回定例会",
    "dateIso": "2008-11-21",
    "date": "2008年11月21日",
    "dayLabel": "第2日目",
    "title": "2008年11月21日 平成20年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=226#one",
    "characters": 57930,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h20-20081205-honkaigi",
    "meetingId": "h20-4t",
    "meetingName": "平成20年第4回定例会",
    "dateIso": "2008-12-05",
    "date": "2008年12月5日",
    "dayLabel": "第3日目",
    "title": "2008年12月5日 平成20年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=228#one",
    "characters": 19972,
    "voices": 48,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h20-1t:hideo_ishida": {
    "sessionId": "h20-20080220-honkaigi",
    "voiceIndex": 8
  },
  "h20-1t:x-sakai-naotaka": {
    "sessionId": "h20-20080220-honkaigi",
    "voiceIndex": 17
  },
  "h20-1t:x-minami-keiko": {
    "sessionId": "h20-20080220-honkaigi",
    "voiceIndex": 25
  },
  "h20-1t:x-doi-yoichi": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 4
  },
  "h20-1t:yukihiro_sugai": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 11
  },
  "h20-1t:x-kawanishi-kinuko": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 19
  },
  "h20-1t:x-hayashi-hiroshi": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 27
  },
  "h20-1t:takako_konno": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 36
  },
  "h20-1t:x-igeta-atsuko": {
    "sessionId": "h20-20080221-honkaigi",
    "voiceIndex": 43
  },
  "h20-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h20-20080222-honkaigi",
    "voiceIndex": 4
  },
  "h20-1t:x-iinuma-masako": {
    "sessionId": "h20-20080222-honkaigi",
    "voiceIndex": 11
  },
  "h20-1t:masanori_fujiwara": {
    "sessionId": "h20-20080222-honkaigi",
    "voiceIndex": 25
  },
  "h20-1t:x-takeuchi-shinobu": {
    "sessionId": "h20-20080222-honkaigi",
    "voiceIndex": 31
  },
  "h20-2t:yukihiro_sugai": {
    "sessionId": "h20-20080619-honkaigi",
    "voiceIndex": 6
  },
  "h20-2t:x-yamauchi-akira": {
    "sessionId": "h20-20080619-honkaigi",
    "voiceIndex": 15
  },
  "h20-2t:x-asano-hiroyuki": {
    "sessionId": "h20-20080619-honkaigi",
    "voiceIndex": 24
  },
  "h20-2t:ryo_nakatsuka": {
    "sessionId": "h20-20080619-honkaigi",
    "voiceIndex": 35
  },
  "h20-2t:x-suzuki-masumi": {
    "sessionId": "h20-20080619-honkaigi",
    "voiceIndex": 48
  },
  "h20-2t:x-abe-yumiko": {
    "sessionId": "h20-20080620-honkaigi",
    "voiceIndex": 4
  },
  "h20-2t:x-inoue-yaeko": {
    "sessionId": "h20-20080620-honkaigi",
    "voiceIndex": 14
  },
  "h20-2t:x-honda-takenobu": {
    "sessionId": "h20-20080620-honkaigi",
    "voiceIndex": 27
  },
  "h20-2t:x-yamaji-yoshinari": {
    "sessionId": "h20-20080620-honkaigi",
    "voiceIndex": 32
  },
  "h20-2t:x-kikuchi-teiji": {
    "sessionId": "h20-20080620-honkaigi",
    "voiceIndex": 38
  },
  "h20-3t:yuichi_watanabe": {
    "sessionId": "h20-20080925-honkaigi",
    "voiceIndex": 6
  },
  "h20-3t:takako_konno": {
    "sessionId": "h20-20080925-honkaigi",
    "voiceIndex": 13
  },
  "h20-3t:x-miyazaki-katsutoshi": {
    "sessionId": "h20-20080925-honkaigi",
    "voiceIndex": 18
  },
  "h20-3t:x-inagawa-takayuki": {
    "sessionId": "h20-20080925-honkaigi",
    "voiceIndex": 32
  },
  "h20-3t:x-hara-kozo": {
    "sessionId": "h20-20080925-honkaigi",
    "voiceIndex": 36
  },
  "h20-3t:hiroki_wakabayashi": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 4
  },
  "h20-3t:hideo_ishida": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 12
  },
  "h20-3t:hiroko_suzuki": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 21
  },
  "h20-3t:x-watabe-shigeru": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 38
  },
  "h20-3t:x-ishida-shingo": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 44
  },
  "h20-3t:takako_nishimoto": {
    "sessionId": "h20-20080926-honkaigi",
    "voiceIndex": 55
  },
  "h20-4t:x-yamamoto-keiko": {
    "sessionId": "h20-20081120-honkaigi",
    "voiceIndex": 6
  },
  "h20-4t:x-iinuma-masako": {
    "sessionId": "h20-20081120-honkaigi",
    "voiceIndex": 13
  },
  "h20-4t:x-kawanishi-kinuko": {
    "sessionId": "h20-20081120-honkaigi",
    "voiceIndex": 26
  },
  "h20-4t:x-osawa-shinichi": {
    "sessionId": "h20-20081120-honkaigi",
    "voiceIndex": 33
  },
  "h20-4t:shinji_takahashi": {
    "sessionId": "h20-20081120-honkaigi",
    "voiceIndex": 38
  },
  "h20-4t:x-honma-takashi": {
    "sessionId": "h20-20081121-honkaigi",
    "voiceIndex": 4
  },
  "h20-4t:x-suto-yasumichi": {
    "sessionId": "h20-20081121-honkaigi",
    "voiceIndex": 9
  },
  "h20-4t:x-yamaji-yoshinari": {
    "sessionId": "h20-20081121-honkaigi",
    "voiceIndex": 16
  },
  "h20-4t:x-ichikawa-kazuko": {
    "sessionId": "h20-20081121-honkaigi",
    "voiceIndex": 22
  },
  "h20-4t:x-hayashi-hiroshi": {
    "sessionId": "h20-20081121-honkaigi",
    "voiceIndex": 30
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
