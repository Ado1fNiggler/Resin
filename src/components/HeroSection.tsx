'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
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

// Word-by-word reveal animation
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
  const [loaderDone, setLoaderDone] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setLoaderDone(true), 2800);
    return () => clearTimeout(loaderTimer);
  }, []);

  // Start playing once video has enough data
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setVideoReady(true);
      video.play().catch(() => {});
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener('canplaythrough', handleCanPlay);
      return () => video.removeEventListener('canplaythrough', handleCanPlay);
    }
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Poster image — shows until video is ready */}
      <AnimatePresence>
        {!videoReady && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/heroimage1.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* Autoplay video background */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 1,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1))',
          zIndex: 3,
        }}
      />

      {/* Content — Bottom Left */}
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
            marginBottom: '36px',
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
        >
          Η αγάπη για το σπίτι σας δεν χωράει συμβιβασμούς στην αισθητική
        </motion.p>

        {/* CTA Button — inline below subtitle */}
        <motion.div
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
      </div>
    </section>
  );
}
