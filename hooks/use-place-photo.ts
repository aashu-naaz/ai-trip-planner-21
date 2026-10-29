"use client";

import { useEffect,useState } from "react";

const requests = new Map<string, Promise<string | undefined>>();
type Attribution = { displayName: string; uri?: string };
const credits = new Map<string, Attribution[]>();
export const placePhotoAttributions = (placeName: string) => credits.get(placeName.trim()) ?? [];
const pending: (() => void)[] = [];
let active = 0;

export function getPlacePhoto(placeName: string): Promise<string | undefined> {
  const name = placeName.trim();
  if (!name) return Promise.resolve(undefined);
  const cached = requests.get(name);
  if (cached) return cached;
  const request = (async () => {
    if (active >= 4) await new Promise<void>((resolve) => pending.push(resolve));
    active++;
    try {
      const response = await fetch("/api/arcjet/google-place-detail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placeName: name }),
        signal: AbortSignal.timeout(10000),
      });
      const photo: unknown = response.ok ? await response.json() : null;
      // Accept legacy string responses while deployments transition to key-free photo URLs.
      if (typeof photo === "string" && /^https?:\/\//.test(photo)) return photo;
      if (photo && typeof photo === "object" && "url" in photo && typeof photo.url === "string" && photo.url.startsWith("https://")) {
        const authors = "attributions" in photo && Array.isArray(photo.attributions) ? photo.attributions : [];
        credits.set(name, authors.flatMap((author: unknown) => {
          if (!author || typeof author !== "object" || !("displayName" in author) || typeof author.displayName !== "string") return [];
          const uri = "uri" in author && typeof author.uri === "string" ? author.uri.replace(/^\/\//, "https://") : undefined;
          return [{ displayName: author.displayName, uri: uri?.startsWith("https://") ? uri : undefined }];
        }));
        return photo.url;
      }
      requests.delete(name);
      return undefined;
    } catch {
      requests.delete(name);
      return undefined;
    } finally {
      active--;
      pending.shift()?.();
    }
  })();
  requests.set(name, request);
  return request;
}

export function usePlacePhoto(placeName?: string) {
  const [photo, setPhoto] = useState<{ name: string; url?: string }>();
  useEffect(() => {
    if (!placeName) return;
    let subscribed = true;
    void getPlacePhoto(placeName).then((url) => {
      if (subscribed) setPhoto({ name: placeName, url });
    });
    return () => { subscribed = false; };
  }, [placeName]);
  return photo?.name === placeName ? photo?.url : undefined;
}
