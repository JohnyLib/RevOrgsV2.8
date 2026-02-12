import React from "react";
import { getBlogPosts, getCategories } from "@/app/actions/blog";
import { BlogView } from "@/components/BlogView";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Articles | Revorgs Blog`,
        description: `Read our latest articles about ${slug}.`,
        alternates: {
            canonical: `/blog/category/${slug}`,
        },
    };
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;
    const limit = 6;

    const [data, categories] = await Promise.all([
        getBlogPosts(currentPage, limit, { categorySlug: slug }),
        getCategories()
    ]);

    const { posts, totalCount } = data;
    const totalPages = Math.ceil(totalCount / limit);

    return (
        <BlogView
            posts={posts}
            categories={categories}
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            currentCategorySlug={slug}
            basePath="/blog"
        />
    );
}
