import React from "react";
import { getBlogPosts, getCategories } from "@/app/actions/blog";
import { BlogView } from "@/components/BlogView";

export const metadata = {
    title: "Blog | Revorgs",
    description: "Insights on Web Development, SEO, and Technology.",
    alternates: {
        canonical: "/blog",
    },
};

export default async function BlogPage(props: {
    searchParams: Promise<{ page?: string }>;
}) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 6;

    const [data, categories] = await Promise.all([
        getBlogPosts(currentPage, limit, {}), // No filters
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
            basePath="/blog"
        />
    );
}
