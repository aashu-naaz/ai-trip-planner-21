import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

export async function POST(req: NextRequest) {
    const { placeName } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.displayName,places.photos,places.id'
        }
    };

    try {
        const result = await axios.post(BASE_URL, {
            textQuery: placeName
        },
            config);

        const placeRefName = result.data?.places[0]?.photos[0]?.name;
        const PhotoRefUrl = `https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${apiKey}`
        return NextResponse.json(PhotoRefUrl);
    }
    catch (e) {
        return NextResponse.json({ error: e instanceof Error ? e.message : String(e) })
    }
}
