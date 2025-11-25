import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MarqueeText = ({ children }: { children?: React.ReactNode }) => (
    <div className="relative flex overflow-hidden py-8 md:py-16 bg-[#F5F1E8] border-b border-[#C4B5A0]/30">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        <h2 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter text-[#E8DCC8] px-4 opacity-50">
          {children}
        </h2>
        <h2 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter text-[#E8DCC8] px-4 opacity-50">
          {children}
        </h2>
      </motion.div>
      
      {/* Overlay Text - Static with enhanced styling */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
          <div className="relative">
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-beige-900 bg-[#F5F1E8]/90 px-8 py-4 backdrop-blur-sm border border-beige-300 font-serif italic">
              Moments of Passion
            </p>
            {/* Decorative dots */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-beige-400 rounded-full" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-beige-400 rounded-full" />
          </div>
      </motion.div>
    </div>
);

const GalleryIntro: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 1]);

  return (
    <section className="relative z-20 bg-[#F5F1E8]">
        {/* Decorative Line */}
        <div className="absolute left-1/2 top-0 w-[1px] h-16 bg-gradient-to-b from-transparent to-beige-300 -translate-x-1/2" />
        
        <motion.div 
          style={{ opacity }}
          className="px-6 md:px-12 py-24 max-w-5xl mx-auto"
        >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-4"
            >
                <div className="relative">
                  <motion.span 
                    className="absolute -left-8 top-0 text-6xl md:text-8xl font-serif italic text-beige-200 opacity-50 select-none hidden md:block"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.5, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    "
                  </motion.span>
                  <h3 className="text-3xl md:text-5xl font-serif italic text-beige-950 leading-tight">
                      Moments<br/>In Motion
                  </h3>
                  <motion.div 
                    className="mt-4 h-[2px] bg-gradient-to-r from-beige-400 to-transparent"
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="max-w-md space-y-4 text-sm leading-loose text-beige-900/80 text-justify font-sans font-light relative"
                >
                    <p>
                        スポーツの現場にある熱気や、ふとした瞬間の表情。
                        そういった「心が動く瞬間」を大切にシャッターを切っています。
                    </p>
                    <p>
                        アスリートの輝きや、その場の空気感。
                        それらを少しでも写真に残せたらと思っています。
                    </p>
                    {/* Decorative element */}
                    <div className="absolute -right-4 bottom-0 w-8 h-8 border-r border-b border-beige-300/50 hidden md:block" />
                </motion.div>
            </motion.div>
        </motion.div>
        <MarqueeText>
            SAYA PHOTOGRAPHY — PORTFOLIO — SAYA PHOTOGRAPHY — PORTFOLIO — 
        </MarqueeText>
    </section>
  );
};

export default GalleryIntro;
