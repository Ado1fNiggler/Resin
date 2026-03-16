'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
  {
    quote: 'We have seen dramatic improvements in productivity since we started using their automation systems. The AI workflows they built handle what used to take our team hours.',
    name: 'Maria K.',
    role: 'Operations Director',
    company: 'SPITI365',
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    quote: 'The integration speed is incredible. What would take us weeks to connect APIs and transform data, they delivered in days. You cannot achieve this without their expertise.',
    name: 'Giorgos P.',
    role: 'Technical Lead',
    company: 'TechFlow Solutions',
    gradient: 'from-orange-500/20 to-transparent',
  },
];

const communityReviews = [
  {
    text: 'Their automation platform transformed our business. Watched the demo and immediately saw the value for our workflow management.',
    name: 'Alex T.',
    handle: '@alext_dev',
  },
  {
    text: 'The AI voice bot they built is a beast for customer service. The low-code approach and automation capabilities make every interaction smooth.',
    name: 'Nikos M.',
    handle: '@nikosm',
  },
  {
    text: 'Working with Liougiourou was seamless. They understood our technical requirements and delivered beyond expectations. Highly recommend.',
    name: 'Elena S.',
    handle: '@elenas_tech',
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 bg-[#07070b] overflow-hidden">
      {/* Background aurora */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-orange-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by{' '}
            <span className="text-orange-400">
              businesses
            </span>
          </h2>
        </motion.div>

        {/* Featured testimonials - 2 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              className={`relative rounded-2xl border border-white/5 bg-gradient-to-b ${t.gradient} p-8 md:p-10`}
            >
              <div className="mb-6">
                <p className="text-gray-300 leading-relaxed text-lg italic">
                  &laquo;{t.quote}&raquo;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}, {t.company}</div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-400 transition-colors"
                >
                  Read Case Study
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community reviews - horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {communityReviews.map((review, i) => (
            <motion.div
              key={review.handle}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">
                {review.text}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-400">{review.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
