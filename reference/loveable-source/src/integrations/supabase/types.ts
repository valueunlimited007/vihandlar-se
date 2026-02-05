export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      e_additives: {
        Row: {
          adi_source: string | null
          adi_value: number | null
          avoidance_tips: string[] | null
          category: string
          children_note: string | null
          common_name: string | null
          common_products: Json | null
          created_at: string
          e_number: string
          health_effects: Json | null
          id: string
          is_published: boolean
          livsmedelsverket_data: Json | null
          long_description: string | null
          longevity_impact: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          natural_alternatives: string[] | null
          origin: string | null
          risk_score: number | null
          scientific_studies: Json | null
          short_description: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          adi_source?: string | null
          adi_value?: number | null
          avoidance_tips?: string[] | null
          category: string
          children_note?: string | null
          common_name?: string | null
          common_products?: Json | null
          created_at?: string
          e_number: string
          health_effects?: Json | null
          id?: string
          is_published?: boolean
          livsmedelsverket_data?: Json | null
          long_description?: string | null
          longevity_impact?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          natural_alternatives?: string[] | null
          origin?: string | null
          risk_score?: number | null
          scientific_studies?: Json | null
          short_description?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          adi_source?: string | null
          adi_value?: number | null
          avoidance_tips?: string[] | null
          category?: string
          children_note?: string | null
          common_name?: string | null
          common_products?: Json | null
          created_at?: string
          e_number?: string
          health_effects?: Json | null
          id?: string
          is_published?: boolean
          livsmedelsverket_data?: Json | null
          long_description?: string | null
          longevity_impact?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          natural_alternatives?: string[] | null
          origin?: string | null
          risk_score?: number | null
          scientific_studies?: Json | null
          short_description?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      food_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          allergens: string[] | null
          alternative_names: string[] | null
          calories: number | null
          can_freeze: boolean | null
          carbohydrates: number | null
          category_id: string | null
          common_in_lists: string[] | null
          created_at: string
          faq: Json | null
          fat: number | null
          fiber: number | null
          freezing_tips: string | null
          id: string
          key_minerals: Json | null
          key_vitamins: Json | null
          letter: string
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          protein: number | null
          related_foods: string[] | null
          salt: number | null
          season: string[] | null
          shelf_life_opened: string | null
          shelf_life_unopened: string | null
          short_description: string | null
          slug: string
          storage_method: string | null
          subcategory: string | null
          substitutes: Json | null
          updated_at: string
          usage_tips: string[] | null
        }
        Insert: {
          allergens?: string[] | null
          alternative_names?: string[] | null
          calories?: number | null
          can_freeze?: boolean | null
          carbohydrates?: number | null
          category_id?: string | null
          common_in_lists?: string[] | null
          created_at?: string
          faq?: Json | null
          fat?: number | null
          fiber?: number | null
          freezing_tips?: string | null
          id?: string
          key_minerals?: Json | null
          key_vitamins?: Json | null
          letter: string
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          protein?: number | null
          related_foods?: string[] | null
          salt?: number | null
          season?: string[] | null
          shelf_life_opened?: string | null
          shelf_life_unopened?: string | null
          short_description?: string | null
          slug: string
          storage_method?: string | null
          subcategory?: string | null
          substitutes?: Json | null
          updated_at?: string
          usage_tips?: string[] | null
        }
        Update: {
          allergens?: string[] | null
          alternative_names?: string[] | null
          calories?: number | null
          can_freeze?: boolean | null
          carbohydrates?: number | null
          category_id?: string | null
          common_in_lists?: string[] | null
          created_at?: string
          faq?: Json | null
          fat?: number | null
          fiber?: number | null
          freezing_tips?: string | null
          id?: string
          key_minerals?: Json | null
          key_vitamins?: Json | null
          letter?: string
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          protein?: number | null
          related_foods?: string[] | null
          salt?: number | null
          season?: string[] | null
          shelf_life_opened?: string | null
          shelf_life_unopened?: string | null
          short_description?: string | null
          slug?: string
          storage_method?: string | null
          subcategory?: string | null
          substitutes?: Json | null
          updated_at?: string
          usage_tips?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "foods_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "food_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          completed: boolean | null
          created_at: string | null
          id: string
          list_id: string
          name: string
          quantity: string | null
          unit: string | null
          updated_at: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          list_id: string
          name: string
          quantity?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string | null
          id?: string
          list_id?: string
          name?: string
          quantity?: string | null
          unit?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "lists"
            referencedColumns: ["id"]
          },
        ]
      }
      lists: {
        Row: {
          checkout_alert_activated_at: string | null
          checkout_alert_active: boolean | null
          checkout_alert_user_id: string | null
          created_at: string | null
          id: string
          name: string
          share_token: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          checkout_alert_activated_at?: string | null
          checkout_alert_active?: boolean | null
          checkout_alert_user_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          share_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          checkout_alert_activated_at?: string | null
          checkout_alert_active?: boolean | null
          checkout_alert_user_id?: string | null
          created_at?: string | null
          id?: string
          name?: string
          share_token?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          category_path: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          parent_id: string | null
          product_count: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          category_path?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          product_count?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          category_path?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          product_count?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          ean: string | null
          id: string
          image_url: string | null
          in_stock: boolean | null
          last_updated: string | null
          name: string
          original_price: number | null
          price: number
          product_id: string
          product_url: string
          shipping_cost: number | null
          slug: string
          store_id: string
        }
        Insert: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          ean?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          last_updated?: string | null
          name: string
          original_price?: number | null
          price: number
          product_id: string
          product_url: string
          shipping_cost?: number | null
          slug: string
          store_id: string
        }
        Update: {
          brand?: string | null
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          ean?: string | null
          id?: string
          image_url?: string | null
          in_stock?: boolean | null
          last_updated?: string | null
          name?: string
          original_price?: number | null
          price?: number
          product_id?: string
          product_url?: string
          shipping_cost?: number | null
          slug?: string
          store_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          },
        ]
      }
      public_items: {
        Row: {
          category: string | null
          checked: boolean
          id: string
          list_id: string
          name: string
          position: number
          quantity: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          checked?: boolean
          id?: string
          list_id: string
          name: string
          position?: number
          quantity?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          checked?: boolean
          id?: string
          list_id?: string
          name?: string
          position?: number
          quantity?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_items_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "public_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      public_lists: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_public: boolean
          lang: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          lang?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_public?: boolean
          lang?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      saved_filters: {
        Row: {
          created_at: string
          description: string | null
          filters: Json
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          filters: Json
          id?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          filters?: Json
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      shared_scans: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          scan_data: Json
          share_token: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          scan_data: Json
          share_token?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          scan_data?: Json
          share_token?: string
        }
        Relationships: []
      }
      stores: {
        Row: {
          affiliate_config: Json
          affiliate_network: string
          created_at: string | null
          description: string | null
          feed_type: string
          feed_url: string
          id: string
          is_active: boolean | null
          logo_url: string | null
          name: string
          slug: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          affiliate_config: Json
          affiliate_network: string
          created_at?: string | null
          description?: string | null
          feed_type?: string
          feed_url: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name: string
          slug: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          affiliate_config?: Json
          affiliate_network?: string
          created_at?: string | null
          description?: string | null
          feed_type?: string
          feed_url?: string
          id?: string
          is_active?: boolean | null
          logo_url?: string | null
          name?: string
          slug?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      validate_item_name: { Args: { item_name: string }; Returns: boolean }
      validate_share_token_access: {
        Args: { list_id_param: string; token_param: string }
        Returns: boolean
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
