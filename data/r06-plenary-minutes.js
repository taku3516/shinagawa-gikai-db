/* 令和6年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r06;
  if (!year) throw new Error("令和6年データの読み込み後に r06-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r06-20240220-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-02-20",
    "date": "2024年2月20日",
    "dayLabel": "第1日目",
    "title": "2024年2月20日 令和６年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=684#one",
    "characters": 61233,
    "voices": 39,
    "hasFullText": true
  },
  {
    "id": "r06-20240221-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-02-21",
    "date": "2024年2月21日",
    "dayLabel": "第2日目",
    "title": "2024年2月21日 令和６年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=686#one",
    "characters": 75642,
    "voices": 71,
    "hasFullText": true
  },
  {
    "id": "r06-20240222-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-02-22",
    "date": "2024年2月22日",
    "dayLabel": "第3日目",
    "title": "2024年2月22日 令和６年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=688#one",
    "characters": 38822,
    "voices": 47,
    "hasFullText": true
  },
  {
    "id": "r06-20240229-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-02-29",
    "date": "2024年2月29日",
    "dayLabel": "第4日目",
    "title": "2024年2月29日 令和６年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=690#one",
    "characters": 1165,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "r06-20240307-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-03-07",
    "date": "2024年3月7日",
    "dayLabel": "第5日目",
    "title": "2024年3月7日 令和６年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=692#one",
    "characters": 3003,
    "voices": 18,
    "hasFullText": true
  },
  {
    "id": "r06-20240327-honkaigi",
    "meetingId": "r06-1t",
    "meetingName": "令和6年第1回定例会",
    "dateIso": "2024-03-27",
    "date": "2024年3月27日",
    "dayLabel": "第6日目",
    "title": "2024年3月27日 令和６年_第１回定例会（第６日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=694#one",
    "characters": 56350,
    "voices": 134,
    "hasFullText": true
  },
  {
    "id": "r06-20240423-honkaigi",
    "meetingId": "r06-1r",
    "meetingName": "令和6年第1回臨時会",
    "dateIso": "2024-04-23",
    "date": "2024年4月23日",
    "dayLabel": "第1日目",
    "title": "2024年4月23日 令和６年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=780#one",
    "characters": 12714,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "r06-20240527-honkaigi",
    "meetingId": "r06-2r",
    "meetingName": "令和6年第2回臨時会",
    "dateIso": "2024-05-27",
    "date": "2024年5月27日",
    "dayLabel": "第1日目",
    "title": "2024年5月27日 令和６年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6651#one",
    "characters": 4356,
    "voices": 37,
    "hasFullText": true
  },
  {
    "id": "r06-20240627-honkaigi",
    "meetingId": "r06-2t",
    "meetingName": "令和6年第2回定例会",
    "dateIso": "2024-06-27",
    "date": "2024年6月27日",
    "dayLabel": "第1日目",
    "title": "2024年6月27日 令和６年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6737#one",
    "characters": 64393,
    "voices": 68,
    "hasFullText": true
  },
  {
    "id": "r06-20240628-honkaigi",
    "meetingId": "r06-2t",
    "meetingName": "令和6年第2回定例会",
    "dateIso": "2024-06-28",
    "date": "2024年6月28日",
    "dayLabel": "第2日目",
    "title": "2024年6月28日 令和６年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6739#one",
    "characters": 58739,
    "voices": 66,
    "hasFullText": true
  },
  {
    "id": "r06-20240710-honkaigi",
    "meetingId": "r06-2t",
    "meetingName": "令和6年第2回定例会",
    "dateIso": "2024-07-10",
    "date": "2024年7月10日",
    "dayLabel": "第3日目",
    "title": "2024年7月10日 令和６年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6741#one",
    "characters": 51263,
    "voices": 98,
    "hasFullText": true
  },
  {
    "id": "r06-20240919-honkaigi",
    "meetingId": "r06-3t",
    "meetingName": "令和6年第3回定例会",
    "dateIso": "2024-09-19",
    "date": "2024年9月19日",
    "dayLabel": "第1日目",
    "title": "2024年9月19日 令和６年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6805#one",
    "characters": 57018,
    "voices": 49,
    "hasFullText": true
  },
  {
    "id": "r06-20240920-honkaigi",
    "meetingId": "r06-3t",
    "meetingName": "令和6年第3回定例会",
    "dateIso": "2024-09-20",
    "date": "2024年9月20日",
    "dayLabel": "第2日目",
    "title": "2024年9月20日 令和６年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6807#one",
    "characters": 65413,
    "voices": 77,
    "hasFullText": true
  },
  {
    "id": "r06-20241010-honkaigi",
    "meetingId": "r06-3t",
    "meetingName": "令和6年第3回定例会",
    "dateIso": "2024-10-10",
    "date": "2024年10月10日",
    "dayLabel": "第3日目",
    "title": "2024年10月10日 令和６年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6809#one",
    "characters": 6131,
    "voices": 26,
    "hasFullText": true
  },
  {
    "id": "r06-20241025-honkaigi",
    "meetingId": "r06-3t",
    "meetingName": "令和6年第3回定例会",
    "dateIso": "2024-10-25",
    "date": "2024年10月25日",
    "dayLabel": "第4日目",
    "title": "2024年10月25日 令和６年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6811#one",
    "characters": 21856,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "r06-20241121-honkaigi",
    "meetingId": "r06-4t",
    "meetingName": "令和6年第4回定例会",
    "dateIso": "2024-11-21",
    "date": "2024年11月21日",
    "dayLabel": "第1日目",
    "title": "2024年11月21日 令和６年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6881#one",
    "characters": 52138,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "r06-20241122-honkaigi",
    "meetingId": "r06-4t",
    "meetingName": "令和6年第4回定例会",
    "dateIso": "2024-11-22",
    "date": "2024年11月22日",
    "dayLabel": "第2日目",
    "title": "2024年11月22日 令和６年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6883#one",
    "characters": 75044,
    "voices": 72,
    "hasFullText": true
  },
  {
    "id": "r06-20241126-honkaigi",
    "meetingId": "r06-4t",
    "meetingName": "令和6年第4回定例会",
    "dateIso": "2024-11-26",
    "date": "2024年11月26日",
    "dayLabel": "第3日目",
    "title": "2024年11月26日 令和６年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6885#one",
    "characters": 2488,
    "voices": 8,
    "hasFullText": true
  },
  {
    "id": "r06-20241128-honkaigi",
    "meetingId": "r06-4t",
    "meetingName": "令和6年第4回定例会",
    "dateIso": "2024-11-28",
    "date": "2024年11月28日",
    "dayLabel": "第4日目",
    "title": "2024年11月28日 令和６年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6887#one",
    "characters": 4350,
    "voices": 16,
    "hasFullText": true
  },
  {
    "id": "r06-20241205-honkaigi",
    "meetingId": "r06-4t",
    "meetingName": "令和6年第4回定例会",
    "dateIso": "2024-12-05",
    "date": "2024年12月5日",
    "dayLabel": "第5日目",
    "title": "2024年12月5日 令和６年_第４回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6889#one",
    "characters": 25996,
    "voices": 55,
    "hasFullText": true
  },
  {
    "id": "r06-20241225-honkaigi",
    "meetingId": "r06-3r",
    "meetingName": "令和6年第3回臨時会",
    "dateIso": "2024-12-25",
    "date": "2024年12月25日",
    "dayLabel": "第1日目",
    "title": "2024年12月25日 令和６年_第３回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6891#one",
    "characters": 4227,
    "voices": 20,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r06-1t:nobuaki_takahashi": {
    "sessionId": "r06-20240220-honkaigi",
    "voiceIndex": 8
  },
  "r06-1t:hiroki_wakabayashi": {
    "sessionId": "r06-20240220-honkaigi",
    "voiceIndex": 16
  },
  "r06-1t:takahiro_okura": {
    "sessionId": "r06-20240220-honkaigi",
    "voiceIndex": 29
  },
  "r06-1t:taisaku_ando": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 4
  },
  "r06-1t:yukihiro_sugai": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 26
  },
  "r06-1t:mari_seo": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 36
  },
  "r06-1t:masaharu_yukita": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 42
  },
  "r06-1t:x-ishida-shingo": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 49
  },
  "r06-1t:x-higashi-yuki": {
    "sessionId": "r06-20240221-honkaigi",
    "voiceIndex": 63
  },
  "r06-1t:x-serizawa-yujiro": {
    "sessionId": "r06-20240222-honkaigi",
    "voiceIndex": 4
  },
  "r06-1t:satoshi_yanagisawa": {
    "sessionId": "r06-20240222-honkaigi",
    "voiceIndex": 13
  },
  "r06-2t:toshifumi_nodate": {
    "sessionId": "r06-20240627-honkaigi",
    "voiceIndex": 6
  },
  "r06-2t:shinichiro_tsuru": {
    "sessionId": "r06-20240627-honkaigi",
    "voiceIndex": 28
  },
  "r06-2t:nobuaki_takahashi": {
    "sessionId": "r06-20240627-honkaigi",
    "voiceIndex": 40
  },
  "r06-2t:yoshihiro_matsunaga": {
    "sessionId": "r06-20240627-honkaigi",
    "voiceIndex": 46
  },
  "r06-2t:takako_nishimoto": {
    "sessionId": "r06-20240627-honkaigi",
    "voiceIndex": 53
  },
  "r06-2t:tsutsui_yosuke": {
    "sessionId": "r06-20240628-honkaigi",
    "voiceIndex": 4
  },
  "r06-2t:kazumasa_matsuzawa": {
    "sessionId": "r06-20240628-honkaigi",
    "voiceIndex": 20
  },
  "r06-2t:yoshihiro_tsukamoto": {
    "sessionId": "r06-20240628-honkaigi",
    "voiceIndex": 25
  },
  "r06-2t:yumiko_yoshida": {
    "sessionId": "r06-20240628-honkaigi",
    "voiceIndex": 35
  },
  "r06-3t:takako_konno": {
    "sessionId": "r06-20240919-honkaigi",
    "voiceIndex": 6
  },
  "r06-3t:mari_seo": {
    "sessionId": "r06-20240919-honkaigi",
    "voiceIndex": 13
  },
  "r06-3t:takahiro_okura": {
    "sessionId": "r06-20240919-honkaigi",
    "voiceIndex": 20
  },
  "r06-3t:masanori_fujiwara": {
    "sessionId": "r06-20240919-honkaigi",
    "voiceIndex": 27
  },
  "r06-3t:takeshi_tanaka": {
    "sessionId": "r06-20240919-honkaigi",
    "voiceIndex": 39
  },
  "r06-3t:mao_seraku": {
    "sessionId": "r06-20240920-honkaigi",
    "voiceIndex": 4
  },
  "r06-3t:arata_koshiba": {
    "sessionId": "r06-20240920-honkaigi",
    "voiceIndex": 9
  },
  "r06-3t:hiroki_wakabayashi": {
    "sessionId": "r06-20240920-honkaigi",
    "voiceIndex": 15
  },
  "r06-3t:x-ishida-shingo": {
    "sessionId": "r06-20240920-honkaigi",
    "voiceIndex": 23
  },
  "r06-3t:hiroko_suzuki": {
    "sessionId": "r06-20240920-honkaigi",
    "voiceIndex": 34
  },
  "r06-4t:masato_enoshita": {
    "sessionId": "r06-20241121-honkaigi",
    "voiceIndex": 6
  },
  "r06-4t:yasuyuki_yamamoto": {
    "sessionId": "r06-20241121-honkaigi",
    "voiceIndex": 12
  },
  "r06-4t:yukihiro_sugai": {
    "sessionId": "r06-20241121-honkaigi",
    "voiceIndex": 22
  },
  "r06-4t:saeko_niizuma": {
    "sessionId": "r06-20241121-honkaigi",
    "voiceIndex": 31
  },
  "r06-4t:yukari_yokoyama": {
    "sessionId": "r06-20241121-honkaigi",
    "voiceIndex": 39
  },
  "r06-4t:shinichiro_tsuru": {
    "sessionId": "r06-20241122-honkaigi",
    "voiceIndex": 4
  },
  "r06-4t:tokihiro_matsumoto": {
    "sessionId": "r06-20241122-honkaigi",
    "voiceIndex": 9
  },
  "r06-4t:shinji_takahashi": {
    "sessionId": "r06-20241122-honkaigi",
    "voiceIndex": 17
  },
  "r06-4t:chihiro_ishida": {
    "sessionId": "r06-20241122-honkaigi",
    "voiceIndex": 29
  },
  "r06-4t:hideo_ishida": {
    "sessionId": "r06-20241122-honkaigi",
    "voiceIndex": 51
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
