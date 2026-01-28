'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: '../../public/fonts/Narrenschiff-Regular.otf',
  display: 'swap',
});

const products = ['Phantigo', 'Violet', 'Maximillian', 'Huxton'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          {/* Menu Button Square - No padding, touches corner */}
          <motion.button
            className="flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#176571' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ width: 80, height: 80 }}
            animate={{
              width: isHovered ? 140 : 80,
              height: 80
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-4 px-4">
              {/* MENU Text - Horizontal */}
              <motion.span
                className="text-white font-bold text-sm tracking-wider whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  width: isHovered ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                MENU
              </motion.span>

              {/* Menu Icon */}
              <div className="flex flex-col gap-1.5 flex-shrink-0">
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
            </div>
          </motion.button>

          {/* Logo */}
          <motion.div
            className={`ml-8 text-6xl font-bold text-white ${narrenschiff.className}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Resin
          </motion.div>
        </div>
      </motion.nav>

      {/* Full Screen Menu Overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-gray-100"
        initial={{ x: '-100%' }}
        animate={{ x: isMenuOpen ? 0 : '-100%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div className="w-20 bg-white flex flex-col items-center border-r border-gray-200">
            {/* Close Button */}
            <motion.button
              className="w-20 h-20 flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              className="w-20 h-20 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </motion.button>

            {/* Search */}
            <motion.button
              className="w-20 h-20 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </motion.button>

            {/* ROOOF Vertical Text */}
            <div className="flex-1 flex items-center justify-center">
              <div
                className="text-sm font-bold tracking-widest text-gray-800"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                ROOOF
              </div>
            </div>

            {/* Favorites */}
            <motion.button
              className="w-20 h-20 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </motion.button>

            {/* Scroll to Top */}
            <motion.button
              className="w-20 h-20 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.1 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Product Links */}
            <div className="flex-1 flex flex-col justify-center items-center space-y-0">
              {products.map((product, index) => (
                <motion.a
                  key={product}
                  href={`#${product.toLowerCase()}`}
                  className="w-full py-12 flex items-center justify-center text-6xl md:text-7xl lg:text-8xl font-light text-gray-700 hover:bg-gray-200 transition-all duration-300 border-b border-gray-200"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: isMenuOpen ? index * 0.1 : 0 }}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ backgroundColor: 'rgba(229, 231, 235, 0.8)' }}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {product}
                </motion.a>
              ))}
            </div>

            {/* Bottom Navigation */}
            <motion.div
              className="py-8 px-12 flex justify-end items-center gap-12 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#about"
                className="text-sm font-semibold tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                About
              </motion.a>
              <motion.a
                href="#faqs"
                className="text-sm font-semibold tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                FAQs
              </motion.a>
              <motion.a
                href="#favorites"
                className="text-sm font-semibold tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                Favorites
              </motion.a>
              <motion.a
                href="#contact"
                className="text-sm font-semibold tracking-wider text-gray-700 hover:text-gray-900 transition-colors uppercase"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.05 }}
              >
                Contact
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
