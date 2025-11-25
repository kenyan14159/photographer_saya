'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f5f1e8]/30 to-white">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 py-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <FileQuestion className="w-20 h-20 text-[#907e6e] mx-auto" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="emilys-candy-regular text-6xl md:text-7xl text-[#907e6e] mb-4"
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="kiwi-maru-regular font-serif text-2xl md:text-3xl font-bold text-[#907e6e] mb-4 relative inline-block"
          >
            <span className="relative z-10">ページが見つかりません</span>
            <span className="absolute bottom-0 left-0 right-0 h-3 bg-[#d4af37]/20 -z-0 transform -rotate-1"></span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-700 mb-8 text-lg font-sans leading-relaxed"
          >
            お探しのページは見つかりませんでした。<br />
            URLが正しいかご確認ください。
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#907e6e] hover:bg-[#6b5d4f] px-6 py-3 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg font-sans"
            >
              <Home className="w-5 h-5" />
              ホームに戻る
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
