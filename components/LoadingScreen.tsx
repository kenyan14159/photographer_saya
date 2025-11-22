import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F1E8]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-thin tracking-[0.2em] text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Saya
        </motion.h1>
        <motion.div
          className="mt-4 h-0.5 bg-[#C4B5A0] w-0 mx-auto"
          animate={{ width: "60px" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
