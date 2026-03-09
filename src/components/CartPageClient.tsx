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

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useStore();

  /* Calculate subtotal – parse price string like "1.250" or "890" */
  const subtotal = cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const formatPrice = (n: number) =>
    n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className={styles.pageWrapper}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.h1
          className={`${narrenschiff.className} ${styles.heroTitle}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Καλάθι
        </motion.h1>
      </section>

      {cart.length === 0 ? (
        /* ── Empty State ── */
        <section className={styles.emptySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 32px', opacity: 0.3, display: 'block' }}>
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
            <a href="/" className={styles.ctaLink} onClick={(e) => { e.preventDefault(); router.push('/'); }}>
              Εξερευνήστε τη Συλλογή
            </a>
          </motion.div>
        </section>
      ) : (
        /* ── Cart Items ── */
        <section className={styles.cartSection}>
          {cart.map((item, i) => (
            <motion.div
              key={`${item.slug}-${item.finish}`}
              className={styles.cartItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>
                <p className={styles.itemMeta}>Φινίρισμα: {item.finish}</p>
                <p className={styles.itemMeta}>Ύφασμα: {item.fabric}</p>
                <p className={styles.itemPrice}>€ {item.price}</p>

                <div className={styles.quantityRow}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.slug)}
                  >
                    Αφαίρεση
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* ── Summary ── */}
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
                <span className={styles.subtotalLabel}>Σύνολο</span>
                <span className={styles.subtotalValue}>€ {formatPrice(subtotal)}</span>
              </div>
              <button className={styles.checkoutBtn}>
                Ολοκλήρωση Παραγγελίας
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
