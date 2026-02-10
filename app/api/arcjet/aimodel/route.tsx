import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';
import { auth, currentUser } from "@clerk/nextjs/server";
import aj from "@/lib/arcjet";

// Define the prompt constant
const PROMPT = `You are an AI Trip Planner Agent. Help the user plan a trip by asking one relevant question at a time.

CRITICAL: You MUST ALWAYS reply with a valid JSON object. NEVER reply with plain text.

Ask these questions in order:
1. Starting location -> ui: ''
2. Destination -> ui: ''
3. Group size (Solo, Couple, Family, Friends) -> ui: 'groupSize'
4. Budget (Cheap, Moderate, Luxury) -> ui: 'budget'
5. Trip duration (days) -> ui: 'tripDuration'
6. Travel interests -> ui: ''
7. Special requirements -> ui: ''

If answer is "2 days", accept as Duration.
Ask politely. Returns 'ui' ONLY for specific questions above. For others, return 'ui': ''.
When final itinerary is ready, return 'ui': 'final'.

Format:
If UI is NOT 'final':
{ "resp": "Question?", "ui": "ui_id" }

If UI IS 'final':
{
  "resp": "Here is your plan.",
  "ui": "final",
  "trip_plan": {
    "budget": "...", "destination": "...", "duration": "...", "group_size": "...", "origin": "...",
    "hotels": [{ "hotel_name": "...", "hotel_address": "...", "price": "...", "hotel_image_url": "...", "geo_coordinates": "...", "rating": "...", "description": "..." }],
    "itinerary": [{ "day": "Day 1", "activities": [{ "place_name": "...", "place_details": "...", "place_image_url": "...", "geo_coordinates": "...", "ticket_pricing": "...", "time_to_travel": "..." }] }]
  }
}
Generate 2+ hotels and activities for each day.`;

export async function POST(request: NextRequest) {
  // 1. Initialize OpenAI Client inside the handler to ensure ENV vars are loaded
  const apiKey = process.env.OPENROUTER_API_KEY;

  // Debug log to check if key exists (do not log the actual key)
  console.log("API Key exists:", !!apiKey);

  if (!apiKey) {
    return NextResponse.json({ error: "Server Configuration Error: OpenRouter API Key is missing. Please add OPENROUTER_API_KEY to .env.local" }, { status: 503 });
  }

  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
  });

  try {
    // 2. Parse Request Body safely
    let body;
    try {
      body = await request.json();
    } catch (err) {
      console.error("Failed to parse request body:", err);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { messages, isFinal } = body;
    const user = await currentUser();
    const { has } = await auth();
    const hasPremiumAccess = has({ plan: 'monthly' });
    console.log("hasPremiumAccess", hasPremiumAccess);

    const decision = await aj.protect(request, { requested: 1, userId: user?.primaryEmailAddress?.emailAddress || 'anonymous' });

    if (decision.isDenied() && !hasPremiumAccess) {
      if (decision.reason.isRateLimit()) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid 'messages' format" }, { status: 400 });
    }

    console.log("Starting AI completion request...", { messageCount: messages.length });

    // 3. Make OpenAI Call with Timeout
    // Using a try-catch specifically for the API call to catch network/timeout errors
    let completion;
    try {
      completion = await openai.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        max_tokens: 8000,
        messages: [
          {
            role: 'system',
            content: PROMPT,
          },
          ...messages.map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
          })),
        ],
        response_format: { type: 'json_object' }
      }, { timeout: 45000, maxRetries: 1 }); // Increased to 45s, 1 retry
    } catch (apiError: any) {
      console.error("OpenAI API call failed:", apiError);
      return NextResponse.json({
        error: `AI Service Error: ${apiError.message || apiError.code || "Unknown error"}`
      }, { status: 502 }); // 502 Bad Gateway for upstream errors
    }

    const messageContent = completion.choices[0].message.content;
    console.log("Raw AI Response received.");

    if (!messageContent) {
      throw new Error("Empty response received from AI provider");
    }

    // 4. Parse AI Response (JSON)
    // Find the first '{' and the last '}' to extract the JSON object
    const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
    const cleanContent = jsonMatch ? jsonMatch[0] : messageContent;

    try {
      const parsedResponse = JSON.parse(cleanContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Failed Content:", messageContent);

      // Fallback: If AI didn't return JSON, wrap the content in our expected structure
      // This often happens if the AI refuses to answer or gives a plain text explanation
      return NextResponse.json({
        resp: cleanContent || "I'm sorry, I couldn't generate a plan. Please try again.",
        ui: ""
      });
    }

  } catch (e: any) {
    // Global catch for any other unexpected errors
    console.error("Unexpected Route Error:", e);
    return NextResponse.json({
      error: `Internal Server Error: ${e.message}`,
      resp: "I encountered an internal error. Please try again." // Friendly fallback
    }, { status: 500 });
  }
}