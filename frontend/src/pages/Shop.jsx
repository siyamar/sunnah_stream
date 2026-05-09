import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import Skeleton from '../components/ui/Skeleton';
import { API_BASE_URL } from '../config';

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
