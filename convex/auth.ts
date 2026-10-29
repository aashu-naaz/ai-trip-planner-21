import type { MutationCtx, QueryCtx } from "./_generated/server";

type Context = Pick<QueryCtx | MutationCtx, "auth" | "db">;

export async function authenticatedEmail(ctx: Context) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity || typeof identity.email !== "string") throw new Error("Sign in to access your account");
  return identity.email.trim().toLowerCase();
}

export async function requireOwner(ctx: Context, identifier: string) {
  const email = await authenticatedEmail(ctx);
  if (identifier.trim().toLowerCase() === email) return;
  const id = ctx.db.normalizeId("UserTable", identifier);
  const user = id ? await ctx.db.get(id) : null;
  if (!user || user.email.trim().toLowerCase() !== email) throw new Error("This account belongs to another user");
}
