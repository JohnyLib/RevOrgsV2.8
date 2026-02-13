"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, FileText, Globe } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useTranslations } from "next-intl";

// TODO: Replace with Supabase fetch — `supabase.from('manifesto_entries').select('*').order('sort_order')`

export default function ManifestoPage() {
    const t = useTranslations("Manifesto");

    return (
        <div className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300 min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="mb-12 border-b border-gray-200 dark:border-gray-800 pb-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-5xl font-bold mb-4 flex items-center gap-3"
                    >
                        <span className="text-code-purple">#</span> {t('title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 dark:text-gray-400 max-w-2xl"
                    >
                        <span className="text-code-blue">const</span> description ={" "}
                        <span className="text-code-green">
                            &quot;{t('description')}&quot;
                        </span>
                        ;
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Git Log Section */}
                    <div className="relative">
                        <h2 className="text-xl font-bold mb-8 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                            <History size={18} className="text-code-orange" />
                            git log --graph --oneline
                        </h2>
                        <div className="relative pl-4 border-l-2 border-dashed border-gray-300 dark:border-gray-800 ml-3 space-y-12">
                            {/* Commit 1 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute -left-[25px] bg-background-light dark:bg-background-dark p-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-code-blue bg-background-light dark:bg-background-dark"></div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                                        <span className="text-code-orange">c1a0f92</span>
                                        <span>(HEAD -&gt; master)</span>
                                        <span>2023-10-15</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                        {t('commits.expansion.title')}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                        {t('commits.expansion.desc')}
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                            feat: opened_ny_office
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Commit 2 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute -left-[25px] bg-background-light dark:bg-background-dark p-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-code-purple bg-background-light dark:bg-background-dark"></div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                                        <span className="text-code-orange">b4d2e11</span>
                                        <span>2021-06-22</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                        {t('commits.migration.title')}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                        {t('commits.migration.desc')}
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                            refactor: stack_upgrade
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Commit 3 */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="relative"
                            >
                                <div className="absolute -left-[25px] bg-background-light dark:bg-background-dark p-1">
                                    <div className="w-4 h-4 rounded-full border-2 border-code-green bg-background-light dark:bg-background-dark"></div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                                        <span className="text-code-orange">a89c33f</span>
                                        <span>2019-03-10</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                                        {t('commits.founded.title')}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                                        {t('commits.founded.desc')}
                                    </p>
                                    <div className="flex gap-2 mt-3">
                                        <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                            init: initial_commit
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Core Principles Section */}
                    <div className="flex flex-col space-y-12">
                        <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                            <FileText size={18} className="text-code-blue" />
                            {t('principles')}
                        </h2>
                        <div className="space-y-10">
                            {/* Principle 1 */}
                            <motion.div whileHover={{ scale: 1.02 }} className="group">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <span className="text-code-purple mr-2">##</span> {t('principlesItems.philosophy.title')}
                                </h3>
                                <div className="bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 p-6 rounded shadow-sm hover:border-code-purple transition-colors">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-mono">
                                        {t('principlesItems.philosophy.desc')}
                                    </p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-900 text-xs text-gray-500 flex justify-between">
                                        <span>Last edited: 2 days ago</span>
                                        <span className="text-code-purple">120 lines</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Principle 2 */}
                            <motion.div whileHover={{ scale: 1.02 }} className="group">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <span className="text-code-green mr-2">##</span> {t('principlesItems.excellence.title')}
                                </h3>
                                <div className="bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 p-6 rounded shadow-sm hover:border-code-green transition-colors">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-mono">
                                        {t('principlesItems.excellence.desc')}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Principle 3 */}
                            <motion.div whileHover={{ scale: 1.02 }} className="group">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <span className="text-code-blue mr-2">##</span>{" "}
                                    {t('principlesItems.client.title')}
                                </h3>
                                <div className="bg-white dark:bg-terminal-black border border-gray-200 dark:border-gray-800 p-6 rounded shadow-sm hover:border-code-blue transition-colors">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-mono">
                                        {t('principlesItems.client.desc')}
                                        <br />
                                        <br />
                                        <span className="text-gray-400 italic">
                                            {"// Your success is our merge request acceptance criteria."}
                                        </span>
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Global Reach SVG */}
                <section className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800">
                    <div className="mb-12 text-center">
                        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                            <Globe size={24} className="text-code-green" />
                            {t('globalReach')}
                        </h2>
                        <p className="text-sm text-gray-500 mt-2">
                            NY - MD - SG
                        </p>
                    </div>
                    <div className="relative w-full h-[300px] md:h-[400px] bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden flex items-center justify-center">
                        <svg
                            className="w-full h-full opacity-60 dark:opacity-40"
                            viewBox="0 0 1000 500"
                        >
                            <path
                                className="text-gray-300 dark:text-gray-700"
                                d="M150,150 Q180,100 250,120 T400,150 T550,120 T700,180 T850,150"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            ></path>
                            <path
                                className="text-gray-300 dark:text-gray-700"
                                d="M180,300 Q250,350 350,320 T500,350 T650,300 T800,350"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            ></path>

                            {/* Animated Lines */}
                            <path
                                className="animate-dash-blue"
                                d="M530,160 L250,180"
                                stroke="#60a5fa"
                                strokeDasharray="10,10"
                                strokeWidth="1.5"
                                fill="none"
                            />
                            <path
                                className="animate-dash-purple"
                                d="M530,160 L750,200"
                                stroke="#c084fc"
                                strokeDasharray="10,10"
                                strokeWidth="1.5"
                                fill="none"
                            />

                            {/* Nodes */}
                            <g className="cursor-pointer group">
                                <circle
                                    className="fill-code-green animate-pulse"
                                    cx="530"
                                    cy="160"
                                    r="6"
                                ></circle>
                                <circle
                                    className="stroke-code-green fill-none opacity-50"
                                    cx="530"
                                    cy="160"
                                    r="12"
                                ></circle>
                                <text
                                    className="text-xs font-mono fill-gray-800 dark:fill-white font-bold"
                                    x="545"
                                    y="165"
                                >
                                    MD (HQ)
                                </text>
                            </g>
                            <g className="cursor-pointer">
                                <circle
                                    className="fill-code-blue"
                                    cx="250"
                                    cy="180"
                                    r="4"
                                ></circle>
                                <text
                                    className="text-xs font-mono fill-gray-500 dark:fill-gray-400"
                                    x="260"
                                    y="185"
                                >
                                    NY
                                </text>
                            </g>
                            <g className="cursor-pointer">
                                <circle
                                    className="fill-code-purple"
                                    cx="750"
                                    cy="200"
                                    r="4"
                                ></circle>
                                <text
                                    className="text-xs font-mono fill-gray-500 dark:fill-gray-400"
                                    x="760"
                                    y="205"
                                >
                                    SG
                                </text>
                            </g>
                        </svg>
                        <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-400 bg-white/80 dark:bg-black/80 p-2 rounded border border-gray-200 dark:border-gray-800">
                            <div>
                                status: <span className="text-code-green">online</span>
                            </div>
                            <div>
                                latency: <span className="text-code-blue">24ms</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
