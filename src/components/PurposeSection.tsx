'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function PurposeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax on the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: '130vh' }}
    >
      {/* Parallax background image - right side */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/family1.png)`,
            y: imageY,
            scale: 1.1,
          }}
        />
      </div>

      {/* Split-screen layout: Text card on left, image visible on right */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-[100px] w-full">
        <div className="max-w-lg">
          <motion.div
            className="bg-white/90 p-10 md:p-14"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-[54px] font-light mb-6"
              style={{
                color: '#214A4F',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1.15,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Αγόρασε Resin,<br />
              <span className="italic">χάρισε σπίτι.</span>
            </motion.h2>

            <motion.p
              className="text-sm leading-relaxed mb-8"
              style={{ color: '#214A4F', opacity: 0.8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Για κάθε έπιπλο που αγοράζετε, δωρίζουμε ένα μέρος στην υποστήριξη
              οικογενειών που χρειάζονται στέγη. Γίνετε μέρος μιας κίνησης
              που αλλάζει ζωές, ένα σπίτι τη φορά.
            </motion.p>

            <motion.button
              className="px-7 py-3 rounded-full text-xs font-medium uppercase tracking-[0.1em] border transition-all duration-300"
              style={{
                borderColor: '#214A4F',
                color: '#214A4F',
                backgroundColor: 'transparent',
              }}
              whileHover={{ backgroundColor: '#214A4F', color: '#ffffff' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Μάθετε περισσότερα
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
