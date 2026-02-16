import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectGrid } from "@/components/ProjectGrid";
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
                                if (!slug) {
                                    if (currentTechnologySlug) {
                                        return `/portfolio/technology/${currentTechnologySlug}`;
                                    }
                                    return "/portfolio";
                                }
                                if (currentTechnologySlug) {
                                    return `/portfolio/category/${slug}/technology/${currentTechnologySlug}`;
                                }
                                return `/portfolio/category/${slug}`;
                            }}
                        />
                        <LinkTechnologyFilter
                            currentTechnologySlug={currentTechnologySlug}
                            getHref={(slug) => {
                                if (!slug) {
                                    if (currentCategorySlug) {
                                        return `/portfolio/category/${currentCategorySlug}`;
                                    }
                                    return "/portfolio";
                                }
                                if (currentCategorySlug) {
                                    return `/portfolio/category/${currentCategorySlug}/technology/${slug}`;
                                }
                                return `/portfolio/technology/${slug}`;
                            }}
                        />
                    </div>
                </header>

                <ProjectGrid projects={projects} />

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
