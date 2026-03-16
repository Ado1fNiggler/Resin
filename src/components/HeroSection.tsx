'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import localFont from 'next/font/local';
import { GlassButton } from '@/components/ui/glass-button';

const dihjauti = localFont({
  src: [
    {
      path: '../../public/fonts/Dihjauti-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-dihjauti',
});

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

const heroImages = [
  '/heroimage1.png',
  '/heroimage2.png',
  '/heroimage3.png',
  '/heroimage4.png',
];

// Word-by-word reveal animation like resin.gr
const heroTitle = 'Πολυτελή έπιπλα για την οικία σας';
const heroWords = heroTitle.split(' ');

const wordVariants = {
  hidden: {
    y: '100%',
  },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 1,
      delay: 0.6 + i * 0.1,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    // Wait for PageLoader to finish (2.2s loading + 0.6s fade out)
    const loaderTimer = setTimeout(() => setLoaderDone(true), 2800);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => {
      clearTimeout(loaderTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Background Image Carousel - Cross-fade with subtle Ken Burns zoom */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <AnimatePresence mode="sync">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              style={{ position: 'absolute', inset: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                animate={{ scale: index === currentImageIndex ? 1.05 : 1 }}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Gradient overlay - darker at bottom for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1))',
        }} />
      </div>

      {/* Content - Bottom Left: Word-by-word slide-up reveal */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '100px',
          zIndex: 10,
          color: '#fff',
          maxWidth: '768px',
        }}
      >
        <h1
          className={dihjauti.className}
          style={{
            fontSize: '90px',
            fontWeight: 300,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
            lineHeight: 1.05,
          }}
        >
          {heroWords.map((word, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                marginRight: '0.28em',
                verticalAlign: 'bottom',
              }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                custom={i}
                initial="hidden"
                animate={loaderDone ? 'visible' : 'hidden'}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          style={{
            fontSize: '16px',
            letterSpacing: '0.12em',
            lineHeight: 1.6,
            textTransform: 'uppercase',
            fontWeight: 500,
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Helvetica Neue", "Arial", sans-serif',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        >
          Η αγάπη για το σπίτι σας δεν χωράει συμβιβασμούς στην αισθητική
        </motion.p>
      </div>

      {/* CTA Button - Bottom Right with Liquid Glass Effect */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '64px',
          right: '100px',
          zIndex: 10,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <GlassButton
          size="default"
          contentClassName="flex items-center gap-3 uppercase tracking-widest text-xs font-semibold"
          onClick={() => {
            const target = document.getElementById('products');
            if (!target) return;
            const targetY = target.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }}
        >
          <span className={dihjauti.className}>Ανακαλύψτε τη συλλογή μας</span>
        </GlassButton>
      </motion.div>

      {/* Image Indicators - Progress bar style */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        right: '100px',
        zIndex: 10,
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
      }}>
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            style={{
              position: 'relative',
              height: '3px',
              borderRadius: '9999px',
              overflow: 'hidden',
              cursor: 'pointer',
              backgroundColor: 'rgba(255,255,255,0.3)',
              border: 'none',
              padding: 0,
            }}
            animate={{ width: index === currentImageIndex ? 40 : 8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={() => setCurrentImageIndex(index)}
          >
            {index === currentImageIndex && (
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#fff',
                  borderRadius: '9999px',
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 10, ease: 'linear' }}
                key={`progress-${currentImageIndex}`}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
