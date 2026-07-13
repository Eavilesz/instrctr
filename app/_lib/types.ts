export type Review = {
  id: string;
  email: string;
  done: boolean;
  /** ISO timestamp of when the review row was created */
  createdAt: string;
};
