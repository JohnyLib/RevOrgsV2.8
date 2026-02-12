"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ProjectForm } from "./ProjectForm";
import { useRouter } from "next/navigation";

export function CreateProjectButton() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSuccess = () => {
        router.refresh();
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-code-green hover:bg-green-600 rounded-sm transition-colors"
            >
                <Plus size={16} />
                New Project
            </button>

            {isOpen && (
                <ProjectForm
                    onClose={() => setIsOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </>
    );
}
