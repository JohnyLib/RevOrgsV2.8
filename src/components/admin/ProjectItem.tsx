"use client";

import { useState } from "react";
import { Trash2, Edit2, ExternalLink, Github, Building2, DollarSign } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProjectForm } from "./ProjectForm";
import { useRouter } from "next/navigation";

// Define interface matching Supabase table and ProjectForm
// Define interface matching Supabase table row
interface Project {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    full_description: string | null;
    client_name: string | null;
    year: number | null;
    is_published: boolean | null;
    is_featured: boolean | null;
    cover_image: string | null;
    project_url: string | null;
    metrics: any | null; // Using any for flexibility with JSON
    created_at: string | null;
}

interface ProjectItemProps {
    project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from("projects")
                .delete()
                .eq("id", project.id);

            if (error) throw error;
            router.refresh();
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSuccess = () => {
        setIsEditing(false);
        router.refresh();
    };

    // Extract extra data from metrics if available
    const extraData = project.metrics || {};
    const status = project.is_published ? 'published' : 'draft';
    const techStack = extraData.tech_stack || [];
    const language = extraData.language;
    const framework = extraData.framework;
    const price = extraData.price;
    const repoUrl = extraData.repo_url;
    const demoUrl = project.project_url || extraData.demo_url;

    return (
        <>
            <div className="group bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-code-green transition-all hover:shadow-lg flex flex-col h-full">
                {/* Image Section */}
                {project.cover_image && (
                    <div className="relative h-32 w-full bg-gray-100 dark:bg-gray-900 overflow-hidden border-b border-gray-100 dark:border-gray-800">
                        {/* Fallback to simple img if external URL, or Next Image if local/configured domain */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={project.cover_image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                    </div>
                )}

                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            {project.client_name && (
                                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1">
                                    <Building2 size={12} />
                                    {project.client_name}
                                </div>
                            )}
                            <h3 className="font-bold text-gray-900 dark:text-white truncate pr-2 text-lg leading-tight">
                                {project.title}
                            </h3>
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border font-medium ${status === 'published' ? 'border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400' :
                            'border-gray-200 bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:border-gray-700'
                            }`}>
                            {status}
                        </span>
                    </div>

                    {price && (
                        <div className="text-sm font-mono text-code-green mb-3 flex items-center gap-1">
                            <DollarSign size={14} />
                            {price}
                        </div>
                    )}

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">
                        {project.short_description || "No description"}
                    </p>

                    {/* Tech Stack */}
                    {techStack && techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {techStack.map((tech: string, i: number) => (
                                <span key={i} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* fallback for old schema */}
                    {(!techStack || techStack.length === 0) && (language || framework) && (
                        <div className="text-[10px] text-gray-400 font-mono flex gap-2 mb-4">
                            {language && <span>{language}</span>}
                            {framework && <span>{framework}</span>}
                        </div>
                    )}

                    <div className="flex items-start justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex gap-3">
                            {repoUrl && (
                                <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-code-purple transition-colors" title="View Code">
                                    <Github size={16} />
                                </a>
                            )}
                            {demoUrl && (
                                <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-code-blue transition-colors" title="Live Demo">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-gray-400 hover:text-code-blue transition-colors p-1"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 p-1"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isEditing && (
                <ProjectForm
                    initialData={project as any} // Cast because ProjectForm might expect slightly different props, but we will fix ProjectForm next
                    onClose={() => setIsEditing(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}
