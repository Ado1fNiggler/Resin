'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [
    {
      path: '../../public/fonts/Narrenschiff-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-narrenschiff',
});

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for page to be ready, then animate out
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#214A4F' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Curtain reveal - splits top and bottom */}
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{ backgroundColor: '#214A4F', height: '50%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0"
            style={{ backgroundColor: '#214A4F', height: '50%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Logo animation */}
          <motion.div
            className={`text-white text-5xl md:text-7xl font-bold tracking-[0.2em] ${narrenschiff.className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          >
            {/* Letter-by-letter reveal */}
            {'Resin'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  ease: 'easeOut',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Subtle progress line */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 h-[1px] bg-white/30 overflow-hidden"
            style={{ width: '120px' }}
          >
            <motion.div
              className="h-full bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: 0.3, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
