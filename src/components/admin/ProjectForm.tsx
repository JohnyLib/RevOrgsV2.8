"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, X, Save } from "lucide-react";



// Define interface locally or import if shared
// Define interface matching Supabase table row + extra form fields
// Define interface matching Supabase table row + extra form fields
interface ProjectData {
    id?: string;
    title: string;
    slug?: string;
    short_description: string | null;
    is_published: boolean;
    cover_image: string | null;
    client_name: string | null;
    project_url: string | null;
    // Virtual fields for metrics
    price: string;
    repo_url: string;
    tech_stack: string;
    framework: string;
    language: string;
    metrics?: any;
}

interface ProjectFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: Partial<ProjectData>;
}

export function ProjectForm({ onClose, onSuccess, initialData }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    // Helper to format initial tech_stack
    const formatTechStack = (stack: any): string => {
        if (!stack) return "";
        if (Array.isArray(stack)) return stack.join(", ");
        return String(stack);
    };

    const initialMetrics = initialData?.metrics || {};

    const [formData, setFormData] = useState<{
        title: string;
        short_description: string;
        is_published: boolean;
        client_name: string;
        cover_image: string;
        project_url: string;
        // Virtual
        price: string;
        repo_url: string;
        tech_stack: string;
        framework: string;
        language: string;
    }>({
        title: initialData?.title || "",
        short_description: initialData?.short_description || "",
        is_published: initialData?.is_published ?? true,
        client_name: initialData?.client_name || "",
        cover_image: initialData?.cover_image || "",
        project_url: initialData?.project_url || "",

        // Metrics
        price: initialMetrics.price || "",
        repo_url: initialMetrics.repo_url || "",
        tech_stack: formatTechStack(initialMetrics.tech_stack),
        framework: initialMetrics.framework || "",
        language: initialMetrics.language || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare metrics
            const metrics = {
                price: formData.price,
                repo_url: formData.repo_url,
                tech_stack: formData.tech_stack.split(",").map(s => s.trim()).filter(Boolean),
                framework: formData.framework,
                language: formData.language,
            };

            // Prepare data for DB
            const dbData = {
                title: formData.title,
                slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'project-' + Date.now(),
                short_description: formData.short_description || null,
                is_published: formData.is_published,
                client_name: formData.client_name || null,
                cover_image: formData.cover_image || null,
                project_url: formData.project_url || null,
                metrics: metrics
            };

            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from("projects")
                    .update(dbData)
                    .eq("id", initialData.id);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase
                    .from("projects")
                    .insert([dbData]);
                if (error) throw error;
            }

            onSuccess();
            onClose();
        } catch (err: unknown) {
            console.error("Error saving project:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to save project";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {initialData ? "Edit Project" : "New Project"}
                    </h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        {/* 1. Company Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                            <input
                                type="text"
                                name="client_name"
                                value={formData.client_name}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                placeholder="e.g. TechCorp Ltd."
                            />
                        </div>

                        {/* Project Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                placeholder="e.g. E-Commerce Platform"
                            />
                        </div>

                        {/* 6. Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                                name="short_description"
                                rows={3}
                                value={formData.short_description}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                placeholder="Brief project description..."
                            />
                        </div>

                        {/* 2. Link (Demo URL) & 3. Git Repo */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Link</label>
                                <input
                                    type="text"
                                    name="project_url"
                                    value={formData.project_url}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Git Repo</label>
                                <input
                                    type="text"
                                    name="repo_url"
                                    value={formData.repo_url}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        {/* 4. Photo & 5. Price */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                                <input
                                    type="text"
                                    name="cover_image"
                                    value={formData.cover_image}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                    placeholder="e.g. $5000"
                                />
                            </div>
                        </div>

                        {/* 7. Frameworks */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frameworks (comma separated)</label>
                            <input
                                type="text"
                                name="tech_stack"
                                value={formData.tech_stack}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                placeholder="React, Next.js, Taiwan CSS"
                            />
                        </div>

                        {/* Status Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Published</label>
                            <select
                                name="is_published"
                                value={String(formData.is_published)}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.value === 'true' }))}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                            >
                                <option value="true">Published</option>
                                <option value="false">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-code-blue hover:bg-blue-600 rounded-md transition-colors disabled:opacity-50"
                        >
                            {loading && <Loader2 size={16} className="animate-spin" />}
                            <Save size={16} />
                            Save Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
