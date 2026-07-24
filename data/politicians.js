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
  "updatedAt": "2026-07-24",
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
          "activityExpenses": []
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
          "aliases": ["伊藤興一"],
          "career": "平成17年から連続当選。選挙公報等では「伊藤 興一」表記の年もある。",
          "sns": [],
          "fundReports": [],
          "activityExpenses": []
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
          "fundReports": [],
          "activityExpenses": []
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
          "activityExpenses": []
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
          "aliases": ["森沢恭子"],
          "career": "東京都議会議員（平成29年〜令和4年）を経て、令和4年から品川区長。選挙により「森沢 恭子」表記の年もある。"
        },
        {
          "id": "x-abe-yumiko",
          "name": "あべ 祐美子",
          "party": "立憲民主党",
          "statusLabel": "元職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "令和3年〜令和7年（都議1期）",
          "career": "品川区議会議員（平成18年〜令和2年）を経て、令和3年に東京都議会議員へ当選（1期）。"
        },
        {
          "id": "t-shiraishi-tamio",
          "name": "白石 たみお",
          "kana": "しらいし たみお",
          "party": "日本共産党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成25年〜令和7年（都議3期）",
          "aliases": ["白石民男"],
          "career": "平成25年から3期連続当選。選挙により「白石 民男」表記の年もある。"
        },
        {
          "id": "x-yamauchi-akira",
          "name": "山内 晃",
          "party": "都民ファーストの会（前 自由民主党）",
          "statusLabel": "元職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成25年〜令和3年（都議2期）",
          "career": "品川区議会議員（平成19年〜平成24年）を経て、東京都議会議員（平成25年〜令和3年、2期）。"
        },
        {
          "id": "x-tanaka-go",
          "name": "田中 豪",
          "party": "自由民主党",
          "statusLabel": "元職都議（元・品川区議）",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成17年〜平成29年（都議3期）",
          "career": "品川区議会議員を経て、東京都議会議員（平成17年〜平成29年、3期）。"
        },
        {
          "id": "t-kanno-yoshihiro",
          "name": "神野 吉弘",
          "party": "民主党（当時）",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成21年〜平成25年（都議1期）"
        },
        {
          "id": "t-baba-yuko",
          "name": "馬場 裕子",
          "party": "民主党（当時）",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成25年（都議4期）"
        },
        {
          "id": "t-sato-hirohiko",
          "name": "佐藤 裕彦",
          "party": "自由民主党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成21年（都議3期）"
        },
        {
          "id": "t-nakayama-hideo",
          "name": "中山 ひでお",
          "kana": "なかやま ひでお",
          "party": "公明党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成17年（都議2期）"
        },
        {
          "id": "t-akita-kakuo",
          "name": "秋田 かくお",
          "kana": "あきた かくお",
          "party": "日本共産党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成17年（都議2期）"
        },
        {
          "id": "t-naito-sho",
          "name": "内藤 しょう",
          "kana": "ないとう しょう",
          "party": "自由民主党",
          "statusLabel": "元職都議",
          "electoralDistrict": "品川区選挙区",
          "serviceHistory": "平成9年〜平成13年（都議1期）"
        }
      ]
    },
    "current-house": { "members": [] },
    "former-house": { "members": [] },
    "current-mayor": { "members": [] },
    "former-mayor": { "members": [] }
  }
};
