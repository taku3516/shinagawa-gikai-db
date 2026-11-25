(() => {
  "use strict";

  /** @param {object[]} events @param {string[]} eras @returns {Map<string, object[]>} */
  function eventsByPlace(events, eras) {
    const order = new Map(eras.map((id, index) => [id, index]));
    const sorted = events.slice().sort((a, b) =>
      (order.get(a.era) ?? eras.length) - (order.get(b.era) ?? eras.length)
      || (a.year ?? a.yearEnd ?? Infinity) - (b.year ?? b.yearEnd ?? Infinity));
    const result = new Map();
    for (const event of sorted) {
      for (const id of event.relatedPlaces || []) {
        if (!result.has(id)) result.set(id, []);
        result.get(id).push(event);
      }
    }
    return result;
  }

  /** @param {{lat:number,lng:number}} place @returns {string} */
  function comparisonHref(place) {
    const query = new URLSearchParams({lat:place.lat, lng:place.lng, zoom:15,
      era:"meiji", base:"seamlessphoto", mode:"split", places:1});
    return "rekishi-kochizu.html?" + query;
  }

  /**
   * 人物・地名のように、relatedPlaces で地点に結びつく項目を地点ごとに束ねる。
   * @param {{relatedPlaces?: string[]}[]} items @returns {Map<string, object[]>}
   */
  function groupByPlace(items) {
    const result = new Map();
    for (const item of items) {
      for (const id of item.relatedPlaces || []) {
        if (!result.has(id)) result.set(id, []);
        result.get(id).push(item);
      }
    }
    return result;
  }

  /** @param {{era?: string}[]} events @returns {string[]} 重複なく、出てきた順 */
  function placeEras(events) {
    return [...new Set(events.map((event) => event.era).filter(Boolean))];
  }

  /** 緯度経度の2点間の距離（メートル）。 @param {{lat:number,lng:number}} a @param {{lat:number,lng:number}} b @returns {number} */
  function distanceMeters(a, b) {
    const rad = Math.PI / 180;
    const dLat = (b.lat - a.lat) * rad;
    const dLng = (b.lng - a.lng) * rad;
    const h = Math.sin(dLat / 2) ** 2
      + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
    return 2 * 6371008.8 * Math.asin(Math.sqrt(h));
  }

  /** @param {{lat:number,lng:number}[]} places @param {{lat:number,lng:number}} origin @returns {{place: object, meters: number}[]} */
  function sortByDistance(places, origin) {
    return places.map((place) => ({ place, meters: distanceMeters(origin, place) }))
      .sort((a, b) => a.meters - b.meters);
  }

  /** @param {number} meters @returns {string} */
  function formatDistance(meters) {
    if (meters < 1000) return `約${Math.round(meters / 10) * 10}m`;
    const km = meters / 1000;
    return `約${km >= 100 ? Math.round(km) : km.toFixed(1)}km`;
  }

  /**
   * 歴史マップの絞り込み条件を URL から読む。知らない値は捨てて「すべて」に戻す。
   * @param {string} search @param {{areas:string[],categories:string[],eras:string[]}} valid
   * @returns {{q:string, area:string, category:string, era:string}}
   */
  function readFilters(search, valid) {
    const params = new URLSearchParams(search);
    const pick = (key, choices) => (choices.includes(params.get(key)) ? params.get(key) : "");
    return {
      q: (params.get("q") || "").trim().slice(0, 100),
      area: pick("area", valid.areas), category: pick("cat", valid.categories), era: pick("era", valid.eras)
    };
  }

  /** @param {{q:string, area:string, category:string, era:string}} filters @returns {string} 空なら "" */
  function filterSearch(filters) {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.area) params.set("area", filters.area);
    if (filters.category) params.set("cat", filters.category);
    if (filters.era) params.set("era", filters.era);
    const text = params.toString();
    return text ? "?" + text : "";
  }

  /**
   * 地点に結びつく出来事・人物・地名を、それぞれの一覧ページへのリンクにする。
   * @param {{events:object[], people:object[], names:object[]}} related @param {(v:unknown)=>string} esc
   * @returns {string} 1件も無ければ ""
   */
  function relationHtml(related, esc) {
    const list = (title, items, line) => (items.length
      ? `<h3>${title}</h3><ul class="pop-list">${items.map((item) => `<li>${line(item)}</li>`).join("")}</ul>` : "");
    const link = (page, item) => `<a href="${page}#${encodeURIComponent(item.id)}">${esc(item.name)}</a>`;
    return [
      list("この場所に関係するできごと", related.events,
        (event) => `${event.yearText ? esc(event.yearText) + " " : ""}${link("rekishi-nenpyo.html", event)}`),
      list("この場所にゆかりのある人物", related.people, (person) => link("rekishi-jinbutsu.html", person)),
      list("この場所に関係する地名", related.names, (name) => link("rekishi-chimei.html", name))
    ].join("");
  }

  /** @param {...Map<string, unknown>} indexes @returns {Set<string>} どれかに結びつく地点の ID */
  function linkedPlaceIds(...indexes) {
    return new Set(indexes.flatMap((index) => [...index.keys()]));
  }

  /** @param {string} placeId @param {object[]} events @param {object[]} people @returns {object[]} */
  function peopleForPlace(placeId, events, people) {
    const linked = new Set(events.flatMap((event) => event.relatedPeople || []));
    return people.filter((person) => linked.has(person.id) || person.relatedPlaces?.includes(placeId));
  }

  globalThis.RekishiMapLinks = {peopleForPlace, eventsByPlace, comparisonHref, groupByPlace, placeEras, distanceMeters,
    sortByDistance, formatDistance, readFilters, filterSearch, relationHtml, linkedPlaceIds};
})();
