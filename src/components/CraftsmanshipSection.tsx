'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    title: 'ΣΥΓΧΡΟΝΗ ΑΙΣΘΗΤΙΚΗ, ΑΝΥΠΟΧΩΡΗΤΗ ΠΟΙΟΤΗΤΑ',
    description:
      'Με γνώμονα την αρμονία μεταξύ φυσικού ξύλου και σύγχρονης φόρμας, τα έπιπλά μας ενώνουν την αρχιτεκτονική ομορφιά με την πρακτική λειτουργία. Κατασκευασμένα από μασίφ ξυλεία και επιλεγμένους καπλαμάδες, κάθε κομμάτι αναδεικνύει τα φυσικά "νερά" του υλικού, προσφέροντας στιβαρότητα και ένα αψεγάδιαστο φινίρισμα που αντέχει στον χρόνο.',
    image: '/sofa.png',
  },
  {
    title: 'ΠΟΛΥΤΕΛΗΣ ΑΝΕΣΗ, ΧΕΙΡΟΠΟΙΗΤΗ ΦΡΟΝΤΙΔΑ',
    description:
      'Συνδυάζοντας την εργονομία με την απόλαυση, οι δημιουργίες μας προσφέρουν το ιδανικό καταφύγιο χαλάρωσης. Επενδεδυμένα με υφάσματα υψηλής αντοχής και πλούσιας υφής —από βελούδο μέχρι ανάγλυφα μπουκλέ— τα έπιπλά μας είναι σχεδιασμένα για να προσφέρουν αίσθηση πολυτέλειας, παραμένοντας ταυτόχρονα λειτουργικά και εύκολα στη συντήρηση για την καθημερινή ζωή.',
    image: '/table.png',
  },
];

export default function CraftsmanshipSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % features.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="py-0"
      style={{ backgroundColor: '#F7F6F3' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-[100px] py-24">
        {/* Two-panel slider layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh]">
          {/* Left Panel - Image + Text */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Image with parallax */}
            <div className="relative overflow-hidden mb-8" style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img
                    src={features[activeSlide].image}
                    alt={features[activeSlide].title}
                    className="w-full h-full object-cover"
                    style={{ y: parallaxY }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <h4
                  className="text-sm md:text-base font-medium tracking-[0.05em] uppercase mb-4"
                  style={{ color: '#214A4F' }}
                >
                  {features[activeSlide].title}
                </h4>
                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: '#214A4F', opacity: 0.8 }}
                >
                  {features[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Second image + text */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative overflow-hidden mb-8" style={{ aspectRatio: '4/3' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={(activeSlide + 1) % features.length}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.img
                    src={features[(activeSlide + 1) % features.length].image}
                    alt={features[(activeSlide + 1) % features.length].title}
                    className="w-full h-full object-cover"
                    style={{ y: parallaxY }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={(activeSlide + 1) % features.length}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4
                  className="text-sm md:text-base font-medium tracking-[0.05em] uppercase mb-4"
                  style={{ color: '#214A4F' }}
                >
                  {features[(activeSlide + 1) % features.length].title}
                </h4>
                <p
                  className="text-xs md:text-sm leading-relaxed"
                  style={{ color: '#214A4F', opacity: 0.8 }}
                >
                  {features[(activeSlide + 1) % features.length].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Progress indicator */}
        <div className="mt-12 flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-black/10 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: '#214A4F' }}
              initial={{ width: '0%' }}
              animate={{ width: `${((activeSlide + 1) / features.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
            {/* Auto-progress animation */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundColor: '#214A4F',
                opacity: 0.3,
                width: `${((activeSlide + 1) / features.length) * 100}%`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 8, ease: 'linear' }}
              key={`auto-progress-${activeSlide}`}
            />
          </div>
          <span className="text-xs font-medium" style={{ color: '#214A4F' }}>
            {String(activeSlide + 1).padStart(2, '0')} / {String(features.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
