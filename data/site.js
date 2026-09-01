// 品川区議会DB データファイル（自動生成の書式: window.SHINAGAWA_DB に登録する）
window.SHINAGAWA_DB = window.SHINAGAWA_DB || { site: null, years: {} };
window.SHINAGAWA_DB.site = {
  "siteName": "品川区議会DB",
  "lead": "品川区議会の公式情報を基に、住民が読みやすい形に整理したページです。",
  "disclaimer": "これは品川区が運営しているものではありません。正確な議決結果・日程・資料は必ず品川区議会公式サイトを確認してください。",
  // 共通ナビの中身。役割で4群に分け、群ごとに見出しを出す（site-nav.js）。
  // ラベルは名詞にする。「〜を見る」を付けると分類名が動詞に埋もれ、
  // どのリンクも同じ長さの帯に見えてしまう。
  // url はページのファイル名そのままにすること。現在地の判定に使っている。
  // type は "video"（録画・中継）のときだけ指定する。
  "navGroups": [
    {
      "label": "議会",
      "items": [
        {
          "label": "会議のまとめ",
          "url": "kaigi.html"
        },
        {
          "label": "会議録・録画",
          "url": "kaigiroku.html"
        },
        {
          "label": "請願・陳情",
          "url": "seigan.html"
        },
        {
          "label": "意見書・決議",
          "url": "ikensho.html"
        },
        {
          "label": "予算・決算",
          "url": "yosan-kessan.html"
        },
        {
          "label": "行政評価",
          "url": "gyosei.html"
        }
      ]
    },
    {
      "label": "人とお金",
      "items": [
        {
          "label": "政治家名簿",
          "url": "giin.html"
        },
        {
          "label": "選挙",
          "url": "senkyo.html"
        },
        {
          "label": "政務活動費",
          "url": "seimu.html"
        },
        {
          "label": "政治資金",
          "url": "seijishikin.html"
        },
        {
          "label": "選挙収支",
          "url": "senkyo-shushi.html"
        }
      ]
    },
    {
      "label": "地域・検索",
      "items": [
        {
          "label": "区のニュース",
          "url": "news.html"
        },
        {
          "label": "町会区域",
          "url": "chokai-map.html"
        },
        {
          "label": "横断検索",
          "url": "kensaku.html"
        }
      ]
    },
    {
      "label": "公式サイト",
      "items": [
        {
          "type": "minutes",
          "label": "会議録検索システム",
          "url": "https://gikai.city.shinagawa.tokyo.jp/search"
        },
        {
          "type": "video",
          "label": "インターネット中継",
          "url": "https://gikaichukei.city.shinagawa.tokyo.jp/"
        },
        {
          "type": "video",
          "label": "録画（会議名から）",
          "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_list"
        },
        {
          "type": "video",
          "label": "録画（議員名から）",
          "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=speaker_list"
        }
      ]
    }
  ],
  "years": [
    {
      "id": "r08",
      "label": "令和8年",
      "file": "data/r08.js",
      "supplement": "data/r08-complete.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    },
    {
      "id": "r07",
      "label": "令和7年",
      "file": "data/r07.js",
      "supplement": "data/r07-complete.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    },
    {
      "id": "r06",
      "label": "令和6年",
      "file": "data/r06.js",
      "supplement": "data/r06-complete.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    },
    {
      "id": "r05",
      "label": "令和5年",
      "file": "data/r05.js",
      "supplement": "data/r05-complete.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    },
    {
      "id": "r04",
      "label": "令和4年",
      "file": "data/r04.js",
      "supplement": "data/r04-complete.js",
      "committees": true,
      "plenaryMinutes": true,
      "available": true
    },
    {
      "id": "r03",
      "label": "令和3年",
      "file": "data/r03.js",
      "supplement": "data/r03-complete.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "r02",
      "label": "令和2年",
      "file": "data/r02.js",
      "supplement": "data/r02-complete.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "r01",
      "label": "令和元年",
      "file": "data/r01.js",
      "supplement": "data/r01-complete.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h30",
      "label": "平成30年",
      "file": "data/h30.js",
      "supplement": "data/h30-complete.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h29",
      "label": "平成29年",
      "file": "data/h29.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h28",
      "label": "平成28年",
      "file": "data/h28.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h27",
      "label": "平成27年",
      "file": "data/h27.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h26",
      "label": "平成26年",
      "file": "data/h26.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h25",
      "label": "平成25年",
      "file": "data/h25.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h24",
      "label": "平成24年",
      "file": "data/h24.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h23",
      "label": "平成23年",
      "file": "data/h23.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h22",
      "label": "平成22年",
      "file": "data/h22.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h21",
      "label": "平成21年",
      "file": "data/h21.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h20",
      "label": "平成20年",
      "file": "data/h20.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h19",
      "label": "平成19年",
      "file": "data/h19.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h18",
      "label": "平成18年",
      "file": "data/h18.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h17",
      "label": "平成17年",
      "file": "data/h17.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h16",
      "label": "平成16年",
      "file": "data/h16.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h15",
      "label": "平成15年",
      "file": "data/h15.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h14",
      "label": "平成14年",
      "file": "data/h14.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    },
    {
      "id": "h13",
      "label": "平成13年",
      "file": "data/h13.js",
      "available": true,
      "committees": true,
      "plenaryMinutes": true
    }
  ],
  "defaultYear": "r08",
  "draftPdfNote": "校正原稿PDFは正式な会議録の公開後に削除されます。リンクが開けない場合は会議録検索システムで探してください。",
  "sources": [
    {
      "label": "区議会の日程一覧",
      "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/result"
    },
    {
      "label": "議員紹介（議員名簿 五十音順）",
      "url": "https://gikai.city.shinagawa.tokyo.jp/profile/50on"
    },
    {
      "label": "品川区議会インターネット中継",
      "url": "https://gikaichukei.city.shinagawa.tokyo.jp/"
    },
    {
      "label": "録画中継 会議名で探す",
      "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=gikai_list"
    },
    {
      "label": "録画中継 議員名で探す",
      "url": "https://gikaichukei.city.shinagawa.tokyo.jp/?tpl=speaker_list"
    },
    {
      "label": "品川区議会 会議録検索ページ（校正原稿PDFの一覧）",
      "url": "https://gikai.city.shinagawa.tokyo.jp/search"
    },
    {
      "label": "品川区議会 会議録検索システム（平成13年5月以降の正式な会議録）",
      "url": "https://kaigiroku.city.shinagawa.tokyo.jp/index.php/"
    },
    {
      "label": "品川区議会 意見書・決議等",
      "url": "https://gikai.city.shinagawa.tokyo.jp/katsudou/pass"
    },
    {
      "label": "品川区 予算（公式）",
      "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/yosan/index.html"
    },
    {
      "label": "品川区 決算（公式）",
      "url": "https://www.city.shinagawa.tokyo.jp/PC/kuseizyoho/kessan/index.html"
    }
  ],
  "sourcesNote": "このサイトの内容は上記の公式ページのみを一次情報としています。要約・言い換えには誤りが含まれる可能性があるため、必ずリンク先の一次情報を確認してください。"
};

/* 会議録全文の受け皿。
 *
 * 全文は会議1件につき1ファイル（data/minutes/<年>/<会議ID>.js）に分けてあり、
 * 会議を開いたときだけ読み込む。年データにまとめると1年30MBになり、同期
 * 読み込みしている画面が表示できなくなるため（docs/fulltext-minutes-plan.md）。
 *
 * 読み込みは fetch ではなく <script> で行う。index.html をダブルクリックして
 * file:// で開く使い方を残すためで、fetch は file:// ではCORSで止まる。
 */
window.SHINAGAWA_DB.minutes = window.SHINAGAWA_DB.minutes || {};
window.SHINAGAWA_DB.registerMinutes = function (payload) {
  if (!payload || !payload.id) return;
  window.SHINAGAWA_DB.minutes[payload.id] = payload;
};
