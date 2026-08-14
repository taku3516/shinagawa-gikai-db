/* 平成15年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h15;
  if (!year) throw new Error("平成15年データの読み込み後に h15-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h15-20030226-honkaigi",
    "meetingId": "h15-1t",
    "meetingName": "平成15年第1回定例会",
    "dateIso": "2003-02-26",
    "date": "2003年2月26日",
    "dayLabel": "第1日目",
    "title": "2003年2月26日 平成15年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=50#one",
    "characters": 56542,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "h15-20030227-honkaigi",
    "meetingId": "h15-1t",
    "meetingName": "平成15年第1回定例会",
    "dateIso": "2003-02-27",
    "date": "2003年2月27日",
    "dayLabel": "第2日目",
    "title": "2003年2月27日 平成15年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=52#one",
    "characters": 71131,
    "voices": 52,
    "hasFullText": true
  },
  {
    "id": "h15-20030228-honkaigi",
    "meetingId": "h15-1t",
    "meetingName": "平成15年第1回定例会",
    "dateIso": "2003-02-28",
    "date": "2003年2月28日",
    "dayLabel": "第3日目",
    "title": "2003年2月28日 平成15年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=54#one",
    "characters": 81261,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "h15-20030311-honkaigi",
    "meetingId": "h15-1t",
    "meetingName": "平成15年第1回定例会",
    "dateIso": "2003-03-11",
    "date": "2003年3月11日",
    "dayLabel": "第4日目",
    "title": "2003年3月11日 平成15年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=56#one",
    "characters": 2220,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "h15-20030328-honkaigi",
    "meetingId": "h15-1t",
    "meetingName": "平成15年第1回定例会",
    "dateIso": "2003-03-28",
    "date": "2003年3月28日",
    "dayLabel": "第5日目",
    "title": "2003年3月28日 平成15年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=58#one",
    "characters": 27266,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "h15-20030523-honkaigi",
    "meetingId": "h15-1r",
    "meetingName": "平成15年第1回臨時会",
    "dateIso": "2003-05-23",
    "date": "2003年5月23日",
    "dayLabel": "第1日目",
    "title": "2003年5月23日 平成15年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=700#one",
    "characters": 9813,
    "voices": 81,
    "hasFullText": true
  },
  {
    "id": "h15-20030626-honkaigi",
    "meetingId": "h15-2t",
    "meetingName": "平成15年第2回定例会",
    "dateIso": "2003-06-26",
    "date": "2003年6月26日",
    "dayLabel": "第1日目",
    "title": "2003年6月26日 平成15年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=60#one",
    "characters": 50558,
    "voices": 41,
    "hasFullText": true
  },
  {
    "id": "h15-20030627-honkaigi",
    "meetingId": "h15-2t",
    "meetingName": "平成15年第2回定例会",
    "dateIso": "2003-06-27",
    "date": "2003年6月27日",
    "dayLabel": "第2日目",
    "title": "2003年6月27日 平成15年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=62#one",
    "characters": 61540,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "h15-20030711-honkaigi",
    "meetingId": "h15-2t",
    "meetingName": "平成15年第2回定例会",
    "dateIso": "2003-07-11",
    "date": "2003年7月11日",
    "dayLabel": "第3日目",
    "title": "2003年7月11日 平成15年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=64#one",
    "characters": 10405,
    "voices": 39,
    "hasFullText": true
  },
  {
    "id": "h15-20030925-honkaigi",
    "meetingId": "h15-3t",
    "meetingName": "平成15年第3回定例会",
    "dateIso": "2003-09-25",
    "date": "2003年9月25日",
    "dayLabel": "第1日目",
    "title": "2003年9月25日 平成15年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=66#one",
    "characters": 60436,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h15-20030926-honkaigi",
    "meetingId": "h15-3t",
    "meetingName": "平成15年第3回定例会",
    "dateIso": "2003-09-26",
    "date": "2003年9月26日",
    "dayLabel": "第2日目",
    "title": "2003年9月26日 平成15年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=68#one",
    "characters": 74578,
    "voices": 86,
    "hasFullText": true
  },
  {
    "id": "h15-20031014-honkaigi",
    "meetingId": "h15-3t",
    "meetingName": "平成15年第3回定例会",
    "dateIso": "2003-10-14",
    "date": "2003年10月14日",
    "dayLabel": "第3日目",
    "title": "2003年10月14日 平成15年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=70#one",
    "characters": 6984,
    "voices": 27,
    "hasFullText": true
  },
  {
    "id": "h15-20031024-honkaigi",
    "meetingId": "h15-3t",
    "meetingName": "平成15年第3回定例会",
    "dateIso": "2003-10-24",
    "date": "2003年10月24日",
    "dayLabel": "第4日目",
    "title": "2003年10月24日 平成15年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=72#one",
    "characters": 26605,
    "voices": 84,
    "hasFullText": true
  },
  {
    "id": "h15-20031120-honkaigi",
    "meetingId": "h15-4t",
    "meetingName": "平成15年第4回定例会",
    "dateIso": "2003-11-20",
    "date": "2003年11月20日",
    "dayLabel": "第1日目",
    "title": "2003年11月20日 平成15年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=74#one",
    "characters": 48196,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h15-20031121-honkaigi",
    "meetingId": "h15-4t",
    "meetingName": "平成15年第4回定例会",
    "dateIso": "2003-11-21",
    "date": "2003年11月21日",
    "dayLabel": "第2日目",
    "title": "2003年11月21日 平成15年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=76#one",
    "characters": 62351,
    "voices": 52,
    "hasFullText": true
  },
  {
    "id": "h15-20031205-honkaigi",
    "meetingId": "h15-4t",
    "meetingName": "平成15年第4回定例会",
    "dateIso": "2003-12-05",
    "date": "2003年12月5日",
    "dayLabel": "第3日目",
    "title": "2003年12月5日 平成15年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=78#one",
    "characters": 13745,
    "voices": 49,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h15-1t:x-tsukamoto-toshimitsu": {
    "sessionId": "h15-20030226-honkaigi",
    "voiceIndex": 8
  },
  "h15-1t:x-sakai-naotaka": {
    "sessionId": "h15-20030226-honkaigi",
    "voiceIndex": 17
  },
  "h15-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h15-20030226-honkaigi",
    "voiceIndex": 23
  },
  "h15-1t:x-sato-yajiro": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 4
  },
  "h15-1t:x-honma-takashi": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 12
  },
  "h15-1t:x-kikuchi-teiji": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 20
  },
  "h15-1t:x-kitano-tomie": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 30
  },
  "h15-1t:x-ito-masahiro": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 38
  },
  "h15-1t:x-yamaji-yoshinari": {
    "sessionId": "h15-20030227-honkaigi",
    "voiceIndex": 48
  },
  "h15-1t:x-minami-keiko": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 4
  },
  "h15-1t:takeshi_tanaka": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 22
  },
  "h15-1t:x-kawanishi-kinuko": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 28
  },
  "h15-1t:x-takahoshi-masatoshi": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 35
  },
  "h15-1t:x-yokoyama-hiroshi": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 41
  },
  "h15-1t:x-tsuru-hisashi": {
    "sessionId": "h15-20030228-honkaigi",
    "voiceIndex": 49
  },
  "h15-2t:takeshi_tanaka": {
    "sessionId": "h15-20030626-honkaigi",
    "voiceIndex": 6
  },
  "h15-2t:x-shima-kuniko": {
    "sessionId": "h15-20030626-honkaigi",
    "voiceIndex": 12
  },
  "h15-2t:ryo_nakatsuka": {
    "sessionId": "h15-20030626-honkaigi",
    "voiceIndex": 21
  },
  "h15-2t:x-takahoshi-masatoshi": {
    "sessionId": "h15-20030626-honkaigi",
    "voiceIndex": 33
  },
  "h15-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h15-20030627-honkaigi",
    "voiceIndex": 4
  },
  "h15-2t:takako_nishimoto": {
    "sessionId": "h15-20030627-honkaigi",
    "voiceIndex": 10
  },
  "h15-2t:x-hara-masami": {
    "sessionId": "h15-20030627-honkaigi",
    "voiceIndex": 18
  },
  "h15-2t:x-yamaji-yoshinari": {
    "sessionId": "h15-20030627-honkaigi",
    "voiceIndex": 26
  },
  "h15-2t:x-mimura-ritsuko": {
    "sessionId": "h15-20030627-honkaigi",
    "voiceIndex": 33
  },
  "h15-3t:x-nakajima-mie": {
    "sessionId": "h15-20030925-honkaigi",
    "voiceIndex": 6
  },
  "h15-3t:hiroko_suzuki": {
    "sessionId": "h15-20030925-honkaigi",
    "voiceIndex": 11
  },
  "h15-3t:x-kinoshita-fuminori": {
    "sessionId": "h15-20030925-honkaigi",
    "voiceIndex": 29
  },
  "h15-3t:hideo_ishida": {
    "sessionId": "h15-20030925-honkaigi",
    "voiceIndex": 34
  },
  "h15-3t:yukihiro_sugai": {
    "sessionId": "h15-20030925-honkaigi",
    "voiceIndex": 44
  },
  "h15-3t:x-suzuki-masumi": {
    "sessionId": "h15-20030926-honkaigi",
    "voiceIndex": 4
  },
  "h15-3t:hiroki_wakabayashi": {
    "sessionId": "h15-20030926-honkaigi",
    "voiceIndex": 12
  },
  "h15-3t:x-minami-keiko": {
    "sessionId": "h15-20030926-honkaigi",
    "voiceIndex": 20
  },
  "h15-3t:x-onishi-mitsuhiro": {
    "sessionId": "h15-20030926-honkaigi",
    "voiceIndex": 37
  },
  "h15-3t:x-ito-masahiro": {
    "sessionId": "h15-20030926-honkaigi",
    "voiceIndex": 43
  },
  "h15-4t:x-miyazaki-katsutoshi": {
    "sessionId": "h15-20031120-honkaigi",
    "voiceIndex": 6
  },
  "h15-4t:x-honma-takashi": {
    "sessionId": "h15-20031120-honkaigi",
    "voiceIndex": 19
  },
  "h15-4t:x-honda-takenobu": {
    "sessionId": "h15-20031120-honkaigi",
    "voiceIndex": 26
  },
  "h15-4t:x-takeuchi-shinobu": {
    "sessionId": "h15-20031120-honkaigi",
    "voiceIndex": 32
  },
  "h15-4t:x-suto-yasumichi": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 4
  },
  "h15-4t:x-honda-giichi": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 12
  },
  "h15-4t:x-inoue-yaeko": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 18
  },
  "h15-4t:x-kawanishi-kinuko": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 27
  },
  "h15-4t:x-hayashi-kazuya": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 37
  },
  "h15-4t:x-yamaji-yoshinari": {
    "sessionId": "h15-20031121-honkaigi",
    "voiceIndex": 41
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
