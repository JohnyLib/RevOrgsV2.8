import PricingCalculator from '@/components/PricingCalculator';

export default function PricingTestPage() {
    return (
        <main className="min-h-screen p-8 bg-gray-50 dark:bg-black">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-8 text-center">Pricing Calculator Test Page</h1>
                <PricingCalculator />
            </div>
        </main>
    );
}
