import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  if (!token || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-grow flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-6 bg-white border-b border-neutral-100 sticky top-0 z-50">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-neutral-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="text-sm font-black tracking-tighter uppercase">Admin Panel</span>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-xs font-bold">
            {user.name?.charAt(0) || 'A'}
          </div>
        </header>

        <main className="flex-grow p-6 md:p-8 lg:p-12 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
