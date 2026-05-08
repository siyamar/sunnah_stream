import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Format items for backend: { product: id, quantity, price }
      const itemsForBackend = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: itemsForBackend,
          totalAmount: cartTotal,
          shippingAddress: shipping
        })
      });

      const data = await response.json();

      if (response.ok) {
        clearCart();
        setSuccess(true);
      } else {
        setError(data.message || 'Checkout failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-6 text-center">
        <h1 className="text-4xl font-bold text-brand-teal mb-4">Order Confirmed!</h1>
        <p className="text-neutral-500 mb-8">Thank you for your purchase. Your order has been placed successfully.</p>
        <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
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
      <h1 className="text-4xl font-bold tracking-tight mb-12">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-2xl">
          <p className="text-neutral-500 mb-6">Your cart is empty.</p>
          <Button onClick={() => navigate('/shop')}>Browse Products</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="card-premium p-8 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.product._id} className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div>
                      <p className="font-bold text-sm">{item.product.name}</p>
                      <p className="text-neutral-500 text-xs">${item.product.price} x {item.quantity}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs hover:bg-neutral-200">-</button>
                        <span className="text-xs font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center text-xs hover:bg-neutral-200">+</button>
                        <button onClick={() => removeFromCart(item.product._id)} className="text-red-500 text-xs ml-4 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-lg font-bold pt-4">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Form */}
          <div className="card-premium p-8">
            <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Street Address</label>
                <input 
                  required
                  className="input-premium w-full" 
                  value={shipping.street}
                  onChange={e => setShipping({...shipping, street: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">City</label>
                  <input 
                    required
                    className="input-premium w-full" 
                    value={shipping.city}
                    onChange={e => setShipping({...shipping, city: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">State / Province</label>
                  <input 
                    required
                    className="input-premium w-full" 
                    value={shipping.state}
                    onChange={e => setShipping({...shipping, state: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">ZIP / Postal Code</label>
                  <input 
                    required
                    className="input-premium w-full" 
                    value={shipping.zip}
                    onChange={e => setShipping({...shipping, zip: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Country</label>
                  <input 
                    required
                    className="input-premium w-full" 
                    value={shipping.country}
                    onChange={e => setShipping({...shipping, country: e.target.value})}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full py-4 mt-8 rounded-2xl" disabled={loading}>
                {loading ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
              </Button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Checkout;
