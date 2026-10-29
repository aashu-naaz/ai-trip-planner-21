export type ContactMessage = { name: string; email: string; message: string };

export function parseContactMessage(value: unknown): ContactMessage | null {
  if (!value || typeof value !== "object") return null;
  const body = value as Record<string, unknown>;
  if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") return null;
  const name = body.name.trim(), email = body.email.trim(), message = body.message.trim();
  if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 5000) return null;
  return { name, email, message };
}
