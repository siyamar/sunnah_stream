import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import AdminLayout from './components/layout/AdminLayout';
import { CartProvider } from './context/CartContext';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminOrders = lazy(() => import('./pages/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/AdminProducts'));
const AdminProductForm = lazy(() => import('./components/admin/AdminProductForm'));
const AdminPlaceholder = lazy(() => import('./pages/AdminPlaceholder'));
const Checkout = lazy(() => import('./pages/Checkout'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const AdminInventory = lazy(() => import('./pages/AdminInventory'));
const AdminReports = lazy(() => import('./pages/AdminReports'));
const AdminReportDetail = lazy(() => import('./pages/AdminReportDetail'));
const AdminInvoices = lazy(() => import('./pages/AdminInvoices'));
const AdminInvoiceDetail = lazy(() => import('./pages/AdminInvoiceDetail'));
const SoftwareShowcase = lazy(() => import('./pages/SoftwareShowcase'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <CartProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
        {!isAdminPath && <Navbar />}
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/showcase" element={<SoftwareShowcase />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="inventory" element={<AdminInventory />} />
                  <Route path="add-product" element={<AdminProductForm mode="add" />} />
                  <Route path="edit-products" element={<AdminProducts />} /> {/* Point to list for selection */}
                  <Route path="edit-product/:id" element={<AdminProductForm mode="edit" />} />
                  <Route path="promotions" element={<AdminPlaceholder title="Promotional Products" />} />
                  <Route path="banners" element={<AdminPlaceholder title="Banner Management" />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="reports/:category" element={<AdminReportDetail />} />
                  <Route path="invoices" element={<AdminInvoices />} />
                  <Route path="invoices/:id" element={<AdminInvoiceDetail />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>
        {!isAdminPath && <Footer />}
        {!isAdminPath && <WhatsAppButton />}
      </div>
    </CartProvider>
  );
}



export default App;

