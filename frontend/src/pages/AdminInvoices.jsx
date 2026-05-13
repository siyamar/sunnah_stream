import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader, FileText, Search, Download, Printer, Eye } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Button from '../components/ui/Button';

const AdminInvoices = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders for invoices', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Invoices</h1>
          <p className="text-neutral-500 text-lg">Generate and manage billing documents for orders.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search by Order # or Customer..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50/50">
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400">Invoice ID</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400">Order Date</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400">Customer</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400">Status</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400 text-right">Amount</th>
                <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="px-8 py-6 font-bold">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-neutral-100 rounded-lg text-neutral-500 group-hover:text-black transition-colors">
                          <FileText size={16} />
                        </div>
                        <span>INV-{order.orderNumber || order._id.substring(order._id.length - 6).toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-neutral-600 font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold">{order.customerName || order.user?.name || 'Guest'}</div>
                      <div className="text-xs text-neutral-400">{order.phoneNumber || 'N/A'}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right font-bold text-lg">
                      ${order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => navigate(`/admin/invoices/${order._id}`)}
                          className="p-2 hover:bg-black hover:text-white rounded-xl transition-all duration-300"
                          title="View Invoice"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-2 hover:bg-black hover:text-white rounded-xl transition-all duration-300"
                          title="Print Invoice"
                          onClick={() => window.print()}
                        >
                          <Printer size={18} />
                        </button>
                        <button 
                          className="p-2 hover:bg-black hover:text-white rounded-xl transition-all duration-300"
                          title="Download PDF"
                        >
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-neutral-400 font-medium italic">
                    No matching invoices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminInvoices;
