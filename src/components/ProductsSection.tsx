'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface WoodSwatch {
  name: string;
  image: string;
}

const woodSwatches: WoodSwatch[] = [
  { name: 'natural-oak', image: '/wood1.png' },
  { name: 'caramel-walnut', image: '/wood2.png' },
  { name: 'dark-walnut', image: '/wood3.png' },
];

interface Product {
  name: string;
  sizes: string;
  fabrics: string;
  price: string;
  images: Record<string, string>;
  hoverImage?: string;
}

const products: Product[] = [
  {
    name: 'PHANTIGO',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '750',
    images: {
      'natural-oak': '/dining-tables1.png',
      'caramel-walnut': '/dining-tables2.png',
      'dark-walnut': '/dining-tables.png',
    },
    hoverImage: '/tables-hover.png',
  },
  {
    name: 'VIOLET',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '850',
    images: {
      'natural-oak': '/wardrobes.png',
      'caramel-walnut': '/wardrobes2.png',
      'dark-walnut': '/wardrobes3.png',
    },
    hoverImage: '/wardrobe-hover.png',
  },
  {
    name: 'MAXIMILLIAN',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '950',
    images: {
      'natural-oak': '/sofa1.png',
      'caramel-walnut': '/sofa3.png',
      'dark-walnut': '/sofa2.png',
    },
    hoverImage: '/sofa-hover.png',
  },
  {
    name: 'HUXTON',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '1.150',
    images: {
      'natural-oak': '/armchairs1.png',
      'caramel-walnut': '/armchairs2.png',
      'dark-walnut': '/armchairs.png',
    },
    hoverImage: '/armchairs-hover.png',
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeSwatch, setActiveSwatch] = useState(woodSwatches[0].name);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
    >
      {/* Product Image with swatch-driven swap */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ aspectRatio: '1/1', backgroundColor: '#E8E5E0' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Object.entries(product.images).map(([swatch, src]) => (
          <motion.img
            key={swatch}
            src={src}
            alt={`${product.name} - ${swatch}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeSwatch === swatch && !(isHovered && product.hoverImage) ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        ))}
        {/* Hover image overlay */}
        {product.hoverImage && (
          <motion.img
            src={product.hoverImage}
            alt={`${product.name} - hover`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
        {/* Subtle hover zoom (for cards without hoverImage) */}
        {!product.hoverImage && (
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </div>

      {/* Wood finish swatches – image thumbnails */}
      <div className="flex gap-3 mb-3">
        {woodSwatches.map((swatch) => (
          <button
            key={swatch.name}
            className="relative overflow-hidden transition-all duration-300"
            style={{
              width: activeSwatch === swatch.name ? '42px' : '32px',
              height: '20px',
              borderRadius: '10px',
              outline: activeSwatch === swatch.name ? '2px solid #214A4F' : '2px solid transparent',
              outlineOffset: '2px',
            }}
            onClick={() => setActiveSwatch(swatch.name)}
          >
            <img
              src={swatch.image}
              alt={swatch.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '7px',
              }}
            />
          </button>
        ))}
      </div>

      {/* Product info */}
      <h3
        className="text-base font-medium tracking-[0.05em] mb-1"
        style={{ color: '#214A4F' }}
      >
        {product.name}
      </h3>
      <p className="text-xs mb-1" style={{ color: '#214A4F', opacity: 0.7 }}>
        Διαθέσιμο σε {product.sizes} και {product.fabrics}
      </p>
      <p className="text-xs mb-4" style={{ color: '#214A4F', opacity: 0.7 }}>
        Από {product.price}&euro;
      </p>

      {/* Customize button - pill outlined */}
      <motion.button
        className="px-6 py-2.5 rounded-full border text-xs font-medium uppercase tracking-[0.1em] flex items-center gap-2 transition-all duration-300"
        style={{
          borderColor: '#214A4F',
          color: '#214A4F',
          backgroundColor: 'transparent',
        }}
        whileHover={{
          backgroundColor: '#214A4F',
          color: '#ffffff',
        }}
        transition={{ duration: 0.3 }}
      >
        Προσαρμογή
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="products" className="py-24" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-[100px]">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p
            className="text-xs uppercase tracking-[0.15em] mb-2 font-medium"
            style={{ color: '#214A4F' }}
          >
            Νέες αφίξεις
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-[54px] font-light"
            style={{
              color: '#214A4F',
              fontFamily: 'Georgia, "Times New Roman", serif',
              lineHeight: 1.15,
            }}
          >
            Γνωρίστε τη συλλογή
          </h2>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
