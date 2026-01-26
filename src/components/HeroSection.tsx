'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import localFont from 'next/font/local';

const dihjauti = localFont({
  src: '../../public/fonts/Dihjauti-Bold.otf',
  display: 'swap',
});

const heroImages = [
  '/hero1.png',
  '/hero2.png',
  '/hero3.png',
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content - Bottom Left */}
      <div className="absolute bottom-16 left-8 md:left-16 z-10 text-white max-w-2xl">
        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 ${dihjauti.className}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)' }}
        >
          Πολυτελή έπιπλα <br />
          για την οικία σας
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl tracking-wide leading-relaxed"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)',
            fontFamily: '"Bahnschrift Condensed", "Arial Narrow", sans-serif',
            fontWeight: 400
          }}
        >
          Η αγάπη για το σπίτι σας δεν χωράει συμβιβασμούς στην αισθητική
        </motion.p>
      </div>


      {/* Image Indicators */}
      <div className="absolute bottom-10 right-10 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
}
