import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Users, Settings, Plus } from 'lucide-react';
import Button from '../components/ui/Button';

const AdminDashboard = () => {
  const orders = [
    { id: '#ORD-7721', user: 'John Doe', status: 'Shipped', total: 450 },
    { id: '#ORD-7720', user: 'Jane Smith', status: 'Pending', total: 120 },
    { id: '#ORD-7719', user: 'Mike Ross', status: 'Processing', total: 890 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24"
    >
      <div className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Management Console</h1>
          <p className="text-neutral-500">Overview of your business performance.</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus size={18} />
          <span>Add Product</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { label: 'Total Revenue', value: '$42,390', icon: <ShoppingCart className="text-blue-500" /> },
          { label: 'Total Orders', value: '1,240', icon: <LayoutDashboard className="text-purple-500" /> },
          { label: 'Active Users', value: '320', icon: <Users className="text-green-500" /> },
        ].map((stat) => (
          <div key={stat.label} className="card-premium flex items-center justify-between p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className="p-4 bg-neutral-50 rounded-2xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="card-premium overflow-hidden">
        <div className="p-8 border-b border-neutral-50 flex justify-between items-center">
          <h2 className="font-bold">Recent Orders</h2>
          <button className="text-sm font-bold text-neutral-400 hover:text-black">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-widest text-neutral-400 border-b border-neutral-50">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Total</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-neutral-50 last:border-none hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6 font-bold">{order.id}</td>
                  <td className="px-8 py-6 text-neutral-600">{order.user}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-orange-100 text-orange-700' :
                      'bg-neutral-100 text-neutral-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right font-bold">${order.total}</td>
                  <td className="px-8 py-6 text-right">
                    <select className="bg-transparent text-xs font-bold outline-none cursor-pointer">
                      <option>Update Status</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
