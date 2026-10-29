import axios from "axios";
import { NextRequest,NextResponse } from "next/server";

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { placeName } = body || {};
        const apiKey = process.env.GOOGLE_PLACE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY;

        if (typeof placeName !== 'string' || !placeName.trim() || !apiKey) {
            return NextResponse.json(null);
        }

        const config = {
            timeout: 8000,
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'places.displayName,places.photos,places.id'
            }
        };

        const result = await axios.post(BASE_URL, {
            textQuery: placeName.trim()
        },
            config);

        const photo = result.data?.places?.[0]?.photos?.[0];
        const placeRefName = photo?.name;
        if (!placeRefName) {
            console.log("No placeRefName found for:", placeName);
            return NextResponse.json(null);
        }
        // Resolve the photo on the server so the service key never reaches the browser.
        const media = await axios.get(`https://places.googleapis.com/v1/${placeRefName}/media`, {
            params: { maxHeightPx: 1000, maxWidthPx: 1000, skipHttpRedirect: true, key: apiKey },
            timeout: 8000,
        });
        const url: unknown = media.data?.photoUri;
        if (typeof url !== 'string' || !url.startsWith('https://')) return NextResponse.json(null);
        return NextResponse.json({ url, attributions: photo.authorAttributions ?? [] });
    }
    catch {
        return NextResponse.json(null)
    }
}
