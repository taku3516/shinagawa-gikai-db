import test from "node:test";
import assert from "node:assert/strict";
import "../rekishi-map-links.js";

const { eventsByPlace, comparisonHref } = globalThis.RekishiMapLinks;

test("時代不詳の史跡の築造を後年の指定より前に表示する", () => {
  const designation = { id:"designated", year:2023, era:"heisei-reiwa", relatedPlaces:["wall"] };
  const building = { id:"built", year:null, era:"kinsei", relatedPlaces:["wall"] };
  const index = eventsByPlace([designation, building, {id:"unlinked"}], ["kinsei", "heisei-reiwa"]);
  assert.deepEqual(index.get("wall"), [building, designation]);
});

test("史跡の地点を中心に明治と現在を比較できるURLを作る", () => {
  const href = comparisonHref({lat:35.61,lng:139.74});
  const url = new URL(href, "https://example.org/");
  assert.equal(url.pathname, "/rekishi-kochizu.html");
  assert.equal(url.searchParams.get("lat"), "35.61");
  assert.equal(url.searchParams.get("mode"), "split");
  assert.equal(url.searchParams.get("era"), "meiji");
  assert.equal(url.searchParams.get("base"), "seamlessphoto");
});

const { groupByPlace, placeEras, distanceMeters, sortByDistance, formatDistance,
  readFilters, filterSearch, relationHtml, linkedPlaceIds } = globalThis.RekishiMapLinks;
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

test("人物や地名を、関係する地点ごとに並びを保ったまま束ねる", () => {
  const a = { id:"a", relatedPlaces:["p1", "p2"] };
  const b = { id:"b", relatedPlaces:["p1"] };
  const index = groupByPlace([a, b, { id:"c" }]);
  assert.deepEqual(index.get("p1"), [a, b]);
  assert.deepEqual(index.get("p2"), [a]);
  assert.equal(index.has("c"), false);
});

test("地点に結びつくできごとの時代を、重複なく出てきた順に返す", () => {
  const events = [{ era:"kinsei" }, { era:"kinsei" }, { era:"meiji" }];
  assert.deepEqual(placeEras(events), ["kinsei", "meiji"]);
  assert.deepEqual(placeEras([]), []);
});

test("現在地から近い順に並べ、距離をメートルで添える", () => {
  const origin = { lat:35.6, lng:139.7 };
  const near = { id:"near", lat:35.601, lng:139.7 };
  const far = { id:"far", lat:35.62, lng:139.7 };
  const ranked = sortByDistance([far, near], origin);
  assert.deepEqual(ranked.map((x) => x.place.id), ["near", "far"]);
  assert.ok(Math.abs(ranked[0].meters - 111) < 3, String(ranked[0].meters));
  assert.equal(distanceMeters(origin, origin), 0);
});

test("距離は1km未満をメートル、以上をキロで読みやすく表す", () => {
  assert.equal(formatDistance(84), "約80m");
  assert.equal(formatDistance(999), "約1000m");
  assert.equal(formatDistance(1260), "約1.3km");
  assert.equal(formatDistance(840000), "約840km");
});

test("絞り込み条件はURLに往復でき、不正な値は捨てる", () => {
  const valid = { areas:["oi", "osaki"], categories:["temple"], eras:["kinsei"] };
  const filters = { q:"東海道", area:"oi", category:"temple", era:"kinsei" };
  assert.deepEqual(readFilters(filterSearch(filters), valid), filters);
  assert.deepEqual(readFilters("?area=nowhere&cat=zzz&era=zzz", valid), { q:"", area:"", category:"", era:"" });
  assert.equal(filterSearch({ q:"", area:"", category:"", era:"" }), "");
});

test("関連する出来事・人物・地名を、それぞれの一覧ページへのリンクで出す", () => {
  const html = relationHtml({
    events:[{ id:"ev-1", name:"台場<築造>", yearText:"1854年" }],
    people:[{ id:"pe-1", name:"由利公正" }],
    names:[{ id:"nm-1", name:"品川宿" }]
  }, esc);
  assert.match(html, /href="rekishi-nenpyo\.html#ev-1"/);
  assert.match(html, /href="rekishi-jinbutsu\.html#pe-1"/);
  assert.match(html, /href="rekishi-chimei\.html#nm-1"/);
  assert.match(html, /台場&lt;築造&gt;/);
  assert.equal(relationHtml({ events:[], people:[], names:[] }, esc), "");
});

test("関連づけのある地点の ID を、種類をまたいで集める", () => {
  const ids = linkedPlaceIds(new Map([["a", [1]]]), new Map([["b", [1]], ["a", [1]]]), new Map());
  assert.deepEqual([...ids].sort(), ["a", "b"]);
});
