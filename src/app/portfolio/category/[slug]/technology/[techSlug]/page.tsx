import React from "react";
import { getProjects, getProjectCategories } from "@/app/actions/projects";
import { PortfolioView } from "@/components/PortfolioView";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string; techSlug: string }>;
    searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, techSlug } = await params;
    const decodedTech = decodeURIComponent(techSlug);
    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} + ${decodedTech} Projects | Revorgs`,
        description: `Explore ${decodedTech} projects in ${slug}.`,
        alternates: {
            canonical: `/portfolio/category/${slug}/technology/${techSlug}`,
        },
    };
}

export default async function PortfolioCombinedPage({ params, searchParams }: Props) {
    const { slug, techSlug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const limit = 6;

    const decodedTech = decodeURIComponent(techSlug);

    const [data, categories] = await Promise.all([
        getProjects(currentPage, limit, {
            categorySlug: slug,
            technologySlug: decodedTech
        }),
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
            currentTechnologySlug={decodedTech}
            basePath="/portfolio"
        />
    );
}
