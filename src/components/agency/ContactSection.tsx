'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 bg-[#0a0a0f] overflow-hidden"
    >
      {/* Thin border line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-slate-400 tracking-widest uppercase font-mono mb-6">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Let&apos;s build{' '}
            <span className="text-[#38bdf8]">something amazing</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to transform your business with automation and cutting-edge technology?
            Tell us about your project.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm"
        >
          <form className="relative space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>
            </div>

            {/* Project type */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Project Type</label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-300 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.05] transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0a0a0f]">Select a service...</option>
                <option value="automation" className="bg-[#0a0a0f]">Automations</option>
                <option value="enterprise" className="bg-[#0a0a0f]">Enterprise Applications</option>
                <option value="web" className="bg-[#0a0a0f]">Web Development</option>
                <option value="other" className="bg-[#0a0a0f]">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm text-slate-400 mb-2">Tell Us About Your Project</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your project, goals, and timeline..."
                rows={5}
                className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-white/[0.05] transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                className="group relative w-full sm:w-auto px-10 py-4 rounded-xl bg-[#38bdf8] text-white font-semibold text-lg overflow-hidden hover:bg-[#0ea5e9] hover:shadow-[0_0_40px_rgba(56,189,248,0.2)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </button>
              <p className="text-sm text-slate-500">
                We typically respond within 24 hours
              </p>
            </div>
          </form>
        </motion.div>

        {/* Alternative contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              ),
              label: 'Email',
              value: 'hello@liougiourou.dev',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" />
                </svg>
              ),
              label: 'Location',
              value: 'Greece',
            },
            {
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              label: 'Response Time',
              value: 'Within 24h',
            },
          ].map((contact) => (
            <div
              key={contact.label}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="text-slate-400">{contact.icon}</div>
              <div>
                <div className="text-xs text-slate-500">{contact.label}</div>
                <div className="text-sm text-white">{contact.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
