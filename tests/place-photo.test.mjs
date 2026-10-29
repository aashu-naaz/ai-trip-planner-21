import assert from "node:assert/strict";
import test from "node:test";
import { getPlacePhoto, placePhotoAttributions } from "../hooks/use-place-photo.ts";

test("photo requests share results, limit concurrency, and recover after failure", async () => {
  const originalFetch = globalThis.fetch;
  let calls = 0, active = 0, peak = 0;
  globalThis.fetch = async () => {
    calls++;
    active++;
    peak = Math.max(peak, active);
    await new Promise((resolve) => setTimeout(resolve, 10));
    active--;
    return Response.json("https://example.com/photo.jpg");
  };
  try {
    const first = getPlacePhoto("Shared destination");
    assert.equal(getPlacePhoto(" Shared destination "), first);
    await first;
    assert.equal(calls, 1);
    await getPlacePhoto("Shared destination");
    assert.equal(calls, 1);
    const results = await Promise.all(Array.from({ length: 12 }, (_, index) => getPlacePhoto(`Destination ${index}`)));
    assert.equal(results.length, 12);
    assert.equal(peak, 4);
    globalThis.fetch = async () => { throw new Error("offline"); };
    assert.equal(await getPlacePhoto("Retry destination"), undefined);
    globalThis.fetch = async () => Response.json("https://example.com/recovered.jpg");
    assert.equal(await getPlacePhoto("Retry destination"), "https://example.com/recovered.jpg");
    globalThis.fetch = async () => Response.json({ error: "unavailable" });
    assert.equal(await getPlacePhoto("Invalid response"), undefined);
    globalThis.fetch = async () => Response.json({ url: "https://example.com/new-photo.jpg", attributions: [{ displayName: "Photographer", uri: "//maps.google.com/contributor" }, { displayName: "Unsafe link", uri: "javascript:alert(1)" }] });
    assert.equal(await getPlacePhoto("Credited photo"), "https://example.com/new-photo.jpg");
    assert.deepEqual(placePhotoAttributions("Credited photo"), [{ displayName: "Photographer", uri: "https://maps.google.com/contributor" }, { displayName: "Unsafe link", uri: undefined }]);
    assert.equal(await getPlacePhoto(""), undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
