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
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-beige-300/30 to-transparent"
            style={{
              left: `${5 + i * 5}%`,
              height: '100%',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo with split animation */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {'saya'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-4xl md:text-5xl font-light tracking-widest text-beige-950 lowercase inline-block"
                style={{ fontFamily: 'var(--font-send-flowers)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
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
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Photographer
        </motion.p>
        
        {/* Enhanced Loading Indicator */}
        <div className="flex items-center gap-4 mt-4">
          <motion.div 
            className="w-16 h-[1px] bg-beige-300 overflow-hidden"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div 
              className="w-full h-full bg-beige-950"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
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
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        </div>

        {/* Decorative corners */}
        <motion.div 
          className="absolute -top-8 -left-8 w-12 h-12 border-l border-t border-beige-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        <motion.div 
          className="absolute -bottom-8 -right-8 w-12 h-12 border-r border-b border-beige-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
