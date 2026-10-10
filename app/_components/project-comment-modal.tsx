"use client";

import { useEffect, useRef, useState } from "react";
import {
  generateProjectComment,
  parseDoneWell,
} from "@/app/_lib/project-review-comment";

export function ProjectCommentModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [studentName, setStudentName] = useState("");
  const [doneWell, setDoneWell] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  function open() {
    dialogRef.current?.showModal();
    nameInputRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  function handleCopy() {
    const comment = generateProjectComment(studentName, parseDoneWell(doneWell));
    navigator.clipboard
      .writeText(comment)
      .then(() => {
        // Feedback lives outside the dialog (the toast below) since it closes here.
        close();
        setStudentName("");
        setDoneWell("");
        setCopied(true);
        if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
      })
      .catch(console.error);
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-surface shadow-sm transition-opacity hover:opacity-90"
      >
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path
            d="M3 4.5A1.5 1.5 0 0 1 4.5 3h11A1.5 1.5 0 0 1 17 4.5v8a1.5 1.5 0 0 1-1.5 1.5H8l-4 3v-3h0A1.5 1.5 0 0 1 3 12.5v-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        Project Comment
      </button>

      <dialog
        ref={dialogRef}
        // The native dialog covers the whole viewport, so a click whose target is
        // the dialog itself (not its content) landed on the backdrop.
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-[10px] border border-border bg-surface p-0 text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop:bg-black/40"
      >
        <div className="flex items-center justify-between border-b border-border-soft bg-surface-alt px-5 py-3">
          <span className="font-display text-[16px]">Project Comment</span>
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="flex h-6 w-6 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-surface hover:text-foreground"
          >
            <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-soft">
            Student name
            <input
              ref={nameInputRef}
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="student"
              className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal text-foreground outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-ink-soft">
            Things done well
            <textarea
              value={doneWell}
              onChange={(e) => setDoneWell(e.target.value)}
              rows={8}
              placeholder="One per line"
              className="resize-y rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-normal leading-relaxed text-foreground outline-none focus:border-accent"
            />
          </label>
        </div>

        <div className="flex justify-end gap-2 border-t border-border-soft px-5 py-3">
          <button
            type="button"
            onClick={close}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-surface transition-colors hover:opacity-90"
          >
            Copy comment
          </button>
        </div>
      </dialog>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-md bg-success px-4 py-2 text-sm font-medium text-surface shadow-lg transition-all duration-200 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Comment copied to clipboard
      </div>
    </>
  );
}
