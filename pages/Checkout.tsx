import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CheckCircle, ChevronRight, CreditCard, Mail, MapPin, Truck } from 'lucide-react';
import Paystack from 'paystack-inline-ts';

// Steps: 0 = Address, 1 = Shipping, 2 = Payment
const Checkout: React.FC = () => {
    const navigate = useNavigate();
    const {
        cart,
        isLoading,
        error: cartError,
        updateAddress,
        shippingOptions,
        addShippingMethod,
        initiatePaymentSession,
        completeCart
    } = useCart();

    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Address State
    const [address, setAddress] = useState({
        first_name: '',
        last_name: '',
        address_1: '',
        city: '',
        country_code: 'za', // Default to South Africa
        postal_code: '',
        phone: '',
        province: ''
    });

    // Payment State
    const [email, setEmail] = useState('');
    const paystackRef = useRef<any | null>(null);

    useEffect(() => {
        if (cart) {
            setEmail(cart.email || '');
            // Pre-fill address if available in cart
            // Note: cart.shipping_address isn't typed in our simple Cart interface yet but might exist
            // Use type assertion or checking if you want to pre-fill.
        }
    }, [cart]);

    useEffect(() => {
        if (!paystackRef.current) {
            paystackRef.current = new Paystack();
        }
    }, []);

    const formatPrice = (amount: number) => (amount / 100).toFixed(2);

    const handleAddressSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setErrorMessage(null);
        try {
            await updateAddress(address);
            setCurrentStep(1); // Move to shipping
        } catch (err: any) {
            setErrorMessage(err.message || 'Failed to save address');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleShippingSelect = async (optionId: string) => {
        setIsProcessing(true);
        setErrorMessage(null);
        try {
            await addShippingMethod(optionId);
            setCurrentStep(2); // Move to payment
        } catch (err: any) {
            setErrorMessage(err.message || 'Failed to select shipping method');
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePayment = async () => {
        if (!email) {
            setErrorMessage('Please provide an email address');
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        try {
            const session = await initiatePaymentSession(email);
            const accessCode = session.data?.paystackTxAccessCode;

            if (!accessCode) {
                throw new Error('Payment access code missing');
            }

            const paystack = paystackRef.current!;
            paystack.resumeTransaction(accessCode, {
                async onSuccess() {
                    try {
                        const order = await completeCart();
                        navigate('/order-success', { state: { order } });
                    } catch (err: any) {
                        setErrorMessage(err.message || 'Order completion failed');
                        setIsProcessing(false);
                    }
                },
                onError(error: any) {
                    setErrorMessage(error?.message || 'Payment failed');
                    setIsProcessing(false);
                },
                onClose() {
                    setIsProcessing(false);
                }
            });
        } catch (err: any) {
            setErrorMessage(err.message || 'Failed to initiate payment');
            setIsProcessing(false);
        }
    };

    if (isLoading && !cart) {
        return <div className="pt-24 text-center">Loading checkout...</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="pt-24 text-center">
                <p>Your cart is empty</p>
                <button onClick={() => navigate('/shop')} className="text-primary mt-4">Go to Shop</button>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT COLUMN - STEPS */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

                        {/* STEP 1: ADDRESS */}
                        <div className={`mb-8 ${currentStep !== 0 ? 'opacity-60 pointer-events-none' : ''}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 0 ? 'bg-primary text-white' : 'bg-gray-200'}`}>1</div>
                                <h2 className="text-xl font-bold">Shipping Address</h2>
                            </div>

                            {currentStep === 0 && (
                                <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                                    <input required placeholder="First Name" className="border p-3 rounded" value={address.first_name} onChange={e => setAddress({ ...address, first_name: e.target.value })} />
                                    <input required placeholder="Last Name" className="border p-3 rounded" value={address.last_name} onChange={e => setAddress({ ...address, last_name: e.target.value })} />
                                    <input required placeholder="Address" className="border p-3 rounded md:col-span-2" value={address.address_1} onChange={e => setAddress({ ...address, address_1: e.target.value })} />
                                    <input required placeholder="City" className="border p-3 rounded" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                    <input required placeholder="Postal Code" className="border p-3 rounded" value={address.postal_code} onChange={e => setAddress({ ...address, postal_code: e.target.value })} />
                                    <input required placeholder="Province" className="border p-3 rounded" value={address.province} onChange={e => setAddress({ ...address, province: e.target.value })} />
                                    <input required placeholder="Phone" className="border p-3 rounded" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />

                                    <button type="submit" disabled={isProcessing} className="bg-primary text-white py-3 rounded md:col-span-2 mt-2 hover:opacity-90 disabled:opacity-50">
                                        {isProcessing ? 'Saving...' : 'Continue to Shipping'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* STEP 2: SHIPPING */}
                        <div className={`mb-8 ${currentStep !== 1 ? 'opacity-60 pointer-events-none' : ''}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>2</div>
                                <h2 className="text-xl font-bold">Shipping Method</h2>
                            </div>

                            {currentStep === 1 && (
                                <div className="pl-11 space-y-3">
                                    {shippingOptions.length === 0 ? (
                                        <p className="text-red-500">No shipping options available for this region.</p>
                                    ) : (
                                        shippingOptions.map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => handleShippingSelect(option.id)}
                                                className="w-full flex justify-between p-4 border rounded hover:border-primary text-left"
                                            >
                                                <span>{option.name}</span>
                                                <span className="font-bold">R{formatPrice(option.amount)}</span>
                                            </button>
                                        ))
                                    )}
                                    <button onClick={() => setCurrentStep(0)} className="text-sm underline text-gray-500 mt-2">Back to Address</button>
                                </div>
                            )}
                        </div>

                        {/* STEP 3: PAYMENT */}
                        <div className={`mb-8 ${currentStep !== 2 ? 'opacity-60 pointer-events-none' : ''}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>3</div>
                                <h2 className="text-xl font-bold">Payment</h2>
                            </div>

                            {currentStep === 2 && (
                                <div className="pl-11">
                                    <div className="mb-4">
                                        <label className="block text-sm font-bold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full border p-3 rounded"
                                            placeholder="receipt@email.com"
                                        />
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded border mb-4">
                                        <p className="text-sm">You will be redirected to Paystack to complete your payment securely.</p>
                                    </div>

                                    {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
                                    {cartError && <p className="text-red-500 text-sm mb-4">{cartError}</p>}

                                    <button
                                        onClick={handlePayment}
                                        disabled={isProcessing}
                                        className="w-full bg-primary text-white py-4 rounded font-bold hover:bg-dark-green transition-colors disabled:opacity-50"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay R${formatPrice(cart.total)}`}
                                    </button>
                                    <button onClick={() => setCurrentStep(1)} className="text-sm underline text-gray-500 mt-4">Back to Shipping</button>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN - ORDER SUMMARY */}
                    <div className="w-full lg:w-96">
                        <div className="bg-gray-50 p-6 rounded sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                            <div className="space-y-4 max-h-96 overflow-auto">
                                {cart.items.map(item => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden">
                                            {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{item.title}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-sm">R{formatPrice(item.total)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t mt-4 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>R{formatPrice(cart.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    {/* Usually medusa cart.shipping_total is available */}
                                    {/* Accessing it as cart.total - cart.subtotal is a rough proxy if not explicit, but let's assume included in Total or mapped */}
                                    <span>Calculated at next step</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                                    <span>Total</span>
                                    <span>R{formatPrice(cart.total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
