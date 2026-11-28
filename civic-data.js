(() => {
  "use strict";

  const db = window.SHINAGAWA_DB;
  const requests = new Map();

  /** @param {unknown} value @returns {string} */
  function normalize(value) {
    return String(value ?? "").normalize("NFKC").replace(/\s+/g, "").toLowerCase();
  }

  /** @param {{meetingId: string, number: string, title?: string, summary?: string, links?: object[]}} bill @returns {string} */
  function billId(bill) {
    const number = normalize(bill.number);
    const identity = number || "record-" + keyFor([bill.title, bill.summary, ...(bill.links || []).map(link => link.url)].map(normalize).join("|"));
    return `${bill.meetingId}:${identity}`;
  }

  /** @param {{meetingId: string, number: string, title?: string, summary?: string, links?: object[]}} bill @returns {string} */
  function billUrl(bill) {
    return "gian.html?" + new URLSearchParams({ id: billId(bill) });
  }

  /** @param {string} text @returns {string} */
  function keyFor(text) {
    let hash = 2166136261;
    for (const char of text) hash = Math.imul(hash ^ char.codePointAt(0), 16777619);
    return (hash >>> 0).toString(36);
  }

  /** @returns {object[]} */
  function bills() {
    return db.site.years.map(meta => db.years[meta.id]).filter(Boolean).flatMap(year => {
      const meetings = new Map((year.meetings || []).map(meeting => [meeting.id, meeting]));
      const unique = new Map();
      for (const bill of year.bills || []) {
        const id = billId(bill);
        const previous = unique.get(id);
        if (!previous) unique.set(id, bill);
        else {
          const links = new Map([...previous.links || [], ...bill.links || []].map(link => [link.url, link]));
          unique.set(id, { ...previous, links: [...links.values()] });
        }
      }
      return [...unique.values()].map(bill => ({
        ...bill, id: billId(bill), yearId: year.id, year: year.label, updatedAt: year.updatedAt,
        meeting: meetings.get(bill.meetingId)
      }));
    });
  }

  /** @param {string} src @returns {Promise<void>} */
  function loadScript(src) {
    if (!requests.has(src)) {
      const pending = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => {
          script.remove();
          reject(new Error(`${src} を読み込めませんでした。`));
        };
        document.head.append(script);
      }).catch(error => {
        requests.delete(src);
        throw error;
      });
      requests.set(src, pending);
    }
    return requests.get(src);
  }

  /** @param {string[]} [ids] @returns {Promise<void>} */
  async function loadYears(ids) {
    await Promise.all(db.site.years.filter(meta => meta.available && (!ids || ids.includes(meta.id))).map(async meta => {
      await loadScript(meta.file);
      if (meta.supplement) await loadScript(meta.supplement);
    }));
  }

  /** @param {Date} [now] @returns {string} */
  function today(now = new Date()) {
    const parts = new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(now);
    return ["year", "month", "day"].map(type => parts.find(part => part.type === type).value).join("-");
  }

  /** @param {{start: string,end: string}} session @param {string} date @returns {object} */
  function sessionProgress(session, date) {
    const duration = (Date.parse(session.end) - Date.parse(session.start)) / 86400000 + 1;
    const offset = (Date.parse(date) - Date.parse(session.start)) / 86400000;
    if (offset < 0) return { state: "upcoming", duration, daysUntil: -offset };
    if (offset >= duration) return { state: "ended", duration };
    return { state: "active", duration, day: offset + 1, remaining: duration - offset - 1, percent: Math.round((offset + 1) / duration * 100) };
  }

  /** @param {Record<string,string|number|null>[]} rows @param {string[]} [keys] @returns {string} */
  function csv(rows, keys = Object.keys(rows[0] || {})) {
    const cell = value => {
      let field = String(value ?? "");
      if (typeof value === "string" && /^(?:[\t\r\n]|\s*[=+\-@])/.test(field.normalize("NFKC"))) field = "'" + field;
      return '"' + field.replace(/"/g, '""') + '"';
    };
    const lines = [keys.map(cell).join(","), ...rows.map(row => keys.map(key => cell(row[key])).join(","))];
    return "\uFEFF" + lines.join("\r\n") + "\r\n";
  }

  /** @param {string} name @param {string} content @param {string} type @returns {void} */
  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /**
   * 表決1件を、その会期の公式表の列順で議員ごとに展開する。
   * @param {{session: string, symbols: string}} vote
   * @returns {{group: string, memberId: string, symbol: string}[]}
   */
  function voteEntries(vote) {
    const session = window.SHINAGAWA_CIVIC_SOURCES?.voteSessions?.[vote?.session];
    if (!session) throw new Error(`表決の会期 ${vote?.session} の並び順が未登録です`);
    if (session.roster.length !== vote.symbols.length) {
      throw new Error(`表決の会期 ${vote.session} は ${session.roster.length} 列ですが、記号が ${vote.symbols.length} 個です`);
    }
    return session.roster.map(({ group, memberId }, index) => ({ group, memberId, symbol: vote.symbols[index] }));
  }

  /**
   * 議員1人の記号を返す。その会期の表に載っていない議員は null。
   * @param {{session: string, symbols: string}} vote @param {string} memberId @returns {string | null}
   */
  function memberVote(vote, memberId) {
    return voteEntries(vote).find(entry => entry.memberId === memberId)?.symbol ?? null;
  }

  /**
   * 地区（地域センター名の先頭）に属する町丁目を、主な地区のものと一部だけのものに分ける。
   * @param {{name: string, associations: {areas: {town: string, range: string}[]}[]}[]} regions 町会データの地域センター
   * @param {string} district 地区名（「大崎」など）
   * @param {Record<string, string>} townDistricts 地区をまたぐ町丁目の主な地区
   * @returns {{towns: string[], partial: {town: string, primary: string, ranges: string[]}[]}}
   */
  function districtTowns(regions, district, townDistricts) {
    const ranges = new Map();
    for (const region of regions.filter(entry => entry.name.startsWith(district))) {
      for (const association of region.associations) {
        for (const area of association.areas) {
          if (!ranges.has(area.town)) ranges.set(area.town, []);
          if (!ranges.get(area.town).includes(area.range)) ranges.get(area.town).push(area.range);
        }
      }
    }
    const order = (a, b) => a.localeCompare(b, "ja", { numeric: true });
    const all = [...ranges.keys()].sort(order);
    const isPrimary = town => !townDistricts[town] || townDistricts[town] === district;
    return {
      towns: all.filter(isPrimary),
      partial: all.filter(town => !isPrimary(town)).map(town => ({ town, primary: townDistricts[town], ranges: ranges.get(town).sort(order) }))
    };
  }

  window.SHINAGAWA_CIVIC = { billId, billUrl, bills, csv, districtTowns, download, loadScript, loadYears, memberVote, normalize, sessionProgress, today, voteEntries };
})();
