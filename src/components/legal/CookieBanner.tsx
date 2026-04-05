'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import localFont from 'next/font/local';

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('resin-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('resin-cookie-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('resin-cookie-consent', 'rejected');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            width: 'calc(100% - 48px)',
            maxWidth: '640px',
            padding: '24px 28px',
            backgroundColor: '#1A3A3E',
            borderRadius: '8px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <p style={{ fontSize: '14px', color: 'rgba(252,252,252,0.8)', lineHeight: 1.6 }}>
            Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στο site μας.
            Μπορείτε να διαβάσετε περισσότερα στην{' '}
            <a href="/privacy" style={{ color: '#7EC0C9', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Πολιτική Απορρήτου
            </a>.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={reject}
              style={{
                padding: '10px 20px',
                border: '1px solid rgba(252,252,252,0.25)',
                borderRadius: '4px',
                backgroundColor: 'transparent',
                color: 'rgba(252,252,252,0.7)',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Απόρριψη
            </button>
            <button
              className={dihjauti.className}
              onClick={accept}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#7EC0C9',
                color: '#1A3A3E',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Αποδοχή
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
