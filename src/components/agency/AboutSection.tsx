'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const team = [
  {
    name: 'Stelios',
    role: 'Full-Stack Developer & AI Architect',
    bio: 'Systems thinker obsessed with automation. From AI voice bots to complex web platforms, turning ideas into production-grade code.',
    initial: 'S',
  },
  {
    name: 'Partner',
    role: 'Frontend Developer & UI/UX Designer',
    bio: 'Pixel-perfect craftsman with an eye for design. Creating stunning user experiences that leave lasting impressions.',
    initial: 'P',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 bg-[#0e0e14] overflow-hidden"
    >
      {/* Thin border line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-slate-400 tracking-widest uppercase font-mono mb-6">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              We are{' '}
              <span className="text-[#38bdf8]">builders</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              We are a small but powerful team of developers and designers
              who believe that every business deserves world-class technology.
              We specialize in automation, AI integration, and modern web development.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Based in Greece, working globally. We combine deep technical expertise
              with creative design to deliver solutions that not only work perfectly —
              they look stunning doing it.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2024' },
                { label: 'Location', value: 'Greece' },
                { label: 'Focus', value: 'AI & Web' },
                { label: 'Approach', value: 'Agile' },
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="text-sm text-slate-500">{fact.label}</div>
                  <div className="text-white font-semibold">{fact.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Team cards */}
          <div className="space-y-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.12] transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg ${i === 0 ? 'bg-[#38bdf8]' : 'bg-sky-600'}`}>
                    {member.initial}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-[#38bdf8] font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin border line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
