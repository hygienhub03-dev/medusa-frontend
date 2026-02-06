import React, { useEffect, useState } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { medusa } from '../lib/medusa';
import { useQuery } from '@tanstack/react-query';

const Home: React.FC = () => {
  // Fetch products from Medusa
  const { data, isLoading } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: async () => {
      // Medusa v2: Use store.product.list()
      return await medusa.store.product.list({ limit: 4 });
    }
  });

  const products = data?.products || [];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/BG pic.png"
            alt="Natural Skincare Background"
            className="w-full h-full object-cover object-center animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <div className="animate-fade-in-up">
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm mb-6">
              New Collection 2026
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
              Unlock Your <br /> <span className="italic">Natural Radiance</span>
            </h1>
            <p className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 text-white/90">
              Discover the power of nature with our scientifically formulated skincare.
              Pure, potent, and proven to transform your skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="px-10 py-4 bg-primary text-white font-bold uppercase tracking-wider hover:bg-white hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="px-10 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-12 bg-light-beige border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between gap-8 md:gap-4">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Leaf size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-gray-900">100% Organic</h4>
                <p className="text-xs text-gray-500">Sourced from nature</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-gray-900">Dermatologist Tested</h4>
                <p className="text-xs text-gray-500">Safe for all skin types</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-gray-900">Cruelty Free</h4>
                <p className="text-xs text-gray-500">Never tested on animals</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-serif font-bold text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over R500</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Best Sellers</span>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mt-3 mb-6">Customer Favorites</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                  <div className="h-4 bg-gray-200 w-2/3 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 w-1/3 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => {
                // Medusa v2 price structure handling
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
                    originalPrice={null}
                  />
                )
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">
              <p>No products found. Start your Medusa backend to see products here.</p>
              <p className="text-xs mt-2">Make sure your backend is running at http://localhost:9000</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-secondary transition-colors group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-24 bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('/images/bg 2.jpeg')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-6 relative z-10 flex justify-end">
          <div className="bg-white/90 backdrop-blur md:max-w-xl p-10 md:p-16 rounded-sm">
            <h3 className="text-3xl font-serif font-bold mb-4 text-gray-900">Summer Glow Essentials</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Prepare your skin for the season with our curated collection of hydration boosters and sun protection.
              Limited time offer: Get a free travel kit with orders over R1000.
            </p>
            <Link to="/shop" className="px-8 py-3 bg-secondary text-white font-bold uppercase tracking-wider hover:bg-primary transition-colors inline-block">
              Shop the Edit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;