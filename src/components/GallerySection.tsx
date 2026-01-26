'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  {
    url: 'https://via.placeholder.com/400x400/8B7355/FFFFFF?text=Home+1',
    alt: 'Home 1',
  },
  {
    url: 'https://via.placeholder.com/400x400/C19A6B/FFFFFF?text=Home+2',
    alt: 'Home 2',
  },
  {
    url: 'https://via.placeholder.com/400x400/654321/FFFFFF?text=Home+3',
    alt: 'Home 3',
  },
  {
    url: 'https://via.placeholder.com/400x400/A0826D/FFFFFF?text=Home+4',
    alt: 'Home 4',
  },
  {
    url: 'https://via.placeholder.com/400x400/8B7355/FFFFFF?text=Home+5',
    alt: 'Home 5',
  },
  {
    url: 'https://via.placeholder.com/400x400/C19A6B/FFFFFF?text=Home+6',
    alt: 'Home 6',
  },
];

function GalleryItem({ image, index }: { image: { url: string; alt: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.img
        src={image.url}
        alt={image.alt}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-white text-xl font-semibold"
        >
          View
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Products at Home
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
