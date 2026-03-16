'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#showcase' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function AgencyNavbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileOpen(false);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-100%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative w-9 h-9 rounded-xl bg-[#38bdf8] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-shadow duration-300">
              <span className="text-white font-bold text-base">L</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              liougiourou
            </span>
          </motion.a>

          {/* Desktop Nav Links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center gap-0.5"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative flex items-center gap-1 px-3.5 py-2 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#38bdf8] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </motion.div>

          {/* Right side: CTA */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden md:inline-flex px-5 py-2 rounded-lg bg-[#38bdf8] text-white text-sm font-semibold hover:bg-[#0ea5e9] transition-all duration-300"
            >
              Get Started
            </motion.a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-[2px] bg-white origin-center transition-colors"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  className="w-6 h-[2px] bg-white origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-[2px] bg-white origin-center transition-colors"
                />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
                className="text-3xl font-bold text-white hover:text-sky-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-4 px-8 py-4 rounded-xl bg-[#38bdf8] text-white font-semibold text-lg hover:bg-[#0ea5e9] transition-colors"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
