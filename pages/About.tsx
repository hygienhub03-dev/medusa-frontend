import React from 'react';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-light-beige overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Journey</span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-8 leading-tight">
              Honoring Your Skin with <span className="italic text-primary">Nature's Best</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Founded in 2026, Hygiene Hub Skincare was born out of a simple philosophy: skincare should be an act of self-care, not a chore. We believe in the transformative power of nature, scientifically refined to deliver professional results in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
           <img src="/images/logo.png" alt="Watermark" className="w-full h-full object-contain" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="/images/bg 2.jpeg" 
                alt="Natural ingredients" 
                className="rounded-sm shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">Our Philosophy</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-primary">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Ethics First</h4>
                    <p className="text-gray-600 text-sm">We are 100% cruelty-free and prioritize ethically sourced ingredients from sustainable farms.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-secondary">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Purity Guaranteed</h4>
                    <p className="text-gray-600 text-sm">No parabens, sulfates, or artificial fragrances. Only clean, potent botanical extracts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Visible Results</h4>
                    <p className="text-gray-600 text-sm">Every formula is dermatologist-tested and proven to improve skin health and radiance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Transparency", desc: "We list every ingredient and its purpose. No secrets." },
              { title: "Sustainability", desc: "Recyclable packaging and carbon-neutral shipping." },
              { title: "Quality", desc: "Small-batch production to ensure ultimate freshness." },
              { title: "Community", desc: "A portion of every sale supports local water initiatives." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award size={20} />
                </div>
                <h4 className="font-bold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-serif font-bold mb-6 italic text-white/90 underline italic">Start Your Skin Transformation</h2>
          <p className="text-white/80 mb-10 leading-relaxed">
            Join thousands of others who have discovered the power of natural skincare. Experience the Hygiene Hub difference today.
          </p>
          <a href="/shop" className="px-10 py-4 bg-white text-primary font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all duration-300 inline-block shadow-lg">
            Explore the Collection
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
