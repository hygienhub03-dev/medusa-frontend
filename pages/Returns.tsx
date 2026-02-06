import React from 'react';
import { RefreshCw, Package, ShieldCheck, Mail } from 'lucide-react';

const Returns: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center text-center">
                    <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Satisfaction</span>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
                    <div className="w-20 h-1 bg-secondary mx-auto mt-6"></div>
                </div>

                <div className="bg-light-beige p-8 mb-16 rounded-sm text-center">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <RefreshCw className="mx-auto text-secondary mb-4" size={40} />
                        <h3 className="text-2xl font-serif font-bold">30-Day Happiness Guarantee</h3>
                        <p className="text-gray-600">
                            If you're not completely satisfied with your purchase, we offer a 30-day money-back guarantee. We're here to help you find the perfect routine.
                        </p>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none text-gray-600 space-y-12">
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">Return Process</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold rounded-full">1</div>
                                <h4 className="font-bold text-gray-900">Contact Us</h4>
                                <p className="text-sm">Email our team at hygienhub@gmail.com with your order number.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold rounded-full">2</div>
                                <h4 className="font-bold text-gray-900">Pack Items</h4>
                                <p className="text-sm">Carefully package the items you wish to return in their original packaging.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold rounded-full">3</div>
                                <h4 className="font-bold text-gray-900">Ship Back</h4>
                                <p className="text-sm">Use our pre-paid label (for ZA orders) to send the package back to us.</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-50 p-8 rounded-sm">
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <ShieldCheck className="text-secondary" />
                            <h2 className="text-xl font-serif font-bold m-0">Eligibility</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-sm">
                            <li>Items must be returned within 30 days of purchase.</li>
                            <li>Products must have at least 50% of the contents remaining.</li>
                            <li>Original components and packaging must be included.</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Returns;
