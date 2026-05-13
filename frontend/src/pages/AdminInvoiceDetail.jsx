import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader, Printer, Download, ArrowLeft, Mail, Phone, MapPin, Package } from 'lucide-react';
import { API_BASE_URL } from '../config';
import Button from '../components/ui/Button';
import Logo from '../components/ui/Logo';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const AdminInvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const [orderRes, productsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE_URL}/api/products`)
        ]);

        const ordersData = await orderRes.json();
        const productsData = await productsRes.json();
        const productMap = {};
        productsData.forEach(p => { productMap[p._id] = p; });

        const foundOrder = ordersData.find(o => o._id === id);
        if (foundOrder) {
          // Populate items
          foundOrder.items = foundOrder.items.map(item => ({
            ...item,
            product: typeof item.product === 'string' ? (productMap[item.product] || { name: 'Product' }) : item.product
          }));
          setOrder(foundOrder);
        }
      } catch (err) {
        console.error('Error fetching order for invoice', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    console.log('PDF generation started...');
    const element = document.getElementById('printable-invoice');
    if (!element) {
      console.error('Invoice element not found');
      return;
    }

    try {
      // Use higher scale for better quality
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${order.orderNumber || 'detail'}.pdf`);
      console.log('PDF generation successful');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Could not generate PDF. Please try using the Print button and "Save as PDF" instead.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader className="animate-spin text-black" size={48} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-neutral-400">Invoice not found.</p>
        <Button onClick={() => navigate('/admin/invoices')} className="mt-4">Back to Invoices</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <style>{`
        @media print {
          /* Hide everything except the invoiceRef element */
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: none;
            box-shadow: none;
          }
          /* Hide elements explicitly with print:hidden */
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* Actions Header - Hidden during print */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <button 
          onClick={() => navigate('/admin/invoices')}
          className="flex items-center space-x-2 text-neutral-500 hover:text-black transition-colors font-bold"
        >
          <ArrowLeft size={18} />
          <span>Back to Invoices</span>
        </button>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={handlePrint} className="flex items-center space-x-2 bg-white border border-neutral-200">
            <Printer size={18} />
            <span>Print Invoice</span>
          </Button>
          <Button onClick={handleDownloadPDF} className="flex items-center space-x-2">
            <Download size={18} />
            <span>Download PDF</span>
          </Button>
        </div>
      </div>

      {/* Invoice Document */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        ref={invoiceRef}
        id="printable-invoice"
        className="bg-white border border-neutral-100 shadow-2xl rounded-3xl p-12 md:p-16 print:shadow-none print:border-none print:p-0"
      >
        {/* Invoice Header */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-neutral-100 pb-12 mb-12 gap-8">
          <div className="space-y-6">
            <Logo />
            <div className="space-y-1 text-sm text-neutral-500 font-medium">
              <p className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>123 Sunnah Street, Dhaka, Bangladesh</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+880 1882 799 557</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail size={14} />
                <span>sunnahstreamst@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Invoice</h1>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Invoice Number</p>
              <p className="font-bold text-xl">INV-{order.orderNumber || order._id.substring(order._id.length - 6).toUpperCase()}</p>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Date Issued</p>
              <p className="font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Billing Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Bill To</p>
            <div className="space-y-1">
              <p className="font-bold text-lg">{order.customerName || order.user?.name || 'Guest'}</p>
              <p className="text-neutral-500 whitespace-pre-line leading-relaxed">{order.address}</p>
              <p className="text-neutral-500">{order.phoneNumber}</p>
              {order.user?.email && <p className="text-neutral-500">{order.user.email}</p>}
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Payment Status</p>
            <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}>
              {order.status === 'Delivered' ? 'Paid' : 'Pending'}
            </span>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-1">Order Ref</p>
              <p className="font-bold">#{order.orderNumber}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-16">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Description</th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Qty</th>
                <th className="py-4 px-4 text-xs font-bold uppercase tracking-widest text-neutral-400 text-right">Price</th>
                <th className="py-4 text-xs font-bold uppercase tracking-widest text-neutral-400 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {order.items?.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-400 print:hidden">
                        <Package size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-black">{item.product?.name || 'Product'}</p>
                        <p className="text-xs text-neutral-400 italic">SKU: SS-{idx + 100}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center font-bold">{item.quantity}</td>
                  <td className="py-6 px-4 text-right font-medium text-neutral-600">${item.price.toLocaleString()}</td>
                  <td className="py-6 text-right font-bold">${(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end">
          <div className="w-full md:w-64 space-y-4">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="font-bold">${order.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Shipping</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Tax (0%)</span>
              <span className="font-bold">$0.00</span>
            </div>
            <div className="pt-4 border-t-2 border-black flex justify-between items-center">
              <span className="font-black uppercase tracking-tighter">Total Due</span>
              <span className="text-3xl font-black">${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-12 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-400 font-medium">Thank you for your purchase from Sunnah Stream!</p>
          <p className="text-xs text-neutral-300 mt-2 italic">This is a computer-generated invoice and does not require a physical signature.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminInvoiceDetail;
