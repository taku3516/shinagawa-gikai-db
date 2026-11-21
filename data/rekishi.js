// 品川区議会DB データファイル（「品川の歴史」の共通設定）
//
// 歴史コンテンツ全体で使う語彙と出典台帳をここに1回だけ書く。
// 出来事・地点・人物・地名の各データは、この語彙のIDと出典IDを参照するだけにする。
// 同じ資料名やURLを各レコードに書き写すと、資料のURLが変わったときに
// 直し漏れが出るため。
//
// 出典は sources に1件ずつ書き、各レコードは { ref: "<出典ID>", locator: "該当箇所" }
// で参照する。URLを持たない出典（紙の資料など）は url を省く。画面では
// 押せないことが分かるように破線の囲みで示す。
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.rekishi = {
  "schemaVersion": 1,
  "updatedAt": "2026-11-19",
  "note": "品川区の地域史を、出来事・場所・人物・地名から横断してたどれるようにしたものです。出典を確認できた情報だけを掲載しています。",
  "disclaimer": "これは品川区が運営しているものではありません。正確な内容は各項目の出典をご確認ください。",

  // 時代区分。年表の見出しと絞り込みに使う。
  // fromYear / toYear は並べ替えと絞り込みのための目安で、厳密な境界ではない。
  // 年が確定できない項目は year を null にし、era だけで位置づける。
  "eras": [
    { "id": "genshi", "label": "原始", "note": "旧石器・縄文・弥生", "fromYear": -30000, "toYear": 299, "order": 1 },
    { "id": "kodai", "label": "古代", "note": "古墳・飛鳥・奈良・平安", "fromYear": 300, "toYear": 1184, "order": 2 },
    { "id": "chusei", "label": "中世", "note": "鎌倉・室町・戦国", "fromYear": 1185, "toYear": 1602, "order": 3 },
    { "id": "kinsei", "label": "近世", "note": "江戸時代", "fromYear": 1603, "toYear": 1867, "order": 4 },
    { "id": "meiji", "label": "明治", "note": "", "fromYear": 1868, "toYear": 1912, "order": 5 },
    { "id": "taisho", "label": "大正", "note": "", "fromYear": 1912, "toYear": 1926, "order": 6 },
    { "id": "showa-pre", "label": "昭和戦前・戦中", "note": "", "fromYear": 1926, "toYear": 1945, "order": 7 },
    { "id": "showa-post", "label": "昭和戦後", "note": "", "fromYear": 1945, "toYear": 1989, "order": 8 },
    { "id": "heisei-reiwa", "label": "平成・令和", "note": "", "fromYear": 1989, "toYear": 2100, "order": 9 }
  ],

  // 地区。品川区公式「区の紹介」が示す5地区に合わせる。
  // 区域外の出来事や、地区を特定できないものは "unknown" にする。
  "areas": [
    { "id": "shinagawa", "label": "品川地区", "order": 1 },
    { "id": "osaki", "label": "大崎地区", "order": 2 },
    { "id": "oi", "label": "大井地区", "order": 3 },
    { "id": "ebara", "label": "荏原地区", "order": 4 },
    { "id": "yashio", "label": "八潮地区", "order": 5 },
    { "id": "ward", "label": "区全域", "order": 6 },
    { "id": "unknown", "label": "地区不明", "order": 7 }
  ],

  // カテゴリー。出来事と地点の両方で使う。
  // group は画面上のまとまりで、絞り込みの並び順にも使う。
  "categories": [
    { "id": "site", "label": "史跡・遺跡", "group": "場所", "order": 1 },
    { "id": "temple", "label": "神社・寺院", "group": "場所", "order": 2 },
    { "id": "road", "label": "旧街道・古道", "group": "場所", "order": 3 },
    { "id": "water", "label": "坂・川・橋", "group": "場所", "order": 4 },
    { "id": "building", "label": "歴史的建造物", "group": "場所", "order": 5 },
    { "id": "industry", "label": "産業遺産", "group": "場所", "order": 6 },
    { "id": "nature", "label": "天然記念物", "group": "場所", "order": 7 },
    { "id": "lost", "label": "現存しない施設", "group": "場所", "order": 8 },
    { "id": "admin", "label": "行政・区政", "group": "できごと", "order": 9 },
    { "id": "transport", "label": "交通", "group": "できごと", "order": 10 },
    { "id": "war", "label": "戦争・災害", "group": "できごと", "order": 11 },
    { "id": "culture", "label": "文化・教育", "group": "できごと", "order": 12 },
    { "id": "life", "label": "くらし・産業", "group": "できごと", "order": 13 },
    { "id": "placename", "label": "地名・町名", "group": "ことば", "order": 14 }
  ],

  // 情報の確実性。画面では色ではなく語で示す。
  // 色だけで区別すると、色の見分けがつきにくい人に伝わらないため。
  "certainty": [
    { "id": "fact", "label": "確認済み", "description": "出典で確認できた事実です。" },
    { "id": "tradition", "label": "伝承", "description": "古くから語り継がれてきた話で、史料による裏付けはありません。" },
    { "id": "popular", "label": "俗説", "description": "広く知られていますが、史料による裏付けがないか、否定されています。" },
    { "id": "estimate", "label": "推定", "description": "資料から推定されたもので、確定していません。" }
  ],

  // 地名の種類。現在の町名と、もう無い村や宿の名前を取り違えないために分ける。
  "nameKinds": [
    { "id": "current-town", "label": "現町名", "order": 1 },
    { "id": "old-town", "label": "旧町名", "order": 2 },
    { "id": "old-village", "label": "旧村名", "order": 3 },
    { "id": "old-post", "label": "旧宿名", "order": 4 },
    { "id": "road", "label": "古道・旧街道", "order": 5 },
    { "id": "slope", "label": "坂", "order": 6 },
    { "id": "water", "label": "川・橋・池", "order": 7 },
    { "id": "other", "label": "その他", "order": 8 }
  ],

  // 地点の位置の種類。過去に存在した施設の位置を、現在地と混同させないために分ける。
  "locationKinds": [
    { "id": "current", "label": "現在地", "description": "いまもこの場所にあります。" },
    { "id": "former", "label": "かつての所在地", "description": "現在は存在しません。位置は当時のものです。" },
    { "id": "approximate", "label": "おおよその位置", "description": "正確な位置が特定できていません。" }
  ],

  // 出典台帳。各レコードは ref でここを参照する。
  "sources": [
    {
      "id": "sgw-bunkazai",
      "label": "品川区「指定文化財」",
      "publisher": "品川区",
      "url": "https://www.city.shinagawa.tokyo.jp/bunka/bunkazaikanko/1003758/index.html",
      "note": "品川・大崎・大井・荏原・その他の5地区別と、区内にある都・国の指定文化財。項目ごとに詳細ページがある。"
    },
    {
      "id": "sgw-kugaiyo",
      "label": "品川区「区の紹介」",
      "publisher": "品川区",
      "url": "https://www.city.shinagawa.tokyo.jp/kusei/kugaiyo/1004820/index.html",
      "note": "区を品川・大崎・大井・荏原・八潮の5地区に分ける区分の根拠。"
    },
    {
      "id": "sgw-80th",
      "label": "品川区「品川区制80周年記念」",
      "publisher": "品川区",
      "url": "https://www.city.shinagawa.tokyo.jp/kusei/kugaiyo/1004820/1004749.html",
      "note": "現在の品川区の成立日。"
    },
    {
      "id": "adeac-shinagawa",
      "label": "しながわデジタルアーカイブ",
      "publisher": "品川区立図書館",
      "url": "https://adeac.jp/shinagawa-city/top/",
      "note": "品川区史（通史編上巻・下巻）、品川の歴史、旧町村史、古文書・古地図、住居表示新旧対照表。本文は転載せず、事実の確認にのみ利用している。"
    },
    {
      "id": "sgw-rekishikan",
      "label": "品川歴史館",
      "publisher": "品川区",
      "url": "https://www.city.shinagawa.tokyo.jp/historyhp/1009711.html",
      "note": "常設展示・企画展・調査報告。"
    },
    {
      "id": "bunka-online",
      "label": "文化遺産オンライン",
      "publisher": "文化庁",
      "url": "https://online.bunka.go.jp/",
      "note": "国が指定・登録した文化財の個別ページ。品川区は21件（prefecture_cd=13&city_code=13109）。利用条件で本文の転用が禁じられているため、解説は転載せず、指定年月日・所在地・時代・法量などの事実だけを使っている。robots.txt の Crawl-Delay は10秒。"
    },
    {
      "id": "kunishitei",
      "label": "国指定文化財等データベース",
      "publisher": "文化庁",
      "url": "https://kunishitei.bunka.go.jp/bsys/index",
      "note": "国が指定・登録・選定した文化財の一元検索。区公式の「区内にある都および国の指定文化財」には指定年月日の欄が無いため、国指定分の日付をここで確かめた。都指定は載っていない。同名の別物があるので、所在地か所有者まで照合している。"
    },
    {
      "id": "sgw-library",
      "label": "品川区立図書館「品川ゆかりの人物」",
      "publisher": "品川区立図書館",
      "url": "https://library.city.shinagawa.tokyo.jp/tabid/337/Default.aspx",
      "note": "品川区にゆかりのある35人を生没年つきで紹介する地域資料のページ（2024年10月11日更新）。サイトの文書の権利は品川区に帰属すると明記されているため、評伝の本文は転載せず、生没年・住んだ場所・墓の場所・作品の所在といった事実だけを使っている。"
    },
    {
      "id": "shinchosha",
      "label": "新潮社 著者紹介",
      "publisher": "新潮社",
      "url": "https://www.shinchosha.co.jp/book/115621/",
      "note": "作品の刊行元による著者の略歴。区立図書館の記述と受賞年が食い違ったときの裏付けに使っている。"
    },
    {
      "id": "gsi-tile",
      "label": "地理院タイル",
      "publisher": "国土地理院",
      "url": "https://maps.gsi.go.jp/development/ichiran.html",
      "note": "淡色地図と年代別の空中写真。古地図・今昔比較の背景に使用。"
    },
    {
      "id": "gsi-address",
      "label": "国土地理院 住所検索API",
      "publisher": "国土地理院",
      "url": "https://msearch.gsi.go.jp/address-search/AddressSearch",
      "note": "住所から緯度経度を求めるのに使用。"
    }
  ],

  // データファイルの一覧。各ページはここを見て、必要なものだけを読み込む。
  // 件数が増えて1本が重くなったときは、ここを時代別の分割ファイルに
  // 差し替えればページ側を直さずに済む（data/site.js の years と同じ考え方）。
  "files": {
    "events": "data/rekishi-events.js",
    "places": "data/rekishi-places.js",
    "people": "data/rekishi-people.js",
    "names": "data/rekishi-names.js",
    "areas": "data/rekishi-areas.js"
  }
};
