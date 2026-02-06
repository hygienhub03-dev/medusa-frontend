import React from 'react';
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react';

const Shipping: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center text-center">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Delivery</span>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
                    <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-center">
                    <div className="p-8 bg-gray-50 border border-gray-100 rounded-sm">
                        <Truck className="mx-auto text-primary mb-4" size={32} />
                        <h4 className="font-bold mb-2">South Africa Shipping</h4>
                        <p className="text-sm text-gray-600">Free on orders over R1000. Flat rate of R100 for all other orders.</p>
                    </div>
                    <div className="p-8 bg-gray-50 border border-gray-100 rounded-sm text-center">
                        <Globe className="mx-auto text-secondary mb-4" size={32} />
                        <h4 className="font-bold mb-2">International Shipping</h4>
                        <p className="text-sm text-gray-600">Calculated at checkout. Available to most countries worldwide.</p>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none text-gray-600 space-y-8">
                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <Clock className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">Processing Times</h2>
                        </div>
                        <p>
                            All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day. You will receive a shipment confirmation email with your tracking number once your order has shipped.
                        </p>
                    </section>

                    <section>
                        <div className="flex items-center gap-3 mb-4 text-gray-900">
                            <ShieldCheck className="text-primary" />
                            <h2 className="text-2xl font-serif font-bold m-0">Safe & Secure Delivery</h2>
                        </div>
                        <p>
                            We partner with leading couriers to ensure your skincare essentials arrive safely. All packages are insured and require a signature upon delivery for your peace of mind.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
