import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader, ShoppingBag, ChevronDown, ChevronUp, Clock, CheckCircle, Truck, Package } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Button from '../components/ui/Button';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const [ordersRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/products`)
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      
      // Create a map for quick lookup
      const productMap = {};
      productsData.forEach(p => { productMap[p._id] = p; });

      // Ensure items are populated even if backend didn't do it
      const populatedOrders = ordersData.map(order => ({
        ...order,
        items: order.items.map(item => ({
          ...item,
          product: typeof item.product === 'string' ? (productMap[item.product] || item.product) : item.product
        }))
      }));

      setOrders(populatedOrders);
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (err) {
      console.error('Error updating status', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-orange-100 text-orange-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Order Management</h1>
        <p className="text-neutral-500">Track and manage customer orders.</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="card-premium overflow-hidden transition-all duration-300">
            <div 
              className="p-8 cursor-pointer hover:bg-neutral-50/50 transition-colors flex flex-wrap items-center justify-between gap-6"
              onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
            >
              <div className="flex items-center space-x-6">
                <div className="p-4 bg-neutral-100 rounded-2xl">
                  <ShoppingBag size={24} className="text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase tracking-tight">#{order.orderNumber || order._id.substring(order._id.length - 8).toUpperCase()}</h3>
                  <p className="text-sm text-neutral-500">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-12">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Customer</p>
                  <p className="font-bold">{order.customerName || order.user?.name || 'Guest User'}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Total Amount</p>
                  <p className="font-bold text-lg">${order.totalAmount.toLocaleString()}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                  {order.status}
                </div>
                <div>
                  {expandedOrder === order._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="p-8 border-t border-neutral-50 bg-neutral-50/30 animate-in slide-in-from-top duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Order Items</h4>
                      <div className="space-y-4">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                                {item.product?.image ? (
                                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Package size={20} className="text-neutral-300" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="font-bold">
                                  {item.product?.name || 'Unknown Product'}
                                </p>
                                <p className="text-sm text-neutral-500">${item.price} x {item.quantity}</p>
                              </div>


                            </div>
                            <p className="font-bold">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Shipping Address</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {order.customerName}<br />
                          {order.address}<br />
                          {order.phoneNumber}
                        </p>
                      </div>
                      {order.details && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Order Details</h4>
                          <p className="text-sm text-neutral-600 leading-relaxed">{order.details}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Update Status</h4>
                      <div className="flex flex-col space-y-3">
                        {[
                          { label: 'Processing', icon: <Clock size={16} />, status: 'Processing' },
                          { label: 'Shipped', icon: <Truck size={16} />, status: 'Shipped' },
                          { label: 'Delivered', icon: <CheckCircle size={16} />, status: 'Delivered' }
                        ].map((btn) => (
                          <button
                            key={btn.status}
                            onClick={() => updateStatus(order._id, btn.status)}
                            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${
                              order.status === btn.status 
                                ? 'bg-black text-white shadow-lg' 
                                : 'bg-white text-neutral-600 border border-neutral-100 hover:border-black'
                            }`}
                          >
                            {btn.icon}
                            <span>{btn.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
