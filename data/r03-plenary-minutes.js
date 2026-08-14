/* 令和3年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r03;
  if (!year) throw new Error("令和3年データの読み込み後に r03-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r03-20210217-honkaigi",
    "meetingId": "r03-1t",
    "dateIso": "2021-02-17",
    "date": "2021年2月17日",
    "dayLabel": "第1日目",
    "title": "2021年2月17日 令和３年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=592#one",
    "characters": 56578,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "r03-20210218-honkaigi",
    "meetingId": "r03-1t",
    "dateIso": "2021-02-18",
    "date": "2021年2月18日",
    "dayLabel": "第2日目",
    "title": "2021年2月18日 令和３年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=594#one",
    "characters": 69478,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "r03-20210219-honkaigi",
    "meetingId": "r03-1t",
    "dateIso": "2021-02-19",
    "date": "2021年2月19日",
    "dayLabel": "第3日目",
    "title": "2021年2月19日 令和３年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=596#one",
    "characters": 45143,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "r03-20210305-honkaigi",
    "meetingId": "r03-1t",
    "dateIso": "2021-03-05",
    "date": "2021年3月5日",
    "dayLabel": "第4日目",
    "title": "2021年3月5日 令和３年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=598#one",
    "characters": 3725,
    "voices": 14,
    "hasFullText": true
  },
  {
    "id": "r03-20210323-honkaigi",
    "meetingId": "r03-1t",
    "dateIso": "2021-03-23",
    "date": "2021年3月23日",
    "dayLabel": "第5日目",
    "title": "2021年3月23日 令和３年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=600#one",
    "characters": 28797,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "r03-20210623-honkaigi",
    "meetingId": "r03-2t",
    "dateIso": "2021-06-23",
    "date": "2021年6月23日",
    "dayLabel": "第1日目",
    "title": "2021年6月23日 令和３年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=602#one",
    "characters": 55883,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "r03-20210624-honkaigi",
    "meetingId": "r03-2t",
    "dateIso": "2021-06-24",
    "date": "2021年6月24日",
    "dayLabel": "第2日目",
    "title": "2021年6月24日 令和３年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=604#one",
    "characters": 57841,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "r03-20210714-honkaigi",
    "meetingId": "r03-2t",
    "dateIso": "2021-07-14",
    "date": "2021年7月14日",
    "dayLabel": "第3日目",
    "title": "2021年7月14日 令和３年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=606#one",
    "characters": 24323,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "r03-20210916-honkaigi",
    "meetingId": "r03-3t",
    "dateIso": "2021-09-16",
    "date": "2021年9月16日",
    "dayLabel": "第1日目",
    "title": "2021年9月16日 令和３年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=608#one",
    "characters": 54176,
    "voices": 67,
    "hasFullText": true
  },
  {
    "id": "r03-20210917-honkaigi",
    "meetingId": "r03-3t",
    "dateIso": "2021-09-17",
    "date": "2021年9月17日",
    "dayLabel": "第2日目",
    "title": "2021年9月17日 令和３年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=610#one",
    "characters": 63400,
    "voices": 61,
    "hasFullText": true
  },
  {
    "id": "r03-20211020-honkaigi",
    "meetingId": "r03-3t",
    "dateIso": "2021-10-20",
    "date": "2021年10月20日",
    "dayLabel": "第3日目",
    "title": "2021年10月20日 令和３年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=612#one",
    "characters": 15683,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "r03-20211125-honkaigi",
    "meetingId": "r03-4t",
    "dateIso": "2021-11-25",
    "date": "2021年11月25日",
    "dayLabel": "第1日目",
    "title": "2021年11月25日 令和３年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=614#one",
    "characters": 58822,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "r03-20211126-honkaigi",
    "meetingId": "r03-4t",
    "dateIso": "2021-11-26",
    "date": "2021年11月26日",
    "dayLabel": "第2日目",
    "title": "2021年11月26日 令和３年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=616#one",
    "characters": 87526,
    "voices": 93,
    "hasFullText": true
  },
  {
    "id": "r03-20211209-honkaigi",
    "meetingId": "r03-4t",
    "dateIso": "2021-12-09",
    "date": "2021年12月9日",
    "dayLabel": "第3日目",
    "title": "2021年12月9日 令和３年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=618#one",
    "characters": 21506,
    "voices": 61,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r03-1t:hideo_ishida": {
    "sessionId": "r03-20210217-honkaigi",
    "voiceIndex": 9
  },
  "r03-1t:hiroki_wakabayashi": {
    "sessionId": "r03-20210217-honkaigi",
    "voiceIndex": 20
  },
  "r03-1t:x-osawa-shinichi": {
    "sessionId": "r03-20210217-honkaigi",
    "voiceIndex": 33
  },
  "r03-1t:ryo_nakatsuka": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 4
  },
  "r03-1t:yukihiro_sugai": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 19
  },
  "r03-1t:saeko_niizuma": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 32
  },
  "r03-1t:arata_koshiba": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 40
  },
  "r03-1t:x-watabe-shigeru": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 48
  },
  "r03-1t:x-kuniba-yudai": {
    "sessionId": "r03-20210218-honkaigi",
    "voiceIndex": 55
  },
  "r03-1t:hiroko_suzuki": {
    "sessionId": "r03-20210219-honkaigi",
    "voiceIndex": 4
  },
  "r03-1t:masanori_fujiwara": {
    "sessionId": "r03-20210219-honkaigi",
    "voiceIndex": 19
  },
  "r03-1t:naoko_nishimura": {
    "sessionId": "r03-20210219-honkaigi",
    "voiceIndex": 31
  },
  "r03-2t:taisaku_ando": {
    "sessionId": "r03-20210623-honkaigi",
    "voiceIndex": 7
  },
  "r03-2t:x-suzuki-masumi": {
    "sessionId": "r03-20210623-honkaigi",
    "voiceIndex": 25
  },
  "r03-2t:yumiko_yoshida": {
    "sessionId": "r03-20210623-honkaigi",
    "voiceIndex": 34
  },
  "r03-2t:takako_konno": {
    "sessionId": "r03-20210623-honkaigi",
    "voiceIndex": 48
  },
  "r03-2t:nobuaki_takahashi": {
    "sessionId": "r03-20210623-honkaigi",
    "voiceIndex": 54
  },
  "r03-2t:x-yuzawa-kazutaka": {
    "sessionId": "r03-20210624-honkaigi",
    "voiceIndex": 4
  },
  "r03-2t:x-takeuchi-shinobu": {
    "sessionId": "r03-20210624-honkaigi",
    "voiceIndex": 12
  },
  "r03-2t:x-suzuki-hiroshi": {
    "sessionId": "r03-20210624-honkaigi",
    "voiceIndex": 19
  },
  "r03-2t:kengo_kimura": {
    "sessionId": "r03-20210624-honkaigi",
    "voiceIndex": 25
  },
  "r03-2t:tokihiro_matsumoto": {
    "sessionId": "r03-20210624-honkaigi",
    "voiceIndex": 31
  },
  "r03-3t:yukihiro_sugai": {
    "sessionId": "r03-20210916-honkaigi",
    "voiceIndex": 6
  },
  "r03-3t:hideo_ishida": {
    "sessionId": "r03-20210916-honkaigi",
    "voiceIndex": 15
  },
  "r03-3t:shinichiro_tsuru": {
    "sessionId": "r03-20210916-honkaigi",
    "voiceIndex": 26
  },
  "r03-3t:x-osawa-shinichi": {
    "sessionId": "r03-20210916-honkaigi",
    "voiceIndex": 38
  },
  "r03-3t:x-okuno-shinji": {
    "sessionId": "r03-20210916-honkaigi",
    "voiceIndex": 47
  },
  "r03-3t:x-serizawa-yujiro": {
    "sessionId": "r03-20210917-honkaigi",
    "voiceIndex": 4
  },
  "r03-3t:hiroki_wakabayashi": {
    "sessionId": "r03-20210917-honkaigi",
    "voiceIndex": 9
  },
  "r03-3t:takako_nishimoto": {
    "sessionId": "r03-20210917-honkaigi",
    "voiceIndex": 16
  },
  "r03-3t:ryo_nakatsuka": {
    "sessionId": "r03-20210917-honkaigi",
    "voiceIndex": 31
  },
  "r03-3t:mari_seo": {
    "sessionId": "r03-20210917-honkaigi",
    "voiceIndex": 44
  },
  "r03-4t:yuichi_watanabe": {
    "sessionId": "r03-20211125-honkaigi",
    "voiceIndex": 6
  },
  "r03-4t:hiroo_akutsu": {
    "sessionId": "r03-20211125-honkaigi",
    "voiceIndex": 12
  },
  "r03-4t:x-watabe-shigeru": {
    "sessionId": "r03-20211125-honkaigi",
    "voiceIndex": 19
  },
  "r03-4t:toshifumi_nodate": {
    "sessionId": "r03-20211125-honkaigi",
    "voiceIndex": 25
  },
  "r03-4t:shinji_takahashi": {
    "sessionId": "r03-20211125-honkaigi",
    "voiceIndex": 37
  },
  "r03-4t:x-takeuchi-shinobu": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 4
  },
  "r03-4t:arata_koshiba": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 11
  },
  "r03-4t:x-tanaka-sayaka": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 17
  },
  "r03-4t:takahiro_okura": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 35
  },
  "r03-4t:kazumasa_matsuzawa": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 41
  },
  "r03-4t:hiroko_suzuki": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 52
  },
  "r03-4t:x-kuniba-yudai": {
    "sessionId": "r03-20211126-honkaigi",
    "voiceIndex": 69
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
