'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    title: 'AI-Powered Chatbots',
    description: 'Intelligent conversations that understand context, handle complex queries, and convert visitors into customers — 24/7.',
    size: 'large',
    gradient: 'from-violet-500/20 to-transparent',
    visual: (
      <div className="mt-6 relative">
        {/* Chat mockup */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/30 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-violet-300">AI</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[240px]">
              <p className="text-sm text-gray-300">Hello! How can I help you today?</p>
            </div>
          </div>
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-violet-500/20 border border-violet-500/20 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[200px]">
              <p className="text-sm text-gray-200">I need a quote for automation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/30 flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-violet-300">AI</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[260px]">
              <p className="text-sm text-gray-300">Of course! Let me connect you with our team right away.</p>
              <div className="mt-2 flex gap-2">
                <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-400">Intent: Sales</span>
                <span className="px-2 py-0.5 rounded text-xs bg-cyan-500/20 text-cyan-400">Score: 95%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Workflow Automation',
    description: 'Connect your apps, automate repetitive tasks, and save hundreds of hours with custom n8n workflows.',
    size: 'medium',
    gradient: 'from-cyan-500/20 to-transparent',
    visual: (
      <div className="mt-6">
        {/* Workflow nodes mockup */}
        <div className="flex items-center gap-2">
          {['Trigger', 'Process', 'AI', 'Send'].map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <div className={`px-3 py-2 rounded-lg text-xs font-mono border ${
                i === 0 ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
                i === 2 ? 'border-violet-500/30 bg-violet-500/10 text-violet-400' :
                'border-white/10 bg-white/5 text-gray-400'
              }`}>
                {node}
              </div>
              {i < 3 && (
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Real-time Analytics',
    description: 'Live dashboards with instant insights into your automation performance.',
    size: 'small',
    gradient: 'from-orange-500/20 to-transparent',
    visual: (
      <div className="mt-4 flex items-end gap-1 h-16">
        {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85].map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-orange-500/30 to-orange-500/10"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    ),
  },
  {
    title: 'Voice Bot Integration',
    description: 'AI voice assistants that handle calls, capture leads, and route customers intelligently.',
    size: 'small',
    gradient: 'from-emerald-500/20 to-transparent',
    visual: (
      <div className="mt-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex gap-0.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-400 rounded-full"
                animate={{ height: [4, 12 + Math.random() * 12, 4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <span className="text-xs text-emerald-400 font-mono">LIVE</span>
        </div>
      </div>
    ),
  },
  {
    title: 'Blazing Fast Performance',
    description: 'Optimized code, edge deployment, and smart caching for sub-second load times.',
    size: 'medium',
    gradient: 'from-rose-500/20 to-transparent',
    visual: (
      <div className="mt-6 space-y-3">
        {[
          { label: 'First Paint', value: '0.3s', percent: 95 },
          { label: 'TTI', value: '0.8s', percent: 90 },
          { label: 'Lighthouse', value: '99', percent: 99 },
        ].map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{metric.label}</span>
              <span className="text-emerald-400 font-mono">{metric.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${metric.percent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-32 bg-[#07070b] overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-gray-400 mb-6">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              scale
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden ${
                feature.size === 'large' ? 'md:col-span-1 lg:row-span-2' :
                feature.size === 'medium' ? '' : ''
              }`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              <div className="relative">
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
