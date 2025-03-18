export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      about: {
        Row: {
          bio: string
          created_at: string | null
          id: string
          profile_image: string | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          bio: string
          created_at?: string | null
          id?: string
          profile_image?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bio?: string
          created_at?: string | null
          id?: string
          profile_image?: string | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      achievements: {
        Row: {
          created_at: string | null
          date: string | null
          description: string
          id: string
          image_url: string | null
          order_index: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description: string
          id?: string
          image_url?: string | null
          order_index?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string
          id?: string
          image_url?: string | null
          order_index?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          document_name: string
          document_type: string | null
          download_url: string
          expiry_date: string | null
          family_member: string | null
          file_name: string
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          name: string
          notes: string | null
          owner_id: string | null
          storage_path: string
          type: string
          uploaded_at: string | null
        }
        Insert: {
          document_name?: string
          document_type?: string | null
          download_url: string
          expiry_date?: string | null
          family_member?: string | null
          file_name: string
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          name: string
          notes?: string | null
          owner_id?: string | null
          storage_path: string
          type: string
          uploaded_at?: string | null
        }
        Update: {
          document_name?: string
          document_type?: string | null
          download_url?: string
          expiry_date?: string | null
          family_member?: string | null
          file_name?: string
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          name?: string
          notes?: string | null
          owner_id?: string | null
          storage_path?: string
          type?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "family_members"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          current: boolean | null
          description: string
          end_date: string | null
          id: string
          order_index: number | null
          start_date: string
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          current?: boolean | null
          description: string
          end_date?: string | null
          id?: string
          order_index?: number | null
          start_date: string
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          current?: boolean | null
          description?: string
          end_date?: string | null
          id?: string
          order_index?: number | null
          start_date?: string
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      family_members: {
        Row: {
          bio: string | null
          created_at: string | null
          document_count: number | null
          email: string | null
          id: string
          name: string
          phone: string | null
          photo_url: string | null
          relationship: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          document_count?: number | null
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          photo_url?: string | null
          relationship?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          document_count?: number | null
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          photo_url?: string | null
          relationship?: string | null
        }
        Relationships: []
      }
      form_responses: {
        Row: {
          form_id: string
          id: string
          response_data: Json
          submitted_at: string | null
        }
        Insert: {
          form_id: string
          id?: string
          response_data?: Json
          submitted_at?: string | null
        }
        Update: {
          form_id?: string
          id?: string
          response_data?: Json
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_responses_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
      forms: {
        Row: {
          created_at: string | null
          description: string | null
          elements: Json | null
          id: string
          pages: Json | null
          settings: Json | null
          title: string
          unique_code: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          elements?: Json | null
          id: string
          pages?: Json | null
          settings?: Json | null
          title: string
          unique_code?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          elements?: Json | null
          id?: string
          pages?: Json | null
          settings?: Json | null
          title?: string
          unique_code?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string | null
          email: string | null
          hero_description: string | null
          hero_tagline: string
          id: string
          location: string | null
          name: string
          phone: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          hero_description?: string | null
          hero_tagline: string
          id?: string
          location?: string | null
          name: string
          phone?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          hero_description?: string | null
          hero_tagline?: string
          id?: string
          location?: string | null
          name?: string
          phone?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          description: string
          featured: boolean | null
          github_url: string | null
          id: string
          image_url: string | null
          live_url: string | null
          order_index: number | null
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          order_index?: number | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          featured?: boolean | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          live_url?: string | null
          order_index?: number | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      roadmap: {
        Row: {
          completed_date: string | null
          created_at: string | null
          description: string
          id: string
          order_index: number | null
          status: string
          target_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          completed_date?: string | null
          created_at?: string | null
          description: string
          id?: string
          order_index?: number | null
          status: string
          target_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          completed_date?: string | null
          created_at?: string | null
          description?: string
          id?: string
          order_index?: number | null
          status?: string
          target_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      social_handles: {
        Row: {
          created_at: string | null
          icon: string
          id: string
          order_index: number | null
          platform: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          icon: string
          id?: string
          order_index?: number | null
          platform: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          icon?: string
          id?: string
          order_index?: number | null
          platform?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      test: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      unique_codes: {
        Row: {
          code: string
          created_at: string | null
          form_id: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          form_id?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          form_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unique_codes_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_code_availability:
        | {
            Args: {
              code_to_check: string
            }
            Returns: boolean
          }
        | {
            Args: {
              code_to_check: string
            }
            Returns: boolean
          }
      get_auth_uid_as_text: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      increment_document_count: {
        Args: {
          p_member_id: string
          p_increment: number
        }
        Returns: undefined
      }
      increment_response_count: {
        Args: {
          form_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
