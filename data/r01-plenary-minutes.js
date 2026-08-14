/* 令和元年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r01;
  if (!year) throw new Error("令和元年データの読み込み後に r01-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r01-20190220-honkaigi",
    "meetingId": "r01-1t",
    "dateIso": "2019-02-20",
    "date": "2019年2月20日",
    "dayLabel": "第1日目",
    "title": "2019年2月20日 平成31年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=530#one",
    "characters": 65843,
    "voices": 42,
    "hasFullText": true
  },
  {
    "id": "r01-20190221-honkaigi",
    "meetingId": "r01-1t",
    "dateIso": "2019-02-21",
    "date": "2019年2月21日",
    "dayLabel": "第2日目",
    "title": "2019年2月21日 平成31年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=532#one",
    "characters": 76336,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "r01-20190222-honkaigi",
    "meetingId": "r01-1t",
    "dateIso": "2019-02-22",
    "date": "2019年2月22日",
    "dayLabel": "第3日目",
    "title": "2019年2月22日 平成31年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=534#one",
    "characters": 21674,
    "voices": 30,
    "hasFullText": true
  },
  {
    "id": "r01-20190307-honkaigi",
    "meetingId": "r01-1t",
    "dateIso": "2019-03-07",
    "date": "2019年3月7日",
    "dayLabel": "第4日目",
    "title": "2019年3月7日 平成31年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=536#one",
    "characters": 1970,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "r01-20190326-honkaigi",
    "meetingId": "r01-1t",
    "dateIso": "2019-03-26",
    "date": "2019年3月26日",
    "dayLabel": "第5日目",
    "title": "2019年3月26日 平成31年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=538#one",
    "characters": 36420,
    "voices": 77,
    "hasFullText": true
  },
  {
    "id": "r01-20190627-honkaigi",
    "meetingId": "r01-2t",
    "dateIso": "2019-06-27",
    "date": "2019年6月27日",
    "dayLabel": "第1日目",
    "title": "2019年6月27日 令和元年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=540#one",
    "characters": 58061,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "r01-20190628-honkaigi",
    "meetingId": "r01-2t",
    "dateIso": "2019-06-28",
    "date": "2019年6月28日",
    "dayLabel": "第2日目",
    "title": "2019年6月28日 令和元年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=542#one",
    "characters": 61164,
    "voices": 74,
    "hasFullText": true
  },
  {
    "id": "r01-20190710-honkaigi",
    "meetingId": "r01-2t",
    "dateIso": "2019-07-10",
    "date": "2019年7月10日",
    "dayLabel": "第3日目",
    "title": "2019年7月10日 令和元年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=544#one",
    "characters": 20720,
    "voices": 50,
    "hasFullText": true
  },
  {
    "id": "r01-20190919-honkaigi",
    "meetingId": "r01-3t",
    "dateIso": "2019-09-19",
    "date": "2019年9月19日",
    "dayLabel": "第1日目",
    "title": "2019年9月19日 令和元年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=546#one",
    "characters": 55776,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "r01-20190920-honkaigi",
    "meetingId": "r01-3t",
    "dateIso": "2019-09-20",
    "date": "2019年9月20日",
    "dayLabel": "第2日目",
    "title": "2019年9月20日 令和元年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=548#one",
    "characters": 75497,
    "voices": 98,
    "hasFullText": true
  },
  {
    "id": "r01-20191023-honkaigi",
    "meetingId": "r01-3t",
    "dateIso": "2019-10-23",
    "date": "2019年10月23日",
    "dayLabel": "第3日目",
    "title": "2019年10月23日 令和元年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=550#one",
    "characters": 20178,
    "voices": 61,
    "hasFullText": true
  },
  {
    "id": "r01-20191128-honkaigi",
    "meetingId": "r01-4t",
    "dateIso": "2019-11-28",
    "date": "2019年11月28日",
    "dayLabel": "第1日目",
    "title": "2019年11月28日 令和元年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=552#one",
    "characters": 63475,
    "voices": 61,
    "hasFullText": true
  },
  {
    "id": "r01-20191129-honkaigi",
    "meetingId": "r01-4t",
    "dateIso": "2019-11-29",
    "date": "2019年11月29日",
    "dayLabel": "第2日目",
    "title": "2019年11月29日 令和元年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=554#one",
    "characters": 86680,
    "voices": 98,
    "hasFullText": true
  },
  {
    "id": "r01-20191212-honkaigi",
    "meetingId": "r01-4t",
    "dateIso": "2019-12-12",
    "date": "2019年12月12日",
    "dayLabel": "第3日目",
    "title": "2019年12月12日 令和元年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=556#one",
    "characters": 12003,
    "voices": 27,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r01-2t:nobuaki_takahashi": {
    "sessionId": "r01-20190627-honkaigi",
    "voiceIndex": 13
  },
  "r01-2t:hideo_ishida": {
    "sessionId": "r01-20190627-honkaigi",
    "voiceIndex": 21
  },
  "r01-2t:yoshihiro_tsukamoto": {
    "sessionId": "r01-20190627-honkaigi",
    "voiceIndex": 29
  },
  "r01-2t:hiroko_suzuki": {
    "sessionId": "r01-20190627-honkaigi",
    "voiceIndex": 39
  },
  "r01-2t:takako_nishimoto": {
    "sessionId": "r01-20190627-honkaigi",
    "voiceIndex": 56
  },
  "r01-2t:kengo_kimura": {
    "sessionId": "r01-20190628-honkaigi",
    "voiceIndex": 4
  },
  "r01-2t:x-serizawa-yujiro": {
    "sessionId": "r01-20190628-honkaigi",
    "voiceIndex": 10
  },
  "r01-2t:takako_konno": {
    "sessionId": "r01-20190628-honkaigi",
    "voiceIndex": 15
  },
  "r01-2t:yumiko_yoshida": {
    "sessionId": "r01-20190628-honkaigi",
    "voiceIndex": 24
  },
  "r01-2t:tokihiro_matsumoto": {
    "sessionId": "r01-20190628-honkaigi",
    "voiceIndex": 35
  },
  "r01-3t:x-suzuki-masumi": {
    "sessionId": "r01-20190919-honkaigi",
    "voiceIndex": 6
  },
  "r01-3t:saeko_niizuma": {
    "sessionId": "r01-20190919-honkaigi",
    "voiceIndex": 15
  },
  "r01-3t:taisaku_ando": {
    "sessionId": "r01-20190919-honkaigi",
    "voiceIndex": 23
  },
  "r01-3t:x-osawa-shinichi": {
    "sessionId": "r01-20190919-honkaigi",
    "voiceIndex": 40
  },
  "r01-3t:tsutsui_yosuke": {
    "sessionId": "r01-20190919-honkaigi",
    "voiceIndex": 45
  },
  "r01-3t:hiroo_akutsu": {
    "sessionId": "r01-20190920-honkaigi",
    "voiceIndex": 4
  },
  "r01-3t:takahiro_okura": {
    "sessionId": "r01-20190920-honkaigi",
    "voiceIndex": 12
  },
  "r01-3t:naoko_nishimura": {
    "sessionId": "r01-20190920-honkaigi",
    "voiceIndex": 19
  },
  "r01-3t:ryo_nakatsuka": {
    "sessionId": "r01-20190920-honkaigi",
    "voiceIndex": 25
  },
  "r01-3t:x-abe-yumiko": {
    "sessionId": "r01-20190920-honkaigi",
    "voiceIndex": 37
  },
  "r01-4t:yoshihiro_tsukamoto": {
    "sessionId": "r01-20191128-honkaigi",
    "voiceIndex": 6
  },
  "r01-4t:chihiro_ishida": {
    "sessionId": "r01-20191128-honkaigi",
    "voiceIndex": 14
  },
  "r01-4t:yukari_yokoyama": {
    "sessionId": "r01-20191128-honkaigi",
    "voiceIndex": 32
  },
  "r01-4t:x-honda-takenobu": {
    "sessionId": "r01-20191128-honkaigi",
    "voiceIndex": 39
  },
  "r01-4t:shinji_takahashi": {
    "sessionId": "r01-20191128-honkaigi",
    "voiceIndex": 45
  },
  "r01-4t:x-watabe-shigeru": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 4
  },
  "r01-4t:yukihiro_sugai": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 10
  },
  "r01-4t:x-tanaka-sayaka": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 23
  },
  "r01-4t:toshifumi_nodate": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 40
  },
  "r01-4t:kazumasa_matsuzawa": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 57
  },
  "r01-4t:hiroki_wakabayashi": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 66
  },
  "r01-4t:x-yuzawa-kazutaka": {
    "sessionId": "r01-20191129-honkaigi",
    "voiceIndex": 71
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
