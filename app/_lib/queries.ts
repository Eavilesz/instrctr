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
