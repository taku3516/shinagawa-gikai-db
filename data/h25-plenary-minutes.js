/* 平成25年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h25;
  if (!year) throw new Error("平成25年データの読み込み後に h25-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h25-20130220-honkaigi",
    "meetingId": "h25-1t",
    "dateIso": "2013-02-20",
    "date": "2013年2月20日",
    "dayLabel": "第1日目",
    "title": "2013年2月20日 平成25年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=348#one",
    "characters": 59331,
    "voices": 36,
    "hasFullText": true
  },
  {
    "id": "h25-20130221-honkaigi",
    "meetingId": "h25-1t",
    "dateIso": "2013-02-21",
    "date": "2013年2月21日",
    "dayLabel": "第2日目",
    "title": "2013年2月21日 平成25年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=350#one",
    "characters": 69428,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "h25-20130222-honkaigi",
    "meetingId": "h25-1t",
    "dateIso": "2013-02-22",
    "date": "2013年2月22日",
    "dayLabel": "第3日目",
    "title": "2013年2月22日 平成25年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=352#one",
    "characters": 66841,
    "voices": 77,
    "hasFullText": true
  },
  {
    "id": "h25-20130307-honkaigi",
    "meetingId": "h25-1t",
    "dateIso": "2013-03-07",
    "date": "2013年3月7日",
    "dayLabel": "第4日目",
    "title": "2013年3月7日 平成25年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=354#one",
    "characters": 3627,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "h25-20130326-honkaigi",
    "meetingId": "h25-1t",
    "dateIso": "2013-03-26",
    "date": "2013年3月26日",
    "dayLabel": "第5日目",
    "title": "2013年3月26日 平成25年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=356#one",
    "characters": 27514,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "h25-20130528-honkaigi",
    "meetingId": "h25-1r",
    "dateIso": "2013-05-28",
    "date": "2013年5月28日",
    "dayLabel": "第1日目",
    "title": "2013年5月28日 平成25年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=740#one",
    "characters": 8554,
    "voices": 87,
    "hasFullText": true
  },
  {
    "id": "h25-20130627-honkaigi",
    "meetingId": "h25-2t",
    "dateIso": "2013-06-27",
    "date": "2013年6月27日",
    "dayLabel": "第1日目",
    "title": "2013年6月27日 平成25年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=358#one",
    "characters": 47258,
    "voices": 47,
    "hasFullText": true
  },
  {
    "id": "h25-20130628-honkaigi",
    "meetingId": "h25-2t",
    "dateIso": "2013-06-28",
    "date": "2013年6月28日",
    "dayLabel": "第2日目",
    "title": "2013年6月28日 平成25年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=360#one",
    "characters": 61343,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h25-20130702-honkaigi",
    "meetingId": "h25-2t",
    "dateIso": "2013-07-02",
    "date": "2013年7月2日",
    "dayLabel": "第3日目",
    "title": "2013年7月2日 平成25年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=362#one",
    "characters": 4761,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "h25-20130711-honkaigi",
    "meetingId": "h25-2t",
    "dateIso": "2013-07-11",
    "date": "2013年7月11日",
    "dayLabel": "第4日目",
    "title": "2013年7月11日 平成25年_第２回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=364#one",
    "characters": 17403,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h25-20130919-honkaigi",
    "meetingId": "h25-3t",
    "dateIso": "2013-09-19",
    "date": "2013年9月19日",
    "dayLabel": "第1日目",
    "title": "2013年9月19日 平成25年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=366#one",
    "characters": 59340,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h25-20130920-honkaigi",
    "meetingId": "h25-3t",
    "dateIso": "2013-09-20",
    "date": "2013年9月20日",
    "dayLabel": "第2日目",
    "title": "2013年9月20日 平成25年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=368#one",
    "characters": 63414,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "h25-20131021-honkaigi",
    "meetingId": "h25-3t",
    "dateIso": "2013-10-21",
    "date": "2013年10月21日",
    "dayLabel": "第3日目",
    "title": "2013年10月21日 平成25年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=370#one",
    "characters": 19834,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "h25-20131121-honkaigi",
    "meetingId": "h25-4t",
    "dateIso": "2013-11-21",
    "date": "2013年11月21日",
    "dayLabel": "第1日目",
    "title": "2013年11月21日 平成25年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=372#one",
    "characters": 59000,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h25-20131122-honkaigi",
    "meetingId": "h25-4t",
    "dateIso": "2013-11-22",
    "date": "2013年11月22日",
    "dayLabel": "第2日目",
    "title": "2013年11月22日 平成25年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=374#one",
    "characters": 51206,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h25-20131206-honkaigi",
    "meetingId": "h25-4t",
    "dateIso": "2013-12-06",
    "date": "2013年12月6日",
    "dayLabel": "第3日目",
    "title": "2013年12月6日 平成25年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=376#one",
    "characters": 25089,
    "voices": 67,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h25-1t:x-osawa-shinichi": {
    "sessionId": "h25-20130220-honkaigi",
    "voiceIndex": 8
  },
  "h25-1t:x-takeuchi-shinobu": {
    "sessionId": "h25-20130220-honkaigi",
    "voiceIndex": 18
  },
  "h25-1t:yukihiro_sugai": {
    "sessionId": "h25-20130220-honkaigi",
    "voiceIndex": 29
  },
  "h25-1t:x-ishida-shingo": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 4
  },
  "h25-1t:x-iinuma-masako": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 12
  },
  "h25-1t:x-onishi-mitsuhiro": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 25
  },
  "h25-1t:hideo_ishida": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 30
  },
  "h25-1t:x-inagawa-takayuki": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 39
  },
  "h25-1t:yoshihiro_tsukamoto": {
    "sessionId": "h25-20130221-honkaigi",
    "voiceIndex": 43
  },
  "h25-1t:ryo_nakatsuka": {
    "sessionId": "h25-20130222-honkaigi",
    "voiceIndex": 4
  },
  "h25-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h25-20130222-honkaigi",
    "voiceIndex": 17
  },
  "h25-1t:x-yoshida-atsumi": {
    "sessionId": "h25-20130222-honkaigi",
    "voiceIndex": 25
  },
  "h25-1t:x-mukai-megumi": {
    "sessionId": "h25-20130222-honkaigi",
    "voiceIndex": 33
  },
  "h25-1t:x-asano-hiroyuki": {
    "sessionId": "h25-20130222-honkaigi",
    "voiceIndex": 39
  },
  "h25-2t:x-mukai-megumi": {
    "sessionId": "h25-20130627-honkaigi",
    "voiceIndex": 6
  },
  "h25-2t:chihiro_ishida": {
    "sessionId": "h25-20130627-honkaigi",
    "voiceIndex": 11
  },
  "h25-2t:x-sawada-hirokazu": {
    "sessionId": "h25-20130627-honkaigi",
    "voiceIndex": 27
  },
  "h25-2t:x-yamamoto-keiko": {
    "sessionId": "h25-20130627-honkaigi",
    "voiceIndex": 35
  },
  "h25-2t:x-hara-kozo": {
    "sessionId": "h25-20130627-honkaigi",
    "voiceIndex": 43
  },
  "h25-2t:x-watabe-shigeru": {
    "sessionId": "h25-20130628-honkaigi",
    "voiceIndex": 4
  },
  "h25-2t:x-abe-yumiko": {
    "sessionId": "h25-20130628-honkaigi",
    "voiceIndex": 9
  },
  "h25-2t:hiroo_akutsu": {
    "sessionId": "h25-20130628-honkaigi",
    "voiceIndex": 18
  },
  "h25-2t:x-ito-masahiro": {
    "sessionId": "h25-20130628-honkaigi",
    "voiceIndex": 25
  },
  "h25-2t:takako_nishimoto": {
    "sessionId": "h25-20130628-honkaigi",
    "voiceIndex": 36
  },
  "h25-3t:hiroko_suzuki": {
    "sessionId": "h25-20130919-honkaigi",
    "voiceIndex": 6
  },
  "h25-3t:x-honda-takenobu": {
    "sessionId": "h25-20130919-honkaigi",
    "voiceIndex": 18
  },
  "h25-3t:shinichiro_tsuru": {
    "sessionId": "h25-20130919-honkaigi",
    "voiceIndex": 26
  },
  "h25-3t:x-ishida-shingo": {
    "sessionId": "h25-20130919-honkaigi",
    "voiceIndex": 34
  },
  "h25-3t:masanori_fujiwara": {
    "sessionId": "h25-20130919-honkaigi",
    "voiceIndex": 41
  },
  "h25-3t:x-osawa-shinichi": {
    "sessionId": "h25-20130920-honkaigi",
    "voiceIndex": 4
  },
  "h25-3t:x-minami-keiko": {
    "sessionId": "h25-20130920-honkaigi",
    "voiceIndex": 8
  },
  "h25-3t:takako_konno": {
    "sessionId": "h25-20130920-honkaigi",
    "voiceIndex": 25
  },
  "h25-3t:yukihiro_sugai": {
    "sessionId": "h25-20130920-honkaigi",
    "voiceIndex": 35
  },
  "h25-3t:yuichi_watanabe": {
    "sessionId": "h25-20130920-honkaigi",
    "voiceIndex": 43
  },
  "h25-4t:x-suzuki-masumi": {
    "sessionId": "h25-20131121-honkaigi",
    "voiceIndex": 6
  },
  "h25-4t:hiroo_akutsu": {
    "sessionId": "h25-20131121-honkaigi",
    "voiceIndex": 12
  },
  "h25-4t:takahiro_okura": {
    "sessionId": "h25-20131121-honkaigi",
    "voiceIndex": 19
  },
  "h25-4t:x-suzuki-hiroshi": {
    "sessionId": "h25-20131121-honkaigi",
    "voiceIndex": 25
  },
  "h25-4t:x-iinuma-masako": {
    "sessionId": "h25-20131121-honkaigi",
    "voiceIndex": 32
  },
  "h25-4t:x-suto-yasumichi": {
    "sessionId": "h25-20131122-honkaigi",
    "voiceIndex": 4
  },
  "h25-4t:x-yamamoto-keiko": {
    "sessionId": "h25-20131122-honkaigi",
    "voiceIndex": 9
  },
  "h25-4t:x-inoue-yaeko": {
    "sessionId": "h25-20131122-honkaigi",
    "voiceIndex": 17
  },
  "h25-4t:x-matsuzawa-toshiyuki": {
    "sessionId": "h25-20131122-honkaigi",
    "voiceIndex": 27
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
