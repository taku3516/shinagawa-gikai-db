/* 平成16年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h16;
  if (!year) throw new Error("平成16年データの読み込み後に h16-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h16-20040225-honkaigi",
    "meetingId": "h16-1t",
    "dateIso": "2004-02-25",
    "date": "2004年2月25日",
    "dayLabel": "第1日目",
    "title": "2004年2月25日 平成16年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=80#one",
    "characters": 57241,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h16-20040226-honkaigi",
    "meetingId": "h16-1t",
    "dateIso": "2004-02-26",
    "date": "2004年2月26日",
    "dayLabel": "第2日目",
    "title": "2004年2月26日 平成16年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=82#one",
    "characters": 66596,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h16-20040227-honkaigi",
    "meetingId": "h16-1t",
    "dateIso": "2004-02-27",
    "date": "2004年2月27日",
    "dayLabel": "第3日目",
    "title": "2004年2月27日 平成16年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=84#one",
    "characters": 90041,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "h16-20040309-honkaigi",
    "meetingId": "h16-1t",
    "dateIso": "2004-03-09",
    "date": "2004年3月9日",
    "dayLabel": "第4日目",
    "title": "2004年3月9日 平成16年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=86#one",
    "characters": 2114,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "h16-20040324-honkaigi",
    "meetingId": "h16-1t",
    "dateIso": "2004-03-24",
    "date": "2004年3月24日",
    "dayLabel": "第5日目",
    "title": "2004年3月24日 平成16年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=88#one",
    "characters": 31352,
    "voices": 80,
    "hasFullText": true
  },
  {
    "id": "h16-20040408-honkaigi",
    "meetingId": "h16-1r",
    "dateIso": "2004-04-08",
    "date": "2004年4月8日",
    "dayLabel": "第1日目",
    "title": "2004年4月8日 平成16年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=702#one",
    "characters": 3808,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h16-20040409-honkaigi",
    "meetingId": "h16-1r",
    "dateIso": "2004-04-09",
    "date": "2004年4月9日",
    "dayLabel": "第2日目",
    "title": "2004年4月9日 平成16年_第１回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=704#one",
    "characters": 8640,
    "voices": 16,
    "hasFullText": true
  },
  {
    "id": "h16-20040527-honkaigi",
    "meetingId": "h16-2r",
    "dateIso": "2004-05-27",
    "date": "2004年5月27日",
    "dayLabel": "第1日目",
    "title": "2004年5月27日 平成16年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=706#one",
    "characters": 6435,
    "voices": 60,
    "hasFullText": true
  },
  {
    "id": "h16-20040625-honkaigi",
    "meetingId": "h16-2t",
    "dateIso": "2004-06-25",
    "date": "2004年6月25日",
    "dayLabel": "第1日目",
    "title": "2004年6月25日 平成16年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=90#one",
    "characters": 47653,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h16-20040628-honkaigi",
    "meetingId": "h16-2t",
    "dateIso": "2004-06-28",
    "date": "2004年6月28日",
    "dayLabel": "第2日目",
    "title": "2004年6月28日 平成16年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=92#one",
    "characters": 73082,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h16-20040708-honkaigi",
    "meetingId": "h16-2t",
    "dateIso": "2004-07-08",
    "date": "2004年7月8日",
    "dayLabel": "第3日目",
    "title": "2004年7月8日 平成16年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=94#one",
    "characters": 11055,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h16-20040922-honkaigi",
    "meetingId": "h16-3t",
    "dateIso": "2004-09-22",
    "date": "2004年9月22日",
    "dayLabel": "第1日目",
    "title": "2004年9月22日 平成16年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=96#one",
    "characters": 56780,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h16-20040924-honkaigi",
    "meetingId": "h16-3t",
    "dateIso": "2004-09-24",
    "date": "2004年9月24日",
    "dayLabel": "第2日目",
    "title": "2004年9月24日 平成16年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=98#one",
    "characters": 91563,
    "voices": 89,
    "hasFullText": true
  },
  {
    "id": "h16-20041022-honkaigi",
    "meetingId": "h16-3t",
    "dateIso": "2004-10-22",
    "date": "2004年10月22日",
    "dayLabel": "第3日目",
    "title": "2004年10月22日 平成16年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=100#one",
    "characters": 16288,
    "voices": 74,
    "hasFullText": true
  },
  {
    "id": "h16-20041125-honkaigi",
    "meetingId": "h16-4t",
    "dateIso": "2004-11-25",
    "date": "2004年11月25日",
    "dayLabel": "第1日目",
    "title": "2004年11月25日 平成16年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=102#one",
    "characters": 38781,
    "voices": 33,
    "hasFullText": true
  },
  {
    "id": "h16-20041126-honkaigi",
    "meetingId": "h16-4t",
    "dateIso": "2004-11-26",
    "date": "2004年11月26日",
    "dayLabel": "第2日目",
    "title": "2004年11月26日 平成16年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=104#one",
    "characters": 59360,
    "voices": 71,
    "hasFullText": true
  },
  {
    "id": "h16-20041209-honkaigi",
    "meetingId": "h16-4t",
    "dateIso": "2004-12-09",
    "date": "2004年12月9日",
    "dayLabel": "第3日目",
    "title": "2004年12月9日 平成16年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=106#one",
    "characters": 9693,
    "voices": 44,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h16-1t:x-ito-masahiro": {
    "sessionId": "h16-20040225-honkaigi",
    "voiceIndex": 8
  },
  "h16-1t:x-mikami-hiroshi": {
    "sessionId": "h16-20040225-honkaigi",
    "voiceIndex": 19
  },
  "h16-1t:x-sawada-eiji": {
    "sessionId": "h16-20040225-honkaigi",
    "voiceIndex": 26
  },
  "h16-1t:x-doi-yoichi": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 4
  },
  "h16-1t:masanori_fujiwara": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 11
  },
  "h16-1t:x-yamamura-akitsugu": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 18
  },
  "h16-1t:x-tsukamoto-toshimitsu": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 23
  },
  "h16-1t:x-shima-kuniko": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 34
  },
  "h16-1t:x-kikuchi-teiji": {
    "sessionId": "h16-20040226-honkaigi",
    "voiceIndex": 41
  },
  "h16-1t:takako_nishimoto": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 4
  },
  "h16-1t:x-osawa-shinichi": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 13
  },
  "h16-1t:x-onishi-mitsuhiro": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 21
  },
  "h16-1t:x-hayashi-hiroshi": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 29
  },
  "h16-1t:x-sakai-naotaka": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 38
  },
  "h16-1t:x-iinuma-masako": {
    "sessionId": "h16-20040227-honkaigi",
    "voiceIndex": 44
  },
  "h16-2t:x-hara-masami": {
    "sessionId": "h16-20040625-honkaigi",
    "voiceIndex": 6
  },
  "h16-2t:yukihiro_sugai": {
    "sessionId": "h16-20040625-honkaigi",
    "voiceIndex": 15
  },
  "h16-2t:x-takahoshi-masatoshi": {
    "sessionId": "h16-20040625-honkaigi",
    "voiceIndex": 37
  },
  "h16-2t:x-takeuchi-shinobu": {
    "sessionId": "h16-20040625-honkaigi",
    "voiceIndex": 45
  },
  "h16-2t:takeshi_tanaka": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 4
  },
  "h16-2t:x-mimura-ritsuko": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 11
  },
  "h16-2t:hideo_ishida": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 19
  },
  "h16-2t:x-nakajima-mie": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 25
  },
  "h16-2t:x-kawanishi-kinuko": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 31
  },
  "h16-2t:hiroko_suzuki": {
    "sessionId": "h16-20040628-honkaigi",
    "voiceIndex": 39
  },
  "h16-3t:x-honda-giichi": {
    "sessionId": "h16-20040922-honkaigi",
    "voiceIndex": 10
  },
  "h16-3t:x-tsukidate-takeo": {
    "sessionId": "h16-20040922-honkaigi",
    "voiceIndex": 15
  },
  "h16-3t:x-shima-kuniko": {
    "sessionId": "h16-20040922-honkaigi",
    "voiceIndex": 24
  },
  "h16-3t:x-onishi-mitsuhiro": {
    "sessionId": "h16-20040922-honkaigi",
    "voiceIndex": 33
  },
  "h16-3t:x-minami-keiko": {
    "sessionId": "h16-20040922-honkaigi",
    "voiceIndex": 39
  },
  "h16-3t:x-inoue-yaeko": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 4
  },
  "h16-3t:x-suzuki-masumi": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 13
  },
  "h16-3t:hiroki_wakabayashi": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 21
  },
  "h16-3t:x-honma-takashi": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 27
  },
  "h16-3t:ryo_nakatsuka": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 33
  },
  "h16-3t:x-hayashi-hiroshi": {
    "sessionId": "h16-20040924-honkaigi",
    "voiceIndex": 44
  },
  "h16-4t:x-suto-yasumichi": {
    "sessionId": "h16-20041125-honkaigi",
    "voiceIndex": 6
  },
  "h16-4t:x-sakai-naotaka": {
    "sessionId": "h16-20041125-honkaigi",
    "voiceIndex": 14
  },
  "h16-4t:x-kawanishi-kinuko": {
    "sessionId": "h16-20041125-honkaigi",
    "voiceIndex": 22
  },
  "h16-4t:x-hayashi-kazuya": {
    "sessionId": "h16-20041125-honkaigi",
    "voiceIndex": 29
  },
  "h16-4t:x-takeuchi-shinobu": {
    "sessionId": "h16-20041126-honkaigi",
    "voiceIndex": 4
  },
  "h16-4t:x-yamamura-akitsugu": {
    "sessionId": "h16-20041126-honkaigi",
    "voiceIndex": 10
  },
  "h16-4t:x-miyazaki-katsutoshi": {
    "sessionId": "h16-20041126-honkaigi",
    "voiceIndex": 17
  },
  "h16-4t:x-ito-masahiro": {
    "sessionId": "h16-20041126-honkaigi",
    "voiceIndex": 29
  },
  "h16-4t:yukihiro_sugai": {
    "sessionId": "h16-20041126-honkaigi",
    "voiceIndex": 39
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
