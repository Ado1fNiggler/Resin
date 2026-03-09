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

const teal = '#214A4F';
const offWhite = '#FCFCFC';
const SIDEBAR_W = 75;

export default function SearchPageClient() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
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

  return (
    <div style={{ paddingLeft: `${SIDEBAR_W}px` }}>
      {/* Hero with search */}
      <section style={{ padding: 'clamp(120px, 15vw, 180px) clamp(24px, 5vw, 100px) clamp(60px, 8vw, 100px)', textAlign: 'center', background: teal }}>
        <motion.h1
          className={narrenschiff.className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            placeholder="Αναζήτηση προϊόντων..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: '100%', padding: '18px 24px 18px 52px',
              fontSize: '16px', color: teal, background: offWhite,
              border: 'none', outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {/* Search icon inside input */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </motion.div>
      </section>

      {/* Results */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 100px)', maxWidth: '1200px', margin: '0 auto' }}>
        {query.trim() && (
          <p style={{ fontSize: '14px', color: '#8A8A8A', marginBottom: '32px' }}>
            {results.length + categoryResults.length} αποτελέσματα για &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Category results */}
        {categoryResults.length > 0 && (
          <div style={{ marginBottom: '48px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
              Κατηγορίες
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {categoryResults.map((cat) => (
                <motion.button
                  key={cat.slug}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => router.push(`/category/${cat.slug}`)}
                  style={{
                    padding: '12px 28px', background: 'transparent', border: `1px solid ${teal}`,
                    color: teal, cursor: 'pointer', fontSize: '15px', fontWeight: 500,
                    transition: 'background 0.3s, color 0.3s',
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
            <h3 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '20px' }}>
              Προϊόντα
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
              {results.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#EDE9E3', marginBottom: '12px' }}>
                    <img
                      src={product.galleryImages[0]}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease-out' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                    />
                  </div>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '4px' }}>
                    {product.categoryName}
                  </p>
                  <h4 style={{ fontSize: '16px', fontWeight: 500, color: teal, marginBottom: '4px' }}>
                    {product.name}
                  </h4>
                  <p style={{ fontSize: '15px', color: teal, fontWeight: 600 }}>
                    {product.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no query */}
        {!query.trim() && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '15px', color: '#8A8A8A', lineHeight: 1.7 }}>
              Πληκτρολογήστε για να αναζητήσετε προϊόντα, κατηγορίες ή υλικά.
            </p>
          </div>
        )}

        {/* No results */}
        {query.trim() && results.length === 0 && categoryResults.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: '15px', color: '#8A8A8A', lineHeight: 1.7 }}>
              Δεν βρέθηκαν αποτελέσματα. Δοκιμάστε διαφορετικούς όρους αναζήτησης.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
