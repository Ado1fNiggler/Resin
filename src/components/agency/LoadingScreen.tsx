'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Global flag to prevent React Strict Mode double-mount issues
let globalCounterRunning = false;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'initial' | 'ellipses' | 'paused' | 'closing'>('initial');
  const [maskReady, setMaskReady] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animFrameRef = useRef<number>(0);
  const progressRef = useRef(0);
  const phaseRef = useRef<'initial' | 'ellipses' | 'paused' | 'closing'>('initial');
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const GOLD = '#c5ae79';

  // ========== PROGRESS COUNTER ==========
  useEffect(() => {
    if (globalCounterRunning) return;
    globalCounterRunning = true;

    const startTime = Date.now();
    const duration = 4000; // 4 seconds to reach 100% (faster!)
    let stopped = false;

    const tick = () => {
      if (stopped) return;

      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      const pct = Math.min(Math.round(t * 100), 100);

      progressRef.current = pct;

      // Direct DOM update
      if (counterRef.current) {
        counterRef.current.textContent = pct + ' %';
      }

      // Phase: ellipses appear at 40%
      if (pct >= 40 && phaseRef.current === 'initial') {
        phaseRef.current = 'ellipses';
        setPhase('ellipses');
      }

      if (pct >= 100) {
        // Pause at 100% for 500ms, then close
        phaseRef.current = 'paused';
        setPhase('paused');

        setTimeout(() => {
          // Start closing: names slide down, % slides up, ellipses shrink
          phaseRef.current = 'closing';
          setPhase('closing');
          // Delay mask so text doesn't flash-disappear at the start of motion
          setTimeout(() => setMaskReady(true), 80);

          // After closing animation completes, remove loader
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              globalCounterRunning = false;
              onCompleteRef.current();
            }, 400);
          }, 600);
        }, 500); // 0.5s pause at 100%

        return; // stop the counter loop
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      stopped = true;
      globalCounterRunning = false;
    };
  }, []);

  // ========== CANVAS ELLIPSE ANIMATION ==========
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

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

    const e1 = { x: 0, y: 0, scaleX: 0.28, scaleY: 0.22, baseRot: 0 };
    const e2 = { x: 0.025, y: -0.01, scaleX: 0.22, scaleY: 0.30, baseRot: 50 };

    const animStart = Date.now();
    let currentScale = 0;
    let closingStart: number | null = null;
    let stopped = false;

    const animate = () => {
      if (stopped) return;
      const elapsed = (Date.now() - animStart) / 1000;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.55;

      ctx.clearRect(0, 0, w, h);

      const prog = progressRef.current;
      const curPhase = phaseRef.current;

      // Scale logic
      let targetScale = 0;
      if (curPhase === 'closing') {
        // Fast shrink to center
        if (closingStart === null) closingStart = Date.now();
        const closeT = (Date.now() - closingStart) / 1000;
        targetScale = Math.max(0, 1 - closeT / 0.5);
      } else if (curPhase === 'paused' || prog >= 40) {
        // Full size during ellipses and paused phases
        targetScale = Math.min((prog - 40) / 25, 1);
      }

      currentScale += (targetScale - currentScale) * 0.1;

      if (currentScale > 0.01) {
        const rot1 = elapsed * 32;
        const rot2 = elapsed * -24;
        const dx = Math.sin(elapsed * 0.7) * 0.015;
        const dy = Math.cos(elapsed * 0.9) * 0.01;
        const alpha = Math.min(currentScale * 1.8, 0.8);

        // Ellipse 1
        ctx.beginPath();
        ctx.ellipse(
          cx + currentScale * (dx * w + e1.x * w),
          cy + currentScale * (dy * h * 0.25 + e1.y * h),
          currentScale * e1.scaleX * maxR,
          currentScale * e1.scaleY * maxR,
          ((e1.baseRot + rot1) * Math.PI) / 180,
          0, Math.PI * 2
        );
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        // Ellipse 2
        ctx.beginPath();
        ctx.ellipse(
          cx + currentScale * (-dx * 0.4 * w + e2.x * w),
          cy + currentScale * (dy * 0.3 * h + e2.y * h),
          currentScale * e2.scaleX * maxR,
          currentScale * e2.scaleY * maxR,
          ((e2.baseRot + rot2) * Math.PI) / 180,
          0, Math.PI * 2
        );
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha;
        ctx.stroke();

        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      stopped = true;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [GOLD]);

  // Compute animation targets based on phase
  // Names: initial=center(42%), ellipses=top(8%), paused=top(8%), closing=slide UP into clip boundary
  // Counter: initial=center(52%), ellipses=bottom(88%), paused=bottom(88%), closing=slide DOWN into clip boundary

  // The outer wrapper moves the whole block to the resting position (top area / bottom area)
  // During closing, the INNER content slides further away to exit the clip boundary
  // This creates the "eraser line" effect - text slides into the black and gets cropped

  const namesWrapperY = phase === 'initial' ? '0vh' : '-34vh';  // wrapper moves to resting pos
  const namesInnerY = phase === 'closing' ? '8vh' : '0vh';      // inner slides DOWN into black gap

  const counterWrapperY = phase === 'initial' ? '0vh' : '36vh'; // wrapper moves to resting pos
  const counterInnerY = phase === 'closing' ? '-8vh' : '0vh';   // inner slides UP into black gap

  // Soft gradient mask: during closing, fade the trailing edge of text as it exits
  // Names slide DOWN → top edge fades (text exits from bottom of container)
  // Counter slides UP → bottom edge fades (text exits from top of container)
  const namesMask = maskReady
    ? 'linear-gradient(to top, white 0%, white 20%, transparent 85%)'
    : 'none';
  const counterMask = maskReady
    ? 'linear-gradient(to bottom, white 0%, white 20%, transparent 85%)'
    : 'none';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0f] overflow-hidden"
        >
          {/* Full-screen canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* Names: ΓΙΟΥΡΟΥΚΑΛΗΣ — ΒΑΣΙΛΕΙΟΥ */}
          {/* Outer wrapper: overflow:hidden acts as the invisible eraser line */}
          {/* Inner content: slides UP past the boundary to get "erased" from bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: namesWrapperY }}
            transition={{
              opacity: { duration: 0.5, ease: 'easeOut' },
              y: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="absolute left-0 right-0 z-10 overflow-hidden"
            style={{
              top: '42%',
              WebkitMaskImage: namesMask,
              maskImage: namesMask,
              transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
            }}
          >
            <motion.div
              animate={{ y: namesInnerY }}
              transition={{
                duration: phase === 'closing' ? 0.55 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex items-center justify-center gap-5 md:gap-8 px-6 py-3"
            >
              <motion.span
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase select-none"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: GOLD }}
              >
                ΓΙΟΥΡΟΥΚΑΛΗΣ
              </motion.span>

              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="w-8 md:w-12 h-[1px] origin-center flex-shrink-0"
                style={{ backgroundColor: `${GOLD}50` }}
              />

              <motion.span
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] md:tracking-[0.35em] uppercase select-none"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: GOLD }}
              >
                ΒΑΣΙΛΕΙΟΥ
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Percentage counter */}
          {/* Same eraser technique: overflow:hidden boundary + inner slides DOWN to exit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: counterWrapperY }}
            transition={{
              opacity: { duration: 0.5, ease: 'easeOut' },
              y: {
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
              },
            }}
            className="absolute left-0 right-0 z-10 overflow-hidden"
            style={{
              top: '52%',
              WebkitMaskImage: counterMask,
              maskImage: counterMask,
              transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
            }}
          >
            <motion.div
              animate={{ y: counterInnerY }}
              transition={{
                duration: phase === 'closing' ? 0.55 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex justify-center py-3"
            >
              <span
                ref={counterRef}
                className="text-base md:text-xl font-light tracking-[0.2em] tabular-nums select-none"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: GOLD }}
              >
                0 %
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
