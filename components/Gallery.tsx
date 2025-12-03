import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import Image from 'next/image';
import { Photo } from '../lib/types';
import { PHOTOS, CATEGORIES } from '../lib/constants';

const INITIAL_DISPLAY_COUNT = 12;
const LOAD_MORE_COUNT = 9;

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Filter photos based on active category
  const filteredPhotos = activeCategory === 'ALL' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === activeCategory);

  // Determine which photos to display based on visibleCount
  const displayedPhotos = filteredPhotos.slice(0, visibleCount);

  // カテゴリー変更ハンドラー（visibleCountもリセット）
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  };

  // 背景スクロールロック
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
      // フォーカスを閉じるボタンに移動
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPhoto]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_COUNT);
  };

  // Navigation Logic - 依存配列の問題を回避するため、category と selectedPhoto.id を使用
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedPhoto(current => {
      if (!current) return null;
      const photos = activeCategory === 'ALL' 
        ? PHOTOS 
        : PHOTOS.filter(photo => photo.category === activeCategory);
      const currentIndex = photos.findIndex(p => p.id === current.id);
      const nextIndex = (currentIndex + 1) % photos.length;
      return photos[nextIndex];
    });
  }, [activeCategory]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedPhoto(current => {
      if (!current) return null;
      const photos = activeCategory === 'ALL' 
        ? PHOTOS 
        : PHOTOS.filter(photo => photo.category === activeCategory);
      const currentIndex = photos.findIndex(p => p.id === current.id);
      const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
      return photos[prevIndex];
    });
  }, [activeCategory]);

  // Keyboard Navigation
  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedPhoto(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handleNext, handlePrev]);

  // フォーカストラップ
  useEffect(() => {
    if (!selectedPhoto || !lightboxRef.current) return;

    const lightbox = lightboxRef.current;
    const focusableElements = lightbox.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
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

    lightbox.addEventListener('keydown', handleTabKey);
    return () => lightbox.removeEventListener('keydown', handleTabKey);
  }, [selectedPhoto]);

  // 画像読み込みエラーハンドラー
  const handleImageError = (photoId: number) => {
    setImageErrors(prev => new Set(prev).add(photoId));
  };

  // カテゴリーの日本語ラベル
  const getCategoryLabel = (category: string) => {
    return category === 'EKIDEN_TRACK' ? '駅伝・陸上' : '日常・カフェ';
  };

  return (
    <section id="gallery" className="py-24 md:py-40 bg-[#F5F1E8] relative" aria-labelledby="gallery-title">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-24 h-24 border border-beige-300/30 rounded-full opacity-50 hidden lg:block" aria-hidden="true" />
      <div className="absolute bottom-40 right-12 w-16 h-16 border border-beige-300/30 opacity-50 hidden lg:block" aria-hidden="true" />
      
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Enhanced Header & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 md:mb-24 px-2 md:px-6"
        >
            <div className="relative mb-8 md:mb-0">
              <h2 id="gallery-title" className="text-4xl md:text-6xl font-serif italic text-beige-950 opacity-90">Gallery</h2>
              <motion.div 
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-beige-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                aria-hidden="true"
              />
            </div>
            
            <div className="flex flex-wrap gap-6 md:gap-10" role="tablist" aria-label="ギャラリーカテゴリー">
              {CATEGORIES.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 relative pb-1 ${
                    activeCategory === cat.value 
                      ? 'text-beige-950 font-medium' 
                      : 'text-beige-400 hover:text-beige-800'
                  }`}
                  role="tab"
                  aria-selected={activeCategory === cat.value}
                  aria-controls="gallery-grid"
                >
                  {cat.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-beige-950 transition-all duration-300 ${activeCategory === cat.value ? 'w-full' : 'w-0'}`} aria-hidden="true" />
                </motion.button>
              ))}
            </div>
        </motion.div>

        {/* Masonry Layout */}
        <div id="gallery-grid" className="columns-2 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8" role="tabpanel">
            <AnimatePresence>
            {displayedPhotos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="break-inside-avoid mb-4 md:mb-8 group cursor-zoom-in relative"
                    onClick={() => setSelectedPhoto(photo)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedPhoto(photo);
                      }
                    }}
                    aria-label={`${getCategoryLabel(photo.category)}の写真「${photo.title}」を拡大表示`}
                >
                    <div className="relative w-full overflow-hidden bg-beige-200 shadow-sm">
                        {imageErrors.has(photo.id) ? (
                          <div className="w-full aspect-[4/3] bg-beige-200 flex items-center justify-center text-beige-500">
                            <span className="text-sm">画像を読み込めません</span>
                          </div>
                        ) : (
                          <Image 
                              src={photo.src} 
                              alt={`${getCategoryLabel(photo.category)} - ${photo.title}`}
                              width={800}
                              height={600}
                              className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                              onError={() => handleImageError(photo.id)}
                          />
                        )}
                        {/* Enhanced Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-6"
                          aria-hidden="true"
                        >
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                          >
                            <p className="text-white text-xs uppercase tracking-[0.2em] mb-1 font-light">
                              {getCategoryLabel(photo.category)}
                            </p>
                            <p className="text-white/80 text-[10px] tracking-wider">
                              {photo.title}
                            </p>
                          </motion.div>
                          
                          {/* View Icon */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-white/10">
                              <Eye size={18} className="text-white" strokeWidth={1.5} />
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Decorative Corner on Hover */}
                        <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/0 group-hover:border-white/50 transition-all duration-500" aria-hidden="true" />
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/0 group-hover:border-white/50 transition-all duration-500" aria-hidden="true" />
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>

        {/* Load More Button - Enhanced */}
        {filteredPhotos.length > visibleCount && (
            <div className="mt-24 text-center">
                <motion.button
                    onClick={handleLoadMore}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-10 py-4 border border-beige-950/30 text-beige-950 text-xs uppercase tracking-[0.25em] overflow-hidden transition-all duration-500 hover:border-beige-950"
                    aria-label={`さらに${LOAD_MORE_COUNT}枚の写真を読み込む`}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Load More
                        <motion.span
                          animate={{ y: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          aria-hidden="true"
                        >
                          ↓
                        </motion.span>
                    </span>
                    <motion.div 
                        className="absolute inset-0 bg-beige-950/5"
                        initial={{ y: '100%' }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                        aria-hidden="true"
                    />
                </motion.button>
            </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F5F1E8]/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`写真を拡大表示中: ${selectedPhoto.title}`}
          >
            {/* Close Button */}
            <button 
                ref={closeButtonRef}
                className="fixed top-6 right-6 text-beige-950/50 hover:text-beige-950 transition-colors p-2 z-50"
                onClick={() => setSelectedPhoto(null)}
                aria-label="写真を閉じる"
            >
                <X className="w-8 h-8" strokeWidth={1} aria-hidden="true" />
            </button>

            {/* Prev Button */}
            <button
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-beige-950/40 hover:text-beige-950 transition-colors z-50"
                onClick={handlePrev}
                aria-label="前の写真を表示"
            >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={0.5} aria-hidden="true" />
            </button>

            {/* Next Button */}
            <button
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-beige-950/40 hover:text-beige-950 transition-colors z-50"
                onClick={handleNext}
                aria-label="次の写真を表示"
            >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={0.5} aria-hidden="true" />
            </button>

            <motion.div 
                key={selectedPhoto.id}
                className="relative w-full h-full flex items-center justify-center p-2 md:p-12"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={selectedPhoto.src}
                    alt={`${getCategoryLabel(selectedPhoto.category)} - ${selectedPhoto.title}`}
                    width={1200}
                    height={900}
                    className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl"
                    priority
                />
            </motion.div>

            {/* Photo info */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 text-center z-50">
              <p className="text-xs uppercase tracking-[0.2em] text-beige-600">
                {getCategoryLabel(selectedPhoto.category)} — {selectedPhoto.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
