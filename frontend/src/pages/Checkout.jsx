import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { API_BASE_URL } from '../config';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    customerName: '',
    phoneNumber: '',
    address: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderData, setOrderData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      const itemsForBackend = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          items: itemsForBackend,
          totalAmount: cartTotal,
          ...shipping
        })
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        setOrderData(data);
      } else {
        setError(data.message || 'Checkout failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (orderData) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-teal text-4xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold mb-4 text-neutral-900">Order Successful!</h1>
          <p className="text-neutral-500 mb-8 leading-relaxed">
            Thank you for your purchase. Please save your order number for tracking:
          </p>
          <div className="bg-neutral-50 border-2 border-dashed border-neutral-200 rounded-2xl p-6 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">Order Number</span>
            <span className="text-2xl font-mono font-bold text-black">{orderData.orderNumber}</span>
          </div>
          <p className="text-sm text-neutral-400 mb-10 italic">
            "Please Remember this order number for order tracking."
          </p>
          <div className="space-y-4">
            <Button onClick={() => navigate('/shop')} className="w-full">Continue Shopping</Button>
            <button 
              onClick={() => navigate('/track-order')} 
              className="text-sm font-bold text-neutral-400 hover:text-black transition-colors"
            >
              Track Order Status
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24"
    >
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Checkout</h1>
        <button onClick={() => navigate('/')} className="text-neutral-400 hover:text-black transition-colors">← Back Home</button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200">
          <div className="text-6xl mb-6">🛒</div>
          <p className="text-neutral-500 mb-8 text-lg">Your cart is empty.</p>
          <Button onClick={() => navigate('/')} className="px-12 py-4">Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="card-premium p-10 h-fit">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-8 mb-10">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center group gap-4">
                  <div className="flex items-start md:items-center space-x-4 w-full sm:w-auto">
                    <div className="relative overflow-hidden rounded-2xl w-20 h-20 md:w-24 md:h-24 bg-neutral-50 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base mb-1 truncate pr-2">{item.product.name}</p>
                      <p className="text-neutral-400 text-sm font-medium mb-3">Unit: ${item.product.price}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center bg-neutral-100 rounded-full px-3 py-1 shrink-0">
                          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="text-lg font-medium hover:text-brand-teal transition-colors">-</button>
                          <span className="mx-2 md:mx-4 text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="text-lg font-medium hover:text-brand-teal transition-colors">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product._id)} className="text-neutral-300 hover:text-red-500 transition-colors text-[10px] md:text-xs font-bold uppercase tracking-widest shrink-0">Remove</button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex justify-between sm:block items-center border-t sm:border-none border-neutral-50 pt-3 sm:pt-0">
                    <span className="sm:hidden text-sm font-medium text-neutral-400">Total:</span>
                    <p className="font-bold text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-neutral-100 pt-8 space-y-4">
               <div className="flex justify-between text-neutral-400 text-sm">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
               <div className="flex justify-between text-neutral-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold pt-4">
                <span>Total Amount</span>
                <span className="text-brand-teal">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="card-premium p-10">
            <h2 className="text-2xl font-bold mb-8">Shipping Details</h2>
            {error && <p className="p-4 bg-red-50 text-red-500 rounded-2xl text-sm mb-8 font-medium">⚠️ {error}</p>}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 ml-1">Full Name</label>
                <input 
                  required
                  placeholder="Enter your name"
                  className="input-premium w-full !bg-neutral-50 !rounded-2xl" 
                  value={shipping.customerName}
                  onChange={e => setShipping({...shipping, customerName: e.target.value})}
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 ml-1">Mobile Number</label>
                <input 
                  required
                  type="tel"
                  placeholder="e.g. +880 1XXX-XXXXXX"
                  className="input-premium w-full !bg-neutral-50 !rounded-2xl" 
                  value={shipping.phoneNumber}
                  onChange={e => setShipping({...shipping, phoneNumber: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 ml-1">Full Address</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Street name, house number, area..."
                  className="input-premium w-full !bg-neutral-50 !rounded-2xl resize-none py-4" 
                  value={shipping.address}
                  onChange={e => setShipping({...shipping, address: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 ml-1">Additional Details (Optional)</label>
                <textarea 
                  rows="2"
                  placeholder="Notes for delivery person, building name, etc."
                  className="input-premium w-full !bg-neutral-50 !rounded-2xl resize-none py-4" 
                  value={shipping.details}
                  onChange={e => setShipping({...shipping, details: e.target.value})}
                />
              </div>

              <Button type="submit" className="w-full py-6 mt-10 rounded-[20px] text-lg font-bold shadow-xl shadow-brand-teal/20" disabled={loading}>
                {loading ? 'Processing Order...' : `Order Now • $${cartTotal.toFixed(2)}`}
              </Button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Checkout;
