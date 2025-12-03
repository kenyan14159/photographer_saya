import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 背景スクロールロック
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'bg-[#F5F1E8]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
        role="navigation"
        aria-label="メインナビゲーション"
      >
        {/* Scroll Progress Indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-beige-400 via-beige-600 to-beige-400 origin-left"
          style={{ scaleX }}
          aria-hidden="true"
        />
        
        <div className="px-6 md:px-12 flex justify-between items-center">
            {/* Logo with hover effect */}
            <motion.a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-4xl tracking-wider transition-all duration-300 relative group ${isScrolled ? 'text-beige-950' : 'text-beige-950'}`}
                style={{ fontFamily: 'var(--font-send-flowers)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="トップページに戻る"
            >
              saya
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-[1px] bg-beige-400 group-hover:w-full transition-all duration-300"
                aria-hidden="true"
              />
            </motion.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-beige-950 hover:text-beige-500 transition-colors relative group"
                  aria-label={`${link.name}セクションに移動`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-beige-400 transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </motion.button>
              ))}
            </div>

            {/* Mobile Hamburger - Enhanced */}
            <motion.button
              className="md:hidden focus:outline-none text-beige-950 relative w-8 h-8 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} strokeWidth={1.5} aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F5F1E8] z-30 flex flex-col items-center justify-center md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="モバイルメニュー"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
              <div className="absolute top-20 right-10 w-32 h-32 border border-beige-200 rounded-full opacity-30" />
              <div className="absolute bottom-40 left-10 w-20 h-20 border border-beige-200 opacity-30" />
            </div>

            <motion.div 
              className="flex flex-col space-y-8 text-center relative z-10"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
              }}
            >
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-4xl font-serif italic text-beige-950 hover:text-beige-500 transition-colors relative group"
                >
                  <span className="relative">
                    {link.name}
                    <motion.span 
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-beige-400 group-hover:w-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  </span>
                </motion.button>
              ))}
              
              {/* Mobile CTA */}
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => handleNavClick('#contact')}
                className="mt-8 px-8 py-3 border border-beige-950 text-beige-950 text-xs uppercase tracking-[0.2em] hover:bg-beige-950 hover:text-[#F5F1E8] transition-all duration-300"
              >
                Hire Me
              </motion.button>
            </motion.div>
            
            {/* Social hint */}
            <motion.p 
              className="absolute bottom-12 text-[10px] uppercase tracking-[0.2em] text-beige-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              aria-hidden="true"
            >
              Tokyo / Yokohama
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
