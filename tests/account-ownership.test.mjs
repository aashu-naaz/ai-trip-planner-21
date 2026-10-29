import assert from "node:assert/strict";
import test from "node:test";
import { requireOwner } from "../convex/auth.ts";

function context(email, storedEmail = "alex@example.com") {
  return {
    auth: { getUserIdentity: async () => email ? { email } : null },
    db: { normalizeId: (_table, id) => id === "my-account" ? id : null, get: async () => ({ email: storedEmail }) },
  };
}

test("personal records reject anonymous callers and other accounts", async () => {
  await assert.rejects(requireOwner(context(null), "alex@example.com"), /Sign in/);
  await assert.rejects(requireOwner(context("someone@example.com"), "alex@example.com"), /another user/);
  await assert.rejects(requireOwner(context("someone@example.com"), "my-account"), /another user/);
});
test("personal records accept the authenticated email or its account ID", async () => {
  await requireOwner(context("Alex@Example.com"), "alex@example.com");
  await requireOwner(context("alex@example.com"), "my-account");
});
