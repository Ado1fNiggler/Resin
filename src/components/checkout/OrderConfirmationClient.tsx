'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [{ path: '../../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
});

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

interface OrderData {
  orderNumber: string;
  items: Array<{ slug: string; name: string; price: string; image: string; finish: string; fabric: string; quantity: number }>;
  shippingInfo: {
    firstName: string; lastName: string; email: string; phone: string;
    address: string; city: string; postalCode: string; region: string;
  };
  shippingMethodId: string;
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
}

function formatPrice(n: number) {
  return n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function OrderConfirmationClient() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('resin-last-order');
    if (raw) {
      setOrder(JSON.parse(raw));
    }
  }, []);

  if (!order) {
    return (
      <div style={{ paddingLeft: '75px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: '16px', color: '#214A4F', marginBottom: '20px' }}>
            Δεν βρέθηκαν στοιχεία παραγγελίας
          </p>
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); router.push('/'); }}
            className={dihjauti.className}
            style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#214A4F', textDecoration: 'underline', textUnderlineOffset: '4px' }}
            whileHover={{ opacity: 0.7 }}
          >
            Επιστροφή στο κατάστημα
          </motion.a>
        </motion.div>
      </div>
    );
  }

  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ paddingLeft: '75px', minHeight: '100vh', backgroundColor: '#F7F6F3' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 48px' }}>
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: slowEase }}
          style={{ textAlign: 'center', marginBottom: '32px' }}
        >
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: '#214A4F', margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FCFCFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>

        {/* Thank you */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h1
            className={narrenschiff.className}
            style={{ fontSize: '36px', color: '#214A4F', marginBottom: '12px', letterSpacing: '0.02em' }}
          >
            Ευχαριστούμε!
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(33,74,79,0.7)', lineHeight: 1.6 }}>
            Η παραγγελία σας καταχωρήθηκε επιτυχώς. Θα λάβετε email επιβεβαίωσης στο{' '}
            <strong style={{ color: '#214A4F' }}>{order.shippingInfo.email}</strong>.
          </p>
        </motion.div>

        {/* Order details card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: slowEase }}
          style={{
            backgroundColor: '#fff',
            border: '1px solid rgba(33,74,79,0.08)',
            borderRadius: '4px',
            padding: '32px',
            marginBottom: '32px',
          }}
        >
          {/* Order number & date */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(33,74,79,0.08)' }}>
            <div>
              <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(33,74,79,0.5)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Αριθμός Παραγγελίας
              </p>
              <p className={dihjauti.className} style={{ fontSize: '18px', color: '#214A4F', letterSpacing: '0.05em' }}>
                {order.orderNumber}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(33,74,79,0.5)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Ημερομηνία
              </p>
              <p style={{ fontSize: '14px', color: '#214A4F' }}>{formattedDate}</p>
            </div>
          </div>

          {/* Items */}
          {order.items.map((item) => (
            <div
              key={`${item.slug}-${item.finish}`}
              style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(33,74,79,0.05)' }}
            >
              <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#E8E5E0' }} />
              <div style={{ flex: 1 }}>
                <p className={narrenschiff.className} style={{ fontSize: '15px', color: '#214A4F' }}>{item.name}</p>
                <p style={{ fontSize: '12px', color: 'rgba(33,74,79,0.5)', marginTop: '2px' }}>
                  {item.finish} · {item.fabric} · ×{item.quantity}
                </p>
              </div>
              <span style={{ fontSize: '14px', color: '#214A4F', alignSelf: 'center' }}>€ {item.price}</span>
            </div>
          ))}

          {/* Totals */}
          <div style={{ paddingTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Υποσύνολο</span>
              <span style={{ fontSize: '13px', color: '#214A4F' }}>€ {formatPrice(order.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Αποστολή</span>
              <span style={{ fontSize: '13px', color: '#214A4F' }}>
                {order.shippingCost === 0 ? 'Δωρεάν' : `€ ${order.shippingCost}`}
              </span>
            </div>
            <div style={{ borderTop: '1.5px solid rgba(33,74,79,0.12)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span className={dihjauti.className} style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#214A4F', textTransform: 'uppercase' }}>Σύνολο</span>
              <span className={dihjauti.className} style={{ fontSize: '20px', color: '#214A4F' }}>€ {formatPrice(order.total)}</span>
            </div>
          </div>
        </motion.div>

        {/* Shipping info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: slowEase }}
          style={{
            backgroundColor: '#fff',
            border: '1px solid rgba(33,74,79,0.08)',
            borderRadius: '4px',
            padding: '24px 32px',
            marginBottom: '40px',
          }}
        >
          <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(33,74,79,0.5)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Αποστολή σε
          </p>
          <p style={{ fontSize: '14px', color: '#214A4F', lineHeight: 1.7 }}>
            {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
            {order.shippingInfo.address}<br />
            {order.shippingInfo.postalCode} {order.shippingInfo.city}, {order.shippingInfo.region}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <motion.a
            href="/"
            onClick={(e) => { e.preventDefault(); router.push('/'); }}
            className={dihjauti.className}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 32px', borderRadius: '4px',
              border: '1.5px solid #214A4F', color: '#214A4F',
              fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
            whileHover={{ backgroundColor: '#214A4F', color: '#FCFCFC' }}
          >
            Συνέχεια Αγορών
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
