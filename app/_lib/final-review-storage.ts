import { useSyncExternalStore } from "react";
import { RUBRICS, RUBRIC_KINDS, type RubricKind } from "@/app/_lib/final-review-rubric";
import { createInitialReviewState, type ReviewState } from "@/app/_lib/final-review-report";

const STORAGE_KEY = "instrctr:final-review";

export type ReviewStatesByKind = Record<RubricKind, ReviewState>;
export type StoredReview = { rubricKind: RubricKind; reviewStates: ReviewStatesByKind };

function readStoredReview(): StoredReview | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as {
      rubricKind?: RubricKind;
      reviewStates?: Partial<ReviewStatesByKind>;
    };

    const rubricKind: RubricKind = parsed.rubricKind === "custom" ? "custom" : "regular";

    const reviewStates = {} as ReviewStatesByKind;
    for (const kind of RUBRIC_KINDS) {
      const defaults = createInitialReviewState(RUBRICS[kind]);
      const saved = parsed.reviewStates?.[kind];
      const merged: ReviewState = {};
      for (const id of Object.keys(defaults)) {
        merged[id] = saved?.[id] ?? defaults[id];
      }
      reviewStates[kind] = merged;
    }

    return { rubricKind, reviewStates };
  } catch {
    return null;
  }
}

export function saveReview(rubricKind: RubricKind, reviewStates: ReviewStatesByKind) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ rubricKind, reviewStates }));
  } catch {
    // localStorage unavailable — review just won't persist across reloads
  }
}

// Cached so getSnapshot returns a stable reference (required by useSyncExternalStore)
// and localStorage is only read once per page load.
let cachedSnapshot: StoredReview | null | undefined;

function getSnapshot(): StoredReview | null {
  if (cachedSnapshot === undefined) cachedSnapshot = readStoredReview();
  return cachedSnapshot;
}

function getServerSnapshot(): StoredReview | null {
  return null;
}

function subscribe(): () => void {
  return () => {};
}

/** Reads any previously saved review once, without causing an SSR hydration mismatch. */
export function useStoredReview(): StoredReview | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
