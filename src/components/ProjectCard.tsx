"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Project } from "@/types";

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-900/20 transition-all duration-300"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                    src={project.image_url || "/placeholder-project.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    {project.demo_url && (
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                            title="View Live Demo"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                    {project.repo_url && (
                        <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                            title="View Code"
                        >
                            <Github size={20} />
                        </a>
                    )}
                    <Link
                        href={`/portfolio/${project.slug}`}
                        className="p-3 bg-indigo-600 text-white rounded-full hover:scale-110 transition-transform"
                        title="View Details"
                    >
                        <ArrowUpRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        {project.categories && project.categories.length > 0 && (
                            <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-2 block">
                                {project.categories[0].name}
                            </span>
                        )}
                        <Link href={`/portfolio/${project.slug}`} className="block group/title">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover/title:text-indigo-600 dark:group-hover/title:text-indigo-400 transition-colors">
                                {project.title}
                            </h3>
                        </Link>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {project.short_description || project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech_stack?.slice(0, 3).map((tech, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 3 && (
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-50 dark:bg-gray-800/50 text-gray-400">
                            +{project.tech_stack.length - 3}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
