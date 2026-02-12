"use server";

import { createClient } from "@/lib/supabase/server";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    cover_image: string | null;
    reading_time: number | null;
    author_name: string | null;
    published_at: string;
    seo_title: string | null;
    seo_description: string | null;
    seo_keywords: string[] | null;
}

export async function getBlogPosts(
    page: number = 1,
    limit: number = 6
): Promise<{ posts: BlogPost[]; totalCount: number }> {
    try {
        const supabase = await createClient();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from("posts")
            .select("*", { count: "exact" })
            .eq("is_published", true)
            .order("published_at", { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching blog posts:", error);
            return { posts: [], totalCount: 0 };
        }

        const posts: BlogPost[] = (data as any[]).map((p) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content,
            cover_image: p.cover_image,
            reading_time: p.reading_time,
            author_name: p.author_name,
            published_at: p.published_at || p.created_at || new Date().toISOString(),
            seo_title: p.seo_title,
            seo_description: p.seo_description,
            seo_keywords: p.seo_keywords,
        }));

        return { posts: posts, totalCount: count || 0 };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { posts: [], totalCount: 0 };
    }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("posts")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching blog post by slug:", error);
            return null;
        }

        const p = data;
        return {
            id: p.id,
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content,
            cover_image: p.cover_image,
            reading_time: p.reading_time,
            author_name: p.author_name,
            published_at: p.published_at || p.created_at || new Date().toISOString(),
            seo_title: p.seo_title,
            seo_description: p.seo_description,
            seo_keywords: p.seo_keywords,
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}

export async function getAllBlogPostSlugs(): Promise<{ slug: string; updated_at: string }[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("posts").select("slug, published_at, created_at").eq("is_published", true);
    return (data || []).map((p) => ({
        slug: p.slug,
        updated_at: p.published_at || p.created_at || new Date().toISOString(),
    }));
}
