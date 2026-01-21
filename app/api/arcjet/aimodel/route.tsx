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
}`

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  try {
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4.1-mini',
      response_format: { type: "json_object" },
      max_tokens: 2500, // Increased limit for full trip plan generation
      messages: [
        {
          role: 'system',
          content: PROMPT,
        },
        ...messages
      ]
    });
    console.log(completion.choices[0].message);
    const message = completion.choices[0].message;
    return NextResponse.json(JSON.parse(message.content ?? ''));
  }
  catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    console.error("API Error:", e);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}