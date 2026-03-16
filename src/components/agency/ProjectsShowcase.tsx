'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 'rooof-luxury',
    title: 'Resin — Luxury Furniture',
    description: 'A premium luxury furniture e-commerce experience with stunning parallax animations, Ken Burns hero effects, and sophisticated product showcases. Built with Next.js 16 and Framer Motion.',
    tags: ['Next.js', 'React 19', 'Tailwind CSS', 'Framer Motion', 'E-Commerce'],
    gradient: 'from-[#214A4F] to-[#7EC0C9]',
    link: '/projects/rooof-luxury',
    stats: { pages: '6+', animations: '20+', components: '11' },
    image: '/heroimage1.png',
  },
  {
    id: 'spiti365',
    title: 'SPITI365 — AI Voice Bot',
    description: 'An advanced AI-powered voice bot platform for real estate, featuring Twilio integration, Gemini AI intent detection, and automated lead capture with live support dashboard.',
    tags: ['PHP', 'Twilio', 'Gemini AI', 'WebSocket', 'n8n'],
    gradient: 'from-violet-600 to-indigo-600',
    link: '#',
    stats: { calls: '1000+', ai: 'Gemini', uptime: '99.9%' },
    image: null,
  },
  {
    id: 'coming-soon',
    title: 'Your Project — Coming Soon',
    description: 'We are always looking for the next exciting challenge. Got a project in mind? Let us bring your vision to life with cutting-edge technology and creative design.',
    tags: ['Your Stack', 'Your Vision', 'Our Expertise'],
    gradient: 'from-orange-500 to-rose-500',
    link: '#contact',
    stats: { budget: 'Flexible', timeline: 'On Time', quality: '100%' },
    image: null,
  },
];

export default function ProjectsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 bg-[#07070b] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-6">
            Our Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Projects that{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              inspire
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real projects, real results. Click on any project to see it live.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.link}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative block rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-all duration-500"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700`}
              />

              <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
                {/* Left: Info */}
                <div className="flex-1">
                  {/* Project number */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`text-sm font-mono bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                      0{i + 1}
                    </span>
                    <div className={`h-[1px] w-12 bg-gradient-to-r ${project.gradient} opacity-30`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed mb-6 max-w-xl">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-gray-300 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key}>
                        <div className="text-xl font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Preview / Arrow */}
                <div className="flex-shrink-0 flex items-center">
                  {project.image ? (
                    <div className="relative w-full md:w-[320px] h-[200px] rounded-2xl overflow-hidden border border-white/5">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : (
                    <div className={`w-[320px] h-[200px] rounded-2xl bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 hidden md:flex items-center justify-center`}>
                      <svg className="w-16 h-16 text-white/20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom progress line */}
              <motion.div
                className={`h-[2px] bg-gradient-to-r ${project.gradient}`}
                initial={{ scaleX: 0 }}
                animate={hoveredProject === project.id ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
