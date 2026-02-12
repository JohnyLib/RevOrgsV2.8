"use server";

import { createClient } from "@/lib/supabase/server";
import { Project, Category } from "@/types";

export async function getProjectCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data } = await supabase.from("categories").select("id, name, slug").order("name");
    return data || [];
}

export async function getProjects(
    page: number = 1,
    limit: number = 6,
    filters?: {
        categorySlug?: string;
        technologySlug?: string;
        year?: number;
        isFeatured?: boolean;
    }
): Promise<{ projects: Project[]; totalCount: number }> {
    try {
        const supabase = await createClient();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        // Dynamic select string construction
        // Use !inner for filtered relations to enforce the filter (inner join behavior)
        let selectStr = "*, project_categories(categories(*)), project_technologies(technologies(*))";

        if (filters?.categorySlug) {
            selectStr = selectStr.replace("project_categories(categories(*))", "project_categories!inner(categories!inner(*))");
        }
        if (filters?.technologySlug) {
            selectStr = selectStr.replace("project_technologies(technologies(*))", "project_technologies!inner(technologies!inner(*))");
        }

        let query = supabase
            .from("projects")
            .select(selectStr, { count: "exact" })
            .eq("is_published", true)
            .order("created_at", { ascending: false })
            .range(from, to);

        // Apply filters
        if (filters?.categorySlug) {
            query = query.eq("project_categories.categories.slug", filters.categorySlug);
        }
        if (filters?.technologySlug) {
            // "project_technologies" joined with "technologies". 
            // We filter on "technologies.name" (assuming slug in URL maps to name for now as per instructions).
            query = query.eq("project_technologies.technologies.name", filters.technologySlug);
        }
        if (filters?.year) {
            query = query.eq("year", filters.year);
        }
        if (filters?.isFeatured) {
            query = query.eq("is_featured", true);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error("Error fetching projects:", error);
            return { projects: [], totalCount: 0 };
        }

        const projectList: Project[] = ((data || []) as any[]).map((p) => {
            const categories = p.project_categories?.map((pc: any) => pc.categories).filter(Boolean) || [];
            const techs = p.project_technologies?.map((pt: any) => pt.technologies).filter(Boolean) || [];

            return {
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
                image_url: p.cover_image || "/placeholder-project.jpg",
                tech_stack: techs.map((t: any) => t.name),
                repo_url: p.project_url,
                demo_url: p.project_url,
                company_name: p.client_name,
                price: typeof p.metrics === 'object' && p.metrics ? (p.metrics as any).price : null,

                // UI Defaults
                status: "deployed",
                filename: (p.slug || "") + ".tsx",
                language: "typescript",
                framework: "next.js",
                performance: 100,
                size: "0KB",
                catCommand: `cat ${p.slug}.md`,
                categories: categories
            };
        });

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
            .select("*, project_categories(categories(*)), project_technologies(technologies(*))")
            .eq("slug", slug)
            .single();

        if (error) {
            console.error("Error fetching project by slug:", error);
            return null;
        }

        if (!data) return null;

        const p = data as any;
        const categories = p.project_categories?.map((pc: any) => pc.categories).filter(Boolean) || [];
        const techs = p.project_technologies?.map((pt: any) => pt.technologies).filter(Boolean) || [];

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
            image_url: p.cover_image || "/placeholder-project.jpg",
            tech_stack: techs.map((t: any) => t.name),
            repo_url: p.project_url,
            demo_url: p.project_url,
            company_name: p.client_name,
            price: typeof p.metrics === 'object' && p.metrics ? (p.metrics as any).price : null,

            status: "deployed",
            filename: (p.slug || "") + ".tsx",
            language: "typescript",
            framework: "next.js",
            performance: 100,
            size: "0KB",
            catCommand: `cat ${p.slug}.md`,
            categories: categories
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
