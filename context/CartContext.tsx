import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { medusa, fetchWithAuth, config } from '../lib/medusa';

// Types for cart items and cart state
interface CartItem {
    id: string;
    title: string;
    description: string;
    thumbnail: string | null;
    variant: {
        id: string;
        title: string;
    };
    quantity: number;
    unit_price: number;
    total: number;
}

interface Cart {
    id: string;
    items: CartItem[];
    subtotal: number;
    total: number;
    region_id: string;
    currency_code: string;
    email?: string | null;
}

interface CartContextType {
    cart: Cart | null;
    isLoading: boolean;
    error: string | null;
    addItem: (variantId: string, quantity: number) => Promise<void>;
    updateItem: (lineItemId: string, quantity: number) => Promise<void>;
    removeItem: (lineItemId: string) => Promise<void>;
    refreshCart: () => Promise<void>;
    updateEmail: (email: string) => Promise<void>;
    initiatePaymentSession: (email: string) => Promise<any>;
    completeCart: () => Promise<any>;
    itemCount: number;
    shippingOptions: any[];
    updateAddress: (address: AddressPayload) => Promise<void>;
    addShippingMethod: (optionId: string) => Promise<void>;
}

export interface AddressPayload {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    country_code: string;
    postal_code: string;
    phone?: string;
    province?: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'medusa_cart_id';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);

    // Get or create cart using Medusa v2 API
    const initializeCart = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const existingCartId = localStorage.getItem(CART_ID_KEY);

            if (existingCartId) {
                // Try to retrieve existing cart using v2 API
                try {
                    const { cart: existingCart } = await medusa.store.cart.retrieve(existingCartId);
                    if (existingCart && !existingCart.completed_at) {
                        setCart(mapCart(existingCart));
                        if (existingCart.region_id) {
                            fetchShippingOptions(existingCart.id);
                        }
                        setIsLoading(false);
                        return;
                    }
                } catch (e) {
                    // Cart not found or completed, create new one
                    localStorage.removeItem(CART_ID_KEY);
                }
            }

            // Get regions first using v2 API
            const { regions } = await medusa.store.region.list();
            if (!regions || regions.length === 0) {
                throw new Error('No regions configured in Medusa');
            }

            // Create new cart using v2 API
            const { cart: newCart } = await medusa.store.cart.create({
                region_id: regions[0].id
            });

            localStorage.setItem(CART_ID_KEY, newCart.id);
            setCart(mapCart(newCart));
            fetchShippingOptions(newCart.id);
        } catch (err: any) {
            console.error('Cart initialization error:', err);
            setError(err.message || 'Failed to initialize cart');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchShippingOptions = async (cartId: string) => {
        try {
            // Medusa v2 uses different endpoint for shipping options
            const { shipping_options } = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
            setShippingOptions(shipping_options || []);
        } catch (err) {
            console.error('Failed to fetch shipping options', err);
            // Fallback: try to get shipping options without cart context
            try {
                const data = await fetchWithAuth('/store/shipping-options');
                setShippingOptions(data.shipping_options || []);
            } catch (fallbackErr) {
                console.error('Fallback shipping options fetch failed', fallbackErr);
            }
        }
    };

    useEffect(() => {
        initializeCart();
    }, [initializeCart]);

    // Map Medusa v2 cart to our simplified structure
    const mapCart = (medusaCart: any): Cart => ({
        id: medusaCart.id,
        items: (medusaCart.items || []).map((item: any) => ({
            id: item.id,
            title: item.title || item.product_title || '',
            description: item.description || item.product_description || '',
            thumbnail: item.thumbnail || item.product?.thumbnail || null,
            variant: {
                id: item.variant_id,
                title: item.variant?.title || item.variant_title || ''
            },
            quantity: item.quantity,
            unit_price: item.unit_price,
            total: item.total || item.subtotal || item.unit_price * item.quantity
        })),
        subtotal: medusaCart.subtotal || medusaCart.item_subtotal || 0,
        total: medusaCart.total || 0,
        region_id: medusaCart.region_id,
        currency_code: medusaCart.currency_code || medusaCart.region?.currency_code || 'usd',
        email: medusaCart.email
    });

    const refreshCart = useCallback(async () => {
        if (!cart?.id) return;

        try {
            const { cart: updatedCart } = await medusa.store.cart.retrieve(cart.id);
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to refresh cart:', err);
            setError(err.message);
        }
    }, [cart?.id]);

    const addItem = useCallback(async (variantId: string, quantity: number = 1) => {
        if (!cart?.id) {
            await initializeCart();
        }

        const cartId = cart?.id || localStorage.getItem(CART_ID_KEY);
        if (!cartId) {
            setError('No cart available');
            return;
        }

        setIsLoading(true);
        try {
            // Medusa v2 API for adding line items
            const { cart: updatedCart } = await medusa.store.cart.createLineItem(cartId, {
                variant_id: variantId,
                quantity
            });
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to add item:', err);
            setError(err.message || 'Failed to add item to cart');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id, initializeCart]);

    const updateItem = useCallback(async (lineItemId: string, quantity: number) => {
        if (!cart?.id) return;

        setIsLoading(true);
        try {
            if (quantity <= 0) {
                await removeItem(lineItemId);
                return;
            }

            // Medusa v2 API for updating line items
            const { cart: updatedCart } = await medusa.store.cart.updateLineItem(cart.id, lineItemId, {
                quantity
            });
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to update item:', err);
            setError(err.message || 'Failed to update item');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id]);

    const removeItem = useCallback(async (lineItemId: string) => {
        if (!cart?.id) return;

        setIsLoading(true);
        try {
            // Medusa v2 API for deleting line items
            const { cart: updatedCart } = await medusa.store.cart.deleteLineItem(cart.id, lineItemId);
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to remove item:', err);
            setError(err.message || 'Failed to remove item');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id]);

    const updateEmail = useCallback(async (email: string) => {
        if (!cart?.id) return;

        setIsLoading(true);
        try {
            // Medusa v2 API for updating cart
            const { cart: updatedCart } = await medusa.store.cart.update(cart.id, {
                email
            });
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to update email:', err);
            setError(err.message || 'Failed to update email');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id]);

    const updateAddress = useCallback(async (address: AddressPayload) => {
        if (!cart?.id) return;
        setIsLoading(true);
        try {
            // Medusa v2 API for updating cart with addresses
            const { cart: updatedCart } = await medusa.store.cart.update(cart.id, {
                shipping_address: address,
                billing_address: address,
            });
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to update address:', err);
            setError(err.message || 'Failed to update address');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id]);

    const addShippingMethod = useCallback(async (optionId: string) => {
        if (!cart?.id) return;
        setIsLoading(true);
        try {
            // Medusa v2 API for adding shipping method
            const { cart: updatedCart } = await medusa.store.cart.addShippingMethod(cart.id, {
                option_id: optionId
            });
            setCart(mapCart(updatedCart));
        } catch (err: any) {
            console.error('Failed to add shipping method:', err);
            setError(err.message || 'Failed to select shipping method');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id]);

    const initiatePaymentSession = useCallback(async (email: string) => {
        if (!cart?.id) throw new Error('No cart available');

        setIsLoading(true);
        try {
            // First update email if not already set
            if (cart.email !== email) {
                await updateEmail(email);
            }

            // Medusa v2: Initialize payment collection
            // First, get or create payment collection for the cart
            let paymentCollection;
            try {
                // Try to create payment collection
                const response = await fetchWithAuth(`/store/payment-collections`, {
                    method: 'POST',
                    body: JSON.stringify({ cart_id: cart.id })
                });
                paymentCollection = response.payment_collection;
            } catch (e) {
                // Payment collection might already exist, retrieve cart to get it
                const { cart: refreshedCart } = await medusa.store.cart.retrieve(cart.id);
                paymentCollection = refreshedCart.payment_collection;
            }

            if (!paymentCollection) {
                throw new Error('Failed to create payment collection');
            }

            // Initialize payment session with provider
            const sessionResponse = await fetchWithAuth(`/store/payment-collections/${paymentCollection.id}/payment-sessions`, {
                method: 'POST',
                body: JSON.stringify({ provider_id: 'pp_system_default' }) // or 'paystack' if configured
            });

            // Refresh cart to get updated state
            const { cart: updatedCart } = await medusa.store.cart.retrieve(cart.id);
            setCart(mapCart(updatedCart));

            return sessionResponse.payment_session || sessionResponse;
        } catch (err: any) {
            console.error('Failed to initiate payment session:', err);
            setError(err.message || 'Failed to initiate payment');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id, cart?.email, updateEmail]);

    const completeCart = useCallback(async () => {
        if (!cart?.id) throw new Error('No cart available');

        setIsLoading(true);
        try {
            // Medusa v2 API for completing cart/checkout
            const { order } = await medusa.store.cart.complete(cart.id);

            // Clear cart from local storage after successful order
            localStorage.removeItem(CART_ID_KEY);
            setCart(null);

            // Initialize a new cart
            await initializeCart();

            return order;
        } catch (err: any) {
            console.error('Failed to complete cart:', err);
            setError(err.message || 'Failed to complete order');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [cart?.id, initializeCart]);

    const itemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <CartContext.Provider value={{
            cart,
            isLoading,
            error,
            addItem,
            updateItem,
            removeItem,
            refreshCart,
            updateEmail,
            updateAddress,
            addShippingMethod,
            initiatePaymentSession,
            completeCart,
            itemCount,
            shippingOptions
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
