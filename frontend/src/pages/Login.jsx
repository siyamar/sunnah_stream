import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'admin') navigate('/admin');
        else navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

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
          <h1 className="text-3xl font-bold tracking-tight mb-4">Welcome Back</h1>
          <p className="text-neutral-500">Enter your credentials to access your account.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
            <input 
              type="email" 
              className="input-premium" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Password</label>
              <button type="button" className="text-xs font-bold text-neutral-400 hover:text-black">Forgot?</button>
            </div>
            <input 
              type="password" 
              className="input-premium" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full py-4 rounded-2xl">Sign In</Button>
        </form>

        <div className="mt-12 text-center text-sm">
          <span className="text-neutral-400">Don't have an account? </span>
          <Link to="/register" className="font-bold hover:underline">Sign Up</Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
