import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F5F1E8]">
      
      {/* Main Image - Ken Burns Effect */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.15 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop" 
          alt="Runner on track"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content - Parallax Effect */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4"
      >
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="text-center"
        >
            {/* Elegant & Cute Typography */}
            <h1 className="text-7xl md:text-9xl font-cute font-light tracking-wider text-[#F5F1E8] drop-shadow-lg opacity-95 lowercase mb-6">
                saya
            </h1>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 1.0, ease: "circOut" }}
              className="h-[1px] bg-white/70 mx-auto mb-6 w-16 md:w-24"
            />
            
            <p className="text-[10px] md:text-xs font-serif italic tracking-[0.3em] uppercase text-white/90">
                Sports Photographer
            </p>
        </motion.div>
      </motion.div>

       {/* Scroll Indicator */}
       <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ duration: 2, delay: 2, repeat: Infinity }}
      >
        <ChevronDown size={20} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
