"use client";

import { useEffect, useSyncExternalStore } from "react";

const key = "currentDraftTripId";
const eventName = "smartjourney:draft-change";
let memoryDraft: string | null = null;

function snapshot() {
  try { return localStorage.getItem(key); } catch { return memoryDraft; }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(eventName, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(eventName, listener); };
}
export function setDraftTripId(id: string | null) {
  memoryDraft = id;
  try { if (id) localStorage.setItem(key, id); else localStorage.removeItem(key); } catch { /* Private browsing can disable storage; keep this session in memory. */ }
  window.dispatchEvent(new Event(eventName));
}
export function useDraftTripId(urlId: string | null) {
  const draft = useSyncExternalStore(subscribe, snapshot, () => null);
  useEffect(() => {
    if (!urlId && !draft) setDraftTripId(crypto.randomUUID());
  }, [urlId, draft]);
  return urlId || draft;
}
