import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // 背景スクロールロック
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // フォーカストラップ
  useEffect(() => {
    if (!isModalOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isModalOpen]);

  return (
    <section id="about" className="py-32 md:py-48 bg-[#F5F1E8] overflow-hidden relative" aria-labelledby="about-title">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div 
          style={{ y }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full border border-beige-200 opacity-30 hidden lg:block" 
        />
        <div className="absolute bottom-40 left-10 w-32 h-32 border border-beige-200 opacity-30 rotate-45 hidden lg:block" />
        {/* Floating dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-beige-300 rounded-full opacity-40 hidden lg:block"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Text Column (Left on Desktop) */}
            <div className="md:col-span-5 md:order-1 order-2 relative z-10">
                 <motion.div
                     initial={{ opacity: 0, x: -30 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="md:pr-12"
                 >
                    {/* Section Label */}
                    <motion.span 
                      className="text-[10px] uppercase tracking-[0.3em] text-beige-500 mb-4 block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      About the Photographer
                    </motion.span>
                    
                    <h2 id="about-title" className="text-5xl md:text-7xl font-serif italic text-beige-950 mb-8 opacity-90 relative">
                        About<br/>Me
                        <motion.div 
                          className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-beige-400 to-transparent"
                          initial={{ width: 0 }}
                          whileInView={{ width: '50%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          aria-hidden="true"
                        />
                    </h2>
                    
                    <div className="space-y-6 text-beige-900/80 leading-relaxed text-sm md:text-base font-light font-sans">
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            駅伝・陸上競技・マラソンを中心にスポーツ写真を撮影しています。女性フォトグラファーとして、アスリートの集中した表情や全力で駆け抜ける一瞬を写真に収めることに魅力を感じています。
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            最初は趣味で始めたカメラでしたが、競技に向き合う選手たちの姿に心を打たれ、今では関東エリアの陸上大会や駅伝大会を訪れて、ランナーや陸上選手が懸命に競技する瞬間を記録し続けています。
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            撮影した一枚一枚には、選手たちの汗と涙、そして夢への想いが写っています。女性ランナーから実業団選手まで、スポーツが持つ感動を写真を通じて多くの方にお伝えできればと願っています。
                        </motion.p>
                    </div>

                    <motion.div 
                      className="mt-10 pt-10 border-t border-beige-950/10"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                        <p className="font-serif italic text-2xl text-beige-950">Saya</p>
                        <p className="text-xs uppercase tracking-widest text-beige-500 mt-1">Photographer</p>
                    </motion.div>
                 </motion.div>
            </div>

             {/* Image Column (Right on Desktop, overlapping) */}
             <div className="md:col-span-7 md:order-2 order-1">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative pl-0 md:pl-12 cursor-pointer group"
                    onClick={() => setIsModalOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsModalOpen(true);
                      }
                    }}
                    aria-label="フォトグラファーSayaのプロフィール写真を拡大表示"
                >
                     <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-beige-200">
                        {imageError ? (
                          <div className="w-full h-full bg-beige-200 flex items-center justify-center text-beige-500">
                            <span className="text-sm">画像を読み込めません</span>
                          </div>
                        ) : (
                          <Image 
                              src="/saya_image/saya30.jpg" 
                              alt="フォトグラファーSayaのプロフィール写真" 
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={() => setImageError(true)}
                          />
                        )}
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" aria-hidden="true" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                              className="w-16 h-16 rounded-full border border-white/0 group-hover:border-white/60 flex items-center justify-center transition-all duration-500 backdrop-blur-0 group-hover:backdrop-blur-sm"
                              whileHover={{ scale: 1.1 }}
                              aria-hidden="true"
                            >
                              <span className="text-white opacity-0 group-hover:opacity-100 tracking-widest text-xs font-light transition-opacity duration-300 uppercase">View</span>
                            </motion.div>
                        </div>
                        {/* Corner decorations on hover */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/0 group-hover:border-white/50 transition-all duration-500" aria-hidden="true" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/0 group-hover:border-white/50 transition-all duration-500" aria-hidden="true" />
                    </div>
                    {/* Decorative Elements - Enhanced */}
                    <motion.div 
                      className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#E8DCC8] -z-10 hidden md:block"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      aria-hidden="true"
                    />
                    <motion.div 
                      className="absolute -top-4 -right-4 w-16 h-16 border border-beige-300 -z-10 hidden md:block"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                      aria-hidden="true"
                    />
                </motion.div>
            </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F5F1E8]/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="プロフィール写真を拡大表示中"
          >
            <button 
                ref={closeButtonRef}
                className="fixed top-6 right-6 text-beige-950/50 hover:text-beige-950 transition-colors p-2 z-50"
                onClick={() => setIsModalOpen(false)}
                aria-label="写真を閉じる"
            >
                <X className="w-8 h-8" strokeWidth={1} aria-hidden="true" />
            </button>

            <motion.div 
                className="relative w-full h-full flex items-center justify-center p-2 md:p-12"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src="/saya_image/saya30.jpg"
                    alt="フォトグラファーSayaのプロフィール写真"
                    width={1200}
                    height={1600}
                    className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl"
                    priority
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
