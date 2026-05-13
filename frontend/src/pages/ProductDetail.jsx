import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star, Heart, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import { API_BASE_URL } from '../config';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-neutral-500">Product not found.</p>
        <Link to="/">
          <Button>Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-24"
    >
      <nav className="flex items-center space-x-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 md:mb-12 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} />
        <span className="hover:text-black cursor-pointer">{product.category}</span>
        <ChevronRight size={12} />
        <span className="text-black truncate max-w-[150px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="aspect-[4/5] overflow-hidden bg-neutral-100 rounded-3xl sticky top-24"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
          />
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col justify-start pt-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-yellow-400">
              {Array(5).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              <span className="text-xs font-bold text-neutral-400 ml-2">(48 Reviews)</span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{product.name}</h1>
          <p className="text-2xl md:text-3xl font-bold mb-10 text-brand-teal">${product.price}</p>
          
          <div className="space-y-8 mb-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Description</h3>
              <p className="text-neutral-500 leading-relaxed text-base md:text-lg">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Color: <span className="text-black">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color ? 'border-black scale-110' : 'border-transparent hover:border-neutral-200'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    >
                      {selectedColor === color && <Check size={16} className={['white', 'yellow', 'silver'].includes(color.toLowerCase()) ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes?.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Size: <span className="text-black">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-xl border text-sm font-bold transition-all ${
                        selectedSize === size 
                        ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                        : 'border-neutral-200 text-neutral-500 hover:border-black hover:text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Quantity</h3>
              <div className="flex items-center space-x-4 border border-neutral-200 w-fit rounded-xl px-2 py-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-neutral-50 rounded-lg text-xl"
                >-</button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-neutral-50 rounded-lg text-xl"
                >+</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              onClick={() => {
                for(let i=0; i<quantity; i++) addToCart(product);
              }}
              disabled={product.stock <= 0}
              className="flex-1 py-5 rounded-2xl flex items-center justify-center space-x-3 bg-black text-white hover:bg-neutral-900 shadow-xl shadow-black/5"
            >
              <ShoppingBag size={20} />
              <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
            </Button>
            <button className="p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors flex items-center justify-center">
              <Heart size={20} />
            </button>
          </div>

          <div className="mt-12 pt-12 border-t border-neutral-100 grid grid-cols-2 gap-8">
             <div>
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Shipping</h4>
               <p className="text-sm font-medium">Free worldwide shipping on orders over $200.</p>
             </div>
             <div>
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Returns</h4>
               <p className="text-sm font-medium">30-day easy returns policy for your peace of mind.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
