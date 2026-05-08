import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-neutral-100 rounded-2xl relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white">
          <ShoppingCart size={20} />
        </button>
      </div>
      
      <div className="mt-6 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product._id}`} className="text-sm font-medium hover:underline decoration-1">
            {product.name}
          </Link>
          <p className="text-sm font-semibold">${product.price}</p>
        </div>
        <p className="text-xs text-neutral-400 uppercase tracking-widest">{product.category}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
