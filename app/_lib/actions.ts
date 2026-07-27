"use server";

import { supabase } from "./supabase";
import type { CommentCategory, GeneralComment, HubResponse, Review } from "./types";

export async function addReview(review: Review): Promise<void> {
  const { error } = await supabase.from("reviews").insert({
    id: review.id,
    username: review.username,
    done: review.done,
    created_at: review.createdAt,
    completed_at: review.completedAt,
  });
  if (error) throw error;
}

export async function setReviewDone(id: string, done: boolean): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update({ done, completed_at: done ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
}

export async function removeReview(id: string): Promise<void> {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw error;
}

export async function updateReviewUsername(id: string, username: string): Promise<void> {
  const { error } = await supabase
    .from("reviews")
    .update({ username })
    .eq("id", id);
  if (error) throw error;
}

export async function addHubResponse(hubResponse: HubResponse): Promise<void> {
  const { error } = await supabase.from("hub_responses").insert({
    id: hubResponse.id,
    username: hubResponse.username,
    checked: hubResponse.checked,
    created_at: hubResponse.createdAt,
    completed_at: hubResponse.completedAt,
  });
  if (error) throw error;
}

export async function setHubResponseChecked(id: string, checked: boolean): Promise<void> {
  const { error } = await supabase
    .from("hub_responses")
    .update({ checked, completed_at: checked ? new Date().toISOString() : null })
    .eq("id", id);
  if (error) throw error;
}

export async function removeHubResponse(id: string): Promise<void> {
  const { error } = await supabase.from("hub_responses").delete().eq("id", id);
  if (error) throw error;
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
  return comment;
}

export async function updateGeneralComment(id: string, content: string): Promise<void> {
  const { error } = await supabase
    .from("general_comments")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
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
}

export async function removeGeneralComment(id: string): Promise<void> {
  const { error } = await supabase.from("general_comments").delete().eq("id", id);
  if (error) throw error;
}
