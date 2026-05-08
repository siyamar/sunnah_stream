import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Users, Plus, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Button from '../components/ui/Button';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ revenue: 0, totalOrders: 0, uniqueUsers: 0 });
  const [chartData, setChartData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await fetch('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 401) {
          navigate('/login');
          return;
        }

        const data = await res.json();
        setOrders(data);

        // Calculate Metrics
        let revenue = 0;
        const usersSet = new Set();
        const statusCounts = {};
        const monthlyRevenue = {};

        data.forEach(order => {
          revenue += order.totalAmount;
          usersSet.add(order.user?._id || order.user);
          
          statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;

          const date = new Date(order.createdAt);
          const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
          monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.totalAmount;
        });

        setMetrics({
          revenue,
          totalOrders: data.length,
          uniqueUsers: usersSet.size
        });

        // Format Chart Data
        const formattedChartData = Object.keys(monthlyRevenue).map(month => ({
          name: month,
          Sales: monthlyRevenue[month]
        })).sort((a, b) => {
           // Simple sort for dates if needed, but the data is random anyway.
           return -1;
        }).reverse();

        setChartData(formattedChartData);

        // Format Pie Data
        const formattedPieData = Object.keys(statusCounts).map(status => ({
          name: status,
          value: statusCounts[status]
        }));
        setPieData(formattedPieData);

      } catch (err) {
        console.error('Error fetching admin data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

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
          { label: 'Total Revenue', value: `$${metrics.revenue.toLocaleString()}`, icon: <ShoppingCart className="text-blue-500" /> },
          { label: 'Total Orders', value: metrics.totalOrders, icon: <LayoutDashboard className="text-purple-500" /> },
          { label: 'Active Users', value: metrics.uniqueUsers, icon: <Users className="text-green-500" /> },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2 card-premium p-8">
          <h2 className="font-bold mb-6">Revenue Overview</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="Sales" stroke="#000" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-premium p-8">
          <h2 className="font-bold mb-6">Orders by Status</h2>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center text-xs font-bold text-neutral-500">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 10).map((order) => (
                <tr key={order._id} className="border-b border-neutral-50 last:border-none hover:bg-neutral-50 transition-colors">
                  <td className="px-8 py-6 font-bold">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                  <td className="px-8 py-6 text-neutral-600">{order.user?.name || 'Unknown User'}</td>
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
                  <td className="px-8 py-6 text-right font-bold">${order.totalAmount.toLocaleString()}</td>
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
