'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" /><circle cx="12" cy="12" r="3" />
        <path d="M18.364 5.636l-2.828 2.828m-7.072 7.072l-2.828 2.828m0-12.728l2.828 2.828m7.072 7.072l2.828 2.828" />
      </svg>
    ),
    title: 'Automations',
    description: 'n8n workflows, AI agents, chatbots, and intelligent process automation. We connect your tools into self-running systems that work 24/7.',
    features: ['n8n & Zapier Workflows', 'AI Chatbots & Voice Bots', 'Email & CRM Automation', 'Custom AI Integrations'],
    link: '/automations',
    linkLabel: 'Browse Automations',
    badge: null,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.27 6.96 8.73 5.05 8.73-5.05M12 22.08V12" />
      </svg>
    ),
    title: 'Enterprise Applications',
    description: 'Custom business applications built for your specific needs. From AI-powered phone centers to medical records management systems.',
    features: ['Auto Phone Center for Real Estate', 'Medical History Management', 'CRM & ERP Systems', 'Real-time Dashboards'],
    link: null,
    linkLabel: 'Coming Soon',
    badge: 'Coming Soon',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Modern, blazing-fast websites and web applications built with Next.js, React, and cutting-edge frameworks.',
    features: ['Next.js & React Apps', 'E-Commerce Platforms', 'Landing Pages & Marketing Sites', 'API Development'],
    link: '#contact',
    linkLabel: 'Start a Project',
    badge: null,
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Thin border line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-slate-400 mb-6 tracking-widest uppercase text-xs font-mono"
          >
            Services
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            What we{' '}
            <span className="text-[#38bdf8]">build</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From intelligent automation to custom enterprise software,
            we deliver end-to-end solutions that drive real results.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Coming Soon badge */}
              {service.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-sky-400/30 text-sky-400 bg-sky-400/10">
                    {service.badge}
                  </span>
                </div>
              )}

              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-6 text-[#38bdf8]">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                      <svg className="w-4 h-4 text-[#38bdf8] flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                {service.link ? (
                  <a
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#38bdf8] hover:text-sky-300 transition-colors duration-300"
                  >
                    <span>{service.linkLabel}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-500">
                    {service.linkLabel}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Thin border line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
