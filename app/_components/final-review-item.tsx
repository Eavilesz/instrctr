import type { RubricItem } from "@/app/_lib/final-review-rubric";
import type { ItemState } from "@/app/_lib/final-review-report";

export function FinalReviewItem({
  item,
  state,
  showGroupLabel,
  onToggle,
  onFeedbackChange,
}: {
  item: RubricItem;
  state: ItemState;
  showGroupLabel: boolean;
  onToggle: (id: string) => void;
  onFeedbackChange: (id: string, feedback: string) => void;
}) {
  return (
    <div className="border-b border-border-soft px-4 py-3 last:border-b-0 sm:px-5">
      {showGroupLabel && item.groupLabel && (
        <p className="mb-1.5 font-sans text-xs font-medium text-ink-soft">
          {item.groupLabel}
        </p>
      )}

      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={state.checked}
          aria-label={state.checked ? "Mark item as failed" : "Mark item as passed"}
          onClick={() => onToggle(item.id)}
          className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-colors ${
            state.checked
              ? "border-success bg-success"
              : "border-danger hover:border-success"
          }`}
        >
          {state.checked && (
            <svg viewBox="0 0 12 12" className="h-[9px] w-[9px] text-surface" fill="none" aria-hidden="true">
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

        <p className="min-w-0 flex-1 font-sans text-sm leading-relaxed text-foreground">
          {item.text}
        </p>

        <span className="shrink-0 font-mono text-[11px] text-ink-faint tabular-nums">
          {item.points} pts
        </span>
      </div>

      {item.details && (
        <ul className="ml-[30px] mt-1.5 list-disc space-y-0.5 pl-4 font-sans text-xs text-ink-soft">
          {item.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}

      {!state.checked && (
        <textarea
          autoFocus
          value={state.feedback}
          onChange={(e) => onFeedbackChange(item.id, e.target.value)}
          placeholder="What does the student need to fix to earn these points?"
          rows={3}
          className="ml-[30px] mt-2 w-[calc(100%-30px)] resize-y rounded-md border border-border bg-surface-alt px-2.5 py-2 font-sans text-sm text-foreground outline-none focus:border-accent"
        />
      )}
    </div>
  );
}
