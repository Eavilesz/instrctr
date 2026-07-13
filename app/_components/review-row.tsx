import type { Review } from "@/app/_lib/types";
import { formatTime } from "@/app/_lib/date";

export function ReviewRow({
  review,
  onToggle,
  onRemove,
  onEmailChange,
  autoFocus,
}: {
  review: Review;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onEmailChange: (id: string, email: string) => void;
  autoFocus?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 border-b border-border-soft px-4 py-2 last:border-b-0 sm:px-5">
      <button
        type="button"
        role="checkbox"
        aria-checked={review.done}
        aria-label={
          review.done ? "Mark review as not done" : "Mark review as done"
        }
        onClick={() => onToggle(review.id)}
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-colors ${
          review.done
            ? "border-success bg-success"
            : "border-ink-faint hover:border-success"
        }`}
      >
        {review.done && (
          <svg
            viewBox="0 0 12 12"
            className="h-[9px] w-[9px] text-surface"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6.2 4.8 9 10 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <input
        type="email"
        value={review.email}
        onChange={(e) => onEmailChange(review.id, e.target.value)}
        placeholder="student@email.com"
        autoFocus={autoFocus}
        className={`min-w-0 flex-1 truncate border-none bg-transparent font-mono text-[13px] outline-none placeholder:text-ink-faint ${
          review.done ? "text-ink-soft line-through decoration-border" : "text-foreground"
        }`}
      />

      <span className="w-16 shrink-0 text-right font-mono text-[11.5px] text-ink-faint tabular-nums max-sm:hidden">
        {formatTime(new Date(review.createdAt))}
      </span>

      <button
        type="button"
        aria-label="Remove review"
        onClick={() => onRemove(review.id)}
        className="w-5 shrink-0 text-center text-sm text-ink-faint opacity-0 transition-opacity hover:text-danger focus-visible:opacity-100 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
