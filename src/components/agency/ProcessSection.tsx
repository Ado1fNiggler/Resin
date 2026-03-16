'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business, understand your workflows, pain points, and goals. Every great solution starts with listening.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    color: 'violet',
  },
  {
    number: '02',
    title: 'Design & Plan',
    description: 'Architecture, wireframes, and technical specifications. We plan every detail before writing a single line of code.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: 'cyan',
  },
  {
    number: '03',
    title: 'Build & Iterate',
    description: 'Agile development with weekly demos. You see progress in real-time and provide feedback at every stage.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: 'orange',
  },
  {
    number: '04',
    title: 'Launch & Scale',
    description: 'Deployment, monitoring, and ongoing optimization. We don\'t disappear after launch — we help you grow.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    color: 'emerald',
  },
];

const colorMap: Record<string, { gradient: string; bg: string; text: string; line: string }> = {
  violet: { gradient: 'from-violet-500 to-purple-600', bg: 'bg-violet-500/10', text: 'text-violet-400', line: 'bg-violet-500' },
  cyan: { gradient: 'from-cyan-500 to-blue-600', bg: 'bg-cyan-500/10', text: 'text-cyan-400', line: 'bg-cyan-500' },
  orange: { gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-500/10', text: 'text-orange-400', line: 'bg-orange-500' },
  emerald: { gradient: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10', text: 'text-emerald-400', line: 'bg-emerald-500' },
};

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-6">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
              process
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A proven methodology that delivers results, on time and on budget.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5">
            <motion.div
              className="w-full bg-gradient-to-b from-violet-500 via-cyan-500 to-emerald-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-20">
            {steps.map((step, i) => {
              const colors = colorMap[step.color];
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 * i }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ml-20 md:ml-0 ${isEven ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
                    <span className={`text-sm font-mono ${colors.text} mb-2 block`}>
                      Step {step.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0">
                    <div className={`w-16 h-16 rounded-2xl ${colors.bg} border border-white/10 flex items-center justify-center ${colors.text}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
