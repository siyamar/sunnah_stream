import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { API_BASE_URL } from '../config';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    
    // Clean order number: remove any '#' symbols, spaces, and make uppercase
    let cleanedNum = orderNumber.replace(/#/g, '').replace(/\s+/g, '').trim().toUpperCase();

    if (!cleanedNum) {
      setError('Please enter a valid order number.');
      return;
    }

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/track/${cleanedNum}`);
      
      let data = null;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (response.ok && data) {
        setOrder(data);
      } else {
        setError(data?.message || 'Order not found. Please double check the order number (e.g. SS-XXXXX). Do not include any "#" prefix.');
      }
    } catch (err) {
      console.error(err);
      setError('Order not found or invalid format. Please make sure the order number is correct (e.g., SS-XXXXX) and does not contain "#" or spaces.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      case 'Shipped': return 'bg-purple-100 text-purple-700';
      case 'Delivered': return 'bg-green-100 text-green-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto px-6 py-24"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Track Your Order</h1>
        <p className="text-neutral-500">Enter your order number to see current status and details.</p>
      </div>

      <div className="card-premium p-8 md:p-12 mb-12">
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              required
              placeholder="Enter Order Number (e.g. SS-XXXXX)"
              className="input-premium w-full !bg-neutral-50 !rounded-2xl"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.replace(/#/g, '').toUpperCase())}
            />
            <p className="text-[11px] text-neutral-400 mt-2 ml-1">
              * Note: Please enter the order number directly (e.g., <strong>SS-XXXXX</strong>). Do not include a hash symbol (#).
            </p>
          </div>
          <Button type="submit" disabled={loading} className="px-10 rounded-2xl h-[50px] md:h-auto">
            {loading ? 'Searching...' : 'Track Now'}
          </Button>
        </form>
        {error && <p className="mt-4 text-red-500 text-sm font-medium">⚠️ {error}</p>}
      </div>

      <AnimatePresence>
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="card-premium p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">Status</span>
                  <span className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-1">Order Date</span>
                  <span className="font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-neutral-100">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Customer Details</h3>
                  <p className="font-bold text-lg mb-1">{order.customerName}</p>
                  <p className="text-neutral-500 mb-2">{order.phoneNumber}</p>
                  <p className="text-neutral-500 leading-relaxed">{order.address}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Items:</span>
                      <span className="font-bold">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-neutral-500">Total:</span>
                      <span className="font-bold text-brand-teal">${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-neutral-50 rounded-lg overflow-hidden">
                          {item.product?.image ? (
                             <img src={item.product.image} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs">📦</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{item.product?.name || 'Product Removed'}</p>
                          <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackOrder;
