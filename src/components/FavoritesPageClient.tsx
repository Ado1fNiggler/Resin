'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { allProducts, categories } from '@/data/products';
import styles from './FavoritesPageClient.module.css';

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

const slowEase = [0.16, 1, 0.3, 1] as const;

const featured = ['aurora', 'lyra', 'kronion', 'theron', 'agora', 'elara']
  .map(slug => allProducts.find(p => p.slug === slug))
  .filter(Boolean) as typeof allProducts;

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
          transition={{ duration: 0.8, ease: slowEase }}
        >
          Αγαπημένα
        </motion.h1>
        <motion.p
          className={styles.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {favorites.length === 0
            ? 'Αποθηκεύστε τα αγαπημένα σας κομμάτια για εύκολη πρόσβαση αργότερα.'
            : `${favorites.length} ${favorites.length === 1 ? 'αποθηκευμένο προϊόν' : 'αποθηκευμένα προϊόντα'}`}
        </motion.p>
      </section>

      {favorites.length === 0 ? (
        <>
          {/* ── Empty State ── */}
          <section className={styles.emptySection}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 28px', opacity: 0.2, display: 'block' }}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <h2 className={styles.emptyTitle}>Δεν έχετε αγαπημένα ακόμα</h2>
              <p className={styles.emptyText}>
                Πατήστε το εικονίδιο καρδιάς σε οποιοδήποτε προϊόν για να το αποθηκεύσετε εδώ.
              </p>
            </motion.div>
          </section>

          {/* ── Categories Strip ── */}
          <section className={styles.categoriesSection}>
            <motion.p
              className={styles.categoriesEyebrow}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Εξερευνήστε τις κατηγορίες
            </motion.p>
            <div className={styles.categoriesRow}>
              {categories.filter(c => c.slug !== 'custom-orders').map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  className={styles.catCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.55 + i * 0.08, ease: slowEase }}
                  onClick={() => router.push(`/category/${cat.slug}`)}
                >
                  <div className={styles.catImageWrap}>
                    <img src={cat.heroImage} alt={cat.name} className={styles.catImage} />
                    <div className={styles.catOverlay} />
                    <span className={`${narrenschiff.className} ${styles.catName}`}>{cat.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── Featured Products ── */}
          <section className={styles.featuredSection}>
            <motion.div
              className={styles.featuredHeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: slowEase }}
            >
              <p className={styles.featuredEyebrow}>Νέες αφίξεις</p>
              <h2 className={`${narrenschiff.className} ${styles.featuredTitle}`}>Γνωρίστε τη συλλογή</h2>
            </motion.div>
            <div className={styles.featuredGrid}>
              {featured.map((product, i) => (
                <motion.div
                  key={product.slug}
                  className={styles.featCard}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.0 + i * 0.09, ease: slowEase }}
                  onClick={() => router.push(`/product/${product.slug}`)}
                >
                  <div className={styles.featImageWrap}>
                    <img src={product.images['natural-oak']} alt={product.name} className={styles.featImage} />
                    <div className={styles.featOverlay}>
                      <span className={styles.featOverlayText}>Προβολή</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                  <p className={styles.featCategory}>{product.categoryName}</p>
                  <h3 className={styles.featName}>{product.name}</h3>
                  <p className={styles.featPrice}>
                    {product.price.match(/^\d/) ? `Από ${product.price}€` : product.price}
                  </p>
                  <button
                    className={`${dihjauti.className} ${styles.featBtn}`}
                    onClick={(e) => { e.stopPropagation(); router.push(`/product/${product.slug}`); }}
                  >
                    Προσαρμογή
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
                  </button>
                </motion.div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* ── Favorites Grid ── */
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            {favorites.map((item, i) => (
              <motion.div
                key={item.slug}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <div className={styles.imageWrap} onClick={() => router.push(`/product/${item.slug}`)}>
                  <img src={item.image} alt={item.name} className={styles.productImage} />
                  <button
                    className={styles.heartBtn}
                    onClick={(e) => { e.stopPropagation(); removeFavorite(item.slug); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#214A4F" stroke="#214A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <p className={styles.productName}>{item.name}</p>
                <p className={styles.productPrice}>€ {item.price}</p>
                <div className={styles.cardActions}>
                  <a href={`/product/${item.slug}`} className={styles.viewLink} onClick={(e) => { e.preventDefault(); router.push(`/product/${item.slug}`); }}>
                    Προβολή
                  </a>
                  <button
                    className={styles.addCartBtn}
                    onClick={() => addToCart({ slug: item.slug, name: item.name, price: item.price, image: item.image, finish: 'Dark Walnut', fabric: 'Wheat' })}
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
