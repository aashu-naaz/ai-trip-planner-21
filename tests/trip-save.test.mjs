import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const source = readFileSync(new URL("../convex/tripDetail.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const authExports = {};
runInNewContext(ts.transpileModule(readFileSync(new URL("../convex/auth.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: authExports });
const registered = {};
runInNewContext(outputText, {
  exports: registered,
  require: (name) => name === "./_generated/server" ? { mutation: (definition) => definition, query: (definition) => definition } : name === "./auth" ? authExports : require(name),
});

function database(existing) {
  const writes = [];
  return {
    writes,
    auth: { getUserIdentity: async () => ({ email: "alex@example.com" }) },
    db: {
      normalizeId: (_table, id) => id,
      get: async () => ({ email: "alex@example.com" }),
      query: () => ({ filter: () => ({ first: async () => existing }) }),
      insert: async (table, value) => { writes.push({ action: "insert", table, value }); return "trip-record"; },
      patch: async (id, value) => { writes.push({ action: "patch", id, value }); },
    },
  };
}

test("saving an existing trip updates it without creating a duplicate", async () => {
  const context = database({ _id: "trip-record", uid: "user-1" });
  assert.equal(await registered.CreateTripDetail.handler(context, { tripId: "trip-1", uid: "user-1", tripDetail: { destination: "Paris" } }), "trip-record");
  assert.equal(context.writes.length, 1);
  assert.equal(context.writes[0].action, "patch");
});

test("new trips are inserted and existing ownership is preserved", async () => {
  const fresh = database(null);
  await registered.CreateTripDetail.handler(fresh, { tripId: "trip-1", uid: "user-1", tripDetail: {} });
  assert.equal(fresh.writes[0].action, "insert");
  const existing = database({ _id: "trip-record", uid: "user-2" });
  await assert.rejects(registered.CreateTripDetail.handler(existing, { tripId: "trip-1", uid: "user-1", tripDetail: {} }), /another account/);
  assert.equal(existing.writes.length, 0);
});
