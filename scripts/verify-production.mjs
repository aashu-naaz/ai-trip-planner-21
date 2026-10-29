import nextEnv from "@next/env";
import { productionIssues } from "./production-config.mjs";

nextEnv.loadEnvConfig(process.cwd(), false);
const issues = productionIssues(process.env);
if (issues.length) {
  console.error("Production configuration needs attention:\n" + issues.map((issue) => `- ${issue}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log("Production configuration passed. Confirm matching Clerk/Convex settings and service access in your deployment account.");
}
