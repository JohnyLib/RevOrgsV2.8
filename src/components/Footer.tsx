import React from "react";
import { Link } from "@/i18n/routing";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useTranslations } from 'next-intl';

export const Footer: React.FC = () => {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navigation');

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-lg font-bold font-mono text-gray-900 dark:text-white">
                            {"<RevOrgs />"}
                        </span>
                        <p className="mt-4 text-xs text-gray-500">
                            {t('description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            {t('sitemap')}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/services"
                                    className="text-gray-500 hover:text-code-blue transition-colors"
                                >
                                    {tNav('services')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/manifesto"
                                    className="text-gray-500 hover:text-code-green transition-colors"
                                >
                                    {tNav('manifesto')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/portfolio"
                                    className="text-gray-500 hover:text-code-purple transition-colors"
                                >
                                    {tNav('portfolio')}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    {tNav('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            {t('stack')}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <span className="text-gray-500">React.js</span>
                            </li>
                            <li>
                                <span className="text-gray-500">Next.js</span>
                            </li>
                            <li>
                                <span className="text-gray-500">Vue.js</span>
                            </li>
                            <li>
                                <span className="text-gray-500">Node.js</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            {t('social')}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    className="text-gray-500 hover:text-white transition-colors flex items-center gap-2"
                                    href="#"
                                >
                                    <Github size={12} /> GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2"
                                    href="#"
                                >
                                    <Linkedin size={12} /> LinkedIn
                                </a>
                            </li>
                            <li>
                                <a
                                    className="text-gray-500 hover:text-blue-300 transition-colors flex items-center gap-2"
                                    href="#"
                                >
                                    <Twitter size={12} /> Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center text-xs text-gray-400 font-mono mb-4 md:mb-0">
                        <span className="text-code-green">root</span>@
                        <span className="text-code-blue">RevOrgs</span>:~/
                        <span className="text-gray-500"><span suppressHydrationWarning>{new Date().getFullYear()}</span>_{t('rights').replace(/ /g, '_')}</span>
                    </p>
                    <div className="text-center text-xs text-gray-500">
                        158 Madison Ave, New York, NY 10016 | {t('designedIn')}
                    </div>
                </div>
            </div>
        </footer>
    );
};
