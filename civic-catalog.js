(() => {
  "use strict";
  const db = window.SHINAGAWA_DB;
  const civic = window.SHINAGAWA_CIVIC;
  const official = "https://gikai.city.shinagawa.tokyo.jp/katsudou/petition";
  const data = window.SHINAGAWA_CIVIC_SOURCES;

  /** @param {object[]} [links] @returns {string|null} */
  function sourceUrl(links) {
    return links?.find(item => item.url?.startsWith("https://"))?.url || null;
  }

  /** @param {string} id @param {string} title @param {string} [period] @param {string} [url] @param {string} [source] @param {string} [updated] @param {string} [result] @returns {object} */
  function record(id, title, period, url, source, updated, result) {
    return { id, title, period: period || null, url: url || null, source: source || null, updated: updated || null, result: result || null };
  }

  /** @param {string[]} files @returns {Promise<void>} */
  async function load(files) {
    await Promise.all(files.map(file => civic.loadScript("data/" + file + ".js")));
  }

  const datasets = {
    members: {
      label: "議員名簿", sources: ["members", "former-members"],
      rows: () => [db.membersData, db.formerMembersData].flatMap((group, index) => group.members.map(item =>
        record(item.id, item.name, item.serviceHistory, (index ? "giin.html?view=former-ward" : "giin.html") + "#member-" + item.id,
          item.profileUrl || group.sourceUrl, group.updatedAt, item.party)))
    },
    elections: {
      label: "選挙結果", sources: ["elections"],
      rows: () => db.electionsData.elections.flatMap(item => (item.candidates || []).map((candidate, index) =>
        ({ ...record(item.id + "-" + (index + 1), candidate.name, item.electionDate, "senkyo.html", sourceUrl(item.links) || sourceUrl(db.electionsData.referenceSites), db.electionsData.updatedAt, candidate.result),
          election: item.title, party: candidate.party || null, votes: candidate.votesDisplay || null })))
    },
    meetings: {
      label: "会議・会議録のメタデータ", years: true,
      rows: () => Object.values(db.years).flatMap(year => (year.meetings || []).map(item =>
        ({ ...record(item.id, item.name, year.label, "kaigi.html?" + new URLSearchParams({ year: year.id, meeting: item.id }),
          sourceUrl(item.links), year.updatedAt, item.type),
          minutes: (item.links || []).filter(entry => /^minutes/.test(entry.type || "")).map(entry => entry.url).join(" ") || null })))
    },
    bills: {
      label: "議案・議決結果", years: true,
      rows: () => civic.bills().map(item => ({ ...record(item.id, item.title, item.year, civic.billUrl(item), sourceUrl(item.links), item.updatedAt, item.result),
        number: item.number || null, session: item.meetingId }))
    },
    petitions: {
      label: "請願・陳情", sources: ["petitions"],
      rows: () => window.SHINAGAWA_PETITIONS.items.map(item => ({ ...record(item.id, item.title, item.acceptedYear,
        "seigan.html#" + item.id, item.official?.url || official, null, item.official?.plenaryResult || item.history.at(-1)?.result), number: item.numberLabel }))
    },
    finance: {
      label: "予算・決算", sources: ["fiscal"],
      rows: () => db.fiscalData.fiscalYears.map(item => ({ ...record(item.id, item.label + " 予算・決算", item.label,
        "yosan-kessan.html#" + item.id, sourceUrl(item.initial?.links) || sourceUrl(item.settlement?.links), db.fiscalData.updatedAt, item.settlement?.status),
        initial: item.initial?.amount || null, revenue: item.settlement?.revenue || null, expenditure: item.settlement?.expenditure || null,
        account: item.settlement?.accountBasis || "一般会計", budgetCurrentYen: item.settlement?.budgetCurrentYen ?? null,
        revenueYen: item.settlement?.revenueYen ?? null, expenditureYen: item.settlement?.expenditureYen ?? null,
        settlementSource: item.settlement?.amountSource?.url || null }))
    },
    seimu: {
      label: "政務活動費", sources: ["seimu"],
      rows: () => window.SHINAGAWA_SEIMU.fiscalYears.flatMap(year => year.periods.flatMap(period => period.recipients.map(item =>
        record(item.id, item.name, year.label + " " + period.label, "seimu.html", sourceUrl(item.documents) || period.sourceUrl, null, item.kind))))
    },
    political: {
      label: "政治資金", sources: ["seijishikin"],
      rows: () => window.SHINAGAWA_SEIJISHIKIN.organizations.flatMap(item => (item.reports || []).filter(report => report.url).map(report =>
        record(item.id + "-" + report.year, item.name, report.year, "seijishikin.html?q=" + encodeURIComponent(item.name), report.url)))
    },
    regions: {
      label: "地域センター・町会", sources: ["chokai"],
      rows: () => db.chokai.regions.flatMap(item => item.associations.map(association =>
        record(item.name + ":" + association.name, association.name, null, "watashi-no-chiiki.html", item.sourceUrl, item.sourceUpdated, item.name)))
    },
    projects: {
      label: "事業カルテ",
      rows: () => data.projects.map(item => record(item.id, item.name, item.startYear, "jigyo.html?id=" + item.id, sourceUrl(item.sources), null, item.office))
    }
  };

  /** @param {string} key @returns {Promise<object[]>} */
  async function dataset(key) {
    const item = datasets[key];
    if (!item) throw new Error("指定されたデータセットがありません。");
    if (item.years) await civic.loadYears();
    if (item.sources) await load(item.sources);
    return item.rows();
  }

  window.SHINAGAWA_CATALOG = { datasets, dataset, load };
})();
