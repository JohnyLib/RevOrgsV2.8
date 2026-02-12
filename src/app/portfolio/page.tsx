import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectList } from "@/components/ProjectList";
import { getProjects } from "@/app/actions/projects";
import { Pagination } from "@/components/Pagination";

export default async function PortfolioPage(props: {
    searchParams: Promise<{ page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 6;
    const { projects, totalCount } = await getProjects(currentPage, limit);
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-4xl text-code-blue">💼</span>
                        Portfolio
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed">
                        Selected Works & Case Studies. <br />
                        Displaying {projects.length} items.
                    </p>
                </header>

                <ProjectList projects={projects} />

                <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center text-sm">
                    <div className="text-gray-500">
                        Showing {(currentPage - 1) * limit + 1}-
                        {Math.min(currentPage * limit, totalCount)} of {totalCount} projects
                    </div>
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
