'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { type Automation, CATEGORY_META } from './automationsData';

interface AutomationDetailProps {
  automation: Automation;
  onClose: () => void;
}

export default function AutomationDetail({ automation, onClose }: AutomationDetailProps) {
  const detailRef = useRef<HTMLDivElement>(null);

  // Scroll into view when opened
  useEffect(() => {
    const timeout = setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      ref={detailRef}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-full overflow-hidden scroll-mt-28"
    >
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-10 mt-2 mb-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all z-10"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Content (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Service icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-wrap items-center gap-2"
            >
              {automation.icons.map((icon) => (
                <div
                  key={icon.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: icon.color }}
                  />
                  <span className="text-xs text-gray-300 whitespace-nowrap">{icon.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-white leading-tight"
            >
              {automation.title}
            </motion.h2>

            {/* Category pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/[0.06]"
                style={{ color: CATEGORY_META[automation.category].color + 'cc' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: CATEGORY_META[automation.category].color }}
                />
                {CATEGORY_META[automation.category].label}
              </span>
            </motion.div>

            {/* The Problem */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-2">
                The Problem
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {automation.problem}
              </p>
            </motion.div>

            {/* The Solution */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider mb-2">
                The Solution
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                {automation.solution}
              </p>
            </motion.div>

            {/* Business Impact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
                Business Impact
              </h3>
              <ul className="space-y-2">
                {automation.impact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Template link */}
            {automation.templateUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <a
                  href={automation.templateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sky-400/30 text-sky-400 text-sm font-semibold hover:bg-sky-400/10 hover:border-sky-400/50 transition-all duration-300"
                >
                  View n8n Template
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                  </svg>
                </a>
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Diagram + How it works (3/5) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Workflow diagram image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-gray-900/50 to-gray-800/30"
            >
              {/* Placeholder gradient when no real image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <DiagramPlaceholder automation={automation} />
              </div>

              {/* Toolbar strip */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06] bg-white/[0.02]">
                <span className="text-xs text-gray-500 font-medium">
                  n8n Workflow Diagram
                </span>
                <div className="flex items-center gap-1">
                  {automation.nodes.slice(0, 5).map((node) => (
                    <span
                      key={node}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-gray-400 border border-white/[0.06]"
                    >
                      {node}
                    </span>
                  ))}
                  {automation.nodes.length > 5 && (
                    <span className="text-[10px] text-gray-500">+{automation.nodes.length - 5}</span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* How it works */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider mb-4">
                How It Works
              </h3>
              <ol className="space-y-3">
                {automation.howItWorks.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-xs font-bold text-sky-400">
                      {i + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: formatStepText(step) }} />
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ========== HELPERS ==========

/** Format step text: convert `NodeName` backtick patterns to styled spans */
function formatStepText(text: string): string {
  return text.replace(
    /`([^`]+)`/g,
    '<span class="font-mono text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded text-xs">$1</span>'
  );
}

/** Placeholder diagram with abstract workflow nodes */
function DiagramPlaceholder({ automation }: { automation: Automation }) {
  const catMeta = CATEGORY_META[automation.category];
  const nodes = automation.nodes.slice(0, 6);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      {/* Background gradient based on category */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${catMeta.color}, transparent 70%), radial-gradient(ellipse at 70% 50%, #38bdf8, transparent 70%)`,
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Abstract workflow nodes */}
      <div className="relative flex items-center gap-3 md:gap-4 flex-wrap justify-center">
        {nodes.map((node, i) => (
          <div key={node} className="flex items-center gap-3 md:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl border border-white/[0.1] bg-white/[0.04] backdrop-blur-sm flex items-center justify-center"
                style={{ boxShadow: `0 0 20px ${catMeta.color}10` }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: catMeta.color + '80' }}
                />
              </div>
              <span className="text-[9px] md:text-[10px] text-gray-500 font-medium text-center max-w-[70px] leading-tight">
                {node}
              </span>
            </motion.div>

            {/* Arrow connector (not after last) */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
                className="hidden md:flex items-center"
              >
                <div className="w-6 h-px bg-gradient-to-r from-white/10 to-white/20" />
                <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[5px] border-l-white/20" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
