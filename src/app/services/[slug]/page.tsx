import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getServiceBySlug } from "@/app/actions/services";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const service = await getServiceBySlug(params.slug);
    if (!service) return { title: "Service Not Found" };

    return {
        title: `${service.seo_title || service.title} | Services`,
        description: service.seo_description || service.short_description,
    };
}

export default async function ServiceDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-mono transition-colors duration-300">
            <Header />

            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <Link href="/services" className="inline-flex items-center text-sm text-gray-500 hover:text-code-blue mb-8 transition-colors">
                    <ArrowLeft size={14} className="mr-1" />
                    Back to All Services
                </Link>

                <header className="mb-12 text-center md:text-left">
                    <div className="text-code-purple font-bold mb-2 text-sm uppercase tracking-widest">Service Offer</div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                        {service.title}
                    </h1>
                    {service.short_description && (
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                            {service.short_description}
                        </p>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2 prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap font-sans text-base leading-8 text-gray-800 dark:text-gray-300">
                            {service.full_description || "Detailed description coming soon."}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded border border-gray-200 dark:border-gray-800 sticky top-24">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Zap size={18} className="text-yellow-500" />
                                Project Details
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                    <span className="text-gray-500 text-sm">Starting Price</span>
                                    <span className="font-bold text-code-green text-lg">{service.price_from || "Contact Us"}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-800">
                                    <span className="text-gray-500 text-sm">Delivery Time</span>
                                    <span className="font-medium">2-4 Weeks</span>
                                </div>
                                <div className="pt-2">
                                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        <CheckCircle size={14} className="text-code-blue mt-1 shrink-0" />
                                        <span>Full Source Code Ownership</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        <CheckCircle size={14} className="text-code-blue mt-1 shrink-0" />
                                        <span>SEO Optimization Included</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CheckCircle size={14} className="text-code-blue mt-1 shrink-0" />
                                        <span>3 Months Support</span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/#contact"
                                className="block w-full text-center py-3 px-4 bg-code-blue hover:bg-blue-700 text-white font-bold rounded transition-colors shadow-lg shadow-blue-500/20"
                            >
                                Get Started
                            </Link>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                No commitment required for initial consultation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section included in the page flow or separate component */}
                <section id="contact-cta" className="bg-gray-100 dark:bg-terminal-black border border-gray-200 dark:border-gray-800 rounded p-12 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to elevate your digital presence?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                        Let's discuss how our {service.title} service can help you achieve your business goals.
                    </p>
                    <Link href="/#contact" className="inline-block px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity">
                        Book a Free Strategy Call
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
