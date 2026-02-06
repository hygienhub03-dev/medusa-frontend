import React, { useState } from 'react';
import { Package, Truck, Search, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrackOrder: React.FC = () => {
    const [orderId, setOrderId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Tracking functionality for order ${orderId} is coming soon! Our integration with local couriers is being finalized.`);
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="bg-light-beige py-20 border-b border-gray-100">
                <div className="container mx-auto px-6 text-center">
                    <span className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4 block">Order Status</span>
                    <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Track Your Order</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Stay updated on your skin's transformation. Enter your order details below to see its journey to your door.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gray-50 p-8 md:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 text-gray-200">
                            <Truck size={120} className="opacity-10 translate-x-12 translate-y-4" />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full pl-4 pr-12 py-4 bg-white border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-300 shadow-sm"
                                            placeholder="e.g. #12345"
                                            value={orderId}
                                            onChange={(e) => setOrderId(e.target.value)}
                                            required
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                                            <Search size={20} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-4 bg-white border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-300 shadow-sm"
                                        placeholder="email@example.com"
                                        required
                                    />
                                    <p className="text-[10px] text-gray-400 mt-2 italic">Please use the same email address as when the order was placed.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white font-bold uppercase tracking-widest py-4 hover:bg-secondary transition-all shadow-lg flex items-center justify-center gap-3 group"
                            >
                                Track My Package <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4 p-6 border border-gray-100 rounded-sm">
                            <div className="w-10 h-10 bg-blue-50 text-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                <HelpCircle size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Need Help?</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Can't find your order number? Check your confirmation email or contact our support.</p>
                                <Link to="/contact" className="text-primary text-[10px] font-bold uppercase tracking-widest mt-2 block hover:underline">Contact Support</Link>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 border border-gray-100 rounded-sm">
                            <div className="w-10 h-10 bg-green-50 text-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <Package size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Shipping Policy</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">Typical orders arrive within 3-5 business days. Learn more about our delivery times.</p>
                                <Link to="/shipping" className="text-primary text-[10px] font-bold uppercase tracking-widest mt-2 block hover:underline">Read Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrackOrder;
