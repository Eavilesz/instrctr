export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          email: string;
          done: boolean;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          done: boolean;
          created_at: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          done?: boolean;
          created_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
