'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import styles from './FavoritesPageClient.module.css';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

export default function FavoritesPageClient() {
  const router = useRouter();
  const { favorites, removeFavorite, addToCart } = useStore();

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
          Αγαπημένα
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Αποθηκεύστε τα αγαπημένα σας κομμάτια για εύκολη πρόσβαση αργότερα.
        </motion.p>
      </section>

      {favorites.length === 0 ? (
        /* ── Empty State ── */
        <section className={styles.emptySection}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 32px', opacity: 0.3, display: 'block' }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
            <h2 className={styles.emptyTitle}>
              Δεν έχετε αγαπημένα ακόμα
            </h2>
            <p className={styles.emptyText}>
              Περιηγηθείτε στη συλλογή μας και πατήστε το εικονίδιο καρδιάς σε οποιοδήποτε προϊόν
              για να το αποθηκεύσετε στα αγαπημένα σας.
            </p>
            <a href="/" className={styles.ctaLink} onClick={(e) => { e.preventDefault(); router.push('/'); }}>
              Εξερευνήστε τη Συλλογή
            </a>
          </motion.div>
        </section>
      ) : (
        /* ── Favorites Grid ── */
        <section className={styles.gridSection}>
          <p className={styles.countText}>
            {favorites.length} {favorites.length === 1 ? 'προϊόν' : 'προϊόντα'}
          </p>
          <div className={styles.grid}>
            {favorites.map((item, i) => (
              <motion.div
                key={item.slug}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div
                  className={styles.imageWrap}
                  onClick={() => router.push(`/product/${item.slug}`)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.productImage}
                  />
                  {/* Heart remove button */}
                  <button
                    className={styles.heartBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(item.slug);
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24"
                      fill="#214A4F" stroke="#214A4F" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productPrice}>€ {item.price}</p>
                <div className={styles.cardActions}>
                  <a
                    href={`/product/${item.slug}`}
                    className={styles.viewLink}
                    onClick={(e) => { e.preventDefault(); router.push(`/product/${item.slug}`); }}
                  >
                    Προβολή
                  </a>
                  <button
                    className={styles.addCartBtn}
                    onClick={() => {
                      addToCart({
                        slug: item.slug,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        finish: 'Dark Walnut',
                        fabric: 'Wheat',
                      });
                    }}
                  >
                    Στο Καλάθι
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
