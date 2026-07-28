"use client";

import { useEffect, useState } from "react";

export function StudentPicker({
  value,
  knownStudents,
  onCommit,
  onDelete,
}: {
  value: string;
  knownStudents: string[];
  onCommit: (name: string) => void;
  onDelete: (name: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  // Keep the input in sync when a chip below is clicked instead of typed.
  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit() {
    if (draft.trim() !== value) onCommit(draft);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-xs font-medium text-ink-soft">
        Student
        <input
          list="known-students"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            commit();
            e.currentTarget.blur();
          }}
          placeholder="Student username"
          className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-sm text-foreground outline-none focus:border-accent"
        />
      </label>

      <datalist id="known-students">
        {knownStudents.map((name) => (
          <option key={name} value={name} />
        ))}
      </datalist>

      {knownStudents.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {knownStudents.map((name) => (
            <span
              key={name}
              className={`inline-flex items-center overflow-hidden rounded-full border text-xs font-medium transition-colors ${
                name === value
                  ? "border-accent bg-accent text-surface"
                  : "border-border text-ink-soft hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              <button type="button" onClick={() => onCommit(name)} className="py-1 pl-2.5 pr-1.5">
                {name}
              </button>
              <button
                type="button"
                aria-label={`Delete ${name}'s review`}
                onClick={() => onDelete(name)}
                className={`flex items-center py-1 pl-0.5 pr-2 transition-colors ${
                  name === value ? "hover:bg-black/15" : "hover:text-danger"
                }`}
              >
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                  <path
                    d="M2 2l6 6M8 2l-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {!value.trim() && (
        <span className="text-[11px] text-ink-faint">
          Enter a student username to save this review
        </span>
      )}
    </div>
  );
}
