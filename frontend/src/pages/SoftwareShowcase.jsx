import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Smartphone, 
  Zap, 
  ArrowRight,
  ShoppingBag,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const SoftwareShowcase = () => {
  const navigate = useNavigate();

  // Theme Colors from logo
  const primaryColor = "text-[#0a3d4d]";
  const brandTeal = "text-[#1a7a8c]";
  const bgAccent = "bg-[#f0f7f8]";

  const features = [
    {
      title: "Powerful Admin Dashboard",
      description: "Complete overview of your business metrics, revenue charts, and real-time order tracking.",
      icon: <LayoutDashboard className="text-[#1a7a8c]" size={32} />,
      color: "bg-[#f0f7f8]"
    },
    {
      title: "Professional Invoicing",
      description: "Automatically generate professional PDF-style invoices for every order. Print or download instantly.",
      icon: <FileText className="text-purple-500" size={32} />,
      color: "bg-purple-50"
    },
    {
      title: "Advanced Analytics",
      description: "Detailed reports for sales, inventory, and customer behavior to help you grow.",
      icon: <BarChart3 className="text-emerald-500" size={32} />,
      color: "bg-emerald-50"
    },
    {
      title: "Mobile Responsive",
      description: "A seamless shopping experience for your customers on phones, tablets, and desktops.",
      icon: <Smartphone className="text-orange-500" size={32} />,
      color: "bg-orange-50"
    },
    {
      title: "Secure & Fast",
      description: "Built with modern technology (MERN Stack) for maximum speed and data security.",
      icon: <Zap className="text-yellow-500" size={32} />,
      color: "bg-yellow-50"
    },
    {
      title: "Easy Management",
      description: "Manage products, stock levels, and banners with zero technical knowledge.",
      icon: <ShoppingBag className="text-pink-500" size={32} />,
      color: "bg-pink-50"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0a3d4d] selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-[#f0f7f8] to-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-2 rounded-full bg-white shadow-sm text-[#1a7a8c] text-xs font-bold uppercase tracking-widest mb-8 inline-block border border-[#f0f7f8]">
              Premium E-commerce Solution
            </span>
            <h1 className={`text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight ${primaryColor}`}>
              Grow Your Business with <br />
              <span className="text-[#1a7a8c]">Sunnah Stream</span>
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12 font-medium">
              A professional, all-in-one platform designed for modern retailers. Automate your orders, generate invoices, and track growth.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button
                onClick={() => navigate('/')}
                className="px-10 py-5 text-lg rounded-2xl flex items-center space-x-3 group bg-[#0a3d4d] hover:bg-[#072a35] text-white"
              >
                <span>Explore Store Demo</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/admin')}
                variant="secondary"
                className="px-10 py-5 text-lg rounded-2xl bg-white border-2 border-[#0a3d4d] text-[#0a3d4d] hover:bg-[#0a3d4d] hover:text-white transition-all duration-300 min-w-[240px] flex items-center justify-center"
              >
                View Admin Dashboard
              </Button>
            </div>

            {/* Banner Image Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-20 relative max-w-5xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-full w-full"></div>
              <img
                src="/images/showcase-banner.png"
                alt="Sunnah Stream Platform Mockup"
                className="w-full h-auto rounded-[40px] shadow-[0_32px_64px_-16px_rgba(10,61,77,0.15)] border border-[#f0f7f8]"
              />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#1a7a8c]/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#0a3d4d]/5 rounded-full blur-3xl"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-[#f0f7f8]/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className={`text-4xl font-bold tracking-tight mb-4 ${primaryColor}`}>Why Choose Sunnah Stream?</h2>
            <p className="text-neutral-500">Everything you need to run a successful online business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[32px] border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${primaryColor}`}>{feature.title}</h3>
                <p className="text-neutral-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className={`text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-tight ${primaryColor}`}>
                Manage Everything <br /> from One Place
              </h2>
              <div className="space-y-8">
                {[
                  "Real-time Inventory tracking with low stock alerts.",
                  "Automated Invoice generation for customer trust.",
                  "Comprehensive Sales and Revenue analytics.",
                  "Easy Product management with image uploads."
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 bg-[#1a7a8c] text-white rounded-full p-1">
                      <CheckCircle size={16} />
                    </div>
                    <p className="text-lg font-medium text-neutral-600">{item}</p>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => navigate('/admin/invoices')} 
                className="mt-12 px-8 py-4 rounded-xl bg-[#0a3d4d] text-white hover:bg-[#072a35]"
              >
                Try Invoice Generator
              </Button>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-[#0a3d4d] rounded-[40px] p-2 shadow-2xl overflow-hidden aspect-[4/3]">
                <img 
                  src="/images/features-mockup.png" 
                  alt="Sunnah Stream Features" 
                  className="w-full h-full object-cover rounded-[32px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-32 bg-[#0a3d4d] text-white rounded-[4rem] mx-4 mb-32 overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Experience the Workflow</h2>
            <p className="text-[#f0f7f8]/70">See how Sunnah Stream works from start to finish.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative p-10 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10">
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-white text-[#0a3d4d] rounded-full flex items-center justify-center font-black text-xl shadow-xl">1</span>
              <h3 className="text-2xl font-bold mb-4 mt-4">The Solution</h3>
              <p className="text-white/60 mb-8">Understand how this software solves your business problems and increases sales.</p>
              <div className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle size={16} className="text-emerald-400" />
                <span>Current View</span>
              </div>
            </div>

            <div 
              className="relative p-10 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10 group hover:bg-white hover:text-[#0a3d4d] transition-all cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center font-black text-xl group-hover:bg-[#0a3d4d]">2</span>
              <h3 className="text-2xl font-bold mb-4 mt-4">Customer Store</h3>
              <p className="text-white/60 group-hover:text-[#0a3d4d]/70 mb-8">Experience what your customers will see. Browse products and place orders.</p>
              <Button className="w-full bg-white text-[#0a3d4d] group-hover:bg-[#0a3d4d] group-hover:text-white">Visit Store</Button>
            </div>

            <div 
              className="relative p-10 bg-white/5 backdrop-blur-sm rounded-[32px] border border-white/10 group hover:bg-white hover:text-[#0a3d4d] transition-all cursor-pointer"
              onClick={() => navigate('/admin')}
            >
              <span className="absolute -top-4 -left-4 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center font-black text-xl group-hover:bg-[#0a3d4d]">3</span>
              <h3 className="text-2xl font-bold mb-4 mt-4">Admin Control</h3>
              <p className="text-white/60 group-hover:text-[#0a3d4d]/70 mb-8">Manage orders, view reports, and generate invoices in the dashboard.</p>
              <Button variant="secondary" className="w-full border-white/20 text-white group-hover:border-[#0a3d4d] group-hover:text-[#0a3d4d]">Go to Admin</Button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tighter mb-8 ${primaryColor}`}>Ready to Elevate Your Business?</h2>
          <p className="text-neutral-500 text-xl max-w-2xl mx-auto mb-12">
            Contact us today to get your own version of Sunnah Stream. Customized for your needs.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <a href="mailto:sunnahstreamst@gmail.com" className="bg-[#0a3d4d] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#072a35] transition-all shadow-lg shadow-[#0a3d4d]/20">
              Contact Sales
            </a>
            <Button 
                onClick={() => navigate('/')}
                variant="secondary" 
                className="px-12 py-5 rounded-2xl border-2 border-[#0a3d4d] text-[#0a3d4d] hover:bg-[#0a3d4d] hover:text-white"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-100 text-center text-neutral-400 text-sm">
        <p>&copy; 2026 Sunnah Stream Solution. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SoftwareShowcase;
