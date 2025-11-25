import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';

const heroImages = [
  'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya29.jpg',
  'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya26.jpg',
  'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya25.jpg',
  'https://photographer-saya.com/wrps/wp-content/uploads/2025/10/saya28.jpg',
];

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Split text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const name = "saya";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#F5F1E8]">
      
      {/* Decorative Corner Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-white/20 z-30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-white/20 z-30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-white/20 z-30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-white/20 z-30" />
      
      {/* Image Slideshow */}
      <motion.div 
        className="absolute inset-0 z-0 h-full w-full"
        style={{ scale }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroImages[currentImageIndex]}
              alt="Sports Photography"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
      </motion.div>

      {/* Image Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-8 h-[2px] transition-all duration-500 ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content - Parallax Effect */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4"
      >
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            {/* Split Text Animation for Name */}
            <div className="flex justify-center mb-6 overflow-hidden">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-7xl md:text-9xl font-light tracking-wider text-[#F5F1E8] drop-shadow-lg opacity-95 lowercase inline-block"
                  style={{ fontFamily: 'var(--font-send-flowers)' }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
            
            {/* Animated Line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "circOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent mx-auto mb-6 w-24 md:w-32"
            />
            
            {/* Subtitle with stagger */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-[10px] md:text-xs font-serif italic tracking-[0.3em] uppercase text-white/90 mb-12"
            >
                Sports Photographer
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              onClick={scrollToGallery}
              className="group relative px-8 py-4 border border-white/40 text-white text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 hover:border-white/80"
            >
              <span className="relative z-10 flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-1">
                View Portfolio
                <ArrowDown size={14} className="transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/10"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
        </motion.div>
      </motion.div>

       {/* Scroll Indicator - Enhanced */}
       <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.span 
          className="text-[8px] uppercase tracking-[0.3em] text-white/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1} className="text-white/60" />
        </motion.div>
      </motion.div>

      {/* Side Text - Desktop Only */}
      <motion.div 
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 transform -rotate-90 origin-center whitespace-nowrap">
          Tokyo / Yokohama
        </p>
      </motion.div>

      <motion.div 
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 transform rotate-90 origin-center whitespace-nowrap">
          Est. 2024
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
