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
  "updatedAt": "2026-11-19",
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
        "description": "師の白牛禅師が没した翌年、その句碑を泊船寺の境内に建てる発起人となりました。大井の水神の石祠は文化5年に大井村の村民が寄進したもので、その願主として時の名主・大野貫蔵惟一とその子である惟図（のちの名主、俳人景山）の名が刻まれています。",
        "birthYear": null,
        "deathYear": null,
        "yearText": "生没年はこの資料では確認できていません",
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
          }
        ],
        "verifiedAt": "2026-11-20"
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
      }
  ]
};
