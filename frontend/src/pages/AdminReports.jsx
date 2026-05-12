import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Package, 
  Users, 
  Truck, 
  DollarSign, 
  ChevronRight,
  BarChart3,
  PieChart,
  Calendar,
  AlertCircle
} from 'lucide-react';

const reportCategories = [
  {
    id: 'sales',
    title: 'Sales Reports',
    description: 'Track revenue, product performance, and sales trends.',
    icon: <TrendingUp className="text-blue-500" />,
    color: 'bg-blue-50',
    reports: [
      'Daily/Weekly/Monthly Sales Summary',
      'Product-wise Sales Report',
      'Category-wise Sales',
      'Top Selling Products',
      'Slow Moving Products'
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory Reports',
    description: 'Monitor stock levels, movement, and stock alerts.',
    icon: <Package className="text-amber-500" />,
    color: 'bg-amber-50',
    reports: [
      'Current Stock Report',
      'Low Stock Alert Report',
      'Stock Movement Report',
      'Dead Stock Report'
    ]
  },
  {
    id: 'customer',
    title: 'Customer Reports',
    description: 'Analyze customer behavior, location, and retention.',
    icon: <Users className="text-purple-500" />,
    color: 'bg-purple-50',
    reports: [
      'New vs Returning Customers',
      'Top Customers',
      'Customer Location Report',
      'Inactive Customer Report'
    ]
  },
  {
    id: 'order',
    title: 'Order & Delivery Reports',
    description: 'Manage order status, shipping, and returns.',
    icon: <Truck className="text-emerald-500" />,
    color: 'bg-emerald-50',
    reports: [
      'Order Status Report',
      'COD Collection Report',
      'Return & Refund Report',
      'Courier-wise Delivery Report'
    ]
  },
  {
    id: 'financial',
    title: 'Financial Reports',
    description: 'Overview of profit/loss, taxes, and payment methods.',
    icon: <DollarSign className="text-rose-500" />,
    color: 'bg-rose-50',
    reports: [
      'Profit & Loss Summary',
      'Payment Method Report',
      'Tax Report',
      'Discount & Coupon Usage'
    ]
  }
];

const AdminReports = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Business Intelligence</h1>
        <p className="text-neutral-500">Comprehensive reports and data analysis for your business.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {reportCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => navigate(`/admin/reports/${category.id}`)}
            className="card-premium group cursor-pointer p-8 hover:shadow-2xl transition-all duration-500 border border-neutral-100 hover:border-black/5"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center space-x-6">
                <div className={`p-4 ${category.color} rounded-2xl group-hover:scale-110 transition-transform duration-500`}>
                  {React.cloneElement(category.icon, { size: 28 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{category.title}</h2>
                  <p className="text-neutral-500 text-sm max-w-xs">{category.description}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ChevronRight size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.reports.slice(0, 4).map((report, i) => (
                <div key={i} className="flex items-center space-x-3 text-xs font-bold text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-200 group-hover:bg-black transition-colors"></div>
                  <span>{report}</span>
                </div>
              ))}
              {category.reports.length > 4 && (
                <div className="text-xs font-bold text-neutral-400 italic">
                  + {category.reports.length - 4} more reports
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="card-premium p-12 bg-black text-white overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Custom Report Request</h2>
          <p className="text-neutral-400 mb-8">Need a specific data set that's not listed here? Our analytics team can help you generate custom reports tailored to your unique requirements.</p>
          <div className="flex space-x-4">
            <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-105 transition-transform">
              Contact Analytics
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-colors">
              Schedule Export
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
          <BarChart3 size={400} />
        </div>
      </div>
    </motion.div>
  );
};

export default AdminReports;
