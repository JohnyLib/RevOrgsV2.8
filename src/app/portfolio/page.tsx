import React from "react";
import { getProjects, getProjectCategories } from "@/app/actions/projects";
import { PortfolioView } from "@/components/PortfolioView";

export const metadata = {
    title: "Portfolio | Revorgs",
    description: "Explore our latest projects and case studies.",
    alternates: {
        canonical: "/portfolio",
    },
};

export default async function PortfolioPage(props: {
    searchParams: Promise<{ page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 6;

    const [data, categories] = await Promise.all([
        getProjects(currentPage, limit, {}), // No filters
        getProjectCategories()
    ]);

    const { projects, totalCount } = data;
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <PortfolioView
            projects={projects}
            categories={categories}
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/portfolio"
        />
    );
}
