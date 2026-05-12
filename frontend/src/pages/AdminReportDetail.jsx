import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Download, 
  Filter, 
  ChevronRight,
  TrendingUp,
  Package,
  Users,
  Truck,
  DollarSign
} from 'lucide-react';
import Button from '../components/ui/Button';

const reportData = {
  sales: {
    title: 'Sales Reports',
    icon: <TrendingUp />,
    color: 'text-blue-500',
    subReports: [
      { name: 'Daily Sales Summary', criteria: 'Date range, total revenue, orders count' },
      { name: 'Product-wise Sales Report', criteria: 'Per product কতটা বিক্রি, revenue' },
      { name: 'Category-wise Sales', criteria: 'কোন category সবচেয়ে বেশি চলে' },
      { name: 'Top Selling Products', criteria: 'Quantity বা revenue by period' },
      { name: 'Slow Moving Products', criteria: '৩০/৬০ দিনে বিক্রি হয়নি এমন' }
    ]
  },
  inventory: {
    title: 'Inventory Reports',
    icon: <Package />,
    color: 'text-amber-500',
    subReports: [
      { name: 'Current Stock Report', criteria: 'Product, variant, quantity' },
      { name: 'Low Stock Alert Report', criteria: 'Threshold এর নিচে যা আছে' },
      { name: 'Stock Movement Report', criteria: 'কোন date-এ কতটা in/out' },
      { name: 'Dead Stock Report', criteria: 'অনেকদিন বিক্রি হয়নি এমন stock' }
    ]
  },
  customer: {
    title: 'Customer Reports',
    icon: <Users />,
    color: 'text-purple-500',
    subReports: [
      { name: 'New vs Returning Customers', criteria: 'Date range' },
      { name: 'Top Customers', criteria: 'সবচেয়ে বেশি কেনা / বেশি spend' },
      { name: 'Customer Location Report', criteria: 'District/Division wise' },
      { name: 'Inactive Customer Report', criteria: 'X দিন কেনেনি এমন' }
    ]
  },
  order: {
    title: 'Order & Delivery Reports',
    icon: <Truck />,
    color: 'text-emerald-500',
    subReports: [
      { name: 'Order Status Report', criteria: 'Pending/Processing/Shipped/Delivered/Cancelled' },
      { name: 'COD Collection Report', criteria: 'কতটা cash collect হয়েছে' },
      { name: 'Return & Refund Report', criteria: 'Reason সহ' },
      { name: 'Courier-wise Delivery Report', criteria: 'কোন courier best perform করছে' }
    ]
  },
  financial: {
    title: 'Financial Reports',
    icon: <DollarSign />,
    color: 'text-rose-500',
    subReports: [
      { name: 'Profit & Loss Summary', criteria: 'Revenue - COGS - Expenses' },
      { name: 'Payment Method Report', criteria: 'bKash/Nagad/COD breakdown' },
      { name: 'Tax Report', criteria: 'VAT/Tax collected' },
      { name: 'Discount & Coupon Usage', criteria: 'কোন coupon কতবার use হয়েছে' }
    ]
  }
};

const AdminReportDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState(0);
  const data = reportData[category];

  if (!data) return <div>Category not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <button 
        onClick={() => navigate('/admin/reports')}
        className="flex items-center space-x-2 text-neutral-400 hover:text-black transition-colors group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold uppercase tracking-widest">Back to Reports</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80 flex-shrink-0 space-y-6">
          <div className="card-premium p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className={`p-3 bg-neutral-50 rounded-xl ${data.color}`}>
                {React.cloneElement(data.icon, { size: 24 })}
              </div>
              <h2 className="text-xl font-bold">{data.title}</h2>
            </div>
            
            <div className="space-y-2">
              {data.subReports.map((report, index) => (
                <button
                  key={index}
                  onClick={() => setActiveReport(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${
                    activeReport === index 
                      ? 'bg-black text-white shadow-lg' 
                      : 'hover:bg-neutral-50 text-neutral-500 hover:text-black'
                  }`}
                >
                  <span className="text-sm font-bold">{report.name}</span>
                  {activeReport === index && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
          </div>

          <div className="card-premium p-6 bg-neutral-900 text-white">
            <h3 className="font-bold mb-4 flex items-center space-x-2 text-sm">
              <Calendar size={16} />
              <span>Report Criteria</span>
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {data.subReports[activeReport].criteria}
            </p>
          </div>
        </div>

        {/* Report Content */}
        <div className="flex-grow space-y-6">
          <div className="card-premium p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl font-bold mb-1">{data.subReports[activeReport].name}</h1>
                <p className="text-sm text-neutral-500">Showing data for {new Date().toLocaleDateString('default', { month: 'long', year: 'numeric' })}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Filter size={16} />
                  <span>Filter</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Download size={16} />
                  <span>Export CSV</span>
                </Button>
              </div>
            </div>

            {/* Placeholder for actual data visualization */}
            <div className="aspect-video bg-neutral-50 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 relative overflow-hidden group">
              <div className="relative z-10 text-center px-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {React.cloneElement(data.icon, { size: 32, className: data.color })}
                </div>
                <h3 className="text-xl font-bold mb-2">Generating Detailed Analytics...</h3>
                <p className="text-neutral-500 text-sm max-w-sm mx-auto">
                  We are processing historical data for <span className="font-bold text-black">{data.subReports[activeReport].name}</span> based on {data.subReports[activeReport].criteria}.
                </p>
              </div>
              
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-neutral-100 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-neutral-100 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 bg-neutral-50 rounded-2xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">Metric 0{i}</p>
                  <h4 className="text-xl font-bold">---</h4>
                  <p className="text-xs text-neutral-400 mt-1">Calculated via {data.subReports[activeReport].criteria.split(',')[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminReportDetail;
