import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectList } from "@/components/ProjectList";
import { Pagination } from "@/components/Pagination";
import { LinkCategoryFilter } from "@/components/LinkCategoryFilter";
import { LinkTechnologyFilter } from "@/components/LinkTechnologyFilter";
import { Category, Project } from "@/types";

interface PortfolioViewProps {
    projects: Project[];
    categories: Category[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    currentCategorySlug?: string;
    currentTechnologySlug?: string;
    basePath?: string; // e.g. "/portfolio" usually
}

export function PortfolioView({
    projects,
    categories,
    totalCount,
    currentPage,
    totalPages,
    currentCategorySlug,
    currentTechnologySlug,
    basePath = "/portfolio"
}: PortfolioViewProps) {
    const limit = 6;

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-4xl text-code-blue">💼</span>
                        Portfolio
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed mb-6">
                        Selected Works & Case Studies. <br />
                        Displaying {projects.length} items.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8">
                        <LinkCategoryFilter
                            categories={categories}
                            currentCategorySlug={currentCategorySlug}
                            getHref={(slug) => {
                                // If picking "All" (slug is null)
                                if (!slug) {
                                    // Reset Category. Keep existing technology if any?
                                    // Note: If we reset category, we go to /portfolio (or /portfolio/technology/XYZ)
                                    // BUT, technology/XYZ route does NOT support picking a category easily if logic isn't bidirectional.
                                    // For simplicity and standard behavior, "All Categories" usually resets to root or just tech.
                                    if (currentTechnologySlug) {
                                        return `/portfolio/technology/${currentTechnologySlug}`;
                                    }
                                    return "/portfolio";
                                }

                                // Selecting a category
                                // If we have a technology selected, we want to go to /portfolio/category/SLUG/technology/TECH
                                if (currentTechnologySlug) {
                                    return `/portfolio/category/${slug}/technology/${currentTechnologySlug}`;
                                }
                                // No technology, just category
                                return `/portfolio/category/${slug}`;
                            }}
                        />
                        <LinkTechnologyFilter
                            currentTechnologySlug={currentTechnologySlug}
                            getHref={(slug) => {
                                // Picking "Any Technology" (slug is null)
                                if (!slug) {
                                    // Reset Technology. Keep Category if any.
                                    if (currentCategorySlug) {
                                        return `/portfolio/category/${currentCategorySlug}`;
                                    }
                                    return "/portfolio";
                                }

                                // Selecting a specific technology
                                if (currentCategorySlug) {
                                    // If we have a category, append technology
                                    return `/portfolio/category/${currentCategorySlug}/technology/${slug}`;
                                }
                                // No category, just technology
                                return `/portfolio/technology/${slug}`;
                            }}
                        />
                    </div>
                </header>

                <ProjectList projects={projects} />

                <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center text-sm">
                    <div className="text-gray-500">
                        Showing {(currentPage - 1) * limit + 1}-
                        {Math.min(currentPage * limit, totalCount)} of {totalCount} projects
                    </div>
                    {/* Pagination will use query params (?page=2) which works fine with dynamic route base */}
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
