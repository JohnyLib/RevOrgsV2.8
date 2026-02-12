"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, X, Save } from "lucide-react";



// Define interface locally or import if shared
interface ProjectData {
    id?: string;
    name: string;
    description: string | null;
    status: string;
    language: string | null;
    framework: string | null;
    tech_stack: string | string[] | null; // Accept array from DB, but state will be string
    repo_url: string | null;
    demo_url: string | null;
    image_url: string | null;
    company_name: string | null;
    price: string | null;
}

interface ProjectFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: Partial<ProjectData>;
}

export function ProjectForm({ onClose, onSuccess, initialData }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper to format initial tech_stack
    const formatTechStack = (stack: string | string[] | null | undefined): string => {
        if (!stack) return "";
        if (Array.isArray(stack)) return stack.join(", ");
        return stack;
    };

    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        status: string;
        language: string;
        framework: string;
        tech_stack: string;
        repo_url: string;
        demo_url: string;
        image_url: string;
        company_name: string;
        price: string;
    }>({
        name: initialData?.name || "",
        description: initialData?.description || "",
        status: initialData?.status || "active",
        language: initialData?.language || "",
        framework: initialData?.framework || "",
        tech_stack: formatTechStack(initialData?.tech_stack),
        repo_url: initialData?.repo_url || "",
        demo_url: initialData?.demo_url || "",
        image_url: initialData?.image_url || "",
        company_name: initialData?.company_name || "",
        price: initialData?.price || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare data for DB
            const dbData = {
                name: formData.name,
                description: formData.description || null,
                status: formData.status,
                language: formData.language || null,
                framework: formData.framework || null,
                tech_stack: formData.tech_stack.split(",").map(s => s.trim()).filter(Boolean),
                repo_url: formData.repo_url || null,
                demo_url: formData.demo_url || null,
                image_url: formData.image_url || null,
                company_name: formData.company_name || null,
                price: formData.price || null,
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
                                name="company_name"
                                value={formData.company_name}
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
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                                placeholder="e.g. E-Commerce Platform"
                            />
                        </div>

                        {/* 6. Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows={3}
                                value={formData.description}
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
                                    name="demo_url"
                                    value={formData.demo_url}
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
                                    name="image_url"
                                    value={formData.image_url}
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
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-code-blue"
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                                <option value="planning">Planning</option>
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
