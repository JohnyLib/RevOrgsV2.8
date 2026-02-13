import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

// Temporary list until we fetch from DB or passed as props
const COMMON_TECHNOLOGIES = [
    { name: "Next.js", slug: "Next.js" },
    { name: "React", slug: "React" },
    { name: "TypeScript", slug: "TypeScript" },
    { name: "Supabase", slug: "Supabase" },
    { name: "Tailwind CSS", slug: "Tailwind CSS" },
    { name: "Node.js", slug: "Node.js" },
];

interface LinkTechnologyFilterProps {
    currentTechnologySlug?: string;
    basePath?: string;
    getHref?: (techSlug: string | null) => string;
}

export function LinkTechnologyFilter({ currentTechnologySlug, basePath, getHref }: LinkTechnologyFilterProps) {
    const t = useTranslations('Portfolio');
    const generateHref = (slug: string | null) => {
        if (getHref) return getHref(slug);
        if (!slug) return basePath || "/portfolio";
        return `${basePath || '/portfolio'}/technology/${slug}`;
    };

    return (
        <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('technologies')}</h3>
            <div className="flex flex-wrap gap-2">
                <Link
                    href={generateHref(null)}
                    className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border",
                        !currentTechnologySlug
                            ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-200 dark:text-black dark:border-gray-200"
                            : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-400"
                    )}
                >
                    {t('any')}
                </Link>
                {COMMON_TECHNOLOGIES.map((tech) => (
                    <Link
                        key={tech.name}
                        href={generateHref(tech.name)} // Using name as slug per requirement
                        className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 border",
                            currentTechnologySlug === tech.name
                                ? "bg-gray-800 text-white border-gray-800 dark:bg-gray-200 dark:text-black dark:border-gray-200"
                                : "bg-transparent text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-gray-400"
                        )}
                    >
                        {tech.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
