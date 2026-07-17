import { MAX_SCORE, RUBRIC } from "@/app/_lib/final-review-rubric";

export type ItemState = { checked: boolean; feedback: string };
export type ReviewState = Record<string, ItemState>;

export function createInitialReviewState(): ReviewState {
  const state: ReviewState = {};
  for (const section of RUBRIC) {
    for (const item of section.items) {
      state[item.id] = { checked: true, feedback: "" };
    }
  }
  return state;
}

export function computeScore(state: ReviewState): number {
  let deducted = 0;
  for (const section of RUBRIC) {
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

export function generateReport(state: ReviewState, score: number): string {
  const failedItems = RUBRIC.flatMap((section) => section.items).filter(
    (item) => !state[item.id]?.checked,
  );

  const parts = [
    REPORT_HEADER,
    `Current score: ${score} points`,
    REPORT_FOOTER,
  ];

  for (const item of failedItems) {
    const feedbackLines = (state[item.id]?.feedback ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const lines = [`- [ ] <!--${item.points}--> ${item.text}`, ...feedbackLines.map((line) => `  - ${line}`)];
    parts.push(lines.join("\n"));
  }

  return parts.join("\n\n") + "\n";
}
