"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createProject(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const short_description = formData.get("short_description") as string;
        const full_description = formData.get("full_description") as string;
        const client_name = formData.get("client_name") as string;
        const project_url = formData.get("project_url") as string;
        const image_url = formData.get("image_url") as string;

        const technologies: string[] = JSON.parse(formData.get("technologies") as string || "[]");
        const categories: string[] = JSON.parse(formData.get("categories") as string || "[]");

        const supabase = await createClient();

        // 1. Insert Project
        const { data: project, error: projectError } = await supabase
            .from("projects")
            .insert({
                title,
                slug,
                short_description,
                full_description,
                client_name,
                project_url,
                cover_image: image_url,
                is_published: true,
                is_featured: false,
                year: new Date().getFullYear()
            })
            .select()
            .single();

        if (projectError) throw new Error("Failed to insert project: " + projectError.message);

        // 2. Handle Relations
        if (project) {
            // Technologies
            if (technologies.length > 0) {
                // First ensure technologies exist or get their IDs
                // For simplicity, assuming validation or upsert if not complex.
                // Ideally we query existing IDs first.

                // Fetch existing techs
                const { data: existingTechs } = await supabase
                    .from("technologies")
                    .select("id, name")
                    .in("name", technologies);

                const existingNames = new Set(existingTechs?.map(t => t.name) || []);
                const newTechs = technologies.filter(t => !existingNames.has(t));

                // Insert new techs
                let newTechIds: string[] = [];
                if (newTechs.length > 0) {
                    const { data: insertedTechs } = await supabase
                        .from("technologies")
                        .insert(newTechs.map(name => ({
                            name,
                            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            icon: 'Code' // Default
                        })))
                        .select("id");

                    if (insertedTechs) newTechIds = insertedTechs.map(t => t.id);
                }

                const allTechIds = [
                    ...(existingTechs?.map(t => t.id) || []),
                    ...newTechIds
                ];

                // Link
                if (allTechIds.length > 0) {
                    await supabase.from("project_technologies").insert(
                        allTechIds.map(tech_id => ({ project_id: project.id, technology_id: tech_id }))
                    );
                }
            }

            // Categories
            if (categories.length > 0) {
                // Fetch existing cats
                const { data: existingCats } = await supabase
                    .from("categories")
                    .select("id, name")
                    .in("name", categories);

                const existingCatNames = new Set(existingCats?.map(c => c.name) || []);
                const newCats = categories.filter(c => !existingCatNames.has(c));

                // Insert new cats
                let newCatIds: string[] = [];
                if (newCats.length > 0) {
                    const { data: insertedCats } = await supabase
                        .from("categories")
                        .insert(newCats.map(name => ({
                            name,
                            slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        })))
                        .select("id");

                    if (insertedCats) newCatIds = insertedCats.map(c => c.id);
                }

                const allCatIds = [
                    ...(existingCats?.map(c => c.id) || []),
                    ...newCatIds
                ];

                // Link
                if (allCatIds.length > 0) {
                    await supabase.from("project_categories").insert(
                        allCatIds.map(category_id => ({ project_id: project.id, category_id }))
                    );
                }
            }
        }

        revalidatePath("/portfolio");
        return { success: true };

    } catch (error: any) {
        console.error("Create Project Error:", error);
        return { success: false, error: error.message };
    }
}
