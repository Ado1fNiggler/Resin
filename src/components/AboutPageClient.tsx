'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const teal = '#214A4F';
const offWhite = '#FCFCFC';
const SIDEBAR_W = 75;

const values = [
  { title: 'Χειροποίητη Τέχνη', desc: 'Κάθε κομμάτι δημιουργείται με αφοσίωση στη λεπτομέρεια, χρησιμοποιώντας παραδοσιακές τεχνικές ξυλουργικής που συνδυάζονται με σύγχρονο design.' },
  { title: 'Βιώσιμα Υλικά', desc: 'Επιλέγουμε μόνο πιστοποιημένα ξύλα και φυσικά υλικά, σεβόμενοι το περιβάλλον σε κάθε βήμα της παραγωγικής διαδικασίας.' },
  { title: 'Ελληνική Παραγωγή', desc: 'Σχεδιάζουμε και κατασκευάζουμε στην Ελλάδα, υποστηρίζοντας την τοπική τεχνογνωσία και τη βιοτεχνική παράδοση.' },
  { title: 'Προσωπική Εξυπηρέτηση', desc: 'Από τη σύλληψη της ιδέας ως την παράδοση, κάθε πελάτης μας απολαμβάνει εξατομικευμένη εξυπηρέτηση και συμβουλές.' },
];

export default function AboutPageClient() {
  return (
    <div style={{ paddingLeft: `${SIDEBAR_W}px` }}>
      {/* Hero Section */}
      <section style={{ position: 'relative', height: '70vh', overflow: 'hidden', background: teal }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero1.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        <div style={{
          position: 'relative', zIndex: 1, height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          padding: '0 24px', textAlign: 'center',
        }}>
          <motion.h1
            className={narrenschiff.className}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 'clamp(42px, 6vw, 72px)', color: offWhite, letterSpacing: '0.04em', marginBottom: '20px' }}
          >
            Σχετικά με εμάς
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '18px', color: 'rgba(252,252,252,0.7)', maxWidth: '600px', lineHeight: 1.7 }}
          >
            Δημιουργούμε χειροποίητα έπιπλα που μεταμορφώνουν τον χώρο σας σε κάτι μοναδικό.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: 'clamp(60px, 8vw, 120px) clamp(24px, 5vw, 100px)', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={narrenschiff.className} style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', color: teal, marginBottom: '24px', letterSpacing: '0.02em' }}>
              Η Ιστορία μας
            </h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#5A5A5A', marginBottom: '16px' }}>
              Η RESIN γεννήθηκε από την αγάπη για το ξύλο και την τέχνη του design. Από το πρώτο μας εργαστήριο,
              δημιουργούμε έπιπλα που συνδυάζουν τη λιτότητα της Σκανδιναβικής αισθητικής με τη ζεστασιά
              της ελληνικής παράδοσης.
            </p>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#5A5A5A' }}>
              Κάθε κομμάτι σχεδιάζεται με γνώμονα τη λειτουργικότητα, τη διάρκεια και την αισθητική αρτιότητα —
              δημιουργώντας χώρους που εμπνέουν και αντέχουν στον χρόνο.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '4px' }}
          >
            <img src="/hero1.png" alt="RESIN Workshop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 100px)', background: teal }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2
            className={narrenschiff.className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', color: offWhite, marginBottom: '60px', textAlign: 'center', letterSpacing: '0.02em' }}
          >
            Οι αξίες μας
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '40px' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: '32px', borderTop: '2px solid rgba(252,252,252,0.2)' }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: offWhite, marginBottom: '12px', letterSpacing: '0.02em' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(252,252,252,0.65)' }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
