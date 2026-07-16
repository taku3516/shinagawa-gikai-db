/* 令和8年の全件表示用補足データ。元の年データを読み込んだ直後に適用します。 */
(() => {
  "use strict";

  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r08;
  if (!year) throw new Error("令和8年データの読み込み後に r08-complete.js を読み込んでください");

  const retainedBills = (year.bills || []).filter((bill) =>
    bill.meetingId !== "r08-1t" && bill.meetingId !== "r08-2t"
  );

  year.bills = [
  {
    "meetingId": "r08-1t",
    "number": "第10号 議案",
    "proposer": "区長提出",
    "title": "第10号 議案 品川区公告式条例の一部を改正する条例",
    "summary": "条例および規則の公布方法等を見直す。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_10.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第11号 議案",
    "proposer": "区長提出",
    "title": "第11号 議案 品川区行政手続条例の一部を改正する条例",
    "summary": "行政手続法が改正されたことに伴い、聴聞の実施等に係る通知の公示の方法を見直す必要がある。 施行期日 令和８年５月２１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_11.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第12号 議案",
    "proposer": "区長提出",
    "title": "第12号 議案 品川区長等の損害賠償責任の一部免責に関する条例の一部を改正する条例",
    "summary": "地方自治法等が改正されたことに伴い、規定を整備する。 施行期日 令和８年９月２４日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_12.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第13号 議案",
    "proposer": "区長提出",
    "title": "第13号 議案 品川区職員等のハラスメントの防止等に関する条例",
    "summary": "職員等に対するハラスメントの防止等を図るため、必要な事項を定める。 〔規定する主な事項〕 ⑴ 区長等、職員および管理監督者の責務 ⑵ ハラスメントの防止等のための措置 ⑶ ハラスメントに係る苦情相談を申し出た職員等への対応 ⑷ 品川区ハラスメント問題調査委員会等の設置 その他 付則において、「品川区附属機関の構成員の報酬および費用弁償に関する条例」の一部を改正する。 施行期日 令和８年７月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_13.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第14号 議案",
    "proposer": "区長提出",
    "title": "第14号 議案 品川区職員定数条例の一部を改正する条例",
    "summary": "児童相談所の体制整備および行財政の見直しに伴い、職員の定数上の措置を行うほか、規定を整備する。 〔現 行〕 ２，７０３人 〔改正後〕 ２，７５２人 （令和９年３月３１日までは、１２０人を限度として定数外とする。） 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_14.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第15号 議案",
    "proposer": "区長提出",
    "title": "第15号 議案 公益的法人等への職員の派遣等に関する条例の一部を改正する条例",
    "summary": "「公益的法人等への一般職の地方公務員の派遣等に関する法律」に基づき職員を派遣することができる団体を追加する。 〔追加する団体〕 地方税共同機構 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_15.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第16号 議案",
    "proposer": "区長提出",
    "title": "第16号 議案 非常勤職員の報酬および費用弁償に関する条例の一部を改正する条例",
    "summary": "非常勤職員に係る報酬の上限額を見直す。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_16.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第17号 議案",
    "proposer": "区長提出",
    "title": "第17号 議案 職員の給与に関する条例の一部を改正する条例",
    "summary": "特別区人事委員会勧告等を踏まえ、条例の一部を改正する。 ⑴ 一般事務、栄養士、保健師等の管理職に係る給料表を改める。 ⑵ 一般事務等の部長級の職員について、標準の昇給号給数を零号給に見直す。 ⑶ 管理職員特別勤務手当の支給対象時間等を見直す。 ⑷ 技能・業務系職員に係る給料表を改める。 その他 付則において、「職員の給与に関する条例の一部を改正する条例」の一部改正を行う。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_17.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第18号 議案",
    "proposer": "区長提出",
    "title": "第18号 議案 公立の義務教育諸学校等の教育職員の給与等に関する特別措置法等の一部を改正する法律の施行に伴う関係条例の整備に関する条例",
    "summary": "「公立の義務教育諸学校等の教育職員の給与等に関する特別措置法等の一部を改正する法律」が施行され、主務教諭の職が創設されることに伴い、関係条例の規定を整備する。 〔改正する条例〕 ⑴ 職員の勤務時間、休日、休暇等に関する条例 ⑵ 学校教育職員の勤務時間、休日、休暇等に関する条例 ⑶ 学校教育職員の給与等に関する特別措置に関する条例 ⑷ 学校教育職員の旅費に関する条例 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_18.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第19号 議案",
    "proposer": "区長提出",
    "title": "第19号 議案 品川区立児童センター条例の一部を改正する条例",
    "summary": "東五反田児童センターの所在地を変更する。 〔現 行〕 品川区東五反田五丁目２４番１号 〔改正後〕 品川区西五反田六丁目６番１８号 施行期日 令和８年７月２１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_19.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第20号 議案",
    "proposer": "区長提出",
    "title": "第20号 議案 品川区子ども家庭支援センター条例の一部を改正する条例",
    "summary": "品川区子ども家庭支援センターおよび品川区地域子ども家庭支援センター荏原の位置を変更する。 ⑴ 品川区子ども家庭支援センター 〔現 行〕 品川区二葉一丁目７番１５号 〔改正後〕 品川区広町二丁目１番３６号 ⑵ 品川区地域子ども家庭支援センター荏原 〔現 行〕 品川区西五反田六丁目６番６号 〔改正後〕 品川区荏原二丁目９番６号 施行期日 品川区子ども家庭支援センターに係る改正規定は令和８年４月２７日、品川区地域子ども家庭支援センター荏原に係る改正規定は同年５月７日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_20.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第21号 議案",
    "proposer": "区長提出",
    "title": "第21号 議案 品川区立保育所条例の一部を改正する条例",
    "summary": "公私連携型保育所へ移行するため三ツ木保育園を廃止するほか、東五反田保育園の所在地を変更する。 〔東五反田保育園〕 〔現 行〕 品川区東五反田五丁目２４番１号 〔改正後〕 品川区西五反田六丁目６番１８号 施行期日 三ツ木保育園の廃止に係る改正規定は令和８年４月１日、東五反田保育園の所在地変更に係る改正規定は同年７月２１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_21.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第22号 議案",
    "proposer": "区長提出",
    "title": "第22号 議案 品川区乳児等通園支援事業の設備および運営の基準に関する条例の一部を改正する条例",
    "summary": "「乳児等通園支援事業の設備及び運営に関する基準」が改正されたことに伴い、規定を整備する。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_22.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第23号 議案",
    "proposer": "区長提出",
    "title": "第23号 議案 品川区特定乳児等通園支援事業の運営の基準に関する条例",
    "summary": "「こども誰でも通園制度」の創設により、子ども・子育て支援法が改正されたことに伴い、特定乳児等通園支援事業の運営に関する基準を定める。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_23.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第24号 議案",
    "proposer": "区長提出",
    "title": "第24号 議案 品川区立地域密着型多機能ホームおよび品川区立認知症高齢者グループホーム条例の一部を改正する条例",
    "summary": "新たな地域密着型多機能ホームを設置する。 〔名 称〕 品川区立小山台地域密着型多機能ホーム 〔所在地〕 品川区小山台二丁目４番９号 〔提供するサービス〕 ⑴ 小規模多機能型居宅介護 ⑵ 認知症対応型共同生活介護 ⑶ 介護予防小規模多機能型居宅介護 ⑷ 介護予防認知症対応型共同生活介護 施行期日 令和１０年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_24.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第25号 議案",
    "proposer": "区長提出",
    "title": "第25号 議案 品川区立特別養護老人ホーム条例の一部を改正する条例",
    "summary": "新たな特別養護老人ホームを設置する。 〔名 称〕 品川区立小山台特別養護老人ホーム 〔所在地〕 品川区小山台二丁目４番５号 〔提供するサービス〕 ⑴ 介護福祉施設サービス ⑵ 短期入所生活介護 施行期日 令和１０年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_25.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第26号 議案",
    "proposer": "区長提出",
    "title": "第26号 議案 品川区立知的障害者福祉施設条例の一部を改正する条例",
    "summary": "新たな知的障害者福祉施設を設置するほか、規定を整備する。 〔名 称〕 品川区立小山台福祉園 〔所在地〕 品川区小山台二丁目５番１３号 〔提供するサービス〕 ⑴ 生活介護 ⑵ 就労継続支援 施行期日 令和１０年４月１日（規定整備に関する改正規定は、公布の日）",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_26.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第27号 議案",
    "proposer": "区長提出",
    "title": "第27号 議案 品川区立大原児童発達支援センター条例の一部を改正する条例",
    "summary": "新たな児童発達支援センターを設置するほか、規定を整備する。 〔名 称〕 品川区立小山台児童発達支援センター 〔所在地〕 品川区小山台二丁目５番１３号 〔事 業〕 ⑴ 児童発達支援 ⑵ 放課後等デイサービス ⑶ 保育所等訪問支援 ⑷ 障害児相談支援事業 ⑸ 特定相談支援事業 など 施行期日 令和１０年４月１日（規定整備に関する改正規定は、公布の日）",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_27.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第28号 議案",
    "proposer": "区長提出",
    "title": "第28号 議案 品川区立心身障害者福祉会館条例の一部を改正する条例",
    "summary": "「障害者の日常生活及び社会生活を総合的に支援するための法律」が改正されたことに伴い、規定を整備する。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_28.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第29号 議案",
    "proposer": "区長提出",
    "title": "第29号 議案 品川区立障害児者総合支援施設条例の一部を改正する条例",
    "summary": "「児童福祉法」および「障害者の日常生活及び社会生活を総合的に支援するための法律」が改正されたことに伴い、規定を整備する。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_29.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第30号 議案",
    "proposer": "区長提出",
    "title": "第30号 議案 障害者の日常生活及び社会生活を総合的に支援するための法律等の一部を改正する法律の施行に伴う関係条例の整理に関する条例",
    "summary": "「障害者の日常生活及び社会生活を総合的に支援するための法律」が改正されたことに伴い、関係条例の規定を整備する。 〔改正する条例〕 ⑴ 品川区立知的障害者グループホーム条例 ⑵ 品川介護福祉専門学校修学資金貸付条例 ⑶ 品川区立発達障害者支援施設条例 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_30.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第31号 議案",
    "proposer": "区長提出",
    "title": "第31号 議案 品川区介護保険制度に関する条例の一部を改正する条例",
    "summary": "令和８年度における保険料率の算定に関する基準等の特例を定める。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_31.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第32号 議案",
    "proposer": "区長提出",
    "title": "第32号 議案 品川区立高齢者住宅条例の一部を改正する条例",
    "summary": "アツミマンションの使用料を改める。 〔現 行〕 月額７万２，０００円 〔改正後〕 月額７万８，０００円 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_32.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第33号 議案",
    "proposer": "区長提出",
    "title": "第33号 議案 品川区後期高齢者医療に関する条例の一部を改正する条例",
    "summary": "地方税法が改正されたことに伴い、公示送達の方法を見直す。 施行期日 「地方税法等の一部を改正する法律」附則第１条第１２号に掲げる規定の施行の日またはこの条例の公布の日のいずれか遅い日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_33.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第34号 議案",
    "proposer": "区長提出",
    "title": "第34号 議案 品川区建築物不燃化促進助成条例の一部を改正する条例",
    "summary": "高齢者および障害者等が耐火建築物等を建築する際の助成金を拡充する。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_34.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第35号 議案",
    "proposer": "区長提出",
    "title": "第35号 議案 品川区自転車等の放置防止および自転車等駐車場の整備に関する条例の一部を改正する条例",
    "summary": "自転車を利用する場合における区営自転車等駐車場の定期利用に係る使用料の上限額を改める。 〔現 行〕 ２，５００円 〔改正後〕 ２，３００円 施行期日 令和８年１０月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_35.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第36号 議案",
    "proposer": "区長提出",
    "title": "第36号 議案 品川区立学校の学校医、学校歯科医および学校薬剤師の公務災害補償に関する条例の一部を改正する条例",
    "summary": "「公立学校の学校医、学校歯科医及び学校薬剤師の公務災害補償の基準を定める政令」等が改正されたことに伴い、介護補償の額および補償基礎額を改める。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_36.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第37号 議案",
    "proposer": "区長提出",
    "title": "第37号 議案 学校教育職員の給与に関する条例の一部を改正する条例",
    "summary": "特別区人事委員会勧告等を踏まえ、条例の一部を改正する。 ⑴ 統括副校長および副校長に係る給料表を改める。 ⑵ 管理職員特別勤務手当の支給対象時間等を見直す。 ⑶ 学校教育法が改正され、主務教諭の職が創設されることに伴い、規定を整備する。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_37.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第38号 議案",
    "proposer": "区長提出",
    "title": "第38号 議案 幼稚園教育職員の給与に関する条例の一部を改正する条例",
    "summary": "管理職員特別勤務手当の支給対象時間等を見直す。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_38.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第39号 議案",
    "proposer": "区長提出",
    "title": "第39号 議案 品川区議会議員および品川区長の選挙における選挙運動の公費負担に関する条例の一部を改正する条例",
    "summary": "公職選挙法施行令が改正されたことを踏まえ、区議会議員および区長の選挙運動に係るビラおよびポスターの作成の公費負担の単価を引き上げる。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_39.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第51号 議案",
    "proposer": "区長提出",
    "title": "第51号 議案 品川区国民健康保険条例の一部を改正する条例",
    "summary": "子ども・子育て支援金制度の創設に伴い、当該制度の財源となる子ども・子育て支援納付金賦課額の保険料率等を定めるほか、条例に所要の改正を行う。 ⑴ 子ども・子育て支援納付金賦課額の保険料率について定める。 所得割 １００分の０.２７ 被保険者均等割 １,８００円 １８歳以上被保険者均等割 ７３円 ⑵ 国民健康保険の基礎賦課額、後期高齢者支援金等賦課額、介護納付金賦課額の保険料率等について改める。 〔国民健康保険の基礎賦課額〕 現 行 所得割 １００分の７.７１ 被保険者均等割 ４万７,３００円 基礎賦課限度額 ６６万円 改正後 所得割 １００分の７.５１ 被保険者均等割 ４万７,６００円 基礎賦課限度額 ６７万円 〔後期高齢者支援金等賦課額〕 現 行 所得割 １００分の２.６９ 被保険者均等割 １万６,８００円 改正後 所得割 １００分の２.８０ 被保険者均等割 １万７,６００円 〔介護納付金賦課額〕 現 行 所得割 １００分の２.２５ 被保険者均等割 １万６,６００円 改正後 所得割 １００分の２.４３ 被保険者均等割 １万７,８００円 ⑶ 低所得者の保険料軽減に係る所得基準額を引き上げる。 施行期日 令和８年４月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_51.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第40号 議案",
    "proposer": "区長提出",
    "title": "第40号 議案 電線共同溝等工事（競馬場通り）委託契約の変更について",
    "summary": "⑴ 契約金額の変更について 〔変更前〕 ４億１１９万８，９９７円 〔変更後〕 ６億１，７３９万３，２８９円 ⑵ 支出科目等の変更について 〔変更前〕 令和４年度 一般会計 土木費 道路橋梁費 道路橋梁費 委託料 令和５年度 債務負担行為 令和６年度 債務負担行為 令和７年度 債務負担行為 〔変更後〕 令和４年度 一般会計 土木費 道路橋梁費 道路橋梁費 委託料 令和５年度 債務負担行為 令和６年度 債務負担行為 令和７年度 債務負担行為 令和８年度 債務負担行為 令和９年度 債務負担行為",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_40.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第41号 議案",
    "proposer": "区長提出",
    "title": "第41号 議案 （仮称）勝島人道橋上部工整備工事請負契約の変更について",
    "summary": "契約金額の変更について 〔変更前〕 ６億７，４４５万６，２００円 〔変更後〕 ７億７，３１４万９，３００円",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_41.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第42号 議案",
    "proposer": "区長提出",
    "title": "第42号 議案 勝島地区雨水管整備工事請負契約の変更について",
    "summary": "⑴ 契約金額の変更について 〔変更前〕 ５億８，３３３万円 〔変更後〕 ８億３，７２４万３，０００円 ⑵ 支出科目等の変更について 〔変更前〕 令和６年度 一般会計 土木費 河川費 河川下水道費 工事請負費 令和７年度 債務負担行為 令和８年度 債務負担行為 〔変更後〕 令和６年度 一般会計 土木費 河川費 河川下水道費 工事請負費 令和７年度 債務負担行為 令和８年度 債務負担行為 令和９年度 債務負担行為",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_42.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第43号 議案",
    "proposer": "区長提出",
    "title": "第43号 議案 第二戸越幹線整備工事（取水および空気抜き設備等整備）請負契約の変更について",
    "summary": "契約金額の変更について 〔変更前〕 ２２億７，０１８万円 〔変更後〕 ２４億２，５２３万６，０００円",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_43.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第44号 議案",
    "proposer": "区長提出",
    "title": "第44号 議案 鈴ケ森小学校校舎改築工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ７６億８，６８０万円 ○契約の相手方 鴻池・大洋・小坂建設共同企業体 ○工期 契約締結の日の翌日～令和１３年１２月１９日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_44.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第45号 議案",
    "proposer": "区長提出",
    "title": "第45号 議案 源氏前小学校改築工事請負契約の変更について",
    "summary": "契約金額の変更について 〔変更前〕 ６１億３，２２３万５，１２０円 〔変更後〕 ６２億９，３５７万３，０００円",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_45.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第46号 議案",
    "proposer": "区長提出",
    "title": "第46号 議案 専決処分の承認を求めることについて",
    "summary": "令和７年度品川区一般会計補正予算 ⑴ 歳入歳出予算補正額 ２８７，２６５千円追加 （補正後の歳入歳出予算額 ２４１，８０３，４８０千円）",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_46.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第47号 議案",
    "proposer": "区長提出",
    "title": "第47号 議案 遺贈の放棄について",
    "summary": "遺贈を放棄する。 遺贈の対象となる財産 ⑴ 建 物 構 造 木造スレート葺 地上２階建 延床面積 １３２.０３平方メートル ⑵ 土 地 地 目 宅地 地 積 １７５.５１平方メートル 遺贈の放棄の理由 遺言者の遺志に応えて活用することが困難であるため。",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_47.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第48号 議案",
    "proposer": "区長提出",
    "title": "第48号 議案 指定管理者の指定について",
    "summary": "公の施設の管理を行わせるため、指定管理者を指定する。 ○施設の名称 品川区立障害児者総合支援施設 ○指定管理者 社会福祉法人福栄会 ○指定期間 令和９年４月１日～令和１４年３月３１日",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_48.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第49号 議案",
    "proposer": "区長提出",
    "title": "第49号 議案 東京都後期高齢者医療広域連合規約の変更について",
    "summary": "保険料の軽減措置を延長するため、関係区市町村の負担金を新たに定めることから、東京都後期高齢者医療広域連合の規約を変更する。",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_49.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第50号 議案",
    "proposer": "区長提出",
    "title": "第50号 議案 専決処分の承認を求めることについて",
    "summary": "区民住宅の明渡し等を請求する民事訴訟の提起について 区民住宅の明渡しおよび未払使用料等の支払を請求する民事訴訟の提起について、令和７年１２月２５日に専決処分した。 訴訟内容 ⑴ 訴訟当事者 原告 品川区 被告 ファミーユ西五反田東館居住者 連帯保証人 ⑵ 訴訟の目的の価額 ７２９万７，５２７円",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_50.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第52号 議案",
    "proposer": "区長提出",
    "title": "第52号 議案 プリペイドカードの買入れについて",
    "summary": "○種類および数量 プリペイドカード ４１７，０００枚 ○買入価格 ９,１７４万円 ○契約の方法 随意契約 ○契約の相手方 株式会社アテナ ○納期 令和８年４月３０日",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_52.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第1号 議案",
    "proposer": "区長提出",
    "title": "第1号 議案 令和７年度品川区一般会計補正予算",
    "summary": "⑴ 歳入歳出予算補正額 １０，２２７，６０９千円追加 （補正後の歳入歳出予算額 ２５２，０３１，０８９千円） ⑵ 繰越明許費 ２件 ⑶ 債務負担行為補正件数 追加 ６件",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_01.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第2号 議案",
    "proposer": "区長提出",
    "title": "第2号 議案 令和７年度品川区国民健康保険事業会計補正予算",
    "summary": "⑴ 歳入歳出予算補正額 １，５６２，０９９千円追加 （補正後の歳入歳出予算額 ３５，９４６，６１４千円）",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_01.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第3号 議案",
    "proposer": "区長提出",
    "title": "第3号 議案 令和７年度品川区後期高齢者医療特別会計補正予算",
    "summary": "⑴ 歳入歳出予算補正額 ３２１，８４４千円追加 （補正後の歳入歳出予算額 １１，３２２，０８１千円）",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_01.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第4号 議案",
    "proposer": "区長提出",
    "title": "第4号 議案 令和７年度品川区介護保険特別会計補正予算",
    "summary": "⑴ 歳入歳出予算補正額 １，０４６，５１３千円追加 （補正後の歳入歳出予算額 ２９，１５７，０７３千円）",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_01.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第5号 議案",
    "proposer": "区長提出",
    "title": "第5号 議案 令和８年度品川区一般会計予算",
    "summary": "⑴ 歳入歳出予算額 ２３６，９１４，０００千円 ⑵ 債務負担行為 ４０件 ⑶ 一時借入金 最高額 ５０億円",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_05.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第6号 議案",
    "proposer": "区長提出",
    "title": "第6号 議案 令和８年度品川区国民健康保険事業会計予算",
    "summary": "⑴ 歳入歳出予算額 ３４，８４８，７９５千円",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_05.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第7号 議案",
    "proposer": "区長提出",
    "title": "第7号 議案 令和８年度品川区後期高齢者医療特別会計予算",
    "summary": "⑴ 歳入歳出予算額 １１，９３７，２０８千円",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_05.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第8号 議案",
    "proposer": "区長提出",
    "title": "第8号 議案 令和８年度品川区介護保険特別会計予算",
    "summary": "⑴ 歳入歳出予算額 ２９，０９３，２４９千円",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_05.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第9号 議案",
    "proposer": "区長提出",
    "title": "第9号 議案 令和８年度品川区災害復旧特別会計予算",
    "summary": "⑴ 歳入歳出予算額 １，５００，０００千円",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_05.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第53号 議案",
    "proposer": "区長提出",
    "title": "第53号 議案 教育委員会教育長の任命同意について",
    "summary": "地方教育行政の組織及び運営に関する法律第４条第１項の規定により、伊﨑 みゆき氏を教育委員会教育長に任命することに同意した。",
    "tags": [
      "人事等"
    ],
    "result": "同意",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_53.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第54号 議案",
    "proposer": "区長提出",
    "title": "第54号 議案 教育委員会委員の任命同意について",
    "summary": "地方教育行政の組織及び運営に関する法律第４条第２項の規定により、吉村 潔氏を教育委員に任命することに同意した。",
    "tags": [
      "人事等"
    ],
    "result": "同意",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_54.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "第55号 議案",
    "proposer": "区長提出",
    "title": "第55号 議案 人権擁護委員の推薦につき意見を求めることについて",
    "summary": "人権擁護委員法第６条第３項の規定により、原 敦子氏を人権擁護委員に推薦することに賛成した。",
    "tags": [
      "人事等"
    ],
    "result": "賛成",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_55.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "議員提出 第1号 議案",
    "proposer": "議員提出",
    "title": "議員提出 第1号 議案 「不合理な税制改正」に反対する意見書",
    "summary": "議員提出の意見書・決議です。",
    "tags": [
      "意見書・決議"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_g1.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "議員提出 第2号 議案",
    "proposer": "議員提出",
    "title": "議員提出 第2号 議案 米国とイスラエルによるイランへの先制攻撃に抗議する決議",
    "summary": "議員提出の意見書・決議です。",
    "tags": [
      "意見書・決議"
    ],
    "result": "原案否決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_g2.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第60号 議案",
    "proposer": "区長提出",
    "title": "第60号 議案 品川区特別区税条例の一部を改正する条例",
    "summary": "地方税法等が改正されたことに伴い、条例の一部を改正する。 ⑴ 公益信託の信託財産とするために支出した当該公益信託に係る信託事務に関連する寄附金を特別区民税における寄附金税額控除の対象とする。 ⑵ 特別区民税における公的年金等受給者に係る扶養親族等申告書の提出義務の範囲を拡大する。 ⑶ 特別区民税における医療費控除の特例について、スイッチＯＴＣ医薬品の購入の対価に係る部分はその適用期限を撤廃するとともに、スイッチＯＴＣ医薬品以外の医薬品の購入の対価に係る部分はその適用期限を５年延長するほか、住宅借入金等特別税額控除について、適用期限を５年延長する。 ⑷ 特別区民税の寄附金税額控除における控除額の算定に利用する割合を改める。 ⑸ 特別区民税における優良住宅地の造成等のために土地等を譲渡した場合の長期譲渡所得の課税の特例の適用対象を見直す。 施行期日 令和９年１月１日（寄附金税額控除における控除額の算定に利用する割合を改める改正規定および優良住宅地の造成等のために土地等を譲渡した場合の長期譲渡所得の課税の特例に関する改正規定は、令和１０年１月１日）",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_60.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第61号 議案",
    "proposer": "区長提出",
    "title": "第61号 議案 品川区附属機関の構成員の報酬および費用弁償に関する条例の一部を改正する条例",
    "summary": "品川区いじめ問題調査委員会および品川区いじめ対策委員会の委員の報酬日額を増額する。 〔現 行〕 報酬日額 委員長 ２万３，０００円 委 員 ２万０，０００円 〔改正後〕 報酬日額 委員長 ３万０，０００円 委 員 ２万３，０００円 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_61.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第62号 議案",
    "proposer": "区長提出",
    "title": "第62号 議案 品川区立就学前乳幼児教育施設条例の一部を改正する条例",
    "summary": "子ども・子育て支援法施行令が改正されたことに伴い、保育の必要性の認定を受けた幼児に係る預かり保育利用料を軽減するほか、規定を整備する。 施行期日 令和８年１０月１日（規定整備に関する改正規定は、公布の日）",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_62.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第63号 議案",
    "proposer": "区長提出",
    "title": "第63号 議案 品川区立保育所における時間外保育等に関する条例の一部を改正する条例",
    "summary": "子ども・子育て支援法施行規則が改正されたことに伴い、区立認定こども園における保育の必要性の認定を受けた児童に係る預かり保育利用料を軽減する。 施行期日 令和８年１０月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_63.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第64号 議案",
    "proposer": "区長提出",
    "title": "第64号 議案 品川区介護保険制度に関する条例の一部を改正する条例",
    "summary": "令和８年度における前年度非課税者に係る保険料の減免に関する特例を定める。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_64.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第65号 議案",
    "proposer": "区長提出",
    "title": "第65号 議案 品川区手数料条例の一部を改正する条例",
    "summary": "受益者負担の適正化を図るため、「マンションの建替え等の円滑化に関する法律」が改正されたことに伴い、マンション除却事業等の登記に関する証明書の交付に係る手数料を定めるとともに、マンションの建替えによる特例の許可申請に係る手数料を見直すほか、規定を整備する。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_65.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第66号 議案",
    "proposer": "区長提出",
    "title": "第66号 議案 品川区地区計画等の区域内における建築物の制限に関する条例の一部を改正する条例",
    "summary": "「大崎駅東口第４地区地区計画」の区域内における建築物の用途、敷地等について制限を定める。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_66.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第67号 議案",
    "proposer": "区長提出",
    "title": "第67号 議案 品川区文化財保護条例の一部を改正する条例",
    "summary": "区の区域内に存する文化財の保存および活用のため、区登録文化財の登録等に係る手続、管理または修理の補助等を定めるとともに、区民の責務を見直すほか、規定を整備する。 施行期日 令和８年８月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_67.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第68号 議案",
    "proposer": "区長提出",
    "title": "第68号 議案 品川区立学校の学校医、学校歯科医および学校薬剤師の公務災害補償に関する条例の一部を改正する条例",
    "summary": "「都立学校の学校医、学校歯科医及び学校薬剤師の公務災害補償に関する条例」が改正されたことを踏まえ、補償基礎額を改める。 施行期日 公布の日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_68.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第69号 議案",
    "proposer": "区長提出",
    "title": "第69号 議案 品川区立幼稚園条例の一部を改正する条例",
    "summary": "子ども・子育て支援法施行規則が改正されたことに伴い、保育の必要性の認定を受けた児童に係る預かり保育利用料を軽減する。 施行期日 令和８年１０月１日",
    "tags": [
      "条例議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_69.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第70号 議案",
    "proposer": "区長提出",
    "title": "第70号 議案 東五反田保育園・児童センター改築工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 １３億６３６万円 ○契約の相手方 立・兼藤建設共同企業体 ○工期 契約締結の日の翌日～令和１０年１１月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_70.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第71号 議案",
    "proposer": "区長提出",
    "title": "第71号 議案 東五反田保育園・児童センター改築機械設備工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ２億２，８８０万円 ○契約の相手方 大成温・野田建設共同企業体 ○工期 契約締結の日の翌日～令和１０年１１月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_71.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第72号 議案",
    "proposer": "区長提出",
    "title": "第72号 議案 東五反田保育園・児童センター改築電気設備工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ３億２，７２９万４，０００円 ○契約の相手方 中尾・コスモ建設共同企業体 ○工期 契約締結の日の翌日～令和１０年１１月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_72.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第73号 議案",
    "proposer": "区長提出",
    "title": "第73号 議案 品川区清掃事務所北品川分室新築工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 １８億４，８００万円 ○契約の相手方 小川・加地建設共同企業体 ○工期 契約締結の日の翌日～令和１０年６月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_73.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第74号 議案",
    "proposer": "区長提出",
    "title": "第74号 議案 品川区清掃事務所北品川分室新築機械設備工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ４億８，９５０万円 ○契約の相手方 横河・オオサキ建設共同企業体 ○工期 契約締結の日の翌日～令和１０年６月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_74.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第75号 議案",
    "proposer": "区長提出",
    "title": "第75号 議案 品川区清掃事務所北品川分室新築電気設備工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ４億４，７７０万円 ○契約の相手方 マスミ・中尾建設共同企業体 ○工期 契約締結の日の翌日～令和１０年６月３０日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_75.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第76号 議案",
    "proposer": "区長提出",
    "title": "第76号 議案 電線共同溝等工事（特別区道Ⅰ－２４１号）委託契約",
    "summary": "○契約の方法 随意契約 ○契約金額 ３億１，９０９万９，４５９円 ○契約の相手方 東電タウンプランニング株式会社 ○工期 契約締結の日の翌日～令和１２年３月３１日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_76.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第77号 議案",
    "proposer": "区長提出",
    "title": "第77号 議案 東大井公園改修工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ５億７，４６４万円 ○契約の相手方 日パブ・西村建設共同企業体 ○工期 契約締結の日の翌日～令和１０年２月２２日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_77.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第78号 議案",
    "proposer": "区長提出",
    "title": "第78号 議案 西大井広場公園（北側）改修等工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 ５億２，３００万９，０８０円 ○契約の相手方 東急グリーン・日緑建設共同企業体 ○工期 契約締結の日の翌日～令和１０年３月１日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_78.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第79号 議案",
    "proposer": "区長提出",
    "title": "第79号 議案 鈴ケ森小学校校舎改築電気設備工事請負契約",
    "summary": "○契約の方法 制限付き一般競争入札による契約 ○契約金額 １０億４３０万円 ○契約の相手方 マスミ・小峯建設共同企業体 ○工期 契約締結の日の翌日～令和１２年３月２８日",
    "tags": [
      "契約議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_79.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第80号 議案",
    "proposer": "区長提出",
    "title": "第80号 議案 児童相談所を設置する特別区における措置費共同経理課の共同設置に関する規約の変更について",
    "summary": "措置費共同経理課を共同設置する特別区に杉並区を加えるため、「児童相談所を設置する特別区における措置費共同経理課の共同設置に関する規約」を変更する。",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_80.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第81号 議案",
    "proposer": "区長提出",
    "title": "第81号 議案 キャビネット他の買入れについて",
    "summary": "○種類および数量 学校運営用製品一式 ○買入価格 １億２，６１１万５，０００円 ○契約の方法 制限付き一般競争入札による契約 ○契約の相手方 株式会社マルエー ○納期 令和８年８月２８日",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_81.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第82号 議案",
    "proposer": "区長提出",
    "title": "第82号 議案 スチームコンベクションオーブン他の買入れについて",
    "summary": "○種類および数量 学校給食業務用製品一式 ○買入価格 ７，１１７万７，７００円 ○契約の方法 制限付き一般競争入札による契約 ○契約の相手方 株式会社マルゼン品川支社 ○納期 令和８年８月２５日",
    "tags": [
      "事件議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_82.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第59号 議案",
    "proposer": "区長提出",
    "title": "第59号 議案 令和８年度品川区一般会計補正予算",
    "summary": "⑴ 歳入歳出予算補正額 ３０３，４３１千円追加 （補正後の歳入歳出予算額 ２３９，２３８，５３１千円） ⑵ 債務負担行為補正件数 追加 ７件 変更 １件",
    "tags": [
      "予算議案"
    ],
    "result": "原案可決",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_02t_59.pdf"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "第83号 議案",
    "proposer": "区長提出",
    "title": "第83号 議案 人権擁護委員の推薦につき意見を求めることについて",
    "summary": "人権擁護委員法第６条第３項の規定により、松尾 和英氏を人権擁護委員に推薦することに賛成した。",
    "tags": [
      "人事等"
    ],
    "result": "賛成",
    "links": [
      {
        "type": "official",
        "label": "公式の議案一覧を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      },
      {
        "type": "official",
        "label": "議案資料PDFを見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/r08_01t_83.pdf"
      }
    ]
  }
]
    .concat(retainedBills);

  year.petitions = [
  {
    "meetingId": "r08-1t",
    "number": "令和8年請願 第1号",
    "title": "一人ひとりの子どもが大切にされる品川区を求める請願",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年請願 第2号",
    "title": "インボイス制度見直しの意見書提出を要望する請願",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和7年陳情 第57号",
    "title": "誰一人とりこぼさない品川区のために、真のニーズ分析から、優先的に対応すべき事業を踏まえた障害福祉計画を策定するよう、区に求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和7年陳情 第58号",
    "title": "国交省通達において公金投入の絞り込みが行われた意義を尊重し、品川浦南地区再開発は白紙に戻し、再開発を望まない地権者宅はその範囲から直ちに外すことを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和7年陳情 第59号",
    "title": "PTA役員不足解消のための別居親参画マッチング制度の導入に関する陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第2号",
    "title": "災害が起きても大惨事にならないために、公共施設の既存不適格を是正するよう、区に計画的に改修することを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第3号",
    "title": "「労働」ではなく質の高い「訓練」のサービス提供ができる就労継続B型事業所を誘致・育成するよう、区に求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第4号",
    "title": "２３区最低の障害者福祉から脱却するために、小山７丁目障害者グループホームの公平公正な入居選考を区に求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第6号",
    "title": "民主主義下の議会・諸団体総会核心は定足数小山三丁目第一地区市街地再開発準備組合運営解散の闇令和７年３月２４日開催・令和６年度第一回臨時総会定足数規約違反露顕、奇妙な定足数捏造準備組合非公表依頼、陳情質疑担当課長便宜供与疑惑答弁等に関する陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第7号",
    "title": "区議会ホームページ掲載の日程表への陳情提出期限明記を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第8号",
    "title": "生成ＡＩ時代におけるネットリテラシー教育の機会創出を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第9号",
    "title": "インボイス制度による事業者への影響の実態調査を品川区独自で行う陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-1t",
    "number": "令和8年陳情 第10号",
    "title": "シナモロール投票済証が衆議院選挙で配布されなかった説明と補填を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年請願 第3号",
    "title": "ヘルパーの警鐘を国に伝えてください～介護報酬大幅引き上げの意見書を国に提出するよう求める請願",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年請願 第4号",
    "title": "先日ギックリ腰になりました。ベンチがなくて辛かったです～ベンチ増設の請願",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年請願 第5号",
    "title": "リニア中央新幹線工事再開に対し再度住民説明会を求める請願",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第11号",
    "title": "身体の不自由な人がもっと投票しやすくなるよう現行制度の改善を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第12号",
    "title": "３３万円の公金を使って弁護士相談をしないと監査の実施の有無を判断できないなら、監査委員を法的専門性を有する弁護士等で構成するよう区に求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第13号",
    "title": "品川浦周辺地区まちづくりガイドライン策定にあたり、再開発対象地域の住民本位の縮小と、適正かつ公正な居住者の知る権利と居住権の保護を明文化し盛り込むことを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第14号",
    "title": "オンラインによる情報公開請求における受理通知等の仕組みの整備に関する陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第15号",
    "title": "昇降機が最新基準（平成２１年・２６年告示）に適合していない旨のシールを乗り場および籠内に掲示することを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第17号",
    "title": "住宅宿泊事業における「家主同居型」の営業制限緩和に関する陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第18号",
    "title": "心身障害者福祉会館の整備を迅速に進めるよう区に求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第19号",
    "title": "東大井・南大井地区と大井町を結ぶ交通の確保に関する陳情",
    "result": "採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第20号",
    "title": "小山３丁目第一地区再開発に係る「再開発組合」設立における手続き不備に関する疑問についての陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第21号",
    "title": "小山３丁目第一地区再開発に係る建設費高騰のなかでの補助金追加投入への不安に対しての陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第22号",
    "title": "自衛官募集事務に係る個人情報提供について、事前通知及び情報提供前の除外申請機会の確保を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第23号",
    "title": "行政便宜供与頼りで杜撰運営準備組合解散再開発組合三菱地所傀儡運営を問う陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第24号",
    "title": "品川浦周辺地区まちづくりガイドライン策定に関して現状等を住民に説明・質疑応答する会と対象地域から除外を希望する住民の希望調べの実施と次回の意見交換・アンケートが中立なものとなるよう求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第26号",
    "title": "小山三丁目第１地区再開発に品川区が補助金をいっさい支出しないことを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第27号",
    "title": "税法上の障害者控除を、「要介護２」認知症の者にも適用するよう求める陳情",
    "result": "趣旨採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第28号",
    "title": "犬のふん尿被害に対する生活衛生課の実効性ある対応および相談対応の改善を求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  },
  {
    "meetingId": "r08-2t",
    "number": "令和8年陳情 第29号",
    "title": "危険行為、違反行為を行った建設事業者にペナルティー等を科すことを求める陳情",
    "result": "不採択",
    "links": [
      {
        "type": "official",
        "label": "公式資料を見る",
        "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_02t/r08_02t1"
      }
    ]
  }
];

const qa = (title, question, answer) => ({ title, question, answer });
  const firstQuestionLinks = (minutesId) => [
    {
      type: "official",
      label: "公式の発言事項を見る",
      url: "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r08_01t/r08_01t2"
    },
    {
      type: "minutes",
      label: "公式会議録を読む",
      url: `https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=${minutesId}#one`
    },
    {
      type: "video",
      label: "本会議の録画を見る",
      url: "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_days_list&gikai_id=164"
    }
  ];
  const makeQuestion = (member, party, memberId, minutesId, items) => ({
    meetingId: "r08-1t",
    member,
    party,
    memberId,
    topics: items.map((item) => item.title),
    qaSummaries: items,
    links: firstQuestionLinks(minutesId)
  });

  const firstQuestions = [
    makeQuestion("まつざわ 和昌", "自民", "kazumasa_matsuzawa", "7347", [
      qa("施政方針について", "新年度の施政方針で、全世代への支援と持続可能な区政運営をどのように進めるのかを質問。", "区長は、所得制限を設けない無償化施策を含む全世代型の支援を進める一方、事業見直しで約60億円を振り替え、基金も活用して機動的に政策を実行すると答弁しました。"),
      qa("町会・自治会・高齢者支援について", "町会・自治会の事務負担軽減、マンション住民との接点づくり、高齢者の地域参加とデジタル支援を質問。", "区は、申請手続の簡素化、ICT導入補助やデジタル人材支援、新築マンションへの町会案内を進めると説明。高齢者には社会参加ポイント、老人クラブ支援、スマートフォン講座・相談を続けるとしました。"),
      qa("犯罪被害者支援について", "犯罪被害者と家族を支える条例、相談窓口、学校現場を含む庁内連携の整備を質問。", "区は、条例化や独自給付を調査し、相談窓口が関係機関につなぐ調整役を担うと答弁。学校ではスクールカウンセラーやスクールソーシャルワーカー等と連携し、対応手引も検討するとしました。"),
      qa("こども権利条例について", "子どもの意見を条例づくりや区政へ反映する方法、相談・救済の仕組みを質問。", "区は、子ども会議やワークショップ、アプリ等で意見を集め、令和10年度の条例制定を目指すと説明。匿名・オンライン相談や第三者評価を含む権利救済の仕組みも検討するとしました。"),
      qa("消防団格納庫について", "消防団の活動拠点である格納庫の用地確保と、区としての整備方針を質問。", "区は、区内37か所の格納庫のうち25か所が区有地にあり、東京消防庁が主体となる整備に用地面で協力してきたと説明。区独自の整備指針は現時点でないものの、今後も連携するとしました。"),
      qa("教員の働き方について", "教員の負担軽減、保護者対応、学校だけで抱え込まない支援体制を質問。", "区は、都の指針に沿った働き方改革に加え、令和8年度から元管理職、心理・福祉職、警察OB、弁護士等による学校支援チームを設け、困難な保護者対応などを支えると答弁しました。")
    ]),
    makeQuestion("山本 やすゆき", "未来", "yasuyuki_yamamoto", "7347", [
      qa("品川区の未来に向けた取り組みについて", "区民のウェルビーイング向上と、将来を見据えた行財政改革・組織体制について質問。", "区長は、区民の幸福実感を政策の中心に据え、既存事業の見直しと重点分野への再配分を進めると説明。児童相談所開設など新たな行政需要に応じて職員体制も整えるとしました。"),
      qa("子ども・子育て支援と教育に対する取り組みについて", "子育て家庭への切れ目ない支援、朝食支援、特別支援教育や探究的な学びの充実を質問。", "区は、学校での朝食支援を24校で実施し、家庭支援につなげると説明。教育では人的支援を配置し、特別支援教育と児童生徒が自ら考える探究的な学びを進めると答弁しました。"),
      qa("誰もが生活しやすい品川区安心安全な暮らしへの取り組みについて", "高齢者・障がい者を含む生活支援、防災・防犯、災害時のトイレ対策などを質問。", "区は、デジタル技術も使った見守りや相談支援を進め、要配慮者を含む避難体制を整えると説明。災害用トイレや備蓄の確保など、日常と災害時の双方から安全を高めるとしました。"),
      qa("品川区の物価高支援や経済活性化への取り組みについて", "物価高で負担が増す区民・中小事業者への支援と、区内経済の活性化策を質問。", "区は、国・都の制度を踏まえつつ区独自施策を組み合わせ、予算執行の状況も見ながら対応すると答弁。中小企業支援や公契約を通じた地域経済への波及も意識するとしました。"),
      qa("誇りを持ち豊かに暮らせるまちづくり住み続けたいまちNo.１にむけて", "大井町周辺、旧庁舎跡地、自治体交流、人材育成を含む将来のまちづくりを質問。", "区は、大井町の新拠点や住宅・交通環境を生かし、旧庁舎跡地も区の基本方針を軸に検討すると説明。自治体間交流と職員の専門性向上も、住み続けたいまちづくりに結び付けるとしました。")
    ]),
    makeQuestion("若林 ひろき", "公明", "hiroki_wakabayashi", "7347", [
      qa("平和・不戦・非核について", "平和都市品川宣言を踏まえ、戦争体験の継承や非核・平和施策をどう進めるか質問。", "区は、平和都市品川宣言の理念を継承し、展示や学習機会を通じて若い世代へ平和の大切さを伝えると答弁。自治体として可能な平和啓発を継続するとしました。"),
      qa("社会保障モデルの構築について", "年齢や制度の縦割りを越えて、生活課題を包括的に支える社会保障のあり方を質問。", "区は、子どもから高齢者までの切れ目ない相談支援と、地域・福祉・医療の連携を進めると説明。複合課題を抱える世帯を制度間で取りこぼさない体制を目指すとしました。"),
      qa("物価高対策について", "長引く物価高に対する区民生活・事業者への追加支援と財源の考え方を質問。", "区は、国・都の動向や生活への影響を把握し、既存事業の見直しや基金の活用も含め、必要な対策を機動的に講じると答弁しました。"),
      qa("こども、若者について", "子どもの権利保障、若者の居場所・意見表明、困難を抱える家庭への支援を質問。", "区は、子ども会議や相談手段の拡充で意見を政策に反映し、居場所と家庭支援を組み合わせると説明。条例制定に向けて当事者参加を進めるとしました。"),
      qa("高齢者への支援について", "孤立防止、介護予防、社会参加、デジタル利用を含む高齢者支援を質問。", "区は、地域活動への参加支援やポイント事業、老人クラブ支援を続け、スマートフォン講座・相談も充実させると答弁しました。"),
      qa("障がい児者への支援について", "障がいのある子ども・大人の住まい、相談、日中活動、家族支援の充実を質問。", "区は、グループホーム整備や相談支援、就労・日中活動の選択肢を増やし、家族を含めた切れ目ない支援を関係機関と進めるとしました。"),
      qa("健康施策について", "骨粗しょう症、がん検診、アピアランスケア、グリーフケア、父親支援、歯科健診などを質問。", "区は、骨粗しょう症検診の協力医療機関拡大、国基準のがん検診無償化、アピアランスケア拡充、電話・オンラインのグリーフケアを説明。産後の父親支援や歯科相談・健診も進めるとしました。"),
      qa("防災について", "公助の役割、区民・地域との連携、防災意識を日常的に高める取組を質問。", "区は、自助・共助・公助を対立させず重ねて備える考えを示し、災害対策基本条例の理念を訓練や啓発で浸透させると答弁しました。"),
      qa("まちづくりと文化、自治体交流について", "子育て世帯の住まい、地域交通、文化・観光、交流自治体との連携を質問。", "区は、子育て世帯の転居支援や空き家活用、地域交通網の検討を進めると説明。水辺交通や学校交流などを活用し、文化・観光と自治体交流を結び付けるとしました。"),
      qa("教育について", "学校改築と教育環境の確保、学びの質、教員を支える体制を質問。", "区は、工事費や敷地条件などの課題を踏まえて学校改築を計画的に進め、人的支援と専門職連携で学びと学校運営を支えると答弁しました。"),
      qa("来年度の予算執行について", "大型予算を確実に執行し、区民へ効果を届けるための進行管理を質問。", "区は、事業ごとの工程と成果を確認し、執行状況や社会情勢に応じて見直すと説明。重点施策に人員と財源を配分し、必要に応じて補正も検討するとしました。")
    ]),
    makeQuestion("石田 ちひろ", "共産", "chihiro_ishida", "7349", [
      qa("改憲を狙う高市政権恒久平和・核廃絶を掲げる区として大軍拡と核保有発言に反対を", "国の防衛政策や核保有をめぐる発言に、平和都市を掲げる区として反対表明するよう質問。", "区長は、国の防衛予算は国会で議論される事項としつつ、平和の実現には外交努力が重要であり、区は平和都市品川宣言に基づく取組を続けると答弁しました。"),
      qa("最大の物価高対策である消費税一律５％減税をシルバーパス値下げや賃上げ支援など区としてできる対策を", "消費税減税を国へ求めることと、交通費・賃上げなど区独自の物価高対策を質問。", "区は、消費税は国が判断する制度とし、国・都の動向を注視すると答弁。区民や事業者への影響を把握し、区として必要な生活・事業者支援を検討するとしました。"),
      qa("子どもを権利の主体として尊重し、あらゆる分野で意見を反映させることを位置づけた子どもの権利条例に", "子どもを権利の主体と明記し、政策決定への参加と救済制度を条例に位置付けるよう質問。", "区は、令和10年度の条例制定を目指し、子ども会議やワークショップで当事者の意見を反映すると説明。匿名相談や第三者による権利救済の仕組みも検討するとしました。"),
      qa("ジェンダー平等推進計画を力に、リプロダクティブヘルス・ライツの保障や包括的性教育の実施を", "緊急避妊薬へのアクセス、性と健康の権利、学校での包括的性教育を質問。", "区は、国の制度や医療機関との連携を踏まえ相談・情報提供を行い、学校では学習指導要領に沿って発達段階に応じた性教育を進めると答弁しました。"),
      qa("防災は公助を位置づけ、被害を最小限に抑える予防対策こそ", "自己責任に偏らず公助を明確にし、住宅や地域の予防対策を強化するよう質問。", "区は、自助・共助・公助がそれぞれ機能することが重要とし、耐震化、初期消火、備蓄、避難所環境など被害軽減策を進めると答弁しました。"),
      qa("羽田新ルート 住民運動が国に海上ルートへ舵を切らせたさらに現被害を無くすため、元の海上ルートに戻すよう求めよ", "羽田新飛行経路による騒音等をなくすため、従来の海上ルートへ戻すよう国に求めることを質問。", "区は、国に対して海上ルートの具体化や騒音・安全対策を引き続き求めると説明。一方、従来ルートへ全面的に戻すとの回答は示しませんでした。"),
      qa("「まちづくりの主体はそこに住む地域住民」の立場で、品川浦周辺の超高層再開発は中止を", "品川浦周辺の再開発を中止し、住民主体でまちづくりを見直すよう質問。", "区は、都市計画上の手続に沿い、地域住民への説明と意見交換を続けながら検討すると答弁。計画を直ちに中止する考えは示しませんでした。")
    ])
  ];


firstQuestions.push(
    makeQuestion("せお 麻里", "自民", "mari_seo", "7349", [
      qa("次期学習指導要領改訂に向けた動きと特別支援教育", "次期学習指導要領の方向を見据え、探究的な学びと特別支援教育をどう充実するか質問。", "教育委員会は、国の議論を注視しつつ、児童生徒が自ら問いを立てる学びを進めると説明。特別支援教育では教員研修と人的支援、関係機関との連携を充実するとしました。"),
      qa("中高生の障がい児の居場所", "放課後や休日に中高生の障がい児が安心して過ごせる居場所の確保を質問。", "区は、既存施設の活用状況を確認し、放課後等デイサービスや地域の支援機関と連携して、年齢や障がい特性に合う居場所を検討すると答弁しました。"),
      qa("交通安全対策", "通学路などの事故防止と、危険箇所を早期に改善する仕組みを質問。", "区は、警察・学校・道路管理者による点検と事故情報の分析を行い、標識、路面表示、見守りなど危険箇所に応じた対策を進めるとしました。"),
      qa("HPVワクチン", "HPVワクチンの接種機会を逃した人への周知と支援を質問。", "区は、対象者への個別通知などでキャッチアップ接種を案内し、国の制度変更も踏まえて必要な情報提供と相談対応を続けると答弁しました。")
    ]),
    makeQuestion("おぎの あやか", "未来", "ayaka_ogino", "7349", [
      qa("防災について", "災害時の避難、備蓄、トイレ、要配慮者支援を含む地域防災の強化を質問。", "区は、地域防災計画と災害対策基本条例に基づき、訓練、備蓄、避難所環境、災害用トイレを改善すると説明。要配慮者を地域と行政で支える体制も進めるとしました。"),
      qa("防災相互協定を結んだ地方都市との交流について", "災害時相互応援協定を平時の交流にも生かし、実効性を高める取組を質問。", "区は、協定自治体との訓練や情報交換に加え、文化・産業・学校等の交流を重ねることが災害時の円滑な支援につながるとして、連携を継続すると答弁しました。"),
      qa("防災相互協定などの連携を生かした品川区の食料安全保障について", "協定自治体や民間事業者との連携で、災害時の食料調達を安定させる方策を質問。", "区は、公的備蓄だけでなく、協定自治体からの応援と民間の流通・供給協定を組み合わせ、多様な調達経路を確保すると説明しました。"),
      qa("身近な環境整備による防犯強化について", "照明、見通し、道路・公園の管理など、身近な環境改善による犯罪予防を質問。", "区は、地域からの情報と警察の助言を基に、防犯カメラ、街路灯、植栽管理など場所に応じた環境整備を行い、地域の見守り活動も支援するとしました。"),
      qa("民泊について", "住宅宿泊事業による騒音・ごみ・安全面の相談に、区がどう対応するか質問。", "区は、保健所を窓口に届出確認と事業者指導を行い、苦情には関係部署・警察等と連携して対応すると説明。国・都の制度も踏まえて適正運営を求めるとしました。")
    ]),
    makeQuestion("鈴木 ひろ子", "共産", "hiroko_suzuki", "7349", [
      qa("第１０期介護保険事業計画策定の年国の改悪を許さず、充実した地域包括支援センターの設置と介護保険料の低所得者負担の軽減を", "介護制度改正でサービスを後退させず、地域包括支援センターの体制と低所得者の保険料軽減を強めるよう質問。", "区は、国の制度改正を注視しながら次期計画を策定し、地域包括支援センターの相談体制や人材確保に取り組むと答弁。保険料は所得段階別の負担軽減を制度の中で検討するとしました。"),
      qa("２３区最低だった障害者福祉の抜本的な拡充へ、現庁舎跡に２つ目の障害児者総合支援施設を", "旧庁舎跡地に2か所目の障害児者総合支援施設を整備するよう質問。", "区は、障がい児者の相談・通所・居住支援の需要を把握して基盤整備を進めると説明しましたが、旧庁舎跡地への施設設置は跡地全体の活用方針の中で検討するとしました。"),
      qa("物価高騰で負担は限界高すぎる国保料は値上げではなく引き下げ、子どもは無料に", "国民健康保険料の引下げと子どもの均等割負担の解消を質問。", "区は、保険料は特別区共通の算定方針や医療費、国・都の財政措置を踏まえて決めると説明。低所得世帯や未就学児等への法定軽減を適用し、国へ財政支援を求めるとしました。"),
      qa("リニア新幹線の重大事故まともな説明もないまま工事再開は許されない。問題だらけのリニア新幹線は中止こそ", "工事事故の説明が不十分なままリニア中央新幹線工事を再開させず、中止を求めるよう質問。", "区は、事業者であるJR東海に安全確保と住民への丁寧な説明を求め、工事状況を確認すると答弁。事業そのものの中止を求める考えは示しませんでした。")
    ]),
    makeQuestion("ゆきた 政春", "公明", "masaharu_yukita", "7349", [
      qa("防災対策について", "帰宅困難者対策や避難所運営を含め、都市部の災害対応をどう強化するか質問。", "区は、駅周辺事業者との連携、一時滞在施設の確保、情報提供訓練を進めると説明。避難所の備蓄・環境改善も地域と連携して取り組むとしました。"),
      qa("火災被災者への対応について", "住宅火災で住まいを失った人への相談、当面の居所、生活再建支援を質問。", "区は、被災直後から相談窓口で福祉・住宅・罹災証明などを案内し、状況に応じて一時的な住まいや関係機関の支援につなぐと答弁しました。"),
      qa("障がい者支援について", "障がい者の緊急時支援と、家族が支えられない場合の短期入所等の体制を質問。", "区は、相談支援事業所等と緊急時の連絡体制を整え、短期入所先の確保や地域生活支援拠点の機能強化を進めると説明しました。")
    ]),
    makeQuestion("高橋 伸明", "無所属", "nobuaki_takahashi", "7349", [
      qa("心身障害者福祉会館の改築検討について", "老朽化した心身障害者福祉会館の改築と、利用者の意見を反映する検討手順を質問。", "区は、施設・設備の状況と利用ニーズを調査し、改修・改築のあり方を検討すると答弁。利用者や関係団体の意見も把握するとしました。"),
      qa("失語症向け意思疎通支援者派遣事業について", "失語症のある人が地域生活や社会参加で利用できる意思疎通支援者派遣を質問。", "区は、都の制度や養成状況を確認し、当事者ニーズと実施方法を関係機関と検討すると説明しました。"),
      qa("犯罪被害者支援の今後の進め方と条例制定の考え方について", "犯罪被害者支援の窓口・庁内連携と条例制定の見通しを質問。", "区は、相談者を法律・福祉・医療等の支援につなぐ体制を整え、他自治体の条例や給付制度を調査して、条例化を含む支援のあり方を検討すると答弁しました。"),
      qa("荏原町駅前公衆便所改修工事設計について", "荏原町駅前公衆便所を安全で使いやすく改修するための設計内容を質問。", "区は、バリアフリー、防犯、清掃・維持管理に配慮し、駅前空間との調和も踏まえて設計を進めると説明しました。"),
      qa("移動教室について", "移動教室の学習内容、宿泊先、児童生徒の安全と負担軽減を質問。", "教育委員会は、区の保養施設等を活用しながら体験学習の目的と安全を確保し、食物アレルギーや健康面にも配慮して実施すると答弁しました。")
    ]),
    makeQuestion("やなぎさわ 聡", "無所属", "satoshi_yanagisawa", "7351", [
      qa("地域を支える介護従事者・事業者の声", "介護人材の確保に向け、区独自の住宅手当など事業者・従事者支援を行うよう質問。", "区は、国・都の処遇改善や住宅支援制度を活用し、事業者の負担も考慮しながら人材確保策を続けると答弁。区独自の一律住宅手当は示しませんでした。"),
      qa("物価高で苦しむ区民・中小事業者の声", "消費税・インボイスと物価高が区民や中小事業者へ与える影響を調査し、支援するよう質問。", "区は、税制度は国の所管とし、国の調査や区内経済の動向を注視すると説明。インボイスに絞った区独自調査は予定していないものの、相談・事業者支援を続けるとしました。"),
      qa("外出に不便を感じている方の声", "地域交通の充実と、歩行途中に休めるベンチを増やす取組を質問。", "区は、地域公共交通ネットワークを検討し、バリアフリー化や公園等の休憩場所も活用すると答弁。ベンチは有用性を認めつつ、設置場所や管理上の課題を確認するとしました。")
    ]),
    makeQuestion("石田 秀男", "自民", "hideo_ishida", "7351", [
      qa("庁舎跡地活用について", "現庁舎跡地の活用方針を、民間提案に先行して区が明確に示すよう質問。", "区は、区民・有識者を含む検討を踏まえて区としての活用方針を整理し、その上で民間の知見や提案も活用すると答弁しました。"),
      qa("社会資本整備総合交付金要綱改正について", "国の交付金要綱改正が品川浦周辺などのまちづくり事業へ与える影響を質問。", "区は、国の要綱と採択条件を確認し、都市計画や関連計画との整合を図りながら活用可能性を検討すると説明しました。"),
      qa("大規模建築物建設時の喫煙所設置について", "大規模建築物の建設時に、周辺の路上喫煙を防ぐ喫煙所設置を誘導するよう質問。", "区は、受動喫煙防止と地域環境への影響を踏まえ、事業者との協議や既存の指導制度を通じて、適切な喫煙環境の確保を検討すると答弁しました。"),
      qa("水辺の街づくりについて", "運河・河川を交通、観光、文化、防災に生かす水辺のまちづくりを質問。", "区長は、水辺を品川の地域資源として回遊性やにぎわいづくりに生かす考えを説明。勝島運河などの環境整備や舟運の実証、地域との連携を進めるとしました。")
    ])
  );

  const secondQuestionTopics = {
    yoshihiro_matsunaga: [
      "大井町トラックス開業を契機とする、品川区の新たな地域交通ネットワークの構築について",
      "命の尊厳を守るペット福祉の拡充と災害時における環境整備について"
    ],
    emiko_sawada: [
      "物価高騰について",
      "子どもの支援について",
      "高齢者のデジタル支援について",
      "東品川海上公園のドッグランについて"
    ],
    toshifumi_nodate: [
      "共産党の区政アンケートに「暮らしが苦しい」が多数 中東情勢により中小建設業者は存続の危機 暮らしと営業を守る支援を急げ",
      "異常な家賃高騰に悲鳴 「住まいは人権」の立場で公営住宅の建設、家賃助成など誰もが安心して住み続けられる品川へ",
      "超高層ビルはもういらない 開発企業の利益でなく住民のためのまちづくりへ、区独自の規制を",
      "子どもの学び育つ権利の保障へ、不登校の支援強化や学校スタンダードの見直し、３０人学級を"
    ],
    saeko_niizuma: [
      "品川区の魅力発信について",
      "高齢者・障がい者・子育て支援について",
      "地域公共交通について"
    ],
    yumiko_yoshida: [
      "品川区こどもの権利条例制定の手順と当事者参加のあり方について",
      "区長の「7つの重点政策」のうちの一つ「グループホーム200名分整備」政策の内、「障がい者向け100名分整備」の達成度評価について",
      "羽田新飛行経路について"
    ],
    arata_koshiba: [
      "口腔の健康について",
      "町会自治会支援について",
      "賃貸マンションの防災について",
      "地域交通について",
      "夏の電力高騰対策支援について",
      "不登校について"
    ],
    takako_nishimoto: [
      "森澤区政に問う",
      "子どもの視点に立った、こども政策について",
      "品川区の教育について",
      "情報公開のあり方について",
      "住民主体のまちづくりの転換へ"
    ],
    takako_konno: [
      "物価高等の社会情勢の影響に対する支援について",
      "こどもの権利条例の制定とこどもコミッショナーについて",
      "児童生徒の安心安全について",
      "災害関連死防止対策について",
      "AYA世代のがん患者への在宅サービス支援について"
    ]
  };

  const secondQuestions = (year.questions || [])
    .filter((question) => question.meetingId === "r08-2t")
    .map((question) => ({
      ...question,
      topics: secondQuestionTopics[question.memberId] || question.topics
    }));
  year.questions = firstQuestions.concat(secondQuestions);


  const firstRegular = year.meetings.find((meeting) => meeting.id === "r08-1t");
  if (firstRegular) {
    firstRegular.billsSection = {
      title: "提出議案（全件）",
      lead: "公式の提出議案ページに掲載された区長提出55件と議員提出2件を、省略せず掲載しています。"
    };
    firstRegular.petitionsSection = {
      title: "請願・陳情（全件）",
      lead: "第1回定例会の公式ページに掲載された請願・陳情13件を、省略せず掲載しています。"
    };
    firstRegular.questionsSection = {
      ...(firstRegular.questionsSection || {}),
      title: "代表質問・一般質問（全項目・答弁要約）",
      lead: "公式の発言事項に掲載された11名・57項目を省略せず掲載し、各項目について正式会議録から質問内容と区側答弁の要点をまとめています。"
    };
    if (!(firstRegular.stats || []).some((item) => item.label === "議員提出議案")) {
      firstRegular.stats.splice(2, 0, { value: "2件", label: "議員提出議案" });
    }
  }

  const secondRegular = year.meetings.find((meeting) => meeting.id === "r08-2t");
  if (secondRegular) {
    secondRegular.billsSection = {
      title: "提出議案（全件）",
      lead: "公式の提出議案ページに掲載された区長提出25件を、省略せず掲載しています。"
    };
    secondRegular.petitionsSection = {
      title: "請願・陳情（全件）",
      lead: "第2回定例会の公式ページに掲載された請願・陳情20件を、省略せず掲載しています。"
    };
    secondRegular.questionsSection = {
      ...(secondRegular.questionsSection || {}),
      title: "一般質問（全項目・答弁要約）",
      lead: "公式の発言事項に掲載された8名・32項目を省略せず掲載し、各項目について会議録から質問内容と区側答弁の要点をまとめています。"
    };
    secondRegular.stats = (secondRegular.stats || []).filter((item) => item.label !== "議員提出議案");
  }

  year.updatedAt = "2026-07-16";
})();
