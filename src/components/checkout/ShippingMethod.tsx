'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { shippingMethods, FREE_SHIPPING_THRESHOLD, getShippingCost } from '@/data/shipping';

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

export default function ShippingMethodStep({
  selectedMethod,
  onSelect,
  onNext,
  onBack,
  subtotal,
}: {
  selectedMethod: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  subtotal: number;
}) {
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
        Τρόπος Αποστολής
      </h2>

      {subtotal >= FREE_SHIPPING_THRESHOLD && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: 'rgba(126,192,201,0.12)',
          borderRadius: '4px',
          marginBottom: '24px',
          fontSize: '13px',
          color: '#214A4F',
        }}>
          Δωρεάν τυπική αποστολή για παραγγελίες άνω των {FREE_SHIPPING_THRESHOLD}€
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {shippingMethods.map((method) => {
          const cost = getShippingCost(method.id, subtotal);
          const isSelected = selectedMethod === method.id;

          return (
            <motion.button
              key={method.id}
              onClick={() => onSelect(method.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '20px',
                border: isSelected ? '2px solid #214A4F' : '1.5px solid rgba(33,74,79,0.15)',
                borderRadius: '4px',
                background: isSelected ? 'rgba(33,74,79,0.03)' : '#fff',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ borderColor: '#214A4F' }}
            >
              {/* Radio circle */}
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: isSelected ? '6px solid #214A4F' : '2px solid rgba(33,74,79,0.3)',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }} />

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: 600, color: '#214A4F', marginBottom: '4px' }}>
                  {method.name}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>
                  {method.description} · {method.estimatedDays}
                </p>
              </div>

              {/* Price */}
              <span
                className={dihjauti.className}
                style={{ fontSize: '15px', color: '#214A4F', flexShrink: 0 }}
              >
                {cost === 0 ? 'ΔΩΡΕΑΝ' : `${cost}€`}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
        <button
          onClick={onBack}
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
            cursor: 'pointer',
          }}
        >
          Πίσω
        </button>
        <motion.button
          className={dihjauti.className}
          onClick={onNext}
          disabled={!selectedMethod}
          style={{
            flex: 2,
            padding: '16px',
            backgroundColor: selectedMethod ? '#214A4F' : 'rgba(33,74,79,0.3)',
            color: '#FCFCFC',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: selectedMethod ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
          whileHover={selectedMethod ? { backgroundColor: '#18363A' } : {}}
          whileTap={selectedMethod ? { scale: 0.98 } : {}}
        >
          <span>Συνέχεια στην Πληρωμή</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
