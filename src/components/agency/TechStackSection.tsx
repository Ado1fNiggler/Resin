'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const integrations = [
  { name: 'OpenAI', color: '#10A37F' },
  { name: 'Anthropic', color: '#D4A27F' },
  { name: 'Google AI', color: '#4285F4' },
  { name: 'Slack', color: '#4A154B' },
  { name: 'n8n', color: '#EA4B71' },
  { name: 'Twilio', color: '#F22F46' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Python', color: '#3776AB' },
  { name: 'PostgreSQL', color: '#4169E1' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'Vercel', color: '#ffffff' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Redis', color: '#DC382D' },
  { name: 'MySQL', color: '#4479A1' },
  { name: 'PHP', color: '#777BB4' },
  { name: 'Git', color: '#F05032' },
  { name: 'WebSocket', color: '#4353FF' },
  { name: 'Gemini', color: '#886FBF' },
  { name: 'Zapier', color: '#FF4A00' },
  { name: 'HubSpot', color: '#FF7A59' },
  { name: 'Stripe', color: '#635BFF' },
  { name: 'Supabase', color: '#3ECF8E' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'GraphQL', color: '#E535AB' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'Framer', color: '#FF0055' },
];

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/70 mb-4 leading-tight">
            Connect AI to your data &<br />
            <span className="text-orange-400">500+ integrations</span>
          </h2>
        </motion.div>

        {/* Integration icons grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto mb-12"
        >
          {integrations.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.02 * i }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/15 transition-all duration-300 cursor-default"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                style={{ backgroundColor: tech.color }}
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/automations"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition-all duration-300"
          >
            Browse all automations
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
