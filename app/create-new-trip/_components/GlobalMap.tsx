"use client";

import { useTripDetail } from "@/app/provider";
import { extractCoordinates } from "@/lib/trip-coordinates";
import type { Feature,Point } from "geojson";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect,useMemo,useRef,useState } from "react";

const token = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
type Filter = "all" | "hotel" | "activity";
type TripPoint = Feature<Point, { title: string; type: Exclude<Filter, "all"> }>;

export default function GlobalMap({ active = true }: { active?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const { tripDetailInfo } = useTripDetail();
  const points = useMemo(() => {
    const features: TripPoint[] = [];
    const add = (title: string, type: "hotel" | "activity", value: unknown) => {
      const coordinates = extractCoordinates(value);
      if (coordinates && (filter === "all" || filter === type)) features.push({ type: "Feature", geometry: { type: "Point", coordinates }, properties: { title, type } });
    };
    tripDetailInfo?.hotels?.forEach((hotel) => add(hotel.hotel_name, "hotel", hotel.geo_coordinates));
    tripDetailInfo?.itinerary?.forEach((day) => {
      const activities = day.activities ?? day.places ?? (Array.isArray(day.plan) ? day.plan : []);
      activities.forEach((place) => add(place.place_name, "activity", place.geo_coordinates));
    });
    return features;
  }, [tripDetailInfo, filter]);

  useEffect(() => {
    const element = container.current;
    if (!element || !token) return;
    let frame = 0;
    let disposed = false;
    const initialize = () => {
      if (disposed || !element.clientWidth || !element.clientHeight) return;
      if (mapRef.current) { mapRef.current.resize(); return; }
      try {
        const map = new mapboxgl.Map({ container: element, accessToken: token, style: "mapbox://styles/mapbox/streets-v12", projection: { name: "globe" }, center: [20, 15], zoom: 1.5, attributionControl: true, antialias: false });
        mapRef.current = map;
        map.on("error", () => { if (!disposed && !map.isStyleLoaded()) setError("The map couldn’t load. Check your connection and map configuration."); });
        map.on("load", () => {
          if (disposed) return;
          map.addSource("trip-points", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
          map.addLayer({ id: "trip-points-circle", type: "circle", source: "trip-points", paint: { "circle-radius": 6, "circle-color": ["match", ["get", "type"], "hotel", "#a78bfa", "#22d3ee"], "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" } });
          map.addLayer({ id: "trip-points-label", type: "symbol", source: "trip-points", layout: { "text-field": ["get", "title"], "text-size": 11, "text-anchor": "top", "text-offset": [0, 1] }, paint: { "text-color": "#ffffff", "text-halo-color": "#151027", "text-halo-width": 1.5 } });
          map.on("click", "trip-points-circle", (event) => {
            const feature = event.features?.[0];
            if (!feature || feature.geometry.type !== "Point") return;
            const coordinates: [number, number] = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
            while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
            new mapboxgl.Popup({ offset: 10, closeButton: false }).setLngLat(coordinates).setText(String(feature.properties?.title ?? "Place")).addTo(map);
          });
          map.on("mouseenter", "trip-points-circle", () => { map.getCanvas().style.cursor = "pointer"; });
          map.on("mouseleave", "trip-points-circle", () => { map.getCanvas().style.cursor = ""; });
          setReady(true);
        });
      } catch { setError("Your browser couldn’t start the map. You can still explore the itinerary."); }
    };
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(initialize);
    });
    observer.observe(element);
    initialize();
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    (map.getSource("trip-points") as mapboxgl.GeoJSONSource | undefined)?.setData({ type: "FeatureCollection", features: points });
    if (points.length && active) {
      const bounds = new mapboxgl.LngLatBounds();
      points.forEach((point) => bounds.extend(point.geometry.coordinates as [number, number]));
      map.fitBounds(bounds, { padding: 45, maxZoom: 12, duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500 });
    }
  }, [points, ready, active]);

  useEffect(() => {
    if (active) mapRef.current?.resize();
    else mapRef.current?.stop();
  }, [active]);

  if (!token) return <div role="status" className="flex h-full items-center justify-center bg-background p-6 text-center text-muted-foreground">Map preview is unavailable. Add a Mapbox key to enable it.</div>;
  return <div className="relative h-full w-full bg-background">
    <div ref={container} className="absolute inset-0" />
    {error && <p role="status" className="absolute inset-x-4 bottom-4 rounded-xl border border-border bg-background/95 p-4 text-sm text-muted-foreground">{error}</p>}
    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
      {([['all', 'All places'], ['hotel', 'Hotels'], ['activity', 'Activities']] as const).map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)} className={`rounded-full border border-border px-4 py-2 text-xs font-medium shadow-sm ${filter === value ? 'bg-primary text-white' : 'bg-background/95 text-foreground'}`}>{label}</button>)}
    </div>
  </div>;
}
