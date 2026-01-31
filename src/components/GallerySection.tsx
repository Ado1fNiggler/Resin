'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  { url: '/heroimage1.png', caption: 'Ο Phantigo μεταμορφώνει κάθε σαλόνι σε χώρο αισθητικής.', product: 'Phantigo' },
  { url: '/heroimage2.png', caption: 'Κομψότητα που δεν περνά απαρατήρητη.', product: 'Violet' },
  { url: '/heroimage3.png', caption: 'Η τέχνη της χειροποίητης κατασκευής.', product: 'Maximillian' },
  { url: '/sofa.png', caption: 'Μοντέρνα σχεδίαση, διαχρονική ομορφιά.', product: 'Huxton' },
  { url: '/table.png', caption: 'Κάθε λεπτομέρεια μετράει.', product: 'Phantigo' },
  { url: '/heroimage4.png', caption: 'Η πολυτέλεια στην καθημερινότητα.', product: 'Violet' },
  { url: '/heroimage1.png', caption: 'Δημιουργημένα για να εντυπωσιάζουν.', product: 'Maximillian' },
  { url: '/heroimage2.png', caption: 'Το στυλ ξεκινάει από το σπίτι.', product: 'Huxton' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll to horizontal translation
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  // Title parallax
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: '500vh' }}
    >
      {/* Sticky container - stays in viewport while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Section title - fades out on scroll */}
        <motion.div
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2
            className="text-5xl md:text-6xl lg:text-[80px] font-light"
            style={{ color: '#214A4F', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}
          >
            Τα προϊόντα μας<br />στο σπίτι
          </h2>
        </motion.div>

        {/* Horizontal scrolling gallery */}
        <motion.div
          className="flex gap-6 pl-[10vw]"
          style={{ x }}
        >
          {galleryImages.map((image, index) => {
            // Vary card sizes for organic look
            const isLarge = index % 3 === 0;
            const isMedium = index % 3 === 1;

            return (
              <motion.div
                key={index}
                className="flex-shrink-0 relative group cursor-pointer"
                style={{
                  width: isLarge ? '28vw' : isMedium ? '22vw' : '18vw',
                  marginTop: index % 2 === 0 ? '5vh' : '15vh',
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden rounded-lg"
                  style={{
                    aspectRatio: isLarge ? '3/4' : isMedium ? '4/5' : '3/4',
                  }}
                >
                  <motion.img
                    src={image.url}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                </div>

                {/* Caption text */}
                <motion.p
                  className="mt-4 text-sm italic leading-relaxed"
                  style={{
                    color: '#214A4F',
                    fontFamily: '"General Sans", "Helvetica Neue", sans-serif',
                  }}
                >
                  {image.caption}{' '}
                  <span className="not-italic font-medium underline cursor-pointer hover:opacity-70 transition-opacity">
                    {image.product}
                  </span>
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
