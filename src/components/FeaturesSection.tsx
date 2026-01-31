'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  points: string[];
  image: string;
  reverse?: boolean;
}

const features: Feature[] = [
  {
    title: 'Σύγχρονος σχεδιασμός, ανυποχώρητη αντοχή',
    description:
      'Κατασκευασμένα από πιστοποιημένο ξύλο FSC με φινίρισμα μηδενικών εκπομπών VOC, τα έπιπλά μας συνδυάζουν τη βιωσιμότητα με εξαιρετική ποιότητα.',
    points: [
      'Πιστοποιημένο ξύλο FSC',
      'Φινίρισμα μηδενικών εκπομπών',
      'Χειροποίητη κατασκευή',
      'Natural Oak, Caramel & Dark Walnut',
    ],
    image: '/sofa.png',
    reverse: false,
  },
  {
    title: 'Πολυτελής άνεση, εύκολη φροντίδα',
    description:
      'Αφαιρούμενα, αδιάβροχα μαξιλάρια για εύκολο καθαρισμό και απόλυτη άνεση. Επιλέξτε ανάμεσα σε 19 premium υφάσματα.',
    points: [
      'Αφαιρούμενα καλύμματα',
      'Αδιάβροχα υλικά',
      '19 premium υφάσματα',
      'Πλένονται στο πλυντήριο',
    ],
    image: '/table.png',
    reverse: true,
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax on image
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${
        feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-12 lg:gap-20 mb-32 last:mb-0`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-[44px] font-light mb-6"
          style={{
            color: '#214A4F',
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {feature.title}
        </motion.h2>

        <motion.p
          className="text-sm leading-relaxed mb-8"
          style={{ color: '#214A4F', opacity: 0.7 }}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {feature.description}
        </motion.p>

        <ul className="space-y-3">
          {feature.points.map((point, i) => (
            <motion.li
              key={i}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(33,74,79,0.1)' }}
              >
                <svg className="w-3 h-3" fill="none" stroke="#214A4F" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm" style={{ color: '#214A4F' }}>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image with parallax */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: feature.reverse ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="relative overflow-hidden group">
          <motion.img
            src={feature.image}
            alt={feature.title}
            className="w-full"
            style={{ y }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24" style={{ backgroundColor: '#F7F6F3' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-[100px]">
        {features.map((feature, index) => (
          <FeatureRow key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
