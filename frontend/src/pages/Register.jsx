import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Register = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-accent/30 px-6"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-12 shadow-2xl shadow-black/5"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-4">Create Account</h1>
          <p className="text-neutral-500">Join the EON LUXE community today.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
            <input 
              type="text" 
              className="input-premium" 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
            <input 
              type="email" 
              className="input-premium" 
              placeholder="name@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <input 
              type="password" 
              className="input-premium" 
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full py-4 rounded-2xl">Create Account</Button>
        </form>

        <div className="mt-12 text-center text-sm">
          <span className="text-neutral-400">Already have an account? </span>
          <Link to="/login" className="font-bold hover:underline">Sign In</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
