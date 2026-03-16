'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const footerLinks = {
  Services: [
    { label: 'Automations', href: '/automations' },
    { label: 'Enterprise Apps', href: '#services' },
    { label: 'Web Development', href: '#services' },
  ],
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Email', href: 'mailto:hello@liougiourou.dev' },
  ],
};

export default function AgencyFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="relative bg-[#050508] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: Brand + Newsletter */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="max-w-sm"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#38bdf8] flex items-center justify-center">
                <span className="text-white font-bold text-base">L</span>
              </div>
              <span className="text-white font-bold text-lg">liougiourou</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Building the future of automation and web technology.
              We transform complex business processes into elegant digital solutions.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-500">Available for new projects</span>
            </div>
          </motion.div>

          {/* Newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full md:w-auto"
          >
            <h4 className="text-white font-semibold mb-3 text-sm">Stay updated</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 transition-colors w-64"
              />
              <button className="px-4 py-2.5 rounded-lg bg-[#38bdf8] text-white text-sm font-semibold hover:bg-[#0ea5e9] transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.05 }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Liougiourou. All rights reserved.
            </p>
            <div className="hidden sm:flex items-center gap-4 text-xs text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
          >
            Back to top
            <svg
              className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
