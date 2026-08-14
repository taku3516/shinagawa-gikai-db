/* 令和7年の本会議 会議録全文の目次。scripts/prepare_plenary_fulltext.py で生成。 */
(() => {
  "use strict";
  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r07;
  if (!year) throw new Error("令和7年データの読み込み後に r07-plenary-minutes.js を読み込んでください");

  // 本会議1日ぶんの見出し。全文は開いたときに data/minutes/ から読み込む。
  year.plenaryMinutes = [
  {
    "id": "r07-20250219-honkaigi",
    "meetingId": "r07-1t",
    "dateIso": "2025-02-19",
    "date": "2025年2月19日",
    "dayLabel": "第1日目",
    "title": "2025年2月19日 令和７年_第１回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6989#one",
    "characters": 66003,
    "voices": 40,
    "hasFullText": true
  },
  {
    "id": "r07-20250220-honkaigi",
    "meetingId": "r07-1t",
    "dateIso": "2025-02-20",
    "date": "2025年2月20日",
    "dayLabel": "第2日目",
    "title": "2025年2月20日 令和７年_第１回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6991#one",
    "characters": 68148,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "r07-20250221-honkaigi",
    "meetingId": "r07-1t",
    "dateIso": "2025-02-21",
    "date": "2025年2月21日",
    "dayLabel": "第3日目",
    "title": "2025年2月21日 令和７年_第１回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6993#one",
    "characters": 64642,
    "voices": 76,
    "hasFullText": true
  },
  {
    "id": "r07-20250307-honkaigi",
    "meetingId": "r07-1t",
    "dateIso": "2025-03-07",
    "date": "2025年3月7日",
    "dayLabel": "第4日目",
    "title": "2025年3月7日 令和７年_第１回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6995#one",
    "characters": 1976,
    "voices": 10,
    "hasFullText": true
  },
  {
    "id": "r07-20250326-honkaigi",
    "meetingId": "r07-1t",
    "dateIso": "2025-03-26",
    "date": "2025年3月26日",
    "dayLabel": "第5日目",
    "title": "2025年3月26日 令和７年_第１回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=6997#one",
    "characters": 59415,
    "voices": 108,
    "hasFullText": true
  },
  {
    "id": "r07-20250527-honkaigi",
    "meetingId": "r07-1r",
    "dateIso": "2025-05-27",
    "date": "2025年5月27日",
    "dayLabel": "第1日目",
    "title": "2025年5月27日 令和７年_第１回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7035#one",
    "characters": 11286,
    "voices": 79,
    "hasFullText": true
  },
  {
    "id": "r07-20250626-honkaigi",
    "meetingId": "r07-2t",
    "dateIso": "2025-06-26",
    "date": "2025年6月26日",
    "dayLabel": "第1日目",
    "title": "2025年6月26日 令和７年_第２回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7067#one",
    "characters": 67214,
    "voices": 70,
    "hasFullText": true
  },
  {
    "id": "r07-20250627-honkaigi",
    "meetingId": "r07-2t",
    "dateIso": "2025-06-27",
    "date": "2025年6月27日",
    "dayLabel": "第2日目",
    "title": "2025年6月27日 令和７年_第２回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7069#one",
    "characters": 72490,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "r07-20250710-honkaigi",
    "meetingId": "r07-2t",
    "dateIso": "2025-07-10",
    "date": "2025年7月10日",
    "dayLabel": "第3日目",
    "title": "2025年7月10日 令和７年_第２回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7071#one",
    "characters": 37856,
    "voices": 92,
    "hasFullText": true
  },
  {
    "id": "r07-20250918-honkaigi",
    "meetingId": "r07-3t",
    "dateIso": "2025-09-18",
    "date": "2025年9月18日",
    "dayLabel": "第1日目",
    "title": "2025年9月18日 令和７年_第３回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7201#one",
    "characters": 58563,
    "voices": 54,
    "hasFullText": true
  },
  {
    "id": "r07-20250919-honkaigi",
    "meetingId": "r07-3t",
    "dateIso": "2025-09-19",
    "date": "2025年9月19日",
    "dayLabel": "第2日目",
    "title": "2025年9月19日 令和７年_第３回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7203#one",
    "characters": 44987,
    "voices": 56,
    "hasFullText": true
  },
  {
    "id": "r07-20250930-honkaigi",
    "meetingId": "r07-3t",
    "dateIso": "2025-09-30",
    "date": "2025年9月30日",
    "dayLabel": "第3日目",
    "title": "2025年9月30日 令和７年_第３回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7205#one",
    "characters": 3419,
    "voices": 11,
    "hasFullText": true
  },
  {
    "id": "r07-20251023-honkaigi",
    "meetingId": "r07-3t",
    "dateIso": "2025-10-23",
    "date": "2025年10月23日",
    "dayLabel": "第4日目",
    "title": "2025年10月23日 令和７年_第３回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7207#one",
    "characters": 44741,
    "voices": 106,
    "hasFullText": true
  },
  {
    "id": "r07-20251120-honkaigi",
    "meetingId": "r07-4t",
    "dateIso": "2025-11-20",
    "date": "2025年11月20日",
    "dayLabel": "第1日目",
    "title": "2025年11月20日 令和７年_第４回定例会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7237#one",
    "characters": 69077,
    "voices": 69,
    "hasFullText": true
  },
  {
    "id": "r07-20251121-honkaigi",
    "meetingId": "r07-4t",
    "dateIso": "2025-11-21",
    "date": "2025年11月21日",
    "dayLabel": "第2日目",
    "title": "2025年11月21日 令和７年_第４回定例会（第２日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7239#one",
    "characters": 64743,
    "voices": 59,
    "hasFullText": true
  },
  {
    "id": "r07-20251126-honkaigi",
    "meetingId": "r07-4t",
    "dateIso": "2025-11-26",
    "date": "2025年11月26日",
    "dayLabel": "第3日目",
    "title": "2025年11月26日 令和７年_第４回定例会（第３日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7241#one",
    "characters": 4057,
    "voices": 7,
    "hasFullText": true
  },
  {
    "id": "r07-20251127-honkaigi",
    "meetingId": "r07-4t",
    "dateIso": "2025-11-27",
    "date": "2025年11月27日",
    "dayLabel": "第4日目",
    "title": "2025年11月27日 令和７年_第４回定例会（第４日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7243#one",
    "characters": 5449,
    "voices": 16,
    "hasFullText": true
  },
  {
    "id": "r07-20251205-honkaigi",
    "meetingId": "r07-4t",
    "dateIso": "2025-12-05",
    "date": "2025年12月5日",
    "dayLabel": "第5日目",
    "title": "2025年12月5日 令和７年_第４回定例会（第５日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7245#one",
    "characters": 30699,
    "voices": 77,
    "hasFullText": true
  },
  {
    "id": "r07-20251225-honkaigi",
    "meetingId": "r07-2r",
    "dateIso": "2025-12-25",
    "date": "2025年12月25日",
    "dayLabel": "第1日目",
    "title": "2025年12月25日 令和７年_第２回臨時会（第１日目）",
    "sourceUrl": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=7247#one",
    "characters": 3734,
    "voices": 18,
    "hasFullText": true
  }
];

  // 質問者ごとの、質問を始めた発言の位置。要約が見出しの言い換えに
  // なっていても、ここから原文の該当発言へ1手で行ける。
  const starts = {
  "r07-1t:kazumasa_matsuzawa": {
    "sessionId": "r07-20250219-honkaigi",
    "voiceIndex": 8
  },
  "r07-1t:hiroki_wakabayashi": {
    "sessionId": "r07-20250219-honkaigi",
    "voiceIndex": 18
  },
  "r07-1t:takahiro_okura": {
    "sessionId": "r07-20250219-honkaigi",
    "voiceIndex": 32
  },
  "r07-1t:hiroko_suzuki": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 4
  },
  "r07-1t:yukihiro_sugai": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 14
  },
  "r07-1t:x-higashi-yuki": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 26
  },
  "r07-1t:ayaka_ogino": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 36
  },
  "r07-1t:emiko_sawada": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 42
  },
  "r07-1t:takako_konno": {
    "sessionId": "r07-20250220-honkaigi",
    "voiceIndex": 48
  },
  "r07-1t:kengo_kimura": {
    "sessionId": "r07-20250221-honkaigi",
    "voiceIndex": 4
  },
  "r07-1t:naoko_nishimura": {
    "sessionId": "r07-20250221-honkaigi",
    "voiceIndex": 12
  },
  "r07-1t:taisaku_ando": {
    "sessionId": "r07-20250221-honkaigi",
    "voiceIndex": 18
  },
  "r07-1t:satoshi_yanagisawa": {
    "sessionId": "r07-20250221-honkaigi",
    "voiceIndex": 37
  },
  "r07-2t:hideo_ishida": {
    "sessionId": "r07-20250626-honkaigi",
    "voiceIndex": 6
  },
  "r07-2t:yoshihiro_matsunaga": {
    "sessionId": "r07-20250626-honkaigi",
    "voiceIndex": 20
  },
  "r07-2t:hiroo_akutsu": {
    "sessionId": "r07-20250626-honkaigi",
    "voiceIndex": 29
  },
  "r07-2t:toshifumi_nodate": {
    "sessionId": "r07-20250626-honkaigi",
    "voiceIndex": 38
  },
  "r07-2t:yukari_yokoyama": {
    "sessionId": "r07-20250626-honkaigi",
    "voiceIndex": 59
  },
  "r07-2t:tsutsui_yosuke": {
    "sessionId": "r07-20250627-honkaigi",
    "voiceIndex": 4
  },
  "r07-2t:yoshihiro_tsukamoto": {
    "sessionId": "r07-20250627-honkaigi",
    "voiceIndex": 15
  },
  "r07-2t:yumiko_yoshida": {
    "sessionId": "r07-20250627-honkaigi",
    "voiceIndex": 22
  },
  "r07-2t:kazumasa_matsuzawa": {
    "sessionId": "r07-20250627-honkaigi",
    "voiceIndex": 39
  },
  "r07-2t:takako_nishimoto": {
    "sessionId": "r07-20250627-honkaigi",
    "voiceIndex": 45
  },
  "r07-3t:yasuyuki_yamamoto": {
    "sessionId": "r07-20250918-honkaigi",
    "voiceIndex": 7
  },
  "r07-3t:shinichiro_tsuru": {
    "sessionId": "r07-20250918-honkaigi",
    "voiceIndex": 12
  },
  "r07-3t:arata_koshiba": {
    "sessionId": "r07-20250918-honkaigi",
    "voiceIndex": 23
  },
  "r07-3t:chihiro_ishida": {
    "sessionId": "r07-20250918-honkaigi",
    "voiceIndex": 30
  },
  "r07-3t:mao_seraku": {
    "sessionId": "r07-20250918-honkaigi",
    "voiceIndex": 48
  },
  "r07-3t:takako_konno": {
    "sessionId": "r07-20250919-honkaigi",
    "voiceIndex": 4
  },
  "r07-3t:takeshi_tanaka": {
    "sessionId": "r07-20250919-honkaigi",
    "voiceIndex": 13
  },
  "r07-3t:naoko_nishimura": {
    "sessionId": "r07-20250919-honkaigi",
    "voiceIndex": 21
  },
  "r07-4t:saeko_niizuma": {
    "sessionId": "r07-20251120-honkaigi",
    "voiceIndex": 6
  },
  "r07-4t:emiko_sawada": {
    "sessionId": "r07-20251120-honkaigi",
    "voiceIndex": 13
  },
  "r07-4t:masanori_fujiwara": {
    "sessionId": "r07-20251120-honkaigi",
    "voiceIndex": 22
  },
  "r07-4t:taisaku_ando": {
    "sessionId": "r07-20251120-honkaigi",
    "voiceIndex": 39
  },
  "r07-4t:shinji_takahashi": {
    "sessionId": "r07-20251120-honkaigi",
    "voiceIndex": 58
  },
  "r07-4t:masato_enoshita": {
    "sessionId": "r07-20251121-honkaigi",
    "voiceIndex": 4
  },
  "r07-4t:hiroo_akutsu": {
    "sessionId": "r07-20251121-honkaigi",
    "voiceIndex": 9
  },
  "r07-4t:yukihiro_sugai": {
    "sessionId": "r07-20251121-honkaigi",
    "voiceIndex": 17
  },
  "r07-4t:tokihiro_matsumoto": {
    "sessionId": "r07-20251121-honkaigi",
    "voiceIndex": 33
  },
  "r07-4t:yoshihiro_matsunaga": {
    "sessionId": "r07-20251121-honkaigi",
    "voiceIndex": 44
  }
};
  year.questions = (year.questions || []).map((question) => {
    const start = starts[`${question.meetingId}:${question.memberId}`];
    return start ? { ...question, fullText: start } : question;
  });
})();
