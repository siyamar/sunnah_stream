import React from 'react';
import { motion } from 'framer-motion';

const AdminPlaceholder = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mb-8">
        <div className="w-12 h-12 border-2 border-neutral-200 border-dashed rounded-lg animate-pulse"></div>
      </div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-neutral-500 max-w-md">
        This section is currently under development. We are building a premium experience for managing your {title.toLowerCase()}.
      </p>
    </motion.div>
  );
};

export default AdminPlaceholder;
