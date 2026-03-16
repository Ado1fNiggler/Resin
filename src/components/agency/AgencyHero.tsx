'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// ========== BLOB CONFIGURATION ==========
// Each blob: color, size, mouse-follow lag, offset from cursor
const BLOB_CONFIG = [
  { color: [56, 189, 248],  radius: 280, lag: 0.03,  offsetX: 0,    offsetY: -30  }, // sky-400
  { color: [14, 165, 233],  radius: 220, lag: 0.02,  offsetX: -100, offsetY: 60   }, // sky-500
  { color: [125, 211, 252], radius: 190, lag: 0.015, offsetX: 80,   offsetY: -50  }, // sky-300
  { color: [2, 132, 199],   radius: 170, lag: 0.025, offsetX: -50,  offsetY: -80  }, // sky-600
  { color: [56, 189, 248],  radius: 150, lag: 0.018, offsetX: 40,   offsetY: 80   }, // sky-400
];

const LINE_1 = 'LIOUGIOUROU';
const LINE_2 = 'STUDIO';
const ALL_LETTERS = LINE_1 + LINE_2;

export default function AgencyHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);

  // Store letter ref callback
  const setLetterRef = useCallback((el: HTMLSpanElement | null, index: number) => {
    letterRefs.current[index] = el;
  }, []);

  // ========== MOUSE TRACKING (ref-based, zero re-renders) ==========
  useEffect(() => {
    mouseRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // ========== CANVAS GLOW BLOBS + LETTER WAVE EFFECT ==========
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Resize handler
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Each blob tracks its own smoothed position
    const blobPositions = BLOB_CONFIG.map(() => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    // Check for hover capability (disable letter wave on touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stopped = false;

    const animate = () => {
      if (stopped) return;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const mouse = mouseRef.current;

      // --- Draw glow blobs ---
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      BLOB_CONFIG.forEach((blob, i) => {
        if (prefersReducedMotion) {
          // Static position at center offsets
          blobPositions[i].x = w / 2 + blob.offsetX;
          blobPositions[i].y = h / 2 + blob.offsetY;
        } else {
          // Smooth follow with per-blob lag
          blobPositions[i].x += (mouse.x + blob.offsetX - blobPositions[i].x) * blob.lag;
          blobPositions[i].y += (mouse.y + blob.offsetY - blobPositions[i].y) * blob.lag;
        }

        const gradient = ctx.createRadialGradient(
          blobPositions[i].x, blobPositions[i].y, 0,
          blobPositions[i].x, blobPositions[i].y, blob.radius
        );
        gradient.addColorStop(0, `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]}, 0.35)`);
        gradient.addColorStop(0.4, `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]}, 0.12)`);
        gradient.addColorStop(1, `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]}, 0)`);

        ctx.beginPath();
        ctx.arc(blobPositions[i].x, blobPositions[i].y, blob.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      ctx.globalCompositeOperation = 'source-over';

      // --- Per-letter wave effect ---
      if (hasHover && !prefersReducedMotion) {
        letterRefs.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const letterCX = rect.left + rect.width / 2;
          const letterCY = rect.top + rect.height / 2;

          const dx = mouse.x - letterCX;
          const dy = mouse.y - letterCY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 200;   // radius of effect in px
          const maxPush = -18;   // max upward push in px

          const currentY = parseFloat(span.dataset.cy || '0');
          let targetY = 0;

          if (distance < maxDist) {
            const proximity = 1 - distance / maxDist;
            const eased = proximity * proximity; // quadratic falloff
            targetY = maxPush * eased;
          }

          const newY = currentY + (targetY - currentY) * 0.12;
          span.dataset.cy = String(newY);

          // Only update DOM if the change is visible (> 0.1px)
          if (Math.abs(newY) > 0.1 || Math.abs(currentY) > 0.1) {
            span.style.transform = `translateY(${newY}px)`;
          }
        });
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      stopped = true;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // ========== RENDER ==========
  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0f]"
    >
      {/* Glow blob canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Giant text at bottom - notranslate prevents Google Translate from breaking letters */}
      <div
        className="notranslate absolute bottom-[5vh] left-0 right-0 z-10 px-4 md:px-10 select-none pointer-events-none"
        translate="no"
        style={{ lineHeight: 0.9 }}
      >
        {/* Line 1: LIOUGIOUROU */}
        <div className="flex justify-center md:justify-start overflow-hidden">
          {LINE_1.split('').map((char, i) => (
            <motion.span
              key={`l1-${i}`}
              ref={(el) => setLetterRef(el, i)}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05 + i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="notranslate inline-block text-white font-black leading-none cursor-default"
              translate="no"
              style={{
                fontSize: 'clamp(2rem, 8vw, 8rem)',
                willChange: 'transform',
                letterSpacing: '-0.02em',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Line 2: STUDIO */}
        <div className="flex justify-center md:justify-start overflow-hidden">
          {LINE_2.split('').map((char, i) => (
            <motion.span
              key={`l2-${i}`}
              ref={(el) => setLetterRef(el, LINE_1.length + i)}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.05 + (LINE_1.length + i) * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="notranslate inline-block text-white font-black leading-none cursor-default"
              translate="no"
              style={{
                fontSize: 'clamp(2rem, 8vw, 8rem)',
                willChange: 'transform',
                letterSpacing: '-0.02em',
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
