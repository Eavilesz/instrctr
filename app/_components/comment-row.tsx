"use client";

import { useState } from "react";
import { COMMENT_CATEGORIES, type CommentCategory, type GeneralComment } from "@/app/_lib/types";
import { CATEGORY_BADGE_CLASSES } from "@/app/_lib/comment-categories";

function CategoryBadgeSelect({
  category,
  onChange,
}: {
  category: CommentCategory;
  onChange: (category: CommentCategory) => void;
}) {
  return (
    <select
      value={category}
      onChange={(e) => onChange(e.target.value as CommentCategory)}
      aria-label="Comment category"
      className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[11px] font-medium outline-none ${CATEGORY_BADGE_CLASSES[category]}`}
    >
      {COMMENT_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

export function CommentRow({
  comment,
  onUpdate,
  onCategoryChange,
  onRemove,
}: {
  comment: GeneralComment;
  onUpdate: (id: string, content: string) => void;
  onCategoryChange: (id: string, category: CommentCategory) => void;
  onRemove: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard
      .writeText(comment.content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(console.error);
  }

  function handleSave() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setDraft(comment.content);
      setEditing(false);
      return;
    }
    if (trimmed !== comment.content) onUpdate(comment.id, trimmed);
    setEditing(false);
  }

  function handleCancel() {
    setDraft(comment.content);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="border-b border-border-soft px-4 py-3 last:border-b-0 sm:px-5">
        <div className="mb-2">
          <CategoryBadgeSelect
            category={comment.category}
            onChange={(category) => onCategoryChange(comment.id, category)}
          />
        </div>
        <textarea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              handleCancel();
            }
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSave();
            }
          }}
          rows={4}
          className="w-full resize-y rounded-md border border-border bg-surface-alt px-2.5 py-2 font-sans text-sm text-foreground outline-none focus:border-accent"
        />
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-surface transition-opacity hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-start gap-3 border-b border-border-soft px-4 py-3 last:border-b-0 sm:px-5">
      <CategoryBadgeSelect
        category={comment.category}
        onChange={(category) => onCategoryChange(comment.id, category)}
      />

      <p className="min-w-0 flex-1 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
        {comment.content}
      </p>

      <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          aria-label="Copy comment"
          title={copied ? "Copied!" : "Copy"}
          onClick={handleCopy}
          className={`flex h-7 w-7 items-center justify-center rounded-md border border-border transition-colors hover:bg-surface-alt hover:text-foreground ${
            copied ? "text-success" : "text-ink-faint"
          }`}
        >
          {copied ? (
            <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <path
                d="M2 6.2 4.8 9 10 3"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
              <rect x="7" y="7" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M13 7V4.5A1.5 1.5 0 0 0 11.5 3H4.5A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13H7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

        <button
          type="button"
          aria-label="Edit comment"
          title="Edit"
          onClick={() => setEditing(true)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-faint transition-colors hover:bg-surface-alt hover:text-foreground"
        >
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
            <path
              d="M13.5 3.5 16.5 6.5 6.5 16.5H3.5V13.5L13.5 3.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          aria-label="Delete comment"
          title="Delete"
          onClick={() => onRemove(comment.id)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-ink-faint transition-colors hover:border-danger hover:text-danger"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function NewCommentRow({
  onAdd,
}: {
  onAdd: (content: string, category: CommentCategory) => void;
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<CommentCategory>("Others");

  function handleSubmit() {
    const trimmed = content.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setContent("");
    setCategory("Others");
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-3 sm:px-5">
      <CategoryBadgeSelect category={category} onChange={setCategory} />

      <div className="flex items-start gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Add a new general comment… (⌘/Ctrl + Enter to save)"
          rows={3}
          className="min-w-0 flex-1 resize-y rounded-md border border-dashed border-ink-faint bg-transparent px-2.5 py-2 font-sans text-sm text-foreground outline-none placeholder:text-ink-faint focus:border-solid focus:border-accent"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-0.5 shrink-0 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
        >
          Add
        </button>
      </div>
    </div>
  );
}
