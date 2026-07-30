// 品川区議会DB データファイル（品川区選出・品川区に関係する政治家名簿）
// 都議名簿は、東京都議会公式サイトと選挙アーカイブ（data/elections.js／品川区選挙区）を基に作成。
// 同一人物の区議・区長は people.js／former-members.js と同じ id を共有し、
// 会議録・選挙アーカイブの横断照合（名寄せ）が効くようにしている。
// 表記揺れ（かな↔漢字・改姓）がある人物は aliases に別表記を持たせ、senkyo.html が名寄せに使う。
// members の想定項目: id, name, kana, party, statusLabel, office,
// electoralDistrict, term, serviceHistory, profileUrl, websiteUrl, email,
// career, aliases, sns, fundReports, activityExpenses, sources
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.politiciansData = {
  "updatedAt": "2026-07-25",
  "note": "区議以外の政治家名簿。現職都議は東京都議会公式サイトからの転記、元職都議は都議選アーカイブ（品川区選挙区・1997年〜）の当選者を基に作成しています。元職の在職期間は選挙結果からの推定を含みます。",
  "rosters": {
    "current-tokyo": {
      "members": [
        {
          "id": "t-shinohara-rika",
          "name": "しのはら りか",
          "kana": "しのはら りか",
          "party": "無所属（東京・品川からやさしい未来を）",
          "statusLabel": "現職都議",
          "electoralDistrict": "品川区選挙区",
          "elections": "2回",
          "term": "令和6年7月9日〜（都議2期）",
          "serviceHistory": "令和6年7月〜（東京都議会議員）",
          "standingCommittee": "環境・建設委員会",
          "address": "品川区平塚1-1-4 シンシア品川戸越204",
          "tel": "080-4784-4974",
          "profileUrl": "https://www.gikai.metro.tokyo.lg.jp/membership/num020.html",
          "websiteUrl": "https://rika-shinohara.com/",
          "career": "令和6年7月の東京都議会議員補欠選挙で初当選。令和7年に再選。",
          "sns": [],
          "fundReports": [],
          "activityExpenses": [],
          "electionHistory": [
            "2025 東京都議会議員選挙：当選（40,465票・25.0%）",
            "2024 東京都議会議員補欠選挙：当選（60,094票・32.5%）"
          ],
          "aliases": [
            "篠原里佳"
          ]
        },
        {
          "id": "t-ito-koichi",
          "name": "伊藤 こういち",
          "kana": "いとう こういち",
          "party": "都議会公明党",
          "statusLabel": "現職都議",
          "electoralDistrict": "品川区選挙区",
          "elections": "6回",
          "term": "平成17年7月23日〜（都議6期）",
          "serviceHistory": "平成17年7月〜（東京都議会議員）",
          "standingCommittee": "警察・消防委員会",
          "address": "品川区西大井5-17-6 ダイヤマンション801",
          "tel": "03-3776-6784",
          "profileUrl": "https://www.gikai.metro.tokyo.lg.jp/membership/num021.html",
          "websiteUrl": "https://www.koichi-ito.net/",
          "aliases": [
            "伊藤興一"
          ],
          "career": "平成17年から連続当選。選挙公報等では「伊藤 興一」表記の年もある。",
          "sns": [],
          "fundReports": [
            {
              "label": "公明党品川総支部（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-koumei_20"
            },
            {
              "label": "伊藤興一後援会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-shikin-i_52"
            }
          ],
          "activityExpenses": [],
          "electionHistory": [
            "2025 東京都議会議員選挙：当選（19,351票・12.0%）",
            "2021 東京都議会議員選挙：当選（23,188票・16.4%）",
            "2017 東京都議会議員選挙：当選（26,184票・16.0%）",
            "2013 東京都議会議員選挙：当選（21,016票）",
            "2009 東京都議会議員選挙：当選（25,322票）",
            "2005 東京都議会議員選挙：当選（27,729票）"
          ]
        },
        {
          "id": "x-serizawa-yujiro",
          "name": "せりざわ 裕次郎",
          "kana": "せりざわ ゆうじろう",
          "party": "東京都議会自由民主党",
          "statusLabel": "現職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "elections": "1回",
          "term": "令和7年7月23日〜（都議1期）",
          "serviceHistory": "令和7年7月〜（東京都議会議員）",
          "standingCommittee": "厚生委員会",
          "address": "品川区二葉1-7-18",
          "tel": "03-6426-2157",
          "profileUrl": "https://www.gikai.metro.tokyo.lg.jp/membership/num022.html",
          "websiteUrl": "https://www.yujiro-s.com/",
          "career": "品川区議会議員（令和元年〜令和6年、1期）を経て、令和7年に東京都議会議員へ初当選。",
          "sns": [],
          "fundReports": [
            {
              "label": "せりざわ裕次郎を育てる会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-se_063"
            }
          ],
          "activityExpenses": [],
          "electionHistory": [
            "2025 東京都議会議員選挙：当選（19,125票・11.8%）",
            "2024 東京都議会議員補欠選挙：落選（57,641票・31.2%）",
            "2023 品川区議会議員選挙：当選（1,886票・1.4%）",
            "2019 品川区議会議員選挙：当選（2,896票・2.3%）",
            "2018 品川区議会議員補欠選挙：当選（34,377票・34.5%）",
            "2015 品川区議会議員選挙：落選（770票・0.6%）"
          ]
        },
        {
          "id": "x-higashi-yuki",
          "name": "ひがし ゆき",
          "kana": "ひがし ゆき",
          "party": "立憲民主党・ミライ会議・生活者ネットワーク・無所属の会",
          "statusLabel": "現職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "elections": "1回",
          "term": "令和7年7月23日〜（都議1期）",
          "serviceHistory": "令和7年7月〜（東京都議会議員）",
          "standingCommittee": "厚生委員会",
          "address": "品川区東中延2-4-15-401",
          "tel": "070-9070-0625",
          "fax": "03-6735-3357",
          "profileUrl": "https://www.gikai.metro.tokyo.lg.jp/membership/num023.html",
          "websiteUrl": "https://higashiyukishinaga.wixsite.com/higashi-official",
          "career": "品川区議会議員（令和6年〜令和7年）を経て、令和7年に東京都議会議員へ初当選。",
          "sns": [],
          "fundReports": [],
          "activityExpenses": [],
          "electionHistory": [
            "2025 東京都議会議員選挙：当選（18,418票・11.4%）",
            "2023 品川区議会議員選挙：当選（4,676票・3.5%）"
          ]
        }
      ]
    },
    "former-tokyo": {
      "members": [
        {
          "id": "t-morisawa-kyoko",
          "name": "森沢 きょうこ",
          "kana": "もりさわ きょうこ",
          "party": "無所属（前 都民ファーストの会）",
          "statusLabel": "元職都議（現・品川区長）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成29年〜令和4年（都議2期）",
          "aliases": [
            "森沢恭子"
          ],
          "career": "東京都議会議員（平成29年〜令和4年）を経て、令和4年から品川区長。選挙により「森沢 恭子」表記の年もある。",
          "electionHistory": [
            "2022 品川区長再選挙：当選（40,695票・38.6%）",
            "2022 品川区長選挙：落選（27,759票・24.5%）",
            "2021 東京都議会議員選挙：当選（22,413票・15.8%）",
            "2017 東京都議会議員選挙：当選（32,261票・19.8%）"
          ],
          "elections": "2回"
        },
        {
          "id": "x-abe-yumiko",
          "name": "あべ 祐美子",
          "party": "立憲民主党",
          "statusLabel": "元職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "令和3年〜令和7年（都議1期）",
          "career": "品川区議会議員（平成18年〜令和2年）を経て、令和3年に東京都議会議員へ当選（1期）。",
          "electionHistory": [
            "2026 衆議院議員総選挙：落選（53,584票・24.5%）",
            "2024 衆議院議員総選挙：比例復活（54,178票・26.8%）",
            "2021 東京都議会議員選挙：当選（20,087票・14.2%）",
            "2019 品川区議会議員選挙：当選（6,069票・4.8%）",
            "2017 東京都議会議員選挙：落選（17,612票・10.8%）",
            "2015 品川区議会議員選挙：当選（3,039票・2.6%）",
            "2011 品川区議会議員選挙：当選（2,673票）",
            "2007 品川区議会議員選挙：当選（5,397票）",
            "2006 品川区議会議員補欠選挙：当選（13,985票）"
          ],
          "elections": "1回",
          "fundReports": [
            {
              "label": "立憲民主党東京都第３区総支部（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-rikken_05"
            },
            {
              "label": "あべ祐美子後援会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-shikin-a_41"
            }
          ]
        },
        {
          "id": "t-shiraishi-tamio",
          "name": "白石 たみお",
          "kana": "しらいし たみお",
          "party": "日本共産党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成25年〜令和7年（都議3期）",
          "aliases": [
            "白石民男"
          ],
          "career": "平成25年から3期連続当選。選挙により「白石 民男」表記の年もある。",
          "electionHistory": [
            "2025 東京都議会議員選挙：落選（14,478票・8.9%）",
            "2021 東京都議会議員選挙：当選（20,552票・14.5%）",
            "2017 東京都議会議員選挙：当選（23,176票・14.2%）",
            "2013 東京都議会議員選挙：当選（15,338票）"
          ],
          "elections": "3回"
        },
        {
          "id": "x-yamauchi-akira",
          "name": "山内 晃",
          "party": "都民ファーストの会（前 自由民主党）",
          "statusLabel": "元職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成25年〜令和3年（都議2期）",
          "career": "品川区議会議員（平成19年〜平成24年）を経て、東京都議会議員（平成25年〜令和3年、2期）。",
          "electionHistory": [
            "2017 東京都議会議員選挙：当選（28,591票・17.5%）",
            "2013 東京都議会議員選挙：当選（22,862票）",
            "2011 品川区議会議員選挙：当選（2,248票）",
            "2007 品川区議会議員選挙：当選（2,813票）",
            "2006 品川区議会議員補欠選挙：当選（12,799票）"
          ],
          "elections": "2回"
        },
        {
          "id": "takeshi_tanaka",
          "name": "田中 たけし",
          "party": "自由民主党",
          "statusLabel": "元職都議（現・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成17年〜平成29年（都議3期）",
          "career": "品川区議会議員（平成11年〜平成16年）を経て、東京都議会議員（平成17年〜平成29年、3期）。令和5年に品川区議会議員へ復帰。都議時代は「田中 豪」名義。",
          "electionHistory": [
            "2023 品川区議会議員選挙：当選（3,040.661票・2.3%）",
            "2021 東京都議会議員選挙：落選（18,281票・12.9%）",
            "2017 東京都議会議員選挙：落選（19,546票・12.0%）",
            "2013 東京都議会議員選挙：当選（25,140票）",
            "2009 東京都議会議員選挙：当選（22,853票）",
            "2005 東京都議会議員選挙：当選（21,075票）",
            "2003 品川区議会議員選挙：当選（5,383票）",
            "1999 品川区議会議員選挙：当選（3,666票）"
          ],
          "elections": "3回",
          "fundReports": [
            {
              "label": "田中たけし後援会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-shikin-ta_54"
            },
            {
              "label": "都区政策研究会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-to_227"
            }
          ],
          "kana": "たなか たけし",
          "aliases": [
            "田中豪"
          ]
        },
        {
          "id": "t-kamino-yoshihiro",
          "name": "神野 吉弘",
          "kana": "かみの よしひろ",
          "party": "民主党（当時）",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成21年〜平成25年（都議1期）",
          "electionHistory": [
            "2013 東京都議会議員選挙：落選（12,951票）",
            "2009 東京都議会議員選挙：当選（42,221票）",
            "2005 東京都議会議員選挙：落選（17,467票）",
            "2003 品川区長選挙：落選（4,830票）"
          ],
          "elections": "1回"
        },
        {
          "id": "t-baba-yuko",
          "name": "馬場 裕子",
          "kana": "ばば ゆうこ",
          "party": "民主党（当時）",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成25年（都議4期）",
          "electionHistory": [
            "2013 東京都議会議員選挙：落選（12,478票）",
            "2009 東京都議会議員選挙：当選（28,073票）",
            "2005 東京都議会議員選挙：当選（20,542票）",
            "2001 東京都議会議員選挙：当選（17,771票）",
            "1997 東京都議会議員選挙：当選（12,278票）"
          ],
          "elections": "4回"
        },
        {
          "id": "t-sato-hirohiko",
          "name": "佐藤 裕彦",
          "kana": "さとう ひろひこ",
          "party": "自由民主党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成21年（都議3期）",
          "electionHistory": [
            "2018 品川区長選挙：落選（37,607票・36.2%）",
            "2005 東京都議会議員選挙：当選（20,120票）",
            "2001 東京都議会議員選挙：当選（41,319票）",
            "1997 東京都議会議員選挙：当選（14,794票）"
          ],
          "elections": "3回"
        },
        {
          "id": "t-nakayama-hideo",
          "name": "中山 ひでお",
          "kana": "なかやま ひでお",
          "party": "公明党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成17年（都議2期）",
          "electionHistory": [
            "2001 東京都議会議員選挙：当選（24,312票）",
            "1997 東京都議会議員選挙：当選（24,192票）"
          ],
          "elections": "2回"
        },
        {
          "id": "t-akita-kakuo",
          "name": "秋田 かくお",
          "kana": "あきた かくお",
          "party": "日本共産党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成17年（都議2期）",
          "electionHistory": [
            "2001 東京都議会議員選挙：当選（19,725票）",
            "1997 東京都議会議員選挙：当選（22,466票）"
          ],
          "elections": "2回"
        },
        {
          "id": "t-naito-sho",
          "name": "内藤 しょう",
          "kana": "ないとう しょう",
          "party": "自由民主党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成13年（都議1期）",
          "electionHistory": [
            "1997 東京都議会議員選挙：当選（16,479票）"
          ],
          "elections": "1回"
        }
      ]
    },
    "current-house": {
      "members": [
        {
          "id": "h-ishihara-hirotaka",
          "name": "石原 宏高",
          "kana": "いしはら ひろたか",
          "party": "自由民主党",
          "statusLabel": "現職衆議",
          "electoralDistrict": "東京都第3区（品川区・伊豆諸島・小笠原諸島）",
          "serviceHistory": "平成17年 初当選（東京都第3区）",
          "aliases": [
            "石原ひろたか"
          ],
          "websiteUrl": "https://www.ishihara-hirotaka.com/",
          "career": "平成17年に東京都第3区で初当選。内閣総理大臣補佐官などを歴任。令和6年・令和8年の総選挙で当選し現職。",
          "electionHistory": [
            "2026 衆議院議員総選挙：当選（93,158.548票・42.6%）",
            "2024 衆議院議員総選挙：当選（61,660.983票・30.5%）"
          ],
          "elections": "2回",
          "fundReports": [
            {
              "label": "自由民主党東京都第三選挙区支部（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06kai_015"
            },
            {
              "label": "自由民主党品川総支部（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-jimin_188"
            },
            {
              "label": "石原ひろたかの会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-shikin-i_38"
            }
          ]
        }
      ]
    },
    "former-house": {
      "members": [
        {
          "id": "x-abe-yumiko",
          "name": "あべ 祐美子",
          "party": "中道改革連合（前 立憲民主党）",
          "statusLabel": "元職衆議（元区議・元都議）",
          "electoralDistrict": "東京都第3区（品川区）",
          "serviceHistory": "令和6年〜令和8年（衆議1期・比例東京）",
          "career": "品川区議会議員（平成18年〜令和2年）・東京都議会議員（令和3年〜令和7年）を経て、令和6年の総選挙で衆議院議員に当選（東京都第3区で立候補し比例東京ブロックで復活当選）。令和8年の総選挙で落選。",
          "electionHistory": [
            "2026 衆議院議員総選挙：落選（53,584票・24.5%）",
            "2024 衆議院議員総選挙：比例復活（54,178票・26.8%）",
            "2021 東京都議会議員選挙：当選（20,087票・14.2%）",
            "2019 品川区議会議員選挙：当選（6,069票・4.8%）",
            "2017 東京都議会議員選挙：落選（17,612票・10.8%）",
            "2015 品川区議会議員選挙：当選（3,039票・2.6%）",
            "2011 品川区議会議員選挙：当選（2,673票）",
            "2007 品川区議会議員選挙：当選（5,397票）",
            "2006 品川区議会議員補欠選挙：当選（13,985票）"
          ],
          "elections": "1回",
          "fundReports": [
            {
              "label": "立憲民主党東京都第３区総支部（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-rikken_05"
            },
            {
              "label": "あべ祐美子後援会（2024年分）",
              "url": "https://www.senkyo.metro.tokyo.lg.jp/documents/d/senkyo/06teiki-shikin-a_41"
            }
          ]
        },
        {
          "id": "h-matsubara-hitoshi",
          "name": "松原 仁",
          "kana": "まつばら ひとし",
          "party": "立憲民主党（元 民主党）",
          "statusLabel": "元職衆議",
          "electoralDistrict": "東京都第3区（品川区）",
          "serviceHistory": "平成12年・平成15年・平成21年・令和3年ほか当選（東京都第3区・比例東京）",
          "career": "東京都議会議員（大田区選挙区・平成元年〜平成8年、2期）を経て衆議院議員。東京都第3区（品川区）で複数期当選。国家公安委員長・拉致問題担当大臣などを歴任。"
        },
        {
          "id": "h-kurimoto-shinichiro",
          "name": "栗本 慎一郎",
          "kana": "くりもと しんいちろう",
          "party": "自由民主党（当時）",
          "statusLabel": "元職衆議",
          "electoralDistrict": "東京都第3区（品川区）",
          "serviceHistory": "平成8年 当選（東京都第3区、1期）",
          "career": "経済人類学者・大学教授を経て、平成8年の総選挙で東京都第3区から衆議院議員に当選（1期）。"
        }
      ]
    },
    "current-mayor": {
      "members": [
        {
          "id": "t-morisawa-kyoko",
          "name": "森沢 きょうこ",
          "kana": "もりさわ きょうこ",
          "party": "無所属",
          "statusLabel": "現職区長（元都議）",
          "office": "品川区長",
          "birth": "昭和53年11月16日",
          "term": "令和4年12月4日〜（区長1期）",
          "serviceHistory": "令和4年12月〜（品川区長）",
          "aliases": [
            "森沢恭子",
            "森澤恭子"
          ],
          "profileUrl": "https://www.city.shinagawa.tokyo.jp/PC/kucho/index.html",
          "websiteUrl": "https://kyokomorisawa.jp/",
          "career": "日本テレビ記者、森ビル勤務を経て、平成29年に東京都議会議員に当選（2期）。令和4年12月の品川区長選挙（再選挙）で当選し、品川区長に就任。選挙により「森沢 恭子」表記もある。",
          "electionHistory": [
            "2022 品川区長再選挙：当選（40,695票・38.6%）",
            "2022 品川区長選挙：落選（27,759票・24.5%）",
            "2021 東京都議会議員選挙：当選（22,413票・15.8%）",
            "2017 東京都議会議員選挙：当選（32,261票・19.8%）"
          ],
          "elections": "1回"
        }
      ]
    },
    "former-mayor": {
      "members": [
        {
          "id": "m-hamano-ken",
          "name": "濱野 健",
          "kana": "はまの けん",
          "party": "無所属",
          "statusLabel": "元職区長",
          "office": "品川区長",
          "serviceHistory": "平成18年〜令和4年（区長4期）",
          "aliases": [
            "浜野健",
            "はまの健"
          ],
          "career": "品川区職員・副区長を経て、前区長の死去に伴う平成18年10月の区長選挙で初当選。4期16年務め、令和4年10月に退任。令和5年に旭日重光章。選挙により「浜野 健」「はまの 健」表記もある。",
          "electionHistory": [
            "2018 品川区長選挙：当選（49,965票・48.1%）",
            "2014 品川区長選挙：当選（51,378票）",
            "2010 品川区長選挙：当選（66,315票）",
            "2006 品川区長選挙：当選（35,422票）"
          ],
          "elections": "4回"
        },
        {
          "id": "m-takahashi-kyuji",
          "name": "高橋 久二",
          "kana": "たかはし きゅうじ",
          "party": "無所属",
          "statusLabel": "元職区長",
          "office": "品川区長",
          "serviceHistory": "昭和62年〜平成18年（区長5期）",
          "career": "昭和62年に品川区長へ初当選し、5期目の在任中の平成18年8月に死去。全国初の公立小中一貫校（品川区立日野学園）を開校。",
          "electionHistory": [
            "2003 品川区長選挙：当選（48,829票）",
            "1999 品川区長選挙：当選（79,988票）"
          ],
          "elections": "2回"
        }
      ]
    }
  }
};
