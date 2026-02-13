import React from "react";
import { getBlogPosts, getCategories } from "@/app/actions/blog";
import { BlogView } from "@/components/BlogView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Featured Articles | Revorgs Blog",
    description: "Our best and most popular articles.",
    alternates: {
        canonical: "/blog/featured",
    },
};

export default async function BlogFeaturedPage(props: {
    searchParams: Promise<{ page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 6;

    const [data, categories] = await Promise.all([
        getBlogPosts(currentPage, limit, { isFeatured: true }),
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
            isFeatured={true}
            basePath="/blog"
        />
    );
}
