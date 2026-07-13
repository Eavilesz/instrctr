import type { Review } from "@/app/_lib/types";
import { WEEKDAYS, formatDayDate } from "@/app/_lib/date";
import { ReviewRow } from "./review-row";

export function DayCard({
  day,
  isToday,
  reviews,
  onAdd,
  onToggle,
  onRemove,
  onEmailChange,
  autoFocusId,
}: {
  day: Date;
  isToday: boolean;
  reviews: Review[];
  onAdd: (day: Date) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEmailChange: (id: string, email: string) => void;
  autoFocusId: string | null;
}) {
  const dayName = WEEKDAYS[day.getDay()];

  return (
    <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-3 border-b border-border-soft bg-surface-alt px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-baseline gap-2">
          {isToday && (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
          )}
          <span className="font-display text-[16px]">{dayName}</span>
          <span className="font-mono text-xs text-ink-soft tabular-nums">
            {formatDayDate(day)}
          </span>
        </div>

        <div className="ml-auto flex items-baseline gap-1 font-mono tabular-nums">
          <span className="text-sm font-semibold">{reviews.length}</span>
          <span className="text-[11px] text-ink-faint">today</span>
        </div>

        <button
          type="button"
          onClick={() => onAdd(day)}
          className="whitespace-nowrap rounded-md bg-accent-soft px-[11px] py-1.5 text-[12.5px] font-semibold text-accent transition-[filter] hover:brightness-95 dark:hover:brightness-125"
        >
          + New Review
        </button>
      </div>

      <div>
        {reviews.length === 0 ? (
          <p className="font-display px-4 py-[22px] text-[13px] italic text-ink-faint sm:px-5">
            No reviews logged yet.
          </p>
        ) : (
          reviews.map((review) => (
            <ReviewRow
              key={review.id}
              review={review}
              onToggle={onToggle}
              onRemove={onRemove}
              onEmailChange={onEmailChange}
              autoFocus={review.id === autoFocusId}
            />
          ))
        )}
      </div>
    </section>
  );
}
