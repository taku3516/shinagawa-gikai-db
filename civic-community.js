(() => {
  "use strict";
  const db = window.SHINAGAWA_DB;
  const civic = window.SHINAGAWA_CIVIC;
  const { esc, link, list, sources, terms, select, input, filters, matches, review, showError } = window.SHINAGAWA_CIVIC_UI;
  const query = new URLSearchParams(location.search);

  /** @param {object[]} people @returns {Map<string,string>} */
  function nameIndex(people) {
    const names = new Map();
    const conflicts = new Set();
    for (const person of people) {
      for (const name of [person.name, ...(person.aliases || [])]) {
        const key = civic.normalize(name);
        if (names.has(key) && names.get(key) !== person.id) conflicts.add(key);
        names.set(key, person.id);
      }
    }
    conflicts.forEach(key => names.delete(key));
    return names;
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function members(root) {
    await Promise.all(["members", "former-members", "people", "speaker-members"].map(name => civic.loadScript("data/" + name + ".js")));
    const roster = [...db.membersData.members, ...db.formerMembersData.members];
    const names = nameIndex(db.peopleData.people);
    const years = db.site.years.filter(year => year.available);
    const requestedMember = query.get("id");
    const requestedYear = query.get("year");
    const active = roster.find(member => member.id === requestedMember);
    const selectedYear = requestedYear === "all" || years.some(year => year.id === requestedYear)
      ? requestedYear : years[0].id;
    if (requestedMember && !active) {
      root.innerHTML = `<p>指定された議員は未収録です。</p><p>${link("議員の一覧", "giin-katsudo.html")}</p>`;
      return;
    }
    root.innerHTML = `<form class="civic-controls">${select("id", "議員", [["", "全員を比較"], ...roster.map(item => [item.id, item.name])], active?.id)}
      ${select("year", "暦年", [["all", "全収録年"], ...years.map(item => [item.id, item.label])], selectedYear)}<button>表示する</button></form>
      <p>代表・一般質問は、年別データに収録された質問者ごとの登壇記録を1件として数えます。委員会質疑は、既存の発言者別索引の件数です。</p>
      <div data-activity role="region" aria-label="活動と比較"></div>`;
    const form = root.querySelector("form");
    const content = root.querySelector("[data-activity]");
    let request = 0;
    const render = async () => {
      const current = ++request;
      const settings = filters(form);
      const member = roster.find(item => item.id === settings.get("id"));
      const year = settings.get("year");
      content.innerHTML = '<p role="status">質問履歴を読み込んでいます。</p>';
      try {
        await civic.loadYears(year === "all" ? undefined : [year]);
        if (current !== request) return;
        const rows = Object.values(db.years).filter(item => year === "all" || item.id === year)
          .sort((a, b) => years.findIndex(meta => meta.id === a.id) - years.findIndex(meta => meta.id === b.id))
          .flatMap(item => (item.questions || []).map(question => ({
            ...question, year: item.label, yearId: item.id, person: question.memberId || names.get(civic.normalize(question.member))
          })));
        const committees = person => Object.entries(db.memberQuestionIndex[person.id] || {}).filter(([id]) => year === "all" || id === year);
        if (!member) {
          const entries = roster.map(person => {
            const plenary = rows.filter(item => item.person === person.id).length;
            const committee = committees(person);
            const count = committee.reduce((sum, [, value]) => sum + value, 0);
            return `<tr><th scope="row">${link(person.name, "giin-katsudo.html?" + new URLSearchParams({ id: person.id, year }))}</th>
              <td>${plenary || "収録記録なし"}</td><td>${committee.length ? count : "収録記録なし"}</td></tr>`;
          }).join("");
          content.innerHTML = `<h2 id="member-comparison">収録された活動の比較</h2>
            <table class="civic-table" aria-labelledby="member-comparison">
              <thead><tr><th scope="col">議員</th><th scope="col">代表・一般質問</th><th scope="col">委員会質疑</th></tr></thead>
              <tbody>${entries}</tbody>
            </table>`;
          return;
        }
        const activities = rows.filter(item => item.person === member.id);
        const votes = window.SHINAGAWA_CIVIC_SOURCES;
        const voteColumn = votes.voteRoster.findIndex(item => item.memberId === member.id);
        const voteRows = voteColumn < 0 || (year !== "r07" && year !== "all") ? [] : civic.bills()
          .filter(item => votes.votes[item.id])
          .map(item => {
            const code = votes.votes[item.id].symbols[voteColumn];
            return link(item.title, civic.billUrl(item)) + "　" + (window.SHINAGAWA_LEGISLATION.voteNames[code] || "不明");
          });
        const parties = [...new Set(activities.map(item => [item.year, item.party].filter(Boolean).join(" ")))];
        const rosterUrl = (db.formerMembersData.members.includes(member) ? "giin.html?view=former-ward" : "giin.html") + "#member-" + member.id;
        const lookup = "kensaku.html?" + new URLSearchParams({ q: member.name });
        content.innerHTML = `<article><h2>${esc(member.name)}</h2>
          ${terms([["名簿記載の会派", esc(member.party)], ["常任委員会", esc(member.standingCommittee)],
            ["特別委員会", esc(member.specialCommittee)], ["当選回数", esc(member.elections)]])}
          <p>${link("政治家名簿の詳細", rosterUrl)} ／ ${link("この議員をフォロー", "follow.html?" + new URLSearchParams({ kind: "議員", value: member.name }))}
          ${member.party ? " ／ " + link("会派をフォロー", "follow.html?" + new URLSearchParams({ kind: "会派", value: member.party.replace(/[（(].*$/, "") })) : ""}</p>
          <h3>選挙・得票</h3>${list((member.electionHistory || []).map(esc))}
          <p>${link("選挙アーカイブの得票履歴", "senkyo.html?" + new URLSearchParams({ person: member.id, q: member.name }))}</p>
          <h3>登壇時の資料にある会派表記</h3>${list(parties.map(esc))}
          <h3>代表・一般質問の履歴（収録 ${activities.length}件）</h3>
          ${list(activities.map(item => `${esc([item.year, item.date, item.party, item.kind].filter(Boolean).join(" ／ "))} ${link("会議の質問一覧", "kaigi.html?" + new URLSearchParams({ year: item.yearId, meeting: item.meetingId }) + "#questions-" + item.meetingId)}<br>${esc((item.topics || []).join("／"))}${sources(item.links)}`))}
          <h3>委員会質疑・暦年別</h3>
          ${list(committees(member).sort().reverse().map(([id, count]) => link(`${years.find(item => item.id === id)?.label || id}（${count}件）`, "kaigiroku.html?" + new URLSearchParams({ member: member.id, year: id }))))}
          <h3>政務活動費</h3>${sources(member.activityExpenses)}
          <h3>政治資金</h3>${sources(member.fundReports)}
          <h3>表決の履歴</h3>${list(voteRows)}
          ${voteRows.length ? sources([votes.voteSource]) : ""}
          <h3>請願・関連ニュース</h3><p>確認済みの関連データは未収録です。</p><p>${link("氏名で横断検索", lookup)}</p>
          ${review()}</article>`;
      } catch (error) {
        if (current === request) showError(content, error);
      }
    };
    form.addEventListener("submit", event => {
      event.preventDefault();
      const url = new URL(location.href);
      url.search = filters(form).toString();
      history.replaceState(null, "", url);
      render();
    });
    await render();
  }

  /** @param {HTMLElement} root @returns {Promise<void>} */
  async function areas(root) {
    await Promise.all(["chokai", "rekishi", "rekishi-places", "rekishi-areas", "news-items", "events"].map(name => civic.loadScript("data/" + name + ".js")));
    const regions = db.chokai.regions;
    const districts = db.rekishiAreas.items.map(item => [item.id.replace(/^ar-/, ""), item.name.replace(/地区$/, "")]);
    const selected = districts.some(([id]) => id === query.get("area")) ? query.get("area") : districts[0][0];
    root.innerHTML = `<form class="civic-controls">${select("area", "地区", districts, selected)}
      ${select("town", "町丁目", [["", "すべての町丁目"]])}<button>表示する</button></form><div data-area></div>`;
    const form = root.querySelector("form");
    const content = root.querySelector("[data-area]");
    const render = () => {
      const id = form.elements.area.value;
      const district = districts.find(([entry]) => entry === id)[1];
      const areaRegions = regions.filter(region => region.name.startsWith(district));
      const towns = [...new Set(areaRegions.flatMap(region => region.associations.flatMap(association => association.areas.map(area => area.town))))].sort((a, b) => a.localeCompare(b, "ja", { numeric: true }));
      const previous = form.elements.town.value || query.get("town");
      form.elements.town.replaceWith(Object.assign(document.createElement("select"), { name: "town" }));
      const townSelect = form.elements.town;
      for (const town of ["", ...towns]) townSelect.append(new Option(town || "すべての町丁目", town));
      townSelect.value = towns.includes(previous) ? previous : "";
      const town = townSelect.value;
      const keyword = town || district;
      const townName = town.replace(/[0-9０-９]+丁目$/, "");
      const historical = db.rekishiPlaces.items.filter(item => item.areas.includes(id) && (!town || civic.normalize(item.address).includes(civic.normalize(townName + town.match(/[0-9０-９]+/)?.[0]))));
      const articles = window.SHINAGAWA_NEWS.items.filter(item => town
        ? matches([item.locations], town) : item.locations?.some(location => towns.some(name => civic.normalize(name).startsWith(civic.normalize(location)) && civic.normalize(location).length > 1)));
      const upcoming = window.SHINAGAWA_EVENTS.events.filter(item => item.endDate >= civic.today()
        && (town ? matches([item.place, item.title], town) : towns.some(name => matches([item.place, item.title], name.replace(/[0-9０-９]+丁目$/, "")))));
      const textSearch = category => "kensaku.html?" + new URLSearchParams({ q: keyword, category });
      content.innerHTML = `<h2>${esc(town || district + "地区")}</h2><p>${link("地域をフォロー", "follow.html?" + new URLSearchParams({ kind: "地域", value: keyword }))}
        ／ ${link("町会区域マップ", "chokai-map.html")} ／ ${link("地区の歴史", "rekishi-chiiki.html#ar-" + id)}</p>
        <div class="civic-grid"><section class="civic-card"><h3>地域センター・町会</h3>
        ${areaRegions.map(region => `<h4>${link(region.name, region.sourceUrl)}</h4>${list(region.associations.filter(association => !town || association.areas.some(area => area.town === town)).map(association => esc(association.name))) }`).join("")}</section>
        <section class="civic-card"><h3>史跡・文化財</h3>${list(historical.map(item => esc(item.name) + (item.address ? "（" + esc(item.address) + "）" : "")))}<p>${link("歴史マップで探す", "rekishi-map.html")}</p></section>
        <section class="civic-card"><h3>地域ニュース（収録地名で照合）</h3>${list(articles.slice(0, 15).map(item => link(item.title, item.url)), "該当する収録ニュースはありません。")}<p>${link("区のニュース一覧", "https://shinagawakugiakidb.firebaseapp.com/news.html")}</p></section>
        <section class="civic-card"><h3>催し（件名・会場の地名による候補）</h3>${list(upcoming.slice(0, 15).map(item => link(item.title, item.url)), "該当する収録イベントはありません。")}<p>${link("カレンダーで探す", "events.html")}</p></section>
        <section class="civic-card"><h3>議会の議題・質疑</h3><p>${link("地名で議案・会議録を検索", textSearch("council"))} ／ ${link("地名で請願・陳情を検索", "seigan.html?" + new URLSearchParams({ q: keyword }))}</p></section></div>`;
    };
    form.addEventListener("submit", event => { event.preventDefault(); render(); });
    form.addEventListener("change", render);
    render();
  }

  window.SHINAGAWA_COMMUNITY = { members, areas };
})();
