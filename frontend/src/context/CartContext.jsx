import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [toast, setToast] = useState({ show: false, productName: '' });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item => 
          item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToast({ show: true, productName: product.name });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product._id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-white/95 backdrop-blur-md border border-neutral-100 rounded-2xl shadow-2xl p-4 flex items-center justify-between pointer-events-auto"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 text-lg font-bold">
                ✓
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Added to Bag</p>
                <p className="text-sm font-bold text-neutral-800 truncate pr-2">{toast.productName}</p>
              </div>
            </div>
            <button 
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="text-xs font-bold text-neutral-400 hover:text-black uppercase tracking-widest px-3 py-1.5 hover:bg-neutral-50 rounded-lg transition-colors ml-4 whitespace-nowrap"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};
