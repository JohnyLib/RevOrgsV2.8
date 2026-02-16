"use client";

import { use } from "react";

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Edit Project</h1>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Editing Project ID: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{id}</code></p>
                <p className="text-indigo-600 font-medium">Edit functionality coming soon.</p>
            </div>
        </div>
    );
}
