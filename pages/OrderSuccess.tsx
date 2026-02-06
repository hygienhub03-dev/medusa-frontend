import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

const OrderSuccess: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state?.order;

    // If no order data, redirect to home
    React.useEffect(() => {
        if (!order) {
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) {
        return null;
    }

    const formatPrice = (amount: number) => {
        return (amount / 100).toFixed(2);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto">
                    {/* Success Icon */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                            Order Confirmed!
                        </h1>
                        <p className="text-lg text-gray-600">
                            Thank you for your purchase. Your order has been received.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="bg-light-beige border border-green-50 rounded-sm p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex items-start gap-3">
                                <Package className="text-primary mt-1" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Order Number</p>
                                    <p className="font-semibold text-gray-900">
                                        {order.display_id || order.id}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="text-primary mt-1" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Confirmation Sent To</p>
                                    <p className="font-semibold text-gray-900">
                                        {order.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="font-serif font-bold text-gray-900 mb-4">Order Summary</h3>
                            <div className="space-y-3">
                                {order.items?.map((item: any) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-700">
                                            {item.title} × {item.quantity}
                                        </span>
                                        <span className="font-semibold">${formatPrice(item.total)}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg">
                                    <span>Total Paid</span>
                                    <span className="text-green-600">${formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-blue-50 border border-blue-200 rounded-sm p-6 mb-8">
                        <h3 className="font-bold text-blue-900 mb-3">What's Next?</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>You'll receive an order confirmation email shortly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>We'll notify you when your order ships</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-1">✓</span>
                                <span>Track your order status in your account</span>
                            </li>
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/account"
                            className="flex-1 bg-primary text-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-dark-green transition-colors text-center"
                        >
                            View Order Details
                        </Link>
                        <Link
                            to="/shop"
                            className="flex-1 bg-white border-2 border-primary text-primary font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-light-beige transition-colors text-center flex items-center justify-center gap-2"
                        >
                            Continue Shopping
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-8">
                        Need help? Contact us at <a href="mailto:hygienhub@gmail.com" className="text-primary hover:underline">hygienhub@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
