/* 平成23年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.h23;
  if (!year) throw new Error("平成23年データの読み込み後に h23-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "h23-20110223-honkaigi",
    "meetingId": "h23-1t",
    "dateIso": "2011-02-23",
    "date": "2011年2月23日",
    "dayLabel": "第1日目",
    "title": "2011年2月23日 平成23年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=290#one",
    "characters": 65697,
    "voices": 36,
    "hasFullText": true
  },
  {
    "id": "h23-20110224-honkaigi",
    "meetingId": "h23-1t",
    "dateIso": "2011-02-24",
    "date": "2011年2月24日",
    "dayLabel": "第2日目",
    "title": "2011年2月24日 平成23年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=292#one",
    "characters": 76931,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "h23-20110225-honkaigi",
    "meetingId": "h23-1t",
    "dateIso": "2011-02-25",
    "date": "2011年2月25日",
    "dayLabel": "第3日目",
    "title": "2011年2月25日 平成23年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=294#one",
    "characters": 63401,
    "voices": 62,
    "hasFullText": true
  },
  {
    "id": "h23-20110310-honkaigi",
    "meetingId": "h23-1t",
    "dateIso": "2011-03-10",
    "date": "2011年3月10日",
    "dayLabel": "第4日目",
    "title": "2011年3月10日 平成23年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=296#one",
    "characters": 2458,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "h23-20110329-honkaigi",
    "meetingId": "h23-1t",
    "dateIso": "2011-03-29",
    "date": "2011年3月29日",
    "dayLabel": "第5日目",
    "title": "2011年3月29日 平成23年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=298#one",
    "characters": 22634,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "h23-20110525-honkaigi",
    "meetingId": "h23-1r",
    "dateIso": "2011-05-25",
    "date": "2011年5月25日",
    "dayLabel": "第1日目",
    "title": "2011年5月25日 平成23年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=736#one",
    "characters": 8840,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "h23-20110623-honkaigi",
    "meetingId": "h23-2t",
    "dateIso": "2011-06-23",
    "date": "2011年6月23日",
    "dayLabel": "第1日目",
    "title": "2011年6月23日 平成23年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=300#one",
    "characters": 66307,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "h23-20110624-honkaigi",
    "meetingId": "h23-2t",
    "dateIso": "2011-06-24",
    "date": "2011年6月24日",
    "dayLabel": "第2日目",
    "title": "2011年6月24日 平成23年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=302#one",
    "characters": 51633,
    "voices": 43,
    "hasFullText": true
  },
  {
    "id": "h23-20110706-honkaigi",
    "meetingId": "h23-2t",
    "dateIso": "2011-07-06",
    "date": "2011年7月6日",
    "dayLabel": "第3日目",
    "title": "2011年7月6日 平成23年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=304#one",
    "characters": 24668,
    "voices": 64,
    "hasFullText": true
  },
  {
    "id": "h23-20110921-honkaigi",
    "meetingId": "h23-3t",
    "dateIso": "2011-09-21",
    "date": "2011年9月21日",
    "dayLabel": "第1日目",
    "title": "2011年9月21日 平成23年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=306#one",
    "characters": 49467,
    "voices": 48,
    "hasFullText": true
  },
  {
    "id": "h23-20110922-honkaigi",
    "meetingId": "h23-3t",
    "dateIso": "2011-09-22",
    "date": "2011年9月22日",
    "dayLabel": "第2日目",
    "title": "2011年9月22日 平成23年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=308#one",
    "characters": 70367,
    "voices": 80,
    "hasFullText": true
  },
  {
    "id": "h23-20111021-honkaigi",
    "meetingId": "h23-3t",
    "dateIso": "2011-10-21",
    "date": "2011年10月21日",
    "dayLabel": "第3日目",
    "title": "2011年10月21日 平成23年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=310#one",
    "characters": 21317,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "h23-20111124-honkaigi",
    "meetingId": "h23-4t",
    "dateIso": "2011-11-24",
    "date": "2011年11月24日",
    "dayLabel": "第1日目",
    "title": "2011年11月24日 平成23年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=312#one",
    "characters": 46821,
    "voices": 34,
    "hasFullText": true
  },
  {
    "id": "h23-20111125-honkaigi",
    "meetingId": "h23-4t",
    "dateIso": "2011-11-25",
    "date": "2011年11月25日",
    "dayLabel": "第2日目",
    "title": "2011年11月25日 平成23年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=314#one",
    "characters": 58594,
    "voices": 53,
    "hasFullText": true
  },
  {
    "id": "h23-20111207-honkaigi",
    "meetingId": "h23-4t",
    "dateIso": "2011-12-07",
    "date": "2011年12月7日",
    "dayLabel": "第3日目",
    "title": "2011年12月7日 平成23年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=316#one",
    "characters": 19970,
    "voices": 58,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "h23-1t:x-matsuzawa-toshiyuki": {
    "sessionId": "h23-20110223-honkaigi",
    "voiceIndex": 8
  },
  "h23-1t:hiroki_wakabayashi": {
    "sessionId": "h23-20110223-honkaigi",
    "voiceIndex": 16
  },
  "h23-1t:x-miyazaki-katsutoshi": {
    "sessionId": "h23-20110223-honkaigi",
    "voiceIndex": 24
  },
  "h23-1t:x-abe-yumiko": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 4
  },
  "h23-1t:yukihiro_sugai": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 15
  },
  "h23-1t:yuichi_watanabe": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 24
  },
  "h23-1t:x-takeuchi-shinobu": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 29
  },
  "h23-1t:x-iinuma-masako": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 35
  },
  "h23-1t:masanori_fujiwara": {
    "sessionId": "h23-20110224-honkaigi",
    "voiceIndex": 51
  },
  "h23-1t:x-inagawa-takayuki": {
    "sessionId": "h23-20110225-honkaigi",
    "voiceIndex": 4
  },
  "h23-1t:x-ichikawa-kazuko": {
    "sessionId": "h23-20110225-honkaigi",
    "voiceIndex": 8
  },
  "h23-1t:x-sawada-hirokazu": {
    "sessionId": "h23-20110225-honkaigi",
    "voiceIndex": 17
  },
  "h23-1t:x-yamaji-yoshinari": {
    "sessionId": "h23-20110225-honkaigi",
    "voiceIndex": 23
  },
  "h23-1t:taisaku_ando": {
    "sessionId": "h23-20110225-honkaigi",
    "voiceIndex": 30
  },
  "h23-2t:hideo_ishida": {
    "sessionId": "h23-20110623-honkaigi",
    "voiceIndex": 5
  },
  "h23-2t:x-yamamoto-keiko": {
    "sessionId": "h23-20110623-honkaigi",
    "voiceIndex": 13
  },
  "h23-2t:x-abe-yumiko": {
    "sessionId": "h23-20110623-honkaigi",
    "voiceIndex": 21
  },
  "h23-2t:chihiro_ishida": {
    "sessionId": "h23-20110623-honkaigi",
    "voiceIndex": 34
  },
  "h23-2t:takako_nishimoto": {
    "sessionId": "h23-20110623-honkaigi",
    "voiceIndex": 50
  },
  "h23-2t:x-matsuzawa-toshiyuki": {
    "sessionId": "h23-20110624-honkaigi",
    "voiceIndex": 4
  },
  "h23-2t:x-asano-hiroyuki": {
    "sessionId": "h23-20110624-honkaigi",
    "voiceIndex": 10
  },
  "h23-2t:x-sawada-hirokazu": {
    "sessionId": "h23-20110624-honkaigi",
    "voiceIndex": 20
  },
  "h23-2t:x-watabe-shigeru": {
    "sessionId": "h23-20110624-honkaigi",
    "voiceIndex": 25
  },
  "h23-3t:hiroo_akutsu": {
    "sessionId": "h23-20110921-honkaigi",
    "voiceIndex": 5
  },
  "h23-3t:kengo_kimura": {
    "sessionId": "h23-20110921-honkaigi",
    "voiceIndex": 15
  },
  "h23-3t:x-minami-keiko": {
    "sessionId": "h23-20110921-honkaigi",
    "voiceIndex": 19
  },
  "h23-3t:yukihiro_sugai": {
    "sessionId": "h23-20110921-honkaigi",
    "voiceIndex": 36
  },
  "h23-3t:x-ito-masahiro": {
    "sessionId": "h23-20110921-honkaigi",
    "voiceIndex": 45
  },
  "h23-3t:yoshihiro_tsukamoto": {
    "sessionId": "h23-20110922-honkaigi",
    "voiceIndex": 4
  },
  "h23-3t:x-honda-takenobu": {
    "sessionId": "h23-20110922-honkaigi",
    "voiceIndex": 12
  },
  "h23-3t:x-mukai-megumi": {
    "sessionId": "h23-20110922-honkaigi",
    "voiceIndex": 20
  },
  "h23-3t:hiroko_suzuki": {
    "sessionId": "h23-20110922-honkaigi",
    "voiceIndex": 28
  },
  "h23-3t:x-osawa-shinichi": {
    "sessionId": "h23-20110922-honkaigi",
    "voiceIndex": 47
  },
  "h23-4t:x-inoue-yaeko": {
    "sessionId": "h23-20111124-honkaigi",
    "voiceIndex": 5
  },
  "h23-4t:x-suzuki-hiroshi": {
    "sessionId": "h23-20111124-honkaigi",
    "voiceIndex": 15
  },
  "h23-4t:yuichi_watanabe": {
    "sessionId": "h23-20111124-honkaigi",
    "voiceIndex": 22
  },
  "h23-4t:shinichiro_tsuru": {
    "sessionId": "h23-20111124-honkaigi",
    "voiceIndex": 27
  },
  "h23-4t:x-yamauchi-akira": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 4
  },
  "h23-4t:takahiro_okura": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 11
  },
  "h23-4t:shinji_takahashi": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 17
  },
  "h23-4t:x-onishi-mitsuhiro": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 23
  },
  "h23-4t:x-suto-yasumichi": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 31
  },
  "h23-4t:x-yamamoto-keiko": {
    "sessionId": "h23-20111125-honkaigi",
    "voiceIndex": 37
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
