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
    bg: 'linear-gradient(-45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    bg: '#1877f2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    bg: '#e60023',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.135-1.867 3.135-4.56 0-2.385-1.714-4.052-4.161-4.052-2.834 0-4.496 2.125-4.496 4.322 0 .856.33 1.772.741 2.272a.3.3 0 0 1 .069.285c-.076.311-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    bg: '#010101',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
        backgroundImage: 'url(/footer-texture.png)',
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
                data-tooltip={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                style={{ '--bg': s.bg } as React.CSSProperties}
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
