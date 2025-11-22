import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-[#F5F1E8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Text Column (Left on Desktop) */}
            <div className="md:col-span-5 md:order-1 order-2 relative z-10">
                 <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, margin: "-10%" }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                     className="md:pr-12"
                 >
                    <h2 className="text-5xl md:text-7xl font-serif italic text-beige-950 mb-12 opacity-90">
                        About<br/>Me
                    </h2>
                    
                    <div className="space-y-8 text-beige-900/80 leading-loose text-sm md:text-base font-light font-sans text-justify">
                        <p>
                            <span className="text-3xl float-left mr-2 mt-[-8px] font-serif italic text-beige-400">E</span>
                            駅伝・陸上競技・マラソンを中心にスポーツ写真を撮影しています。女性フォトグラファーとして、アスリートの集中した表情や全力で駆け抜ける一瞬を写真に収めることに魅力を感じています。
                        </p>
                        <p>
                            最初は趣味で始めたカメラでしたが、競技に向き合う選手たちの姿に心を打たれ、今では関東エリアの陸上大会や駅伝大会を訪れて、ランナーや陸上選手が懸命に競技する瞬間を記録し続けています。
                        </p>
                        <p>
                            撮影した一枚一枚には、選手たちの汗と涙、そして夢への想いが写っています。女性ランナーから実業団選手まで、スポーツが持つ感動を写真を通じて多くの方にお伝えできればと願っています。
                        </p>
                    </div>

                    <div className="mt-12 pt-12 border-t border-beige-950/10">
                        <p className="font-serif italic text-xl text-beige-950">Saya</p>
                        <p className="text-xs uppercase tracking-widest text-beige-500 mt-1">Photographer / Tokyo</p>
                    </div>
                 </motion.div>
            </div>

             {/* Image Column (Right on Desktop, overlapping) */}
             <div className="md:col-span-7 md:order-2 order-1">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative pl-0 md:pl-12"
                >
                     <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-beige-200">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop" 
                            alt="Saya" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#E8DCC8] -z-10 hidden md:block"></div>
                </motion.div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;
