/* 令和4年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r04;
  if (!year) throw new Error("令和4年データの読み込み後に r04-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r04-20220217-honkaigi",
    "meetingId": "r04-1t",
    "meetingName": "令和4年第1回定例会",
    "dateIso": "2022-02-17",
    "date": "2022年2月17日",
    "dayLabel": "第1日目",
    "title": "2022年2月17日 令和４年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=620#one",
    "characters": 48263,
    "voices": 33,
    "hasFullText": true
  },
  {
    "id": "r04-20220218-honkaigi",
    "meetingId": "r04-1t",
    "meetingName": "令和4年第1回定例会",
    "dateIso": "2022-02-18",
    "date": "2022年2月18日",
    "dayLabel": "第2日目",
    "title": "2022年2月18日 令和４年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=622#one",
    "characters": 70752,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "r04-20220221-honkaigi",
    "meetingId": "r04-1t",
    "meetingName": "令和4年第1回定例会",
    "dateIso": "2022-02-21",
    "date": "2022年2月21日",
    "dayLabel": "第3日目",
    "title": "2022年2月21日 令和４年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=624#one",
    "characters": 33289,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "r04-20220307-honkaigi",
    "meetingId": "r04-1t",
    "meetingName": "令和4年第1回定例会",
    "dateIso": "2022-03-07",
    "date": "2022年3月7日",
    "dayLabel": "第4日目",
    "title": "2022年3月7日 令和４年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=626#one",
    "characters": 4321,
    "voices": 23,
    "hasFullText": true
  },
  {
    "id": "r04-20220325-honkaigi",
    "meetingId": "r04-1t",
    "meetingName": "令和4年第1回定例会",
    "dateIso": "2022-03-25",
    "date": "2022年3月25日",
    "dayLabel": "第5日目",
    "title": "2022年3月25日 令和４年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=628#one",
    "characters": 35740,
    "voices": 88,
    "hasFullText": true
  },
  {
    "id": "r04-20220527-honkaigi",
    "meetingId": "r04-1r",
    "meetingName": "令和4年第1回臨時会",
    "dateIso": "2022-05-27",
    "date": "2022年5月27日",
    "dayLabel": "第1日目",
    "title": "2022年5月27日 令和４年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=772#one",
    "characters": 8189,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "r04-20220623-honkaigi",
    "meetingId": "r04-2t",
    "meetingName": "令和4年第2回定例会",
    "dateIso": "2022-06-23",
    "date": "2022年6月23日",
    "dayLabel": "第1日目",
    "title": "2022年6月23日 令和４年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=630#one",
    "characters": 48384,
    "voices": 60,
    "hasFullText": true
  },
  {
    "id": "r04-20220624-honkaigi",
    "meetingId": "r04-2t",
    "meetingName": "令和4年第2回定例会",
    "dateIso": "2022-06-24",
    "date": "2022年6月24日",
    "dayLabel": "第2日目",
    "title": "2022年6月24日 令和４年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=632#one",
    "characters": 56151,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "r04-20220707-honkaigi",
    "meetingId": "r04-2t",
    "meetingName": "令和4年第2回定例会",
    "dateIso": "2022-07-07",
    "date": "2022年7月7日",
    "dayLabel": "第3日目",
    "title": "2022年7月7日 令和４年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=634#one",
    "characters": 24301,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "r04-20221027-honkaigi",
    "meetingId": "r04-3t",
    "meetingName": "令和4年第3回定例会",
    "dateIso": "2022-10-27",
    "date": "2022年10月27日",
    "dayLabel": "第1日目",
    "title": "2022年10月27日 令和４年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=636#one",
    "characters": 58571,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "r04-20221028-honkaigi",
    "meetingId": "r04-3t",
    "meetingName": "令和4年第3回定例会",
    "dateIso": "2022-10-28",
    "date": "2022年10月28日",
    "dayLabel": "第2日目",
    "title": "2022年10月28日 令和４年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=638#one",
    "characters": 78205,
    "voices": 116,
    "hasFullText": true
  },
  {
    "id": "r04-20221102-honkaigi",
    "meetingId": "r04-3t",
    "meetingName": "令和4年第3回定例会",
    "dateIso": "2022-11-02",
    "date": "2022年11月2日",
    "dayLabel": "第3日目",
    "title": "2022年11月2日 令和４年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=640#one",
    "characters": 3684,
    "voices": 15,
    "hasFullText": true
  },
  {
    "id": "r04-20221125-honkaigi",
    "meetingId": "r04-3t",
    "meetingName": "令和4年第3回定例会",
    "dateIso": "2022-11-25",
    "date": "2022年11月25日",
    "dayLabel": "第4日目",
    "title": "2022年11月25日 令和４年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=642#one",
    "characters": 18322,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "r04-20221220-honkaigi",
    "meetingId": "r04-4t",
    "meetingName": "令和4年第4回定例会",
    "dateIso": "2022-12-20",
    "date": "2022年12月20日",
    "dayLabel": "第1日目",
    "title": "2022年12月20日 令和４年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=644#one",
    "characters": 68410,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "r04-20221221-honkaigi",
    "meetingId": "r04-4t",
    "meetingName": "令和4年第4回定例会",
    "dateIso": "2022-12-21",
    "date": "2022年12月21日",
    "dayLabel": "第2日目",
    "title": "2022年12月21日 令和４年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=646#one",
    "characters": 62474,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "r04-20221223-honkaigi",
    "meetingId": "r04-4t",
    "meetingName": "令和4年第4回定例会",
    "dateIso": "2022-12-23",
    "date": "2022年12月23日",
    "dayLabel": "第3日目",
    "title": "2022年12月23日 令和４年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=648#one",
    "characters": 4820,
    "voices": 17,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r04-1t:hideo_ishida": {
    "sessionId": "r04-20220217-honkaigi",
    "voiceIndex": 8
  },
  "r04-1t:hiroki_wakabayashi": {
    "sessionId": "r04-20220217-honkaigi",
    "voiceIndex": 19
  },
  "r04-1t:nobuaki_takahashi": {
    "sessionId": "r04-20220217-honkaigi",
    "voiceIndex": 29
  },
  "r04-1t:taisaku_ando": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 4
  },
  "r04-1t:yukihiro_sugai": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 21
  },
  "r04-1t:shinichiro_tsuru": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 31
  },
  "r04-1t:yukari_yokoyama": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 39
  },
  "r04-1t:x-okuno-shinji": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 48
  },
  "r04-1t:naoko_nishimura": {
    "sessionId": "r04-20220218-honkaigi",
    "voiceIndex": 64
  },
  "r04-1t:masanori_fujiwara": {
    "sessionId": "r04-20220221-honkaigi",
    "voiceIndex": 4
  },
  "r04-1t:x-yuzawa-kazutaka": {
    "sessionId": "r04-20220221-honkaigi",
    "voiceIndex": 15
  },
  "r04-2t:chihiro_ishida": {
    "sessionId": "r04-20220623-honkaigi",
    "voiceIndex": 11
  },
  "r04-2t:x-watabe-shigeru": {
    "sessionId": "r04-20220623-honkaigi",
    "voiceIndex": 30
  },
  "r04-2t:takako_konno": {
    "sessionId": "r04-20220623-honkaigi",
    "voiceIndex": 37
  },
  "r04-2t:yumiko_yoshida": {
    "sessionId": "r04-20220623-honkaigi",
    "voiceIndex": 44
  },
  "r04-2t:kengo_kimura": {
    "sessionId": "r04-20220624-honkaigi",
    "voiceIndex": 4
  },
  "r04-2t:kazumasa_matsuzawa": {
    "sessionId": "r04-20220624-honkaigi",
    "voiceIndex": 9
  },
  "r04-2t:takako_nishimoto": {
    "sessionId": "r04-20220624-honkaigi",
    "voiceIndex": 16
  },
  "r04-2t:arata_koshiba": {
    "sessionId": "r04-20220624-honkaigi",
    "voiceIndex": 27
  },
  "r04-2t:x-takeuchi-shinobu": {
    "sessionId": "r04-20220624-honkaigi",
    "voiceIndex": 34
  },
  "r04-3t:x-suzuki-masumi": {
    "sessionId": "r04-20221027-honkaigi",
    "voiceIndex": 7
  },
  "r04-3t:saeko_niizuma": {
    "sessionId": "r04-20221027-honkaigi",
    "voiceIndex": 16
  },
  "r04-3t:taisaku_ando": {
    "sessionId": "r04-20221027-honkaigi",
    "voiceIndex": 23
  },
  "r04-3t:yukihiro_sugai": {
    "sessionId": "r04-20221027-honkaigi",
    "voiceIndex": 40
  },
  "r04-3t:shinji_takahashi": {
    "sessionId": "r04-20221027-honkaigi",
    "voiceIndex": 53
  },
  "r04-3t:x-suzuki-hiroshi": {
    "sessionId": "r04-20221028-honkaigi",
    "voiceIndex": 4
  },
  "r04-3t:hiroo_akutsu": {
    "sessionId": "r04-20221028-honkaigi",
    "voiceIndex": 9
  },
  "r04-3t:tokihiro_matsumoto": {
    "sessionId": "r04-20221028-honkaigi",
    "voiceIndex": 18
  },
  "r04-3t:hiroko_suzuki": {
    "sessionId": "r04-20221028-honkaigi",
    "voiceIndex": 29
  },
  "r04-3t:x-yuzawa-kazutaka": {
    "sessionId": "r04-20221028-honkaigi",
    "voiceIndex": 51
  },
  "r04-4t:yoshihiro_matsunaga": {
    "sessionId": "r04-20221220-honkaigi",
    "voiceIndex": 9
  },
  "r04-4t:takako_konno": {
    "sessionId": "r04-20221220-honkaigi",
    "voiceIndex": 18
  },
  "r04-4t:x-okuno-shinji": {
    "sessionId": "r04-20221220-honkaigi",
    "voiceIndex": 24
  },
  "r04-4t:x-tanaka-sayaka": {
    "sessionId": "r04-20221220-honkaigi",
    "voiceIndex": 41
  },
  "r04-4t:yuichi_watanabe": {
    "sessionId": "r04-20221220-honkaigi",
    "voiceIndex": 57
  },
  "r04-4t:nobuaki_takahashi": {
    "sessionId": "r04-20221221-honkaigi",
    "voiceIndex": 4
  },
  "r04-4t:x-takeuchi-shinobu": {
    "sessionId": "r04-20221221-honkaigi",
    "voiceIndex": 12
  },
  "r04-4t:yukari_yokoyama": {
    "sessionId": "r04-20221221-honkaigi",
    "voiceIndex": 19
  },
  "r04-4t:toshifumi_nodate": {
    "sessionId": "r04-20221221-honkaigi",
    "voiceIndex": 28
  },
  "r04-4t:x-serizawa-yujiro": {
    "sessionId": "r04-20221221-honkaigi",
    "voiceIndex": 48
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
