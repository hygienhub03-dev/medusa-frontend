import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-md w-full mb-8 relative">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-applying-cosmetic-cream-on-face-2974917-2477348.png" alt="Illustration" className="w-full h-auto opacity-80" />
      </div>
      
      <h1 className="text-[120px] font-serif font-bold text-[#344054] leading-none mb-4">404</h1>
      <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-lg">
        We're sorry — something has gone wrong on our end.
      </p>

      <div className="flex gap-4">
        <Link to="/" className="bg-[#f2f4f7] text-gray-700 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Back To Homepage
        </Link>
        <Link to="/shop" className="bg-[#f2f4f7] text-gray-700 px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
