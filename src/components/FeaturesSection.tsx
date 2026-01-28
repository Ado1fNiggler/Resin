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
    title: 'Elevated Design, Uncompromising Durability',
    description:
      'Crafted from FSC-certified wood with zero-VOC finishes, our furniture combines sustainability with exceptional quality. Each piece is designed to last, maintaining its beauty and structural integrity for years to come.',
    points: [
      'FSC-certified sustainable wood',
      'Zero-VOC eco-friendly finishes',
      'Handcrafted construction',
      'Available in Natural Oak, Caramel & Dark Walnut',
    ],
    image: 'https://via.placeholder.com/600x500/8B7355/FFFFFF?text=Craftsmanship',
    reverse: false,
  },
  {
    title: 'Luxe Comfort, Effortless Care',
    description:
      'Our removable, water-resistant cushions make cleaning a breeze while providing ultimate comfort for your pet. Choose from 19 premium fabric options to match your home aesthetic perfectly.',
    points: [
      'Removable cushion covers',
      'Water-resistant materials',
      '19 premium fabric choices',
      'Machine washable',
    ],
    image: 'https://via.placeholder.com/600x500/C19A6B/FFFFFF?text=Comfort',
    reverse: true,
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col ${
        feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center gap-16 mb-32 last:mb-0`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: feature.reverse ? 30 : -30 }
        }
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {feature.title}
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {feature.description}
        </motion.p>

        <ul className="space-y-4">
          {feature.points.map((point, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
            >
              <span className="text-primary text-xl font-bold mt-1">✓</span>
              <span className="text-gray-700">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image with subtle parallax */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: feature.reverse ? -30 : 30 }}
        animate={
          isInView
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: feature.reverse ? -30 : 30 }
        }
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        style={{ y }}
      >
        <div className="relative overflow-hidden rounded-2xl shadow-xl group">
          <motion.img
            src={feature.image}
            alt={feature.title}
            className="w-full transition-transform duration-500"
            whileHover={{ scale: 1.03 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-bg-light">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {features.map((feature, index) => (
          <FeatureRow key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
