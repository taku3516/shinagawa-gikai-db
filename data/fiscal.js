// 品川区議会DB データファイル（年度ごとの予算・決算。議会の暦年データとは別軸）
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.fiscalData = {
  "updatedAt": "2026-07-25",
  "note": "予算・決算は「年度」（4月〜翌年3月）の情報です。議会の情報（暦年）と対象期間が異なります。金額・内容は品川区公式サイトからの転記で、正確な情報は必ずリンク先の公式資料を確認してください。　決算額（歳入・歳出総額と実質収支）は品川区監査委員の決算審査意見書によります。",
  "fiscalYears": [
    {
      "id": "fy-r08",
      "label": "令和8年度",
      "period": "2026年4月〜2027年3月",
      "status": "執行中",
      "initial": {
        "amount": "2,369億1,400万円",
        "change": "前年度比 +0.9％",
        "detail": "一般会計 236,914,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和8年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/2026tousyoyosan.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和8年第1回定例会",
            "url": "index.html#meeting-r08-1t"
          },
          {
            "label": "令和8年予算特別委員会",
            "url": "index.html#meeting-r08-yosan"
          },
          {
            "label": "予算特別委員会の録画",
            "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_days_list&gikai_id=165"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第2号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202502hosei.html"
          },
          {
            "label": "第1号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202601hosei.html"
          }
        ],
        "council": [
          {
            "label": "第56号（令和8年・r08-1r）",
            "meeting": "r08-1r",
            "number": "第56号",
            "url": "index.html#meeting-r08-1r"
          },
          {
            "label": "第59号（令和8年・r08-2t）",
            "meeting": "r08-2t",
            "number": "第59号",
            "url": "index.html#meeting-r08-2t"
          }
        ]
      },
      "settlement": {
        "status": "執行中のため未確定",
        "links": [],
        "council": []
      }
    },
    {
      "id": "fy-r07",
      "label": "令和7年度",
      "period": "2025年4月〜2026年3月",
      "status": "決算待ち",
      "initial": {
        "amount": "2,347億6,300万円",
        "change": "前年度比 +15.3％",
        "detail": "一般会計 234,763,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和7年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/2025tousyoyosan.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和7年第1回定例会",
            "url": "index.html#meeting-r07-1t"
          },
          {
            "label": "令和7年予算特別委員会の録画",
            "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_days_list&gikai_id=157"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第6号補正予算（衆議院議員選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202506hosei.html"
          },
          {
            "label": "第5号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202505hosei.html"
          },
          {
            "label": "第4号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202504hosei.html"
          },
          {
            "label": "第3号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202503hosei.html"
          },
          {
            "label": "第2号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/2025002hosei.html"
          },
          {
            "label": "第1号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202406hosei.html"
          },
          {
            "label": "最終補正予算(一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202507hosei.html"
          }
        ],
        "council": [
          {
            "label": "第67号（令和7年・r07-1r）",
            "meeting": "r07-1r",
            "number": "第67号",
            "url": "index.html#meeting-r07-1r"
          },
          {
            "label": "第71号（令和7年・r07-2t）",
            "meeting": "r07-2t",
            "number": "第71号",
            "url": "index.html#meeting-r07-2t"
          },
          {
            "label": "第144号（令和7年・r07-2r）",
            "meeting": "r07-2r",
            "number": "第144号",
            "url": "index.html#meeting-r07-2r"
          },
          {
            "label": "第101号（令和7年・r07-3t）",
            "meeting": "r07-3t",
            "number": "第101号",
            "url": "index.html#meeting-r07-3t"
          },
          {
            "label": "第121号（令和7年・r07-4t）",
            "meeting": "r07-4t",
            "number": "第121号",
            "url": "index.html#meeting-r07-4t"
          },
          {
            "label": "第1号（令和8年・r08-1t）",
            "meeting": "r08-1t",
            "number": "第1号",
            "url": "index.html#meeting-r08-1t"
          }
        ]
      },
      "settlement": {
        "status": "令和8年第3回定例会（2026年9月〜）の決算特別委員会で審査予定",
        "links": [],
        "council": [
          {
            "label": "令和8年第3回定例会",
            "url": "index.html#meeting-r08-3t"
          }
        ]
      }
    },
    {
      "id": "fy-r06",
      "label": "令和6年度",
      "period": "2024年4月〜2025年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "2,036億5,600万円",
        "change": "前年度比 +2.4％",
        "detail": "一般会計 203,656,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和6年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20240208145918.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和6年第1回定例会",
            "url": "index.html#meeting-r06-1t"
          },
          {
            "label": "令和6年予算特別委員会の録画",
            "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_days_list&gikai_id=148"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第6号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202406hosei2.html"
          },
          {
            "label": "第5号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202405hosei.html"
          },
          {
            "label": "第4号補正予算（衆議院議員選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202404hosei.html"
          },
          {
            "label": "第3号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202403hosei.html"
          },
          {
            "label": "第2号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202402hosei.html"
          },
          {
            "label": "第1号補正予算(一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202401hosei.html"
          },
          {
            "label": "最終補正予算（一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/202407hosei.html"
          }
        ],
        "council": [
          {
            "label": "第41号（令和6年・r06-1r）",
            "meeting": "r06-1r",
            "number": "第41号",
            "url": "index.html#meeting-r06-1r"
          },
          {
            "label": "第45号（令和6年・r06-2t）",
            "meeting": "r06-2t",
            "number": "第45号",
            "url": "index.html#meeting-r06-2t"
          },
          {
            "label": "第75号（令和6年・r06-3t）",
            "meeting": "r06-3t",
            "number": "第75号",
            "url": "index.html#meeting-r06-3t"
          },
          {
            "label": "第108号（令和6年・r06-3r）",
            "meeting": "r06-3r",
            "number": "第108号",
            "url": "index.html#meeting-r06-3r"
          },
          {
            "label": "第87号（令和6年・r06-4t）",
            "meeting": "r06-4t",
            "number": "第87号",
            "url": "index.html#meeting-r06-4t"
          },
          {
            "label": "第1号（令和7年・r07-1t）",
            "meeting": "r07-1t",
            "number": "第1号",
            "url": "index.html#meeting-r07-1t"
          }
        ]
      },
      "settlement": {
        "status": "認定済み（令和7年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "令和6年度 歳入歳出決算書1（PDF・14MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_18.pdf"
          },
          {
            "type": "official",
            "label": "決算書2（PDF・19MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_19.pdf"
          },
          {
            "type": "official",
            "label": "決算書3（PDF・12MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_20.pdf"
          },
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 令和7年第3回定例会",
            "url": "index.html#meeting-r07-3t"
          },
          {
            "label": "令和7年決算特別委員会の録画",
            "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_days_list&gikai_id=161"
          }
        ],
        "revenue": "2,164億4,488万円",
        "expenditure": "2,097億31万円",
        "realBalance": "66億646万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "各会計決算審査意見書の「一般会計 決算の概況」より"
        }
      }
    },
    {
      "id": "fy-r05",
      "label": "令和5年度",
      "period": "2023年4月〜2024年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,987億9,400万円",
        "change": "前年度比 +5.1％",
        "detail": "一般会計 198,794,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和5年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20230208174032.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和5年第1回定例会",
            "url": "kaigiroku.html#meeting-r05-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第1号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230427144154.html"
          },
          {
            "label": "第2号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230524135008.html"
          },
          {
            "label": "第3号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230620185121.html"
          },
          {
            "label": "第4号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230912090108.html"
          },
          {
            "label": "第5号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20231108174541.html"
          },
          {
            "label": "第6号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20231211182007.html"
          },
          {
            "label": "第7号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20231226085742.html"
          },
          {
            "label": "最終補正予算（一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20240208155539.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "認定済み（令和6年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "令和5年度 歳入歳出決算書1（PDF・13MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_15.pdf"
          },
          {
            "type": "official",
            "label": "決算書2（PDF・23MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_16.pdf"
          },
          {
            "type": "official",
            "label": "決算書3（PDF・10MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_17.pdf"
          }
        ],
        "council": [
          {
            "label": "審査: 令和6年第3回定例会",
            "url": "kaigiroku.html#meeting-r06-3t"
          },
          {
            "label": "議会公式の提出議案・決算資料",
            "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r06_03t/r06_03t1"
          }
        ],
        "revenue": "2,005億2,931万円",
        "expenditure": "1,941億5,557万円",
        "realBalance": "58億9,419万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "各会計決算審査意見書の「一般会計 決算の概況」より"
        }
      }
    },
    {
      "id": "fy-r04",
      "label": "令和4年度",
      "period": "2022年4月〜2023年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,890億7,200万円",
        "change": "前年度比 +3.6％",
        "detail": "一般会計 189,072,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和4年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20220210190000.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和4年第1回定例会",
            "url": "kaigiroku.html#meeting-r04-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第1号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20220525135239.html"
          },
          {
            "label": "第2号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20220613132606.html"
          },
          {
            "label": "第3号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20221017132110.html"
          },
          {
            "label": "第4号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20221209201020.html"
          },
          {
            "label": "第5号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230110185330.html"
          },
          {
            "label": "最終補正予算（一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20230208171732.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "認定済み（令和5年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "令和4年度 歳入歳出決算書1（PDF・8MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_9.pdf"
          },
          {
            "type": "official",
            "label": "決算書2（PDF・15MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_10.pdf"
          },
          {
            "type": "official",
            "label": "決算書3（PDF・5MB）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_11.pdf"
          }
        ],
        "council": [
          {
            "label": "審査: 令和5年第3回定例会",
            "url": "kaigiroku.html#meeting-r05-3t"
          },
          {
            "label": "議会公式の提出議案・決算資料",
            "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r05_03t/r05_03t1"
          }
        ],
        "revenue": "1,959億1,638万円",
        "expenditure": "1,893億3,839万円",
        "realBalance": "62億6,078万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "各会計決算審査意見書の「一般会計 決算の概況」より"
        }
      }
    },
    {
      "id": "fy-r03",
      "label": "令和3年度",
      "period": "2021年4月〜2022年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,824億8,000万円",
        "change": "前年度比 -3.1％",
        "detail": "一般会計 182,480,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和3年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20210121100139.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和3年第1回定例会",
            "url": "kaigiroku.html#meeting-r03-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第1号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20210416192925.html"
          },
          {
            "label": "第2号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200325140104.html"
          },
          {
            "label": "第3号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20210615190353.html"
          },
          {
            "label": "第4号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20210825190810.html"
          },
          {
            "label": "第5号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20211117190456.html"
          },
          {
            "label": "第6号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20211210095625.html"
          },
          {
            "label": "第7号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20211224095649.html"
          },
          {
            "label": "第8号補正予算（一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20220210170255.html"
          },
          {
            "label": "第9号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20220221181419.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "認定済み（令和4年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "令和3年度 各会計歳入歳出決算書（PDF）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_12.pdf"
          }
        ],
        "council": [
          {
            "label": "審査: 令和4年第3回定例会",
            "url": "kaigiroku.html#meeting-r04-3t"
          },
          {
            "label": "議会公式の提出議案・決算資料",
            "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r04_03t/r04_03t1"
          }
        ],
        "revenue": "1,938億6,108万円",
        "expenditure": "1,868億5,591万円",
        "realBalance": "69億4,381万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "各会計決算審査意見書の「一般会計 決算の概況」より"
        }
      }
    },
    {
      "id": "fy-r02",
      "label": "令和2年度",
      "period": "2020年4月〜2021年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,883億2,500万円",
        "change": "前年度比 +0.3％",
        "detail": "一般会計 188,325,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和2年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20200326154523.html"
          }
        ],
        "council": [
          {
            "label": "審議: 令和2年第1回定例会",
            "url": "kaigiroku.html#meeting-r02-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "第1号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20211012175155.html"
          },
          {
            "label": "第1号補正予算（国民健康保険事業会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200424170734.html"
          },
          {
            "label": "第2号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200508131837.html"
          },
          {
            "label": "第3号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200612110703.html"
          },
          {
            "label": "第4号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200903154733.html"
          },
          {
            "label": "第5号補正予算（一般会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20201116110957.html"
          },
          {
            "label": "最終補正予算（一般会計・特別会計）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20210120154035.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "認定済み（令和3年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "令和2年度 各会計歳入歳出決算書（PDF）",
            "url": "https://www.city.shinagawa.tokyo.jp/ct/pdf/20210301101047_5.pdf"
          }
        ],
        "council": [
          {
            "label": "審査: 令和3年第3回定例会",
            "url": "kaigiroku.html#meeting-r03-3t"
          }
        ],
        "revenue": "2,399億7,867万円",
        "expenditure": "2,363億1,670万円",
        "realBalance": "35億548万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "各会計決算審査意見書の「一般会計 決算の概況」より"
        }
      }
    },
    {
      "id": "fy-r01",
      "label": "令和元年度",
      "period": "2019年4月〜2020年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,877億5,400万円",
        "change": "前年度比 +7.5％",
        "detail": "一般会計 187,754,000,000円",
        "links": [
          {
            "type": "official",
            "label": "令和元年度（平成31年度）当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20190326141350.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成31年第1回定例会（議会公式）",
            "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/h31_01/h31_01t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20190710133704.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20191023174449.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20200306085840.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "認定済み（令和2年第3回定例会・決算特別委員会で審査）",
        "links": [
          {
            "type": "official",
            "label": "議会公式の提出議案・令和元年度決算資料",
            "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/r02_03t/r02_03t1"
          }
        ],
        "council": [
          {
            "label": "審査: 令和2年第3回定例会",
            "url": "kaigiroku.html#meeting-r02-3t"
          }
        ],
        "revenue": "1,841億5,706万円",
        "expenditure": "1,790億4,435万円",
        "realBalance": "50億7,509万円の黒字",
        "amountSource": {
          "label": "品川区監査委員 決算審査意見書（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-siryo-kansa/hpg00002415001.html",
          "note": "前年度分として同意見書に記載された額"
        }
      }
    },
    {
      "id": "fy-h30",
      "label": "平成30年度",
      "period": "2018年4月〜2019年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,745億7,800万円",
        "change": "前年度比 +6.1％",
        "links": [
          {
            "type": "official",
            "label": "平成30年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/hpg000033344.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成30年第1回定例会",
            "url": "index.html#meeting-h30-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "10月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20190204095831.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20180711170836.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/20190305114825.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 令和元年第3回定例会",
            "url": "index.html#meeting-r01-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h29",
      "label": "平成29年度",
      "period": "2017年4月〜2018年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,645億3,600万円",
        "change": "前年度比 -2％",
        "links": [
          {
            "type": "official",
            "label": "平成29年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/hpg000030788.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成29年第1回定例会",
            "url": "index.html#meeting-h29-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "7月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000031536.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000032097.html"
          },
          {
            "label": "9月補正予算（衆議院議員選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000032057.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000033119.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成30年第3回定例会",
            "url": "index.html#meeting-h30-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h28",
      "label": "平成28年度",
      "period": "2016年4月〜2017年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,678億9,850万円",
        "change": "前年度比 +11.2％",
        "links": [
          {
            "type": "official",
            "label": "平成28年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/hpg000027827.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成28年第1回定例会",
            "url": "index.html#meeting-h28-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "12月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000029967.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000028664.html"
          },
          {
            "label": "6月補正予算（都知事選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000028663.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000029643.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000030484.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成29年第3回定例会",
            "url": "index.html#meeting-h29-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h27",
      "label": "平成27年度",
      "period": "2015年4月〜2016年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,510億3,890万円",
        "change": "前年度比 +3.3％",
        "links": [
          {
            "type": "official",
            "label": "平成27年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/hpg000024988.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成27年第1回定例会",
            "url": "index.html#meeting-h27-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "12月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000027079.html"
          },
          {
            "label": "5月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000025469.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000025710.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000026432.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000027644.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成28年第3回定例会",
            "url": "index.html#meeting-h28-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h26",
      "label": "平成26年度",
      "period": "2014年4月〜2015年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,462億3,673万6千円",
        "change": "前年度比 +9.8％",
        "links": [
          {
            "type": "official",
            "label": "平成26年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20200928155106.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成26年第1回定例会",
            "url": "index.html#meeting-h26-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "10月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000023866.html"
          },
          {
            "label": "11月補正予算（衆議院議員選挙執行費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000023961.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000022460.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000024806.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成27年第3回定例会",
            "url": "index.html#meeting-h27-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h25",
      "label": "平成25年度",
      "period": "2013年4月〜2014年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,331億5,438万5千円",
        "change": "前年度比 +0.4％",
        "links": [
          {
            "type": "official",
            "label": "平成25年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20200928155010.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成25年第1回定例会",
            "url": "index.html#meeting-h25-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "12月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000021100.html"
          },
          {
            "label": "12月補正予算（都知事選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000021214.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000019862.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000020721.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000021503.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成26年第3回定例会",
            "url": "index.html#meeting-h26-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h24",
      "label": "平成24年度",
      "period": "2012年4月〜2013年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,325億9,756万4千円",
        "change": "前年度比 -3.8％",
        "links": [
          {
            "type": "official",
            "label": "平成24年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20200928155539.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成24年第1回定例会",
            "url": "index.html#meeting-h24-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "11月補正予算（衆議院議員選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000018289.html"
          },
          {
            "label": "11月補正予算（都知事選挙費）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000018046.html"
          },
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000017310.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000017862.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000019125.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成25年第3回定例会",
            "url": "index.html#meeting-h25-3t"
          }
        ]
      }
    },
    {
      "id": "fy-h23",
      "label": "平成23年度",
      "period": "2011年4月〜2012年3月",
      "status": "決算認定済み",
      "initial": {
        "amount": "1,378億8,516万1千円",
        "change": "前年度比 -0.9％",
        "links": [
          {
            "type": "official",
            "label": "平成23年度当初予算（公式）",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/tousyo/20200928155325.html"
          }
        ],
        "council": [
          {
            "label": "審議: 平成23年第1回定例会",
            "url": "index.html#meeting-h23-1t"
          }
        ]
      },
      "supplements": {
        "official": [
          {
            "label": "6月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000014458.html"
          },
          {
            "label": "9月補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000015156.html"
          },
          {
            "label": "最終補正予算",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/hosei/hpg000016168.html"
          }
        ],
        "council": []
      },
      "settlement": {
        "status": "決算は認定済みですが、決算額の数値は監査委員の決算審査意見書が令和2年度以降しか公表されていないため未収録です。決算書は公式ページで確認できます。",
        "links": [
          {
            "type": "official",
            "label": "決算書の公式ページ",
            "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/20210301101047.html"
          }
        ],
        "council": [
          {
            "label": "審査: 平成24年第3回定例会",
            "url": "index.html#meeting-h24-3t"
          }
        ]
      }
    }
  ],
  "sources": [
    {
      "label": "品川区 予算（公式）",
      "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/index.html"
    },
    {
      "label": "品川区 決算（公式）",
      "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/index.html"
    }
  ]
};
