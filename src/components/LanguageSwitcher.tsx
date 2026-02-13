"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { useLocale } from "next-intl";

const LANGUAGES = [
    { code: "ro", label: "Română", flag: "🇷🇴" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

export const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageChange = (nextLocale: string) => {
        router.replace(pathname, { locale: nextLocale });
        setIsOpen(false);
    };

    const currentLanguage = LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-code-blue dark:hover:text-code-blue transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Select Language"
            >
                <Globe size={18} />
                <span className="hidden sm:inline-block">{currentLanguage.code.toUpperCase()}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-40 bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                    >
                        <div className="py-1">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageChange(lang.code)}
                                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${locale === lang.code
                                            ? "text-code-blue font-bold bg-blue-50 dark:bg-blue-900/20"
                                            : "text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span className="text-lg">{lang.flag}</span>
                                        {lang.label}
                                    </span>
                                    {locale === lang.code && <Check size={16} className="text-code-blue" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
