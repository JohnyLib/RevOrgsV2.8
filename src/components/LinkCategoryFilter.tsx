import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { useTranslations } from 'next-intl';

interface LinkCategoryFilterProps {
    categories: Category[];
    basePath?: string;
    getHref?: (categorySlug: string | null) => string;
    currentCategorySlug?: string;
    showLabel?: boolean;
}

export function LinkCategoryFilter({ categories, basePath, getHref, currentCategorySlug, showLabel = true }: LinkCategoryFilterProps) {
    const t = useTranslations('Portfolio');
    const generateHref = (slug: string | null) => {
        if (getHref) return getHref(slug);
        if (!slug) return basePath || "/portfolio";
        return `${basePath || '/portfolio'}/category/${slug}`;
    };

    return (
        <div className="mb-8">
            {showLabel && <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{t('categories')}</h3>}
            <div className="flex flex-wrap gap-2">
                <Link
                    href={generateHref(null)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                        !currentCategorySlug
                            ? "bg-code-blue text-white border-code-blue"
                            : "bg-white dark:bg-terminal-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-code-blue hover:text-code-blue"
                    )}
                >
                    {t('all')}
                </Link>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={generateHref(category.slug)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                            currentCategorySlug === category.slug
                                ? "bg-code-blue text-white border-code-blue"
                                : "bg-white dark:bg-terminal-black text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-code-blue hover:text-code-blue"
                        )}
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
