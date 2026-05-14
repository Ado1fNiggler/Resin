'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import styles from './Footer.module.css';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const linkMap: Record<string, string> = {
  'Αρχική': '/',
  'Σχετικά με εμάς': '/about',
  'Επικοινωνία': '/contact',
  'Πολυθρόνες': '/category/armchairs',
  'Καναπέδες': '/category/sofas',
  'Τραπεζαρίες': '/category/dining-tables',
  'Αποθηκευτικοί χώροι': '/category/storage',
  'Ειδικές παραγγελίες': '/category/custom-orders',
  'Συχνές ερωτήσεις': '/faq',
  'Αποστολή & Παράδοση': '/shipping-info',
  'Επιστροφές & Ανταλλαγές': '/returns',
  'Πολιτική απορρήτου': '/privacy',
  'Όροι & Προϋποθέσεις': '/terms',
};

const navColumns = [
  {
    title: 'ΕΤΑΙΡΕΙΑ',
    links: ['Αρχική', 'Σχετικά με εμάς', 'Press Kit', 'Trade Program', 'Επικοινωνία'],
  },
  {
    title: 'ΠΡΟΪΟΝΤΑ',
    links: ['Πολυθρόνες', 'Καναπέδες', 'Τραπεζαρίες', 'Αποθηκευτικοί χώροι', 'Ειδικές παραγγελίες'],
  },
  {
    title: 'ΥΠΟΣΤΗΡΙΞΗ',
    links: ['Συχνές ερωτήσεις', 'Αποστολή & Παράδοση', 'Επιστροφές & Ανταλλαγές', 'Εγγύηση'],
  },
  {
    title: 'ΝΟΜΙΚΑ',
    links: ['Πολιτική απορρήτου', 'Όροι & Προϋποθέσεις'],
  },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{ backgroundColor: '#1A3A3E', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle texture background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/footer-texture.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Top bar: logo + social icons ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '48px 100px 40px',
            borderBottom: '1px solid rgba(252,252,252,0.08)',
          }}
        >
          {/* Brand block */}
          <div>
            <a
              href="/"
              className={narrenschiff.className}
              style={{ fontSize: '36px', letterSpacing: '0.12em', color: '#FCFCFC', textDecoration: 'none', display: 'block' }}
            >
              RESIN
            </a>
            <p style={{ fontSize: '12px', letterSpacing: '0.18em', color: 'rgba(252,252,252,0.65)', textTransform: 'uppercase', marginTop: '6px' }}>
              Atelier · Athens · Est. 2014
            </p>
          </div>

          {/* Social icons */}
          <ul className={styles.social}>
            {socialLinks.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
              >
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  {s.icon}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* ── Nav columns ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            padding: '48px 100px',
            borderBottom: '1px solid rgba(252,252,252,0.08)',
          }}
        >
          {navColumns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h5 style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(252,252,252,0.6)',
                marginBottom: '20px',
              }}>
                {col.title}
              </h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href={linkMap[link] || '#'}
                      style={{ fontSize: '14px', color: 'rgba(252,252,252,0.85)', textDecoration: 'none', display: 'block' }}
                      whileHover={{ color: '#FCFCFC', x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 100px 28px',
          }}
        >
          <p style={{ fontSize: '12px', color: 'rgba(252,252,252,0.55)', letterSpacing: '0.06em' }}>
            © 2025 Resin Furniture. All Rights Reserved.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3, color: '#7EC0C9' }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(252,252,252,0.45)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'rgba(252,252,252,0.75)',
              transition: 'color 0.3s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </footer>
  );
}
