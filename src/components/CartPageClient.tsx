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
      {/* Title – white background, no hero */}
      <motion.h1
        className={`${narrenschiff.className} ${styles.pageTitle}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Καλάθι αγορών
      </motion.h1>

      {cart.length === 0 ? (
        /* ── Empty State ── */
        <section className={styles.emptySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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
            <a href="/" className={`${dihjauti.className} ${styles.ctaLink}`} onClick={(e) => { e.preventDefault(); router.push('/'); }}>
              <span>Εξερευνήστε τη Συλλογή</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>
        </section>
      ) : (
        /* ── Cart Content ── */
        <section className={styles.cartSection}>
          {/* Column headers */}
          <div className={styles.columnHeaders}>
            <span className={`${dihjauti.className} ${styles.colLabel}`}>ΣΤΟ ΚΑΛΑΘΙ</span>
            <span className={`${dihjauti.className} ${styles.colLabel}`}>ΤΙΜΗ</span>
          </div>

          {/* Separator */}
          <div className={styles.headerLine} />

          {/* Cart Items */}
          {cart.map((item, i) => (
            <motion.div
              key={`${item.slug}-${item.finish}`}
              className={styles.cartItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className={styles.itemImageWrap}
                onClick={() => router.push(`/product/${item.slug}`)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              </div>

              <div className={styles.itemDetails}>
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
              </div>

              {/* Price + Remove */}
              <div className={styles.itemRight}>
                <span className={`${dihjauti.className} ${styles.itemPrice}`}>
                  &euro; {item.price}
                </span>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.slug)}
                >
                  Αφαίρεση &times;
                </button>
              </div>
            </motion.div>
          ))}

          {/* ── Summary ── */}
          <div className={styles.summaryLine} />

          <div className={styles.summary}>
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
                <span className={`${dihjauti.className} ${styles.subtotalValue}`}>&euro; {formatPrice(subtotal)}</span>
              </div>
              <p className={styles.shippingNote}>
                Τα έξοδα αποστολής υπολογίζονται κατά την ολοκλήρωση
              </p>
              <button
                className={`${dihjauti.className} ${styles.checkoutBtn}`}
                onClick={() => {/* checkout logic */}}
              >
                <span>Ολοκλήρωση Παραγγελίας</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
