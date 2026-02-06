import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { medusa } from '../lib/medusa';

const Shop: React.FC = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Medusa v2 API: Use store.product.list() instead of products.list()
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'shop'],
    queryFn: async () => {
      const response = await medusa.store.product.list({ limit: 20 });
      return response;
    }
  });

  const products = data?.products || [];

  const categories = [
    'Skincare', 'Body', 'Hair', 'Suncare', 'Sets', 'New Arrivals'
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      {/* Page Header */}
      <div className="bg-light-beige py-12 mb-10 border-b border-green-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">Shop Collection</h1>
          <p className="text-gray-500">Curated essentials for your daily ritual.</p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={18} /> Filters
              </h3>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Categories</h4>
                {categories.map(cat => (
                  <div key={cat} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={cat}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                    />
                    <label htmlFor={cat} className="text-gray-600 hover:text-primary cursor-pointer">{cat}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="w-full px-2 py-1 border border-gray-200 rounded text-sm" />
                <span className="text-gray-400">-</span>
                <input type="number" placeholder="Max" className="w-full px-2 py-1 border border-gray-200 rounded text-sm" />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <button
                className="lg:hidden flex items-center gap-2 text-gray-800 font-medium"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              >
                <SlidersHorizontal size={18} /> Filters
              </button>

              <div className="text-sm text-gray-500">
                Showing {products.length} results
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                <div className="relative group">
                  <button className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-primary">
                    Best Selling <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-10 w-40">
                    <div className="bg-white shadow-lg border border-gray-100 rounded-md py-1">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Price: Low to High</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Price: High to Low</button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Newest</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-100 aspect-[3/4] mb-3"></div>
                    <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product: any) => {
                  // Medusa v2 has different price structure
                  const variant = product.variants?.[0];
                  const price = variant?.calculated_price?.calculated_amount
                    || variant?.prices?.[0]?.amount
                    || 0;
                  // v2 prices might already be in decimal format or need division
                  const displayPrice = price > 1000 ? price / 100 : price;

                  return (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      variantId={variant?.id}
                      title={product.title}
                      handle={product.handle}
                      thumbnail={product.thumbnail || '/images/logo.png'}
                      price={displayPrice}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 py-12 text-center rounded-lg">
                <p className="text-gray-600">No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
