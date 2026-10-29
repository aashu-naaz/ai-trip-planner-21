export function productionIssues(env) {
  const required = ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY", "NEXT_PUBLIC_CONVEX_URL", "CLERK_JWT_ISSUER_DOMAIN", "GEMINI_API_KEY", "ARCJET_KEY", "GOOGLE_PLACE_API_KEY", "NEXT_PUBLIC_MAPBOX_API_KEY", "CONTACT_WEBHOOK_URL"];
  const issues = required.filter((name) => !env[name]?.trim()).map((name) => `${name} is missing`);
  for (const [name, prefix] of [["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "pk_live_"], ["CLERK_SECRET_KEY", "sk_live_"]]) {
    if (env[name] && !env[name].startsWith(prefix)) issues.push(`${name} must use your Clerk production instance`);
  }
  for (const name of ["NEXT_PUBLIC_CONVEX_URL", "CLERK_JWT_ISSUER_DOMAIN", "CONTACT_WEBHOOK_URL"]) {
    if (!env[name]) continue;
    try {
      const url = new URL(env[name]);
      if (url.protocol !== "https:" || ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) throw new Error();
    } catch { issues.push(`${name} must be a public HTTPS URL`); }
  }
  if (env.CONVEX_DEPLOYMENT?.startsWith("dev:")) issues.push("CONVEX_DEPLOYMENT still targets development");
  return issues;
}
