'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const clientLogos = [
  { name: 'SPITI365', letter: 'S' },
  { name: 'Rooof Luxury', letter: 'R' },
  { name: 'TechFlow', letter: 'T' },
  { name: 'AutoSync', letter: 'A' },
  { name: 'DataBridge', letter: 'D' },
];

const proofCards = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    highlight: 'Open Source First.',
    description: 'We build with open-source tools and contribute back to the community.',
    color: 'text-white',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    highlight: '5/5 Client Rating.',
    description: 'Every project delivered with excellence. Our clients come back for more.',
    color: 'text-orange-400',
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    highlight: '50+ Projects Delivered.',
    description: 'Trusted by businesses across Greece and worldwide to automate their operations.',
    color: 'text-violet-400',
  },
];

export default function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 bg-[#0a0a0f] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Client logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-12 mb-16"
        >
          {clientLogos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              className="flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-sm font-bold text-gray-400">{logo.letter}</span>
              </div>
              <span className="text-lg font-bold text-gray-400 tracking-tight">{logo.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Proof cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proofCards.map((card, i) => (
            <motion.div
              key={card.highlight}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * i }}
              className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500"
            >
              <div className={`mb-4 ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-bold text-white">{card.highlight}</span>{' '}
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
