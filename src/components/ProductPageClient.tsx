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
      {/* ─── FULLSCREEN IMAGE WITH FLOATING INFO CARD ─── */}
      <div style={{ position: 'relative', minHeight: '100vh' }}>

        {/* ═══════════════════════════════════
            FULLSCREEN IMAGE GALLERY
            ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={galleryRef}
          style={{
            position: 'fixed',
            top: 0,
            left: '75px',
            right: 0,
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
            RIGHT: PRODUCT INFO (floating card)
            ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            position: 'absolute',
            right: '2.5rem',
            top: '1.5rem',
            bottom: '1.5rem',
            width: '420px',
            backgroundColor: '#FCFCFC',
            borderRadius: '12px',
            boxShadow: '0 8px 60px rgba(0,0,0,0.12)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ padding: '1.75rem 2rem 1.5rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* ── Header: Title + Favorite ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.15rem' }}>
              <h1 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '2rem',
                fontWeight: 400,
                color: '#214A4F',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}>
                {product.name}
              </h1>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  marginTop: '4px',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24"
                  fill={isFavorited ? '#214A4F' : 'none'}
                  stroke="#214A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* ── Subtitle ── */}
            <p style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#214A4F',
              opacity: 0.5,
              marginBottom: '0.75rem',
            }}>
              {product.slug === 'custom-orders' ? 'ΕΙΔΙΚΗ ΠΑΡΑΓΓΕΛΙΑ' : 'ΕΠΙΠΛΟ'}
            </p>

            {/* ── Price + Rating ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <p style={{
                fontSize: '1.15rem',
                color: '#214A4F',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}>
                € {product.price}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#214A4F', fontWeight: 500 }}>5</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#214A4F" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <Divider />

            {/* ════════════ SIZE SELECTOR ════════════ */}
            <div style={{ padding: '1rem 0' }}>
              <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '0.6rem',
              }}>
                CHOOSE SIZE
              </p>
              <button
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '50px',
                  border: 'none',
                  background: '#214A4F',
                  color: '#FCFCFC',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                }}
              >
                One Size
              </button>
            </div>

            <Divider />

            {/* ════════════ FINISH SELECTOR ════════════ */}
            <div style={{ padding: '1rem 0' }}>
              <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '0.75rem',
              }}>
                CHOOSE FINISH
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                {woodSwatches.map((swatch) => (
                  <div key={swatch.name} style={{ textAlign: 'center', flex: '1' }}>
                    <button
                      onClick={() => {
                        setActiveFinish(swatch.name);
                        const idx = finishKeys.indexOf(swatch.name);
                        if (idx !== -1) setActiveImageIndex(idx);
                      }}
                      style={{
                        width: '100%',
                        height: '42px',
                        borderRadius: '21px',
                        overflow: 'hidden',
                        border: activeFinish === swatch.name ? '2px solid #214A4F' : '2px solid transparent',
                        cursor: 'pointer',
                        position: 'relative',
                        padding: 0,
                        display: 'block',
                        transition: 'border 0.2s ease',
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
                    </button>
                    <p style={{
                      fontSize: '0.65rem',
                      color: '#214A4F',
                      opacity: activeFinish === swatch.name ? 1 : 0.5,
                      marginTop: '0.5rem',
                      lineHeight: 1.2,
                      fontWeight: activeFinish === swatch.name ? 600 : 400,
                    }}>
                      {swatch.label.split(' ').map((word, i) => <span key={i}>{word}<br/></span>)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* ════════════ CUSHION FABRIC SELECTOR ════════════ */}
            <div style={{ padding: '1rem 0' }}>
              <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#214A4F',
                marginBottom: '0.2rem',
              }}>
                CHOOSE CUSHION FABRIC
              </p>
              <p style={{
                fontSize: '0.68rem',
                color: '#214A4F',
                opacity: 0.5,
                marginBottom: '0.75rem',
              }}>
                Select from 4 in-stock and 14 special order fabrics
              </p>

              {/* Fabric strip using textures.png image */}
              <div style={{
                width: '100%',
                height: '42px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                <img
                  src="/textures.png"
                  alt="Fabric textures"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            <Divider />

            {/* ════════════ VIEW IN 3D & AR ════════════ */}
            <div style={{ padding: '1rem 0 0.5rem 0', marginTop: 'auto' }}>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(33,74,79,0.04)' }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%',
                  padding: '0.8rem 1.25rem',
                  backgroundColor: 'transparent',
                  color: '#214A4F',
                  border: '1.5px solid rgba(33,74,79,0.2)',
                  borderRadius: '50px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>VIEW PRODUCT IN 3D & AR</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2" strokeLinecap="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </div>

            {/* ════════════ ADD TO CART ════════════ */}
            <div>
              <motion.button
                whileHover={{ backgroundColor: '#18363A' }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.25rem',
                  backgroundColor: '#214A4F',
                  color: '#FCFCFC',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>ADD TO CART</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </motion.button>
            </div>

          </div>
        </motion.div>

      </div>

      {/* ═══════════════════════════════════════════════════════
          BELOW IMAGE SECTIONS (About, Dimensions, Care, Related)
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        marginTop: '100vh',
        backgroundColor: '#FCFCFC',
        position: 'relative',
        zIndex: 5,
      }}>
        {/* ════════════ ABOUT PRODUCT ════════════ */}
        <div style={{
          padding: '5rem 4rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            color: '#214A4F',
            marginBottom: '2rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Σχετικά με {product.name}
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#214A4F',
            opacity: 0.7,
            lineHeight: 2,
          }}>
            {product.description}
          </p>
        </div>

        <Divider />

        {/* ════════════ DIMENSIONS ════════════ */}
        <div style={{
          padding: '4rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#214A4F',
            marginBottom: '2rem',
          }}>
            Διαστάσεις
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: '#214A4F', marginBottom: '0.5rem' }}>Μικρό</p>
              <p style={{ color: '#214A4F', opacity: 0.6, lineHeight: 1.8 }}>85cm Μ × 50cm Π × 29cm Υ<br />Βάρος: 15kg</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: '#214A4F', marginBottom: '0.5rem' }}>Μεγάλο</p>
              <p style={{ color: '#214A4F', opacity: 0.6, lineHeight: 1.8 }}>123cm Μ × 50cm Π × 43cm Υ<br />Βάρος: 23kg</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ════════════ CARE INSTRUCTIONS ════════════ */}
        <div style={{
          padding: '4rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#214A4F',
            marginBottom: '2rem',
          }}>
            Οδηγίες φροντίδας
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: '#214A4F', marginBottom: '0.5rem' }}>Γενική συντήρηση</p>
              <p style={{ color: '#214A4F', opacity: 0.6, lineHeight: 1.8 }}>
                Σκουπίστε με μαλακό πανί μικροϊνών για να αφαιρέσετε τη σκόνη. Αποφύγετε την έκθεση σε άμεσο ηλιακό φως.
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, color: '#214A4F', marginBottom: '0.5rem' }}>Καθαρισμός υφασμάτων</p>
              <p style={{ color: '#214A4F', opacity: 0.6, lineHeight: 1.8 }}>
                Τα καλύμματα αφαιρούνται και πλένονται στο πλυντήριο στους 30°C.
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ════════════ YOU MIGHT ALSO LIKE ════════════ */}
        <div style={{
          padding: '4rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h3 style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#214A4F',
            marginBottom: '2.5rem',
          }}>
            Μπορεί να σας αρέσει επίσης
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { name: 'PHANTIGO', slug: 'phantigo', image: '/armchairs1.png' },
              { name: 'VIOLET', slug: 'violet', image: '/sofas.png' },
              { name: 'MAXIMILLIAN', slug: 'maximillian', image: '/dining-tables1.png' },
              { name: 'HUXTON', slug: 'huxton', image: '/wardrobes.png' },
            ].filter(p => p.slug !== product.slug).slice(0, 3).map(p => (
              <a key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  backgroundColor: '#EDEBE8',
                  marginBottom: '1rem',
                }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                  />
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#214A4F', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>{p.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#214A4F', opacity: 0.5, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  Προβολή
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Footer spacing */}
        <div style={{ height: '4rem' }} />
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
