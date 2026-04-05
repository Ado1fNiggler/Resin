'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';
import { useStore } from '@/context/StoreContext';
import { getShippingCost } from '@/data/shipping';
import ShippingForm, { type ShippingInfo } from './ShippingForm';
import ShippingMethodStep from './ShippingMethod';
import OrderReview from './OrderReview';

const narrenschiff = localFont({
  src: [{ path: '../../../public/fonts/Narrenschiff-Regular.otf', weight: '400', style: 'normal' }],
  display: 'swap',
});

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

const slowEase = [0.16, 1, 0.3, 1] as const;

const steps = [
  { id: 'shipping', label: 'Στοιχεία' },
  { id: 'method', label: 'Αποστολή' },
  { id: 'review', label: 'Επισκόπηση' },
];

export default function CheckoutPageClient() {
  const router = useRouter();
  const { cart, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    region: '',
    notes: '',
  });

  const [shippingMethodId, setShippingMethodId] = useState('standard');

  const subtotal = cart.reduce((sum, item) => {
    const num = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
    return sum + (isNaN(num) ? 0 : num * item.quantity);
  }, 0);

  const shippingCost = getShippingCost(shippingMethodId, subtotal);
  const total = subtotal + shippingCost;

  const formatPrice = (n: number) =>
    n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const handleConfirmOrder = async () => {
    setIsProcessing(true);

    // Generate order number
    const orderNumber = `RES-${Date.now().toString(36).toUpperCase()}`;

    // Store order details in sessionStorage for confirmation page
    sessionStorage.setItem('resin-last-order', JSON.stringify({
      orderNumber,
      items: cart,
      shippingInfo,
      shippingMethodId,
      subtotal,
      shippingCost,
      total,
      date: new Date().toISOString(),
    }));

    // Simulate processing delay (replace with Stripe integration when ready)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    clearCart();
    router.push('/order-confirmation');
  };

  // Empty cart redirect
  if (cart.length === 0 && !isProcessing) {
    return (
      <div style={{ paddingLeft: '75px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: slowEase }}
          style={{ textAlign: 'center' }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#214A4F" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px', opacity: 0.4 }}>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <p style={{ fontSize: '16px', color: '#214A4F', marginBottom: '20px' }}>
            Το καλάθι σας είναι άδειο
          </p>
          <motion.a
            href="/"
            className={dihjauti.className}
            onClick={(e) => { e.preventDefault(); router.push('/'); }}
            style={{
              fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#214A4F', textDecoration: 'underline', textUnderlineOffset: '4px',
            }}
            whileHover={{ opacity: 0.7 }}
          >
            Επιστροφή στο κατάστημα
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingLeft: '75px', minHeight: '100vh', backgroundColor: '#F7F6F3' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 48px 80px' }}>
        {/* Header */}
        <motion.h1
          className={narrenschiff.className}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: slowEase }}
          style={{ fontSize: '42px', color: '#214A4F', marginBottom: '48px', letterSpacing: '0.02em' }}
        >
          Ολοκλήρωση Παραγγελίας
        </motion.h1>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: slowEase }}
          style={{ display: 'flex', gap: '0', marginBottom: '48px', borderBottom: '1px solid rgba(33,74,79,0.1)', paddingBottom: '20px' }}
        >
          {steps.map((step, i) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {i > 0 && (
                <div style={{ width: '40px', height: '1px', backgroundColor: i <= currentStep ? '#214A4F' : 'rgba(33,74,79,0.15)' }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 600,
                    backgroundColor: i <= currentStep ? '#214A4F' : 'transparent',
                    color: i <= currentStep ? '#FCFCFC' : 'rgba(33,74,79,0.4)',
                    border: i <= currentStep ? 'none' : '1.5px solid rgba(33,74,79,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {i < currentStep ? '✓' : i + 1}
                </div>
                <span
                  className={dihjauti.className}
                  style={{
                    fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: i <= currentStep ? '#214A4F' : 'rgba(33,74,79,0.4)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Content: 2-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', alignItems: 'start' }}>
          {/* Left: Form Steps */}
          <div>
            {currentStep === 0 && (
              <ShippingForm
                info={shippingInfo}
                onChange={setShippingInfo}
                onNext={() => setCurrentStep(1)}
              />
            )}
            {currentStep === 1 && (
              <ShippingMethodStep
                selectedMethod={shippingMethodId}
                onSelect={setShippingMethodId}
                onNext={() => setCurrentStep(2)}
                onBack={() => setCurrentStep(0)}
                subtotal={subtotal}
              />
            )}
            {currentStep === 2 && (
              <OrderReview
                cart={cart}
                shippingInfo={shippingInfo}
                shippingMethodId={shippingMethodId}
                subtotal={subtotal}
                onBack={() => setCurrentStep(1)}
                onConfirm={handleConfirmOrder}
                isProcessing={isProcessing}
              />
            )}
          </div>

          {/* Right: Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: slowEase }}
            style={{
              position: 'sticky',
              top: '100px',
              padding: '28px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              border: '1px solid rgba(33,74,79,0.08)',
            }}
          >
            <p
              className={dihjauti.className}
              style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#214A4F', marginBottom: '20px', textTransform: 'uppercase' }}
            >
              Σύνοψη Παραγγελίας
            </p>

            {/* Cart items mini list */}
            {cart.map((item) => (
              <div
                key={`${item.slug}-${item.finish}`}
                style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#E8E5E0' }}
                  />
                  {item.quantity > 1 && (
                    <span style={{
                      position: 'absolute', top: '-6px', right: '-6px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      backgroundColor: '#214A4F', color: '#FCFCFC',
                      fontSize: '11px', fontWeight: 600,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {item.quantity}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#214A4F' }}>{item.name}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(33,74,79,0.5)' }}>{item.finish}</p>
                </div>
                <span style={{ fontSize: '13px', color: '#214A4F' }}>€ {item.price}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid rgba(33,74,79,0.08)', paddingTop: '16px', marginTop: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Υποσύνολο</span>
                <span style={{ fontSize: '13px', color: '#214A4F' }}>€ {formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(33,74,79,0.6)' }}>Αποστολή</span>
                <span style={{ fontSize: '13px', color: '#214A4F' }}>
                  {shippingCost === 0 ? 'Δωρεάν' : `€ ${shippingCost}`}
                </span>
              </div>
              <div style={{ borderTop: '1.5px solid rgba(33,74,79,0.12)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span className={dihjauti.className} style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#214A4F', textTransform: 'uppercase' }}>
                  Σύνολο
                </span>
                <span className={dihjauti.className} style={{ fontSize: '18px', color: '#214A4F' }}>
                  € {formatPrice(total)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
