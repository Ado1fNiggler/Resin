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

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 ${dihjauti.className}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Πολυτελή έπιπλα <br />
          <span className="text-secondary">για την οικία σας</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl font-light tracking-wide max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)' }}
        >
          Ανακαλύψτε τη συλλογή μας από χειροποίητα έπιπλα που συνδυάζουν αισθητική και λειτουργικότητα.
        </motion.p>

        <motion.button
          className="bg-white text-primary px-12 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          Εξερευνήστε τη Συλλογή
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-8 h-8 text-white/80"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-white/70 text-xs tracking-widest uppercase">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>

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
