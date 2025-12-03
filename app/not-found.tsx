'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-24">
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
            <FileQuestion className="w-20 h-20 text-beige-600 mx-auto" strokeWidth={1} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-8xl text-beige-950 mb-4"
            style={{ fontFamily: 'var(--font-send-flowers)' }}
          >
            404
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-serif italic text-2xl md:text-3xl text-beige-800 mb-4 relative inline-block"
          >
            <span className="relative z-10">ページが見つかりません</span>
            <motion.span 
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-beige-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-beige-700 mb-10 text-sm md:text-base font-light leading-relaxed"
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
              className="group inline-flex items-center gap-3 bg-beige-950 hover:bg-beige-800 px-8 py-4 text-[#F5F1E8] text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              <Home className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ホームに戻る
            </Link>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-beige-200 rounded-full opacity-30 hidden lg:block" />
      <div className="absolute bottom-40 right-20 w-16 h-16 border border-beige-200 rotate-45 opacity-30 hidden lg:block" />
    </div>
  );
}
