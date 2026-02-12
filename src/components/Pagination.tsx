"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex gap-2">
            <Link
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                className={`px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm flex items-center ${currentPage <= 1
                        ? "text-gray-400 pointer-events-none opacity-50"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                    }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                <ChevronLeft size={16} className="mr-1" /> prev
            </Link>

            {/* Simple pagination logic: show all pages for now, can be optimized for large numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                    key={page}
                    href={createPageURL(page)}
                    className={`px-3 py-1 border rounded-sm ${currentPage === page
                            ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-black border-gray-900 dark:border-gray-100"
                            : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                        }`}
                >
                    {page}
                </Link>
            ))}

            <Link
                href={currentPage < totalPages ? createPageURL(currentPage + 1) : "#"}
                className={`px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-sm flex items-center ${currentPage >= totalPages
                        ? "text-gray-400 pointer-events-none opacity-50"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300"
                    }`}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
            >
                next <ChevronRight size={16} className="ml-1" />
            </Link>
        </div>
    );
}
