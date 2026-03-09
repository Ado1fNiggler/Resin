'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const teal = '#214A4F';
const offWhite = '#FCFCFC';
const SIDEBAR_W = 75;

const contactInfo = [
  { label: 'Email', value: 'info@resin.gr', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Τηλέφωνο', value: '+30 210 1234567', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { label: 'Διεύθυνση', value: 'Λεωφ. Κηφισίας 100, Αθήνα 11526', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Ωράριο', value: 'Δευ-Παρ: 10:00–19:00, Σάβ: 10:00–15:00', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

function InputField({ label, type = 'text', rows }: { label: string; type?: string; rows?: number }) {
  const [focused, setFocused] = useState(false);
  const isTextarea = !!rows;

  const sharedStyle = {
    width: '100%', padding: '14px 0', fontSize: '15px', color: teal,
    background: 'transparent', border: 'none', borderBottom: `1px solid ${focused ? teal : 'rgba(33,74,79,0.2)'}`,
    outline: 'none', transition: 'border-color 0.3s', resize: 'none' as const,
    fontFamily: 'inherit',
  };

  return (
    <div style={{ marginBottom: '32px' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: focused ? teal : '#8A8A8A', transition: 'color 0.3s', display: 'block', marginBottom: '4px' }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea rows={rows} style={sharedStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      ) : (
        <input type={type} style={sharedStyle} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      )}
    </div>
  );
}

export default function ContactPageClient() {
  return (
    <div style={{ paddingLeft: `${SIDEBAR_W}px` }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(120px, 15vw, 200px) clamp(24px, 5vw, 100px) clamp(60px, 8vw, 100px)', textAlign: 'center', background: teal }}>
        <motion.h1
          className={narrenschiff.className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: 'clamp(42px, 6vw, 72px)', color: offWhite, letterSpacing: '0.04em', marginBottom: '20px' }}
        >
          Επικοινωνία
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '18px', color: 'rgba(252,252,252,0.7)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}
        >
          Θα χαρούμε να ακούσουμε τις ιδέες σας. Επικοινωνήστε μαζί μας.
        </motion.p>
      </section>

      {/* Content */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 100px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '80px' }}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={narrenschiff.className} style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: teal, marginBottom: '40px', letterSpacing: '0.02em' }}>
              Στείλτε μας μήνυμα
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputField label="Ονοματεπώνυμο" />
              <InputField label="Email" type="email" />
              <InputField label="Τηλέφωνο" type="tel" />
              <InputField label="Μήνυμα" rows={4} />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px 48px', background: teal, color: offWhite, border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'opacity 0.3s', marginTop: '8px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                Αποστολή
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className={narrenschiff.className} style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: teal, marginBottom: '40px', letterSpacing: '0.02em' }}>
              Στοιχεία Επικοινωνίας
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px', opacity: 0.6 }}>
                    <path d={info.icon} />
                  </svg>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#8A8A8A', marginBottom: '4px' }}>
                      {info.label}
                    </div>
                    <div style={{ fontSize: '15px', color: teal, lineHeight: 1.5 }}>
                      {info.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
