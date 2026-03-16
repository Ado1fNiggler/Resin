'use client';

import { motion } from 'framer-motion';
import { type Automation, CATEGORY_META } from './automationsData';

interface AutomationCardProps {
  automation: Automation;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}

export default function AutomationCard({ automation, index, onClick, isSelected }: AutomationCardProps) {
  const maxVisibleIcons = 3;
  const visibleIcons = automation.icons.slice(0, maxVisibleIcons);
  const overflowCount = automation.icons.length - maxVisibleIcons;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group relative flex flex-col gap-4 p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'border-sky-400/40 bg-sky-400/[0.06]'
          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12]'
      }`}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-400/0 via-transparent to-sky-500/0 group-hover:from-sky-400/[0.04] group-hover:to-sky-500/[0.04] transition-all duration-500 pointer-events-none" />

      {/* Service icons row */}
      <div className="flex items-center gap-2">
        {visibleIcons.map((icon) => (
          <div
            key={icon.name}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: icon.color }}
            />
            <span className="text-xs text-gray-400 whitespace-nowrap">{icon.name}</span>
          </div>
        ))}
        {overflowCount > 0 && (
          <span className="text-xs text-gray-500 font-medium">+{overflowCount}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-sky-100 transition-colors">
        {automation.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
        {automation.subtitle}
      </p>

      {/* Category pill */}
      <div className="flex items-center gap-2 mt-auto pt-2">
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
      </div>

      {/* Bottom arrow indicator on hover */}
      <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}
