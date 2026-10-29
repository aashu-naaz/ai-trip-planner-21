import type { TripInfo } from "@/app/create-new-trip/_components/ChatBox";

type Reply = { resp: string; ui: string; trip_plan?: TripInfo };
export function parseTripReply(input: unknown): Reply {
  let value = input;
  for (let depth = 0; depth < 5; depth++) {
    if (typeof value === "string") {
      const clean = value.replace(/```(?:json)?/gi, "").trim();
      try { value = JSON.parse(clean); continue; } catch {
        const start = clean.indexOf("{"), end = clean.lastIndexOf("}");
        if (start >= 0 && end > start) {
          try { value = JSON.parse(clean.slice(start, end + 1)); continue; } catch { /* Incomplete output cannot form a trip. */ }
        }
        return { resp: clean.startsWith("{") ? "The trip response was incomplete. Please ask me to regenerate your itinerary." : clean, ui: "" };
      }
    }
    if (!value || typeof value !== "object") break;
    const record = value as Record<string, unknown>;
    const plan = record.trip_plan ?? record.tripPlan ?? (record.destination && record.itinerary ? record : undefined);
    if (plan && typeof plan === "object") {
      const data = plan as Record<string, unknown>;
      if (typeof data.destination === "string" && Array.isArray(data.itinerary) && data.itinerary.length) {
        return { resp: typeof record.resp === "string" && !record.resp.trim().startsWith("{") ? record.resp : "Your itinerary is ready. Explore your hotels and daily plan.", ui: "final", trip_plan: { ...data, hotels: Array.isArray(data.hotels) ? data.hotels : [] } as TripInfo };
      }
    }
    const text = record.resp ?? record.content ?? record.message;
    if (typeof text === "string" && /^(\s*[{"`])/.test(text)) { value = text; continue; }
    return { resp: typeof text === "string" ? text : "Please continue planning your trip.", ui: typeof record.ui === "string" && record.ui !== "final" ? record.ui : "" };
  }
  return { resp: "Please ask me to regenerate your itinerary.", ui: "" };
}
