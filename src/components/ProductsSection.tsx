'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Product {
  name: string;
  description: string;
  price: string;
  image: string;
  color: string;
}

const products: Product[] = [
  {
    name: 'Phantigo',
    description: 'Elegant design with premium comfort',
    price: '$750',
    image: 'https://via.placeholder.com/400x400/8B7355/FFFFFF?text=Phantigo',
    color: '#8B7355',
  },
  {
    name: 'Violet',
    description: 'Modern luxury meets durability',
    price: '$850',
    image: 'https://via.placeholder.com/400x400/C19A6B/FFFFFF?text=Violet',
    color: '#C19A6B',
  },
  {
    name: 'Maximillian',
    description: 'Sophisticated comfort for your pet',
    price: '$950',
    image: 'https://via.placeholder.com/400x400/654321/FFFFFF?text=Maximillian',
    color: '#654321',
  },
  {
    name: 'Huxton',
    description: 'Timeless elegance and support',
    price: '$1,150',
    image: 'https://via.placeholder.com/400x400/A0826D/FFFFFF?text=Huxton',
    color: '#A0826D',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={item}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="text-2xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
        >
          {product.name}
        </motion.h3>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
        >
          {product.description}
        </motion.p>
        <motion.p
          className="text-3xl font-bold text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        >
          {product.price}
        </motion.p>

        <motion.button
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.5 }}
          whileHover={{ scale: 1.02, backgroundColor: '#654321' }}
          whileTap={{ scale: 0.98 }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Collection
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
