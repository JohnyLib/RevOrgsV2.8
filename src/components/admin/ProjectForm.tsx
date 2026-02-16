"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import { createProject } from "../../app/actions/admin-projects";

export function AdminProjectForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    // Simple state for inputs
    const [techInput, setTechInput] = useState("");
    const [catInput, setCatInput] = useState("");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addTech = () => {
        if (techInput.trim() && !technologies.includes(techInput.trim())) {
            setTechnologies([...technologies, techInput.trim()]);
            setTechInput("");
        }
    };

    const addCat = () => {
        if (catInput.trim() && !categories.includes(catInput.trim())) {
            setCategories([...categories, catInput.trim()]);
            setCatInput("");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget; // Capture form reference
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(form);

        // 1. Upload Image if exists
        let imageUrl = "";
        if (imageFile) {
            try {
                const supabase = createClient();
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('projects')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    throw new Error(`Image upload failed: ${uploadError.message}`);
                }

                const { data } = supabase.storage.from('projects').getPublicUrl(filePath);
                imageUrl = data.publicUrl;
            } catch (err: any) {
                setMessage({ type: 'error', text: err.message });
                setIsLoading(false);
                return;
            }
        }

        // 2. Submit to Server Action
        try {
            // Append extra data
            formData.append("image_url", imageUrl);
            formData.append("technologies", JSON.stringify(technologies));
            formData.append("categories", JSON.stringify(categories));

            const result = await createProject(formData);

            if (result.success) {
                setMessage({ type: 'success', text: "Project created successfully!" });
                // Reset form
                form.reset();
                setImageFile(null);
                setImagePreview(null);
                setTechnologies([]);
                setCategories([]);
            } else {
                setMessage({ type: 'error', text: result.error || "Failed to create project." });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || "An unexpected error occurred." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">

            {message && (
                <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input name="title" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                        <input name="slug" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name</label>
                        <input name="client_name" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project URL</label>
                        <input name="project_url" type="url" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" placeholder="https://" />
                    </div>
                </div>

                {/* Right Column: Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-xl hover:border-indigo-500 transition-colors cursor-pointer relative bg-gray-50 dark:bg-black/50">
                        {imagePreview ? (
                            <div className="relative w-full aspect-video">
                                <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setImageFile(null);
                                        setImagePreview(null);
                                    }}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-1 text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                <textarea name="short_description" rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Description</label>
                <textarea name="full_description" rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white" />
            </div>

            {/* Arrays */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white"
                            placeholder="e.g. Next.js"
                        />
                        <button type="button" onClick={addTech} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map(t => (
                            <span key={t} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm">
                                {t}
                                <X size={14} className="cursor-pointer hover:text-indigo-900 dark:hover:text-white" onClick={() => setTechnologies(technologies.filter(x => x !== t))} />
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            value={catInput}
                            onChange={(e) => setCatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCat())}
                            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white"
                            placeholder="e.g. Web Development"
                        />
                        <button type="button" onClick={addCat} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                            <Plus size={20} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <span key={c} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm">
                                {c}
                                <X size={14} className="cursor-pointer hover:text-purple-900 dark:hover:text-white" onClick={() => setCategories(categories.filter(x => x !== c))} />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : "Create Project"}
            </button>

        </form>
    );
}
