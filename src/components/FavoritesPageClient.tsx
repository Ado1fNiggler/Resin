'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { allProducts } from '@/data/products';
import styles from './FavoritesPageClient.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const, delay },
});

/* Pad index to N°.01 format */
const formatIndex = (n: number) => `N°.${String(n).padStart(2, '0')}`;

/* Look up category name from products data */
const getCategoryName = (slug: string) =>
  allProducts.find(p => p.slug === slug)?.categoryName ?? '';

export default function FavoritesPageClient() {
  const router = useRouter();
  const { favorites, removeFavorite, addToCart } = useStore();
  const [activeFilter, setActiveFilter] = useState('Όλα');

  /* Derive unique categories from current favorites */
  const categories = ['Όλα', ...Array.from(
    new Set(favorites.map(f => getCategoryName(f.slug)).filter(Boolean))
  )];

  const filtered = activeFilter === 'Όλα'
    ? favorites
    : favorites.filter(f => getCategoryName(f.slug) === activeFilter);

  const count = favorites.length;

  return (
    <div className={styles.pageWrapper}>

      {/* ══ HEADER ══ */}
      <header className={styles.pageHeader}>
        <motion.div className={styles.eyebrow} {...fadeUp(0)}>
          <span className={styles.eyebrowRule} />
          <span className={styles.eyebrowLabel}>ΑΠΟΘΗΚΕΥΜΕΝΑ</span>
        </motion.div>

        <motion.h1 className={styles.title} {...fadeUp(0.06)}>
          Τα αγαπημένα<br />σας.
        </motion.h1>

        <motion.p className={styles.subtitle} {...fadeUp(0.12)}>
          <span className={styles.count}>{count}</span>{' '}
          {count === 1 ? 'κομμάτι αποθηκευμένο' : 'κομμάτια αποθηκευμένα'}{' '}
          — επιλεγμένα από τη συλλογή του εργαστηρίου.
        </motion.p>

        {count > 0 && (
          <motion.div className={styles.toolbar} {...fadeUp(0.18)}>
            <div className={styles.toolbarLeft}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`${styles.toolbarBtn} ${activeFilter === cat ? styles.toolbarBtnActive : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className={styles.toolbarRight}>
              {filtered.length} {filtered.length === 1 ? 'αποτέλεσμα' : 'αποτελέσματα'}
            </span>
          </motion.div>
        )}
      </header>

      {/* ══ GRID or EMPTY ══ */}
      {count === 0 ? (
        <section className={styles.emptySection}>
          <motion.div className={styles.emptyWrap} {...fadeUp(0.2)}>
            <div className={styles.emptyZero} aria-hidden="true">0</div>
            <div className={styles.emptyContent}>
              <div className={styles.emptyRule} />
              <p className={styles.emptyMsg}>
                Δεν έχετε αποθηκεύσει κομμάτια ακόμα.
              </p>
              <a href="/category/armchairs" className={styles.emptyLink}>
                Εξερευνήστε τη συλλογή <span>→</span>
              </a>
            </div>
          </motion.div>
        </section>
      ) : (
        <section className={styles.gridSection}>
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.article
                  key={item.slug}
                  className={styles.card}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12, transition: { duration: 0.35 } }}
                  transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: i * 0.06 }}
                  layout
                >
                  {/* Image */}
                  <div
                    className={styles.media}
                    onClick={() => router.push(`/product/${item.slug}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.productImage}
                    />

                    {/* Heart — remove from favorites */}
                    <button
                      className={styles.heart}
                      aria-label="Αφαίρεση από αγαπημένα"
                      onClick={(e) => { e.stopPropagation(); removeFavorite(item.slug); }}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21s-7.5-4.5-9.5-9.5C1 7.5 4 4 7.5 4c2 0 3.5 1 4.5 2.5C13 5 14.5 4 16.5 4 20 4 23 7.5 21.5 11.5 19.5 16.5 12 21 12 21z" />
                      </svg>
                    </button>

                    <span className={styles.index}>{formatIndex(i + 1)}</span>
                  </div>

                  {/* Body */}
                  <div className={styles.body}>
                    <div className={styles.category}>
                      {getCategoryName(item.slug)}
                    </div>
                    <span className={styles.name}>{item.name}</span>
                    <div className={styles.meta}>
                      <span className={styles.price}>€ {item.price}</span>
                      <button
                        className={styles.cta}
                        onClick={() => addToCart({
                          slug: item.slug,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                          finish: 'Dark Walnut',
                          fabric: 'Wheat',
                        })}
                      >
                        Στο καλάθι <span className={styles.ctaArrow}>→</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* ══ EDITORIAL STRIP ══ */}
      <motion.section
        className={styles.editorialStrip}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className={styles.stripEyebrow}>
          <span className={styles.stripEyebrowRule} />
          ΕΞΑΤΟΜΙΚΕΥΣΗ
        </div>
        <div className={styles.stripInner}>
          <h2 className={styles.stripHeading}>
            Χρειάζεστε βοήθεια να επιλέξετε;
            <em>Μιλήστε με έναν τεχνίτη.</em>
          </h2>
          <a href="/contact" className={styles.stripCta}>
            <span>Επικοινωνία</span>
            <span className={styles.stripArrow}>→</span>
          </a>
        </div>
      </motion.section>

    </div>
  );
}
