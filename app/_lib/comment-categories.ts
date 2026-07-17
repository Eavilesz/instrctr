import type { CommentCategory } from "./types";

export const CATEGORY_BADGE_CLASSES: Record<CommentCategory, string> = {
  Approval: "border-success/40 bg-success/10 text-success",
  Reject: "border-danger/40 bg-danger/10 text-danger",
  Improvements: "border-accent/40 bg-accent-soft text-accent",
  Comment: "border-warning/40 bg-warning/10 text-warning",
  Others: "border-border bg-surface-alt text-ink-soft",
};
