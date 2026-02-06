import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { medusa } from '../lib/medusa';
import { useQuery } from '@tanstack/react-query';
import { Star, Minus, Plus, Truck, ArrowLeft, Heart, Share2, ShieldCheck, Loader2, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
    const { handle } = useParams<{ handle: string }>();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const { addItem } = useCart();

    // Medusa v2 API: Use store.product.list() with handle filter
    const { data, isLoading } = useQuery({
        queryKey: ['product', handle],
        queryFn: async () => {
            if (!handle) return null;
            // Medusa v2: Filter by handle to get specific product
            const response = await medusa.store.product.list({
                handle: handle,
                limit: 1
            });
            // If found by handle, return it; otherwise try to get first product as fallback
            if (response.products && response.products.length > 0) {
                return response.products[0];
            }
            // Fallback: get all products and find by handle
            const allProducts = await medusa.store.product.list({ limit: 20 });
            return allProducts.products?.find((p: any) => p.handle === handle) || allProducts.products?.[0];
        },
        enabled: !!handle
    });

    const product = data;

    const handleAddToCart = async () => {
        if (!product || !product.variants?.[selectedVariantIndex]) return;

        setIsAddingToCart(true);
        try {
            await addItem(product.variants[selectedVariantIndex].id, quantity);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (err) {
            console.error('Failed to add to cart:', err);
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found. <Link to="/shop" className="ml-2 underline">Return to Shop</Link></div>;

    const selectedVariant = product.variants?.[selectedVariantIndex];
    // Medusa v2 price structure handling
    const price = selectedVariant?.calculated_price?.calculated_amount
        || selectedVariant?.prices?.[0]?.amount
        || 0;
    // v2 prices might already be in decimal format or need division
    const displayPrice = price > 1000 ? price / 100 : price;

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 text-sm uppercase tracking-wide">
                    <ArrowLeft size={16} /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative group">
                            <img
                                src={product.thumbnail || '/images/logo.png'}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm"><Heart size={20} /></button>
                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-primary shadow-sm"><Share2 size={20} /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {(product.images?.length ? product.images : [{ url: product.thumbnail }]).slice(0, 4).map((img: any, i: number) => (
                                img?.url && (
                                    <div key={i} className="aspect-square bg-gray-100 cursor-pointer hover:ring-2 ring-primary transition-all">
                                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex text-yellow-400">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                            </div>
                            <span className="text-xs text-gray-500">(128 Reviews)</span>
                        </div>

                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{product.title}</h1>
                        <div className="text-2xl text-secondary font-semibold mb-6">R{displayPrice.toFixed(2)}</div>

                        <div className="prose prose-sm text-gray-600 mb-8 max-w-none">
                            {product.description || "Experience the ultimate in skincare luxury. This product is formulated with potent natural ingredients to rejuvenate and protect your skin."}
                        </div>

                        {/* Variants */}
                        {product.variants && product.variants.length > 0 && (
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-900 mb-3">Size / Variant</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((v: any, i: number) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariantIndex(i)}
                                            className={`px-4 py-2 border text-sm transition-all ${selectedVariantIndex === i
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-200 text-gray-700 hover:border-primary'
                                                }`}
                                        >
                                            {v.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Actions */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 rounded-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`flex-1 font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 ${addedToCart
                                    ? 'bg-green-600 text-white'
                                    : 'bg-primary text-white hover:bg-dark-green'
                                    } disabled:opacity-70`}
                            >
                                {isAddingToCart ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : addedToCart ? (
                                    <>
                                        <Check size={18} /> Added to Cart
                                    </>
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>
                        </div>

                        <div className="border-t border-gray-100 pt-6 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-3">
                                <Truck size={18} className="text-primary" />
                                <span>Free shipping on orders over R500</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-primary" />
                                <span>100% Organic & Chemical Free</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
