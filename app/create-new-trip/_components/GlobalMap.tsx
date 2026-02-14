"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTripDetail } from "@/app/provider";
import dynamic from 'next/dynamic';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

/* @ts-ignore */
export default function GlobalMap() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const isUserInteracting = useRef(false);
    const [errorMsg, setErrorMsg] = useState("");
    /* @ts-ignore */
    const { tripDetailInfo } = useTripDetail();
    const [filter, setFilter] = useState<'all' | 'hotel' | 'activity'>('all');

    /* -----------------------------
       Initialize Map (Imperative)
    ------------------------------ */
    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;
        if (!MAPBOX_TOKEN) {
            setErrorMsg("Missing Mapbox API Key");
            return;
        }

        mapboxgl.accessToken = MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            projection: "globe" as any,
            center: [20, 15], // Initial view
            zoom: 1.5,
            pitch: 0,
            attributionControl: false,
        });

        mapRef.current = map;

        map.on("load", () => {
            map.resize();
            // Custom Atmosphere (Starry Night / Deep Space feel logic passed by user)
            map.setFog({
                color: "rgb(186,210,235)", // Lower atmosphere
                "high-color": "rgb(36,92,223)", // Upper atmosphere
                "horizon-blend": 0.04, // Atmosphere thickness (default 0.2 at low zooms)
                "space-color": "rgb(11,11,25)", // Background color
                "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
            });

            /* 🗺️ GeoJSON Source */
            map.addSource("trip-points", {
                type: "geojson",
                data: { type: "FeatureCollection", features: [] },
            });

            /* 🔵 Dots Layer (Circle) */
            map.addLayer({
                id: "trip-points-circle",
                type: "circle",
                source: "trip-points",
                paint: {
                    "circle-radius": 6,
                    "circle-color": [
                        "match",
                        ["get", "type"],
                        "hotel", "#ef4444", // Red for hotels
                        "activity", "#3b82f6", // Blue for activities
                        "#cccccc",
                    ],
                    "circle-stroke-width": 2,
                    "circle-stroke-color": "#ffffff",
                    "circle-opacity": 0.9,
                },
            });

            /* 🏷️ Text Layer */
            map.addLayer({
                id: "trip-points-label",
                type: "symbol",
                source: "trip-points",
                layout: {
                    "text-field": ["get", "title"],
                    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
                    "text-size": 11,
                    "text-anchor": "top",
                    "text-offset": [0, 1], // Offset below the circle
                    "text-allow-overlap": false,
                    "text-ignore-placement": false,
                },
                paint: {
                    "text-color": "#ffffff",
                    "text-halo-color": "rgba(0,0,0,0.8)",
                    "text-halo-width": 1.5,
                },
            });

            /* 🖱️ Interactions */
            map.on("click", "trip-points-circle", (e) => {
                if (!e.features?.[0]) return;

                const coordinates = (e.features[0].geometry as any).coordinates.slice();
                const description = e.features[0].properties?.title;
                const type = e.features[0].properties?.type;

                // Ensure cursor is reasonably close to feature for popup
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup({ offset: 10, closeButton: false })
                    .setLngLat(coordinates)
                    .setHTML(
                        `<div class="font-bold text-sm text-black mb-1">${description}</div>
                         <div class="text-xs text-gray-500 capitalize">${type}</div>`
                    )
                    .addTo(map);
            });

            map.on("mouseenter", "trip-points-circle", () => {
                map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", "trip-points-circle", () => {
                map.getCanvas().style.cursor = "";
            });
        });

        // Disable auto-rotation on mobile for better performance/ux
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
        let animationFrameId: number;

        // 🌀 Auto-Rotation Logic
        const spin = () => {
            // Always schedule the next frame to keep the loop alive
            animationFrameId = requestAnimationFrame(spin);

            if (!mapRef.current || isMobile || document.hidden) return;
            if (isUserInteracting.current) return;
            if (map.getZoom() > 4) return; // Only spin when zoomed out

            const center = map.getCenter();
            center.lng -= 0.05; // Spin speed
            map.easeTo({ center, duration: 1000, easing: (n) => n });
        };

        // Restart interaction after timeout
        const restartSpin = () => {
            isUserInteracting.current = false;
        };

        // Events to stop spinning on interaction
        map.on("mousedown", () => { isUserInteracting.current = true; });
        map.on("dragstart", () => { isUserInteracting.current = true; });

        // Resume spinning when interaction ends
        map.on("mouseup", restartSpin);
        map.on("touchend", restartSpin);
        map.on("dragend", restartSpin);
        map.on("moveend", () => {
            // Optional: Add a small delay if needed, but simple reset works for now
            if (!map.isMoving()) {
                isUserInteracting.current = false;
            }
        });

        // Start animation
        if (!isMobile) {
            spin();
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            map.remove();
            mapRef.current = null;
        };
    }, []);

    /* -----------------------------
       Sync Data & Filter 
       (Mapping tripDetailInfo to GeoJSON)
    ------------------------------ */
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const features: any[] = [];

        // Helper to extract lat/lng from various formats
        const extractCoords = (geo: any) => {
            if (!geo) return null;
            if (typeof geo === 'object') {
                const lat = geo.lat || geo.latitude;
                const lng = geo.lng || geo.longitude;
                if (lat && lng) return [lng, lat];
            } else if (typeof geo === 'string') {
                const parts = geo.split(',');
                if (parts.length === 2) {
                    return [parseFloat(parts[1]), parseFloat(parts[0])]; // usually "lat,lng" so index 1 is lng, 0 is lat
                }
            }
            return null;
        };

        if (tripDetailInfo) {
            // 🏨 HOTELS
            if (filter === 'all' || filter === 'hotel') {
                /* @ts-ignore */
                tripDetailInfo.hotels?.forEach((hotel: any) => {
                    const coords = extractCoords(hotel.geo_coordinates);
                    if (coords) {
                        features.push({
                            type: "Feature",
                            geometry: { type: "Point", coordinates: coords },
                            properties: { title: hotel.hotel_name, type: "hotel" },
                        });
                    }
                });
            }

            // 📍 ACTIVITIES
            if (filter === 'all' || filter === 'activity') {
                /* @ts-ignore */
                tripDetailInfo.itinerary?.forEach((day: any) => {
                    /* @ts-ignore */
                    (day.activities || day.plan)?.forEach((act: any) => {
                        const coords = extractCoords(act.geo_coordinates);
                        if (coords) {
                            features.push({
                                type: "Feature",
                                geometry: { type: "Point", coordinates: coords },
                                properties: { title: act.place_name, type: "activity" },
                            });
                        }
                    });
                });
            }
        }

        const updateSource = () => {
            const source = map.getSource("trip-points") as mapboxgl.GeoJSONSource;
            if (source) {
                source.setData({ type: "FeatureCollection", features });

                // Auto-zoom to fit all filtered locations
                if (features.length > 0 && filter !== 'all') {
                    // Stop auto-rotation when zooming to specific filter
                    isUserInteracting.current = true;

                    // Calculate bounds from all features
                    const bounds = new mapboxgl.LngLatBounds();
                    features.forEach((feature) => {
                        bounds.extend(feature.geometry.coordinates as [number, number]);
                    });

                    // Fit map to bounds with padding
                    map.fitBounds(bounds, {
                        padding: { top: 100, bottom: 100, left: 100, right: 100 },
                        maxZoom: 12,
                        duration: 1500
                    });
                }
            }
        };

        if (map.isStyleLoaded()) {
            updateSource();
        } else {
            map.once("style.load", updateSource);
        }
    }, [tripDetailInfo, filter]);

    /* -----------------------------
       Geocoder Handler
    ------------------------------ */
    const handleRetrieve = (res: any) => {
        const feature = res.features[0];
        const map = mapRef.current;
        if (feature && map) {
            isUserInteracting.current = true;
            map.flyTo({
                center: feature.geometry.coordinates,
                zoom: 14,
                essential: true
            });
        }
    };

    if (errorMsg) {
        return (
            <div className="flex items-center justify-center h-full text-red-400 bg-gray-900 rounded-lg">
                <p>{errorMsg}</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-[#0b0b19]">
            {/* MAP CONTAINER */}
            <div
                ref={mapContainer}
                className="absolute inset-0 w-full h-full"
            />

            {/* OVERLAYS */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-col gap-3 pointer-events-none">

                {/* FILTER CHIPS ROW */}
                <div className="flex flex-row items-center gap-3 pointer-events-auto">
                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all ${filter === 'all' ? 'bg-white text-black scale-105' : 'bg-black/50 text-white backdrop-blur-md hover:bg-black/70'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('hotel')}
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1 ${filter === 'hotel' ? 'bg-red-500 text-white scale-105' : 'bg-black/50 text-white backdrop-blur-md hover:bg-black/70'}`}
                        >
                            🏨 Hotels
                        </button>
                        <button
                            onClick={() => setFilter('activity')}
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1 ${filter === 'activity' ? 'bg-blue-500 text-white scale-105' : 'bg-black/50 text-white backdrop-blur-md hover:bg-black/70'}`}
                        >
                            📍 Activities
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
