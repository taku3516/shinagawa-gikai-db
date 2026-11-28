/* 公式資料と突き合わせた事実。確認日は資料の閲覧日。 */
window.SHINAGAWA_CIVIC_SOURCES = {
  sessions: [{
    id: "r08-4t", name: "令和8年第4回定例会", start: "2026-12-03", end: "2026-12-17",
    source: { label: "令和8年第4回定例会の日程", url: "https://gikai.city.shinagawa.tokyo.jp/schedule/20843.html", locator: "会期および日程表", checkedAt: "2026-11-25" },
    events: [
      ["2026-12-02", "議会運営委員会（開会前）"], ["2026-12-03", "一般質問"],
      ["2026-12-04", "一般質問・議案上程"], ["2026-12-07", "常任委員会"],
      ["2026-12-08", "常任委員会"], ["2026-12-09", "特別委員会"],
      ["2026-12-10", "特別委員会"], ["2026-12-16", "議会運営委員会"],
      ["2026-12-17", "委員長報告・表決"]
    ]
  }],
  votes: {},
  voteSessions: {},
  budgets: {
    source: { label: "令和8年度当初予算", url: "https://www.city.shinagawa.tokyo.jp/kusei/zaisei/1005653/1005654.html", locator: "一般会計 歳入・歳出", checkedAt: "2026-11-25" },
    population: {
      "fy-r08": { count: 417833, date: "2026-04-01", url: "https://www.city.shinagawa.tokyo.jp/contentshozon2026/202604a.pdf" },
      "fy-r06": { count: 410260, date: "2024-04-01", url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/2025.06.09kou02.pdf" },
      "fy-r07": { count: 414581, date: "2025-04-01", url: "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1005753/1005894/1006269/1006320/1006326.html" }
    },
    income: [
      ["特別区税",65592120000,59319835000], ["地方譲与税",537300000,547300000],
      ["利子割交付金",300000000,300000000], ["配当割交付金",1200000000,1200000000],
      ["株式等譲渡所得割交付金",1500000000,900000000], ["地方消費税交付金",13900000000,12500000000],
      ["環境性能割交付金",1000,140000000], ["地方特例交付金",368000000,200000000],
      ["特別区交付金",52000000000,48000000000], ["交通安全対策特別交付金",31000000,31000000],
      ["分担金及び負担金",745630000,1424910000], ["使用料及び手数料",4676738000,4694430000],
      ["国庫支出金",38486163000,42285199000], ["都支出金",26159266000,26033242000],
      ["財産収入",1052883000,825058000], ["寄附金",631001000,128001000],
      ["繰入金",19577139000,18423620000], ["繰越金",4000000000,4000000000],
      ["諸収入",6156759000,7360405000], ["特別区債",0,6450000000]
    ],
    spending: [
      ["議会費",832747000,828057000], ["総務費",27086768000,36060317000], ["民生費",120081607000,114315076000],
      ["衛生費",19063814000,16917459000], ["産業経済費",3876763000,3750334000], ["土木費",31139944000,32550034000],
      ["教育費",33184450000,28671916000], ["公債費",1347907000,1369807000], ["予備費",300000000,300000000]
    ]
  },
  projects: [],
  petitionFollowup: {},
  reviews: {},
  // 地域センターの所管区域は番・号の単位で決まり、町丁目が2つの地区にまたがることがある。
  // 町丁目の大部分を所管する地域センターの地区を「主な地区」とする。
  // 他方の地区には、町会データにある番地の範囲だけを「一部」として示す。
  areas: {
    source: {
      label: "品川区地域センターの設置に関する条例 新旧対照表（第14号議案 区民委員会資料）",
      url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/2021.02.22.ku01.pdf",
      locator: "別表（第２条関係） 所管区域（新）",
      checkedAt: "2026-11-28"
    },
    townDistricts: {
      "東五反田2丁目": "大崎", // 大崎第一 1～15番／品川第一 16～22番
      "東五反田3丁目": "大崎", // 大崎第一 1～17番ほか／品川第一 18・19番、20番17号
      "小山台1丁目": "荏原", // 荏原第一 1～31番ほか／大崎第一 32・33番の一部
      "荏原1丁目": "荏原", // 荏原第一／大崎第一 桐ケ谷通り沿いの一部
      "小山1丁目": "荏原", // 荏原第一／大崎第一 1～4番の一部
      "西品川1丁目": "大崎", // 大崎第二 1～24・27番／荏原第五 25・26・28～30番
      "西品川2丁目": "大崎", // 大崎第二／荏原第五 9番の一部
      "戸越1丁目": "荏原", // 荏原第三 1～24番ほか／大崎第二 25～31番の一部
      "豊町1丁目": "荏原", // 荏原第五／大崎第二 2番の一部
      "大井2丁目": "大井", // 大井第二 1番3～25号、2～27番／荏原第五 1番の一部
      "二葉1丁目": "荏原", // 荏原第五 1～20番ほか／大井第二 21・22番の一部
      "西大井6丁目": "大井" // 大井第三 2～18番／荏原第四 1番
    }
  }
};

(() => {
  const civic = window.SHINAGAWA_CIVIC_SOURCES;
  const votePdf = "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/";

  /**
   * 1会期分の表決を登録する。列順・会派は会期ごとの公式表のまま持つ。
   * 議長の列は記号の代わりに「長」。無所属議員は会派の票として合算しない。
   * @param {string} sessionId 会議ID（例 "r08-3t"）
   * @param {{name: string, file: string, checkedAt: string, groups: [string, string][], common: string, rows: [string, number, string?][]}} table
   * @returns {void}
   */
  function addVoteSession(sessionId, { name, file, checkedAt, groups, common, rows }) {
    const roster = groups.flatMap(([group, members]) => members.split(" ").map(memberId => ({ group, memberId })));
    const chairColumn = common.indexOf("長");
    if (chairColumn < 0 || common.length !== roster.length) throw new Error(`${sessionId} の表決の列数が名簿と一致しません`);
    civic.voteSessions[sessionId] = {
      name, roster, chairColumn,
      source: { label: `${name} 議案と各議員の賛否の状況`, url: votePdf + file, checkedAt }
    };
    for (const [number, page, symbols = common] of rows) {
      civic.votes[`${sessionId}:${number}`] = {
        session: sessionId, page, symbols,
        type: symbols.includes("×") ? "split" : "unanimous",
        locator: `${page}頁 ${number}`
      };
    }
  }

  addVoteSession("r07-1t", {
    name: "令和7年第1回定例会", file: "r07_01t_s.pdf", checkedAt: "2026-11-25",
    groups: [
      ["自民", "hideo_ishida masato_enoshita arata_koshiba emiko_sawada mari_seo nobuaki_takahashi naoko_nishimura kazumasa_matsuzawa yuichi_watanabe"],
      ["公明", "hiroo_akutsu takako_konno yoshihiro_tsukamoto shinichiro_tsuru saeko_niizuma masaharu_yukita hiroki_wakabayashi"],
      ["未来", "takahiro_okura kengo_kimura x-higashi-yuki yoshihiro_matsunaga yasuyuki_yamamoto yumiko_yoshida"],
      ["共産", "taisaku_ando chihiro_ishida hiroko_suzuki toshifumi_nodate"],
      ["品改", "yukihiro_sugai tsutsui_yosuke masanori_fujiwara"],
      ["維新", "mao_seraku tokihiro_matsumoto"],
      ["無所属", "x-ishida-shingo ayaka_ogino shinji_takahashi takeshi_tanaka ryo_nakatsuka takako_nishimoto satoshi_yanagisawa yukari_yokoyama"]
    ],
    common: "〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇〇欠〇〇〇〇〇〇〇〇〇〇〇〇欠〇〇〇〇〇〇〇〇",
    rows: Array.from({ length: 21 }, (_, index) => {
      const number = 10 + index;
      const split = {
        10: "〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇〇欠〇〇〇〇××××〇〇〇〇欠〇〇〇〇×〇×〇",
        12: "〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇〇欠〇〇〇〇××××〇〇〇〇欠〇〇〇〇×〇×〇",
        30: "〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇〇欠〇〇〇〇××××〇〇〇〇欠〇〇〇〇×〇〇〇"
      };
      return [`第${number}号議案`, 1, split[number]];
    })
  });

  // 令和8年第3回：会派構成が変わり37列。議長（渡辺ゆういち）は16列目。決算の認定は表に載っていない
  addVoteSession("r08-3t", {
    name: "令和8年第3回定例会", file: "r08_03t_s.pdf", checkedAt: "2026-11-27",
    groups: [
      ["未来", "takahiro_okura ayaka_ogino kengo_kimura takeshi_tanaka tsutsui_yosuke takako_nishimoto masanori_fujiwara yoshihiro_matsunaga yasuyuki_yamamoto"],
      ["自民", "hideo_ishida masato_enoshita arata_koshiba emiko_sawada mari_seo kazumasa_matsuzawa yuichi_watanabe"],
      ["公明", "hiroo_akutsu takako_konno yoshihiro_tsukamoto shinichiro_tsuru saeko_niizuma masaharu_yukita hiroki_wakabayashi"],
      ["共産", "taisaku_ando chihiro_ishida hiroko_suzuki toshifumi_nodate"],
      ["維新", "mao_seraku tokihiro_matsumoto"],
      ["無所属", "yukihiro_sugai shinji_takahashi nobuaki_takahashi ryo_nakatsuka naoko_nishimura satoshi_yanagisawa yukari_yokoyama yumiko_yoshida"]
    ],
    common: "〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇",
    // 公式表の行順：第85号〜第106号、第84号（補正予算）、議員提出第3号
    rows: [
      ...Array.from({ length: 22 }, (_, index) => [`第${85 + index}号議案`, 1]),
      ["第84号議案", 1],
      ["議員提出第3号議案", 1]
    ].map(([number, page]) => number === "第106号議案"
      ? [number, page, "〇〇〇〇〇〇〇〇〇〇〇〇〇〇〇長〇〇〇〇〇〇〇××××〇〇〇〇〇×〇×〇×"]
      : [number, page])
  });
  const ordinance = { label: "第80号議案 品川区児童相談所設置条例", url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r05_04t_04.pdf", locator: "提出文および条例第1条・附則" };
  const implementation = { label: "広報しながわ 2025年11月11日号", url: "https://www.city.shinagawa.tokyo.jp/kusei/kohokocho/1005753/1005894/1006269/1006403/1006406.html", locator: "児童相談所開設1年" };
  const evaluation = { label: "令和7年度事務事業評価結果", url: "https://www.city.shinagawa.tokyo.jp/kusei/shisakukeikaku/1005171/1005172/1005173.html", locator: "行政評価シート（品川区児童相談所）。令和6年度実施事業が対象" };
  const evaluationPdf = "https://www.city.shinagawa.tokyo.jp/_res/projects/default_project/_page_/001/005/173/20240222105532_42.pdf";
  const billId = "r05-4t:第80号議案";
  civic.projects.push({
    id: "child-guidance-center", name: "品川区児童相談所の設置・運営",
    purpose: "子どもに関する相談を受け、子どもと家庭を支援する。",
    office: "子ども未来部（組織条例の分掌事務）", startYear: "令和6年度",
    audience: "原則として18歳未満の子どもとその家庭",
    legal: "児童福祉法第12条第1項・第59条の4第1項、品川区児童相談所設置条例",
    bills: [billId],
    finance: [
      { id: "transfer", label: "児童相談所移管推進事業", budgetYen: 83460000, settledYen: 78844000, rate: 94.5, evaluation: "D 完了・廃止する事業", page: 1 },
      { id: "operations", label: "児童相談所運営費", budgetYen: 172439000, settledYen: 149439000, rate: 86.7, evaluation: "A 拡大する事業", page: 2 },
      { id: "temporary-care", label: "一時保護所運営費", budgetYen: 49434000, settledYen: 40106000, rate: 81.1, evaluation: "B 継続する事業", page: 3 },
      { id: "maintenance", label: "児童相談所維持管理経費", budgetYen: 82501000, settledYen: 76933000, rate: 93.3, evaluation: "B 継続する事業", page: 4 }
    ].map(account => ({
      ...account, year: "令和6年度", evaluationYear: "令和7年度",
      source: { label: "令和7年度事務事業評価シート（品川区児童相談所）", url: evaluationPdf + "#page=" + account.page,
        locator: account.page + "頁「4 予算・決算（概要）」「6 評価」" }
    })),
    indicators: [{
      label: "虐待相談対応件数", target: 913, actual: 602, unit: "件",
      year: "令和6年度", source: { label: "児童相談所運営費の評価シート", url: evaluationPdf + "#page=2", locator: "2頁「3 事業の実績・課題」" }
    }, {
      label: "外部専門研修参加人数", target: 228, actual: 178, unit: "人（延べ）",
      year: "令和6年度", source: { label: "児童相談所運営費の評価シート", url: evaluationPdf + "#page=2", locator: "2頁「3 事業の実績・課題」" }
    }],
    changes: ["令和6年度に移管推進事業を完了。開設後は運営・維持管理の各事業を開始（公式評価シート1頁）"],
    timeline: [
      { date: "2023-11-22", label: "設置条例案を提出", source: ordinance },
      { date: "2024-10-01", label: "区が東京都から相談事務の移管を受け、児童相談所を開設", source: implementation },
      { date: "令和7年度", label: "令和6年度実施の4小事業を事務事業評価", source: evaluation }
    ],
    sources: [ordinance, implementation, evaluation, {
      label: "令和5年第4回定例会 提出議案等",
      url: "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r05_04t/r05_04t1-2",
      locator: "第77号・第80号議案"
    }]
  });
  civic.billDetails = {
    [billId]: {
      policy: "子ども・子育て",
      easy: "品川区が、子どもと家族のための相談所を設ける案です。2024年10月1日から施行されます。",
      detail: "児童福祉法に基づいて品川区児童相談所を設置し、名称・位置・所管区域を定めます。",
      points: "品川区の全域を所管する児童相談所を北品川三丁目に設置する。",
      impact: "東京都から相談事務が移管され、品川区児童相談所が子どもに関する相談を受け付ける。",
      affected: "原則として18歳未満の子どもとその家庭。",
      timeline: [{ date: "2023-11-22", label: "区長が議案を提出", url: ordinance.url }],
      related: [{ label: "児童相談所の事業ごとの記録", url: "jigyo.html?id=child-guidance-center" }, implementation]
    }
  };
  const taxPetitionOutcome = [{
    stage: "議会からの意見書", date: "2025-10-23",
    text: "品川区議会は東京都に対し、令和8年度以降も固定資産税・都市計画税の軽減措置を継続するよう求める意見書を議決した。",
    source: {
      label: "令和7年10月23日 固定資産税・都市計画税の軽減措置の継続を求める意見書",
      url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r07_03t_04.pdf",
      locator: "本文・日付"
    },
    relation: {
      label: "令和7年10月22日 議会運営委員会会議録（請願第12号・第17号との対応）",
      url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/2025.10.22gu.pdf"
    }
  }];
  for (const id of ["p-r07-s12", "p-r07-s17"]) civic.petitionFollowup[id] = taxPetitionOutcome;
  const newsletter = {
    label: "品川区議会だより第292号",
    url: "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/tayori/292/292_p6-7.pdf",
    locator: "7頁 採択した請願・陳情に対する区の対応について"
  };
  civic.petitionFollowup["p-r03-s12"] = [
    { stage: "行政による対応", date: "2022-04-26", text: "区は、隣地に集合住宅を計画した事業者に現状変更届の提出を求めたと公表した。", source: newsletter },
    { stage: "継続的な課題", date: "2022-04-26", text: "教育委員会は、神社と事業者の見解が異なり、調整を続ける方針だと公表した。", source: newsletter }
  ];
  civic.petitionFollowup["p-r03-c56"] = [
    { stage: "行政による対応", date: "2022-04-26", text: "区は、大崎駅東口の閉鎖中の喫煙所を密閉型に改めて再開する計画と、事業所への助言・啓発を公表した。", source: newsletter }
  ];
  civic.reviews[billId] = { ai: true };
  civic.reviewedSources = { [billId]: [ordinance, implementation] };
})();
