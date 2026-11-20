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
// 現在の出典は品川区公式「指定文化財」だけで、収録はごく一部にとどまる。
// しながわデジタルアーカイブの「住居表示新旧対照表」と、広報しながわの
// 地名連載は、いずれも現在たどり着けない（docs/rekishi-plan.md 参照）。
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.rekishiNames = {
  "schemaVersion": 1,
  "updatedAt": "2026-11-20",
  "note": "品川区の地名について、出典で確認できた由来と、公式資料に現れる旧地名を集めています。由来が確認できていないものは、その旨を明示しています。",
  "scopeNote": "現在の出典は品川区公式「指定文化財」の解説だけです。そのため、収録しているのは区内の地名のごく一部にとどまります。",
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
        }
      ],
      "relatedPlaces": ["pl-3963af8d45"],
      "relatedEvents": ["ev-1213-ryokai-birth"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第12号「大井の井」" }],
      "verifiedAt": "2026-11-20"
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
      "origin": "品川宿の発展とともに北品川宿の北側、高輪寄りに新しい町並が形成され、伝馬の人足を負担するようになりました。これを担っていた北品川の法禅寺・善福寺の両門前町屋と新町が、宿内と変わらないとして宿場に加えてほしいと道中奉行に訴え出ます。江戸に近い地の利のある新町らに客を取られるとして南北両品川宿は反対しましたが、結局は加宿が許され、その名称を「歩行新宿」と定めました。",
      "description": "この経過は、享保7年（1722年）12月に下付された「品川歩行新宿加宿裁許状」に書かれています。裁許状は歩行新宿の名主・飯田家に所蔵されていたものが品川区に寄贈され、品川歴史館に保管されています。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedPlaces": ["pl-6b12d55eea", "pl-550cbf7e0e"],
      "relatedNames": ["nm-shinagawa-shuku", "nm-kita-shinagawa-shuku", "nm-minami-shinagawa-shuku"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」" }],
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
      "summary": "品川宿を構成した宿のひとつ。南品川宿とともに伝馬を負担していました。由来は確認できていません。",
      "origin": null,
      "description": "江戸時代中期には、品川宿の本陣は北品川宿のものだけになりました。明治2年（1869年）には、北品川宿の北浜の人々を中心に品川丸嘉講社が結成され、品川神社に富士塚が築かれています。",
      "areas": ["shinagawa"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedNames": ["nm-shinagawa-shuku"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」、有形民俗「品川神社富士塚（品川富士）」" }],
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
      "summary": "江戸時代から明治にかけての村。地名「大井」と同じ由来とされます。",
      "origin": null,
      "description": "上大崎村名主・竹内家の文書には、大井村の石積護岸の修復へ人足を動員した記録が残ります。明治30年代には如来寺が大井村の現在地に移り、大正15年（1926年）に養玉院と合併しました。",
      "areas": ["oi"],
      "categories": ["placename"],
      "certainty": "fact",
      "relatedNames": ["nm-oi"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「上大崎村名主竹内家文書」、大井地区の指定文化財 彫刻「木造五智如来坐像」" }],
      "verifiedAt": "2026-11-20"
    },
    {
      "id": "nm-kamiosaki-mura",
      "name": "上大崎村",
      "kana": "かみおおさきむら",
      "nameKind": "old-village",
      "summary": "江戸時代の村。名主は竹内家で、その文書が区の指定文化財になっています。由来は確認できていません。",
      "origin": null,
      "description": "竹内家文書には、宗門改帳や五人組帳のほか、東海道品川宿の助郷役の負担、大井村石積護岸修復への人足動員、三田用水由来書、鷹場関係文書などが含まれ、品川領や上大崎村のようすを知る史料になっています。徳蔵寺の日本諸国社号等標石群には「武 品川領上大崎村 福本氏」と刻まれた石もあります。",
      "areas": ["osaki"],
      "categories": ["placename"],
      "certainty": "fact",
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大崎地区の指定文化財 古文書「上大崎村名主竹内家文書」、有形民俗「日本諸国社号等標石群」" }],
      "verifiedAt": "2026-11-20"
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
      "summary": "江戸時代の村。戸越八幡神社への奉納品が村民の名で残っています。由来は確認できていません。",
      "origin": null,
      "description": "延享3年（1746年）には戸越村の村民が戸越八幡神社へ一対の石造狛犬を奉納しており、社殿手前の参道敷石の両側に建てられています。同社の奉納絵馬も、奉納者の多くは戸越村の村民です。",
      "areas": ["ebara"],
      "categories": ["placename"],
      "certainty": "fact",
      "relatedPlaces": ["pl-9f3cab87af"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗第5号「戸越八幡神社石造狛犬」、有形民俗「戸越八幡神社奉納絵馬」" }],
      "verifiedAt": "2026-11-20"
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
      "summary": "江戸時代の村。村の中心を中通りが通り、池上・洗足・品川の各方面へ向かう道の分岐点がありました。由来は確認できていません。",
      "origin": null,
      "description": "大原不動堂のある場所は、旧上蛇窪村の中心を通る中通りに沿った地点で、上蛇窪村から池上・洗足・品川の各方面に至る道の分岐点にあたりました。享保17年（1732年）には、この分岐点に六十六部廻国供養塔を兼ねた道標が建てられています。昭和38年（1963年）に、もとの位置からわずかに動いて現在の位置になりました。",
      "areas": ["ebara"],
      "categories": ["placename", "road"],
      "certainty": "fact",
      "relatedPlaces": ["pl-48292015f6"],
      "relatedNames": ["nm-shinagawa-michi", "nm-senzoku-michi", "nm-ikegami-michi"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "荏原地区の指定文化財 有形民俗「大原不動堂内石造供養塔群」" }],
      "verifiedAt": "2026-11-20"
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
    }
  ]
};
