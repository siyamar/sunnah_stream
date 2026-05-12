import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import bannerImg from '../assets/banner.png';
import logoImg from '../assets/logo.png';
import { API_BASE_URL } from '../config';

const Typewriter = ({ text, delay }) => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      // Loop the animation
      const timeout = setTimeout(() => {
        setDisplayText('');
        setCurrentIndex(0);
      }, 3000); // Wait 3 seconds before restarting
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-12 md:h-16 bg-white ml-1 align-middle"
      />
    </span>
  );
};

const LoadingDots = () => {
  return (
    <span className="inline-flex tracking-widest ml-1">
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>.</motion.span>
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>.</motion.span>
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-[#072a35]">
      {/* Professional Parallax Background */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bannerImg} 
          className="w-full h-full object-cover opacity-30"
          alt="Sunnah Stream"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#072a35] via-[#072a35]/40 to-[#072a35]" />
      </motion.div>

      {/* Subtle Professional Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%', 
              opacity: 0
            }}
            animate={{ 
              y: [null, '-30px', '30px'],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left Side: Main Brand & Action (SWAPPED TO LEFT) */}
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              SUNNAH <br />
              <span className="text-brand-teal">
                STREAM<LoadingDots />
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-lg leading-relaxed font-light italic">
              "Sustainable Solutions for Modern Tradition."
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button 
                onClick={() => {
                  const el = document.getElementById('collections');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white px-12 py-5 text-lg rounded-full w-full">
                  Discover Quality
                </Button>
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('support');
                  if(el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button variant="ghost" className="text-white hover:bg-white/10 px-12 py-5 text-lg rounded-full border border-white/20 backdrop-blur-sm w-full">
                  Contact Us
                </Button>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Quality Promise (SWAPPED TO RIGHT) */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8 glass p-8 md:p-12 rounded-3xl border-white/5"
          >
            <div className="inline-flex items-center space-x-2 text-brand-teal mb-4">
              <span className="h-[1px] w-8 bg-brand-teal" />
              <span className="text-xs font-bold uppercase tracking-[0.4em]">Our Quality Promise</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
              <Typewriter text="Crafting Excellence" delay={80} /> <br />
              <span className="font-bold text-brand-teal">In Every Detail.</span>
            </h2>
            <p className="text-base text-white/50 leading-relaxed">
              We provide premium quality products rooted in centuries of tradition, redefined for the modern seeker. Every piece is a testament to mindful craftsmanship.
            </p>
            <div className="flex space-x-12 pt-4">
              <div>
                <h4 className="text-white font-bold text-xl">100%</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Ethical Sourcing</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-xl">Premium</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Master Craftsmanship</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const categories = ['All', 'Apparel', 'Accessories', 'Bags', 'Footwear'];

  useEffect(() => {
    // Handle scroll to section from other pages
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        const data = await response.json();
        setAllProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase()));
    }
  }, [activeCategory, allProducts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="framer-page-transition"
    >
      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* Collections Section */}
      <section id="collections" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Shop All</h2>
              <p className="text-neutral-500">Discover our complete collection of essentials.</p>
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat 
                    ? 'bg-black text-white border-black' 
                    : 'border-neutral-100 text-neutral-500 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-neutral-100 rounded-2xl mb-4" />
                  <div className="h-4 bg-neutral-100 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-neutral-100 rounded w-1/4" />
                </div>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-neutral-400">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#072a35] text-white overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-teal font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Authenticity in Every <span className="text-brand-teal">Thread & Thought.</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Sunnah Stream was born from a desire to provide modern solutions that honor timeless traditions. We believe that what we consume and how we live should be in harmony with our values.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                Each product is carefully vetted for quality, sustainability, and ethical production. We're not just a store; we're a community dedicated to mindful living.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-bold text-brand-teal mb-2">5k+</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Global Seekers</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-brand-teal mb-2">100%</h4>
                  <p className="text-white/40 text-xs uppercase tracking-widest">Ethical Sourcing</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-brand-teal/20 to-transparent rounded-3xl p-1">
                <div className="w-full h-full rounded-[calc(1.5rem-1px)] bg-[#072a35] flex items-center justify-center p-12">
                   <img src={logoImg} alt="Sunnah Stream" className="w-full opacity-50 grayscale contrast-125" />
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-brand-teal text-[#072a35] p-8 rounded-2xl shadow-2xl rotate-3">
                <p className="font-bold text-xl leading-tight">Established<br />2024</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <span className="text-neutral-400 font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How Can We Help?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Customer Support', 
                desc: 'Call: 01882799557, 01862192937. Reach out via phone or email.', 
                icon: '✉️',
                action: 'Email Us',
                link: 'mailto:sunnahstreamst@gmail.com'
              },
              { 
                title: 'Shipping & Returns', 
                desc: 'Track your order or learn about our easy 30-day return policy.', 
                icon: '📦',
                action: 'Learn More',
                link: '#'
              },
              { 
                title: 'Our Community', 
                desc: 'Join our newsletter for exclusive updates and mindful living tips.', 
                icon: '🤝',
                action: 'Join Now',
                link: '#'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-10 rounded-3xl border border-neutral-100 hover:border-black transition-colors duration-500 group"
              >
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-neutral-500 leading-relaxed mb-8">{item.desc}</p>
                <a href={item.link} className="inline-flex items-center font-bold text-sm uppercase tracking-widest hover:text-brand-teal transition-colors">
                  {item.action} <span className="ml-2">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
