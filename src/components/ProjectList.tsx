"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ExternalLink, CheckCircle } from "lucide-react";
import type { Project } from "@/types";

export function ProjectList({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return <div className="text-center text-gray-500 mt-20">No projects found in database.</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-16">
            {projects.map((project, index) => (
                <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative border border-gray-200 dark:border-gray-800 bg-white dark:bg-terminal-black rounded-sm overflow-hidden hover:border-code-green transition-colors duration-300"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 dark:bg-gray-800 group-hover:bg-code-green transition-colors duration-300"></div>
                    <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-mono">
                                    <FileText size={16} />
                                    {project.filename}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-code-green transition-colors">
                                    {project.name}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                    {project.description}
                                </p>
                            </div>
                            <div className="space-y-3 font-mono text-xs">
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-2">
                                    <span className="text-gray-500">language:</span>
                                    <span
                                        className={`${project.language === "typescript"
                                            ? "text-code-blue"
                                            : project.language === "javascript"
                                                ? "text-yellow-400"
                                                : "text-code-blue"
                                            }`}
                                    >
                                        {project.language}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-2">
                                    <span className="text-gray-500">framework:</span>
                                    <span
                                        className={`${project.framework === "vue.js"
                                            ? "text-code-green"
                                            : "text-white"
                                            }`}
                                    >
                                        {project.framework}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-2">
                                    <span className="text-gray-500">status:</span>
                                    <span className="text-code-green flex items-center gap-1">
                                        <CheckCircle size={10} /> {project.status}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-900 pb-2">
                                    <span className="text-gray-500">performance:</span>
                                    <span className="text-code-green">
                                        {project.performance}/100
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2">
                                    <span className="text-gray-500">size:</span>
                                    <span className="text-gray-400">{project.size}</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-sm font-medium rounded-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full group-hover:border-code-green group-hover:text-code-green"
                                >
                                    <ExternalLink size={14} className="mr-2" />
                                    {project.catCommand}
                                </a>
                            </div>
                        </div>
                        <div className="lg:col-span-8 bg-gray-100 dark:bg-gray-900 rounded-sm border border-gray-200 dark:border-gray-800 p-2 group-hover:shadow-neon transition-shadow duration-300">
                            <div className="w-full h-full bg-white dark:bg-gray-800 rounded-sm overflow-hidden relative aspect-video flex flex-col">
                                <div className="absolute top-0 left-0 w-full h-6 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-2 space-x-1 z-10">
                                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <div className="ml-4 text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                        <span>{project.demo_url}</span>
                                        <span className="hidden group-hover:inline-block text-gray-500">
                                            - loading...
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-grow overflow-hidden relative bg-gray-50 dark:bg-gray-950">
                                    <Image
                                        src={project.image_url || "/placeholder.png"}
                                        alt={project.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 66vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.article>
            ))}
        </div>
    );
}
