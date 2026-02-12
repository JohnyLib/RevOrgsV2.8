"use server";

import { createClient } from "@/lib/supabase/server";
import { Project } from "@/types";

export async function getProjects(
    page: number = 1,
    limit: number = 6
): Promise<{ projects: Project[]; totalCount: number }> {
    try {
        const supabase = await createClient();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error, count } = await supabase
            .from("projects")
            .select("*", { count: "exact" })
            .eq("is_published", true)
            .order("created_at", { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching projects:", error);
            return { projects: [], totalCount: 0 };
        }

        const projectList: Project[] = (data as any[]).map((p) => ({
            id: p.id,
            created_at: p.created_at || new Date().toISOString(),
            title: p.title,
            slug: p.slug,
            short_description: p.short_description,
            full_description: p.full_description,
            cover_image: p.cover_image,

            // Mappings for UI compatibility
            name: p.title,
            description: p.short_description || "No description provided.",
            image_url: p.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            tech_stack: [], // Need to fetch relations if needed, or use a view. For now empty array.
            repo_url: p.project_url,
            demo_url: p.project_url,
            company_name: p.client_name,
            price: p.metrics?.price || null, // Assuming price stored in metrics for now or just null

            // UI Defaults
            // UI Defaults
            status: "deployed",
            filename: (p.slug || "") + ".tsx",
            language: "typescript",
            framework: "next.js",
            performance: 100,
            size: "0KB",
            catCommand: `cat ${p.slug}.md`,
        }));

        return { projects: projectList, totalCount: count || 0 };
    } catch (error) {
        console.error("Unexpected error:", error);
        return { projects: [], totalCount: 0 };
    }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching project by slug:", error);
            return null;
        }

        const p = data;
        return {
            id: p.id,
            created_at: p.created_at || new Date().toISOString(),
            title: p.title,
            slug: p.slug,
            short_description: p.short_description,
            full_description: p.full_description,
            cover_image: p.cover_image,

            // Legacy/UI mappings
            name: p.title,
            description: p.short_description || "No description provided.",
            image_url: p.cover_image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            tech_stack: [],
            repo_url: p.project_url,
            demo_url: p.project_url,
            company_name: p.client_name,
            price: (p.metrics as any)?.price || null,

            status: "deployed",
            filename: (p.slug || "") + ".tsx",
            language: "typescript",
            framework: "next.js",
            performance: 100,
            size: "0KB",
            catCommand: `cat ${p.slug}.md`,
        };
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}

export async function getAllProjectSlugs(): Promise<{ slug: string; updated_at: string }[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("slug, created_at").eq("is_published", true);
    return (data || []).map((p) => ({
        slug: p.slug,
        updated_at: p.created_at || new Date().toISOString(),
    }));
}
