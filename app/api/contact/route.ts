import { NextRequest, NextResponse } from "next/server";
import { parseContactMessage } from "@/lib/contact";
import aj from "@/lib/arcjet";

export const maxDuration = 15;

export async function POST(request: NextRequest) {
  const message = parseContactMessage(await request.json().catch(() => null));
  if (!message) return NextResponse.json({ error: "Please enter your name, a valid email, and a message of up to 5,000 characters." }, { status: 400 });
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint || !endpoint.startsWith("https://")) return NextResponse.json({ error: "Support is temporarily unavailable. Your message hasn’t been sent. Please try again later." }, { status: 503 });
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const decision = await aj.protect(request, { requested: 1, userId: `contact:${ip}` });
    if (decision.isDenied()) return NextResponse.json({ error: "Please wait before sending another message." }, { status: 429 });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` } : {}) },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Your message couldn’t be delivered. Please try again. Your draft is still here." }, { status: 502 });
  }
}
