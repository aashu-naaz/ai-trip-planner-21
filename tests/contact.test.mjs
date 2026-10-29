import assert from "node:assert/strict";
import test from "node:test";
import { parseContactMessage } from "../lib/contact.ts";

test("contact messages normalize whitespace and exclude extra fields", () => {
  assert.deepEqual(parseContactMessage({ name: " Alex ", email: " alex@example.com ", message: " Hello ", admin: true }), { name: "Alex", email: "alex@example.com", message: "Hello" });
});
test("contact messages reject missing, invalid, and oversized inputs", () => {
  for (const input of [null, {}, { name: "A", email: "bad", message: "Hello" }, { name: "A", email: "a@b.com", message: " " }, { name: "A", email: "a@b.com", message: "x".repeat(5001) }, { name: 1, email: "a@b.com", message: "Hi" }]) assert.equal(parseContactMessage(input), null);
});
