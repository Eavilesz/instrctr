import { formatMonthLabel, formatWeekRange } from "@/app/_lib/date";
import { logout } from "@/app/_lib/auth-actions";
import { ThemeToggle } from "./theme-toggle";

export function WeekNav({
  weekStart,
  weekTotal,
  onPrevWeek,
  onNextWeek,
}: {
  weekStart: Date;
  weekTotal: number;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}) {
  return (
    <header className="mb-7 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
      <div className="flex items-center gap-2.5">
        <span className="font-display text-[21px] font-semibold">
          Review Log
        </span>
        <ThemeToggle />
      </div>

      <div className="flex items-center gap-3.5">
        <button
          type="button"
          aria-label="Previous week"
          onClick={onPrevWeek}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
        >
          ‹
        </button>
        <div className="min-w-[180px] text-center">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            {formatMonthLabel(weekStart)}
          </span>
          <span className="font-display text-base">
            {formatWeekRange(weekStart)}
          </span>
        </div>
        <button
          type="button"
          aria-label="Next week"
          onClick={onNextWeek}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
        >
          ›
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right leading-tight">
          <span className="font-mono text-[22px] font-semibold text-accent tabular-nums">
            {weekTotal}
          </span>
          <span className="block text-[11px] text-ink-soft">
            reviews this week
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
            aria-label="Sign out"
            title="Sign out"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
              <path
                d="M7.5 2.5H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h3.5M13 14l4-4-4-4M17 10H7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </header>
  );
}
