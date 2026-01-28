# 🎨 Animation Guide

Διακριτικά και elegant animations για τη σελίδα Resin.

## 📋 Available Animations

### Fade Animations
```tsx
// Simple fade in
<div className="animate-fade-in">Content</div>

// Fade in from different directions
<div className="animate-fade-in-up">Από κάτω</div>
<div className="animate-fade-in-down">Από πάνω</div>
<div className="animate-fade-in-left">Από αριστερά</div>
<div className="animate-fade-in-right">Από δεξιά</div>
```

### Slide Animations
```tsx
<div className="animate-slide-up">Slide up</div>
<div className="animate-slide-down">Slide down</div>
<div className="animate-slide-left">Slide left</div>
<div className="animate-slide-right">Slide right</div>
```

### Zoom Animations
```tsx
<div className="animate-zoom-in">Zoom in</div>
<div className="animate-zoom-in-subtle">Subtle zoom (recommended)</div>
```

---

## 🎯 Scroll-Based Reveals

### Using the Custom Hook

```tsx
'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function MyComponent() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      Content reveals on scroll!
    </div>
  );
}
```

### Using Framer Motion (Recommended)

```tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function MyComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      Smooth scroll reveal!
    </motion.div>
  );
}
```

---

## ✨ Hover Effects

### Lift Effect
```tsx
<div className="hover-lift">
  Lifts on hover with shadow
</div>
```

### Scale Effect
```tsx
<div className="hover-scale">
  Scales to 1.05 on hover
</div>
```

### Underline Effect
```tsx
<a href="#" className="hover-underline">
  Underline expands on hover
</a>
```

### Custom Hover with Tailwind
```tsx
// Simple scale
<button className="transition-transform hover:scale-105">
  Button
</button>

// Lift with shadow
<div className="transition-all hover:-translate-y-2 hover:shadow-xl">
  Card
</div>

// Opacity change
<img className="transition-opacity hover:opacity-80" />
```

---

## 🎭 Animation Delays

Για stagger effects:

```tsx
<div className="animate-fade-in-up delay-100">First</div>
<div className="animate-fade-in-up delay-200">Second</div>
<div className="animate-fade-in-up delay-300">Third</div>
```

CSS για custom delays:
```tsx
<div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
  Delayed
</div>
```

---

## 📦 Complete Example

```tsx
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ProductCard({ product }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className="hover-lift bg-white rounded-lg p-6"
    >
      <motion.img
        src={product.image}
        className="w-full rounded-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      <h3 className="mt-4 text-2xl font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>

      <button className="mt-4 px-6 py-2 bg-primary text-white rounded-full transition-all hover:scale-105 hover:shadow-lg">
        View Details
      </button>
    </motion.div>
  );
}
```

---

## 🎨 Best Practices

1. **Διακριτικότητα** - Χρησιμοποιούμε subtle animations (0.5-0.6s duration)
2. **Once** - Scroll reveals εμφανίζονται μόνο μία φορά (`once: true`)
3. **Threshold** - Χρησιμοποιούμε 0.2-0.3 για καλύτερο UX
4. **Hover** - Κρατάμε τα hover effects γρήγορα (0.3s)
5. **Performance** - Χρησιμοποιούμε `transform` και `opacity` (GPU accelerated)

---

## 🚫 Αποφεύγουμε

- ❌ Bounce effects
- ❌ Glow/shimmer effects
- ❌ Excessive delays
- ❌ Too many simultaneous animations
- ❌ Slow animations (>1s)

---

## 📱 Responsive Considerations

```tsx
// Disable animations on mobile
<div className="md:animate-fade-in-up">
  Only animates on desktop
</div>

// Reduce motion for accessibility
<div className="motion-reduce:animate-none animate-fade-in">
  Respects user preferences
</div>
```
