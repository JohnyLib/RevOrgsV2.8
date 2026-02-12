import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectList } from "@/components/ProjectList";
import { getProjects } from "@/app/actions/projects";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-4xl text-code-blue">📂</span>
                        Directory Listing
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed">
                        Index of /projects/ <br />
                        Displaying {projects.length} items from database. All projects are
                        deployed and monitored.
                    </p>
                </header>

                <ProjectList projects={projects} />

                <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center text-sm">
                    <div className="text-gray-500">Total files: {projects.length}</div>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 disabled:opacity-50"
                            disabled
                        >
                            &lt; prev
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                            1
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500">
                            2
                        </button>
                        <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white">
                            next &gt;
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
