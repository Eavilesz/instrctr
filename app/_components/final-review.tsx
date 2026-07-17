"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RUBRICS, RUBRIC_LABELS, type RubricKind } from "@/app/_lib/final-review-rubric";
import {
  computeScore,
  createInitialReviewState,
  generateReport,
} from "@/app/_lib/final-review-report";
import { FinalReviewSection } from "./final-review-section";

const RUBRIC_KINDS = Object.keys(RUBRIC_LABELS) as RubricKind[];

export function FinalReview() {
  const [rubricKind, setRubricKind] = useState<RubricKind>("regular");
  const [reviewState, setReviewState] = useState(() =>
    createInitialReviewState(RUBRICS[rubricKind]),
  );
  const [copied, setCopied] = useState(false);

  const rubric = RUBRICS[rubricKind];
  const score = useMemo(() => computeScore(rubric, reviewState), [rubric, reviewState]);
  const report = useMemo(
    () => generateReport(rubric, reviewState, score),
    [rubric, reviewState, score],
  );

  function handleRubricChange(kind: RubricKind) {
    setRubricKind(kind);
    setReviewState(createInitialReviewState(RUBRICS[kind]));
  }

  function handleToggle(id: string) {
    setReviewState((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  }

  function handleFeedbackChange(id: string, feedback: string) {
    setReviewState((prev) => ({
      ...prev,
      [id]: { ...prev[id], feedback },
    }));
  }

  function handleCopy() {
    navigator.clipboard
      .writeText(report)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(console.error);
  }

  return (
    <>
      <header className="mb-7 flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="rounded-md border border-border px-2 py-1 font-mono text-xs text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
          >
            ← Instrctr
          </Link>
          <span className="font-display text-[21px] font-semibold">
            Final Project Review
          </span>
        </div>

        <div className="text-right leading-tight">
          <span className="font-mono text-[22px] font-semibold text-accent tabular-nums">
            {score}
          </span>
          <span className="block text-[11px] text-ink-soft">/ 100 points</span>
        </div>
      </header>

      <div className="mb-6 inline-flex gap-1 rounded-md border border-border p-0.5">
        {RUBRIC_KINDS.map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => handleRubricChange(kind)}
            className={`rounded-[5px] px-3 py-1.5 text-xs font-medium transition-colors ${
              kind === rubricKind
                ? "bg-accent text-surface"
                : "text-ink-soft hover:bg-surface-alt hover:text-foreground"
            }`}
          >
            {RUBRIC_LABELS[kind]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <main className="flex flex-col gap-4.5 lg:w-[420px] lg:shrink-0">
          {rubric.map((section) => (
            <FinalReviewSection
              key={section.title}
              section={section}
              reviewState={reviewState}
              onToggle={handleToggle}
              onFeedbackChange={handleFeedbackChange}
            />
          ))}
        </main>

        <div className="min-w-0 flex-1 lg:sticky lg:top-10">
          <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between border-b border-border-soft bg-surface-alt px-4 py-3 sm:px-5">
              <span className="font-display text-[16px]">Report</span>
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-surface ${
                  copied ? "text-success" : "text-ink-soft"
                }`}
              >
                {copied ? (
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
                    <path
                      d="M2 6.2 4.8 9 10 3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden="true">
                    <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3H4.5A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {copied ? "Copied!" : "Copy Report"}
              </button>
            </div>
            <pre className="max-h-[calc(100vh-220px)] overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-[12.5px] leading-relaxed text-foreground sm:px-5">
              {report}
            </pre>
          </section>
        </div>
      </div>
    </>
  );
}
