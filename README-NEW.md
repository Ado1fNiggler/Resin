# ROOOF - Luxury Furniture Website

Σύγχρονη ιστοσελίδα για luxury pet furniture με advanced scroll animations, φτιαγμένη με **Next.js 16**, **TypeScript**, **Tailwind CSS 4** και **Framer Motion**.

## 🚀 Tech Stack

- **Next.js 16** - React framework με App Router
- **React 19** - Latest React version
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12** - Advanced animations library
- **PostCSS** - CSS processing

## ✨ Features

### 🎨 Hero Section με Image Carousel
- Αυτόματη εναλλαγή 3 hero images (hero1.png, hero2.png, hero3.png)
- **Smooth fading transitions** με AnimatePresence
- Εναλλαγή κάθε 5 δευτερόλεπτα
- Manual control με indicators
- Animated scroll indicator

### 🎭 Scroll Animations
- **useScroll** hook για scroll tracking
- **useInView** για reveal on scroll
- **useTransform** για parallax effects
- **Stagger animations** στα product cards
- **Fade in/out effects** με smooth transitions

### 📱 Responsive Design
- Mobile-first approach
- Fully responsive σε όλες τις συσκευές
- Adaptive layouts με Tailwind breakpoints

### 🎯 Sections
1. **Navbar** - Sticky με blur effect και scroll animations
2. **Hero** - Full-screen με rotating hero images
3. **Products** - Grid με hover effects και 3D transforms
4. **Features** - Alternating layout με parallax
5. **Gallery** - Masonry grid με zoom effects
6. **Purpose** - Gradient background με stats
7. **Footer** - Complete με newsletter signup

## 📦 Εγκατάσταση

### Βήμα 1: Install Dependencies
```bash
cd C:\Users\steli\Desktop\resin
npm install
```

### Βήμα 2: Προσθέστε τις Hero Εικόνες
Βάλτε τα αρχεία στον φάκελο `public/`:
```
C:\Users\steli\Desktop\resin\public\
├── hero1.png
├── hero2.png
└── hero3.png
```

### Βήμα 3: Run Development Server
```bash
npm run dev
```

Ανοίξτε [http://localhost:3000](http://localhost:3000) στον browser.

## 🎨 Framer Motion Features

### Hero Image Carousel
```typescript
<AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5 }}
  />
</AnimatePresence>
```

### Scroll-based Animations
```typescript
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});

const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
```

### Reveal on Scroll
```typescript
const isInView = useInView(ref, { once: true, amount: 0.3 });

<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
/>
```

### Stagger Children
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};
```

## 🎯 Tailwind Configuration

Custom colors στο `tailwind.config.ts`:
```typescript
colors: {
  primary: '#8B7355',
  secondary: '#C19A6B',
  'dark-brown': '#654321',
  'bg-light': '#f8f6f3',
}
```

## 📁 Δομή Project

```
resin/
├── public/
│   ├── hero1.png          # Hero image 1
│   ├── hero2.png          # Hero image 2
│   └── hero3.png          # Hero image 3
├── src/
│   ├── app/
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   └── components/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── ProductsSection.tsx
│       ├── FeaturesSection.tsx
│       ├── GallerySection.tsx
│       ├── PurposeSection.tsx
│       └── Footer.tsx
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

## 🎬 Animation Highlights

### 1. Hero Carousel
- **AnimatePresence** για smooth transitions
- **Automatic rotation** κάθε 5 δευτερόλεπτα
- **Manual controls** με indicators
- **Fade in/out** transitions

### 2. Navbar
- **Scroll-based color change** με useTransform
- **Dynamic shadow** με scroll progress
- **Hover effects** στα links

### 3. Product Cards
- **3D transforms** στο hover
- **Scale animations** με whileHover
- **Stagger reveal** με scroll

### 4. Features
- **Parallax images** με useTransform
- **Alternate layouts** (reverse)
- **Smooth fade** με scroll progress

### 5. Gallery
- **Scale entrance** animations
- **Hover zoom** effects
- **Overlay reveal** με opacity

## 🛠️ Customization

### Αλλαγή Χρωμάτων
Επεξεργαστείτε το `tailwind.config.ts`:
```typescript
colors: {
  primary: '#YOUR_COLOR',
  secondary: '#YOUR_COLOR',
}
```

### Ταχύτητα Carousel
Στο `HeroSection.tsx`:
```typescript
setInterval(() => {
  setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
}, 5000); // Αλλάξτε το 5000 (5 seconds)
```

### Προσθήκη Προϊόντων
Στο `ProductsSection.tsx`:
```typescript
const products: Product[] = [
  {
    name: 'New Product',
    description: 'Description',
    price: '$XXX',
    image: 'url',
    color: '#color',
  },
  // ...
];
```

## 🚀 Build για Production

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Development server (http://localhost:3000)
- `npm run build` - Production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Performance

- **Optimized animations** με GPU acceleration
- **Lazy loading** με useInView
- **Smooth 60fps** animations
- **Tree shaking** με Next.js
- **Automatic code splitting**

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 💡 Tips

1. **Hero Images**: Χρησιμοποιήστε high-quality images (1920x1080+)
2. **Optimize**: Compress images με WebP format
3. **Performance**: Χρησιμοποιήστε Next.js Image component
4. **Animations**: Προσαρμόστε duration και delay για καλύτερο UX

## 🆚 Διαφορές από Vanilla Version

| Feature | Vanilla | Next.js + Framer |
|---------|---------|------------------|
| Animations | CSS + JS | Framer Motion |
| Performance | Good | Excellent |
| Type Safety | ❌ | ✅ TypeScript |
| Code Organization | Single files | Components |
| Scroll Effects | Manual | useScroll hooks |
| Build System | None | Next.js |
| Hot Reload | ❌ | ✅ Fast Refresh |

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Developed with ❤️ using modern web technologies**
