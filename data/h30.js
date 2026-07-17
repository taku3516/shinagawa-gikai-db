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
          "label": "議決を確認した議案（第1号〜第42号）"
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
        "title": "第1回定例会の主な議案",
        "lead": "会議録の委員長報告・表決記録から抽出した議案の抜粋です（結果は委員長報告および本会議表決の記録に基づく）。全議案は会議録本文で確認できます。"
      },
      "petitionsSection": {
        "title": "第1回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第1回定例会の代表質問・一般質問",
        "lead": "会議録から抽出した質問者の一覧です。会派・テーマは会議録中の発言から判明した分のみ掲載しています。全文は各日の会議録で読めます。"
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
          "label": "議決を確認した議案（第44号〜第72号）"
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
        "title": "第2回定例会の主な議案",
        "lead": "会議録の委員長報告・表決記録から抽出した議案の抜粋です（結果は委員長報告および本会議表決の記録に基づく）。全議案は会議録本文で確認できます。"
      },
      "petitionsSection": {
        "title": "第2回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第2回定例会の代表質問・一般質問",
        "lead": "会議録から抽出した質問者の一覧です。会派・テーマは会議録中の発言から判明した分のみ掲載しています。全文は各日の会議録で読めます。"
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
          "label": "議決を確認した議案（第74号〜第81号）"
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
        "title": "第3回定例会の主な議案",
        "lead": "会議録の委員長報告・表決記録から抽出した議案の抜粋です（結果は委員長報告および本会議表決の記録に基づく）。全議案は会議録本文で確認できます。"
      },
      "petitionsSection": {
        "title": "第3回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第3回定例会の代表質問・一般質問",
        "lead": "会議録から抽出した質問者の一覧です。会派・テーマは会議録中の発言から判明した分のみ掲載しています。全文は各日の会議録で読めます。"
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
          "label": "議決を確認した議案（第83号〜第98号）"
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
        "title": "第4回定例会の主な議案",
        "lead": "会議録の委員長報告・表決記録から抽出した議案の抜粋です（結果は委員長報告および本会議表決の記録に基づく）。全議案は会議録本文で確認できます。"
      },
      "petitionsSection": {
        "title": "第4回定例会の請願・陳情",
        "lead": "公式の「請願・陳情の審議状況」ページから、本会議採決日をもとに整理しています。"
      },
      "questionsSection": {
        "title": "第4回定例会の代表質問・一般質問",
        "lead": "会議録から抽出した質問者の一覧です。会派・テーマは会議録中の発言から判明した分のみ掲載しています。全文は各日の会議録で読めます。"
      }
    }
  ],
  "bills": [
    {
      "meetingId": "h30-1t",
      "number": "第1号",
      "proposer": "区長提出",
      "title": "第1号 平成29年度品川区一般会計補正予算",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第5号",
      "proposer": "区長提出",
      "title": "第5号 平成30年度品川区一般会計予算",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第13号",
      "proposer": "区長提出",
      "title": "第13号 公益的法人等への職員の派遣等に関する条例",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "行政運営"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第24号",
      "proposer": "区長提出",
      "title": "第24号 品川区指定居宅介護支援等の事業の人員および運営の基準等に関する条例",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第27号",
      "proposer": "区長提出",
      "title": "第27号 障害者の日常生活及び社会生活を総合的に支援するための法律及び児童福祉法の一部を改正する法律の施行に伴う関係条例の整備に関する条例",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-1t",
      "number": "第29号",
      "proposer": "区長提出",
      "title": "第29号 品川区住宅宿泊事業の適正な運営の確保に関する条例",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "まちづくり"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=510#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第44号",
      "proposer": "区長提出",
      "title": "第44号 平成30年度品川区一般会計補正予算のうち、歳出に係る厚生委員会所管分",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-2t",
      "number": "第61号",
      "proposer": "区長提出",
      "title": "第61号 芳水小学校第２期校舎改築その他工事請負契約",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "子育て・教育"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=516#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "第74号",
      "proposer": "区長提出",
      "title": "第74号 平成30年度品川区一般会計補正予算のうち、歳出に係る文教委員会所管分",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "財政"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-3t",
      "number": "議員提出 第4号",
      "proposer": "議員提出",
      "title": "議員提出 第4号 固定資産税・都市計画税の軽減措置の継続を求める意見書",
      "summary": "会議録に基づく掲載です。",
      "tags": [
        "意見書・決議"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=522#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第83号",
      "proposer": "区長提出",
      "title": "第83号 品川区立障害児者総合支援施設条例",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "福祉"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
          "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/100000?Template=document&Id=528#one"
        }
      ]
    },
    {
      "meetingId": "h30-4t",
      "number": "第98号",
      "proposer": "区長提出",
      "title": "第98号 訴訟上の和解",
      "summary": "会議録の委員長報告に基づく掲載です。内容の詳細は会議録本文を参照してください。",
      "tags": [
        "公共施設"
      ],
      "result": "原案可決",
      "links": [
        {
          "type": "minutes",
          "label": "この日の会議録を読む",
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
        "「みんなで築く健康・福祉都市」",
        "民生委員さんの活動",
        "「次代につなぐ環境都市」",
        "品川区立学校教育要領",
        "区固有教員"
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
        "（テーマは会議録参照）"
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
        "防災協定"
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
        "（テーマは会議録参照）"
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
        "（テーマは会議録参照）"
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
        "（テーマは会議録参照）"
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
        "羽田空港の新飛行ルート案"
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
        "働き方改革"
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
        "（テーマは会議録参照）"
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
        "品川区における公文書のあるべき形と管理の考え方"
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
        "（テーマは会議録参照）"
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
        "（テーマは会議録参照）"
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
        "学校教育",
        "多様な支援を必要とする子どもへの対応",
        "保育園の運営",
        "行政のＩＣＴ化推進"
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
        "（テーマは会議録参照）"
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
        "（テーマは会議録参照）"
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
        "外国人の災害対策"
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
        "（テーマは会議録参照）"
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
        "「想定外」に備えるための複合的な防災対策"
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
        "（テーマは会議録参照）"
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
        "「正常な人口構成とバランスの品川区を」"
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
        "（テーマは会議録参照）"
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
        "（テーマは会議録参照）"
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
        "子どもの権利に基づく性教育の充実"
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
        "（テーマは会議録参照）"
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
