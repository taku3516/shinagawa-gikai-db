/* 平成28年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h28;
  if (!year) throw new Error("平成28年データの読み込み後に h28-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h28-20160217-honkaigi",
    "meetingId": "h28-1t",
    "meetingName": "平成28年第1回定例会",
    "dateIso": "2016-02-17",
    "date": "2016年2月17日",
    "dayLabel": "第1日目",
    "title": "2016年2月17日 平成28年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=438#one",
    "characters": 61009,
    "voices": 37,
    "hasFullText": true
  },
  {
    "id": "h28-20160218-honkaigi",
    "meetingId": "h28-1t",
    "meetingName": "平成28年第1回定例会",
    "dateIso": "2016-02-18",
    "date": "2016年2月18日",
    "dayLabel": "第2日目",
    "title": "2016年2月18日 平成28年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=440#one",
    "characters": 69781,
    "voices": 61,
    "hasFullText": true
  },
  {
    "id": "h28-20160219-honkaigi",
    "meetingId": "h28-1t",
    "meetingName": "平成28年第1回定例会",
    "dateIso": "2016-02-19",
    "date": "2016年2月19日",
    "dayLabel": "第3日目",
    "title": "2016年2月19日 平成28年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=442#one",
    "characters": 62317,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h28-20160304-honkaigi",
    "meetingId": "h28-1t",
    "meetingName": "平成28年第1回定例会",
    "dateIso": "2016-03-04",
    "date": "2016年3月4日",
    "dayLabel": "第4日目",
    "title": "2016年3月4日 平成28年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=444#one",
    "characters": 2235,
    "voices": 11,
    "hasFullText": true
  },
  {
    "id": "h28-20160323-honkaigi",
    "meetingId": "h28-1t",
    "meetingName": "平成28年第1回定例会",
    "dateIso": "2016-03-23",
    "date": "2016年3月23日",
    "dayLabel": "第5日目",
    "title": "2016年3月23日 平成28年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=446#one",
    "characters": 40614,
    "voices": 84,
    "hasFullText": true
  },
  {
    "id": "h28-20160526-honkaigi",
    "meetingId": "h28-1r",
    "meetingName": "平成28年第1回臨時会",
    "dateIso": "2016-05-26",
    "date": "2016年5月26日",
    "dayLabel": "第1日目",
    "title": "2016年5月26日 平成28年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=750#one",
    "characters": 7714,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h28-20160623-honkaigi",
    "meetingId": "h28-2t",
    "meetingName": "平成28年第2回定例会",
    "dateIso": "2016-06-23",
    "date": "2016年6月23日",
    "dayLabel": "第1日目",
    "title": "2016年6月23日 平成28年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=448#one",
    "characters": 52106,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "h28-20160624-honkaigi",
    "meetingId": "h28-2t",
    "meetingName": "平成28年第2回定例会",
    "dateIso": "2016-06-24",
    "date": "2016年6月24日",
    "dayLabel": "第2日目",
    "title": "2016年6月24日 平成28年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=450#one",
    "characters": 81279,
    "voices": 96,
    "hasFullText": true
  },
  {
    "id": "h28-20160628-honkaigi",
    "meetingId": "h28-2t",
    "meetingName": "平成28年第2回定例会",
    "dateIso": "2016-06-28",
    "date": "2016年6月28日",
    "dayLabel": "第3日目",
    "title": "2016年6月28日 平成28年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=452#one",
    "characters": 7055,
    "voices": 19,
    "hasFullText": true
  },
  {
    "id": "h28-20160707-honkaigi",
    "meetingId": "h28-2t",
    "meetingName": "平成28年第2回定例会",
    "dateIso": "2016-07-07",
    "date": "2016年7月7日",
    "dayLabel": "第4日目",
    "title": "2016年7月7日 平成28年_第２回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=454#one",
    "characters": 23323,
    "voices": 57,
    "hasFullText": true
  },
  {
    "id": "h28-20160923-honkaigi",
    "meetingId": "h28-3t",
    "meetingName": "平成28年第3回定例会",
    "dateIso": "2016-09-23",
    "date": "2016年9月23日",
    "dayLabel": "第1日目",
    "title": "2016年9月23日 平成28年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=456#one",
    "characters": 52276,
    "voices": 40,
    "hasFullText": true
  },
  {
    "id": "h28-20160926-honkaigi",
    "meetingId": "h28-3t",
    "meetingName": "平成28年第3回定例会",
    "dateIso": "2016-09-26",
    "date": "2016年9月26日",
    "dayLabel": "第2日目",
    "title": "2016年9月26日 平成28年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=458#one",
    "characters": 56823,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "h28-20161024-honkaigi",
    "meetingId": "h28-3t",
    "meetingName": "平成28年第3回定例会",
    "dateIso": "2016-10-24",
    "date": "2016年10月24日",
    "dayLabel": "第3日目",
    "title": "2016年10月24日 平成28年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=460#one",
    "characters": 23219,
    "voices": 78,
    "hasFullText": true
  },
  {
    "id": "h28-20161124-honkaigi",
    "meetingId": "h28-4t",
    "meetingName": "平成28年第4回定例会",
    "dateIso": "2016-11-24",
    "date": "2016年11月24日",
    "dayLabel": "第1日目",
    "title": "2016年11月24日 平成28年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=462#one",
    "characters": 48988,
    "voices": 46,
    "hasFullText": true
  },
  {
    "id": "h28-20161125-honkaigi",
    "meetingId": "h28-4t",
    "meetingName": "平成28年第4回定例会",
    "dateIso": "2016-11-25",
    "date": "2016年11月25日",
    "dayLabel": "第2日目",
    "title": "2016年11月25日 平成28年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=464#one",
    "characters": 77615,
    "voices": 90,
    "hasFullText": true
  },
  {
    "id": "h28-20161129-honkaigi",
    "meetingId": "h28-4t",
    "meetingName": "平成28年第4回定例会",
    "dateIso": "2016-11-29",
    "date": "2016年11月29日",
    "dayLabel": "第3日目",
    "title": "2016年11月29日 平成28年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=466#one",
    "characters": 2776,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "h28-20161207-honkaigi",
    "meetingId": "h28-4t",
    "meetingName": "平成28年第4回定例会",
    "dateIso": "2016-12-07",
    "date": "2016年12月7日",
    "dayLabel": "第4日目",
    "title": "2016年12月7日 平成28年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=468#one",
    "characters": 18625,
    "voices": 59,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h28-1t:yuichi_watanabe": {
    "sessionId": "h28-20160217-honkaigi",
    "voiceIndex": 8
  },
  "h28-1t:x-takeuchi-shinobu": {
    "sessionId": "h28-20160217-honkaigi",
    "voiceIndex": 16
  },
  "h28-1t:hiroko_suzuki": {
    "sessionId": "h28-20160217-honkaigi",
    "voiceIndex": 26
  },
  "h28-1t:x-abe-yumiko": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 4
  },
  "h28-1t:yukihiro_sugai": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 15
  },
  "h28-1t:yoshihiro_matsunaga": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 25
  },
  "h28-1t:x-ito-masahiro": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 30
  },
  "h28-1t:hiroo_akutsu": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 39
  },
  "h28-1t:chihiro_ishida": {
    "sessionId": "h28-20160218-honkaigi",
    "voiceIndex": 47
  },
  "h28-1t:masanori_fujiwara": {
    "sessionId": "h28-20160219-honkaigi",
    "voiceIndex": 4
  },
  "h28-1t:nobuaki_takahashi": {
    "sessionId": "h28-20160219-honkaigi",
    "voiceIndex": 17
  },
  "h28-1t:kengo_kimura": {
    "sessionId": "h28-20160219-honkaigi",
    "voiceIndex": 24
  },
  "h28-1t:hiroki_wakabayashi": {
    "sessionId": "h28-20160219-honkaigi",
    "voiceIndex": 29
  },
  "h28-1t:yukari_yokoyama": {
    "sessionId": "h28-20160219-honkaigi",
    "voiceIndex": 36
  },
  "h28-2t:tsutsui_yosuke": {
    "sessionId": "h28-20160623-honkaigi",
    "voiceIndex": 6
  },
  "h28-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h28-20160623-honkaigi",
    "voiceIndex": 16
  },
  "h28-2t:saeko_niizuma": {
    "sessionId": "h28-20160623-honkaigi",
    "voiceIndex": 23
  },
  "h28-2t:toshifumi_nodate": {
    "sessionId": "h28-20160623-honkaigi",
    "voiceIndex": 30
  },
  "h28-2t:x-inagawa-takayuki": {
    "sessionId": "h28-20160623-honkaigi",
    "voiceIndex": 51
  },
  "h28-2t:x-sawada-hirokazu": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 4
  },
  "h28-2t:yumiko_yoshida": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 10
  },
  "h28-2t:takako_nishimoto": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 23
  },
  "h28-2t:hideo_ishida": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 34
  },
  "h28-2t:yoshihiro_tsukamoto": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 43
  },
  "h28-2t:hiroko_suzuki": {
    "sessionId": "h28-20160624-honkaigi",
    "voiceIndex": 52
  },
  "h28-3t:x-suzuki-masumi": {
    "sessionId": "h28-20160923-honkaigi",
    "voiceIndex": 6
  },
  "h28-3t:shinichiro_tsuru": {
    "sessionId": "h28-20160923-honkaigi",
    "voiceIndex": 11
  },
  "h28-3t:ryo_nakatsuka": {
    "sessionId": "h28-20160923-honkaigi",
    "voiceIndex": 20
  },
  "h28-3t:x-ishida-shingo": {
    "sessionId": "h28-20160923-honkaigi",
    "voiceIndex": 31
  },
  "h28-3t:x-suzuki-hiroshi": {
    "sessionId": "h28-20160923-honkaigi",
    "voiceIndex": 36
  },
  "h28-3t:hiroo_akutsu": {
    "sessionId": "h28-20160926-honkaigi",
    "voiceIndex": 4
  },
  "h28-3t:x-watabe-shigeru": {
    "sessionId": "h28-20160926-honkaigi",
    "voiceIndex": 13
  },
  "h28-3t:x-iinuma-masako": {
    "sessionId": "h28-20160926-honkaigi",
    "voiceIndex": 22
  },
  "h28-3t:yukihiro_sugai": {
    "sessionId": "h28-20160926-honkaigi",
    "voiceIndex": 36
  },
  "h28-4t:yoshihiro_tsukamoto": {
    "sessionId": "h28-20161124-honkaigi",
    "voiceIndex": 6
  },
  "h28-4t:chihiro_ishida": {
    "sessionId": "h28-20161124-honkaigi",
    "voiceIndex": 14
  },
  "h28-4t:x-inagawa-takayuki": {
    "sessionId": "h28-20161124-honkaigi",
    "voiceIndex": 29
  },
  "h28-4t:x-honda-takenobu": {
    "sessionId": "h28-20161124-honkaigi",
    "voiceIndex": 33
  },
  "h28-4t:x-tanaka-sayaka": {
    "sessionId": "h28-20161124-honkaigi",
    "voiceIndex": 38
  },
  "h28-4t:yuichi_watanabe": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 4
  },
  "h28-4t:shinji_takahashi": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 9
  },
  "h28-4t:takako_konno": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 21
  },
  "h28-4t:x-minami-keiko": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 30
  },
  "h28-4t:x-abe-yumiko": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 48
  },
  "h28-4t:x-ito-masahiro": {
    "sessionId": "h28-20161125-honkaigi",
    "voiceIndex": 64
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
