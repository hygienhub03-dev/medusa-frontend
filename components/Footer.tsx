import React from 'react';
import { Facebook, Instagram, Send, X, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-beige pt-20 pb-10 border-t border-green-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Contact */}
          <div className="space-y-6">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/logo.png"
                alt="Hygiene Hub Skincare"
                className="h-16 w-auto"
              />
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed">
              Elevate your daily routine with our premium skincare collection.
              Designed for confidence and glow, backed by science and nature.
            </p>

            <ul className="space-y-4 text-gray-600 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary mt-0.5 group-hover:text-secondary transition-colors" />
                <span>Ethiopia Cres,Cosmo City,Roodepoort,2188,South Africa</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Phone className="w-5 h-5 text-primary mt-0.5 group-hover:text-secondary transition-colors" />
                <span>+(27) - 479 - 7830</span>
              </li>
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-primary mt-0.5 group-hover:text-secondary transition-colors" />
                <span>hygienhub@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 inline-block">Execute Glow</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/shop?category=skincare" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Skincare Solutions</Link></li>
              <li><Link to="/shop?category=complexion" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Complexion Perfection</Link></li>
              <li><Link to="/shop?category=eyes" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Eye Enhancements</Link></li>
              <li><Link to="/shop?category=lips" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Radiant Lips</Link></li>
              <li><Link to="/shop?category=sets" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Gift Sets</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 inline-block">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/faq" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Help & FAQs</Link></li>
              <li><Link to="/track-order" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Track Order</Link></li>
              <li><Link to="/shipping" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Returns & Exchanges</Link></li>
              <li><Link to="/contact" className="hover:text-primary hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-gray-900 border-b border-gray-200 pb-2 inline-block">Stay in the Loop</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="newsletter-email"
                  placeholder="Your email address"
                  className="w-full pl-4 pr-12 py-3 bg-white border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400 text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-secondary p-1">
                  <ArrowRight size={20} />
                </button>
              </div>
              <div className="flex gap-3 mt-4">
                {[
                  { Icon: Facebook, href: "https://facebook.com/hygienhub" },
                  { Icon: Instagram, href: "https://instagram.com/hygienhub" },
                  { Icon: Send, href: "https://t.me/hygienhub" },
                  { Icon: X, href: "https://x.com/hygienhub" }
                ].map(({ Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary text-gray-600 transition-all duration-300 shadow-sm">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Hygiene Hub Skincare. All Rights Reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;