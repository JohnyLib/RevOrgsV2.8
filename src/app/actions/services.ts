"use server";

import { createClient } from "@/lib/supabase/server";

export interface Service {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    full_description: string | null;
    price_from: string | null;
    is_featured: boolean | null;
    seo_title: string | null;
    seo_description: string | null;
}

export async function getServices(): Promise<Service[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("is_published", true)
            .order("created_at", { ascending: true });

        if (error) {
            console.error("Error fetching services:", error);
            return [];
        }

        return (data as any[]).map((s) => ({
            id: s.id,
            title: s.title,
            slug: s.slug,
            short_description: s.short_description,
            full_description: s.full_description,
            price_from: s.price_from,
            is_featured: s.is_featured,
            seo_title: s.seo_title,
            seo_description: s.seo_description,
        }));
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching service by slug:", error);
            return null;
        }

        const s = data;
        return {
            id: s.id,
            title: s.title,
            slug: s.slug,
            short_description: s.short_description,
            full_description: s.full_description,
            price_from: s.price_from,
            is_featured: s.is_featured,
            seo_title: s.seo_title,
            seo_description: s.seo_description,
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}

export async function getAllServiceSlugs(): Promise<{ slug: string; updated_at: string }[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("slug, created_at").eq("is_published", true);
    return (data || []).map((s) => ({
        slug: s.slug,
        updated_at: s.created_at || new Date().toISOString(),
    }));
}
