"use client";

import { useActionState } from "react";
import { login } from "@/app/_lib/auth-actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-6 font-sans">
      <form
        action={action}
        className="flex w-full max-w-[320px] flex-col gap-4 rounded-lg border border-border bg-surface p-7"
      >
        <span className="font-display text-[21px] font-semibold">
          Review Log
        </span>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-[13px] text-ink-soft">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="rounded-md border border-border bg-surface-alt px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

        {state?.error && (
          <p className="text-[13px] text-danger">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
