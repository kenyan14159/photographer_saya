import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section id="gallery" className="py-24 md:py-40 bg-[#F5F1E8]">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Minimalist Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 md:mb-24 px-2 md:px-6">
            <h2 className="text-4xl md:text-6xl font-serif italic text-beige-950 opacity-90 mb-8 md:mb-0">Gallery</h2>
            
            <div className="flex flex-wrap gap-6 md:gap-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`text-xs md:text-sm uppercase tracking-[0.15em] transition-all duration-300 relative pb-1 ${
                    activeCategory === cat.value 
                      ? 'text-beige-950 font-medium' 
                      : 'text-beige-400 hover:text-beige-800'
                  }`}
                >
                  {cat.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] bg-beige-950 transition-all duration-300 ${activeCategory === cat.value ? 'w-full' : 'w-0'}`} />
                </button>
              ))}
            </div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
            <AnimatePresence>
            {displayedPhotos.map((photo) => (
                <motion.div
                    key={photo.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="break-inside-avoid mb-4 md:mb-8 group cursor-zoom-in"
                    onClick={() => setSelectedPhoto(photo)}
                >
                    <div className="relative w-full overflow-hidden bg-beige-200 shadow-sm">
                        <img 
                            src={photo.src} 
                            alt={photo.title} 
                            className="w-full h-auto object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </div>

        {/* Load More Button */}
        {filteredPhotos.length > visibleCount && (
            <div className="mt-24 text-center">
                <button
                    onClick={handleLoadMore}
                    className="text-beige-950 text-xs uppercase tracking-[0.25em] border-b border-beige-950/30 hover:border-beige-950 pb-1 transition-all duration-300"
                >
                    Load More Works
                </button>
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
