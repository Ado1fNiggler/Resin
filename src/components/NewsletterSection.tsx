'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function NewsletterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center"
      data-image-section
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/background.png)` }}
      />
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0" style={{ backgroundColor: 'rgba(33,74,79,0.75)' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-[100px] w-full">
        <div className="flex items-center">
          {/* Card with form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              backgroundColor: 'rgba(33,74,79,0.55)',
              padding: '70px 55px',
              maxWidth: '480px',
            }}
          >
            <h2
              className="text-4xl md:text-5xl lg:text-[54px] font-light mb-6"
              style={{
                color: '#FCFCFC',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1.15,
              }}
            >
              Μείνετε<br />ενημερωμένοι
            </h2>

            <motion.p
              className="text-sm leading-relaxed mb-10"
              style={{ color: 'rgba(252,252,252,0.7)' }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Εγγραφείτε στο newsletter μας για αποκλειστικές προσφορές,
              νέες αφίξεις και συμβουλές σχεδιασμού εσωτερικών χώρων.
            </motion.p>

            {/* Email input - underline style */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Το email σας"
                  className="w-full bg-transparent border-b border-white/30 text-white py-3 text-sm tracking-wide placeholder:text-white/40 focus:outline-none focus:border-white/70 transition-colors duration-300"
                />
              </div>
            </motion.div>

            {/* Subscribe button - white pill */}
            <motion.button
              className="w-full py-4 rounded-full text-xs font-medium uppercase tracking-[0.1em] transition-all duration-300"
              style={{
                backgroundColor: '#FCFCFC',
                color: '#214A4F',
              }}
              whileHover={{ scale: 1.03, backgroundColor: '#ffffff' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Εγγραφή τώρα
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
