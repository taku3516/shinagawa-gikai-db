// 区の意見募集（パブリックコメント）の計画と、その計画を根拠・目的に挙げる事業（事務事業評価シート）との照合を確かめる。
import assert from "node:assert/strict";
import test from "node:test";
import { citeKeys, matchProjects, groupByProject } from "./public-comment-jigyo.mjs";

const project = (id, name, fields = {}) => ({ id, name, section: "子ども育成課", legal: "", purpose: "", overview: "", ...fields });

test("版の印（第○期）と中間改定を外した計画名で探す", () => {
  assert.deepEqual(citeKeys("第九期品川区介護保険事業計画"), ["介護保険事業計画"]);
  assert.deepEqual(citeKeys("品川区自殺対策計画中間改定"), ["自殺対策計画"]);
  assert.deepEqual(citeKeys("品川区こども計画"), ["こども計画"]);
});

test("計画名を根拠法令・目的・概要に挙げる事業を、挙げている欄とともに返す", () => {
  const item = { id: "2024-012", title: "品川区こども計画" };
  const found = matchProjects(item, [
    project("r07-1", "青少年育成活動", { overview: "◆総合計画である「品川区こども計画」を令和6年度に策定する。" }),
    project("r07-2", "保育園運営費", { overview: "保育の質を高める。" }),
    project("r07-3", "子育て支援事業", { legal: "児童福祉法、品川区こども計画" })
  ]);
  assert.deepEqual(found.map(entry => [entry.id, entry.field]), [["r07-3", "根拠法令等"], ["r07-1", "概要"]]);
});

test("事業が別の版の計画を挙げているときは外す", () => {
  const item = { id: "2023-011", title: "第九期品川区介護保険事業計画" };
  const found = matchProjects(item, [
    project("r07-1", "介護保険制度推進委員会費", { purpose: "◆第九期介護保険事業計画の運営にあたり" }),
    project("r07-2", "旧計画の評価", { purpose: "第8期介護保険事業計画の実績を評価する" }),
    project("r07-3", "制度周知", { purpose: "介護保険事業計画に基づき周知する" })
  ]);
  assert.deepEqual(found.map(entry => entry.id), ["r07-1", "r07-3"]);
});

test("【】の括弧書きも（）と同じに扱う", () => {
  const item = { id: "2024-007", title: "しながわ健康プラン21（第二次）" };
  const found = matchProjects(item, [project("r07-1", "健やか親子学習", { legal: "母子保健法、しながわ健康プラン21【第二次】" })]);
  assert.equal(found.length, 1);
});

test("同じ事業が複数年度の評価シートに出るときは1件にまとめ、最新年度へつなぐ", () => {
  const grouped = groupByProject([
    { id: "r07-44-1", name: "健康センター事業費", section: "健康課", field: "目的", evaluationYear: "令和7年度" },
    { id: "r06-44-1", name: "健康センター事業費", section: "健康課", field: "目的", evaluationYear: "令和6年度" },
    { id: "r05-44-1", name: "健康センター事業費", section: "健康課", field: "概要", evaluationYear: "令和5年度" },
    { id: "r07-44-9", name: "健康学習費", section: "大井保健センター", field: "根拠法令等", evaluationYear: "令和7年度" }
  ]);
  assert.deepEqual(grouped, [
    { id: "r07-44-9", ids: ["r07-44-9"], name: "健康学習費", section: "大井保健センター", field: "根拠法令等", years: ["令和7年度"] },
    // 古い年度の事業ページからも逆引きできるよう、全年度のIDを持つ
    { id: "r07-44-1", ids: ["r07-44-1", "r06-44-1", "r05-44-1"], name: "健康センター事業費", section: "健康課", field: "目的", years: ["令和5年度", "令和6年度", "令和7年度"] }
  ]);
});
