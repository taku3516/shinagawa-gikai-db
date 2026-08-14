/* 平成27年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h27;
  if (!year) throw new Error("平成27年データの読み込み後に h27-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h27-20150218-honkaigi",
    "meetingId": "h27-1t",
    "meetingName": "平成27年第1回定例会",
    "dateIso": "2015-02-18",
    "date": "2015年2月18日",
    "dayLabel": "第1日目",
    "title": "2015年2月18日 平成27年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=408#one",
    "characters": 60968,
    "voices": 38,
    "hasFullText": true
  },
  {
    "id": "h27-20150219-honkaigi",
    "meetingId": "h27-1t",
    "meetingName": "平成27年第1回定例会",
    "dateIso": "2015-02-19",
    "date": "2015年2月19日",
    "dayLabel": "第2日目",
    "title": "2015年2月19日 平成27年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=410#one",
    "characters": 75226,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "h27-20150220-honkaigi",
    "meetingId": "h27-1t",
    "meetingName": "平成27年第1回定例会",
    "dateIso": "2015-02-20",
    "date": "2015年2月20日",
    "dayLabel": "第3日目",
    "title": "2015年2月20日 平成27年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=412#one",
    "characters": 48161,
    "voices": 46,
    "hasFullText": true
  },
  {
    "id": "h27-20150305-honkaigi",
    "meetingId": "h27-1t",
    "meetingName": "平成27年第1回定例会",
    "dateIso": "2015-03-05",
    "date": "2015年3月5日",
    "dayLabel": "第4日目",
    "title": "2015年3月5日 平成27年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=414#one",
    "characters": 3165,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "h27-20150327-honkaigi",
    "meetingId": "h27-1t",
    "meetingName": "平成27年第1回定例会",
    "dateIso": "2015-03-27",
    "date": "2015年3月27日",
    "dayLabel": "第5日目",
    "title": "2015年3月27日 平成27年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=416#one",
    "characters": 33352,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "h27-20150526-honkaigi",
    "meetingId": "h27-1r",
    "meetingName": "平成27年第1回臨時会",
    "dateIso": "2015-05-26",
    "date": "2015年5月26日",
    "dayLabel": "第1日目",
    "title": "2015年5月26日 平成27年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=746#one",
    "characters": 10244,
    "voices": 88,
    "hasFullText": true
  },
  {
    "id": "h27-20150527-honkaigi",
    "meetingId": "h27-1r",
    "meetingName": "平成27年第1回臨時会",
    "dateIso": "2015-05-27",
    "date": "2015年5月27日",
    "dayLabel": "第2日目",
    "title": "2015年5月27日 平成27年_第１回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=748#one",
    "characters": 4571,
    "voices": 22,
    "hasFullText": true
  },
  {
    "id": "h27-20150625-honkaigi",
    "meetingId": "h27-2t",
    "meetingName": "平成27年第2回定例会",
    "dateIso": "2015-06-25",
    "date": "2015年6月25日",
    "dayLabel": "第1日目",
    "title": "2015年6月25日 平成27年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=418#one",
    "characters": 52277,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h27-20150626-honkaigi",
    "meetingId": "h27-2t",
    "meetingName": "平成27年第2回定例会",
    "dateIso": "2015-06-26",
    "date": "2015年6月26日",
    "dayLabel": "第2日目",
    "title": "2015年6月26日 平成27年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=420#one",
    "characters": 72106,
    "voices": 82,
    "hasFullText": true
  },
  {
    "id": "h27-20150708-honkaigi",
    "meetingId": "h27-2t",
    "meetingName": "平成27年第2回定例会",
    "dateIso": "2015-07-08",
    "date": "2015年7月8日",
    "dayLabel": "第3日目",
    "title": "2015年7月8日 平成27年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=422#one",
    "characters": 38342,
    "voices": 88,
    "hasFullText": true
  },
  {
    "id": "h27-20150917-honkaigi",
    "meetingId": "h27-3t",
    "meetingName": "平成27年第3回定例会",
    "dateIso": "2015-09-17",
    "date": "2015年9月17日",
    "dayLabel": "第1日目",
    "title": "2015年9月17日 平成27年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=424#one",
    "characters": 56958,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "h27-20150918-honkaigi",
    "meetingId": "h27-3t",
    "meetingName": "平成27年第3回定例会",
    "dateIso": "2015-09-18",
    "date": "2015年9月18日",
    "dayLabel": "第2日目",
    "title": "2015年9月18日 平成27年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=426#one",
    "characters": 56761,
    "voices": 71,
    "hasFullText": true
  },
  {
    "id": "h27-20151023-honkaigi",
    "meetingId": "h27-3t",
    "meetingName": "平成27年第3回定例会",
    "dateIso": "2015-10-23",
    "date": "2015年10月23日",
    "dayLabel": "第3日目",
    "title": "2015年10月23日 平成27年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=428#one",
    "characters": 30266,
    "voices": 78,
    "hasFullText": true
  },
  {
    "id": "h27-20151126-honkaigi",
    "meetingId": "h27-4t",
    "meetingName": "平成27年第4回定例会",
    "dateIso": "2015-11-26",
    "date": "2015年11月26日",
    "dayLabel": "第1日目",
    "title": "2015年11月26日 平成27年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=430#one",
    "characters": 54420,
    "voices": 63,
    "hasFullText": true
  },
  {
    "id": "h27-20151127-honkaigi",
    "meetingId": "h27-4t",
    "meetingName": "平成27年第4回定例会",
    "dateIso": "2015-11-27",
    "date": "2015年11月27日",
    "dayLabel": "第2日目",
    "title": "2015年11月27日 平成27年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=432#one",
    "characters": 75193,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "h27-20151130-honkaigi",
    "meetingId": "h27-4t",
    "meetingName": "平成27年第4回定例会",
    "dateIso": "2015-11-30",
    "date": "2015年11月30日",
    "dayLabel": "第3日目",
    "title": "2015年11月30日 平成27年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=434#one",
    "characters": 2905,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "h27-20151209-honkaigi",
    "meetingId": "h27-4t",
    "meetingName": "平成27年第4回定例会",
    "dateIso": "2015-12-09",
    "date": "2015年12月9日",
    "dayLabel": "第4日目",
    "title": "2015年12月9日 平成27年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=436#one",
    "characters": 31089,
    "voices": 74,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h27-1t:x-ito-masahiro": {
    "sessionId": "h27-20150218-honkaigi",
    "voiceIndex": 9
  },
  "h27-1t:x-asano-hiroyuki": {
    "sessionId": "h27-20150218-honkaigi",
    "voiceIndex": 20
  },
  "h27-1t:x-inagawa-takayuki": {
    "sessionId": "h27-20150218-honkaigi",
    "voiceIndex": 30
  },
  "h27-1t:x-minami-keiko": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 4
  },
  "h27-1t:yukihiro_sugai": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 18
  },
  "h27-1t:yukari_yokoyama": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 29
  },
  "h27-1t:hiroo_akutsu": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 37
  },
  "h27-1t:yoshihiro_matsunaga": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 45
  },
  "h27-1t:ryo_nakatsuka": {
    "sessionId": "h27-20150219-honkaigi",
    "voiceIndex": 52
  },
  "h27-1t:x-yamamoto-keiko": {
    "sessionId": "h27-20150220-honkaigi",
    "voiceIndex": 4
  },
  "h27-1t:x-abe-yumiko": {
    "sessionId": "h27-20150220-honkaigi",
    "voiceIndex": 10
  },
  "h27-1t:x-hara-kozo": {
    "sessionId": "h27-20150220-honkaigi",
    "voiceIndex": 23
  },
  "h27-2t:yukari_yokoyama": {
    "sessionId": "h27-20150625-honkaigi",
    "voiceIndex": 6
  },
  "h27-2t:hiroki_wakabayashi": {
    "sessionId": "h27-20150625-honkaigi",
    "voiceIndex": 13
  },
  "h27-2t:taisaku_ando": {
    "sessionId": "h27-20150625-honkaigi",
    "voiceIndex": 22
  },
  "h27-2t:kengo_kimura": {
    "sessionId": "h27-20150625-honkaigi",
    "voiceIndex": 40
  },
  "h27-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h27-20150625-honkaigi",
    "voiceIndex": 46
  },
  "h27-2t:shinichiro_tsuru": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 4
  },
  "h27-2t:x-iinuma-masako": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 13
  },
  "h27-2t:yukihiro_sugai": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 31
  },
  "h27-2t:x-sawada-hirokazu": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 39
  },
  "h27-2t:yumiko_yoshida": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 45
  },
  "h27-2t:takako_nishimoto": {
    "sessionId": "h27-20150626-honkaigi",
    "voiceIndex": 55
  },
  "h27-3t:saeko_niizuma": {
    "sessionId": "h27-20150917-honkaigi",
    "voiceIndex": 6
  },
  "h27-3t:hideo_ishida": {
    "sessionId": "h27-20150917-honkaigi",
    "voiceIndex": 12
  },
  "h27-3t:hiroko_suzuki": {
    "sessionId": "h27-20150917-honkaigi",
    "voiceIndex": 21
  },
  "h27-3t:x-inagawa-takayuki": {
    "sessionId": "h27-20150917-honkaigi",
    "voiceIndex": 36
  },
  "h27-3t:x-suzuki-masumi": {
    "sessionId": "h27-20150917-honkaigi",
    "voiceIndex": 43
  },
  "h27-3t:x-takeuchi-shinobu": {
    "sessionId": "h27-20150918-honkaigi",
    "voiceIndex": 4
  },
  "h27-3t:tsutsui_yosuke": {
    "sessionId": "h27-20150918-honkaigi",
    "voiceIndex": 13
  },
  "h27-3t:toshifumi_nodate": {
    "sessionId": "h27-20150918-honkaigi",
    "voiceIndex": 25
  },
  "h27-3t:x-suzuki-hiroshi": {
    "sessionId": "h27-20150918-honkaigi",
    "voiceIndex": 37
  },
  "h27-4t:x-minami-keiko": {
    "sessionId": "h27-20151126-honkaigi",
    "voiceIndex": 6
  },
  "h27-4t:x-watabe-shigeru": {
    "sessionId": "h27-20151126-honkaigi",
    "voiceIndex": 28
  },
  "h27-4t:takahiro_okura": {
    "sessionId": "h27-20151126-honkaigi",
    "voiceIndex": 37
  },
  "h27-4t:shinichiro_tsuru": {
    "sessionId": "h27-20151126-honkaigi",
    "voiceIndex": 43
  },
  "h27-4t:x-tanaka-sayaka": {
    "sessionId": "h27-20151126-honkaigi",
    "voiceIndex": 54
  },
  "h27-4t:x-honda-takenobu": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 4
  },
  "h27-4t:x-ishida-shingo": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 10
  },
  "h27-4t:ryo_nakatsuka": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 17
  },
  "h27-4t:takako_konno": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 31
  },
  "h27-4t:yuichi_watanabe": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 39
  },
  "h27-4t:shinji_takahashi": {
    "sessionId": "h27-20151127-honkaigi",
    "voiceIndex": 46
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
