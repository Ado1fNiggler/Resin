'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [{ path: '../../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingLeft: '75px', minHeight: '100vh', backgroundColor: '#F7F6F3' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 48px 120px' }}>
        <motion.h1
          className={narrenschiff.className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: slowEase }}
          style={{ fontSize: '36px', color: '#214A4F', marginBottom: '12px', letterSpacing: '0.02em' }}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: '13px', color: 'rgba(33,74,79,0.5)', marginBottom: '48px' }}
        >
          Τελευταία ενημέρωση: {lastUpdated}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: slowEase }}
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: '#3A3A3A',
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
