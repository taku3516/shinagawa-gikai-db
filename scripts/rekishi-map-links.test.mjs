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
