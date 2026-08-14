/* 平成26年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h26;
  if (!year) throw new Error("平成26年データの読み込み後に h26-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h26-20140219-honkaigi",
    "meetingId": "h26-1t",
    "dateIso": "2014-02-19",
    "date": "2014年2月19日",
    "dayLabel": "第1日目",
    "title": "2014年2月19日 平成26年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=378#one",
    "characters": 57803,
    "voices": 28,
    "hasFullText": true
  },
  {
    "id": "h26-20140220-honkaigi",
    "meetingId": "h26-1t",
    "dateIso": "2014-02-20",
    "date": "2014年2月20日",
    "dayLabel": "第2日目",
    "title": "2014年2月20日 平成26年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=380#one",
    "characters": 72644,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "h26-20140221-honkaigi",
    "meetingId": "h26-1t",
    "dateIso": "2014-02-21",
    "date": "2014年2月21日",
    "dayLabel": "第3日目",
    "title": "2014年2月21日 平成26年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=382#one",
    "characters": 61154,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h26-20140306-honkaigi",
    "meetingId": "h26-1t",
    "dateIso": "2014-03-06",
    "date": "2014年3月6日",
    "dayLabel": "第4日目",
    "title": "2014年3月6日 平成26年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=384#one",
    "characters": 1974,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "h26-20140326-honkaigi",
    "meetingId": "h26-1t",
    "dateIso": "2014-03-26",
    "date": "2014年3月26日",
    "dayLabel": "第5日目",
    "title": "2014年3月26日 平成26年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=386#one",
    "characters": 26721,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "h26-20140527-honkaigi",
    "meetingId": "h26-1r",
    "dateIso": "2014-05-27",
    "date": "2014年5月27日",
    "dayLabel": "第1日目",
    "title": "2014年5月27日 平成26年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=742#one",
    "characters": 3510,
    "voices": 27,
    "hasFullText": true
  },
  {
    "id": "h26-20140626-honkaigi",
    "meetingId": "h26-2t",
    "dateIso": "2014-06-26",
    "date": "2014年6月26日",
    "dayLabel": "第1日目",
    "title": "2014年6月26日 平成26年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=388#one",
    "characters": 53192,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h26-20140627-honkaigi",
    "meetingId": "h26-2t",
    "dateIso": "2014-06-27",
    "date": "2014年6月27日",
    "dayLabel": "第2日目",
    "title": "2014年6月27日 平成26年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=390#one",
    "characters": 54320,
    "voices": 52,
    "hasFullText": true
  },
  {
    "id": "h26-20140709-honkaigi",
    "meetingId": "h26-2t",
    "dateIso": "2014-07-09",
    "date": "2014年7月9日",
    "dayLabel": "第3日目",
    "title": "2014年7月9日 平成26年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=392#one",
    "characters": 29187,
    "voices": 79,
    "hasFullText": true
  },
  {
    "id": "h26-20141023-honkaigi",
    "meetingId": "h26-3t",
    "dateIso": "2014-10-23",
    "date": "2014年10月23日",
    "dayLabel": "第1日目",
    "title": "2014年10月23日 平成26年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=394#one",
    "characters": 51862,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h26-20141024-honkaigi",
    "meetingId": "h26-3t",
    "dateIso": "2014-10-24",
    "date": "2014年10月24日",
    "dayLabel": "第2日目",
    "title": "2014年10月24日 平成26年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=396#one",
    "characters": 87520,
    "voices": 126,
    "hasFullText": true
  },
  {
    "id": "h26-20141028-honkaigi",
    "meetingId": "h26-3t",
    "dateIso": "2014-10-28",
    "date": "2014年10月28日",
    "dayLabel": "第3日目",
    "title": "2014年10月28日 平成26年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=398#one",
    "characters": 10080,
    "voices": 24,
    "hasFullText": true
  },
  {
    "id": "h26-20141121-honkaigi",
    "meetingId": "h26-3t",
    "dateIso": "2014-11-21",
    "date": "2014年11月21日",
    "dayLabel": "第4日目",
    "title": "2014年11月21日 平成26年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=400#one",
    "characters": 24582,
    "voices": 86,
    "hasFullText": true
  },
  {
    "id": "h26-20141128-honkaigi",
    "meetingId": "h26-2r",
    "dateIso": "2014-11-28",
    "date": "2014年11月28日",
    "dayLabel": "第1日目",
    "title": "2014年11月28日 平成26年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=744#one",
    "characters": 3394,
    "voices": 18,
    "hasFullText": true
  },
  {
    "id": "h26-20141211-honkaigi",
    "meetingId": "h26-4t",
    "dateIso": "2014-12-11",
    "date": "2014年12月11日",
    "dayLabel": "第1日目",
    "title": "2014年12月11日 平成26年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=402#one",
    "characters": 57199,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h26-20141212-honkaigi",
    "meetingId": "h26-4t",
    "dateIso": "2014-12-12",
    "date": "2014年12月12日",
    "dayLabel": "第2日目",
    "title": "2014年12月12日 平成26年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=404#one",
    "characters": 64758,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "h26-20141225-honkaigi",
    "meetingId": "h26-4t",
    "dateIso": "2014-12-25",
    "date": "2014年12月25日",
    "dayLabel": "第3日目",
    "title": "2014年12月25日 平成26年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=406#one",
    "characters": 16576,
    "voices": 44,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h26-1t:x-honda-takenobu": {
    "sessionId": "h26-20140219-honkaigi",
    "voiceIndex": 8
  },
  "h26-1t:x-asano-hiroyuki": {
    "sessionId": "h26-20140219-honkaigi",
    "voiceIndex": 14
  },
  "h26-1t:x-inagawa-takayuki": {
    "sessionId": "h26-20140219-honkaigi",
    "voiceIndex": 21
  },
  "h26-1t:yukihiro_sugai": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 4
  },
  "h26-1t:hiroko_suzuki": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 13
  },
  "h26-1t:takako_konno": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 29
  },
  "h26-1t:x-abe-yumiko": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 37
  },
  "h26-1t:x-yoshida-atsumi": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 48
  },
  "h26-1t:x-sawada-hirokazu": {
    "sessionId": "h26-20140220-honkaigi",
    "voiceIndex": 55
  },
  "h26-1t:ryo_nakatsuka": {
    "sessionId": "h26-20140221-honkaigi",
    "voiceIndex": 4
  },
  "h26-1t:hiroki_wakabayashi": {
    "sessionId": "h26-20140221-honkaigi",
    "voiceIndex": 16
  },
  "h26-1t:kengo_kimura": {
    "sessionId": "h26-20140221-honkaigi",
    "voiceIndex": 24
  },
  "h26-1t:shinji_takahashi": {
    "sessionId": "h26-20140221-honkaigi",
    "voiceIndex": 33
  },
  "h26-2t:x-mukai-megumi": {
    "sessionId": "h26-20140626-honkaigi",
    "voiceIndex": 6
  },
  "h26-2t:x-ito-masahiro": {
    "sessionId": "h26-20140626-honkaigi",
    "voiceIndex": 11
  },
  "h26-2t:x-minami-keiko": {
    "sessionId": "h26-20140626-honkaigi",
    "voiceIndex": 17
  },
  "h26-2t:shinichiro_tsuru": {
    "sessionId": "h26-20140626-honkaigi",
    "voiceIndex": 30
  },
  "h26-2t:x-watabe-shigeru": {
    "sessionId": "h26-20140626-honkaigi",
    "voiceIndex": 38
  },
  "h26-2t:x-ishida-shingo": {
    "sessionId": "h26-20140627-honkaigi",
    "voiceIndex": 4
  },
  "h26-2t:yoshihiro_tsukamoto": {
    "sessionId": "h26-20140627-honkaigi",
    "voiceIndex": 11
  },
  "h26-2t:x-honda-takenobu": {
    "sessionId": "h26-20140627-honkaigi",
    "voiceIndex": 20
  },
  "h26-2t:takako_nishimoto": {
    "sessionId": "h26-20140627-honkaigi",
    "voiceIndex": 26
  },
  "h26-3t:x-iinuma-masako": {
    "sessionId": "h26-20141023-honkaigi",
    "voiceIndex": 9
  },
  "h26-3t:x-osawa-shinichi": {
    "sessionId": "h26-20141023-honkaigi",
    "voiceIndex": 27
  },
  "h26-3t:masanori_fujiwara": {
    "sessionId": "h26-20141023-honkaigi",
    "voiceIndex": 34
  },
  "h26-3t:hiroo_akutsu": {
    "sessionId": "h26-20141023-honkaigi",
    "voiceIndex": 44
  },
  "h26-3t:x-suzuki-hiroshi": {
    "sessionId": "h26-20141023-honkaigi",
    "voiceIndex": 51
  },
  "h26-3t:yuichi_watanabe": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 4
  },
  "h26-3t:kengo_kimura": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 10
  },
  "h26-3t:chihiro_ishida": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 17
  },
  "h26-3t:x-suzuki-masumi": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 31
  },
  "h26-3t:takako_konno": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 41
  },
  "h26-3t:shinji_takahashi": {
    "sessionId": "h26-20141024-honkaigi",
    "voiceIndex": 48
  },
  "h26-4t:x-yoshida-atsumi": {
    "sessionId": "h26-20141211-honkaigi",
    "voiceIndex": 6
  },
  "h26-4t:x-suto-yasumichi": {
    "sessionId": "h26-20141211-honkaigi",
    "voiceIndex": 12
  },
  "h26-4t:yoshihiro_tsukamoto": {
    "sessionId": "h26-20141211-honkaigi",
    "voiceIndex": 18
  },
  "h26-4t:takahiro_okura": {
    "sessionId": "h26-20141211-honkaigi",
    "voiceIndex": 27
  },
  "h26-4t:hiroko_suzuki": {
    "sessionId": "h26-20141211-honkaigi",
    "voiceIndex": 33
  },
  "h26-4t:x-matsuzawa-toshiyuki": {
    "sessionId": "h26-20141212-honkaigi",
    "voiceIndex": 4
  },
  "h26-4t:yukihiro_sugai": {
    "sessionId": "h26-20141212-honkaigi",
    "voiceIndex": 12
  },
  "h26-4t:hiroki_wakabayashi": {
    "sessionId": "h26-20141212-honkaigi",
    "voiceIndex": 21
  },
  "h26-4t:x-sawada-hirokazu": {
    "sessionId": "h26-20141212-honkaigi",
    "voiceIndex": 31
  },
  "h26-4t:x-inoue-yaeko": {
    "sessionId": "h26-20141212-honkaigi",
    "voiceIndex": 39
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
