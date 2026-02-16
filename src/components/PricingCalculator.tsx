"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calculator, Calendar, CreditCard, RefreshCw, Server, Layers, Wrench, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICES, EXCHANGE_RATE_EUR_MDL, ServiceCategory } from '@/data/pricing-services';
import { cn } from '@/lib/utils';
import { submitQuoteRequest, QuoteState } from '@/app/actions/quote';

const VAT_RATE = 0.20;

export default function PricingCalculator() {
    const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(new Set(['landing-page']));
    const [currency, setCurrency] = useState<'EUR' | 'MDL'>('EUR');
    const [includeVAT, setIncludeVAT] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<QuoteState>({});

    // Helper to check if a service is selected
    const isSelected = (id: string) => selectedServiceIds.has(id);

    const toggleService = (id: string, category: ServiceCategory) => {
        setSelectedServiceIds((prev) => {
            const next = new Set(prev);

            if (category === 'DEVELOPMENT') {
                // Enforce single selection for DEVELOPMENT
                // If clicking the already selected one, allow deselecting? Or enforce at least one?
                // Let's allow switching. If clicking same, maybe nothing or toggle off? 
                // User requirement: "Choose 1 Development". Usually implies radio behavior.

                // Remove other dev services first
                SERVICES.filter(s => s.category === 'DEVELOPMENT').forEach(s => next.delete(s.id));

                // If it wasn't selected before, add it. If it was, it's now toggled off (optional) or kept (radio).
                // Let's treat as Radio for Dev: Always select the new one.
                if (!prev.has(id)) {
                    next.add(id);
                } else {
                    // If clicking the same one, let's keep it selected (Radio behavior)
                    // Or allow deselecting to have 0 dev services? "Can choose 1 Development"
                    // Let's allow deselect to clear slate if needed, but typical flow is 1 is always active.
                    // Let's start with proper toggle for dev too, but clearing others.
                    next.add(id); // Force keep at least one? Or toggle? 
                    // Let's just add it, effectively re-selecting it. 
                    // Actually, if I want to allow 0, I should check internal state.
                    // But let's assume standard behavior: click another replaces current. Click same does nothing.
                }
            } else {
                // Standard toggle for others
                if (next.has(id)) {
                    next.delete(id);
                } else {
                    next.add(id);
                }
            }
            return next;
        });
    };

    const currencySymbol = currency === 'EUR' ? '€' : ' MDL';

    const convertPrice = (priceEUR: number) => {
        if (currency === 'EUR') return priceEUR;
        return Math.round(priceEUR * EXCHANGE_RATE_EUR_MDL);
    };

    const formatPrice = (amount: number) => {
        // Use narrowNoBreakSpace for thousands separator in ro-MD locale if needed, 
        // but standard formatter works well.
        return new Intl.NumberFormat(currency === 'EUR' ? 'de-DE' : 'ro-MD', {
            style: 'currency',
            currency: currency === 'EUR' ? 'EUR' : 'MDL',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const totals = useMemo(() => {
        let oneTimeSubtotal = 0;
        let monthlySubtotal = 0;
        let totalDuration = 0;

        SERVICES.forEach((service) => {
            if (selectedServiceIds.has(service.id)) {
                const price = convertPrice(service.priceEUR);
                const monthlyPrice = convertPrice(service.priceMonthlyEUR || 0);

                oneTimeSubtotal += price;
                monthlySubtotal += monthlyPrice;
                totalDuration += service.durationDays;
            }
        });

        const oneTimeVAT = includeVAT ? oneTimeSubtotal * VAT_RATE : 0;
        const monthlyVAT = includeVAT ? monthlySubtotal * VAT_RATE : 0;

        return {
            oneTimeSubtotal,
            monthlySubtotal,
            oneTimeVAT,
            monthlyVAT,
            oneTimeTotal: oneTimeSubtotal + oneTimeVAT,
            monthlyTotal: monthlySubtotal + monthlyVAT,
            totalDuration,
        };
    }, [selectedServiceIds, currency, includeVAT]);

    // Group services
    const devServices = SERVICES.filter(s => s.category === 'DEVELOPMENT');
    const otherServices = SERVICES.filter(s => s.category !== 'DEVELOPMENT');

    const getCategoryIcon = (cat: ServiceCategory) => {
        switch (cat) {
            case 'TECHNICAL': return <Server className="w-5 h-5 text-indigo-500" />;
            case 'ADD_ON': return <Layers className="w-5 h-5 text-green-500" />;
            case 'SUPPORT': return <ShieldCheck className="w-5 h-5 text-blue-500" />;
            default: return <Wrench className="w-5 h-5 text-gray-500" />;
        }
    };

    const getCategoryTitle = (cat: ServiceCategory) => {
        switch (cat) {
            case 'TECHNICAL': return 'Technical Setup';
            case 'ADD_ON': return 'Additional Options';
            case 'SUPPORT': return 'Support & Maintenance';
            default: return 'Other';
        }
    };

    // Group other services by category for display
    const groupedOtherServices = Object.entries(
        otherServices.reduce((acc, service) => {
            const cat = service.category;
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(service);
            return acc;
        }, {} as Record<ServiceCategory, typeof SERVICES>)
    );


    return (
        <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900/50 rounded-3xl my-10 border border-gray-100 dark:border-gray-800">
            <div className="text-center mb-10 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                    Cost Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Choose your development package and add-ons.
                </p>

                {/* Global Controls */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    <div className="bg-white dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700 inline-flex relative">
                        <motion.div
                            className="absolute top-1 bottom-1 bg-indigo-100 dark:bg-indigo-900/40 rounded-full z-0"
                            initial={false}
                            animate={{
                                left: currency === 'EUR' ? '4px' : '50%',
                                right: currency === 'EUR' ? '50%' : '4px',
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setCurrency('EUR')}
                            className={cn(
                                "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors",
                                currency === 'EUR' ? "text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400"
                            )}
                        >
                            EUR (€)
                        </button>
                        <button
                            onClick={() => setCurrency('MDL')}
                            className={cn(
                                "relative z-10 px-6 py-2 rounded-full text-sm font-medium transition-colors",
                                currency === 'MDL' ? "text-indigo-700 dark:text-indigo-300" : "text-gray-500 dark:text-gray-400"
                            )}
                        >
                            MDL (L)
                        </button>
                    </div>

                    <button
                        onClick={() => setIncludeVAT(!includeVAT)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                            includeVAT
                                ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300"
                                : "bg-white border-gray-200 text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        )}
                    >
                        <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                            includeVAT ? "bg-indigo-600 border-indigo-600" : "border-gray-400"
                        )}>
                            {includeVAT && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                        </div>
                        Include VAT (+20%)
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Services Selection */}
                <div className="lg:col-span-2 space-y-8">

                    {/* DEVELOPMENT Category (Radio selection visual) */}
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-semibold text-lg">
                            <CreditCard className="w-5 h-5 text-indigo-500" />
                            <span>Development Base (Choose 1)</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {devServices.map((service) => {
                                const active = isSelected(service.id);
                                return (
                                    <motion.div
                                        key={service.id}
                                        onClick={() => toggleService(service.id, 'DEVELOPMENT')}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className={cn(
                                            "cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between min-h-[160px]",
                                            active
                                                ? "border-indigo-500 bg-white dark:bg-gray-800 shadow-lg shadow-indigo-100 dark:shadow-indigo-900/20 ring-1 ring-indigo-500/50"
                                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-indigo-300 dark:hover:border-indigo-700"
                                        )}
                                    >
                                        <div className="absolute top-4 right-4">
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                                                active
                                                    ? "bg-indigo-500 border-indigo-500"
                                                    : "border-gray-300 dark:border-gray-600"
                                            )}>
                                                {active && <div className="w-2 h-2 rounded-full bg-white" />}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg pr-8">{service.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>{service.durationDays} Days</span>
                                            </div>
                                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                {formatPrice(convertPrice(service.priceEUR))}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Other Categories */}
                    {groupedOtherServices.map(([category, services]) => (
                        <div key={category}>
                            <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-semibold text-lg capitalize">
                                {getCategoryIcon(category as ServiceCategory)}
                                <span>{getCategoryTitle(category as ServiceCategory)}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {services.map(service => {
                                    const active = isSelected(service.id);
                                    return (
                                        <motion.div
                                            key={service.id}
                                            onClick={() => toggleService(service.id, service.category)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className={cn(
                                                "cursor-pointer flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
                                                active
                                                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10"
                                                    : "border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <div className={cn(
                                                "mt-1 w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors",
                                                active
                                                    ? "bg-indigo-600 border-indigo-600"
                                                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                                            )}>
                                                {active && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{service.title}</h4>
                                                    <div className="text-sm font-bold text-gray-900 dark:text-white ml-2 whitespace-nowrap">
                                                        {service.priceMonthlyEUR
                                                            ? <>{formatPrice(convertPrice(service.priceMonthlyEUR))}<span className="text-[10px] text-gray-500 font-normal">/mo</span></>
                                                            : formatPrice(convertPrice(service.priceEUR))
                                                        }
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{service.description}</p>
                                                {service.durationDays > 0 && category !== 'SUPPORT' && (
                                                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-gray-400">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>+{service.durationDays} days</span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                </div>

                {/* Sticky Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <motion.div
                            layout
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-gray-200 dark:border-gray-700 overflow-hidden"
                        >
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-800/50 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg mb-1">
                                    <Calculator className="w-5 h-5 text-indigo-500" />
                                    Estimated Cost
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Based on selected options</p>
                            </div>

                            <div className="p-6 space-y-4">
                                {selectedServiceIds.size === 0 ? (
                                    <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm italic">
                                        Select a service to start
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {/* One-time costs breakdown */}
                                        {totals.oneTimeSubtotal > 0 && (
                                            <div className="pb-3 border-b border-gray-100 dark:border-gray-700">
                                                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1">
                                                    <CreditCard className="w-3 h-3" /> One-time
                                                </div>
                                                {SERVICES.filter(s => selectedServiceIds.has(s.id) && !s.priceMonthlyEUR).map(service => (
                                                    <div key={service.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                                                        <span className="truncate pr-4">{service.title}</span>
                                                        <span className="font-medium shrink-0">{formatPrice(convertPrice(service.priceEUR))}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Recurring costs breakdown */}
                                        {totals.monthlySubtotal > 0 && (
                                            <div className="pb-3 border-b border-gray-100 dark:border-gray-700">
                                                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1">
                                                    <RefreshCw className="w-3 h-3" /> Monthly
                                                </div>
                                                {SERVICES.filter(s => selectedServiceIds.has(s.id) && s.priceMonthlyEUR).map(service => (
                                                    <div key={service.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                                                        <span className="truncate pr-4">{service.title}</span>
                                                        <span className="font-medium shrink-0">{formatPrice(convertPrice(service.priceMonthlyEUR || 0))}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* VAT Section */}
                                        {includeVAT && (
                                            <div className="pt-2 text-sm text-gray-500 dark:text-gray-400 space-y-1">
                                                {totals.oneTimeSubtotal > 0 && (
                                                    <div className="flex justify-between text-xs">
                                                        <span>VAT (20%) One-time:</span>
                                                        <span>{formatPrice(totals.oneTimeVAT)}</span>
                                                    </div>
                                                )}
                                                {totals.monthlySubtotal > 0 && (
                                                    <div className="flex justify-between text-xs">
                                                        <span>VAT (20%) Monthly:</span>
                                                        <span>{formatPrice(totals.monthlyVAT)}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="pt-4 mt-2 bg-gray-50 dark:bg-gray-900/40 -mx-6 px-6 pb-6 mb-[-24px]">
                                    {totals.oneTimeTotal > 0 && (
                                        <div className="flex justify-between items-end mb-3">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Upfront:</span>
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(totals.oneTimeTotal)}</span>
                                        </div>
                                    )}

                                    {totals.monthlyTotal > 0 && (
                                        <div className="flex justify-between items-end">
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Recurring:</span>
                                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(totals.monthlyTotal)}<span className="text-sm font-normal text-gray-500">/mo</span></span>
                                        </div>
                                    )}

                                    {totals.totalDuration > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <Calendar className="w-4 h-4 text-indigo-500" />
                                            <span>Timeline: <span className="font-bold">{totals.totalDuration} - {totals.totalDuration + 3} Days</span></span>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full mt-6 py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                                    >
                                        Request Quote
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Quote Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 dark:border-gray-800"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Get Your Quote</h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6">
                                {!formStatus.success ? (
                                    <form action={async (formData) => {
                                        setIsSubmitting(true);
                                        // Prepare details object
                                        const details = {
                                            selectedServices: Array.from(selectedServiceIds).map(id => SERVICES.find(s => s.id === id)?.title),
                                            totals: {
                                                oneTime: totals.oneTimeTotal,
                                                monthly: totals.monthlyTotal,
                                                currency: currency,
                                                includeVAT: includeVAT
                                            }
                                        };

                                        // Inject details into formData as string (or handle in server action if we bind)
                                        // Ideally we'd use a hidden input for simplicity with standard actions
                                        // formData.append('quote_details', JSON.stringify(details));
                                        // But we can't easily append to the FormData object passed to the action in React 19 / Next 14 actions easily without client-side handler.
                                        // So let's use a hidden input field.

                                        // Actually, let's just call the action wrapper.
                                        const res = await submitQuoteRequest(
                                            { message: '', errors: {} },
                                            formData,
                                            details
                                        );

                                        setFormStatus(res);
                                        setIsSubmitting(false);
                                    }}>
                                        <input type="hidden" name="quote_details" value={JSON.stringify({
                                            selectedServices: Array.from(selectedServiceIds).map(id => SERVICES.find(s => s.id === id)?.title),
                                            totals: {
                                                oneTime: totals.oneTimeTotal,
                                                monthly: totals.monthlyTotal,
                                                currency,
                                                includeVAT
                                            }
                                        })} />

                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="John Doe"
                                                />
                                                {formStatus.errors?.name && <p className="text-red-500 text-xs mt-1">{formStatus.errors.name[0]}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="john@example.com"
                                                />
                                                {formStatus.errors?.email && <p className="text-red-500 text-xs mt-1">{formStatus.errors.email[0]}</p>}
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number (Optional)</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="+373 60 123 456"
                                                />
                                            </div>

                                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400">
                                                <p className="font-semibold mb-1">Quote Summary:</p>
                                                <ul className="list-disc pl-4 space-y-0.5">
                                                    <li>{totals.oneTimeTotal > 0 ? `${formatPrice(totals.oneTimeTotal)} upfront` : 'No upfront cost'}</li>
                                                    {totals.monthlyTotal > 0 && <li>{formatPrice(totals.monthlyTotal)} / month</li>}
                                                    <li>{totals.totalDuration} days estimated</li>
                                                </ul>
                                            </div>

                                            {formStatus.message && !formStatus.success && (
                                                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 text-sm rounded-lg">
                                                    {formStatus.message}
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    "w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2",
                                                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <RefreshCw className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Request <Check className="w-5 h-5" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Check className="w-8 h-8" strokeWidth={3} />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Sent!</h4>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                                            We have received your details and will get back to you shortly to discuss your project.
                                        </p>
                                        <button
                                            onClick={() => {
                                                setIsModalOpen(false);
                                                setFormStatus({}); // Reset for next time if needed
                                            }}
                                            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
