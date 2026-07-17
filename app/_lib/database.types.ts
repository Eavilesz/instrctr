export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string;
          username: string;
          done: boolean;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          id: string;
          username: string;
          done: boolean;
          created_at: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          username?: string;
          done?: boolean;
          created_at?: string;
          completed_at?: string | null;
        };
        Relationships: [];
      };
      general_comments: {
        Row: {
          id: string;
          content: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          content: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          content?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
