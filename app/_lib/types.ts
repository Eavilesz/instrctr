export type Review = {
  id: string;
  email: string;
  done: boolean;
  /** ISO timestamp of when the review row was created */
  createdAt: string;
  /** ISO timestamp of when the review was marked done, if it has been */
  completedAt: string | null;
};

export type GeneralComment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};
