// 品川区議会DB データファイル（「品川の歴史」の人物事典）
//
// 時代区分・地区・カテゴリー・確実性・出典の語彙は data/rekishi.js が正。
//
// 生没年が確定できないときは null のままにし、yearText に分かる範囲で書く。
// 「品川区との関係」は shinagawaRelation に短く書く。墓所や旧居など、
// 区内のどこと結びつく人物なのかが一目で分かるようにするため。
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.rekishiPeople = {
  "schemaVersion": 1,
  "updatedAt": "2026-11-24",
  "note": "品川区にゆかりのある人物です。出典を確認できたものだけを掲載しています。",
  "items": [
    {
      "id": "pe-shibukawa-shunkai",
      "name": "渋川春海",
      "kana": "しぶかわしゅんかい",
      "summary": "幕府の初代天文方。貞享元年に改暦を建議し、貞享暦が採用された。墓は北品川の東海寺大山墓地にある。",
      "description": "幕府碁師・安井算哲の子として京都に生まれ、14歳で父の跡を継いで碁所を勤め、二代目算哲と称した。元禄15年に姓を渋川と改めている。国史学と神道を学ぶとともに天文学にも通じ、それまで使われていた宣明暦の改暦を幕府に建議した。新しい貞享暦は建議の翌年から実施された。",
      "birthYear": null,
      "deathYear": 1715,
      "yearText": "正徳5年（1715年）に77歳で没",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "shinagawaRelation": "墓が北品川の東海寺大山墓地にあり、区の指定史跡となっている。",
      "certainty": "fact",
      "relatedPlaces": ["pl-a4e970452b"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第6号「渋川春海墓（追贈記念塔を含む）」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-yamauchi-toyoshige",
      "name": "山内豊信（容堂）",
      "kana": "やまうちとよしげ",
      "summary": "土佐高知藩15代藩主。幕末の四賢侯の一人。大井村の下屋敷に蟄居し、没後は大井村下総山に葬られた。",
      "description": "文政10年に分家南屋敷の山内豊著の長子として生まれ、嘉永元年に宗家を継いで藩主となった。人材を登用して藩政の刷新を行い、松平慶永・島津斉彬・伊達宗城と国政を論じたことから「幕末の四賢侯」と並び称される。公武合体を理念とした行動が幕閣に忌避されて隠居し、品川鮫洲の別邸を経て大井村の下屋敷に蟄居した。文久2年に政治の場へ復帰し、14代将軍家茂に上洛を勧め、15代将軍慶喜には大政奉還を建議した。",
      "birthYear": 1827,
      "deathYear": 1872,
      "yearText": "文政10年（1827年）〜明治5年（1872年）",
      "era": "kinsei",
      "areas": ["oi"],
      "shinagawaRelation": "大井村の下屋敷に蟄居し、没後は大井村下総山（現在の立会小学校の校庭付近）に葬られた。墓は昭和29年に現在地へ移された。",
      "certainty": "fact",
      "relatedPlaces": ["pl-85ffa8153f"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第11号「山内豊信（容堂）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-matsudaira-yoshinaga",
      "name": "松平慶永（春嶽）",
      "kana": "まつだいらよしなが",
      "summary": "福井藩15代藩主。幕政改革と公武合体に尽力し、明治政府では民部卿・大蔵卿を歴任した。墓は南品川の海晏寺後丘にある。",
      "description": "文政11年に田安斉匡の子として生まれ、天保9年に福井藩主となった。「春嶽」は号である。将軍継嗣問題では一橋慶喜を擁して大老井伊直弼と対立し、一時隠居に追い込まれたが、桜田門外の変の後に政治へ復帰し、参勤交代の緩和などの幕政改革に着手した。朝廷と幕府の間の調停にも努めている。明治3年に公職を退いた。",
      "birthYear": 1828,
      "deathYear": 1890,
      "yearText": "文政11年（1828年）〜明治23年（1890年）6月3日",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "shinagawaRelation": "墓が南品川の海晏寺後丘にあり、区の指定史跡となっている。",
      "certainty": "fact",
      "relatedPlaces": ["pl-16a69cbab7", "pl-0eb88578f1"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第9号「松平慶永（春嶽）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-itagaki-taisuke",
      "name": "板垣退助",
      "kana": "いたがきたいすけ",
      "summary": "自由民権運動を推進し、自由党の総裁を務めた。墓は品川神社に接する板垣家墓域にある。",
      "description": "天保8年に土佐国中島町で生まれた。江戸勤番、江戸藩邸の会計職を経て、文久2年に側用人となり藩主山内容堂を補佐した。明治維新後は自由民権運動を推進し、自由党を結成して総裁となり各地を遊説した。帝国議会の開設後は自由党総理として議会で活躍し、第二次伊藤内閣および大隈内閣では内務大臣を務めた。晩年は政界を退いた。",
      "birthYear": 1837,
      "deathYear": 1919,
      "yearText": "天保8年（1837年）〜大正8年（1919年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "shinagawaRelation": "墓が品川神社の裏手にある。もとは東海寺の塔頭・高源院の墓地の一部で、高源院の移転後も板垣家の墓域だけが残された。",
      "certainty": "fact",
      "relatedPlaces": ["pl-8d095e31ad", "pl-548dab732d"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第4号「板垣退助墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-ito-hirobumi",
      "name": "伊藤博文",
      "kana": "いとうひろぶみ",
      "summary": "初代内閣総理大臣。通算4回首相を務めた。自宅が大井にあったことから、墓は現在の西大井に営まれた。",
      "description": "天保12年に萩藩の下級武士の子として生まれ、幼名は俊輔。吉田松陰に師事して松下村塾に学んだ。初めは攘夷を唱えたが、木戸孝允に随って英国へ留学し、帰国後は開国・富国強兵論に転じた。明治元年に参与となり、工部大輔・参議・工部卿など新政府の要職を歴任し、岩倉具視らとともに欧米諸国の制度を視察した。明治15年に三たび欧州へ赴いて憲法制度や行政組織を視察し、内閣制度の基礎を築いて明治18年に初代内閣総理大臣となった。明治42年8月、ロシアのココフツォフ蔵相と会見するため旧満州のハルビンを訪れた際、駅頭で狙撃され死亡した。同年11月に国葬が行われた。",
      "birthYear": 1841,
      "deathYear": 1909,
      "yearText": "天保12年（1841年）〜明治42年（1909年）10月26日",
      "era": "meiji",
      "areas": ["oi"],
      "shinagawaRelation": "自宅が大井にあったことから、当時の大井村谷垂（現在の西大井）に葬られた。墓は区の指定史跡となっている。",
      "certainty": "fact",
      "relatedPlaces": ["pl-45b14d4676"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第19号「伊藤博文墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-yuri-kimimasa",
      "name": "由利公正",
      "kana": "ゆりきみまさ",
      "summary": "福井藩士から明治政府の参与となり、五箇条の誓文の原案を起草した。安政元年に品川台場の築造に従事している。",
      "description": "文政12年に越前国福井藩士・三岡義和の子として生まれ、はじめ三岡八郎と称した。維新後に祖先の旧姓へ復して由利公正と名乗っている。弘化4年に横井小楠に学ぶなどして頭角をあらわし、藩札の発行と専売制を結びつけた殖産興業政策で幕末の福井藩財政を立て直した。嘉永6年に家督を継ぎ、翌安政元年には黒船来航により急務とされた品川台場の築造に従事した。藩内の兵制改革では橋本佐内とともに活躍している。明治元年に参与へ任じられ、五箇条の誓文の原案を起草するとともに、会計基立金の募集や太政官札の発行に関わり、新政府財政の基礎をつくった。明治4年に東京府知事となり、首都となった東京の整備に実績を上げ、のちに元老院議官、貴族院議員を務めた。",
      "birthYear": 1829,
      "deathYear": 1909,
      "yearText": "文政12年（1829年）〜明治42年（1909年）4月28日",
      "era": "meiji",
      "areas": ["shinagawa"],
      "shinagawaRelation": "安政元年に品川台場の築造に従事した。墓は南品川の海晏寺後丘にあり、区の指定史跡となっている。",
      "certainty": "fact",
      "relatedPlaces": ["pl-729d15df9e"],
      "variants": [
        {
          "claim": "墓碑銘の翻刻は没年を「明治十二年」、生年を「文政十五年」と記しており、解説本文と合わない。",
          "ref": "sgw-bunkazai",
          "locator": "品川地区の指定文化財 史跡第10号「由利公正墓」の銘文"
        }
      ],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第10号「由利公正墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "pe-momochuken-kumoemon",
      "name": "桃中軒雲右衛門",
      "kana": "とうちゅうけんくもえもん",
      "summary": "明治・大正期の浪花節の名手で、浪花節中興の祖といわれる。墓は南品川の天妙国寺にある。",
      "description": "得意の演題は赤穂浪士の事跡を語る「義士銘々伝」。寄席から劇場へ進出するなどして浪曲界の黄金時代を築き、浪曲史に大きな足跡を残した。",
      "birthYear": 1873,
      "deathYear": 1916,
      "yearText": "1873年〜1916年",
      "era": "meiji",
      "areas": ["shinagawa"],
      "shinagawaRelation": "墓が南品川の天妙国寺にあり、平成19年に区の指定史跡となった。",
      "certainty": "fact",
      "relatedPlaces": ["pl-1e1564b7a2", "pl-11e5d5f153"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第24号「桃中軒雲右衛門の墓」" }],
      "verifiedAt": "2026-11-19"
    },

      {
        "id": "pe-takuan-soho",
        "name": "沢庵宗彭",
        "kana": "たくあんそうほう",
        "summary": "三代将軍徳川家光が帰依した僧。家光は沢庵のために北品川に東海寺を建立した。",
        "description": "寛永15年、家光は沢庵のために東海寺を建てました。寺地に隣接する品川神社は境内の一部が東海寺の用地となり、幕府は替地を下付して品川神社を東海寺の鬼門除けの鎮守としています。",
        "birthYear": null,
        "deathYear": null,
        "yearText": "生没年はこの資料では確認できていません",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "shinagawaRelation": "家光が沢庵のために建てた東海寺が北品川にあり、墓は東海寺大山墓地にあって東京都の指定史跡となっている。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-f0dec3262a"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 建造物第1号「品川神社石造鳥居並水盤」、区内にある都および国の指定文化財「沢庵墓」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-tenkai",
        "name": "天海僧正",
        "kana": "てんかいそうじょう",
        "summary": "徳川家康の信任が厚く、江戸上野の寛永寺や養玉院の開山となった僧。",
        "description": "寛永21年に大仏師慶雄が造った木造天海僧正坐像が養玉院に伝わります。像が造られる前年に108歳の高齢で没し、慈眼大師と諡されました。",
        "birthYear": 1536,
        "deathYear": 1643,
        "yearText": "天文5年（1536年）〜寛永20年（1643年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "西大井の養玉院の開山。同院には寛永21年造立の木造天海僧正坐像が伝わる。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-84abe86d27"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造天海僧正坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-matsuo-basho",
        "name": "松尾芭蕉",
        "kana": "まつおばしょう",
        "summary": "江戸時代の俳人。泊船寺には芭蕉堂があり、百回忌に境内の柳の木で刻まれたと伝えられる肖像彫刻が伝わる。",
        "description": "正保元年に伊賀上野で生まれ、幼くして貞門や談林に俳諧を学びました。のち江戸に出て深川に泊船堂（のちの芭蕉庵）を建てて俳諧に精進し、旅に明け暮れて多くの名句を残すとともに、服部嵐雪・宝井其角・向井去来など多数の門人を育てました。元禄7年の辞世の句は「旅に病んで夢は枯れ野をかけめぐる」です。",
        "birthYear": 1644,
        "deathYear": 1694,
        "yearText": "正保元年（1644年）〜元禄7年（1694年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "東大井の泊船寺に芭蕉堂があり、寛政5年の百回忌に俳人の石河積翠が境内の柳の木で刻んだと伝えられる木造松尾芭蕉坐像が伝わる。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-9250914617"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造松尾芭蕉坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-hattori-ransetsu",
        "name": "服部嵐雪",
        "kana": "はっとりらんせつ",
        "summary": "芭蕉の高弟で、其角とともに蕉門の双璧と称された俳人。泊船寺に肖像彫刻が伝わる。",
        "description": "承応3年に淡路国で生まれたと伝えられます。幼いころ父に従って江戸で諸大名に仕え、武士の生活を送りました。延宝年間に芭蕉の門に入って俳諧師となり、芭蕉から「草庵に桃桜あり、門人に其角・嵐雪あり」と賞されています。",
        "birthYear": 1654,
        "deathYear": 1707,
        "yearText": "承応3年（1654年）〜宝永4年（1707年）10月",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "東大井の泊船寺に木造服部嵐雪坐像が伝わる。",
        "certainty": "fact",
        "variants": [
          {
            "claim": "生地は淡路国と伝えられるが、江戸の生まれとする説もあると出典に併記されている。",
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造服部嵐雪坐像」"
          }
        ],
        "relatedPlaces": [
          "pl-9250914617"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造服部嵐雪坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-takarai-kikaku",
        "name": "宝井其角",
        "kana": "たからいきかく",
        "summary": "芭蕉の高弟で、嵐雪とともに蕉門の双璧と称された俳人。泊船寺に肖像彫刻が伝わる。",
        "description": "寛文元年に江戸下町の町医師・竹下東順の子として生まれ、医学のほか儒学・詩・易・禅・書・画を学ぶ博学でした。延宝5年、17歳のころに芭蕉の門をたたいて頭角をあらわします。大酒豪であることが災いし、宝永4年に47歳で没しました。与謝蕪村は孫弟子にあたります。",
        "birthYear": 1661,
        "deathYear": 1707,
        "yearText": "寛文元年（1661年）〜宝永4年（1707年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "東大井の泊船寺に、文化5年に造られた木造宝井其角坐像が伝わる。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-9250914617"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造宝井其角坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-hakugyu-zenji",
        "name": "白牛禅師（山奴）",
        "kana": "はくぎゅうぜんじ",
        "summary": "下総国出身の俳人。文化年間に泊船寺の芭蕉堂に寓居して俳諧に没頭し、出家して白牛禅師と称した。",
        "description": "のちに二世杜格斎を名乗り、大井村の名主・大野五蔵惟図（俳号は景山）を弟子としました。文政3年に没し、その翌年、景山の発起で境内に句碑「漁火に鳥の飛行霜夜かな」が建てられています。天保15年には品川妙国寺門前の仏師・大場祐造が肖像彫刻を刻みました。",
        "birthYear": null,
        "deathYear": 1820,
        "yearText": "文政3年（1820年）に没",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "東大井の泊船寺の芭蕉堂に寓居し、同寺に句碑と木造白牛禅師坐像が伝わる。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-9250914617"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻第10号「木造白牛禅師坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-ono-keizan",
        "name": "大野景山（大野五蔵惟図）",
        "kana": "おおのけいざん",
        "summary": "大井村の名主で俳人。白牛禅師の弟子となり、三世杜格斎として一時は数百人の弟子を指導したという。",
        "description": "師の白牛禅師が没した翌年、その句碑を泊船寺の境内に建てる発起人となりました。大井の水神の石祠は文化5年に大井村の村民が寄進したもので、その願主として時の名主・大野貫蔵惟一とその子である惟図（のちの名主、俳人景山）の名が刻まれています。区史は、伊藤景湖の写本から、景山が大井とその周辺の地誌『南浦地名考』を編んだことを確認しました。",
        "birthYear": null,
        "deathYear": 1847,
        "yearText": "弘化4年（1847年）10月19日没",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "shinagawaRelation": "大井村の名主。泊船寺を舞台に俳諧を指導し、大井の水神の石祠の寄進にも名が残る。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-9250914617",
          "pl-7c41971c1d"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻第10号「木造白牛禅師坐像」、史跡「大井の水神」"
          },
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜格斎景山」1077〜1080頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "pe-ito-keiko",
        "name": "伊藤景湖（伊藤清一郎綏定）",
        "kana": "いとうけいこ",
        "summary": "下蛇窪村の名主で俳人。自邸で子どもたちを教え、大野景山らと交流した。",
        "description": "俳号は杜松斎景湖。品川領16か村の寄場名主も務め、自邸には寺子屋のほか、弓術や柔術などを学ぶ場を設けた。品川台場の築造事務に携わった際には、工事の様子を図入りの日記に記録した。景山が編んだ地誌の写本も残した。",
        "birthYear": 1812,
        "deathYear": 1867,
        "yearText": "文化9年（1812年）〜慶応3年（1867年）",
        "era": "kinsei",
        "areas": [
          "ebara",
          "oi",
          "shinagawa"
        ],
        "shinagawaRelation": "下蛇窪村で子どもの教育にあたり、大井村の俳人と交流した。",
        "certainty": "fact",
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜松斎景湖」1080〜1083頁、「杜格斎景山」1078〜1079頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "pe-yamaji-jirobe",
        "name": "山路治郎兵衛（竹翁）",
        "kana": "やまじじろべえ",
        "summary": "戸越村に孟宗竹を植え、品川の筍栽培の始まりをつくった商人。",
        "description": "名を勝孝といい、名字帯刀を許された商人でした。江戸鉄砲州で廻船問屋を営みながら家業を店の者に任せ、戸越村の別邸に移っています。元文元年に薩摩藩島津家が琉球から孟宗竹を入手したことから竹の栽培に興味を持ち、寛政元年に芝の薩摩屋敷から数株を入手して宅地付近に植え付けました。改良を加えて数年後には庭一面に繁殖させ、付近の農家にも勧めたため、戸越村から目黒にかけて竹林が広がり、竹と筍は関東大震災のころまでこの地域の特産品となりました。",
        "birthYear": null,
        "deathYear": 1805,
        "yearText": "文化2年（1805年）ごろ没",
        "era": "kinsei",
        "areas": [
          "ebara"
        ],
        "shinagawaRelation": "戸越村の別邸に孟宗竹を植え、周辺の村々へ筍栽培を広めた。小山に孟宗筍栽培記念碑がある。",
        "certainty": "fact",
        "relatedPlaces": [
          "pl-bf6495f367"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "荏原地区の指定文化財 史跡「孟宗筍栽培記念碑」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "pe-kamo-mabuchi",
        "name": "賀茂真淵",
        "kana": "かものまぶち",
        "summary": "江戸時代の国学者。墓は北品川の東海寺大山墓地にあり、国の史跡に指定されている。",
        "description": "国学の大成者として知られる。墓所は北品川4丁目の東海寺大山墓地内にあり、大正15年に国の史跡に指定された。昭和28年には、品川に住んだ作家の吉川英治が、この墓の補修のための募金活動に協力している。",
        "birthYear": 1697,
        "deathYear": 1769,
        "yearText": "元禄10年（1697年）〜明和6年（1769年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "shinagawaRelation": "墓が北品川4丁目の東海寺大山墓地にあり、国の指定史跡となっている。",
        "certainty": "fact",
        "relatedPlaces": ["pl-1a93e184b8"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-izu-chohachi",
        "name": "伊豆長八",
        "kana": "いずのちょうはち",
        "summary": "鏝絵で知られる左官。本名は入江長八。寄木神社の鏝絵が品川区の指定文化財になっている。",
        "description": "現在の静岡県松崎町の農家に生まれ、12歳で左官の弟子となった。27歳のとき日本橋茅場町の薬師堂の鏝絵細工を任され、名を知られるようになる。明治になってからも制作を続けた。品川区には、区の指定文化財である寄木神社の鏝絵のほか、善福寺本堂の軒下に竜の細工が残る。",
        "birthYear": 1815,
        "deathYear": 1889,
        "yearText": "文化12年（1815年）〜明治22年（1889年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "shinagawaRelation": "寄木神社に鏝絵「天細女命功績図」（品川区指定文化財）、善福寺本堂の軒下に竜の細工が残る。",
        "certainty": "fact",
        "relatedPlaces": ["pl-bdeb7c9ebc", "pl-26ec6dd1d6"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-fukuzawa-yukichi",
        "name": "福沢諭吉",
        "kana": "ふくざわゆきち",
        "summary": "慶応義塾の創立者。かつて上大崎に墓があり、跡地に記念碑が建っている。",
        "description": "上大崎の墓地跡に「福沢諭吉先生永眠之地」の記念碑が建てられている。",
        "birthYear": 1835,
        "deathYear": 1901,
        "yearText": "天保5年（1835年）〜明治34年（1901年）",
        "era": "meiji",
        "areas": ["osaki"],
        "shinagawaRelation": "上大崎の墓地跡に「福沢諭吉先生永眠之地」の記念碑がある。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-kojima-iken",
        "name": "児島惟謙",
        "kana": "こじまいけん",
        "summary": "大審院長。現在の大井6丁目に邸宅を構え、没後は南品川の海晏寺に葬られた。",
        "description": "司法官として知られる。のちに現在の品川区大井6丁目に邸宅を構え、地元の名士や財界人と親交を深めた。明治41年に72歳で亡くなり、南品川の海晏寺に葬られた。",
        "birthYear": 1837,
        "deathYear": 1908,
        "yearText": "天保8年（1837年）〜明治41年（1908年）",
        "era": "meiji",
        "areas": ["oi"],
        "shinagawaRelation": "大井6丁目に邸宅を構え、墓は南品川の海晏寺にある。",
        "certainty": "fact",
        "relatedPlaces": ["pl-0eb88578f1"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-morse",
        "name": "モース博士",
        "kana": "もーすはかせ",
        "summary": "大森貝塚を発見したアメリカの動物学者。本名エドワード・シルヴェスター・モース。",
        "description": "アメリカ合衆国メイン州ポートランドの生まれ。子どものころから貝類を集めていた。明治10年6月17日、腕足類の研究のため来日し、横浜港に着いた翌々日、東京へ向かう汽車が大森駅を出発した直後に、線路脇の切通しに白い貝殻が露出しているのを見つけた。これが大森貝塚の発見である。大森貝塚の周辺には現在、2つの記念碑が建っている。",
        "birthYear": 1838,
        "deathYear": 1925,
        "yearText": "天保9年（1838年）〜大正14年（1925年）",
        "era": "meiji",
        "areas": ["oi"],
        "shinagawaRelation": "明治10年に大森貝塚を発見した。大森貝塚は大井6丁目にあり、国の史跡に指定されている。",
        "certainty": "fact",
        "relatedPlaces": ["pl-be2e1fa0fd"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-kume-kunitake",
        "name": "久米邦武",
        "kana": "くめくにたけ",
        "summary": "歴史学者。上大崎の邸宅跡に久米美術館が建っている。",
        "description": "かつて邸宅があった品川区上大崎の敷地には、現在、久米美術館が建っている。長男で画家の久米桂一郎の作品とともに、邦武の原稿や著書が収められている。",
        "birthYear": 1839,
        "deathYear": 1931,
        "yearText": "天保10年（1839年）〜昭和6年（1931年）",
        "era": "meiji",
        "areas": ["osaki"],
        "shinagawaRelation": "上大崎の邸宅跡に久米美術館があり、原稿や著書が収められている。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-inoue-masaru",
        "name": "井上勝",
        "kana": "いのうえまさる",
        "summary": "日本の鉄道の基礎を築いた技術官僚。遺言により東海寺大山墓地に葬られた。",
        "description": "長州藩士の子として現在の山口県萩市に生まれ、イギリスで鉱山と鉄道の技術を学んだ。国内の鉄道敷設に尽力し、退官後は汽車製造会社を創設した。遺骨は「死後もなお鉄道を見守っていたい」という本人の意向により、東海道線と山手線に挟まれた東海寺大山墓地の一角に葬られている。",
        "birthYear": 1843,
        "deathYear": 1910,
        "yearText": "天保14年（1843年）〜明治43年（1910年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "shinagawaRelation": "墓が北品川の東海寺大山墓地にあり、東海道線と山手線に挟まれた場所にある。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-masuda-takashi",
        "name": "益田孝",
        "kana": "ますだたかし",
        "summary": "三井物産の初代社長。御殿山の邸宅に茶室と陶器窯を設けた茶人でもあった。",
        "description": "佐渡に生まれ、明治9年の三井物産会社設立にともない社長となった。鈍翁の号を持つ茶人でもあり、御殿山にあった広大な邸宅内に茶室や陶器窯を設けてお庭焼を楽しんだ。日本や東洋の古美術の膨大な収集でも知られる。",
        "birthYear": 1848,
        "deathYear": 1938,
        "yearText": "弘化5年（1848年）〜昭和13年（1938年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "shinagawaRelation": "北品川の御殿山に広大な邸宅を構え、茶室と陶器窯を設けていた。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-josiah-conder",
        "name": "ジョサイア・コンドル",
        "kana": "じょさいあこんどる",
        "summary": "イギリスの建築家。旧島津家本邸（清泉女子大学本館）を設計した。",
        "description": "ロンドンに生まれ、24歳でお雇い外国人教師として招かれ、工部大学校造家学科（現在の東京大学工学部建築学科）で教えた。鹿鳴館やニコライ堂が代表作として知られる。旧鹿児島藩主の島津公爵邸として建てられた清泉女子大学の本館も、彼の作品である。",
        "birthYear": 1852,
        "deathYear": 1920,
        "yearText": "嘉永5年（1852年）〜大正9年（1920年）",
        "era": "meiji",
        "areas": ["osaki"],
        "shinagawaRelation": "東五反田の旧島津家本邸（清泉女子大学本館）を設計した。同邸は令和元年に国の重要文化財に指定されている。",
        "certainty": "fact",
        "relatedPlaces": ["pl-a6c7b29cf9"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-takagi-masatoshi",
        "name": "高木正年",
        "kana": "たかぎまさとし",
        "summary": "南品川に生まれた衆議院議員。生家は南品川宿の総代を務めた質商。",
        "description": "荏原郡南品川に生まれた。生家は老舗の質商で、父の半兵衛は南品川宿の宿場総代として宿場の発展に尽くした。墓所のある南品川1丁目の妙蓮寺には、門下生らによって胸像が建てられている。",
        "birthYear": 1857,
        "deathYear": 1934,
        "yearText": "安政4年（1857年）〜昭和9年（1934年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "shinagawaRelation": "南品川の生まれ。墓は南品川1丁目の妙蓮寺にあり、境内に胸像が建つ。",
        "certainty": "fact",
        "relatedPlaces": ["pl-20728da0c5"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-ozaki-yukio",
        "name": "尾崎行雄",
        "kana": "おざきゆきお",
        "summary": "「憲政の神様」と呼ばれた政治家。品川で約27年間を暮らした。",
        "description": "神奈川県津久井町に生まれ、17歳で慶応義塾に入塾した。明治36年から45年まで東京市長を務め、大正の憲政擁護運動では先頭に立った。品川での生活は約27年間に及び、娘たちと自宅の周辺をよく散策し、近隣の人々とも交流があった。",
        "birthYear": 1858,
        "deathYear": 1954,
        "yearText": "安政5年（1858年）〜昭和29年（1954年）",
        "era": "meiji",
        "areas": ["ward"],
        "shinagawaRelation": "品川で約27年間を暮らした。出典には区内のどこかまでは書かれていない。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-tsuda-umeko",
        "name": "津田梅子",
        "kana": "つだうめこ",
        "summary": "女子教育の先駆者。晩年の10年を北品川の御殿山で過ごした。",
        "description": "江戸牛込南町に生まれ、明治4年に北海道開拓使の女子留学生の一員として7歳で渡米した。日本で最初の女子留学生であり、5人のうち最年少だった。大正8年に北品川御殿山の新居に移り、療養をしながら晩年の10年をこの地で過ごした。",
        "birthYear": 1864,
        "deathYear": 1929,
        "yearText": "元治元年（1864年）〜昭和4年（1929年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "shinagawaRelation": "大正8年に北品川の御殿山へ移り、晩年の10年をこの地で過ごした。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-emi-suiin",
        "name": "江見水蔭",
        "kana": "えみすいいん",
        "summary": "小説家。遺跡の発掘にも関心を持ち、大井の権現台貝塚を発掘した。",
        "description": "明治33年から品川に住み始め、区内で何度か転居しながら、松山で客死するまで品川で暮らした。遺跡の発掘にも興味を持ち、大井の権現台貝塚の発掘を行って、遺跡探訪や発掘の記録を多数残している。",
        "birthYear": 1869,
        "deathYear": 1934,
        "yearText": "明治2年（1869年）〜昭和9年（1934年）",
        "era": "meiji",
        "areas": ["oi"],
        "shinagawaRelation": "明治33年から亡くなるまで品川に住み、大井の権現台貝塚を発掘した。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-hoshi-hajime",
        "name": "星一",
        "kana": "ほしはじめ",
        "summary": "星製薬の創業者。西五反田に近代的な工場を建てた。",
        "description": "明治43年に星製薬株式会社を設立し、西五反田に近代的な工場を建設した。工場の跡地は現在、東京卸売センター（TOC）となっている。作家の星新一は長男。",
        "birthYear": 1873,
        "deathYear": 1951,
        "yearText": "明治6年（1873年）〜昭和26年（1951年）",
        "era": "taisho",
        "areas": ["osaki"],
        "shinagawaRelation": "西五反田に星製薬の工場を建てた。跡地は現在の東京卸売センター（TOC）。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-motoyama-tekishu",
        "name": "本山荻舟",
        "kana": "もとやまてきしゅう",
        "summary": "食文化の研究で知られる文筆家。昭和16年から南品川の天妙国寺境内に住んだ。",
        "description": "昭和16年に京橋の店も自宅も引き払い、家族とともに南品川の天妙国寺境内へ転居した。地元の人々と交流を深め、東品川の寄木神社境内に建つ「江戸漁業根元之碑」の撰文を書いている。遺族によって刊行された『飲食辞典』には、地元猟師町の普段の食事だった「品川飯」や「品川汁」も取り上げられている。",
        "birthYear": 1881,
        "deathYear": 1958,
        "yearText": "明治14年（1881年）〜昭和33年（1958年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "shinagawaRelation": "南品川の天妙国寺境内に住み、寄木神社の「江戸漁業根元之碑」の撰文を書いた。",
        "certainty": "fact",
        "relatedPlaces": ["pl-bdeb7c9ebc", "pl-11e5d5f153"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-hasegawa-shin",
        "name": "長谷川伸",
        "kana": "はせがわしん",
        "summary": "股旅物で知られる作家。9歳のとき南品川に引き取られ、城南小学校に編入した。",
        "description": "9歳のとき行き場が無くなり、品川の二日五日市村（現在の南品川5丁目付近）で住み込みで働く祖母のもとへ引き取られ、城南小学校の3年生に編入した。のちに新鷹会を主宰し、池波正太郎らを育てている。",
        "birthYear": 1884,
        "deathYear": 1963,
        "yearText": "明治17年（1884年）〜昭和38年（1963年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "shinagawaRelation": "9歳のとき南品川5丁目付近に引き取られ、城南小学校に通った。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-takamura-chieko",
        "name": "高村智恵子",
        "kana": "たかむらちえこ",
        "summary": "洋画家。『青鞜』の表紙絵を描いた。晩年を南品川のゼームス坂病院で過ごした。",
        "description": "明治44年、大学の同窓生だった平塚らいてうの依頼で、日本初の女性による文学雑誌『青鞜』の表紙絵を手がけた。昭和10年、自宅での療養が難しくなり、南品川のゼームス坂病院に入院した。病院のあった敷地の一角には、品川郷土の会によって詩碑が建てられている。",
        "birthYear": 1886,
        "deathYear": 1938,
        "yearText": "明治19年（1886年）〜昭和13年（1938年）",
        "era": "taisho",
        "areas": ["shinagawa"],
        "shinagawaRelation": "昭和10年から南品川のゼームス坂病院に入院した。跡地の一角に詩碑が建つ。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-hagiwara-sakutaro",
        "name": "萩原朔太郎",
        "kana": "はぎわらさくたろう",
        "summary": "詩人。大正14年に前橋から上京し、大井町の借家に住んだ。「大井町」と題した作品がある。",
        "description": "大正14年、妻子とともに前橋から上京して大井町の借家に住んだ。すでに『月に吠える』『青猫』を刊行していたが、大井町では原稿料収入もなく、市中を歩きまわることが多かったという。そうした暮らしのなかで「大井町」と題した作品を残している。",
        "birthYear": 1886,
        "deathYear": 1942,
        "yearText": "明治19年（1886年）〜昭和17年（1942年）",
        "era": "taisho",
        "areas": ["oi"],
        "shinagawaRelation": "大正14年に大井町の借家に住み、「大井町」と題した作品を残した。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-origuchi-shinobu",
        "name": "折口信夫",
        "kana": "おりぐちしのぶ",
        "summary": "民俗学者・歌人。昭和3年から亡くなるまでの25年間を西大井で過ごした。",
        "description": "昭和3年に住居を西大井3丁目へ移し、以後、亡くなるまでの25年間、研究活動のもっとも充実した時期をこの地で過ごした。",
        "birthYear": 1887,
        "deathYear": 1953,
        "yearText": "明治20年（1887年）〜昭和28年（1953年）",
        "era": "showa-pre",
        "areas": ["oi"],
        "shinagawaRelation": "昭和3年から昭和28年に亡くなるまで、西大井3丁目に住んだ。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-kawai-eijiro",
        "name": "河合栄治郎",
        "kana": "かわいえいじろう",
        "summary": "経済学者。大正9年から大井庚塚町（現在の大井7丁目）に住んだ。",
        "description": "大正9年6月に母校の東京帝国大学経済学部助教授となり、同じ年、荏原郡大井町の大井庚塚町（現在の品川区大井7丁目）に居を構えた。",
        "birthYear": 1891,
        "deathYear": 1944,
        "yearText": "明治24年（1891年）〜昭和19年（1944年）",
        "era": "showa-pre",
        "areas": ["oi"],
        "shinagawaRelation": "大正9年から大井7丁目（当時の大井庚塚町）に住んだ。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-sugino-yoshiko",
        "name": "杉野芳子",
        "kana": "すぎのよしこ",
        "summary": "ドレスメーカー女学院の創立者。学校を上大崎に移して洋裁教育を広げた。",
        "description": "千葉県に生まれ、千葉高等女学校を出て鉄道省に就職したのち、小学校教師を経て大正2年に単身でアメリカへ渡った。日本人の体型に合う既製服が無いなかで洋裁を習い、帰国後に現在の西新橋でドレスメーカー・スクールを開校、同じ年の11月に品川区上大崎へ移してドレスメーカー女学院とした。",
        "birthYear": 1892,
        "deathYear": 1978,
        "yearText": "明治25年（1892年）〜昭和53年（1978年）",
        "era": "showa-pre",
        "areas": ["osaki"],
        "shinagawaRelation": "上大崎にドレスメーカー女学院を開いた。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-yoshikawa-eiji",
        "name": "吉川英治",
        "kana": "よしかわえいじ",
        "summary": "『宮本武蔵』などで知られる作家。昭和28年に北品川の御殿山へ転居した。",
        "description": "昭和28年、子どもたちの進学と通学のため、一家で吉野村から品川区北品川の御殿山に建つ洋館へ転居した。同じ年の12月に「品川文化人クラブ」が結成されると会長に就任し、北品川の東海寺大山墓地にある国指定史跡・賀茂真淵の墓の補修工事のため、募金活動などに協力している。",
        "birthYear": 1892,
        "deathYear": 1962,
        "yearText": "明治25年（1892年）〜昭和37年（1962年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "shinagawaRelation": "昭和28年から北品川の御殿山に住み、品川文化人クラブの会長として賀茂真淵墓の補修に協力した。",
        "certainty": "fact",
        "relatedPlaces": ["pl-1a93e184b8"],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-ito-shinsui",
        "name": "伊東深水",
        "kana": "いとうしんすい",
        "summary": "美人画で知られる日本画家。上大崎の隆崇院本堂の天井画を描いた。",
        "description": "東京市深川区に生まれ、水彩画家の弟子に出会って絵を学び始めた。明治45年の巽画会展で初入選。女性を描いてその時代の風俗を後世に伝えることが自らの使命だと考えていたが、肖像画のほか花鳥や風景も手がけた。上大崎の隆崇院本堂の天井には、中央に深水の「牡丹唐獅子図」、その周囲に深水一門による花の絵が描かれている。",
        "birthYear": 1898,
        "deathYear": 1972,
        "yearText": "明治31年（1898年）〜昭和47年（1972年）",
        "era": "showa-pre",
        "areas": ["osaki"],
        "shinagawaRelation": "上大崎の隆崇院本堂の天井に「牡丹唐獅子図」を描いた。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-isomura-eiichi",
        "name": "磯村英一",
        "kana": "いそむらえいいち",
        "summary": "都市社会学者。荏原郡品川町の御殿山で育ち、品川尋常小学校を卒業した。",
        "description": "東京市芝区三田に生まれた。母は『報知新聞』の記者を務めた磯村春子。荏原郡品川町の御殿山（現在の北品川）で育ち、品川尋常小学校（現在の品川区立品川学園）を卒業した。東京市社会局で社会調査に従事したのち、昭和26年に東京都立大学へ移り、スラムや盛り場の調査から都市論を体系化した。",
        "birthYear": 1903,
        "deathYear": 1997,
        "yearText": "明治36年（1903年）〜平成9年（1997年）",
        "era": "showa-post",
        "areas": ["shinagawa"],
        "shinagawaRelation": "北品川の御殿山で育ち、品川尋常小学校（現在の品川学園）を卒業した。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-sakaguchi-ango",
        "name": "坂口安吾",
        "kana": "さかぐちあんご",
        "summary": "『堕落論』などで知られる作家。若いころ数か月を大井町で過ごした。",
        "description": "荏原郡大井町字元芝に移ったのは大正14年の初頭ごろとされる。2、3か月をこの地で過ごし、同じ年の4月、代用教員として荏原尋常高等小学校下北沢分教場（現在の世田谷区立代沢小学校）に赴任するため大井町を離れた。",
        "birthYear": 1906,
        "deathYear": 1955,
        "yearText": "明治39年（1906年）〜昭和30年（1955年）",
        "era": "showa-post",
        "areas": ["oi"],
        "shinagawaRelation": "大正14年の初めごろ、数か月を大井町字元芝（現在の大井）で過ごした。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-inoue-yasushi",
        "name": "井上靖",
        "kana": "いのうえやすし",
        "summary": "小説家。芥川賞受賞の知らせを西大井1丁目の自宅で聞いた。",
        "description": "北海道旭川町に生まれた。京都帝国大学哲学科に学び、大阪毎日新聞社に入社。40歳のときに書いた『闘牛』で、43歳で第22回芥川賞を受賞した。受賞の知らせは、前年から家族と住んでいた西大井1丁目の自宅で聞いている。",
        "birthYear": 1907,
        "deathYear": 1991,
        "yearText": "明治40年（1907年）〜平成3年（1991年）",
        "era": "showa-post",
        "areas": ["oi"],
        "shinagawaRelation": "西大井1丁目に住み、芥川賞受賞の知らせをこの家で聞いた。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-toita-yasuji",
        "name": "戸板康二",
        "kana": "といたやすじ",
        "summary": "演劇評論家・作家。荏原7丁目に自宅を構え、50年余りを過ごした。",
        "description": "歌舞伎を中心とする演劇評論で知られ、推理小説も書いた。品川区では荏原7丁目に自宅を構え、50年余りを過ごしている。",
        "birthYear": 1915,
        "deathYear": 1993,
        "yearText": "大正4年（1915年）〜平成5年（1993年）",
        "era": "showa-post",
        "areas": ["ebara"],
        "shinagawaRelation": "荏原7丁目に自宅を構え、50年余りを過ごした。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-ikenami-shotaro",
        "name": "池波正太郎",
        "kana": "いけなみしょうたろう",
        "summary": "『鬼平犯科帳』などで知られる作家。昭和27年から亡くなるまで荏原に住んだ。",
        "description": "浅草区聖天町に生まれた。長谷川伸を中心に結成された新鷹会の同人誌に処女作を発表し、昭和35年に『錯乱』で第43回直木賞を受賞。『鬼平犯科帳』『剣客商売』『仕掛人・藤枝梅安』はいずれもシリーズとなった。昭和27年から品川区内の荏原で暮らし始め、亡くなるまでこの地に自宅を構えた。日課の散歩では武蔵小山商店街を端から端まで歩き、駅前の書店に必ず立ち寄ったという。",
        "birthYear": 1923,
        "deathYear": 1990,
        "yearText": "大正12年（1923年）〜平成2年（1990年）",
        "era": "showa-post",
        "areas": ["ebara"],
        "shinagawaRelation": "昭和27年から亡くなるまで荏原に住み、武蔵小山商店街を日課の散歩道にしていた。",
        "certainty": "fact",
        "variants": [
          {
            "claim": "品川区立図書館のページは直木賞の受賞を「1959年」と記すが、受賞は第43回で昭和35年（1960年）。刊行元の著者紹介で確かめた。",
            "ref": "sgw-library",
            "locator": "品川ゆかりの人物「池波正太郎」"
          }
        ],
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }, { "ref": "shinchosha", "locator": "『真田騒動―恩田木工―』著者紹介" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "pe-hoshi-shinichi",
        "name": "星新一",
        "kana": "ほししんいち",
        "summary": "ショートショートの作家。父は西五反田に工場を建てた星製薬の創業者・星一。",
        "description": "父は星製薬株式会社の創業者で「日本の製薬王」と呼ばれた星一。昭和26年に父が客死すると社長に就任したが、多額の負債を抱えた会社の再建は進まず、1年半ほどで副社長に退いた。昭和32年に同人誌『宇宙塵』へ発表した「セキストラ」が江戸川乱歩の目にとまり、作家としてデビューした。",
        "birthYear": 1926,
        "deathYear": 1997,
        "yearText": "大正15年（1926年）〜平成9年（1997年）",
        "era": "showa-post",
        "areas": ["osaki"],
        "shinagawaRelation": "父・星一が西五反田に建てた星製薬の社長・副社長を務めた。",
        "certainty": "fact",
        "sources": [{ "ref": "sgw-library", "locator": "品川ゆかりの人物" }],
        "verifiedAt": "2026-11-21"
      },
    {
      "id": "pe-urushi-shogan",
      "name": "漆昌巌",
      "kana": "うるししょうがん",
      "summary": "北品川宿の法禅寺の住職から実業家・政治家になり、衆議院議員を6回務めた。",
      "description": "嘉永3年（1850年）に岐阜県の大江村に生まれ、11歳で僧侶となった。明治6年に北品川宿の法禅寺に入って翌年住職を嗣ぎ、明治22年に品川馬車株式会社を創立して社長になった。26年には馬車鉄道株式会社の社長、30年には機械製氷会社の取締役にもなった。明治30年に還俗し、翌年品川町会議員、32年に荏原郡会議員となって郡会議長を務め、35年の第7回総選挙で政友会から当選した。以後、大正9年まで15年間、当選6回で中央政界で活躍した。大正8年に品川町長に推されて昭和4年11月に辞任し、全国町村会会長や東京府町村会会長も務め、昭和5年には自治功労者として東京府から表彰された。昭和9年2月22日に没し、法禅寺の墓域に葬られた。区史は、品川町長の多くが旧宿役人層の出身だったなかで、漆昌巌だけが例外だったと記している。",
      "birthYear": 1850,
      "deathYear": 1934,
      "yearText": "嘉永3年（1850年）〜昭和9年（1934年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川宿の法禅寺の住職を務め、品川馬車会社の創立など区内の実業にも関わった。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-2de8c135d9"
      ],
      "variants": [
        {
          "claim": "区史 資料編（人物略伝）は、明治22年に品川町の有志とともに品川電燈会社を創立し、明治28年に品川馬車鉄道会社の社長になったと記す。区史 通史編は、明治22年に品川馬車株式会社を創立して社長になり、明治26年に馬車鉄道株式会社の社長になったと記す。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「漆昌巖」26〜27頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 5 大正期の民衆運動と地方政界「地方政界の変貌と高木正年・漆昌巌」381〜384頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「漆昌巖」26〜27頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hirabayashi-kyubei",
      "name": "平林九兵衛",
      "kana": "ひらばやしきゅうべえ",
      "summary": "大井村の有力者で、第1回総選挙以来、高木正年と衆議院の議席を争った。",
      "description": "高木正年の伯父にあたる大井村の人。荏原郡が1議席だった時代、明治31年の第6回総選挙まで高木と議席をめぐって争い、第2回と第5回の総選挙で当選した。明治21年の町村合併の答申では、荏原郡を代表して高木とともに、郡部の財産を市に編入することに反対する意見書を連署した。第7回総選挙からは立候補を取りやめ、その地盤は漆昌巌に引き継がれたといわれる。",
      "birthYear": 1837,
      "deathYear": 1909,
      "yearText": "天保8年（1837年）〜明治42年（1909年）",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井村の人で、荏原郡選出の衆議院議員を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 5 大正期の民衆運動と地方政界「地方政界の変貌と高木正年・漆昌巌」381〜384頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「平林九兵衛」19〜20頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hayashi-kosyu",
      "name": "林交周",
      "kana": "はやしこうしゅう",
      "summary": "桐ケ谷村の名主から荏原郡の初代郡長になり、18年間在職した。",
      "description": "桐ケ谷村の名主で、明治の初めには第七大区の副区長を務めた。明治11年に郡区町村編制法で荏原郡が置かれると初代の郡長に任命され、明治28年まで18年間その職にあった。学問は十分でなかったが頭の回転が早く豪傑肌の人柄で、郡長会議でも率直に意見を述べ、伊藤博文からも目をかけられたという。品川神社には、伊藤博文が碑文を書いた林の石碑が立っている。",
      "birthYear": 1824,
      "deathYear": 1895,
      "yearText": "文政7年（1824年）〜明治28年（1895年）",
      "era": "meiji",
      "areas": [
        "osaki",
        "shinagawa"
      ],
      "shinagawaRelation": "荏原郡の初代郡長で、郡役所は品川に置かれた。碑が品川神社に立つ。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-548dab732d"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（一）明治前期の品川 3 明治政府の諸政策と地方制度「郡制の実施と連合戸長役場の設置」48〜54頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「林交周」15頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-tanaka-hajime",
      "name": "田中肇",
      "kana": "たなかはじめ",
      "summary": "大井村の戸長から村長となり、町制施行後は初代の大井町長を務めて32年間、村政・町政を担った。",
      "description": "明治18年に大井村の戸長に就き、明治22年5月に村会で村長に選ばれた。明治41年8月の町制施行では初代の町長になり、大正5年に没するまで、戸長から数えて32年間その職にあった。役場は鮫洲に置かれ、書記1人という少人数で始まった。区史は、町村長の多くが旧幕時代の名主や宿役人だったことを、この時期の名望家支配のあらわれとして記している。",
      "birthYear": null,
      "deathYear": 1916,
      "yearText": "明治18年（1885年）戸長〜大正5年（1916年）没",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井村の村長、のち大井町の初代町長。大正5年に没した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「新しい町村役場と町村長」189〜191頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ebisawa-shigeharu",
      "name": "海老沢重治",
      "kana": "えびさわしげはる",
      "summary": "大崎の連合戸長役場の戸長から、町村制施行後の初代の大崎村長になった。",
      "description": "大崎の上下大崎・谷山・居木橋・桐ケ谷の5か村の連合戸長役場で戸長を務め、明治22年の町村制の施行で、その区域がそのまま大崎村になると村長に選ばれた。明治24年に没した。町村合併のとき、白金村・三田村・白金猿町を加えた合併を望んだが、白金猿町の一部が加わるだけに終わった。",
      "birthYear": null,
      "deathYear": 1891,
      "yearText": "明治24年（1891年）没",
      "era": "meiji",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎村の初代村長。子の啓三郎があとを継いだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「品川区域の町村合併」183〜187頁、「新しい町村役場と町村長」189〜191頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ebisawa-keizaburo",
      "name": "海老沢啓三郎",
      "kana": "えびさわけいざぶろう",
      "summary": "父のあとを継いで大崎村長となり、町制施行後は大崎町長を大正6年まで26年間務めた。",
      "description": "海老沢重治の没後、嗣子として村長に推され、明治41年の町制施行で町長になって、大正6年に没するまで26年間その職にあった。谷山村（現在の西五反田）の名主の旧家の長男で、在職中は大崎目黒耕地整理組合長として事業の完成に努めた。五反田の雉子神社の境内には、昭和8年12月に建てられた頌徳胸像が現存する（戦時中に供出され、昭和38年に復原）。区史は、父の戸長就任から数えると父子二代で半世紀にわたって大崎の民政を取りしきったと記している。",
      "birthYear": 1854,
      "deathYear": null,
      "yearText": "安政元年（1854年）〜大正6年（1917年）または大正7年（1918年）",
      "era": "meiji",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎村長、のち大崎町長。大正6年に没した。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 通史編は、啓三郎が大正6年に没するまで町長を26年間務めたと記す。区史 資料編（人物略伝）は、明治24年9月に父のあとを継いで村長となり、のち町長として勤続27年、大正6年に病のため辞職し、大正7年に64歳で没したと記す。没年が1年違う。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「海老沢啓三郎」27頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「新しい町村役場と町村長」189〜191頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「海老沢啓三郎」27頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-takahashi-katsuzo",
      "name": "高橋勝蔵",
      "kana": "たかはしかつぞう",
      "summary": "平塚村の初代村長で、のち平塚町長として通算25年務めた。",
      "description": "代々芝の御霊屋敷の名主を務めた家の中延の生まれで、明治22年6月、36歳で平塚村の村長に選ばれた。明治30年まで在職し、13年の間をおいて明治43年に再任され、昭和2年まで通算25年その職にあった。荏原郡農会長や信用組合長を務め、青年団の設立にも率先して力を尽くした。昭和3年11月には功績をたたえる頌徳碑が荏原町役場の前に建てられた。昭和15年（1940年）4月10日に87歳で没し、小山村の摩耶寺に葬られた。大正15年の町制施行の申請書は、村長として高橋が提出している。",
      "birthYear": 1854,
      "deathYear": 1940,
      "yearText": "安政元年（1854年）〜昭和15年（1940年）",
      "era": "meiji",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "平塚村・平塚町（のち荏原町）の村長・町長。中延の出身。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 通史編は、村長・町長の在職を通算25年と記す。区史 資料編（人物略伝）は、明治22年の初代村長のあと一時職を辞し、明治42年に再度村長となって、前後35年にわたり村政に尽くしたと記す。年数が違う。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「高橋勝蔵」28頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「新しい町村役場と町村長」189〜191頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「高橋勝蔵」28頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-yamamoto-shigeoki",
      "name": "山本重興",
      "kana": "やまもとしげおき",
      "summary": "宿役人・副戸長を経て、初代の品川町長に選ばれた。",
      "description": "明治22年の町村制の施行で、南北の戸長役場が統合されて品川町役場ができると、町会の選挙で初代町長に選ばれた。宿役人や副戸長の経験があり、一時期鳥山藤次郎に代わったものの、明治40年までその職にあった。区史は、品川町長が漆昌巌を除いてすべて旧宿役人層の出身だったと記している。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治22年（1889年）〜明治40年（1907年）ごろ町長",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川町の初代町長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「新しい町村役場と町村長」189〜191頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-koga-ippei",
      "name": "古賀一平",
      "kana": "こがいっぺい",
      "summary": "品川県の知事として、備荒貯蓄の割り当てをめぐる武蔵野新田の門訴事件を処理した。",
      "description": "旧幕府の代官のあとの武蔵知県事で、明治2年8月に松村長為に代わって就任した。品川県が設置された明治2年2月9日の時点では前任者の時代で、古賀は自ら出張して門訴事件の取り調べにあたった。区史は、品川県の期間が短すぎて、その特色を示さないまま終わったと述べている。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治2年（1869年）8月就任",
      "era": "meiji",
      "areas": [
        "ward"
      ],
      "shinagawaRelation": "品川県の知事。県庁は日本橋の浜町に置かれた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（一）明治前期の品川 2 明治維新と品川「品川県の設置」15〜17頁、「品川県門訴事件」20〜22頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-rida-kunitaka",
      "name": "利田邦高",
      "kana": "りだくにたか",
      "summary": "南品川の連合戸長役場の戸長を務めた。",
      "description": "明治11年に荏原郡が置かれたとき、南品川宿・南品川猟師町・南品川利田新地・二日五日市村の3宿1村を合わせた南の戸長役場の戸長だった。役場ははじめ南品川宿238番地に置かれ、のち問屋場の跡、さらに長徳寺の庫裡へと3度移った。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治11年（1878年）ごろ戸長",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "南品川宿などを合わせた連合戸長役場の戸長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（一）明治前期の品川 3 明治政府の諸政策と地方制度「郡制の実施と連合戸長役場の設置」48〜54頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kaburaki-tadamasa",
      "name": "鏑木忠正",
      "kana": "かぶらぎただまさ",
      "summary": "戦後最初の公選の品川区長になり、また中延の土地を学校の敷地に提供した。",
      "description": "昭和22年4月5日、昭和7年の区制施行以来はじめての品川区長直接公選で、自由党から出て約3万7000票を獲得し、初代の公選区長になった。明治21年（1888年）に島根県の旧家に生まれ、東京大学を卒業して中延の名主鏑木胤義の養子になった。衆議院議員に2回、貴族院議員（多額納税議員）にもなった。公選区長として3期9年にわたり品川区政に尽くし、昭和37年（1962年）9月6日に75歳で没した。中延の旧家の人として、約1万坪の農地を昭和医学専門学校の敷地に提供して理事長となり、立正学園女学校の校地（約1,300坪）の所有者でもあった。",
      "birthYear": 1888,
      "deathYear": 1962,
      "yearText": "明治21年（1888年）〜昭和37年（1962年）",
      "era": "showa-post",
      "areas": [
        "ebara",
        "ward"
      ],
      "shinagawaRelation": "初代の公選区長。中延の土地所有者として昭和医専や立正学園の校地に関わった。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "八 現代編「新品川区の成立」818〜821頁、七 昭和編「昭和医学専門学校」585〜586頁、「立正学園女学校（現 立正学園女学校）」585頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「鏑木忠正」48頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kosakai-keiyo",
      "name": "小坂井啓陽",
      "kana": "こさかいけいよう",
      "summary": "大乗教を関東で広め、戦後は旗の台を拠点に管長を務めた。",
      "description": "大正10年ごろ五反田に教会を設けて布教し、昭和7年に小山、のち戸越、昭和9年に平塚（旗の台2丁目）へ教会を移した。戦後の昭和21年、宗教団体への規制が解かれると大乗教と改称して一派を立て、管長に就いた。本部は名古屋市にあったが、管長は品川区内にあって布教を続けた。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "大正10年（1921年）ごろ〜",
      "era": "showa-pre",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "旗の台2丁目に関東教会を置いた大乗教の管長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "八 現代編「大乗教」810〜811頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-goto-joasaku",
      "name": "後藤恕作",
      "kana": "ごとうじょさく",
      "summary": "後藤毛織を創立し、大井町の発展の原動力になったといわれる。",
      "description": "大正7年10月に後藤毛織を創立した。区史は、後藤毛織を大井町発展の原動力のひとつと記している。工場は関東大震災で全滅し、昭和4年秋に会社は破綻した。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "大正7年（1918年）後藤毛織創立",
      "era": "taisho",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町で毛織物工場を営んだ実業家。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "七 昭和編「昭和初期における毛織物工業の苦況」534〜536頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-okada-tojuro",
      "name": "岡田藤十郎",
      "kana": "おかだとうじゅうろう",
      "summary": "府立第八中学校の初代校長を、昭和12年まで務めた。",
      "description": "青山師範学校の教頭から府立第八中学校の初代校長に任命された。校舎の完成前、大正12年には三木小学校の一部を借りて授業を行い、翌13年4月から小山の校舎で授業を始めた。昭和12年に退官するまで十数年在職し、区史は、八中の校風は創立当初からの校長の教育方針によるところが強いと記している。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "大正12年（1923年）〜昭和12年（1937年）校長",
      "era": "taisho",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "平塚村小山に創立された府立八中（現在の小山台高校につながる）の初代校長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 7 近郊地域としての教育機関の整備「府立第八中学校の創立」428〜432頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-enomoto-takeaki",
      "name": "榎本武揚",
      "kana": "えのもとたけあき",
      "summary": "旧幕府の軍艦8隻を率いて品川沖から脱出した。",
      "description": "慶応4年（明治元年）8月19日、品川沖に碇泊していた旧幕府の開陽丸など軍艦8隻を率いて江戸湾を脱出し、北海道方面へ向かった。艦隊は房総沖の嵐で2隻を失い、6隻が松島湾に入った。のちに北海道の五稜郭を占拠することになる。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "慶応4年（1868年）8月19日の脱出",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川沖に碇泊していた旧幕府の艦隊を率いて脱出した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（一）明治前期の品川 2 明治維新と品川「榎本の品川沖脱出」11頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-takaishi-hideyuki",
      "name": "高石秀行",
      "kana": "たかいしひでゆき",
      "summary": "品川浦漁協の組合長として、漁業権の放棄にいたる補償交渉にあたった。",
      "description": "品川浦漁協の組合長で、東京都内湾漁業対策審議会の委員の一人になった。大井埠頭をめぐる都港湾局との折衝に、大森漁協とともにあたった。品川浦漁協は昭和37年当時、高石ほか137人の組合員を持っていた。昭和37年12月3日、補償額330億円の漁業補償協定が結ばれた。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "昭和36年（1961年）〜昭和37年（1962年）",
      "era": "showa-post",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川浦漁協の組合長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "八 現代編「漁業権の全面的放棄」987〜990頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-suzuki-bunji",
      "name": "鈴木文治",
      "kana": "すずきぶんじ",
      "summary": "友愛会を創立した会長で、大井・品川の分会の発足にも顔を出した。",
      "description": "明治45年8月1日、明治天皇の崩御から3日目、大正と改元された最初の夜に、三田で15人が集まって友愛会が生まれたときの中心人物で、会長を務めた。区域では、大正2年12月31日に大井町の大井倶楽部で開かれた大井分会の茶話会で講演し、大正3年1月3日の品川分会の新年宴会にも出席した。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治45年（1912年）友愛会創立",
      "era": "taisho",
      "areas": [
        "oi",
        "shinagawa"
      ],
      "shinagawaRelation": "友愛会の会長。大井分会・品川分会の発足の会合で講演した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 5 大正期の民衆運動と地方政界「友愛会大井・品川分会の発足と城南支部第四十八部会」390〜392頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-tateishi-tomomitsu",
      "name": "立石知満",
      "kana": "たていしともみつ",
      "summary": "大崎町長として、町の下水道改良事業に早くから取り組んだ。",
      "description": "明治7年（1874年）10月24日に大崎に生まれ、大崎郵便局長、大崎町助役を経て、大正6年に海老沢啓三郎の後の大崎町長になった。府会議員や大崎信用組合長も務め、大崎目黒両町耕地整理組合長として目黒川の改修事業に尽力した。昭和20年（1945年）5月15日に72歳で没した。大正9年、大崎町長として下水道改良事業の調査に着手し、東京府の技師の設計で、大正10年8月に町会に付議した。関東大震災などもあって内務省の許可が出るのは遅れ、工事は大正13年4月に始まった。",
      "birthYear": 1874,
      "deathYear": 1945,
      "yearText": "明治7年（1874年）〜昭和20年（1945年）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎町の町長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "七 昭和編「（ハ） 下水道」605〜607頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「立石知満」43頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-tsuchiya-ko",
      "name": "土屋興",
      "kana": "つちやこう",
      "summary": "大崎在住の衆議院議員で、漆昌巌の地盤を継いで昭和3年の第1回普選の前まで議員を務めた。",
      "description": "明治16年（1883年）2月に静岡県の沼津に生まれ、慶應義塾大学を卒業して大阪毎日新聞に入り、英国のロンドン大学で3年間政治経済を学んだ。帰国後は会社の重役となり、大崎町に住んだ。大正8年に大崎町の住人として荏原郡会議員になり、衆議院議員に2回当選した。大正9年の第14回総選挙で、十数年の議員活動に終止符を打った漆昌巌から地盤を引き継いだ。昭和3年の第1回普通選挙の実施前まで議員として活動したが、早く亡くなった。",
      "birthYear": 1883,
      "deathYear": null,
      "yearText": "明治16年（1883年）〜（早くに没）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎に住み、荏原郡選出の衆議院議員を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 5 大正期の民衆運動と地方政界「荏原郡下における政党化の波」386〜389頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「土屋興」46頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ito-butshichiro",
      "name": "伊藤武七郎",
      "kana": "いとうぶしちろう",
      "summary": "荏原区の人で、高木正年の没後に議席を継ぎ、昭和11年の選挙で当選した。",
      "description": "明治元年（1868年）6月4日に下蛇窪村の名主の家に生まれ、明治38年に平塚村会議員となって以後、郡会議員、府会議員（4期）、市会議員、荏原町長を務めた。大正7年に耕地整理組合の理事長に選ばれ、一農村だった平塚村を都市の形にもっていく基礎をつくった。昭和11年10月26日に69歳で没した。昭和9年12月に高木正年が在職のまま没したあと、荏原区の伊藤武七郎があとを継ぎ、昭和11年の選挙で当選した。",
      "birthYear": 1868,
      "deathYear": 1936,
      "yearText": "明治元年（1868年）〜昭和11年（1936年）",
      "era": "showa-pre",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "荏原区の衆議院議員。高木正年の後継。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "六 大正編 5 大正期の民衆運動と地方政界「荏原郡下における政党化の波」386〜389頁"
        }
      , {"ref": "sgw-kushi-shiryo", "locator": "人物略伝「伊藤武七郎」39頁"}],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ota-dokan",
      "name": "太田道灌",
      "kana": "おおたどうかん",
      "summary": "室町中期の武将。江戸城を築く前、品川の御殿山に居館を築いて上杉氏に従った。",
      "description": "永享5年（1433年）に相模で生まれ、扇谷上杉家の家臣として戦った。『永享記』は品川の館に住んだのち江戸の館に移ったと伝え、『品川寺縁起』も、品川の領主の家にあった水月観音が、長禄元年（1457年）に道灌が江戸城へ移ったとき、その旧居を寺として品川寺とし、江戸城の鎮守としたと記している。文明18年（1486年）、相模国で主君の館で暗殺された。55歳。",
      "birthYear": 1433,
      "deathYear": 1486,
      "yearText": "永享5年（1433年）〜文明18年（1486年）",
      "era": "chusei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川の御殿山に居館をもったと伝わり、旧居が品川寺になったとされる。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-7ee2886587"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「太田道灌」4〜5頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-suzuki-doin",
      "name": "鈴木道胤",
      "kana": "すずきどういん",
      "summary": "室町中期の南品川の船主。品川湊に根をはり、妙国寺の大檀那として伽藍の復興に尽くした。",
      "description": "文安のころ（1444〜1448年）の南品川の住人で、紀州熊野の出といわれる。出生と死去の年は分からない。古文書に「品川湊」の文字が見え、多数の舟の出入りでにぎわった港に根をはった船主と推察される。文安元年（1444年）に妙国寺の大檀那となり、子の光純とともに五重塔を建て、長禄3年（1459年）に七堂伽藍を完成させた。文安3年（1446年）には梵鐘を寄進している。連歌を好んで心敬と交わり、太田道灌を支援した。南品川の北馬場・南馬場の地名は、道胤の馬場跡の意味だといわれる。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "文安元年（1444年）〜長禄3年（1459年）",
      "era": "chusei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "南品川の船主で、妙国寺の大檀那。馬場の地名に名が残るといわれる。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-11e5d5f153"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「鈴木道胤」5頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-udagawa-nagakiyo",
      "name": "宇田川長清",
      "kana": "うだがわながきよ",
      "summary": "太田道灌の再配置で品川郷に移り、初代品川城主として三木村に城を築いたと伝わる。",
      "description": "宇田川氏は南武蔵の小豪族で、関東管領家に属して執事の上杉氏の指揮を受けた。長清は荏原郡桜田庄または豊島郡日比谷郷にいたが、長禄元年（1457年）4月に道灌が江戸城へ移って在地武士を再配置したとき、品川郷に移されて初代品川城主となり、三木村に城を築いたという。文明14年（1482年）9月17日に没した。子孫のうち三人は、徳川家康の入国後、品川神社の神主、品川宿の名主、武蔵国葛飾郡の新田開発者になり、その後裔はいずれも現存するという。",
      "birthYear": null,
      "deathYear": 1482,
      "yearText": "長禄元年（1457年）に品川郷へ",
      "era": "chusei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "初代品川城主として三木村に城を築いたとされる。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「宇田川長清」6頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-tsukinomoto-izan",
      "name": "月之本為山",
      "summary": "江戸後期の俳人。門人が多く、没後は南品川の本光寺に葬られた。",
      "description": "文化元年（1804年）1月に江戸の京橋で生まれた。通称は久次郎、のち永蔵。梅室の門に入って「梅之本」の号を授けられ、のち「月之本」の号を賜って、門人は百人をこえたと伝わる。明治維新後は教部省から俳諧教導職を命じられた。明治11年（1878年）1月20日に75歳で没し、南品川の本光寺に門人たちによって葬られた。本堂裏には発起人6人による一碑があり、「老ひしらぬものなりうれし秋の月」の句を刻んでいる。",
      "birthYear": 1804,
      "deathYear": 1878,
      "yearText": "文化元年（1804年）〜明治11年（1878年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が南品川の本光寺にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-699c7ad510"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「月之本為山」7頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hattori-nankaku",
      "name": "服部南郭",
      "summary": "江戸中期の詩人・学者。荻生徂徠の門に学び、没後は東海寺の塔頭に葬られた。",
      "description": "貞享元年（1684年）に京都で生まれた。柳沢吉保に仕え、荻生徂徠の門で学んで秀才の誉れが高かった。34歳で致仕して詞章や古文辞に力を注ぎ、門弟を育てた。晩年は細川候に迎えられた。詩文にすぐれ、雪舟にならって山水を描いた。宝暦9年（1759年）7月21日に没し、東海寺の旧塔頭の少林院に葬られた。",
      "birthYear": 1684,
      "deathYear": 1759,
      "yearText": "貞享元年（1684年）〜宝暦9年（1759年）",
      "era": "kinsei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が東海寺の旧塔頭にあった。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-f0dec3262a"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「服部南郭」8頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-shirai-chosui",
      "name": "白井鳥酔",
      "summary": "江戸中期の俳人。晩年に品川の鮫洲に松原庵を開き、海晏寺に葬られた。",
      "description": "元禄14年（1701年）に上総の代官の子として生まれ、享保6年（1721年）に21歳で代官になったが、同10年に役儀の過怠で罷免された。俳諧に親しみ、元文5年（1740年）に鳥酔と改号した。宝暦13年（1763年）に品川の鮫洲に松原庵を開いて移り、明和6年（1769年）4月4日に没した。海晏寺で葬儀が営まれ、分骨のうえ埋葬された。墓碑に「松風も骨になったる寒さかな」とある。門弟に春秋庵白雄がいる。",
      "birthYear": 1701,
      "deathYear": 1769,
      "yearText": "元禄14年（1701年）〜明和6年（1769年）",
      "era": "kinsei",
      "areas": [
        "oi",
        "shinagawa"
      ],
      "shinagawaRelation": "鮫洲に松原庵を開いた。海晏寺に葬られた。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-0eb88578f1"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「白井鳥酔」9頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-shunjuan-hakuyu",
      "name": "春秋庵白雄（加舎白雄）",
      "summary": "江戸中期の俳人。白井鳥酔の門下で、蕉風中興の祖ともいわれる。墓は海晏寺にある。",
      "description": "信州上田の藩士の子として江戸深川に生まれ、白井鳥酔の門に入って正風を受けつぎ、正風三傑の一人として天明の俳壇で活躍した。江戸に春秋庵を開き、信州や関東、奥羽、伊勢などに有力な門下を送り出した。平明で自然な俳風を特色とし、俳論に「加佐里那中」がある。墓は海晏寺の境内にあり、東京都の指定史跡になっている。",
      "birthYear": 1738,
      "deathYear": 1791,
      "yearText": "元文3年（1738年）〜寛政3年（1791年）",
      "era": "kinsei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が海晏寺の境内にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-0eb88578f1"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「春秋庵白雄」11頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-matsudaira-fumai",
      "name": "松平不昧",
      "kana": "まつだいらふまい",
      "summary": "出雲松江藩主で茶人。大崎の下屋敷の庭は、茶道の理想を表した名園「大崎園」といわれた。",
      "description": "名は治郷。号は不昧で、石州流不昧派を創めた。宝暦元年（1751年）に生まれ、文政元年（1818年）に没した。大崎下屋敷の庭は大崎園と呼ばれ、面積2万1千余坪、建物3千余坪、茶屋11か所を持ち、晩年の不昧が茶道の精神と造園上の理想を表した江戸造園史上の名園といわれる。幕末の品川台場の築造の際に庭園は没収されて陣屋となり、庭石は運び去られて跡形もなくなった。",
      "birthYear": 1751,
      "deathYear": 1818,
      "yearText": "宝暦元年（1751年）〜文政元年（1818年）",
      "era": "kinsei",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎の下屋敷に名園「大崎園」を営んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「松平不昧」11頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-myosen-nissen",
      "name": "妙沾院日詮",
      "summary": "中延の法蓮寺の住僧。大奥の信者の力で八幡宮の再建や感応寺の建立に関わった。",
      "description": "安永元年（1773年）に小山村の檀家総代の家に生まれ、池上本門寺で得度して中延法蓮寺の39世になった。若く美男で、大奥の女中たちに信者が多く、その力で中延八幡宮を再建した。天保8年（1837年）には雑司ケ谷の下屋敷の寄付を受けて感応寺が建てられ、その2世となったが、水野忠邦の改革で江戸払いとなり、のち池上の常仙院を再建した。嘉永7年（1854年）7月15日に81歳で没した。",
      "birthYear": 1773,
      "deathYear": 1854,
      "yearText": "安永元年（1773年）〜嘉永7年（1854年）",
      "era": "kinsei",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "中延の法蓮寺の住職で、中延八幡宮の再建に関わった。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「妙沾院日詮聖人」12頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-tsuruoka-fuyukage",
      "name": "鶴岡冬蔭",
      "summary": "北品川宿の本陣の家に生まれた国学者。",
      "description": "安永4年（1775年）に北品川宿の本陣の家に生まれ、木島菅麿の門で神道国学を学んだ。国学と和歌にすぐれ、安政元年（1854年）に70歳で没して南品川の本光寺に葬られた。墓碑銘は磨滅して判読できず、経歴は詳しく分からない。品川神社の富士山の中腹にある「人丸大明神」の碑は、父の建立と思われる。",
      "birthYear": 1775,
      "deathYear": 1854,
      "yearText": "安永4年（1775年）〜安政元年（1854年）",
      "era": "kinsei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川宿の本陣の出身で、墓が本光寺にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-699c7ad510"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「鶴岡冬蔭」12頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ryutei-tanehiko",
      "name": "柳亭種彦",
      "kana": "りゅうていたねひこ",
      "summary": "江戸後期の戯作者。『偽紫田舎源氏』で知られ、のち戸越に改葬された。",
      "description": "天明3年（1783年）5月12日に江戸で生まれた。本名は高屋彦四郎知久で、200俵取りの旗本だった。『偽紫田舎源氏』が将軍家斉と大奥をえがいたものとして罪を得、病状も高まって天保13年（1842年）に60歳で没した。麻布の浄土寺に葬られ、のち戸越に改葬された。辞世は「散るものにさだまる秋の柳かな」。",
      "birthYear": 1783,
      "deathYear": 1842,
      "yearText": "天明3年（1783年）〜天保13年（1842年）",
      "era": "kinsei",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "墓が戸越に改葬された。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「柳亭種彦」13頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-egawa-tarozaemon",
      "name": "江川太郎左衛門",
      "kana": "えがわたろうざえもん",
      "summary": "伊豆韮山の代官。品川台場の詳しい計画を立て、築造を指揮した。",
      "description": "名は英龍、号は坦庵。天保10年（1839年）に伊豆・相模・房総などの巡視を命じられて海防策を上申し、のちの品川台場の構築はこれによる。嘉永6年（1853年）に韮山で大砲鋳造のための反射炉の建造を始め、品川台場の大砲もここで鋳造された。台場は嘉永6年に始まり、その詳細な計画は江川によった。享和元年（1801年）〜安政2年（1855年）。",
      "birthYear": 1801,
      "deathYear": 1855,
      "yearText": "享和元年（1801年）〜安政2年（1855年）",
      "era": "kinsei",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川台場の築造計画を立てた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「江川太郎左衛門」13頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-iwakura-tomomi",
      "name": "岩倉具視",
      "kana": "いわくらともみ",
      "summary": "幕末・明治の公卿・政治家。墓は海晏寺の墓地にある。",
      "description": "公卿の堀川康親の子で、岩倉具慶の養子となった。公武合体や王政復古の策に尽力し、明治4年（1871年）に右大臣となって遣欧米使節の全権大使を務めた。明治16年（1883年）に没し、品川の海晏寺の墓地に葬られた。",
      "birthYear": 1825,
      "deathYear": 1883,
      "yearText": "文政8年（1825年）〜明治16年（1883年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が海晏寺の墓地にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-0eb88578f1"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「岩倉具視」15頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-terashima-munenori",
      "name": "寺島宗則",
      "kana": "てらしまむねのり",
      "summary": "薩摩出身の政治家。明治政府で外交を担当し、墓は海晏寺にある。",
      "description": "初名は陶蔵。蘭学を学んだ開明的な藩士で、藩のイギリス接近後は留学生を率いて渡欧した。維新政府では外交を担当し、関税自主権の回復をふくむ新条約をアメリカと調印したがイギリスの反対で成らなかった。南品川の海晏寺に葬られている。天保4年（1833年）〜明治26年（1893年）。",
      "birthYear": 1833,
      "deathYear": 1893,
      "yearText": "天保4年（1833年）〜明治26年（1893年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が南品川の海晏寺にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-0eb88578f1"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「寺島宗則」17頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-nishimura-katsuzo",
      "name": "西村勝三",
      "kana": "にしむらかつぞう",
      "summary": "品川硝子製造所の払い下げを受け、品川白煉瓦製造所を品川に移した実業家。",
      "description": "天保7年（1836年）に江戸麹町の佐野藩邸で生まれた。慶応元年（1865年）に神田で銃砲店を開き、明治3年（1870年）には築地に靴の製造場を開いて、軍靴の注文を受けた。明治17年（1884年）に工部省の品川硝子製作所を借り、翌年政府から払い下げを受けた。明治20年（1887年）には白煉瓦製造所を品川町に移して品川白煉瓦製造所と改称し、27年には北品川に製革工場を増設した。明治40年（1907年）1月31日に72歳で没し、北品川の東海寺大山墓地に葬られた。",
      "birthYear": 1836,
      "deathYear": 1907,
      "yearText": "天保7年（1836年）〜明治40年（1907年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川硝子・品川白煉瓦の経営者で、墓が東海寺大山墓地にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-f0dec3262a"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「西村勝三」18〜19頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-james",
      "name": "J・M・ゼームス",
      "summary": "南品川の浅間台坂の下に住んだ英国人の航海術の専門家。ゼームス坂の名のもとになった。",
      "description": "慶応2年（1866年）7月、28歳で来日し、明治元年（1868年）に熊本藩の委嘱で龍驤艦の建造と艤装のため英国に出張し、明治3年に艦長として長崎へ帰着した。明治4年に燈台船の船長として本州沿岸を巡視し、明治5年には海軍の御雇教師として航海術を指導した。南品川の浅間台坂の下に住んでいたため、この坂がいつとなくゼームス坂と呼ばれるようになった。城南小学校の増築費を寄付している。明治41年（1908年）に71歳で病没し、身延山久遠寺に葬られた。",
      "birthYear": null,
      "deathYear": 1908,
      "yearText": "慶応2年（1866年）来日〜明治41年（1908年）没",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "浅間台坂の下に住み、ゼームス坂の名の由来となった。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「J・M・ゼームス」22頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kawase-hideharu",
      "name": "河瀬秀治",
      "kana": "かわせひではる",
      "summary": "明治の先覚者。南品川に私設公園の妙華園を開き、園芸技術の指導所とした。",
      "description": "天保10年（1839年）12月15日に丹後宮津藩士の家に生まれた。明治元年（1868年）に武蔵知県事、翌2年に小菅県知事となり、のち農具の購入や語学校の新設、製紙工場の建設など産業の振興に努めた。明治28年（1895年）に南品川の西部の眺望のよい地に、面積5,000坪の妙華園を開いた。4棟の温室と2棟の陳列室があり、スイレンやスミレなど西洋の草花を集めた。池や築山、運動場、飲食店もあって東京の名所となり、種苗や園芸の新しい技術の指導所でもあった。昭和3年（1928年）に90歳で没した。",
      "birthYear": 1839,
      "deathYear": 1928,
      "yearText": "天保10年（1839年）〜昭和3年（1928年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "南品川に私設公園の妙華園を開いた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「河瀬秀治」23頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hara-rokuro",
      "name": "原六郎",
      "kana": "はらろくろう",
      "summary": "実業家。第一国立銀行の頭取などを務め、北品川の御殿山に広大な邸宅を構えた。",
      "description": "弘化元年（1844年）に播磨の佐嚢村に生まれ、陽明学を修めて尊王攘夷に奔走し、生野銀山での挙兵の失敗後、討幕に加わった。維新後は財界に転じ、明治4年（1871年）に渡米して経済学を学び、明治10年に帰国した。明治11年に第一国立銀行の頭取となり、東京貯蔵銀行の創立など多くの銀行設立に関わった。富士製紙など多くの会社の経営にも加わった。北品川御殿山の広大な邸宅はよく知られ、養子の邦造が継いだ。",
      "birthYear": 1844,
      "deathYear": 1933,
      "yearText": "弘化元年（1844年）〜昭和8年（1933年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の御殿山に広大な邸宅を構えた。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 資料編は、没年を「昭和8年・1923」と併記しており、昭和8年は1933年にあたるため1923年は誤記とみられる。昭和8年（1933年）として載せた。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「原六郎」25頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「原六郎」25頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ogaki-kikusaburo",
      "name": "緒明菊三郎",
      "kana": "おあきくさぶろう",
      "summary": "品川台場で日本最初の西洋型造船所を営んだ造船業者。",
      "description": "弘化3年（1846年）に伊豆の戸田で船大工の子として生まれた。安政元年（1854年）、ロシア軍艦が下田沖に沈没して乗員が戸田に上陸した際、9歳で父に連れられて西洋型の造船を初めて見て、修理に雇われたのがきっかけで造船業を営むようになった。明治5年（1872年）に上京して京橋湊町に洋式造船所を設け、明治16年に品川第四砲台を借りて緒明造船所をつくり、盛況を極めた。明治25、26年ごろからは海運業も始め、自分の造船所でつくった観音丸は全国の港で見られた。邸は北品川にあり、門が灯台の形で、土地の人はここを緒明横町と呼んだ。明治42年（1909年）1月6日に65歳で没した。",
      "birthYear": 1846,
      "deathYear": 1909,
      "yearText": "弘化3年（1846年）〜明治42年（1909年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川台場に緒明造船所を設け、北品川に邸があった。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 資料編は、品川第四砲台を借りて緒明造船所を設けたのを明治16年とするが、『品川町史』下巻は明治24年としている。区史 通史編は明治16年とする。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「緒明菊三郎」25頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「緒明菊三郎」25頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hibiya-heizaemon",
      "name": "日比谷平左衛門",
      "kana": "ひびやへいざえもん",
      "summary": "紡績事業の先覚者の実業家。北品川に広大な邸宅があった。",
      "description": "嘉永2年（1849年）に新潟県の三条町に生まれ、江戸日本橋の綿糸商に奉公して18歳で支配人になった。明治11年（1878年）に独立して綿糸業を営み、明治29年に東京瓦斯紡績会社を設立した。のち富士瓦斯紡績、鐘ケ淵紡績、日清紡績などの設立を唱え、第一生命ほか多くの会社の重役を兼ねた。北品川の品川神社の高台に相対する北方の台地上に広大な邸宅があった。大正10年（1921年）1月に73歳で没した。",
      "birthYear": 1849,
      "deathYear": 1921,
      "yearText": "嘉永2年（1849年）〜大正10年（1921年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の台地に広大な邸宅があった。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「日比谷平左衛門」26頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kuriyama-tomojiro",
      "name": "栗山友次郎",
      "kana": "くりやまともじろう",
      "summary": "上大崎で米穀商を営み、大崎町会議員から府会議員になった。",
      "description": "安政2年（1855年）7月24日に碑衾村（現在の目黒区）に生まれ、明治16年（1883年）に上大崎の六軒茶屋に分家して米穀商を始めた。大崎町会議員、明治36年から郡会議員を2期、大正4年から府会議員を2期務めた。荏原郡の高木正年派の重鎮の一人で、高木の八丈物産会社にも関わった。昭和4年（1929年）8月22日に74歳で没した。",
      "birthYear": 1855,
      "deathYear": 1929,
      "yearText": "安政2年（1855年）〜昭和4年（1929年）",
      "era": "meiji",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "上大崎に住んで米穀商を営んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「栗山友次郎」28頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-suematsu-kencho",
      "name": "末松謙澄",
      "kana": "すえまつけんちょう",
      "summary": "明治の政治家で文学にも通じた。伊藤博文の女婿で、墓は海晏寺にある。",
      "description": "安政2年（1855年）に福岡県の京都郡に生まれ、明治4年（1871年）に東京へ出て英学などを学んだ。東京日日新聞の編輯に参加し、伊藤博文の知遇を得て公職を歴任した。明治11年に在英国公使館書記としてケンブリッジ大学に学び、『源氏物語』の抄訳を英文で行って古典文学の外国紹介の端緒となった。明治23年の国会開設で福岡県から衆議院議員になり、明治31年には伊藤内閣の逓信大臣、のち子爵となった。大正9年（1920年）に没し、南品川の海晏寺に葬られた。",
      "birthYear": 1855,
      "deathYear": 1920,
      "yearText": "安政2年（1855年）〜大正9年（1920年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "墓が南品川の海晏寺にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-0eb88578f1"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「末松謙澄」29頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-uehara-yusaku",
      "name": "上原勇作",
      "kana": "うえはらゆうさく",
      "summary": "陸軍大将。大井の鹿島町（現在の大井6丁目）に長く住んだ。",
      "description": "安政3年（1856年）11月9日に日向国の都城に生まれ、明治11年（1878年）に陸軍士官学校を卒業した。日清戦争では第一軍参謀、日露戦争では第四軍参謀長として戦い、明治45年（1912年）に第二次西園寺内閣の陸軍大臣となった。のち参謀総長などの要職に就き、大正10年に子爵を授けられ、昭和4年（1929年）に陸軍大将に進んだ。昭和8年（1933年）11月に78歳で病死した。",
      "birthYear": 1856,
      "deathYear": 1933,
      "yearText": "安政3年（1856年）〜昭和8年（1933年）",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井の鹿島町（現在の大井6丁目）に長く住んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「上原勇作」29頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-oshige-nakazaemon",
      "name": "大重仲左衛門",
      "summary": "薩摩切子の技術を身につけ、官営品川硝子製造所で工長にまで昇進した硝子工。",
      "description": "薩摩国の人で、江戸末期の生まれと推察される。薩摩切子の細工の技術を習得して上京し、官営の品川硝子製造所に徒弟として勤めた。明治11年（1878年）11月6日付の昇給辞令が残る。明治15年に伍長・副組長・組長と昇進し、明治17年に民営に移管された品川硝子工場で硝子吹職副工長、明治20年に第一工場の工長になった。明治21年7月の辞令を最後に退社したとみられ、のち三田四国町で硝子の食器や花瓶をつくる工場を設け、明治40年に没したといわれる。",
      "birthYear": null,
      "deathYear": 1907,
      "yearText": "明治11年（1878年）ごろ〜明治21年（1888年）ごろ在職",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "官営品川硝子製造所に勤め、工長にまで進んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「大重仲左衛門」32頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ogino-teijiro",
      "name": "荻野貞次郎",
      "summary": "北品川の荻野小学校と幼稚園を経営した教育家。",
      "description": "明治以前から北品川にあった家塾を、明治6年（1873年）に父から継ぎ、明治8年7月の文部省の示達に基づいて荻野小学校と称して許可を受け、私立で小学校教育を行った。明治22年には品川町長と代用小学校の契約を結び、29年5月には高等小学を併置し、40年4月に幼稚園を併設した。大正5年（1916年）に小学校は閉鎖された。「荏原の慶応義塾」とたたえられ、品川の初等教育普及の先駆者だった。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治6年（1873年）〜大正5年（1916年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川で私立の荻野小学校と幼稚園を営んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「荻野貞次郎」33頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-toriyama-teijiro",
      "name": "鳥山悌次郎",
      "summary": "品川の旧家の出身で、第1回の郡会議員を務めた。",
      "description": "品川の旧家に生まれた。父の貞利は明治11年の第1回の府会議員で、明治23年に高木正年に代わるまで務めた。悌次郎は明治32年の第1回の郡会議員で、明治40年まで2期務めた。鳥山の一族は品川の旧家で、鳥山金右衛門家は北品川の本陣の家であり、明治元年の明治天皇の東京行幸のときには行在所になった。鳥山藤次郎・義祐は明治から大正にかけて町長を務めた。",
      "birthYear": null,
      "deathYear": null,
      "yearText": "明治32年（1899年）〜明治40年（1907年）郡会議員",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の本陣の家の一族で、郡会議員を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「鳥山悌次郎」33頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-sakurai-kashichi",
      "name": "桜井嘉七",
      "summary": "大井の自治功労者で剣道家。町会・郡会の議員を40年務めた。",
      "description": "万延元年（1860年）11月に大井で生まれた。町会議員、郡会議員、同議長として自治に40年尽くし、品川用水組合議員、郡農会副会長、評議員としても長く務めた。若いころから剣道で身をきたえ、晩年に大野義雄、倉本彦五郎らとともに大井鹿島神社の境内に道場「鹿島館」を創立して青年の指導にあたった。趣味は園芸で、特に菊作りだった。大正10年（1921年）9月15日に62歳で没し、北品川の法禅寺の墓地に葬られた。",
      "birthYear": 1860,
      "deathYear": 1921,
      "yearText": "万延元年（1860年）〜大正10年（1921年）",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井鹿島神社の境内に剣道場の鹿島館を創立した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「桜井嘉七」34頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-morita-setsu",
      "name": "森田節",
      "summary": "漆昌巌に認められて政界に入り、品川町会議員・府会議員を務めた。",
      "description": "元治元年（1864年）11月に千葉県で生まれ、若くして上京して学び、漆昌巌に認められて政治に入った。大正2年から品川町会議員を4期、大正4年から府会議員を3期務めた。大正15年（1926年）3月28日に63歳で没し、北品川の法禅寺の墓地に葬られた。昭和3年に墓の側に表徳碑が建てられた。",
      "birthYear": 1864,
      "deathYear": 1926,
      "yearText": "元治元年（1864年）〜大正15年（1926年）",
      "era": "taisho",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川町会議員、府会議員を務め、墓が北品川の法禅寺にある。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「森田節」35頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-murabayashi-hikoyuki",
      "name": "村林彦之",
      "summary": "品川町史の編纂委員・主査を務めた自治功労者で、六行会の中興の祖。",
      "description": "元治元年（1864年）2月に品川の質商の家に生まれ、漢籍を身につけた。明治16年に家督を継ぎ、町会議員、郡会議員、府会議員を務めた。昭和3年4月に着手し、昭和7年9月に『品川町史』上・中・下の3巻、2,900頁の大著を完成させた編纂委員・主査で、区史は資料的価値が極めて高いと評している。六行会の品川図書館（現在の区立品川図書館の前身）を経営するなど公益事業に貢献し、財団法人六行会の中興の祖と仰がれた。昭和13年（1938年）5月31日に75歳で没した。",
      "birthYear": 1864,
      "deathYear": 1938,
      "yearText": "元治元年（1864年）〜昭和13年（1938年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川町史の編纂を主査として完成させた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「村林彦之」35頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-nawa-nagenori",
      "name": "名和長憲",
      "kana": "なわながのり",
      "summary": "軍人から貴族院議員となり、大井町長を10年務めた。",
      "description": "福岡県の出身で、元治元年（1864年）2月に生まれた。南朝の忠臣名和長年の後裔の養嗣子となり、明治31年に男爵を襲爵した。陸軍士官学校を卒業して日清・日露の両戦役に従軍し、明治42年に陸軍大佐になった。大正6年（1917年）に貴族院議員となり、大正11年に大井町長桜井翁太郎の死去で後任の大井町長に就任した。関東大震災後の市街地化に対応して道路・下水・教育・衛生などの公共施設の充実を計画して実現し、昭和7年（1932年）3月29日まで10年間在職した。",
      "birthYear": 1864,
      "deathYear": null,
      "yearText": "元治元年（1864年）〜没年は資料により異なる",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町長として、震災後の大井の公共施設の整備を進めた。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 資料編は没年を「昭和14年（1934年）7月20日、84歳」と書くが、昭和14年は1939年で、1934年は昭和9年にあたる。生年の元治元年（1864年）からは、1934年なら70歳、1939年でも75歳になり、記述が合わない。没年は確かめられていない。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「名和長憲」36頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「名和長憲」36頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-samejima-sokichi",
      "name": "鮫島宗吉",
      "summary": "桐ケ谷の旧家の出身で、大崎町長を4年務めた。",
      "description": "慶応2年（1866年）2月に桐ケ谷村（現在の西五反田6丁目）の村役人の家に生まれた。父は大崎町助役を務めた篤農家で、宗吉も農業に関心をもち、荏原郡農会の幹事を務めた。大正2年5月から大崎町会議員となり、大正10年4月に大崎町長に選ばれ、大正14年4月に辞任した。昭和8年（1933年）7月2日に68歳で没し、菩提寺の安楽寺に埋葬された。",
      "birthYear": 1866,
      "deathYear": 1933,
      "yearText": "慶応2年（1866年）〜昭和8年（1933年）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎町長を務めた。墓が安楽寺にある。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-ff5af64894"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「鮫島宗吉」36頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-sugiura-tetsugoro",
      "name": "杉浦鉄五郎",
      "summary": "品川の旧家の出身で、荏原郡会議員を郡制の廃止まで務めた。",
      "description": "慶応3年（1867年）8月11日に品川の旧家に生まれた。明治44年から大正12年の郡制廃止まで荏原郡会議員を務めた。大正13年（1924年）11月18日に58歳で没し、南品川の心海寺の墓地に葬られた。杉浦の一族には、代々北品川で呉服商を営み、品川銀行の支配人や重役を務めた杉浦作次郎家がある。",
      "birthYear": 1867,
      "deathYear": 1924,
      "yearText": "慶応3年（1867年）〜大正13年（1924年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "荏原郡会議員を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「杉浦鉄五郎」37頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-honda-nissho",
      "name": "本多日生",
      "kana": "ほんだにっしょう",
      "summary": "南品川の妙国寺の住職を務めた仏教学者で、顕本法華宗の管長。",
      "description": "慶応3年（1867年）3月13日に姫路で生まれ、12歳で得度し、18歳で堺の妙満寺の住職になった。明治30年（1897年）5月21日に南品川の妙国寺の住職となり、翌年宗務総監を兼ねた。妙満寺派が顕本法華宗と公称することを認められ、明治38年に公選で管長に当選して、大正15年まで管長として宗政と教学の責を果たした（区史は在職を「27年間」と記すが、年数が合わない。variants を参照）。日蓮宗各派の統一を唱え、多くの会を組織して大衆への布教に力を注ぎ、昭和3年にその功で天杯を賜った。",
      "birthYear": 1867,
      "deathYear": null,
      "yearText": "慶応3年（1867年）〜",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "南品川の妙国寺の住職として、顕本法華宗の管長を務めた。",
      "certainty": "fact",
      "relatedPlaces": [
        "pl-11e5d5f153"
      ],
      "variants": [{"claim": "区史 資料編の人物略伝は、明治38年（1905年）に管長に当選し「以来大正十五年まで、二十七年間管長として」務めたと記す。しかし明治38年から大正15年（1926年）までは21年（両端を含めても22年）で、27年とは合わない。開始年・終了年・年数のどれが誤りかは、この資料だけでは判断できない。", "ref": "sgw-kushi-shiryo", "locator": "人物略伝「本多日生」37〜38頁"}],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「本多日生」37〜38頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-yoshine-yasaburo",
      "name": "芳根彌三郎",
      "summary": "中延の自治功労者。耕地整理に協力し、八幡神社の総代を50年余り務めた。",
      "description": "慶応3年（1867年）12月に中延村で生まれた。明治22年に五か村が合併するときの新村名を決める会議では、戸越側が「竹生村」を、中延側が「旗岡村」を提案して会議が混乱し、中延の代表が引き上げたという話が残る。大正7年から始まった耕地整理に進んで協力して中延の発展の基礎をつくり、大正末期から50年余り八幡神社の総代を務めて、戦災で焼けた社頭の再建を進めた。80歳を記念して『荏原中延史』前編を、98歳で後編を出した。昭和41年（1966年）1月に100歳で没した。",
      "birthYear": 1867,
      "deathYear": 1966,
      "yearText": "慶応3年（1867年）〜昭和41年（1966年）",
      "era": "meiji",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "中延の八幡神社の総代を50年余り務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「芳根彌三郎」38〜39頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-sakurai-otaro",
      "name": "桜井翁太郎",
      "summary": "大井町の助役から町長になり、大正5年から11年まで務めた。",
      "description": "明治3年（1870年）に大井村の倉田の旧家に生まれた。明治33年10月に大井町の有給助役になり、のち名誉助役として田中肇町長を助けた。大正5年（1916年）1月に田中町長が没すると、同年2月23日の町会で町長に選ばれ、道路の改修や学校の増築に努めた。大正11年2月16日に病気で町長を退き、大正13年（1924年）9月15日に没して、北品川の法禅寺の墓域に葬られた。",
      "birthYear": 1870,
      "deathYear": 1924,
      "yearText": "明治3年（1870年）〜大正13年（1924年）",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町長を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「桜井翁太郎」41頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-nishimura-kikujiro",
      "name": "西村菊次郎",
      "summary": "大井の府会議員で、市郡併合の記念に『大井町史』を編んだ大井町長。",
      "description": "明治4年（1871年）11月7日に大井で生まれた。明治44年から郡会議員を2期、大正13年から府会議員を3期務め、昭和7年4月に大井町長になった。大井村・大井町の議員を明治37年から昭和4年まで連続7回務めた。昭和7年に刊行された『大井町史』は、市郡併合を記念して町長時代につくられたものである。",
      "birthYear": 1871,
      "deathYear": null,
      "yearText": "明治4年（1871年）〜",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町長として『大井町史』を刊行した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「西村菊次郎」41頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-shigemune-hosui",
      "name": "重宗芳水",
      "kana": "しげむねほうすい",
      "summary": "明電舎の創立者。大崎に芳水小学校の敷地と校舎を寄付する遺志を残した電気工業家。",
      "description": "明治6年（1873年）7月11日に山口県の岩国に生まれ、16歳で東京に出て、明治36年に明電舎という電気機械の製造工場を創立した。大正2年には大崎町に新工場を建設し、日本の電気工業界の権威となった。大正6年（1917年）12月30日に45歳で没した。品川区立の芳水小学校は大正7年の創立で、芳水の遺志に基づき夫人のたけ子が、敷地・校舎・机椅子の備品まで揃えて寄付したもので、のち教室や講堂も寄付した。",
      "birthYear": 1873,
      "deathYear": 1917,
      "yearText": "明治6年（1873年）〜大正6年（1917年）",
      "era": "meiji",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎に工場を構え、芳水小学校の創立に遺志が生かされた。",
      "certainty": "fact",
      "variants": [
        {
          "claim": "区史 資料編は、明治36年に明電舎という電気機械の製造工場を創立したと記す。区史 通史編は、明治30年に三吉電機工場を離れて独立したと記し、創立の年の書き方が違う。",
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「重宗芳水」42頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「重宗芳水」42頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-fukuoka-heiemon",
      "name": "福岡平右衛門",
      "summary": "荏原郡会の最後の議長を務めた北品川の呉服商。",
      "description": "明治11年（1878年）に北品川に生まれ、家業は呉服太物商の大和屋だった。町会議員を経て明治44年に郡会議員になって議長を務めたが、大正12年の郡制の廃止で議員をやめた。その後も町会議員、品川神社の氏子総代、北馬場安全組合聯合会々長などを務め、町の自治に貢献した。",
      "birthYear": 1878,
      "deathYear": null,
      "yearText": "明治11年（1878年）〜",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の呉服商で、荏原郡会の最後の議長。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「福岡平右衛門」44頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-toyomichi-shunkai",
      "name": "豊道春海",
      "kana": "とよみちしゅんかい",
      "summary": "書家。西五反田の行元寺の住職で、書道を日展に参加させた。",
      "description": "明治11年（1878年）に栃木県に生まれ、西川春洞に書道を学んだ。大正13年に日本書道作振会を創立し、書道界の発展に尽くした。とくに戦後、書道を日展に参加させた功績が大きいとされる。昭和42年に文化功労者に選ばれ、昭和45年（1970年）9月26日に92歳で没した。西五反田の天台宗行元寺の住職で、龍門書道会の指導も行った。墓は西五反田の安養院の墓地にある。",
      "birthYear": 1878,
      "deathYear": 1970,
      "yearText": "明治11年（1878年）〜昭和45年（1970年）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "西五反田の行元寺の住職で、墓が安養院にある。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「豊道春海」44〜45頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ishihara-eimei",
      "name": "石原永明",
      "summary": "大井町会議員から都議会議長になった弁護士。",
      "description": "明治12年（1879年）1月に愛知県に生まれ、明治33年に明治大学を卒業して判検事試験に合格し、検事になった。武州紡績社長などを経て、昭和4年に弁護士を開業した。大正10年5月に大井町会議員に当選して以来3期、市会議員、府会議員、都議会議員、同議長などを歴任した。",
      "birthYear": 1879,
      "deathYear": null,
      "yearText": "明治12年（1879年）〜",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町会議員から都議会議長になった。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「石原永明」45頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ohashi-seitaro",
      "name": "大橋清太郎",
      "summary": "品川町長・衆議院議員で、明治天皇聖蹟保存会の会長として北品川の聖蹟公園の完成に尽力した。",
      "description": "明治15年（1882年）11月に品川の材木商の家に生まれ、品川町会議員、品川町長、府会議員・同議長、市会議員を歴任した。昭和17年4月、伊藤武七郎の後を受けて衆議院議員に当選した（2回）。明治天皇聖蹟保存会を設立して会長となり、昭和11年7月の創立から、昭和13年11月に北品川の行在所跡に記念公園が完成するまで尽力した。俳句を趣味とし、虚子のホトトギス同人だった。昭和37年（1962年）11月25日に81歳で没し、北品川の清徳寺に葬られた。",
      "birthYear": 1882,
      "deathYear": 1962,
      "yearText": "明治15年（1882年）〜昭和37年（1962年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の行在所跡の記念公園（聖蹟公園）の完成に尽力した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「大橋清太郎」46頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-hara-kunizo",
      "name": "原邦造",
      "kana": "はらくにぞう",
      "summary": "実業家で、原六郎の養子。北品川の御殿山の大邸宅を継いだ。",
      "description": "明治15年（1882年）6月に大阪に生まれ、実業家の原六郎の養子となって昭和8年に家督を継いだ。京都大学を卒業して満鉄に入り、のち実業界に入って、帝都高速度交通営団総裁のほか多数の一流会社の重役・会長を務めた。北品川4丁目（御殿山）の大邸宅は先代の六郎が営んだもので、立派な林泉と亭樹が残っていると、1973年刊の区史 資料編は記している（刊行時点の記述で、現在の状態は確認していない）。昭和33年（1958年）に76歳で没した。",
      "birthYear": 1882,
      "deathYear": 1958,
      "yearText": "明治15年（1882年）〜昭和33年（1958年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の御殿山の大邸宅を継いだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「原邦造」47頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-yamamura-koka",
      "name": "山村耕花",
      "summary": "品川生まれの日本画家。",
      "description": "明治18年（1885年）に品川に生まれ、明治40年に東京美術学校を卒業して尾形月耕に師事した。第8回文展（大正3年）に出品し、第3回院展（大正5年）に初入選して、日本美術院同人に推された。大正9年の第7回院展には絵巻「西行撰集抄」を出した。谷崎潤一郎の『お艶ごろし』（大正4年）の挿絵と表紙も描いている。昭和17年（1942年）1月25日に59歳で没し、大井の来福寺の墓地に葬られた。",
      "birthYear": 1885,
      "deathYear": 1942,
      "yearText": "明治18年（1885年）〜昭和17年（1942年）",
      "era": "meiji",
      "areas": [
        "shinagawa",
        "oi"
      ],
      "shinagawaRelation": "品川の生まれで、墓が大井の来福寺にある。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「山村耕花」47頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kuramoto-hikogoro",
      "name": "倉本彦五郎",
      "summary": "大井の自治功労者。町会議員を19年余り務め、『品川用水沿革史』を刊行した。",
      "description": "明治18年（1885年）5月23日に大井村の原に生まれ、大正2年に大井町会議員に当選して、昭和7年の市郡併合まで19年4か月務めた。続いて品川区会議員に当選し、昭和16年に区会議長になった。大正6年からは大井銀行の支配人を務め、同行が麹町銀行に合併されたあとは取締役になった。著書に『悠々旅日記』があり、『品川用水沿革史』の刊行も功績とされる。昭和35年（1960年）3月8日に75歳で没した。",
      "birthYear": 1885,
      "deathYear": 1960,
      "yearText": "明治18年（1885年）〜昭和35年（1960年）",
      "era": "meiji",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井町会議員・品川区会議長を務め、『品川用水沿革史』を刊行した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「倉本彦五郎」48頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-matsuoka-komakichi",
      "name": "松岡駒吉",
      "summary": "労働運動家・政治家。大井庚塚町に住み、戦後は衆議院議長を務めた。",
      "description": "明治21年（1888年）4月8日に鳥取県に生まれ、舞鶴海軍工廠の旋盤工見習などを経て、大正3年に友愛会に加わり、のち日本労働総同盟の主事・会長を務めた。戦後は総同盟を再建して会長となり、昭和21年から衆議院議員に5回当選し、第1国会から第4国会まで衆議院議長を務めた。昭和33年（1958年）8月14日に死去した。大井庚塚町（現在の大井7丁目）に住み、品川区を含む東京第二区から選ばれた。",
      "birthYear": 1888,
      "deathYear": 1958,
      "yearText": "明治21年（1888年）〜昭和33年（1958年）",
      "era": "taisho",
      "areas": [
        "oi"
      ],
      "shinagawaRelation": "大井庚塚町（現在の大井7丁目）に住んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「松岡駒吉」49頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-ito-koan",
      "name": "伊藤康安",
      "summary": "東海寺の塔頭春雨寺の住職で、早稲田大学教授の国文学者。",
      "description": "明治23年（1890年）9月23日に北品川宿の春雨庵（現在の春雨寺）に生まれた。品川小学校を経て早稲田大学を卒業し、大正7年から早稲田大学で教え、昭和17年に文学部教授になり、昭和36年に名誉教授になった。日本の仏教文学の研究にすぐれ、昭和9年の『新釈沢庵和尚法語』をはじめ、『禅庵閑語』『沢庵の生涯とその思想』などを著した。昭和40年（1965年）12月10日に死去し、春雨寺の墓域に葬られた。",
      "birthYear": 1890,
      "deathYear": 1965,
      "yearText": "明治23年（1890年）〜昭和40年（1965年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "北品川の春雨寺の住職で、沢庵の研究書を著した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「伊藤康安」50頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-nishimoto-kei",
      "name": "西本啓",
      "summary": "大崎で電線製造業を興し、都議会議員まで務めた。",
      "description": "明治25年（1892年）10月23日に広島市に生まれ、大正3年に早稲田大学理工科を卒業して逓信省に勤めた。大正5年9月に大崎町で電線製造業の西本工業所を興した。大崎町会議員から品川区会議員、東京市会、府会、都議会議員として、長年にわたり自治に関わった。昭和34年（1959年）6月16日に67歳で没した。",
      "birthYear": 1892,
      "deathYear": 1959,
      "yearText": "明治25年（1892年）〜昭和34年（1959年）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "大崎で西本工業所を興し、区会・都議会の議員を務めた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「西本啓」51頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-murata-kakuko",
      "name": "村田嘉久子",
      "kana": "むらたかくこ",
      "summary": "品川生まれの女優。帝国劇場の女優第一号の一人。",
      "description": "明治26年（1893年）4月16日に品川に生まれ、歌舞伎俳優尾上蟹十郎の妹にあたる。帝国劇場付属技芸学校の第一期生として、明治44年の帝国劇場の開場と同時に初舞台を踏み、明治・大正・昭和の三代にわたって活躍した。大正8年には英国皇太子の前で「四人道成寺」を演じた。昭和44年（1969年）7月26日に76歳で没し、南品川の願行寺の墓地に葬られた。",
      "birthYear": 1893,
      "deathYear": 1969,
      "yearText": "明治26年（1893年）〜昭和44年（1969年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川の生まれで、墓が南品川の願行寺にある。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「村田嘉久子」52頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-kamijo-hidesuke",
      "name": "上条秀介",
      "kana": "かみじょうひですけ",
      "summary": "昭和医学専門学校（現在の昭和大学の前身）の創立者。",
      "description": "明治26年（1893年）12月22日に長野県に生まれ、大正8年に東京帝国大学医学部を卒業した。臨床医の養成を目的とする医学専門学校の設立を企て、大正14年5月に、受持患者だった平塚村の鏑木忠正から、中延の1万余坪の土地の提供を受けた。昭和2年7月に校舎と付属病院の建設に着工し、昭和3年3月17日に昭和医学専門学校の設立が認可され、4月1日に開校した。昭和13年に校長に就任し、昭和21年に昭和医科大学の設立が認可されて学長になった。戦後は東京病院協会、日本病院協会の設立を推進して初代会長になった。",
      "birthYear": 1893,
      "deathYear": null,
      "yearText": "明治26年（1893年）〜",
      "era": "taisho",
      "areas": [
        "ebara"
      ],
      "shinagawaRelation": "中延に昭和医学専門学校を創立した。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「上条秀介」52〜53頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-takabayashi-katsutaro",
      "name": "高林勝太郎",
      "summary": "東大崎の土木建築業の家に生まれ、区会議員から都議会議員になった。",
      "description": "明治27年（1894年）1月8日に東大崎で生まれ、土木建築を家業とした。昭和15年11月から26年3月まで区議会議員を3期、同年4月から都議会議員を務め、昭和29年にはオリンピック大会招致のため欧州にスタジアムの視察に出かけた。区・都議会の在職中に、道路建設や上下水道の完成に力を尽くした。昭和38年（1963年）12月8日に69歳で没した。",
      "birthYear": 1894,
      "deathYear": 1963,
      "yearText": "明治27年（1894年）〜昭和38年（1963年）",
      "era": "taisho",
      "areas": [
        "osaki"
      ],
      "shinagawaRelation": "東大崎の土木建築業の家に生まれ、道路や上下水道の整備に尽くした。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「高林勝太郎」53頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-shiomi-hiroshi",
      "name": "汐見洋",
      "summary": "品川生まれの新劇・映画の俳優。",
      "description": "明治28年（1895年）7月に品川に生まれ、本名は高山喜三郎。慶應義塾大学に学び、大正8年に新劇団研究所を組織し、大正13年の築地小劇場の創立とともに同人として参加した。のち東宝映画の俳優となり、晩年は品川に住んだ。",
      "birthYear": 1895,
      "deathYear": null,
      "yearText": "明治28年（1895年）〜",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "品川に生まれ、晩年も品川に住んだ。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「汐見洋」54頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "pe-arisaka-yotaro",
      "name": "有坂與太郎",
      "summary": "人形・郷土玩具の研究家。南品川の浅間台に郷土玩具の博物館を建てた。",
      "description": "明治29年（1896年）1月に生まれ、人形の研究に専念した。南品川の浅間台の自宅に「蘇民将来」の民具をかたどった郷土玩具博物館を建てて内外に知られた。著書に『日本玩具史』（昭和6年）、『五月人形考』『日本雛祭考』などがあり、雑誌「鯛車」を発行して、地方の郷土玩具の指導にあたった。昭和36年（1961年）6月7日に59歳で没した。",
      "birthYear": 1896,
      "deathYear": 1961,
      "yearText": "明治29年（1896年）〜昭和36年（1961年）",
      "era": "meiji",
      "areas": [
        "shinagawa"
      ],
      "shinagawaRelation": "南品川の浅間台に郷土玩具の博物館を建てた。",
      "certainty": "fact",
      "sources": [
        {
          "ref": "sgw-kushi-shiryo",
          "locator": "人物略伝「有坂與太郎」54頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    }
  ]
};
