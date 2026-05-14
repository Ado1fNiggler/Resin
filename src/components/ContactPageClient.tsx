'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactPageClient.module.css';

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const, delay },
});

export default function ContactPageClient() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className={styles.page}>

      {/* ══ 1. HERO ══ */}
      <section className={styles.hero}>

        {/* Left — teal panel */}
        <div className={styles.heroLeft}>
          <span className={styles.cornerLabel}>
            <span className={styles.num}>№ 05</span>— Contact
          </span>

          <motion.div {...reveal(0)}>
            <span className={styles.eyebrow}>ΕΠΙΚΟΙΝΩΝΙΑ</span>
            <h1 className={styles.heroHeading}>
              Ελάτε να<br /><em>μιλήσουμε.</em>
            </h1>
            <p className={styles.heroSub}>
              Showroom με ραντεβού — Δευτέρα–Σάββατο, 10:00–19:00.
              Παρουσιάζουμε τη συλλογή και κάθε παραγγελία ξεκινά με μια ήρεμη συζήτηση.
            </p>
          </motion.div>

          <div className={styles.heroFoot}>
            <span>Athens · GR</span>
            <span className={styles.est}>Est. MMXIV</span>
            <span>Atelier № 12</span>
          </div>
        </div>

        {/* Right — map placeholder */}
        <div className={styles.heroRight} aria-hidden="true">
          <div className={styles.map} />

          <div className={styles.mapMeta}>
            <span>37.9665° N</span>
            <span className={styles.sep}>·</span>
            <span>23.7470° E</span>
          </div>

          <div className={styles.pin}>
            <div className={styles.ring} />
            <div className={`${styles.ring} ${styles.ringMid}`} />
            <div className={`${styles.ring} ${styles.ringInner}`} />
            <div className={styles.cross} />
            <div className={`${styles.cross} ${styles.crossH}`} />
            <div className={styles.pulse} />
            <div className={styles.pinDot} />
          </div>

          <div className={styles.mapCaption}>
            <span>Πλατεία Πλαστήρα 12 · Παγκράτι</span>
          </div>
        </div>
      </section>

      {/* ══ 2. FORM SECTION ══ */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>

            {/* Aside */}
            <motion.div {...reveal(0)}>
              <span className={styles.sectionMarker}>
                <span className={styles.num}>02</span>
                <span>·</span>
                <span>Φόρμα</span>
              </span>
              <h2 className={styles.formHeading}>
                Στείλτε μας <em>μήνυμα.</em>
              </h2>
              <p className={styles.formAsideNote}>
                Απαντάμε προσωπικά εντός δύο εργάσιμων ημερών. Για παραγγελίες κατά
                παραγγελία, σας προτείνουμε να κλείσετε ραντεβού στο showroom μας
                στο Παγκράτι.
              </p>
              <dl className={styles.formAsideMeta}>
                <div>
                  <dt>Απάντηση</dt>
                  <dd>έως 48 ώρες</dd>
                </div>
                <div>
                  <dt>Γλώσσες</dt>
                  <dd>EL · EN · FR</dd>
                </div>
                <div>
                  <dt>Παράδοση</dt>
                  <dd>10–14 εβδομάδες</dd>
                </div>
              </dl>
            </motion.div>

            {/* Form */}
            <motion.div {...reveal(0.1)}>
              {sent ? (
                <div className={styles.sentState}>
                  <h3>Το μήνυμά σας στάλθηκε.</h3>
                  <p>Θα επικοινωνήσουμε μαζί σας εντός δύο εργάσιμων ημερών.</p>
                </div>
              ) : (
                <form className={styles.form} noValidate onSubmit={handleSubmit}>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <input id="name" name="name" type="text" placeholder=" " autoComplete="name" />
                      <label htmlFor="name">Όνομα</label>
                    </div>
                    <div className={styles.field}>
                      <input id="email" name="email" type="email" placeholder=" " autoComplete="email" />
                      <label htmlFor="email">Email</label>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <input id="phone" name="phone" type="tel" placeholder=" " autoComplete="tel" />
                    <label htmlFor="phone">
                      Τηλέφωνο<span className={styles.opt}>προαιρετικό</span>
                    </label>
                  </div>

                  <div className={styles.field}>
                    <textarea id="message" name="message" rows={5} placeholder=" " />
                    <label htmlFor="message">Μήνυμα</label>
                  </div>

                  <button type="submit" className={styles.submit}>
                    <span>Αποστολή μηνύματος</span>
                    <span className={styles.submitArrow} aria-hidden="true">
                      <svg width="42" height="10" viewBox="0 0 42 10" fill="none">
                        <path d="M0 5H40M40 5L36 1M40 5L36 9" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </span>
                  </button>

                  <p className={styles.formConsent}>
                    Με την αποστολή αποδέχεστε την{' '}
                    <a href="#">πολιτική απορρήτου</a> μας.
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ 3. INFO STRIP ══ */}
      <section className={styles.infoStrip}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>

            <motion.div className={styles.infoCol} {...reveal(0)}>
              <span className={styles.rule} />
              <div className={styles.label}>Showroom</div>
              <div className={styles.value}>
                Πλατεία Πλαστήρα 12,<br />Παγκράτι, Αθήνα
              </div>
            </motion.div>

            <motion.div className={styles.infoCol} {...reveal(0.06)}>
              <span className={styles.rule} />
              <div className={styles.label}>Ώρες λειτουργίας</div>
              <div className={styles.value}>
                Δευτέρα – Σάββατο<span className={styles.sep}>·</span><br />10:00 – 19:00
              </div>
            </motion.div>

            <motion.div className={styles.infoCol} {...reveal(0.12)}>
              <span className={styles.rule} />
              <div className={styles.label}>Επικοινωνία</div>
              <div className={styles.value}>
                <a href="mailto:hello@resin.gr">hello@resin.gr</a>
                <span className={styles.sep}>·</span><br />
                +30 210 000 0000
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══ 4. WORKSHOP ROW ══ */}
      <section className={styles.workshop}>
        <div className={styles.container}>
          <div className={styles.workshopGrid}>

            <motion.div
              className={styles.workshopImage}
              aria-label="Φωτογραφία εργαστηρίου"
              {...reveal(0)}
            >
              <span className={styles.imgNum}>№ 04</span>
              <span className={styles.imgTag}>Atelier · Παγκράτι</span>
            </motion.div>

            <motion.div className={styles.workshopText} {...reveal(0.1)}>
              <span className={styles.eyebrowDark}>Workshop</span>
              <h2>
                Επισκεφτείτε <br />το <em>εργαστήριο.</em>
              </h2>
              <p>
                Το εργαστήριό μας στεγάζεται σε ένα παλιό βιοτεχνικό κτίριο του &apos;50,
                λίγα μέτρα πίσω από το showroom. Εκεί κόβονται, αρμολογούνται και
                φινίρονται όλα τα κομμάτια στο χέρι, από έξι μαστόρους.
              </p>
              <p>
                Κλείστε ραντεβού για μια ιδιωτική ξενάγηση και δείτε από κοντά το ξύλο,
                τα εργαλεία και τις δοκιμές χρωμάτων. Διαθέτουμε ώρες κάθε Πέμπτη
                απόγευμα και Σάββατο πρωί.
              </p>
              <blockquote className={styles.quote}>
                Κάθε πελάτης είναι ευπρόσδεκτος να δει το έπιπλό του να γεννιέται.
              </blockquote>
              <div className={styles.quoteAttribution}>
                <span className={styles.num}>— Δ.Π.</span>
                <span>Founder &amp; Master Craftsman</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
