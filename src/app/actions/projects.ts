"use server";

import { createClient } from "@supabase/supabase-js";
import { Project } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// TODO: Replace with Supabase fetch — `supabase.from('projects').select('*')`
/*
const projects: Project[] = [
    {
        id: "1",
        filename: "./e-commerce-spa.tsx",
        name: "LuxeMarket_v2",
        description:
            "A high-performance headless e-commerce platform built for a luxury fashion retailer. Features real-time inventory and AI-driven recommendations.",
        language: "typescript",
        framework: "next.js",
        status: "deployed",
        performance: 99,
        size: "2.4MB",
        url: "https://luxemarket.app",
        imageUrl:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
        catCommand: "cat content.md",
    },
    // ...
];
*/

export async function getProjects(): Promise<Project[]> {
    try {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching projects:", error);
            return [];
        }

        // Transform database shape to UI shape
        return (data as any[]).map((p) => ({
            id: p.id,
            filename: p.name.toLowerCase().replace(/\s+/g, "-") + ".tsx", // default to tsx
            name: p.name,
            description: p.description || "No description provided.",
            language: p.tech_stack?.[0] || "typescript",
            framework: p.tech_stack?.[1] || "react",
            status: "deployed",
            performance: 98, // Mock performance metric
            size: "2.5MB",  // Mock size
            url: p.demo_url || "#",
            imageUrl: p.image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            catCommand: `cat ${p.name.toLowerCase().replace(/\s+/g, "_")}.md`,
        }));
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
}
