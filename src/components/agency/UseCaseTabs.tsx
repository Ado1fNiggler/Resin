'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const useCases = [
  {
    id: 'automation',
    label: 'IT Operations',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    ),
    title: 'Automate your IT operations',
    description: 'Streamline onboarding, incident response, and infrastructure management with intelligent automation workflows.',
    features: ['Automated ticket routing', 'Self-service portals', 'Infrastructure monitoring', 'Incident auto-remediation'],
    workflow: [
      { name: 'Webhook', type: 'trigger', color: 'emerald' },
      { name: 'AI Classify', type: 'process', color: 'violet' },
      { name: 'Route', type: 'condition', color: 'cyan' },
      { name: 'Resolve', type: 'action', color: 'orange' },
    ],
  },
  {
    id: 'security',
    label: 'Security Ops',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
    ),
    title: 'Enhance security operations',
    description: 'Enrich security alerts, automate threat response, and maintain compliance with AI-powered workflows.',
    features: ['Automated alert triage', 'Threat intelligence enrichment', 'Compliance monitoring', 'Incident response playbooks'],
    workflow: [
      { name: 'Alert', type: 'trigger', color: 'red' },
      { name: 'Enrich', type: 'process', color: 'violet' },
      { name: 'Analyze', type: 'ai', color: 'cyan' },
      { name: 'Respond', type: 'action', color: 'emerald' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    ),
    title: 'Supercharge your DevOps pipeline',
    description: 'Transform natural language into API calls, automate deployments, and create self-healing infrastructure.',
    features: ['CI/CD automation', 'Container orchestration', 'Log analysis & alerting', 'Auto-scaling workflows'],
    workflow: [
      { name: 'Git Push', type: 'trigger', color: 'orange' },
      { name: 'Build', type: 'process', color: 'cyan' },
      { name: 'Test', type: 'condition', color: 'violet' },
      { name: 'Deploy', type: 'action', color: 'emerald' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales & CRM',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    title: 'Automate your sales pipeline',
    description: 'Create customer profiles from reviews, automate lead scoring, and sync your CRM with intelligent workflows.',
    features: ['Lead scoring & routing', 'CRM sync automation', 'Email sequence triggers', 'Revenue forecasting'],
    workflow: [
      { name: 'New Lead', type: 'trigger', color: 'cyan' },
      { name: 'AI Score', type: 'ai', color: 'violet' },
      { name: 'Qualify', type: 'condition', color: 'orange' },
      { name: 'Assign', type: 'action', color: 'emerald' },
    ],
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
  violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
};

export default function UseCaseTabs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);
  const activeCase = useCases[activeTab];

  return (
    <section ref={ref} className="relative py-24 bg-[#0a0a0f] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-12 justify-center"
        >
          {useCases.map((uc, i) => (
            <button
              key={uc.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === i
                  ? 'bg-white/10 border border-white/20 text-white shadow-lg'
                  : 'bg-white/[0.02] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {uc.icon}
              {uc.label}
            </button>
          ))}
        </motion.div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-[#0c0c14]/80 backdrop-blur-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: Info */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {activeCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  {activeCase.description}
                </p>
                <ul className="space-y-3">
                  {activeCase.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Workflow preview */}
              <div className="relative p-8 md:p-12 bg-[#08080e] flex items-center justify-center">
                {/* Dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative flex flex-col items-center gap-4">
                  {/* Workflow nodes */}
                  <div className="flex items-center gap-3 flex-wrap justify-center">
                    {activeCase.workflow.map((node, i) => {
                      const colors = colorClasses[node.color] || colorClasses.violet;
                      return (
                        <div key={node.name} className="flex items-center gap-3">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + i * 0.1, duration: 0.3 }}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl ${colors.bg} border ${colors.border}`}
                          >
                            <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                              <span className={`text-xs font-bold ${colors.text}`}>{node.name.charAt(0)}</span>
                            </div>
                            <div>
                              <div className={`text-xs font-medium ${colors.text}`}>{node.name}</div>
                              <div className="text-[10px] text-gray-500">{node.type}</div>
                            </div>
                          </motion.div>
                          {i < activeCase.workflow.length - 1 && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.2 + i * 0.1, duration: 0.2 }}
                              className="w-6 h-[2px] bg-white/10 origin-left hidden sm:block"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Status indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2 mt-4"
                  >
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-emerald-400"
                    />
                    <span className="text-xs text-gray-500 font-mono">Workflow active</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
