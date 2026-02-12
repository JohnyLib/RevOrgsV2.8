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
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            categories: {
                Row: {
                    created_at: string | null
                    id: string
                    name: string
                    slug: string
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    name: string
                    slug: string
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    name?: string
                    slug?: string
                }
                Relationships: []
            }
            leads: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    message: string | null
                    name: string
                    phone: string | null
                    service_slug: string | null
                    source: string | null
                    status: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    message?: string | null
                    name: string
                    phone?: string | null
                    service_slug?: string | null
                    source?: string | null
                    status?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    message?: string | null
                    name?: string
                    phone?: string | null
                    service_slug?: string | null
                    source?: string | null
                    status?: string | null
                }
                Relationships: []
            }
            newsletter_subscribers: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    is_active: boolean | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    is_active?: boolean | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    is_active?: boolean | null
                }
                Relationships: []
            }
            post_categories: {
                Row: {
                    category_id: string
                    post_id: string
                }
                Insert: {
                    category_id: string
                    post_id: string
                }
                Update: {
                    category_id?: string
                    post_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "post_categories_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "post_categories_post_id_fkey"
                        columns: ["post_id"]
                        isOneToOne: false
                        referencedRelation: "posts"
                        referencedColumns: ["id"]
                    },
                ]
            }
            posts: {
                Row: {
                    author_name: string | null
                    content: string | null
                    cover_image: string | null
                    created_at: string | null
                    excerpt: string | null
                    id: string
                    is_featured: boolean | null
                    is_published: boolean | null
                    published_at: string | null
                    reading_time: number | null
                    seo_description: string | null
                    seo_keywords: string[] | null
                    seo_title: string | null
                    slug: string
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    author_name?: string | null
                    content?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    excerpt?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    published_at?: string | null
                    reading_time?: number | null
                    seo_description?: string | null
                    seo_keywords?: string[] | null
                    seo_title?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    author_name?: string | null
                    content?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    excerpt?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    published_at?: string | null
                    reading_time?: number | null
                    seo_description?: string | null
                    seo_keywords?: string[] | null
                    seo_title?: string | null
                    slug?: string
                    title: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            project_categories: {
                Row: {
                    category_id: string
                    project_id: string
                }
                Insert: {
                    category_id: string
                    project_id: string
                }
                Update: {
                    category_id?: string
                    project_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "project_categories_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "project_categories_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                ]
            }
            project_technologies: {
                Row: {
                    project_id: string
                    technology_id: string
                }
                Insert: {
                    project_id: string
                    technology_id: string
                }
                Update: {
                    project_id?: string
                    technology_id?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "project_technologies_project_id_fkey"
                        columns: ["project_id"]
                        isOneToOne: false
                        referencedRelation: "projects"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "project_technologies_technology_id_fkey"
                        columns: ["technology_id"]
                        isOneToOne: false
                        referencedRelation: "technologies"
                        referencedColumns: ["id"]
                    },
                ]
            }
            projects: {
                Row: {
                    client_name: string | null
                    cover_image: string | null
                    created_at: string | null
                    full_description: string | null
                    gallery: Json | null
                    id: string
                    is_featured: boolean | null
                    is_published: boolean | null
                    metrics: Json | null
                    project_url: string | null
                    results: string | null
                    seo_description: string | null
                    seo_title: string | null
                    short_description: string | null
                    slug: string
                    title: string
                    updated_at: string | null
                    year: number | null
                }
                Insert: {
                    client_name?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    full_description?: string | null
                    gallery?: Json | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    metrics?: Json | null
                    project_url?: string | null
                    results?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    short_description?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                    year?: number | null
                }
                Update: {
                    client_name?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    full_description?: string | null
                    gallery?: Json | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    metrics?: Json | null
                    project_url?: string | null
                    results?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    short_description?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                    year?: number | null
                }
                Relationships: []
            }
            services: {
                Row: {
                    created_at: string | null
                    full_description: string | null
                    id: string
                    is_featured: boolean | null
                    is_published: boolean | null
                    price_from: string | null
                    seo_description: string | null
                    seo_title: string | null
                    short_description: string | null
                    slug: string
                    title: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    full_description?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    price_from?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    short_description?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    full_description?: string | null
                    id?: string
                    is_featured?: boolean | null
                    is_published?: boolean | null
                    price_from?: string | null
                    seo_description?: string | null
                    seo_title?: string | null
                    short_description?: string | null
                    slug: string
                    title: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            technologies: {
                Row: {
                    created_at: string | null
                    icon: string | null
                    id: string
                    name: string
                }
                Insert: {
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name: string
                }
                Update: {
                    created_at?: string | null
                    icon?: string | null
                    id?: string
                    name?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
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
