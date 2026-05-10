'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import localFont from 'next/font/local';
import styles from './FaqPageClient.module.css';

const narrenschiff = localFont({
  src: [{ path: '../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const SIDEBAR_W = 75;

/* ── FAQ Data ── */
type FaqCategory = 'orders' | 'materials' | 'shipping' | 'returns';

interface FaqItem {
  q: string;
  a: string;
  category: FaqCategory;
  categoryLabel: string;
  meta: string[];
}

const faqItems: FaqItem[] = [
  {
    q: 'Πόσο χρόνο χρειάζεται η παραγγελία μου;',
    a: 'Οι standard παραγγελίες ολοκληρώνονται σε 4–6 εβδομάδες από τη στιγμή επιβεβαίωσης. Για ειδικές κατασκευές και custom διαστάσεις, ο χρόνος επεκτείνεται σε 8–12 εβδομάδες, ώστε το ξύλο να εγκλιματιστεί σωστά πριν το φινίρισμα.',
    category: 'orders',
    categoryLabel: 'Παραγγελίες',
    meta: ['Παγκράτι, Αθήνα', 'Workshop Lead · Ν. Χατζηπαναγή'],
  },
  {
    q: 'Μπορώ να επιλέξω διαφορετικό ύφασμα ή χρώμα ξύλου;',
    a: 'Ναι. Διατηρούμε πλήρη κατάλογο επιλογών — βελούδα, λινά και μάλλινα από ευρωπαϊκές μύλους — καθώς και έξι αποχρώσεις φινιρίσματος για δρυ, καρυδιά και καστανιά. Σας στέλνουμε δείγματα δωρεάν πριν την επιβεβαίωση της παραγγελίας.',
    category: 'materials',
    categoryLabel: 'Υλικά & Φροντίδα',
    meta: ['6 αποχρώσεις ξύλου', '40+ υφάσματα', 'Δωρεάν δείγματα'],
  },
  {
    q: 'Παραδίδετε σε όλη την Ελλάδα;',
    a: 'Ναι, σε ηπειρωτική Ελλάδα και νησιά. Συνεργαζόμαστε με εξειδικευμένη μεταφορική για χειροποίητα έπιπλα και η ομάδα μας αναλαμβάνει την τοποθέτηση και συναρμολόγηση στον χώρο σας — χωρίς επιπλέον χρέωση εντός Αττικής.',
    category: 'shipping',
    categoryLabel: 'Αποστολή',
    meta: ['Δωρεάν εντός Αττικής', 'Νησιά · 7–14 ημέρες'],
  },
  {
    q: 'Τι εγγύηση παρέχετε;',
    a: 'Κάθε κομμάτι Resin συνοδεύεται από πενταετή κατασκευαστική εγγύηση, που καλύπτει αρμούς, μηχανισμούς και δομική ακεραιότητα. Παρέχουμε επίσης διά βίου υπηρεσία επισκευής και επαναφινιρίσματος σε προνομιακές τιμές.',
    category: 'orders',
    categoryLabel: 'Παραγγελίες',
    meta: ['5 χρόνια εγγύηση', 'Lifetime repair service'],
  },
  {
    q: 'Μπορώ να επισκεφτώ το showroom;',
    a: 'Ναι — κατόπιν ραντεβού. Το showroom και το εργαστήριό μας στο Παγκράτι είναι ανοιχτά Τρίτη έως Σάββατο, 11:00–19:00. Κατά την επίσκεψη μπορείτε να δείτε δείγματα υλικών, να συζητήσετε custom έργα και να γνωρίσετε την ομάδα κατασκευής.',
    category: 'orders',
    categoryLabel: 'Παραγγελίες',
    meta: ['Πλάτωνος 12, Παγκράτι', 'Τρ–Σα · 11:00–19:00'],
  },
  {
    q: 'Πώς φροντίζω τα έπιπλα από μασίφ ξύλο;',
    a: 'Συντηρήστε την επιφάνεια εφαρμόζοντας φυσικό λάδι (καρύδι ή λινέλαιο) κάθε 6–12 μήνες, με μαλακό βαμβακερό ύφασμα και κίνηση παράλληλη στα νερά του ξύλου. Αποφύγετε άμεση επαφή με υγρασία, ηλιακή ακτινοβολία και πηγές θερμότητας. Μαζί με κάθε παραγγελία αποστέλλεται δωρεάν kit συντήρησης.',
    category: 'materials',
    categoryLabel: 'Υλικά & Φροντίδα',
    meta: ['Φυσικό λάδι · 6–12 μήνες', 'Δωρεάν kit'],
  },
  {
    q: 'Δέχεστε επιστροφές;',
    a: 'Για standard κομμάτια από τη συλλογή, αποδεχόμαστε επιστροφές εντός 14 ημερών από την παράδοση, εφόσον το έπιπλο είναι σε άριστη κατάσταση. Οι ειδικές παραγγελίες και τα custom έργα δεν επιστρέφονται, καθώς κατασκευάζονται αποκλειστικά για εσάς.',
    category: 'returns',
    categoryLabel: 'Επιστροφές',
    meta: ['Standard · 14 ημέρες', 'Custom · μη επιστρέψιμα'],
  },
];

const filters: { key: string; label: string; count: number }[] = [
  { key: 'all', label: 'Όλα', count: 7 },
  { key: 'orders', label: 'Παραγγελίες', count: 3 },
  { key: 'materials', label: 'Υλικά & Φροντίδα', count: 2 },
  { key: 'shipping', label: 'Αποστολή', count: 1 },
  { key: 'returns', label: 'Επιστροφές', count: 1 },
];

/* ── Single FAQ Row ── */
function FaqRow({ item, index, isOpen, onToggle }: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);

  return (
    <motion.article
      ref={ref}
      className={styles.faqRow}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onToggle}
    >
      {/* Number */}
      <div className={`${styles.faqNum} ${isOpen ? styles.faqNumActive : ''}`}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Body */}
      <div>
        <div className={styles.faqBody}>
          <div className={styles.faqMain}>
            <span className={styles.tag}>{item.categoryLabel}</span>
            <h3 className={styles.faqQuestion}>{item.q}</h3>
          </div>
          <button
            className={`${styles.faqToggle} ${isOpen ? styles.faqToggleOpen : ''}`}
            aria-label={isOpen ? 'Σύμπτυξη' : 'Επέκταση'}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
          />
        </div>

        {/* Animated Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3, delay: 0.05 } }}
              style={{ overflow: 'hidden' }}
            >
              <div className={styles.faqAnswer}>
                <p style={{ margin: 0 }}>{item.a}</p>
                <div className={styles.faqAnswerMeta}>
                  {item.meta.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════
   MAIN FAQ PAGE CLIENT
   ══════════════════════════════════════════════ */
export default function FaqPageClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isStuck, setIsStuck] = useState(false);
  const filterRef = useRef<HTMLElement>(null);

  /* Sticky detection */
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const top = filterRef.current.getBoundingClientRect().top;
        setIsStuck(top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Parallax for quote section */
  const quoteRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'end start'],
  });
  const quoteY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  /* Filtered items */
  const filteredItems = faqItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const visibleCount = filteredItems.length;

  return (
    <div style={{ paddingLeft: `${SIDEBAR_W}px` }}>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <motion.div
            className={styles.heroEyebrow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={styles.heroEyebrowDot} />
            <span>Resin · Athens</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span>Συχνές Ερωτήσεις</span>
          </motion.div>

          <motion.h1
            className={`${narrenschiff.className} ${styles.heroTitle}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Συχνές<br />
            <span className={styles.heroTitleAccent}>Ερωτή­σεις.</span>
          </motion.h1>

          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p className={styles.heroMetaText}>
              Απαντήσεις για παραγγελίες, υλικά, αποστολή και φροντίδα — γραμμένες από τους τεχνίτες του εργαστηρίου μας στο Παγκράτι.
            </p>
            <div className={styles.heroIssue}>τόμος 04 — Άνοιξη &apos;26</div>
          </motion.div>
        </div>

        <div className={styles.heroRight} aria-hidden="true">
          {/* Video background with gradient fallback */}
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster=""
          >
            <source src="/faq-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroImage} />
          <div className={styles.heroIndex}>N° 04 / Atelier Notes</div>
          <div className={styles.heroCaption}>Οδός Πλάτωνος — μασίφ δρυς, χειροποίητο φινίρισμα</div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <nav
        ref={filterRef}
        className={`${styles.filterbar} ${isStuck ? styles.filterbarStuck : ''}`}
        aria-label="Φίλτρα κατηγοριών"
      >
        <span className={styles.filterbarLabel}>Κατηγορίες</span>
        <div className={styles.pills}>
          {filters.map((f) => (
            <button
              key={f.key}
              className={`${styles.pill} ${activeFilter === f.key ? styles.pillActive : ''}`}
              onClick={() => {
                setActiveFilter(f.key);
                setOpenIndex(null);
              }}
            >
              {f.label}
              <span className={styles.pillCount}>
                {String(f.count).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
        <span className={styles.filterbarCount}>
          {visibleCount} {visibleCount === 1 ? 'ερώτηση' : 'ερωτήσεις'}
        </span>
      </nav>

      {/* ── FAQ List ── */}
      <section className={styles.faq} aria-label="Λίστα ερωτήσεων">
        <div className={styles.faqHead}>
          <span className={styles.faqHeadNum}>N°</span>
          <h2 className={styles.faqHeadTitle}>Όσα ρωτούν οι πελάτες μας</h2>
          <span className={styles.faqHeadMeta}>
            {String(faqItems.length).padStart(2, '0')} entries · Updated May &apos;26
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {filteredItems.map((item, index) => {
              const globalIndex = faqItems.indexOf(item);
              return (
                <FaqRow
                  key={globalIndex}
                  item={item}
                  index={index}
                  isOpen={openIndex === globalIndex}
                  onToggle={() =>
                    setOpenIndex(openIndex === globalIndex ? null : globalIndex)
                  }
                />
              );
            })}
            {filteredItems.length === 0 && (
              <p style={{
                padding: '80px 0',
                textAlign: 'center',
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                color: '#8a8478',
              }}>
                Καμία ερώτηση σε αυτή την κατηγορία.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── Contact CTA ── */}
      <motion.section
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.ctaDecor} aria-hidden="true" />
        <div>
          <div className={styles.ctaEyebrow}>— Συνεχίζουμε τη συζήτηση</div>
          <h3 className={styles.ctaTitle}>
            Δεν βρήκατε <span className={styles.ctaTitleAccent}>απάντηση;</span>
          </h3>
          <p className={styles.ctaSub}>
            Γράψτε μας ή κλείστε ραντεβού στο εργαστήριο. Απαντάμε προσωπικά σε κάθε μήνυμα εντός μίας εργάσιμης ημέρας.
          </p>
        </div>
        <div className={styles.ctaAction}>
          <button className={styles.ctaBtn}>
            Επικοινωνήστε μαζί μας
            <span className={styles.ctaBtnArrow} />
          </button>
          <div className={styles.ctaContact}>
            <a href="mailto:hello@resin.gr" className={styles.ctaContactLink}>hello@resin.gr</a>
            <a href="tel:+302107220000" className={styles.ctaContactLink}>+30 210 722 0000</a>
          </div>
        </div>
      </motion.section>

      {/* ── Editorial Quote ── */}
      <section className={styles.quote} ref={quoteRef} aria-label="Παράθεμα">
        <div className={`${styles.quoteLine} ${styles.quoteLineTop}`} />
        <div className={`${styles.quoteLine} ${styles.quoteLineBottom}`} />

        <motion.div style={{ y: quoteY }}>
          <div className={styles.quoteMark}>&ldquo;</div>
          <motion.blockquote
            className={styles.quoteText}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Το ξύλο θυμάται τα χέρια που το <span className={styles.quoteAccent}>δούλεψαν</span> — γι&apos; αυτό κάθε κομμάτι μας φέρει ένα όνομα.
          </motion.blockquote>
          <motion.div
            className={styles.quoteAttr}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Δημήτρης Καρράς
            <span className={styles.quoteAttrDot}>·</span>
            Ιδρυτής & Master Craftsman
            <span className={styles.quoteAttrDot}>·</span>
            Resin Atelier
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
