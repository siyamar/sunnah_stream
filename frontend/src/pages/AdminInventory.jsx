import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, TrendingUp, Search, Filter, ArrowUpDown } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Button from '../components/ui/Button';

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, low, out

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const stockStatus = product.stock <= 0 ? 'out' : product.stock <= 5 ? 'low' : 'ok';
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'low') return matchesSearch && stockStatus === 'low';
    if (filter === 'out') return matchesSearch && stockStatus === 'out';
    return matchesSearch;
  });

  const stats = {
    totalItems: products.length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter(p => p.stock <= 0).length,
    totalValue: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0)
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Inventory Management</h1>
          <p className="text-neutral-500">Monitor and maintain your product stock levels.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Products', value: stats.totalItems, icon: <Package className="text-blue-500" /> },
          { label: 'Low Stock Items', value: stats.lowStock, icon: <AlertTriangle className="text-amber-500" /> },
          { label: 'Out of Stock', value: stats.outOfStock, icon: <AlertTriangle className="text-red-500" /> },
          { label: 'Inventory Value', value: `$${stats.totalValue.toLocaleString()}`, icon: <TrendingUp className="text-green-500" /> },
        ].map((stat) => (
          <div key={stat.label} className="card-premium p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-neutral-50 rounded-xl">{stat.icon}</div>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card-premium">
        <div className="p-8 border-b border-neutral-50 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-neutral-400 mr-2" />
              {['all', 'low', 'out'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === f ? 'bg-black text-white' : 'bg-neutral-50 text-neutral-400 hover:text-black'
                  }`}
                >
                  {f === 'all' ? 'All Stock' : f === 'low' ? 'Low Stock' : 'Out of Stock'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-50">
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6 text-center">Current Stock</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Value</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const stockStatus = product.stock <= 0 ? 'out' : product.stock <= 5 ? 'low' : 'ok';
                return (
                  <tr key={product._id} className="border-b border-neutral-50 last:border-none hover:bg-neutral-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{product.name}</p>
                          <p className="text-xs text-neutral-400">SKU: {product._id.substring(0, 8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{product.category}</span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold">{product.stock}</td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          stockStatus === 'ok' ? 'bg-green-100 text-green-700' : 
                          stockStatus === 'low' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {stockStatus === 'ok' ? 'In Stock' : stockStatus === 'low' ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right font-bold">${(product.price * product.stock).toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                      <Button variant="secondary" size="sm" onClick={() => window.location.href=`/admin/edit-product/${product._id}`}>
                        Update Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminInventory;
