'use client';

import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import localFont from 'next/font/local';
import { useStore } from '@/context/StoreContext';
import styles from './Navbar.module.css';

/* Sidebar width — must match SIDEBAR_W below. Used by both source (Navbar)
   and destination (CategoryPageClient) so the menu→hero morph is pixel-aligned. */
export const MORPH_TARGET_LEFT = 75;

const narrenschiff = localFont({
  src: [
    {
      path: '../../public/fonts/Narrenschiff-Regular.otf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const products = [
  { name: 'Πολυθρόνες', slug: 'armchairs', image: '/armchairs-hero.webp' },
  { name: 'Καναπέδες', slug: 'sofas', image: '/sofas-hero.webp' },
  { name: 'Τραπεζαρίες', slug: 'dining-tables', image: '/dining-tables-hero.webp' },
  { name: 'Αποθηκευτικοί χώροι', slug: 'storage', image: '/storage-hero.webp' },
  { name: 'Ειδικές παραγγελίες', slug: 'custom-orders', image: '/custom-orders-hero.webp' },
];

/* ── Menu row background — light teal gradient, slightly darker top→bottom (shoprooof exact palette) ── */
const menuRowColors = [
  '#F3F7F7', // rgb(243, 247, 247)
  '#E6EEEF', // rgb(230, 238, 239)
  '#DAE5E7', // rgb(218, 229, 231)
  '#CEDCDE', // rgb(206, 220, 222)
  '#C2D4D6', // rgb(194, 212, 214)
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
  label, icon, onClick, isOpen, teal, transparent, badge,
}: {
  label: string; icon: string; onClick?: () => void; isOpen: boolean; teal: boolean; transparent?: boolean; badge?: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={styles.sidebarButton}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        height: `${SIDEBAR_W}px`,
        borderTop: transparent ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
      }}
    >
      <div className={styles.sidebarButtonInner}>
        {/* Teal hover bg – scales from left */}
        <span className={styles.hoverBg} style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
        {/* Label text */}
        <span
          className={styles.labelText}
          style={{
            maxWidth: hovered ? '120px' : 0,
            opacity: hovered ? 1 : 0,
            marginRight: hovered ? '4px' : 0,
            color: hovered ? '#FCFCFC' : (transparent ? '#FCFCFC' : '#214A4F'),
          }}
        >
          {label}
        </span>
        {/* Icon + badge */}
        <span className={styles.iconWrap}>
          <SidebarIcon type={icon} teal={hovered ? false : teal} />
          {badge !== undefined && badge > 0 && (
            <span className={styles.badge}>{badge}</span>
          )}
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
  const { cartCount, favoritesCount } = useStore();
  const [isOpen, setIsOpen] = useState(false);           // full‑screen menu
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [showItems, setShowItems] = useState(false);     // stagger trigger
  const [pastHero, setPastHero] = useState(alwaysShowSidebar);       // scrolled past hero? (init true if forced)
  const [menuBtnHovered, setMenuBtnHovered] = useState(false); // floating btn hover
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null); // product page transition
  const [clickedIndex, setClickedIndex] = useState<number | null>(null); // which product was clicked
  const [expandImage, setExpandImage] = useState(false); // trigger image expand to fullscreen
  const [morphRect, setMorphRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null); // source rect for menu→hero morph
  const [overImageSection, setOverImageSection] = useState(false); // sidebar transparent when over image sections
  const [isClosing, setIsClosing] = useState(false);     // closing animation in progress
  const [collapsedRows, setCollapsedRows] = useState<boolean[]>(new Array(products.length).fill(false)); // which rows have collapsed

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

  /* ── Handle menu open: rows expand simultaneously (shoprooof style) ── */
  const handleOpenMenu = useCallback(() => {
    if (isOpen || isClosing) return;
    // flushSync forces React to commit the collapsed state to the DOM
    // synchronously — guaranteeing a paint before the expansion RAF fires.
    // Without this, heavy pages (e.g. Favorites with AnimatePresence) batch
    // both state updates into one render and the animation never plays.
    flushSync(() => {
      setCollapsedRows(new Array(products.length).fill(true));
      setShowItems(false);
      setIsOpen(true);
    });
    requestAnimationFrame(() => {
      setShowItems(true);
      setCollapsedRows(new Array(products.length).fill(false));
    });
  }, [isOpen, isClosing]);

  /* ── Handle menu close with sequential collapse ── */
  const handleCloseMenu = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    // Collapse rows one by one: Πολυθρόνες(0) → Καναπέδες(1) → Τραπεζαρίες(2) → Αποθηκευτικοί(3) → Ειδικές(4)
    const COLLAPSE_DELAY = 110; // ms between each row collapse

    products.forEach((_, i) => {
      setTimeout(() => {
        setCollapsedRows(prev => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, i * COLLAPSE_DELAY);
    });

    // After all rows collapsed, hide overlay, then reset states
    const totalCollapseTime = products.length * COLLAPSE_DELAY + 420;
    setTimeout(() => {
      setIsOpen(false);
      setShowItems(false);
      setTimeout(() => {
        setIsClosing(false);
        setCollapsedRows(new Array(products.length).fill(false));
      }, 100);
    }, totalCollapseTime);
  }, [isClosing]);

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
        className={styles.floatingMenuArea}
        style={{
          height: `${SIDEBAR_W}px`,
          opacity: sidebarVisible ? 0 : 1,
          pointerEvents: sidebarVisible ? 'none' : 'auto',
        }}
      >
        <button
          aria-label="Open menu"
          className={styles.menuButton}
          onMouseEnter={() => setMenuBtnHovered(true)}
          onMouseLeave={() => setMenuBtnHovered(false)}
          onClick={() => handleOpenMenu()}
        >
          {/* Inner wrap – grows on hover like sidebar buttons */}
          <div className={styles.menuButtonInner} style={{ minWidth: `${SIDEBAR_W}px` }}>
            {/* Teal background – always visible, expands on hover */}
            <span className={styles.menuBg} />

            {/* "MENU" label – revealed on hover */}
            <span
              className={styles.menuLabel}
              style={{
                maxWidth: menuBtnHovered ? '60px' : 0,
                opacity: menuBtnHovered ? 1 : 0,
                marginRight: menuBtnHovered ? '4px' : 0,
              }}
            >
              MENU
            </span>

            {/* Hamburger icon */}
            <svg className={styles.hamburgerIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>
        </button>

        {/* "Resin" logo – sits right next to menu button, moves with hover expand */}
        <span className={`${narrenschiff.className} ${styles.heroLogo}`}>
          Resin
        </span>
      </div>

      {/* =============================================
          2. FULL SIDEBAR  (appears after hero via slide‑in)
          ============================================= */}
      <header
        className={styles.sidebar}
        style={{
          width: `${SIDEBAR_W}px`,
          transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
          pointerEvents: sidebarVisible ? 'auto' : 'none',
        }}
      >
        {/* White bg – transparent with outline when over image sections */}
        <div
          className={styles.sidebarBg}
          style={{
            background: (overImageSection && !isOpen) ? 'transparent' : '#FCFCFC',
            borderRight: '1px solid ' + ((overImageSection && !isOpen) ? 'rgba(252,252,252,0.25)' : 'rgba(33,74,79,0.12)'),
          }}
        />

        {/* Sidebar column */}
        <div className={styles.sidebarColumn}>
          {/* ── TOP GROUP ── */}
          <div
            className={styles.sidebarGroup}
            style={{
              borderBottom: (overImageSection && !isOpen) ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
            }}
          >
            <SidebarButton
              label={isOpen ? 'CLOSE' : 'MENU'}
              icon={isOpen ? 'close' : 'hamburger'}
              onClick={() => {
                if (isOpen) {
                  handleCloseMenu();
                } else {
                  handleOpenMenu();
                }
              }}
              isOpen={isOpen}
              teal={teal}
              transparent={overImageSection && !isOpen}
            />
            {sidebarItems.map((item) => (
              <SidebarButton
                key={item.id}
                label={item.label}
                icon={item.icon}
                isOpen={isOpen}
                teal={teal}
                transparent={overImageSection && !isOpen}
                badge={item.id === 'cart' ? cartCount : undefined}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => {
                    router.push(item.id === 'cart' ? '/cart' : '/search');
                  }, 50);
                }}
              />
            ))}
          </div>

          {/* ── MIDDLE: Vertical RESIN logo – clickable, goes to hero ── */}
          <div className={styles.verticalLogoArea}>
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => router.push('/'), 50);
              }}
              className={`${narrenschiff.className} ${styles.verticalLogo}`}
              style={{
                color: (overImageSection && !isOpen) ? '#FCFCFC' : '#214A4F',
              }}
            >
              RESIN
            </button>
          </div>

          {/* ── BOTTOM GROUP ── */}
          <div
            className={styles.sidebarGroup}
            style={{
              borderBottom: (overImageSection && !isOpen) ? '1px solid rgba(252,252,252,0.25)' : '1px solid rgba(33,74,79,0.12)',
            }}
          >
            {bottomItems.map((item) => (
              <SidebarButton
                key={item.id}
                label={item.label}
                icon={item.icon}
                badge={item.id === 'favorites' ? favoritesCount : undefined}
                onClick={item.id === 'top' ? scrollToTop : () => {
                  setIsOpen(false);
                  setTimeout(() => {
                    router.push('/favorites');
                  }, 50);
                }}
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
        className={styles.menuOverlay}
        style={{
          left: `${SIDEBAR_W}px`,
          pointerEvents: isOpen ? 'auto' : 'none',
          visibility: (isOpen || isClosing) ? 'visible' : 'hidden',
        }}
      >
        {/* Gradient bg – fades in + subtle slide from top (shoprooof style) */}
        <div
          className={styles.overlayBg}
          style={{
            background: `linear-gradient(to bottom, ${menuRowColors[0]}, ${menuRowColors[menuRowColors.length - 1]})`,
            opacity: (isClosing && collapsedRows.every(Boolean)) ? 0 : showItems ? 1 : 0,
            transform: showItems ? 'translateY(0)' : 'translateY(-5%)',
            transition: showItems
              ? 'opacity 0.25s ease-out, transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
              : (isClosing ? 'opacity 0.35s ease-out 0.25s' : 'none'),
          }}
        />

        {/* Nav – no translateY; rows reveal via height/flex animation */}
        <nav
          className={styles.overlayNav}
        >
          {/* Product links */}
          <ol className={styles.productList}>
            {products.map((product, index) => {
              const isHovered = hoveredProduct === index;
              const isCollapsed = collapsedRows[index];

              return (
                <li
                  key={product.name}
                  className={styles.productItem}
                  style={{
                    flex: isCollapsed
                      ? 0.001
                      : (clickedIndex === index && expandImage) ? 99 : isHovered ? 2 : 1,
                    // Open: smooth expand (shoprooof simultaneous reveal)
                    // Close: sharper sequential collapse
                    // Hover: quick flex grow
                    transition: isCollapsed
                      ? (isClosing
                          ? 'flex 0.38s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.25s ease-out'
                          : 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease-out')
                      : (clickedIndex !== null
                          ? 'flex 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out'
                          : 'flex 0.7s cubic-bezier(0.16, 1, 0.3, 1)'),
                    opacity: isCollapsed
                      ? 0
                      : (clickedIndex !== null && clickedIndex !== index && expandImage) ? 0 : 1,
                    background: menuRowColors[index] || '#F3F7F7',
                  }}
                  onMouseEnter={() => {
                    if (clickedIndex === null && !isClosing) setHoveredProduct(index);
                    // Prefetch destination so navigation is instant
                    router.prefetch(`/category/${product.slug}`);
                  }}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <a
                    href={`/category/${product.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      if (clickedIndex !== null) return; // already navigating

                      // Capture the source image rect (viewport coords).
                      const linkEl = e.currentTarget as HTMLElement;
                      const imgWrap = linkEl.querySelector(`.${styles.productImageWrap}`) as HTMLElement | null;
                      const rect = (imgWrap || linkEl).getBoundingClientRect();
                      const sourceRect = {
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                      };
                      setMorphRect(sourceRect);
                      setNavigatingTo(product.slug);
                      setClickedIndex(index);
                      // Hand off transition state to destination page
                      try {
                        sessionStorage.setItem('menuTransition', JSON.stringify({
                          slug: product.slug,
                          image: product.image,
                          ts: Date.now(),
                        }));
                      } catch {}
                      // Single continuous morph: row image rect → hero rect.
                      // No fullscreen intermediate — that out-and-back motion
                      // was the source of the un-smooth feel.
                      requestAnimationFrame(() => {
                        setExpandImage(true);
                      });
                      // Navigate AFTER the morph reaches the hero rect, so the
                      // destination simply renders the static hero behind a
                      // pixel-identical fading overlay.
                      setTimeout(() => {
                        router.push(`/category/${product.slug}`);
                        setTimeout(() => {
                          setIsOpen(false);
                          setShowItems(false);
                          setClickedIndex(null);
                          setExpandImage(false);
                          setNavigatingTo(null);
                          setMorphRect(null);
                        }, 250);
                      }, 850);
                    }}
                    className={styles.productLink}
                  >
                    {/* Product image (left) – stays at row size; the actual
                        fullscreen morph is handled by a dedicated fixed-position
                        layer rendered at the bottom of this component so its
                        coords are anchored to the viewport, not this row. */}
                    <div
                      className={styles.productImageWrap}
                      style={{
                        width: '25.4167vw',
                        height: '100%',
                        // Hide this small image when the morph layer takes over,
                        // so we don't show two copies briefly.
                        opacity: (clickedIndex === index) ? 0 : 1,
                        transition: 'opacity 0.18s ease-out',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.productImage}
                        style={{
                          transition: 'transform 0.7s ease-out',
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                    </div>

                    {/* Dark overlay — clips away upward on hover to reveal image */}
                    <div
                      className={styles.lightOverlay}
                      style={{
                        background: menuRowColors[index] || '#F3F7F7',
                        clipPath: (isHovered || clickedIndex === index)
                          ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
                          : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        transition: (isHovered || clickedIndex === index) ? 'clip-path 0.45s ease-in-out' : 'clip-path 0.8s ease-in-out',
                        opacity: (clickedIndex === index && expandImage) ? 0 : 1,
                      }}
                    >
                      {/* Row index number — top right */}
                      <span className={styles.rowIndex}>
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      {product.name}
                    </div>

                    {/* Text + arrow — visible beneath the overlay (same white on dark) */}
                    <span
                      className={styles.textArrow}
                      style={{
                        opacity: (clickedIndex === index && expandImage) ? 0 : 1,
                        transition: 'opacity 0.4s ease-out',
                      }}
                    >
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

          {/* Bottom row – secondary nav; slides up from below on open (shoprooof style) */}
          <div
            className={styles.bottomNav}
            style={{
              transform: showItems ? 'translateY(0)' : 'translateY(110%)',
              transition: showItems
                ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
                : (isClosing ? 'opacity 0.15s ease-out' : 'none'),
              opacity: isClosing ? 0 : (clickedIndex !== null && expandImage) ? 0 : 1,
            }}
          >
            {[
              { label: 'ΣΧΕΤΙΚΑ', href: '/about' },
              { label: 'ΕΡΩΤΗΣΕΙΣ', href: '/faq' },
              { label: 'ΑΓΑΠΗΜΕΝΑ', href: '/favorites' },
              { label: 'ΕΠΙΚΟΙΝΩΝΙΑ', href: '/contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={styles.bottomNavLink}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  setTimeout(() => router.push(item.href), 50);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* =============================================
          4. MENU → HERO MORPH LAYER
          A single fixed-position image element that flies from the clicked
          row's image rect up to a true viewport-fullscreen rectangle. The
          destination page mounts an identically-positioned overlay at the
          same final rect, then morphs it down into the hero. Because both
          source and destination layers occupy the same coords at the moment
          of route swap, there is zero visual discontinuity.
          ============================================= */}
      <AnimatePresence>
        {clickedIndex !== null && morphRect && navigatingTo && (
          <motion.div
            key="navbar-morph"
            initial={{
              top: morphRect.top,
              left: morphRect.left,
              width: morphRect.width,
              height: morphRect.height,
            }}
            animate={
              expandImage
                ? {
                    // Single continuous morph: directly to the hero rectangle.
                    // (Same coords used by CategoryPageClient — see MORPH_TARGET_LEFT.)
                    top: 0,
                    left: MORPH_TARGET_LEFT,
                    width: `calc(100vw - ${MORPH_TARGET_LEFT}px)`,
                    // Hero is height: max(78vh, 560px) — express identically here.
                    height: 'max(78vh, 560px)',
                  }
                : {
                    top: morphRect.top,
                    left: morphRect.left,
                    width: morphRect.width,
                    height: morphRect.height,
                  }
            }
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              zIndex: 400,
              overflow: 'hidden',
              pointerEvents: 'none',
              willChange: 'top, left, width, height',
            }}
          >
            <img
              src={products[clickedIndex].image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
