import React from 'react';
import { ChevronUp, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F5F1E8] pb-8 pt-12 border-t-0">
        <div className="max-w-6xl mx-auto px-6 text-center">
            
            {/* Main Contact Info Area - Reduced Spacing */}
            <div className="mb-10">
                <div className="flex flex-col items-center justify-center space-y-2 mb-6">
                    {/* Removed "Get in Touch" text */}
                    <a 
                        href="mailto:contact@photographer-saya.com" 
                        className="text-xl md:text-2xl font-serif italic text-beige-950 hover:text-beige-600 transition-colors duration-300"
                    >
                        contact@photographer-saya.com
                    </a>
                </div>

                <div className="flex items-center justify-center space-x-2 text-beige-500/80">
                    <MapPin size={12} />
                    <span className="text-[10px] tracking-[0.2em] uppercase">Tokyo / Yokohama</span>
                </div>
            </div>

            {/* Footer Bottom Row - Minimal */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-beige-200/50 pt-6 max-w-4xl mx-auto">
                <p className="text-[10px] text-beige-400 uppercase tracking-widest order-2 md:order-1 font-light">
                    © 2025 Photographer Saya. All rights reserved.
                </p>
                
                <button 
                    onClick={scrollToTop}
                    className="flex items-center text-[10px] text-beige-400 hover:text-beige-800 transition-colors uppercase tracking-[0.2em] gap-2 order-1 md:order-2 group"
                >
                    Top <ChevronUp size={12} className="group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
