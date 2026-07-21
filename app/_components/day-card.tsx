import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Review } from "@/app/_lib/types";
import { WEEKDAYS, formatDayDate } from "@/app/_lib/date";
import { ReviewRow, NewReviewRow } from "./review-row";

export type DayCardHandle = {
  focusNewInput: () => void;
};

export const DayCard = forwardRef(function DayCard(
  {
    day,
    isToday,
    reviews,
    onAdd,
    onToggle,
    onRemove,
    onUsernameChange,
  }: {
    day: Date;
    isToday: boolean;
    reviews: Review[];
    onAdd: (day: Date, username: string) => void;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
    onUsernameChange: (id: string, username: string) => void;
  },
  ref: React.Ref<DayCardHandle>,
) {
  const [open, setOpen] = useState(isToday);
  const dayName = WEEKDAYS[day.getDay()];
  const newInputRef = useRef<HTMLInputElement>(null);
  const focusAfterOpenRef = useRef(false);

  useImperativeHandle(ref, () => ({
    focusNewInput() {
      if (open) {
        newInputRef.current?.focus();
      } else {
        focusAfterOpenRef.current = true;
        setOpen(true);
      }
    },
  }));

  useEffect(() => {
    if (open && focusAfterOpenRef.current) {
      focusAfterOpenRef.current = false;
      newInputRef.current?.focus();
    }
  }, [open]);

  return (
    <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 border-b border-border-soft bg-surface-alt px-4 py-3 text-left sm:px-5"
      >
        <svg
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 shrink-0 text-ink-faint transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7.5 4.5L13 10l-5.5 5.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

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
          <span className="text-sm font-semibold">
            {reviews.filter((r) => r.done).length}
          </span>
          <span className="text-[11px] text-ink-faint">today</span>
        </div>
      </button>

      {open && (
        <div>
          {reviews.map((review) => (
            <ReviewRow
              key={review.id}
              review={review}
              onToggle={onToggle}
              onRemove={onRemove}
              onUsernameChange={onUsernameChange}
            />
          ))}
          <NewReviewRow inputRef={newInputRef} onAdd={(username) => onAdd(day, username)} />
        </div>
      )}
    </section>
  );
});
