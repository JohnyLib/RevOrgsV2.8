import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Pagination } from "@/components/Pagination";
import { LinkCategoryFilter } from "@/components/LinkCategoryFilter";
import { BlogPost, Category } from "@/app/actions/blog";
import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Clock } from "lucide-react";

interface BlogViewProps {
    posts: BlogPost[];
    categories: Category[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
    currentCategorySlug?: string;
    isFeatured?: boolean;
    basePath?: string; // e.g. "/blog"
}

export function BlogView({
    posts,
    categories,
    totalCount,
    currentPage,
    totalPages,
    currentCategorySlug,
    isFeatured,
    basePath = "/blog"
}: BlogViewProps) {
    const limit = 6;

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-4xl text-code-blue">📰</span>
                        {isFeatured ? "Featured Stories" : "Blog & Insights"}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-sm leading-relaxed mb-6">
                        Thoughts on Web Development, SEO, and Tech. <br />
                        Displaying {posts.length} articles.
                    </p>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <LinkCategoryFilter
                            categories={categories}
                            basePath={basePath}
                            currentCategorySlug={currentCategorySlug}
                        />

                        {/* Featured Link separate from categories but conceptually a filter */}
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Special</h3>
                            <Link
                                href="/blog/featured"
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${isFeatured
                                        ? "bg-code-blue text-white border-code-blue"
                                        : "bg-white dark:bg-terminal-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-code-blue hover:text-code-blue"
                                    }`}
                            >
                                Featured
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article key={post.id} className="flex flex-col bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-sm overflow-hidden hover:border-code-green transition-colors duration-300 group">
                            {post.cover_image && (
                                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                                    <Image
                                        src={post.cover_image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </Link>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {new Date(post.published_at).toLocaleDateString()}
                                    </span>
                                    {post.reading_time && (
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {post.reading_time} min read
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold mb-3 group-hover:text-code-green transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <User size={12} />
                                        {post.author_name || "RevOrgs Team"}
                                    </span>
                                    <Link href={`/blog/${post.slug}`} className="text-xs text-code-blue hover:underline">
                                        Read more →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        No articles found.
                    </div>
                )}

                <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center text-sm">
                    <div className="text-gray-500">
                        Page {currentPage} of {totalPages}
                    </div>
                    {/* Pagination will use query params (?page=2) */}
                    <Pagination totalPages={totalPages} currentPage={currentPage} />
                </div>
            </main>

            <Footer />
        </div>
    );
}
