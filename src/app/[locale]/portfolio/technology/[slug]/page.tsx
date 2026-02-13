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
        title: `${slug} Projects | Revorgs`,
        description: `Explore projects built with ${slug}.`,
        alternates: {
            canonical: `/portfolio/technology/${slug}`,
        },
    };
}

export default async function PortfolioTechnologyPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const limit = 6;

    // We assume the slug passed in URL is the technology name as per our plan
    // In a real scenario we might need to decodeURI(slug) if it contains spaces or special chars
    const decodedSlug = decodeURIComponent(slug);

    const [data, categories] = await Promise.all([
        getProjects(currentPage, limit, { technologySlug: decodedSlug }),
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
            currentTechnologySlug={decodedSlug}
            basePath="/portfolio"
        />
    );
}
