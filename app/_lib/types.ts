export type Review = {
  id: string;
  username: string;
  done: boolean;
  /** ISO timestamp of when the review row was created */
  createdAt: string;
  /** ISO timestamp of when the review was marked done, if it has been */
  completedAt: string | null;
};

export const COMMENT_CATEGORIES = [
  "Approval",
  "Reject",
  "Improvements",
  "Comment",
  "Others",
] as const;

export type CommentCategory = (typeof COMMENT_CATEGORIES)[number];

export type GeneralComment = {
  id: string;
  content: string;
  category: CommentCategory;
  createdAt: string;
  updatedAt: string;
};
