"use server";

import { db } from "./db";
import type { Review } from "./types";

type ReviewRow = {
  id: string;
  email: string;
  done: number;
  created_at: string;
};

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    email: row.email,
    done: row.done === 1,
    createdAt: row.created_at,
  };
}

export async function getReviews(): Promise<Review[]> {
  const rows = db
    .prepare("SELECT id, email, done, created_at FROM reviews ORDER BY created_at ASC")
    .all() as ReviewRow[];
  return rows.map(toReview);
}

export async function addReview(createdAt: string): Promise<Review> {
  const review: Review = { id: crypto.randomUUID(), email: "", done: false, createdAt };
  db.prepare("INSERT INTO reviews (id, email, done, created_at) VALUES (?, ?, ?, ?)").run(
    review.id,
    review.email,
    0,
    review.createdAt,
  );
  return review;
}

export async function toggleReview(id: string): Promise<void> {
  db.prepare("UPDATE reviews SET done = 1 - done WHERE id = ?").run(id);
}

export async function removeReview(id: string): Promise<void> {
  db.prepare("DELETE FROM reviews WHERE id = ?").run(id);
}

export async function updateReviewEmail(id: string, email: string): Promise<void> {
  db.prepare("UPDATE reviews SET email = ? WHERE id = ?").run(email, id);
}
