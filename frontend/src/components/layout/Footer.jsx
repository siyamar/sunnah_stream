import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-neutral-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="mb-6 block">
              <Logo />
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Curating premium essentials for the mindful modern lifestyle. Rooted in tradition, designed for today.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/shop" className="hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=featured" className="hover:text-black transition-colors">Featured</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-neutral-500">
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-black transition-colors">Returns & Exchanges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-widest">Newsletter</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-neutral-50 border-none px-4 py-2 w-full text-sm focus:ring-1 focus:ring-black outline-none rounded-l-md"
              />
              <button className="bg-black text-white px-4 py-2 text-sm font-medium rounded-r-md">Join</button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-100 pt-12 flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-neutral-400">© 2026 EON LUXE. All rights reserved.</p>
          <div className="flex space-x-8 text-xs text-neutral-400">
            <Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
