import { MAX_SCORE, type RubricSection } from "@/app/_lib/final-review-rubric";

export type ItemState = { checked: boolean; feedback: string };
export type ReviewState = Record<string, ItemState>;

export function createInitialReviewState(rubric: RubricSection[]): ReviewState {
  const state: ReviewState = {};
  for (const section of rubric) {
    for (const item of section.items) {
      state[item.id] = { checked: true, feedback: "" };
    }
  }
  return state;
}

export function computeScore(rubric: RubricSection[], state: ReviewState): number {
  let deducted = 0;
  for (const section of rubric) {
    for (const item of section.items) {
      if (!state[item.id]?.checked) deducted += item.points;
    }
  }
  const score = MAX_SCORE - deducted;
  return parseFloat(score.toFixed(2));
}

const REPORT_HEADER = `Good job on your final project student!

The effort you've put into your final project is evident. There are a couple of fixes to make so that I can approve your project.

Good luck!`;

const REPORT_FOOTER = `I left a detailed feedback in the pull request in GitHub.

Good luck!`;

const FAILED_ITEMS_LEGEND =
  "Below, any unchecked box (`[ ]`) marks an item you still need to address. My notes on how to fix it are listed right under each one as **Feedback**.";

export function generateReport(
  rubric: RubricSection[],
  state: ReviewState,
  score: number,
): string {
  const failedItems = rubric.flatMap((section) => section.items).filter(
    (item) => !state[item.id]?.checked,
  );

  const parts = [
    REPORT_HEADER,
    `Current score: ${score} points`,
    REPORT_FOOTER,
  ];

  if (failedItems.length > 0) {
    parts.push(FAILED_ITEMS_LEGEND);
  }

  for (const item of failedItems) {
    const feedbackLines = (state[item.id]?.feedback ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const lines = [`- [ ] <!--${item.points}--> ${item.text}`];
    if (feedbackLines.length > 0) {
      lines.push("", "  **Feedback:**", ...feedbackLines.map((line) => `  - ${line}`));
    }
    parts.push(lines.join("\n"));
  }

  return parts.join("\n\n") + "\n";
}
