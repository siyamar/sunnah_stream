import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-neutral-100 rounded-2xl relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
        
        {/* Cart Button: Always visible on mobile, hover on desktop */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }} 
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 bg-white p-2.5 md:p-3 rounded-full shadow-lg md:opacity-0 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white z-10"
        >
          <ShoppingCart size={18} className="md:w-5 md:h-5" />
        </button>
      </div>
      
      <div className="mt-4 md:mt-6 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product._id}`} className="text-sm font-bold hover:text-brand-teal transition-colors truncate pr-2">
            {product.name}
          </Link>
          <p className="text-sm font-black text-black">${product.price}</p>
        </div>
        <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">{product.category}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
