import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import Button from '../components/ui/Button';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Product Catalog</h1>
          <p className="text-neutral-500 text-sm md:text-base">Manage your inventory and product details.</p>
        </div>
        <Button onClick={() => navigate('/admin/add-product')} className="flex items-center space-x-2">
          <Plus size={18} />
          <span>Add New Product</span>
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
        <input 
          type="text" 
          placeholder="Search products or categories..." 
          className="input-premium pl-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-50">
                <th className="px-8 py-6">Product</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Price</th>
                <th className="px-8 py-6">Stock</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b border-neutral-50 last:border-none hover:bg-neutral-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-neutral-100 rounded-xl overflow-hidden flex-shrink-0">
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={20} className="text-neutral-300" />
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-bold text-black">${product.price.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-neutral-600'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                        className="p-2 hover:bg-black hover:text-white rounded-lg transition-all duration-300 text-neutral-400"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-300 text-neutral-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
