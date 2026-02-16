"use client";

import React from "react";
import { Project } from "@/types";
import { ProjectCard } from "./ProjectCard";
import { motion } from "framer-motion";

interface ProjectGridProps {
    projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}
