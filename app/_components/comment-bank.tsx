"use client";

import { useEffect, useRef, useState } from "react";
import { COMMENT_CATEGORIES, type CommentCategory, type GeneralComment } from "@/app/_lib/types";
import {
  addGeneralComment,
  removeGeneralComment,
  updateGeneralComment,
  updateGeneralCommentCategory,
} from "@/app/_lib/actions";
import { CommentRow, NewCommentRow } from "./comment-row";

type CategoryFilter = CommentCategory | "all";

export function CommentBank({
  initialComments,
}: {
  initialComments: GeneralComment[];
}) {
  const [comments, setComments] = useState<GeneralComment[]>(initialComments);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!(e.ctrlKey || e.metaKey) || e.key.toLowerCase() !== "f") return;

      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  async function handleAdd(content: string, category: CommentCategory) {
    const comment = await addGeneralComment(content, category);
    setComments((prev) => [...prev, comment]);
  }

  function handleUpdate(id: string, content: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content } : c)),
    );
    updateGeneralComment(id, content).catch(console.error);
  }

  function handleCategoryChange(id: string, category: CommentCategory) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, category } : c)),
    );
    updateGeneralCommentCategory(id, category).catch(console.error);
  }

  function handleRemove(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
    removeGeneralComment(id).catch(console.error);
  }

  function handleCopy(id: string) {
    const comment = comments.find((c) => c.id === id);
    if (!comment) return;
    navigator.clipboard
      .writeText(comment.content)
      .then(() => {
        setCopiedId(comment.id);
        if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = setTimeout(() => setCopiedId(null), 1500);
      })
      .catch(console.error);
  }

  const filtered = comments.filter(
    (c) =>
      c.content.toLowerCase().includes(query.trim().toLowerCase()) &&
      (categoryFilter === "all" || c.category === categoryFilter),
  );

  useEffect(() => {
    setSelectedIndex(-1);
  }, [query, categoryFilter]);

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      const selected = filtered[selectedIndex];
      if (selected) {
        e.preventDefault();
        handleCopy(selected.id);
      }
    }
  }

  return (
    <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap items-center gap-3 border-b border-border-soft bg-surface-alt px-4 py-3 sm:px-5">
        <span className="font-display text-[16px]">Comment Bank</span>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
            aria-label="Filter by category"
            className="rounded-md border border-border bg-surface py-1.5 px-2 font-sans text-[13px] text-foreground outline-none focus:border-accent"
          >
            <option value="all">All categories</option>
            {COMMENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <div className="relative w-full max-w-60">
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search comments…"
              className={`w-full rounded-md border border-border bg-surface py-1.5 pl-8 font-sans text-[13px] text-foreground outline-none placeholder:text-ink-faint focus:border-accent ${
                query ? "pr-7" : "pr-2.5"
              }`}
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                title="Clear search"
                onClick={() => {
                  setQuery("");
                  searchInputRef.current?.focus();
                }}
                className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-alt hover:text-foreground"
              >
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-center font-sans text-sm text-ink-faint sm:px-5">
            {comments.length === 0
              ? "No comments yet — add your first one below."
              : "No comments match your search or filter."}
          </p>
        ) : (
          filtered.map((comment, index) => (
            <CommentRow
              key={comment.id}
              comment={comment}
              highlightQuery={query}
              isSelected={index === selectedIndex}
              copied={copiedId === comment.id}
              onCopy={handleCopy}
              onUpdate={handleUpdate}
              onCategoryChange={handleCategoryChange}
              onRemove={handleRemove}
            />
          ))
        )}
        <NewCommentRow onAdd={handleAdd} />
      </div>
    </section>
  );
}
