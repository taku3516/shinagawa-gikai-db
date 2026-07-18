// 品川区議会DB データファイル（平成30年・会議録からの機械抽出によるパイロット）
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.years["h30"] = {
  "id": "h30",
  "label": "平成30年",
  "updatedAt": "2026-07-22",
  "yearSummary": {
    "title": "平成30年（2018年）の流れ",
    "text": "定例会4回・臨時会2回が開かれました。この年は公式の提出議案ページが残っていないため、議案・質問は会議録検索システムの本文から機械抽出しています（パイロット実装）。抽出ミスの可能性があるため、正確な情報は必ず各リンク先の会議録原文・公式サイトを確認してください。"
  },
  "meetings": [
    {
      "id": "h30-1t",
      "monthLabel": "2月〜3月",
      "name": "平成30年第1回定例会",
      "type": "定例会",
      "summary": "議案・請願陳情・一般質問を議決結果つきで掲載しています（会議録からの機械抽出）。",
      "links": [
        {
          "type": "minutes",
          "label": "会議録の一覧を見る",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?QueryType=new&Template=list&Cabinet=1&TermStart=2018-01-01&TermEnd=2018-12-31"
        }
      ],
      "detailTitle": "平成30年第1回定例会の詳細",
      "detailLead": "公式ページが残っていない年のため、会議録検索システムの本文から機械抽出しています。議決結果などの正確な確認は、各日の会議録リンクから原文を参照してください。",
      "stats": [
        {
          "value": "5日",
          "label": "本会議 2月21日〜3月27日"
        },
        {
          "value": "41件",
          "label": "区長提出議案（第1号〜第42号・議決確認分）"
        },
        {
          "value": "12件",
          "label": "請願・陳情"
        }
      ],
      "events": [
        {
          "date": "2月21日",
          "title": "代表質問",
          "description": "質問者: 渡部茂、若林ひろき、南恵子",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=502#one"
            }
          ]
        },
        {
          "date": "2月22日",
          "title": "一般質問・代表質問",
          "description": "質問者: 石田しんご、新妻さえ子、安藤たい作、高橋伸明、松永よしひろ、浅野ひろゆき",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
            }
          ]
        },
        {
          "date": "2月23日",
          "title": "一般質問",
          "description": "質問者: 高橋しんじ",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=506#one"
            }
          ]
        },
        {
          "date": "3月8日",
          "title": "本会議",
          "description": "議案の上程・審議などが行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=508#one"
            }
          ]
        },
        {
          "date": "3月27日",
          "title": "委員長報告・表決",
          "description": "各委員会の審査報告と表決が行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
            }
          ]
        }
      ],
      "billsSection": {
        "title": "第1回定例会の議案（全件・議決結果つき）",
        "lead": "会議録の委員長報告・議事日程・表決記録から抽出した全議案です。説明文は委員長報告の要旨、結果は採決記録に基づきます。正確な内容は各リンク先の会議録原文を確認してください。"
      },
      "petitionsSection": {
        "title": "第1回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第1回定例会の代表質問・一般質問",
        "lead": "会議録から質問者・発言項目を抽出し、質問と答弁の要点を会議録の文面から自動要約しています。正確な発言は会議録原文を確認してください。"
      }
    },
    {
      "id": "h30-1r",
      "monthLabel": "5月",
      "name": "平成30年第1回臨時会",
      "type": "臨時会",
      "summary": "概要のみ掲載しています。議案は公式の資料ページで確認できます。",
      "links": [
        {
          "type": "official",
          "label": "本会議資料を見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/h30_01r"
        },
        {
          "type": "official",
          "label": "提出議案を見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/h30_01r/h30_01t"
        }
      ],
      "events": []
    },
    {
      "id": "h30-2t",
      "monthLabel": "6月〜7月",
      "name": "平成30年第2回定例会",
      "type": "定例会",
      "summary": "議案・請願陳情・一般質問を議決結果つきで掲載しています（会議録からの機械抽出）。",
      "links": [
        {
          "type": "minutes",
          "label": "会議録の一覧を見る",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?QueryType=new&Template=list&Cabinet=1&TermStart=2018-01-01&TermEnd=2018-12-31"
        }
      ],
      "detailTitle": "平成30年第2回定例会の詳細",
      "detailLead": "公式ページが残っていない年のため、会議録検索システムの本文から機械抽出しています。議決結果などの正確な確認は、各日の会議録リンクから原文を参照してください。",
      "stats": [
        {
          "value": "3日",
          "label": "本会議 6月28日〜7月11日"
        },
        {
          "value": "28件",
          "label": "区長提出議案（第44号〜第72号・議決確認分）"
        },
        {
          "value": "7件",
          "label": "請願・陳情"
        }
      ],
      "events": [
        {
          "date": "6月28日",
          "title": "本会議",
          "description": "議案の上程・審議などが行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=512#one"
            }
          ]
        },
        {
          "date": "6月29日",
          "title": "一般質問",
          "description": "質問者: 石田ちひろ、石田秀男、いながわ貴之、あくつ広王、西本貴子、大沢真一、吉田ゆみこ、飯沼雅子、横山由香理、塚本よしひろ",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
            }
          ]
        },
        {
          "date": "7月11日",
          "title": "委員長報告・表決",
          "description": "各委員会の審査報告と表決が行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
            }
          ]
        }
      ],
      "billsSection": {
        "title": "第2回定例会の議案（全件・議決結果つき）",
        "lead": "会議録の委員長報告・議事日程・表決記録から抽出した全議案です。説明文は委員長報告の要旨、結果は採決記録に基づきます。正確な内容は各リンク先の会議録原文を確認してください。"
      },
      "petitionsSection": {
        "title": "第2回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第2回定例会の代表質問・一般質問",
        "lead": "会議録から質問者・発言項目を抽出し、質問と答弁の要点を会議録の文面から自動要約しています。正確な発言は会議録原文を確認してください。"
      }
    },
    {
      "id": "h30-2r",
      "monthLabel": "8月",
      "name": "平成30年第2回臨時会",
      "type": "臨時会",
      "summary": "概要のみ掲載しています。議案は公式の資料ページで確認できます。",
      "links": [
        {
          "type": "official",
          "label": "本会議資料を見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/h30_02r"
        },
        {
          "type": "official",
          "label": "提出議案を見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/honkaigi-schedule/h30_02r/h30_02t"
        }
      ],
      "events": []
    },
    {
      "id": "h30-3t",
      "monthLabel": "10月〜11月",
      "name": "平成30年第3回定例会",
      "type": "定例会",
      "summary": "議案・請願陳情・一般質問を議決結果つきで掲載しています（会議録からの機械抽出）。",
      "links": [
        {
          "type": "minutes",
          "label": "会議録の一覧を見る",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?QueryType=new&Template=list&Cabinet=1&TermStart=2018-01-01&TermEnd=2018-12-31"
        }
      ],
      "detailTitle": "平成30年第3回定例会の詳細",
      "detailLead": "公式ページが残っていない年のため、会議録検索システムの本文から機械抽出しています。議決結果などの正確な確認は、各日の会議録リンクから原文を参照してください。",
      "stats": [
        {
          "value": "3日",
          "label": "本会議 10月25日〜11月21日"
        },
        {
          "value": "8件",
          "label": "区長提出議案（第74号〜第81号・議決確認分）"
        },
        {
          "value": "1件",
          "label": "議員提出議案"
        },
        {
          "value": "10件",
          "label": "請願・陳情"
        }
      ],
      "events": [
        {
          "date": "10月25日",
          "title": "一般質問",
          "description": "質問者: 松永よしひろ、つる伸一郎、鈴木ひろ子、鈴木真澄、藤原正則",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
            }
          ]
        },
        {
          "date": "10月26日",
          "title": "一般質問",
          "description": "質問者: 鈴木博、たけうち忍、筒井ようすけ、南恵子",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one"
            }
          ]
        },
        {
          "date": "11月21日",
          "title": "委員長報告・表決",
          "description": "各委員会の審査報告と表決が行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
            }
          ]
        }
      ],
      "billsSection": {
        "title": "第3回定例会の議案（全件・議決結果つき）",
        "lead": "会議録の委員長報告・議事日程・表決記録から抽出した全議案です。説明文は委員長報告の要旨、結果は採決記録に基づきます。正確な内容は各リンク先の会議録原文を確認してください。"
      },
      "petitionsSection": {
        "title": "第3回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第3回定例会の代表質問・一般質問",
        "lead": "会議録から質問者・発言項目を抽出し、質問と答弁の要点を会議録の文面から自動要約しています。正確な発言は会議録原文を確認してください。"
      }
    },
    {
      "id": "h30-4t",
      "monthLabel": "12月",
      "name": "平成30年第4回定例会",
      "type": "定例会",
      "summary": "議案・請願陳情・一般質問を議決結果つきで掲載しています（会議録からの機械抽出）。",
      "links": [
        {
          "type": "minutes",
          "label": "会議録の一覧を見る",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?QueryType=new&Template=list&Cabinet=1&TermStart=2018-01-01&TermEnd=2018-12-31"
        }
      ],
      "detailTitle": "平成30年第4回定例会の詳細",
      "detailLead": "公式ページが残っていない年のため、会議録検索システムの本文から機械抽出しています。議決結果などの正確な確認は、各日の会議録リンクから原文を参照してください。",
      "stats": [
        {
          "value": "3日",
          "label": "本会議 12月6日〜12月19日"
        },
        {
          "value": "16件",
          "label": "区長提出議案（第83号〜第98号・議決確認分）"
        },
        {
          "value": "13件",
          "label": "請願・陳情"
        }
      ],
      "events": [
        {
          "date": "12月6日",
          "title": "一般質問",
          "description": "質問者: 本多健信、あくつ広王、おくの晋治、木村けんご、須貝行宏",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
            }
          ]
        },
        {
          "date": "12月7日",
          "title": "一般質問",
          "description": "質問者: のだて稔史、渡辺裕一、浅野ひろゆき、大倉たかひろ、伊藤昌宏、田中さやか、高橋しんじ",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
            }
          ]
        },
        {
          "date": "12月19日",
          "title": "委員長報告・表決",
          "description": "各委員会の審査報告と表決が行われました。",
          "links": [
            {
              "type": "minutes",
              "label": "この日の会議録を読む",
              "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
            }
          ]
        }
      ],
      "billsSection": {
        "title": "第4回定例会の議案（全件・議決結果つき）",
        "lead": "会議録の委員長報告・議事日程・表決記録から抽出した全議案です。説明文は委員長報告の要旨、結果は採決記録に基づきます。正確な内容は各リンク先の会議録原文を確認してください。"
      },
      "petitionsSection": {
        "title": "第4回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第4回定例会の代表質問・一般質問",
        "lead": "会議録から質問者・発言項目を抽出し、質問と答弁の要点を会議録の文面から自動要約しています。正確な発言は会議録原文を確認してください。"
      }
    }
  ],
  "bills": [
    {
      "meetingId": "h30-1t",
      "number": "第1号",
      "proposer": "区長提出",
      "title": "第1号 平成29年度品川区一般会計補正予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第2号",
      "proposer": "区長提出",
      "title": "第2号 平成29年度品川区国民健康保険事業会計補正予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第3号",
      "proposer": "区長提出",
      "title": "第3号 平成29年度品川区後期高齢者医療特別会計補正予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第4号",
      "proposer": "区長提出",
      "title": "第4号 平成29年度品川区介護保険特別会計補正予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第5号",
      "proposer": "区長提出",
      "title": "第5号 平成30年度品川区一般会計予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第6号",
      "proposer": "区長提出",
      "title": "第6号 平成30年度品川区国民健康保険事業会計予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第7号",
      "proposer": "区長提出",
      "title": "第7号 平成30年度品川区後期高齢者医療特別会計予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第8号",
      "proposer": "区長提出",
      "title": "第8号 平成30年度品川区介護保険特別会計予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第9号",
      "proposer": "区長提出",
      "title": "第9号 平成30年度品川区災害復旧特別会計予算",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第10号",
      "proposer": "区長提出",
      "title": "第10号 品川区職員定数条例の一部を改正する条例",
      "summary": "児童相談所の開設準備などによる増員を行う一方、執行体制の見直しなどによる減員を行い、職員の定数を2,475人から５人増員の2,480人とするものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第11号",
      "proposer": "区長提出",
      "title": "第11号 職員の給与に関する条例の一部を改正する条例",
      "summary": "平成29年10月11日に行われました特別区人事委員会勧告を踏まえ、職員の扶養手当の額を見直すものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第12号",
      "proposer": "区長提出",
      "title": "第12号 職員の旅費に関する条例の一部を改正する条例",
      "summary": "人事制度の見直しに伴い、職務の級が切りかわることから規定を整備するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第13号",
      "proposer": "区長提出",
      "title": "第13号 公益的法人等への職員の派遣等に関する条例",
      "summary": "公益財団法人東京オリンピック・パラリンピック競技大会組織委員会へ「公益的法人等への一般職の地方公務員の派遣等に関する法律」に基づき職員を派遣するため、必要な事項を定めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第14号",
      "proposer": "区長提出",
      "title": "第14号 品川区中小企業事業資金融資あつ旋条例の一部を改正する条例",
      "summary": "中小企業事業資金融資あつ旋制度の充実を図るため、小規模企業特別事業資金および創業支援資金の融資限度額を2,000万円に、緊急資金の融資限度額を3,000万円にそれぞれ引き上げるほか、緊急資金の融資期間を最長10年に延長するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第15号",
      "proposer": "区長提出",
      "title": "第15号 品川区奨学金貸付条例の一部を改正する条例",
      "summary": "奨学金貸付制度の充実を図るため、授業料のほか、課外活動などに要する資金に充てることができる在学応援資金を新たに設置するとともに、入学準備金の貸付限度額を40万円に引き上げるものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第16号",
      "proposer": "区長提出",
      "title": "第16号 品川区立就学前乳幼児教育施設条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第17号",
      "proposer": "区長提出",
      "title": "第17号 品川区保育の実施等に関する条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第18号",
      "proposer": "区長提出",
      "title": "第18号 品川区私立認定こども園、私立幼稚園および特定地域型保育事業の利用者負担額に関する条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第19号",
      "proposer": "区長提出",
      "title": "第19号 品川介護福祉専門学校修学資金貸付条例の一部を改正する条例",
      "summary": "介護保険法が改正されたことから、修学資金の貸し付けおよび免除の要件に係る指定福祉施設に介護医療院等を加えるほか、規定を整備するものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第20号",
      "proposer": "区長提出",
      "title": "第20号 品川区介護保険制度に関する条例の一部を改正する条例",
      "summary": "平成30年度から平成32年度までにおける介護保険の第１号被保険者に係る保険料の基準額を月額5,600円とするほか、保険料率の算定の基準となる合計所得金額に係る特例を設けるものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第21号",
      "proposer": "区長提出",
      "title": "第21号 品川区指定地域密着型サービスの事業の人員、設備および運営の基準等に関する条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第23号",
      "proposer": "区長提出",
      "title": "第23号 品川区指定介護予防支援等の事業の人員および運営ならびに指定介護予防支援等に係る介護予防のための効果的な支援の方法の基準等に関する条例の一部を改正する条例",
      "summary": "指定介護予防支援等の事業に係る基準を定める厚生労働省令が改正されたことに伴い、区における指定介護予防支援等の事業の人員および運営等に係る基準等を見直すものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第24号",
      "proposer": "区長提出",
      "title": "第24号 品川区指定居宅介護支援等の事業の人員および運営の基準等に関する条例",
      "summary": "介護保険法が改正されたことに伴い、居宅サービス計画の作成等を行う居宅介護支援等の事業の人員、設備および運営に関する基準等を定めるものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第25号",
      "proposer": "区長提出",
      "title": "第25号 品川区立高齢者多世代交流支援施設条例の一部を改正する条例",
      "summary": "高齢者の介護予防および生きがいづくり、ならびに在宅子育て世帯の支援を推進するため、新たな高齢者多世代交流支援施設を設置するものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第26号",
      "proposer": "区長提出",
      "title": "第26号 品川区立高齢者住宅条例の一部を改正する条例",
      "summary": "区が期間を定めて借り上げている高齢者住宅カガミハイツについて、建物所有者との契約を更新することに伴い、当該住宅の使用料を月額６万4,000円に改めるものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第27号",
      "proposer": "区長提出",
      "title": "第27号 障害者の日常生活及び社会生活を総合的に支援するための法律及び児童福祉法の一部を改正する法律の施行に伴う関係条例の整備に関する条例",
      "summary": "「障害者の日常生活及び社会生活を総合的に支援するための法律」および「児童福祉法」が改正されたことに伴い、品川区立心身障害者福祉会館条例外２条例の規定を整備するものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第28号",
      "proposer": "区長提出",
      "title": "第28号 品川区後期高齢者医療に関する条例の一部を改正する条例",
      "summary": "高齢者の医療の確保に関する法律等が改正されたことに伴い、国民健康保険に係る住所地特例の対象者が後期高齢者医療保険においても引き継がれることになったことから、区が保険料を徴収すべき被保険者を見直すものであります。",
      "tags": [
        "税・社会保障"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第29号",
      "proposer": "区長提出",
      "title": "第29号 品川区住宅宿泊事業の適正な運営の確保に関する条例",
      "summary": "住宅宿泊事業法に基づき、住宅宿泊事業の適正な運営の確保を図るため、事業の実施を制限する区域および期間を定めるとともに、事業者等の責務を定めるものであります。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第30号",
      "proposer": "区長提出",
      "title": "第30号 品川区営住宅条例の一部を改正する条例",
      "summary": "公営住宅法が改正されたことから、認知症である者等の収入申告義務を緩和するほか、規定を整備するものであります。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第31号",
      "proposer": "区長提出",
      "title": "第31号 品川区立区民住宅条例の一部を改正する条例",
      "summary": "区が期間を定めて借り上げている区民住宅アイルサイドテラスについて、借り上げ期間の満了により建物所有者に当該区民住宅を返還するため、公の施設としての位置づけを廃止するものであります。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第32号",
      "proposer": "区長提出",
      "title": "第32号 品川区手数料条例の一部を改正する条例",
      "summary": "建築基準法が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第33号",
      "proposer": "区長提出",
      "title": "第33号 品川区地区計画等の区域内における建築物の制限に関する条例の一部を改正する条例",
      "summary": "大崎駅西口地区地区計画の一部が変更されたことに伴い、当該区域のうち新たに地区整備計画が定められたＦ南地区およびＦ北地区において、建築物に関する制限を定めるものであります。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第34号",
      "proposer": "区長提出",
      "title": "第34号 品川区立幼稚園条例の一部を改正する条例",
      "summary": "地方税法が改正されたことに伴い、保育料の算定の基準となる住民税所得割の税率が指定都市において引き上げられることから、保育料の算定の特例を設けるものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第35号",
      "proposer": "区長提出",
      "title": "第35号 幼稚園教員教育職員の給与に関する条例の一部を改正する条例および第36号議案、学校教育職員の給与に関する条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第36号",
      "proposer": "区長提出",
      "title": "第36号 学校教育職員の給与に関する条例の一部を改正する条例",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第37号",
      "proposer": "区長提出",
      "title": "第37号 浜川雨水排水管建設工事その２（浜川公園人孔等整備）請負契約の変更について",
      "summary": "平成28年第１回定例会で本契約の議決を、平成28年第２回定例会および第４回定例会で契約変更の議決をいただきました浜川雨水排水管建設工事その２（浜川公園人孔等整備）請負契約におきまして、地中の支障物の撤去数量に変更が生じたことなどから、契約金額の変更を提案するものであります。",
      "tags": [
        "公園"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第38号",
      "proposer": "区長提出",
      "title": "第38号 東京都後期高齢者医療広域連合規約の変更",
      "summary": "地方自治法第291条の３第３項の規定に基づき、東京都後期高齢者医療広域連合の規約を変更するものであります。",
      "tags": [
        "税・社会保障"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第39号",
      "proposer": "区長提出",
      "title": "第39号 指定管理者の指定および第40号議案、指定管理者の指定",
      "summary": "品川区立図書館のうち二葉図書館外６施設の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第40号",
      "proposer": "区長提出",
      "title": "第40号 指定管理者の指定",
      "summary": "品川区立図書館のうち南大井図書館外２施設の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第41号",
      "proposer": "区長提出",
      "title": "第41号 職員の退職手当に関する条例の一部を改正する条例",
      "summary": "国家公務員の退職手当水準の見直し、民間企業の退職金水準の動向などを勘案し、職員の退職手当の支給率を引き下げるとともに、在職期間中の職員の職務および職責に応じた貢献度をより一層反映させるため、退職手当の調整額を改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第42号",
      "proposer": "区長提出",
      "title": "第42号 品川区国民健康保険条例の一部を改正する条例",
      "summary": "国民健康保険条例に所要の改正を行うものであります。",
      "tags": [
        "税・社会保障"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第44号",
      "proposer": "区長提出",
      "title": "第44号 平成30年度品川区一般会計補正予算のうち、歳出に係る厚生委員会所管分",
      "summary": "６月29日の本会議において当委員会に審査を付託され、７月２日の委員会で審査し、同日、採決を行いました。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第45号",
      "proposer": "区長提出",
      "title": "第45号 職員の給与に関する条例の一部を改正する条例",
      "summary": "旅館業法が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第46号",
      "proposer": "区長提出",
      "title": "第46号 品川区特別区税条例の一部を改正する条例",
      "summary": "地方税法等の一部が改正されたことに伴い、所要の改正を行うものであります。",
      "tags": [
        "税"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第47号",
      "proposer": "区長提出",
      "title": "第47号 品川区印鑑条例の一部を改正する条例",
      "summary": "個人番号カードと印鑑登録証の一元化を図るほか、印鑑登録原票の調製方式を改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第48号",
      "proposer": "区長提出",
      "title": "第48号 品川区放課後児童健全育成事業の設備および運営の基準に関する条例の一部を改正する条例",
      "summary": "放課後児童健全育成事業の設備及び運営に関する基準が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第49号",
      "proposer": "区長提出",
      "title": "第49号 品川区立在宅サービスセンター条例の一部を改正する条例",
      "summary": "戸越台複合施設の大規模改修工事を実施することに伴い、戸越台在宅サービスセンターの所在地を戸越一丁目15番23号から東中延一丁目５番７号に改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第50号",
      "proposer": "区長提出",
      "title": "第50号 品川区介護保険制度に関する条例の一部を改正する条例",
      "summary": "介護保険法施行令が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第51号",
      "proposer": "区長提出",
      "title": "第51号 品川区指定地域密着型サービスの事業の人員、設備および運営の基準等に関する条例の一部を改正する条例",
      "summary": "介護保険法等が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第53号",
      "proposer": "区長提出",
      "title": "第53号 品川区手数料条例の一部を改正する条例および第54号議案、品川区旅館業に関する条例の一部を改正する条例",
      "summary": "旅館業法が改正されたことに伴い、規定を整備するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第54号",
      "proposer": "区長提出",
      "title": "第54号 品川区旅館業に関する条例の一部を改正する条例",
      "summary": "旅館業法等が改正されたことに伴い、衛生措置の基準、施設の構造設備の基準等を改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第55号",
      "proposer": "区長提出",
      "title": "第55号 品川区地区計画等の区域内における建築物の制限に関する条例の一部を改正する条例",
      "summary": "建築物の不燃化・耐震化を促進し、防災性の高い市街地の形成と戸越公園駅周辺の一体的な更新を図るため、戸越・豊町地区地区計画を決定したことに伴い、当該区域内における建築物の敷地面積の最低限度、壁面の位置等に関する制限を定めるものであります。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第56号",
      "proposer": "区長提出",
      "title": "第56号 中小企業センター空調設備改修第二期その他機械設備工事請負契約",
      "summary": "中小企業センターの空調設備について、老朽化が進んでいることから、改修工事を行うほか、排水管および給水管の耐震化工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第57号",
      "proposer": "区長提出",
      "title": "第57号 荏原複合施設空調機全面更新工事請負契約",
      "summary": "荏原複合施設の空調機について、老朽化が進んでいることから、改修工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第58号",
      "proposer": "区長提出",
      "title": "第58号 戸越台複合施設大規模改修工事請負契約、第59号議案、戸越台複合施設大規模改修機械設備工事請負契約および第60号議案、戸越台複合施設大規模改修電気設備工事請負契約",
      "summary": "戸越台複合施設について、施設の老朽化が進んでいることから、大規模改修工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第59号",
      "proposer": "区長提出",
      "title": "第59号 戸越台複合施設大規模改修機械設備工事請負契約",
      "summary": "同施設の機械設備工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第60号",
      "proposer": "区長提出",
      "title": "第60号 戸越台複合施設大規模改修電気設備工事請負契約",
      "summary": "同施設の電気設備工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第61号",
      "proposer": "区長提出",
      "title": "第61号 芳水小学校第２期校舎改築その他工事請負契約",
      "summary": "芳水小学校について、校庭およびプール棟の整備、敷地外周部のフェンスの設置などの工事を行うものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第62号",
      "proposer": "区長提出",
      "title": "第62号 後地小学校校舎改築その他工事請負契約、第63号議案、後地小学校校舎改築その他機械設備工事請負契約および第64号議案、後地小学校校舎改築その他電気設備工事請負契約",
      "summary": "後地小学校について、既存の校舎を解体し、新たな校舎の建築工事を行うものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第63号",
      "proposer": "区長提出",
      "title": "第63号 後地小学校校舎改築その他機械設備工事請負契約",
      "summary": "同校の機械設備工事を行うものであります。契約の方法は制限付き一般競争入札で、契約金額は５億9,076万円、契約の相手方は品川区上大崎一丁目２番８号、横河・野田建設共同企業体、代表者、横河東亜工業株式会社、代表取締役、田中博行であります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第64号",
      "proposer": "区長提出",
      "title": "第64号 後地小学校校舎改築その他電気設備工事請負契約",
      "summary": "同校の電気設備工事を行うものであります。契約の方法は制限付き一般競争入札で、契約金額は４億4,000万円、契約の相手方は品川区荏原四丁目５番17号、マスミ・品川建設共同企業体、代表者、株式会社マスミ電設、代表取締役、渡部弘太郎であります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第65号",
      "proposer": "区長提出",
      "title": "第65号 オリンピック・パラリンピック施設周辺道路整備工事（その１）請負契約",
      "summary": "東京2020オリンピック・パラリンピック競技大会の開催に当たり、競技会場周辺道路の無電柱化事業として、勝島一丁目５番先から八潮四丁目１番先までの道路について整備工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第66号",
      "proposer": "区長提出",
      "title": "第66号 オリンピック・パラリンピック施設周辺道路整備工事（その２）請負契約",
      "summary": "第65号議案と同様に、八潮四丁目１番先から八潮四丁目２番先までの道路について整備工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第67号",
      "proposer": "区長提出",
      "title": "第67号 勝島歩道橋南側エレベーター設置工事委託契約",
      "summary": "東京2020オリンピック・パラリンピック競技大会の開催に当たり、競技会場へ向かう歩行者動線のバリアフリー化を図るため、大井競馬場前駅に隣接する勝島歩道橋の南側エレベーター設置工事を委託するものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第68号",
      "proposer": "区長提出",
      "title": "第68号 防災行政無線設備更新工事請負契約",
      "summary": "防災行政無線設備について、老朽化が進んでいることから、品川区役所外34か所に設置している当該施設の更新工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第69号",
      "proposer": "区長提出",
      "title": "第69号 しながわ区民公園南側ゾーン改修工事請負契約および第70号議案、しながわ区民公園水処理施設改修工事請負契約",
      "summary": "しながわ区民公園南側ゾーンについて、施設の老朽化が進んでいることなどから、改修工事を行うものであります。",
      "tags": [
        "公園"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第70号",
      "proposer": "区長提出",
      "title": "第70号 しながわ区民公園水処理施設改修工事請負契約",
      "summary": "しながわ区民公園「勝島の海」の水処理施設について、施設の老朽化が進んでいることなどから、改修工事を行うものであります。",
      "tags": [
        "公園"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第71号",
      "proposer": "区長提出",
      "title": "第71号 浜川公園改修工事請負契約",
      "summary": "浜川公園について、施設の老朽化および下水道工事の終了に伴い、改修工事を行うものであります。",
      "tags": [
        "公園"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第72号",
      "proposer": "区長提出",
      "title": "第72号 専決処分の承認を求めること",
      "summary": "債務の不存在を確認する民事訴訟の提起に関する専決処分について承認を求めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第74号",
      "proposer": "区長提出",
      "title": "第74号 平成30年度品川区一般会計補正予算のうち、歳出に係る文教委員会所管分",
      "summary": "10月26日の本会議において当委員会に審査を付託され、10月29日の委員会で審査し、同日、採決を行いました。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第75号",
      "proposer": "区長提出",
      "title": "第75号 品川区立保育所条例の一部を改正する条例",
      "summary": "保育所の移転等をすることに伴い、所要の改正を行うものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第76号",
      "proposer": "区長提出",
      "title": "第76号 品川区家庭的保育事業等の設備および運営の基準に関する条例の一部を改正する条例",
      "summary": "家庭的保育事業等の設備および運営に関する基準が改正されたことに伴い、家庭的保育事業における調理員の配置および調理設備の設置に係る経過措置を延長するものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第77号",
      "proposer": "区長提出",
      "title": "第77号 品川区私立認定こども園、私立幼稚園および特定地域型保育事業の利用者負担額に関する条例の一部を改正する条例",
      "summary": "子ども・子育て支援法施行令が改正されたことに伴い、私立認定こども園および私立幼稚園における年収約360万円未満の世帯に係る利用者負担額を軽減するものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第78号",
      "proposer": "区長提出",
      "title": "第78号 品川区公衆浴場の設置場所の配置および衛生措置等の基準に関する条例の一部を改正する条例",
      "summary": "公衆浴場における浴槽の衛生管理が向上していること等を踏まえ、衛生措置等の基準を改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第79号",
      "proposer": "区長提出",
      "title": "第79号 品川区手数料条例の一部を改正する条例",
      "summary": "建築基準法が改正されたことに伴い、受益者負担の適正化を図るため、条例の規定を改めるものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第80号",
      "proposer": "区長提出",
      "title": "第80号 品川区立学校の学校医、学校歯科医および学校薬剤師の公務災害補償に関する条例の一部を改正する条例",
      "summary": "公立学校の学校医、学校歯科医および学校薬剤師の公務災害補償の基準を定める政令が改正されたことに伴い、介護補償の額を改めるものであります。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第81号",
      "proposer": "区長提出",
      "title": "第81号 指定管理者の指定",
      "summary": "品川区立平塚高齢者多世代交流支援施設の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "議員提出 第4号",
      "proposer": "議員提出",
      "title": "議員提出 第4号 固定資産税・都市計画税の軽減措置の継続を求める意見書",
      "summary": "議員提出の意見書です。詳細は会議録本文を参照してください。",
      "tags": [
        "意見書・決議"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第83号",
      "proposer": "区長提出",
      "title": "第83号 品川区立障害児者総合支援施設条例",
      "summary": "障害児および障害者の福祉の増進を図るため、地域生活の支援拠点となる品川区立障害児者総合支援施設を品川区南品川三丁目７番７号に設置するものであります。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第84号",
      "proposer": "区長提出",
      "title": "第84号 品川区議会議員および品川区長の選挙における選挙運動の公費負担に関する条例の一部を改正する条例",
      "summary": "公職選挙法が改正され、区議会議員の選挙におけるビラの頒布が認められるとともに、当該ビラの作成費用の公費負担が可能となったことから、当該ビラの作成費用について公費負担を行うものであります。",
      "tags": [
        "議会・行政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第85号",
      "proposer": "区長提出",
      "title": "第85号 （仮称）品川区立障害児者総合支援施設新築工事請負契約の変更について",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第86号",
      "proposer": "区長提出",
      "title": "第86号 （仮称）品川区立障害児者総合支援施設新築給排水衛生設備工事請負契約の変更について",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第87号",
      "proposer": "区長提出",
      "title": "第87号 （仮称）品川区立障害児者総合支援施設新築空気調和設備工事請負契約の変更について",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第88号",
      "proposer": "区長提出",
      "title": "第88号 （仮称）品川区立障害児者総合支援施設新築電気設備工事請負契約の変更について",
      "summary": "内容の詳細は会議録本文（委員長報告・議事日程）を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第89号",
      "proposer": "区長提出",
      "title": "第89号 第二戸越幹線整備工事（上流部シールド）請負契約",
      "summary": "戸越地区および西品川地区における浸水被害の軽減を図るため、第二戸越幹線を整備することから、西品川公園内の立坑から平塚三丁目付近までの約1.7キロメートルにおいて、下水道本管を整備するとともに、宮前坂広場内に立坑を築造する工事を行うものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第90号",
      "proposer": "区長提出",
      "title": "第90号 第二戸越幹線整備工事（下水道本管立坑整備）請負契約の変更について",
      "summary": "平成29年第４回定例会で議決をいただきました第二戸越幹線整備工事（下水道本管立坑整備）請負契約におきまして、下流部シールドマシンの到達方法の変更に伴い、到達部を補強する必要が生じたことなどから、契約金額の変更を提案するものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第91号",
      "proposer": "区長提出",
      "title": "第91号 臨海部広域斎場組合規約の変更",
      "summary": "地方自治法第286条第２項の規定に基づき、臨海部広域斎場組合の規約を変更するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第92号",
      "proposer": "区長提出",
      "title": "第92号 指定管理者の指定",
      "summary": "品川区立ぷりすくーる西五反田の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第93号",
      "proposer": "区長提出",
      "title": "第93号 指定管理者の指定",
      "summary": "品川区立東大井地域密着型多機能ホームの管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第94号",
      "proposer": "区長提出",
      "title": "第94号 指定管理者の指定",
      "summary": "品川区立心身障害者福祉会館の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第95号",
      "proposer": "区長提出",
      "title": "第95号 指定管理者の指定",
      "summary": "品川区立上大崎つばさの家の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第96号",
      "proposer": "区長提出",
      "title": "第96号 指定管理者の指定",
      "summary": "品川区立発達障害者支援施設の管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第97号",
      "proposer": "区長提出",
      "title": "第97号 指定管理者の指定",
      "summary": "品川区立品川健康センターおよび荏原健康センターの管理を行わせるため、指定管理者を指定するものであります。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第98号",
      "proposer": "区長提出",
      "title": "第98号 訴訟上の和解",
      "summary": "品川区立中学校の生徒が自死したことを受けて当該生徒の両親が提起した損害賠償請求事件に関し、東京地方裁判所の和解勧告に基づき、和解することについて議決を求めるものであります。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    }
  ],
  "petitions": [
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第1号",
      "title": "２０２０年実施計画に基づく「品川上空飛行ルート」の中止を国交省に求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第2号",
      "title": "国民健康保険料の負担軽減を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第3号",
      "title": "第３２回オリンピック競技大会（２０２０／東京）の開会式に競技施設等の工事従事者の入場行進等のセレモニーを求める意見書提出に対する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第4号",
      "title": "第３２回オリンピック競技大会（２０２０／東京）における競技施設等工事において、労働災害防止および「持続可能性に配慮した調達コード（長時間労働の禁止等）」順守の徹底を求める意見書提出に対する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第5号",
      "title": "羽田空港増便による低空飛行について、国交省に対する区の対応に関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第6号",
      "title": "核兵器禁止条約への参加・批准を政府・国会に求める意見書の採択を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第7号",
      "title": "認可保育園入園のための制度改善を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第8号",
      "title": "国保料引下げと過酷な取立て中止を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第9号",
      "title": "コミュニティーバスの運行に関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第10号",
      "title": "京急北品川駅の高架化に関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年請願 第11号",
      "title": "区画街路と京急北品川駅の広場建設に関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年請願 第12号",
      "title": "大崎図書館の解体は止め、新たな図書館として再生させることを求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年請願 第13号",
      "title": "都心・品川上空新飛行ルートの撤回を国交省に求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年請願 第14号",
      "title": "品川区長選挙と品川区議会議員一般選挙の同日開催を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年請願 第15号",
      "title": "固定資産税及び都市計画税の軽減措置の継続について意見書の提出に関する請願",
      "result": "備考： 意見書",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年請願 第16号",
      "title": "固定資産税及び都市計画税の軽減措置の継続について意見書の提出に関する請願",
      "result": "備考： 意見書",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年請願 第17号",
      "title": "区が羽田空港増便による新低空飛行ルート撤回を国に強く要請することに関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第18号",
      "title": "区が羽田空港増便による新低空飛行ルート計画のアンケート調査をすること、区独自の教室型説明会を開催することに関する請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第19号",
      "title": "特定整備路線 放射２号線 現状を見直し改善を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第20号",
      "title": "国に対し「消費税増税中止を求める意見書」の提出を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第21号",
      "title": "都営地下鉄中延駅（東中延２丁目口）のエレベーターなどの設置に向け、品川区が東京都と連携して取り組むことを求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第22号",
      "title": "コミュニティバスの運行を求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年請願 第23号",
      "title": "学校給食の牛乳にプラスチックストローを使用しないことを求める請願",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/petition/6118.html"
        }
      ]
    },
    {
      "meetingId": "h30-1r",
      "number": "平成30年陳情 第3号",
      "title": "荏原地域に障害者施設の整備に関する陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-1r",
      "number": "平成30年陳情 第4号",
      "title": "品川区公式ホームページにおける障害福祉関連ページの充実を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "平成30年陳情 第5号",
      "title": "羽田離着陸新ルート計画中止を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第6号",
      "title": "「品川区住宅宿泊事業の適正な運営の確保に関する条例」に関する陳情",
      "result": "備考： 厚生委員会へ参考送付",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-1r",
      "number": "平成30年陳情 第7号",
      "title": "羽田新ルート計画について、区長の国交省交渉の全容を明らかにするよう求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年陳情 第8号",
      "title": "同性パートナーシップの公的承認についての陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年陳情 第9号",
      "title": "大森駅前住宅前駐輪場移設の具体的な検討についての陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第10号",
      "title": "障害者に寄り添った相談支援の実施を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第11号",
      "title": "情報公開請求における正しい文書の開示を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年陳情 第12号",
      "title": "区長が、羽田空港増便による新飛行ルートについて、国に対し見直しを求める交渉をすることに関する陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "平成30年陳情 第13号",
      "title": "羽田空港新ルート見直しと説明会開催に関する陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第14号",
      "title": "犯罪被害者等支援条例制定に関する陳情",
      "result": "備考： 総務委員会へ参考送付",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第15号",
      "title": "正しい公文書の情報管理と開示を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第16号",
      "title": "品川総合福祉センターの障害者施設で虐待等を二度と起こさないような人員体制の整備を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第17号",
      "title": "臓器移植の環境整備に関する意見書の提出を求める陳情",
      "result": "備考： 厚生委員会へ参考送付",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第18号",
      "title": "認可外を含む私立保育所職員に対する品川区独自の処遇改善を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第19号",
      "title": "「（仮称）空のはねこども園はたのだい」（旗の台２丁目）の事業者指導等を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "平成30年陳情 第20号",
      "title": "コミュニティバスの運行を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第21号",
      "title": "放課後等デイサービスに関する補助事業等の実施を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第22号",
      "title": "すまいるスクールの利用者ニーズ把握のためのアンケート調査の実施を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第23号",
      "title": "指定管理制度運用ガイドラインの作成と研修実施を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "平成30年陳情 第24号",
      "title": "障害児者総合支援施設の工事の説明会実施と適切な工程管理を求める陳情",
      "result": "備考：",
      "links": [
        {
          "type": "official",
          "label": "審議状況ページを見る",
          "url": "https://gikai.city.shinagawa.tokyo.jp/lobbying/6120.html"
        }
      ]
    }
  ],
  "questions": [
    {
      "meetingId": "h30-1t",
      "kind": "代表質問",
      "member": "渡部茂",
      "party": "自民",
      "topics": [
        "産業の活性化",
        "みんなで築く健康・福祉都市",
        "民生委員さんの活動",
        "次代につなぐ環境都市",
        "品川区立学校教育要領",
        "区固有教員",
        "みんなで築く健康・福祉都市」"
      ],
      "qaSummaries": [
      {
            "title": "産業の活性化",
            "question": "この間続けているプレミアム付区内共通商品券の発行は、区商連や郵便局、地域の商店街と連携し、区民の消費喚起のみならず、地域商店の景況に補助率の10倍の効果があらわれる費用対効果の高い施策であり、緊急経済対策の側面ではなく、区内産業活性化のための重要な施策であり、今後も引き続き行うことを強く求めました。",
            "answer": "区側は、マイスター店についてですが、平成18年度から５か年の計画事業として、トータル200店舗の認定を行ったものです。"
      },
      {
            "title": "みんなで築く健康・福祉都市",
            "question": "高齢者福祉については、基本構想で既に予測していました団塊の世代の高齢化が始まり、ここ数年で急速に高齢化が進みます。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "民生委員さんの活動",
            "question": "国の基準で定数が定められている中で、各町会・自治会から選任いただき、地域の高齢者福祉のため日々活動いただいています。",
            "answer": "区側は、民生委員についてですが、地域における身近な福祉の相談役として日々活動していただいております。"
      },
      {
            "title": "次代につなぐ環境都市",
            "question": "環境問題と一くくりにしますと問題が大き過ぎ、答えに困ります。",
            "answer": "区側は、次代につなぐ環境都市」のご質問のうち、個人の環境への取り組みについてですが、現在策定を進めている新たな環境の計画の中で、日常生活における環境行動の例示やその効果などをわかりやすくお示しする予定でございます。"
      },
      {
            "title": "品川区立学校教育要領",
            "question": "本区では従来から小中一貫教育要領を独自に作成し、区立学校において授業に当たられました。",
            "answer": "区側は、品川区立学校教育要領についてですが、まず市民科は、そもそも「特別の教科道徳」の内容や趣旨を包含しております。"
      },
      {
            "title": "区固有教員",
            "question": "平成21年から30名を目標に採用を行い、現在24名の先生が区費による区の教員として教育に当たられています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "みんなで築く健康・福祉都市」",
            "question": "高齢者福祉については、基本構想で既に予測していました団塊の世代の高齢化が始まり、ここ数年で急速に高齢化が進みます。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=502#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-watabe-shigeru"
    },
    {
      "meetingId": "h30-1t",
      "kind": "代表質問",
      "member": "若林ひろき",
      "party": "公明",
      "topics": [
        "区政運営",
        "待機児解消対策等",
        "地域包括ケアシステム",
        "地域福祉および地域共生社会",
        "学校選択制と品川教育ルネサンス",
        "受動喫煙",
        "公園等トイレの洋式化"
      ],
      "qaSummaries": [
      {
            "title": "区政運営",
            "question": "区政運営に臨む基本的な考え方として、第１に、人口構成の大きな変化による行政需要への影響を捉え、品川区基本構想および長期基本計画を改定・策定すること。",
            "answer": "区側は、財政運営につきましては、新公会計制度を活用することで、資産やコスト情報をより迅速、精緻に把握することが可能となります。"
      },
      {
            "title": "待機児解消対策等",
            "question": "子育て支援策の充実や合計特殊出生率の上昇などで、乳幼児人口の人数は３年間で1,842人増え、昨年度は23区でも２番目の増加となり、乳幼児人口のピークは2021年以降になると見込まれています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "地域包括ケアシステム",
            "question": "高齢者人口の増加に伴う介護や医療等の需要増大と多様化への対応が進められています。",
            "answer": "区側は、ひとり暮らし高齢者の世帯数ですが、平成27年の国勢調査では、高齢者のいる世帯が５万6,514世帯に対して、ひとり暮らし高齢者世帯は２万2,548世帯で39.9％となっており、５年前の調査に比べて1.8ポイント上昇しています。"
      },
      {
            "title": "地域福祉および地域共生社会",
            "question": "品川区地域福祉計画が、2019年度の改定へ来年度に改定作業が行われることになりました。",
            "answer": "区側は、地域福祉の担い手の確保・育成等を重点プロジェクトに位置づけ推進してまいります。"
      },
      {
            "title": "学校選択制と品川教育ルネサンス",
            "question": "品川区の学校選択制は、選択されるという学校環境に変化を与え、意識改革を図り、魅力的な学校となることで、保護者・子どもの要望に応えることを目的としています。",
            "answer": "区側は、選択する子どもが多い学校と少ない学校の要因についてですが、保護者アンケートでは、学校の特色や自宅からの近さ、友人関係や兄弟の在籍などが選択理由の上位を占めています。"
      },
      {
            "title": "受動喫煙",
            "question": "国は、受動喫煙対策を強化するため、健康増進法の改正案を今国会へ提出するとされています。",
            "answer": "区側は、喫煙所のある公園等は28か所あり、そのうちパーティションが設置されていないのは22か所です。"
      },
      {
            "title": "公園等トイレの洋式化",
            "question": "2020東京オリンピック・パラリンピックに向け、各地でトイレの洋式化が加速しています。",
            "answer": "区側は、助成制度の活用状況につきましては、おもてなしトイレ事業で東京都の補助制度を活用しております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=502#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "hiroki_wakabayashi"
    },
    {
      "meetingId": "h30-1t",
      "kind": "代表質問",
      "member": "南恵子",
      "party": "共産",
      "topics": [
        "暮らし破壊の安倍政治追随から住民の命・暮らし守る区政に転換を"
      ],
      "qaSummaries": [
      {
            "title": "暮らし破壊の安倍政治追随から住民の命・暮らし守る区政に転換を",
            "question": "暮らし破壊の安倍政治追随から住民の命・暮らし守る区政に転換をです。",
            "answer": "区側は、暮らし破壊の追随政治ですけれども、区が打ち出した施政方針でも出ている持続可能な区民の共助の後押しというのは、助け合いの範囲を超えて自治体が直接責任を持つべきところを地域で解決という、住民に委ねてしまう、こういうことになってしまうのではないか。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=502#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-minami-keiko"
    },
    {
      "meetingId": "h30-1t",
      "kind": "代表質問",
      "member": "石田しんご",
      "party": "民進",
      "topics": [
        "東京2020オリンピック・パラリンピック",
        "ごみ対策",
        "羽田空港機能強化",
        "区民参加",
        "パラリンピックの成功に向けての取り組み",
        "感染症対策",
        "防災対策"
      ],
      "qaSummaries": [
      {
            "title": "東京2020オリンピック・パラリンピック",
            "question": "東京2020オリンピック・パラリンピック、防災対策、区民サービスの向上、福祉、子育て支援、教育、ダイバーシティの取り組み、公契約、まちづくりについて質問してまいります。",
            "answer": "区側は、大会開催期間中は、外国人をはじめ多くの方が区内を訪れることが予想されますが、町なかでの吸殻等のポイ捨てを防止するため、日英中韓の４つの言語表記した多言語対応の横断幕や路面標示シートを区内に順次設置し、来街者に対する啓発に努めてまいります。"
      },
      {
            "title": "ごみ対策",
            "question": "オリンピック期間中の来場者は延べ1,000万人にも及ぶとされています。",
            "answer": "区側は、大会開催期間中は、外国人をはじめ多くの方が区内を訪れることが予想されますが、町なかでの吸殻等のポイ捨てを防止するため、日英中韓の４つの言語表記した多言語対応の横断幕や路面標示シートを区内に順次設置し、来街者に対する啓発に努めてまいります。"
      },
      {
            "title": "羽田空港機能強化",
            "question": "これまでも住民説明会をはじめ、環境影響、新飛行経路や落下物対策などの情報提供がされてきました。",
            "answer": "区側は、まずスケジュールについてですが、国は、東京オリンピック・パラリンピックの開催までに国際線を増便したいとしております。"
      },
      {
            "title": "区民参加",
            "question": "大会の成功には区民の参加が必要です。",
            "answer": "区側は、区はこれまでもさまざまな機運醸成事業を実施しており、スポーツ推進委員をはじめ、町会・自治会や商店街等を実行委員会のメンバーに加わっていただくとともに、平成28年より区内団体等によるしながわサポーターを編成し、各種イベント等にご参加いただいています。"
      },
      {
            "title": "パラリンピックの成功に向けての取り組み",
            "question": "パラリンピックの成功に向けての取り組みについてです。",
            "answer": "区側は、パラリンピックの開催までに国際線を増便したいとしております。"
      },
      {
            "title": "感染症対策",
            "question": "国内外から多くの選手、関係者、観光客が来られるということは、世界各国から感染症が輸入されるリスクが高まり、また、国内の感染症を輸出してしまうリスクも否定できません。",
            "answer": "区側は、東京は、海外からの多くの人や物が行き来する国際都市であり、海外で発生しているエボラ出血熱や中東呼吸器症候群（ＭＥＲＳ）、蚊媒介感染症等の感染症が持ち込まれ、感染が拡大しやすい状況です。"
      },
      {
            "title": "防災対策",
            "question": "防災対策、区民サービスの向上、福祉、子育て支援、教育、ダイバーシティの取り組み、公契約、まちづくりについて質問してまいります。",
            "answer": "区側は、避難所についてですが、運営マニュアルにつきましては、平成30年度に予定をしております避難所運営マニュアル更新支援業務により、全ての避難所に専門アドバイザーを派遣して現行のマニュアルや避難所施設を確認した上で、女性や障害者の視点などさまざまな課題を反映したものに更新してまいります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-ishida-shingo"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "新妻さえ子",
      "party": "公明",
      "topics": [
        "視覚障がい者および弱視者の意思疎通支援",
        "男女共同参画センターと連携した防災対策強化"
      ],
      "qaSummaries": [
      {
            "title": "視覚障がい者および弱視者の意思疎通支援",
            "question": "平成25年６月26日に公布され、28年４月１日に施行された障害者差別解消法は、行政機関や事業者における障がい者に対する障がいを理由とする差別を解消することを目的とした法律です。",
            "answer": "区側は、窓口における代読・代筆を行う旨の表示についてですが、区職員が行う合理的配慮には代読・代筆以外にもさまざまなものがあります。"
      },
      {
            "title": "男女共同参画センターと連携した防災対策強化",
            "question": "首都直下地震が30年のうちに70％の確率で起きると想定されています。",
            "answer": "区側は、女性目線と多様性を備えた防災講習についてですが、区では、多様な生き方に配慮しつつ、誰もが自分らしく、生き生きと安心して生活できる社会を実現するために、男女共同参画の推進に取り組んでいるところであります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "saeko_niizuma"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "安藤たい作",
      "party": "共産",
      "topics": [
        "広がる貧困健康で文化的な生活の保障へ区営住宅増設と家賃助成を"
      ],
      "qaSummaries": [
      {
            "title": "広がる貧困健康で文化的な生活の保障へ区営住宅増設と家賃助成を",
            "question": "広がる貧困健康で文化的な生活の保障へ区営住宅増設と家賃助成をです。",
            "answer": "区側は、家賃助成を行う考えはございません。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "taisaku_ando"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "高橋伸明",
      "party": "自民",
      "topics": [
        "海抜の低い地域における津波からの避難施設",
        "餅つき大会や区のイベントにおける衛生"
      ],
      "qaSummaries": [
      {
            "title": "海抜の低い地域における津波からの避難施設",
            "question": "海抜の低い地域における津波からの避難施設について尋ねました。",
            "answer": "区側は、海抜の低い地域における津波からの避難施設についてですが、想定される海抜2.61メートルの最大津波高に対しては高潮防潮堤により対応が可能であり、区内のほとんどの水辺で整備が完了しております。"
      },
      {
            "title": "餅つき大会や区のイベントにおける衛生",
            "question": "餅つき大会や区のイベントにおける衛生について尋ねました。",
            "answer": "区側は、学校や町会などで行われる餅つきは多くの参加者がかかわり、餅つきの際餅に手が触れることが多いため、保健所に行事届を提出いただき、食中毒の未然防止を図っております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "nobuaki_takahashi"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "松永よしひろ",
      "party": "民進",
      "topics": [
        "福祉施策",
        "障害を持った方への差別の問題",
        "シェアサイクル"
      ],
      "qaSummaries": [
      {
            "title": "福祉施策",
            "question": "急速な高齢化は、今や我が国の直面する最大の課題であります。",
            "answer": "区側は、老老介護の把握ですが、平成27年の国勢調査では、区内の高齢者のいる世帯が５万6,514世帯で、そのうち高齢者夫婦のみの世帯数は１万4,262世帯と報告されています。"
      },
      {
            "title": "障害を持った方への差別の問題",
            "question": "障害を持った方への差別の問題についてです。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "シェアサイクル",
            "question": "シェアサイクルは、近年発展している新たな地域活性化のイニシアチブであることは皆様方もご承知のとおりです。",
            "answer": "区側は、区では現在、臨海部においてサイクルポートを設置し、運用を行っておりますが、ことしの４月からは区内全域に展開するとともに、他区との連携、相互乗り入れができるよう準備を進めております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yoshihiro_matsunaga"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "浅野ひろゆき",
      "party": "公明",
      "topics": [
        "品川区におけるドローンの活用",
        "胃がん検診",
        "子どもたちを守る安全・安心な体制整備"
      ],
      "qaSummaries": [
      {
            "title": "品川区におけるドローンの活用",
            "question": "品川区におけるドローンの活用について尋ねました。",
            "answer": "区側は、ドローンの導入に向けた調査状況等についてですが、災害時における情報収集、避難誘導、物資運搬といった点での技術動向や活用事例などについて調査を行ってまいりました。"
      },
      {
            "title": "胃がん検診",
            "question": "胃がん検診について尋ねました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "子どもたちを守る安全・安心な体制整備",
            "question": "子どもたちを守る安全・安心な体制整備について尋ねました。",
            "answer": "区側は、区といたしましては、関係各課や学校との連携を図るほか、警察などとも連携し、安全対策に取り組んでまいりました。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=504#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-asano-hiroyuki"
    },
    {
      "meetingId": "h30-1t",
      "kind": "一般質問",
      "member": "高橋しんじ",
      "party": "―",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "１、予算について、予算編成過程の可視化についてお尋ねします。品川区基本構想などの中で、協働による区政運営を推進するために区民の声を聞き、区の考えをわかりやすく区民に伝え情報公開を進めるとあります。区民との協働と、その実現のために区民への情報公開を進めるという看板を掲げる区政であるならば、究極の情報公。",
            "answer": "区側は、区では、業務の効率化や区民サービスの向上のため、さまざまなシステムを導入しておりますが、システム化しにくく、人的作業に頼らざるを得ない業務も多く存在します。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=506#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "shinji_takahashi"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "石田ちひろ",
      "party": "共産",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "まず初めに、羽田新ルートの容認、二枚舌、隠ぺいは許されない、計画撤回を国に求める区政に転換を、です。安倍内閣が2020年実施と示す羽田新ルートが近づき、住民の不安はさらに強まっています。国交省は、2009年から16年の８年間で、航空機からの部品落下を451件と報告。さらに、昨年11月からことし５月ま。",
            "answer": "区側は、区では、情報公開請求は、その目的や理由にかかわらず、特定の請求者に対して行う事務と位置づけていることから、地方自治法第227条に基づき、条例を定めて手数料を徴収しているものであります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "chihiro_ishida"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "石田秀男",
      "party": "自民",
      "topics": [
        "羽田空港",
        "区内の街づくり・商業・産業・観光振興",
        "東京オリンピック・パラリンピック開催",
        "高齢者対策"
      ],
      "qaSummaries": [
      {
            "title": "羽田空港",
            "question": "平成26年７月８日、国土交通省から新飛行経路案が公表され、平成27年８月から平成29年11月にかけ第１から第４フェーズの説明会が開催され、ことしの３月には落下物対策総合パッケージが公表されました。",
            "answer": "区側は、新飛行ルート案につきましては、これまで国により４期にわたるオープンハウス型説明会やニュースレターの発行など、地域に対する周知と説明が行われてきました。"
      },
      {
            "title": "区内の街づくり・商業・産業・観光振興",
            "question": "１、現在、大井町・広町地区は、ＪＲ東日本と協議し、計画をつくっていると考えます。",
            "answer": "区側は、・観光振興について幅広いご意見をいただきました。"
      },
      {
            "title": "東京オリンピック・パラリンピック開催",
            "question": "１、先日、天王洲野球場で世界初のブラインドサッカー世界大会が開催されました。",
            "answer": "区側は、東京オリンピック・パラリンピックに向けて多くの方々がこの品川に訪れてくださることと思います。"
      },
      {
            "title": "高齢者対策",
            "question": "１、高齢者の施設整備については、計画の早期実現に向け、取り組んでいただきたいと考えます。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "hideo_ishida"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "いながわ貴之",
      "party": "無所属",
      "topics": [
        "中小企業振興",
        "中心市街地の渋滞緩和",
        "交通量調査",
        "大型車両の規制",
        "一時待機場所等",
        "有効な防災対策",
        "人工知能による防災対策"
      ],
      "qaSummaries": [
      {
            "title": "中小企業振興",
            "question": "中小企業振興についてお伺いしてまいります。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "中心市街地の渋滞緩和",
            "question": "中心市街地の渋滞緩和についてお伺いしてまいります。",
            "answer": "区側は、中心市街地の渋滞緩和策についてですが、新たなまちづくりの動きに伴う交通計画を進めるに当たっては、現況の交通量の調査とあらかじめ予測した交通量の結果をもとに、道路管理者や交通管理者と協議を行っているところでございます。"
      },
      {
            "title": "交通量調査",
            "question": "交通量調査について尋ねました。",
            "answer": "区側は、交通量調査を実施し、現時点において大きな混雑がないことを確認しておりますが、今後、補助26号線の開通も踏まえた交通量の予測を行い、まちづくりに必要な交通規制などについて検討してまいります。"
      },
      {
            "title": "大型車両の規制",
            "question": "大型車両の規制について尋ねました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "一時待機場所等",
            "question": "一時待機場所等について尋ねました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "有効な防災対策",
            "question": "有効な防災対策についてお伺いしてまいります。",
            "answer": "区側は、中心市街地の渋滞緩和策についてですが、新たなまちづくりの動きに伴う交通計画を進めるに当たっては、現況の交通量の調査とあらかじめ予測した交通量の結果をもとに、道路管理者や交通管理者と協議を行っているところでございます。"
      },
      {
            "title": "人工知能による防災対策",
            "question": "人工知能による防災対策について尋ねました。",
            "answer": "区側は、人工知能による防災対策に関するご質問のうち、現在の区における情報収集・分析の現状についてですが、発災時には、各地域センター、各区民避難所などで収集した情報、警察、消防等防災関係機関からの情報のほか、マスコミ情報などを災害対策本部で集約し、我々担当者が総合的に分析した結果を具体的な災害対策に反映することとしております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-inagawa-takayuki"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "あくつ広王",
      "party": "公明",
      "topics": [
        "総合的ながん対策",
        "子どもの未来応援施策",
        "羽田空港の新飛行ルート案",
        "国の説明・周知の手法"
      ],
      "qaSummaries": [
      {
            "title": "総合的ながん対策",
            "question": "我が国の死因の第１位はがんであり、日本人の２人に１人はがんになり、３人に１人ががんで亡くなっています。",
            "answer": "区側は、品川区におきましても、がんは死因の第１位であり、平成29年には895人の方ががんで亡くなっております。"
      },
      {
            "title": "子どもの未来応援施策",
            "question": "本年４月時点で子ども食堂が全国に2,286か所となり、２年弱で７倍となっていることが、運営者の団体こども食堂安心・安全向上委員会の調査で明らかになりました。",
            "answer": "区側は、困難を抱える家庭へ食料等を届ける仕組みについてですが、現在、フードバンク事業を行っている団体に食材等の調達できる量や提供実績の確認など情報収集を始めております。"
      },
      {
            "title": "羽田空港の新飛行ルート案",
            "question": "国土交通省は、羽田空港の機能強化を実現する方策として、東京都心上空の新飛行ルート案を示しています。",
            "answer": "区側は、沖合移転の経緯についてですが、当時、羽田沖において都による埋立計画が進められる中、昭和47年に国よりこの埋立地への空港機能の拡張計画が示されました。"
      },
      {
            "title": "国の説明・周知の手法",
            "question": "国交省主催のオープンハウス型説明会がこれまで第４フェーズまで開催されましたが、品川区内会場の来場者は延べ3,360人にとどまっており、39万人区民の１％にも満たない状況です。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "hiroo_akutsu"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "西本貴子",
      "party": "無所属",
      "topics": [
        "人口動向に伴う諸課題",
        "待機児童解消対策の影響",
        "働き方改革",
        "2020東京オリンピック・パラリンピックにおける品川区の魅力の発信",
        "評価方法",
        "女性活躍社会の実現に向けて"
      ],
      "qaSummaries": [
      {
            "title": "人口動向に伴う諸課題",
            "question": "品川区の人口は、平成30年６月１日現在では39万1,992人。",
            "answer": "区側は、品川区の人口は近年増加しており、本年４月には47年ぶりに39万人を超え、今後しばらくの間、増加傾向にあるものと推計しております。"
      },
      {
            "title": "待機児童解消対策の影響",
            "question": "区は、待機児童解消に向け、私立、認証、小規模保育園など積極的に開設していますが、需要と供給の分岐点も人口の推移によって大きく影響があると考えます。",
            "answer": "区側は、待機児童解消の中でいろいろ地域を見てということでありますが、私の質問の中には、いずれは減少に転じる時期があるだろうということを申し上げました。"
      },
      {
            "title": "働き方改革",
            "question": "区は、今年度、職員の働き方改革「しながわ～く」を推進することになっています。",
            "answer": "区側は、区職員の働き方改革の目的は、業務の効率化により生産性を向上させ、限られた財源・人員で的確に、迅速に行政課題に対応し、さらなる区民サービスの向上を図ることにあります。"
      },
      {
            "title": "2020東京オリンピック・パラリンピックにおける品川区の魅力の発信",
            "question": "東京オリンピック・パラリンピックまで２年となりました。",
            "answer": "区側は、１人でも多くの方が品川を訪れてくださるよう、ＰＲ冊子や多言語対応のスマートフォンアプリ「わ！しながわ巡り」、また品川区を舞台にしたフィルムコミッション事業等、各種広報媒体の内容をさらに充実させ、利用拡大を図るほか、バーチャルリアリティーなどの新たな技術も活用し、積極的に情報発信してまいります。"
      },
      {
            "title": "評価方法",
            "question": "分析後は改善方法の検討に入るかと思いますが、総務省研究会報告書によれば、効率的な業務運営や業績を重視する職場環境の実現が提唱されています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "女性活躍社会の実現に向けて",
            "question": "女性活躍社会の実現に向けてです。",
            "answer": "区側は、女性活躍社会についてですが、昨今、政府、自治体、企業等が女性の活躍推進に取り組んでおります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "takako_nishimoto"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "大沢真一",
      "party": "―",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "49:◯大沢真一君質問に入ります前に、大阪府北部地震で多大なる災いをこうむられた多くの方々に衷心よりお見舞いを申し上げるところでございます。それでは、通告の順に従って一般質問をさせていただきます。１、人々の暮らしを守る品川区政。つい先日、第71回カンヌ映画祭において、是枝監督作品の「万引き家族」が最。",
            "answer": "区側は、人々の暮らしを守る品川区政ということで、品川区の現状についてお話をお伺いいたしました。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-osawa-shinichi"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "吉田ゆみこ",
      "party": "ネット",
      "topics": [
        "相談支援専門員の数を増やす施策",
        "相談の質の向上の施策",
        "羽田新ルート計画",
        "羽田3.9万回増の内訳",
        "品川区における公文書のあるべき形と管理の考え方",
        "品川区の男女共同参画政策における多様な性のあり方への理解促進と支援策"
      ],
      "qaSummaries": [
      {
            "title": "相談支援専門員の数を増やす施策",
            "question": "相談支援専門員の少なさ、そしてそれらが少ないことが大きな要因であると思われる相談の質の問題です。",
            "answer": "区側は、相談支援専門員の増員についてですが、東京都が行っている相談支援専門員必修研修の受講を促すとともに、区において研修を実施することについては、現在実施している自治体の情報収集を行っているところです。"
      },
      {
            "title": "相談の質の向上の施策",
            "question": "昨年のご答弁では、「相談支援専門員の役割は、障害者サービス利用希望を聞くとともに、専門的な立場から、当事者の視点に立ち、適切にアセスメントを行い、サービス等利用計画案を作成することです」ということでした。",
            "answer": "区側は、相談の質についてなんですけれども、相談の質ってとてもいろんな要素があって、部長のご答弁だと、質問の中で申し上げましたけれども、一般相談と計画相談、それぞれ求められる資質が違うと思います。"
      },
      {
            "title": "羽田新ルート計画",
            "question": "羽田新ルート計画についての質問です。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "羽田3.9万回増の内訳",
            "question": "羽田3.9万回増の内訳についてです。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "品川区における公文書のあるべき形と管理の考え方",
            "question": "生活者ネットワークは、「政治への市民参加」をめざしており、そのためには行政情報の公開が必須と主張しています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "品川区の男女共同参画政策における多様な性のあり方への理解促進と支援策",
            "question": "法務省は人権啓発活動の中に啓発活動重点目標を定めており、啓発活動強調事項を17項目掲げています。",
            "answer": "区側は、それから地元の同意の考え方です。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yumiko_yoshida"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "飯沼雅子",
      "party": "共産",
      "topics": [
        "子どもの豊かな成長を願い「学校スタンダード」の見直しをの質問"
      ],
      "qaSummaries": [
      {
            "title": "子どもの豊かな成長を願い「学校スタンダード」の見直しをの質問",
            "question": "子どもの豊かな成長を願い「学校スタンダード」の見直しをの質問です。",
            "answer": "区側は、子どもの主体性や人権が侵されてしまうのではないかと危機感からの質問です。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-iinuma-masako"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "横山由香理",
      "party": "自民",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "85:◯横山由香理君私は、品川区議会自民党・子ども未来を代表いたしまして、既に通告してあります項目に従い質問をいたします。目黒区で発生した児童虐待死の事案を含め、虐待により命を落としたお子さん方のご冥福をお祈り申し上げます。また、大阪北部地震によりお亡くなりになられた方々のご冥福をお祈り申し上げ、全。",
            "answer": "区側は、これまで区は、品川区子ども・子育て支援事業計画に基づく各種事業、多様な保育、しながわネウボラネットワーク事業など、さまざまな子育て支援事業を着実に実施し、充実させてまいりました。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yukari_yokoyama"
    },
    {
      "meetingId": "h30-2t",
      "kind": "一般質問",
      "member": "塚本よしひろ",
      "party": "公明",
      "topics": [
        "安全・安心のまちづくり",
        "空き家の有効活用",
        "管理不全の空き家",
        "学校教育",
        "多様な支援を必要とする子どもへの対応",
        "保育園の運営",
        "行政のＩＣＴ化推進"
      ],
      "qaSummaries": [
      {
            "title": "安全・安心のまちづくり",
            "question": "質問の１点目は空き家問題についてです。",
            "answer": "区側は、空き家の有効活用についてですが、区では、空き家の所有者等からホットラインや相談会に寄せられた活用の意向を踏まえ、庁内各課や大学などとのマッチングに取り組んでまいりましたが、賃貸期間や家賃設定など双方の調整が調わず、現在実績はございません。"
      },
      {
            "title": "空き家の有効活用",
            "question": "空き家の有効活用促進に努めています。",
            "answer": "区側は、空き家の有効活用についてですが、区では、空き家の所有者等からホットラインや相談会に寄せられた活用の意向を踏まえ、庁内各課や大学などとのマッチングに取り組んでまいりましたが、賃貸期間や家賃設定など双方の調整が調わず、現在実績はございません。"
      },
      {
            "title": "管理不全の空き家",
            "question": "管理不全の空き家についてですが、今国会で、所有者不明の土地を上限10年間で公園など公益性のある目的に使用できるとする、所有者不明土地の利用の円滑化等に関する特別措置法案が成立し、平成31年６月までに施行されます。",
            "answer": "区側は、管理不全の空き家についてですが、所有者不明の建物の場合でも、不明のまま、法に定める手続に基づき、略式代執行により除却することは可能でございます。"
      },
      {
            "title": "学校教育",
            "question": "質問の１点目は、多様な児童・生徒を育む学校づくりについてです。",
            "answer": "区側は、多様な児童・生徒を育む学校づくりについてですが、知的障害学級をはじめ、通常学級に在籍する児童・生徒の発達課題への支援など、さまざまな障害への柔軟な対応が学校に求められていることは十分認識しております。"
      },
      {
            "title": "多様な支援を必要とする子どもへの対応",
            "question": "多様な支援を必要とする児童・生徒をできる限り学校で受け入れていくために、学校には一層の体制強化と努力が求められ、品川区はそれに応えていくべきと考えています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "保育園の運営",
            "question": "品川区は、子ども・子育て支援に必要とされるサービス量の見込みに沿って、子ども・子育て支援事業計画を策定し、保育園の新規開設などを進めています。",
            "answer": "区側は、保育園の間で園児の情報を共有する連絡帳の電子化を順次進めております。"
      },
      {
            "title": "行政のＩＣＴ化推進",
            "question": "政府は平成29年に、我が国全体のＩＴ戦略の新たなフェーズに向け、必要な施策を着実に実施していくことを目的とした官民データ活用推進基本計画を策定しました。",
            "answer": "区側は、福祉分野におけるＩＣＴ化ですが、区立保育園では今年度より、保護者と保育園の間で園児の情報を共有する連絡帳の電子化を順次進めております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=514#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yoshihiro_tsukamoto"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "松永よしひろ",
      "party": "無所属",
      "topics": [
        "羽田空港機能強化",
        "今後の取り組み",
        "高齢者福祉の充実",
        "高齢者の方が安心して暮らせる環境づくり",
        "住居問題",
        "公共交通手段",
        "防災対策"
      ],
      "qaSummaries": [
      {
            "title": "羽田空港機能強化",
            "question": "国土交通省から新飛行ルート計画案が公表されてから約４年が経過いたしました。",
            "answer": "区側は、計画の周知についてですが、国はこれまでも複数回にわたる説明会の開催や、町会回覧板を活用したニュースレターによる周知などを行ってまいりました。"
      },
      {
            "title": "今後の取り組み",
            "question": "この新飛行ルート計画案について、区民よりさまざまなご意見を伺っております。",
            "answer": "区側は、の取り組みは不十分であると捉えております。"
      },
      {
            "title": "高齢者福祉の充実",
            "question": "年々、全国的に高齢化が進み、本区内でも今月の年齢別人口報告表によると、65歳以上の方が８万1,699人で、そして10年後には10万人を超えると予想されております。",
            "answer": "区側は、特別養護老人ホームの入所についてですが、区では外部の専門職を委員とした特養入所調整会議において、入所申込者の介護度、年齢、要介護状態の期間、介護者の状況などを総合的に判断し、緊急度に応じて優先順位を決めています。"
      },
      {
            "title": "高齢者の方が安心して暮らせる環境づくり",
            "question": "本区では、高齢者の方が部屋を借りるとき、補助金を出すなどの取り組みを行っております。",
            "answer": "区側は、高齢者の住まいに関してですが、区では高齢者住宅の運営など各種の支援を行っております。"
      },
      {
            "title": "住居問題",
            "question": "本区では、高齢者の方が部屋を借りるとき、補助金を出すなどの取り組みを行っております。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "公共交通手段",
            "question": "本区には、鉄道駅、路線バスなどが多く、交通の便がよいと言われております。",
            "answer": "区側は、公共交通手段についてですが、区内の公共交通網は利便性の高い環境にありますが、一部地域には道路幅員などの要因によりバス停から遠い地域もあります。"
      },
      {
            "title": "防災対策",
            "question": "まず初めに、ペットとの同行避難についてです。",
            "answer": "区側は、ペットに関する避難訓練については、区民避難所における飼育場所の設定や飼い主に対する啓発を行っていますが、実際にペットを同行して避難する訓練は現時点で行われた実績はありません。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yoshihiro_matsunaga"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "つる伸一郎",
      "party": "公明",
      "topics": [
        "健康施策",
        "親子が笑顔になる子育て支援策の拡充",
        "児童虐待防止"
      ],
      "qaSummaries": [
      {
            "title": "健康施策",
            "question": "健康施策について尋ねました。",
            "answer": "区側は、子どものインフルエンザ予防接種費用の助成についてです。"
      },
      {
            "title": "親子が笑顔になる子育て支援策の拡充",
            "question": "親子が笑顔になる子育て支援策の拡充について尋ねました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "児童虐待防止",
            "question": "児童虐待防止について尋ねました。",
            "answer": "区側は、子育て支援におけるＤＶＤ「赤ちゃんが泣きやまない」の活用ですが、現在は動画サイトＹｏｕＴｕｂｅでの視聴も可能ですので、しながわパパママ応援アプリで紹介するなど、視聴の機会の確保に努めてまいります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "shinichiro_tsuru"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "鈴木ひろ子",
      "party": "共産",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "初めに、区長選挙で示された民意は羽田新ルート撤回、「安全安心が最優先」と言うなら撤回を国に求めよです。大崎のマンションに住んでいる若いママは、出産を機に、教育や保育の制度や環境などを熟慮して大崎での子育てを選択したとのこと。周りのママ友にも、同様に結婚や出産を機に品川のマンションに移ってきた人がたく。",
            "answer": "区側は、昭和43年に竣工した総合庁舎につきましては、50年が経過し、構造上の制約や使い勝手の面での工夫も厳しくなっていることが課題であると考えております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "hiroko_suzuki"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "鈴木真澄",
      "party": "―",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "65:◯鈴木真澄君私は、品川区議会自民党・こども未来を代表いたしまして、既に通告をしております項目に従い質問いたします。濱野区長、当選おめでとうございます。品川区政をさらに前へ大胆に押し進めていただくことを期待しています。質問の１点目は、品川区の区政運営についてお聞きします。品川区長期基本計画は平成。",
            "answer": "区側は、30年度は平成21年度にスタートした長期基本計画の最終年であり、その集大成に向け最大限の努力を行うとともに、32年度からスタートする新計画に向けた策定準備を行っているところであります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-suzuki-masumi"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "藤原正則",
      "party": "無所属",
      "topics": [
        "待機児童",
        "大井町再開発",
        "子どもの未来",
        "オリンピック・パラリンピック",
        "外国人の災害対策",
        "オリンピック・パラリンピックの経費"
      ],
      "qaSummaries": [
      {
            "title": "待機児童",
            "question": "今回の選挙で、どの候補も、また来年度のほかの区の区長選挙でも、ほぼ全員が積極的に拡充すると訴えることでしょう。",
            "answer": "区側は、待機児童対策、高齢者の住まいと安心への施策など、「輝く笑顔住み続けたいまちしながわ」の実現に向け、最大限努力を重ねてまいりました。"
      },
      {
            "title": "大井町再開発",
            "question": "大井町再開発について尋ねました。",
            "answer": "区側は、大井町再開発ですけれども、300人定員の大規模保育園はどうなるのでしょうかって質問したのに、その答弁もありません。"
      },
      {
            "title": "子どもの未来",
            "question": "子どもの未来について尋ねました。",
            "answer": "区側は、待機児童対策ですが、今年度の受け入れ拡大は17園1,484人で、４月の待機児童は実質的にゼロとなりました。"
      },
      {
            "title": "オリンピック・パラリンピック",
            "question": "オリンピック・パラリンピックもありますが、政策の前提として今後の経済情勢をどう捉えていらっしゃるのかについて尋ねました。",
            "answer": "区側は、子どもたちへの影響ですが、オリンピック・パラリンピックは世界最大のスポーツの祭典であり、スポーツを通して調和のとれた人間を育成し、友情、連帯感、フェアプレーの精神をもって、平和でよりよい世界の実現に貢献することを目的にしています。"
      },
      {
            "title": "外国人の災害対策",
            "question": "外国人の災害対策についてですが、関西での大雨から北海道での地震と続き、途方に暮れる外国人旅行者が多く報道されました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "オリンピック・パラリンピックの経費",
            "question": "オリンピック・パラリンピックもありますが、政策の前提として今後の経済情勢をどう捉えていらっしゃるのかについて尋ねました。",
            "answer": "区側は、子どもたちへの影響ですが、オリンピック・パラリンピックは世界最大のスポーツの祭典であり、スポーツを通して調和のとれた人間を育成し、友情、連帯感、フェアプレーの精神をもって、平和でよりよい世界の実現に貢献することを目的にしています。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=518#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "masanori_fujiwara"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "鈴木博",
      "party": "自民",
      "topics": [
        "品川区の感染症対策",
        "品川区の健康施策",
        "品川区の子育て支援施策"
      ],
      "qaSummaries": [
      {
            "title": "品川区の感染症対策",
            "question": "品川区の感染症対策について尋ねました。",
            "answer": "区側は、おたふくかぜワクチンについてですが、区では、平成19年度より１歳から３歳児を対象に接種費用の助成を開始し、区内の契約医療機関で接種を受けた場合、3,000円の助成を１回行っており、90％を超える接種率となっております。"
      },
      {
            "title": "品川区の健康施策",
            "question": "品川区の健康施策について尋ねました。",
            "answer": "区側は、まず保育の質の維持向上ですが、保育ニーズを的確に捉えたサービスを提供するとともに、老朽園舎の改築等により保育環境を整備してまいります。"
      },
      {
            "title": "品川区の子育て支援施策",
            "question": "品川区の子育て支援施策について尋ねました。",
            "answer": "区側は、まず保育の質の維持向上ですが、保育ニーズを的確に捉えたサービスを提供するとともに、老朽園舎の改築等により保育環境を整備してまいります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-suzuki-hiroshi"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "たけうち忍",
      "party": "公明",
      "topics": [
        "コミュニティバスの導入",
        "学校体育館への冷暖房設置など防災対策の強化",
        "台風やゲリラ豪雨等による浸水・高潮・土砂災害対策",
        "環境対策にも役立つ災害時の電力確保"
      ],
      "qaSummaries": [
      {
            "title": "コミュニティバスの導入",
            "question": "品川区は、22.84平方キロメートルの狭い面積に約40万人が生活をし、世論調査では９割を超える区民がこれからも住み続けたいと感じており、交通の利便性が高いことも要因の一つとなっています。",
            "answer": "区側は、地域交通検討会の検討状況についてですが、区内における地域交通を調査し、バリアフリーの観点や利便性の向上について検討が行われました。"
      },
      {
            "title": "学校体育館への冷暖房設置など防災対策の強化",
            "question": "６月の大阪府北部地震、７月の西日本の豪雨災害、８月の災害級の猛暑、９月には台風21号や24号などによる風水害、また北海道胆振東部地震など、ことしに入り自然災害が日本中に猛威を振るう中、犠牲になられた方々、被害に遭われた方々に心よりお悔やみとお見舞いを申し上げます。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "台風やゲリラ豪雨等による浸水・高潮・土砂災害対策",
            "question": "１点目は、浸水ハザードマップの早期改定と高潮ハザードマップの策定についてです。",
            "answer": "区側は、浸水ハザードマップの早期改定と高潮ハザードマップの策定についてですが、今年度、防災地図の更新に合わせ、浸水ハザードマップの更新および高潮ハザードマップの策定を行っているところです。"
      },
      {
            "title": "環境対策にも役立つ災害時の電力確保",
            "question": "先日の北海道胆振東部地震では、道内最大の火力発電所の停止が引き金となり、北海道全域にわたる約295万戸が停電し、一瞬にして電力供給がなくなる状態、いわゆるブラックアウトが起き、スマートフォンなどの通信機器の充電場所を求めて、市役所等の公共施設などに並ぶ多くの住民の姿がニュースに繰り返し映し出され、改。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-takeuchi-shinobu"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "筒井ようすけ",
      "party": "―",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "16:◯筒井ようすけ君筒井ようすけです。一般質問を行います。１つ目の質問は、羽田新飛行ルートについてです。国土交通省が訪日外国人の増加とそのための利便性向上をめざして、羽田空港国際線増便を行いたいがために、南風時の15時から19時の間１時間44回、つまり、約１分半置きに品川区低空を航空機が飛行すると。",
            "answer": "区側は、オリンピック景気の取り込み策についてですが、区はこれまで、観光情報の多言語化や、旧東海道品川宿周辺、水辺環境などの観光資源の整備に取り組んできたところであります。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "tsutsui_yosuke"
    },
    {
      "meetingId": "h30-3t",
      "kind": "一般質問",
      "member": "南恵子",
      "party": "共産",
      "topics": [
        "保育園の園庭"
      ],
      "qaSummaries": [
      {
            "title": "保育園の園庭",
            "question": "品川区は平成22年度以降、待機児解消のために55か所の私立認可保育園を増設しましたが、敷地内に園庭があるのは２園、敷地内と保育園の付近に屋上遊戯場にかわるべき場所があるのは４園、残りの49園は近くの公園を代替にしています。",
            "answer": "区側は、保育園の希望という、そういう642人の方々は皆さん一律に認可保育園に入りたいということで申し込まれているわけです。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=520#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-minami-keiko"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "本多健信",
      "party": "自民",
      "topics": [
        "防災機関との連携強化",
        "自衛隊との連携強化",
        "指定管理者における管理に対するモニタリング評価"
      ],
      "qaSummaries": [
      {
            "title": "防災機関との連携強化",
            "question": "防災機関との連携強化についてです。",
            "answer": "区側は、公衆電話ボックスの増設整備につきましては、災害時の通信手段として、電話事業者から特設公衆電話を区民避難所のみならず、区内64か所のコンビニエンスストアなどにも97台配備していただいているところであります。"
      },
      {
            "title": "自衛隊との連携強化",
            "question": "自衛隊との連携強化についてです。",
            "answer": "区側は、自衛隊との連携強化なんですが、できる範囲でお願いしたい。"
      },
      {
            "title": "指定管理者における管理に対するモニタリング評価",
            "question": "指定管理者における管理に対するモニタリング評価についてです。",
            "answer": "区側は、指定管理者制度に係るご質問についてですが、モニタリング評価は平成19年度から実施しており、現在100施設の評価を行っております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-honda-takenobu"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "あくつ広王",
      "party": "公明",
      "topics": [
        "区民交通傷害保険の導入と自転車利用の考え方",
        "環境問題への関心の高まりと具体的な対策",
        "困難を抱える家庭に直接食料品等の生活必需品を届ける仕組みつくり",
        "見える化"
      ],
      "qaSummaries": [
      {
            "title": "区民交通傷害保険の導入と自転車利用の考え方",
            "question": "区民にとって自転車は代表的な交通手段の一つであり、昨年より開始されたシェアサイクル事業も多くの区民・在勤者に活用されるとともに、千代田区や江東区など９区で相互乗り入れが可能となり、都市生活における利便性も高まっています。",
            "answer": "区側は、区民交通傷害保険についてですが、区といたしましても保険の加入促進を図る必要があると考えております。"
      },
      {
            "title": "環境問題への関心の高まりと具体的な対策",
            "question": "今夏、世界中で猛暑を記録し、日本でも連日35度を超える「災害級」とされる異常気象が各家庭を直撃しました。",
            "answer": "区側は、環境問題や使い捨てプラスチック削減に対する区民の関心が高まる中、環境教育への展開も視野に入れつつ、給食におけるプラスチックストローの取り扱いについて今後研究してまいります。"
      },
      {
            "title": "困難を抱える家庭に直接食料品等の生活必需品を届ける仕組みつくり",
            "question": "１年前の平成29年第４回定例会の一般質問において、文京区の「こども宅食」を紹介し、品川区としてひとり親世帯など困難を抱える家庭に直接食料品等の生活必需品を届ける独自の仕組みづくりの創設を求めました。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "見える化",
            "question": "品川区では、「プラマーク」、つまり循環する２本の矢印で「プラ」の字を囲んだマークのあるプラスチック製容器包装を資源ごみとして回収しています。",
            "answer": "区側は、見える化」して周知することについてですが、日ごろ排出しているプラスチック製容器包装が回収後どのように処理され、製品として生まれ変わるのかをわかりやすく伝えることは、分別に対する区民の気づきを促し、適切な分別をより一層進める行動につながるものであると認識しています。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "hiroo_akutsu"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "おくの晋治",
      "party": "共産",
      "topics": [
        "所得が低いのに保険料はいちばん高い国保料引き下げは政治の責任」"
      ],
      "qaSummaries": [
      {
            "title": "所得が低いのに保険料はいちばん高い国保料引き下げは政治の責任」",
            "question": "所得が低いのに保険料はいちばん高い国保料引き下げは政治の責任」です。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-okuno-shinji"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "木村けんご",
      "party": "無所属",
      "topics": [
        "正常な人口構成とバランスの品川区を",
        "正常な人口構成とバランスの品川区を」",
        "海外労働力活用、元気な高齢者力活用"
      ],
      "qaSummaries": [
      {
            "title": "正常な人口構成とバランスの品川区を",
            "question": "現在の我が国の少子高齢化ならびに人口減少は、今後の日本経済の成長力に伏線的な影響を与えようとしています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "正常な人口構成とバランスの品川区を」",
            "question": "現在の我が国の少子高齢化ならびに人口減少は、今後の日本経済の成長力に伏線的な影響を与えようとしています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "海外労働力活用、元気な高齢者力活用",
            "question": "最初に、「特殊詐欺から狙われる高齢者を守るには」からの質問です。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "kengo_kimura"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "須貝行宏",
      "party": "無所属",
      "topics": [
        "区長と行政委員の給与も身を切るべき"
      ],
      "qaSummaries": [
      {
            "title": "区長と行政委員の給与も身を切るべき",
            "question": "区長と行政委員の給与も身を切るべきだと主張しました。",
            "answer": "答弁の全文は会議録を参照してください。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=524#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yukihiro_sugai"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "のだて稔史",
      "party": "共産",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "〔傍聴席から拍手する者あり〕4:◯のだて稔史君日本共産党を代表して……傍聴席の方は、拍手はおやめください。6:◯のだて稔史君一般質問を行います。初めに、ゆったり買い物ができ会話が弾む商店街を壊す、29号線と23階建ての戸越公園駅前19番地再開発は止めよです。特定整備路線補助29号線は、幅20メーター。",
            "answer": "区側は、消費税は、国全体の少子高齢化が進む中で、これからの社会保障を維持するために必要な財源であると考えております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "toshifumi_nodate"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "渡辺裕一",
      "party": "自民",
      "topics": [
        "スポーツ大使制度"
      ],
      "qaSummaries": [
      {
            "title": "スポーツ大使制度",
            "question": "スポーツ大使制度について、現在、しながわ2020スポーツ大使として、義足のプロダンサー大前光市さん、元競泳選手・オリンピアンの伊藤華英さん、ブラインドサッカー日本代表エースの川村怜さんが活躍いただいていて、すばらしい啓発活動制度だと思います。",
            "answer": "区側は、スポーツ大使の拡充についてですが、区では、東京2020大会の機運醸成を目的に、アスリートとアーティストの３人のスポーツ大使を任命し、各種イベントに出演するなど活躍していただいています。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "yuichi_watanabe"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "浅野ひろゆき",
      "party": "公明",
      "topics": [
        "高校生等の医療費助成",
        "各種がん検診の充実",
        "防災及び災害時情報の発信と収集"
      ],
      "qaSummaries": [
      {
            "title": "高校生等の医療費助成",
            "question": "区は、これまで子育て支援の一環として、子どもの医療費に対する助成事業を展開し、家庭における子どもの成長発達、健康について安心して医療機関に受診できる環境と家計の経済的負担の軽減に努めてこられたことを評価いたします。",
            "answer": "区側は、高校生等への医療費助成の拡大につきましては、既に高校生への助成を行っている自治体の実績や財政負担などを踏まえ、検討してまいります。"
      },
      {
            "title": "各種がん検診の充実",
            "question": "日本では、がんに罹患する人が年々増加傾向にあり、がん対策は大きな課題の１つとなっています。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "防災及び災害時情報の発信と収集",
            "question": "私は、平成19年第４回定例会、議会最初の一般質問で、情報の提供方法は、プル型情報提供とプッシュ型情報提供に大別されることを紹介し、区民サービスの向上とともに、そのサービスを効率的、効果的に区民にお知らせする情報提供の充実に取り組んでまいりました。",
            "answer": "区側は、区ホームページの防災情報の内容や構成についてですが、さまざまな防災対策について、項目ごとの整理に努めてまいりましたが、情報量の増加に伴い検索しにくい面が出てきている点は認識しております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-asano-hiroyuki"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "大倉たかひろ",
      "party": "無所属",
      "topics": [
        "防災対策",
        "ネット依存症やネット犯罪から子どもを守る取り組み",
        "食品ロス",
        "公文書管理"
      ],
      "qaSummaries": [
      {
            "title": "防災対策",
            "question": "ことし９月、区民委員会の行政視察において、北海道胆振東部地震に遭遇し、私自身被災するという経験をいたしました。",
            "answer": "区側は、区役所・地域センターにおける避難者への対応についてですが、発災時に被災者が来訪することは想定しておりますが、本来、区役所、地域センターは区の災害対策の拠点であり、避難所ではないことから、原則として帰宅困難者以外の来訪者は区民避難所への避難等を促すこととなります。"
      },
      {
            "title": "ネット依存症やネット犯罪から子どもを守る取り組み",
            "question": "インターネットは、仕事やプライベートなど、生活のあらゆる面でなくてはならない生活インフラとなっています。",
            "answer": "区側は、ネット依存症についてですが、学校が報告を受けた場合は、カウンセラーが支援するほか、必要に応じて医療や相談機関等につなげてまいります。"
      },
      {
            "title": "食品ロス",
            "question": "現在、食品ロスは国にとっても大きな問題となっております。",
            "answer": "区側は、もったいないプロジェクトと区民の意識についてですが、区では、日本から発信され世界共通語となっている「もったいない」の精神で「食品ロス」をテーマに、平成27年度よりさまざまな取り組みを展開しているところでございます。"
      },
      {
            "title": "公文書管理",
            "question": "ことし、国では行政文書の管理が問われる問題が相次いでおり、ニュースでも多くの報道がなされました。",
            "answer": "区側は、公文書の重要性についてですが、区行政のさまざまな活動や記録のもととなる公文書は、区および区民の共通財産として、また区民に対する説明責任を果たすためにも重要なものであると考えております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "takahiro_okura"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "伊藤昌宏",
      "party": "自民",
      "topics": [
        "品川区の児童虐待対策等",
        "防災対策",
        "緊急時道路障害物撤去",
        "災害時のドローン活用",
        "品川区行政のＩＣＴ化",
        "品川区のＩＣＴ化推進と計画",
        "品川区の職員体制等"
      ],
      "qaSummaries": [
      {
            "title": "品川区の児童虐待対策等",
            "question": "品川区の児童虐待対策等について尋ねました。",
            "answer": "区側は、品川区の元職員の持つさまざまな能力を生かしてこういう事例がないようにすることだと思っておりますが、今後こういった事例を繰り返さないためにも、一定、品川区の対応が必要と考えますが、いかがでしょうか。"
      },
      {
            "title": "防災対策",
            "question": "品川区の人口は外国人を含めて39万人を超えました。",
            "answer": "区側は、広域避難場所についてですが、品川区役所一帯につきましては、東京都が、条例に基づき、震災時に拡大する火災から区民を安全に保護するために、オープンスペースを所有者の了解のもと広域避難場所として指定しております。"
      },
      {
            "title": "緊急時道路障害物撤去",
            "question": "品川区役所への主要なアクセス道路の26号線、いわゆる区役所通り、ここは通常時でも渋滞が発生をし、雨天等の場合はさらに混雑をします。",
            "answer": "答弁の全文は会議録を参照してください。"
      },
      {
            "title": "災害時のドローン活用",
            "question": "我が自民党からも決算特別委員会で指摘いたしましたが、自衛隊は震度４以上の地震が発生した際には、近隣の基地から自衛隊機を飛ばして、超初期の被害状況等をリアルタイムに首相官邸や近隣自治体等に転送し、復旧に役立てていると聞きます。",
            "answer": "区側は、災害時のドローンの活用につきましては、協定締結に向け調整をしている民間事業者の機材や操作員によることを想定しており、情報収集や避難誘導、物資輸送における活用を考えています。"
      },
      {
            "title": "品川区行政のＩＣＴ化",
            "question": "我々が子どものころ「サンダーバード」に描かれ憧れた携帯電話は今や当たり前の状況となり、車の一部自動運転、自動駐車等が現実となり、ＩＣＴはますます社会の全分野にわたって浸透しつつあります。",
            "answer": "区側は、区のＩＣＴ化推進と計画についてですが、区では、ＩＣＴ戦略としての単体の計画は定めておらず、現長期基本計画の基本政策として、電子区役所の推進を掲げ、ＩＣＴ化の推進と行政サービスの充実を進めております。"
      },
      {
            "title": "品川区のＩＣＴ化推進と計画",
            "question": "品川区のＩＣＴ化推進と計画についてお聞かせをください。",
            "answer": "区側は、品川区の元職員の持つさまざまな能力を生かしてこういう事例がないようにすることだと思っておりますが、今後こういった事例を繰り返さないためにも、一定、品川区の対応が必要と考えますが、いかがでしょうか。"
      },
      {
            "title": "品川区の職員体制等",
            "question": "平成30年10月10日、特別区人事委員会から23区の職員給与に対する勧告がありました。",
            "answer": "区側は、品川区の元職員の持つさまざまな能力を生かしてこういう事例がないようにすることだと思っておりますが、今後こういった事例を繰り返さないためにも、一定、品川区の対応が必要と考えますが、いかがでしょうか。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-ito-masahiro"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "田中さやか",
      "party": "ネット",
      "topics": [
        "子どもの権利に基づく性教育の充実",
        "思いがけない妊娠"
      ],
      "qaSummaries": [
      {
            "title": "子どもの権利に基づく性教育の充実",
            "question": "日本社会にあふれる性描写には、子どもや女性の権利や尊厳の侵害につながる間違った性の情報が蔓延しています。",
            "answer": "区側は、子どもの誕生により新しい生活が始まったことなどから、産後鬱が発生しやすい時期に当たると認識しています。"
      },
      {
            "title": "思いがけない妊娠",
            "question": "品川区では、子ども育成課や保健センターの窓口、妊娠届を提出したときに手渡される母と子の保健バッグにおいて「妊娠相談窓口」の周知を図っていますが、思いがけない妊娠で悩んでいる当事者には情報が届かない仕組みとなっています。",
            "answer": "区側は、思いがけない妊娠により、誰にも相談できない状況は、必要な妊婦健診等が未受診のまま妊娠後期に至ったり、そのまま１人で出産を迎えてしまうなど、母子ともに危険な状況に陥る可能性が高くなるものと認識しています。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "x-tanaka-sayaka"
    },
    {
      "meetingId": "h30-4t",
      "kind": "一般質問",
      "member": "高橋しんじ",
      "party": "―",
      "topics": [
        "（発言項目は会議録参照）"
      ],
      "qaSummaries": [
      {
            "title": "質問の概要",
            "question": "１、教育施策について、学力について伺います。学力定着度調査は、２年～９年生で実施し、結果を各学校で分析し、明らかになった課題と学力向上に向けた取り組みをホームページで公表しています。とてもよい仕組みです。同時に、総合質問紙調査のi-check（アイチェック）も実施し、自己肯定感、学級適応感、社会性な。",
            "answer": "区側は、八潮地区についてですが、入居から約35年が経過し、地区内の年齢層の変化や、住宅施設の改修、生活支援機能の導入など、八潮地区の将来のあり方について検討する必要があると考えております。"
      }
],
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=526#one"
        },
        {
          "type": "minutes",
          "label": "発言者名で探す",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
        }
      ],
      "memberId": "shinji_takahashi"
    }
  ],
  "minutes": {
    "lead": "会議録は、本会議や委員会で「誰が何を発言したか」をすべて文字に起こした記録です。",
    "notice": "平成30年の正式な会議録は、会議録検索システムで読めます（平成13年5月以降を収録）。",
    "searchLinks": [
      {
        "type": "minutes",
        "label": "ことばで会議録を探す",
        "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-phrase"
      },
      {
        "type": "minutes",
        "label": "発言者（議員名）で探す",
        "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-speaker"
      },
      {
        "type": "minutes",
        "label": "会議名で探す",
        "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=search-document"
      }
    ],
    "officialTitle": "平成30年の会議録（会議録検索システム）",
    "officialLead": "リンク先の一覧から、開催日ごとの会議録本文が読めます。",
    "officialLists": [
      {
        "category": "本会議",
        "title": "平成30年の本会議（2018年1月〜12月）",
        "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?QueryType=new&Template=list&Cabinet=1&TermStart=2018-01-01&TermEnd=2018-12-31"
      }
    ],
    "draftGroups": [],
    "asOfNote": "会議録からの機械抽出によるパイロット実装です。委員会の会議録は検索システムから確認できます。"
  }
};
