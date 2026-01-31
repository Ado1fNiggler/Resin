'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductData } from '@/data/products';

/* ── Wood finish swatches ── */
const woodSwatches = [
  { name: 'natural-oak', label: 'Natural Oak', image: '/wood1.png' },
  { name: 'caramel-walnut', label: 'Caramel Walnut', image: '/wood2.png' },
  { name: 'dark-walnut', label: 'Dark Walnut', image: '/wood3.png' },
];

/* ── Fabric swatches ── */
const fabricSwatches = [
  { name: 'wheat', label: 'Wheat', color: '#C8B897' },
  { name: 'dune', label: 'Dune', color: '#D4C5A9' },
  { name: 'chai', label: 'Chai', color: '#A0826D' },
  { name: 'birch', label: 'Birch', color: '#E8E0D0' },
];

/* ── Separator line ── */
function Divider() {
  return (
    <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(33,74,79,0.12)' }} />
  );
}

/* ══════════════════════════════════════════════
   MAIN PRODUCT PAGE CLIENT
   ══════════════════════════════════════════════ */
export default function ProductPageClient({ product }: { product: ProductData }) {
  const [activeFinish, setActiveFinish] = useState<string>('dark-walnut');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFabric, setActiveFabric] = useState('wheat');
  const [activeSize, setActiveSize] = useState<string>('small');
  const [isFavorited, setIsFavorited] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const galleryImages = product.galleryImages;
  const finishKeys = Object.keys(product.images);

  const goToImage = (idx: number) => {
    setActiveImageIndex(idx);
    if (idx < finishKeys.length) {
      setActiveFinish(finishKeys[idx]);
    }
  };

  const prevImage = () => goToImage(activeImageIndex > 0 ? activeImageIndex - 1 : galleryImages.length - 1);
  const nextImage = () => goToImage(activeImageIndex < galleryImages.length - 1 ? activeImageIndex + 1 : 0);

  const currentFinishLabel = woodSwatches.find(s => s.name === activeFinish)?.label || '';
  const currentFabricLabel = fabricSwatches.find(s => s.name === activeFabric)?.label || '';
  const currentSizeLabel = activeSize === 'small' ? 'Small' : 'Large';

  return (
    <div style={{ paddingLeft: '75px' }}>
      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div style={{ display: 'flex', minHeight: '100vh' }}>

        {/* ═══════════════════════════════════
            LEFT: IMAGE GALLERY (~68%)
            ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={galleryRef}
          style={{
            flex: '0 0 68%',
            position: 'sticky',
            top: 0,
            height: '100vh',
            backgroundColor: '#EDEBE8',
            overflow: 'hidden',
          }}
        >
          {/* Main image */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryImages[activeImageIndex]}
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} - ${currentFinishLabel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </AnimatePresence>

            {/* Caption at bottom center - above controls */}
            <div style={{
              position: 'absolute',
              bottom: '4.5rem',
              left: 0,
              right: 0,
              textAlign: 'center',
              color: '#214A4F',
              fontSize: '0.75rem',
              letterSpacing: '0.02em',
              opacity: 0.6,
              fontWeight: 400,
            }}>
              {currentSizeLabel} in {currentFinishLabel}, {currentFabricLabel} Cushion
            </div>

            {/* Bottom controls bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 1.5rem',
            }}>
              {/* Left: Prev / Next arrows */}
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button
                  onClick={prevImage}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.85)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.85)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Center: Dots pagination */}
              <div style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}>
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    style={{
                      width: activeImageIndex === i ? '8px' : '6px',
                      height: activeImageIndex === i ? '8px' : '6px',
                      borderRadius: '50%',
                      border: 'none',
                      background: activeImageIndex === i ? '#214A4F' : 'rgba(33,74,79,0.25)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Right: Zoom / fullscreen button */}
              <button
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.85)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════
            RIGHT: PRODUCT INFO (~32%)
            ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            flex: '0 0 32%',
            overflowY: 'auto',
            height: '100vh',
            position: 'sticky',
            top: 0,
          }}
        >
          <div style={{ padding: '2.5rem 2.5rem 4rem 2rem' }}>

            {/* ── Product name ── */}
            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 300,
              color: '#214A4F',
              lineHeight: 1.1,
              letterSpacing: '0.01em',
              marginBottom: '0.35rem',
            }}>
              {product.name}
            </h1>

            {/* ── Subtitle ── */}
            <p style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#214A4F',
              opacity: 0.45,
              marginBottom: '0.5rem',
            }}>
              {product.slug === 'custom-orders' ? 'Ειδική παραγγελία' : 'Έπιπλο'}
            </p>

            {/* ── Favorite ── */}
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginBottom: '1rem',
                color: '#214A4F',
                fontSize: '0.72rem',
                opacity: 0.6,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill={isFavorited ? '#214A4F' : 'none'}
                stroke="#214A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transition: 'fill 0.3s ease' }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <span>+1 Αγαπημένο</span>
            </button>

            {/* ── Price ── */}
            <p style={{
              fontSize: '1.1rem',
              color: '#214A4F',
              fontWeight: 500,
              letterSpacing: '0.02em',
              marginBottom: '1.5rem',
            }}>
              {product.price}&euro;
            </p>

            <Divider />

            {/* ════════════ SIZE SELECTOR ════════════ */}
            <div style={{ padding: '1.5rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <p style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#214A4F',
                }}>
                  Επιλογή μεγέθους
                </p>
                <a href="#" style={{
                  fontSize: '0.65rem',
                  color: '#214A4F',
                  opacity: 0.5,
                  textDecoration: 'underline',
                  textUnderlineOffset: '2px',
                  fontWeight: 600,
                }}>
                  Δεν ξέρεις ποιο μέγεθος;
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[
                  { key: 'small', label: 'Μικρό' },
                  { key: 'large', label: 'Μεγάλο' },
                ].map(size => (
                  <button
                    key={size.key}
                    onClick={() => setActiveSize(size.key)}
                    style={{
                      padding: '0.6rem 1.75rem',
                      borderRadius: '50px',
                      border: activeSize === size.key ? '2px solid #214A4F' : '1px solid rgba(33,74,79,0.2)',
                      background: activeSize === size.key ? '#214A4F' : 'transparent',
                      color: activeSize === size.key ? '#FCFCFC' : '#214A4F',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            <Divider />

            {/* ════════════ FINISH SELECTOR ════════════ */}
            <div style={{ padding: '1.5rem 0' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '1rem',
              }}>
                Επιλογή φινιρίσματος
              </p>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                {woodSwatches.map((swatch) => (
                  <div key={swatch.name} style={{ textAlign: 'center', flex: '0 0 auto' }}>
                    <button
                      onClick={() => {
                        setActiveFinish(swatch.name);
                        const idx = finishKeys.indexOf(swatch.name);
                        if (idx !== -1) setActiveImageIndex(idx);
                      }}
                      style={{
                        width: '72px',
                        height: '48px',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        border: 'none',
                        cursor: 'pointer',
                        outline: activeFinish === swatch.name ? '2.5px solid #214A4F' : '2px solid rgba(33,74,79,0.12)',
                        outlineOffset: '3px',
                        transition: 'outline 0.3s ease',
                        position: 'relative',
                        padding: 0,
                        display: 'block',
                      }}
                    >
                      <img
                        src={swatch.image}
                        alt={swatch.label}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {activeFinish === swatch.name && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(33,74,79,0.3)',
                          borderRadius: '24px',
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </button>
                    <p style={{
                      fontSize: '0.6rem',
                      color: '#214A4F',
                      opacity: 0.55,
                      marginTop: '0.5rem',
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                    }}>
                      {swatch.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* ════════════ CUSHION FABRIC SELECTOR ════════════ */}
            <div style={{ padding: '1.5rem 0' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '0.25rem',
              }}>
                Επιλογή υφάσματος
              </p>
              <p style={{
                fontSize: '0.68rem',
                color: '#214A4F',
                opacity: 0.45,
                marginBottom: '1rem',
                lineHeight: 1.5,
              }}>
                Επιλέξτε από 4 διαθέσιμα και 14 κατόπιν παραγγελίας
              </p>

              {/* Fabric strip - horizontal row of fabric swatches like shoprooof */}
              <div style={{
                display: 'flex',
                gap: '0',
                overflow: 'hidden',
                borderRadius: '8px',
                cursor: 'pointer',
                border: '1px solid rgba(33,74,79,0.1)',
              }}>
                {fabricSwatches.map((fabric, i) => (
                  <button
                    key={fabric.name}
                    onClick={() => setActiveFabric(fabric.name)}
                    style={{
                      flex: 1,
                      height: '52px',
                      background: fabric.color,
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      padding: 0,
                      borderRight: i < fabricSwatches.length - 1 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {activeFabric === fabric.name && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(33,74,79,0.25)',
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="3" strokeLinecap="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {/* Selected fabric label */}
              <p style={{
                fontSize: '0.62rem',
                color: '#214A4F',
                opacity: 0.5,
                marginTop: '0.5rem',
                textAlign: 'center',
              }}>
                {currentFabricLabel}
              </p>
            </div>

            <Divider />

            {/* ════════════ VIEW IN 3D & AR ════════════ */}
            <div style={{ padding: '1.5rem 0' }}>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(33,74,79,0.05)' }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: '#214A4F',
                  border: '1.5px solid #214A4F',
                  borderRadius: '50px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                Προβολή σε 3D & AR
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 17l9.2-9.2M17 17V8h-9" />
                </svg>
              </motion.button>
            </div>

            {/* ════════════ ADD TO CART ════════════ */}
            <div style={{ marginBottom: '1rem' }}>
              <motion.button
                whileHover={{ backgroundColor: '#18363A' }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  padding: '0.95rem 1.25rem',
                  backgroundColor: '#214A4F',
                  color: '#FCFCFC',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                }}
              >
                Προσθήκη στο καλάθι
                {/* Cart icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </motion.button>
            </div>

            {/* Go to cart link */}
            <p style={{ textAlign: 'center', fontSize: '0.68rem', color: '#214A4F', opacity: 0.45, marginBottom: '2rem' }}>
              <a href="#" style={{ color: '#214A4F', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Μετάβαση στο καλάθι
              </a>
            </p>

            <Divider />

            {/* ════════════ ABOUT PRODUCT ════════════ */}
            <div style={{ padding: '1.5rem 0' }}>
              <button
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  color: '#214A4F',
                }}
              >
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  Σχετικά με {product.name}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div style={{ marginTop: '1rem' }}>
                <p style={{
                  fontSize: '0.78rem',
                  color: '#214A4F',
                  opacity: 0.65,
                  lineHeight: 1.8,
                }}>
                  {product.description}
                </p>
              </div>
            </div>

            <Divider />

            {/* ════════════ DIMENSIONS ════════════ */}
            <CollapsibleSection title="Διαστάσεις">
              <div style={{ fontSize: '0.78rem', color: '#214A4F', opacity: 0.65, lineHeight: 2 }}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 1, color: '#214A4F' }}>Μικρό</p>
                <p>85cm Μ × 50cm Π × 29cm Υ (15kg)</p>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem', marginTop: '1rem', opacity: 1, color: '#214A4F' }}>Μεγάλο</p>
                <p>123cm Μ × 50cm Π × 43cm Υ (23kg)</p>
              </div>
            </CollapsibleSection>

            <Divider />

            {/* ════════════ CARE INSTRUCTIONS ════════════ */}
            <CollapsibleSection title="Οδηγίες φροντίδας">
              <div style={{ fontSize: '0.78rem', color: '#214A4F', opacity: 0.65, lineHeight: 1.8 }}>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem', opacity: 1, color: '#214A4F' }}>Γενική συντήρηση</p>
                <p>Σκουπίστε με μαλακό πανί μικροϊνών για να αφαιρέσετε τη σκόνη. Αποφύγετε την έκθεση σε άμεσο ηλιακό φως.</p>
                <p style={{ fontWeight: 600, marginBottom: '0.25rem', marginTop: '1rem', opacity: 1, color: '#214A4F' }}>Καθαρισμός υφασμάτων</p>
                <p>Τα καλύμματα αφαιρούνται και πλένονται στο πλυντήριο στους 30°C.</p>
              </div>
            </CollapsibleSection>

            <Divider />

            {/* ════════════ YOU MIGHT ALSO LIKE ════════════ */}
            <div style={{ padding: '2rem 0 0 0' }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '1.25rem',
              }}>
                Μπορεί να σας αρέσει επίσης
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { name: 'PHANTIGO', slug: 'phantigo', image: '/dining-tables1.png' },
                  { name: 'VIOLET', slug: 'violet', image: '/wardrobes.png' },
                  { name: 'MAXIMILLIAN', slug: 'maximillian', image: '/sofa1.png' },
                ].filter(p => p.slug !== product.slug).slice(0, 3).map(p => (
                  <a key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      backgroundColor: '#E8E5E0',
                      marginBottom: '0.5rem',
                    }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                      />
                    </div>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#214A4F', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{p.name}</p>
                    <p style={{ fontSize: '0.6rem', color: '#214A4F', opacity: 0.5, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                      Προβολή
                    </p>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Collapsible section component ── */
function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: '#214A4F',
        }}
      >
        <span style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {title}
        </span>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#214A4F" strokeWidth="2" strokeLinecap="round"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ paddingTop: '1rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
