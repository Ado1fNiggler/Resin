'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.98)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 2px 10px rgba(0, 0, 0, 0.1)', '0 2px 20px rgba(0, 0, 0, 0.15)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 100);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor,
        boxShadow,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold tracking-[0.2em] text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            ROOOF
          </motion.div>

          {/* Navigation Links */}
          <motion.ul
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {['Products', 'Features', 'About', 'Contact'].map((item, index) => (
              <li key={item}>
                <motion.a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-700 font-medium relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item}
                  <span className="absolute left-0 bottom-[-5px] w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              </li>
            ))}
          </motion.ul>

          {/* CTA Button */}
          <motion.button
            className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-dark-brown transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
