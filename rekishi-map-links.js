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

  globalThis.RekishiMapLinks = {eventsByPlace, comparisonHref};
})();
