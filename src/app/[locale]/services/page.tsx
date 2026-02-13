import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getServices } from "@/app/actions/services";
import { Link } from "@/i18n/routing";
import { Braces, ArrowRight, Zap, Monitor, Terminal } from "lucide-react";
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function ServicesPage(props: {
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Services' });
    const services = await getServices();

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                        <span className="text-3xl md:text-4xl text-code-purple">🛠️</span>
                        {t('title')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('subtitle')}
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="group p-8 border border-gray-200 dark:border-gray-800 rounded bg-white dark:bg-terminal-black hover:border-code-blue hover:shadow-lg dark:hover:shadow-neon-blue transition-all duration-300 flex flex-col"
                        >
                            <div className="text-code-blue mb-6 font-bold text-sm flex justify-between items-center">
                                <span>{"// " + String(index + 1).padStart(2, '0')}</span>
                                <Braces size={16} />
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-code-blue transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                {service.short_description || "No description available."}
                            </p>

                            <div className="mt-auto">
                                <div className="mb-6 pt-6 border-t border-gray-100 dark:border-gray-900 flex justify-between items-center">
                                    <span className="text-xs uppercase tracking-wider text-gray-500">{t('startingAt')}</span>
                                    <span className="font-bold text-lg text-code-green">{service.price_from || "Custom"}</span>
                                </div>

                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex w-full items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-sm text-white bg-gray-900 dark:bg-gray-800 hover:bg-code-blue dark:hover:bg-code-blue transition-colors group-hover:shadow-md"
                                >
                                    {t('viewDetails')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded border border-dashed border-gray-300 dark:border-gray-700">
                        <Terminal size={48} className="mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Services Found</h3>
                        <p className="text-gray-500 mt-2">Check back later or contact us for a custom quote.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
