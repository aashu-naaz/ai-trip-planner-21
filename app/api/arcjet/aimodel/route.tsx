import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

// Define the prompt constant
const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.
Only ask questions about the following details in order, and wait for the user's answer before asking the next:
1. Starting location (source) -> ui: ''
2. Destination city or country -> ui: ''
3. Group size (Solo, Just Me, Couple, A Couple, Family, Friends) -> ui: 'groupSize'
4. Budget (Cheap, Moderate, Luxury) -> ui: 'budget'
5. Trip duration (number of days) -> ui: 'tripDuration'
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) -> ui: ''
7. Special requirements or preferences (if any) -> ui: ''

Do not ask multiple questions at once, and never ask irrelevant questions.
If the user provides an answer like "2 days" or "3", accept it as the Trip Duration and move to the next question.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

IMPORTANT: returns 'ui' ONLY for the specific questions listed above. For others (like interests), return 'ui': '' or null.
When the final itinerary is ready to be generated, return 'ui': 'final'.

Once all required information is collected, generate and return a **strict JSON response only (no explanations or extra text) with following JSON schema:**
IMPORTANT: 'resp' field MUST NEVER be empty. It should always contain a polite question or confirmation message.

If UI is NOT 'final':
{
  "resp": "Text response asking next question",
  "ui": "ui_component_name_or_empty"
}

If UI IS 'final' (all info collected):
{
  "resp": "Okay, Great! Here is your generated trip plan.",
  "ui": "final",
  "trip_plan": {
    "budget": "...",
    "destination": "...",
    "duration": "...",
    "group_size": "...",
    "origin": "...",
    "hotels": [
       {
         "hotel_name": "...",
         "hotel_address": "...",
         "price": "...",
         "hotel_image_url": "...",
         "geo_coordinates": "...",
         "rating": "...",
         "description": "..."
       }
    ],
    "itinerary": [
       {
         "day": "Day 1",
         "plan": [
            {
               "place_name": "...",
               "place_details": "...",
               "place_image_url": "...",
               "geo_coordinates": "...",
               "ticket_pricing": "...",
               "time_to_travel": "..."
            }
         ]
       }
    ]
  }
}
IMPORTANT:
- Generate **at least 2 hotel options**.
- Generate a detailed itinerary for **every single day** of the trip duration (e.g. if 4 days, generate Day 1, Day 2, Day 3, Day 4).
- Ensure each day has at least 2 activities.`;

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
        response_format: { type: "json_object" },
        max_tokens: 4000,
        messages: [
          {
            role: 'system',
            content: PROMPT,
          },
          ...messages.map((msg: { role: string; content: string }) => ({
            role: msg.role as 'user' | 'assistant' | 'system',
            content: msg.content,
          })),
        ]
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
    // Clean up markdown code blocks if present
    const cleanContent = messageContent.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();

    try {
      const parsedResponse = JSON.parse(cleanContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Failed Content:", messageContent); // Log the bad content
      return NextResponse.json({
        error: "Failed to parse AI response. The model returned invalid JSON.",
        details: messageContent.substring(0, 200) + "..." // Return snippet to client for debugging
      }, { status: 500 });
    }

  } catch (e: any) {
    // Global catch for any other unexpected errors
    console.error("Unexpected Route Error:", e);
    return NextResponse.json({ error: `Internal Server Error: ${e.message}` }, { status: 500 });
  }
}