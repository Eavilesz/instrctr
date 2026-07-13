"use client";

import { THEME_STORAGE_KEY } from "@/app/_lib/theme";

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — theme just won't persist across reloads
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="theme-toggle flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-ink-soft transition-colors hover:bg-surface-alt hover:text-foreground"
    >
      <svg
        viewBox="0 0 20 20"
        className="theme-toggle-sun h-4 w-4"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 1.8v2M10 16.2v2M18.2 10h-2M3.8 10h-2M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4M15.7 15.7l-1.4-1.4M5.7 5.7 4.3 4.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <svg
        viewBox="0 0 20 20"
        className="theme-toggle-moon h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.2 12.6A7.5 7.5 0 0 1 7.4 2.8a7.5 7.5 0 1 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
