/* 平成18年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h18;
  if (!year) throw new Error("平成18年データの読み込み後に h18-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h18-20060117-honkaigi",
    "meetingId": "h18-1r",
    "dateIso": "2006-01-17",
    "date": "2006年1月17日",
    "dayLabel": "第1日目",
    "title": "2006年1月17日 平成18年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=710#one",
    "characters": 5424,
    "voices": 26,
    "hasFullText": true
  },
  {
    "id": "h18-20060119-honkaigi",
    "meetingId": "h18-1r",
    "dateIso": "2006-01-19",
    "date": "2006年1月19日",
    "dayLabel": "第2日目",
    "title": "2006年1月19日 平成18年_第１回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=712#one",
    "characters": 14275,
    "voices": 24,
    "hasFullText": true
  },
  {
    "id": "h18-20060222-honkaigi",
    "meetingId": "h18-1t",
    "dateIso": "2006-02-22",
    "date": "2006年2月22日",
    "dayLabel": "第1日目",
    "title": "2006年2月22日 平成18年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=138#one",
    "characters": 60073,
    "voices": 36,
    "hasFullText": true
  },
  {
    "id": "h18-20060223-honkaigi",
    "meetingId": "h18-1t",
    "dateIso": "2006-02-23",
    "date": "2006年2月23日",
    "dayLabel": "第2日目",
    "title": "2006年2月23日 平成18年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=140#one",
    "characters": 74651,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h18-20060224-honkaigi",
    "meetingId": "h18-1t",
    "dateIso": "2006-02-24",
    "date": "2006年2月24日",
    "dayLabel": "第3日目",
    "title": "2006年2月24日 平成18年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=142#one",
    "characters": 72113,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "h18-20060309-honkaigi",
    "meetingId": "h18-1t",
    "dateIso": "2006-03-09",
    "date": "2006年3月9日",
    "dayLabel": "第4日目",
    "title": "2006年3月9日 平成18年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=144#one",
    "characters": 4308,
    "voices": 24,
    "hasFullText": true
  },
  {
    "id": "h18-20060328-honkaigi",
    "meetingId": "h18-1t",
    "dateIso": "2006-03-28",
    "date": "2006年3月28日",
    "dayLabel": "第5日目",
    "title": "2006年3月28日 平成18年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=146#one",
    "characters": 32640,
    "voices": 84,
    "hasFullText": true
  },
  {
    "id": "h18-20060530-honkaigi",
    "meetingId": "h18-2r",
    "dateIso": "2006-05-30",
    "date": "2006年5月30日",
    "dayLabel": "第1日目",
    "title": "2006年5月30日 平成18年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=714#one",
    "characters": 10653,
    "voices": 77,
    "hasFullText": true
  },
  {
    "id": "h18-20060622-honkaigi",
    "meetingId": "h18-2t",
    "dateIso": "2006-06-22",
    "date": "2006年6月22日",
    "dayLabel": "第1日目",
    "title": "2006年6月22日 平成18年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=148#one",
    "characters": 53068,
    "voices": 42,
    "hasFullText": true
  },
  {
    "id": "h18-20060623-honkaigi",
    "meetingId": "h18-2t",
    "dateIso": "2006-06-23",
    "date": "2006年6月23日",
    "dayLabel": "第2日目",
    "title": "2006年6月23日 平成18年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=150#one",
    "characters": 54236,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h18-20060627-honkaigi",
    "meetingId": "h18-2t",
    "dateIso": "2006-06-27",
    "date": "2006年6月27日",
    "dayLabel": "第3日目",
    "title": "2006年6月27日 平成18年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=152#one",
    "characters": 1830,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h18-20060707-honkaigi",
    "meetingId": "h18-2t",
    "dateIso": "2006-07-07",
    "date": "2006年7月7日",
    "dayLabel": "第4日目",
    "title": "2006年7月7日 平成18年_第２回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=154#one",
    "characters": 35242,
    "voices": 85,
    "hasFullText": true
  },
  {
    "id": "h18-20060905-honkaigi",
    "meetingId": "h18-3r",
    "dateIso": "2006-09-05",
    "date": "2006年9月5日",
    "dayLabel": "第1日目",
    "title": "2006年9月5日 平成18年_第３回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=716#one",
    "characters": 3267,
    "voices": 21,
    "hasFullText": true
  },
  {
    "id": "h18-20060921-honkaigi",
    "meetingId": "h18-3t",
    "dateIso": "2006-09-21",
    "date": "2006年9月21日",
    "dayLabel": "第1日目",
    "title": "2006年9月21日 平成18年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=156#one",
    "characters": 54368,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h18-20060922-honkaigi",
    "meetingId": "h18-3t",
    "dateIso": "2006-09-22",
    "date": "2006年9月22日",
    "dayLabel": "第2日目",
    "title": "2006年9月22日 平成18年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=158#one",
    "characters": 93162,
    "voices": 104,
    "hasFullText": true
  },
  {
    "id": "h18-20060926-honkaigi",
    "meetingId": "h18-3t",
    "dateIso": "2006-09-26",
    "date": "2006年9月26日",
    "dayLabel": "第3日目",
    "title": "2006年9月26日 平成18年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=160#one",
    "characters": 5541,
    "voices": 17,
    "hasFullText": true
  },
  {
    "id": "h18-20061012-honkaigi",
    "meetingId": "h18-3t",
    "dateIso": "2006-10-12",
    "date": "2006年10月12日",
    "dayLabel": "第4日目",
    "title": "2006年10月12日 平成18年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=162#one",
    "characters": 4135,
    "voices": 26,
    "hasFullText": true
  },
  {
    "id": "h18-20061027-honkaigi",
    "meetingId": "h18-3t",
    "dateIso": "2006-10-27",
    "date": "2006年10月27日",
    "dayLabel": "第5日目",
    "title": "2006年10月27日 平成18年_第３回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=164#one",
    "characters": 19312,
    "voices": 76,
    "hasFullText": true
  },
  {
    "id": "h18-20061122-honkaigi",
    "meetingId": "h18-4t",
    "dateIso": "2006-11-22",
    "date": "2006年11月22日",
    "dayLabel": "第1日目",
    "title": "2006年11月22日 平成18年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=166#one",
    "characters": 50759,
    "voices": 46,
    "hasFullText": true
  },
  {
    "id": "h18-20061124-honkaigi",
    "meetingId": "h18-4t",
    "dateIso": "2006-11-24",
    "date": "2006年11月24日",
    "dayLabel": "第2日目",
    "title": "2006年11月24日 平成18年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=168#one",
    "characters": 81318,
    "voices": 75,
    "hasFullText": true
  },
  {
    "id": "h18-20061207-honkaigi",
    "meetingId": "h18-4t",
    "dateIso": "2006-12-07",
    "date": "2006年12月7日",
    "dayLabel": "第3日目",
    "title": "2006年12月7日 平成18年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=170#one",
    "characters": 20547,
    "voices": 63,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h18-1t:x-mikami-hiroshi": {
    "sessionId": "h18-20060222-honkaigi",
    "voiceIndex": 12
  },
  "h18-1t:x-doi-yoichi": {
    "sessionId": "h18-20060222-honkaigi",
    "voiceIndex": 21
  },
  "h18-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h18-20060222-honkaigi",
    "voiceIndex": 27
  },
  "h18-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 4
  },
  "h18-1t:x-honda-takenobu": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 11
  },
  "h18-1t:masanori_fujiwara": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 21
  },
  "h18-1t:x-inoue-yaeko": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 28
  },
  "h18-1t:x-nakajima-mie": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 37
  },
  "h18-1t:x-onishi-mitsuhiro": {
    "sessionId": "h18-20060223-honkaigi",
    "voiceIndex": 45
  },
  "h18-1t:x-minami-keiko": {
    "sessionId": "h18-20060224-honkaigi",
    "voiceIndex": 4
  },
  "h18-1t:x-ito-masahiro": {
    "sessionId": "h18-20060224-honkaigi",
    "voiceIndex": 21
  },
  "h18-1t:x-osawa-shinichi": {
    "sessionId": "h18-20060224-honkaigi",
    "voiceIndex": 28
  },
  "h18-1t:x-fujita-jiro": {
    "sessionId": "h18-20060224-honkaigi",
    "voiceIndex": 33
  },
  "h18-1t:x-kikuchi-teiji": {
    "sessionId": "h18-20060224-honkaigi",
    "voiceIndex": 39
  },
  "h18-2t:x-mimura-ritsuko": {
    "sessionId": "h18-20060622-honkaigi",
    "voiceIndex": 7
  },
  "h18-2t:hideo_ishida": {
    "sessionId": "h18-20060622-honkaigi",
    "voiceIndex": 16
  },
  "h18-2t:x-takeuchi-shinobu": {
    "sessionId": "h18-20060622-honkaigi",
    "voiceIndex": 26
  },
  "h18-2t:ryo_nakatsuka": {
    "sessionId": "h18-20060622-honkaigi",
    "voiceIndex": 32
  },
  "h18-2t:x-doi-yoichi": {
    "sessionId": "h18-20060623-honkaigi",
    "voiceIndex": 4
  },
  "h18-2t:x-tsukidate-takeo": {
    "sessionId": "h18-20060623-honkaigi",
    "voiceIndex": 10
  },
  "h18-2t:takako_nishimoto": {
    "sessionId": "h18-20060623-honkaigi",
    "voiceIndex": 17
  },
  "h18-2t:x-yamaji-yoshinari": {
    "sessionId": "h18-20060623-honkaigi",
    "voiceIndex": 22
  },
  "h18-2t:x-suto-yasumichi": {
    "sessionId": "h18-20060623-honkaigi",
    "voiceIndex": 30
  },
  "h18-3t:x-hayashi-hiroshi": {
    "sessionId": "h18-20060921-honkaigi",
    "voiceIndex": 6
  },
  "h18-3t:hiroki_wakabayashi": {
    "sessionId": "h18-20060921-honkaigi",
    "voiceIndex": 16
  },
  "h18-3t:hiroko_suzuki": {
    "sessionId": "h18-20060921-honkaigi",
    "voiceIndex": 23
  },
  "h18-3t:x-onishi-mitsuhiro": {
    "sessionId": "h18-20060921-honkaigi",
    "voiceIndex": 32
  },
  "h18-3t:x-suzuki-masumi": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 4
  },
  "h18-3t:x-honda-giichi": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 11
  },
  "h18-3t:x-fujita-jiro": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 16
  },
  "h18-3t:x-hara-masami": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 22
  },
  "h18-3t:x-kikuchi-teiji": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 31
  },
  "h18-3t:x-kinoshita-fuminori": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 44
  },
  "h18-3t:yukihiro_sugai": {
    "sessionId": "h18-20060922-honkaigi",
    "voiceIndex": 49
  },
  "h18-4t:x-iinuma-masako": {
    "sessionId": "h18-20061122-honkaigi",
    "voiceIndex": 6
  },
  "h18-4t:x-takeuchi-shinobu": {
    "sessionId": "h18-20061122-honkaigi",
    "voiceIndex": 18
  },
  "h18-4t:x-abe-yumiko": {
    "sessionId": "h18-20061122-honkaigi",
    "voiceIndex": 26
  },
  "h18-4t:x-matsuzawa-toshiyuki": {
    "sessionId": "h18-20061122-honkaigi",
    "voiceIndex": 35
  },
  "h18-4t:takako_nishimoto": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 4
  },
  "h18-4t:taisaku_ando": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 12
  },
  "h18-4t:x-osawa-shinichi": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 21
  },
  "h18-4t:x-nakajima-mie": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 27
  },
  "h18-4t:x-yamamura-akitsugu": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 32
  },
  "h18-4t:x-inoue-yaeko": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 41
  },
  "h18-4t:x-ito-masahiro": {
    "sessionId": "h18-20061124-honkaigi",
    "voiceIndex": 53
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
