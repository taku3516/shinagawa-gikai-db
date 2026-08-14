/* 平成29年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h29;
  if (!year) throw new Error("平成29年データの読み込み後に h29-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h29-20170222-honkaigi",
    "meetingId": "h29-1t",
    "dateIso": "2017-02-22",
    "date": "2017年2月22日",
    "dayLabel": "第1日目",
    "title": "2017年2月22日 平成29年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=470#one",
    "characters": 64099,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h29-20170223-honkaigi",
    "meetingId": "h29-1t",
    "dateIso": "2017-02-23",
    "date": "2017年2月23日",
    "dayLabel": "第2日目",
    "title": "2017年2月23日 平成29年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=472#one",
    "characters": 64345,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h29-20170224-honkaigi",
    "meetingId": "h29-1t",
    "dateIso": "2017-02-24",
    "date": "2017年2月24日",
    "dayLabel": "第3日目",
    "title": "2017年2月24日 平成29年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=474#one",
    "characters": 61196,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "h29-20170309-honkaigi",
    "meetingId": "h29-1t",
    "dateIso": "2017-03-09",
    "date": "2017年3月9日",
    "dayLabel": "第4日目",
    "title": "2017年3月9日 平成29年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=476#one",
    "characters": 2946,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "h29-20170328-honkaigi",
    "meetingId": "h29-1t",
    "dateIso": "2017-03-28",
    "date": "2017年3月28日",
    "dayLabel": "第5日目",
    "title": "2017年3月28日 平成29年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=478#one",
    "characters": 23547,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "h29-20170526-honkaigi",
    "meetingId": "h29-1r",
    "dateIso": "2017-05-26",
    "date": "2017年5月26日",
    "dayLabel": "第1日目",
    "title": "2017年5月26日 平成29年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=752#one",
    "characters": 9409,
    "voices": 88,
    "hasFullText": true
  },
  {
    "id": "h29-20170706-honkaigi",
    "meetingId": "h29-2t",
    "dateIso": "2017-07-06",
    "date": "2017年7月6日",
    "dayLabel": "第1日目",
    "title": "2017年7月6日 平成29年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=480#one",
    "characters": 49667,
    "voices": 51,
    "hasFullText": true
  },
  {
    "id": "h29-20170707-honkaigi",
    "meetingId": "h29-2t",
    "dateIso": "2017-07-07",
    "date": "2017年7月7日",
    "dayLabel": "第2日目",
    "title": "2017年7月7日 平成29年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=482#one",
    "characters": 49667,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h29-20170719-honkaigi",
    "meetingId": "h29-2t",
    "dateIso": "2017-07-19",
    "date": "2017年7月19日",
    "dayLabel": "第3日目",
    "title": "2017年7月19日 平成29年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=484#one",
    "characters": 27762,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "h29-20170921-honkaigi",
    "meetingId": "h29-3t",
    "dateIso": "2017-09-21",
    "date": "2017年9月21日",
    "dayLabel": "第1日目",
    "title": "2017年9月21日 平成29年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=486#one",
    "characters": 53386,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "h29-20170922-honkaigi",
    "meetingId": "h29-3t",
    "dateIso": "2017-09-22",
    "date": "2017年9月22日",
    "dayLabel": "第2日目",
    "title": "2017年9月22日 平成29年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=488#one",
    "characters": 64539,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "h29-20170929-honkaigi",
    "meetingId": "h29-3t",
    "dateIso": "2017-09-29",
    "date": "2017年9月29日",
    "dayLabel": "第3日目",
    "title": "2017年9月29日 平成29年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=490#one",
    "characters": 6981,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "h29-20171019-honkaigi",
    "meetingId": "h29-3t",
    "dateIso": "2017-10-19",
    "date": "2017年10月19日",
    "dayLabel": "第4日目",
    "title": "2017年10月19日 平成29年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=492#one",
    "characters": 21988,
    "voices": 75,
    "hasFullText": true
  },
  {
    "id": "h29-20171124-honkaigi",
    "meetingId": "h29-4t",
    "dateIso": "2017-11-24",
    "date": "2017年11月24日",
    "dayLabel": "第1日目",
    "title": "2017年11月24日 平成29年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=494#one",
    "characters": 55268,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h29-20171127-honkaigi",
    "meetingId": "h29-4t",
    "dateIso": "2017-11-27",
    "date": "2017年11月27日",
    "dayLabel": "第2日目",
    "title": "2017年11月27日 平成29年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=496#one",
    "characters": 65328,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "h29-20171129-honkaigi",
    "meetingId": "h29-4t",
    "dateIso": "2017-11-29",
    "date": "2017年11月29日",
    "dayLabel": "第3日目",
    "title": "2017年11月29日 平成29年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=498#one",
    "characters": 5858,
    "voices": 19,
    "hasFullText": true
  },
  {
    "id": "h29-20171207-honkaigi",
    "meetingId": "h29-4t",
    "dateIso": "2017-12-07",
    "date": "2017年12月7日",
    "dayLabel": "第4日目",
    "title": "2017年12月7日 平成29年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=500#one",
    "characters": 11687,
    "voices": 40,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h29-1t:x-suzuki-masumi": {
    "sessionId": "h29-20170222-honkaigi",
    "voiceIndex": 8
  },
  "h29-1t:x-takeuchi-shinobu": {
    "sessionId": "h29-20170222-honkaigi",
    "voiceIndex": 20
  },
  "h29-1t:x-iinuma-masako": {
    "sessionId": "h29-20170222-honkaigi",
    "voiceIndex": 30
  },
  "h29-1t:takahiro_okura": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 4
  },
  "h29-1t:yukihiro_sugai": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 11
  },
  "h29-1t:taisaku_ando": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 20
  },
  "h29-1t:yoshihiro_matsunaga": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 35
  },
  "h29-1t:nobuaki_takahashi": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 41
  },
  "h29-1t:saeko_niizuma": {
    "sessionId": "h29-20170223-honkaigi",
    "voiceIndex": 47
  },
  "h29-1t:masanori_fujiwara": {
    "sessionId": "h29-20170224-honkaigi",
    "voiceIndex": 4
  },
  "h29-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h29-20170224-honkaigi",
    "voiceIndex": 15
  },
  "h29-1t:shinichiro_tsuru": {
    "sessionId": "h29-20170224-honkaigi",
    "voiceIndex": 26
  },
  "h29-1t:kengo_kimura": {
    "sessionId": "h29-20170224-honkaigi",
    "voiceIndex": 36
  },
  "h29-1t:x-sawada-hirokazu": {
    "sessionId": "h29-20170224-honkaigi",
    "voiceIndex": 41
  },
  "h29-2t:x-inagawa-takayuki": {
    "sessionId": "h29-20170706-honkaigi",
    "voiceIndex": 6
  },
  "h29-2t:hideo_ishida": {
    "sessionId": "h29-20170706-honkaigi",
    "voiceIndex": 11
  },
  "h29-2t:x-asano-hiroyuki": {
    "sessionId": "h29-20170706-honkaigi",
    "voiceIndex": 21
  },
  "h29-2t:ryo_nakatsuka": {
    "sessionId": "h29-20170706-honkaigi",
    "voiceIndex": 28
  },
  "h29-2t:yumiko_yoshida": {
    "sessionId": "h29-20170706-honkaigi",
    "voiceIndex": 41
  },
  "h29-2t:x-osawa-shinichi": {
    "sessionId": "h29-20170707-honkaigi",
    "voiceIndex": 4
  },
  "h29-2t:hiroki_wakabayashi": {
    "sessionId": "h29-20170707-honkaigi",
    "voiceIndex": 9
  },
  "h29-2t:chihiro_ishida": {
    "sessionId": "h29-20170707-honkaigi",
    "voiceIndex": 19
  },
  "h29-2t:yukari_yokoyama": {
    "sessionId": "h29-20170707-honkaigi",
    "voiceIndex": 34
  },
  "h29-3t:tsutsui_yosuke": {
    "sessionId": "h29-20170921-honkaigi",
    "voiceIndex": 6
  },
  "h29-3t:x-suzuki-masumi": {
    "sessionId": "h29-20170921-honkaigi",
    "voiceIndex": 17
  },
  "h29-3t:shinichiro_tsuru": {
    "sessionId": "h29-20170921-honkaigi",
    "voiceIndex": 25
  },
  "h29-3t:x-iinuma-masako": {
    "sessionId": "h29-20170921-honkaigi",
    "voiceIndex": 31
  },
  "h29-3t:takako_nishimoto": {
    "sessionId": "h29-20170921-honkaigi",
    "voiceIndex": 50
  },
  "h29-3t:x-suzuki-hiroshi": {
    "sessionId": "h29-20170922-honkaigi",
    "voiceIndex": 4
  },
  "h29-3t:yoshihiro_matsunaga": {
    "sessionId": "h29-20170922-honkaigi",
    "voiceIndex": 10
  },
  "h29-3t:yoshihiro_tsukamoto": {
    "sessionId": "h29-20170922-honkaigi",
    "voiceIndex": 18
  },
  "h29-3t:hiroko_suzuki": {
    "sessionId": "h29-20170922-honkaigi",
    "voiceIndex": 26
  },
  "h29-3t:x-watabe-shigeru": {
    "sessionId": "h29-20170922-honkaigi",
    "voiceIndex": 45
  },
  "h29-4t:x-honda-takenobu": {
    "sessionId": "h29-20171124-honkaigi",
    "voiceIndex": 7
  },
  "h29-4t:ryo_nakatsuka": {
    "sessionId": "h29-20171124-honkaigi",
    "voiceIndex": 13
  },
  "h29-4t:kengo_kimura": {
    "sessionId": "h29-20171124-honkaigi",
    "voiceIndex": 28
  },
  "h29-4t:hiroo_akutsu": {
    "sessionId": "h29-20171124-honkaigi",
    "voiceIndex": 34
  },
  "h29-4t:x-tanaka-sayaka": {
    "sessionId": "h29-20171124-honkaigi",
    "voiceIndex": 44
  },
  "h29-4t:x-takeuchi-shinobu": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 4
  },
  "h29-4t:yuichi_watanabe": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 11
  },
  "h29-4t:takahiro_okura": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 16
  },
  "h29-4t:x-ito-masahiro": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 23
  },
  "h29-4t:toshifumi_nodate": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 32
  },
  "h29-4t:yukihiro_sugai": {
    "sessionId": "h29-20171127-honkaigi",
    "voiceIndex": 47
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
