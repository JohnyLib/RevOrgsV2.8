import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getProjectBySlug } from "@/app/actions/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Calendar, Building2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const slug = decodeURIComponent(params.slug);
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Portfolio`,
        description: project.short_description || project.title,
    };
}

export default async function ProjectDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = decodeURIComponent(params.slug);
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <article>
                    <header className="mb-8">
                        <div className="flex items-center gap-2 text-sm text-code-blue mb-4">
                            <span>/portfolio</span>
                            <span>/</span>
                            <span>{project.slug}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.categories?.map(cat => (
                                <Link key={cat.id} href={`/portfolio?category=${cat.slug}`} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full text-code-blue hover:bg-code-blue hover:text-white transition-colors">
                                    {cat.name}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            {project.title}
                        </h1>
                        {project.short_description && (
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                {project.short_description}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                            {project.company_name && (
                                <div className="flex items-center gap-2">
                                    <Building2 size={16} />
                                    <span>{project.company_name}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{new Date(project.created_at).getFullYear()}</span>
                            </div>
                        </div>
                    </header>

                    {project.cover_image && (
                        <div className="mb-12 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 relative aspect-video shadow-lg">
                            <Image
                                src={project.cover_image}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 900px"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose dark:prose-invert max-w-none">
                        {/* Render simple text for now, ideally Markdown or Rich Text */}
                        <div className="whitespace-pre-wrap font-sans text-base leading-7">
                            {project.full_description || project.short_description || "No content available."}
                        </div>
                    </div>

                    <div className="mt-12 flex flex-wrap gap-4">
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-code-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <ExternalLink className="mr-2 -ml-1 h-5 w-5" />
                                Visit Project
                            </a>
                        )}
                        {project.repo_url && (
                            <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Github className="mr-2 -ml-1 h-5 w-5" />
                                View Source
                            </a>
                        )}
                    </div>
                </article>

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CreativeWork",
                            headline: project.title,
                            description: project.short_description || project.title,
                            image: project.cover_image ? [project.cover_image] : [],
                            dateCreated: project.created_at,
                            author: {
                                "@type": "Organization",
                                name: project.company_name || "RevOrgs",
                            },
                            fileFormat: project.language,
                        }),
                    }}
                />
            </main>

            <Footer />
        </div>
    );
}
