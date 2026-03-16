'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="w-full h-full"
          >
            <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-sky-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-0 w-[350px] h-[350px] bg-sky-600/10 rounded-full blur-[100px]" />
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Ready to{' '}
            <span className="text-[#38bdf8]">transform</span>
            <br />
            your business?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Join dozens of businesses that already automated their way to success.
            Your next-level solution is just one conversation away.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group relative px-10 py-5 rounded-2xl bg-[#38bdf8] text-white font-bold text-lg overflow-hidden hover:bg-[#0ea5e9] hover:shadow-[0_0_60px_rgba(56,189,248,0.2)] transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="/"
              className="px-10 py-5 rounded-2xl border border-white/[0.06] text-white font-semibold text-lg hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300"
            >
              See Our Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
