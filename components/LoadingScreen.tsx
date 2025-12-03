import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F1E8]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      role="status"
      aria-label="ページを読み込んでいます"
    >
      {/* Background Pattern - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-beige-300/30 to-transparent"
            style={{
              left: `${10 + i * 10}%`,
              height: '100%',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Logo with split animation */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {'saya'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-5xl font-light tracking-widest text-beige-950 lowercase inline-block"
                style={{ fontFamily: 'var(--font-send-flowers)' }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: "easeOut" }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.3em] text-beige-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Photographer
        </motion.p>
        
        {/* Simplified Loading Indicator */}
        <div className="flex items-center gap-3 mt-2">
          <motion.div 
            className="w-12 h-[1px] bg-beige-300 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div 
              className="w-full h-full bg-beige-950"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            />
          </motion.div>
          
          {/* Animated dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-beige-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative corners - simplified */}
        <motion.div 
          className="absolute -top-6 -left-6 w-10 h-10 border-l border-t border-beige-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          aria-hidden="true"
        />
        <motion.div 
          className="absolute -bottom-6 -right-6 w-10 h-10 border-r border-b border-beige-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1 }}
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
