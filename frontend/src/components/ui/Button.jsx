import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Button = ({ className, variant = 'primary', children, ...props }) => {
  const variants = {
    primary: 'btn-premium',
    secondary: 'btn-secondary',
    ghost: 'hover:bg-neutral-100 text-neutral-600 rounded-full px-6 py-2 transition-colors',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(variants[variant], 'whitespace-nowrap shrink-0', className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
