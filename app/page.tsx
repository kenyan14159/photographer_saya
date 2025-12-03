"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import LoadingScreen from '@/components/LoadingScreen';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import GalleryIntro from '@/components/GalleryIntro';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Optimized loading time (reduced from 2400ms to 1800ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#F5F1E8]">
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-link">
        メインコンテンツにスキップ
      </a>
      
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="flex-grow" id="main-content">
            <Hero />
            <GalleryIntro />
            <Gallery />
            <About />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
