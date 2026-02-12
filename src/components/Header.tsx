"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";

export const Header: React.FC = () => {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = (id: string) => {
        setMobileOpen(false);
        if (pathname !== "/") {
            window.location.href = `/#${id}`;
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 dark:bg-terminal-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500 group-hover:bg-red-600 transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:bg-yellow-600 transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                            </div>
                            <span className="font-mono font-bold text-gray-700 dark:text-gray-200 ml-2">
                                RevOrgs
                                <span className="animate-blink text-code-green">_</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8 text-sm font-mono">
                            <Link
                                href="/"
                                className={`hover:text-code-blue transition-colors ${pathname === "/" ? "text-code-blue" : "text-gray-500"
                                    }`}
                            >
                                ~/home
                            </Link>
                            <Link
                                href="/projects"
                                className={`hover:text-code-purple transition-colors ${pathname === "/projects"
                                        ? "text-code-purple"
                                        : "text-gray-500"
                                    }`}
                            >
                                ./projects
                            </Link>
                            <Link
                                href="/manifesto"
                                className={`hover:text-code-green transition-colors ${pathname === "/manifesto" ? "text-code-green" : "text-gray-500"
                                    }`}
                            >
                                ./manifesto
                            </Link>
                            <button
                                onClick={() => handleScroll("services")}
                                className="hover:text-gray-900 dark:hover:text-white text-gray-500 transition-colors"
                            >
                                ./services
                            </button>
                            <button
                                onClick={() => handleScroll("contact")}
                                className="px-4 py-2 border border-gray-900 dark:border-white rounded hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                            >
                                contact.sh
                            </button>

                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                aria-label="Toggle theme"
                            >
                                {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden items-center gap-2">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                            aria-label="Toggle theme"
                        >
                            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-terminal-black border-t border-gray-200 dark:border-gray-800">
                    <div className="px-4 py-4 space-y-3 text-sm font-mono">
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 ${pathname === "/" ? "text-code-blue" : "text-gray-500"
                                }`}
                        >
                            ~/home
                        </Link>
                        <Link
                            href="/projects"
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 ${pathname === "/projects" ? "text-code-purple" : "text-gray-500"
                                }`}
                        >
                            ./projects
                        </Link>
                        <Link
                            href="/manifesto"
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 ${pathname === "/manifesto" ? "text-code-green" : "text-gray-500"
                                }`}
                        >
                            ./manifesto
                        </Link>
                        <button
                            onClick={() => handleScroll("services")}
                            className="block py-2 text-gray-500 hover:text-white transition-colors"
                        >
                            ./services
                        </button>
                        <button
                            onClick={() => handleScroll("contact")}
                            className="block w-full text-left py-2 px-4 border border-gray-900 dark:border-white rounded hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                        >
                            contact.sh
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
