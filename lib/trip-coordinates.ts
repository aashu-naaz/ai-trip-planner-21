export function extractCoordinates(value: unknown): [number, number] | null {
  let lat: unknown;
  let lng: unknown;
  if (typeof value === "string") {
    const parts = value.split(",").map((part) => part.trim());
    if (parts.length !== 2 || parts.some((part) => !part)) return null;
    [lat, lng] = parts.map(Number);
  } else if (value && typeof value === "object") {
    const coordinates = value as Record<string, unknown>;
    lat = coordinates.lat ?? coordinates.latitude;
    lng = coordinates.lng ?? coordinates.longitude;
  }
  if (typeof lat !== "number" || typeof lng !== "number" || !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return [lng, lat];
}
