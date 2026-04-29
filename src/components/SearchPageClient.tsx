'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { allProducts, categories } from '@/data/products';

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

const teal = '#214A4F';
const offWhite = '#FCFCFC';
const SIDEBAR_W = 75;
const slowEase = [0.16, 1, 0.3, 1] as const;

const popular = ['phantigo', 'kronos', 'agora', 'elara', 'lyra', 'kronion']
  .map(slug => allProducts.find(p => p.slug === slug))
  .filter(Boolean) as typeof allProducts;

const visibleCategories = categories.filter(c => c.slug !== 'custom-orders');

export default function SearchPageClient() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return allProducts.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const categoryResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return categories.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const hasResults = results.length > 0 || categoryResults.length > 0;

  return (
    <div style={{ paddingLeft: `${SIDEBAR_W}px` }}>
      {/* ── Hero with search bar ── */}
      <section style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 100px) clamp(40px, 5vw, 60px)',
        textAlign: 'center',
        background: teal,
      }}>
        <motion.h1
          className={narrenschiff.className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: slowEase }}
          style={{ fontSize: 'clamp(42px, 6vw, 72px)', color: offWhite, letterSpacing: '0.04em', marginBottom: '40px' }}
        >
          Αναζήτηση
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}
        >
          <input
            type="text"
            placeholder="Αναζήτηση προϊόντων, κατηγοριών..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%', padding: '18px 24px 18px 52px',
              fontSize: '16px', color: teal, background: offWhite,
              border: 'none', outline: 'none', fontFamily: 'inherit',
              borderRadius: '4px',
            }}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                color: teal, opacity: 0.4, fontSize: '18px', lineHeight: 1,
              }}
              aria-label="Καθαρισμός"
            >
              ×
            </button>
          )}
        </motion.div>

        {/* Popular search terms */}
        {!query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {['Πολυθρόνα', 'Καναπές', 'Τραπεζαρία', 'Δρυς', 'Βελούδο', 'Ντουλάπα', 'Lyra', 'Agora'].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                style={{
                  padding: '8px 18px', borderRadius: '999px',
                  border: '1px solid rgba(252,252,252,0.3)',
                  background: 'rgba(252,252,252,0.08)',
                  color: 'rgba(252,252,252,0.75)',
                  fontSize: '13px', cursor: 'pointer',
                  transition: 'all 0.2s',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(252,252,252,0.18)'; (e.currentTarget as HTMLElement).style.color = offWhite; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(252,252,252,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(252,252,252,0.75)'; }}
              >
                {term}
              </button>
            ))}
          </motion.div>
        )}
      </section>

      {/* ── Results area ── */}
      <section style={{ padding: 'clamp(28px, 4vw, 56px) clamp(24px, 5vw, 100px)', maxWidth: '1400px', margin: '0 auto' }}>

        {query.trim() && (
          <p style={{ fontSize: '14px', color: '#8A8A8A', marginBottom: '32px' }}>
            {results.length + categoryResults.length} αποτελέσματα για &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Category results */}
        {categoryResults.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
              Κατηγορίες
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {categoryResults.map((cat) => (
                <motion.button
                  key={cat.slug}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(`/category/${cat.slug}`)}
                  style={{
                    padding: '12px 28px', background: 'transparent', border: `1.5px solid ${teal}`,
                    color: teal, cursor: 'pointer', fontSize: '14px', fontWeight: 500,
                    borderRadius: '4px', transition: 'background 0.3s, color 0.3s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = teal; (e.currentTarget as HTMLElement).style.color = offWhite; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = teal; }}
                >
                  {cat.name}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Product results */}
        {results.length > 0 && (
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
              Προϊόντα
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '28px' }}>
              {results.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#E8E5E0', marginBottom: '12px' }}>
                    <img
                      src={product.images['natural-oak']}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease-out', display: 'block' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    />
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '4px' }}>
                    {product.categoryName}
                  </p>
                  <h4 style={{ fontSize: '15px', fontWeight: 500, color: teal, marginBottom: '4px' }}>
                    {product.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: teal, opacity: 0.7 }}>
                    {product.price.match(/^\d/) ? `Από ${product.price}€` : product.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No results */}
        {query.trim() && !hasResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '60px 0' }}
          >
            <p style={{ fontSize: '18px', color: teal, fontWeight: 400, marginBottom: '12px' }}>
              Δεν βρέθηκαν αποτελέσματα
            </p>
            <p style={{ fontSize: '14px', color: '#8A8A8A' }}>
              Δοκιμάστε διαφορετικούς όρους ή περιηγηθείτε στις κατηγορίες παρακάτω.
            </p>
          </motion.div>
        )}

        {/* ── Empty (no query): Category Cards ── */}
        {!query.trim() && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ marginBottom: '20px' }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '6px' }}>
                Εξερευνήστε
              </p>
              <h2 className={narrenschiff.className} style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: teal, fontWeight: 400 }}>
                Κατηγορίες
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '12px', marginBottom: '64px' }}>
              {visibleCategories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.07, ease: slowEase }}
                  onClick={() => router.push(`/category/${cat.slug}`)}
                  style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
                    <img
                      src={cat.heroImage}
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)', display: 'block' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(33,74,79,0.72) 0%, transparent 55%)', pointerEvents: 'none' }} />
                    <span
                      className={narrenschiff.className}
                      style={{
                        position: 'absolute', bottom: '20px', left: '20px', right: '20px',
                        color: offWhite, fontSize: 'clamp(18px, 2.2vw, 26px)',
                        fontWeight: 400, letterSpacing: '0.03em', lineHeight: 1.15,
                      }}
                    >
                      {cat.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Popular products */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{ marginBottom: '20px' }}
            >
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '6px' }}>
                Δημοφιλή
              </p>
              <h2 className={narrenschiff.className} style={{ fontSize: 'clamp(22px, 3vw, 34px)', color: teal, fontWeight: 400 }}>
                Επιλεγμένα Προϊόντα
              </h2>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              {popular.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.75 + i * 0.08, ease: slowEase }}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#E8E5E0', marginBottom: '12px' }}>
                    <img
                      src={product.images['natural-oak']}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)', display: 'block' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    />
                  </div>
                  <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '3px' }}>
                    {product.categoryName}
                  </p>
                  <h4 style={{ fontSize: '14px', fontWeight: 500, color: teal, marginBottom: '3px', letterSpacing: '0.03em' }}>
                    {product.name}
                  </h4>
                  <p style={{ fontSize: '13px', color: teal, opacity: 0.65 }}>
                    {product.price.match(/^\d/) ? `Από ${product.price}€` : product.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
