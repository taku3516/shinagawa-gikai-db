// 品川区議会DB データファイル（品川区の選挙アーカイブ）
// 具体的な選挙名・得票数は、情報源の確認後に追加する。
// elections の想定項目:
// id, type, subtype, title, electionDate, noticeDate, district, seats,
// candidateCount, electorate, voters, turnout, previousTurnout, summary,
// candidates[{ personId, name, party, result, rank, votesDisplay, votesValue, voteShare }],
// proportionalResults[{ name, votesDisplay, votesValue }], sources[{ label, url }], verifiedAt
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.electionsData = {
  "updatedAt": "2026-07-30",
  "note": "品川区に関わる選挙（区議選・区議補選・区長選・都議選・都議補選の品川区選挙区）を1997年まで遡って掲載しています。得票数・得票率・党派は選挙ドットコムの公表データ、投票率・有権者数は各選挙の公式発表に基づきます。得票数に小数があるものは、選挙管理委員会発表に準拠した按分票です。",
  "types": [
    {
      "id": "ward-assembly",
      "label": "品川区議会議員選挙"
    },
    {
      "id": "ward-assembly-by",
      "label": "品川区議会議員補欠選挙"
    },
    {
      "id": "ward-mayor",
      "label": "品川区長選挙"
    },
    {
      "id": "tokyo-assembly",
      "label": "東京都議会議員選挙（品川区選挙区）"
    },
    {
      "id": "tokyo-assembly-by",
      "label": "東京都議会議員補欠選挙（品川区選挙区）"
    }
  ],
  "referenceSites": [
    {
      "label": "品川区公式サイト「過去の選挙結果」",
      "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html",
      "role": "一次情報"
    },
    {
      "label": "選挙ドットコム「東京都品川区の選挙一覧」",
      "url": "https://go2senkyo.com/local/jichitai/1193",
      "role": "一覧・確認補助"
    }
  ],
  "elections": [
    {
      "id": "go2-23023",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2025-06-22",
      "noticeDate": "2025-06-13",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 10,
      "electorate": "334,926",
      "turnout": "48.92",
      "previousTurnout": "43.19",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "しのはら りか",
          "party": "無所属",
          "votesDisplay": "40,465票",
          "voteShare": "25.0%"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "伊藤 こういち",
          "party": "公明党",
          "votesDisplay": "19,351票",
          "voteShare": "12.0%"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "せりざわ 裕次郎",
          "party": "自由民主党",
          "votesDisplay": "19,125票",
          "voteShare": "11.8%"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "ひがし ゆき",
          "party": "立憲民主党",
          "votesDisplay": "18,418票",
          "voteShare": "11.4%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "石田 しんご",
          "party": "国民民主党",
          "votesDisplay": "15,293票",
          "voteShare": "9.4%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "白石 たみお",
          "party": "日本共産党",
          "votesDisplay": "14,478票",
          "voteShare": "8.9%"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "岡本 さとし",
          "party": "都民ファーストの会",
          "votesDisplay": "12,085.379票",
          "voteShare": "7.5%"
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "岡本 ゆうじ",
          "party": "再生の道",
          "votesDisplay": "11,202.620票",
          "voteShare": "6.9%"
        },
        {
          "result": "落選",
          "rank": 9,
          "name": "かわぐち めぐみ",
          "party": "無所属",
          "votesDisplay": "11,072票",
          "voteShare": "6.8%"
        },
        {
          "result": "落選",
          "rank": 10,
          "name": "古田 真",
          "party": "土頭を働かし最高裁裁判官５人を弾劾する党",
          "votesDisplay": "355票",
          "voteShare": "0.2%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/23023/43825"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-25897",
      "type": "tokyo-assembly-by",
      "title": "東京都議会議員補欠選挙（品川区選挙区）",
      "electionDate": "2024-07-07",
      "noticeDate": "2024-06-28",
      "district": "品川区選挙区",
      "seats": 1,
      "candidateCount": 4,
      "electorate": "336,487",
      "turnout": "60.89",
      "previousTurnout": "43.19",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "しのはら りか",
          "party": "無所属",
          "votesDisplay": "60,094票",
          "voteShare": "32.5%"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "せりざわ 裕次郎",
          "party": "自由民主党",
          "votesDisplay": "57,641票",
          "voteShare": "31.2%"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "菅原 ちいね",
          "party": "立憲民主党",
          "votesDisplay": "37,812票",
          "voteShare": "20.5%"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "かわぐち めぐみ",
          "party": "無所属",
          "votesDisplay": "29,127票",
          "voteShare": "15.8%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/25897/48153"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-20402",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2023-04-23",
      "noticeDate": "2023-04-16",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 58,
      "electorate": "328,056",
      "turnout": "40.86",
      "previousTurnout": "39.72",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "せお 麻里",
          "party": "無所属",
          "votesDisplay": "6,016票",
          "voteShare": "4.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "せらく 真央",
          "party": "日本維新の会",
          "votesDisplay": "5,692票",
          "voteShare": "4.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "山本 やすゆき",
          "party": "無所属",
          "votesDisplay": "5,598.200票",
          "voteShare": "4.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "高橋 しんじ",
          "party": "無所属",
          "votesDisplay": "5,522.877票",
          "voteShare": "4.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "ひがし ゆき",
          "party": "立憲民主党",
          "votesDisplay": "4,676票",
          "voteShare": "3.5%"
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "石田 ひでお",
          "party": "自由民主党",
          "votesDisplay": "4,184.604票",
          "voteShare": "3.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "松本 ときひろ",
          "party": "日本維新の会",
          "votesDisplay": "4,049票",
          "voteShare": "3.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "西本 たか子",
          "party": "無所属",
          "votesDisplay": "3,829.890票",
          "voteShare": "2.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "松永 よしひろ",
          "party": "立憲民主党",
          "votesDisplay": "3,556.629票",
          "voteShare": "2.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "沢田 えみこ",
          "party": "自由民主党",
          "votesDisplay": "3,179票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "田中 たけし",
          "party": "無所属",
          "votesDisplay": "3,040.661票",
          "voteShare": "2.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "2,755.138票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "まつざわ 和昌",
          "party": "自由民主党",
          "votesDisplay": "2,753票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "こんの 孝子",
          "party": "公明党",
          "votesDisplay": "2,725.982票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "石田 しんご",
          "party": "国民民主党",
          "votesDisplay": "2,696.322票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "大倉 たかひろ",
          "party": "無所属",
          "votesDisplay": "2,672票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "あくつ 広王",
          "party": "公明党",
          "votesDisplay": "2,610票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "須貝 ゆきひろ",
          "party": "無所属",
          "votesDisplay": "2,563票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "筒井 ようすけ",
          "party": "都民ファーストの会",
          "votesDisplay": "2,503票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "つる 伸一郎",
          "party": "公明党",
          "votesDisplay": "2,484票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "木村 健悟",
          "party": "無所属",
          "votesDisplay": "2,476票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "石田 ちひろ",
          "party": "日本共産党",
          "votesDisplay": "2,407.073票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "西村 なおこ",
          "party": "自由民主党",
          "votesDisplay": "2,397.861票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "なかつか りょう",
          "party": "日本共産党",
          "votesDisplay": "2,372票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "新妻 さえ子",
          "party": "公明党",
          "votesDisplay": "2,363票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "若林 ひろき",
          "party": "公明党",
          "votesDisplay": "2,178票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "おぎの あやか",
          "party": "参政党",
          "votesDisplay": "2,163票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "やなぎさわ 聡",
          "party": "れいわ新選組",
          "votesDisplay": "2,101票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "塚本 よしひろ",
          "party": "公明党",
          "votesDisplay": "2,092.370票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "ゆきた 政春",
          "party": "公明党",
          "votesDisplay": "2,060票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "のだて 稔史",
          "party": "日本共産党",
          "votesDisplay": "1,995票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "ふじわら 正則",
          "party": "無所属",
          "votesDisplay": "1,949票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "渡辺 ゆういち",
          "party": "自由民主党",
          "votesDisplay": "1,907票",
          "voteShare": "1.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "せりざわ 裕次郎",
          "party": "自由民主党",
          "votesDisplay": "1,886票",
          "voteShare": "1.4%"
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "吉田 ゆみこ",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,858票",
          "voteShare": "1.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "安藤 たい作",
          "party": "日本共産党",
          "votesDisplay": "1,739票",
          "voteShare": "1.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "横山 ゆかり",
          "party": "無所属",
          "votesDisplay": "1,730票",
          "voteShare": "1.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "こしば 新",
          "party": "自由民主党",
          "votesDisplay": "1,702票",
          "voteShare": "1.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "えのした 正人",
          "party": "自由民主党",
          "votesDisplay": "1,642票",
          "voteShare": "1.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "高橋 のぶあき",
          "party": "自由民主党",
          "votesDisplay": "1,599.122票",
          "voteShare": "1.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "いながき 孝子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,547.125票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "土田 英夫",
          "party": "日本共産党",
          "votesDisplay": "1,537票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "田中 さやか",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,525.338票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "おくの 晋治",
          "party": "日本共産党",
          "votesDisplay": "1,521票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "本多 たけのぶ",
          "party": "自由民主党",
          "votesDisplay": "1,448票",
          "voteShare": "1.1%"
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "ゆざわ 一貴",
          "party": "自由民主党",
          "votesDisplay": "1,338票",
          "voteShare": "1.0%"
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "わたべ 茂",
          "party": "自由民主党",
          "votesDisplay": "1,318票",
          "voteShare": "1.0%"
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "くぼた 学",
          "party": "NHK党",
          "votesDisplay": "1,106票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "神崎 ふみえ",
          "party": "自由民主党",
          "votesDisplay": "1,103票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "くにば 雄大",
          "party": "立憲民主党",
          "votesDisplay": "1,101票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "宮本 勇貴",
          "party": "無所属",
          "votesDisplay": "783票",
          "voteShare": "0.6%"
        },
        {
          "result": "落選",
          "rank": 52,
          "name": "かわぐち めぐみ",
          "party": "無所属",
          "votesDisplay": "710票",
          "voteShare": "0.5%"
        },
        {
          "result": "落選",
          "rank": 53,
          "name": "おおにし 光広",
          "party": "品川に維新を起こす会",
          "votesDisplay": "649票",
          "voteShare": "0.5%"
        },
        {
          "result": "落選",
          "rank": 54,
          "name": "しばた けいや",
          "party": "無所属",
          "votesDisplay": "626票",
          "voteShare": "0.5%"
        },
        {
          "result": "落選",
          "rank": 55,
          "name": "山本 あやの",
          "party": "政治家女子48党",
          "votesDisplay": "621.799票",
          "voteShare": "0.5%"
        },
        {
          "result": "落選",
          "rank": 56,
          "name": "野村 たかし",
          "party": "無所属",
          "votesDisplay": "526票",
          "voteShare": "0.4%"
        },
        {
          "result": "落選",
          "rank": 57,
          "name": "津田 しんご",
          "party": "無所属",
          "votesDisplay": "503票",
          "voteShare": "0.4%"
        },
        {
          "result": "落選",
          "rank": 58,
          "name": "まつざか 寛之",
          "party": "無所属",
          "votesDisplay": "359票",
          "voteShare": "0.3%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/20402"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-24234",
      "type": "ward-mayor",
      "title": "品川区長再選挙",
      "electionDate": "2022-12-04",
      "noticeDate": "2022-11-27",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 6,
      "electorate": "330,771",
      "turnout": "32.44",
      "previousTurnout": "35.22",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "森沢 きょうこ",
          "party": "無所属",
          "votesDisplay": "40,695票",
          "voteShare": "38.6%"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "石田 ひでお",
          "party": "無所属",
          "votesDisplay": "23,208.138票",
          "voteShare": "22.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "山本 やすゆき",
          "party": "無所属",
          "votesDisplay": "20,054票",
          "voteShare": "19.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "11,386票",
          "voteShare": "10.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "村川 ひろかず",
          "party": "無所属",
          "votesDisplay": "7,042票",
          "voteShare": "6.7%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "石田 しんご",
          "party": "無所属",
          "votesDisplay": "3,113.861票",
          "voteShare": "3.0%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/24234"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-24235",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2022-12-04",
      "noticeDate": "2022-11-27",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 7,
      "electorate": "330,771",
      "turnout": "32.43",
      "previousTurnout": "39.72",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "沢田 えみこ",
          "party": "自由民主党",
          "votesDisplay": "33,779票",
          "voteShare": "33.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "いながき 孝子",
          "party": "東京・生活者ネットワーク",
          "votesDisplay": "17,808票",
          "voteShare": "17.6%"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "土田 英夫",
          "party": "日本共産党",
          "votesDisplay": "15,799票",
          "voteShare": "15.6%"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "おおにし 光広",
          "party": "品川に維新を起こす会",
          "votesDisplay": "11,083票",
          "voteShare": "10.9%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "ときざき 直行",
          "party": "国民民主党",
          "votesDisplay": "10,635票",
          "voteShare": "10.5%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "かわぐち めぐみ",
          "party": "無所属",
          "votesDisplay": "7,278票",
          "voteShare": "7.2%"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "しばた けいや",
          "party": "無所属",
          "votesDisplay": "4,914票",
          "voteShare": "4.9%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/24235"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-22853",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2022-10-02",
      "noticeDate": "2022-09-25",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 6,
      "electorate": "330,516",
      "turnout": "35.22",
      "previousTurnout": "32.71",
      "candidates": [
        {
          "result": "落選",
          "rank": 1,
          "name": "森沢 きょうこ",
          "party": "無所属",
          "votesDisplay": "27,759票",
          "voteShare": "24.5%"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "石田 ひでお",
          "party": "無所属",
          "votesDisplay": "26,308票",
          "voteShare": "23.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "山本 やすゆき",
          "party": "無所属",
          "votesDisplay": "24,669票",
          "voteShare": "21.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "18,559票",
          "voteShare": "16.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "村川 ひろかず",
          "party": "無所属",
          "votesDisplay": "8,279票",
          "voteShare": "7.3%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "おおにし 光広",
          "party": "品川に維新を起こす会",
          "votesDisplay": "7,821票",
          "voteShare": "6.9%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/22853"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-23160",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2022-10-02",
      "noticeDate": "2022-09-25",
      "district": "品川区全域",
      "seats": 3,
      "candidateCount": 7,
      "electorate": "330,516",
      "turnout": "35.21",
      "previousTurnout": "39.72",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "えのした 正人",
          "party": "自由民主党",
          "votesDisplay": "27,197票",
          "voteShare": "24.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "松永 よしひろ",
          "party": "立憲民主党",
          "votesDisplay": "22,193票",
          "voteShare": "19.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "せらく 真央",
          "party": "日本維新の会",
          "votesDisplay": "18,800票",
          "voteShare": "16.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "土田 英夫",
          "party": "日本共産党",
          "votesDisplay": "13,379票",
          "voteShare": "12.0%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "いながき 孝子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "13,360票",
          "voteShare": "11.9%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "神崎 ふみえ",
          "party": "無所属",
          "votesDisplay": "11,455票",
          "voteShare": "10.2%"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "柴田 けいや",
          "party": "無所属",
          "votesDisplay": "5,481票",
          "voteShare": "4.9%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/23160"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-20334",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2021-07-04",
      "noticeDate": "2021-06-25",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 8,
      "electorate": "333,647",
      "turnout": "43.19",
      "previousTurnout": "52",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "伊藤 こういち",
          "party": "公明党",
          "votesDisplay": "23,188票",
          "voteShare": "16.4%"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "森沢 きょうこ",
          "party": "無所属",
          "votesDisplay": "22,413票",
          "voteShare": "15.8%"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "白石 たみお",
          "party": "日本共産党",
          "votesDisplay": "20,552票",
          "voteShare": "14.5%"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "あべ 祐美子",
          "party": "立憲民主党",
          "votesDisplay": "20,087票",
          "voteShare": "14.2%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "筒井 ようすけ",
          "party": "都民ファーストの会",
          "votesDisplay": "19,696票",
          "voteShare": "13.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "田中 たけし",
          "party": "自由民主党",
          "votesDisplay": "18,281票",
          "voteShare": "12.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "沢田 ひろかず",
          "party": "自由民主党",
          "votesDisplay": "16,610票",
          "voteShare": "11.7%"
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "佐藤 マサアキ",
          "party": "日本公益党",
          "votesDisplay": "804票",
          "voteShare": "0.6%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/20334/40071"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-18118",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2019-04-21",
      "noticeDate": "2019-04-14",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 51,
      "electorate": "322,379",
      "turnout": "39.72",
      "previousTurnout": "40.08",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "高橋 しんじ",
          "party": "無所属",
          "votesDisplay": "6,205.403票",
          "voteShare": "4.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "あべ 祐美子",
          "party": "立憲民主党",
          "votesDisplay": "6,069票",
          "voteShare": "4.8%"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "西村 なおこ",
          "party": "自由民主党",
          "votesDisplay": "3,641.546票",
          "voteShare": "2.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "3,526.058票",
          "voteShare": "2.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "なかつか 亮",
          "party": "日本共産党",
          "votesDisplay": "3,353票",
          "voteShare": "2.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "せお 麻里",
          "party": "無所属",
          "votesDisplay": "3,290票",
          "voteShare": "2.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "筒井 ようすけ",
          "party": "都民ファーストの会",
          "votesDisplay": "3,163票",
          "voteShare": "2.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "あくつ 広王",
          "party": "公明党",
          "votesDisplay": "3,053票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "こんの 孝子",
          "party": "公明党",
          "votesDisplay": "2,980票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "石田 ひでお",
          "party": "自由民主党",
          "votesDisplay": "2,960.482票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "高橋 のぶあき",
          "party": "自由民主党",
          "votesDisplay": "2,911.596票",
          "voteShare": "2.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "鈴木 ますみ",
          "party": "自由民主党",
          "votesDisplay": "2,910.630票",
          "voteShare": "2.3%"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "せりざわ 裕次郎",
          "party": "自由民主党",
          "votesDisplay": "2,896票",
          "voteShare": "2.3%"
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "松本 ときひろ",
          "party": "日本維新の会",
          "votesDisplay": "2,844票",
          "voteShare": "2.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "つる 伸一郎",
          "party": "公明党",
          "votesDisplay": "2,817票",
          "voteShare": "2.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "西本 たか子",
          "party": "無所属",
          "votesDisplay": "2,711票",
          "voteShare": "2.2%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "新妻 さえ子",
          "party": "公明党",
          "votesDisplay": "2,688票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "木村 健悟",
          "party": "無所属",
          "votesDisplay": "2,669票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "おくの 晋治",
          "party": "日本共産党",
          "votesDisplay": "2,588票",
          "voteShare": "2.1%"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "塚本 よしひろ",
          "party": "公明党",
          "votesDisplay": "2,542票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "くにば 雄大",
          "party": "NHKから国民を守る党",
          "votesDisplay": "2,532票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "須貝 ゆきひろ",
          "party": "無所属",
          "votesDisplay": "2,522票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "石田 ちひろ",
          "party": "日本共産党",
          "votesDisplay": "2,449.168票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "鈴木 博",
          "party": "無所属",
          "votesDisplay": "2,427.766票",
          "voteShare": "1.9%"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "若林 ひろき",
          "party": "公明党",
          "votesDisplay": "2,392票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "渡辺 ゆういち",
          "party": "自由民主党",
          "votesDisplay": "2,291票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "安藤 たい作",
          "party": "日本共産党",
          "votesDisplay": "2,215票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "本多 たけのぶ",
          "party": "自由民主党",
          "votesDisplay": "2,203票",
          "voteShare": "1.8%"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "ゆざわ 一貴",
          "party": "自由民主党",
          "votesDisplay": "2,200票",
          "voteShare": "1.8%"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "吉田 ゆみこ",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "2,195.863票",
          "voteShare": "1.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "横山 ゆかり",
          "party": "自由民主党",
          "votesDisplay": "2,188票",
          "voteShare": "1.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "たけうち 忍",
          "party": "公明党",
          "votesDisplay": "2,162票",
          "voteShare": "1.7%"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "のだて 稔史",
          "party": "日本共産党",
          "votesDisplay": "2,149票",
          "voteShare": "1.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "田中 さやか",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "2,134票",
          "voteShare": "1.7%"
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "わたべ 茂",
          "party": "自由民主党",
          "votesDisplay": "2,109票",
          "voteShare": "1.7%"
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "大倉 たかひろ",
          "party": "国民民主党",
          "votesDisplay": "1,994票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "まつざわ 和昌",
          "party": "無所属",
          "votesDisplay": "1,933票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "大沢 しんいち",
          "party": "自由民主党",
          "votesDisplay": "1,932票",
          "voteShare": "1.5%"
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "こしば 新",
          "party": "自由民主党",
          "votesDisplay": "1,900票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "ふじわら 正則",
          "party": "無所属",
          "votesDisplay": "1,898票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "タカノ ヨウスケ",
          "party": "無所属",
          "votesDisplay": "1,860票",
          "voteShare": "1.5%"
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "いとう 昌宏",
          "party": "自由民主党",
          "votesDisplay": "1,843.501票",
          "voteShare": "1.5%"
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "松永 よしひろ",
          "party": "国民民主党",
          "votesDisplay": "1,822票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "西村 柳一郎",
          "party": "無所属",
          "votesDisplay": "1,814.995票",
          "voteShare": "1.4%"
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "いそべ しょうさい",
          "party": "立憲民主党",
          "votesDisplay": "1,777票",
          "voteShare": "1.4%"
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "宗 かずみ",
          "party": "日本共産党",
          "votesDisplay": "1,707票",
          "voteShare": "1.4%"
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "いながわ 貴之",
          "party": "国民民主党",
          "votesDisplay": "1,513票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "くわつか 透",
          "party": "日本共産党",
          "votesDisplay": "1,241票",
          "voteShare": "1.0%"
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "石田 しんご",
          "party": "国民民主党",
          "votesDisplay": "1,074.990票",
          "voteShare": "0.9%"
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "よしだ あつみ",
          "party": "自由党",
          "votesDisplay": "871.136票",
          "voteShare": "0.7%"
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "伊藤 しんご",
          "party": "ガンバル",
          "votesDisplay": "450.856票",
          "voteShare": "0.4%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/18118"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-16776",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2018-09-30",
      "noticeDate": "2018-09-23",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 3,
      "electorate": "",
      "turnout": "32.71",
      "previousTurnout": "23.22",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "浜野 健",
          "party": "無所属",
          "votesDisplay": "49,965票",
          "voteShare": "48.1%"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "佐藤 裕彦",
          "party": "無所属",
          "votesDisplay": "37,607票",
          "voteShare": "36.2%"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "16,240票",
          "voteShare": "15.6%",
          "personUrl": "giin.html"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/16776"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-18314",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2018-09-30",
      "noticeDate": "2018-09-23",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 5,
      "electorate": "",
      "turnout": "32.7",
      "previousTurnout": "40.08",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "芹沢 裕次郎",
          "party": "自由民主党",
          "votesDisplay": "34,377票",
          "voteShare": "34.5%"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "奥野 晋治",
          "party": "日本共産党",
          "votesDisplay": "25,354票",
          "voteShare": "25.4%"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "西村 柳一郎",
          "party": "無所属",
          "votesDisplay": "14,873票",
          "voteShare": "14.9%"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "高野 洋介",
          "party": "無所属",
          "votesDisplay": "14,207票",
          "voteShare": "14.3%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "吉田 あつみ",
          "party": "自由党",
          "votesDisplay": "10,814票",
          "voteShare": "10.9%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/18314"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-15497",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2017-07-02",
      "noticeDate": "2017-06-23",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 7,
      "electorate": "318,560",
      "turnout": "52",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "森沢 恭子",
          "party": "都民ファーストの会",
          "votesDisplay": "32,261票",
          "voteShare": "19.8%"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "山内 晃",
          "party": "都民ファーストの会",
          "votesDisplay": "28,591票",
          "voteShare": "17.5%"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "伊藤 興一",
          "party": "公明党",
          "votesDisplay": "26,184票",
          "voteShare": "16.0%"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "白石 民男",
          "party": "日本共産党",
          "votesDisplay": "23,176票",
          "voteShare": "14.2%"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "田中 豪",
          "party": "自由民主党",
          "votesDisplay": "19,546票",
          "voteShare": "12.0%"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "阿部 祐美子",
          "party": "民進党",
          "votesDisplay": "17,612票",
          "voteShare": "10.8%"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "沢田 洋和",
          "party": "自由民主党",
          "votesDisplay": "15,807票",
          "voteShare": "9.7%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/15497/24930"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9903",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2015-04-26",
      "noticeDate": "2015-04-19",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 54,
      "electorate": "",
      "turnout": "40.08",
      "previousTurnout": "40.58",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "横山 ゆかり",
          "party": "自由民主党",
          "votesDisplay": "5,609票",
          "voteShare": "4.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "高橋 慎司",
          "party": "無所属",
          "votesDisplay": "5,551票",
          "voteShare": "4.7%"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "中塚 亮",
          "party": "日本共産党",
          "votesDisplay": "3,635票",
          "voteShare": "3.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "大倉 たかひろ",
          "party": "民主党",
          "votesDisplay": "3,552票",
          "voteShare": "3.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "3,548票",
          "voteShare": "3.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "筒井 洋介",
          "party": "維新の党",
          "votesDisplay": "3,307票",
          "voteShare": "2.8%"
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "松沢 利行",
          "party": "自由民主党",
          "votesDisplay": "3,161票",
          "voteShare": "2.7%"
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "飯沼 雅子",
          "party": "日本共産党",
          "votesDisplay": "3,043票",
          "voteShare": "2.6%"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "阿部 祐美子",
          "party": "民主党",
          "votesDisplay": "3,039票",
          "voteShare": "2.6%"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "沢田 洋和",
          "party": "自由民主党",
          "votesDisplay": "2,925票",
          "voteShare": "2.5%"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "2,910票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "安藤 泰作",
          "party": "日本共産党",
          "votesDisplay": "2,894票",
          "voteShare": "2.4%"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "南 恵子",
          "party": "日本共産党",
          "votesDisplay": "2,851票",
          "voteShare": "2.4%"
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "木村 健悟",
          "party": "無所属",
          "votesDisplay": "2,798票",
          "voteShare": "2.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "松永 よしひろ",
          "party": "民主党",
          "votesDisplay": "2,713票",
          "voteShare": "2.3%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "鈴木 真澄",
          "party": "自由民主党",
          "votesDisplay": "2,642票",
          "voteShare": "2.2%"
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "若林 広毅",
          "party": "公明党",
          "votesDisplay": "2,544票",
          "voteShare": "2.1%"
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "石田 ちひろ",
          "party": "日本共産党",
          "votesDisplay": "2,523票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "鈴木 博",
          "party": "無所属",
          "votesDisplay": "2,513票",
          "voteShare": "2.1%"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "須貝 行宏",
          "party": "無所属",
          "votesDisplay": "2,461票",
          "voteShare": "2.1%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "金野 孝子",
          "party": "公明党",
          "votesDisplay": "2,433票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "あくつ 広王",
          "party": "公明党",
          "votesDisplay": "2,366票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "渡部 茂",
          "party": "自由民主党",
          "votesDisplay": "2,362票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "大沢 真一",
          "party": "自由民主党",
          "votesDisplay": "2,358票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "本多 健信",
          "party": "自由民主党",
          "votesDisplay": "2,352票",
          "voteShare": "2.0%"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "のだて 稔史",
          "party": "日本共産党",
          "votesDisplay": "2,339票",
          "voteShare": "2.0%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "武内 忍",
          "party": "公明党",
          "votesDisplay": "2,261票",
          "voteShare": "1.9%"
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "新妻 さえ子",
          "party": "公明党",
          "votesDisplay": "2,239票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "吉田 ゆみこ",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "2,220票",
          "voteShare": "1.9%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "浅野 浩之",
          "party": "公明党",
          "votesDisplay": "2,164票",
          "voteShare": "1.8%"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "藤原 正則",
          "party": "無所属",
          "votesDisplay": "2,087票",
          "voteShare": "1.8%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "つる 伸一郎",
          "party": "公明党",
          "votesDisplay": "2,001票",
          "voteShare": "1.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "田中 さやか",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,993票",
          "voteShare": "1.7%"
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "伊藤 昌宏",
          "party": "自由民主党",
          "votesDisplay": "1,985票",
          "voteShare": "1.7%"
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "塚本 よしひろ",
          "party": "公明党",
          "votesDisplay": "1,962票",
          "voteShare": "1.7%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "稲川 貴之",
          "party": "民主党",
          "votesDisplay": "1,957票",
          "voteShare": "1.6%"
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "高橋 のぶあき",
          "party": "自由民主党",
          "votesDisplay": "1,859票",
          "voteShare": "1.6%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "石田 慎吾",
          "party": "民主党",
          "votesDisplay": "1,799票",
          "voteShare": "1.5%"
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "1,746票",
          "voteShare": "1.5%",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "渡辺 裕一",
          "party": "自由民主党",
          "votesDisplay": "1,715票",
          "voteShare": "1.4%",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "宮城 けいた",
          "party": "自由民主党",
          "votesDisplay": "1,562票",
          "voteShare": "1.3%"
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "熊沢 やすひろ",
          "party": "無所属",
          "votesDisplay": "1,381票",
          "voteShare": "1.2%"
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "小林 誠",
          "party": "無所属",
          "votesDisplay": "1,350票",
          "voteShare": "1.1%"
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "渡辺 さやか",
          "party": "無所属",
          "votesDisplay": "1,257票",
          "voteShare": "1.1%"
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "川西 和弘",
          "party": "無所属",
          "votesDisplay": "1,131票",
          "voteShare": "1.0%"
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "貝塚 かつみ",
          "party": "自由民主党",
          "votesDisplay": "1,007票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "杉山 ジョージ",
          "party": "自由民主党",
          "votesDisplay": "972票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "いそざき 洸一",
          "party": "維新の党",
          "votesDisplay": "938票",
          "voteShare": "0.8%"
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "せりざわ 裕次郎",
          "party": "無所属",
          "votesDisplay": "770票",
          "voteShare": "0.6%"
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "よしだ あつみ",
          "party": "自由民主党",
          "votesDisplay": "752票",
          "voteShare": "0.6%"
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "かげやま りつこ",
          "party": "無所属",
          "votesDisplay": "384票",
          "voteShare": "0.3%"
        },
        {
          "result": "落選",
          "rank": 52,
          "name": "かわさき とおる",
          "party": "無所属",
          "votesDisplay": "352票",
          "voteShare": "0.3%"
        },
        {
          "result": "落選",
          "rank": 53,
          "name": "ながおか 義男",
          "party": "無所属",
          "votesDisplay": "304票",
          "voteShare": "0.3%"
        },
        {
          "result": "落選",
          "rank": 54,
          "name": "金子 久夫",
          "party": "無所属",
          "votesDisplay": "212票",
          "voteShare": "0.2%"
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9903"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-6317",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2014-10-05",
      "noticeDate": "2014-09-28",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 2,
      "electorate": "",
      "turnout": "23.22",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "浜野 健",
          "party": "無所属",
          "votesDisplay": "51,378票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "原田 泰雄",
          "party": "無所属",
          "votesDisplay": "17,427票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/6317"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9904",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2014-10-05",
      "noticeDate": "2014-09-28",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 7,
      "electorate": "",
      "turnout": "23.39",
      "previousTurnout": "40.58",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "横山 ゆかり",
          "party": "自由民主党",
          "votesDisplay": "25,634票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "松永 よしひろ",
          "party": "民主党",
          "votesDisplay": "15,073票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "のだて 稔史",
          "party": "日本共産党",
          "votesDisplay": "13,190票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "筒井 洋介",
          "party": "維新の党",
          "votesDisplay": "6,669票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "小林 誠",
          "party": "無所属",
          "votesDisplay": "4,324票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "川西 和弘",
          "party": "無所属",
          "votesDisplay": "2,690票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "ながおか 義男",
          "party": "無所属",
          "votesDisplay": "784票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9904"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9858",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2013-06-23",
      "noticeDate": "2013-06-14",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 8,
      "electorate": "302,212",
      "turnout": "",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "田中 豪",
          "party": "自由民主党",
          "votesDisplay": "25,140票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "山内 晃",
          "party": "自由民主党",
          "votesDisplay": "22,862票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "伊藤 興一",
          "party": "公明党",
          "votesDisplay": "21,016票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "白石 民男",
          "party": "日本共産党",
          "votesDisplay": "15,338票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "神野 吉弘",
          "party": "民主党",
          "votesDisplay": "12,951票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "馬場 裕子",
          "party": "民主党",
          "votesDisplay": "12,478票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "飯山 直樹",
          "party": "みんなの党",
          "votesDisplay": "9,367票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "筒井 洋介",
          "party": "日本維新の会",
          "votesDisplay": "8,076票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9858/13887"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9905",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2011-04-24",
      "noticeDate": "2011-04-17",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 54,
      "electorate": "296,585",
      "turnout": "40.58",
      "previousTurnout": "41.59",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "高橋 慎司",
          "party": "無所属",
          "votesDisplay": "5,232票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "3,572.620票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "3,458.610票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "須貝 行宏",
          "party": "無所属",
          "votesDisplay": "3,164票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "鈴木 真澄",
          "party": "自由民主党",
          "votesDisplay": "3,070.970票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "松沢 利行",
          "party": "自由民主党",
          "votesDisplay": "3,019票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "沢田 洋和",
          "party": "自由民主党",
          "votesDisplay": "2,964票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "いとう 昌宏",
          "party": "自由民主党",
          "votesDisplay": "2,922.010票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "中塚 亮",
          "party": "日本共産党",
          "votesDisplay": "2,850票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "大倉 たかひろ",
          "party": "民主党",
          "votesDisplay": "2,759票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "山元 敬子",
          "party": "公明党",
          "votesDisplay": "2,742票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "石田 ちひろ",
          "party": "日本共産党",
          "votesDisplay": "2,737.610票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "阿部 祐美子",
          "party": "民主党",
          "votesDisplay": "2,673票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "若林 広毅",
          "party": "公明党",
          "votesDisplay": "2,657票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "あくつ 広王",
          "party": "公明党",
          "votesDisplay": "2,654票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "鈴木 博",
          "party": "無所属",
          "votesDisplay": "2,632.410票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "金野 孝子",
          "party": "公明党",
          "votesDisplay": "2,565票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "塚本 よしひろ",
          "party": "公明党",
          "votesDisplay": "2,465票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "つる 伸一郎",
          "party": "公明党",
          "votesDisplay": "2,444票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "本多 健信",
          "party": "自由民主党",
          "votesDisplay": "2,422票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "2,393票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "大沢 真一",
          "party": "自由民主党",
          "votesDisplay": "2,380票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "渡辺 裕一",
          "party": "自由民主党",
          "votesDisplay": "2,329票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "武内 忍",
          "party": "公明党",
          "votesDisplay": "2,257票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "山内 晃",
          "party": "自由民主党",
          "votesDisplay": "2,248票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "浅野 浩之",
          "party": "公明党",
          "votesDisplay": "2,247票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "宮崎 克俊",
          "party": "日本共産党",
          "votesDisplay": "2,239票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "木村 健悟",
          "party": "無所属",
          "votesDisplay": "2,198票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "南 恵子",
          "party": "日本共産党",
          "votesDisplay": "2,188票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "藤原 正則",
          "party": "無所属",
          "votesDisplay": "2,148票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "大西 光広",
          "party": "みんなの党",
          "votesDisplay": "2,134票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "石田 慎吾",
          "party": "民主党",
          "votesDisplay": "2,080.780票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "飯沼 雅子",
          "party": "日本共産党",
          "votesDisplay": "2,046票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "須藤 安通",
          "party": "自由民主党",
          "votesDisplay": "2,033票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "むこう めぐみ",
          "party": "民主党",
          "votesDisplay": "1,954票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "渡部 茂",
          "party": "無所属",
          "votesDisplay": "1,803票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "井上 八重子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,734票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "稲川 貴之",
          "party": "民主党",
          "votesDisplay": "1,713票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "よしだ あつみ",
          "party": "みんなの党",
          "votesDisplay": "1,681.090票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 40,
          "name": "安藤 泰作",
          "party": "日本共産党",
          "votesDisplay": "1,669票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "本間 隆",
          "party": "民主党",
          "votesDisplay": "1,668票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "林 宏",
          "party": "自由民主党",
          "votesDisplay": "1,618票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "吉田 せいしろう",
          "party": "自由民主党",
          "votesDisplay": "1,588.360票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "小林 誠",
          "party": "みんなの党",
          "votesDisplay": "1,552.140票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "吉田 楽",
          "party": "みんなの党",
          "votesDisplay": "1,457.550票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "いとう 優太",
          "party": "みんなの党",
          "votesDisplay": "1,444.980票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "小林 けさみ",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,415.860票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "奥山 晃",
          "party": "民主党",
          "votesDisplay": "1,128票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "川西 和弘",
          "party": "社会民主党",
          "votesDisplay": "1,115票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "やば 亮一",
          "party": "民主党",
          "votesDisplay": "1,084票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "藤川 美穂",
          "party": "幸福実現党",
          "votesDisplay": "914票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 52,
          "name": "ながおか 義男",
          "party": "無所属",
          "votesDisplay": "414票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 53,
          "name": "かすや しゅんじ",
          "party": "無所属",
          "votesDisplay": "408票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 54,
          "name": "杉森 正春",
          "party": "無所属",
          "votesDisplay": "178票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9905"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-368",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2010-10-03",
      "noticeDate": "2010-09-26",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 2,
      "electorate": "296,897",
      "turnout": "33.92",
      "previousTurnout": "33.92",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "はまの 健",
          "party": "無所属",
          "votesDisplay": "66,315票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "沢田 英次",
          "party": "無所属",
          "votesDisplay": "25,716票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/368"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9906",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2010-10-03",
      "noticeDate": "2010-09-26",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 9,
      "electorate": "287,005",
      "turnout": "41.59",
      "previousTurnout": "41.59",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "沢田 洋和",
          "party": "自由民主党",
          "votesDisplay": "28,159票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "大西 光広",
          "party": "みんなの党",
          "votesDisplay": "15,193票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "石田 ちひろ",
          "party": "日本共産党",
          "votesDisplay": "14,621票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "おくやま 晃",
          "party": "民主党",
          "votesDisplay": "13,685票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "大倉 たかひろ",
          "party": "無所属",
          "votesDisplay": "8,580票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "小林 けさみ",
          "party": "品川区・生活者ネットワーク",
          "votesDisplay": "5,810票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "やば 亮一",
          "party": "無所属",
          "votesDisplay": "2,722票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "ながおか 義男",
          "party": "無所属",
          "votesDisplay": "1,487票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 9,
          "name": "おさない 誠",
          "party": "無所属",
          "votesDisplay": "683票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9906"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9862",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2009-07-12",
      "noticeDate": "2009-07-03",
      "district": "品川区選挙区",
      "seats": null,
      "candidateCount": 7,
      "electorate": "297,696",
      "turnout": "",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "神野 吉弘",
          "party": "民主党",
          "votesDisplay": "42,221票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "馬場 裕子",
          "party": "民主党",
          "votesDisplay": "28,073票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "伊藤 興一",
          "party": "公明党",
          "votesDisplay": "25,322票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "田中 豪",
          "party": "自由民主党",
          "votesDisplay": "22,853票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "21,742票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "17,151票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "藤川 美穂",
          "party": "幸福実現党",
          "votesDisplay": "1,725票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9862/13934"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9907",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2007-04-22",
      "noticeDate": "2007-04-15",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 52,
      "electorate": "285,643",
      "turnout": "41.59",
      "previousTurnout": "43.18",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "阿部 祐美子",
          "party": "民主党",
          "votesDisplay": "5,397票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "石田 慎吾",
          "party": "民主党",
          "votesDisplay": "4,115.440票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "稲川 貴之",
          "party": "民主党",
          "votesDisplay": "3,984票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "須貝 行宏",
          "party": "無所属",
          "votesDisplay": "3,666票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "松沢 利行",
          "party": "自由民主党",
          "votesDisplay": "3,176票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "山元 敬子",
          "party": "公明党",
          "votesDisplay": "3,161票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "若林 広毅",
          "party": "公明党",
          "votesDisplay": "3,147.890票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "3,036.870票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "中塚 亮",
          "party": "日本共産党",
          "votesDisplay": "2,904票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "南 恵子",
          "party": "日本共産党",
          "votesDisplay": "2,876票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "山内 晃",
          "party": "自由民主党",
          "votesDisplay": "2,813票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "三上 博志",
          "party": "公明党",
          "votesDisplay": "2,688票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "飯沼 雅子",
          "party": "日本共産党",
          "votesDisplay": "2,621票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "金野 孝子",
          "party": "公明党",
          "votesDisplay": "2,615票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "山路 良成",
          "party": "公明党",
          "votesDisplay": "2,574票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "鈴木 真澄",
          "party": "自由民主党",
          "votesDisplay": "2,570.120票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "高橋 慎司",
          "party": "無所属",
          "votesDisplay": "2,541票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "渡部 茂",
          "party": "無所属",
          "votesDisplay": "2,516票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "浅野 浩之",
          "party": "公明党",
          "votesDisplay": "2,509票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "堺 直隆",
          "party": "公明党",
          "votesDisplay": "2,502票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "本多 健信",
          "party": "自由民主党",
          "votesDisplay": "2,418票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "渡辺 裕一",
          "party": "自由民主党",
          "votesDisplay": "2,404票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "武内 忍",
          "party": "公明党",
          "votesDisplay": "2,348票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "宮崎 克俊",
          "party": "日本共産党",
          "votesDisplay": "2,346票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "2,219.550票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "本間 隆",
          "party": "民主党",
          "votesDisplay": "2,211票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "伊藤 昌宏",
          "party": "自由民主党",
          "votesDisplay": "2,200票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "安藤 泰作",
          "party": "日本共産党",
          "votesDisplay": "2,196票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "藤原 正則",
          "party": "無所属",
          "votesDisplay": "2,153票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "2,104票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "土井 洋一",
          "party": "民主党",
          "votesDisplay": "2,099票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "大沢 真一",
          "party": "自由民主党",
          "votesDisplay": "2,093票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "須藤 安通",
          "party": "自由民主党",
          "votesDisplay": "2,061票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "井上 八重子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "2,010票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "菊地 貞二",
          "party": "日本共産党",
          "votesDisplay": "1,996票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "林 宏",
          "party": "自由民主党",
          "votesDisplay": "1,854.780票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "川西 絹子",
          "party": "社会民主党",
          "votesDisplay": "1,735票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "井桁 敦子",
          "party": "無所属",
          "votesDisplay": "1,551票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "市川 和子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,540票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 40,
          "name": "原 雅美",
          "party": "自由民主党",
          "votesDisplay": "1,514.400票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "塚本 利光",
          "party": "自由民主党",
          "votesDisplay": "1,497票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "林 和香",
          "party": "自由民主党",
          "votesDisplay": "1,477.220票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "奥山 晃",
          "party": "民主党",
          "votesDisplay": "1,456票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "加藤 孝",
          "party": "社会民主党",
          "votesDisplay": "1,380票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "佐藤 彌二郎",
          "party": "無所属",
          "votesDisplay": "1,350.540票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "木下 史典",
          "party": "無所属",
          "votesDisplay": "1,251票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "大西 光広",
          "party": "民主党",
          "votesDisplay": "1,177票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "山本 佳子",
          "party": "無所属",
          "votesDisplay": "929票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "佐藤 完二",
          "party": "無所属",
          "votesDisplay": "433.460票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "小山 弘樹",
          "party": "無所属",
          "votesDisplay": "400.110票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "糟谷 啓輔",
          "party": "無所属",
          "votesDisplay": "313票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 52,
          "name": "原田 生也",
          "party": "無所属",
          "votesDisplay": "240票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9907"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-1072",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2006-10-08",
      "noticeDate": "2006-10-01",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 5,
      "electorate": "287,005",
      "turnout": "33.92",
      "previousTurnout": "43.16",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "浜野 健",
          "party": "無所属",
          "votesDisplay": "35,422票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "内藤 尚",
          "party": "無所属",
          "votesDisplay": "31,778票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "桜井 恵子",
          "party": "無所属",
          "votesDisplay": "20,088票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "佐藤 完二",
          "party": "無所属",
          "votesDisplay": "5,877票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "金尾 丹",
          "party": "無所属",
          "votesDisplay": "1,914票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/1072"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9908",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2006-10-08",
      "noticeDate": "2006-10-01",
      "district": "品川区全域",
      "seats": 4,
      "candidateCount": 8,
      "electorate": "287,005",
      "turnout": "33.9",
      "previousTurnout": "43.18",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "阿部 祐美子",
          "party": "民主党",
          "votesDisplay": "13,985票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "安藤 泰作",
          "party": "日本共産党",
          "votesDisplay": "13,805票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "山内 晃",
          "party": "自由民主党",
          "votesDisplay": "12,799票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "渡辺 裕一",
          "party": "自由民主党",
          "votesDisplay": "10,798票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "稲川 貴之",
          "party": "民主党",
          "votesDisplay": "10,398票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "石田 慎吾",
          "party": "民主党",
          "votesDisplay": "9,960票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "井桁 敦子",
          "party": "無所属",
          "votesDisplay": "3,329票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "山本 佳子",
          "party": "無所属",
          "votesDisplay": "3,240票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9908"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9864",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2005-07-03",
      "noticeDate": "2005-06-24",
      "district": "品川区選挙区",
      "seats": null,
      "candidateCount": 6,
      "electorate": "284,431",
      "turnout": "49.36",
      "previousTurnout": "49.36",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "伊藤 興一",
          "party": "公明党",
          "votesDisplay": "27,729票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "田中 豪",
          "party": "自由民主党",
          "votesDisplay": "21,075票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "馬場 裕子",
          "party": "民主党",
          "votesDisplay": "20,542票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "佐藤 裕彦",
          "party": "自由民主党",
          "votesDisplay": "20,120票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "藤田 美佳",
          "party": "日本共産党",
          "votesDisplay": "18,593票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "神野 吉弘",
          "party": "民主党",
          "votesDisplay": "17,467票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9864/13983"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-3897",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2003-04-27",
      "noticeDate": "2003-04-20",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 5,
      "electorate": "271,959",
      "turnout": "43.16",
      "previousTurnout": "45.7",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "高橋 久二",
          "party": "無所属",
          "votesDisplay": "48,829票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "内藤 尚",
          "party": "無所属",
          "votesDisplay": "33,927票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "桜井 恵子",
          "party": "無所属",
          "votesDisplay": "19,794票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "船波 恵子",
          "party": "無所属",
          "votesDisplay": "6,648票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "神野 吉弘",
          "party": "無所属",
          "votesDisplay": "4,830票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/3897"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9909",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2003-04-27",
      "noticeDate": "2003-04-20",
      "district": "品川区全域",
      "seats": 42,
      "candidateCount": 48,
      "electorate": "271,959",
      "turnout": "43.18",
      "previousTurnout": "45.73",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "田中 豪",
          "party": "自由民主党",
          "votesDisplay": "5,383票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "松沢 利行",
          "party": "自由民主党",
          "votesDisplay": "3,648票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "南 恵子",
          "party": "日本共産党",
          "votesDisplay": "3,357票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "三上 博志",
          "party": "公明党",
          "votesDisplay": "3,170票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "若林 広毅",
          "party": "公明党",
          "votesDisplay": "3,056票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "島 くに子",
          "party": "公明党",
          "votesDisplay": "3,032票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "堺 直隆",
          "party": "公明党",
          "votesDisplay": "2,998票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "藤田 二郎",
          "party": "公明党",
          "votesDisplay": "2,905票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "原 雅美",
          "party": "自由民主党",
          "votesDisplay": "2,893.240票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "本間 隆",
          "party": "民主党",
          "votesDisplay": "2,882票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "2,881票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "2,734.560票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "鈴木 真澄",
          "party": "自由民主党",
          "votesDisplay": "2,698.440票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "中島 みえ",
          "party": "公明党",
          "votesDisplay": "2,647票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "山路 良成",
          "party": "公明党",
          "votesDisplay": "2,632票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "伊藤 昌宏",
          "party": "自由民主党",
          "votesDisplay": "2,582票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "須藤 安通",
          "party": "自由民主党",
          "votesDisplay": "2,563票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "飯沼 雅子",
          "party": "日本共産党",
          "votesDisplay": "2,544票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "武内 忍",
          "party": "公明党",
          "votesDisplay": "2,542票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "林 和也",
          "party": "自由民主党",
          "votesDisplay": "2,506.340票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "須貝 行宏",
          "party": "無所属",
          "votesDisplay": "2,491票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "かねたか 政男",
          "party": "民主党",
          "votesDisplay": "2,446票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "沢田 英次",
          "party": "日本共産党",
          "votesDisplay": "2,376票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "中塚 亮",
          "party": "日本共産党",
          "votesDisplay": "2,253票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "本多 健信",
          "party": "自由民主党",
          "votesDisplay": "2,241.540票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "林 宏",
          "party": "自由民主党",
          "votesDisplay": "2,236.660票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "塚本 利光",
          "party": "自由民主党",
          "votesDisplay": "2,223票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "井上 八重子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "2,185票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "大沢 真一",
          "party": "自由民主党",
          "votesDisplay": "2,180票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "土井 洋一",
          "party": "民主党",
          "votesDisplay": "2,090票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "つきだて 武雄",
          "party": "自由民主党",
          "votesDisplay": "2,074票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "西本 貴子",
          "party": "無所属",
          "votesDisplay": "2,066票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "高星 正利",
          "party": "民主党",
          "votesDisplay": "2,064票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "川西 絹子",
          "party": "社会民主党",
          "votesDisplay": "2,000票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "宮崎 克俊",
          "party": "日本共産党",
          "votesDisplay": "1,999票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "菊地 貞二",
          "party": "日本共産党",
          "votesDisplay": "1,962票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "藤原 正則",
          "party": "無所属",
          "votesDisplay": "1,954票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "大西 光広",
          "party": "自由党",
          "votesDisplay": "1,914票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "本田 義一",
          "party": "無所属",
          "votesDisplay": "1,869.460票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "三村 りつ子",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "1,837票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 41,
          "name": "山村 てるつぐ",
          "party": "民主党",
          "votesDisplay": "1,768票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 42,
          "name": "木下 史典",
          "party": "無所属",
          "votesDisplay": "1,636票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "つゆき 正高",
          "party": "無所属",
          "votesDisplay": "1,453票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "上山 弘文",
          "party": "日本共産党",
          "votesDisplay": "1,435票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "加藤 孝",
          "party": "無所属",
          "votesDisplay": "1,397票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "佐藤 彌二郎",
          "party": "無所属",
          "votesDisplay": "1,305票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "金沢 じゅん子",
          "party": "無所属",
          "votesDisplay": "956票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "平久江 まさお",
          "party": "無所属",
          "votesDisplay": "89票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9909"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-21828",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2001-06-24",
      "noticeDate": "2001-06-15",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 11,
      "electorate": "",
      "turnout": "49.36",
      "previousTurnout": "40.19",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "佐藤 裕彦",
          "party": "自由民主党",
          "votesDisplay": "41,319票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "中山 ひでお",
          "party": "公明党",
          "votesDisplay": "24,312票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "秋田 かくお",
          "party": "日本共産党",
          "votesDisplay": "19,725票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "馬場 裕子",
          "party": "民主党",
          "votesDisplay": "17,771票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "岡 れい子",
          "party": "社会民主党",
          "votesDisplay": "6,980票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "望月 昭広",
          "party": "無所属",
          "votesDisplay": "6,377票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "つゆき 正高",
          "party": "自由党",
          "votesDisplay": "5,601票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "渡辺 あけみ",
          "party": "無所属",
          "votesDisplay": "5,101票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 9,
          "name": "今村 やすひこ",
          "party": "無所属",
          "votesDisplay": "2,484票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 10,
          "name": "叶屋 友基",
          "party": "無所属",
          "votesDisplay": "858票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 11,
          "name": "みかみ 昭一郎",
          "party": "無所属",
          "votesDisplay": "431票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/21828/42450"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-3896",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "1999-04-25",
      "noticeDate": "1999-04-18",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 2,
      "electorate": "261,277",
      "turnout": "45.7",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "高橋 久二",
          "party": "無所属",
          "votesDisplay": "79,988票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "原田 泰雄",
          "party": "無所属",
          "votesDisplay": "34,812票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/3896"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-9910",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "1999-04-25",
      "noticeDate": "1999-04-18",
      "district": "品川区全域",
      "seats": 42,
      "candidateCount": 48,
      "electorate": "261,277",
      "turnout": "45.73",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "田中 豪",
          "party": "無所属",
          "votesDisplay": "3,666票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "松沢 利行",
          "party": "自由民主党",
          "votesDisplay": "3,532票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "南 恵子",
          "party": "日本共産党",
          "votesDisplay": "3,388.370票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "桜井 恵子",
          "party": "日本共産党",
          "votesDisplay": "3,383.370票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "北野 とみえ",
          "party": "品川・生活者ネットワーク",
          "votesDisplay": "3,335票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "渡辺 あけみ",
          "party": "民主党",
          "votesDisplay": "3,282票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "島 くに子",
          "party": "公明党",
          "votesDisplay": "3,054票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "沢田 英次",
          "party": "日本共産党",
          "votesDisplay": "3,035票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "三上 博志",
          "party": "公明党",
          "votesDisplay": "2,979票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "鈴木 ひろ子",
          "party": "日本共産党",
          "votesDisplay": "2,953.860票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "石田 秀男",
          "party": "自由民主党",
          "votesDisplay": "2,915票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "藤田 二郎",
          "party": "公明党",
          "votesDisplay": "2,853票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "須藤 安通",
          "party": "自由民主党",
          "votesDisplay": "2,784票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "土井 洋一",
          "party": "民主党",
          "votesDisplay": "2,768票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "辻 ゆきお",
          "party": "公明党",
          "votesDisplay": "2,763票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "高木 明",
          "party": "民主党",
          "votesDisplay": "2,739票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "つる 尚",
          "party": "公明党",
          "votesDisplay": "2,737票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "中島 みえ",
          "party": "公明党",
          "votesDisplay": "2,714票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "堺 直隆",
          "party": "公明党",
          "votesDisplay": "2,710票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "林 和也",
          "party": "自由民主党",
          "votesDisplay": "2,669.330票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "飯沼 雅子",
          "party": "日本共産党",
          "votesDisplay": "2,668票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "原 雅美",
          "party": "自由民主党",
          "votesDisplay": "2,585票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "川西 絹子",
          "party": "社会民主党",
          "votesDisplay": "2,553票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "山路 良成",
          "party": "公明党",
          "votesDisplay": "2,480票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "林 宏",
          "party": "自由民主党",
          "votesDisplay": "2,460.170票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "伊藤 昌宏",
          "party": "自由民主党",
          "votesDisplay": "2,441票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "横山 ひろし",
          "party": "自由民主党",
          "votesDisplay": "2,427.500票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "宮崎 克俊",
          "party": "日本共産党",
          "votesDisplay": "2,423票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "本多 健信",
          "party": "自由民主党",
          "votesDisplay": "2,420.520票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "船波 恵子",
          "party": "社会民主党",
          "votesDisplay": "2,390.260票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "鈴木 真澄",
          "party": "自由民主党",
          "votesDisplay": "2,306.140票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "藤原 正則",
          "party": "無所属",
          "votesDisplay": "2,304票",
          "voteShare": "",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "本田 義一",
          "party": "無所属",
          "votesDisplay": "2,242.480票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "つきだて 武雄",
          "party": "自由民主党",
          "votesDisplay": "2,135票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "かねたか 政男",
          "party": "民主党",
          "votesDisplay": "2,125票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "菊地 貞二",
          "party": "日本共産党",
          "votesDisplay": "2,033票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "塚本 利光",
          "party": "自由民主党",
          "votesDisplay": "1,985票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "佐藤 彌二郎",
          "party": "自由民主党",
          "votesDisplay": "1,984票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "かんけ 秀夫",
          "party": "自由民主党",
          "votesDisplay": "1,939票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "高星 正利",
          "party": "民主党",
          "votesDisplay": "1,892票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 41,
          "name": "上山 弘文",
          "party": "日本共産党",
          "votesDisplay": "1,853票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 42,
          "name": "本間 隆",
          "party": "無所属",
          "votesDisplay": "1,823票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "小野沢 政治",
          "party": "自由民主党",
          "votesDisplay": "1,776票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "木村 純",
          "party": "無所属",
          "votesDisplay": "1,753票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "大沢 真一",
          "party": "自由民主党",
          "votesDisplay": "1,737票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "木下 史典",
          "party": "無所属",
          "votesDisplay": "1,186票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "原田 生也",
          "party": "無所属",
          "votesDisplay": "262票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "山田 嘉一",
          "party": "無所属",
          "votesDisplay": "256票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/9910"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    },
    {
      "id": "go2-25161",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "1997-07-06",
      "noticeDate": "1997-06-27",
      "district": "品川区選挙区",
      "seats": 5,
      "candidateCount": 9,
      "electorate": "",
      "turnout": "40.19",
      "previousTurnout": "",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "中山 ひでお",
          "party": "公明党",
          "votesDisplay": "24,192票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "秋田 かくお",
          "party": "日本共産党",
          "votesDisplay": "22,466票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "内藤 しょう",
          "party": "自由民主党",
          "votesDisplay": "16,479票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "佐藤 裕彦",
          "party": "自由民主党",
          "votesDisplay": "14,794票",
          "voteShare": ""
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "馬場 裕子",
          "party": "民主党",
          "votesDisplay": "12,278票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "岡田 信也",
          "party": "社会民主党",
          "votesDisplay": "4,894票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "望月 昭広",
          "party": "無所属",
          "votesDisplay": "4,731票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "今村 やすひこ",
          "party": "太陽党",
          "votesDisplay": "2,045票",
          "voteShare": ""
        },
        {
          "result": "落選",
          "rank": 9,
          "name": "六角 としまさ",
          "party": "ネクスト",
          "votesDisplay": "1,408票",
          "voteShare": ""
        }
      ],
      "sources": [
        {
          "label": "選挙ドットコム（得票数・得票率）",
          "url": "https://go2senkyo.com/local/senkyo/25161/47216"
        },
        {
          "label": "品川区 過去の選挙結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/index.html"
        }
      ],
      "verifiedAt": "2026-07-30"
    }
  ]
};
