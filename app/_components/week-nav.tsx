import { formatMonthLabel, formatWeekRange } from "@/app/_lib/date";

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
      <div className="flex items-baseline gap-2.5">
        <span className="font-display text-[21px] font-semibold">
          Review Log
        </span>
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

      <div className="text-right leading-tight">
        <span className="font-mono text-[22px] font-semibold text-accent tabular-nums">
          {weekTotal}
        </span>
        <span className="block text-[11px] text-ink-soft">
          reviews this week
        </span>
      </div>
    </header>
  );
}
