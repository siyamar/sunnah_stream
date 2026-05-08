import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import Skeleton from '../components/ui/Skeleton';

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Mock data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([
        { _id: '1', name: 'Minimalist Watch', price: 299, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800', category: 'Accessories' },
        { _id: '2', name: 'Leather Tote', price: 180, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800', category: 'Bags' },
        { _id: '3', name: 'Oversized Blazer', price: 240, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800', category: 'Apparel' },
        { _id: '4', name: 'Canvas Sneakers', price: 120, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800', category: 'Footwear' },
        { _id: '5', name: 'Ceramic Vase', price: 85, image: 'https://images.unsplash.com/photo-1578500484748-482c361e5741?auto=format&fit=crop&q=80&w=800', category: 'Decor' },
        { _id: '6', name: 'Wireless Headphones', price: 350, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Electronics' },
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Shop All</h1>
          <p className="text-neutral-500">Discover our complete collection of essentials.</p>
        </div>
        
        <div className="flex space-x-4 w-full md:w-auto overflow-x-auto pb-4 md:pb-0">
          {['All', 'Apparel', 'Accessories', 'Bags', 'Footwear'].map((cat) => (
            <button key={cat} className="px-6 py-2 rounded-full border border-neutral-100 text-sm font-medium hover:border-black transition-colors whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Shop;
