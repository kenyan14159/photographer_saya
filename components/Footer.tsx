import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, MapPin, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F1E8] pb-8 pt-16 relative overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-beige-300 to-transparent" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-20 w-16 h-16 rounded-full border border-beige-200/30 hidden lg:block" />
        <div className="absolute bottom-20 right-16 w-8 h-8 border border-beige-200/30 rotate-45 hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            
            {/* Main Contact Info Area */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                {/* Logo */}
                <motion.p 
                  className="text-4xl text-beige-950 mb-4"
                  style={{ fontFamily: 'var(--font-send-flowers)' }}
                  whileHover={{ scale: 1.02 }}
                >
                  saya
                </motion.p>
                
                <motion.a 
                    href="mailto:contact@photographer-saya.com" 
                    className="text-lg md:text-xl font-serif italic text-beige-800 hover:text-beige-950 transition-colors duration-300 inline-block mb-6"
                    whileHover={{ scale: 1.02 }}
                >
                    contact@photographer-saya.com
                </motion.a>

                <div className="flex items-center justify-center space-x-2 text-beige-500/80 mb-8">
                    <MapPin size={12} />
                    <span className="text-[10px] tracking-[0.2em] uppercase">Tokyo / Yokohama</span>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex justify-center gap-6">
                    <motion.a 
                      href="https://www.instagram.com/saya_sports_films/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-beige-300 text-beige-500 hover:text-beige-950 hover:border-beige-950 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram size={16} strokeWidth={1.5} />
                      <span className="text-xs tracking-wide">@saya_sports_films</span>
                    </motion.a>
                    <motion.a 
                      href="https://www.instagram.com/iam_saya_a/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-beige-300 text-beige-500 hover:text-beige-950 hover:border-beige-950 transition-all duration-300"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram size={16} strokeWidth={1.5} />
                      <span className="text-xs tracking-wide">@iam_saya_a</span>
                    </motion.a>
                  </div>
                  <motion.a 
                    href="https://x.com/iam_saya_a" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-beige-300 flex items-center justify-center text-beige-500 hover:text-beige-950 hover:border-beige-950 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter size={16} strokeWidth={1.5} />
                  </motion.a>
                </div>
            </motion.div>

            {/* Footer Bottom Row */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-beige-200/50 pt-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
                <p className="text-[10px] text-beige-400 uppercase tracking-widest order-2 md:order-1 font-light">
                    © {currentYear} Photographer Saya. All rights reserved.
                </p>
                
                <motion.button 
                    onClick={scrollToTop}
                    className="flex items-center text-[10px] text-beige-400 hover:text-beige-800 transition-colors uppercase tracking-[0.2em] gap-2 order-1 md:order-2 group px-4 py-2 border border-transparent hover:border-beige-300 rounded-full"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Back to Top 
                    <motion.span
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronUp size={12} />
                    </motion.span>
                </motion.button>
            </motion.div>
        </div>
    </footer>
  );
};

export default Footer;
