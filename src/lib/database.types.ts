export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      checklists: {
        Row: {
          id: string;
          responsible_name: string;
          cleaning_date: string;
          mesa: boolean;
          monitor: boolean;
          inputs: boolean;
          gabinete: boolean;
          floor_area: boolean;
          gavetas: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          responsible_name: string;
          cleaning_date?: string;
          mesa?: boolean;
          monitor?: boolean;
          inputs?: boolean;
          gabinete?: boolean;
          floor_area?: boolean;
          gavetas?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          responsible_name?: string;
          cleaning_date?: string;
          mesa?: boolean;
          monitor?: boolean;
          inputs?: boolean;
          gabinete?: boolean;
          floor_area?: boolean;
          gavetas?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
