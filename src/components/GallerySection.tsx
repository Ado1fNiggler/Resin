'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const galleryImages = [
  { url: '/hero1.png',          caption: 'Κάθε χώρος αφηγείται τη δική του ιστορία.',         product: 'Συλλογή 2025' },
  { url: '/sofa2.png',          caption: 'Απαλές γραμμές που αγκαλιάζουν το σώμα.',            product: 'Lyra' },
  { url: '/armchairs2.png',     caption: 'Η πολυθρόνα που ορίζει τον χαρακτήρα του σαλονιού.', product: 'Phantigo' },
  { url: '/dining-tables2.png', caption: 'Η τραπεζαρία ως κέντρο της οικογενειακής ζωής.',     product: 'Hermes' },
  { url: '/wardrobes3.png',     caption: 'Τάξη και αισθητική σε τέλεια ισορροπία.',             product: 'Maximillian' },
  { url: '/family1.png',        caption: 'Χώροι φτιαγμένοι για στιγμές που μένουν.',            product: 'Συλλογή 2025' },
  { url: '/lyra2.png',          caption: 'Η ομορφιά κρύβεται στη λεπτομέρεια.',                product: 'Lyra' },
  { url: '/hermes2.png',        caption: 'Μασίφ ξύλο, χειροποίητη τελειότητα.',                product: 'Hermes' },
];

/* Alternating tall / short cards, staggered vertically for editorial rhythm */
const cardConfigs = [
  { width: '27vw', height: '70vh', top: '8vh'  },
  { width: '19vw', height: '46vh', top: '30vh' },
  { width: '24vw', height: '63vh', top: '14vh' },
  { width: '20vw', height: '52vh', top: '22vh' },
  { width: '26vw', height: '68vh', top: '7vh'  },
  { width: '19vw', height: '48vh', top: '28vh' },
  { width: '25vw', height: '66vh', top: '11vh' },
  { width: '21vw', height: '50vh', top: '24vh' },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Title: fades + lifts out at the very start of scroll */
  const titleOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0]);
  const titleY      = useTransform(scrollYProgress, [0, 0.13], [0, -48]);
  const titleScale  = useTransform(scrollYProgress, [0, 0.13], [1, 0.94]);

  /* Gallery: appears just after title disappears, then pans left */
  const galleryOpacity = useTransform(scrollYProgress, [0.08, 0.2], [0, 1]);
  const x              = useTransform(
    scrollYProgress,
    [0.12, 1],
    ['6vw', '-128vw'],
    { ease: (t) => t }
  );

  /* Progress bar */
  const barWidth = useTransform(scrollYProgress, [0.12, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      style={{ height: '520vh', backgroundColor: '#F7F6F3' }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: '#F7F6F3' }}
      >

        {/* ── Intro title panel ── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '12vw',
            zIndex: 20,
            pointerEvents: 'none',
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
          }}
        >
          {/* Eyebrow row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
            <div style={{ width: '36px', height: '1px', backgroundColor: '#214A4F', opacity: 0.7 }} />
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.28em',
              color: '#214A4F',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              textTransform: 'uppercase',
              fontWeight: 500,
              opacity: 0.7,
            }}>
              Η Συλλογή
            </span>
          </div>

          {/* Headline — line 1 */}
          <div style={{ overflow: 'hidden', marginBottom: '4px' }}>
            <motion.h2
              style={{
                margin: 0,
                fontSize: 'clamp(54px, 6.8vw, 96px)',
                fontWeight: 300,
                color: '#214A4F',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
              }}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              Τα προϊόντα μας
            </motion.h2>
          </div>

          {/* Headline — line 2 italic */}
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              style={{
                margin: 0,
                fontSize: 'clamp(54px, 6.8vw, 96px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#214A4F',
                fontFamily: 'Georgia, "Times New Roman", serif',
                lineHeight: 1.06,
                letterSpacing: '-0.025em',
              }}
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            >
              στο σπίτι
            </motion.h2>
          </div>

          {/* Scroll hint */}
          <motion.div
            style={{
              marginTop: '44px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              opacity: 0.45,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.45 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <span style={{
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: '#214A4F',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                textTransform: 'uppercase',
              }}>
                Scroll
              </span>
              <svg width="30" height="6" viewBox="0 0 30 6" fill="none">
                <line x1="0" y1="3" x2="26" y2="3" stroke="#214A4F" strokeWidth="0.8" />
                <polyline points="22,1 26,3 22,5" stroke="#214A4F" strokeWidth="0.8" fill="none" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Horizontal gallery track ── */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            x,
            opacity: galleryOpacity,
            paddingLeft: '12vw',
            gap: '2.8vw',
          }}
        >
          {galleryImages.map((image, index) => (
            <GalleryCard
              key={index}
              image={image}
              cfg={cardConfigs[index]}
              index={index}
            />
          ))}

          {/* End spacer */}
          <div style={{ flexShrink: 0, width: '8vw' }} />
        </motion.div>

        {/* ── Bottom progress bar ── */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '12vw',
          right: '4vw',
          height: '1px',
          backgroundColor: 'rgba(33, 74, 79, 0.1)',
          zIndex: 30,
        }}>
          <motion.div style={{
            height: '100%',
            width: barWidth,
            backgroundColor: '#214A4F',
            transformOrigin: 'left',
          }} />
        </div>

        {/* ── Counter ── */}
        <motion.div style={{
          position: 'absolute',
          bottom: '20px',
          right: '4vw',
          zIndex: 30,
          opacity: galleryOpacity,
        }}>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.22em',
            color: '#214A4F',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            opacity: 0.45,
            textTransform: 'uppercase',
          }}>
            {galleryImages.length.toString().padStart(2, '0')} Εργα
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Individual card ── */
function GalleryCard({
  image,
  cfg,
  index,
}: {
  image: { url: string; caption: string; product: string };
  cfg: typeof cardConfigs[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay: index * 0.055, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover="hovered"
      style={{
        flexShrink: 0,
        width: cfg.width,
        marginTop: cfg.top,
        cursor: 'pointer',
      }}
    >
      {/* Frame */}
      <motion.div
        variants={{
          hovered: { outline: '1px solid rgba(33, 74, 79, 0.55)' },
        }}
        style={{ position: 'relative', height: cfg.height, overflow: 'hidden', outline: '1px solid transparent' }}
        transition={{ duration: 0.35 }}
      >
        {/* Index label */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '14px',
          zIndex: 3,
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.6)',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          userSelect: 'none',
        }}>
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* Image with subtle parallax-scale on hover */}
        <motion.img
          src={image.url}
          alt={image.caption}
          variants={{
            hovered: { scale: 1.04, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } },
          }}
          style={{
            width: '100%',
            height: '112%',
            objectFit: 'cover',
            display: 'block',
            marginTop: '-6%',
          }}
        />

        {/* Hover dark veil */}
        <motion.div
          variants={{
            hovered: { backgroundColor: 'rgba(0,0,0,0.09)', transition: { duration: 0.4 } },
          }}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0)' }}
        />
      </motion.div>

      {/* Caption block */}
      <div style={{ marginTop: '13px', paddingRight: '8px' }}>
        <p style={{
          margin: 0,
          fontSize: '11.5px',
          fontStyle: 'italic',
          color: '#214A4F',
          fontFamily: 'Georgia, "Times New Roman", serif',
          lineHeight: 1.55,
          opacity: 0.8,
        }}>
          {image.caption}
        </p>
        <p style={{
          margin: '7px 0 0',
          fontSize: '9.5px',
          letterSpacing: '0.24em',
          color: '#214A4F',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          textTransform: 'uppercase',
          fontWeight: 500,
          opacity: 0.6,
          textDecoration: 'underline',
          textUnderlineOffset: '4px',
          textDecorationColor: 'rgba(33, 74, 79, 0.35)',
        }}>
          {image.product}
        </p>
      </div>
    </motion.div>
  );
}
