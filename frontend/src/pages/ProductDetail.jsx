import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import Button from '../components/ui/Button';

const ProductDetail = () => {
  const { id } = useParams();
  
  // Mock product data
  const product = {
    _id: id,
    name: 'Minimalist Watch',
    price: 299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
    category: 'Accessories',
    description: 'A masterpiece of minimalist design, this watch features a clean dial and a premium leather strap. Precision movement ensures reliability, while the sapphire glass provides scratch resistance. Perfect for both formal occasions and everyday elegance.',
    details: [
      'Genuine Italian Leather Strap',
      'Swiss Quartz Movement',
      'Sapphire Crystal Glass',
      'Water Resistant up to 50m'
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24"
    >
      <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-12">
        <span className="hover:text-black cursor-pointer">Shop</span>
        <ChevronRight size={12} />
        <span className="hover:text-black cursor-pointer">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="aspect-[4/5] overflow-hidden bg-neutral-100 rounded-3xl"
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center space-x-2 text-yellow-400 mb-6">
            {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            <span className="text-xs font-bold text-neutral-400 ml-2">(48 Reviews)</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tighter mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-8">${product.price}</p>
          
          <p className="text-neutral-500 leading-relaxed mb-12 text-lg">
            {product.description}
          </p>

          <div className="space-y-4 mb-12">
            {product.details.map((detail, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-black rounded-full" />
                <span className="text-sm font-medium text-neutral-600">{detail}</span>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1 py-5 rounded-2xl flex items-center justify-center space-x-3">
              <ShoppingBag size={20} />
              <span>Add to Bag</span>
            </Button>
            <button className="p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors">
              <Star size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
