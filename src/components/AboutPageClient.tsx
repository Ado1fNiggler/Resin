'use client';

import { motion } from 'framer-motion';
import styles from './AboutPageClient.module.css';

const SIDEBAR_W = 75;

/* ── Reusable animation presets ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay },
});

const heroAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] as const, delay },
});

/* ── Data ── */
const stats = [
  { num: '10',  suffix: '+' as const, label: ['χρόνια', 'εμπειρίας'] },
  { num: '500', suffix: '+' as const, label: ['παραγγελίες', 'παραδομένες'] },
  { num: '3',   suffix: null,         label: ['τεχνίτες', 'στο εργαστήριο'] },
  { num: '100', suffix: '%' as const, label: ['μασίφ', 'ξύλο'] },
];

const team = [
  {
    name: 'Νίκος Βλαχάκης',
    role: 'Founder · Master Joiner',
    bio:  'Ξεκίνησε σε εργαστήριο του πατέρα του στα 14. Σπούδασε στη Φλωρεντία, επέστρεψε στην Αθήνα, άνοιξε τη Resin.',
    img:  '/about-team-1.webp',
  },
  {
    name: 'Στέφανος Παπαδάκης',
    role: 'Designer · Wood Finisher',
    bio:  'Σχεδιάζει με μολύβι, δοκιμάζει με τα δάχτυλα. Τα φινιρίσματα βερνικιού του είναι η υπογραφή της Resin.',
    img:  '/about-team-2.webp',
  },
  {
    name: 'Δημήτρης Καραντίνος',
    role: 'Cabinetmaker',
    bio:  'Δέκα χρόνια δίπλα στον Νίκο. Ειδικός σε αρμούς χωρίς βίδα — μόνο ξύλο, κόλλα και υπομονή.',
    img:  '/about-team-3.webp',
  },
];

export default function AboutPageClient() {
  return (
    <div style={{ paddingLeft: SIDEBAR_W }}>

      {/* ══════════════════════════════════════
          1. HERO — 55/45 split
      ══════════════════════════════════════ */}
      <section className={styles.hero}>

        {/* Left: video panel */}
        <div className={styles.heroImage}>
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/about-hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroCaption}>Workshop · Pagkrati</div>
        </div>

        {/* Right: dark teal text panel */}
        <div className={styles.heroText}>
          <span className={styles.heroCorner}>№ 01 — About</span>

          <motion.div
            className={styles.eyebrow}
            style={{ marginBottom: 48 }}
            {...heroAnim(0)}
          >
            Athens · Est. 2014
          </motion.div>

          <motion.h1 className={styles.heroH1} {...heroAnim(0.1)}>
            Η ιστορία <em>μας</em>
          </motion.h1>

          <motion.p className={styles.heroSub} {...heroAnim(0.22)}>
            Από το εργαστήριο στο σαλόνι σας — χειροποίητα, με αγάπη.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. STORY — pullquote + editorial body
      ══════════════════════════════════════ */}
      <section className={styles.story}>
        <div className={styles.container}>

          <motion.div className={styles.sectionMarker} {...fadeUp(0)}>
            <span className={styles.num}>01</span> · Φιλοσοφία
          </motion.div>

          <div className={styles.storyGrid}>
            <motion.div {...fadeUp(0)}>
              <blockquote className={styles.pullquote}>
                Πιστεύουμε ότι ένα έπιπλο δεν είναι απλώς αντικείμενο — είναι μια απόφαση για τη ζωή σου.
                <span className={styles.attribution}>Resin · Athens</span>
              </blockquote>
            </motion.div>

            <motion.div className={styles.storyBody} {...fadeUp(0.16)}>
              <p className={styles.lede}>
                Η Resin γεννήθηκε το 2014 σε ένα μικρό εργαστήριο στο Παγκράτι, με μία ξεκάθαρη πεποίθηση: το έπιπλο δεν είναι εμπόρευμα. Είναι σύντροφος.
              </p>
              <p>
                Κάθε κομμάτι σχεδιάζεται και κατασκευάζεται με το χέρι, από μασίφ ευρωπαϊκή δρυ και καρυδιά. Δεν χρησιμοποιούμε MDF, δεν χρησιμοποιούμε καπλαμάδες· μόνο ξύλο που γερνά όμορφα και που μπορεί να συνταξιδέψει με τη ζωή σου για δεκαετίες.
              </p>
              <p>
                Δουλεύουμε αργά, επειδή η ταχύτητα είναι ο εχθρός της λεπτομέρειας. Μία καρέκλα μπορεί να μας πάρει δύο εβδομάδες· ένα τραπέζι, έναν μήνα. Στο τέλος, αυτό που παραδίδουμε δεν είναι ένα προϊόν — είναι μια δουλειά υπογεγραμμένη με όνομα.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          3. STATS — dark teal, 4 large numbers
      ══════════════════════════════════════ */}
      <section className={styles.stats}>
        <div className={styles.container}>

          <motion.div className={styles.statsHead} {...fadeUp(0)}>
            <div
              className={`${styles.eyebrow} ${styles.eyebrowCenter}`}
              style={{ marginBottom: 24 }}
            >
              By the numbers · Με αριθμούς
            </div>
            <h2>Μια δεκαετία στο ίδιο πάγκο.</h2>
          </motion.div>

          <div className={styles.statsRow}>
            {stats.map((s, i) => (
              <motion.div key={s.num} className={styles.stat} {...fadeUp(i * 0.08)}>
                <div className={styles.statRule} />
                <div className={styles.statNum}>
                  {s.num}
                  {s.suffix === '+' && <span className={styles.plus}>+</span>}
                  {s.suffix === '%' && <span className={styles.pct}>%</span>}
                </div>
                <div className={styles.statLabel}>
                  {s.label[0]}<br />{s.label[1]}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          4. TEAM — 3 portrait cards
      ══════════════════════════════════════ */}
      <section className={styles.team}>
        <div className={styles.container}>

          <div className={styles.teamHead}>
            <motion.h2 {...fadeUp(0)}>
              Οι άνθρωποι πίσω<br />από κάθε <em>κομμάτι</em>.
            </motion.h2>
            <motion.p className={styles.teamIntro} {...fadeUp(0.08)}>
              Τρεις τεχνίτες, ένα κοινό όνομα στο τέλος κάθε έργου. Η Resin είναι μικρή, εκ προθέσεως — γιατί η σχέση με τον πελάτη μετρά όσο και το ίδιο το έπιπλο.
            </motion.p>
          </div>

          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <motion.article key={m.name} {...fadeUp(i * 0.08)}>
                <div className={styles.memberImg}>
                  <img src={m.img} alt={m.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <h3 className={styles.memberName}>{m.name}</h3>
                <div className={styles.memberRole}>{m.role}</div>
                <p className={styles.memberBio}>{m.bio}</p>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WORKSHOP — alternating image/text rows
      ══════════════════════════════════════ */}
      <section className={styles.workshop}>
        <div className={styles.container}>

          {/* Row 1 — Workshop */}
          <div className={styles.row}>
            <motion.div className={styles.rowImg} {...fadeUp(0)}>
              <img src="/about-workshop.webp" alt="Εργαστήριο Resin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className={styles.frame} />
              <span className={styles.imgCorner}>Pagkrati · 200m²</span>
            </motion.div>

            <motion.div className={styles.rowText} {...fadeUp(0.1)}>
              <span className={styles.rowBignum} aria-hidden="true">01</span>
              <div className={styles.rowInner}>
                <div className={styles.rowEyebrow}>Workshop</div>
                <h3>Το <em>εργαστήριο</em>.</h3>
                <p>
                  Στο Παγκράτι, σε ένα νεοκλασικό του &lsquo;36, βρίσκεται το εργαστήριο. Φως από τα βόρεια παράθυρα, πάγκοι από καρυδιά γερασμένη πάνω από εικοσι χρόνια, εργαλεία που πέρασαν από δυο γενιές.
                </p>
                <p>
                  Δεν είναι μουσείο — είναι ένας ζωντανός χώρος όπου ο ήχος του πλάνου και η μυρωδιά του ξύλου ορίζουν τη μέρα. Κάθε πελάτης που το επιθυμεί, είναι ευπρόσδεκτος να δει το έπιπλό του να γεννιέται.
                </p>
                <div className={styles.rowMeta}>
                  <div>Σημείο<strong>Παγκράτι, Αθήνα</strong></div>
                  <div>Εμβαδόν<strong>200 τ.μ.</strong></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2 — Materials (reversed) */}
          <div className={`${styles.row} ${styles.rowReverse}`}>
            <motion.div className={styles.rowImg} {...fadeUp(0)}>
              <img src="/about-materials.webp" alt="Υλικά Resin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className={styles.frame} />
              <span className={styles.imgCorner}>European oak · walnut</span>
            </motion.div>

            <motion.div className={styles.rowText} {...fadeUp(0.1)}>
              <span className={styles.rowBignum} aria-hidden="true">02</span>
              <div className={styles.rowInner}>
                <div className={styles.rowEyebrow}>Materials</div>
                <h3>Τα <em>υλικά</em>.</h3>
                <p>
                  Δουλεύουμε αποκλειστικά με ευρωπαϊκή δρυ και καρυδιά, από βιώσιμα διαχειριζόμενα δάση της Γαλλίας και της Σλοβενίας. Κάθε σανίδα φτάνει στο εργαστήριο μετά από φυσική ξήρανση τουλάχιστον τριών ετών.
                </p>
                <p>
                  Επιλέγουμε ένα-ένα τα κομμάτια· κρατάμε όσα έχουν χαρακτήρα — ρόζους, νερά, μικρές ατέλειες που μαρτυρούν τη ζωή του δέντρου. Λαδώνουμε με φυσικά έλαια· καθόλου χημικά βερνίκια.
                </p>
                <div className={styles.rowMeta}>
                  <div>Είδη<strong>Oak · Walnut</strong></div>
                  <div>Φινίρισμα<strong>Φυσικά έλαια</strong></div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          6. CTA — showroom booking strip
      ══════════════════════════════════════ */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaInner}>

            <motion.div className={styles.ctaText} {...fadeUp(0)}>
              <div className={styles.eyebrow} style={{ marginBottom: 24 }}>
                Showroom · Με ραντεβού
              </div>
              <h2>Επισκεφτείτε το <em>showroom</em> μας.</h2>
              <div className={styles.ctaAddr}>
                Πλατεία Πλαστήρα 12, Παγκράτι · Δευτέρα–Σάββατο, 10:00–19:00
              </div>
            </motion.div>

            <motion.a href="/contact" className={styles.btn} {...fadeUp(0.1)}>
              Κλείστε ραντεβού
              <span className={styles.btnArrow} aria-hidden="true" />
            </motion.a>

          </div>
        </div>
      </section>

    </div>
  );
}
