import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PricingCalculator from "@/components/PricingCalculator";
import { getTranslations } from 'next-intl/server';

export default async function ServicesPage(props: {
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'Services' });

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
                        <span className="text-3xl md:text-4xl text-code-purple">🛠️</span>
                        {t('title')}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t('subtitle')}
                    </p>
                </header>

                <PricingCalculator />
            </main>

            <Footer />
        </div>
    );
}
