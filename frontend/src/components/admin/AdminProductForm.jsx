import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader, Save, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Button from '../ui/Button';

const AdminProductForm = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    isFeatured: false,
    sizes: [],
    colors: []
  });

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
          const data = await res.json();
          setFormData({
            name: data.name || '',
            description: data.description || '',
            price: data.price || '',
            image: data.image || '',
            category: data.category || '',
            stock: data.stock || '',
            isFeatured: data.isFeatured || false,
            sizes: data.sizes || [],
            colors: data.colors || []
          });
        } catch (err) {
          console.error('Error fetching product', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = mode === 'add' 
        ? `${API_BASE_URL}/api/products` 
        : `${API_BASE_URL}/api/products/${id}`;
      
      const method = mode === 'add' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate('/admin/products');
        }, 2000);
      }
    } catch (err) {
      console.error('Error saving product', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {mode === 'add' ? 'Add New Product' : 'Edit Product'}
          </h1>
          <p className="text-neutral-500">Fill in the details below to update your catalog.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/products')}
          className="p-3 hover:bg-neutral-100 rounded-2xl transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8 md:col-span-2">
          <div className="card-premium p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Product Name</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="e.g. Organic Black Seed Oil"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Description</label>
              <textarea 
                className="input-premium min-h-[150px] py-4" 
                placeholder="Describe the product features and benefits..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>
          </div>
        </div>

        <div className="card-premium p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Price ($)</label>
            <input 
              type="number" 
              step="0.01"
              className="input-premium" 
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Inventory Stock</label>
            <input 
              type="number" 
              className="input-premium" 
              placeholder="Quantity in stock"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category</label>
            <select 
              className="input-premium"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="Natural Oils">Natural Oils</option>
              <option value="Honey">Honey</option>
              <option value="Dates">Dates</option>
              <option value="Fragrances">Fragrances</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>

        <div className="card-premium p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Image URL</label>
            <div className="flex space-x-4">
              <input 
                type="text" 
                className="input-premium" 
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
            </div>
          </div>

          {formData.image && (
            <div className="w-full aspect-square bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 flex items-center justify-center">
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center space-x-3 p-4 bg-neutral-50 rounded-2xl">
            <input 
              type="checkbox" 
              id="isFeatured"
              className="w-5 h-5 rounded border-neutral-300 text-black focus:ring-black"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
            />
            <label htmlFor="isFeatured" className="text-sm font-bold text-neutral-600 cursor-pointer">Featured Product</label>
          </div>
        </div>

        {/* Sizes and Colors */}
        <div className="card-premium p-8 space-y-6 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Available Sizes (Comma separated)</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="e.g. S, M, L, XL"
                value={formData.sizes?.join(', ') || ''}
                onChange={(e) => setFormData({...formData, sizes: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})}
              />
              <p className="text-[10px] text-neutral-400">Example: S, M, L or 40, 41, 42</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Available Colors (Comma separated)</label>
              <input 
                type="text" 
                className="input-premium" 
                placeholder="e.g. Black, White, Red"
                value={formData.colors?.join(', ') || ''}
                onChange={(e) => setFormData({...formData, colors: e.target.value.split(',').map(c => c.trim()).filter(c => c !== '')})}
              />
              <p className="text-[10px] text-neutral-400">Example: Black, White, Navy</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/products')}
            className="px-8"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="px-12 relative overflow-hidden min-w-[160px]"
            disabled={saving || success}
          >
            {saving ? <Loader className="animate-spin mx-auto" size={20} /> : 
             success ? <CheckCircle className="mx-auto" size={20} /> : 
             <div className="flex items-center space-x-2">
               <Save size={18} />
               <span>{mode === 'add' ? 'Create Product' : 'Save Changes'}</span>
             </div>
            }
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
