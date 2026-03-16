'use client';

import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import AgencyNavbar from '@/components/agency/AgencyNavbar';
import AgencyFooter from '@/components/agency/AgencyFooter';
import AutomationsHero from '@/components/agency/AutomationsHero';
import AutomationCard from '@/components/agency/AutomationCard';
import AutomationDetail from '@/components/agency/AutomationDetail';
import CTASection from '@/components/agency/CTASection';
import { AUTOMATIONS, type Category } from '@/components/agency/automationsData';

export default function AutomationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredAutomations = useMemo(() => {
    if (activeCategory === 'all') return AUTOMATIONS;
    return AUTOMATIONS.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const selectedAutomation = useMemo(() => {
    if (!selectedId) return null;
    return AUTOMATIONS.find((a) => a.id === selectedId) ?? null;
  }, [selectedId]);

  const handleCategoryChange = (cat: Category | 'all') => {
    setActiveCategory(cat);
    setSelectedId(null); // close detail when changing filter
  };

  const handleCardClick = (id: string) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <AgencyNavbar />

      <AutomationsHero
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Automations Grid */}
      <section className="relative py-12 md:py-16 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAutomations.map((automation, i) => {
                const isSelected = selectedId === automation.id;

                return (
                  <AnimatePresence key={automation.id} mode="popLayout">
                    <AutomationCard
                      automation={automation}
                      index={i}
                      onClick={() => handleCardClick(automation.id)}
                      isSelected={isSelected}
                    />

                    {/* Inline detail expansion */}
                    {isSelected && selectedAutomation && (
                      <AutomationDetail
                        key={`detail-${automation.id}`}
                        automation={selectedAutomation}
                        onClose={() => setSelectedId(null)}
                      />
                    )}
                  </AnimatePresence>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filteredAutomations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No automations in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <AgencyFooter />
    </main>
  );
}
