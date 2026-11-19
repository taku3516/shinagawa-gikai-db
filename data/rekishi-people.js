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
      "relatedEvents": ["ev-1684-jokyo-calendar", "ev-1963-shibukawa-grave-moved"],
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
      "relatedEvents": ["ev-1858-yodo-confinement", "ev-1872-yodo-death", "ev-1954-yodo-grave-moved"],
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
      "relatedEvents": ["ev-1890-shungaku-death"],
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
      "relatedEvents": ["ev-1919-itagaki-death"],
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
      "relatedEvents": ["ev-1909-ito-death"],
      "sources": [{ "ref": "sgw-bunkazai", "locator": "大井地区の指定文化財 史跡第19号「伊藤博文墓」" }],
      "verifiedAt": "2026-11-19"
    }
  ]
};
