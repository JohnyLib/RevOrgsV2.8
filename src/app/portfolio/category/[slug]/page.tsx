import React from "react";
import { getProjects, getProjectCategories } from "@/app/actions/projects";
import { PortfolioView } from "@/components/PortfolioView";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Projects | Revorgs`,
        description: `Explore our ${slug} projects and case studies.`,
        alternates: {
            canonical: `/portfolio/category/${slug}`,
        },
    };
}

export default async function PortfolioCategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const limit = 6;

    const [data, categories] = await Promise.all([
        getProjects(currentPage, limit, { categorySlug: slug }),
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
            currentCategorySlug={slug}
            basePath="/portfolio"
        />
    );
}
