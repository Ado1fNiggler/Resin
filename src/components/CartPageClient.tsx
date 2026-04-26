'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { allProducts } from '@/data/products';
import styles from './CartPageClient.module.css';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '100 900', style: 'normal' }],
  display: 'swap',
});

const dihjauti = localFont({
  src: [{ path: '../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

const featured = ['phantigo', 'kronos', 'aegis', 'hermes']
  .map(slug => allProducts.find(p => p.slug === slug))
  .filter(Boolean) as typeof allProducts;

export default function CartPageClient() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, toggleFavorite, isFavorite } = useStore();

  const subtotal = cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const formatPrice = (n: number) =>
    n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.pageWrapper}>

      {/* ── Editorial Header ── */}
      <header className={`${styles.container} ${styles.pageHeader}`}>
        <div className={styles.headerRow}>
          <motion.h1
            className={`${narrenschiff.className} ${styles.pageTitle}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: slowEase }}
          >
            Καλάθι αγορών
          </motion.h1>
          <motion.div
            className={styles.headerMeta}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: slowEase }}
          >
            <span className={`${dihjauti.className} ${styles.headerEyebrow}`}>
              {cart.length === 0 ? 'Κατάσταση' : 'Σύνολο στο καλάθι'}
            </span>
            <span className={`${dihjauti.className} ${styles.headerCount}`}>
              {cart.length === 0
                ? '— · Άδειο'
                : `${cart.length} ${cart.length === 1 ? 'προϊόν' : 'προϊόντα'} · ${totalItems} τεμάχια`}
            </span>
          </motion.div>
        </div>
        <motion.div
          className={styles.headerLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: slowEase }}
          style={{ transformOrigin: 'left' }}
        />
      </header>

      {cart.length === 0 ? (
        <>
          {/* ══ EMPTY STATE ══ */}
          <section className={`${styles.container} ${styles.emptyLayout}`}>
            <motion.div
              className={styles.emptyLeft}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.3, ease: slowEase }}
            >
              <p className={`${dihjauti.className} ${styles.emptyEyebrow}`}>— Ξεκινήστε εδώ</p>
              <h2 className={`${narrenschiff.className} ${styles.emptyTitle}`}>
                Το καλάθι σας
                <em>είναι άδειο</em>
              </h2>
              <p className={styles.emptySub}>Κάθε αριστούργημα ξεκινά με μία επιλογή.</p>
              <motion.button
                className={`${dihjauti.className} ${styles.ctaOutline}`}
                onClick={() => router.push('/')}
                whileTap={{ scale: 0.98 }}
              >
                <span>Εξερευνήστε τη Συλλογή</span>
                <span className={styles.ctaArrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              className={styles.emptyRight}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: slowEase }}
            >
              <p className={`${dihjauti.className} ${styles.emptyRightEyebrow}`}>Επιλεγμένα προϊόντα</p>
              <div className={styles.miniGrid}>
                {featured.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    className={styles.miniCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: slowEase }}
                    onClick={() => router.push(`/product/${product.slug}`)}
                  >
                    <div className={styles.miniImageWrap}>
                      <img src={product.images['natural-oak']} alt={product.name} className={styles.miniImage} />
                    </div>
                    <p className={`${dihjauti.className} ${styles.miniName}`}>{product.name}</p>
                    <p className={styles.miniPrice}>
                      {product.price.match(/^\d/) ? `Από ${product.price}€` : product.price}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Values strip */}
          <motion.section
            className={styles.valuesStrip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.2, ease: slowEase }}
          >
            {[
              {
                label: 'Βιώσιμα Υλικά', sub: 'Πιστοποιημένο ξύλο FSC',
                icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13V4h7a7 7 0 0 1 7 7v9z"/><path d="M4 4c8 4 11 9 14 16"/></svg>,
              },
              {
                label: 'Εγγύηση 5 Ετών', sub: 'Σε όλα τα προϊόντα μας',
                icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><polyline points="9 12 11 14 15 10"/></svg>,
              },
              {
                label: 'Δωρεάν Αποστολή', sub: 'Για παραγγελίες άνω των €500',
                icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="13" height="10"/><path d="M15 10h4l2 3v4h-6"/><circle cx="6" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></svg>,
              },
              {
                label: '30 Ημέρες Επιστροφή', sub: 'Εύκολα και γρήγορα',
                icon: <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>,
              },
            ].map((v) => (
              <div key={v.label} className={styles.valueItem}>
                <span className={styles.valueIconWrap}>{v.icon}</span>
                <p className={`${dihjauti.className} ${styles.valueLabel}`}>{v.label}</p>
                <p className={styles.valueSub}>{v.sub}</p>
              </div>
            ))}
          </motion.section>
        </>
      ) : (
        /* ══ FILLED STATE ══ */
        <section className={`${styles.container} ${styles.cartLayout}`}>

          {/* Items column */}
          <div className={styles.cartItems}>
            {cart.map((item, i) => {
              const product = allProducts.find(p => p.slug === item.slug);
              const categoryLabel = product?.categoryName ?? '';
              const unitNum = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
              const itemTotal = isNaN(unitNum) ? item.price : formatPrice(unitNum * item.quantity);

              return (
                <motion.article
                  key={`${item.slug}-${item.finish}`}
                  className={styles.cartRow}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.5 + i * 0.15, ease: slowEase }}
                >
                  {/* Image */}
                  <div className={styles.rowImageWrap} onClick={() => router.push(`/product/${item.slug}`)}>
                    <img src={item.image} alt={item.name} className={styles.rowImage} />
                  </div>

                  {/* Details */}
                  <div className={styles.rowDetails}>
                    {categoryLabel && (
                      <p className={`${dihjauti.className} ${styles.rowCategory}`}>{categoryLabel}</p>
                    )}
                    <h2
                      className={`${narrenschiff.className} ${styles.rowName}`}
                      onClick={() => router.push(`/product/${item.slug}`)}
                    >
                      {item.name}
                    </h2>

                    {/* Spec pills */}
                    <div className={styles.rowPills}>
                      <span className={`${dihjauti.className} ${styles.pill}`}>
                        <span className={styles.pillLabel}>Φινίρισμα</span>
                        <span className={styles.pillValue}>{item.finish}</span>
                      </span>
                      {item.fabric && (
                        <span className={`${dihjauti.className} ${styles.pill}`}>
                          <span className={styles.pillLabel}>Ύφασμα</span>
                          <span className={styles.pillValue}>{item.fabric}</span>
                        </span>
                      )}
                      {/* Quantity pill with inline controls */}
                      <span className={`${dihjauti.className} ${styles.pillQty}`}>
                        <span className={styles.pillLabel}>Ποσότητα</span>
                        <button
                          className={styles.pillQBtn}
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          aria-label="Μείωση"
                        >−</button>
                        <span className={styles.pillQVal}>{item.quantity}</span>
                        <button
                          className={styles.pillQBtn}
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          aria-label="Αύξηση"
                        >+</button>
                      </span>
                    </div>

                    {/* Ghost links */}
                    <div className={styles.rowGhostRow}>
                      <button
                        className={`${dihjauti.className} ${styles.ghostLink}`}
                        onClick={() => toggleFavorite({ slug: item.slug, name: item.name, price: item.price, image: item.image })}
                      >
                        {isFavorite(item.slug) ? 'Στα Αγαπημένα' : 'Αγαπημένα'}
                      </button>
                      <span className={styles.ghostDot}>·</span>
                      <button
                        className={`${dihjauti.className} ${styles.ghostLink}`}
                        onClick={() => removeFromCart(item.slug)}
                      >
                        Αφαίρεση
                      </button>
                    </div>
                  </div>

                  {/* Price column */}
                  <div className={styles.rowPriceCol}>
                    <span className={`${dihjauti.className} ${styles.rowPrice}`}>€ {itemTotal}</span>
                    {item.quantity > 1 && (
                      <span className={`${dihjauti.className} ${styles.rowPriceUnit}`}>€ {item.price} / τμχ</span>
                    )}
                  </div>
                </motion.article>
              );
            })}

            {/* Continue shopping */}
            <motion.div
              className={styles.continueRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.6 + cart.length * 0.15, ease: slowEase }}
            >
              <button className={`${dihjauti.className} ${styles.continueLink}`} onClick={() => router.push('/')}>
                <span className={styles.continueLinkArrow}>←</span>
                Συνέχεια αγορών
              </button>
            </motion.div>
          </div>

          {/* ── Sticky summary card ── */}
          <motion.aside
            className={styles.summaryCard}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: slowEase }}
          >
            <p className={`${dihjauti.className} ${styles.summaryEyebrow}`}>Σύνοψη Παραγγελίας</p>

            <div className={styles.summaryRow}>
              <span className={`${dihjauti.className} ${styles.summaryRowLabel}`}>Υποσύνολο</span>
              <span className={`${dihjauti.className} ${styles.summaryRowValue}`}>€ {formatPrice(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={`${dihjauti.className} ${styles.summaryRowLabel}`}>Αποστολή</span>
              <span className={`${dihjauti.className} ${styles.summaryRowValue}`}>— Κατά την ολοκλήρωση</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
              <span className={`${dihjauti.className} ${styles.summaryTotalLabel}`}>Σύνολο</span>
              <span className={`${dihjauti.className} ${styles.summaryTotalValue}`}>€ {formatPrice(subtotal)}</span>
            </div>

            <p className={styles.summaryShipNote}>
              Δωρεάν παράδοση κατ' οίκον σε όλη την Ελλάδα για παραγγελίες άνω των €500.
            </p>

            <motion.button
              className={`${dihjauti.className} ${styles.cta}`}
              onClick={() => router.push('/checkout')}
              whileTap={{ scale: 0.98 }}
            >
              <span>Ολοκλήρωση Παραγγελίας</span>
              <span className={styles.ctaArrow}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </motion.button>

            {/* Trust badges */}
            <div className={styles.trustRow}>
              <div className={styles.trust}>
                <span className={styles.trustIconWrap}>
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                  </svg>
                </span>
                <span className={`${dihjauti.className} ${styles.trustLabel}`}>Ασφαλής<br/>πληρωμή</span>
              </div>
              <div className={styles.trust}>
                <span className={styles.trustIconWrap}>
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="13" height="10"/><path d="M15 10h4l2 3v4h-6"/><circle cx="6" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/>
                  </svg>
                </span>
                <span className={`${dihjauti.className} ${styles.trustLabel}`}>Παράδοση<br/>κατ' οίκον</span>
              </div>
              <div className={styles.trust}>
                <span className={styles.trustIconWrap}>
                  <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
                  </svg>
                </span>
                <span className={`${dihjauti.className} ${styles.trustLabel}`}>30 μέρες<br/>επιστροφή</span>
              </div>
            </div>
          </motion.aside>
        </section>
      )}
    </div>
  );
}
