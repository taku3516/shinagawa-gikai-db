// 品川区議会DB データファイル（品川区の選挙アーカイブ）
// 具体的な選挙名・得票数は、情報源の確認後に追加する。
// elections の想定項目:
// id, type, subtype, title, electionDate, noticeDate, district, seats,
// candidateCount, electorate, voters, turnout, previousTurnout, summary,
// candidates[{ personId, name, party, result, rank, votesDisplay, votesValue, voteShare }],
// proportionalResults[{ name, votesDisplay, votesValue }], sources[{ label, url }], verifiedAt
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.electionsData = {
  "updatedAt": "2026-07-29",
  "note": "品川区に関わる選挙（区議選・区議補選・区長選・都議選・都議補選の品川区選挙区）を掲載しています。数値は品川区公式サイトの選挙結果ページからの転記です。党派は公式ページに記載がある選挙（都議選など）のみ表示し、記載がない選挙は「―」としています（候補者の党派・経歴は各選挙の「候補者について」や選挙公報を参照）。",
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
      "id": "togi-2025",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2025-06-22",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 10,
      "electorate": "334,926",
      "voters": "163,835",
      "turnout": "48.92",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "しのはらりか",
          "votesDisplay": "40,465票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "伊藤こういち",
          "votesDisplay": "19,351票",
          "party": "公明党"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "せりざわ裕次郎",
          "votesDisplay": "19,125票",
          "party": "自由民主党"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "ひがしゆき",
          "votesDisplay": "18,418票",
          "party": "立憲民主党"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "石田しんご",
          "votesDisplay": "15,293票",
          "party": "国民民主党"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "白石たみお",
          "votesDisplay": "14,478票",
          "party": "日本共産党"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "岡本さとし",
          "votesDisplay": "12,085.379票",
          "party": "都民ファーストの会"
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "岡本ゆうじ",
          "votesDisplay": "11,202.620票",
          "party": "再生の道"
        },
        {
          "result": "落選",
          "rank": 9,
          "name": "かわぐちめぐみ",
          "votesDisplay": "11,072票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 10,
          "name": "古田真",
          "votesDisplay": "355票",
          "party": "土頭を働かし最高裁裁判官5人を弾劾する党身体から地頭へ人の増える会"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/07togi/hpg000031504.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/07togi/hpg000031489.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "togiho-2024",
      "type": "tokyo-assembly-by",
      "title": "東京都議会議員補欠選挙（品川区選挙区）",
      "electionDate": "2024-07-07",
      "district": "品川区選挙区",
      "seats": 2,
      "candidateCount": 4,
      "electorate": "336,487",
      "voters": "204,882",
      "turnout": "60.89",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "しのはらりか",
          "votesDisplay": "60,094票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "せりざわ裕次郎",
          "votesDisplay": "57,641票",
          "party": "自由民主党"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "菅原ちいね",
          "votesDisplay": "37,812票",
          "party": "立憲民主党"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "かわぐちめぐみ",
          "votesDisplay": "29,127票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/R6totizitogiho/hpg000028791.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/R6totizitogiho/hpg000028789.html"
        }
      ],
      "verifiedAt": "2026-07-29",
      "summary": "東京都知事選挙と同日に執行された品川区選挙区の補欠選挙です。開票結果ページに当落表記がないため、得票上位2名（定数2）を当選として表示しています。"
    },
    {
      "id": "kugi-2023",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2023-04-23",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 58,
      "electorate": "328,056",
      "voters": "134,036",
      "turnout": "40.86",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "せお麻里",
          "votesDisplay": "6,016票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "せらく真央",
          "votesDisplay": "5,692票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "山本やすゆき",
          "votesDisplay": "5,598.200票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "高橋しんじ",
          "votesDisplay": "5,522.877票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "ひがしゆき",
          "votesDisplay": "4,676票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "石田ひでお",
          "votesDisplay": "4,184.604票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "松本ときひろ",
          "votesDisplay": "4,049票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "西本たか子",
          "votesDisplay": "3,829.890票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "松永よしひろ",
          "votesDisplay": "3,556.629票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "沢田えみこ",
          "votesDisplay": "3,179票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "田中たけし",
          "votesDisplay": "3,040.661票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "鈴木ひろ子",
          "votesDisplay": "2,755.138票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "まつざわ和昌",
          "votesDisplay": "2,753票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "こんの孝子",
          "votesDisplay": "2,725.982票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "石田しんご",
          "votesDisplay": "2,696.322票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "大倉たかひろ",
          "votesDisplay": "2,672票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "あくつ広王",
          "votesDisplay": "2,610票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "須貝ゆきひろ",
          "votesDisplay": "2,563票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "筒井ようすけ",
          "votesDisplay": "2,503票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "つる伸一郎",
          "votesDisplay": "2,484票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "木村健悟",
          "votesDisplay": "2,476票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "石田ちひろ",
          "votesDisplay": "2,407.073票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "西村なおこ",
          "votesDisplay": "2,397.861票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "なかつか亮",
          "votesDisplay": "2,372票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "新妻さえ子",
          "votesDisplay": "2,363票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "若林ひろき",
          "votesDisplay": "2,178票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "おぎのあやか",
          "votesDisplay": "2,163票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "やなぎさわ聡",
          "votesDisplay": "2,101票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "塚本よしひろ",
          "votesDisplay": "2,092.370票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "ゆきた政春",
          "votesDisplay": "2,060票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "のだて稔史",
          "votesDisplay": "1,995票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "ふじわら正則",
          "votesDisplay": "1,949票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "渡辺ゆういち",
          "votesDisplay": "1,907票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "せりざわ裕次郎",
          "votesDisplay": "1,886票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "吉田ゆみこ",
          "votesDisplay": "1,858票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "安藤たい作",
          "votesDisplay": "1,739票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "横山ゆかり",
          "votesDisplay": "1,730票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "こしば新",
          "votesDisplay": "1,702票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "えのした正人",
          "votesDisplay": "1,642票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "高橋のぶあき",
          "votesDisplay": "1,599.122票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "いながき孝子",
          "votesDisplay": "1547.125票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "土田英夫",
          "votesDisplay": "1,537票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "田中さやか",
          "votesDisplay": "1,525.338票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "おくの晋治",
          "votesDisplay": "1,521票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "本多たけのぶ",
          "votesDisplay": "1,448票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "ゆざわ一貴",
          "votesDisplay": "1,338票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "わたべ茂",
          "votesDisplay": "1,318票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "くぼた学",
          "votesDisplay": "1,106票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "神崎ふみえ",
          "votesDisplay": "1,103票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "くにば雄大",
          "votesDisplay": "1,101票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "宮本勇貴",
          "votesDisplay": "783票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 52,
          "name": "かわぐちめぐみ",
          "votesDisplay": "710票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 53,
          "name": "おおにし光広",
          "votesDisplay": "649票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 54,
          "name": "しばたけいや",
          "votesDisplay": "626票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 55,
          "name": "山本あやの",
          "votesDisplay": "621.799票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 56,
          "name": "野村たかし",
          "votesDisplay": "526票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 57,
          "name": "津田しんご",
          "votesDisplay": "503票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 58,
          "name": "まつざか寛之",
          "votesDisplay": "359票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/R5kugikaisenkyo/20190421201501.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/R5kugikaisenkyo/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "kucho-2022-12",
      "type": "ward-mayor",
      "title": "品川区長選挙（再選挙）",
      "electionDate": "2022-12-04",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 6,
      "electorate": "330,771",
      "voters": "107,311",
      "turnout": "32.44",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "森沢きょうこ",
          "votesDisplay": "40,695票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "石田ひでお",
          "votesDisplay": "※23,208.138票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "山本やすゆき",
          "votesDisplay": "20,054票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "西本たか子",
          "votesDisplay": "11,386票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "村川ひろかず",
          "votesDisplay": "7,042票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "石田しんご",
          "votesDisplay": "※3,113.861票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/reiwa04_1204_senkyo/20221002183434.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/reiwa04_1204_senkyo/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29",
      "subtype": "再選挙",
      "summary": "10月2日執行の区長選挙で法定得票数に達した候補者がいなかったため実施された再選挙です。"
    },
    {
      "id": "kugiho-2022-12",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙（再選挙と同日）",
      "electionDate": "2022-12-04",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 7,
      "electorate": "330,771",
      "voters": "107,285",
      "turnout": "32.43",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "沢田えみこ",
          "votesDisplay": "33,779票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "いながき孝子",
          "votesDisplay": "17,808票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "土田英夫",
          "votesDisplay": "15,799票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "おおにし光広",
          "votesDisplay": "11,083票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "ときざき直行",
          "votesDisplay": "10,635票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "かわぐちめぐみ",
          "votesDisplay": "7,278票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "しばたけいや",
          "votesDisplay": "4,914票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/reiwa04_1204_senkyo/20221002183434.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/reiwa04_1204_senkyo/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "kucho-2022-10",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2022-10-02",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 6,
      "electorate": "330,516",
      "voters": "116,403",
      "turnout": "35.22",
      "candidates": [
        {
          "result": "落選",
          "rank": 1,
          "name": "森沢きょうこ",
          "votesDisplay": "27,759票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "石田ひでお",
          "votesDisplay": "26,308票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "山本やすゆき",
          "votesDisplay": "24,669票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "西本たか子",
          "votesDisplay": "18,559票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "村川ひろかず",
          "votesDisplay": "8,279票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "おおにし光広",
          "votesDisplay": "7,821票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kucho_kugiho_senkyo_kekka_R041002/20221002183434.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kucho_kugiho_senkyo_kekka_R041002/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29",
      "summary": "法定得票数に達した候補者がなく当選人が決まらず、12月4日に再選挙が行われました。"
    },
    {
      "id": "kugiho-2022-10",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2022-10-02",
      "district": "品川区全域",
      "seats": 3,
      "candidateCount": 7,
      "electorate": "330,516",
      "voters": "116,378",
      "turnout": "35.21",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "えのした正人",
          "votesDisplay": "27,197票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "松永よしひろ",
          "votesDisplay": "22,193票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "せらく真央",
          "votesDisplay": "18,800票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "土田英夫",
          "votesDisplay": "13,379票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "いながき孝子",
          "votesDisplay": "13,360票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "神崎ふみえ",
          "votesDisplay": "11,455票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "柴田けいや",
          "votesDisplay": "5,481票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kucho_kugiho_senkyo_kekka_R041002/20221002183434.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kucho_kugiho_senkyo_kekka_R041002/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "togi-2021",
      "type": "tokyo-assembly",
      "title": "東京都議会議員選挙（品川区選挙区）",
      "electionDate": "2021-07-04",
      "district": "品川区選挙区",
      "seats": 4,
      "candidateCount": 8,
      "electorate": "333,647",
      "voters": "144,110",
      "turnout": "43.19",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "伊藤こういち",
          "votesDisplay": "23,188票",
          "party": "公明党"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "森沢きょうこ",
          "votesDisplay": "22,413票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "白石たみお",
          "votesDisplay": "20,552票",
          "party": "日本共産党"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "あべ祐美子",
          "votesDisplay": "20,087票",
          "party": "立憲民主党"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "筒井ようすけ",
          "votesDisplay": "19,696票",
          "party": "都民ファーストの会",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 6,
          "name": "田中たけし",
          "votesDisplay": "18,281票",
          "party": "自由民主党",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 7,
          "name": "沢田ひろかず",
          "votesDisplay": "16,610票",
          "party": "自由民主党"
        },
        {
          "result": "落選",
          "rank": 8,
          "name": "佐藤マサアキ",
          "votesDisplay": "804票",
          "party": "日本公益党"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/03togisen/hpg000031504.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/03togisen/hpg000031489.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "kugi-2019",
      "type": "ward-assembly",
      "title": "品川区議会議員選挙",
      "electionDate": "2019-04-21",
      "district": "品川区全域",
      "seats": 40,
      "candidateCount": 51,
      "electorate": "322,379",
      "voters": "128,053",
      "turnout": "39.72",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "高橋しんじ",
          "votesDisplay": "6,205.403票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "あべ祐美子",
          "votesDisplay": "6,069票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 3,
          "name": "西村なおこ",
          "votesDisplay": "3,641.546票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 4,
          "name": "鈴木ひろ子",
          "votesDisplay": "3,526.058票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 5,
          "name": "なかつか亮",
          "votesDisplay": "3,353票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 6,
          "name": "せお麻里",
          "votesDisplay": "3,290票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 7,
          "name": "筒井ようすけ",
          "votesDisplay": "3,163票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 8,
          "name": "あくつ広王",
          "votesDisplay": "3,053票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 9,
          "name": "こんの孝子",
          "votesDisplay": "2,980票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 10,
          "name": "石田ひでお",
          "votesDisplay": "2,960.482票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 11,
          "name": "高橋のぶあき",
          "votesDisplay": "2,911.596票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 12,
          "name": "鈴木ますみ",
          "votesDisplay": "2,910.630票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 13,
          "name": "せりざわ裕次郎",
          "votesDisplay": "2,896票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 14,
          "name": "松本ときひろ",
          "votesDisplay": "2,844票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 15,
          "name": "つる伸一郎",
          "votesDisplay": "2,817票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 16,
          "name": "西本たか子",
          "votesDisplay": "2,711票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 17,
          "name": "新妻さえ子",
          "votesDisplay": "2,688票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 18,
          "name": "木村健悟",
          "votesDisplay": "2,669票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 19,
          "name": "おくの晋治",
          "votesDisplay": "2,588票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 20,
          "name": "塚本よしひろ",
          "votesDisplay": "2,542票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 21,
          "name": "くにば雄大",
          "votesDisplay": "2,532票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 22,
          "name": "須貝ゆきひろ",
          "votesDisplay": "2,522票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 23,
          "name": "石田ちひろ",
          "votesDisplay": "2,449.168票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 24,
          "name": "鈴木博",
          "votesDisplay": "2,427.766票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 25,
          "name": "若林ひろき",
          "votesDisplay": "2,392票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 26,
          "name": "渡辺ゆういち",
          "votesDisplay": "2,291票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 27,
          "name": "安藤たい作",
          "votesDisplay": "2,215票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 28,
          "name": "本多たけのぶ",
          "votesDisplay": "2,203票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 29,
          "name": "ゆざわ一貴",
          "votesDisplay": "2,200票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 30,
          "name": "吉田ゆみこ",
          "votesDisplay": "2,195.863票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 31,
          "name": "横山ゆかり",
          "votesDisplay": "2,188票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 32,
          "name": "たけうち忍",
          "votesDisplay": "2,162票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 33,
          "name": "のだて稔史",
          "votesDisplay": "2,149票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 34,
          "name": "田中さやか",
          "votesDisplay": "2,134票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 35,
          "name": "わたべ茂",
          "votesDisplay": "2,109票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 36,
          "name": "大倉たかひろ",
          "votesDisplay": "1,994票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 37,
          "name": "まつざわ和昌",
          "votesDisplay": "1,933票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 38,
          "name": "大沢しんいち",
          "votesDisplay": "1,932票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 39,
          "name": "こしば新",
          "votesDisplay": "1,900票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "当選",
          "rank": 40,
          "name": "ふじわら正則",
          "votesDisplay": "1,898票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 41,
          "name": "タカノヨウスケ",
          "votesDisplay": "1,860票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 42,
          "name": "いとう昌宏",
          "votesDisplay": "1,843.501票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 43,
          "name": "松永よしひろ",
          "votesDisplay": "1,822票",
          "party": "―",
          "personUrl": "giin.html"
        },
        {
          "result": "落選",
          "rank": 44,
          "name": "西村柳一郎",
          "votesDisplay": "1,814.995票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 45,
          "name": "いそべしょうさい",
          "votesDisplay": "1,777票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 46,
          "name": "宗かずみ",
          "votesDisplay": "1,707票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 47,
          "name": "いながわ貴之",
          "votesDisplay": "1,513票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 48,
          "name": "くわつか透",
          "votesDisplay": "1,241票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 49,
          "name": "石田しんご",
          "votesDisplay": "1,074.990票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 50,
          "name": "よしだあつみ",
          "votesDisplay": "871.136票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 51,
          "name": "伊藤しんご",
          "votesDisplay": "450.856票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kugikai/20190421201501.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/kugikai/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "kucho-2018",
      "type": "ward-mayor",
      "title": "品川区長選挙",
      "electionDate": "2018-09-30",
      "district": "品川区全域",
      "seats": 1,
      "candidateCount": 3,
      "electorate": "322,699",
      "voters": "105,563",
      "turnout": "32.71",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "はまの健",
          "votesDisplay": "49,965票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 2,
          "name": "さとう裕彦",
          "votesDisplay": "37,607票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "西本たか子",
          "votesDisplay": "16,240票",
          "party": "―",
          "personUrl": "giin.html"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/4300930kuchosenkyo/20180914152532.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/4300930kuchosenkyo/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    },
    {
      "id": "kugiho-2018",
      "type": "ward-assembly-by",
      "title": "品川区議会議員補欠選挙",
      "electionDate": "2018-09-30",
      "district": "品川区全域",
      "seats": 2,
      "candidateCount": 5,
      "electorate": "322,699",
      "voters": "105,532",
      "turnout": "32.70",
      "candidates": [
        {
          "result": "当選",
          "rank": 1,
          "name": "せりざわ裕次郎",
          "votesDisplay": "34,377票",
          "party": "―"
        },
        {
          "result": "当選",
          "rank": 2,
          "name": "おくの晋治",
          "votesDisplay": "25,354票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 3,
          "name": "西村柳一郎",
          "votesDisplay": "14,873票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 4,
          "name": "たかの洋介",
          "votesDisplay": "14,207票",
          "party": "―"
        },
        {
          "result": "落選",
          "rank": 5,
          "name": "よしだあつみ",
          "votesDisplay": "10,814票",
          "party": "―"
        }
      ],
      "sources": [
        {
          "label": "開票結果（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/4300930kuchosenkyo/20180914152532.html"
        },
        {
          "label": "投票状況（公式）",
          "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kuseizyoho-sensei/kuseizyoho-senkyo/kuseizyoho-senkyo-kekka/4300930kuchosenkyo/20180914150345.html"
        }
      ],
      "verifiedAt": "2026-07-29"
    }
  ]
};
