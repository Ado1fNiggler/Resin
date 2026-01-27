'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: '../../public/fonts/Narrenschiff-Regular.otf',
  display: 'swap',
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center">
        {/* Menu Button Square - No padding, touches corner */}
        <motion.button
          className="w-20 h-20 flex items-center justify-center"
          style={{ backgroundColor: '#176571' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Menu Icon */}
          <div className="flex flex-col gap-1.5">
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>

        {/* Logo */}
        <motion.div
          className={`ml-6 text-4xl font-bold ${narrenschiff.className}`}
          style={{ color: '#F86A38' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Resin
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: '#176571' }}
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <motion.a
            href="#products"
            className="text-white text-3xl font-bold hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
          >
            Προϊόντα
          </motion.a>
          <motion.a
            href="#features"
            className="text-white text-3xl font-bold hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
          >
            Χαρακτηριστικά
          </motion.a>
          <motion.a
            href="#about"
            className="text-white text-3xl font-bold hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
          >
            Σχετικά
          </motion.a>
          <motion.a
            href="#contact"
            className="text-white text-3xl font-bold hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
          >
            Επικοινωνία
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
}
