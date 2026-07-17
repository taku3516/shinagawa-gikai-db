/* 令和8年の委員会質疑・答弁の試験掲載データ。 */
(() => {
  "use strict";

  const year = window.SHINAGAWA_DB && window.SHINAGAWA_DB.years && window.SHINAGAWA_DB.years.r08;
  if (!year) throw new Error("令和8年データの読み込み後に r08-committee-test.js を読み込んでください");

  year.updatedAt = "2026-07-18";
  year.committeeSessions = [
    {
      "id": "r08-20260612-gu",
      "meetingId": "r08-m06",
      "date": "2026年6月12日",
      "dateIso": "2026-06-12",
      "committee": "議会運営委員会",
      "time": "午後1時00分〜午後1時17分",
      "status": "試験掲載・校正原稿",
      "overview": "短時間の会議ながら、一般質問原稿の取扱い、議員研修会、議員バッジの仕様と費用について、質問・確認・要望と回答が記録されています。質問に対する明確な回答がない場合は、無理に答弁を補わず、その旨を記載しています。",
      "topics": [
        {
          "id": "manuscript-replacement",
          "title": "一般質問原稿の差し替え",
          "agenda": "その他（議長会等の報告）",
          "exchanges": [
            {
              "id": "ando-manuscript",
              "speaker": "安藤たい作委員",
              "kind": "意見・要望",
              "question": "手話通訳者への配慮と提出期限の原則は理解する一方、よりよい質問にするため、やむを得ず原稿を修正する場合もあるとして、議長への相談時には柔軟に対応してほしいと求めました。",
              "respondent": "渡辺ゆういち議長",
              "answer": "議長はこの発言に先立ち、提出後は原則として差し替えを行わず、やむを得ない場合は議長と区議会事務局長へ相談する運用を示しました。委員の要望後に、個別の追加回答は記録されていません。"
            }
          ]
        },
        {
          "id": "member-training",
          "title": "議員研修会の時間と内容",
          "agenda": "その他（議員研修会）",
          "exchanges": [
            {
              "id": "nishimoto-training-time",
              "speaker": "西本たか子委員",
              "kind": "確認",
              "question": "品川区商店街連合会会長を講師とする研修会の所要時間が1時間でよいか確認しました。",
              "respondent": "渡辺ゆういち議長",
              "answer": "所要時間は1時間であると回答しました。"
            },
            {
              "id": "nishimoto-training-content",
              "speaker": "西本たか子委員",
              "kind": "意見・要望",
              "question": "大井町トラックスの研修では、高輪ゲートウェイシティなどJR東日本による周辺のまちづくりの全体像も振り返り、その中で大井町の特徴を明確にしてほしいと求めました。",
              "respondent": "渡辺ゆういち議長",
              "answer": "議長は、要望の趣旨を『品川圏』というテーマとして確認しました。内容への反映を確約する追加回答は記録されていません。"
            }
          ]
        },
        {
          "id": "member-badge",
          "title": "議員バッジの仕様と費用",
          "agenda": "その他",
          "exchanges": [
            {
              "id": "nishimura-badge-spec",
              "speaker": "西村直子委員",
              "kind": "提案",
              "question": "経費負担を軽くするため、議員バッジを金メッキ仕様などへ見直す検討を進めてほしいと提案しました。",
              "respondent": "渡辺ゆういち議長",
              "answer": "金価格の上昇を受けて全国の議会でも見直しの機運があると説明し、正副議長と議会運営委員会の正副委員長で相談した上で、方向性を報告するとしました。"
            },
            {
              "id": "tsukamoto-badge-price",
              "speaker": "塚本よしひろ委員",
              "kind": "質問",
              "question": "正規の議員バッジには、どの程度の費用がかかるのか尋ねました。",
              "respondent": "大澤区議会事務局長",
              "answer": "価格は変動するため確定額を示すのは難しいとした上で、金製は金メッキのレプリカのおよそ1.5倍であり、例としてレプリカが5,000円なら金製は7,500円程度になると説明しました。"
            },
            {
              "id": "nishimoto-badge-scope",
              "speaker": "西本たか子委員",
              "kind": "確認",
              "question": "見直しの対象が、改選後に議会費で購入するバッジなのか、紛失・破損時に議員個人が購入するバッジも含むのか確認しました。",
              "respondent": "渡辺ゆういち議長",
              "answer": "主な検討対象は改選後に議会費で購入するバッジであり、個人負担で再購入する場合の選択は各議員の自由との考えを示しました。その上で、関係する正副議長・正副委員長で相談し、方向性を報告するとしました。"
            }
          ]
        }
      ],
      "links": [
        {
          "type": "minutesDraft",
          "label": "公式の校正原稿PDFを読む",
          "url": "https://gikai.city.shinagawa.tokyo.jp/wp-content/themes/shinagawakugikai/pdf/2026.06.12gu.pdf"
        },
        {
          "type": "official",
          "label": "公式の会議録検索ページ",
          "url": "https://gikai.city.shinagawa.tokyo.jp/search"
        }
      ]
    }
  ];
})();
