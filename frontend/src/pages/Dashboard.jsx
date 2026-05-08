import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const StatusStepper = ({ currentStatus }) => {
  const steps = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const statusIcons = {
    Pending: <Clock size={20} />,
    Processing: <Package size={20} />,
    Shipped: <Truck size={20} />,
    Delivered: <CheckCircle size={20} />,
  };

  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center w-full max-w-2xl mx-auto py-8">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center relative">
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                index <= currentIndex ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-400'
              }`}
            >
              {statusIcons[step]}
            </div>
            <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
              index <= currentIndex ? 'text-black' : 'text-neutral-400'
            }`}>
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-[2px] mx-4 bg-neutral-100 relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: index < currentIndex ? '100%' : '0%' }}
                className="absolute inset-0 bg-black transition-all duration-1000 ease-in-out"
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const orders = [
    { 
      id: '#ORD-7721', 
      date: 'May 12, 2026', 
      total: 450, 
      status: 'Shipped',
      items: ['Minimalist Watch', 'Leather Tote']
    },
    { 
      id: '#ORD-7720', 
      date: 'May 01, 2026', 
      total: 120, 
      status: 'Delivered',
      items: ['Canvas Sneakers']
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-24"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
        <aside className="lg:col-span-1 space-y-8">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-xl font-bold">
              JD
            </div>
            <div>
              <h2 className="font-bold">John Doe</h2>
              <p className="text-sm text-neutral-500">john@example.com</p>
            </div>
          </div>
          
          <nav className="space-y-4">
            {['Orders', 'Addresses', 'Settings', 'Logout'].map((item) => (
              <button key={item} className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${item === 'Orders' ? 'bg-black text-white' : 'hover:bg-neutral-50'}`}>
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-3 space-y-12">
          <div>
            <h1 className="text-3xl font-bold mb-8">Order History</h1>
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="card-premium">
                  <div className="flex justify-between items-center mb-12">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Order ID</p>
                      <h3 className="font-bold">{order.id}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Placed On</p>
                      <p className="font-medium">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Total</p>
                      <p className="font-bold text-lg">${order.total}</p>
                    </div>
                  </div>

                  <div className="mb-12">
                     <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">Live Tracking</p>
                     <StatusStepper currentStatus={order.status} />
                  </div>

                  <div className="flex justify-between items-center border-t border-neutral-50 pt-8 mt-12">
                    <div className="flex space-x-2">
                       {order.items.map(item => (
                         <span key={item} className="text-xs bg-neutral-50 px-3 py-1 rounded-full text-neutral-500">{item}</span>
                       ))}
                    </div>
                    <button className="text-sm font-bold underline">Order Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
};

export default Dashboard;
