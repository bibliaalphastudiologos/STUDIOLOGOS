
import React from 'react';
import { motion } from 'framer-motion';
import { redirectToBibleAlpha } from '@/lib/redirects.js';

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex items-center justify-center bg-card py-12 md:py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1584996693182-6f466cfb9e74?auto=format&fit=crop&q=80&w=2000"
          alt="Biblioteca Teológica Studio Logos"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-screen-2xl mx-auto w-full px-6 md:px-12 flex flex-col items-center text-center">
        <div className="max-w-3xl w-full flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 md:mb-10 will-change-transform w-full"
          >
            <button className="font-outfit text-sm uppercase tracking-widest font-medium bg-white text-black px-8 py-3.5 md:py-4 rounded-sm hover:bg-gray-100 transition-colors duration-300 w-full sm:w-auto active:scale-[0.98]">
              Explorar Biblioteca
            </button>
            <button 
              onClick={redirectToBibleAlpha}
              className="font-outfit text-sm uppercase tracking-widest font-medium bg-transparent border border-white text-white px-8 py-3.5 md:py-4 rounded-sm hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto active:scale-[0.98]"
            >
              Bíblia Alpha
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="max-w-2xl mx-auto flex flex-col gap-4 text-white/90 text-base md:text-lg lg:text-xl font-normal will-change-transform"
          >
            <p>
              Explore uma biblioteca crescente de ebooks cristãos e aprofunde-se na Palavra com uma navegação moderna, simples e acessível.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
