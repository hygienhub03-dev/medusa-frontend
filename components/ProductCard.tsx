import React, { useState } from 'react';
import { Eye, ShoppingCart, Heart, Loader2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: string | number;
  variantId?: string;
  title: string;
  handle: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  category?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  variantId,
  title,
  handle,
  thumbnail,
  price,
  originalPrice,
  category
}) => {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!variantId) {
      // If no variant ID, navigate to product page
      window.location.href = `/products/${handle}`;
      return;
    }

    setIsAdding(true);
    try {
      await addItem(variantId, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative bg-white">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer">
        <Link to={`/products/${handle}`}>
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        {originalPrice && originalPrice > price && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">
            Sale
          </span>
        )}

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white shadow-md transition-colors" title="Add to Wishlist">
            <Heart size={18} />
          </button>
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white shadow-md transition-colors delay-75" title="Quick View">
            <Eye size={18} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full backdrop-blur-sm font-medium py-3 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm uppercase tracking-wide ${added
              ? 'bg-green-600 text-white'
              : 'bg-white/90 text-gray-900 hover:bg-primary hover:text-white'
              } disabled:opacity-70`}
          >
            {isAdding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : added ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 text-center">
        {category && (
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{category}</div>
        )}
        <h3 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors mb-2">
          <Link to={`/products/${handle}`}>{title}</Link>
        </h3>
        <div className="flex items-center justify-center gap-2 text-sm">
          {originalPrice && (
            <span className="text-gray-400 line-through">R{originalPrice.toFixed(2)}</span>
          )}
          <span className="text-secondary font-semibold">R{price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;