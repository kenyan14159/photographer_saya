import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Photo } from '../lib/types';
import { PHOTOS, CATEGORIES } from '../lib/constants';

const INITIAL_DISPLAY_COUNT = 12;
const LOAD_MORE_COUNT = 9;

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_DISPLAY_COUNT);

  // Filter photos based on active category
  const filteredPhotos = activeCategory === 'ALL' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === activeCategory);

  // Determine which photos to display based on visibleCount
  const displayedPhotos = filteredPhotos.slice(0, visibleCount);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(INITIAL_DISPLAY_COUNT);
  }, [activeCategory]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_COUNT);
  };

  // Navigation Logic
  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [selectedPhoto, filteredPhotos]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [selectedPhoto, filteredPhotos]);

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

  return (
    <section id="gallery" className="py-24 md:py-40 bg-[#F5F1E8] relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-24 h-24 border border-beige-300/30 rounded-full opacity-50 hidden lg:block" />
      <div className="absolute bottom-40 right-12 w-16 h-16 border border-beige-300/30 opacity-50 hidden lg:block" />
      
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
              <h2 className="text-4xl md:text-6xl font-serif italic text-beige-950 opacity-90">Gallery</h2>
              <motion.div 
                className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-beige-400 to-transparent"
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
            
            <div className="flex flex-wrap gap-6 md:gap-10">
              {CATEGORIES.map((cat, index) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 relative pb-1 ${
                    activeCategory === cat.value 
                      ? 'text-beige-950 font-medium' 
                      : 'text-beige-400 hover:text-beige-800'
                  }`}
                >
                  {cat.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-beige-950 transition-all duration-300 ${activeCategory === cat.value ? 'w-full' : 'w-0'}`} />
                </motion.button>
              ))}
            </div>
        </motion.div>

        {/* Masonry Layout */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
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
                >
                    <div className="relative w-full overflow-hidden bg-beige-200 shadow-sm">
                        <img 
                            src={photo.src} 
                            alt={photo.title} 
                            className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                        {/* Enhanced Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4 md:p-6"
                        >
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                          >
                            <p className="text-white text-xs uppercase tracking-[0.2em] mb-1 font-light">
                              {photo.category === 'EKIDEN_TRACK' ? '駅伝・陸上' : '日常・カフェ'}
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
                        <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-white/0 group-hover:border-white/50 transition-all duration-500" />
                        <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-white/0 group-hover:border-white/50 transition-all duration-500" />
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
                >
                    <span className="relative z-10 flex items-center gap-3">
                        Load More
                        <motion.span
                          animate={{ y: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ↓
                        </motion.span>
                    </span>
                    <motion.div 
                        className="absolute inset-0 bg-beige-950/5"
                        initial={{ y: '100%' }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </motion.button>
            </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#F5F1E8]/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button 
                className="fixed top-6 right-6 text-beige-950/50 hover:text-beige-950 transition-colors p-2 z-50"
                onClick={() => setSelectedPhoto(null)}
            >
                <X className="w-8 h-8" strokeWidth={1} />
            </button>

            {/* Prev Button */}
            <button
                className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-beige-950/40 hover:text-beige-950 transition-colors z-50"
                onClick={handlePrev}
            >
                <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" strokeWidth={0.5} />
            </button>

            {/* Next Button */}
            <button
                className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-beige-950/40 hover:text-beige-950 transition-colors z-50"
                onClick={handleNext}
            >
                <ChevronRight className="w-8 h-8 md:w-12 md:h-12" strokeWidth={0.5} />
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
                <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl"
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
