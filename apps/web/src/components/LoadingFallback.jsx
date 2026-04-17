
import React from 'react';
import { motion } from 'framer-motion';

const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center gap-4"
      >
        <span className="font-playfair text-2xl font-semibold tracking-widest uppercase">
          Studio Logos
        </span>
        <div className="w-32 h-0.5 bg-muted overflow-hidden relative rounded-full">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-primary"
            initial={{ width: "0%", left: "0%" }}
            animate={{ 
              width: ["0%", "50%", "0%"],
              left: ["0%", "50%", "100%"]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingFallback;
