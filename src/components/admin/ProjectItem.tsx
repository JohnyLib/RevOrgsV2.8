"use client";

import { useState } from "react";
import { FolderGit2, Trash2, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ProjectForm } from "./ProjectForm";
import { useRouter } from "next/navigation";

// Define interface matching Supabase table
interface Project {
    id: string;
    name: string;
    status: string;
    description: string | null;
    language: string | null;
    framework: string | null;
    repo_url: string | null;
    demo_url: string | null;
    image_url: string | null;
    created_at: string;
}

interface ProjectItemProps {
    project: Project;
}

export function ProjectItem({ project }: ProjectItemProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    return (
        <>
            <div className="group bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-sm p-4 hover:border-code-green transition-colors flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="font-bold text-gray-900 dark:text-white truncate pr-2">{project.name}</div>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm border ${project.status === 'active' ? 'border-green-200 text-green-700 dark:border-green-900 dark:text-green-400' :
                            project.status === 'completed' ? 'border-blue-200 text-blue-700 dark:border-blue-900 dark:text-blue-400' :
                                'border-gray-200 text-gray-500 dark:border-gray-700'
                        }`}>
                        {project.status}
                    </span>
                </div>

                <p className="text-xs text-gray-500 line-clamp-3 mb-4 flex-grow">
                    {project.description || "No description"}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-[10px] text-gray-400 font-mono flex gap-2">
                        {project.language && <span>{project.language}</span>}
                        {project.framework && <span>{project.framework}</span>}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-gray-400 hover:text-code-blue transition-colors"
                            title="Edit"
                        >
                            <Edit2 size={14} />
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                            title="Delete"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <ProjectForm
                    initialData={project}
                    onClose={() => setIsEditing(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}
