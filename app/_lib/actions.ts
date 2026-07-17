"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import type { GeneralComment, Review } from "./types";

type ReviewRow = {
  id: string;
  email: string;
  done: boolean;
  created_at: string;
  completed_at: string | null;
};

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    email: row.email,
    done: row.done,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, email, done, created_at, completed_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as ReviewRow[]).map(toReview);
}

export async function addReview(createdAt: string, email: string): Promise<Review> {
  const review: Review = {
    id: crypto.randomUUID(),
    email,
    done: false,
    createdAt,
    completedAt: null,
  };
  const { error } = await supabase.from("reviews").insert({
    id: review.id,
    email: review.email,
    done: review.done,
    created_at: review.createdAt,
    completed_at: review.completedAt,
  });
  if (error) throw error;
  revalidatePath("/");
  return review;
}

export async function toggleReview(id: string): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from("reviews")
    .select("done")
    .eq("id", id)
    .single();
  if (fetchError) throw fetchError;

  const done = !(data as { done: boolean }).done;
  const { error } = await supabase
    .from("reviews")
    .update({ done, completed_at: done ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeReview(id: string): Promise<void> {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function updateReviewEmail(id: string, email: string): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update({ email })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

type GeneralCommentRow = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

function toGeneralComment(row: GeneralCommentRow): GeneralComment {
  return {
    id: row.id,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getGeneralComments(): Promise<GeneralComment[]> {
  const { data, error } = await supabase
    .from("general_comments")
    .select("id, content, created_at, updated_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as GeneralCommentRow[]).map(toGeneralComment);
}

export async function addGeneralComment(content: string): Promise<GeneralComment> {
  const now = new Date().toISOString();
  const comment: GeneralComment = {
    id: crypto.randomUUID(),
    content,
    createdAt: now,
    updatedAt: now,
  };
  const { error } = await supabase.from("general_comments").insert({
    id: comment.id,
    content: comment.content,
    created_at: comment.createdAt,
    updated_at: comment.updatedAt,
  });
  if (error) throw error;
  revalidatePath("/");
  return comment;
}

export async function updateGeneralComment(id: string, content: string): Promise<void> {
  const { error } = await supabase
    .from("general_comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeGeneralComment(id: string): Promise<void> {
  const { error } = await supabase.from("general_comments").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}
