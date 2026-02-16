"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateProjectButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/admin/portfolio/new")}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-code-green hover:bg-green-600 rounded-sm transition-colors"
        >
            <Plus size={16} />
            New Project
        </button>
    );
}
