import { useState } from "react";
import type { HubResponse } from "@/app/_lib/types";
import { formatTime } from "@/app/_lib/date";

export function HubResponseRow({
  hubResponse,
  onToggle,
  onRemove,
  onUsernameChange,
}: {
  hubResponse: HubResponse;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUsernameChange: (id: string, username: string) => void;
}) {
  return (
    <div className="group flex items-center gap-3 border-b border-border-soft px-4 py-2 last:border-b-0 sm:px-5">
      <button
        type="button"
        role="checkbox"
        aria-checked={hubResponse.checked}
        aria-label={
          hubResponse.checked
            ? "Mark response as not checked"
            : "Mark response as checked"
        }
        onClick={() => onToggle(hubResponse.id)}
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-colors ${
          hubResponse.checked
            ? "border-success bg-success"
            : "border-ink-faint hover:border-success"
        }`}
      >
        {hubResponse.checked && (
          <svg
            viewBox="0 0 12 12"
            className="h-[9px] w-[9px] text-surface"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 6.2 4.8 9 10 3"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <input
        type="text"
        value={hubResponse.username}
        onChange={(e) => onUsernameChange(hubResponse.id, e.target.value)}
        placeholder="Student name"
        className={`min-w-0 flex-1 truncate border-none bg-transparent font-mono text-[13px] outline-none placeholder:text-ink-faint ${
          hubResponse.checked ? "text-ink-soft" : "text-foreground"
        }`}
      />

      <span className="w-16 shrink-0 text-right font-mono text-[11.5px] text-ink-faint tabular-nums max-sm:hidden">
        {hubResponse.completedAt ? formatTime(new Date(hubResponse.completedAt)) : ""}
      </span>

      <button
        type="button"
        aria-label="Remove response"
        onClick={() => onRemove(hubResponse.id)}
        className="w-5 shrink-0 text-center text-sm text-ink-faint opacity-0 transition-opacity hover:text-danger focus-visible:opacity-100 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}

export function NewHubResponseRow({
  onAdd,
}: {
  onAdd: (username: string) => void;
}) {
  const [username, setUsername] = useState("");

  function handleSubmit() {
    const trimmed = username.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setUsername("");
  }

  return (
    <div className="flex items-center gap-3 border-b border-border-soft px-4 py-2 last:border-b-0 sm:px-5">
      <span
        className="h-4.5 w-4.5 shrink-0 rounded-[5px] border-[1.5px] border-dashed border-ink-faint"
        aria-hidden="true"
      />

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        placeholder="Student name"
        className="min-w-0 flex-1 truncate border-none bg-transparent font-mono text-[13px] text-foreground outline-none placeholder:text-ink-faint"
      />

      <span className="w-16 shrink-0 max-sm:hidden" aria-hidden="true" />
      <span className="w-5 shrink-0" aria-hidden="true" />
    </div>
  );
}
