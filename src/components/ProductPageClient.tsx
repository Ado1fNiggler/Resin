'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductData } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import styles from './ProductPageClient.module.css';

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
  return <div className={styles.divider} />;
}

/* ══════════════════════════════════════════════
   MAIN PRODUCT PAGE CLIENT
   ══════════════════════════════════════════════ */
export default function ProductPageClient({ product }: { product: ProductData }) {
  const [activeFinish, setActiveFinish] = useState<string>('dark-walnut');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeFabric, setActiveFabric] = useState('wheat');
  const [activeSize, setActiveSize] = useState<string>('small');
  const { addToCart, toggleFavorite, isFavorite } = useStore();
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
    <div className={styles.pageWrapper}>
      {/* ─── FULLSCREEN IMAGE WITH FLOATING INFO CARD ─── */}
      <div className={styles.heroSection}>

        {/* ═══════════════════════════════════
            FULLSCREEN IMAGE GALLERY
            ═══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          ref={galleryRef}
          className={styles.galleryContainer}
        >
          {/* Main image */}
          <div className={styles.galleryImageWrap}>
            <AnimatePresence mode="wait">
              <motion.img
                key={galleryImages[activeImageIndex]}
                src={galleryImages[activeImageIndex]}
                alt={`${product.name} - ${currentFinishLabel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.galleryImage}
              />
            </AnimatePresence>

            {/* Caption at bottom center - above controls */}
            <div className={styles.caption}>
              {currentSizeLabel} in {currentFinishLabel}, {currentFabricLabel} Cushion
            </div>

            {/* Bottom controls bar */}
            <div className={styles.controlsBar}>
              {/* Left: Prev / Next arrows */}
              <div className={styles.arrowGroup}>
                <button onClick={prevImage} className={styles.roundButton}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button onClick={nextImage} className={styles.roundButton}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Center: Dots pagination */}
              <div className={styles.dotsContainer}>
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToImage(i)}
                    className={styles.dot}
                    style={{
                      width: activeImageIndex === i ? '8px' : '6px',
                      height: activeImageIndex === i ? '8px' : '6px',
                      background: activeImageIndex === i ? '#214A4F' : 'rgba(33,74,79,0.25)',
                    }}
                  />
                ))}
              </div>

              {/* Right: Zoom / fullscreen button */}
              <button className={styles.roundButton}>
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
          className={styles.floatingCard}
        >
          <div className={styles.cardContent}>

            {/* ── Header: Title + Favorite ── */}
            <div className={styles.cardHeader}>
              <h1 className={styles.productTitle}>
                {product.name}
              </h1>
              <button
                onClick={() => toggleFavorite({
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.galleryImages[0],
                })}
                className={styles.favoriteButton}
              >
                <svg width="22" height="22" viewBox="0 0 24 24"
                  fill={isFavorite(product.slug) ? '#214A4F' : 'none'}
                  stroke="#214A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>

            {/* ── Subtitle ── */}
            <p className={styles.subtitle}>
              {product.slug === 'custom-orders' ? 'ΕΙΔΙΚΗ ΠΑΡΑΓΓΕΛΙΑ' : 'ΕΠΙΠΛΟ'}
            </p>

            {/* ── Price + Rating ── */}
            <div className={styles.priceRow}>
              <p className={styles.price}>
                € {product.price}
              </p>
              <div className={styles.ratingWrap}>
                <span className={styles.ratingNumber}>5</span>
                <div className={styles.starsRow}>
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
            <div className={styles.selectorSection}>
              <p className={styles.selectorLabel}>
                CHOOSE SIZE
              </p>
              <button className={styles.sizeButton}>
                One Size
              </button>
            </div>

            <Divider />

            {/* ════════════ FINISH SELECTOR ════════════ */}
            <div className={styles.selectorSection}>
              <p className={styles.selectorLabelWide}>
                CHOOSE FINISH
              </p>
              <div className={styles.finishSwatchesRow}>
                {woodSwatches.map((swatch) => (
                  <div key={swatch.name} className={styles.swatchItem}>
                    <button
                      onClick={() => {
                        setActiveFinish(swatch.name);
                        const idx = finishKeys.indexOf(swatch.name);
                        if (idx !== -1) setActiveImageIndex(idx);
                      }}
                      className={styles.swatchButton}
                      style={{
                        border: activeFinish === swatch.name ? '2px solid #214A4F' : '2px solid transparent',
                      }}
                    >
                      <img
                        src={swatch.image}
                        alt={swatch.label}
                        className={styles.swatchImage}
                      />
                    </button>
                    <p
                      className={styles.swatchLabel}
                      style={{
                        opacity: activeFinish === swatch.name ? 1 : 0.5,
                        fontWeight: activeFinish === swatch.name ? 600 : 400,
                      }}
                    >
                      {swatch.label.split(' ').map((word, i) => <span key={i}>{word}<br/></span>)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            {/* ════════════ CUSHION FABRIC SELECTOR ════════════ */}
            <div className={styles.selectorSection}>
              <p className={styles.selectorLabel}>
                CHOOSE CUSHION FABRIC
              </p>
              <p className={styles.fabricSubtext}>
                Select from 4 in-stock and 14 special order fabrics
              </p>

              {/* Fabric strip using textures.png image */}
              <div className={styles.fabricStrip}>
                <img
                  src="/textures.png"
                  alt="Fabric textures"
                  className={styles.fabricStripImage}
                />
              </div>
            </div>

            <Divider />

            {/* ════════════ VIEW IN 3D & AR ════════════ */}
            <div className={styles.ctaSection}>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(33,74,79,0.04)' }}
                transition={{ duration: 0.2 }}
                className={styles.viewArButton}
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
                className={styles.addToCartButton}
                onClick={() => {
                  const finishLabel = woodSwatches.find(s => s.name === activeFinish)?.label || activeFinish;
                  const fabricLabel = fabricSwatches.find(s => s.name === activeFabric)?.label || activeFabric;
                  addToCart({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.galleryImages[activeImageIndex] || product.galleryImages[0],
                    finish: finishLabel,
                    fabric: fabricLabel,
                  });
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
      <div className={styles.belowImageContent}>
        {/* ════════════ ABOUT PRODUCT ════════════ */}
        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>
            Σχετικά με {product.name}
          </h2>
          <p className={styles.sectionText}>
            {product.description}
          </p>
        </div>

        <Divider />

        {/* ════════════ DIMENSIONS ════════════ */}
        <div className={styles.contentSection}>
          <h3 className={styles.subSectionTitle}>
            Διαστάσεις
          </h3>
          <div className={styles.twoColumnGrid}>
            <div>
              <p className={styles.dimLabel}>Μικρό</p>
              <p className={styles.dimValue}>85cm Μ × 50cm Π × 29cm Υ<br />Βάρος: 15kg</p>
            </div>
            <div>
              <p className={styles.dimLabel}>Μεγάλο</p>
              <p className={styles.dimValue}>123cm Μ × 50cm Π × 43cm Υ<br />Βάρος: 23kg</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ════════════ CARE INSTRUCTIONS ════════════ */}
        <div className={styles.contentSection}>
          <h3 className={styles.subSectionTitle}>
            Οδηγίες φροντίδας
          </h3>
          <div className={styles.twoColumnGrid}>
            <div>
              <p className={styles.dimLabel}>Γενική συντήρηση</p>
              <p className={styles.dimValue}>
                Σκουπίστε με μαλακό πανί μικροϊνών για να αφαιρέσετε τη σκόνη. Αποφύγετε την έκθεση σε άμεσο ηλιακό φως.
              </p>
            </div>
            <div>
              <p className={styles.dimLabel}>Καθαρισμός υφασμάτων</p>
              <p className={styles.dimValue}>
                Τα καλύμματα αφαιρούνται και πλένονται στο πλυντήριο στους 30°C.
              </p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ════════════ YOU MIGHT ALSO LIKE ════════════ */}
        <div className={styles.relatedSection}>
          <h3 className={styles.subSectionTitle}>
            Μπορεί να σας αρέσει επίσης
          </h3>
          <div className={styles.threeColumnGrid}>
            {[
              { name: 'PHANTIGO', slug: 'phantigo', image: '/armchairs1.png' },
              { name: 'VIOLET', slug: 'violet', image: '/sofas.png' },
              { name: 'MAXIMILLIAN', slug: 'maximillian', image: '/dining-tables1.png' },
              { name: 'HUXTON', slug: 'huxton', image: '/wardrobes.png' },
            ].filter(p => p.slug !== product.slug).slice(0, 3).map(p => (
              <a key={p.slug} href={`/product/${p.slug}`} className={styles.relatedLink}>
                <div className={styles.relatedImageWrap}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className={styles.relatedImage}
                  />
                </div>
                <p className={styles.relatedName}>{p.name}</p>
                <p className={styles.relatedViewText}>
                  Προβολή
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Footer spacing */}
        <div className={styles.footerSpacer} />
      </div>
    </div>
  );
}

/* ── Collapsible section component ── */
function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.collapsibleSection}>
      <button
        onClick={() => setOpen(!open)}
        className={styles.collapsibleButton}
      >
        <span className={styles.collapsibleTitle}>
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
      <div
        className={styles.collapsibleContent}
        style={{ maxHeight: open ? '600px' : '0' }}
      >
        <div className={styles.collapsibleInner}>
          {children}
        </div>
      </div>
    </div>
  );
}
