import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import bannerImg from '../assets/banner.png';
import logoImg from '../assets/logo.png';

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
              <Link to="/shop">
                <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white px-12 py-5 text-lg rounded-full w-full">
                  Discover Quality
                </Button>
              </Link>
              <a href="mailto:support@sunnahstream.com">
                <Button variant="ghost" className="text-white hover:bg-white/10 px-12 py-5 text-lg rounded-full border border-white/20 backdrop-blur-sm w-full">
                  Contact Us
                </Button>
              </a>
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
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setFeaturedProducts(data.filter(p => p.isFeatured).slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="framer-page-transition"
    >
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Selection</h2>
              <p className="text-neutral-500">Hand-picked essentials for your collection.</p>
            </div>
            <Link to="/shop">
              <Button variant="ghost" className="hidden md:block">View All Products</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-accent/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-8 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 max-w-3xl mx-auto leading-tight">
              Sunnah is a stream that flows through time, bringing peace to the present.
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto leading-relaxed text-lg">
              We bridge the gap between tradition and modernity. Every product in the Sunnah Stream collection is chosen for its quality, purpose, and alignment with mindful living.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
