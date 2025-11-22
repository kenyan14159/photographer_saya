import React from 'react';
import { motion } from 'framer-motion';

const MarqueeText = ({ children }: { children?: React.ReactNode }) => (
    <div className="relative flex overflow-hidden py-8 md:py-16 bg-[#F5F1E8] border-b border-[#C4B5A0]/30">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        <h2 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter text-[#E8DCC8] px-4 opacity-50">
          {children}
        </h2>
        <h2 className="text-6xl md:text-9xl font-serif italic font-bold tracking-tighter text-[#E8DCC8] px-4 opacity-50">
          {children}
        </h2>
      </motion.div>
      
      {/* Overlay Text - Static */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-beige-900 bg-[#F5F1E8]/80 px-6 py-3 backdrop-blur-sm border border-beige-300 font-serif italic">
            Moments of Passion
          </p>
      </div>
    </div>
);

const GalleryIntro: React.FC = () => {
  return (
    <section className="relative z-20 bg-[#F5F1E8]">
        <div className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-4">
                <h3 className="text-3xl md:text-5xl font-serif italic text-beige-950 leading-tight">
                    Capturing<br/>The Soul of Sport
                </h3>
                <div className="max-w-md space-y-4 text-sm leading-loose text-beige-900/80 text-justify font-sans font-light">
                    <p>
                        静寂と熱狂。その一瞬のために、すべてを懸けるアスリートたちの美しさ。
                    </p>
                    <p>
                        風を切る音、荒い息遣い、ゴールテープを切る瞬間の咆哮。
                        目に見える動きだけでなく、その奥にある「揺れ動く感情」までもフィルムに焼き付けたい。
                    </p>
                    <p>
                        Sayaの写真は、スポーツというドラマチックな瞬間を、永遠の記憶として刻みます。
                    </p>
                </div>
            </div>
        </div>
        <MarqueeText>
            SAYA PHOTOGRAPHY — SPORTS & LIFE — SAYA PHOTOGRAPHY — SPORTS & LIFE — 
        </MarqueeText>
    </section>
  );
};

export default GalleryIntro;
