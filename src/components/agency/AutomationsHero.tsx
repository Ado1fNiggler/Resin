'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { type Category, CATEGORY_META, AUTOMATIONS } from './automationsData';

interface AutomationsHeroProps {
  activeCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const categories = Object.keys(CATEGORY_META) as (Category | 'all')[];

export default function AutomationsHero({ activeCategory, onCategoryChange }: AutomationsHeroProps) {
  const filteredCount =
    activeCategory === 'all'
      ? AUTOMATIONS.length
      : AUTOMATIONS.filter((a) => a.category === activeCategory).length;

  return (
    <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 bg-[#0a0a0f]">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            liougiourou.studio
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Automation Workflows
            <span className="inline-flex items-center justify-center ml-4 px-3 py-1 rounded-full bg-sky-400/15 text-sky-400 text-base md:text-lg font-semibold align-middle">
              {filteredCount}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
        >
          Real n8n workflows we build and deploy for our clients.
          Each automation solves a specific business problem — from AI email triage to e-commerce inventory sync.
        </motion.p>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const meta = CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-xl border"
                    style={{
                      backgroundColor: meta.color + '15',
                      borderColor: meta.color + '40',
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {cat !== 'all' && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                  )}
                  {meta.label}
                </span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Subtle gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
