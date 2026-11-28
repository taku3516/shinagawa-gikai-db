// 区の意見募集（パブリックコメント）と、委員会で区が報告した議題との照合を確かめる。
import assert from "node:assert/strict";
import test from "node:test";
import { planKeys, withinWindow, matchTopics, cleanTitle } from "./public-comment-council.mjs";

const item = (id, title, start, end) => ({ id, title, start, end });
const topic = (dateIso, title, extra = {}) => ({ yearId: "r07", meetingId: "m1", sessionId: "s1", committee: "文教委員会", dateIso, title, ...extra });

test("件名から照合用の鍵を作る（区名・括弧書き・全角を吸収する）", () => {
  assert.deepEqual(planKeys("品川区こども計画"), ["こども計画"]);
  assert.deepEqual(planKeys("総合実施計画(改定)"), ["総合実施計画"]);
  assert.deepEqual(planKeys("(仮称)ジェンダー平等を推進するための条例に盛り込むべき考え方"), ["ジェンダー平等を推進するための条例に盛り込むべき考え方"]);
  assert.deepEqual(planKeys("しながわ健康プラン２１（第二次）"), ["しながわ健康プラン21"]);
  // 複数の計画をまとめて募集したものは、それぞれの計画名で探す
  assert.deepEqual(planKeys("障害者計画・第7期品川区障害福祉計画・第3期品川区障害児福祉計画"),
    ["障害者計画", "第7期障害福祉計画", "第3期障害児福祉計画"]);
});

test("募集期間の前後だけを対象にする", () => {
  const pc = item("2024-011", "DX推進基本方針", "2025-02-01", "2025-02-28");
  assert.equal(withinWindow(pc, "2025-05-13"), true);
  assert.equal(withinWindow(pc, "2024-06-01"), true);
  // 3年前の「策定」は別の版なので含めない
  assert.equal(withinWindow(pc, "2022-04-19"), false);
  assert.equal(withinWindow(pc, "2027-01-01"), false);
});

test("委員会の議題に計画名を含むものを日付順に返す", () => {
  const pc = item("2024-012", "品川区こども計画", "2025-02-01", "2025-02-21");
  const topics = [
    topic("2025-04-15", "品川区こども計画の策定"),
    topic("2025-01-20", "品川区こども計画（素案）に係るパブリックコメントの実施"),
    topic("2025-01-20", "品川区子ども読書活動推進計画"),
    topic("2021-04-15", "品川区こども計画の策定")
  ];
  assert.deepEqual(matchTopics(pc, topics).map(t => t.dateIso + " " + t.title), [
    "2025-01-20 品川区こども計画（素案）に係るパブリックコメントの実施",
    "2025-04-15 品川区こども計画の策定"
  ]);
});

test("同じ会議の同じ議題は1件にまとめる", () => {
  const pc = item("2024-012", "こども計画", "2025-02-01", "2025-02-21");
  const same = topic("2025-04-15", "品川区こども計画の策定");
  assert.equal(matchTopics(pc, [same, { ...same }]).length, 1);
});

test("開始日が分からない案件は終了日を基準にする", () => {
  const pc = item("2026-004", "第12次品川区交通安全計画（素案）", null, "2026-08-31");
  assert.equal(matchTopics(pc, [topic("2026-06-01", "第12次品川区交通安全計画（素案）")]).length, 1);
});

test("議題名の先頭に混じった発言の切れ端を取り除く", () => {
  assert.equal(cleanTitle("を聴取したいと思います。 初めに、(1)「品川区障害者計画（素案）」に係るパブリックコメントの実施"),
    "「品川区障害者計画（素案）」に係るパブリックコメントの実施");
  assert.equal(cleanTitle("順序を入れ替えまして、はじめに、(2)品川区ＤＸ推進基本方針の策定"), "品川区ＤＸ推進基本方針の策定");
  assert.equal(cleanTitle("品川区こども計画の策定"), "品川区こども計画の策定");
  // 計画名の中の括弧つき番号は残す
  assert.equal(cleanTitle("「障害者計画（素案）」（1）の報告"), "「障害者計画（素案）」（1）の報告");
});
