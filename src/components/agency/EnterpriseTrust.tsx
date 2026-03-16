'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const enterpriseFeatures = [
  {
    category: 'Security',
    items: 'SSL encryption, secure API handling, environment variables, OWASP best practices, regular security audits.',
  },
  {
    category: 'Reliability',
    items: 'Automated monitoring, error logging, health checks, 99.9% uptime SLAs, disaster recovery plans.',
  },
  {
    category: 'Scalability',
    items: 'Container orchestration, auto-scaling, load balancing, CDN distribution, edge deployment.',
  },
  {
    category: 'Collaboration',
    items: 'Git version control, CI/CD pipelines, staging environments, code reviews, documentation.',
  },
];

const certifications = [
  { label: 'GDPR', sublabel: 'Compliant' },
  { label: 'SSL', sublabel: 'Encrypted' },
  { label: 'SOC 2', sublabel: 'Practices' },
];

export default function EnterpriseTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Features table */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Enterprise-grade{' '}
                <span className="text-orange-400">reliability</span>
              </h2>
              <p className="text-gray-400 max-w-lg">
                Built with security and scalability at the core. Every project follows industry best practices.
              </p>
            </motion.div>

            <div className="space-y-0">
              {enterpriseFeatures.map((feature, i) => (
                <motion.div
                  key={feature.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className="flex flex-col sm:flex-row gap-4 py-6 border-b border-white/5"
                >
                  <div className="sm:w-36 flex-shrink-0">
                    <span className="text-sm font-semibold text-white">{feature.category}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.items}</p>
                </motion.div>
              ))}
            </div>

            {/* Certification badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-4 mt-8"
            >
              {certifications.map((cert) => (
                <div
                  key={cert.label}
                  className="flex items-center justify-center w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.02]"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white">{cert.label}</div>
                    <div className="text-[10px] text-gray-500">{cert.sublabel}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Quote card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sticky top-32">
              <p className="text-lg text-orange-400 italic leading-relaxed mb-6">
                &laquo;The idea is that everyone in the organization can use the automation platform to manage data retrieval and transformation.&raquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-violet-500 flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Stelios G.</div>
                  <div className="text-sm text-gray-500">Founder, Liougiourou</div>
                </div>
              </div>

              <a
                href="#about"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mt-6"
              >
                Learn about our approach
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
