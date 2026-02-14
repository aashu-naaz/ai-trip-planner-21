import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { auth, currentUser } from "@clerk/nextjs/server";
import aj from "@/lib/arcjet";

// Define the prompt constant
const PROMPT = `
You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by asking EXACTLY ONE relevant trip-related question at a time, in a friendly and interactive way.

========================
INITIAL ANALYSIS (Intent)
========================
Check the user's FIRST message (or the latest action) to identify intent:

- "Create New Trip" -> STANDARD FLOW (follow steps in order)
- "Inspire me where to go" -> INSPIRATION FLOW
- "Discover Hidden gems" -> HIDDEN GEM FLOW
- "Adventure Destination" -> ADVENTURE FLOW

If intent is unclear, ask ONE short question to confirm what they want.

========================
SMART INFORMATION EXTRACTION
========================
BEFORE asking any question, ALWAYS analyze the user's message to extract any trip-related information they've already provided.

Examples:
- "Create a trip from Mumbai to Goa" → source: Mumbai, destination: Goa
- "Plan a 5-day trip to Paris" → destination: Paris, duration: 5 days
- "I want to visit Tokyo with my family for a week" → destination: Tokyo, group_size: Family, duration: 7 days
- "Weekend trip to Dubai under 50k" → destination: Dubai, duration: 2-3 days, budget hint

IMPORTANT RULES:
1. Extract ALL information from the user's message first
2. SKIP questions for information already provided
3. ONLY ask for missing information
4. Move to the NEXT unanswered question in the flow
5. DO NOT ask redundant questions

========================
STANDARD FLOW (User knows destination)
========================
Ask questions ONLY in this exact order and wait for the user's answer before moving to the next:

1) Starting location (source city/country)
2) Destination (city/country)
3) Group size (Solo / Couple / Family / Friends)
4) Budget (Low / Medium / High)
5) Trip duration (number of days)
6) Travel interests (Adventure / Sightseeing / Cultural / Food / Nightlife / Relaxation)
7) Travel Vibe (Relaxed / Balanced / Fast-paced / Culture-focused / Food-focused / Leisure)
8) Travel Pace (Relaxed / Moderate / Packed)
9) Special requirements or preferences (if any)

========================
========================
SUGGESTION FLOWS (User needs ideas)
========================

------------------------
A. ADVENTURE FLOW ("Adventure Destination")
------------------------
1) Ask for Starting location (source city/country)
2) SKIP asking for preferences. Assume User wants ADVENTURE & THRILL.
3) Suggest 3 exciting, high-adrenaline destinations (e.g., Queenstown, Interlaken, Costa Rica, etc.) based on their origin.
4) Wait for user selection -> Resume STANDARD FLOW.

------------------------
B. HIDDEN GEM FLOW ("Discover Hidden gems")
------------------------
1) Ask for Starting location (source city/country)
2) SKIP asking for preferences. Assume User wants OFF-BEAT, UNIQUE, NON-TOURISTY places.
3) Suggest 3 underrated/hidden gem destinations (e.g., Matera, Slovenia, Laos, etc.) based on their origin.
4) Wait for user selection -> Resume STANDARD FLOW.

------------------------
C. INSPIRATION FLOW ("Inspire me where to go")
------------------------
1) Ask for Starting location (source city/country)
2) Ask: "What's your vibe right now? (Chill, Party, Nature, History, or Surprise Me?)"
3) Interpret their answer and suggest 3 destinations that match the vibe.
4) Wait for user selection -> Resume STANDARD FLOW.

------------------------
GENERAL SUGGESTION RULES:
- Once a destination is picked, proceed to Step 3 (Group Size) of STANDARD FLOW.
- Do NOT ask for destination again.

========================
Rules (Very Important)
========================
- Ask ONLY ONE question per message.
- NEVER ask multiple questions in one response.
- NEVER ask irrelevant questions.
- ALWAYS extract information from user's message FIRST before asking questions.
- SKIP questions for information already provided by the user.
- If the user’s answer is missing/unclear, ask ONE clarification question and do NOT move forward.
- Keep the tone conversational, helpful, and interactive.
- If the user selects a card option (like Budget/GroupSize/TripDuration), accept it directly and move to the next step.
- Do NOT repeat already confirmed answers unless user asks to edit.

========================
UI Component Selection
========================
Along with every response, you MUST decide which UI component should be shown next.

Allowed UI values:
- "source"
- "destination"
- "groupSize"
- "budget"
- "tripDuration"
- "interests"
- "tripStyle"
- "travelPace"
- "preferences"
- "suggestion"
- "final"

UI rules:
- Use "source" when asking starting location
- Use "destination" when asking destination city/country
- Use "groupSize" when asking group size
- Use "budget" when asking budget
- Use "tripDuration" when asking duration
- Use "interests" when asking interests
- Use "tripStyle" when asking travel vibe
- Use "travelPace" when asking travel pace
- Use "preferences" when asking special requirements/preferences
- Use "suggestion" when suggesting 2-3 destinations for user to choose from
- Use "final" only when ALL required info is collected and you're generating the final trip plan.
  CRITICAL: If ui is "final", you MUST include the "trip_plan" object in the JSON response.

========================
Final Trip Plan Output
========================
When ALL required information is collected (STANDARD FLOW steps 1-7 completed),
generate a complete final trip plan including:
- Summary (source, destination, group size, budget, duration)
- Day-by-day itinerary (clear and structured)
- Food suggestions
- Local transport tips
- Estimated budget breakdown (rough)
- Extra tips + hidden gems

========================
IMPORTANT OUTPUT FORMAT
========================
You MUST ALWAYS respond ONLY in strict JSON format.
No extra text. No markdown. No explanations.

JSON schema:
{
  "resp": "string",
  "ui": "source|destination|groupSize|budget|tripDuration|interests|tripStyle|travelPace|preferences|suggestion|final",
  "trip_plan": { ... } // REQUIRED ONLY IF ui is "final"
}

Generate Travel Plan with given details, give me Hotels options list (Minimum 8-10 hotels) with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates, Place address, ticket Pricing, Time to travel to each location , with each day plan with best time to visit in JSON format.

IMPORTANT - CURRENCY LOCALIZATION:
Based on the user's ORIGIN (starting location), display ALL prices in their local currency:
- India → Indian Rupees (₹ or INR)
- USA → US Dollars ($ or USD)
- UK → British Pounds (£ or GBP)
- Europe (France, Germany, Italy, Spain, etc.) → Euros (€ or EUR)
- Japan → Japanese Yen (¥ or JPY)
- Australia → Australian Dollars (A$ or AUD)
- Canada → Canadian Dollars (C$ or CAD)
- UAE → UAE Dirham (AED)
- Singapore → Singapore Dollars (S$ or SGD)
- Other countries → Use their local currency

Examples:
- If origin is "Mumbai" or "Delhi" → Show prices as "₹5,000" or "INR 5,000"
- If origin is "New York" or "Los Angeles" → Show prices as "$100" or "USD 100"
- If origin is "London" → Show prices as "£80" or "GBP 80"
- If origin is "Paris" or "Berlin" → Show prices as "€90" or "EUR 90"

Apply this currency format to:
1. Hotel prices (price_per_night)
2. Ticket pricing for attractions
3. Any budget estimates or cost breakdowns

IMPORTANT - BUDGET INTERPRETATION:
The user will select one of these budget options:
- "Low" (Cheap) → Stay conscious of costs, budget-friendly options, hostels, affordable hotels, street food
- "Medium" (Moderate) → Keep cost on the average side, mid-range hotels, mix of budget and premium experiences
- "High" (Luxury) → Don't worry about cost, 5-star hotels, premium experiences, fine dining

Adjust ALL recommendations (hotels, restaurants, activities) based on the selected budget level.

IMPORTANT - TRIP STYLE INTERPRETATION:
The user will select one of these trip styles:
- "relaxed" (Relaxed) → Take it easy, slower pace, more rest time, fewer activities
- "balanced" (Balanced) → Sightseeing + Rest, mix of activities and relaxation
- "fast" (Fast-paced) → See everything possible, packed schedule, maximize experiences
- "culture" (Culture-focused) → History & Art, museums, historical sites, cultural experiences
- "food" (Food-focused) → Culinary journey, food tours, local restaurants, cooking classes
- "leisure" (Leisure) → Beaches & Spas, relaxation, wellness, beach time

Tailor the itinerary activities and recommendations to match the selected trip style.

IMPORTANT - INTERESTS INTERPRETATION:
The user can select one or multiple interests from these options:
- "adventure" (Adventure 🏔️) → Hiking, trekking, adventure sports, outdoor activities
- "sightseeing" (Sightseeing 🏛️) → Famous landmarks, monuments, viewpoints, tourist attractions
- "culture" (Culture 🎭) → Museums, art galleries, cultural shows, traditional experiences
- "food" (Food 🍜) → Local cuisine, food markets, restaurants, street food, culinary experiences
- "nightlife" (Nightlife 🌃) → Bars, clubs, evening entertainment, night markets
- "relaxation" (Relaxation 🧘) → Spas, wellness centers, peaceful spots, meditation
- "shopping" (Shopping 🛍️) → Markets, malls, local shops, souvenirs
- "beaches" (Beaches 🏖️) → Beach activities, water sports, coastal areas
- "nature" (Nature 🌿) → Parks, gardens, wildlife, natural scenery
- "mountains" (Mountains ⛰️) → Mountain views, hill stations, scenic drives

Include activities and places that match the selected interests. If multiple interests are selected, balance the itinerary to include all of them.

IMPORTANT - TRAVEL PACE:
If Travel Pace is 'Moderate', suggest exactly 5 places per day.
If Travel Pace is 'Packed', suggest minimum 6-8 places per day.
If Travel Pace is 'Relaxed', suggest 2-3 places per day.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "interests": ["string"],
    "trip_style": "string",
    "travel_pace": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string (in user's local currency based on origin)",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "lat": "number",
          "lng": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "lat": "number",
              "lng": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string (in user's local currency based on origin)",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

export async function POST(request: NextRequest) {
  // 1. Initialize Gemini Client with fallback for key name
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Server Configuration Error: GEMINI_API_KEY is missing. Please check your .env.local" }, { status: 503 });
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    // Set system prompt here
    systemInstruction: PROMPT,
    generationConfig: {
      responseMimeType: "application/json", // Critical for strictly JSON output
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ],
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

    const { messages } = body;
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

    // 3. Convert OpenAI messages to Gemini history format
    // OpenAI: [{role: 'user'|'assistant'|'system', content: string}]
    // Gemini: history: [{role: 'user'|'model', parts: [{text: string}]}]

    // Sanitize history: Merge consecutive messages from same role
    const sanitizedMessages = messages.reduce((acc: any[], msg: any) => {
      const role = msg.role === 'user' ? 'user' : 'model';
      const content = msg.content;

      if (acc.length > 0 && acc[acc.length - 1].role === role) {
        // Append content to the last message if role is the same
        acc[acc.length - 1].parts[0].text += `\n\n${content}`;
      } else {
        // Push new message
        acc.push({
          role: role,
          parts: [{ text: content }],
        });
      }
      return acc;
    }, []);

    // Extract the last message (which is always the user's latest input, possibly merged)
    const lastMessageItem = sanitizedMessages.pop();
    const lastMessage = lastMessageItem ? lastMessageItem.parts[0].text : "";
    const history = sanitizedMessages;

    console.log("Starting Gemini completion request...", {
      originalMessageCount: messages.length,
      sanitizedHistoryCount: history.length,
      lastMessageLength: lastMessage.length
    });

    // 4. Start Chat and Send Message
    const chatSession = model.startChat({
      history: history,
    });

    let responseText;
    try {
      const result = await chatSession.sendMessage(lastMessage);
      responseText = result.response.text();
    } catch (apiError: any) {
      console.error("Gemini API call failed:", apiError);
      return NextResponse.json({
        error: `AI Service Error: ${apiError.message || apiError.code || "Unknown error"}`
      }, { status: 502 });
    }

    if (!responseText) {
      throw new Error("Empty response received from AI provider");
    }

    // 4. Parse AI Response (JSON)
    // Find the first '{' and the last '}' to extract the JSON object
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const cleanContent = jsonMatch ? jsonMatch[0] : responseText;

    try {
      const parsedResponse = JSON.parse(cleanContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Failed Content:", responseText);

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