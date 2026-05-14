'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 'rooof',
    title: 'ROOOF Luxury Furniture',
    description: 'Premium furniture e-commerce experience',
    tags: ['Next.js', 'React 19', 'Framer Motion'],
    screenshot: '/heroimage1.webp',
    link: '/projects/rooof-luxury',
  },
  {
    id: 'spiti365',
    title: 'SPITI365 AI Voice Bot',
    description: 'AI-powered voice bot for real estate agencies',
    tags: ['PHP', 'Twilio', 'Gemini AI', 'n8n'],
    screenshot: null,
    link: null,
  },
  {
    id: 'automations',
    title: 'Automations Dashboard',
    description: 'n8n workflow management and monitoring',
    tags: ['n8n', 'React', 'WebSocket'],
    screenshot: null,
    link: null,
  },
  {
    id: 'medical',
    title: 'Medical Records App',
    description: 'Patient history management system',
    tags: ['Next.js', 'PostgreSQL', 'HIPAA'],
    screenshot: null,
    link: null,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with AI recommendations',
    tags: ['Next.js', 'Stripe', 'AI'],
    screenshot: null,
    link: null,
  },
  {
    id: 'coming-soon',
    title: 'Your Project',
    description: 'Let us bring your vision to life',
    tags: ['Your Stack', 'Your Vision'],
    screenshot: null,
    link: '#contact',
  },
];

function ShowcaseCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {project.link ? (
        <a href={project.link} className="group block">
          <CardContent project={project} />
        </a>
      ) : (
        <div className="group">
          <CardContent project={project} />
        </div>
      )}
    </motion.div>
  );
}

function CardContent({ project }: { project: typeof projects[0] }) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 bg-white/[0.02]">
      {/* Screenshot container */}
      <div className="relative h-[280px] overflow-hidden bg-[#0e0e14]">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={project.title}
            className="showcase-scroll-image w-full object-cover object-top"
            style={{ minHeight: '200%' }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl border border-white/[0.06] flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
              </svg>
            </div>
            <span className="text-sm text-slate-600">Coming Soon</span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="p-5 border-t border-white/[0.06]">
        <h3 className="text-white font-semibold mb-1 group-hover:text-sky-100 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 mb-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs border border-white/[0.06] text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ShowcaseGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative py-32 bg-[#0e0e14] overflow-hidden"
    >
      {/* Thin border line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-slate-400 tracking-widest uppercase font-mono mb-4">
            Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Selected <span className="text-[#38bdf8]">work</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ShowcaseCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Thin border line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
