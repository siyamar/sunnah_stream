import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  PlusCircle, 
  Edit, 
  Star, 
  Image as ImageIcon, 
  LogOut,
  ChevronRight,
  User as UserIcon,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '../ui/Logo';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const menuItems = [
    { name: 'Home', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Inventory', path: '/admin/inventory', icon: <PlusCircle size={20} /> },
    { name: 'Add Products', path: '/admin/add-product', icon: <PlusCircle size={20} /> },
    { name: 'Edit Products', path: '/admin/edit-products', icon: <Edit size={20} /> },
    { name: 'Promotional Product', path: '/admin/promotions', icon: <Star size={20} /> },
    { name: 'Add Banner', path: '/admin/banners', icon: <ImageIcon size={20} /> },
    { name: 'Reports', path: '/admin/reports', icon: <BarChart3 size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="h-screen w-72 bg-white border-r border-neutral-100 flex flex-col sticky top-0">
      <div className="p-8">
        <Link to="/admin">
          <Logo />
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2 py-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-black text-white shadow-lg shadow-black/10' 
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-black transition-colors'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{item.name}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active-pill">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-neutral-100 space-y-4">
        <div className="flex items-center space-x-4 px-2">
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
            <UserIcon size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-black truncate w-40">{user.name || 'Admin User'}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{user.role || 'Administrator'}</span>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-tight">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
