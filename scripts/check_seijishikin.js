#!/usr/bin/env node
"use strict";

global.window = {};
require("../data/seijishikin.js");

const data = window.SHINAGAWA_SEIJISHIKIN;
const errors = [];
const expected = {
  total: 105,
  categories: { "party-branch": 18, other: 87 },
  fundManagement: 40,
  levels: { "衆議院": 4, "都議": 5, "区議・区長": 31 }
};

if (!data || !Array.isArray(data.organizations)) errors.push("データ本体を読み込めません");
const organizations = data?.organizations || [];
const ids = new Set();
const normalizedNames = new Set();
const categoryIds = new Set((data?.categories || []).map(item => item.id));
const levels = new Set(data?.fundManagementLevels || []);

for (const org of organizations) {
  if (!org.id || ids.has(org.id)) errors.push(`IDが空または重複: ${org.id || "(空)"}`);
  ids.add(org.id);
  const normalized = String(org.name || "").normalize("NFKC").replace(/\s+/g, "");
  if (!normalized || normalizedNames.has(normalized)) errors.push(`団体名が空または重複: ${org.name || "(空)"}`);
  normalizedNames.add(normalized);
  if (!categoryIds.has(org.category)) errors.push(`未定義の主分類: ${org.name} / ${org.category}`);
  for (const level of org.fundManagement || []) {
    if (!levels.has(level)) errors.push(`未定義の資金管理団体区分: ${org.name} / ${level}`);
  }
}

const categoryCounts = Object.fromEntries([...categoryIds].map(category => [
  category, organizations.filter(org => org.category === category).length
]));
const fundOrganizations = organizations.filter(org => (org.fundManagement || []).length);
const levelCounts = Object.fromEntries([...levels].map(level => [
  level, fundOrganizations.filter(org => org.fundManagement.includes(level)).length
]));

if (organizations.length !== expected.total) errors.push(`全団体数: ${organizations.length}（期待値 ${expected.total}）`);
for (const [category, count] of Object.entries(expected.categories)) {
  if (categoryCounts[category] !== count) errors.push(`${category}: ${categoryCounts[category]}（期待値 ${count}）`);
}
if (fundOrganizations.length !== expected.fundManagement) errors.push(`資金管理団体数: ${fundOrganizations.length}（期待値 ${expected.fundManagement}）`);
for (const [level, count] of Object.entries(expected.levels)) {
  if (levelCounts[level] !== count) errors.push(`${level}: ${levelCounts[level]}（期待値 ${count}）`);
}

for (const sourceName of ["registry", "tokyoReports", "ministryReports"]) {
  const source = data?.sources?.[sourceName];
  if (!source?.label || !/^https:\/\//.test(source.url || "")) errors.push(`公式参照先が不正: ${sourceName}`);
}

if (errors.length) {
  console.error(`政治資金データ検査: ${errors.length}件の問題`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log("政治資金データ検査: OK");
console.log(JSON.stringify({ total: organizations.length, categories: categoryCounts, fundManagement: fundOrganizations.length, levels: levelCounts }, null, 2));
