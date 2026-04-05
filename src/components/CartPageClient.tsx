'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import styles from './CartPageClient.module.css';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const dihjauti = localFont({
  src: [{ path: '../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
  variable: '--font-dihjauti',
});

/* Slow ease-out curve for luxury feel */
const slowEase = [0.16, 1, 0.3, 1] as const;

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, toggleFavorite, isFavorite } = useStore();

  /* Calculate subtotal */
  const subtotal = cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const formatPrice = (n: number) =>
    n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className={styles.pageWrapper}>
      {/* Title – slow slide from left */}
      <motion.h1
        className={`${narrenschiff.className} ${styles.pageTitle}`}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: slowEase }}
      >
        Καλάθι αγορών
      </motion.h1>

      {cart.length === 0 ? (
        /* ── Empty State ── */
        <section className={styles.emptySection}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: slowEase }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.emptyIcon}>
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <h2 className={styles.emptyTitle}>
              Το καλάθι σας είναι άδειο
            </h2>
            <p className={styles.emptyText}>
              Ανακαλύψτε τη συλλογή μας και προσθέστε τα αγαπημένα σας κομμάτια στο καλάθι.
            </p>
            <motion.a
              href="/"
              className={`${dihjauti.className} ${styles.ctaLink}`}
              onClick={(e) => { e.preventDefault(); router.push('/'); }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: slowEase }}
            >
              <span>Εξερευνήστε τη Συλλογή</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.a>
          </motion.div>
        </section>
      ) : (
        /* ── Cart Content ── */
        <section className={styles.cartSection}>
          {/* Column headers – slide in from left */}
          <motion.div
            className={styles.columnHeaders}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: slowEase }}
          >
            <span className={`${dihjauti.className} ${styles.colLabel}`}>ΣΤΟ ΚΑΛΑΘΙ</span>
            <span className={`${dihjauti.className} ${styles.colLabel}`}>ΤΙΜΗ</span>
          </motion.div>

          {/* Separator – width reveal */}
          <motion.div
            className={styles.headerLine}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: slowEase }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Cart Items – staggered slow slide up */}
          {cart.map((item, i) => (
            <motion.div
              key={`${item.slug}-${item.finish}`}
              className={styles.cartItem}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.6 + i * 0.15, ease: slowEase }}
            >
              {/* Image – slides from left */}
              <motion.div
                className={styles.itemImageWrap}
                onClick={() => router.push(`/product/${item.slug}`)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.8 + i * 0.15, ease: slowEase }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              </motion.div>

              {/* Details – slides from bottom */}
              <motion.div
                className={styles.itemDetails}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.9 + i * 0.15, ease: slowEase }}
              >
                <h3
                  className={`${narrenschiff.className} ${styles.itemName}`}
                  onClick={() => router.push(`/product/${item.slug}`)}
                >
                  {item.name}
                </h3>

                {/* Variation details */}
                <div className={styles.variationGrid}>
                  <span className={styles.varLabel}>Φινίρισμα</span>
                  <span className={`${dihjauti.className} ${styles.varValue}`}>{item.finish.toUpperCase()}</span>
                  <span className={styles.varLabel}>Ύφασμα</span>
                  <span className={`${dihjauti.className} ${styles.varValue}`}>{item.fabric.toUpperCase()}</span>
                  <span className={styles.varLabel}>Ποσότητα</span>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      aria-label="Μείωση ποσότητας"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      aria-label="Αύξηση ποσότητας"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.2" />
                        <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Add to Favorites link */}
                <button
                  className={styles.favLink}
                  onClick={() => toggleFavorite({ slug: item.slug, name: item.name, price: item.price, image: item.image })}
                >
                  {isFavorite(item.slug) ? 'Στα Αγαπημένα' : 'Προσθήκη στα Αγαπημένα'}
                </button>
              </motion.div>

              {/* Price + Remove – slides from right */}
              <motion.div
                className={styles.itemRight}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.9 + i * 0.15, ease: slowEase }}
              >
                <span className={`${dihjauti.className} ${styles.itemPrice}`}>
                  &euro; {item.price}
                </span>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.slug)}
                >
                  Αφαίρεση &times;
                </button>
              </motion.div>
            </motion.div>
          ))}

          {/* ── Summary – line reveals then content slides up ── */}
          <motion.div
            className={styles.summaryLine}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.8 + cart.length * 0.15, ease: slowEase }}
            style={{ transformOrigin: 'right' }}
          />

          <motion.div
            className={styles.summary}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.0 + cart.length * 0.15, ease: slowEase }}
          >
            <div className={styles.summaryLeft}>
              <a
                href="/"
                className={styles.continueLink}
                onClick={(e) => { e.preventDefault(); router.push('/'); }}
              >
                Συνέχεια αγορών
              </a>
            </div>
            <div className={styles.summaryRight}>
              <div className={styles.subtotalRow}>
                <span className={`${dihjauti.className} ${styles.subtotalLabel}`}>ΣΥΝΟΛΟ:</span>
                <motion.span
                  className={`${dihjauti.className} ${styles.subtotalValue}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 + cart.length * 0.15, ease: slowEase }}
                >
                  &euro; {formatPrice(subtotal)}
                </motion.span>
              </div>
              <p className={styles.shippingNote}>
                Τα έξοδα αποστολής υπολογίζονται κατά την ολοκλήρωση
              </p>
              <motion.button
                className={`${dihjauti.className} ${styles.checkoutBtn}`}
                onClick={() => router.push('/checkout')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 + cart.length * 0.15, ease: slowEase }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Ολοκλήρωση Παραγγελίας</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}
