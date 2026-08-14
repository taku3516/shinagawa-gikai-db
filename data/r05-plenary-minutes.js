/* 令和5年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r05;
  if (!year) throw new Error("令和5年データの読み込み後に r05-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r05-20230112-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和4年第4回定例会",
    "dateIso": "2023-01-12",
    "date": "2023年1月12日",
    "dayLabel": "第4日目",
    "title": "2023年1月12日 令和４年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=650#one",
    "characters": 34203,
    "voices": 101,
    "hasFullText": true
  },
  {
    "id": "r05-20230221-honkaigi",
    "meetingId": "r05-1t",
    "meetingName": "令和5年第1回定例会",
    "dateIso": "2023-02-21",
    "date": "2023年2月21日",
    "dayLabel": "第1日目",
    "title": "2023年2月21日 令和５年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=652#one",
    "characters": 61526,
    "voices": 44,
    "hasFullText": true
  },
  {
    "id": "r05-20230222-honkaigi",
    "meetingId": "r05-1t",
    "meetingName": "令和5年第1回定例会",
    "dateIso": "2023-02-22",
    "date": "2023年2月22日",
    "dayLabel": "第2日目",
    "title": "2023年2月22日 令和５年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=654#one",
    "characters": 81488,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "r05-20230224-honkaigi",
    "meetingId": "r05-1t",
    "meetingName": "令和5年第1回定例会",
    "dateIso": "2023-02-24",
    "date": "2023年2月24日",
    "dayLabel": "第3日目",
    "title": "2023年2月24日 令和５年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=656#one",
    "characters": 35127,
    "voices": 35,
    "hasFullText": true
  },
  {
    "id": "r05-20230309-honkaigi",
    "meetingId": "r05-1t",
    "meetingName": "令和5年第1回定例会",
    "dateIso": "2023-03-09",
    "date": "2023年3月9日",
    "dayLabel": "第4日目",
    "title": "2023年3月9日 令和５年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=658#one",
    "characters": 1983,
    "voices": 9,
    "hasFullText": true
  },
  {
    "id": "r05-20230328-honkaigi",
    "meetingId": "r05-1t",
    "meetingName": "令和5年第1回定例会",
    "dateIso": "2023-03-28",
    "date": "2023年3月28日",
    "dayLabel": "第5日目",
    "title": "2023年3月28日 令和５年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=660#one",
    "characters": 24171,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "r05-20230526-honkaigi",
    "meetingId": "r05-1r",
    "meetingName": "令和5年第1回臨時会",
    "dateIso": "2023-05-26",
    "date": "2023年5月26日",
    "dayLabel": "第1日目",
    "title": "2023年5月26日 令和５年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=774#one",
    "characters": 9518,
    "voices": 83,
    "hasFullText": true
  },
  {
    "id": "r05-20230529-honkaigi",
    "meetingId": "r05-1r",
    "meetingName": "令和5年第1回臨時会",
    "dateIso": "2023-05-29",
    "date": "2023年5月29日",
    "dayLabel": "第2日目",
    "title": "2023年5月29日 令和５年_第１回臨時会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=776#one",
    "characters": 6106,
    "voices": 23,
    "hasFullText": true
  },
  {
    "id": "r05-20230629-honkaigi",
    "meetingId": "r05-2t",
    "meetingName": "令和5年第2回定例会",
    "dateIso": "2023-06-29",
    "date": "2023年6月29日",
    "dayLabel": "第1日目",
    "title": "2023年6月29日 令和５年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=662#one",
    "characters": 59220,
    "voices": 63,
    "hasFullText": true
  },
  {
    "id": "r05-20230630-honkaigi",
    "meetingId": "r05-2t",
    "meetingName": "令和5年第2回定例会",
    "dateIso": "2023-06-30",
    "date": "2023年6月30日",
    "dayLabel": "第2日目",
    "title": "2023年6月30日 令和５年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=664#one",
    "characters": 64701,
    "voices": 79,
    "hasFullText": true
  },
  {
    "id": "r05-20230711-honkaigi",
    "meetingId": "r05-2t",
    "meetingName": "令和5年第2回定例会",
    "dateIso": "2023-07-11",
    "date": "2023年7月11日",
    "dayLabel": "第3日目",
    "title": "2023年7月11日 令和５年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=666#one",
    "characters": 36122,
    "voices": 89,
    "hasFullText": true
  },
  {
    "id": "r05-20230921-honkaigi",
    "meetingId": "r05-3t",
    "meetingName": "令和5年第3回定例会",
    "dateIso": "2023-09-21",
    "date": "2023年9月21日",
    "dayLabel": "第1日目",
    "title": "2023年9月21日 令和５年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=668#one",
    "characters": 56666,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "r05-20230922-honkaigi",
    "meetingId": "r05-3t",
    "meetingName": "令和5年第3回定例会",
    "dateIso": "2023-09-22",
    "date": "2023年9月22日",
    "dayLabel": "第2日目",
    "title": "2023年9月22日 令和５年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=670#one",
    "characters": 78355,
    "voices": 113,
    "hasFullText": true
  },
  {
    "id": "r05-20231024-honkaigi",
    "meetingId": "r05-3t",
    "meetingName": "令和5年第3回定例会",
    "dateIso": "2023-10-24",
    "date": "2023年10月24日",
    "dayLabel": "第3日目",
    "title": "2023年10月24日 令和５年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=672#one",
    "characters": 34103,
    "voices": 90,
    "hasFullText": true
  },
  {
    "id": "r05-20231122-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和5年第4回定例会",
    "dateIso": "2023-11-22",
    "date": "2023年11月22日",
    "dayLabel": "第1日目",
    "title": "2023年11月22日 令和５年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=674#one",
    "characters": 56815,
    "voices": 58,
    "hasFullText": true
  },
  {
    "id": "r05-20231124-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和5年第4回定例会",
    "dateIso": "2023-11-24",
    "date": "2023年11月24日",
    "dayLabel": "第2日目",
    "title": "2023年11月24日 令和５年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=676#one",
    "characters": 66087,
    "voices": 73,
    "hasFullText": true
  },
  {
    "id": "r05-20231128-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和5年第4回定例会",
    "dateIso": "2023-11-28",
    "date": "2023年11月28日",
    "dayLabel": "第3日目",
    "title": "2023年11月28日 令和５年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=678#one",
    "characters": 2474,
    "voices": 8,
    "hasFullText": true
  },
  {
    "id": "r05-20231130-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和5年第4回定例会",
    "dateIso": "2023-11-30",
    "date": "2023年11月30日",
    "dayLabel": "第4日目",
    "title": "2023年11月30日 令和５年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=680#one",
    "characters": 4416,
    "voices": 17,
    "hasFullText": true
  },
  {
    "id": "r05-20231206-honkaigi",
    "meetingId": "r05-4t",
    "meetingName": "令和5年第4回定例会",
    "dateIso": "2023-12-06",
    "date": "2023年12月6日",
    "dayLabel": "第5日目",
    "title": "2023年12月6日 令和５年_第４回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=682#one",
    "characters": 38653,
    "voices": 98,
    "hasFullText": true
  },
  {
    "id": "r05-20231227-honkaigi",
    "meetingId": "r05-2r",
    "meetingName": "令和5年第2回臨時会",
    "dateIso": "2023-12-27",
    "date": "2023年12月27日",
    "dayLabel": "第1日目",
    "title": "2023年12月27日 令和５年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=778#one",
    "characters": 7075,
    "voices": 32,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r05-1t:yuichi_watanabe": {
    "sessionId": "r05-20230221-honkaigi",
    "voiceIndex": 8
  },
  "r05-1t:hiroki_wakabayashi": {
    "sessionId": "r05-20230221-honkaigi",
    "voiceIndex": 17
  },
  "r05-1t:chihiro_ishida": {
    "sessionId": "r05-20230221-honkaigi",
    "voiceIndex": 30
  },
  "r05-1t:takahiro_okura": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 4
  },
  "r05-1t:x-tanaka-sayaka": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 14
  },
  "r05-1t:shinichiro_tsuru": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 29
  },
  "r05-1t:masato_enoshita": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 39
  },
  "r05-1t:taisaku_ando": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 47
  },
  "r05-1t:naoko_nishimura": {
    "sessionId": "r05-20230222-honkaigi",
    "voiceIndex": 65
  },
  "r05-1t:x-watabe-shigeru": {
    "sessionId": "r05-20230224-honkaigi",
    "voiceIndex": 4
  },
  "r05-1t:mari_seo": {
    "sessionId": "r05-20230224-honkaigi",
    "voiceIndex": 12
  },
  "r05-2t:arata_koshiba": {
    "sessionId": "r05-20230629-honkaigi",
    "voiceIndex": 6
  },
  "r05-2t:shinichiro_tsuru": {
    "sessionId": "r05-20230629-honkaigi",
    "voiceIndex": 12
  },
  "r05-2t:yoshihiro_matsunaga": {
    "sessionId": "r05-20230629-honkaigi",
    "voiceIndex": 23
  },
  "r05-2t:ryo_nakatsuka": {
    "sessionId": "r05-20230629-honkaigi",
    "voiceIndex": 29
  },
  "r05-2t:takako_nishimoto": {
    "sessionId": "r05-20230629-honkaigi",
    "voiceIndex": 48
  },
  "r05-2t:yoshihiro_tsukamoto": {
    "sessionId": "r05-20230630-honkaigi",
    "voiceIndex": 4
  },
  "r05-2t:emiko_sawada": {
    "sessionId": "r05-20230630-honkaigi",
    "voiceIndex": 12
  },
  "r05-2t:yumiko_yoshida": {
    "sessionId": "r05-20230630-honkaigi",
    "voiceIndex": 18
  },
  "r05-2t:masanori_fujiwara": {
    "sessionId": "r05-20230630-honkaigi",
    "voiceIndex": 31
  },
  "r05-2t:hideo_ishida": {
    "sessionId": "r05-20230630-honkaigi",
    "voiceIndex": 42
  },
  "r05-3t:masaharu_yukita": {
    "sessionId": "r05-20230921-honkaigi",
    "voiceIndex": 6
  },
  "r05-3t:takahiro_okura": {
    "sessionId": "r05-20230921-honkaigi",
    "voiceIndex": 12
  },
  "r05-3t:taisaku_ando": {
    "sessionId": "r05-20230921-honkaigi",
    "voiceIndex": 19
  },
  "r05-3t:nobuaki_takahashi": {
    "sessionId": "r05-20230921-honkaigi",
    "voiceIndex": 43
  },
  "r05-3t:yukari_yokoyama": {
    "sessionId": "r05-20230921-honkaigi",
    "voiceIndex": 50
  },
  "r05-3t:kazumasa_matsuzawa": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 4
  },
  "r05-3t:saeko_niizuma": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 11
  },
  "r05-3t:tsutsui_yosuke": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 21
  },
  "r05-3t:toshifumi_nodate": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 34
  },
  "r05-3t:mao_seraku": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 54
  },
  "r05-3t:takeshi_tanaka": {
    "sessionId": "r05-20230922-honkaigi",
    "voiceIndex": 62
  },
  "r05-4t:yasuyuki_yamamoto": {
    "sessionId": "r05-20231122-honkaigi",
    "voiceIndex": 6
  },
  "r05-4t:hiroko_suzuki": {
    "sessionId": "r05-20231122-honkaigi",
    "voiceIndex": 13
  },
  "r05-4t:naoko_nishimura": {
    "sessionId": "r05-20231122-honkaigi",
    "voiceIndex": 34
  },
  "r05-4t:yoshihiro_tsukamoto": {
    "sessionId": "r05-20231122-honkaigi",
    "voiceIndex": 42
  },
  "r05-4t:ayaka_ogino": {
    "sessionId": "r05-20231122-honkaigi",
    "voiceIndex": 50
  },
  "r05-4t:masato_enoshita": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 4
  },
  "r05-4t:kengo_kimura": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 9
  },
  "r05-4t:yukihiro_sugai": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 13
  },
  "r05-4t:tokihiro_matsumoto": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 27
  },
  "r05-4t:shinji_takahashi": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 36
  },
  "r05-4t:takako_konno": {
    "sessionId": "r05-20231124-honkaigi",
    "voiceIndex": 52
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
