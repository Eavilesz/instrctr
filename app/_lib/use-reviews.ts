"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Review } from "./types";

const STORAGE_KEY = "instrctr:reviews";
const CHANGE_EVENT = "instrctr:reviews-changed";

let cachedRaw: string | null = null;
let cachedReviews: Review[] = [];

function readReviews(): Review[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedReviews;
  cachedRaw = raw;
  try {
    const parsed = raw ? JSON.parse(raw) : [];
    cachedReviews = Array.isArray(parsed) ? parsed : [];
  } catch {
    cachedReviews = [];
  }
  return cachedReviews;
}

const EMPTY_REVIEWS: Review[] = [];

function getServerSnapshot(): Review[] {
  return EMPTY_REVIEWS;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Reviews persisted to localStorage, kept in sync across components and tabs. */
export function useReviews() {
  const reviews = useSyncExternalStore(subscribe, readReviews, getServerSnapshot);

  const setReviews = useCallback((updater: (prev: Review[]) => Review[]) => {
    const next = updater(readReviews());
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage unavailable (private mode, quota exceeded) — nothing to do
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return [reviews, setReviews] as const;
}
