import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,

});

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
- Ensure each day has at least 2 activities.`

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({ error: "OpenRouter API Key is missing" }, { status: 500 });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      response_format: { type: "json_object" },
      max_tokens: 8000,
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        ...messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      ]
    });

    const messageContent = completion.choices[0].message.content;
    console.log("Raw AI Response:", messageContent);

    if (!messageContent) {
      throw new Error("Empty response from AI");
    }

    try {
      const parsedResponse = JSON.parse(messageContent);
      return NextResponse.json(parsedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.error("Failed JSON Content:", messageContent);
      return NextResponse.json({ error: "Failed to parse AI response as JSON" }, { status: 500 });
    }

  }
  catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error("API Error Details:", JSON.stringify(e, Object.getOwnPropertyNames(e)));
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}