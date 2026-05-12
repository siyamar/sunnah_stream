import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');

  if (!token || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFDFD]">
      <AdminSidebar />
      <main className="flex-grow p-8 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
