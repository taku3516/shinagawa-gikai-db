/* 平成13年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h13;
  if (!year) throw new Error("平成13年データの読み込み後に h13-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h13-20010525-honkaigi",
    "meetingId": "h13-1r",
    "meetingName": "平成13年第1回臨時会",
    "dateIso": "2001-05-25",
    "date": "2001年5月25日",
    "dayLabel": "第1日目",
    "title": "2001年5月25日 平成13年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=696#one",
    "characters": 9098,
    "voices": 76,
    "hasFullText": true
  },
  {
    "id": "h13-20010628-honkaigi",
    "meetingId": "h13-2t",
    "meetingName": "平成13年第2回定例会",
    "dateIso": "2001-06-28",
    "date": "2001年6月28日",
    "dayLabel": "第1日目",
    "title": "2001年6月28日 平成13年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=2#one",
    "characters": 51869,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h13-20010629-honkaigi",
    "meetingId": "h13-2t",
    "meetingName": "平成13年第2回定例会",
    "dateIso": "2001-06-29",
    "date": "2001年6月29日",
    "dayLabel": "第2日目",
    "title": "2001年6月29日 平成13年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=4#one",
    "characters": 71275,
    "voices": 67,
    "hasFullText": true
  },
  {
    "id": "h13-20010713-honkaigi",
    "meetingId": "h13-2t",
    "meetingName": "平成13年第2回定例会",
    "dateIso": "2001-07-13",
    "date": "2001年7月13日",
    "dayLabel": "第3日目",
    "title": "2001年7月13日 平成13年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6#one",
    "characters": 11579,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h13-20010920-honkaigi",
    "meetingId": "h13-3t",
    "meetingName": "平成13年第3回定例会",
    "dateIso": "2001-09-20",
    "date": "2001年9月20日",
    "dayLabel": "第1日目",
    "title": "2001年9月20日 平成13年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=8#one",
    "characters": 67227,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h13-20010921-honkaigi",
    "meetingId": "h13-3t",
    "meetingName": "平成13年第3回定例会",
    "dateIso": "2001-09-21",
    "date": "2001年9月21日",
    "dayLabel": "第2日目",
    "title": "2001年9月21日 平成13年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=10#one",
    "characters": 74929,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "h13-20011019-honkaigi",
    "meetingId": "h13-3t",
    "meetingName": "平成13年第3回定例会",
    "dateIso": "2001-10-19",
    "date": "2001年10月19日",
    "dayLabel": "第3日目",
    "title": "2001年10月19日 平成13年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=12#one",
    "characters": 19855,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "h13-20011121-honkaigi",
    "meetingId": "h13-4t",
    "meetingName": "平成13年第4回定例会",
    "dateIso": "2001-11-21",
    "date": "2001年11月21日",
    "dayLabel": "第1日目",
    "title": "2001年11月21日 平成13年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=14#one",
    "characters": 55146,
    "voices": 42,
    "hasFullText": true
  },
  {
    "id": "h13-20011122-honkaigi",
    "meetingId": "h13-4t",
    "meetingName": "平成13年第4回定例会",
    "dateIso": "2001-11-22",
    "date": "2001年11月22日",
    "dayLabel": "第2日目",
    "title": "2001年11月22日 平成13年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=16#one",
    "characters": 63644,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "h13-20011207-honkaigi",
    "meetingId": "h13-4t",
    "meetingName": "平成13年第4回定例会",
    "dateIso": "2001-12-07",
    "date": "2001年12月7日",
    "dayLabel": "第3日目",
    "title": "2001年12月7日 平成13年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=18#one",
    "characters": 6939,
    "voices": 43,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h13-2t:x-shima-kuniko": {
    "sessionId": "h13-20010628-honkaigi",
    "voiceIndex": 6
  },
  "h13-2t:hiroko_suzuki": {
    "sessionId": "h13-20010628-honkaigi",
    "voiceIndex": 12
  },
  "h13-2t:x-honda-takenobu": {
    "sessionId": "h13-20010628-honkaigi",
    "voiceIndex": 26
  },
  "h13-2t:x-honda-giichi": {
    "sessionId": "h13-20010628-honkaigi",
    "voiceIndex": 33
  },
  "h13-2t:x-takahoshi-masatoshi": {
    "sessionId": "h13-20010629-honkaigi",
    "voiceIndex": 5
  },
  "h13-2t:x-suzuki-masumi": {
    "sessionId": "h13-20010629-honkaigi",
    "voiceIndex": 15
  },
  "h13-2t:x-fujita-jiro": {
    "sessionId": "h13-20010629-honkaigi",
    "voiceIndex": 26
  },
  "h13-2t:x-miyazaki-katsutoshi": {
    "sessionId": "h13-20010629-honkaigi",
    "voiceIndex": 36
  },
  "h13-2t:x-tsukidate-takeo": {
    "sessionId": "h13-20010629-honkaigi",
    "voiceIndex": 48
  },
  "h13-3t:x-minami-keiko": {
    "sessionId": "h13-20010920-honkaigi",
    "voiceIndex": 6
  },
  "h13-3t:x-suto-yasumichi": {
    "sessionId": "h13-20010920-honkaigi",
    "voiceIndex": 16
  },
  "h13-3t:x-kitano-tomie": {
    "sessionId": "h13-20010920-honkaigi",
    "voiceIndex": 26
  },
  "h13-3t:x-takagi-akira": {
    "sessionId": "h13-20010920-honkaigi",
    "voiceIndex": 37
  },
  "h13-3t:x-nakajima-mie": {
    "sessionId": "h13-20010920-honkaigi",
    "voiceIndex": 43
  },
  "h13-3t:x-tsukamoto-toshimitsu": {
    "sessionId": "h13-20010921-honkaigi",
    "voiceIndex": 5
  },
  "h13-3t:x-ueyama-hirofumi": {
    "sessionId": "h13-20010921-honkaigi",
    "voiceIndex": 15
  },
  "h13-3t:takeshi_tanaka": {
    "sessionId": "h13-20010921-honkaigi",
    "voiceIndex": 25
  },
  "h13-3t:x-kanke-hideo": {
    "sessionId": "h13-20010921-honkaigi",
    "voiceIndex": 31
  },
  "h13-3t:x-tsuji-yukio": {
    "sessionId": "h13-20010921-honkaigi",
    "voiceIndex": 41
  },
  "h13-4t:x-matsuzawa-toshiyuki": {
    "sessionId": "h13-20011121-honkaigi",
    "voiceIndex": 6
  },
  "h13-4t:x-funanami-keiko": {
    "sessionId": "h13-20011121-honkaigi",
    "voiceIndex": 15
  },
  "h13-4t:x-shima-kuniko": {
    "sessionId": "h13-20011121-honkaigi",
    "voiceIndex": 28
  },
  "h13-4t:x-iinuma-masako": {
    "sessionId": "h13-20011121-honkaigi",
    "voiceIndex": 34
  },
  "h13-4t:x-hara-masami": {
    "sessionId": "h13-20011122-honkaigi",
    "voiceIndex": 5
  },
  "h13-4t:x-kanetaka-masao": {
    "sessionId": "h13-20011122-honkaigi",
    "voiceIndex": 15
  },
  "h13-4t:x-hayashi-kazuya": {
    "sessionId": "h13-20011122-honkaigi",
    "voiceIndex": 23
  },
  "h13-4t:x-tsuru-hisashi": {
    "sessionId": "h13-20011122-honkaigi",
    "voiceIndex": 28
  },
  "h13-4t:x-sakurai-keiko": {
    "sessionId": "h13-20011122-honkaigi",
    "voiceIndex": 41
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
