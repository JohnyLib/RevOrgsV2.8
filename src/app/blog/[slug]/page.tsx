import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBlogPostBySlug } from "@/app/actions/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = await getBlogPostBySlug(params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.seo_title || post.title} | Blog`,
        description: post.seo_description || post.excerpt,
        keywords: post.seo_keywords,
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
                <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-code-blue mb-8 transition-colors">
                    <ArrowLeft size={14} className="mr-1" />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-8">
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(post.published_at).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                            {post.reading_time && (
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {post.reading_time} min read
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <User size={14} />
                                {post.author_name || "RevOrgs Team"}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-code-green pl-4 italic">
                                {post.excerpt}
                            </p>
                        )}
                    </header>

                    {post.cover_image && (
                        <div className="mb-10 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 relative aspect-video shadow-lg">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none prose-lg">
                        {/* 
                            TODO: Integration with a Markdown renderer like 'react-markdown' 
                            or 'next-mdx-remote' is recommended for rich content.
                            For now, we render basic text content.
                        */}
                        <div className="whitespace-pre-wrap font-sans text-base leading-8 text-gray-800 dark:text-gray-300">
                            {post.content || "No content available."}
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
