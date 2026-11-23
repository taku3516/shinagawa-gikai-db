// 品川区議会DB データファイル（「品川の歴史」の年表）
//
// 時代区分・地区・カテゴリー・確実性・出典の語彙は data/rekishi.js が正。
// ここでは語彙のIDと出典IDを参照するだけにする。
//
// 掲載の約束:
//  - 出典を確認できた事実だけを載せる。確認できなかったものは公開しない。
//  - 本文は出典から書き写さず、事実を取り出して言い換える。
//  - 年が確定できないときは year を null にし、yearText に分かる範囲で書く。
//    無理に年を決めない。
//  - 事実・伝承・俗説・推定は certainty で区別する。
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.rekishiEvents = {
  "schemaVersion": 1,
  "updatedAt": "2026-11-19",
  "note": "品川区域の出来事を年代順に並べています。出典を確認できたものだけを掲載しています。",
  "items": [
    {
      "id": "ev-1213-ryokai-birth",
      "name": "光福寺に「大井」の名の由来とされる井戸の伝承が伝わる",
      "summary": "光福寺の寺伝は、建保元年に生まれた了海の産湯にこの井戸を使ったとし、地名「大井」はこの井泉に由来すると記す。",
      "description": "光福寺の墓地にある横穴式の井戸のかたわらには、この井戸を了海上人の産湯とし、地名はこの井泉から起こったと記した石碑が立つ。寺伝では、東国に流された頭中将光福が荏原郡の支配者である紀実経の娘を妻とし、子授けを祈願したのち、建保元年に男児を授かったという。この男児が、のちに麻布善福寺を中興した了海であるとされる。寺に伝わる由来であり、史料による裏付けがあるものではない。",
      "year": 1213,
      "yearEnd": null,
      "yearText": "建保元年（1213年）",
      "era": "chusei",
      "areas": ["oi"],
      "categories": ["placename", "temple"],
      "certainty": "tradition",
      "relatedEvents": [],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第12号「大井の井」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1635-honjin",
      "name": "参勤交代の制度が整い、品川宿の大名宿泊所が「本陣」と呼ばれるようになる",
      "summary": "寛永12年に参勤交代の制度が整えられたころから、宿場で大名が泊まる設備の整った家を本陣と呼ぶようになった。",
      "description": "大名の旅は、はじめ宿場のなかで設備の整った住居を宿としていたが、やがて定宿となり、参勤交代の制度が整えられたころから本陣と呼ばれるようになった。品川宿の本陣は、当初は北品川宿と南品川宿に一軒ずつあったが、南品川宿のものは早くに無くなり、江戸時代中期には北品川宿だけになった。",
      "year": 1635,
      "yearEnd": null,
      "yearText": "寛永12年（1635年）",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "categories": ["road", "life"],
      "certainty": "fact",
      "relatedEvents": ["ev-1868-anzaisho", "ev-1872-shukueki-abolished"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第7号「東海道品川宿本陣跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1648-shinagawa-jinja-torii",
      "name": "品川神社に石造鳥居と水盤が寄進される",
      "summary": "慶安元年、東海寺を建立した三代将軍徳川家光の側近・堀田正盛が、品川神社へ石造鳥居と水盤を寄進した。",
      "description": "同じ年には石造燈籠も造立されている。燈籠は現在、境内左手の浅間神社の参道に立っているが、もとは本社の参道にあったもので、後藤八郎兵衛光利と亀岡久兵衛政重の寄進による。鳥居と水盤は、昭和53年に品川区の指定文化財（建造物第1号）となった。",
      "year": 1648,
      "yearEnd": null,
      "yearText": "慶安元年（1648年）",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "categories": ["temple", "building"],
      "certainty": "fact",
      "relatedEvents": ["ev-1978-first-designation"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-4c9cb3c9e5"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 建造物第1号・第2号" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1684-jokyo-calendar",
      "name": "渋川春海の建議により改暦が決まる",
      "summary": "貞享元年、渋川春海がそれまでの宣明暦の改暦を幕府に建議し、新しい貞享暦が採用されて翌年から実施された。",
      "description": "渋川春海は幕府の初代天文方を務めた人物で、墓は北品川の東海寺大山墓地にある。幕府碁師・安井算哲の子として京都に生まれ、14歳で父の跡を継いで碁所を勤めた。国史学と神道を学ぶとともに天文学にも通じ、改暦を実現させた。",
      "year": 1684,
      "yearEnd": null,
      "yearText": "貞享元年（1684年）",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "categories": ["culture"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-shibukawa-shunkai"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第6号「渋川春海墓（追贈記念塔を含む）」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-19c-ishizumi-gogan",
      "name": "東海道品川宿に石積の護岸が築かれる",
      "summary": "東海道と品川宿の家並みを波から守るため、伊豆石などを積んだ護岸が築かれた。築造は19世紀前半までとみられる。",
      "description": "南品川に残る護岸は、法面が東を向いて南北に連なり、地上部分の全長は約15.3メートル、高さは約1.7〜1.9メートル。伊豆石・房州石・大谷石からなり、築造後も破損と修繕を重ねながら使われてきたと考えられている。同様の護岸は高輪から大森にかけての東海道海岸線上にあったが、その多くは埋め立てや宅地開発で失われた。正確な築造年は特定されていない。",
      "year": null,
      "yearEnd": null,
      "yearText": "19世紀前半までに築造か",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "categories": ["road", "building"],
      "certainty": "estimate",
      "relatedEvents": ["ev-2023-gogan-designation"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-69870da77d"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第25号「東海道品川宿石積護岸」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1858-yodo-confinement",
      "name": "山内豊信（容堂）が大井村の下屋敷に蟄居する",
      "summary": "安政の大獄に関連して隠居した土佐藩主・山内豊信は、品川鮫洲の別邸に移り、のちに大井村の下屋敷で謹慎の日々を送った。",
      "description": "山内豊信は公武合体を理念として行動したが、その姿勢は幕閣に忌避された。隠居して家督を子の豊範に譲ったのち、幕府から謹慎を命じられ、大井村の下屋敷で詩酒文墨を友として過ごした。文久2年に政治の場へ復帰している。蟄居の始まった正確な年は、出典に明記されていない。",
      "year": null,
      "yearEnd": 1862,
      "yearText": "安政の大獄のころ",
      "era": "kinsei",
      "areas": ["oi"],
      "categories": ["admin"],
      "certainty": "estimate",
      "relatedEvents": [],
      "relatedPeople": ["pe-yamauchi-toyoshige"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第11号「山内豊信（容堂）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1868-anzaisho",
      "name": "明治天皇行幸の際、品川宿本陣が行在所となる",
      "summary": "明治元年、明治天皇の行幸にあたり、品川宿の本陣が宿舎（行在所）に充てられた。",
      "description": "この出来事にちなみ、のちに本陣跡に設けられた公園は聖蹟公園と名づけられた。本陣は品川三宿（歩行新宿・北品川宿・南品川宿）のほぼ中央に位置し、参勤交代の諸大名や公家・門跡などの宿泊・休息所となっていた。",
      "year": 1868,
      "yearEnd": null,
      "yearText": "明治元年（1868年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["admin", "road"],
      "certainty": "fact",
      "relatedEvents": ["ev-1635-honjin", "ev-1938-seiseki-park"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第7号「東海道品川宿本陣跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1872-shukueki-abolished",
      "name": "宿駅制度が廃止され、品川宿本陣が役割を終える",
      "summary": "明治5年に宿駅制度が廃止され、品川宿の本陣はその後、警視庁病院などに使われた。",
      "description": "江戸時代を通じて東海道最初の宿場として機能してきた品川宿は、制度の廃止により宿場としての役割を終えた。本陣の建物には門・玄関・書院などがあり、大名行列の駕籠や長持を置く場所も設けられていた。",
      "year": 1872,
      "yearEnd": null,
      "yearText": "明治5年（1872年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["road", "admin"],
      "certainty": "fact",
      "relatedEvents": ["ev-1635-honjin", "ev-1938-seiseki-park"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第7号「東海道品川宿本陣跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1873-kogyosha",
      "name": "東海寺境内に洋式ガラス工場「興業社」が創設される",
      "summary": "明治6年、太政大臣・三条実美が家臣の村井三四之助らの助言を受け、東海寺境内に洋式ガラス工場の興業社を設けた。",
      "description": "これが官営品川硝子製造所の前身にあたる。品川区における明治初期の工業発祥の地であり、京浜工業地帯成立の第一歩の地とされている。",
      "year": 1873,
      "yearEnd": null,
      "yearText": "明治6年（1873年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["industry"],
      "certainty": "fact",
      "relatedEvents": ["ev-1876-glass-nationalized", "ev-1885-glass-sold", "ev-1892-glass-dissolved"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-5f8482f680"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第8号「官営品川硝子製造所跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1876-glass-nationalized",
      "name": "興業社が工部省に買収され、官営品川硝子製造所となる",
      "summary": "明治9年、興業社は工部省に買収されて官営の硝子製造所となり、英国人技術者を迎えて幻燈用の紅色ガラスや食器を製造した。",
      "description": "政府の殖産興業政策に立脚した官営工場のひとつで、品川における近代工業の出発点にあたる。",
      "year": 1876,
      "yearEnd": null,
      "yearText": "明治9年（1876年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["industry"],
      "certainty": "fact",
      "relatedEvents": ["ev-1873-kogyosha", "ev-1885-glass-sold"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-5f8482f680"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第8号「官営品川硝子製造所跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1885-glass-sold",
      "name": "官営品川硝子製造所が払い下げられ、民間工場となる",
      "summary": "明治18年、官営品川硝子製造所は西村勝三らに払い下げられ、民間工場として再出発した。",
      "description": "官営工場の払い下げは、この時期に各地で進められた政策の一環である。",
      "year": 1885,
      "yearEnd": null,
      "yearText": "明治18年（1885年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["industry"],
      "certainty": "fact",
      "relatedEvents": ["ev-1876-glass-nationalized", "ev-1892-glass-dissolved"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-5f8482f680"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第8号「官営品川硝子製造所跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1890-shungaku-death",
      "name": "松平慶永（春嶽）が没し、海晏寺の後丘に葬られる",
      "summary": "明治23年6月3日、福井藩15代藩主を務めた松平慶永が63歳で没した。墓は南品川の海晏寺後丘にある。",
      "description": "松平慶永は文政11年に田安斉匡の子として生まれ、天保9年に福井藩主となった。将軍継嗣問題では一橋慶喜を擁して大老井伊直弼と対立し、一時隠居に追い込まれたが、桜田門外の変の後に政治へ復帰して幕政改革に着手し、参勤交代の緩和などに尽力した。明治政府成立後は民部卿・大蔵卿などを歴任し、明治3年に公職を退いた。",
      "year": 1890,
      "yearEnd": null,
      "yearText": "明治23年（1890年）6月3日",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-matsudaira-yoshinaga"],
      "relatedPlaces": ["pl-16a69cbab7", "pl-0eb88578f1"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第9号「松平慶永（春嶽）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1892-glass-dissolved",
      "name": "品川硝子製造所が解散する",
      "summary": "明治25年、経営不振により品川硝子製造所は解散した。",
      "description": "工場のレンガ造りの建物は長く残っていたが、昭和43年に一棟が愛知県犬山市の博物館明治村へ移築された。品川の現地には記念碑が建てられている。",
      "year": 1892,
      "yearEnd": null,
      "yearText": "明治25年（1892年）",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["industry"],
      "certainty": "fact",
      "relatedEvents": ["ev-1885-glass-sold", "ev-1968-meijimura"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-5f8482f680"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第8号「官営品川硝子製造所跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1909-ito-death",
      "name": "伊藤博文が没し、西大井に葬られる",
      "summary": "明治42年10月26日に伊藤博文が没した。墓は石だたみに囲まれた円墳で、西大井にある。",
      "description": "墓石の正面には「従一位大勲位公爵伊藤博文墓」、背面には没した日付が刻まれている。墓所は伊藤家が管理していたが、戦後は防長倶楽部の所有となった。右隣にはやや小型の梅子夫人の円墓がある。",
      "year": 1909,
      "yearEnd": null,
      "yearText": "明治42年（1909年）10月26日",
      "era": "meiji",
      "areas": ["oi"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-ito-hirobumi"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第19号「伊藤博文墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1919-itagaki-death",
      "name": "板垣退助が没し、品川神社裏の墓域に葬られる",
      "summary": "大正8年、自由民権運動を推進した板垣退助が83歳で没した。墓は品川神社に接する板垣家墓域にある。",
      "description": "この墓域は、もとは東海寺の塔頭である高源院の墓地の一部だった。高源院が世田谷区烏山へ移転したあとも板垣家の墓域はその場に残され、現在は退助の墓と同じ形式でやや小型の絹子夫人の墓が並んでいる。",
      "year": 1919,
      "yearEnd": null,
      "yearText": "大正8年（1919年）",
      "era": "taisho",
      "areas": ["shinagawa"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-itagaki-taisuke"],
      "relatedPlaces": ["pl-8d095e31ad", "pl-548dab732d"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第4号「板垣退助墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1938-seiseki-park",
      "name": "品川宿本陣跡が公園となり、聖蹟公園と名づけられる",
      "summary": "昭和13年、本陣跡が公園となった。明治元年に明治天皇の行在所となったことにちなみ、聖蹟公園と命名された。",
      "description": "現在は区立聖蹟公園として、史跡とともに保存されている。",
      "year": 1938,
      "yearEnd": null,
      "yearText": "昭和13年（1938年）",
      "era": "showa-pre",
      "areas": ["shinagawa"],
      "categories": ["admin", "culture"],
      "certainty": "fact",
      "relatedEvents": ["ev-1868-anzaisho", "ev-1872-shukueki-abolished"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第7号「東海道品川宿本陣跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1947-ward-founded",
      "name": "旧品川区と旧荏原区が統合し、現在の品川区が誕生する",
      "summary": "昭和22年3月15日、旧品川区と旧荏原区の統合によって現在の品川区が誕生した。",
      "description": "区はこの日を区制の起点としており、令和9年3月15日に区制80周年を迎える。現在の品川区は、品川地区・大崎地区・大井地区・荏原地区・八潮地区の5地区に大きく分けられている。",
      "year": 1947,
      "yearEnd": null,
      "yearText": "昭和22年（1947年）3月15日",
      "era": "showa-post",
      "areas": ["ward"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": [],
      "sources": [
        { "ref": "sgw-80th", "locator": "品川区制80周年記念" },
        { "ref": "sgw-kugaiyo", "locator": "区の紹介（5地区の区分）" }
      ],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1963-shibukawa-grave-moved",
      "name": "東海寺大山墓地の渋川春海墓が整備される",
      "summary": "昭和38年の移動にあたり、当時の日本国有鉄道と寺が協力して墓域を整備した。",
      "description": "渋川春海の墓は規模が小さく、総高は約117.0センチメートル、後世に補われた三段の台座を除くと約56.0センチメートルである。整備により、現在は整然と配置されている。",
      "year": 1963,
      "yearEnd": null,
      "yearText": "昭和38年（1963年）",
      "era": "showa-post",
      "areas": ["shinagawa"],
      "categories": ["culture"],
      "certainty": "fact",
      "relatedEvents": ["ev-1684-jokyo-calendar"],
      "relatedPeople": ["pe-shibukawa-shunkai"],
      "relatedPlaces": ["pl-a4e970452b"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第6号「渋川春海墓（追贈記念塔を含む）」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1968-meijimura",
      "name": "品川硝子製造所の建物が博物館明治村へ移築される",
      "summary": "昭和43年、長く残っていたレンガ造り工場の一棟が、愛知県犬山市の博物館明治村へ移築され一般公開された。",
      "description": "品川の現地には記念碑が建てられ、区指定史跡「官営品川硝子製造所跡」として保存されている。",
      "year": 1968,
      "yearEnd": null,
      "yearText": "昭和43年（1968年）",
      "era": "showa-post",
      "areas": ["shinagawa"],
      "categories": ["industry", "culture"],
      "certainty": "fact",
      "relatedEvents": ["ev-1892-glass-dissolved"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第8号「官営品川硝子製造所跡」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1978-first-designation",
      "name": "品川区の文化財指定が始まる",
      "summary": "昭和53年2月14日に天然記念物16件が指定され、区の文化財指定が始まった。同じ年の11月22日には、建造物・史跡など23件が指定されている。",
      "description": "2月14日の16件はすべて天然記念物で、光福寺のイチョウ、品川寺のイチョウ、大龍寺のシイ、戸越八幡神社のケンポナシなど、区内の寺社に育つ木が中心である。11月22日の23件には、品川神社石造鳥居並水盤（建造物第1号）のほか、板垣退助墓、渋川春海墓、東海道品川宿本陣跡、官営品川硝子製造所跡、松平慶永（春嶽）墓、山内豊信（容堂）墓、大井の井といった史跡14件が含まれる。",
      "year": 1978,
      "yearEnd": null,
      "yearText": "昭和53年（1978年）2月14日・11月22日",
      "era": "showa-post",
      "areas": ["ward"],
      "categories": ["culture", "admin"],
      "certainty": "fact",
      "relatedEvents": ["ev-1648-shinagawa-jinja-torii"],
      "relatedPeople": [],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "各地区の指定文化財一覧（指定年月日 昭和53年2月14日・同年11月22日）" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-2023-gogan-designation",
      "name": "東海道品川宿石積護岸が区指定史跡となる",
      "summary": "令和5年3月29日、南品川に残る石積護岸が品川区の指定史跡（史跡第25号）に指定された。",
      "description": "現存する護岸のなかで最も保存状態がよく、近世に積まれた伊豆石が地上に露出して確認できる唯一の地点であることが評価された。伊豆石の裏込めに土丹岩が使われるなど当時の土木技術がうかがえ、後から積まれた房州石がフランス積の様相を見せるなど、近現代における石材利用の変遷も読み取れる。",
      "year": 2023,
      "yearEnd": null,
      "yearText": "令和5年（2023年）3月29日",
      "era": "heisei-reiwa",
      "areas": ["shinagawa"],
      "categories": ["culture", "building"],
      "certainty": "fact",
      "relatedEvents": ["ev-19c-ishizumi-gogan"],
      "relatedPeople": [],
      "relatedPlaces": ["pl-69870da77d"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第25号「東海道品川宿石積護岸」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1872-yodo-death",
      "name": "山内豊信（容堂）が没し、遺言により大井村下総山に葬られる",
      "summary": "明治5年6月21日に山内豊信が没した。遺言により、大井村下総山に葬られた。",
      "description": "葬られた場所は、現在の立会小学校の校庭のほぼ中央付近にあたる。墳墓は円型の土盛りで、前の左側に自然石の墓碑が立ち、銘文などが刻まれている。",
      "year": 1872,
      "yearEnd": null,
      "yearText": "明治5年（1872年）6月21日",
      "era": "meiji",
      "areas": ["oi"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": ["ev-1858-yodo-confinement", "ev-1954-yodo-grave-moved"],
      "relatedPeople": ["pe-yamauchi-toyoshige"],
      "relatedPlaces": ["pl-85ffa8153f"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第11号「山内豊信（容堂）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1954-yodo-grave-moved",
      "name": "山内豊信（容堂）の墓が立会小学校脇へ移される",
      "summary": "昭和29年、小学校用地の買収にともない、墓は立会小学校の校庭中央付近から現在地へ移された。",
      "description": "もとの埋葬地と現在の墓所は別の場所にあたる。現在の墓は東大井の大井公園脇にあり、区の指定史跡となっている。",
      "year": 1954,
      "yearEnd": null,
      "yearText": "昭和29年（1954年）",
      "era": "showa-post",
      "areas": ["oi"],
      "categories": ["culture"],
      "certainty": "fact",
      "relatedEvents": ["ev-1872-yodo-death"],
      "relatedPeople": ["pe-yamauchi-toyoshige"],
      "relatedPlaces": ["pl-85ffa8153f"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第11号「山内豊信（容堂）墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1854-daiba",
      "name": "品川台場の築造に由利公正が従事する",
      "summary": "安政元年、黒船来航により急務とされた品川台場の築造に、福井藩士の三岡八郎（のちの由利公正）が従事した。",
      "description": "三岡八郎は前年の嘉永6年に家督を継いでおり、藩内の兵制改革にも橋本佐内とともに取り組んだ。維新後に祖先の旧姓へ復し、由利公正と名乗った。",
      "year": 1854,
      "yearEnd": null,
      "yearText": "安政元年（1854年）",
      "era": "kinsei",
      "areas": ["shinagawa"],
      "categories": ["war", "admin"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-yuri-kimimasa"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第10号「由利公正墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-1909-yuri-death",
      "name": "由利公正が没し、海晏寺の後丘に葬られる",
      "summary": "明治42年4月28日、81歳で由利公正が没した。墓は南品川の海晏寺後丘にあり、区の指定史跡となっている。",
      "description": "墓碑は石造の隅丸角型で、高さ約95.0センチメートル、幅約96.0センチメートル、奥行き約48.0センチメートル。台石は幅約213.0センチメートルと大きく、どっしりとした造りである。",
      "year": 1909,
      "yearEnd": null,
      "yearText": "明治42年（1909年）4月28日",
      "era": "meiji",
      "areas": ["shinagawa"],
      "categories": ["admin"],
      "certainty": "fact",
      "relatedEvents": ["ev-1854-daiba", "ev-1890-shungaku-death"],
      "relatedPeople": ["pe-yuri-kimimasa"],
      "variants": [
        {
          "claim": "墓碑銘の翻刻は「明治十二年四月廿八日没」と記しており、解説本文の明治42年と合わない。生年の翻刻も「文政十五年」とあるが、文政は13年までで15年は存在しない。",
          "ref": "sgw-bunkazai",
          "locator": "品川地区の指定文化財 史跡第10号「由利公正墓」の銘文"
        }
      ],
      "relatedPlaces": ["pl-729d15df9e", "pl-0eb88578f1"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第10号「由利公正墓」" }],
      "verifiedAt": "2026-11-19"
    },
    {
      "id": "ev-2007-momochuken-designation",
      "name": "桃中軒雲右衛門の墓が区指定史跡となる",
      "summary": "平成19年12月25日、天妙国寺にある浪曲師・桃中軒雲右衛門の墓が品川区の指定史跡（史跡第24号）となった。",
      "description": "墓は南品川の天妙国寺にあり、見学できる。",
      "year": 2007,
      "yearEnd": null,
      "yearText": "平成19年（2007年）12月25日",
      "era": "heisei-reiwa",
      "areas": ["shinagawa"],
      "categories": ["culture"],
      "certainty": "fact",
      "relatedEvents": [],
      "relatedPeople": ["pe-momochuken-kumoemon"],
      "relatedPlaces": ["pl-1e1564b7a2", "pl-11e5d5f153"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "品川地区の指定文化財 史跡第24号「桃中軒雲右衛門の墓」" }],
      "verifiedAt": "2026-11-19"
    },

      {
        "id": "ev-1308-itabi",
        "name": "御殿山の一帯で板碑が造立されはじめる",
        "summary": "法禅寺に納められた板碑のうち最も古いものは徳治3年銘で、14世紀初頭から15世紀後半にかけて造立が続いた。",
        "description": "板碑は仏像や仏の種子を刻んだ卒塔婆で、13世紀から15世紀にかけて関東地方を中心に作られました。法禅寺に伝わる板碑116点は紀年銘が確認できる範囲で14世紀初頭から15世紀後半のもので、主尊は1基を除きすべて阿弥陀です。あわせて宝篋印塔の部材52点（14世紀末〜15世紀前半）と五輪塔の部材104点（15世紀初頭〜16世紀初頭）が残り、中世の御殿山が霊場としての性格を持っていたことを示しています。",
        "year": 1308,
        "yearEnd": 1500,
        "yearText": "徳治3年（1308年）ごろ〜15世紀後半",
        "era": "chusei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1854-gotenyama"
        ],
        "relatedPlaces": [
          "pl-2de8c135d9"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 考古資料「法禅寺板碑・宝篋印塔・五輪塔 附 遺墳碑・萬霊塔・枯骨之墳」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1463-dairyuji",
        "name": "大龍寺が時宗東光寺として開創される",
        "summary": "寛正4年、のちの大龍寺にあたる時宗東光寺が南品川に開かれた。",
        "description": "元禄16年には隠元禅師の弟子である中国人僧の慧林性機を開山として黄檗宗に改宗し、大龍寺となりました。",
        "year": 1463,
        "yearEnd": null,
        "yearText": "寛正4年（1463年）",
        "era": "chusei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1703-dairyuji-obaku"
        ],
        "relatedPlaces": [
          "pl-9751f82c34"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 絵画第6号「紙本墨画淡彩蘆葉達磨図」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1469-kijijinja",
        "name": "雉子神社と誕生八幡神社が創建されたと伝えられる",
        "summary": "どちらも文明年間の創建と伝えられる。誕生八幡神社は太田道灌が勧請したという。",
        "description": "雉子神社は江戸時代の初めまで「大鳥大明神」と呼ばれていました。誕生八幡神社は江戸時代には誕生八幡と称しています。いずれも伝承で、史料による裏付けがあるものではありません。",
        "year": null,
        "yearEnd": 1487,
        "yearText": "文明年間（1469〜1487年）",
        "era": "chusei",
        "areas": [
          "osaki"
        ],
        "categories": [
          "temple"
        ],
        "certainty": "tradition",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-9aaa87e538",
          "pl-4e8fbde73a"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大崎地区の指定文化財 古文書「雉子神社文書」、天然記念物「誕生八幡神社のイチョウ(1)」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1601-tenma",
        "name": "徳川家康が東海道に伝馬の制度を定め、品川宿が伝馬宿となる",
        "summary": "慶長6年正月の制度化により、品川宿は東海道の伝馬宿となった。当時は北品川宿と南品川宿の二宿だった。",
        "description": "伝馬の提供は両宿で負担していました。のちに歩行新宿が加宿として加わり、品川三宿になります。",
        "year": 1601,
        "yearEnd": null,
        "yearText": "慶長6年（1601年）正月",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "road",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1635-honjin",
          "ev-1722-kachishinshuku"
        ],
        "relatedPlaces": [
          "pl-6b12d55eea"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1614-gojunoto-fall",
        "name": "天妙国寺の五重塔が大風で倒壊する",
        "summary": "室町時代中ごろに建てられた五重塔が、慶長19年の大風で倒壊した。",
        "description": "その後、江戸時代初期に再建されましたが、元禄15年に焼失しました。現在残るのは礎石だけで、「妙国寺絵図」などに塔の姿が描かれています。",
        "year": 1614,
        "yearEnd": null,
        "yearText": "慶長19年（1614年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1702-gojunoto-fire"
        ],
        "relatedPlaces": [
          "pl-11e5d5f153"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財「天妙国寺五重塔礎石」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1635-koshinto",
        "name": "徳蔵寺に区内で最も古い庚申塔が造立される",
        "summary": "寛永12年の銘を持つ板碑型の庚申塔で、品川区に残る庚申塔のうち最古の紀年銘。",
        "description": "高さ160.0センチメートルで、12名の施主名が刻まれ、そのなかに大峯行者教善院の名が見えます。",
        "year": 1635,
        "yearEnd": null,
        "yearText": "寛永12年（1635年）",
        "era": "kinsei",
        "areas": [
          "osaki"
        ],
        "categories": [
          "temple",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大崎地区の指定文化財「徳蔵寺石造庚申供養塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1638-tokaiji",
        "name": "三代将軍徳川家光が沢庵のために東海寺を建立する",
        "summary": "寛永15年、家光は帰依する沢庵宗彭のために東海寺を建てた。隣接する品川神社は境内の一部が東海寺の用地となった。",
        "description": "このとき幕府は替地を下付し、品川神社を東海寺の鬼門除けの鎮守として社殿から神主の居宅までを新築整備しました。",
        "year": 1638,
        "yearEnd": null,
        "yearText": "寛永15年（1638年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1648-shinagawa-jinja-torii"
        ],
        "relatedPeople": [
          "pe-takuan-soho"
        ],
        "relatedPlaces": [
          "pl-f0dec3262a",
          "pl-548dab732d"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 建造物第1号「品川神社石造鳥居並水盤」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1655-ryoshimachi",
        "name": "南品川猟師町が開かれる",
        "summary": "明暦元年、伝馬の役を辞退した漁師たちが、目黒川河口の寄州「兜島」へ移されて新しい町が開かれた。",
        "description": "移されたのは南品川三丁目（現在の南品川二丁目）に住んでいた漁師たちで、兜島と呼ばれていた人家のない寄州が町の始まりです。区史によると、元禄期には約40戸があり、漁師が共同で使う網干場もありました。品川浦は幕府へ魚介類を献上する御菜肴八ヶ浦のひとつでした。関連地点の品川歴史館は、この町を伝える大島家文書の所蔵先です。町は南品川宿一丁目から川に沿って突き出す細長い土地にあり、洲崎とも呼ばれました。",
        "year": 1655,
        "yearEnd": null,
        "yearText": "明暦元年（1655年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "life",
          "placename"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1695-ryoshimachi-kenchi",
          "ev-1722-osakana-resumed",
          "ev-1884-ryoshimachi-fire"
        ],
        "relatedPlaces": [
          "pl-6b12d55eea"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大崎地区の指定文化財 古文書「大島家文書」"
          },
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「品川浦の成立」830〜831頁、「猟師町の構造」833〜835頁"
          },
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「南品川猟師町」398頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1685-suijin",
        "name": "大井村の村民が水神を祀る",
        "summary": "貞享2年、台地下から湧く地下水の恵みに感謝し、村民が九頭龍権現を祀った。",
        "description": "願主は大井村の桜井伊兵衛と大野忠左衛門と伝えられます。境内には熔岩を高さ約2メートルに積み上げた人工の石窟が造られ、木造の小祠に水葉乃女命が祀られました。文化5年の石祠には、この湧水が「柳の清水」と呼ばれ、日照りのときに村が雨乞いをしたと刻まれています。",
        "year": 1685,
        "yearEnd": null,
        "yearText": "貞享2年（1685年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "categories": [
          "water",
          "temple",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-7c41971c1d"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 史跡「大井の水神」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1691-tamerou",
        "name": "品川の溜牢で死亡した人々が海蔵寺に埋葬される",
        "summary": "元禄4年から明和2年までの間に、品川の溜牢で死亡した人の遺体が海蔵寺へ運ばれ、その数は700人を超えると伝えられる。",
        "description": "宝永5年には土地の有力者がこれを改葬し、遺骨を集めて墳墓を築いて観音像を安置しました。この塚は「頭痛塚」と呼ばれています。",
        "year": 1691,
        "yearEnd": 1765,
        "yearText": "元禄4年（1691年）〜明和2年（1765年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1865-tsunami-kuyoto"
        ],
        "relatedPlaces": [
          "pl-f1068fbcbb"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「海蔵寺無縁塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1695-ishibashi",
        "name": "大井村の念仏講が品川用水路に石橋を架ける",
        "summary": "元禄8年、大井村の寂証を中心とする58人の念仏講中が石橋を架け、橋の安泰と通行者の安全を願って道標を建てた。",
        "description": "この道標は区内に十数基ある道標のうち最古のもので、元禄期に大井村へ念仏講があり、講が架橋を行っていたことを示します。",
        "year": 1695,
        "yearEnd": null,
        "yearText": "元禄8年（1695年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "categories": [
          "water",
          "road",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-27e6dd0bca"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 史跡「元禄八年銘道標」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1702-gojunoto-fire",
        "name": "天妙国寺の五重塔が焼失する",
        "summary": "倒壊後に再建された五重塔が、元禄15年に焼失した。",
        "description": "以後は再建されず、礎石だけが残りました。",
        "year": 1702,
        "yearEnd": null,
        "yearText": "元禄15年（1702年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1614-gojunoto-fall"
        ],
        "relatedPlaces": [
          "pl-11e5d5f153"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財「天妙国寺五重塔礎石」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1703-dairyuji-obaku",
        "name": "大龍寺が黄檗宗に改宗する",
        "summary": "元禄16年、隠元禅師の弟子である中国人僧の慧林性機を開山として、時宗から黄檗宗に改められた。",
        "description": "このとき京都宇治万福寺の本尊の体内仏が施入されたと伝えられ、典型的な黄檗仏である木造釈迦如来及両脇侍像が伝わっています。",
        "year": 1703,
        "yearEnd": null,
        "yearText": "元禄16年（1703年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1463-dairyuji"
        ],
        "relatedPlaces": [
          "pl-9751f82c34"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 絵画第6号「紙本墨画淡彩蘆葉達磨図」、彫刻「木造釈迦如来及両脇侍像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1708-zutsuka",
        "name": "海蔵寺で改葬が行われ、頭痛塚が築かれる",
        "summary": "宝永5年、土地の有力者が溜牢で亡くなった人々を改葬し、遺骨を集めた墳墓の上に観音像を安置した。",
        "description": "この塚は「頭痛塚」と呼ばれ、のちに天保の大飢饉の犠牲者215人を祀る「二一五人塚」も合葬されました。",
        "year": 1708,
        "yearEnd": null,
        "yearText": "宝永5年（1708年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1691-tamerou"
        ],
        "relatedPlaces": [
          "pl-f1068fbcbb"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「海蔵寺無縁塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1711-urakousatsu",
        "name": "幕府が全国の浦々に「正徳の浦高札」を建てる",
        "summary": "正徳元年、海難事故が続出したため、幕府は対策として全国の浦々に触書の高札を建てた。",
        "description": "品川浦に高札場がいつ設けられたかは分かっていませんが、目黒川河口の新品川橋南岸付近と推定されています。寄木神社には正徳2年の銘を持つ添高札が伝わり、御城米船が破船した際の処置の心得を定めた二か条からなります。明治政府の発足とともに大方の浦高札が撤去されたため、現存するものは非常に少ないものです。",
        "year": 1711,
        "yearEnd": null,
        "yearText": "正徳元年（1711年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "admin",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-bdeb7c9ebc"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 歴史資料第1号「添浦高札」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1722-kachishinshuku",
        "name": "歩行新宿の加宿が認められ、品川三宿となる",
        "summary": "享保7年12月に下付された裁許状により、北品川宿の北側に生まれた新しい町並が加宿として認められ、歩行新宿と名づけられた。",
        "description": "伝馬の人足を負担していた北品川の法禅寺・善福寺の両門前町屋と新町が、宿内と変わらないとして道中奉行に訴え出たものです。江戸に近い地の利のある新町らに客を取られるとして南北両品川宿は反対しましたが、加宿が認められました。裁許状は歩行新宿の名主・飯田家に伝わり、のちに品川区へ寄贈されています。",
        "year": 1722,
        "yearEnd": null,
        "yearText": "享保7年（1722年）12月",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "road",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1601-tenma"
        ],
        "relatedPlaces": [
          "pl-6b12d55eea"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 古文書第6号「品川歩行新宿加宿裁許状」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1746-togoshi-komainu",
        "name": "戸越村の村民が戸越八幡神社に狛犬を奉納する",
        "summary": "延享3年、戸越村の村民が一対の石造狛犬を奉納した。社殿の手前、参道敷石の両側に建てられている。",
        "description": "同社の奉納絵馬も、奉納者の多くは戸越村の村民です。",
        "year": 1746,
        "yearEnd": null,
        "yearText": "延享3年（1746年）",
        "era": "kinsei",
        "areas": [
          "ebara"
        ],
        "categories": [
          "temple",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-9f3cab87af"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "荏原地区の指定文化財 有形民俗第5号「戸越八幡神社石造狛犬」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1789-mosochiku",
        "name": "山路治郎兵衛が戸越村に孟宗竹を植える",
        "summary": "寛政元年、廻船問屋の山路治郎兵衛が芝の薩摩屋敷から孟宗竹数株を入手し、戸越村の別邸付近に植えた。これが品川の筍栽培の始まりとされる。",
        "description": "治郎兵衛は名字帯刀を許された商人で、江戸鉄砲州で廻船問屋を営みながら戸越村の別邸に移っていました。改良を加えて数年後には庭一面に繁殖させ、この栽培を付近の農家に勧めたため、戸越村から目黒にかけての村々へ竹林が広がりました。竹と筍は関東大震災のころまで、この地域の特産品でした。元文元年に薩摩藩島津家が琉球から孟宗竹を入手したことが、竹に興味を持つきっかけだったとされます。",
        "year": 1789,
        "yearEnd": null,
        "yearText": "寛政元年（1789年）",
        "era": "kinsei",
        "areas": [
          "ebara"
        ],
        "categories": [
          "life",
          "industry"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1806-takenoko-hi"
        ],
        "relatedPeople": [
          "pe-yamaji-jirobe"
        ],
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
        "id": "ev-1798-kujira",
        "name": "品川沖で大鯨が捕らえられる",
        "summary": "寛政10年、品川沖で見つかった大鯨を品川猟師町の猟師たちが捕らえた。十一代将軍徳川家斉の上覧のあと、鯨を弔う碑が建てられた。",
        "description": "この碑が利田神社にある鯨碑で、できごとを後世に伝えるために建立されました。",
        "year": 1798,
        "yearEnd": null,
        "yearText": "寛政10年（1798年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "life",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1655-ryoshimachi"
        ],
        "relatedPlaces": [
          "pl-086da1e672"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「鯨碑」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1806-takenoko-hi",
        "name": "孟宗筍栽培記念碑が建てられる",
        "summary": "文化3年、山路治郎兵衛の一周忌に、子の三郎兵衛が歯骨を埋めてその上に碑を建てた。",
        "description": "高さ125.0センチメートル、幅65.0センチメートルの自然石型の碑で、正面に治郎兵衛の辞世「櫓も揖も弥陀にまかせて雪見哉 釋竹翁」が刻まれています。筍の碑として知られ、殖産興業の記念碑であるとともに、筍栽培の発祥地と最初の栽培者の功績を伝えるものです。",
        "year": 1806,
        "yearEnd": null,
        "yearText": "文化3年（1806年）",
        "era": "kinsei",
        "areas": [
          "ebara"
        ],
        "categories": [
          "life",
          "industry",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1789-mosochiku"
        ],
        "relatedPeople": [
          "pe-yamaji-jirobe"
        ],
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
        "id": "ev-1854-gotenyama",
        "name": "品川台場の築造で御殿山を掘り、中世の板碑などが出土する",
        "summary": "安政元年、品川台場を築くための土取り作業中に、御殿山の土取場から人骨・五輪塔・宝篋印塔とともに多数の板碑が出土した。",
        "description": "掛役人の大竹昌言は出土した石造物を法禅寺に納め、人骨は寺内に埋葬しました。のちに昌言の子の昌蔵が、一連の経緯を記した「法禅寺遺墳碑」を建てています。板碑116点、宝篋印塔の部材52点、五輪塔の部材104点が区の指定を受けており、中世の御殿山が霊場としての性格を持っていたことを示す資料群です。",
        "year": 1854,
        "yearEnd": null,
        "yearText": "安政元年（1854年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "site",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1308-itabi",
          "ev-1854-daiba"
        ],
        "relatedPlaces": [
          "pl-2de8c135d9"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 考古資料「法禅寺板碑・宝篋印塔・五輪塔 附 遺墳碑・萬霊塔・枯骨之墳」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1865-tsunami-kuyoto",
        "name": "品川惣町が津波溺死者供養塔を建てる",
        "summary": "慶応元年、品川惣町によって海蔵寺に津波溺死者供養塔が建立された。同じ年には元禄以降の獄死者を葬った無縁塔も建てられている。",
        "description": "明治6年には無縁1,268人の霊を祀る無縁供養塔が建てられ、明治9年には品川宿の娼妓たち400人の無縁仏も埋葬されて、大井楼主から大位牌一基が奉納されました。",
        "year": 1865,
        "yearEnd": null,
        "yearText": "慶応元年（1865年）",
        "era": "kinsei",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1691-tamerou",
          "ev-1915-jiko-kuyoto"
        ],
        "relatedPlaces": [
          "pl-f1068fbcbb"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「海蔵寺無縁塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1869-fujizuka",
        "name": "品川神社に富士塚が築かれる",
        "summary": "明治2年、北品川宿の北浜の人々を中心に結成された品川丸嘉講社の講中300余人の力で富士塚が築造された。",
        "description": "富士塚は、富士講の人々が富士山を遥拝する場として、また富士山に登れない人に山肌を触れさせる場として築いた人工の山です。神仏分離政策のなかで一度壊され、明治5年に再築されました。正徳寺所蔵の平松南園日記によれば、明治2年5月29日の築造完成の山開きには、赤坂や青山あたりの近郷各地の富士講の人々が幟旗を持って集まり、盛大な式典が行われたと記されています。大正から昭和初期の第一京浜国道の建設で東側が削られ、現在に至ります。",
        "year": 1869,
        "yearEnd": null,
        "yearText": "明治2年（1869年）5月29日",
        "era": "meiji",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "temple",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPlaces": [
          "pl-548dab732d"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 有形民俗「品川神社富士塚（品川富士）」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1884-ryoshimachi-fire",
        "name": "南品川猟師町が大火に遭う",
        "summary": "明治17年の大火で、世襲名主だった大島家に伝わる古文書が焼失した。",
        "description": "現在残っているのは近世文書13点と近代文書134点の計147点で、昭和13年に大島家によってまとめられたものです。少ないながら海苔養殖など水産業に関わる文書を含み、猟師町の歴史を伝えています。",
        "year": 1884,
        "yearEnd": null,
        "yearText": "明治17年（1884年）",
        "era": "meiji",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1655-ryoshimachi"
        ],
        "relatedPlaces": [
          "pl-6b12d55eea"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大崎地区の指定文化財 古文書「大島家文書」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1915-jiko-kuyoto",
        "name": "鉄道轢死・海岸溺死者供養塔が建てられる",
        "summary": "明治から大正にかけて品川で鉄道事故や海岸での溺死が多発したため、大正4年に山添万吉のきもいりで供養塔が建てられた。",
        "description": "海蔵寺の無縁塔群のひとつです。",
        "year": 1915,
        "yearEnd": null,
        "yearText": "大正4年（1915年）",
        "era": "taisho",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war",
          "transport"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1865-tsunami-kuyoto",
          "ev-1923-shinsai"
        ],
        "relatedPlaces": [
          "pl-f1068fbcbb"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「海蔵寺無縁塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1923-shinsai",
        "name": "関東大震災で亡くなった人が品川海岸に漂着する",
        "summary": "大正12年の関東大震災で死亡し品川海岸に漂着した人々を祀るため、昭和7年に震災横死者供養塔が建てられた。",
        "description": "海蔵寺の無縁塔群のひとつで、区内における震災の記憶を伝えています。",
        "year": 1923,
        "yearEnd": 1932,
        "yearText": "大正12年（1923年）の震災、供養塔は昭和7年（1932年）",
        "era": "taisho",
        "areas": [
          "shinagawa"
        ],
        "categories": [
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1915-jiko-kuyoto"
        ],
        "relatedPlaces": [
          "pl-f1068fbcbb"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "品川地区の指定文化財 史跡「海蔵寺無縁塔群」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-1926-yogyokuin",
        "name": "如来寺が養玉院と合併する",
        "summary": "大正15年、明治30年代に大井村へ移っていた如来寺が養玉院と合併した。",
        "description": "如来寺は寛永13年に江戸芝高輪に建てられ、木食但唱が弟子とともに信濃国で造立した五智如来を安置していました。養玉院は寛永年間に上野の寺の屏風坂門内に天海僧正を開山として創建され、元禄11年に下谷坂本へ、大正12年に現在地へ移っています。",
        "year": 1926,
        "yearEnd": null,
        "yearText": "大正15年（1926年）",
        "era": "taisho",
        "areas": [
          "oi"
        ],
        "categories": [
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [
          "pe-tenkai"
        ],
        "relatedPlaces": [],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻「木造五智如来坐像」、彫刻「木造念海和尚像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },

      {
        "id": "ev-1820-hakugyu",
        "name": "泊船寺に俳人が集い、白牛禅師の句碑が建てられる",
        "summary": "文政3年に白牛禅師が没し、その翌年、弟子の大野景山の発起で境内に句碑が建てられた。",
        "description": "文化年間、下総国出身の俳人・山奴が泊船寺の芭蕉堂に寓居して俳諧に没頭し、出家して白牛禅師となりました。大井村の名主・大野五蔵惟図（俳号は景山）がその弟子となり、山奴は二世杜格斎、景山は三世杜格斎として俳諧を指導し、一時は弟子が数百人もいたといいます。句碑は「漁火に鳥の飛行霜夜かな」。同寺には芭蕉・嵐雪・其角の肖像彫刻も伝わり、江戸時代後期にこの寺が俳人の集まる場となっていたことがうかがえます。",
        "year": 1821,
        "yearEnd": null,
        "yearText": "文政4年（1821年）",
        "era": "kinsei",
        "areas": [
          "oi"
        ],
        "categories": [
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [
          "pe-hakugyu-zenji",
          "pe-ono-keizan",
          "pe-matsuo-basho",
          "pe-hattori-ransetsu",
          "pe-takarai-kikaku"
        ],
        "relatedPlaces": [
          "pl-9250914617"
        ],
        "sources": [
          {
            "ref": "sgw-bunkazai",
            "locator": "大井地区の指定文化財 彫刻第10号「木造白牛禅師坐像」、彫刻「木造松尾芭蕉坐像」"
          }
        ],
        "verifiedAt": "2026-11-20"
      },
      {
        "id": "ev-jomon-gongendai",
        "name": "大井権現台貝塚に縄文時代の土器や土偶が残る",
        "summary": "広町の大井鉄道工場内にあった大井権現台貝塚を出土地として、深鉢形土器・みみずく土偶残片・土版残欠・貝器・弭形角器が伝わる。いずれも縄文時代後期から晩期のもの。",
        "description": "文化遺産オンラインには、大井権現台貝塚を出土地とする資料が7件登録されている。出土地は「東京都品川区広町2丁目大井鉄道工場内」と記され、時代は縄文時代の後期（前2000〜前1000年）または後期から晩期（前2000〜前400年）とされる。土版残欠は長さ8.2センチメートル、幅5.9センチメートル、厚さ2.3センチメートル。東大井を出土地とする鉢形土器も1件あり、いずれも東京国立博物館が所蔵している。ここに示した年代は出土品そのものの年代であって、発掘された時期ではありません。発掘については、品川に住んだ小説家の江見水蔭がこの貝塚の発掘を行ったことが品川区立図書館の資料に記されていますが、その時期は分かりません。年表の原始の項目は、この出土資料によるものです。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代後期〜晩期（前2000年〜前400年ごろ）",
        "era": "genshi",
        "areas": ["oi"],
        "categories": ["site", "life"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": ["pe-emi-suiin"],
        "sources": [{ "ref": "bunka-online", "locator": "「土版残欠」（448667）、「深鉢形土器」（493574）、「みみずく土偶残片」（490440・490868・459183）、「貝器」（518071）、「弭形角器」（522539）、「鉢形土器」（578890）" }, { "ref": "sgw-library", "locator": "品川ゆかりの人物「江見水蔭」" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1317-hokyointo",
        "name": "安養院に石造宝篋印塔が造られる",
        "summary": "西五反田の安養院に伝わる石造宝篋印塔2基。鎌倉時代後期、1317年のものとされる。",
        "description": "所在地は東京都品川区西五反田4丁目12番地1。2基とも昭和28年8月29日に国の重要文化財に指定されている。",
        "year": 1317,
        "yearEnd": null,
        "yearText": "鎌倉時代後期（1317年）",
        "era": "chusei",
        "areas": ["osaki"],
        "categories": ["temple", "site"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-ffc3a17a80", "pl-f11e74239c", "pl-c75991a87f"],
        "sources": [{ "ref": "bunka-online", "locator": "「宝篋印塔 （１）」（199549）、「宝篋印塔 （２）」（193280）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1917-shimazu-tei",
        "name": "東五反田に旧島津家本邸が建てられる",
        "summary": "大正6年、煉瓦造二階建の本館が建てられた。現在は清泉女子大学が使っている。",
        "description": "本館は煉瓦造、建築面積876.21平方メートル、二階建で一部に地下一階があり、スレート及び銅板葺。所在地は東京都品川区東五反田三丁目191番地39。所有は学校法人清泉女学院。",
        "year": 1917,
        "yearEnd": null,
        "yearText": "大正6年（1917年）",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": ["building"],
        "certainty": "fact",
        "relatedEvents": ["ev-2019-shimazu-juubun"],
        "relatedPeople": ["pe-josiah-conder"],
        "relatedPlaces": ["pl-a6c7b29cf9"],
        "sources": [{ "ref": "bunka-online", "locator": "「旧島津家本邸 本館」（411775）、「旧島津家本邸 事務所」（441386）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1921-nagahama",
        "name": "平塚に長濱家住宅が建てられる",
        "summary": "大正10年の木造2階建の主屋と門。令和2年に国の登録有形文化財になった。",
        "description": "主屋は木造2階建、瓦葺、建築面積77平方メートルで床下倉庫が付く。門も同じ大正10年のもの。所在地は東京都品川区平塚一丁目584。",
        "year": 1921,
        "yearEnd": null,
        "yearText": "大正10年（1921年）",
        "era": "taisho",
        "areas": ["ebara"],
        "categories": ["building", "life"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [{ "ref": "bunka-online", "locator": "「長濱家住宅主屋」（402501）、「長濱家住宅門」（430542）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1922-mitsui-bunko",
        "name": "豊町に三井文庫の第二書庫が建てられる",
        "summary": "大正11年の鉄筋コンクリート造3階建の書庫。令和2年に国の登録有形文化財になった。",
        "description": "鉄筋コンクリート造3階建、金属板葺、建築面積130平方メートル。所在地は東京都品川区豊町一丁目1131-1で、現在の所有は品川区。",
        "year": 1922,
        "yearEnd": null,
        "yearText": "大正11年（1922年）",
        "era": "taisho",
        "areas": ["ebara"],
        "categories": ["building", "culture"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [{ "ref": "bunka-online", "locator": "「旧三井文庫第二書庫」（445143）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1926-takuan-mabuchi-shiseki",
        "name": "沢庵墓と賀茂真淵墓が国の史跡に指定される",
        "summary": "大正15年10月20日、北品川の東海寺大山墓地にある2つの墓が同じ日に国の史跡に指定された。",
        "description": "文化遺産オンラインは両方の所在地を「品川区北品川三丁目」と記す。区の指定文化財一覧では北品川4-11-8（東海寺大山墓地）としており、表記が分かれている。なお賀茂真淵の姓は、文化遺産オンラインでは「加茂真淵」と書かれている。",
        "year": 1926,
        "yearEnd": null,
        "yearText": "大正15年（1926年）10月20日",
        "era": "taisho",
        "areas": ["shinagawa"],
        "categories": ["admin", "site"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": ["pe-takuan-soho", "pe-kamo-mabuchi"],
        "relatedPlaces": ["pl-ef0990e965", "pl-1a93e184b8"],
        "sources": [{ "ref": "bunka-online", "locator": "「沢庵墓」（138014）、「加茂真淵墓」（171745）" }, { "ref": "sgw-bunkazai", "locator": "区内にある都および国の指定文化財" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1928-hataoka-emaden",
        "name": "旗岡八幡神社に絵馬殿が建てられる",
        "summary": "昭和3年ごろの木造平屋建の絵馬殿。のちに2度移築されている。平成25年に国の登録有形文化財になった。",
        "description": "木造平屋建、銅板葺、建築面積50平方メートル。文化遺産オンラインは年代を「昭和前/1928頃/1945頃・1962頃移築」と記し、建築も移築も「ごろ」としている。所在地は東京都品川区旗の台3-852-1。",
        "year": 1928,
        "yearEnd": null,
        "yearText": "昭和3年（1928年）ごろ",
        "era": "showa-pre",
        "areas": ["ebara"],
        "categories": ["temple", "building"],
        "certainty": "estimate",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-85aaa422e3", "pl-aea9363b40"],
        "sources": [{ "ref": "bunka-online", "locator": "「旗岡八幡神社絵馬殿」（229368）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1929-shinagawabashi-taikijo",
        "name": "品川橋のたもとに警察の交通待機所が建てられる",
        "summary": "昭和4年、南品川一丁目に建築面積13平方メートルの木造平屋建が建てられた。令和5年に国の登録有形文化財になった。",
        "description": "旧品川警察署品川橋交通待機所。木造平屋建で建築面積は13平方メートル。所在地は東京都品川区南品川一丁目223-5。",
        "year": 1929,
        "yearEnd": null,
        "yearText": "昭和4年（1929年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "categories": ["building", "transport"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [{ "ref": "bunka-online", "locator": "「旧品川警察署品川橋交通待機所」（560735）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1938-koikeke",
        "name": "北品川に小池家住宅主屋が建てられる",
        "summary": "昭和13年の木造2階建。平成23年に国の登録有形文化財になった。",
        "description": "木造2階建、瓦葺、建築面積205平方メートル。所在地は東京都品川区北品川5-740-10。",
        "year": 1938,
        "yearEnd": null,
        "yearText": "昭和13年（1938年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "categories": ["building", "life"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-0c81c36a89"],
        "sources": [{ "ref": "bunka-online", "locator": "「小池家住宅主屋」（146704）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1973-kita-nogakudo",
        "name": "上大崎に十四世喜多六平太記念能楽堂が建てられる",
        "summary": "昭和48年、舞台と橋掛を備えた能楽堂が建てられた。令和8年に国の登録有形文化財になった。",
        "description": "鉄骨鉄筋コンクリート造で地上2階地下2階建、建築面積626平方メートル、舞台及び橋掛付。所在地は東京都品川区上大崎四丁目245-1ほか。",
        "year": 1973,
        "yearEnd": null,
        "yearText": "昭和48年（1973年）",
        "era": "showa-post",
        "areas": ["osaki"],
        "categories": ["building", "culture"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-2c7165409b"],
        "sources": [{ "ref": "bunka-online", "locator": "「十四世喜多六平太記念能楽堂」（664869）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-2019-shimazu-juubun",
        "name": "旧島津家本邸が国の重要文化財に指定される",
        "summary": "令和元年12月27日、本館と事務所が重要文化財に指定された。",
        "description": "大正6年に建てられた本館と、同じ敷地の事務所の2件が、それぞれ重要文化財として指定されている。",
        "year": 2019,
        "yearEnd": null,
        "yearText": "令和元年（2019年）12月27日",
        "era": "heisei-reiwa",
        "areas": ["osaki"],
        "categories": ["admin", "building"],
        "certainty": "fact",
        "relatedEvents": ["ev-1917-shimazu-tei"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-a6c7b29cf9"],
        "sources": [{ "ref": "bunka-online", "locator": "「旧島津家本邸 本館」（411775）、「旧島津家本邸 事務所」（441386）" }],
        "verifiedAt": "2026-11-21"
      },
      {
        "id": "ev-1869-shinagawa-beer",
        "name": "品川県が大井村にビール製造所を設ける",
        "summary": "授産と窮民救助のため、品川県が大井村字浜川の松平土佐守下屋敷跡に建坪62坪半のビール製造所を設けた。",
        "description": "区史は、明治2年2月に品川県が自前の授産事業としてビール製造所を設けたと記す。場所は大井村字浜川地内の松平土佐守下屋敷跡で、建坪は62坪半。誰の計画によるものかは分かっておらず、大井村の名主で鹿児島藩や高知藩に出入りした商人でもあった平林九兵衛の建議によるという説が紹介されている。廃藩置県後の明治4年10月に民間へ払い下げることが決まり、建物と付属設備あわせて4,000円と評価された。区史は、日本のビール醸造の開祖は明治9年の元札幌麦酒会社といわれると書いたうえで、これより早い時期に品川で醸造が行われたことを挙げている。",
        "year": 1869,
        "yearEnd": null,
        "yearText": "明治2年（1869年）2月",
        "era": "meiji",
        "areas": ["oi"],
        "categories": [
          "industry",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「幻のビール工場」90〜91頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1872-shinagawa-yokohama-rail",
        "name": "品川・横浜間で鉄道の仮営業が始まる",
        "summary": "明治5年5月7日、品川・横浜間23.8キロの単線で仮営業が始まり、1日2往復の旅客列車が走った。",
        "description": "区史によれば、明治5年5月2日に太政官が品川・横浜（いまの桜木町）間23.8キロの開業を公表し、5月7日から仮営業が始まった。当初は1日2往復。高輪から品川の区間は難工事とされ、八ッ山に陸軍、浜御殿に海軍の施設があって測量に入れなかったため、海の中に築堤を設けて線路を通した。築堤の土砂は八ッ山と御殿山の切取場所から馬車で運び、明治5年5月4日に完成している。用地の買収は北品川宿だけで23人に及んだ。同年7月25日には新橋・品川間の線路敷設も終わった。",
        "year": 1872,
        "yearEnd": null,
        "yearText": "明治5年（1872年）5月7日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「東京・横浜間の鉄道敷設」101〜103頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1872-station-to-takanawa",
        "name": "品川宿の反対で、鉄道の駅が高輪に置かれる",
        "summary": "宿場がさびれるという反対から、駅は品川の宿場ではなく高輪に設けられた。品川駅が品川区内にない理由にあたる。",
        "description": "区史は、芝金杉の人々が東海道への鉄道敷設に反対したのと同じように、品川宿の人々も宿場がさびれるとして強く反対したため、駅は品川の宿場には設けられず高輪に設けるほかなかった、と記す。そのため品川駅は港区内にある。開通直後は横浜通いに多少の影響が出た程度だったが、同年9月に新橋から横浜へ直通するようになると、関西や東海へ向かう人も汽車を使うようになり、交通の関門としての品川宿は大きな影響を受けた。",
        "year": 1872,
        "yearEnd": null,
        "yearText": "明治5年（1872年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": [
          "transport",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1872-shinagawa-yokohama-rail",
          "ev-1872-shukueki-abolished"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「鉄道開通と品川宿の変化」110〜111頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1877-kosaku-bunkyoku",
        "name": "品川硝子製造所が品川工作分局と改称される",
        "summary": "明治10年1月の官制改正で製作寮が工作局となり、品川硝子製造所は品川工作分局と改められた。局長は大鳥圭介。",
        "description": "区史によれば、明治10年1月の官制改正で製作寮は工作局となり、大鳥圭介が局長に就いた。これにあわせて品川硝子製造所は品川工作分局と改称された。この時期、明治10年11月には舷燈用の紅色硝子を試作し、明治12年4月には硝子工ゼームス・スピードを雇って食器などの製造を始めている。紅色硝子の試作には、幕末に佐賀藩の硝子工場で経験を積み、明治6年のウィーン万国博覧会に随員として渡欧した藤山種広が日本人として加わった。",
        "year": 1877,
        "yearEnd": null,
        "yearText": "明治10年（1877年）1月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1876-glass-nationalized"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「品川硝子製造所から品川工作分局へ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1879-kagaku-jikkenjo",
        "name": "品川工作分局に化学実験所が設けられる",
        "summary": "明治12年12月25日、分局内に化学実験所が新設され、赤鉛や炭酸加里などの化学製品の製造も始まった。",
        "description": "区史によれば、明治12年12月25日に品川工作分局の中へ化学実験所が新設され、赤鉛・炭酸加里などの化学製品の製造が始まった。工部大学校（現在の東京大学工学部の前身）の化学教師ダイフルスが監督し、同校の化学専攻の学生も参加している。実験所は明治16年2月に廃止された。区史は、のちに同じ場所へ三共の品川工場が置かれたことを、因縁めいた巡り合わせとして書きとめている。",
        "year": 1879,
        "yearEnd": null,
        "yearText": "明治12年（1879年）12月25日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1877-kosaku-bunkyoku"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「品川硝子製造所から品川工作分局へ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1881-itagarasu",
        "name": "品川工作分局が板硝子の製造に着手する",
        "summary": "明治14年2月、宿願だった板硝子の製造に着手したが成功とはいえず、翌年いったん中止された。",
        "description": "区史によれば、明治14年2月に宿願であった板硝子の製造に着手したものの、完全に成功したとはいいがたく、翌明治15年にいったん中止された。明治16年に再び着手したが、まもなく廃止されている。同じ明治14年3月には第二回内国勧業博覧会に各種の硝子製品を出品し、二等賞を受けた。製品の販売のため、商人の杉田幸五郎に命じて京橋区出雲町に売捌所を開かせてもいる。",
        "year": 1881,
        "yearEnd": 1883,
        "yearText": "明治14年（1881年）2月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1877-kosaku-bunkyoku"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「品川硝子製造所から品川工作分局へ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1887-shinagawa-shirorenga",
        "name": "御殿山下に品川白煉瓦製造所が移ってくる",
        "summary": "明治20年10月、西村勝三が深川の白煉瓦工場を北品川御殿山下へ移し、品川白煉瓦製造所と改称した。",
        "description": "区史によれば、西村勝三は明治8年にフランス人ペレゲレンの指導で芝浦に耐火煉瓦の製造を始め、明治16年に深川の白煉瓦工場の払下げを受けて伊勢勝白煉瓦製造所を設立した。深川セメントの公害問題にともなう移転とも関わって、明治20年10月に旧深川工場を北品川御殿山下へ移し、品川白煉瓦製造所と改称した。品川硝子製造所に隣接して置かれたのは、硝子窯に耐火煉瓦が欠かせず、技術の行き来を図るためで、偶然ではないと区史は述べている。ここで焼かれた白煉瓦はほとんどがガス竈用で、ガスの灯りが東京市中から周辺の町村へ広がるのを支えた。明治36年6月に株式会社となり、品川白煉瓦株式会社と称した。",
        "year": 1887,
        "yearEnd": null,
        "yearText": "明治20年（1887年）10月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1885-glass-sold"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「品川白煉瓦製造所」94〜95頁"
          },
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「ガス竃用白煉瓦の製造」118〜119頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1884-naiwan-gyogyo-kumiai",
        "name": "東京内湾漁業組合が結成される",
        "summary": "明治17年11月、湾内99か町村を含む東京内湾漁業組合が結成され、維新後に乱れた漁場の秩序が立て直された。",
        "description": "区史によれば、明治8年12月に従来の特権的な漁場確保が消滅し、誰でも勝手に漁をしてよいことになって、旧幕時代の統制が乱れた。これを元に戻す運動が重ねられ、明治14年3月にようやく実を結び、同年6月に内湾組合漁業契約が結ばれて、たびたび問題を起こしていた佃島も加わった。これが明治17年11月の東京内湾漁業組合の結成へと進み、湾内99か町村を含む大組合となった。品川浦と大井御林浦はいずれも御菜八ヶ浦に属する漁業専業の集落で、漁業は品川にとって重要な産業だった。",
        "year": 1884,
        "yearEnd": null,
        "yearText": "明治17年（1884年）11月",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「漁業」8頁"
          },
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「品川の漁業」210〜211頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1883-nori-ishoku",
        "name": "海苔の移殖法が成功し、湾内に養殖場が広がる",
        "summary": "明治16年に海苔の移殖法が成功し、明治18、19年ごろから湾内の各所で養殖場の新設・増設が進んだ。",
        "description": "区史によれば、品川の特産である海苔は、明治16年に移殖法が成功し、明治18、19年ごろから湾内の各所で養殖場の新設・増設が行われた。一方で品川では、薩摩藩に関わる人々が政府の権力を後ろ盾にしてヒビを立てる場所を相当な面積で獲得し、品川の海苔業者との間に争いが起きたという。海苔の採取は年を追って盛んになり、営業規則をつくって規制するようになるのは明治25年以降のことである。品川産の海苔は「浅草海苔」として知られた。",
        "year": 1883,
        "yearEnd": null,
        "yearText": "明治16年（1883年）",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1884-naiwan-gyogyo-kumiai"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「海苔」8頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1871-rikuun-gaisha",
        "name": "南品川宿の伝馬所跡に陸運会社が置かれる",
        "summary": "明治4年10月、品川駅の陸運会社が南品川宿の伝馬所跡に設けられ、宿駅に代わる輸送を担った。",
        "description": "区史によれば、明治3年5月に民部省と大蔵省の合議で「宿駅人馬相対継立会社取建之趣意説諭振」が決まり、街道の各駅に、公的な伝馬所とは別に民間の貨客輸送を担う継立機関を設ける方向が示された。明治4年5月には「陸運会社規則条」がつくられ、同年末から翌年初めにかけて東海道の各駅に陸運会社が相次いで設立される。品川駅の陸運会社の設立は明治4年10月で、南品川宿の伝馬所跡に置かれた。この結果、東京・大阪間の継立業務は各駅の陸運会社に委ねられ、明治5年7月20日の太政官布告で、全国の伝馬所と助郷は8月末をもって廃止された。",
        "year": 1871,
        "yearEnd": null,
        "yearText": "明治4年（1871年）10月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": ["ev-1872-shukueki-abolished"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「陸運会社の設立と宿駅制度の廃止」99〜100頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1895-basha-tetsudo",
        "name": "品川八ッ山と新橋を結ぶ馬車鉄道が開通する",
        "summary": "明治27年に着手された品川八ッ山・新橋間の馬車鉄道が翌年開通し、明治36年8月20日から電車に変わった。",
        "description": "区史によれば、品川八ッ山から新橋にいたる馬車鉄道は明治27年に着手され、軌道が敷かれて翌明治28年に開通した。明治36年8月20日からは電車に変わっている。当初の料金は旧市内の鉄道馬車と変わらなかったという。なお明治5年の鉄道開通後、東京・横浜間の乗合馬車は品川駅前から池上や六郷までといった近距離に転じていたが、明治31年に京浜電気鉄道が開通したことで消えていった。",
        "year": 1895,
        "yearEnd": null,
        "yearText": "明治28年（1895年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「馬車」122頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1962-gyogyoken-hoki",
        "name": "内湾の漁業権放棄が決まり、品川から漁業が消える",
        "summary": "昭和37年12月の内湾漁業権放棄の決定により、品川区域から漁業が完全に姿を消した。",
        "description": "区史は、近世以来、品川浦と大井御林浦という二つの漁業専業の集落をもち、江戸前の鮮魚や貝類の供給地であった品川区域から、昭和37年12月の内湾における漁業権放棄の決定によって漁業が完全に姿を消すに至った、と記す。東京湾とくに内湾の変化や周囲の環境の変転とともに、まず漁猟が衰え、海苔養殖はしばらく繁栄が続いたものの、やがて衰退に向かっていた。",
        "year": 1962,
        "yearEnd": null,
        "yearText": "昭和37年（1962年）12月",
        "era": "showa-post",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1884-naiwan-gyogyo-kumiai",
          "ev-1883-nori-ishoku"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「品川の漁業」210〜211頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1889-shinagawa-basha-kaisha",
        "name": "品川馬車会社が設立される",
        "summary": "明治22年10月、品川町の漆昌巌を委員長として資本金5万円の品川馬車会社が設立された。",
        "description": "区史によれば、東京馬車鉄道の成功を受けて、品川町の漆昌巌を委員長（現在の社長にあたる）とする資本金5万円の品川馬車会社が明治22年10月に設立された。翌明治23年2月には倍額増資と定款改正を行い、本社を品川町の品川歩行新宿31番地、支社を芝高輪南町30番地に置いた。品川・新橋・上野・浅草間と、品川・大森・川崎・大師河原間の2線を営業したが、無軌道式の乗合馬車だったため鉄道馬車より乗り心地が悪く、成績はよくなかったという。明治30年12月に軌道式へ変更して品川馬車鉄道株式会社と改称し、明治32年6月19日に解散して事業の全部を東京馬車鉄道に譲渡した。",
        "year": 1889,
        "yearEnd": 1899,
        "yearText": "明治22年（1889年）10月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": ["ev-1895-basha-tetsudo"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「品川馬車鉄道の成立」228〜229頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1900-shirorenga-goshi",
        "name": "品川白煉瓦が合資会社となり、渋沢栄一らが出資する",
        "summary": "明治33年7月、品川白煉瓦製造所は資本金8万円の合資会社に改組し、渋沢栄一・益田孝・団琢磨らが出資者に名を連ねた。",
        "description": "区史によれば、明治33年7月に品川白煉瓦製造所は合資会社組織に変わり、第一銀行の渋沢栄一、三井物産の益田孝と団琢磨、日本ビールの馬越恭平のほか、品川町から漆昌巌も加わって、出資者17名・資本金8万円の品川白煉瓦合資会社となった。明治24年には愛知県猿投山の硅石を原料として国内で最初の硅石煉瓦を製造し、明治27年に発明された「シリカ」耐火煉瓦は専売特許品として各種の製鉄炉・製鋼炉・ガス発生炉などに欠かせない材料となっていた。明治36年6月に再び株式会社へ組織を変え、資本金を25万円に増資している。創業者の西村勝三は明治40年1月、前年夏に発病した盲腸炎が原因で没した。享年72。",
        "year": 1900,
        "yearEnd": null,
        "yearText": "明治33年（1900年）7月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1887-shinagawa-shirorenga"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「品川白煉瓦の誕生」251〜255頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1902-meiji-gomu",
        "name": "北品川の東海寺畔に明治護謨製造所が移ってくる",
        "summary": "明治35年、米井源次郎商店が東京護謨製造合資会社を引き受け、北品川の東海寺畔へ移して明治護謨製造所と改めた。",
        "description": "区史によれば、エボナイトの部品や型物、大砲の弾器をつくって逓信・海軍・鉄道の各省に納めていた東京護謨製造合資会社は、明治25年に西大久保の掘立小屋の工場（職工は男1名・女2名の計3名）で始まった。一時休業したのち、明治35年に米井源次郎商店がこれを引き受け、北品川の東海寺畔へ移して明治護謨製造所と改称した。明治36年に試作した自転車用タイヤは、兵庫県下の陸軍特別大演習で試用され成績が良かったという。",
        "year": 1902,
        "yearEnd": null,
        "yearText": "明治35年（1902年）",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "variants": [
          {
            "claim": "同じ区史の別の節は、米井源次郎商店が引き継いで北品川東海寺畔へ移り明治護謨製造所となったのを明治33年2月、資本金5万円と記しており、こちらの明治35年と合わない。前身の東京護謨製造合資会社が工場を構えた時期も、一方は明治25年、他方は日清戦争前後としていて食い違う。",
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「藤倉工業の設立と明治護謨製造所」337〜341頁"
          }
        ],
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「藤倉合名会社防水布製造所と明治護謨製造所の創設」262〜264頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1910-fujikura-bosuifu",
        "name": "藤倉合名会社防水布製造所が上大崎に工場を移す",
        "summary": "明治43年、藤倉護謨合名会社からゴム引防水布の製造が分離され、工場が荏原郡大崎町上大崎251番地に移された。",
        "description": "区史によれば、日露戦争前後に電話・電信・電燈・電車と電気の利用が活発になったことを受け、明治43年に藤倉護謨合名会社は資本金50万円の藤倉電線株式会社に改組した。同時にゴム引防水布の製造を分離して資本金10万円の藤倉合名会社防水布製造所を設立し、工場を府下荏原郡大崎町大字上大崎251番地へ移している。明治41年には横須賀海軍鎮守府から潜水艇用防水服の製造工場に指定され、明治44年には飛行機用の翼布の製作も引き受けた。",
        "year": 1910,
        "yearEnd": null,
        "yearText": "明治43年（1910年）",
        "era": "meiji",
        "areas": ["osaki"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「藤倉合名会社防水布製造所と明治護謨製造所の創設」262〜264頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1912-tokyo-denki-oi",
        "name": "東京電気が大井町でタングステン電球の製造を始める",
        "summary": "明治44年12月に元後藤毛織工場を借り受け、翌年2月からタングステン電球の製造を開始した。のちのマツダ電球である。",
        "description": "区史によれば、東京電気株式会社は需要の急増に応じきれず、明治44年12月に大井町字関ケ原1302番地の元後藤毛織工場を借り受け、明治45年2月からタングステン電球の製造を始めた。敷地1,920坪、工場は煉瓦建409坪1棟で、当初の製造能力は1日平均3,000個。同年5月には炭素電球工場も設けられ、大井工場はタングステン電球・炭素電球・陶器（バルブ用）の3工場をもつ大工場となった。大正元年の暮れには付近の工場建物8,000坪を購入し、大正4年2月に小型電球工場が竣工、大正5年1月末には三田工場の設備一切が大井工場へ移された。同社はタングステン電球に「マツダ」の商標を付して炭素電球と区別した。区史は、区内でのクリスマス用電球の始まりが大正中期のこの大井工場と関わることを書きとめている。",
        "year": 1912,
        "yearEnd": null,
        "yearText": "明治45年（1912年）2月",
        "era": "meiji",
        "areas": ["oi"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「マツダ電球と東京電気大井工場」300〜302頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1912-nippon-keori-oi",
        "name": "日本毛織が東京製絨大井工場を譲り受ける",
        "summary": "大正元年9月、日本毛織が東京製絨の大井工場を30万円で譲り受け、日本毛織東京工場と名づけた。",
        "description": "区史によれば、明治44年10月に辛亥革命が起こって軍絨の注文が増すなか、日本毛織株式会社は大正元年9月に東京製絨の大井工場を30万円で譲り受け、日本毛織東京工場と命名して絨地とフランネルの製造を始めた。大正6年6月には東京製絨・東京毛織物・後藤毛織の流れをくむ3社が合併して東京毛織会社が設立される。大正7年ごろの『東京府荏原郡勢一覧』によれば、区域内の工場で職工数が最大だったのは東京毛織大井工場の2,945名で、関東大震災のころも男工528名・女工1,243名の計1,771名を擁していた。",
        "year": 1912,
        "yearEnd": null,
        "yearText": "大正元年（1912年）9月",
        "era": "taisho",
        "areas": ["oi"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1912-tokyo-denki-oi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「羊毛工業」296〜298頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1913-meidensha-osaki",
        "name": "明電舎が大崎駅の隣に工場を移す",
        "summary": "大正2年5月、明電舎が大崎駅に隣接する約6,000坪の敷地に工場を落成させ、6月1日から開業した。大崎の工場街の始まりにあたる。",
        "description": "区史によれば、日露戦争後の電力事業の進展で電動機や変圧器の需要が増え、京橋明石町の工場では敷地を広げる余地がなくなっていた。そこで、当時は人家のまばらな郊外で田畑に囲まれていた大崎駅の隣に約6,000坪を求め、2,200余坪の工場を建てることとした。目黒川に近く舟運の便にも恵まれており、旧平塚村桐ケ谷付近から土砂を運んで埋め立て、地ならしをしている。明治45年2月に起工、大正2年5月に落成して移転を終え、6月1日から開業した。移転当時は職員15、6名、職工200名ほど。大正6年6月1日には個人営業から資本金200万円の株式会社に改め、大正10年8月に500万円へ増資している。",
        "year": 1913,
        "yearEnd": null,
        "yearText": "大正2年（1913年）5月",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「機械工業の発展と電気機械の明電舎」298〜300頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1917-nsk-osaki",
        "name": "日本精工が大崎町に本社を移す",
        "summary": "大正6年7月17日、日本精工が大崎町へ本社を移し、工場と一体になった。大崎を選んだのは地価の安さと姉妹会社の存在による。",
        "description": "区史によれば、山武商会は大正3年2月20日に資本金5万円の日本精工合資会社を設立した。工場を大崎町に置いたのは、第一に大崎町付近の地価が安かったこと、第二に姉妹会社ともいうべき日本酸素の大崎工場が旧平塚村桐ケ谷付近にあったことによる。第一次大戦中の好況のなか、大正5年11月20日に資本金35万円で合資会社から株式会社に改組し、大正6年7月17日には大崎町へ本社を移して工場と一体化した。大正5年なかばには、まだ「ボールベアリング」という名も知られていなかった当時に、苦心して自動調心形軸受を横須賀海軍工廠へ納めている。大正9年1月8日から2月中旬までの34日間、解雇者への一時金支給をめぐる争議が起きた。",
        "year": 1917,
        "yearEnd": null,
        "yearText": "大正6年（1917年）7月17日",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1913-meidensha-osaki"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「山武商会と軸受工業の日本精工」303〜307頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1918-nikon-oi",
        "name": "日本光学工業が大井町に本店と第一工場を置く",
        "summary": "大正7年1月、大井町に新工場が完成し、本店も大井町へ移された。測距儀など大型の光学機械の製作が始まる。",
        "description": "区史によれば、大正6年7月25日に資本金200万円の日本光学工業株式会社が創立された。陸海軍からの注文に応えるため、同年8月23日には府下荏原郡大井町に新工場を建てることとし、同町の安田浅次郎・金木嘉助の両名から所有地4,695坪を1坪14円50銭で、9月25日には酒井峯から499坪を1坪16円で買収して、木造鋸形平屋の工場の建設に着手した。翌大正7年1月に新工場が完成し、本店を大井町に移すとともに、東京計器内にあった設備一切をこの大井第一工場へ移して、測距儀など大型光学機械の製作を始めた。大正7年5月1日には東京光学工業株式会社を合併し、資本金を300万円としている。大正15年2月18日から3月4日にかけて、大井工場では職工343名のうち160名ほどが、タイムキーパー設置反対と賃下げ復活反対を掲げてサボタージュに入った。",
        "year": 1918,
        "yearEnd": null,
        "yearText": "大正7年（1918年）1月",
        "era": "taisho",
        "areas": ["oi"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1912-tokyo-denki-oi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「日本光学の創立」321〜327頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1920-ebara-osaki",
        "name": "荏原製作所が株式会社となり、大崎に新工場を構える",
        "summary": "大正9年5月、ゐのくち式機械事務所が資本金300万円の株式会社荏原製作所に改組し、大崎に新工場を設けた。",
        "description": "区史によれば、東京帝国大学教授で水力学の井口在屋を主幹、その弟子の畠山一清を所長として、大正元年11月4日に京橋区の工業雑誌社の2階に「ゐのくち式機械事務所」が設けられた。井口が明治37年に理論的に完成させた渦巻ポンプを事業化するためで、大正4年には台湾台中市の水道用に口径200ミリの縦軸ポンプを、翌年には小樽港築港用の600馬力ポンプなどを納めている。第一次大戦後の反動恐慌の直後にあたる大正9年5月、資本金300万円の株式会社荏原製作所に改組し、大崎に新工場を構えた。大正13年には第2工場の建設にも着手している。大正11年の大干魃を機に応急灌漑用の小型低揚程ポンプへ進出し、関東大震災後に大建築が増えると、ターボ式送風機の製造にも乗り出した。",
        "year": 1920,
        "yearEnd": null,
        "yearText": "大正9年（1920年）5月",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1913-meidensha-osaki",
          "ev-1917-nsk-osaki"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「ゐのくち式ポンプと荏原製作所」318〜321頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1924-shirorenga-to-sankyo",
        "name": "品川白煉瓦が本社工場の敷地を三共に売却する",
        "summary": "大正13年、産業合理化のなかで敷地6,270坪と建物35棟が時価56万円で三共株式会社に売られた。",
        "description": "区史によれば、大正末期の不況と産業合理化の進展のなかで、品川白煉瓦株式会社は生産費削減のため本社工場の一部を地方工場へ移すこととし、大正13年に敷地6,270坪・建物35棟などを時価56万円で三共株式会社に売却した。翌大正14年の前半期には御殿山の耕地400余坪も鉄道省用地として買収に応じ、大正15年前半期には本店を品川町北品川宿301番地から麹町区永楽町へ移している。工場整理に伴って品川工場では争議が相次ぎ、大正15年10月18日から11月13日までの27日間は57名中51名が待遇改善を求め、昭和2年10月には職工49名全員が転勤反対を理由に41日にわたる争議を続けた。",
        "year": 1924,
        "yearEnd": null,
        "yearText": "大正13年（1924年）",
        "era": "taisho",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1900-shirorenga-goshi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「大正期の品川白煉瓦と品川工場の移転」327〜330頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1929-shirorenga-leaves",
        "name": "品川白煉瓦の品川工場が川崎へ移される",
        "summary": "昭和4年前半期、残っていた品川工場が川崎市へ新設移転し、御殿山下の白煉瓦工場は品川から姿を消した。",
        "description": "区史は、大正末期以降の産業合理化の進展にともなう「転勤反対」を理由に品川工場で長期の争議が続いたのち、昭和4年前半期に「旧品川残工場ハ之ヲ川崎市ニ新設移転」という事態に立ち至ったと、同社の第53回報告を引いて記す。明治20年に御殿山下へ移ってきた白煉瓦工場は、42年ののちに品川を離れたことになる。",
        "year": 1929,
        "yearEnd": null,
        "yearText": "昭和4年（1929年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "categories": [
          "industry",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1887-shinagawa-shirorenga",
          "ev-1924-shirorenga-to-sankyo"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「大正期の品川白煉瓦と品川工場の移転」327〜330頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1908-sankyo-shinagawa",
        "name": "三共が品川硝子会社の跡を買い、品川工場とする",
        "summary": "売工場となっていた品川硝子会社の跡を三共が買収し、品川工場とした。のちに結核薬やオリザニンを製造する主力工場となる。",
        "description": "区史によれば、塩原又策は明治32年に高峰譲吉が発見したタカヂアスターゼを輸入発売したのを発端として薬業に専念し、明治40年に資本金50万円の三共薬品合資会社へ改組、のちに三共合資会社とした。そして、売工場となっていた品川硝子会社の跡を買収して品川工場としている。区史は、品川硝子が官営だった時代の主管である工部省工作局長の大鳥圭介が塩原の妻千代の祖父にあたること、そしてこの品川工場の煉瓦造りの煙突を、大鳥が校長を兼ねていた工部大学校の在学生だった高峰譲吉らがアルバイトとして築いたという由来を書きとめている。品川工場では東京帝国大学薬学科の下山順一郎の援助もあって結核薬「ファゴール」や皮膚薬「チオール」の製造を始め、明治44年には鈴木梅太郎が発見した脚気の薬「オリザニン」の製造販売に進んで、次第に三共の主力工場となった。大正5年3月6日には東京製薬株式会社を合併し、局方製剤の部門を品川工場へ移している。",
        "year": 1908,
        "yearEnd": null,
        "yearText": "明治41年（1908年）1月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["industry"],
        "certainty": "fact",
        "variants": [
          {
            "claim": "区史の同じ節は「明治四十二年八月には…三共合資会社とした。そして翌明治四十一年一月、前述した品川硝子会社の跡で売工場となっていたものを買収し、品川工場とした」と記すが、明治42年の翌年は明治43年であり、前後が合わない。ここでは買収の年を本文どおり明治41年として扱い、「翌」という続き方のほうを食い違いとして記録する。",
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「三共合資会社品川工場の創設」255〜257頁"
          }
        ],
        "relatedEvents": [
          "ev-1892-glass-dissolved",
          "ev-1879-kagaku-jikkenjo"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（二）明治後期の品川「三共合資会社品川工場の創設」255〜257頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1915-morinaga-osaki",
        "name": "森永が御殿山下に大崎工場を設ける",
        "summary": "大正4年6月29日、北品川宿小関の旧東京醤油会社の土地2,226坪と建物908坪を買収し、大崎工場の建設に着手した。",
        "description": "区史によれば、森永は大正4年6月29日に品川町大字北品川宿小関の土地2,226坪と建物908坪、つまり御殿山下の閉鎖された東京醤油会社の工場とその用地を買収して、大崎工場の建設に着手した。大正8年7月23日にはさらに558坪を買い足している。翌大正5年2月に田町工場が全焼したため、この第二工場が主力工場となって増産にあたることとなり、ミルクキャラメルの生産に大きな役割を果たした。従業員数は大正5年で約200名、大正7年の『東京府荏原郡勢一覧』では438名、大正13年には約300名で、包装作業にあたる女性が8、9割を占め、全体の1割が男性だったという。大阪工場の設立とも関わって、大正15年5月20日に大崎工場は閉鎖された。",
        "year": 1915,
        "yearEnd": 1926,
        "yearText": "大正4年（1915年）6月29日",
        "era": "taisho",
        "areas": ["shinagawa"],
        "categories": [
          "industry",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「森永工場の進出」341〜344頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1915-oi-kojo",
        "name": "国鉄の大井工場が発足する",
        "summary": "大正4年7月、新橋工場が廃止され、大井派出所が大井工場と改称された。区内の労働運動にも大きな役割を果たす。",
        "description": "区史によれば、大井工場の先駆けは新橋作業場で、明治8年ごろからは車両の修繕のほかに新橋・横浜間の木橋を鉄橋に取り替える鈑桁の組立も行うようになっていた。大正4年7月、木挽職場を汐留派出所として残したうえで新橋工場は廃止され、大井派出所が大井工場と改称された。区史は、品川・大井の両町と密接な関係をもち、区域内の労働争議にも歴史的な役割を果たす工場として大井工場を位置づけている。関東大震災の復旧作業は、大正14年3月12日の東海道線根府川・真鶴間の開通をもって終わった。",
        "year": 1915,
        "yearEnd": null,
        "yearText": "大正4年（1915年）7月",
        "era": "taisho",
        "areas": ["oi"],
        "categories": [
          "transport",
          "industry"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1872-shinagawa-yokohama-rail"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 3 鉄道の発展と陸上輸送の変化「大井工場の発足」353〜356頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1917-fujikura-taniyama",
        "name": "藤倉の防水布工場が大崎町谷山に新築移転する",
        "summary": "第一次大戦で軍需が急増し工場が手狭になったため、大正6年6月に大崎町大字谷山5番地の新工場へ移った。",
        "description": "区史によれば、第一次大戦の勃発にともなって軍需が急速に増え、上大崎の工場用地が手狭になったため、大正4年11月に同じ大崎町の大字谷山5番地に土地を求め、大正5年3月から新築に着手して、大正6年6月に竣工・移転した。",
        "year": 1917,
        "yearEnd": null,
        "yearText": "大正6年（1917年）6月",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1910-fujikura-bosuifu"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 2 近代工業の展開「藤倉工業の設立と明治護謨製造所」337〜341頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1925-keihin-takanawa",
        "name": "京浜電気鉄道が品川・高輪間を延長し、市電と乗り入れる",
        "summary": "大正14年3月に品川・高輪間の延長線が完成し、京浜電鉄の東京市内乗り入れが実現した。",
        "description": "区史によれば、京浜電気鉄道は大正6年末に品川で東京市電との連絡運輸協定を結び、社線の市電乗り入れが許可されていた。その後、院線品川駅付近で市電と連絡する形をとり、大正14年3月に品川・高輪間の延長線を完成させたことで、東京市内への乗り入れが実現した。",
        "year": 1925,
        "yearEnd": null,
        "yearText": "大正14年（1925年）3月",
        "era": "taisho",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": ["ev-1895-basha-tetsudo"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 3 鉄道の発展と陸上輸送の変化「京浜電気鉄道の展開」356〜358頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1912-kochi-seiri",
        "name": "品川町耕地整理組合が設けられ、水田が工場用地に変わっていく",
        "summary": "明治45年の品川町耕地整理組合を皮切りに区域の水田がほぼすべて整理され、大正7年ごろには短冊型の田園に生まれ変わった。やがて工場と住宅が覆う。",
        "description": "区史によれば、品川町耕地整理組合が明治45年に設立され、大正6年にかけて広町・二日五日市の水田地帯を中心に106.9町歩の工事が行われた。これを皮切りに、大井町では鈴ケ森組合が大正2年から4年にかけて57.5町歩を、品川・大崎町耕地整理組合が目黒川流域の水田を大正2年から7年にかけて46.5町歩を整理し、この地区のほとんどの水田が対象となった。大正7年ごろには水田地域の全域が短冊型に整地されている。1万分の1地形図の品川図幅では、明治44年が整理前、大正5年が整理直後または整理中の状態を示し、昭和4年の図幅になると、その地域が工場と住宅ですっかり占められていることが読み取れると区史は記す。",
        "year": 1912,
        "yearEnd": 1918,
        "yearText": "明治45年（1912年）",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "oi",
          "osaki"
        ],
        "categories": [
          "industry",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1913-meidensha-osaki"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「水田の耕地整理と工業地域化」487〜488頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1928-ikegami-gotanda",
        "name": "池上線が五反田駅に通じ、駅前に繁華街が育つ",
        "summary": "昭和3年に池上線が五反田駅に通じると、駅を中心に繁華街と観楽街が急速に成長した。",
        "description": "区史によれば、大崎町では工場の増加にともなって勤労者向けの小住宅や小売商店が急ピッチで増え、昭和3年に池上線が五反田駅に通じると、駅を中心に繁華街・観楽街が急速に成長した。東京市へ編入される昭和7年の時点で、大崎町はすでに全町にわたって市街地化を終え、人口もほとんど飽和の状態に達していたと区史は述べている。大崎町の工場数は大正10年の121から昭和5年の172へ増えており、とくに桐ケ谷では22から45へ倍増した。",
        "year": 1928,
        "yearEnd": null,
        "yearText": "昭和3年（1928年）",
        "era": "showa-pre",
        "areas": ["osaki"],
        "categories": [
          "transport",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1912-kochi-seiri"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「大崎工場街の形成」500〜503頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1928-mitsubishi-oi",
        "name": "三菱航空機が大井町に東京製作所を置く",
        "summary": "昭和3年5月、三菱内燃機が三菱航空機と改称し、芝浦工場と大井町高森前5600番地の大井工場を合わせて東京製作所とした。",
        "description": "区史によれば、昭和3年5月に三菱内燃機は三菱航空機株式会社と改称し、芝浦工場と大井町高森前5600番地にできた大井工場を合わせて「東京製作所」とした。この大井工場で最初に製造された戦車は「イ号車」と呼ばれ、昭和5年11月に完成した民間第一号であった。",
        "year": 1928,
        "yearEnd": null,
        "yearText": "昭和3年（1928年）5月",
        "era": "showa-pre",
        "areas": ["oi"],
        "categories": [
          "industry",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1918-nikon-oi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「日本光学と三菱航空機株式会社東京製作所の設立」541〜544頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1930-nikon-oi-expand",
        "name": "日本光学が大井に工場を集約する",
        "summary": "昭和5年7月、大井第二工場の東側の土地1,800坪を買収し、芝と大井の機能を合わせた新しい工場を建てることとした。",
        "description": "区史によれば、日本光学は昭和5年7月に大井第二工場の東側にあった伊東胡蝶園所有地1,800坪を買収し、芝・大井両工場の機能を合わせた新しい工場を建てようとした。大井工場内の光学硝子研究所は長岡半太郎と柴田雄次を顧問として出発し、大正10年9月上旬には国勢院の軍需工業研究奨励金の交付を受けて規模を広げていた。なお昭和3年3月28日から4月7日にかけて、衆議院議員選挙をめぐる公休日の取り方と賃金支払いを発端として三田豊岡工場と大井工場で争議が起こり、出勤退場時間の短縮や退職手当の増額など10項目を掲げて、大井工場では165名が41日間にわたるストライキに加わった。",
        "year": 1930,
        "yearEnd": null,
        "yearText": "昭和5年（1930年）7月",
        "era": "showa-pre",
        "areas": ["oi"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1918-nikon-oi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「日本光学と三菱航空機株式会社東京製作所の設立」541〜544頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1884-shinagawa-sen",
        "name": "品川・赤羽間の品川線が着工される",
        "summary": "明治17年1月、日本鉄道会社が品川と赤羽を結ぶ品川線の工事に着手した。のちの山手線にあたる。",
        "description": "区史によれば、明治15年12月に工部省鉄道局長の井上勝が、新橋・横浜間の官設鉄道と日本鉄道をつなぐ線として、品川を起点に東京市街の西端をまわり目黒・新宿・板橋などを経る路線を上申した。日本鉄道会社は明治16年2月に株式募集の都合から工事の延期を申し出たが、同年7月30日に品川線の建設着工を決定し、8月2日に出願、8月6日付で許可され、8月24日に太政官から布達された。工事は明治17年1月に着手されたが、武蔵野台地を各所で横断するため、切取りと築堤の工事量が大きかった。これに先立ち明治9年12月1日には新橋・品川間の複線化が完成し、明治13年11月14日には品川・大森間の複線化も終わっている。",
        "year": 1884,
        "yearEnd": null,
        "yearText": "明治17年（1884年）1月",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": ["ev-1872-shinagawa-yokohama-rail"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "五 近代編（一）明治前期の品川「日本鉄道会社と品川線の建設」103〜107頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1909-yamanote-denka",
        "name": "山手線が電化され、品川から電車が走り始める",
        "summary": "明治42年12月16日、山手線・豊島線が電化され、烏森・品川・渋谷・新宿・池袋・田端・上野の間で電車の運転が始まった。",
        "description": "区史によれば、明治39年10月の鉄道国有化に続いて、明治42年12月16日から山手線・豊島線が電化され、烏森（現在の新橋）・品川・渋谷・新宿・池袋・田端・上野の間で電車の運転が始まった。山手線は大正3年12月27日に旅客列車を廃止して電車と貨物列車用となり、翌大正4年2月には品川・大崎間に電車専用線が設けられた。大正7年12月20日には大崎・恵比寿間にも電車専用線が開通し、あわせて品川・大崎間が4線となった。",
        "year": 1909,
        "yearEnd": null,
        "yearText": "明治42年（1909年）12月16日",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": ["ev-1884-shinagawa-sen"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編 3 鉄道の発展と陸上輸送の変化「東京周辺における院線電車の運転」347〜349頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1919-sonoike-sogi",
        "name": "大崎町の園池製作所で争議が起こる",
        "summary": "大正8年から10年にかけて、大崎町の株式会社園池製作所で世間の注目を集める争議が続いた。",
        "description": "区史によれば、大正8年から大正10年にかけて、大崎町の株式会社園池製作所で世間の注目を集める争議が起こった。当初60名前後だった労働組合の大崎支部会員は、要求の獲得を境に6月36名、7月69名と急増し、やがて園池製作所については全職工が加盟する状態になった。支部は渋谷・大崎・麻布・三田方面まで出かけて「労働問題早わかり」「工場法釈議」などのパンフレットを売り、資金集めと組織拡張の宣伝を行ったという。",
        "year": 1919,
        "yearEnd": 1921,
        "yearText": "大正8年（1919年）",
        "era": "taisho",
        "areas": ["osaki"],
        "categories": [
          "industry",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1913-meidensha-osaki"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "六 大正編「大正期の園池製作所争議」404〜407頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1934-nippon-sanso-closed",
        "name": "日本酸素の大崎工場が廃止される",
        "summary": "昭和9年8月11日限りで大崎工場が廃止され、機械器具は亀戸・蒲田・広島の各工場へ移された。",
        "description": "区史によれば、大崎工場の設備が古くなって能率が落ちていたため、保土ケ谷曹達の製造する液体酸素を購入して蒸発器で気化充填する方式に切り替えることとし、昭和7年11月2日にその設備を完成させた。しかし見込みどおりの生産単価の低下を実現できず、経営合理化のために昭和9年8月11日限りで大崎工場を廃止し、機械器具類は東京市内の亀戸・蒲田、さらに広島の各工場へ移している。",
        "year": 1934,
        "yearEnd": null,
        "yearText": "昭和9年（1934年）8月11日",
        "era": "showa-pre",
        "areas": ["osaki"],
        "categories": [
          "industry",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1917-nsk-osaki"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「日本精工・園池製作所・荏原製作所の動向」540〜541頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1934-sankyo-rc",
        "name": "三共品川工場に鉄筋コンクリートの工場が建つ",
        "summary": "昭和4年から7年にかけて鉄筋コンクリート3階建の工場4棟が着工され、昭和9年に完成した。",
        "description": "区史によれば、三共の品川工場は関東大震災でほとんど火災をまぬがれ、翌大正13年9月には倍額増資を行った。高峰譲吉が没したのちも品川工場に細菌部門を新設し、昭和4年から7年にかけて鉄筋コンクリート3階建の工場4棟を新築して、昭和9年に完成させている。",
        "year": 1934,
        "yearEnd": null,
        "yearText": "昭和9年（1934年）",
        "era": "showa-pre",
        "areas": ["shinagawa"],
        "categories": [
          "industry",
          "building"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1908-sankyo-shinagawa"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "七 昭和編「昭和期における化学工業」544〜545頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1946-oi-kojo-postwar",
        "name": "戦後の大井工場が、車両の荒廃のなかで修理に追われる",
        "summary": "戦災で国電の多くが傷み、大井工場は昭和21年6月から24年4月まで修理作業の一部を府中刑務所の受刑者に委託した。",
        "description": "区史によれば、戦前に1,564両あった国電のうち311両が戦災で不良車となり、昭和21年4月の時点で稼働できるのは978両にとどまった。残る車両も進駐軍に徴発され、白いペンキの帯に ALLIED FORCE SECTION と書かれた専用車が、すし詰めの故障だらけの車両に連結されていたという。急場をしのぐため、大井工場では昭和21年6月から昭和24年4月までのあいだ、修理作業の一部を府中刑務所の受刑者に委託したこともあった。",
        "year": 1946,
        "yearEnd": 1949,
        "yearText": "昭和21年（1946年）6月",
        "era": "showa-post",
        "areas": ["oi"],
        "categories": [
          "transport",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1915-oi-kojo"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "八 現代編「国鉄大井工場の苦闘」870〜872頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1971-xmas-bulb-decline",
        "name": "クリスマス電球の工場が激減する",
        "summary": "昭和43年ごろから採算が合わず倒産や転廃業が相次ぎ、昭和46年には組合加盟の工場が品川区で40工場まで減った。",
        "description": "区史によれば、大正中期に東京電気大井工場と関わって区内に始まったクリスマス用電球の製造は、昭和43年ごろから小工場で採算がとれなくなり、倒産や転廃業をする業者が相次いだ。組合に加盟する工場は昭和46年には全国で67工場、品川区では40工場にまで減っている。",
        "year": 1971,
        "yearEnd": null,
        "yearText": "昭和46年（1971年）",
        "era": "showa-post",
        "areas": ["ward"],
        "categories": ["industry"],
        "certainty": "fact",
        "relatedEvents": ["ev-1912-tokyo-denki-oi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "八 現代編「苦況に立つクリスマス電球工業」931〜933頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1970-soon-higaisha-no-kai",
        "name": "旗の台で「騒音被害者の会」が結成される",
        "summary": "昭和45年6月、区内旗の台の住民が、中小の町工場の騒音に悩む人たちを集めて「騒音被害者の会」を結成した。",
        "description": "区史によれば、昭和45年6月、区内旗の台三丁目の住民が、中小の町工場の騒音に悩み苦しむ人たちが弱い個人の力を結集して市民運動を盛り上げ、行政機関に騒音規制の強化を働きかけることを目的として「騒音被害者の会」を結成した。向かいの工場から工場移転の約束を取りつけた経緯は、昭和45年8月28日の読売新聞でも報じられている。工場と住宅が混じり合って建つ荏原地区のありようが、公害として表面化した例にあたる。",
        "year": 1970,
        "yearEnd": null,
        "yearText": "昭和45年（1970年）6月",
        "era": "showa-post",
        "areas": ["ebara"],
        "categories": [
          "industry",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "八 現代編「工場騒音」1018〜1021頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1963-hatanodai-koka",
        "name": "旗の台駅付近が高架になり、踏切が除かれる",
        "summary": "昭和38年から翌年にかけて旗の台駅付近800メートルが高架となり、踏切4か所が除却された。",
        "description": "区史によれば、昭和29年から32年にかけて東京急行電鉄の中延駅付近で第二京浜国道との立体交差工事が行われ、続いて昭和38年から翌39年にかけて旗の台駅付近の800メートルが高架となって踏切4か所が除却された。昭和49年2月の時点では、京浜急行電鉄本線の北品川・青物横丁間で高架工事が進められており、線路すれすれに人家が密集し、およそ100メートルに1か所の踏切がある危険な区間の解消が見込まれていた。",
        "year": 1963,
        "yearEnd": 1964,
        "yearText": "昭和38年（1963年）",
        "era": "showa-post",
        "areas": ["ebara"],
        "categories": ["transport"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-ge",
            "locator": "八 現代編「進展する鉄道の高架工事」977〜978頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-jomon-irukibashi",
        "name": "居木橋に貝塚を伴う縄文前期の集落が営まれる",
        "summary": "大崎から西品川にかけて、4か所の小貝塚とそれに結びつく集落からなる遺跡が残る。縄文時代前期の後半にあたる。",
        "description": "区史によれば、居木橋貝塚は大崎2丁目6番地を中心に7番地へ及び、さらに3丁目14番地、西品川3丁目5〜6番地の範囲に存在していた。A・B・C・Dの4か所の小貝塚と、それに結びついていたとみられる集落から成る。貝塚を作る貝はハイガイ・サルボウ・シオフキが多く、ハマグリやアサリなど計19種が見られた。A貝塚からはシカ、B貝塚からはタイも出ている。土器は諸磯A式・B式を主とし、下層からは早期の田戸下層式などの破片も見つかっており、遺跡の時期はおおむね前期の後半に位置づけられる。食料は貝類を主体とし、狩猟と漁撈も行われていたが、規模は大きくなかったと区史は述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代前期の後半",
        "era": "genshi",
        "areas": ["osaki"],
        "categories": ["site"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「居木橋貝塚」128〜135頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1904-irukibashi-shokai",
        "name": "居木橋貝塚が学界に紹介される",
        "summary": "明治37年、江見忠功が『東京人類学会雑誌』の「石器時代遺物発見地名表」で居木橋貝塚を紹介した。",
        "description": "区史によれば、居木橋貝塚は明治37年に江見忠功によって「石器時代遺物発見地名表」（『東京人類学会雑誌』19-218）で紹介された。その後も部分的な発掘が試みられたことがあり、昭和13年12月刊の『貝塚』三にも記事がある。明治年間から学界に知られていたため多くの研究者が訪れ、表面採集による調査がかなり行われたが、その報告はほとんど発表されなかったと区史は記す。",
        "year": 1904,
        "yearEnd": null,
        "yearText": "明治37年（1904年）",
        "era": "meiji",
        "areas": ["osaki"],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-jomon-irukibashi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「居木橋貝塚」128〜135頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1953-irukibashi-hakkutsu",
        "name": "居木橋貝塚が発掘され、竪穴住居跡が見つかる",
        "summary": "昭和28年、立正大学考古学研究室の指導で立正高校考古学研究会が発掘し、大崎2丁目6番地で竪穴住居跡1軒が見つかった。",
        "description": "区史によれば、昭和28年に立正大学考古学研究室の指導のもと立正高校考古学研究会が居木橋貝塚を発掘し、大崎2丁目6番地で竪穴住居跡が1軒見つかった。住居跡は半円半方形で東西5メートル、南北5.5メートル、ローム層を約30センチ掘りくぼめて床面とし、中央の北寄りに素掘りの炉があった。竪穴を覆う貝層からは前期後半の諸磯A式・B式土器が見られ、そこから竪穴の時期が前期の後半と判断されている。このときあわせて行われた分布調査によって、貝塚の分布状態がはじめて把握された。当時すでに付近は家屋が密集しており、調査できたのは民家の庭の一部にとどまったという。",
        "year": 1953,
        "yearEnd": null,
        "yearText": "昭和28年（1953年）",
        "era": "showa-post",
        "areas": ["osaki"],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-jomon-irukibashi",
          "ev-1904-irukibashi-shokai"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「居木橋貝塚」128〜135頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-jomon-kaigansen",
        "name": "縄文前期、東京湾の海水が目黒川の谷に入りこんでいた",
        "summary": "上大崎から北品川にかけて点在する前期の貝塚の位置から、当時の海岸線が目黒川の谷まで達していたことが分かる。",
        "description": "区史によれば、居木橋貝塚と時を同じくして、目黒川の谷を隔てた対岸にも集落が営まれていた。上大崎から東五反田、北品川にかけてかなりの遺跡が点在し、貝塚を伴うものが上大崎3丁目と北品川5丁目にそれぞれ1か所あった。ほかに上大崎3丁目一帯、東五反田3丁目の宝塔寺付近、清泉女子大学の敷地内、北品川5丁目付近にも遺跡があり、その多くは前期に属する小規模なものだった。こうした前期の貝塚の存在から、当時は東京湾の海水が目黒川の谷に入りこんでいたことが明らかであり、後期になって海岸線が後退していったことが知られる、と区史は述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代前期",
        "era": "genshi",
        "areas": [
          "osaki",
          "shinagawa"
        ],
        "categories": [
          "site",
          "nature"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-jomon-irukibashi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「上大崎と御殿山の貝塚」135〜136頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1877-omori-kaizuka",
        "name": "モースが大森貝塚を発掘する",
        "summary": "明治10年、エドワード・シルヴェスター・モースが大森貝塚を発掘した。日本考古学の発祥の地とされる。",
        "description": "区史は、大森貝塚が明治10年にエドワード・シルヴェスター・モースによって発掘され、日本考古学の発祥の地となったと記す。発掘の報告書は明治12年に東京大学理学部紀要第1巻として『SHELL MOUNDS OF OMORI』が刊行され、同じ年に矢田部良吉の訳で『大森介墟古物編』（理科会粋 第一帙上冊）として訳出された。",
        "year": 1877,
        "yearEnd": null,
        "yearText": "明治10年（1877年）",
        "era": "meiji",
        "areas": ["oi"],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": ["pe-morse"],
        "relatedPlaces": ["pl-be2e1fa0fd"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「大森貝塚」138〜145頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1929-omori-hi",
        "name": "大森貝塚の記念碑が建てられる",
        "summary": "昭和4年11月4日と昭和5年4月13日に、それぞれ別の場所で記念碑の除幕式が行われた。",
        "description": "区史によれば、大森貝塚の記念碑は2基ある。1基は昭和4年11月4日に除幕式が行われたもので、殿村平右衛門氏の庭前にあたる。東京日日新聞（現在の毎日新聞）社長の本山彦一が発起人となり、岩川友太郎・石川千代松・大山柏・小金井良精・佐々木忠次郎・富岡恒次郎・杉山寿栄男らの学者が賛成人として碑面に名を連ねている。もう1基は昭和5年4月13日に除幕式が行われ、臼井米二郎氏邸の一隅にある。",
        "year": 1929,
        "yearEnd": 1930,
        "yearText": "昭和4年（1929年）11月4日",
        "era": "showa-pre",
        "areas": ["oi"],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1877-omori-kaizuka"],
        "relatedPeople": ["pe-morse"],
        "relatedPlaces": ["pl-be2e1fa0fd"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「大森貝塚」138〜145頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-jomon-tachiaigawa-kaizuka",
        "name": "立会川の谷の両岸に5つの貝塚が営まれる",
        "summary": "権現台・仙台坂・立会川・西光寺・大森の5つの貝塚が、標高10メートル以下の海に面した場所に並ぶ。縄文時代後期のもの。",
        "description": "区史によれば、権現台・仙台坂・立会川・西光寺・大森の5つの貝塚は、いずれも標高10メートル以下、おおむね8〜6メートルの地点にある。立会川の谷をはさんで北（左）岸に権現台・仙台坂・立会川の3貝塚が、南（右）岸に西光寺貝塚があり、それと少し離れて大森貝塚が位置する。いずれも塩水の貝を主とする貝塚で、東京湾に直面して作られたことが明らかであり、貝の生息条件からは、遠浅の砂浜にところどころ岩礁が散在する海辺が想定される。後期の前半から晩期の初めにかけてこうした自然条件だったと考えられ、晩期に入ると海岸線はさらに後退した。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代後期",
        "era": "genshi",
        "areas": ["oi"],
        "categories": [
          "site",
          "nature"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-jomon-kaigansen",
          "ev-jomon-gongendai"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「立会川貝塚」147〜148頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-jomon-saikoji",
        "name": "西光寺の境内に、この地で最も早い時期の貝塚が残る",
        "summary": "大井4丁目22番地の西光寺境内にある小貝塚で、後期初頭の称名寺式土器を出す。大森貝塚に先行する。",
        "description": "区史によれば、西光寺貝塚は大森貝塚の北方およそ800メートル、大井4丁目22番地の西光寺境内にある小貝塚である。後期初頭の称名寺式と呼ばれる土器の小破片を出したことがあり、貝類にはハマグリ・シオフキ・アサリ・カキなどが見られた。大森貝塚に先行する時期のもので、この地における人々の生活のはじまりを示すものだと区史は述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代後期の初頭",
        "era": "genshi",
        "areas": ["oi"],
        "categories": [
          "site",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-jomon-tachiaigawa-kaizuka"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-6840966074"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「西光寺貝塚」145頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1949-sendaizaka-hakkutsu",
        "name": "仙台坂貝塚が発掘される",
        "summary": "昭和24年、学習院史学部考古学班が東大井4丁目2番地の仙台坂貝塚を発掘した。",
        "description": "区史によれば、東大井4丁目2番地にある仙台坂貝塚は縄文時代後期に作られたもので、昭和24年に学習院史学部考古学班によって発掘された。貝塚は全面的に攪乱を受けていたが、部分的に手つかずの箇所が見つかっている。貝類はアサリ・サルボウ・アカガイ・シオフキ・ホタテガイなどが見られ、魚類にタイとスズキがあった。土器の量は多くなかったが後期中葉の加曽利B式が見出され、ほかに土錘と石棒が出土している。",
        "year": 1949,
        "yearEnd": null,
        "yearText": "昭和24年（1949年）",
        "era": "showa-post",
        "areas": ["oi"],
        "categories": [
          "site",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-jomon-tachiaigawa-kaizuka"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「仙台坂貝塚」145〜147頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-gongendai-lost",
        "name": "権現台貝塚が切り崩され、国鉄大井工場となる",
        "summary": "広町2丁目にあった権現台貝塚は丘陵ごと切り崩され、跡地は国鉄大井工場になった。出土品も散逸している。",
        "description": "区史によれば、広町2丁目の権現台貝塚は西光寺貝塚が作られた前後から大森貝塚と同じ時期にかけて集落が発展した遺跡だが、早くに失われて状態は明らかでない。明治30年代の後半に江見水蔭らが発掘を行っている（『地中の秘密』）。貝類はサザエ・ツメタガイ・アカニシなど、獣類にイノシシ・シカ・イヌ・ネコが出土したとされ、土器は後期の加曽利B式・安行Ⅰ式・Ⅱ式が多く、土偶・土製獣・土版や石斧、骨製品も知られている。区史は、これらの資料が散逸して見ることができないのを遺憾としている。貝塚は、それをのせる洪積丘陵とともに切り崩され、国鉄大井工場となった地点にあった。",
        "year": null,
        "yearEnd": null,
        "yearText": "明治30年代の後半に発掘、のち消滅",
        "era": "meiji",
        "areas": ["oi"],
        "categories": [
          "site",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-jomon-gongendai",
          "ev-1915-oi-kojo"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「権現（ごんげん）台貝塚」145頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-yayoi-shinagawa",
        "name": "弥生時代の遺物は、品川区では2例しか見つかっていない",
        "summary": "居木橋貝塚の近くから土器片が1点、東五反田5丁目の旧池田侯爵邸内から土器が1点。区内の弥生の痕跡はこれだけである。",
        "description": "区史によれば、南関東に弥生文化が広がる時期になってようやく品川区にも弥生の遺跡が姿を見せるが、その数はきわめて少ない。大崎2丁目5番地の居木橋貝塚の近くからこの時代の土器片が1点出土したほかは、東五反田5丁目の旧池田侯爵邸内から出た土器1点が知られるのみである。区史は、遺跡が少ない理由として、立地条件が弥生の暮らしに適していなかったことに加えて、遺跡のある場所が後世に開墾され、さらに人家が密集してしまったことも考えなければならないと述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "弥生時代",
        "era": "genshi",
        "areas": [
          "osaki",
          "shinagawa"
        ],
        "categories": ["site"],
        "certainty": "fact",
        "relatedEvents": ["ev-jomon-irukibashi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（一）原始時代の品川「南関東の弥生文化」154〜157頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kodai-ebara-gun",
        "name": "品川は武蔵国荏原郡に属し、荏原郷・駅家郷・御田郷にまたがる",
        "summary": "『延喜式』『和名類聚抄』によれば荏原郡は9郷から成り、現在の品川区は荏原郷を中心に駅家郷を含み、御田郷の一部に及んでいた。",
        "description": "区史によれば、武蔵国は『延喜式』で大国とされ21郡を管掌したが、高麗郡は霊亀2年、新羅（新座）郡は天平宝字2年に後から置かれたもので、設置の初めの段階では19郡だったと考えられている。品川はそのうち荏原郡にあり、武蔵国の東南を占めていた。荏原郡は『延喜式』と『和名類聚抄』から、蒲田・田本・満田・荏原・覚志・御田・木田・桜田・駅家の9郷から成っていたことが分かる。ただし9世紀前半のものとされる『和名類聚抄』の高山寺本には駅家郷の記載が見られない。区史は、現在の品川区は荏原郷を中心とし、駅家郷（大井駅）を含み、御田郷の一部に及んでいたと思われる、と述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "奈良時代〜平安時代",
        "era": "kodai",
        "areas": ["ward"],
        "categories": [
          "admin",
          "placename"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（三）律令制の成立と品川「武蔵国と品川」168〜169頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kodai-oi-umaya",
        "name": "大井に駅家が置かれる",
        "summary": "『延喜式』兵部省の「諸国駅伝馬」に見える大井の駅家が、荏原郡の駅家郷にあたると考えられている。",
        "description": "区史によれば、荏原郡9郷のうちの駅家郷は、『延喜式』兵部省の「諸国駅伝馬」に見える大井の駅家の所在地と考えられている。駅家郷に比定しうる地で洪積丘陵の脚部付近に立地する遺跡は、大森貝塚から西光寺貝塚にかけての丘陵脚部、および立会川を隔てた仙台坂貝塚から南品川の横穴墓が存在する範囲にかけて見られ、沖積微高地に営まれた遺跡とは性格が異なり、安定した場所を選んだ集落とみてよいと区史は述べている。沖積微高地の一帯は昭和の初めごろまで出水のたびに冠水・浸水することがあり、そうした湿地に囲まれた地に駅が置かれたと考えるのは無理があるという。",
        "year": null,
        "yearEnd": null,
        "yearText": "奈良時代〜平安時代",
        "era": "kodai",
        "areas": ["oi"],
        "categories": [
          "admin",
          "road"
        ],
        "certainty": "estimate",
        "relatedEvents": ["ev-kodai-ebara-gun"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（三）律令制の成立と品川「荏原郡の郷と遺跡」170〜175頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kodai-yokoana",
        "name": "南品川に横穴墓が営まれる",
        "summary": "南品川5丁目261番地の洪積層に作られた横穴墓。副葬品を欠くが、形状から奈良〜平安時代の築造と見られる。",
        "description": "区史によれば、洪積層に作られた南品川（5丁目261番地）の横穴墓は、副葬品など時代をはっきり示す資料を欠くものの、その形状から奈良時代から平安時代にかけての築造と考えられる。この一帯には土師器を伴う小規模な遺跡が散在しており、大森貝塚の隣接地、西光寺貝塚や仙台坂貝塚の付近などに認められ、いずれも洪積丘陵の脚部、沖積地との接点近くに立地している。区史は、こうした遺跡が一部の研究者を除いて調査されてこなかったため分布と性格が明らかでないとしたうえで、散在しているという事実そのものがきわめて重要だと述べている。",
        "year": null,
        "yearEnd": null,
        "yearText": "奈良時代〜平安時代",
        "era": "kodai",
        "areas": ["shinagawa"],
        "categories": ["site"],
        "certainty": "estimate",
        "relatedEvents": ["ev-kodai-oi-umaya"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（三）律令制の成立と品川「荏原郡の郷と遺跡」170〜175頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kofun-shinagawa-unclear",
        "name": "古墳時代の品川は、確かな資料がほとんど無い",
        "summary": "区内に確実な古墳や集落跡の資料は認められていない。東大井の丘陵に古墳群があったとされるが明確ではない。",
        "description": "区史は、大化前代から改新のころにかけての品川区の状態は明らかではなく、古墳および集落跡に関する確実な資料は認められていない、と述べる。不確かな知見としては、東大井3丁目から4丁目にかけての洪積丘陵上に若干の古墳群が存在していたといわれるが明確ではなく、大井4丁目の西光寺墓地から須恵器が1片採集されたことがあるものの、その出土遺跡の性格は不明である。ただし当時の品川区が無人の荒野だったわけではなく、北の港区芝の丸山古墳群、西の大田区田園調布の荏原古墳群はいずれも前方後円墳を中心とする古墳群で、その付近にはかなり大規模な集落が営まれていたと察せられる。それらと関わる小規模な集落の存在は想定できるが、資料が見つかっていないため具体的な様相は示せない、と区史は記している。",
        "year": null,
        "yearEnd": null,
        "yearText": "古墳時代",
        "era": "kodai",
        "areas": ["oi"],
        "categories": ["site"],
        "certainty": "fact",
        "relatedEvents": ["ev-kodai-ebara-gun"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "二 原始・古代編（二）大化前代の品川「品川区の状態」164〜166頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1184-shinagawa-go",
        "name": "源頼朝が品川清実に品川郷の雑公事を免除する",
        "summary": "元暦元年8月の免除で、史料にあらわれる「品川郷」の最も古い例となる。品川が国衙領であったことを示す。",
        "description": "区史によれば、元暦元年8月に源頼朝が品川清実に品川郷の雑公事を免除した（田代文書）。これができたのは、同じ年の6月に頼朝が武蔵国の知行国主となり、平賀義信を武蔵守に任命して、武蔵国の国務を執り行い国衙領を支配する権限を朝廷から与えられていたことが前提にある。つまり品川郷は頼朝の指揮命令に服すべき国衙領だった。区史が示す品川付近の地名の表でも、これが最も古い記載にあたる。",
        "year": 1184,
        "yearEnd": null,
        "yearText": "元暦元年（1184年）8月",
        "era": "chusei",
        "areas": ["shinagawa"],
        "categories": [
          "admin",
          "placename"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "三 中世編（一）鎌倉時代の品川「十二世紀の品川」199〜203頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-chusei-kokugaryo",
        "name": "品川は荘園ではなく国衙領だった",
        "summary": "12世紀から15世紀の史料に荘園の名はまったく現れず、郷・村・保だけが見える。区域の歴史を方向づけた事実である。",
        "description": "区史によれば、12世紀の土地と農民は国衙領か荘園かのどちらかに属したが、品川・大田区域の地名を12世紀から15世紀にわたって並べると、荘園の名はまったく現れず、律令制の郷から生まれた郷や村、国衙領の一種である「保」を構成する郷ばかりである。『新編武蔵風土記稿』は荏原郡西部に萱苅荘という荘園があったと伝えるが、確証はない。むしろ「畠山系図」「秩父系図」が、武蔵国留守所総検校職である秩父重綱の弟で12世紀前半に実在が推定される基家を「河崎冠者」といい「荏原郡を知行」したと書いていることから、基家が荏原郡の郡司職かそれに類する権限をもっていたと考えられ、荏原郡は国衙領だったことになる。なお六郷保は、律令郷制の蒲田郷の内部に生まれた大森・永富・蒲田・六郷本郷・原・堤の各郷の総称だったらしい。",
        "year": null,
        "yearEnd": null,
        "yearText": "12世紀〜15世紀",
        "era": "chusei",
        "areas": ["ward"],
        "categories": ["admin"],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1184-shinagawa-go",
          "ev-kodai-ebara-gun"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "三 中世編（一）鎌倉時代の品川「十二世紀の品川」199〜203頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1223-kiriimura",
        "name": "史料に「南品川郷桐井村」があらわれる",
        "summary": "貞応2年の田代文書に見える。品川が南北に分かれていたことと、桐ケ谷にあたる村の名が確かめられる最も古い例。",
        "description": "区史が示す品川付近の地名の表によれば、貞応2年の田代文書に「南品川郷桐井村」が見える。元暦元年の「品川郷」、元久元年の「荏原郡大社永富両郷」に続く古い記載で、この時期にはすでに品川が南北に分かれて呼ばれていたことが分かる。表にはこのほか、永享8年と享徳2年の「荏原郡南品河郷」（妙国寺文書）、寛正4年の「荏原郡大井郷」（大井鹿島神社の鰐口銘文）、寛正6年の「南品川郷」（妙国寺文書）などが並ぶ。",
        "year": 1223,
        "yearEnd": null,
        "yearText": "貞応2年（1223年）",
        "era": "chusei",
        "areas": ["shinagawa"],
        "categories": ["placename"],
        "certainty": "fact",
        "relatedEvents": ["ev-1184-shinagawa-go"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "三 中世編（一）鎌倉時代の品川「十二世紀の品川」199〜203頁（第10表 品川付近の地名呼称）"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-chusei-oishi-shutsuji",
        "name": "品川周辺を支配した大井氏は、紀姓を本姓とする",
        "summary": "大井という姓は、律令制下の駅家郷＝大井郷の後身である中世の大井郷に由来する。本姓は関東では珍しい紀氏。",
        "description": "区史によれば、12世紀になって品川とその周辺の国衙領を支配した領主が大井氏一族である。大井という姓は、律令制下の駅家郷＝大井郷の後身にあたる中世の大井郷に由来する。本姓は関東地方では珍しい紀姓で、紀氏は武内宿袮を祖と伝える古代の名族であり、平安時代には紀長谷雄、『土佐日記』の紀貫之、古今和歌集の撰者である紀友則などを出した。南北朝時代に編まれた『尊卑分脈』所収の「紀氏系図」によれば、大井氏は紀淑人の兄弟である淑信から出ている。",
        "year": null,
        "yearEnd": null,
        "yearText": "12世紀",
        "era": "chusei",
        "areas": ["oi"],
        "categories": [
          "admin",
          "placename"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "鹿児島県姶良郡加治木町の大井実澄氏が所蔵する「大井系図」は、大井氏を国守〜親直の系とするが、『尊卑分脈』所収の「紀氏系図」は長谷雄〜守澄の系とし、12世紀なかばにほぼ実在が確実な大井実直の親について両者は決定的に異なる。区史は、「大井系図」が鎌倉時代末までで中断したうえ16世紀なかばから書き継がれている体裁から、薩摩大井氏の系譜が不確かになった時期に既存の紀氏系図へ付会して成立したものと見て、「紀氏系図」の方が信頼できるとしている。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "三 中世編（一）鎌倉時代の品川「大井氏の出自」203〜205頁"
          }
        ],
        "relatedEvents": [
          "ev-kodai-oi-umaya",
          "ev-chusei-kokugaryo"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "三 中世編（一）鎌倉時代の品川「大井氏の出自」203〜205頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1694-kitashinagawa-fire",
        "name": "北品川から出火し、東海寺などが類焼する",
        "summary": "元禄7年4月29日、北品川から出た火が東海寺などに燃え移った。",
        "description": "区史の「近世品川周辺災害年表」によれば、元禄7年4月29日に北品川より出火し、東海寺などが類焼した。年表は『東京市史稿 災害篇』を底本とし、『武江年表』ほかの諸本で補ったものである。",
        "year": 1694,
        "yearEnd": null,
        "yearText": "元禄7年（1694年）4月29日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "temple"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "区史の災害年表は、この項を「元禄7（一七九四）4・29」と記すが、元禄7年は1694年であり、1794年は寛政6年にあたる。前後の項が元禄8年（1695年）、元禄13年（1700年）と並んでいることからも、西暦の側の誤記と判断した。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "relatedEvents": ["ev-1638-tokaiji"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-f0dec3262a"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1702-goten-fire",
        "name": "品川御殿が焼け、以後再建されない",
        "summary": "元禄15年2月11日の大火で品川御殿が焼失し、天妙国寺の五重塔・仁王門とともに再建されなかった。",
        "description": "区史の災害年表によれば、元禄15年2月11日、四谷の新宿太宗寺の裏手の百姓家から出た火が強風にあおられ、青山から麻布御殿へ、さらに品川御殿へ燃え移って品川宿で鎮まった。『武江年表』はこのとき麻布御殿・品川御殿・妙国寺の五重塔と仁王門が焼亡し、妙国寺の塔と品川御殿はその後再建されなかったと記す。『当代記』は、品川新町口から鮫洲まで15町が焼け、囲と天王、東海寺の本堂と山門が残り、妙国寺・海晏寺ほかの寺々は残らず焼けたと伝える。",
        "year": 1702,
        "yearEnd": null,
        "yearText": "元禄15年（1702年）2月11日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1702-gojunoto-fire"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-11e5d5f153"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1703-genroku-jishin",
        "name": "元禄地震の津波が品川の海岸を襲う",
        "summary": "元禄16年11月22日の大地震で南関東一帯の死者は15,200人余。品川海岸の被害は甚大で、余震は12月まで続いた。",
        "description": "区史の災害年表によれば、元禄16年11月22日の大地震は府内外の被害が甚大で、南関東一帯の死者は15,200人余に及び、津波が各所を襲って品川海岸の被害も甚大だった。余震は12月まで続いている。『月堂見聞集』には「品川海手より南浦波打上げ、品川より川崎の間地破申候」とあり、海側から波が打ち上げ、品川から川崎の間で地割れが起きたことが伝えられる。なお年表には、その前年の元禄16年2月に、たび重なる類焼に対する救済として品川駅へ3,371両が貸し付けられたことも記されている。",
        "year": 1703,
        "yearEnd": null,
        "yearText": "元禄16年（1703年）11月22日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1707-hoei-funka",
        "name": "富士山が噴火し、品川にも降灰が続く",
        "summary": "宝永4年11月20日の噴火で、府内外では27日まで降灰が続いた。このとき宝永山ができた。",
        "description": "区史の災害年表によれば、宝永4年11月20日に富士山が噴火し、府内外では27日まで降灰が続いた。このとき宝永山ができている。同じ年の8月19日には大風雨があり、高潮によって品川海岸が浸水した。年表には、寛永3年と元禄13年にも富士山の大爆発があって江戸府内に降灰があったと記されている。",
        "year": 1707,
        "yearEnd": null,
        "yearText": "宝永4年（1707年）11月20日",
        "era": "kinsei",
        "areas": ["ward"],
        "categories": [
          "war",
          "nature"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1728-kyoho-kozui",
        "name": "享保の洪水で、東海寺の本堂まで水が上がる",
        "summary": "享保13年9月2日の大洪水で、目黒から品川・鈴ヶ森・品川宿・高輪まで水の高さが五尺ほどに達した。",
        "description": "区史の災害年表によれば、享保13年9月2日の大洪水では、目黒から品川・鈴ヶ森・品川宿・高輪・芝増上寺門前まで水の高さが五尺ほどに達したと『月堂見聞集』が伝える。『江戸満水記』は「品川辺大水にて、東海寺内など入口角野寿軒住宅水、五尺程上れり、本堂へも方丈へも水上り候」と記し、東海寺では入口の住宅で五尺ほど水が上がり、本堂にも方丈にも水が入ったことが分かる。",
        "year": 1728,
        "yearEnd": null,
        "yearText": "享保13年（1728年）9月2日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1638-tokaiji"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-f0dec3262a"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1772-gyoninzaka-fire",
        "name": "目黒行人坂の大火が大崎を通って広がる",
        "summary": "安永元年2月29日、目黒行人坂から出た火が大崎永峯通りを経て府内の大火となり、焼死者が多数出た。",
        "description": "区史の災害年表によれば、安永元年2月29日、西南の大風のなか目黒の行人坂から出火し、大崎永峯通りを経て府内の大火となって焼死者が多数出た。江戸三大火の一つに数えられる火事が、区域を通って広がったことになる。",
        "year": 1772,
        "yearEnd": null,
        "yearText": "安永元年（1772年）2月29日",
        "era": "kinsei",
        "areas": ["osaki"],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1773-ekibyo",
        "name": "疾病が流行し、品川歩行新宿で800人が亡くなる",
        "summary": "安永2年3月からの流行で、5月までに府内の死者は19万人、品川歩行新宿のうちで800人が死亡した。",
        "description": "区史の災害年表によれば、安永2年3月に疾病が流行し、5月までに府内の死者は19万人に達した。そのうち品川歩行新宿で800人が亡くなっている。歩行新宿は享保7年に加宿として認められ、品川三宿の一つとなった町である。",
        "year": 1773,
        "yearEnd": null,
        "yearText": "安永2年（1773年）3月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1722-kachishinshuku"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1783-asama-kouhai",
        "name": "浅間山の噴火で、昼も夜のように暗くなる",
        "summary": "天明3年7月6日からの噴火で、江戸では夕方から鳴動が始まり、翌日は天が暗く夜のようになり、降灰が竹木の枝に雪のように積もった。",
        "description": "区史の災害年表によれば、天明3年7月6日に信州の浅間山が噴火し、江戸では夕六ツ時半ごろから西北の方角が鳴動しはじめ、翌7日はいっそう激しくなった。天は暗くなって夜のようになり、6日の夜からは降灰がおびただしく、竹木の枝に積もった雪のようであったという。なお同じ年の3月23日には南品川宿字馬場町から出火し、海雲寺とその門前が類焼している。",
        "year": 1783,
        "yearEnd": null,
        "yearText": "天明3年（1783年）7月6日",
        "era": "kinsei",
        "areas": ["ward"],
        "categories": [
          "war",
          "nature"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1707-hoei-funka"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1787-uchikowashi",
        "name": "品川で打ちこわしが起こる",
        "summary": "天明7年5月、米穀の不足から各所で打ちこわしが起き、5月23日には品川でも起こって29日まで続いた。",
        "description": "区史の災害年表によれば、天明7年は5月の初めから府内の米穀が不足し、20日から各所で打ちこわしが起きた。5月23日には品川でも打ちこわしがあり、29日まで続いている。前年の天明6年7月には、12日の朝四ツ時ごろから大雨が降り出して16日の夜まで降り続き、目黒川が氾濫して品川は一面の水となり、府内外で橋が数知れず流された。",
        "year": 1787,
        "yearEnd": null,
        "yearText": "天明7年（1787年）5月23日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "war"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1791-tsunami",
        "name": "大津波で品川・大井の人家が多く壊れる",
        "summary": "寛政3年8月6日の大暴風雨にともなう大津波で、江戸・品川・大井・大森・高輪・芝浦・築地のあたりの人家が多く破損した。",
        "description": "区史の災害年表によれば、寛政3年8月6日の大暴風雨にともない、江戸・品川・大井・大森・高輪・芝浦・築地のあたりが大津波に襲われ、人家が多く破損したと『見聞雑録』が伝える。年表には、寛延2年8月13日の大風雨で南品川の貴船明神門前の建家8軒と土蔵5か所が流失したこと、享保20年の大風雨で南品川本宿・猟師町が大きく波欠けし品川・大井あたりの護岸石垣が崩れたことなども記されている。",
        "year": 1791,
        "yearEnd": null,
        "yearText": "寛政3年（1791年）8月6日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1865-tsunami-kuyoto"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（七）災害「近世品川周辺災害年表」1116〜1124頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1853-daiba-start",
        "name": "品川台場の建設が始まる",
        "summary": "嘉永6年8月、ペリーの米艦が去って2か月後に、御台場の具体的な建設事業が始まった。",
        "description": "区史によれば、米艦が去って2か月後の嘉永6年8月に、御台場の具体的な建設事業が始まった。品川沖に砲台を築いて江戸湾の防備を固めようとするもので、区域の海岸の姿を大きく変えることになった。",
        "year": 1853,
        "yearEnd": null,
        "yearText": "嘉永6年（1853年）8月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "building"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1854-daiba",
          "ev-1854-gotenyama"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「品川台場の建設開始」1133〜1135頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1860-ijinkan-opposition",
        "name": "御殿山の異人館計画に、品川三宿が反対する",
        "summary": "万延元年の外国人旅館の建築案に対し、南北両宿と新宿の三宿が寄り合って免除を願い出て、計画はいったん中止された。",
        "description": "区史によれば、御殿山には万延元年に異人館（外国旅館）を建てる案が出されていた。『外国貿易場所開港見聞記』には、品川御殿山から大日山にかけて1万5千坪が外国人旅館の用地として検分されたため、宿方が難儀するとして南北両宿と新宿の三宿が寄り合い、三宿それぞれ百姓代2人ずつを立てて代官から老中まで免除を願い出たところ、追って沙汰するとの仰せのままその後の沙汰がなかった、と記されている。地元の強い反対運動によって、いったんは中止された場所だった。",
        "year": 1860,
        "yearEnd": null,
        "yearText": "万延元年（1860年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "admin",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「御殿山の異人館」1163〜1164頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1861-gotenyama-kensetsu",
        "name": "御殿山で外国公使館の建設が始まる",
        "summary": "文久元年11月17日、地元の反対を押し切って、品川三宿請け負いの形で数千人の人足を動員した地ならしが始まった。",
        "description": "区史によれば、結局は地元の反対も押し切られ、文久元年11月17日から幕府の御普請奉行立ち会いのもと、品川三宿が請け負う形で畔鍬人足（土木方の人夫）数千人を動員して地ならしが行われ、ミニストル居館の建築作業が始まった。",
        "year": 1861,
        "yearEnd": null,
        "yearText": "文久元年（1861年）11月17日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "building",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1860-ijinkan-opposition"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「御殿山の異人館」1163〜1164頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1862-gotenyama-yakiuchi",
        "name": "高杉晋作らが御殿山の英国公使館を焼き打ちする",
        "summary": "文久2年12月、長州藩士ら13名が、ほぼ落成していた御殿山の英国公使館に焼弾を投じて火を放った。",
        "description": "区史によれば、建物の使用をめぐる交渉の最中、長州藩士の高杉晋作（谷梅助の変名）・久坂玄瑞・井上馨（志道聞多の変名）・伊藤博文（伊藤俊輔）ら同志13名によって英国公使館の焼打事件が起こった。発端は、薩摩藩が生麦で攘夷の実を挙げているのに長州藩は公武合体を説くばかりだという不満で、まず外国公使の襲撃を企てたものの世子の説諭で中止となり、その償いとして御殿山の公使館を焼くことが高杉の発議で決まった。一同は品川の妓楼「土蔵相模」に集まって焼弾を携え、乾濠を渡り柵を越えて本館に入り、火を放った。公使館はほぼ落成していたが外国人はまだ一人も移り住んでいなかった。なお区史の本文はこの事件を12月13日とし、引用する『井上伯伝』は12月12日を期して決行したと記している。",
        "year": 1862,
        "yearEnd": null,
        "yearText": "文久2年（1862年）12月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "lost"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1861-gotenyama-kensetsu"],
        "relatedPeople": ["pe-ito-hirobumi"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「5 英国公使館焼打事件」1165〜1168頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1866-shinagawa-fire",
        "name": "品川三宿で千軒近くが焼ける",
        "summary": "慶応2年12月27日、歩行新宿の湯屋から出た火で、歩行新宿・北品川宿・南品川宿あわせて千軒近くが焼失した。",
        "description": "区史によれば、品川宿は慶応2年12月27日、歩行新宿の湯屋からの出火で、歩行新宿・北品川宿・南品川宿あわせて千軒近くが焼失するという打撃を受けた。ようやく復興したところへ、翌慶応3年12月25日には脱走した浪士たちが品川宿を通る際に所々へ放火し、立ち騒ぐ者は斬り捨てると言って押し歩いたため、南品川の旅籠屋では恐れて家財道具なども残らず焼失してしまったと、慶応4年正月に差し出した書上げが伝えている。",
        "year": 1866,
        "yearEnd": 1867,
        "yearText": "慶応2年（1866年）12月27日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「品川宿の焼失」1183〜1185頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1868-kanmon",
        "name": "品川宿に関門が設けられる",
        "summary": "慶応3年12月26日の布告を受け、慶応4年1月11日に品川の関門ができたといわれる。",
        "description": "区史によれば、慶応3年12月26日の布告は、市中と在方の取り締まりのため、当分のあいだ品川宿・内藤新宿・板橋宿・千住宿・岩淵宿へ関門を建てること、関門と見張所などはできるだけ手軽に早々に普請するよう命じていた。工事は翌年までかかり、実際に品川に関門ができたのは慶応4年1月11日といわれている。警備にかかる費用については、慶応4年正月のものが『品川区史 史料編 近世の部』に収められている。",
        "year": 1868,
        "yearEnd": null,
        "yearText": "慶応4年（1868年）1月11日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "admin",
          "road"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1866-shinagawa-fire"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（八）幕末の品川「関門の設置」1185〜1186頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1438-myokokuji-kishin",
        "name": "妙国寺への寺領寄進状から、中世の街道の位置が分かる",
        "summary": "永享10年の憲泰の寄進状は、寺地の西に大道が通り東は海であったと記す。近世の東海道より西を通っていたことになる。",
        "description": "区史によれば、永享10年の憲泰による妙国寺宛ての寺領寄進状には、寺地の西に大道が通り、東は海であったと記されている。したがって中世の街道は近世の東海道の道筋ではなく、現在の京浜急行電鉄が通っているあたりではなかったかと推測される。品川神社・荏原神社・海晏寺などの所在からもそう考えられる、と区史は述べている。江戸時代に書かれたものは、御殿山下から品川宿までの一帯はすべて海浜の洲で、古い街道は西から矢口村・新井宿を経て大井村のうちの権現台あたりを通り、居木橋の一町ほど下で目黒川を渡って下高輪へ通じていたとする。",
        "year": 1438,
        "yearEnd": null,
        "yearText": "永享10年（1438年）",
        "era": "chusei",
        "areas": ["shinagawa"],
        "categories": [
          "road",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1184-shinagawa-go"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「品川宿の設置」593〜595頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1524-ujitsuna-seisatsu",
        "name": "北条氏綱が妙国寺に制札を建てる",
        "summary": "大永4年のこと。『新編武蔵風土記稿』はこれを根拠に近世の街道が大永以前から通っていたとするが、区史は制札だけでは道筋を判定できないとする。",
        "description": "区史によれば、大永4年に北条氏綱が妙国寺へ制札を建てた。『新編武蔵風土記稿』はこれをもって、大永以前から近世の街道を通行していたとするが、区史は妙国寺の制札だけで道筋を判定することはできないだろう、と慎重な見方を示している。妙国寺は早くから品川の中心にあった大寺で、小田原北条氏の時代にはすでに品川が宿場の形態を整えており、品川宿が南北に分かれていたことも戦国時代からのことである。",
        "year": 1524,
        "yearEnd": null,
        "yearText": "大永4年（1524年）",
        "era": "chusei",
        "areas": ["shinagawa"],
        "categories": [
          "temple",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1438-myokokuji-kishin"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「品川宿の設置」593〜595頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1627-kawasaki-shuku",
        "name": "川崎宿が設けられ、品川宿の継立ての負担が軽くなる",
        "summary": "寛永4年の設置まで、品川宿は保土ヶ谷まで五里を受け持っていた。川崎宿ができて二里半になった。",
        "description": "区史によれば、品川宿ができた当初はまだ川崎宿がなく、品川宿は江戸日本橋の伝馬町と保土ヶ谷宿の中間にあって荷物の運搬の義務を負っていた。日本橋までは二里、保土ヶ谷までは五里の距離がある。旅行者にも不便で、品川・保土ヶ谷の両宿の継立てにも重い負担がかかったため、寛永4年に幕府の命で川崎宿が設けられ、品川からは二里半になった。宿の創置のときの任務は一日に三六疋の馬を提供することで、のちのような人足の負担はなかった。一疋が三〇貫ずつ運ぶとすれば一日の最大運搬量は一、〇八〇貫にあたる。",
        "year": 1627,
        "yearEnd": null,
        "yearText": "寛永4年（1627年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "road",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1601-tenma"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「宿場の設定」598〜601頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1712-kanmearatamejo",
        "name": "品川宿に貫目改所が置かれる",
        "summary": "正徳2年、過積みの荷物から宿と助郷を守るため、五街道の五宿に貫目改所が設けられた。品川は東海道の首駅として選ばれた。",
        "description": "区史によれば、幕府は宝永4年5月に東海道・中山道・日光道中の幕領の宿々へ宿手代を置いたが効果が上がらず、正徳2年に廃して道中奉行に与力・同心を預けた。新井白石の建議による改革で、この年に五街道の各宿へ街道別の条目を通達し、大名・旗本にも不法な使役をしないよう厳重に注意している。あわせて、過貫目の荷物を運ばせて宿・助郷の人馬を苦しめることが多かったことから、東海道の品川・駿府・草津、中山道の板橋・洗馬の五か宿に貫目改所を設けた。品川が選ばれたのは東海道の首駅でもっとも多くの荷物を送り出す場所だったためである。費用として東海道の三宿には年々金65両が下付されたが、貨幣の改鋳にともない享保4年から32両2分に半減し、文政5年に旧に復した。寛政元年には関東郡代伊奈忠尊の勤役中に、品川宿の貫目改所へ手付・手代のうち1人を出して荷物の貫目を改めさせている。",
        "year": 1712,
        "yearEnd": null,
        "yearText": "正徳2年（1712年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "road",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1601-tenma"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「貫目改所の設置」685〜687頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1694-sukego",
        "name": "品川宿の助郷が定められる",
        "summary": "元禄7年から道中奉行が助郷帳を宿に渡すようになった。品川宿は定助郷16か村・大助郷38か村の計54か村。",
        "description": "区史によれば、元禄7年以降、道中奉行が助郷を指定するときは助郷帳を宿に渡し、助郷の村はその写しを取っておくことが義務づけられた。品川宿の元禄7年のものは残っていないが、のちの記録では定助郷16か村・大助郷38か村の計54か村だったという。その後、享保10年に諸宿の助郷の改編が行われて定助郷と大助郷の別がなくなり、このときの品川宿の助郷は57か村・高1万7,667石となった。",
        "year": 1694,
        "yearEnd": null,
        "yearText": "元禄7年（1694年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "road",
          "admin"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "正徳年間の改定について、『品川町史』は正徳2年に証文高1万7,969石・58か村になったとするが、『新編武蔵風土記稿』は正徳6年（享保元年）の改定で荏原郡49か村・豊島郡12か村の計61か村とし、年も村数も食い違う。区史はこの食い違いをそのまま併記している。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「品川の定助郷」646〜649頁"
          }
        ],
        "relatedEvents": ["ev-1601-tenma"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「品川の定助郷」646〜649頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1771-honjin-fire",
        "name": "本陣が焼け、歩行新宿へ移って営まれる",
        "summary": "明和8年の火災で本陣が焼失。再建の金が足りず、安永2年から10年間、歩行新宿の別家で本陣を営むことになった。",
        "description": "区史によれば、明和8年の火災で品川宿の本陣が焼失し、家作金の拝借を関東郡代に願い出てようやく許可されたところへ、翌年春の目黒行人坂の火事で江戸が大半焼けて材木の値が高騰し、家作金が足りなくなった。そこで安永2年に、本陣の七之丞の親である受栄が歩行新宿に構えていた別家へ建て継ぎをして、10年間そこで本陣を営むことを七之丞と名主・問屋が願い出て、郡代の許可を得ている。",
        "year": 1771,
        "yearEnd": 1773,
        "yearText": "明和8年（1771年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "building"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1635-honjin",
          "ev-1772-gyoninzaka-fire",
          "ev-1722-kachishinshuku"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「本陣の創設」732〜740頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1811-honjin-fire",
        "name": "本陣が再び類焼し、拝借金で建て直される",
        "summary": "文化8年9月の類焼で本陣は自力で再建できず、代官所から150両を借りて10か年賦で返すことになった。",
        "description": "区史によれば、文化8年9月に品川宿の本陣がまた類焼し、本陣の市郎右衛門は自力で再建することができなかった。しかし品川宿に本陣がなくては差し支えるため、代官所から拝借金150両が貸し付けられ、文化8年から3年据え置き、10か年賦で15両ずつ返済することになった。のちの天保の改革では一般の拝借金が半分に切り捨てられ、民間からの積立金は年賦で下げ渡されることとなり、品川宿では文化度の下げ金106両2分余と、宿方上納金を利殖した分573両3分余の計680両1分余について、下げ金は天保14年から5か年、宿方の差出金は同年から20か年賦で下げ渡すので、宿方で仕法を立てて永続するよう命じられた。",
        "year": 1811,
        "yearEnd": null,
        "yearText": "文化8年（1811年）9月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "building"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1771-honjin-fire"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「本陣の創設」732〜740頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1865-sukego-sodo",
        "name": "品川で助郷騒動が起こる",
        "summary": "慶応元年2月のこと。長州征伐で宿と助郷の人馬負担が過重になるなかで起きた。",
        "description": "区史によれば、幕末は宿と助郷にとって負担の重なる時期だった。文久元年5月には品川に近い芝高輪の東禅寺にあったイギリス公使館が襲撃され、書記官オリファントと長崎領事モリソンが傷つけられている。文久2年閏8月の参勤交代制の変更も宿・助郷に大きな影響を与えた。元治元年に長州征伐が始まり、翌慶応元年の第二回の長州征伐では将軍家茂も5月に江戸を発って大坂に赴き自ら軍を督したため、宿・助郷の人馬の負担はいっそう過重になった。品川では元治2年すなわち慶応元年の2月に騒動が生じている。",
        "year": 1865,
        "yearEnd": null,
        "yearText": "慶応元年（1865年）2月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1694-sukego"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「助郷騒動」670〜675頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1764-meshimori-500",
        "name": "品川三宿に食売女500人が認められる",
        "summary": "明和元年8月7日、道中奉行が旅籠屋ごとの人数制限を外し、三宿で500人までを許した。以後、品川宿では毎年この日に「弾正日待」が営まれた。",
        "description": "区史によれば、幕府は万治3年に街道の宿々へ遊女を置くことを禁じていたが、品川は東海道出口の要所で遊客が多く、享保5年に新吉原の者が訴え出たところでは品川三宿に千余人の食売女がいたという。寛保2年5月14日の夜には町奉行の組同心百余人が踏み込んで食売女200余人を捕らえ、7月に歩行新宿の松屋六右衛門を所払いにするなどの処罰を行い、遊女63人を新吉原へ預けた。以後も召し捕り事件はたびたび起き、明和元年7月に歩行新宿の旅籠屋足立屋藤四郎の召仕いが町奉行所へ駆け込み訴えをしたことから宿は騒動となり、三宿は困窮を訴える願書を代官を通じて道中奉行へ出した。8月7日、道中奉行の安藤弾正少弼惟要から、これまで南北品川宿は旅籠屋1軒に2人、歩行新宿は1人としていた定めを改め、本宿と新宿の別なく1軒あたりの人数を限らず三宿で500人までを許す、との申し渡しがあった。品川宿では以後、毎年8月7日に「弾正日待」と称して安藤惟要らの画像と姓名の軸を掛け、請証文に神酒を供え赤飯を炊いて祝うようになった。なお天明2年には、歩行新宿の惣旅籠屋が芸者を旅籠屋へ呼び入れる許可を代官所に願い出て認められている。",
        "year": 1764,
        "yearEnd": null,
        "yearText": "明和元年（1764年）8月7日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1722-kachishinshuku"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「食売女五百人」765〜771頁"
          },
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「遊女の禁止」761〜765頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1852-shinagawa-saiken",
        "name": "『品川細見』が刊行され、食売女499人が記される",
        "summary": "嘉永5年の版は値段ごとの人数まで載せる。多くは貧しさから身売りした女性で、年季を勤めて借金を返す立場にあった。",
        "description": "区史によれば、食売女が遊女と変わらないものになると、「吉原細見」にならって遊女の評判や値段を記した『品川細見』も刊行された。嘉永5年の版では銀10匁が53人、金2朱が41人（ここまでが大見世）、銀6匁38人、銀5匁302人、4匁65人の計499人が記されている。街道筋の食売女は一夜銭200文が標準相場だったから品川は遊女並みの値ということになるが、吉原に比べれば安く、それだけ遊びやすかったという。区史は同時に、食売女の多くが親兄弟の貧しさから身売りした者で、身代金を親が持ち帰ったあとは5年10年の年季を勤めて借金を返さねばならず、主人の気に入らなければほかへ住み替えさせられ、虐待されることもあったと記す。境遇に耐えかねて自殺や欠落をする者もあり、欠落をすれば身請人が借金を弁済しなければならず、死んでも葬式をしてもらえなかった。",
        "year": 1852,
        "yearEnd": null,
        "yearText": "嘉永5年（1852年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1764-meshimori-500"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「食売女の悲哀」771〜776頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1794-shuku-zaisei",
        "name": "品川宿の収支勘定が残る最も古い年",
        "summary": "寛政6年の勘定では、収入393両余の約8割が伝馬役屋敷の役金。支出の4分の1強が南北の問屋場の経費だった。",
        "description": "区史によれば、品川宿の財政を示す古い記録は残っておらず、寛政6年のものが最も古い例となる。収入は計393両余で、伝馬役屋敷役金が312両余（79.4パーセント）、歩行役屋敷役金が81両余（20.6パーセント）を占めた。伝馬役屋敷は南品川宿73軒・北品川宿67軒の計140軒半あり、このうち馬役70軒と、名主・問屋・年寄・往還払方の4人分の役引を除いた62軒半が、1軒あたり年5両を納めている。支出では南北の問屋場の諸入用が80両（26.5パーセント）で最も大きく、三宿の帳付給分42両、南北宿の馬指給分36両が続く。宿の財源は、第一に宿の構成員の負担金、第二に幕府の補助米（寛永10年からの継飛脚給米26石7斗、寛文5年からの問屋給米7石）、第三に人馬賃銭の一部を積み立てて貸し付けた利足（刎銭溜金）などであった。",
        "year": 1794,
        "yearEnd": null,
        "yearText": "寛政6年（1794年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "admin",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1601-tenma",
          "ev-1722-kachishinshuku"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「寛政六年の収支勘定」783〜785頁"
          },
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（四）宿駅制度「宿の財源」781〜783頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1674-shuinjo-bunkatsu",
        "name": "南北品川の鎮守が、朱印状をめぐって争う",
        "summary": "延宝2年9月、北品川の稲荷社の神主が、南品川の貴布祢社の神主に貸した朱印状が返らないと寺社奉行へ訴え出た。",
        "description": "区史によれば、社寺が将軍から社領を拝領して朱印状を下付されることは格式であり、石高が軽くてもその領有に固執した。延宝2年9月、北品川宿の鎮守である稲荷社（現在の品川神社）の神主小泉出雲が寺社奉行へ訴状を出し、品川の南北の大明神には家康から当将軍まで代々高五石の朱印が与えられ、二石五斗ずつ所務してきたこと、寛文5年7月に父が交付を受けた朱印状を、南品川宿の鎮守である貴布祢社（現在の荏原神社）の神主鈴木兵衛が氏子に見せたいというので貸したまま返さないことを訴えた。これに対し鈴木兵衛は、朱印状の「品川大明神」は南の大明神を指すと反論した。その根拠として、北の氏神は土地の者が一般に稲荷と呼び南の氏神を大明神と呼んでいること、朱印状に「品川郷之内五石」とあるが北の氏神の所領は大崎郷のうちにあること、現将軍からの朱印状は自分が江戸城で頂戴したものであることなどを挙げている。北の小泉家と南の鈴木家は親戚同士で、朱印状の拝領にどちらかが代理として出頭することもあったという。",
        "year": 1674,
        "yearEnd": null,
        "yearText": "延宝2年（1674年）9月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "temple",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1648-shinagawa-jinja-torii"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「南北品川鎮守の朱印状分割」961〜967頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1828-kitano-tenno-sai",
        "name": "北の天王祭の道筋が書き上げられる",
        "summary": "文政11年に幕府へ提出された「地誌御調書上」に、6月7日から19日までの神輿の渡御の道筋が記されている。",
        "description": "区史によれば、北品川宿の鎮守である稲荷社（現在の品川神社）の祭礼のうち最大のものは、相殿の祇園社の祭礼である天王祭で、南品川宿の貴布祢社（現在の荏原神社）の天王祭と区別して「北の天王祭」と呼ばれた。6月7日から19日までの13日間行われる。文政11年に幕府へ提出した「地誌御調書上」によれば、6月7日に神輿は本社を出て東海寺門前・清徳寺門前を通り、東海寺の山内に入って西門を出、御殿山下・稲荷門前を通って北馬場町から本宿へ出て、南品川宿との境の目黒川にかかる橋まで行って引き返し、本宿の東海道を練り歩いた。さらに歩行新宿に入って八ッ山まで行って引き返し、浜通りや陣屋横町など氏子の各町を渡って御旅所に入り、19日まで安置されて参拝を受けた。神幸には北品川宿と歩行新宿の宿役人・組頭・門前行事・家主らが供をしている。",
        "year": 1828,
        "yearEnd": null,
        "yearText": "文政11年（1828年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "temple",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1674-shuinjo-bunkatsu"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「北の天王祭」970〜972頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1811-matsuri-torishimari",
        "name": "祭りの飾りが取り払わせられる",
        "summary": "文化8年の祭礼で、茶屋が店先に下げていた細工燈籠が代官所の出役の目にとまり、すべて取り外して処分させられた。",
        "description": "区史によれば、幕府は祭礼が派手になることを厳しく取り締まった。文化8年の祭礼にあたり、北品川宿と品川歩行新宿の茶屋が店先に細工燈籠を下げていたのが代官所の出役の目にとまり、全部取り外すよう命じられた。取り外して宿役人が保管していたところ、さらに取り捨てるよう指示があったため、そのとおり処分し、今後このようなことがないようにしたいと、品川歩行新宿の名主代理の年寄庄九郎が代官へ請書を提出している。祭りに若者が揃いの単物を着ることも、木綿で仕立てたものであっても華美に流れるとして禁じる触が出ていたらしく、文化4年には北品川宿の家主9名が品川神社の社役に宛てて、店子から心得違いの者を出さないよう取り計らう旨の一札を連印で提出している。",
        "year": 1811,
        "yearEnd": null,
        "yearText": "文化8年（1811年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1828-kitano-tenno-sai"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「北の天王祭」970〜972頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1827-sairei-enki",
        "name": "将軍家の不幸が重なり、天王祭が二度組み替えられる",
        "summary": "文政10年、大名の宿泊と神輿の渡御が重なって渡御を中止し、さらに清水斉明の死去で祭礼そのものを一旦中止した。",
        "description": "区史によれば、北品川宿の天王祭は例年6月7日から19日まで行われたが、将軍やその子女、御三卿の不幸や前将軍の年忌がこの時期に重なると日限を延ばさざるを得なかった。品川神社文書には宝暦12年から文政10年まで9回の繰り下げの届出が残る。文政10年は、6月5日に宿の人々が祭りの準備をしているところへ、6日と7日に井伊直亮・松平定永の一行が品川宿に宿泊するとの知らせが入った。7日は神輿が宿内を渡って仮殿へ移る初日だったため、大名の従者と重なる混乱を避けて渡御を中止し、直接仮殿へ移すことにした。そこへ6月10日、御三卿の清水斉明が死去して、普請は3日、鳴物は7日停止との布令が出たため、宿役人は協議して祭礼を一旦中止し、同じ日の夜に神輿を本社へ還した。結局、残りの祭礼は6月17日から26日の間に行うこととなり、改めて17日に神輿の渡御が行われた。鳴物停止が、かえって中止された渡御を実施させることになったのである。",
        "year": 1827,
        "yearEnd": null,
        "yearText": "文政10年（1827年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1828-kitano-tenno-sai"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「祭礼の延期」974〜976頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1770-sentai-kojin",
        "name": "千躰荒神が海雲寺に移される",
        "summary": "明和7年、芝二本榎の鍋島家下屋敷から南品川の海雲寺へ移された。台所の神として江戸市中からも信仰を集めた。",
        "description": "区史によれば、南品川の青物横町にある曹洞宗海雲寺には本堂に隣接して荒神堂があり、千躰三宝大荒神王すなわち千躰荒神が祀られている。もともと品川宿にあったものではなく、明和7年に肥前国蓮池の領主鍋島家の芝二本榎の下屋敷から移されたもので、このことは記録の上からも明らかだと区史は記す。江戸後期の『十方庵遊歴雑記』によれば、この荒神はもと肥後国天草郡の荒神の原に祀られて二荒神と呼ばれ、寛永14年の島原の乱のとき鍋島直澄が鎮圧に向かう途中で詣でて敵の降伏を祈願し、出撃にあたってどこからか神兵が現れて陣頭で敵を攻め直澄を守ったため、荒神の守護と感じて像を奉持して江戸へ帰り下屋敷に堂を建てて祀ったという。直澄が天草攻めをしたことは史実と合う。千躰荒神祭には鍋島家からも家来が警固に出て、境内に鍋島家の提灯が立てられたといわれる。",
        "year": 1770,
        "yearEnd": null,
        "yearText": "明和7年（1770年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "temple",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-1b47f5332c"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「千躰荒神祭」1030〜1033頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kinsei-sentai-kojin-sai",
        "name": "千躰荒神祭に、荒神の像を取り替える人々が集まる",
        "summary": "祭の日には前年に受けた像を持参して新しい像と取り替えた。新規は二百文、取り替えは百文と定められていた。",
        "description": "区史が引く『十方庵遊歴雑記』によれば、千躰荒神祭の日には江戸の市中や近郊の農村・漁村の人々が、前年に受けた荒神の像を持ってきて新しい像と取り替えるため、その下付を願って多数集まった。神楽を見る者なども加わって大勢の参詣人で賑わい、荒神を受けに来た人は海雲寺の座敷に案内されて斎非時をふるまわれた。新規に荒神を受ける代は二百文、前年のものと取り替える代は百文と定められていたという。参道や東海道筋には多数の露店が出て、炊飯用の釜の形をした「釜おこし」が売られていた。区史が刊行された昭和48年（1973年）の時点では、年2回、3月27日・28日と11月27日・28日に千躰荒神祭が行われていた。",
        "year": null,
        "yearEnd": null,
        "yearText": "江戸時代後期",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1770-sentai-kojin"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「千躰荒神祭」1030〜1033頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1820-matsuribayashi",
        "name": "村々に祭囃子の連中ができる",
        "summary": "大井・原が文政3年、蛇窪が文政7年、大井・浜川町が天保8年、大井・御林町が明治3年。区内に広まったのは文政以降とみられる。",
        "description": "区史によれば、鎮守の祭礼には大太鼓1名・小太鼓2名・笛1名・鉦1名の5名で演奏される祭囃子がつきもので、その連中は江戸時代には区内の各村にあり、若者たちの娯楽にもなっていた。明治28年に刊行された『祭礼囃子の由来』の巻末には、旧荏原郡を中心とした地域の祭礼囃子の創始年代と発起人・師匠の氏名が村別に記されている。区内では南品川・谷山・中延・戸越・小山・蛇窪、および大井の原・倉田・元芝・御林町（鮫洲）・浜川町に連中があり、始まった年代が分かるのは大井・原の文政3年、蛇窪の文政7年、大井・浜川町の天保8年、大井・御林町の明治3年の4か所である。うち3か所が江戸時代の後期以降にあたるため、区内に祭囃子が伝わったのは文政以降だろうと区史は述べている。江戸の祭囃子の源流は葛西囃子といわれ、享保年間に葛西の香取明神の神主能勢環が始めたものが神田明神の祭礼で演奏されて江戸の市中や近郊へ広まった。",
        "year": 1820,
        "yearEnd": 1870,
        "yearText": "文政3年（1820年）〜明治3年（1870年）",
        "era": "kinsei",
        "areas": [
          "oi",
          "shinagawa",
          "ebara"
        ],
        "categories": [
          "life",
          "culture"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「大井囃子」989〜995頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-bunsei-daidai-kagura",
        "name": "品川神社の太太神楽が「永代帳」に書き留められる",
        "summary": "文政年間の記載で20座の次第・品川拍子の曲目・装束が記されている。現在伝わるのは12座。",
        "description": "区史によれば、品川拍子太太神楽は品川神社の神職家に古くから伝わる神楽で、かつては毎年4月17日に拝殿のなかで行われ、区史の刊行時点では4月15日に行われていた。舞人には古くから当社の神職が奉仕するしきたりで、当社や近辺各社の神職が舞と奏楽を行っていたが、神職が演じていたのは大正初期までで、区史の刊行時点では専門の神楽師が務めていた。舞人は面をつけて金襴の装束を着け、楽人は烏帽子に直垂で笛・大太鼓・締太鼓を奏し、このとき演奏される奏楽が品川拍子である。品川神社に伝わる文政年間に記された「永代帳」には20座の内容、品川拍子の曲目、装束が記されているが、区史の刊行時点で伝えられていたのは12座のみである。拍子は使う楽器の組み合わせなどによって「らんじ」「品川拍子」「かまくら拍子」「三ッ拍子」「えんぶ」などに分けられる。",
        "year": null,
        "yearEnd": null,
        "yearText": "文政年間（1818年〜1830年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "culture",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1828-kitano-tenno-sai"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-548dab732d"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「品川拍子太太神楽」986〜989頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1840-terakoya",
        "name": "区内に寺子屋が開かれる",
        "summary": "明治5年の時点で江戸期から続く家塾が7つあり、最も古い清香堂は天保11年の開業。最大の成隣堂は児童116名を預かっていた。",
        "description": "区史によれば、幕府は武士以外の教育に積極的な施策をとらなかったが、商人には読み・書き・そろばんが欠かせないため、子弟に幼少から手習いを受けさせる家庭が次第に増え、私設の教育機関である寺子屋が増えていった。区内の寺子屋の数や分布は明らかでないが、『品川町史』は幕末に南北品川だけで約8、9軒あったと記す。明治6年に東京府へ提出された家塾明細届書によれば、明治5年の時点で江戸期から開業していた者は7名で、うち5名が品川宿、1名が下大崎村、1名が桐ケ谷村で開いていた。最も古いのは北品川宿の清香堂で天保11年に高田義宣が開業し、明治5年には児童79名。南品川宿の成隣堂は弘化4年の開業で児童116名と最大、同じく南品川宿の泉行堂は安政5年で64名だった。下大崎村の太雅堂を開いた貫名氏は本立寺の住職で、寺子屋の師匠には浪人・神官・僧侶があたっていたという。 区史の第75表では、北品川宿の梅林堂と玉泉堂がそれぞれ49人と27人、桐ケ谷村の竜昇堂が35人を預かっていた。届書には、学習に使った本として、手紙や商いの文例を集めた往来物のほか、『実語教』などが挙がる。",
        "year": 1840,
        "yearEnd": 1872,
        "yearText": "天保11年（1840年）〜明治5年（1872年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": [
          "culture",
          "life"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「庶民の教育」1067〜1070頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-kinsei-jisei-bohi",
        "name": "辞世を刻んだ墓碑が、庶民の文芸を伝える",
        "summary": "寺子屋が増えるにつれ町人や百姓にも狂歌・俳句・川柳を詠む者が増えた。区内の寺の墓地には辞世を刻んだ江戸期の墓碑が残る。",
        "description": "区史によれば、18世紀後半から富裕な町人が増えてその遊芸が盛んになり、和歌・俳諧・川柳などの文芸が庶民のなかに育った。寺子屋などの教育施設が増えるにつれ、町人や百姓にも狂歌を作り俳句や川柳を詠む者が次第に多くなっている。ただしその実情を示す史料は乏しいため、区史は区内の寺院の墓地から辞世を刻んだ江戸期の墓碑を拾い上げている。法禅寺墓地の孤雲（文政11年寂）、海徳寺墓地の渡辺伝右衛門（天明3年寂）、徳蔵寺墓地の伝吉（天保3年寂、大崎辺を縄張りとした侠客）、善福寺墓地の桃春（文化13年寂）、願行寺墓地の慧察禅長信士（安政5年寂）などで、辞世には地名を詠み込んだものもある。",
        "year": null,
        "yearEnd": null,
        "yearText": "江戸時代後期",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": [
          "culture",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1840-terakoya",
          "ev-1820-hakugyu"
        ],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「庶民の文芸」1070〜1073頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1808-keizan-nanushi",
        "name": "大野景山が大井村の名主職を継ぐ",
        "summary": "文化5年に名主職を継いだ大野五蔵（俳号は杜格斎景山）は、大井の泊船寺の芭蕉堂を拠点に江戸南郊俳壇の中心人物となった。",
        "description": "区史によれば、江戸後期に大井村を中心とした江戸南郊の文化活動で指導的な役割を果たしたのが杜格斎景山である。本名は大野五蔵、惟図と称し、杜格斎景山は俳号にあたる。大井村の名主役である大野貫蔵惟一の子として生まれ、文化5年に父の跡を継いで大井村の名主職に就いた。大野家は斯波氏の末流と称し、天文23年に祖の大野和泉守高秀が大井村に土着したと伝える。文化14年3月には一代かぎりの帯刀を許され、父の代に永代の苗字御免となっていたため、苗字を公称でき帯刀も許されるという、農民層ではもっとも格の高い家格にあった。景山は俳諧に傾倒し、杜格斎二世山奴とともに大井の泊船寺の芭蕉堂を根拠地として活動し、のちに杜格斎三世を継いだ。桜の名所を集めた「南浦桜案内」は、品川御殿山から来福寺・西光寺・光福寺を経て鈴ヶ森八幡宮に至る約10か所を絵図つきで示し、景山らの句を織り込んだもので、「杜格斎蔵板 不許売買」とあることから、自費で板を起こして泊船寺に集まる俳人へ配ったものと考えられる。著述に『花守随筆』『南浦助名考聞書』などがあるとされるが、実物の行方は分かっていない。",
        "year": 1808,
        "yearEnd": null,
        "yearText": "文化5年（1808年）",
        "era": "kinsei",
        "areas": ["oi"],
        "categories": [
          "culture",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1820-hakugyu",
          "ev-kinsei-jisei-bohi"
        ],
        "relatedPeople": ["pe-ono-keizan"],
        "relatedPlaces": ["pl-9250914617"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜格斎景山」1077〜1080頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1812-keiko",
        "name": "下蛇窪村の名主伊藤景湖が、邸内に寺子屋と道場を設ける",
        "summary": "文化9年生まれ。村政に尽くすかたわら邸内に寺子屋・矢場・道場を設け、俳人としても江戸南郊俳壇の一翼を担った。",
        "description": "区史によれば、大野景山と並んで江戸末期の区域で村役人層から出た文化人として活躍したのが杜松斎景湖である。本名は伊藤清一郎綏定、文化9年に下蛇窪村（現在の二葉あたり）の名主清兵衛顕徳の子として生まれた。父の顕徳も俳諧に親しんで杜陽斎湖月と号し、「荏原の細字書き」と呼ばれる細字の名人だったという。伊藤家の祖は伊藤遠江守為憲といい、その子孫の勘解由義顕が天文のころ下蛇窪村に土着してこの一帯を開発したと伝え、徳川の世になって下蛇窪村の名主となった。景湖はその8代目にあたる。父の跡を継いで名主職を命じられ、品川領16か村の寄場名主としても村政に尽くした。邸内に寺子屋を設けて村内の子弟を教え、矢場や道場も設けて村民の有志に弓術・柔術・剣術を習わせるなど、村民の福利厚生に力を入れている。大井村の名主で俳人の三世杜格斎景山やその後の五世杜格斎乙雨らと交わり、俳人としても江戸南郊俳壇の一翼を担った。",
        "year": null,
        "yearEnd": null,
        "yearText": "江戸時代後期",
        "era": "kinsei",
        "areas": ["ebara"],
        "categories": [
          "culture",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1808-keizan-nanushi",
          "ev-1840-terakoya"
        ],
        "relatedPeople": ["pe-ito-keiko"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜松斎景湖」1080〜1083頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1841-nanen",
        "name": "北品川正徳寺の住職南園が、京都で勤王派と交わる",
        "summary": "詩僧として生きることを選んだ小自在庵南園は、天保12年に京都で勤王派と交わり、以後その立場をとった。",
        "description": "区史によれば、小自在庵南園は江戸末期の文人で、北品川宿北馬場町にある真宗大谷派の正徳寺25世の住職である。本名は平松理準、寛政9年3月3日に美濃国安八郡小野村の専勝寺に生まれた。京都に出て本山東本願寺の高倉学寮で真宗の宗学を学び、在学中は頼山陽・中島棕隠・篠崎小竹らについて漢詩を学んだ。文政6年に江戸へ出て宗学を修め、のちに上野寛永寺の慧澄について天台学を学び、東叡山山王御供所別当に抜擢されている。江戸では大窪詩仏・菊池五山らに宋詩を、佐藤一斎・亀田鵬斎に経書を学んだ。やがて江戸の詩壇の大家が権門や富豪に媚びて生活する実情を見て、自分は一詩僧として寺の住持となって一生を送ることに決め、北品川の正徳寺の住職平松理秀の要請を受けてその法嗣となった。天保12年には京都へ行って勤王派を唱える人たちと交わり、以後これを応援する立場をとって、自坊を謀議の場所として提供した。",
        "year": 1841,
        "yearEnd": null,
        "yearText": "天保12年（1841年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "culture",
          "temple"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1808-keizan-nanushi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「小自在庵南園」1084〜1086頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1695-ryoshimachi-kenchi",
        "name": "南品川猟師町の屋敷地が検地帳に記される",
        "summary": "12月の検地帳には、南品川猟師町の屋敷地が76筆記されている。",
        "description": "区史は、屋敷地を名請人ごとに整理して41戸と数えている。屋敷地とは別に、漁師が共同で使う網干場があった。検地帳は大島家文書に含まれる。",
        "year": 1695,
        "yearEnd": null,
        "yearText": "元禄8年（1695年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1655-ryoshimachi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「猟師町の構造」833〜835頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1722-osakana-resumed",
        "name": "品川浦などで幕府への鮮魚献上が再開される",
        "summary": "3月に幕府が献上の停止を命じたが、品川浦を含む漁村側が願い出て8月に再開が認められた。",
        "description": "停止の対象には品川浦・大井御林浦が属した御菜肴八ヵ浦のほか、葛西領の浦方と深川猟師町も含まれた。漁村側は4月に代官所へ願書を提出した。",
        "year": 1722,
        "yearEnd": null,
        "yearText": "享保7年（1722年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1655-ryoshimachi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「御菜肴献上」836〜839頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1732-tsukuri-mo-dispute",
        "name": "品川猟師町などのイカ漁をめぐり近隣の浦が訴える",
        "summary": "大井御林町などが、品川猟師町と大森村で行われていたイカ漁は網漁を妨げると訴えた。",
        "description": "問題となったのは、土をむしろなどで包み、箒と竹を組み合わせた仕掛けを海に入れる「作り藻」という漁法だった。大井御林町とともに金杉・本芝・羽田猟師町が訴えたと区史は記している。",
        "year": 1732,
        "yearEnd": null,
        "yearText": "享保17年（1732年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1655-ryoshimachi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「四十四ヵ浦の議定」850頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1734-osakana-extra-duty",
        "name": "品川浦などが臨時の鮮魚献上の負担を訴える",
        "summary": "11月、品川・金杉・本芝の三浦が、不漁のなか急な献上を求められる負担を訴えた。",
        "description": "翌年の願いには、夜中に翌朝の献上を求める知らせが届く例が記されている。急な漁は品川猟師町・御林町を含む四浦が引き受け、船賃などを残りの四浦が負担する案が示された。",
        "year": 1734,
        "yearEnd": null,
        "yearText": "享保19年（1734年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1722-osakana-resumed"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「御菜肴献上」839〜840頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1845-ryoshimachi-kenchi",
        "name": "新田検地で南品川猟師町の屋敷地が増える",
        "summary": "新田検地の結果、帳簿上の屋敷地は4畝24歩増えて9反8畝14歩となった。",
        "description": "猟師町は南品川宿に属し、年貢の割り付けも宿の行政の中で扱われていた。区史によると、検地によって猟師町の石高も4斗8升増えた。",
        "year": 1845,
        "yearEnd": null,
        "yearText": "弘化2年（1845年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1695-ryoshimachi-kenchi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「猟師町の構造」833頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1811-gozennori-dispute",
        "name": "品川・大井の村々が御膳海苔の産地をめぐって争う",
        "summary": "将軍家への献上海苔を大森産に限ろうとする申し立てに、品川・大井の村々が異議を唱えた。",
        "description": "献上用の海苔には天王洲・鮫洲・水車洲で採れたものが使われ、大井村浜川町で加工して浅草の店に送っていた。翌年、勘定奉行所が産地を調べ、従来どおりに納めるよう命じた。",
        "year": 1811,
        "yearEnd": null,
        "yearText": "文化8年（1811年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1813-nori-survey"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「御膳海苔の献上」867〜868頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1813-nori-survey",
        "name": "幕府が品川・大井などの海苔養殖場を測る",
        "summary": "幕府は海苔養殖にかける税を増やすため、養殖場の区画を測った。",
        "description": "区史の第50表によると、南品川宿・海晏寺門前・大井村を含む九ヵ村の区画の合計は、宝暦7年（1757年）の約5.9倍に達した。",
        "year": 1813,
        "yearEnd": null,
        "yearText": "文化10年（1813年）",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1811-gozennori-dispute"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「海苔養殖業の発展」861〜862頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1838-gozennori-petition",
        "name": "南品川宿と猟師町が献上海苔の負担を訴える",
        "summary": "凶作が続き、南品川宿と猟師町は、一部の養殖場に割り当てられた献上分を他の村や町に回すよう願い出た。",
        "description": "願書には、不作による損失で新たに海苔の付着用の枝を立てることも難しいとある。その後に献上の負担が免除されたかどうかは区史でも明らかにされていない。",
        "year": 1838,
        "yearEnd": null,
        "yearText": "天保9年（1838年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1811-gozennori-dispute"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「御膳海苔の献上」868〜869頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1862-kogeta-dispute",
        "name": "品川猟師町が漁具「小桁」を届け出ようとする",
        "summary": "12月、品川猟師町は小桁を従来の漁具として届け出ようとしたが、ほかの浦は新しい漁具だとして認めなかった。",
        "description": "区史は、品川台場の建設後に漁場の浅瀬化や潮流の変化があり、品川の漁師たちが漁具を改良して対応したと記す。小桁はその時期に使用をめぐって対立した漁具で、エビ桁もその一種だった。",
        "year": 1862,
        "yearEnd": null,
        "yearText": "文久2年（1862年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1732-tsukuri-mo-dispute"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「幕末の漁業」855〜856頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1792-osakana-cash",
        "name": "品川浦の定例の鮮魚献上が金納に切り替わる",
        "summary": "月に3回行われていた定例の鮮魚献上が中断され、代金を納めるようになった。",
        "description": "区史は南品川宿の年貢皆済目録にこの年の御菜肴代が記録されているとする。文化7年（1810年）には、代金の納付に加えて月1回、漁の初物を献上することが認められた。",
        "year": 1792,
        "yearEnd": null,
        "yearText": "寛政4年（1792年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": ["life"],
        "certainty": "fact",
        "relatedEvents": ["ev-1722-osakana-resumed"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（五）産業「御菜肴献上」839〜840頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1834-kagata-shinchi",
        "name": "利田新地が検地を受け、石高に組み入れられる",
        "summary": "目黒川河口近くの寄洲を利用して開発された利田新地は、天保5年4月に検地を受けて石高に組み入れられた。",
        "description": "区史によると、開発は天明年間に始まった。利田新地は猟師町の網干場の北にできた寄洲を利用したもので、新地の先端には弁天社と鯨塚があった。地図のピンは、弁天社と鯨塚のゆかりの場所である利田神社を示す。",
        "year": 1834,
        "yearEnd": null,
        "yearText": "天保5年（1834年）4月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "placename"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1655-ryoshimachi",
          "ev-1798-kujira"
        ],
        "relatedPeople": [],
        "relatedPlaces": ["pl-086da1e672"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「南品川新開場（利田新地）」399〜400頁、「利田新地の開発」408〜409頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1742-takashio-kanpo",
        "name": "高潮の水害が品川宿を襲う（寛保2年）",
        "summary": "寛保2年、高潮による水害が品川宿で起きたと記録に残る。被害の詳しい中身は伝わっていない。",
        "description": "区史は、江戸時代の品川で高潮の水害が記録されている年として寛保2年を挙げる。市街地といえるのは品川宿の周辺だけだったため、被害が目立つのもこの一帯で、ほかの場所では農作物の被害が中心だったと説明する。記録は年が分かる程度で、詳細は不明としている。",
        "year": 1742,
        "yearEnd": null,
        "yearText": "寛保2年（1742年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「江戸時代の水害」81〜82頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1823-takashio-bunsei",
        "name": "高潮の水害が品川宿を襲う（文政6年）",
        "summary": "文政6年にも、高潮による水害が品川宿で起きたと記録されている。詳細は伝わっていない。",
        "description": "区史が品川宿の高潮として挙げる3つの年の2つめにあたる。ほかの2つ（寛保2年・安政3年）と同じく、年が記録に残るだけで被害の詳細は不明とされる。区史はさらに、江戸に大きな被害を出した延宝8年や寛政3年の高潮でも、品川に被害があったと考えてまちがいないだろうと、筆者の推定を述べている。",
        "year": 1823,
        "yearEnd": null,
        "yearText": "文政6年（1823年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「江戸時代の水害」81〜82頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1856-takashio-ansei",
        "name": "高潮の水害が品川宿を襲う（安政3年）",
        "summary": "安政3年、高潮による水害が品川宿で起きたと記録されている。詳細は伝わっていない。",
        "description": "区史が品川宿の高潮の記録として挙げる3つの年の最後。寛保2年・文政6年と同じく、被害の中身は分からないとされる。区史は、江戸時代の品川で水害が大きくなるのは市街地のある品川宿の周辺に限られ、目黒川と立会川の氾濫や内水氾濫はほとんど記録が無いものの、毎年のように起きていただろうと見ている。",
        "year": 1856,
        "yearEnd": null,
        "yearText": "安政3年（1856年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「江戸時代の水害」81〜82頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1885-meguro-flood",
        "name": "連日の雨と台風で目黒川が増水し、下目黒村まで冠水する",
        "summary": "明治18年7月1日、梅雨の長雨に台風の豪雨が重なって目黒川が増水し、河口の品川宿から下目黒村まで谷底の低地が水につかった。",
        "description": "区史が『品川町史』の記録から抄録した明治・大正期の水害の最初。目黒川河口の北品川宿・南品川宿から、谷底低地に沿って居木橋、上大崎・下大崎村、谷山村、桐ヶ谷村が冠水し、冠水は下目黒村にまで達した。目黒川の谷底低地が一続きの水害地になることが分かる事例である。",
        "year": 1885,
        "yearEnd": null,
        "yearText": "明治18年（1885年）7月1日",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1898-meguro-flood",
        "name": "熱帯性低気圧の雨で目黒川が出水し、北品川で40戸が浸水する",
        "summary": "明治31年6月4日夜から5日にかけて、熱帯性低気圧の雨で目黒川が出水した。北品川では浸水家屋が40戸、浸水の深さは六尺と記録されている。",
        "description": "区史は『品川町史』をもとに、この出水を明治期の目黒川の水害の一つとして抄録する。六尺はおよそ1.8メートルにあたる。河口に近い北品川が最も被害を受けた地域として挙げられている。",
        "year": 1898,
        "yearEnd": null,
        "yearText": "明治31年（1898年）6月4〜5日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1908-meguro-flood",
        "name": "豪雨で目黒川が氾濫し、東海寺付近から荏原神社付近まで52戸が浸水する",
        "summary": "明治41年9月30日の豪雨で目黒川が氾濫した。北品川の東海寺付近から南品川の荏原神社付近にかけて52戸、大崎町の居木橋付近で37戸が浸水した。",
        "description": "区史が『品川町史』から抄録する明治の水害の一つ。被害が出た区間は目黒川の下流部で、現在の東海道本線から下流、荏原神社付近までの地域でしばしば氾濫が起きたという区史のまとめと重なる。区史は、被害が家屋の浸水で数えられているため、実際の氾濫はこれより広かった可能性があるとも注意している。",
        "year": 1908,
        "yearEnd": null,
        "yearText": "明治41年（1908年）9月30日",
        "era": "meiji",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-f0dec3262a"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1910-meguro-flood",
        "name": "連続した雨で目黒川が氾濫し、448戸が被害を受ける",
        "summary": "明治43年8月、8日から降り続いた雨で目黒川が氾濫し、被害家屋は448戸に上った。南北の天王付近や東海寺付近などで床上2尺余の浸水となった。",
        "description": "区史によれば、明治43年8月10日にかけて雨が連続したため被害が大きくなった。目黒川の氾濫による出水は、南北天王付近、東海寺付近、長者町・南馬場・北馬場で床上2尺余に達した。河口近くの砂洲の上にあって普段は目黒川の氾濫の被害が少ない猟師町にも被害が出た。",
        "year": 1910,
        "yearEnd": null,
        "yearText": "明治43年（1910年）8月10日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-f0dec3262a"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1911-takashio-ryoshimachi",
        "name": "台風の高潮で、猟師町から南品川の沿岸の482戸が浸水する",
        "summary": "明治44年7月26日、台風による高潮が起き、猟師町から南品川の沿岸部にかけて浸水家屋は482戸に上った。",
        "description": "区史が『品川町史』から抄録する明治期の高潮の被害。高潮は目黒川河口の砂洲に位置する猟師町から南品川の海沿いを襲った。同じ年の8月10日にも台風の豪雨で目黒川が氾濫している。",
        "year": 1911,
        "yearEnd": null,
        "yearText": "明治44年（1911年）7月26日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1911-tennozan-cliff",
        "name": "豪雨で品川神社天王山の南斜面が崩れ、下の家2軒が半壊する",
        "summary": "明治44年8月10日の雨で、品川神社のある天王山の南側斜面が崩れ、斜面の下の家2軒が半壊した。",
        "description": "区史が品川区の崖崩れの例として最初に挙げる災害。区史は、区内の崖崩れが目黒川左岸や立会川右岸で荏原台と低地の境をなす谷壁や、海食崖の地域に多いとまとめる。明治27年と明治43年にも崖崩れの記録があるが、詳細は不明とされている。",
        "year": 1911,
        "yearEnd": null,
        "yearText": "明治44年（1911年）8月10日",
        "era": "meiji",
        "areas": ["shinagawa"],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-548dab732d"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1917-takashio-taisho6",
        "name": "大型台風の高潮が猟師町などを襲い、区内でも死者が出る",
        "summary": "大正6年9月30日、大型台風による高潮が品川から千葉にかけての沿岸を襲った。品川区では猟師町から真浦・大井浜川・鈴ヶ森の沿岸の被害が大きかった。",
        "description": "区史によれば、高潮は午前2時と3時の2回起き、3時の高潮では猟師町で十数戸が流され4人が溺死した。潮位は品川信号所で3.2メートルに達した。品川町役場の報告では、町内の被害は死者4人、負傷者39人、流失23戸、全壊51戸、半壊66戸、床上浸水722戸にのぼる。この水害の被害総数は沿岸全体で死者504人、行方不明58人などとされる。",
        "year": 1917,
        "yearEnd": null,
        "yearText": "大正6年（1917年）9月30日",
        "era": "taisho",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1925-tachiai-flood",
        "name": "立会川が3度氾濫し、大井町・平塚村が河川の編入を求める",
        "summary": "大正14年の8月5日、8月26日、10月1日に立会川が氾濫した。11月、大井町会議長と平塚村会議長は、立会川を東京府の費用で管理する河川に加えるよう府知事に意見書を出した。",
        "description": "区史は、この意見書の記述から立会川の氾濫が小規模なものも含め頻発していたと読み取る。目黒川で氾濫が起きたときは立会川も同様だったと考えるべきだとも述べる。区史が引く資料は『大井町史』。",
        "year": 1925,
        "yearEnd": null,
        "yearText": "大正14年（1925年）8月〜11月",
        "era": "taisho",
        "areas": [
          "oi",
          "ebara"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「明治・大正期の水害」82〜84頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1929-sewage-flood",
        "name": "台風の豪雨で下水用水があふれ、品川町で910戸が浸水する",
        "summary": "昭和4年5月23日、台風の豪雨で品川町では下水用水があふれ、床下浸水770戸、床上浸水140戸の被害が出た。浸水の深さは路上で2〜4尺だった。",
        "description": "大正期までの水害は東海道本線より下流側の目黒川沿岸で目黒川の氾濫によるものが多かったが、この水害は線より上流側の3か所に分かれて起き、原因も目黒川ではなく下水用水の氾濫だった。区史は、目黒川の改修と新しい放水路の完成で下流の氾濫が無くなる一方、下水道など排水の不備による内水氾濫が現れたことの表れと見る。",
        "year": 1929,
        "yearEnd": null,
        "yearText": "昭和4年（1929年）5月23日",
        "era": "showa-pre",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "『品川町史』は発生日を6月23日と記している。区史は、台風による豪雨が起きたのは5月23日だとして、こちらを採っている。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「昭和期前半の水害」84〜85頁"
          }
        ],
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「昭和期前半の水害」84〜85頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1931-tachiai-flood",
        "name": "立会川の氾濫で1,789戸が浸水し、改修工事の促進が請願される",
        "summary": "昭和6年5月16日の降雨で立会川が氾濫し、床上・床下合わせて1,789戸が浸水した。翌6月、大井町長は東京府知事に立会川の改修工事の促進を請願した。",
        "description": "区史が引く請願書は、被害が広がった理由の一つに、改修工事が区間ごとに分けて行われているため、未改修の区間での被害が増したことを挙げ、改修は下流から順に上流へ進めてほしいと求めている。区史は、河川の改修で一部の地域の水害は減ったが、被害の程度が大きくなった地域が現れたり、水害の起きる場所が移ったりしたと整理する。",
        "year": 1931,
        "yearEnd": null,
        "yearText": "昭和6年（1931年）5月16日",
        "era": "showa-pre",
        "areas": [
          "oi",
          "ebara"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「昭和期前半の水害」84〜85頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1947-kathleen-typhoon",
        "name": "カスリーン台風で立会川が氾濫し、荏原・小山などが浸水する",
        "summary": "昭和22年9月13〜15日のカスリーン台風で、区内では立会川が氾濫し、小山・荏原・旗の台の各丁が浸水した。目黒川の本流は氾濫しなかった。",
        "description": "東京全体では利根川が決壊して荒川放水路より東の下町に大きな被害が出た水害だが、区史は品川区について、小山5・6丁目、荏原5・6・7丁目、旗の台1・2丁目の浸水を挙げる。このほか、西品川1丁目から平塚方面へ延びる目黒川の支谷や西大井4・5丁目の小さな谷、南大井でも内水氾濫による浸水があった。町丁目の名は区史が現行のものとして書いている。",
        "year": 1947,
        "yearEnd": null,
        "yearText": "昭和22年（1947年）9月13〜15日",
        "era": "showa-post",
        "areas": [
          "ebara",
          "oi"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「戦後の水害」85〜89頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1958-kanogawa-flood",
        "name": "狩野川台風で、戦後最大の浸水被害が区内に出る",
        "summary": "昭和33年9月26日の狩野川台風で、目黒川・立会川の氾濫と内水氾濫により、区内の浸水面積は約30万平方メートル、床上浸水1,295戸、床下浸水940戸に及んだ。",
        "description": "区史は、この水害が大河川の氾濫ではなく小河川の氾濫と内水氾濫によるものだった点を特徴に挙げる。浸水は東京の下町や多摩川下流のほぼ全域から、山の手台地の谷底低地まで広がった。区内の表では、西五反田・上大崎・東大井・西大井・戸越・平塚・中延・荏原・小山など広い範囲が被害地区に並び、これ以後の水害と比べても飛び抜けて大きいとされる。",
        "year": 1958,
        "yearEnd": null,
        "yearText": "昭和33年（1958年）9月26日",
        "era": "showa-post",
        "areas": [
          "shinagawa",
          "osaki",
          "oi",
          "ebara"
        ],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "同じ区史の「品川区の崖崩れ」の節は、この台風の日付を昭和32年9月26日と書いている。狩野川台風は昭和33年の災害で、戦後の水害の節と一覧表は33年としているため、そちらを採った。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          },
          {
            "claim": "戦後の水害の節の本文は、家屋の被害を「床上浸水1,295戸、床上浸水940戸」と書く。一覧表は床上1,295戸・床下940戸なので、後者は床下の誤りとして表に合わせた。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「戦後の水害」85〜89頁"
          }
        ],
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「戦後の水害」85〜89頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1958-kanogawa-cliff",
        "name": "狩野川台風の豪雨で、区内24か所の崖や擁壁が被害を受ける",
        "summary": "昭和33年9月26日の狩野川台風の大雨で、区内では崖や擁壁など24か所に被害が出た。被害は目黒川の左岸に集中している。",
        "description": "区史によれば、この日は日雨量が392.5ミリと気象庁の観測史上の記録で、最大の時間雨量は17〜18時の76ミリだった。区内の被害は、切土の崖で擁壁の無いもの7か所、擁壁のあるもの7か所、一部を盛土した崖10か所の計24か所。区史は、崖崩れが荏原台などの古い台地面を刻む谷の壁に集中する都内の傾向と一致すると述べ、立会川の流域に被害が無かったのは谷壁の高さや傾き、人の手の加わり方の違いが原因として考えられるとする。",
        "year": 1958,
        "yearEnd": null,
        "yearText": "昭和33年（1958年）9月26日",
        "era": "showa-post",
        "areas": [
          "shinagawa",
          "osaki"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "variants": [
          {
            "claim": "この節は日付を昭和32年9月26日と書いている。狩野川台風は昭和33年なので33年とした。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          }
        ],
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1966-typhoon4-cliff",
        "name": "台風4号で、区内7か所で崖崩れが起きる",
        "summary": "昭和41年6月28日の台風4号で、区内の7か所で崖崩れが起きた。被害が出たのは狩野川台風のときと同じような地域だった。",
        "description": "区史は、この台風による崖崩れを狩野川台風以降の例として挙げる。同じ日の浸水被害は、区の調査の一覧表では西大井・南大井・南品川・北品川・西五反田などで、床上4戸・床下105戸とされている。",
        "year": 1966,
        "yearEnd": null,
        "yearText": "昭和41年（1966年）6月28日",
        "era": "showa-post",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1969-cliff-survey",
        "name": "東京都が崖と擁壁を調べ、区内で60か所が危険度大とされる",
        "summary": "昭和44年度、東京都首都整備局が都区内の崖・擁壁を調べ、品川区では1,657か所のうち60か所の危険度が大きいと指摘した。",
        "description": "危険度の大きい崖は、目黒川左岸の北品川と東五反田、目黒川右岸の西品川、そして西大井に集まっている。区史は、この調査を区内の崖崩れの記述の締めくくりに載せている。",
        "year": 1969,
        "yearEnd": null,
        "yearText": "昭和44年度（1969年度）",
        "era": "showa-post",
        "areas": [
          "shinagawa",
          "osaki",
          "oi"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「品川区の崖崩れ」91〜93頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1970-thunderstorm-tachiai",
        "name": "雷雨で立会川があふれ、床下浸水が529戸に及ぶ",
        "summary": "昭和45年9月3日の雷雨で、立会川が東大井3丁目付近であふれ、東大井で270戸、西大井4・5丁目で237戸などの床下浸水が出た。",
        "description": "羽田航空気象台の観測では雨量は35.5ミリだったが、2時間足らずに集中して降ったため、流れ下るのが速い区内の川と下水があふれた。区史はこれを、弱い雨が長く降るなら水害は起きにくく、短時間に強く降ると浸水するという性質の典型例として挙げる。昭和33年以降の水害一覧では、立会川が溢れたのは狩野川台風を除くとこの回だけで、ほかはすべて内水氾濫だった。",
        "year": 1970,
        "yearEnd": null,
        "yearText": "昭和45年（1970年）9月3日",
        "era": "showa-post",
        "areas": ["oi"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "variants": [
          {
            "claim": "本文は被害を「計259戸」と書くが、内訳（270戸＋237戸＋22戸）を足すと529戸で、一覧表の床下浸水529戸と合う。本文の合計は誤りとみて、529戸とした。",
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「戦後の水害」85〜89頁"
          }
        ],
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "一 自然編（三）人為による自然の変化と災害「戦後の水害」85〜89頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1620-myokokuji-onari",
        "name": "将軍が妙国寺に44度も御成りになる",
        "summary": "元和6年から寛永12年までの約16年に、将軍が南品川の妙国寺を44度訪れたと、同寺の記録に残る。",
        "description": "区史は妙国寺の記録から、将軍の御成りの日付を44回分挙げる。最後は寛永12年10月2日で、以後の御成りは無い。この年は武家諸法度で大名の参勤交代が制度になった年にあたり、それまで将軍が西国大名の参勤を品川のはずれまで送迎し、そのついでに寺へ立ち寄っていたが、制度化とともにやめたことを記録が示すのだろうと、区史は解釈している（これは区史の見方で、記録自体が理由を述べているわけではない）。",
        "year": 1620,
        "yearEnd": 1635,
        "yearText": "元和6年（1620年）3月13日〜寛永12年（1635年）10月2日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "temple",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-11e5d5f153"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「御殿山」401〜407頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1640-gotenyama-chakai",
        "name": "将軍家光が御殿山で大茶会を開き、沢庵も招かれる",
        "summary": "寛永17年9月16日、三代将軍徳川家光が毛利秀元に命じて御殿山で大規模な茶会を開いた。東海寺の沢庵も召された。",
        "description": "区史は『徳川実紀』をもとに、この茶会に家光をはじめ御三家・老中らが連なり、茶室などを新築して、金銀をあしらった膳具だけでも500人分を用意したと紹介する。東海寺にいた沢庵は酒を賜り、将軍に望まれて一首を詠んだ。区史は、参勤交代が確立して将軍が大名の送迎をしなくなった後も、御殿山の御殿は将軍家の行事に使われたらしいと述べる。",
        "year": 1640,
        "yearEnd": null,
        "yearText": "寛永17年（1640年）9月16日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "culture",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": ["pe-takuan-soho"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「御殿山」401〜407頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1651-suzugamori-keijo",
        "name": "鈴ヶ森の刑場が設けられる",
        "summary": "慶安4年、大井村浜川町の南、東海道の西側の田畑5反歩が召し上げられ、江戸の南の刑場として鈴ヶ森刑場がつくられた。",
        "description": "区史によれば、北の浅草小塚原に対する江戸の南の刑場が鈴ヶ森で、幕府の公文書では小塚原・鈴ヶ森とは呼ばず、単に「浅草」「品川」と書くことが多い。寛文11年（1671年）6月には一部を百姓地へ戻し、元禄10年の検地帳には「獄門場 1反2畝歩 村持」と出てくる。",
        "year": 1651,
        "yearEnd": null,
        "yearText": "慶安4年（1651年）",
        "era": "kinsei",
        "areas": ["oi"],
        "categories": [
          "site",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "relatedPlaces": ["pl-436b7b608c"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「鈴ヶ森の刑場」449〜450頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1772-kagata-ganbun",
        "name": "寄洲を新地にしたいと、猟師町の年寄らが願い出る",
        "summary": "明和9年9月、南品川猟師町の年寄と百姓が、目黒川河口の寄洲約5,000坪を新地にしたいと奉行所に願い出た。利田新地の始まり。",
        "description": "願書によれば、寄洲を耕地ではなく家作地として築き、猟師や小商人を置くこと、河口に溜まった土砂で築きながら川浚えも行うことが狙いだった。区史は、普通の新田開発と違い、はじめから町地をつくることをねらっていたとみる。幕府は翌安永2年閏3月、艀下船の差配役を条件とする案は認めないと申し渡し、年寄は願人から離れた。",
        "year": 1772,
        "yearEnd": null,
        "yearText": "明和9年（1772年）9月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1834-kagata-shinchi"],
        "relatedPeople": [],
        "relatedPlaces": ["pl-086da1e672"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「利田新地の開発」408〜413（開発願書）頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1774-kagata-ninka",
        "name": "利田新地の築立てが認可される",
        "summary": "安永3年5月13日、願人の治兵衛に、約1町歩の新地を築くことが認可された。地代金は10両、鍬下年季は3年。",
        "description": "区史によれば、金主は江戸中橋の兵助、証人は多摩郡中野村の万右衛門で、完成の保証として万右衛門の持地8町歩を質地に入れた。新地から北品川宿へ架ける橋は長さ20間余・幅2間と定められた。この認可のとおり、4年目に検地を受けて高入れとなるはずだったが、波に洗われて工事が進まず、検地は何度も延期された。",
        "year": 1774,
        "yearEnd": null,
        "yearText": "安永3年（1774年）5月13日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1772-kagata-ganbun",
          "ev-1834-kagata-shinchi"
        ],
        "relatedPeople": [],
        "relatedPlaces": ["pl-086da1e672"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「利田新地の開発」413〜415（幕府の認可と実施計画）頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1803-kyowa-tsunami",
        "name": "享和3年の津波で、猟師町との証文が流される",
        "summary": "享和3年の津波で、利田新地の願人と南品川猟師町が取り交わしていた証文が流失した。",
        "description": "区史は、文化5年に利田新地の願人が猟師町あてに出した一札の中で、先の願人が約束していた証文が享和3年の津波で流失していることを理由に挙げていると記す。津波の規模や被害の詳細は、区史は述べていない。",
        "year": 1803,
        "yearEnd": null,
        "yearText": "享和3年（1803年）",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "water"
        ],
        "certainty": "fact",
        "relatedEvents": ["ev-1774-kagata-ninka"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「治兵衛の死亡と願人の交替」416〜417頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1856-kagata-saikenchi",
        "name": "台場の築造で、利田新地が再び検地される",
        "summary": "安政3年12月、品川台場の工事で利田新地の一部が土置場や通路になったため再び検地が行われ、新地は2反4畝9歩に減った。",
        "description": "天保5年の検地で3反8畝余だった利田新地は、安政元年に始まる台場の築造で、堀をつくるための土置場と兵員の通行道が地内に設けられた。再検地ではそれらを除いた11筆が新地として改められた。明治の地券交付願では19筆5反9畝余となっており、区史は、このあたりが案外正確な実面積だったのではないかとみている。",
        "year": 1856,
        "yearEnd": null,
        "yearText": "安政3年（1856年）12月",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "life",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1834-kagata-shinchi",
          "ev-1853-daiba-start"
        ],
        "relatedPeople": [],
        "relatedPlaces": ["pl-086da1e672"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（一）品川区地域の町と村「検地」417〜418頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1792-gundai-kaieki",
        "name": "関東郡代の伊奈氏が改易され、品川は大貫次右衛門の支配となる",
        "summary": "寛政4年3月、関東郡代の伊奈忠尊が家事不取締りで改易され、約200年続いた伊奈氏の郡代時代が終わった。品川地方の担当は代官の大貫次右衛門になった。",
        "description": "関東の天領は天正18年の家康の関東入部以来、伊奈氏が代々支配してきた。改易後は勘定奉行が郡代を兼ね、その下に5人の代官が土地を分けて支配する形になった。品川地方は大貫次右衛門が寛政4年4月から受け持ち、のち中村八太夫らが続く。区史が引く歴代代官の表は『品川町史』による。",
        "year": 1792,
        "yearEnd": null,
        "yearText": "寛政4年（1792年）3月",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi",
          "osaki",
          "ebara"
        ],
        "categories": ["admin"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「関東郡代」459〜463頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1805-kanto-torishimari",
        "name": "関東取締出役（八州廻り）が置かれる",
        "summary": "文化2年6月、関東の治安を強めるため、関東取締出役、俗にいう八州廻りが設けられた。",
        "description": "郡代の伊奈家が改易されてから、関東農村の治安はいっそう不安定になっていた。幕府は代官の手付のうち10年以上勤めた有能な8人を選び、手代や足軽をつけて、天領・私領の別なく月に1回、1か所7日ほどの日程で巡視させ、無宿者や博徒の取り締まりと農民の不穏な動きの監視にあたらせた。",
        "year": 1805,
        "yearEnd": null,
        "yearText": "文化2年（1805年）6月",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi",
          "osaki",
          "ebara"
        ],
        "categories": ["admin"],
        "certainty": "fact",
        "relatedEvents": ["ev-1792-gundai-kaieki"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「関東取締出役の設置」483〜484頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1855-ansei-jishin",
        "name": "安政の大地震で、品川宿の家々が大破し、台場の建物も崩れる",
        "summary": "安政2年10月2日の夜の大地震で、品川宿は家数1,691軒のうち1,422軒が大破するなど大きな被害を受けた。人の被害は少なかった。",
        "description": "区史が引く三宿名主の報告では、品川宿は半潰14軒・大破1,422軒・小破160軒などで、怪我人は多いが命にかかわる者はいなかった。ただし寺社の門前地では4人の死者が出たらしい。品川台場では建物が崩れて地中に沈み、火災が4日間続き、守備の会津藩士に50人の死者が出た。台場の火薬には燃え移らなかった。周辺の村々は、東大森・馬込・小山など低地や河川下流の地帯で被害が目立ち、大井・戸越・上大崎・下大崎・居木橋などの台地上の村は被害が無かった。",
        "year": 1855,
        "yearEnd": null,
        "yearText": "安政2年（1855年）10月2日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi",
          "osaki",
          "ebara"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「安政の地震と品川地区」498〜506頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1863-kumiai-saikyoka",
        "name": "関東取締出役が、組合村の取り締まりを再び強める",
        "summary": "文久3年4月10日、幕府は関東取締出役を通じて組合村の取り締まりを再強化する触を出した。7月にはより具体的な指示を出した。",
        "description": "触は、文政の改革で組合村をつくった趣意に戻れと求め、朽ちた杭を建て直すこと、江戸の者が近郊の田畑をつぶして家を建てることを戒めることを定めた。桐ヶ谷村・谷山村などは連印帳の提出が遅れて督促を受けた。区史は、時期が幕末に近く世情が騒然としていたため効果は薄く、7月に取出役が品川宿へ出張して改めて強い触を出したと述べる。",
        "year": 1863,
        "yearEnd": null,
        "yearText": "文久3年（1863年）4月10日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "osaki",
          "oi"
        ],
        "categories": ["admin"],
        "certainty": "fact",
        "relatedEvents": ["ev-1805-kanto-torishimari"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「取締りの強化」506〜508頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1866-bushu-ikki",
        "name": "武州一揆が起き、品川方面の村々にも急ぎの廻状が回る",
        "summary": "慶応2年6月14日、武州の山間部で大一揆が起こり、武州7郡・上州2郡に広がった。品川方面の村々にも関東取締出役から廻状が回された。",
        "description": "物価高と長州征伐で困窮した山あいの人々が、飯能宿の米屋などを打ちこわしたのが発端で、参加者は10万人を超えるともいわれる。区史は、江戸周辺の大一揆で幕府の受けた衝撃も大きく、取締出役が「容易ならざる事件」として、一刻も遅らせず時刻を書き入れて順に回すよう廻状を出したと紹介する（下蛇窪村の伊藤家文書）。区内での打ちこわしがあったとは述べていない。",
        "year": 1866,
        "yearEnd": null,
        "yearText": "慶応2年（1866年）6月14日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi",
          "osaki",
          "ebara"
        ],
        "categories": [
          "war",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「武州一揆」512〜513頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1867-satsuma-yakiuchi",
        "name": "薩摩藩邸焼討ち事件が起き、脱出した浪士が品川沖へ向かう",
        "summary": "慶応3年12月25日の明け方、江戸の三田にある薩摩藩邸などが幕府方に焼き討ちされた。逃れた浪士約30人は品川沖の薩摩藩の汽船で脱出した。",
        "description": "討幕派が関東の浪士を藩邸にかくまって江戸の治安を乱し、幕府を挑発したため、庄内藩を中心とする約2,000人が藩邸を囲んだ。区史は、これが大坂の会津・桑名藩兵を激昂させて鳥羽・伏見の戦いにつながり、薩長が幕府武力討伐の口実をつかむことになったと整理する。品川宿は三田に近く、浪士の海上からの脱出路にもあたり、人ごとではない事件だった。",
        "year": 1867,
        "yearEnd": null,
        "yearText": "慶応3年（1867年）12月25日",
        "era": "kinsei",
        "areas": ["shinagawa"],
        "categories": [
          "war",
          "admin"
        ],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「薩摩藩邸焼討事件」515〜517頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1867-satsuma-kaji",
        "name": "浪士隊が品川宿を通り、南品川で「薩摩火事」が起きる",
        "summary": "薩摩藩邸焼討ちの当日、逃れた浪士約50人が東海道を品川宿へ進み、空砲を撃ち込み、南品川で火事を起こした。品川では「薩摩火事」と呼ばれる。",
        "description": "下蛇窪村の名主見習の報告書によれば、浪士隊は歩行新宿の遊女宿で放火を思いとどまり、北品川宿の旅籠屋では関東取締出役の服部桂之助らと鉢合わせして双方が散り散りになった。南品川宿では旅籠屋と隣の煮売屋に空砲を撃ち込み、火薬を仕掛けた草箒を屋根へ投げ上げたところ、折からの烈風で燃え広がった。続いて問屋場の役人から刀を取り上げ、大井村御林町の家へ上がり込んで飯を食べたという。",
        "year": 1867,
        "yearEnd": null,
        "yearText": "慶応3年（1867年）12月25日",
        "era": "kinsei",
        "areas": [
          "shinagawa",
          "oi"
        ],
        "categories": ["war"],
        "certainty": "fact",
        "relatedEvents": ["ev-1867-satsuma-yakiuchi"],
        "relatedPeople": [],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（二）行政組織「品川における薩摩浪士」517〜520頁"
          }
        ],
        "verifiedAt": "2026-11-23"
      },
      {
        "id": "ev-1853-keiko-daiba-diary",
        "name": "伊藤景湖が品川台場の築造事務を記録する",
        "summary": "下蛇窪村の名主だった伊藤景湖は、品川台場の築造事務に携わり、工事の様子を日記に残した。",
        "description": "景湖は当時の芝高輪にあった如来寺境内の事務所に詰めた。区史が紹介する日記は嘉永6年8月20日から安政元年12月23日までを収め、台場の配置や船の姿を描いた彩色図も含む。",
        "year": 1853,
        "yearEnd": 1854,
        "yearText": "嘉永6年（1853年）〜安政元年（1854年）",
        "era": "kinsei",
        "areas": [
          "ebara",
          "shinagawa"
        ],
        "categories": ["culture"],
        "certainty": "fact",
        "relatedEvents": ["ev-1853-daiba-start"],
        "relatedPeople": ["pe-ito-keiko"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜松斎景湖」1082〜1083頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1863-keiko-manuscripts",
        "name": "伊藤景湖が大野景山の地誌を書き写す",
        "summary": "下蛇窪村の伊藤景湖は、大井村の大野景山が編んだ『南浦地名考』と『大井邑地名録再校』を書き写した。",
        "description": "『南浦地名考』は大井を中心に品川・大崎・荏原などの地名を扱う。区史編さんの際、伊藤家に伝わる写本の表紙の記載から、著者が景山であることが確認された。",
        "year": 1863,
        "yearEnd": null,
        "yearText": "文久3年（1863年）4月",
        "era": "kinsei",
        "areas": [
          "oi",
          "ebara"
        ],
        "categories": ["culture"],
        "certainty": "fact",
        "relatedEvents": [
          "ev-1808-keizan-nanushi",
          "ev-1812-keiko"
        ],
        "relatedPeople": [
          "pe-ono-keizan",
          "pe-ito-keiko"
        ],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜格斎景山」1078〜1079頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      },
      {
        "id": "ev-1865-keizan-kuhi",
        "name": "大井の鹿島神社に大野景山の句碑が建てられる",
        "summary": "大井村の名主を務めた俳人、大野景山をしのび、後任の大野永綏が句碑を建てた。",
        "description": "区史によると、碑の裏には永綏が書いた鹿島神社と来迎院の由来や、来迎院にあった柳の清水についての文章が刻まれた。永綏も俳人で、乙雨と号し、のちに五世杜格斎を継いだ。",
        "year": 1865,
        "yearEnd": null,
        "yearText": "元治2年（1865年）",
        "era": "kinsei",
        "areas": ["oi"],
        "categories": ["culture"],
        "certainty": "fact",
        "relatedEvents": ["ev-1808-keizan-nanushi"],
        "relatedPeople": ["pe-ono-keizan"],
        "sources": [
          {
            "ref": "sgw-kushi-tsushi-jo",
            "locator": "四 近世編（六）生活と文化「杜格斎景山」1080頁"
          }
        ],
        "verifiedAt": "2026-11-22"
      }
  ]
};
