'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      aria-label="Breadcrumb"
      style={{
        padding: '16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {i > 0 && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(33,74,79,0.3)" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
            {isLast ? (
              <span
                className={dihjauti.className}
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#214A4F',
                }}
              >
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(33,74,79,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#214A4F'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(33,74,79,0.5)'; }}
              >
                {item.label}
              </a>
            )}
          </span>
        );
      })}
    </motion.nav>
  );
}
