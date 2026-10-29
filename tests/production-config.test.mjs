import assert from "node:assert/strict";
import test from "node:test";
import { productionIssues } from "../scripts/production-config.mjs";

const configured = {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_live_example", CLERK_SECRET_KEY: "sk_live_example",
  NEXT_PUBLIC_CONVEX_URL: "https://example.convex.cloud", CLERK_JWT_ISSUER_DOMAIN: "https://auth.example.com",
  GEMINI_API_KEY: "example", ARCJET_KEY: "example", GOOGLE_PLACE_API_KEY: "example", NEXT_PUBLIC_MAPBOX_API_KEY: "example",
  CONTACT_WEBHOOK_URL: "https://example.com/contact", CONVEX_DEPLOYMENT: "prod:example",
};
test("production check accepts configured services without exposing values", () => {
  assert.deepEqual(productionIssues(configured), []);
});
test("production check rejects development keys, missing secrets, and local endpoints", () => {
  const issues = productionIssues({ ...configured, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_example", GOOGLE_PLACE_API_KEY: "", CONTACT_WEBHOOK_URL: "http://localhost/contact", CONVEX_DEPLOYMENT: "dev:example" });
  assert.equal(issues.length, 4);
  assert.ok(issues.every((issue) => !issue.includes("pk_test_example")));
});
