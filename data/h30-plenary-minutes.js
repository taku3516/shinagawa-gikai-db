/* 平成30年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h30;
  if (!year) throw new Error("平成30年データの読み込み後に h30-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h30-20180221-honkaigi",
    "meetingId": "h30-1t",
    "dateIso": "2018-02-21",
    "date": "2018年2月21日",
    "dayLabel": "第1日目",
    "title": "2018年2月21日 平成30年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=502#one",
    "characters": 61653,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "h30-20180222-honkaigi",
    "meetingId": "h30-1t",
    "dateIso": "2018-02-22",
    "date": "2018年2月22日",
    "dayLabel": "第2日目",
    "title": "2018年2月22日 平成30年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one",
    "characters": 65186,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "h30-20180223-honkaigi",
    "meetingId": "h30-1t",
    "dateIso": "2018-02-23",
    "date": "2018年2月23日",
    "dayLabel": "第3日目",
    "title": "2018年2月23日 平成30年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=506#one",
    "characters": 26857,
    "voices": 36,
    "hasFullText": true
  },
  {
    "id": "h30-20180308-honkaigi",
    "meetingId": "h30-1t",
    "dateIso": "2018-03-08",
    "date": "2018年3月8日",
    "dayLabel": "第4日目",
    "title": "2018年3月8日 平成30年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=508#one",
    "characters": 6460,
    "voices": 22,
    "hasFullText": true
  },
  {
    "id": "h30-20180327-honkaigi",
    "meetingId": "h30-1t",
    "dateIso": "2018-03-27",
    "date": "2018年3月27日",
    "dayLabel": "第5日目",
    "title": "2018年3月27日 平成30年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one",
    "characters": 38344,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "h30-20180529-honkaigi",
    "meetingId": "h30-1r",
    "dateIso": "2018-05-29",
    "date": "2018年5月29日",
    "dayLabel": "第1日目",
    "title": "2018年5月29日 平成30年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=754#one",
    "characters": 15589,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "h30-20180628-honkaigi",
    "meetingId": "h30-2t",
    "dateIso": "2018-06-28",
    "date": "2018年6月28日",
    "dayLabel": "第1日目",
    "title": "2018年6月28日 平成30年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=512#one",
    "characters": 752,
    "voices": 7,
    "hasFullText": true
  },
  {
    "id": "h30-20180629-honkaigi",
    "meetingId": "h30-2t",
    "dateIso": "2018-06-29",
    "date": "2018年6月29日",
    "dayLabel": "第2日目",
    "title": "2018年6月29日 平成30年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one",
    "characters": 118633,
    "voices": 109,
    "hasFullText": true
  },
  {
    "id": "h30-20180711-honkaigi",
    "meetingId": "h30-2t",
    "dateIso": "2018-07-11",
    "date": "2018年7月11日",
    "dayLabel": "第3日目",
    "title": "2018年7月11日 平成30年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one",
    "characters": 34036,
    "voices": 96,
    "hasFullText": true
  },
  {
    "id": "h30-20180824-honkaigi",
    "meetingId": "h30-2r",
    "dateIso": "2018-08-24",
    "date": "2018年8月24日",
    "dayLabel": "第1日目",
    "title": "2018年8月24日 平成30年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=756#one",
    "characters": 13161,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h30-20181025-honkaigi",
    "meetingId": "h30-3t",
    "dateIso": "2018-10-25",
    "date": "2018年10月25日",
    "dayLabel": "第1日目",
    "title": "2018年10月25日 平成30年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one",
    "characters": 63450,
    "voices": 86,
    "hasFullText": true
  },
  {
    "id": "h30-20181026-honkaigi",
    "meetingId": "h30-3t",
    "dateIso": "2018-10-26",
    "date": "2018年10月26日",
    "dayLabel": "第2日目",
    "title": "2018年10月26日 平成30年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one",
    "characters": 58400,
    "voices": 96,
    "hasFullText": true
  },
  {
    "id": "h30-20181121-honkaigi",
    "meetingId": "h30-3t",
    "dateIso": "2018-11-21",
    "date": "2018年11月21日",
    "dayLabel": "第3日目",
    "title": "2018年11月21日 平成30年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one",
    "characters": 13525,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h30-20181206-honkaigi",
    "meetingId": "h30-4t",
    "dateIso": "2018-12-06",
    "date": "2018年12月6日",
    "dayLabel": "第1日目",
    "title": "2018年12月6日 平成30年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one",
    "characters": 49758,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h30-20181207-honkaigi",
    "meetingId": "h30-4t",
    "dateIso": "2018-12-07",
    "date": "2018年12月7日",
    "dayLabel": "第2日目",
    "title": "2018年12月7日 平成30年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one",
    "characters": 85489,
    "voices": 86,
    "hasFullText": true
  },
  {
    "id": "h30-20181219-honkaigi",
    "meetingId": "h30-4t",
    "dateIso": "2018-12-19",
    "date": "2018年12月19日",
    "dayLabel": "第3日目",
    "title": "2018年12月19日 平成30年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one",
    "characters": 10564,
    "voices": 29,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h30-1t:x-watabe-shigeru": {
    "sessionId": "h30-20180221-honkaigi",
    "voiceIndex": 8
  },
  "h30-1t:hiroki_wakabayashi": {
    "sessionId": "h30-20180221-honkaigi",
    "voiceIndex": 19
  },
  "h30-1t:x-minami-keiko": {
    "sessionId": "h30-20180221-honkaigi",
    "voiceIndex": 29
  },
  "h30-1t:x-ishida-shingo": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 4
  },
  "h30-1t:saeko_niizuma": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 13
  },
  "h30-1t:taisaku_ando": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 19
  },
  "h30-1t:nobuaki_takahashi": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 36
  },
  "h30-1t:yoshihiro_matsunaga": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 43
  },
  "h30-1t:x-asano-hiroyuki": {
    "sessionId": "h30-20180222-honkaigi",
    "voiceIndex": 50
  },
  "h30-1t:shinji_takahashi": {
    "sessionId": "h30-20180223-honkaigi",
    "voiceIndex": 4
  },
  "h30-2t:chihiro_ishida": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 4
  },
  "h30-2t:hideo_ishida": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 18
  },
  "h30-2t:x-inagawa-takayuki": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 26
  },
  "h30-2t:hiroo_akutsu": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 32
  },
  "h30-2t:takako_nishimoto": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 41
  },
  "h30-2t:x-osawa-shinichi": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 49
  },
  "h30-2t:yumiko_yoshida": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 56
  },
  "h30-2t:x-iinuma-masako": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 70
  },
  "h30-2t:yukari_yokoyama": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 85
  },
  "h30-2t:yoshihiro_tsukamoto": {
    "sessionId": "h30-20180629-honkaigi",
    "voiceIndex": 92
  },
  "h30-3t:yoshihiro_matsunaga": {
    "sessionId": "h30-20181025-honkaigi",
    "voiceIndex": 31
  },
  "h30-3t:shinichiro_tsuru": {
    "sessionId": "h30-20181025-honkaigi",
    "voiceIndex": 37
  },
  "h30-3t:hiroko_suzuki": {
    "sessionId": "h30-20181025-honkaigi",
    "voiceIndex": 45
  },
  "h30-3t:x-suzuki-masumi": {
    "sessionId": "h30-20181025-honkaigi",
    "voiceIndex": 65
  },
  "h30-3t:masanori_fujiwara": {
    "sessionId": "h30-20181025-honkaigi",
    "voiceIndex": 73
  },
  "h30-3t:x-suzuki-hiroshi": {
    "sessionId": "h30-20181026-honkaigi",
    "voiceIndex": 4
  },
  "h30-3t:x-takeuchi-shinobu": {
    "sessionId": "h30-20181026-honkaigi",
    "voiceIndex": 8
  },
  "h30-3t:tsutsui_yosuke": {
    "sessionId": "h30-20181026-honkaigi",
    "voiceIndex": 16
  },
  "h30-3t:x-minami-keiko": {
    "sessionId": "h30-20181026-honkaigi",
    "voiceIndex": 28
  },
  "h30-4t:x-honda-takenobu": {
    "sessionId": "h30-20181206-honkaigi",
    "voiceIndex": 6
  },
  "h30-4t:hiroo_akutsu": {
    "sessionId": "h30-20181206-honkaigi",
    "voiceIndex": 14
  },
  "h30-4t:x-okuno-shinji": {
    "sessionId": "h30-20181206-honkaigi",
    "voiceIndex": 24
  },
  "h30-4t:kengo_kimura": {
    "sessionId": "h30-20181206-honkaigi",
    "voiceIndex": 40
  },
  "h30-4t:yukihiro_sugai": {
    "sessionId": "h30-20181206-honkaigi",
    "voiceIndex": 45
  },
  "h30-4t:toshifumi_nodate": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 6
  },
  "h30-4t:yuichi_watanabe": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 23
  },
  "h30-4t:x-asano-hiroyuki": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 29
  },
  "h30-4t:takahiro_okura": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 35
  },
  "h30-4t:x-ito-masahiro": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 41
  },
  "h30-4t:x-tanaka-sayaka": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 51
  },
  "h30-4t:shinji_takahashi": {
    "sessionId": "h30-20181207-honkaigi",
    "voiceIndex": 70
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
