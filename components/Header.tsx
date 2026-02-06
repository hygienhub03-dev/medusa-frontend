import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Heart, Menu, X, ChevronDown, MapPin, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { label: 'Home', href: '/', hasDropdown: false },
  { label: 'Shop', href: '/shop', hasDropdown: false },
  { label: 'Collections', href: '/collections', hasDropdown: false },
  {
    label: 'Pages',
    href: '#',
    hasDropdown: true,
    dropdownItems: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ]
  },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
          }`}
      >
        {/* Top Bar - Hidden on small screens, fades out on scroll */}
        <div className={`hidden md:block transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center text-sm text-gray-600 border-b border-gray-100/50 pb-2">
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> Ethiopia Cres, Cosmo City, Roodepoort</span>
              <span className="flex items-center gap-1"><Phone size={14} className="text-primary" /> +(27) 479-7830</span>
            </div>
            <div className="font-medium text-primary">FREE DELIVERY ON ALL ORDERS OVER R200</div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/images/logo.png"
                alt="Hygiene Hub Skincare"
                className="h-12 md:h-16 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.href}
                    className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-primary transition-colors py-4 uppercase tracking-wide"
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>

                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute top-full left-0 w-48 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2 border-t-2 border-primary translate-y-2 group-hover:translate-y-0">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 hover:bg-light-beige hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                  <span className="absolute bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </div>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-6 text-gray-800">
              <button className="hover:text-primary transition-transform hover:scale-110">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/account" className="hover:text-primary transition-transform hover:scale-110 hidden sm:block">
                <User className="w-5 h-5" />
              </Link>
              <Link to="/wishlist" className="relative hover:text-primary transition-transform hover:scale-110 hidden sm:block">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">0</span>
              </Link>
              <Link to="/cart" className="relative hover:text-primary transition-transform hover:scale-110">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">{itemCount > 9 ? '9+' : itemCount}</span>
                )}
              </Link>
              <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-4">
              <span className="font-serif text-xl text-secondary font-bold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6 text-gray-500 hover:text-red-500" /></button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.hasDropdown ? (
                    <div className="space-y-2">
                      <span className="text-lg font-bold text-gray-900 border-b border-gray-100 block pb-2 uppercase tracking-tighter">{item.label}</span>
                      <div className="grid grid-cols-2 gap-2 pl-4">
                        {item.dropdownItems?.map(subItem => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="text-sm text-gray-600 font-medium py-1 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-lg font-medium text-gray-800 hover:text-primary border-b border-gray-50 pb-2 flex justify-between items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className={isScrolled ? 'h-[80px]' : 'h-0'} />
    </>
  );
};

export default Header;