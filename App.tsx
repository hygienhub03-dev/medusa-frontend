import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import { AccountProvider } from './context/AccountContext';
import ErrorBoundary from './components/ErrorBoundary';
import { AnalyticsTracker } from './components/Analytics';
import Header from './components/Header';
import Footer from './components/Footer';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';

import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Faq from './pages/Faq';
import NotFound from './pages/NotFound';
import Shipping from './pages/Shipping';
import Returns from './pages/Returns';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TrackOrder from './pages/TrackOrder';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AccountProvider>
          <CartProvider>
            <BrowserRouter>
              <AnalyticsTracker />
              <div className="flex flex-col min-h-screen text-gray-800 font-sans">
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/collections/:id" element={<CollectionDetails />} />
                    <Route path="/products/:handle" element={<ProductDetails />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </CartProvider>
        </AccountProvider>
      </ErrorBoundary>
      <Analytics />
    </QueryClientProvider>
  );
};

export default App;