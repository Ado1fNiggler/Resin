'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [
    {
      path: '../../public/fonts/Narrenschiff-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const products = [
  { name: 'Πολυθρόνες', slug: 'phantigo', image: '/armchairs.png' },
  { name: 'Καναπέδες', slug: 'violet', image: '/sofas.png' },
  { name: 'Τραπεζαρίες', slug: 'maximillian', image: '/dining-tables.png' },
  { name: 'Αποθηκευτικοί χώροι', slug: 'huxton', image: '/wardrobes.png' },
  { name: 'Ειδικές παραγγελίες', slug: 'custom-orders', image: '/other.png' },
];

/* ── Menu row background gradient scale (light → darker teal, like shoprooof.com) ── */
const menuRowColors = [
  '#F3F7F7',  // lightest
  '#E8F0F0',
  '#DAE6E7',
  '#CDDCDD',
  '#C0D2D3',  // darkest
];

const sidebarItems = [
  { id: 'cart', label: 'CART', icon: 'cart' },
  { id: 'search', label: 'SEARCH', icon: 'search' },
] as const;

const bottomItems = [
  { id: 'favorites', label: 'ΑΓΑΠΗΜΕΝΑ', icon: 'heart' },
  { id: 'top', label: 'ΠΑΝΩ', icon: 'arrow' },
] as const;

/* ── Sidebar width constant (px) ── */
const SIDEBAR_W = 75; // 75px fixed

/* ──────────────────────────────────────────────
   SVG icon set
   ────────────────────────────────────────────── */
function SidebarIcon({ type, teal }: { type: string; teal: boolean }) {
  const stroke = teal ? '#214A4F' : '#FCFCFC';
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, style: { transition: 'stroke 0.45s ease-in-out' } };

  switch (type) {
    case 'cart':
      return (<svg {...common}><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>);
    case 'search':
      return (<svg {...common}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
    case 'heart':
      return (<svg {...common}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>);
    case 'arrow':
      return (<svg {...common}><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>);
    case 'close':
      return (<svg {...common}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
    case 'hamburger':
      return (<svg {...common}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>);
    default:
      return null;
  }
}

/* ──────────────────────────────────────────────
   Sidebar button – hover‑expand with teal bg
   ────────────────────────────────────────────── */
function SidebarButton({
  label, icon, onClick, isOpen, teal, transparent,
}: {
  label: string; icon: string; onClick?: () => void; isOpen: boolean; teal: boolean; transparent?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative',
        width: '100%',
        height: `${SIDEBAR_W}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'visible',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        borderTop: transparent ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
        transition: 'border-top 0.45s ease-in-out, border-bottom 0.45s ease-in-out',
      }}
    >
      <div style={{ position: 'absolute', left: 0, top: -1, bottom: -1, display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px', whiteSpace: 'nowrap', minWidth: '100%', zIndex: 2, transition: 'color 0.45s ease-in-out' }}>
        {/* Teal hover bg – scales from left */}
        <span style={{ position: 'absolute', inset: 0, background: '#214A4F', transformOrigin: '0 0', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.45s ease-in-out', zIndex: -1 }} />
        {/* Label text */}
        <span style={{ display: 'inline-block', overflow: 'hidden', maxWidth: hovered ? '120px' : 0, opacity: hovered ? 1 : 0, marginRight: hovered ? '4px' : 0, transition: 'max-width 0.45s ease-in-out, opacity 0.45s ease-in-out, margin 0.45s ease-in-out', fontSize: '12px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' as const, color: hovered ? '#FCFCFC' : (transparent ? '#FCFCFC' : '#214A4F') }}>
          {label}
        </span>
        {/* Icon */}
        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <SidebarIcon type={icon} teal={hovered ? false : teal} />
        </span>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════
   MAIN NAVBAR COMPONENT
   ══════════════════════════════════════════════ */
export default function Navbar({ alwaysShowSidebar = false }: { alwaysShowSidebar?: boolean }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);           // full‑screen menu
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showItems, setShowItems] = useState(false);     // stagger trigger
  const [pastHero, setPastHero] = useState(alwaysShowSidebar);       // scrolled past hero? (init true if forced)
  const [menuBtnHovered, setMenuBtnHovered] = useState(false); // floating btn hover
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null); // product page transition
  const [clickedIndex, setClickedIndex] = useState<number | null>(null); // which product was clicked
  const [expandImage, setExpandImage] = useState(false); // trigger image expand to fullscreen
  const [overImageSection, setOverImageSection] = useState(false); // sidebar transparent when over image sections

  /* ── Scroll listener: detect when user leaves hero ── */
  useEffect(() => {
    // If sidebar is forced always-visible (e.g. product pages), skip scroll detection
    if (alwaysShowSidebar) {
      setPastHero(true);
      return;
    }
    const onScroll = () => {
      // hero is 100vh, trigger at ~85% of viewport height
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();                       // check on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [alwaysShowSidebar]);

  /* ── Scroll listener: detect image-heavy sections for transparent sidebar ── */
  useEffect(() => {
    const checkImageSections = () => {
      const viewportMid = window.innerHeight / 2;
      const imageSections = document.querySelectorAll('#about, [data-image-section]');
      let isOver = false;
      imageSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportMid && rect.bottom > viewportMid) {
          isOver = true;
        }
      });
      setOverImageSection(isOver);
    };
    checkImageSections();
    window.addEventListener('scroll', checkImageSections, { passive: true });
    return () => window.removeEventListener('scroll', checkImageSections);
  }, []);

  /* ── Stagger delay when menu opens ── */
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setShowItems(true), 50);
      return () => clearTimeout(t);
    }
    setShowItems(false);
  }, [isOpen]);

  /* ── Lock scroll when overlay is open ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // sidebar visible = scrolled past hero OR menu is open OR forced always-show (e.g. product pages)
  const sidebarVisible = alwaysShowSidebar || pastHero || isOpen;
  // icon colour mode: teal (dark) when sidebar is visible, white when over image sections
  const teal = sidebarVisible && !overImageSection;

  return (
    <>
      {/* =============================================
          1. FLOATING MENU BUTTON + LOGO  (hero‑only state)
          Shows when sidebar is HIDDEN (in hero).
          Teal square, top‑left, hamburger icon + Resin logo.
          ============================================= */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 310,
          height: `${SIDEBAR_W}px`,
          display: 'flex',
          alignItems: 'center',
          /* hide when sidebar takes over (or overlay open) */
          opacity: sidebarVisible ? 0 : 1,
          pointerEvents: sidebarVisible ? 'none' : 'auto',
          transition: 'opacity 0.45s ease-in-out',
        }}
      >
        <button
          aria-label="Open menu"
          onMouseEnter={() => setMenuBtnHovered(true)}
          onMouseLeave={() => setMenuBtnHovered(false)}
          onClick={() => setIsOpen(true)}
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'transparent',
            border: 'none',
            borderRadius: 0,
            cursor: 'pointer',
            overflow: 'visible',
            padding: 0,
          }}
        >
          {/* Inner wrap – grows on hover like sidebar buttons */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0 24px',
              height: '100%',
              whiteSpace: 'nowrap',
              minWidth: `${SIDEBAR_W}px`,
            }}
          >
            {/* Teal background – always visible, expands on hover */}
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: '#214A4F',
                transformOrigin: '0 0',
                transition: 'transform 0.45s ease-in-out',
                zIndex: -1,
              }}
            />

            {/* "MENU" label – revealed on hover */}
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                maxWidth: menuBtnHovered ? '60px' : 0,
                opacity: menuBtnHovered ? 1 : 0,
                marginRight: menuBtnHovered ? '4px' : 0,
                transition: 'max-width 0.45s ease-in-out, opacity 0.45s ease-in-out, margin 0.45s ease-in-out',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
                color: '#FCFCFC',
              }}
            >
              MENU
            </span>

            {/* Hamburger icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </button>

        {/* "Resin" logo – sits right next to menu button, moves with hover expand */}
        <span
          className={narrenschiff.className}
          style={{
            color: '#FCFCFC',
            fontSize: '56px',
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.3)',
            marginLeft: '24px',
            transition: 'margin-left 0.45s ease-in-out',
          }}
        >
          Resin
        </span>
      </div>

      {/* =============================================
          2. FULL SIDEBAR  (appears after hero via slide‑in)
          ============================================= */}
      <header
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: `${SIDEBAR_W}px`,
          zIndex: 300,
          /* Slide in from left */
          transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: sidebarVisible ? 'auto' : 'none',
        }}
      >
        {/* White bg – transparent with outline when over image sections */}
        <div
          style={{
            position: 'absolute',
            inset: '0 -1px 0 0',
            background: (overImageSection && !isOpen) ? 'transparent' : '#FCFCFC',
            borderRight: '1px solid ' + ((overImageSection && !isOpen) ? 'rgba(252,252,252,0.25)' : 'rgba(33,74,79,0.12)'),
            zIndex: 0,
            transition: 'background 0.45s ease-in-out, border-right 0.45s ease-in-out',
          }}
        />

        {/* Sidebar column */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', zIndex: 2 }}>
          {/* ── TOP GROUP ── */}
          <div style={{
            borderBottom: (overImageSection && !isOpen) ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
            transition: 'border-bottom 0.45s ease-in-out',
          }}>
            <SidebarButton
              label={isOpen ? 'CLOSE' : 'MENU'}
              icon={isOpen ? 'close' : 'hamburger'}
              onClick={() => setIsOpen(!isOpen)}
              isOpen={isOpen}
              teal={teal}
              transparent={overImageSection && !isOpen}
            />
            {sidebarItems.map((item) => (
              <SidebarButton key={item.id} label={item.label} icon={item.icon} isOpen={isOpen} teal={teal} transparent={overImageSection && !isOpen} />
            ))}
          </div>

          {/* ── MIDDLE: Vertical RESIN logo – clickable, goes to hero ── */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={narrenschiff.className}
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: (overImageSection && !isOpen) ? '#FCFCFC' : '#214A4F',
                userSelect: 'none',
                transition: 'color 0.3s ease-in-out',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 0',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.6'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            >
              RESIN
            </button>
          </div>

          {/* ── BOTTOM GROUP ── */}
          <div style={{
            borderBottom: (overImageSection && !isOpen) ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
            transition: 'border-bottom 0.45s ease-in-out',
          }}>
            {bottomItems.map((item) => (
              <SidebarButton
                key={item.id}
                label={item.label}
                icon={item.icon}
                onClick={item.id === 'top' ? scrollToTop : undefined}
                isOpen={isOpen}
                teal={teal}
                transparent={overImageSection && !isOpen}
              />
            ))}
          </div>
        </div>
      </header>

      {/* =============================================
          3. FULL‑SCREEN MENU OVERLAY
          ============================================= */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          left: `${SIDEBAR_W}px`,
          zIndex: 250,
          pointerEvents: isOpen ? 'auto' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Gradient bg – slides up on open, slides down on close (after items) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, ${menuRowColors[0]}, ${menuRowColors[menuRowColors.length - 1]})`,
            transform: showItems ? 'translateY(0)' : 'translateY(150%)',
            transition: showItems
              ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
              : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          }}
        />

        {/* Nav – slides up on open, slides down on close */}
        <nav
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            zIndex: 2,
            transform: showItems ? 'translateY(0)' : 'translateY(300%)',
            transition: showItems
              ? 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s'
              : 'transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
          }}
        >
          {/* Product links */}
          <ol style={{ flex: 1, display: 'flex', flexDirection: 'column', listStyle: 'none', margin: 0, padding: 0, gap: 0 }}>
            {products.map((product, index) => {
              const isHovered = hoveredProduct === index;
              // Match shoprooof.com stagger: Huxton first, Phantigo last
              const openDelay = 0.45 + (products.length - 1 - index) * 0.15;
              // Close: top-to-bottom stagger — Πολυθρόνες first, Ειδικές last
              const closeDelay = 0.15 + index * 0.1;

              return (
                <li
                  key={product.name}
                  style={{
                    flex: (clickedIndex === index && expandImage) ? 99 : isHovered ? 2 : 1,
                    overflow: 'hidden',
                    transition: (clickedIndex !== null)
                      ? 'flex 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out'
                      : 'flex 1s',
                    minHeight: 0,
                    opacity: (clickedIndex !== null && clickedIndex !== index && expandImage) ? 0 : 1,
                    background: menuRowColors[index] || '#F3F7F7',
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={() => { if (clickedIndex === null) setHoveredProduct(index); }}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <a
                    href={`/product/${product.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (clickedIndex !== null) return; // already navigating
                      setNavigatingTo(product.slug);
                      setClickedIndex(index);
                      // Step 1: Expand the image to fullscreen
                      requestAnimationFrame(() => {
                        setExpandImage(true);
                      });
                      // Step 2: Navigate after animation completes
                      setTimeout(() => {
                        router.push(`/product/${product.slug}`);
                        // Reset state after navigation
                        setTimeout(() => {
                          setIsOpen(false);
                          setShowItems(false);
                          setClickedIndex(null);
                          setExpandImage(false);
                          setNavigatingTo(null);
                        }, 100);
                      }, 1400);
                    }}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      background: '#214A4F',
                      color: '#FCFCFC',
                      textDecoration: 'none',
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: '42px',
                      fontWeight: 300,
                      lineHeight: 1,
                      letterSpacing: '1px',
                      paddingLeft: '40vw',
                      paddingRight: '48px',
                      overflow: 'hidden',
                      transform: showItems ? 'translateY(0)' : 'translateY(110%)',
                      transition: showItems
                        ? `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${openDelay}s`
                        : `transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${closeDelay}s`,
                    }}
                  >
                    {/* Product image (left) – expands to fullscreen on click */}
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: (clickedIndex === index && expandImage) ? '100vw' : '25.4167vw',
                      height: (clickedIndex === index && expandImage) ? '100vh' : '100%',
                      background: '#18363A',
                      overflow: 'hidden',
                      zIndex: (clickedIndex === index) ? 50 : 'auto',
                      transition: (clickedIndex === index)
                        ? 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1), height 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'none',
                    }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: (clickedIndex === index)
                            ? 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                            : 'transform 0.7s ease-out',
                          transform: (clickedIndex === index && expandImage)
                            ? 'scale(1.1)'
                            : isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                    </div>

                    {/* Light overlay – clip‑path wipe on hover, gradient scale per row */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        left: 0,
                        right: 0,
                        bottom: '-2px',
                        background: menuRowColors[index] || '#F3F7F7',
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: '40vw',
                        paddingRight: '48px',
                        color: '#214A4F',
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        letterSpacing: 'inherit',
                        lineHeight: 'inherit',
                        clipPath: (isHovered || clickedIndex === index)
                          ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
                          : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        transition: (isHovered || clickedIndex === index) ? 'clip-path 0.45s ease-in-out' : 'clip-path 0.8s ease-in-out',
                        zIndex: 1,
                        opacity: (clickedIndex === index && expandImage) ? 0 : 1,
                      }}
                    >
                      {product.name}
                    </div>

                    {/* Text + arrow on dark teal */}
                    <span style={{
                      position: 'relative',
                      zIndex: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '24px',
                      opacity: (clickedIndex === index && expandImage) ? 0 : 1,
                      transition: 'opacity 0.4s ease-out',
                    }}>
                      {product.name}
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ opacity: isHovered ? 1 : 0, transform: isHovered ? 'translateX(0)' : 'translateX(-12px)', transition: 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s', flexShrink: 0 }}>
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          {/* Bottom row – secondary nav */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '48px',
              padding: '24px 48px',
              borderTop: '1px solid rgba(33,74,79,0.15)',
              background: '#FCFCFC',
              transform: showItems ? 'translateY(0)' : 'translateY(150%)',
              transition: showItems
                ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s'
                : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0s',
              opacity: (clickedIndex !== null && expandImage) ? 0 : 1,
            }}
          >
            {['ΣΧΕΤΙΚΑ', 'ΕΡΩΤΗΣΕΙΣ', 'ΑΓΑΠΗΜΕΝΑ', 'ΕΠΙΚΟΙΝΩΝΙΑ'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={() => setIsOpen(false)}
                style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: '#214A4F', textDecoration: 'none', transition: 'opacity 0.3s' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '0.6'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
