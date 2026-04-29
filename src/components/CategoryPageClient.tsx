'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import type { CategoryData, ProductData } from '@/data/products';

const narrenschiff = localFont({
  src: [
    {
      path: '../../public/fonts/Narrenschiff-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const woodSwatches = [
  { name: 'natural-oak', label: 'Natural Oak', image: '/wood1.png' },
  { name: 'caramel-walnut', label: 'Caramel Walnut', image: '/wood3.png' },
  { name: 'dark-walnut', label: 'Dark Walnut', image: '/wood2.png' },
];

/* ── Individual Product Card ── */
function CategoryProductCard({ product, index, categorySlug }: { product: ProductData; index: number; categorySlug: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [activeSwatch, setActiveSwatch] = useState(woodSwatches[0].name);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const imageAspectRatio = categorySlug === 'dining-tables' || categorySlug === 'storage' ? '4/3' : '1/1';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`/product/${product.slug}`)}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: imageAspectRatio,
          backgroundColor: '#E8E5E0',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cross-fading swatch images */}
        <motion.div
          style={{ position: 'absolute', inset: 0 }}
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {Object.entries(product.images).map(([swatch, src]) => (
            <motion.img
              key={swatch}
              src={src}
              alt={`${product.name} - ${swatch}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              initial={{ opacity: swatch === 'natural-oak' ? 1 : 0 }}
              animate={{
                opacity: activeSwatch === swatch && !(isHovered && product.hoverImage) ? 1 : 0,
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>

        {/* Hover image overlay */}
        {product.hoverImage && (
          <motion.img
            src={product.hoverImage}
            alt={`${product.name} - alternate`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}

        {/* Quick view overlay on hover */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px',
            background: 'linear-gradient(to top, rgba(33,74,79,0.85) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <span style={{
            color: '#FCFCFC',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            Προβολή
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.div>
      </div>

      {/* Wood finish swatches */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
        {woodSwatches.map((swatch) => (
          <button
            key={swatch.name}
            onClick={(e) => {
              e.stopPropagation();
              setActiveSwatch(swatch.name);
            }}
            style={{
              width: activeSwatch === swatch.name ? '42px' : '32px',
              height: '20px',
              borderRadius: '10px',
              outline: activeSwatch === swatch.name ? '2px solid #214A4F' : '2px solid transparent',
              outlineOffset: '2px',
              overflow: 'hidden',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          >
            <img
              src={swatch.image}
              alt={swatch.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '7px',
                display: 'block',
              }}
            />
          </button>
        ))}
      </div>

      {/* Product Info */}
      <h3 style={{
        fontSize: '15px',
        fontWeight: 500,
        letterSpacing: '0.05em',
        color: '#214A4F',
        marginBottom: '4px',
      }}>
        {product.name}
      </h3>

      <p style={{
        fontSize: '12px',
        color: '#214A4F',
        opacity: 0.65,
        marginBottom: '2px',
      }}>
        Διαθέσιμο σε {product.sizes} {product.fabrics !== '—' ? `και ${product.fabrics}` : ''}
      </p>

      <p style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#214A4F',
        marginBottom: '14px',
      }}>
        {product.price.match(/^\d/) ? `${product.price}€` : product.price}
      </p>

      {/* CTA Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/product/${product.slug}`);
        }}
        style={{
          padding: '10px 24px',
          borderRadius: '999px',
          border: '1.5px solid #214A4F',
          background: 'transparent',
          color: '#214A4F',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s ease',
        }}
        whileHover={{
          backgroundColor: '#214A4F',
          color: '#FCFCFC',
        }}
      >
        Προσαρμογή
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN CATEGORY PAGE CLIENT
   ══════════════════════════════════════════════ */
export default function CategoryPageClient({
  category,
  products,
}: {
  category: CategoryData;
  products: ProductData[];
}) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  /* ── Menu→Hero handoff: detect synchronously on first render so the morph
      overlay mounts in the same paint frame as the destination route, with
      no useEffect-induced flash of the bare hero between source and overlay. */
  const [menuMorphImage, setMenuMorphImage] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = sessionStorage.getItem('menuTransition');
      if (!raw) return null;
      const data = JSON.parse(raw);
      sessionStorage.removeItem('menuTransition');
      if (
        data &&
        data.slug === category.slug &&
        Date.now() - (data.ts || 0) < 4000 &&
        typeof data.image === 'string'
      ) {
        return data.image;
      }
    } catch {
      /* ignore */
    }
    return null;
  });

  return (
    <div style={{ paddingLeft: '75px' }}>
      {/* ── Menu→Hero morphing overlay ──
          Continues the menu's expanding-image animation: starts fullscreen
          (where Navbar left it) and shrinks down into the hero rectangle.
          Behind it, the real hero is already mounted and ready, so when
          this overlay fades out the underlying hero is pixel-identical. */}
      <AnimatePresence>
        {menuMorphImage && (
          <motion.div
            key="menu-morph"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.45, ease: 'easeOut' } }}
            onAnimationComplete={() => {
              // Sit on top of the static hero for a beat, then fade out.
              // The underlying hero is pixel-identical, so this fade is
              // invisible to the user.
              setTimeout(() => setMenuMorphImage(null), 100);
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 75,
              width: 'calc(100vw - 75px)',
              height: 'max(78vh, 560px)',
              zIndex: 200,
              overflow: 'hidden',
              pointerEvents: 'none',
              willChange: 'opacity',
            }}
          >
            <img
              src={menuMorphImage}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Match the hero's gradient overlay so the handoff is invisible */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(30,30,30,0.8) 0%, rgba(30,30,30,0.2) 40%, transparent 70%)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── Hero Banner ── */}
      <section
        style={{
          position: 'relative',
          height: '78vh',
          minHeight: '560px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        {/* Background image with Ken Burns (skipped on menu handoff to keep
            the underlying image static so the morphing overlay can fade out
            onto a pixel-identical hero). */}
        <motion.img
          src={category.heroImage}
          alt={category.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          initial={{ scale: menuMorphImage ? 1 : 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: menuMorphImage ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(30,30,30,0.8) 0%, rgba(30,30,30,0.2) 40%, transparent 70%)',
        }} />

        {/* Hero content */}
        <motion.div
          style={{
            position: 'relative',
            padding: '48px',
            width: '100%',
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(252,252,252,0.7)',
            marginBottom: '12px',
          }}>
            Συλλογή
          </p>
          <h1
            className={narrenschiff.className}
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 400,
              color: '#FCFCFC',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            {category.name}
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'rgba(252,252,252,0.8)',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}>
            {category.description}
          </p>
        </motion.div>
      </section>

      {/* ── Products Count & Sort Bar ── */}
      <motion.div
        ref={headerRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '32px 48px',
          borderBottom: '1px solid rgba(33,74,79,0.1)',
        }}
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p style={{
          fontSize: '13px',
          color: '#214A4F',
          opacity: 0.6,
          letterSpacing: '0.02em',
        }}>
          {products.length} {products.length === 1 ? 'προϊόν' : 'προϊόντα'}
        </p>
        <p style={{
          fontSize: '11px',
          color: '#214A4F',
          opacity: 0.5,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          Ταξινόμηση: Προτεινόμενα
        </p>
      </motion.div>

      {/* ── Products Grid ── */}
      <section style={{
        padding: '40px 48px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '40px',
        }}>
          {products.map((product, index) => (
            <CategoryProductCard key={product.slug} product={product} index={index} categorySlug={category.slug} />
          ))}
        </div>
      </section>

      {/* ── Category Description Footer ── */}
      <section style={{
        padding: '80px 48px',
        borderTop: '1px solid rgba(33,74,79,0.1)',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '28px',
              fontWeight: 300,
              color: '#214A4F',
              marginBottom: '20px',
              lineHeight: 1.4,
            }}
          >
            Χειροποίητα με αγάπη
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#214A4F',
            opacity: 0.6,
            lineHeight: 1.8,
          }}>
            Κάθε κομμάτι της συλλογής μας κατασκευάζεται χειροποίητα από τεχνίτες με πολυετή εμπειρία,
            χρησιμοποιώντας αποκλειστικά premium υλικά. Διαθέσιμο σε πολλαπλά φινιρίσματα ξύλου και υφάσματα.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
