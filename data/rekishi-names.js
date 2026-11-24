// 品川区議会DB データファイル（「品川の歴史」の地名の由来）
//
// 語彙（地名の種類・地区・確実性・出典）は data/rekishi.js が正。
//
// 掲載の約束:
//  - 由来は、出典で確認できたものだけ origin に書く。
//    確認できていないものは origin を null のままにする。
//    よく知られている説でも、出典で確かめていなければ書かない。
//  - 説が分かれるものは variants に説ごとの出典を付けて並べる。
//  - 由来が分からない旧地名も、公式資料のどこに現れるかが分かれば載せる。
//    「どこで確かめられるか」が分かること自体が、調べるときの手がかりになる。
//
// 出典は品川区公式「指定文化財」、しながわデジタルアーカイブの
// 「住居表示新旧対照表」（旧町名の現在地）、品川区史 通史編 上巻（村名などの由来）。
// 収録は区内の地名の一部にとどまる。広報しながわの地名連載は現在たどり着けない
// （docs/rekishi-plan.md 参照）。
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.rekishiNames = {
  "schemaVersion": 1,
  "updatedAt": "2026-11-24",
  "note": "品川区の地名について、出典で確認できた由来と、公式資料に現れる旧地名を集めています。由来が確認できていないものは、その旨を明示しています。",
  "scopeNote": "出典は品川区公式「指定文化財」の解説、住居表示新旧対照表、品川区史です。収録しているのは区内の地名の一部にとどまります。",
  "items": [
    {
      "id": "nm-oi",
      "name": "大井",
      "kana": "おおい",
      "nameKind": "current-town",
      "summary": "光福寺に湧いた泉に由来すると伝えられる地名です。現在も大井・西大井・東大井・南大井として残ります。",
      "origin": "光福寺の墓地にある横穴式の井戸のかたわらに、「開基了海上人産湯井 当地名はこの井泉より起る」と記した石碑が立っています。寺伝では、松の木の下から忽然と湧き出した泉の水を産湯として子を沐浴させ、松丸と名づけ、この井戸を「大井」と命名したとされ、大井の地名はこの泉に由来すると伝えられています。",
      "description": "寺伝によれば、元久の乱によって東国に流された頭中将光福は、当時の荏原郡を支配していた紀実経のもとに身を寄せ、実経の娘を妻としました。子が無かったため蔵王権現に子授けを祈願したところ、妻は白布を呑む夢を見て懐妊し、建保元年（1213年）に男児を産みます。この男児がのちの了海で、天台宗であった神宮寺を真宗に改め、父の名をとって光福寺と改称したと伝えられています。",
      "areas": ["oi"],
      "categories": ["placename"],
      "certainty": "tradition",
      "variants": [
        {
          "claim": "頭中将の名は「光福」とされるが、「光政」とする説もあると出典に併記されている。",
          "ref": "sgw-bunkazai",
          "locator": "大井地区の指定文化財 史跡第12号「大井の井」"
        },
        {
          "claim": "区史は、村内の光福寺境内の古井戸を建仁元年（1201年）に掘ったものとし、土地の人がこれを「大井」と呼んだことから周辺を大井と呼ぶようになったとする説を紹介している。掘った年は、寺伝が語る了海の誕生（建保元年・1213年）より前になっている。このほか、井田の広大な郷説・大井氏の居住説・大藺説が並ぶ（大井村の項に記載）。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「大井村」437〜443頁"
        }
      ],
      "relatedPlaces": ["pl-3963af8d45"],
      "relatedEvents": ["ev-1213-ryokai-birth"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第12号「大井の井」" }],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kijinomiya",
      "name": "雉子ノ宮",
      "kana": "きじのみや",
      "nameKind": "other",
      "summary": "三代将軍徳川家光の鷹狩りに由来すると伝えられる社名です。江戸時代の初めまでは「大鳥大明神」と呼ばれていました。",
      "origin": "家光がこの付近で鷹狩りをした折、一羽の白いキジが神社の森に逃げ込んで見えなくなったことから、家光が神社の名を「雉子ノ宮」と呼ぶよう命じ、以来そう称したと伝えられています。",
      "description": "雉子神社は文明年間（1469〜1487年）の創建と伝えられる古い神社で、いまも「雉子ノ宮」の名で親しまれています。",
      "areas": ["osaki"],
      "categories": ["placename", "temple"],
      "certainty": "tradition",
      "relatedPlaces": ["pl-9aaa87e538"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「雉子神社文書」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-kuzuhara",
      "name": "葛原",
      "kana": "くずはら",
      "nameKind": "other",
      "summary": "旧中延村にある葛原神社の名で、平氏の始祖とされる葛原親王の名に由来します。",
      "origin": "葛原の名は、この地域を開拓した中延村の旧家・鏑木家の祖とされる、平氏の始祖・葛原親王（桓武天皇の第三皇子）の名に由来します。",
      "description": "葛原神社（妙見社）は旧中延村の持ちで、鏑木家の氏神でした。日蓮宗で妙見菩薩を本尊として信仰されていたことから、仏教にゆかりのあるボダイジュが植えられたと考えられています。",
      "areas": ["ebara"],
      "categories": ["placename", "temple"],
      "certainty": "fact",
      "relatedPlaces": ["pl-3fd22a61e8"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 天然記念物「葛原神社のボダイジュ」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-kachishinshuku",
      "name": "歩行新宿",
      "kana": "かちしんしゅく",
      "nameKind": "old-post",
      "summary": "品川宿に新しく加わった宿で、加宿が認められた際にこの名が定められました。品川三宿のひとつです。",
      "origin": "品川宿の発展とともに北品川宿の北側、高輪寄りに新しい町並が形成され、伝馬の人足を負担するようになりました。これを担っていた北品川の法禅寺・善福寺の両門前町屋と新町が、宿内と変わらないとして宿場に加えてほしいと道中奉行に訴え出ます。江戸に近い地の利のある新町らに客を取られるとして南北両品川宿は反対しましたが、結局は加宿が許され、その名称を「歩行新宿」と定めました。宿場が本来負担する伝馬と歩行人足のうち、歩行人足だけを負担する新しい宿場、という意味の名です。",
      "description": "この経過は、享保7年（1722年）12月に下付された「品川歩行新宿加宿裁許状」に書かれています。裁許状は歩行新宿の名主・飯田家に所蔵されていたものが品川区に寄贈され、品川歴史館に保管されています。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedPlaces": ["pl-6b12d55eea", "pl-550cbf7e0e"],
      "relatedNames": ["nm-shinagawa-shuku", "nm-kita-shinagawa-shuku", "nm-minami-shinagawa-shuku"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」" }, {"ref": "sgw-kushi-zokushiryo-1", "locator": "品川の地名「品川地区の地名」「品川歩行新宿」18頁"}],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-shinagawa-shuku",
      "name": "品川宿",
      "kana": "しながわしゅく",
      "nameKind": "old-post",
      "summary": "東海道五十三次の第一の宿場。慶長6年に伝馬宿となり、のちに歩行新宿・北品川宿・南品川宿の品川三宿で構成されました。",
      "origin": null,
      "description": "慶長6年（1601年）正月、徳川家康が東海道に伝馬の制度を定め、品川宿は伝馬宿となりました。このころは北品川宿と南品川宿の二宿で構成され、伝馬の提供を両宿で負担していました。のちに歩行新宿が加宿として加わり、三宿になります。宿駅制度は明治5年（1872年）に廃止されました。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedPlaces": ["pl-550cbf7e0e"],
      "relatedNames": ["nm-kachishinshuku", "nm-kita-shinagawa-shuku", "nm-minami-shinagawa-shuku"],
      "relatedEvents": ["ev-1635-honjin", "ev-1872-shukueki-abolished"],
      "sources": [
        { "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」" },
        { "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第7号「東海道品川宿本陣跡」" }
      ],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-kita-shinagawa-shuku",
      "name": "北品川宿",
      "kana": "きたしながわしゅく",
      "nameKind": "old-post",
      "summary": "品川宿を構成した宿のひとつ。南品川宿とともに伝馬を負担していました。目黒川の北側の宿で、南品川宿に対して北と呼ばれました。",
      "origin": "品川は、江戸時代の初め（正保年中の改定図）には一つの「品川町」でしたが、元禄年中の改定図では「南品川町」「北品川町」に分かれています。室町時代の妙国寺文書に「南品川」の名が見えるため、それ以前から南北に分かれていたと推定されますが、正式に分かれた時期は明らかではありません。北品川宿は、目黒川に架かる境橋（現在の品川橋）から北、歩行新宿までの東海道沿いの町並みです。",
      "description": "江戸時代中期には、品川宿の本陣は北品川宿のものだけになりました。明治2年（1869年）には、北品川宿の北浜の人々を中心に品川丸嘉講社が結成され、品川神社に富士塚が築かれています。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedNames": ["nm-shinagawa-shuku"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」、有形民俗「品川神社富士塚（品川富士）」" }, {"ref": "sgw-kushi-zokushiryo-1", "locator": "品川の地名「品川地区の地名」「北品川宿」21頁"}],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-minami-shinagawa-shuku",
      "name": "南品川宿",
      "kana": "みなみしながわしゅく",
      "nameKind": "old-post",
      "summary": "品川宿を構成した宿のひとつ。北品川宿とともに伝馬を負担していました。由来は確認できていません。",
      "origin": null,
      "description": "本陣は当初、北品川宿と南品川宿に一軒ずつありましたが、南品川宿のものは早くに無くなりました。旧南品川宿の庚申信仰を伝えるものとして、本覚寺の石造庚申供養塔が区の指定文化財になっています。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedNames": ["nm-shinagawa-shuku"],
      "relatedEvents": ["ev-1635-honjin"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 有形民俗「本覚寺石造庚申供養塔」、古文書第6号「品川歩行新宿加宿裁許状」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-oi-mura",
      "name": "大井村",
      "kana": "おおいむら",
      "nameKind": "old-village",
      "summary": "江戸時代から明治にかけての村。地名「大井」と同じ由来とされ、区史は村内の古井戸にちなむ説を中心に、ほかの説も並べています。",
      "origin": "区史は、村内の光福寺境内にある古井戸（建仁元年〈1201年〉に掘ったとされる）を土地の人が「大井」と呼び、その周辺を大井と呼ぶようになったという説をあげています。『新編武蔵風土記稿』と「南浦地名考」がこの説をのせています。",
      "description": "上大崎村名主・竹内家の文書には、大井村の石積護岸の修復へ人足を動員した記録が残ります。明治30年代には如来寺が大井村の現在地に移り、大正15年（1926年）に養玉院と合併しました。",
      "areas": ["oi"],
      "categories": ["placename"],
      "certainty": "fact",
      "variants": [
        {
          "claim": "「南浦地名考」には、井田（水田）が広く大きな郷であることから大井の名が起こったとする説もあると、区史は記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「大井村」437〜443頁"
        },
        {
          "claim": "昔この土地に大井という人が住み、守護職に任じられた家柄だったので、地名も大井と呼ぶようになったとする説があると、区史は記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「大井村」437〜443頁"
        },
        {
          "claim": "もとは「大井」ではなく「大藺」で、荏草や藺草が一面に茂っていたため大藺と呼び、それが訛って大井になったとする説があると、区史は記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「大井村」437〜443頁"
        }
      ],
      "relatedNames": ["nm-oi"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「上大崎村名主竹内家文書」、大井地区の指定文化財 彫刻「木造五智如来坐像」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "四 近世編（一）品川区地域の町と村「大井村」437〜443頁" }],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kamiosaki-mura",
      "name": "上大崎村",
      "kana": "かみおおさきむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。名主は竹内家で、その文書が区の指定文化財になっています。地名は台地の尾の端にあたるからとする説があります。",
      "origin": "「南浦地名考」は、秩父山から続く尾崎にあたるので名がつき、のちに大崎と書き改めたと説明しています。区史は、北から続く台地が目黒川に落ちるところで終わるのは事実で、それを尾の端と見立てた説だろうと述べています。",
      "description": "竹内家文書には、宗門改帳や五人組帳のほか、東海道品川宿の助郷役の負担、大井村石積護岸修復への人足動員、三田用水由来書、鷹場関係文書などが含まれ、品川領や上大崎村のようすを知る史料になっています。徳蔵寺の日本諸国社号等標石群には「武 品川領上大崎村 福本氏」と刻まれた石もあります。",
      "areas": ["osaki"],
      "categories": ["placename"],
      "certainty": "fact",
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「上大崎村名主竹内家文書」、有形民俗「日本諸国社号等標石群」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "四 近世編（一）品川区地域の町と村「上大崎村」421〜422頁" }],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-shimoosaki-mura",
      "name": "下大崎村",
      "kana": "しもおおさきむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。名主は島田家で、その文書が区の指定文化財になっています。由来は確認できていません。",
      "origin": null,
      "description": "島田家文書は江戸時代から近代にかけての8点で、享和3年（1803年）の「御用留」帳には江戸城へのさまざまな上納品が記録され、当時の支配関係が分かります。",
      "areas": ["osaki"],
      "categories": ["placename"],
      "certainty": "fact",
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「下大崎村島田家文書附写真及びガラス乾板」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-irugibashi-mura",
      "name": "居木橋村",
      "kana": "いるぎばしむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。名主は松原家で、その屋敷神と文書が区の指定文化財になっています。由来は確認できていません。",
      "origin": null,
      "description": "居木神社の末社である厳島神社は、もとは旧居木橋村の名主・松原家の屋敷神でした。松原家文書は、幕末から昭和42年（1967年）にかけての文書で、近世の名主の役割や明治期の農林業の記録などを含みます。文政11年（1828年）には松原氏が道標を造立しており、品川宿から居木橋村に入ってすぐの分かれ道にあったと推定されています。",
      "areas": ["osaki"],
      "categories": ["placename"],
      "certainty": "fact",
      "relatedPlaces": ["pl-8862991aef"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 建造物第3号「居木神社末社厳島神社」、古文書第12号「松原家文書」、史跡「文政十一年銘道標（2）」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-togoshi-mura",
      "name": "戸越村",
      "kana": "とごしむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。戸越八幡神社への奉納品が村民の名で残っています。村名は「江戸を越えた里」とする説があります。",
      "origin": "「南浦地名考」には、江戸を越えて行く先の里だから戸越と呼ぶ、という説がのっています。",
      "description": "延享3年（1746年）には戸越村の村民が戸越八幡神社へ一対の石造狛犬を奉納しており、社殿手前の参道敷石の両側に建てられています。同社の奉納絵馬も、奉納者の多くは戸越村の村民です。",
      "areas": ["ebara"],
      "categories": ["placename"],
      "certainty": "fact",
      "variants": [
        {
          "claim": "江戸の千戸万戸を越える里だから戸越という、とする説も「南浦地名考」にのっていると、区史は記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「戸越村」429〜432頁"
        },
        {
          "claim": "読みは「とごし」ではなく「とごえ」が本来だとされると、区史は記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「戸越村」429〜432頁"
        }
      ],
      "relatedPlaces": ["pl-9f3cab87af"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗第5号「戸越八幡神社石造狛犬」、有形民俗「戸越八幡神社奉納絵馬」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "四 近世編（一）品川区地域の町と村「戸越村」429〜432頁" }],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-nakanobu-mura",
      "name": "中延村",
      "kana": "なかのぶむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。旧家の鏑木家が一帯を開拓したと伝えられます。由来は確認できていません。",
      "origin": null,
      "description": "葛原神社のある一帯は、中延村の旧家・鏑木家が開拓した地域で、同社は鏑木家の氏神でした。寛文5年（1665年）には旧中延村の庚申講中が庚申供養塔を造立しており、区内に残る50基あまりの庚申塔のなかで3番目に古いものです。元治元年（1864年）には中延村の竹屋吉治郎が旗岡八幡神社へ大絵馬を奉納しています。",
      "areas": ["ebara"],
      "categories": ["placename"],
      "certainty": "fact",
      "relatedNames": ["nm-kuzuhara"],
      "relatedPlaces": ["pl-3fd22a61e8"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 天然記念物「葛原神社のボダイジュ」、有形民俗「旗岡八幡神社大絵馬」、史跡「旗の台一丁目石造庚申供養塔」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-kamihebikubo-mura",
      "name": "上蛇窪村",
      "kana": "かみへびくぼむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。村の中心を中通りが通り、池上・洗足・品川の各方面へ向かう道の分岐点がありました。蛇が多い低湿地だったからとする説があります。",
      "origin": "このあたりが低湿地で蛇が多く住んでいたことから蛇窪と呼ぶようになった、という説を、『新編武蔵風土記稿』と「南浦地名考」がともにのせています。",
      "description": "大原不動堂のある場所は、旧上蛇窪村の中心を通る中通りに沿った地点で、上蛇窪村から池上・洗足・品川の各方面に至る道の分岐点にあたりました。享保17年（1732年）には、この分岐点に六十六部廻国供養塔を兼ねた道標が建てられています。昭和38年（1963年）に、もとの位置からわずかに動いて現在の位置になりました。",
      "areas": ["ebara"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedPlaces": ["pl-48292015f6"],
      "relatedNames": ["nm-shinagawa-michi", "nm-senzoku-michi", "nm-ikegami-michi"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗「大原不動堂内石造供養塔群」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "四 近世編（一）品川区地域の町と村「上蛇窪村」432頁" }],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-yatsuyama-mura",
      "name": "谷山村",
      "kana": "やつやまむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。徳蔵寺の檀徒にこの村の住民名が見られます。由来は確認できていません。",
      "origin": null,
      "description": "徳蔵寺の日本諸国社号等標石群には、上大崎村・居木橋村・大崎村・谷山村の住民名のほか、京橋や木挽町など江戸府内の住民の名も刻まれています。現在のどの範囲にあたるかは、この出典からは分かりません。",
      "areas": ["unknown"],
      "categories": ["placename"],
      "certainty": "fact",
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 有形民俗「日本諸国社号等標石群」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-shinagawa-michi",
      "name": "品川道",
      "kana": "しながわみち",
      "nameKind": "road",
      "summary": "上蛇窪村から品川方面へ向かった道。享保17年の道標がその分岐点に建てられました。",
      "origin": null,
      "description": "旧上蛇窪村の中心を通る中通り沿いの分岐点から、品川方面へ向かう道です。分岐点には、六十六部廻国供養塔を兼ねた道標が享保17年（1732年）に建てられました。",
      "areas": ["ebara"],
      "categories": ["road", "placename"],
      "certainty": "fact",
      "relatedPlaces": ["pl-48292015f6"],
      "relatedNames": ["nm-kamihebikubo-mura"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗「大原不動堂内石造供養塔群」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-senzoku-michi",
      "name": "洗足道",
      "kana": "せんぞくみち",
      "nameKind": "road",
      "summary": "上蛇窪村から洗足方面へ向かった道。享保17年の道標がその分岐点に建てられました。",
      "origin": null,
      "description": "旧上蛇窪村の分岐点から洗足方面へ向かう道です。品川道・池上道とともに、この分岐点から分かれていました。",
      "areas": ["ebara"],
      "categories": ["road", "placename"],
      "certainty": "fact",
      "relatedPlaces": ["pl-48292015f6"],
      "relatedNames": ["nm-kamihebikubo-mura"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗「大原不動堂内石造供養塔群」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-ikegami-michi",
      "name": "池上道",
      "kana": "いけがみみち",
      "nameKind": "road",
      "summary": "上蛇窪村から池上方面へ向かった道。享保17年の道標がその分岐点に建てられました。",
      "origin": null,
      "description": "旧上蛇窪村の分岐点から池上方面へ向かう道です。品川道・洗足道とともに、この分岐点から分かれていました。",
      "areas": ["ebara"],
      "categories": ["road", "placename"],
      "certainty": "fact",
      "relatedPlaces": ["pl-48292015f6"],
      "relatedNames": ["nm-kamihebikubo-mura"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗「大原不動堂内石造供養塔群」" }],
      "verifiedAt": "2026-11-20"
    },
      {
        "id": "nm-1e47dee7",
        "name": "五反田",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東五反田1丁目・東五反田5丁目・西五反田1丁目ほかにあたります。",
        "origin": "区史 自然編は、水田が広がる広い沖積低地を示す地名の例として、五反田を百反・辻田（現在の大崎1丁目）とともにあげています。地形をあらわした名だという説明です。",
        "description": "住居表示の新旧対照表では、旧「五反田」の住所が現在の東五反田1丁目・東五反田5丁目・西五反田1丁目・東五反田3丁目・西五反田2丁目・東五反田2丁目・西五反田3丁目に対応しています（1,389件の住所）。対照表には由来が載っていませんが、品川区史は、水田が広がる低地を示す地名の例にあげています。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-c0cd8573fe"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「五反田」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "一 自然編（一）品川区の土地のなりたち「台地と低地」4〜5頁" }],
        "verifiedAt": "2026-11-24"
      },
      {
        "id": "nm-0419ce22",
        "name": "二葉町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の二葉1丁目・二葉3丁目・二葉4丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「二葉町」の住所が現在の二葉1丁目・二葉3丁目・二葉4丁目・二葉2丁目・西大井6丁目・大井2丁目に対応しています（1,379件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-7c675da673"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「二葉町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-4e6502a1",
        "name": "西大崎",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西五反田4丁目・西五反田5丁目・西五反田6丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「西大崎」の住所が現在の西五反田4丁目・西五反田5丁目・西五反田6丁目・西五反田7丁目・西五反田8丁目・荏原1丁目・小山台1丁目・大崎4丁目・小山1丁目・平塚2丁目に対応しています（1,376件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-21bb239d04"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「西大崎」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-a14bed04",
        "name": "東戸越",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の戸越1丁目・戸越6丁目・戸越5丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「東戸越」の住所が現在の戸越1丁目・戸越6丁目・戸越5丁目・戸越4丁目・戸越2丁目に対応しています（1,234件の住所）。由来はこの資料からは分かりません。",
        "areas": ["ebara"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-31f34154e9"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「東戸越」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-8faf2e0e",
        "name": "東大崎",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大崎3丁目・大崎4丁目・大崎2丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「東大崎」の住所が現在の大崎3丁目・大崎4丁目・大崎2丁目・大崎1丁目・大崎5丁目・西五反田8丁目に対応しています（972件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-9ef7570882"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「東大崎」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-109e6075",
        "name": "西戸越",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の平塚1丁目・戸越3丁目・戸越1丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「西戸越」の住所が現在の平塚1丁目・戸越3丁目・戸越1丁目に対応しています（680件の住所）。由来はこの資料からは分かりません。",
        "areas": ["ebara"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-2425eebdab"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「西戸越」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-40a0306d",
        "name": "大井伊藤町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西大井5丁目・西大井6丁目・二葉4丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井伊藤町」の住所が現在の西大井5丁目・西大井6丁目・二葉4丁目に対応しています（675件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-cdc88a79cb"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井伊藤町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-ec9c7b31",
        "name": "大井南浜川町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井4丁目・南大井1丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井南浜川町」の住所が現在の南大井4丁目・南大井1丁目に対応しています（489件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-691bc7bcb4"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井南浜川町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-9022811a",
        "name": "大井倉田町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井4丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井倉田町」の住所が現在の大井4丁目に対応しています（466件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-50a8e7d350"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井倉田町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-8fdf19ba",
        "name": "大井滝王子町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井5丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井滝王子町」の住所が現在の大井5丁目に対応しています（459件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-860d5b1917"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井滝王子町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-3e20cb0c",
        "name": "大崎本町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西五反田3丁目・西五反田5丁目・西五反田2丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大崎本町」の住所が現在の西五反田3丁目・西五反田5丁目・西五反田2丁目・西五反田4丁目・西五反田7丁目・西五反田6丁目に対応しています（455件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-d572e4a27e"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大崎本町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-db024c16",
        "name": "大井山中町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井3丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井山中町」の住所が現在の大井3丁目に対応しています（435件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-22fe38fbc4"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井山中町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-f2ceb41c",
        "name": "大井森下町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井2丁目・二葉1丁目・西大井1丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井森下町」の住所が現在の大井2丁目・二葉1丁目・西大井1丁目に対応しています（411件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-830e4803ce"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井森下町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-b7d90ffb",
        "name": "大井鮫洲町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井1丁目・東大井2丁目にあたります。",
        "origin": "区史 自然編は、鮫洲の地名は海岸に沿う砂洲に由来することが明らかだとしています。",
        "description": "住居表示の新旧対照表では、旧「大井鮫洲町」の住所が現在の東大井1丁目・東大井2丁目に対応しています（401件の住所）。対照表には由来が載っていません。町名のもとになった「鮫洲」については、品川区史が地形に由来する説と地名伝説を記しています。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "variants": [
          {
            "claim": "建長3年（1251年）に品川沖へ漂う大きな鮫を漁師が引き上げて腹を裂くと木像の観音が出てきた。人々がこれを祀った土地を鮫洲と呼んだ、という地名伝説がある。北条時頼がこの観音を安置する寺として海晏寺を建てたという話が『新編武蔵風土記稿』にのる。区史は真偽は分からないとし、大井村側の書上は鮫洲を鮫に結びつけていないと記している。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「鮫洲」443〜445頁"
          }
        ],
        "relatedPlaces": ["pl-ff22a693bf"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井鮫洲町」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "一 自然編（一）品川区の土地のなりたち「台地と低地」4〜5頁" }],
        "verifiedAt": "2026-11-24"
      },
      {
        "id": "nm-9996f40b",
        "name": "大井北浜川町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井2丁目・東大井3丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井北浜川町」の住所が現在の東大井2丁目・東大井3丁目に対応しています（394件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-6b9fb672fd"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井北浜川町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-22d5f5ec",
        "name": "大井鎧町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井1丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井鎧町」の住所が現在の大井1丁目に対応しています（384件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-5d844b28a0"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井鎧町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-cefcb28a",
        "name": "大井原町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西大井2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井原町」の住所が現在の西大井2丁目に対応しています（368件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-02f2c74daf"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井原町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-fcab1c33",
        "name": "大井金子町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西大井4丁目・西大井2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井金子町」の住所が現在の西大井4丁目・西大井2丁目に対応しています（367件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-715b452981"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井金子町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-dadd43ae",
        "name": "大井立会町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井5丁目・東大井6丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井立会町」の住所が現在の東大井5丁目・東大井6丁目に対応しています（363件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-55a1f682dc"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井立会町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-513b2b1d",
        "name": "大井庚塚町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井7丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井庚塚町」の住所が現在の大井7丁目に対応しています（334件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-d3eab4fe30"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井庚塚町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-52b3fb08",
        "name": "大井水神町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井6丁目・南大井5丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井水神町」の住所が現在の南大井6丁目・南大井5丁目に対応しています（311件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-b827da4ece"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井水神町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-fc7b40c1",
        "name": "大井元芝町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井3丁目・東大井2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井元芝町」の住所が現在の東大井3丁目・東大井2丁目に対応しています（275件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-7226f0e9b1"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井元芝町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-1c9f5015",
        "name": "大井鹿島町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井6丁目・大井7丁目・大井4丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井鹿島町」の住所が現在の大井6丁目・大井7丁目・大井4丁目に対応しています（269件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-2f35a03b4f"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井鹿島町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-957fb5f7",
        "name": "大井出石町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西大井3丁目・大井7丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井出石町」の住所が現在の西大井3丁目・大井7丁目に対応しています（265件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-fdb77e854a"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井出石町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-c5706f2b",
        "name": "大井関ヶ原町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井6丁目・南大井5丁目・東大井3丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井関ヶ原町」の住所が現在の東大井6丁目・南大井5丁目・東大井3丁目・東大井5丁目に対応しています（239件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-fb23570d36"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井関ヶ原町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-20630d2c",
        "name": "大井森前町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の西大井1丁目・二葉2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井森前町」の住所が現在の西大井1丁目・二葉2丁目に対応しています（233件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-52b42794fd"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井森前町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-02cd0a44",
        "name": "下大崎",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東五反田4丁目・上大崎1丁目・東五反田1丁目ほかにあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「下大崎」の住所が現在の東五反田4丁目・上大崎1丁目・東五反田1丁目・東五反田3丁目に対応しています（228件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-6ad5865d17"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「下大崎」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-dbc67c5e",
        "name": "大井権現町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の大井1丁目・広町2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井権現町」の住所が現在の大井1丁目・広町2丁目に対応しています（220件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-edc8ef41e5"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井権現町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-e6243bbc",
        "name": "大井鈴ヶ森町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井3丁目・南大井2丁目にあたります。",
        "origin": "区史は、弘化2年（1845年）の書上にある説を紹介しています。本来は一本松と呼ぶべき土地だが、地続きの不入斗村の鎮守に鈴ケ森八幡があったことから、品川の仕置場（刑場）を鈴ケ森と呼ぶようになったというものです。",
        "description": "住居表示の新旧対照表では、旧「大井鈴ヶ森町」の住所が現在の南大井3丁目・南大井2丁目に対応しています（207件の住所）。対照表には由来が載っていません。町名のもとになった「鈴ヶ森」については、品川区史が二つの説を紹介しています。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "variants": [
          {
            "claim": "『落穂集』には、江戸開府のころこの地にあった遊女町に関わって生まれた地名だとする説がある。慶長の初めに駿河国吉原宿から江戸へ下った者たちが新井宿の海辺で遊女屋を開き、店先ののれんの端につけた鈴を客が来る合図にしたので鈴ケ森と呼ぶようになった、という。区史は真実味を判定しがたいとしつつ、のちにこの地に三十軒屋と呼ぶ遊女町ができたのは確かだと記している。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「地名の由来」450〜451頁"
          }
        ],
        "relatedPlaces": ["pl-395e5e06c0"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井鈴ヶ森町」" }, { "ref": "sgw-kushi-tsushi-jo", "locator": "四 近世編（一）品川区地域の町と村「地名の由来」450〜451頁" }],
        "verifiedAt": "2026-11-24"
      },
      {
        "id": "nm-651681f8",
        "name": "大井海岸町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井3丁目・南大井2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井海岸町」の住所が現在の南大井3丁目・南大井2丁目に対応しています（206件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-408a7dc439"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井海岸町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-d2454e41",
        "name": "大井林町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東大井4丁目・東大井1丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井林町」の住所が現在の東大井4丁目・東大井1丁目に対応しています（163件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-c5c2ba9cf9"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井林町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-898acd95",
        "name": "上大崎長者丸",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の上大崎2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「上大崎長者丸」の住所が現在の上大崎2丁目に対応しています（152件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-e995707036"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「上大崎長者丸」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-667e9dc3",
        "name": "大井寺下町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井5丁目・南大井4丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井寺下町」の住所が現在の南大井5丁目・南大井4丁目に対応しています（150件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-ebebb99521"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井寺下町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-43f2c04c",
        "name": "上大崎中丸",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の上大崎3丁目・上大崎1丁目・東五反田5丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「上大崎中丸」の住所が現在の上大崎3丁目・上大崎1丁目・東五反田5丁目に対応しています（140件の住所）。由来はこの資料からは分かりません。",
        "areas": ["osaki"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-a4973d63d4"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「上大崎中丸」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-d5d7d37b",
        "name": "大井坂下町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の南大井6丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「大井坂下町」の住所が現在の南大井6丁目に対応しています（122件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-2f9fa3048a"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「大井坂下町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-41ac8d6b",
        "name": "勝島町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の勝島1丁目・勝島2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「勝島町」の住所が現在の勝島1丁目・勝島2丁目に対応しています（99件の住所）。由来はこの資料からは分かりません。",
        "areas": ["oi"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-3d627de238"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「勝島町」" }],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "nm-3f3c8946",
        "name": "天王洲町",
        "nameKind": "old-town",
        "summary": "昭和39年から42年の住居表示の実施まで使われていた町名。現在の東品川2丁目にあたります。",
        "origin": null,
        "description": "住居表示の新旧対照表では、旧「天王洲町」の住所が現在の東品川2丁目に対応しています（32件の住所）。由来はこの資料からは分かりません。",
        "areas": ["shinagawa"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedPlaces": ["pl-efa473bf6e"],
        "sources": [{ "ref": "adeac-shinagawa", "locator": "住居表示新旧対照表（平成23年11月時点）旧町名「天王洲町」" }],
        "verifiedAt": "2026-11-22"
      },
    {
      "id": "nm-yatsuyama",
      "name": "八ッ山",
      "kana": "やつやま",
      "nameKind": "other",
      "summary": "品川宿の最北端にある丘陵の名です。大日山ともいいました。『江戸砂子』は、昔そこに出洲が八つあったからだと説明します。",
      "origin": "区史は、なぜ八ッ山という地名が生まれたかはわからないとしたうえで、『江戸砂子』が、昔この場所に出洲が八つあったところからの名だと説明していることを紹介しています。",
      "description": "品川宿の最北端、江戸に接するところにある丘陵で、昔は高さ二丈あまりのがけがありました。がけが次第に崩れ、普請用の土に使われて、一部が平地になったといわれます。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「八ッ山」408頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-samezu",
      "name": "鮫洲",
      "kana": "さめず",
      "nameKind": "other",
      "summary": "京急の駅名にも残る地名です。区史は、海岸に沿う砂洲に由来すると説明し、鮫から観音像が出たという地名伝説も記しています。",
      "origin": "区史 自然編は、鮫洲の地名は海岸に沿う砂洲に由来することが明らかだとしています。",
      "description": "区史は、このあたり一帯を漠然と鮫洲と呼ぶと述べ、駅名として一番目立つ地名なので取り上げたとしています。",
      "areas": [
        "oi"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "estimate",
      "variants": [
        {
          "claim": "建長3年（1251年）に品川沖へ漂う大きな鮫を漁師が引き上げて腹を裂くと木像の観音が出てきた。人々がこれを祀った土地を鮫洲と呼んだ、という地名伝説がある。北条時頼がこの観音を安置する寺として海晏寺を建てたという話が『新編武蔵風土記稿』にのる。区史は真偽は分からないとし、大井村側の書上は鮫洲を鮫に結びつけていないと記している。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「鮫洲」443〜445頁"
        }
      ],
      "relatedNames": [
        "nm-b7d90ffb"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "一 自然編（一）品川区の土地のなりたち「台地と低地」4〜5頁"
        },
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「鮫洲」443〜445頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-suzugamori",
      "name": "鈴ケ森",
      "kana": "すずがもり",
      "nameKind": "other",
      "summary": "かつての品川の仕置場（刑場）の呼び名です。区史は、隣の村の鎮守の鈴ケ森八幡に由来する説と、遊女町の鈴に由来する説を紹介しています。",
      "origin": "弘化2年（1845年）の書上にある説として、区史は、本来は一本松と呼ぶべき土地だが、地続きの不入斗村の鎮守に鈴ケ森八幡があったことから、品川の仕置場を鈴ケ森と呼ぶようになったと紹介しています。",
      "description": "区史は、のちにこの地に三十軒屋と呼ぶ遊女町ができたのは確かで、明暦元年（1655年）に創立され、延宝8年（1680年）には321軒に栄えたが、同年閏8月6日の夜の大暴風雨で104軒が丸潰れ、27軒が大破したと記しています。",
      "areas": [
        "oi"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "variants": [
        {
          "claim": "『落穂集』には、江戸開府のころこの地にあった遊女町に関わって生まれた地名だとする説がある。慶長の初めに駿河国吉原宿から江戸へ下った者たちが新井宿の海辺で遊女屋を開き、店先ののれんの端につけた鈴を客が来る合図にしたので鈴ケ森と呼ぶようになった、という。区史は真実味を判定しがたいとしている。",
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「地名の由来」450〜451頁"
        }
      ],
      "relatedNames": [
        "nm-e6243bbc"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「地名の由来」450〜451頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kujirazuka",
      "name": "鯨塚",
      "kana": "くじらづか",
      "nameKind": "other",
      "summary": "御林町（大井）の八幡神社の境内にあった、漂着した鯨の頭骨を供養した塚です。区史が刊行されたときには、すでにありませんでした。",
      "origin": "嘉永4年（1851年）4月11日の朝、御林町の海岸に一頭の鯨が漂ってきて、漁師たちが全員で引きあげた。代官所の見分のうえ入札で売られ、深川の商人から浅草で見せ物にされたが、腐り始めたので油を絞った。残った頭骨を、鯨があがった土地の八幡神社に埋めて供養したのが鯨塚だと、区史は記しています。",
      "description": "区史は、この鯨塚は現在はなく、鯨ではなく鮫だったとの説もあって、真偽は判然としないと述べています。利田新地にももう一つの鯨塚があり、こちらは寛政年間（1789〜1801年）にとれた鯨のものです。江戸時代には、鯨を突いて捕る「突鯨」、沖を漂う鯨を引く「流鯨」、傷ついて流れ着いた「寄鯨」の別があり、税の割合が違いました。御林町の鯨は傷があり死んでいたので寄鯨、利田新地は突鯨にあたるようだと区史は書いています。",
      "areas": [
        "oi",
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "四 近世編（一）品川区地域の町と村「鯨塚」445〜447頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-suzaki",
      "name": "洲崎",
      "kana": "すさき",
      "nameKind": "other",
      "summary": "目黒川の河口付近の古い地名です。区史は、川が運んだ土砂がたまって三角洲が突き出したことを示す名だと説明しています。",
      "origin": "区史 自然編は、洲崎というこの付近の古い地名は、目黒川から運び出された土砂の堆積で、突き出した三角洲ができたことを示していると説明しています。",
      "description": "目黒川は河口部で南北の品川宿を分け、大きく北に迂回して歩行新宿で海に注いでいました。この大迂回は、南からの沿岸の漂砂で河口がしばしばふさがったためだと区史は述べています。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "estimate",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "一 自然編（一）品川区の土地のなりたち「谷の地形」15〜17頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-ebara",
      "name": "荏原",
      "kana": "えばら",
      "nameKind": "other",
      "summary": "郡名・地区名にもなった地名です。区史は、小山・平塚と並べて、平らな台地の面にもとづく地名と説明しています。",
      "origin": "区史 自然編は、区内の古い地名には地形をよく表すものが多いとして、小山・平塚、それに荏原そのものも、平坦な台地面にもとづいた地名だと説明しています。",
      "description": "区史は同じ箇所で、五反田・百反・辻田（のちの大崎1丁目）を水田が広がる沖積低地を示す地名、桐ヶ谷・幡ヶ谷・池ヶ谷を目黒川右岸の谷の地名、蛇窪を立会川に合流する支谷の地名の例に挙げています。",
      "areas": [
        "ebara"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "estimate",
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-jo",
          "locator": "一 自然編（一）品川区の土地のなりたち「台地と低地」4〜5頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-hiratsuka-mura",
      "name": "平塚村",
      "kana": "ひらつかむら",
      "nameKind": "old-village",
      "summary": "明治22年の町村合併で、戸越・上下蛇窪・中延・小山の5か村を合わせてできた村です。村名は、戸越側と中延側で意見が分かれて紛糾しました。",
      "origin": "中延側は、小山・中延・戸越の境界近くに平塚と呼ばれる約20坪の塚があり、大きな松が2本植えられて頂上に稲荷が祀られていて、5か村のほぼ中央にあたるので、これを村名にしたいと主張しました。",
      "description": "戸越側は、この地の名産となった孟宗竹を移植した人の功績を村名にとどめるため、「竹旭村」にしたいと主張しました。各村の一字をとって「戸小中蛇村」にしてはという意見も出るなど長い間折り合わず、結局、平塚村に落ち着きました。区史は、このことが昭和2年に平塚町が荏原町に改められるまで尾を引いたようだと述べています。",
      "areas": [
        "ebara"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "variants": [
        {
          "claim": "戸越側の村名案は「竹旭村」とした（明治21年の町村制実施録に収める戸越外2か村戸長の答申書による）。",
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「品川区域の町村合併」183〜187頁"
        },
        {
          "claim": "『荏原区史』（昭和18年刊）は、古老の話として戸越側の村名案を「竹生村」としている。区史は一次史料の答申書に従って「竹旭村」とした。",
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「品川区域の町村合併」183〜187頁の注"
        }
      ],
      "relatedNames": [
        "nm-togoshi-mura",
        "nm-ebara-machi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "五 近代編（二）明治後期の品川 2 市制・町村制の施行と町村合併「品川区域の町村合併」183〜187頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-ebara-machi",
      "name": "荏原町",
      "kana": "えばらまち",
      "nameKind": "old-village",
      "summary": "昭和2年7月から昭和7年の区制施行まで、現在の荏原地区の中心にあった町です。同名の地が各地にあった平塚町が、郡名の荏原を採って改称しました。",
      "origin": "平塚の名は東京府の北豊島のほか神奈川・千葉・群馬の各県にもあり、郵便物が各県を一巡する恐れさえありました。そこで平塚町会は昭和2年3月20日に改称を決議し、古くからゆかりがあり郡名にもなっていた「荏原」を採って荏原町としました。",
      "description": "東京府の許可は昭和2年5月に出され、7月1日から実施されました。荏原町は昭和7年10月の市郡併合で荏原区になりました。",
      "areas": [
        "ebara"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedEvents": [
        "ev-1927-ebara-machi-kaisho"
      ],
      "relatedNames": [
        "nm-hiratsuka-mura",
        "nm-ebara"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-tsushi-ge",
          "locator": "七 昭和編「平塚村の町制施行」450〜452頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kuromon-yokocho",
      "name": "黒門横町",
      "kana": "くろもんよこちょう",
      "nameKind": "road",
      "summary": "北品川一丁目と二丁目の境で、東海道から西へ入って東海寺へ向かった横町です。東海寺の大門が黒く塗られていたことから、この名で呼ばれました。",
      "origin": "寛政12年（1800年）の「東海寺絵図」では、東海道から東海寺へ入る通りを「東海寺大門通り」と呼んでいました。この大門が黒塗りだったため、横町は黒門横町、大門前の付近は黒門前と呼ばれるようになりました。",
      "description": "法禅寺の北側にあたる横町です。『新編武蔵風土記稿』にも、歩行新宿の一町目の内で東海寺の大門前を黒門前と呼ぶと記されています。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename",
        "road"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kachishinshuku",
        "nm-kachishinshuku-chome"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「黒門横町」19頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-oyokocho",
      "name": "大横町",
      "kana": "おおよこちょう",
      "nameKind": "road",
      "summary": "北品川の東海道から御殿山へ登る横町で、歩行新宿の一町目と二町目の境でした。現在の御殿山通りにあたります。",
      "origin": "他の横町より道幅が広かったことから付けられた名か、と区史は推測しています。確かな由来の記録は挙げられていません。",
      "description": "現在の北品川一丁目24・25番と28番の間の道が、これにあたります。『新編武蔵風土記稿』は、ここから西へ行くと御殿山の麓に着くと記しています。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename",
        "road"
      ],
      "certainty": "estimate",
      "relatedNames": [
        "nm-kachishinshuku-chome",
        "nm-mondo-gashi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「大横町」20頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-toriya-yokocho",
      "name": "鳥屋横町",
      "kana": "とりやよこちょう",
      "nameKind": "road",
      "summary": "北品川の東海道から二本榎へ向かう「二本榎道」に付けられた名です。後には、清水が湧く井戸があったことから清水横丁とも呼ばれました。",
      "origin": "『新編武蔵風土記稿』によると、享保年間（1716〜1736年）のころまで鳥屋文七という者が住んでいたため、この名が付いたといいます。",
      "description": "歩行新宿の二町目と三町目の境にあたり、現在の北品川一丁目2番と24番の間の横町です。御殿山の麓の井戸は「磯の清水」として『江戸名所図会』にも出てきます。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename",
        "road"
      ],
      "certainty": "tradition",
      "relatedNames": [
        "nm-kachishinshuku-chome"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「鳥屋横町」「清水横町」20頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-jinya-yokocho",
      "name": "陣屋横町",
      "kana": "じんやよこちょう",
      "nameKind": "road",
      "summary": "北品川宿の一町目と二町目の境から、東の海岸へ出る横町です。かつて北側に宿場の役所にあたる建物があったことから、この名が付いたと伝わります。",
      "origin": "区史は、宝永から正徳のころ（1704〜1715年）にこの横町の北に本陣などがあったことによる名と説明します。『新編武蔵風土記稿』は同じ時期に駅の官署（宿場の役所）が建っていたからだと記し、書き方が少し違います。",
      "description": "天保14年（1843年）の宿方明細書上帳には、横町の北側にあった陣屋敷が、寛文11年（1671年）の検地で除地とされ、延宝3年（1675年）から年貢地となり、元禄8年（1695年）の検地では宿並の伝馬屋敷になったとあります。横町は陣屋敷横町と呼ばれてきたと記されています。現在の北品川二丁目25番と26番の間にあたります。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename",
        "road"
      ],
      "certainty": "tradition",
      "relatedNames": [
        "nm-kita-shinagawa-chome",
        "nm-kita-shinagawa-shuku"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「陣屋横町」22頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-mondo-gashi",
      "name": "問答河岸",
      "kana": "もんどうがし",
      "nameKind": "water",
      "summary": "歩行新宿の一町目と二町目の境にあった河岸（物揚場）の呼び名です。徳川家光が沢庵和尚と問答を交わした場所だという伝えに由来します。",
      "origin": "三代将軍徳川家光が鷹狩りの際に船をこの河岸に付け、出迎えた沢庵和尚とここで問答を交わしたことから、この名で呼ばれるといいます。",
      "description": "『新編武蔵風土記稿』は、長さ二十五間・幅二間五尺の物揚場で、昔は御放鷹の際の上り場だったと記します。文政11年（1828年）の「品川図」には、大横町の向かい側にあたる現在の北品川一丁目23番と29番の間の通路付近に「問答河岸」と書かれています。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "relatedNames": [
        "nm-oyokocho",
        "nm-kachishinshuku-chome"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「問答河岸」19頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-dainichiyama",
      "name": "大日山",
      "kana": "だいにちざん",
      "nameKind": "other",
      "summary": "八ッ山の別名です。昔ここに大日如来が祀られていたことによる名といわれます。",
      "origin": "かつてこの地に石像の大日如来が祀られていたためだといいます。『江戸名所図会』によれば、のちに堂が壊れた際に像は谷山稲荷の地へ移され、さらに品川北馬場の光厳寺へ収められたと言われますが、今はその石像の所在が分からないとされています。",
      "description": "幕末の宇田川家所蔵の「品川・大崎図」などに「字大日山」の記載があります。八ッ山そのものの由来は別項（八ッ山）にまとめています。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "relatedNames": [
        "nm-yatsuyama"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「大日山」20頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kita-shinagawa-honshuku",
      "name": "本宿（北品川宿）",
      "kana": "ほんしゅく",
      "nameKind": "other",
      "summary": "目黒川の北側、東海道の両側に広がっていた北品川宿の中心部の呼び名です。歩行新宿が加わったとき、新しい宿に対して本宿と呼ばれるようになりました。",
      "origin": "享保7年（1722年）に歩行新宿が品川宿に加わることが認められたため、それ以前からあった北品川宿を、新しい宿（新宿）に対して「本宿」と呼ぶようになりました。",
      "description": "江戸時代には目黒川を起点に一丁目から三丁目までに分かれていました。明治8年（1875年）の番地設定のあとは、東側が北品川宿9番地から54番地まで、西側が55番地から79番地までの地域で、53・54番地は目黒川の改修で川敷になりました。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kita-shinagawa-shuku",
        "nm-kachishinshuku",
        "nm-kita-shinagawa-chome"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「本宿」21頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kachishinshuku-uramachi",
      "name": "裏町（歩行新宿）",
      "kana": "うらまち",
      "nameKind": "other",
      "summary": "歩行新宿のうち、善福寺の門前と境内だった一帯につけられた町名です。東海道の裏側にあたるので、この名が付きました。",
      "origin": "明治8年（1875年）の地租改正で付けられた名で、東海道（表）の裏側にある町という意味です。",
      "description": "もとは善福寺の門前と境内でした。明治3年（1870年）に門前地の称号が廃止されたとき、いったん元一丁目に合併されましたが、明治8年1月に一丁目から分離して裏町と呼ばれました。歩行新宿65番地から71番地までと79番地にあたり、現在の善福寺付近です。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kachishinshuku",
        "nm-kita-shinagawa-uramachi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「裏町」20頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kita-shinagawa-uramachi",
      "name": "裏町（北品川宿）",
      "kana": "うらまち",
      "nameKind": "other",
      "summary": "北品川宿のうち、東海道に面した本宿の裏側にあたる一帯につけられた町名です。現在の品川神社の周辺などがあたります。",
      "origin": "東海道に面した本宿の裏側という意味で、明治8年（1875年）の地租改正のときから用いられた名です。",
      "description": "歩行新宿の法禅寺、北品川の養願寺・正徳寺とそれぞれの門前の一部、品川神社の境内を囲む一帯で、北品川宿の80番地から99番地までと156番地から171番地までの地域です。現在は北品川二丁目の法禅寺・正徳寺の一角と、北品川三丁目の品川神社の周辺にあたります。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kita-shinagawa-honshuku",
        "nm-kachishinshuku-uramachi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「裏町」22頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kita-baba-machi",
      "name": "北馬場町",
      "kana": "きたばんばまち",
      "nameKind": "other",
      "summary": "北品川宿の一丁目と二丁目の境から、鎮守の品川神社へ向かう道を挟んだ一帯の地名です。宿場の馬を飼う馬小屋があったことによる名といわれます。",
      "origin": "品川宿は、幕府の公用旅行者のために一日百匹の馬と百人の人足を出す役を負っていました。この宿役の馬を飼う馬小屋があったための名で、南品川宿にも馬場町があるため、北品川宿の側を北馬場町と呼んだと考えられる、と区史は述べます。",
      "description": "『新編武蔵風土記稿』も、昔、駅馬の厩があったと言い、あるいは南品川の馬場町に対する名だとも言うと記しています。明治3年（1870年）12月に元北馬場と正徳寺門前などが合併して北品川馬場町一〜三丁目となり、現在は北品川宿100番地から155番地までにあたります。京浜急行の北馬場駅があったころの商店街の通り周辺が、かつての北馬場町でした。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "tradition",
      "relatedNames": [
        "nm-kita-shinagawa-shuku",
        "nm-kita-shinagawa-uramachi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「北馬場町」22〜23頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-takeya-yokocho",
      "name": "竹屋横町",
      "kana": "たけやよこちょう",
      "nameKind": "road",
      "summary": "北品川宿の二町目と三町目の境から、東の海岸へ出る路地の名です。由来は不明とされています。",
      "origin": null,
      "description": "現在の北品川二丁目6番と7番の間の道にあたります。『新編武蔵風土記稿』は、二町目と三町目の界から東の海浜に至る所と記すのみで、名の由来は示していません。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename",
        "road"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kita-shinagawa-chome",
        "nm-jinya-yokocho"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「竹屋横町」23頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kachishinshuku-chome",
      "name": "歩行新宿の町目（一〜三丁目）",
      "kana": "かちしんしゅくのちょうめ",
      "nameKind": "other",
      "summary": "歩行新宿は、江戸時代には北品川宿に続けて北から一町目・二町目・三町目と数えました。明治8年（1875年）からは、江戸に近い側を一丁目とする数え方に変わりました。",
      "origin": "江戸時代の町目の呼び方は北品川宿にならって付けられ、一町目が北品川宿に近い側でした。明治になって皇居（宮城）に近い側を一丁目と呼ぶようになり、明治8年からは江戸時代の一町目が三丁目、三町目が一丁目となりました。",
      "description": "江戸時代の範囲は、一町目が溜屋横町から大横町まで（現在の北品川一丁目28〜30番と二丁目2番の一部）、二町目が大横町から鳥屋横町まで（同23・24番と22番の一部）、三町目が鳥屋横町から八ッ山まで（同2番と22番の一部）です。『新編武蔵風土記稿』は長さをそれぞれ九十間余、八十七間余、百十二間余と記します。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kachishinshuku",
        "nm-kuromon-yokocho",
        "nm-oyokocho",
        "nm-toriya-yokocho",
        "nm-mondo-gashi",
        "nm-kachishinshuku-uramachi"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「一町目」「二町目」「三町目」18〜19頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-kita-shinagawa-chome",
      "name": "北品川宿の町目（一〜三丁目）",
      "kana": "きたしながわしゅくのちょうめ",
      "nameKind": "other",
      "summary": "北品川宿の本宿は、江戸時代には目黒川から北へ向かって一町目・二町目・三町目と数えました。明治8年（1875年）1月から数え方が逆になりました。",
      "origin": "江戸時代は現在の品川橋あたりの境を起点に、北へ一丁目、二丁目と数えました。『品川町史』によると、明治8年1月からは北を起点に、北から南へ数えるようになりました。丁目の境は横町で区切られていました。",
      "description": "江戸時代の呼び方では、一町目が目黒川から陣屋横町まで（現在の北品川二丁目26〜28番ほか）、二町目が陣屋横町から竹屋横町まで（同7・8番ほか）、三町目が竹屋横町から溜屋横町まで（同3・9番ほか）です。『新編武蔵風土記稿』は長さをそれぞれ六十二間余、五十八間余、六十一間余と記します。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "fact",
      "relatedNames": [
        "nm-kita-shinagawa-honshuku",
        "nm-jinya-yokocho",
        "nm-takeya-yokocho"
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「品川地区の地名」「本宿」「一町目」「二町目」「三町目」21〜22頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-shinagawa",
      "name": "品川",
      "kana": "しながわ",
      "nameKind": "other",
      "summary": "地名の由来には五つの説があります。『新編武蔵風土記稿』が最も穏当とする、目黒川の古名が品川だったという説が、区史では中心に紹介されています。",
      "origin": "目黒川の古名を品川といったことから地名になったという説です。『新編武蔵風土記稿』は、文明8年（1476年）に僧の得幺が詠んだ詩に「南顧則品川之流」とあることから、この品川は目黒川を指すのだろうとして、地名起源の説として一番妥当だと紹介しています。『江戸名所図会』にも、東海寺の南に沿い貴船の社の側を流れる川が、品川と称する水流だという説が出ています。",
      "description": "区史は、品川の地名の起源を五説に整理しています。目黒川は、『南浦地名考』が昔は荏原川と称したと推測し、明治11年の「東京府村誌」にも大崎地区の村々で荏原川の呼び名が使われているといいます。",
      "areas": [
        "shinagawa"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "estimate",
      "relatedNames": [
        "nm-shinagawa-shuku",
        "nm-ebara"
      ],
      "variants": [
        {
          "claim": "隣の村の高輪に対して、地形が良い（品よき）ことから「品ヶ輪」と書き、のちに今の字に改めたという説。『新編武蔵風土記稿』は、高輪が高縄手の転化で、高縄は海岸沿いの高台を通る街道の意だとして、この説には否定的である。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 品川の地名の由来」5〜6頁"
        },
        {
          "claim": "鎧の威に用いる品革を染め出した所だったため地名になったという説。『新編武蔵風土記稿』はこじつけにすぎないとする。『南浦地名考』は、品革を染めていたのは大井の「立会」という所だとして、検討の余地ありとしている。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 品川の地名の由来」5〜6頁"
        },
        {
          "claim": "この地を支配した品川氏の姓を採って地名にしたという説。『続日本紀』養老元年（717年）の条に、居住地にもとづいて氏の名をつけるのは従来の恒例とあるように、奈良時代には地名を氏にするのが一般的だった。『新編武蔵風土記稿』は、品川氏はこの土地の名を氏としたものだろうとして、この説を明確に否定している。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 品川の地名の由来」5〜6頁"
        },
        {
          "claim": "目黒川は、神奈川の上無川に対する下無川で、それが品川に転じたという説。『新編武蔵風土記稿』は、品革説と同じくこじつけにすぎないとしている。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 品川の地名の由来」5〜6頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 品川の地名の由来」5〜6頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    },
    {
      "id": "nm-osaki",
      "name": "大崎",
      "kana": "おおさき",
      "nameKind": "other",
      "summary": "地名の由来には三つの説がありますが、区史はどれにも問題があるとし、確証はないとしています。",
      "origin": "由来は三説に分かれ、区史はいずれも決め手を欠くとしています。大崎の地形を見ると、台地に多くの谷が入り込んでおり、崎の多い地形から「多い崎」が「大崎」に転じたと考えることもできるが、確証はない、と区史は述べます。",
      "description": "『江戸名所図会』は、昔は海浜だったこの地から東の品川までの間が袖の形に似ているため、袖が崎とも呼んだと記しています。",
      "areas": [
        "osaki"
      ],
      "categories": [
        "placename"
      ],
      "certainty": "estimate",
      "relatedNames": [
        "nm-kamiosaki-mura",
        "nm-shimoosaki-mura"
      ],
      "variants": [
        {
          "claim": "秩父山地から続く台地の外れにあたるので尾崎といい、のちに大崎と書き改めたという説（『南浦地名考』）。区史は、台地の外れ（尾）はむしろ海岸に面した高輪の台地や北品川地区で、大崎地区はその内側にあたるため、そのまま受け入れるのは難しいとする。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 大崎の地名の由来」8頁"
        },
        {
          "claim": "目黒川は東京湾の入海になっていて、そこに張り出した大きな岬の意で大崎と称したという説。区史は、目黒川の流域まで海が入り込んでいたのは縄文時代までさかのぼるため、名付けのときにそれが認識されていたかは疑問だとする。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 大崎の地名の由来」8頁"
        },
        {
          "claim": "東京湾の入海に七つの岬があり、その一番大きな岬を大崎と称したという説。区史は、大崎地区の地形に際立った岬を見いだすのは難しいとする。",
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 大崎の地名の由来」8頁"
        }
      ],
      "sources": [
        {
          "ref": "sgw-kushi-zokushiryo-1",
          "locator": "品川の地名「三 大崎の地名の由来」8頁"
        }
      ],
      "verifiedAt": "2026-11-24"
    }
  ]
};
