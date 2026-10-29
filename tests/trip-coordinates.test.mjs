import assert from "node:assert/strict";
import test from "node:test";
import { extractCoordinates } from "../lib/trip-coordinates.ts";

test("coordinates preserve zero and normalize supported formats", () => {
  assert.deepEqual(extractCoordinates({ lat: 0, lng: 0 }), [0, 0]);
  assert.deepEqual(extractCoordinates({ latitude: 12.5, longitude: -72 }), [-72, 12.5]);
  assert.deepEqual(extractCoordinates(" 12.5, -72 "), [-72, 12.5]);
});

test("invalid coordinates cannot reach the map", () => {
  for (const value of [null, undefined, "", ",", "a,b", "1,2,3", { lat: NaN, lng: 1 }, { lat: 91, lng: 0 }, { lat: 0, lng: 181 }, { lat: 1 }, { lat: Infinity, lng: 0 }]) {
    assert.equal(extractCoordinates(value), null);
  }
});
