export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
] as const;

/** Most recent Sunday on or before `date`, at local midnight. */
export function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** The five review days (Sunday–Thursday) starting at `weekStart`. */
export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 5 }, (_, i) => addDays(weekStart, i));
}

export function dateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateKey(a) === dateKey(b);
}

export function formatDayDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatWeekRange(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 4);
  const sameYear = weekStart.getFullYear() === weekEnd.getFullYear();
  const startStr = weekStart.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: sameYear ? undefined : "numeric",
  });
  const endStr = weekEnd.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${startStr} – ${endStr}`;
}

export function formatMonthLabel(weekStart: Date): string {
  const weekEnd = addDays(weekStart, 4);
  if (weekStart.getMonth() === weekEnd.getMonth()) {
    return weekStart.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }
  const startLabel = weekStart.toLocaleDateString("en-US", { month: "short" });
  const endLabel = weekEnd.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return `${startLabel} / ${endLabel}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}
