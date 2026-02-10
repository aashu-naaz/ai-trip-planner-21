"use client";
import React, { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { useTripDetail } from '@/app/provider';

/* @ts-ignore */
export default function GlobalMap() {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
    const markersRef = useRef<mapboxgl.Marker[]>([]);

    /* @ts-ignore */
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        if (!mapContainerRef.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

        if (!mapInstanceRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current!,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-74.5, 40],
                zoom: 1.7,
                projection: 'globe' as any // Enable globe projection
            });
            mapInstanceRef.current = map;

            map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        }
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current || !tripDetailInfo) return;

        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        const bounds = new mapboxgl.LngLatBounds();
        let hasPoints = false;

        /* @ts-ignore */
        tripDetailInfo?.itinerary?.forEach((itinerary: any) => {
            /* @ts-ignore */
            (itinerary.activities || itinerary.plan)?.forEach((activity: any) => {
                let lat, lng;

                // Handle different coordinate formats
                if (activity.geo_coordinates) {
                    if (typeof activity.geo_coordinates === 'object') {
                        // formats: { lat, lng } or { latitude, longitude }
                        lat = activity.geo_coordinates.lat || activity.geo_coordinates.latitude;
                        lng = activity.geo_coordinates.lng || activity.geo_coordinates.longitude;
                    } else if (typeof activity.geo_coordinates === 'string') {
                        // format: "lat,lng"
                        const parts = activity.geo_coordinates.split(',');
                        if (parts.length === 2) {
                            lat = parseFloat(parts[0]);
                            lng = parseFloat(parts[1]);
                        }
                    }
                }

                if (lat && lng) {
                    const marker = new mapboxgl.Marker({ color: 'red' })
                        .setLngLat([lng, lat])
                        .setPopup(
                            new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
                        )
                        .addTo(mapInstanceRef.current!);

                    markersRef.current.push(marker);
                    bounds.extend([lng, lat]);
                    hasPoints = true;
                }
            });
        });

        if (hasPoints) {
            mapInstanceRef.current.fitBounds(bounds, {
                padding: 200,
                duration: 2500 // Smooth animation
            });
        }

    }, [tripDetailInfo]);


    return (
        <div ref={mapContainerRef} className="rounded-lg" style={{ width: '100%', height: '100%', borderRadius: 10 }}></div>
    );
}
