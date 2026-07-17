"use client";

import { useState } from "react";
import type { GeneralComment } from "@/app/_lib/types";
import {
  addGeneralComment,
  removeGeneralComment,
  updateGeneralComment,
} from "@/app/_lib/actions";
import { CommentRow, NewCommentRow } from "./comment-row";

export function CommentBank({
  initialComments,
}: {
  initialComments: GeneralComment[];
}) {
  const [comments, setComments] = useState<GeneralComment[]>(initialComments);
  const [query, setQuery] = useState("");

  async function handleAdd(content: string) {
    const comment = await addGeneralComment(content);
    setComments((prev) => [...prev, comment]);
  }

  function handleUpdate(id: string, content: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content } : c)),
    );
    updateGeneralComment(id, content).catch(console.error);
  }

  function handleRemove(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
    removeGeneralComment(id).catch(console.error);
  }

  const filtered = comments.filter((c) =>
    c.content.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <section className="overflow-hidden rounded-[10px] border border-border bg-surface shadow-[0_1px_2px_rgba(36,38,31,0.04),0_4px_14px_rgba(36,38,31,0.05)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-3 border-b border-border-soft bg-surface-alt px-4 py-3 sm:px-5">
        <span className="font-display text-[16px]">Comment Bank</span>
        <div className="relative ml-auto w-full max-w-[240px]">
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
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search comments…"
            className="w-full rounded-md border border-border bg-surface py-1.5 pl-8 pr-2.5 font-sans text-[13px] text-foreground outline-none placeholder:text-ink-faint focus:border-accent"
          />
        </div>
      </div>

      <div>
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-center font-sans text-sm text-ink-faint sm:px-5">
            {comments.length === 0
              ? "No comments yet — add your first one below."
              : "No comments match your search."}
          </p>
        ) : (
          filtered.map((comment) => (
            <CommentRow
              key={comment.id}
              comment={comment}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))
        )}
        <NewCommentRow onAdd={handleAdd} />
      </div>
    </section>
  );
}
