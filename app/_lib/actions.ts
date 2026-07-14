"use server";

import { db } from "./db";
import type { Review } from "./types";

type ReviewRow = {
  id: string;
  email: string;
  done: number;
  created_at: string;
  completed_at: string | null;
};

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    email: row.email,
    done: row.done === 1,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

export async function getReviews(): Promise<Review[]> {
  const rows = db
    .prepare(
      "SELECT id, email, done, created_at, completed_at FROM reviews ORDER BY created_at ASC",
    )
    .all() as ReviewRow[];
  return rows.map(toReview);
}

export async function addReview(createdAt: string, email: string): Promise<Review> {
  const review: Review = {
    id: crypto.randomUUID(),
    email,
    done: false,
    createdAt,
    completedAt: null,
  };
  db.prepare(
    "INSERT INTO reviews (id, email, done, created_at, completed_at) VALUES (?, ?, ?, ?, ?)",
  ).run(review.id, review.email, 0, review.createdAt, review.completedAt);
  return review;
}

export async function toggleReview(id: string): Promise<void> {
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE reviews SET done = 1 - done, completed_at = CASE WHEN done = 0 THEN ? ELSE NULL END WHERE id = ?",
  ).run(now, id);
}

export async function removeReview(id: string): Promise<void> {
  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
}

export async function updateReviewEmail(id: string, email: string): Promise<void> {
  db.prepare("UPDATE reviews SET email = ? WHERE id = ?").run(email, id);
}
