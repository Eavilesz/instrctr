import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "reviews.db");

function createDatabase(): DatabaseSync {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const database = new DatabaseSync(DB_PATH);
  database.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      completed_at TEXT
    )
  `);

  const columns = database.prepare("PRAGMA table_info(reviews)").all() as {
    name: string;
  }[];
  if (!columns.some((c) => c.name === "completed_at")) {
    database.exec("ALTER TABLE reviews ADD COLUMN completed_at TEXT");
  }

  return database;
}

// Reuse the same connection across Next.js dev-server hot reloads instead of
// opening a new one (and re-running the schema) on every module reload.
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

export const db = globalForDb.db ?? createDatabase();

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}
