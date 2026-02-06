import React from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, isLoading, error, updateItem, removeItem } = useCart();

  const handleQuantityChange = async (lineItemId: string, newQuantity: number) => {
    try {
      await updateItem(lineItemId, newQuantity);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (lineItemId: string) => {
    try {
      await removeItem(lineItemId);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  // Format price from cents to currency
  const formatPrice = (amount: number) => {
    return (amount / 100).toFixed(2);
  };

  if (isLoading && !cart) {
    return (
      <div className="bg-white min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary mb-4" />
          <p className="text-gray-500">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <Link to="/shop" className="text-primary hover:underline">Return to Shop</Link>
        </div>
      </div>
    );
  }

  const cartItems = cart?.items || [];
  const subtotal = cart?.subtotal || 0;

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-10 text-center">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-sm hover:shadow-sm transition-shadow">
                  <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.thumbnail || '/images/logo.png'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.variant.title}</p>
                      </div>
                      <p className="font-semibold text-gray-900">R{formatPrice(item.unit_price)}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-200 rounded-sm">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <Link to="/shop" className="inline-block text-sm text-primary hover:underline mt-4">
                &larr; Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="lg:w-96 flex-shrink-0">
              <div className="bg-light-beige p-6 rounded-sm border border-green-50 sticky top-28">
                <h2 className="text-lg font-serif font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>R{formatPrice(cart?.total || subtotal)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full bg-primary text-white font-bold uppercase tracking-wider py-4 hover:bg-dark-green transition-colors shadow-md mb-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>Checkout <ArrowRight size={18} /></>
                  )}
                </button>
                <p className="text-xs text-center text-gray-500">
                  Secure checkout powered by Medusa
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-serif font-bold text-gray-400 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/shop" className="inline-block px-8 py-3 bg-primary text-white font-bold uppercase tracking-wider hover:bg-secondary transition-colors">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
