import type { RubricSection } from "@/app/_lib/final-review-rubric";
import type { ReviewState } from "@/app/_lib/final-review-report";
import { FinalReviewItem } from "./final-review-item";

export function FinalReviewSection({
  section,
  reviewState,
  onToggle,
  onFeedbackChange,
}: {
  section: RubricSection;
  reviewState: ReviewState;
  onToggle: (id: string) => void;
  onFeedbackChange: (id: string, feedback: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2 border-b border-border-soft bg-surface-alt px-4 py-3 sm:px-5">
        <span className="font-display text-[16px]">{section.title}</span>
      </div>

      <div>
        {section.items.map((item, index) => {
          const prevItem = section.items[index - 1];
          const showSubsectionTitle =
            !!item.subsectionTitle && item.subsectionTitle !== prevItem?.subsectionTitle;
          const showGroupLabel = index === 0 || prevItem.groupLabel !== item.groupLabel;

          return (
            <div key={item.id}>
              {showSubsectionTitle && (
                <div className="border-b border-border-soft bg-surface-alt/60 px-4 py-1.5 sm:px-5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                    {item.subsectionTitle}
                  </span>
                </div>
              )}
              <FinalReviewItem
                item={item}
                state={reviewState[item.id]}
                showGroupLabel={showGroupLabel}
                onToggle={onToggle}
                onFeedbackChange={onFeedbackChange}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
