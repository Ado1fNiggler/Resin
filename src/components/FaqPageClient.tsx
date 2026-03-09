'use client';

import { motion, AnimatePresence } from 'framer-motion';
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

const faqItems = [
  {
    q: 'Πόσο χρόνο χρειάζεται η παραγγελία μου;',
    a: 'Ο χρόνος παραγωγής εξαρτάται από το είδος του επίπλου. Τα standard μοντέλα χρειάζονται 4-6 εβδομάδες, ενώ οι ειδικές παραγγελίες μπορεί να χρειαστούν 8-12 εβδομάδες.',
  },
  {
    q: 'Μπορώ να επιλέξω διαφορετικό ύφασμα ή χρώμα ξύλου;',
    a: 'Φυσικά! Όλα τα προϊόντα μας είναι διαθέσιμα σε πολλαπλά φινιρίσματα ξύλου και υφάσματα. Επικοινωνήστε μαζί μας για τον πλήρη κατάλογο επιλογών.',
  },
  {
    q: 'Παραδίδετε σε όλη την Ελλάδα;',
    a: 'Ναι, παραδίδουμε σε όλη την Ελλάδα. Η αποστολή γίνεται με εξειδικευμένη μεταφορική εταιρεία για τη μέγιστη ασφάλεια των επίπλων σας. Η παράδοση περιλαμβάνει τοποθέτηση στον χώρο σας.',
  },
  {
    q: 'Τι εγγύηση παρέχετε;',
    a: 'Παρέχουμε εγγύηση 5 ετών για την κατασκευή και τα υλικά. Η εγγύηση καλύπτει ελαττώματα κατασκευής, αλλά δεν περιλαμβάνει φθορές από φυσική χρήση.',
  },
  {
    q: 'Μπορώ να επισκεφτώ το εργαστήριο/showroom;',
    a: 'Βεβαίως! Μπορείτε να κλείσετε ραντεβού στο showroom μας για να δείτε τα έπιπλα από κοντά και να συζητήσετε τις ανάγκες σας με τους σχεδιαστές μας.',
  },
  {
    q: 'Πώς φροντίζω τα έπιπλα από μασίφ ξύλο;',
    a: 'Συνιστούμε τακτικό σκούπισμα με μαλακό πανί και χρήση φυσικού λαδιού για ξύλινες επιφάνειες κάθε 6-12 μήνες. Αποφύγετε την άμεση έκθεση σε υγρασία και ήλιο.',
  },
  {
    q: 'Δέχεστε επιστροφές;',
    a: 'Δεχόμαστε επιστροφές εντός 14 ημερών για standard προϊόντα σε αρχική κατάσταση. Οι ειδικές παραγγελίες δεν επιστρέφονται, καθώς κατασκευάζονται σύμφωνα με τις δικές σας προδιαγραφές.',
  },
];

function FaqItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ borderBottom: '1px solid rgba(33,74,79,0.12)' }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '28px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 500, color: teal, paddingRight: '24px', lineHeight: 1.5 }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: '28px', color: teal, flexShrink: 0, lineHeight: 1 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5A5A5A', paddingBottom: '28px', maxWidth: '700px' }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPageClient() {
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
          Συχνές Ερωτήσεις
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '18px', color: 'rgba(252,252,252,0.7)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}
        >
          Βρείτε απαντήσεις στις πιο συχνές ερωτήσεις σχετικά με τα προϊόντα και τις υπηρεσίες μας.
        </motion.p>
      </section>

      {/* FAQ List */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 100px)', maxWidth: '900px', margin: '0 auto' }}>
        {faqItems.map((item, i) => (
          <FaqItem key={i} item={item} index={i} />
        ))}
      </section>
    </div>
  );
}
