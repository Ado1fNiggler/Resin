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
  const [hoveredSidebarItem, setHoveredSidebarItem] = useState<string | null>(null);

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
            className="relative overflow-hidden flex items-center justify-center"
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
            <div className="flex items-center gap-4">
              {/* MENU Text - Fades in when hovering */}
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

              {/* Menu Icon - Moves right on hover */}
              <motion.div
                className="flex flex-col gap-1.5 flex-shrink-0"
                animate={{
                  x: isHovered ? 0 : 0
                }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
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
          <div className="bg-white flex flex-col items-start border-r border-gray-200">
            {/* Close Button */}
            <motion.button
              className="flex items-center justify-center overflow-hidden text-gray-800"
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setHoveredSidebarItem('close')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              initial={{ width: 80, height: 80 }}
              animate={{ width: hoveredSidebarItem === 'close' ? 140 : 80, height: 80 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-gray-800 font-bold text-xs tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hoveredSidebarItem === 'close' ? 1 : 0,
                    width: hoveredSidebarItem === 'close' ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  CLOSE
                </motion.span>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </motion.button>

            {/* Shopping Cart */}
            <motion.button
              className="flex items-center justify-center overflow-hidden text-gray-600"
              onMouseEnter={() => setHoveredSidebarItem('cart')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              initial={{ width: 80, height: 80 }}
              animate={{
                width: hoveredSidebarItem === 'cart' ? 140 : 80,
                height: 80,
                color: hoveredSidebarItem === 'cart' ? '#176571' : '#4B5563'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="font-bold text-xs tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hoveredSidebarItem === 'cart' ? 1 : 0,
                    width: hoveredSidebarItem === 'cart' ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#176571' }}
                >
                  CART
                </motion.span>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </motion.button>

            {/* Search */}
            <motion.button
              className="flex items-center justify-center overflow-hidden text-gray-600"
              onMouseEnter={() => setHoveredSidebarItem('search')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              initial={{ width: 80, height: 80 }}
              animate={{
                width: hoveredSidebarItem === 'search' ? 140 : 80,
                height: 80,
                color: hoveredSidebarItem === 'search' ? '#176571' : '#4B5563'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="font-bold text-xs tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hoveredSidebarItem === 'search' ? 1 : 0,
                    width: hoveredSidebarItem === 'search' ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#176571' }}
                >
                  SEARCH
                </motion.span>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.button>

            {/* ROOOF Vertical Text */}
            <div className="flex-1 w-20 flex items-center justify-center">
              <div
                className="text-sm font-bold tracking-widest text-gray-800"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                ROOOF
              </div>
            </div>

            {/* Favorites */}
            <motion.button
              className="flex items-center justify-center overflow-hidden text-gray-600"
              onMouseEnter={() => setHoveredSidebarItem('favorites')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              initial={{ width: 80, height: 80 }}
              animate={{
                width: hoveredSidebarItem === 'favorites' ? 140 : 80,
                height: 80,
                color: hoveredSidebarItem === 'favorites' ? '#176571' : '#4B5563'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="font-bold text-xs tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hoveredSidebarItem === 'favorites' ? 1 : 0,
                    width: hoveredSidebarItem === 'favorites' ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#176571' }}
                >
                  LIKE
                </motion.span>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </motion.button>

            {/* Scroll to Top */}
            <motion.button
              className="flex items-center justify-center overflow-hidden text-gray-600"
              onMouseEnter={() => setHoveredSidebarItem('top')}
              onMouseLeave={() => setHoveredSidebarItem(null)}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              initial={{ width: 80, height: 80 }}
              animate={{
                width: hoveredSidebarItem === 'top' ? 140 : 80,
                height: 80,
                color: hoveredSidebarItem === 'top' ? '#176571' : '#4B5563'
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="font-bold text-xs tracking-widest whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: hoveredSidebarItem === 'top' ? 1 : 0,
                    width: hoveredSidebarItem === 'top' ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ color: '#176571' }}
                >
                  TOP
                </motion.span>
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
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
                  className="w-full py-12 flex items-center justify-center text-6xl md:text-7xl lg:text-8xl font-light text-gray-700 transition-all duration-300 border-b border-gray-200 cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: isMenuOpen ? index * 0.1 : 0, ease: 'easeOut' }}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{
                    backgroundColor: 'rgba(229, 231, 235, 0.5)',
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
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
              {['About', 'FAQs', 'Favorites', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold tracking-wider text-gray-700 transition-all duration-300 uppercase relative"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  whileHover={{
                    color: '#176571',
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                  <motion.span
                    className="absolute bottom-[-2px] left-0 h-[2px] bg-primary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
