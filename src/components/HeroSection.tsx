'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll progress over the tall scroll container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fade out text & CTA as user scrolls into video territory
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

  // Video darkens slightly as it plays deeper
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.45, 0.6]);

  // Drive video playback from scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = v * video.duration;
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setLoaderDone(true), 2800);
    return () => clearTimeout(loaderTimer);
  }, []);

  return (
    // Tall scroll container — gives 300vh of scroll travel
    <div ref={containerRef} style={{ height: '300vh' }}>
      {/* Sticky viewport — stays fixed while container scrolls */}
      <section
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Scroll-driven video background */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Gradient overlay */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1))',
            opacity: overlayOpacity,
          }}
        />

        {/* Content — fades out as user scrolls */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: contentOpacity,
            y: contentY,
          }}
        >
          {/* Bottom Left: Word-by-word slide-up title */}
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '100px',
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
                color: '#fff',
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
            >
              Η αγάπη για το σπίτι σας δεν χωράει συμβιβασμούς στην αισθητική
            </motion.p>
          </div>

          {/* CTA Button - Bottom Right */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '64px',
              right: '100px',
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
        </motion.div>

        {/* Scroll hint — appears after loader, fades with scroll */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '28px',
            left: '50%',
            x: '-50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: contentOpacity,
          }}
          initial={{ opacity: 0 }}
          animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <span
            className={dihjauti.className}
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <motion.div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.55), transparent)',
            }}
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>
    </div>
  );
}
