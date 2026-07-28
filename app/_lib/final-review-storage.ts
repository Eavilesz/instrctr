import { useSyncExternalStore } from "react";
import { RUBRICS, RUBRIC_KINDS, type RubricKind } from "@/app/_lib/final-review-rubric";
import { createInitialReviewState, type ReviewState } from "@/app/_lib/final-review-report";

const STUDENTS_KEY = "instrctr:final-review:students";
const ACTIVE_STUDENT_KEY = "instrctr:final-review:active-student";
/** Superseded by STUDENTS_KEY once multiple students per review were supported. */
const LEGACY_KEY = "instrctr:final-review";
const IMPORTED_STUDENT_NAME = "Imported review";

export type ReviewStatesByKind = Record<RubricKind, ReviewState>;
export type StoredReview = { rubricKind: RubricKind; reviewStates: ReviewStatesByKind };
export type StoredReviewsByStudent = Record<string, StoredReview>;

function normalizeStoredReview(parsed: {
  rubricKind?: RubricKind;
  reviewStates?: Partial<ReviewStatesByKind>;
}): StoredReview {
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
}

/** One-time migration so a review saved before per-student storage existed isn't silently lost. */
function migrateLegacyReview(): StoredReviewsByStudent | null {
  const raw = window.localStorage.getItem(LEGACY_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      rubricKind?: RubricKind;
      reviewStates?: Partial<ReviewStatesByKind>;
    };
    const migrated: StoredReviewsByStudent = {
      [IMPORTED_STUDENT_NAME]: normalizeStoredReview(parsed),
    };
    window.localStorage.setItem(STUDENTS_KEY, JSON.stringify(migrated));
    window.localStorage.setItem(ACTIVE_STUDENT_KEY, IMPORTED_STUDENT_NAME);
    return migrated;
  } catch {
    return null;
  } finally {
    window.localStorage.removeItem(LEGACY_KEY);
  }
}

function readStoredReviews(): StoredReviewsByStudent {
  try {
    const raw = window.localStorage.getItem(STUDENTS_KEY);
    if (!raw) return migrateLegacyReview() ?? {};

    const parsed = JSON.parse(raw) as Record<
      string,
      { rubricKind?: RubricKind; reviewStates?: Partial<ReviewStatesByKind> }
    >;
    const result: StoredReviewsByStudent = {};
    for (const [name, entry] of Object.entries(parsed)) {
      result[name] = normalizeStoredReview(entry);
    }
    return result;
  } catch {
    return {};
  }
}

/** Synchronous read for a single student, safe to call after mount (e.g. when switching students). */
export function getStoredReview(studentName: string): StoredReview | null {
  const name = studentName.trim();
  if (!name) return null;
  try {
    return readStoredReviews()[name] ?? null;
  } catch {
    return null;
  }
}

export function saveReview(
  studentName: string,
  rubricKind: RubricKind,
  reviewStates: ReviewStatesByKind,
) {
  const name = studentName.trim();
  if (!name) return;
  try {
    const all = readStoredReviews();
    all[name] = { rubricKind, reviewStates };
    window.localStorage.setItem(STUDENTS_KEY, JSON.stringify(all));
    window.localStorage.setItem(ACTIVE_STUDENT_KEY, name);

    // Keep the cached snapshot current — client-side navigation (e.g. Link) remounts
    // this page's components without reloading the JS module, so a stale cache here
    // would make every save made after the first mount look like it never happened.
    cachedSnapshot = {
      studentNames: Object.keys(all).sort(),
      activeStudent: name,
      activeReview: all[name],
    };
  } catch {
    // localStorage unavailable — review just won't persist across reloads
  }
}

/** Marks which student's review should be restored next time, without changing their saved data. */
export function setActiveStudent(studentName: string) {
  const name = studentName.trim();
  if (!name) return;
  try {
    window.localStorage.setItem(ACTIVE_STUDENT_KEY, name);
    if (cachedSnapshot) {
      cachedSnapshot = { ...cachedSnapshot, activeStudent: name };
    }
  } catch {
    // localStorage unavailable — active student just won't persist across reloads
  }
}

function readActiveStudentName(): string | null {
  try {
    return window.localStorage.getItem(ACTIVE_STUDENT_KEY);
  } catch {
    return null;
  }
}

export function deleteReview(studentName: string) {
  const name = studentName.trim();
  if (!name) return;
  try {
    const all = readStoredReviews();
    delete all[name];
    window.localStorage.setItem(STUDENTS_KEY, JSON.stringify(all));

    const activeStudent = readActiveStudentName();
    const wasActive = activeStudent === name;
    if (wasActive) window.localStorage.removeItem(ACTIVE_STUDENT_KEY);

    if (cachedSnapshot) {
      cachedSnapshot = {
        studentNames: Object.keys(all).sort(),
        activeStudent: wasActive ? null : cachedSnapshot.activeStudent,
        activeReview: wasActive ? null : cachedSnapshot.activeReview,
      };
    }
  } catch {
    // localStorage unavailable — nothing to clean up
  }
}

export type InitialReviewData = {
  studentNames: string[];
  activeStudent: string | null;
  activeReview: StoredReview | null;
};

const EMPTY_SNAPSHOT: InitialReviewData = {
  studentNames: [],
  activeStudent: null,
  activeReview: null,
};

// Cached so getSnapshot returns a stable reference (required by useSyncExternalStore)
// and localStorage is only read once per page load.
let cachedSnapshot: InitialReviewData | undefined;

function getSnapshot(): InitialReviewData {
  if (cachedSnapshot === undefined) {
    const all = readStoredReviews();
    const studentNames = Object.keys(all).sort();
    const activeStudent = readActiveStudentName();
    const activeReview = activeStudent ? all[activeStudent] ?? null : null;
    cachedSnapshot = { studentNames, activeStudent, activeReview };
  }
  return cachedSnapshot;
}

function getServerSnapshot(): InitialReviewData {
  return EMPTY_SNAPSHOT;
}

function subscribe(): () => void {
  return () => {};
}

/** Reads the list of known students and the last-active one once, without an SSR hydration mismatch. */
export function useInitialReviewData(): InitialReviewData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
