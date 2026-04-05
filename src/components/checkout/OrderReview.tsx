'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import type { CartItem } from '@/context/StoreContext';
import type { ShippingInfo } from './ShippingForm';
import { shippingMethods, getShippingCost } from '@/data/shipping';

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

const narrenschiff = localFont({
  src: [{ path: '../../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

function formatPrice(n: number) {
  return n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function OrderReview({
  cart,
  shippingInfo,
  shippingMethodId,
  subtotal,
  onBack,
  onConfirm,
  isProcessing,
}: {
  cart: CartItem[];
  shippingInfo: ShippingInfo;
  shippingMethodId: string;
  subtotal: number;
  onBack: () => void;
  onConfirm: () => void;
  isProcessing: boolean;
}) {
  const shippingCost = getShippingCost(shippingMethodId, subtotal);
  const total = subtotal + shippingCost;
  const shippingMethod = shippingMethods.find((m) => m.id === shippingMethodId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: slowEase }}
    >
      <h2
        className={dihjauti.className}
        style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#214A4F', marginBottom: '32px', textTransform: 'uppercase' }}
      >
        Επισκόπηση Παραγγελίας
      </h2>

      {/* Shipping Address Summary */}
      <div style={{
        padding: '20px',
        border: '1.5px solid rgba(33,74,79,0.1)',
        borderRadius: '4px',
        marginBottom: '24px',
      }}>
        <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#214A4F', marginBottom: '12px', textTransform: 'uppercase' }}>
          Αποστολή σε
        </p>
        <p style={{ fontSize: '14px', color: '#214A4F', lineHeight: 1.7 }}>
          {shippingInfo.firstName} {shippingInfo.lastName}<br />
          {shippingInfo.address}<br />
          {shippingInfo.postalCode} {shippingInfo.city}, {shippingInfo.region}<br />
          {shippingInfo.phone} · {shippingInfo.email}
        </p>
        {shippingInfo.notes && (
          <p style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)', marginTop: '8px', fontStyle: 'italic' }}>
            {shippingInfo.notes}
          </p>
        )}
      </div>

      {/* Shipping Method */}
      <div style={{
        padding: '16px 20px',
        border: '1.5px solid rgba(33,74,79,0.1)',
        borderRadius: '4px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#214A4F', marginBottom: '4px', textTransform: 'uppercase' }}>
            Τρόπος αποστολής
          </p>
          <p style={{ fontSize: '14px', color: '#214A4F' }}>
            {shippingMethod?.name} · {shippingMethod?.estimatedDays}
          </p>
        </div>
        <span className={dihjauti.className} style={{ fontSize: '14px', color: '#214A4F' }}>
          {shippingCost === 0 ? 'ΔΩΡΕΑΝ' : `${shippingCost}€`}
        </span>
      </div>

      {/* Cart Items */}
      <div style={{ marginBottom: '24px' }}>
        <p className={dihjauti.className} style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#214A4F', marginBottom: '16px', textTransform: 'uppercase' }}>
          Προϊόντα ({cart.length})
        </p>
        {cart.map((item) => (
          <div
            key={`${item.slug}-${item.finish}`}
            style={{
              display: 'flex',
              gap: '16px',
              padding: '16px 0',
              borderBottom: '1px solid rgba(33,74,79,0.08)',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#E8E5E0' }}
            />
            <div style={{ flex: 1 }}>
              <p className={narrenschiff.className} style={{ fontSize: '16px', color: '#214A4F', marginBottom: '4px' }}>
                {item.name}
              </p>
              <p style={{ fontSize: '12px', color: 'rgba(33,74,79,0.6)' }}>
                {item.finish} · {item.fabric} · ×{item.quantity}
              </p>
            </div>
            <span className={dihjauti.className} style={{ fontSize: '14px', color: '#214A4F' }}>
              € {item.price}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{
        padding: '20px',
        backgroundColor: 'rgba(33,74,79,0.03)',
        borderRadius: '4px',
        marginBottom: '32px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', color: 'rgba(33,74,79,0.7)' }}>Υποσύνολο</span>
          <span style={{ fontSize: '14px', color: '#214A4F' }}>€ {formatPrice(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: 'rgba(33,74,79,0.7)' }}>Αποστολή</span>
          <span style={{ fontSize: '14px', color: '#214A4F' }}>
            {shippingCost === 0 ? 'Δωρεάν' : `€ ${shippingCost}`}
          </span>
        </div>
        <div style={{ borderTop: '1.5px solid rgba(33,74,79,0.15)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
          <span className={dihjauti.className} style={{ fontSize: '14px', letterSpacing: '0.1em', color: '#214A4F', textTransform: 'uppercase' }}>
            Σύνολο
          </span>
          <span className={dihjauti.className} style={{ fontSize: '20px', color: '#214A4F' }}>
            € {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={onBack}
          disabled={isProcessing}
          style={{
            flex: 1,
            padding: '16px',
            border: '1.5px solid rgba(33,74,79,0.2)',
            borderRadius: '4px',
            background: 'transparent',
            color: '#214A4F',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            opacity: isProcessing ? 0.5 : 1,
          }}
        >
          Πίσω
        </button>
        <motion.button
          className={dihjauti.className}
          onClick={onConfirm}
          disabled={isProcessing}
          style={{
            flex: 2,
            padding: '16px',
            backgroundColor: '#214A4F',
            color: '#FCFCFC',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: isProcessing ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
          whileHover={!isProcessing ? { backgroundColor: '#18363A' } : {}}
          whileTap={!isProcessing ? { scale: 0.98 } : {}}
        >
          {isProcessing ? (
            <span>Επεξεργασία...</span>
          ) : (
            <>
              <span>Ολοκλήρωση Παραγγελίας</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
