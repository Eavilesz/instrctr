import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
  );
}

// Reuse the same client across Next.js dev-server hot reloads instead of
// creating a new one on every module reload.
const globalForSupabase = globalThis as unknown as {
  supabase?: ReturnType<typeof createClient<Database>>;
};

export const supabase =
  globalForSupabase.supabase ??
  createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.supabase = supabase;
}
