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
        "description": "移されたのは南品川三丁目（現在の南品川二丁目）に住んでいた漁師たちで、兜島と呼ばれていた人家のない寄州が町の始まりです。のちに多くの漁民が住み、幕府へ魚介類を献上する御菜肴八ヶ浦のひとつとして、江戸湾の漁業の中心となりました。",
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
          "ev-1884-ryoshimachi-fire"
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
        "name": "大井権現台貝塚から縄文時代の土器や土偶が出土する",
        "summary": "広町の大井鉄道工場内にあった大井権現台貝塚から、深鉢形土器・みみずく土偶残片・土版残欠・貝器・弭形角器が出土している。いずれも縄文時代後期から晩期のもの。",
        "description": "文化遺産オンラインには、大井権現台貝塚を出土地とする資料が7件登録されている。出土地は「東京都品川区広町2丁目大井鉄道工場内」と記され、時代は縄文時代の後期（前2000〜前1000年）または後期から晩期（前2000〜前400年）とされる。土版残欠は長さ8.2センチメートル、幅5.9センチメートル、厚さ2.3センチメートル。東大井を出土地とする鉢形土器も1件あり、いずれも東京国立博物館が所蔵している。年表の原始の項目は、この出土資料によるものです。",
        "year": null,
        "yearEnd": null,
        "yearText": "縄文時代後期〜晩期（前2000年〜前400年ごろ）",
        "era": "genshi",
        "areas": ["oi"],
        "categories": ["site", "life"],
        "certainty": "fact",
        "relatedEvents": [],
        "relatedPeople": [],
        "sources": [{ "ref": "bunka-online", "locator": "「土版残欠」（448667）、「深鉢形土器」（493574）、「みみずく土偶残片」（490440・490868・459183）、「貝器」（518071）、「弭形角器」（522539）、「鉢形土器」（578890）" }],
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
        "relatedPeople": [],
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
        "relatedPeople": ["pe-takuan-soho"],
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
        "sources": [{ "ref": "bunka-online", "locator": "「旧島津家本邸 本館」（411775）、「旧島津家本邸 事務所」（441386）" }],
        "verifiedAt": "2026-11-21"
      }
  ]
};
