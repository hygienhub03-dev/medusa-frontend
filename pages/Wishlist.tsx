import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-light-beige py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Your Favorites</span>
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">Wishlist</h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Save the products you love and find them easily whenever you're ready to treat your skin.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-32">
        <div className="max-w-md mx-auto text-center space-y-8">
          <div className="w-24 h-24 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100 animate-pulse-slow">
            <Heart size={40} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-400">Your wishlist is empty</h2>
          <p className="text-gray-500 leading-relaxed">
            Explore our collection and click the heart icon to save items you admire. Your radiance journey starts here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-white font-bold uppercase tracking-widest hover:bg-secondary transition-all shadow-lg"
          >
            Start Exploring <ArrowRight size={18} />
          </Link>
        </div>

        {/* Suggested Section */}
        <div className="mt-32 border-t border-gray-100 pt-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Curation</span>
              <h3 className="text-3xl font-serif font-bold text-gray-900">Recommended For You</h3>
            </div>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-gray-50 aspect-[4/5] mb-4 overflow-hidden relative">
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={48} />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all"></div>
                </div>
                <div className="h-4 w-2/3 bg-gray-100 mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
