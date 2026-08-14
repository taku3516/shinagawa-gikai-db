/* 令和2年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r02;
  if (!year) throw new Error("令和2年データの読み込み後に r02-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r02-20200219-honkaigi",
    "meetingId": "r02-1t",
    "meetingName": "令和2年第1回定例会",
    "dateIso": "2020-02-19",
    "date": "2020年2月19日",
    "dayLabel": "第1日目",
    "title": "2020年2月19日 令和２年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=558#one",
    "characters": 61568,
    "voices": 39,
    "hasFullText": true
  },
  {
    "id": "r02-20200220-honkaigi",
    "meetingId": "r02-1t",
    "meetingName": "令和2年第1回定例会",
    "dateIso": "2020-02-20",
    "date": "2020年2月20日",
    "dayLabel": "第2日目",
    "title": "2020年2月20日 令和２年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=560#one",
    "characters": 74392,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "r02-20200221-honkaigi",
    "meetingId": "r02-1t",
    "meetingName": "令和2年第1回定例会",
    "dateIso": "2020-02-21",
    "date": "2020年2月21日",
    "dayLabel": "第3日目",
    "title": "2020年2月21日 令和２年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=562#one",
    "characters": 42033,
    "voices": 47,
    "hasFullText": true
  },
  {
    "id": "r02-20200306-honkaigi",
    "meetingId": "r02-1t",
    "meetingName": "令和2年第1回定例会",
    "dateIso": "2020-03-06",
    "date": "2020年3月6日",
    "dayLabel": "第4日目",
    "title": "2020年3月6日 令和２年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=564#one",
    "characters": 1964,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "r02-20200327-honkaigi",
    "meetingId": "r02-1t",
    "meetingName": "令和2年第1回定例会",
    "dateIso": "2020-03-27",
    "date": "2020年3月27日",
    "dayLabel": "第5日目",
    "title": "2020年3月27日 令和２年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=566#one",
    "characters": 36717,
    "voices": 107,
    "hasFullText": true
  },
  {
    "id": "r02-20200512-honkaigi",
    "meetingId": "r02-1r",
    "meetingName": "令和2年第1回臨時会",
    "dateIso": "2020-05-12",
    "date": "2020年5月12日",
    "dayLabel": "第1日目",
    "title": "2020年5月12日 令和２年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=760#one",
    "characters": 8427,
    "voices": 32,
    "hasFullText": true
  },
  {
    "id": "r02-20200527-honkaigi",
    "meetingId": "r02-2r",
    "meetingName": "令和2年第2回臨時会",
    "dateIso": "2020-05-27",
    "date": "2020年5月27日",
    "dayLabel": "第1日目",
    "title": "2020年5月27日 令和２年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=762#one",
    "characters": 4201,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "r02-20200625-honkaigi",
    "meetingId": "r02-2t",
    "meetingName": "令和2年第2回定例会",
    "dateIso": "2020-06-25",
    "date": "2020年6月25日",
    "dayLabel": "第1日目",
    "title": "2020年6月25日 令和２年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=568#one",
    "characters": 56701,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "r02-20200626-honkaigi",
    "meetingId": "r02-2t",
    "meetingName": "令和2年第2回定例会",
    "dateIso": "2020-06-26",
    "date": "2020年6月26日",
    "dayLabel": "第2日目",
    "title": "2020年6月26日 令和２年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=570#one",
    "characters": 76057,
    "voices": 87,
    "hasFullText": true
  },
  {
    "id": "r02-20200630-honkaigi",
    "meetingId": "r02-2t",
    "meetingName": "令和2年第2回定例会",
    "dateIso": "2020-06-30",
    "date": "2020年6月30日",
    "dayLabel": "第3日目",
    "title": "2020年6月30日 令和２年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=572#one",
    "characters": 4842,
    "voices": 17,
    "hasFullText": true
  },
  {
    "id": "r02-20200708-honkaigi",
    "meetingId": "r02-2t",
    "meetingName": "令和2年第2回定例会",
    "dateIso": "2020-07-08",
    "date": "2020年7月8日",
    "dayLabel": "第4日目",
    "title": "2020年7月8日 令和２年_第２回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=574#one",
    "characters": 19443,
    "voices": 61,
    "hasFullText": true
  },
  {
    "id": "r02-20200917-honkaigi",
    "meetingId": "r02-3t",
    "meetingName": "令和2年第3回定例会",
    "dateIso": "2020-09-17",
    "date": "2020年9月17日",
    "dayLabel": "第1日目",
    "title": "2020年9月17日 令和２年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=576#one",
    "characters": 54525,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "r02-20200918-honkaigi",
    "meetingId": "r02-3t",
    "meetingName": "令和2年第3回定例会",
    "dateIso": "2020-09-18",
    "date": "2020年9月18日",
    "dayLabel": "第2日目",
    "title": "2020年9月18日 令和２年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=578#one",
    "characters": 53480,
    "voices": 63,
    "hasFullText": true
  },
  {
    "id": "r02-20200924-honkaigi",
    "meetingId": "r02-3t",
    "meetingName": "令和2年第3回定例会",
    "dateIso": "2020-09-24",
    "date": "2020年9月24日",
    "dayLabel": "第3日目",
    "title": "2020年9月24日 令和２年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=580#one",
    "characters": 4553,
    "voices": 17,
    "hasFullText": true
  },
  {
    "id": "r02-20201022-honkaigi",
    "meetingId": "r02-3t",
    "meetingName": "令和2年第3回定例会",
    "dateIso": "2020-10-22",
    "date": "2020年10月22日",
    "dayLabel": "第4日目",
    "title": "2020年10月22日 令和２年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=582#one",
    "characters": 21339,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "r02-20201126-honkaigi",
    "meetingId": "r02-4t",
    "meetingName": "令和2年第4回定例会",
    "dateIso": "2020-11-26",
    "date": "2020年11月26日",
    "dayLabel": "第1日目",
    "title": "2020年11月26日 令和２年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=584#one",
    "characters": 57100,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "r02-20201127-honkaigi",
    "meetingId": "r02-4t",
    "meetingName": "令和2年第4回定例会",
    "dateIso": "2020-11-27",
    "date": "2020年11月27日",
    "dayLabel": "第2日目",
    "title": "2020年11月27日 令和２年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=586#one",
    "characters": 77487,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "r02-20201130-honkaigi",
    "meetingId": "r02-4t",
    "meetingName": "令和2年第4回定例会",
    "dateIso": "2020-11-30",
    "date": "2020年11月30日",
    "dayLabel": "第3日目",
    "title": "2020年11月30日 令和２年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=588#one",
    "characters": 2950,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "r02-20201210-honkaigi",
    "meetingId": "r02-4t",
    "meetingName": "令和2年第4回定例会",
    "dateIso": "2020-12-10",
    "date": "2020年12月10日",
    "dayLabel": "第4日目",
    "title": "2020年12月10日 令和２年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=590#one",
    "characters": 22855,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "r02-20201223-honkaigi",
    "meetingId": "r02-3r",
    "meetingName": "令和2年第3回臨時会",
    "dateIso": "2020-12-23",
    "date": "2020年12月23日",
    "dayLabel": "第1日目",
    "title": "2020年12月23日 令和２年_第３回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=764#one",
    "characters": 2260,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "r02-20201225-honkaigi",
    "meetingId": "r02-3r",
    "meetingName": "令和2年第3回臨時会",
    "dateIso": "2020-12-25",
    "date": "2020年12月25日",
    "dayLabel": "第2日目",
    "title": "2020年12月25日 令和２年_第３回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=766#one",
    "characters": 39750,
    "voices": 41,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r02-1t:hideo_ishida": {
    "sessionId": "r02-20200219-honkaigi",
    "voiceIndex": 9
  },
  "r02-1t:x-osawa-shinichi": {
    "sessionId": "r02-20200219-honkaigi",
    "voiceIndex": 21
  },
  "r02-1t:hiroki_wakabayashi": {
    "sessionId": "r02-20200219-honkaigi",
    "voiceIndex": 27
  },
  "r02-1t:hiroko_suzuki": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 4
  },
  "r02-1t:yukihiro_sugai": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 21
  },
  "r02-1t:x-okuno-shinji": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 30
  },
  "r02-1t:arata_koshiba": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 46
  },
  "r02-1t:mari_seo": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 53
  },
  "r02-1t:shinichiro_tsuru": {
    "sessionId": "r02-20200220-honkaigi",
    "voiceIndex": 58
  },
  "r02-1t:masanori_fujiwara": {
    "sessionId": "r02-20200221-honkaigi",
    "voiceIndex": 4
  },
  "r02-1t:x-serizawa-yujiro": {
    "sessionId": "r02-20200221-honkaigi",
    "voiceIndex": 12
  },
  "r02-1t:x-kuniba-yudai": {
    "sessionId": "r02-20200221-honkaigi",
    "voiceIndex": 20
  },
  "r02-2t:yukihiro_sugai": {
    "sessionId": "r02-20200625-honkaigi",
    "voiceIndex": 6
  },
  "r02-2t:x-suzuki-masumi": {
    "sessionId": "r02-20200625-honkaigi",
    "voiceIndex": 15
  },
  "r02-2t:x-suzuki-hiroshi": {
    "sessionId": "r02-20200625-honkaigi",
    "voiceIndex": 24
  },
  "r02-2t:hiroo_akutsu": {
    "sessionId": "r02-20200625-honkaigi",
    "voiceIndex": 29
  },
  "r02-2t:x-abe-yumiko": {
    "sessionId": "r02-20200625-honkaigi",
    "voiceIndex": 41
  },
  "r02-2t:ryo_nakatsuka": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 4
  },
  "r02-2t:naoko_nishimura": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 17
  },
  "r02-2t:yumiko_yoshida": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 24
  },
  "r02-2t:takahiro_okura": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 41
  },
  "r02-2t:takako_konno": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 48
  },
  "r02-2t:tokihiro_matsumoto": {
    "sessionId": "r02-20200626-honkaigi",
    "voiceIndex": 59
  },
  "r02-3t:x-honda-takenobu": {
    "sessionId": "r02-20200917-honkaigi",
    "voiceIndex": 6
  },
  "r02-3t:x-osawa-shinichi": {
    "sessionId": "r02-20200917-honkaigi",
    "voiceIndex": 15
  },
  "r02-3t:shinichiro_tsuru": {
    "sessionId": "r02-20200917-honkaigi",
    "voiceIndex": 23
  },
  "r02-3t:chihiro_ishida": {
    "sessionId": "r02-20200917-honkaigi",
    "voiceIndex": 32
  },
  "r02-3t:yukari_yokoyama": {
    "sessionId": "r02-20200917-honkaigi",
    "voiceIndex": 42
  },
  "r02-3t:kengo_kimura": {
    "sessionId": "r02-20200918-honkaigi",
    "voiceIndex": 4
  },
  "r02-3t:hiroki_wakabayashi": {
    "sessionId": "r02-20200918-honkaigi",
    "voiceIndex": 10
  },
  "r02-3t:taisaku_ando": {
    "sessionId": "r02-20200918-honkaigi",
    "voiceIndex": 17
  },
  "r02-3t:tsutsui_yosuke": {
    "sessionId": "r02-20200918-honkaigi",
    "voiceIndex": 31
  },
  "r02-4t:kazumasa_matsuzawa": {
    "sessionId": "r02-20201126-honkaigi",
    "voiceIndex": 6
  },
  "r02-4t:x-okuno-shinji": {
    "sessionId": "r02-20201126-honkaigi",
    "voiceIndex": 14
  },
  "r02-4t:hiroo_akutsu": {
    "sessionId": "r02-20201126-honkaigi",
    "voiceIndex": 31
  },
  "r02-4t:x-yuzawa-kazutaka": {
    "sessionId": "r02-20201126-honkaigi",
    "voiceIndex": 39
  },
  "r02-4t:shinji_takahashi": {
    "sessionId": "r02-20201126-honkaigi",
    "voiceIndex": 48
  },
  "r02-4t:x-serizawa-yujiro": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 4
  },
  "r02-4t:mari_seo": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 11
  },
  "r02-4t:takako_konno": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 16
  },
  "r02-4t:toshifumi_nodate": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 22
  },
  "r02-4t:x-tanaka-sayaka": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 37
  },
  "r02-4t:takako_nishimoto": {
    "sessionId": "r02-20201127-honkaigi",
    "voiceIndex": 57
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
