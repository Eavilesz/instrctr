"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import type { CommentCategory, GeneralComment, HubResponse, Review } from "./types";

type ReviewRow = {
  id: string;
  username: string;
  done: boolean;
  created_at: string;
  completed_at: string | null;
};

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    username: row.username,
    done: row.done,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("id, username, done, created_at, completed_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as ReviewRow[]).map(toReview);
}

export async function addReview(createdAt: string, username: string): Promise<Review> {
  const review: Review = {
    id: crypto.randomUUID(),
    username,
    done: false,
    createdAt,
    completedAt: null,
  };
  const { error } = await supabase.from("reviews").insert({
    id: review.id,
    username: review.username,
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

export async function updateReviewUsername(id: string, username: string): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update({ username })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

type HubResponseRow = {
  id: string;
  username: string;
  checked: boolean;
  created_at: string;
  completed_at: string | null;
};

function toHubResponse(row: HubResponseRow): HubResponse {
  return {
    id: row.id,
    username: row.username,
    checked: row.checked,
    createdAt: row.created_at,
    completedAt: row.completed_at,
  };
}

export async function getHubResponses(): Promise<HubResponse[]> {
  const { data, error } = await supabase
    .from("hub_responses")
    .select("id, username, checked, created_at, completed_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as HubResponseRow[]).map(toHubResponse);
}

export async function addHubResponse(
  createdAt: string,
  username: string,
): Promise<HubResponse> {
  const hubResponse: HubResponse = {
    id: crypto.randomUUID(),
    username,
    checked: false,
    createdAt,
    completedAt: null,
  };
  const { error } = await supabase.from("hub_responses").insert({
    id: hubResponse.id,
    username: hubResponse.username,
    checked: hubResponse.checked,
    created_at: hubResponse.createdAt,
    completed_at: hubResponse.completedAt,
  });
  if (error) throw error;
  revalidatePath("/");
  return hubResponse;
}

export async function toggleHubResponse(id: string): Promise<void> {
  const { data, error: fetchError } = await supabase
    .from("hub_responses")
    .select("checked")
    .eq("id", id)
    .single();
  if (fetchError) throw fetchError;

  const checked = !(data as { checked: boolean }).checked;
  const { error } = await supabase
    .from("hub_responses")
    .update({ checked, completed_at: checked ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeHubResponse(id: string): Promise<void> {
  const { error } = await supabase.from("hub_responses").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function updateHubResponseUsername(
  id: string,
  username: string,
): Promise<void> {
  const { error } = await supabase
    .from("hub_responses")
    .update({ username })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

type GeneralCommentRow = {
  id: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
};

function toGeneralComment(row: GeneralCommentRow): GeneralComment {
  return {
    id: row.id,
    content: row.content,
    category: row.category as CommentCategory,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getGeneralComments(): Promise<GeneralComment[]> {
  const { data, error } = await supabase
    .from("general_comments")
    .select("id, content, category, created_at, updated_at")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as GeneralCommentRow[]).map(toGeneralComment);
}

export async function addGeneralComment(
  content: string,
  category: CommentCategory,
): Promise<GeneralComment> {
  const now = new Date().toISOString();
  const comment: GeneralComment = {
    id: crypto.randomUUID(),
    content,
    category,
    createdAt: now,
    updatedAt: now,
  };
  const { error } = await supabase.from("general_comments").insert({
    id: comment.id,
    content: comment.content,
    category: comment.category,
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

export async function updateGeneralCommentCategory(
  id: string,
  category: CommentCategory,
): Promise<void> {
  const { error } = await supabase
    .from("general_comments")
    .update({ category, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}

export async function removeGeneralComment(id: string): Promise<void> {
  const { error } = await supabase.from("general_comments").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/");
}
