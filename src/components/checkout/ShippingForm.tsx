'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const dihjauti = localFont({
  src: [{ path: '../../../public/fonts/Dihjauti-Bold.otf', weight: '700', style: 'normal' }],
  display: 'swap',
});

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  region: string;
  notes: string;
}

const slowEase = [0.16, 1, 0.3, 1] as const;

const greekRegions = [
  'Αττική', 'Θεσσαλονίκη', 'Αχαΐα', 'Ηράκλειο', 'Λάρισα', 'Μαγνησία',
  'Ιωάννινα', 'Κέρκυρα', 'Χανιά', 'Ρέθυμνο', 'Ρόδος', 'Λέσβος',
  'Κυκλάδες', 'Δωδεκάνησα', 'Εύβοια', 'Μεσσηνία', 'Άλλο',
];

export default function ShippingForm({
  info,
  onChange,
  onNext,
}: {
  info: ShippingInfo;
  onChange: (info: ShippingInfo) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  const update = (field: keyof ShippingInfo, value: string) => {
    onChange({ ...info, [field]: value });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ShippingInfo, string>> = {};
    if (!info.firstName.trim()) errs.firstName = 'Υποχρεωτικό πεδίο';
    if (!info.lastName.trim()) errs.lastName = 'Υποχρεωτικό πεδίο';
    if (!info.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email))
      errs.email = 'Μη έγκυρο email';
    if (!info.phone.trim() || info.phone.replace(/\D/g, '').length < 10)
      errs.phone = 'Μη έγκυρο τηλέφωνο';
    if (!info.address.trim()) errs.address = 'Υποχρεωτικό πεδίο';
    if (!info.city.trim()) errs.city = 'Υποχρεωτικό πεδίο';
    if (!info.postalCode.trim() || !/^\d{5}$/.test(info.postalCode))
      errs.postalCode = 'Μη έγκυρος Τ.Κ. (5 ψηφία)';
    if (!info.region) errs.region = 'Επιλέξτε περιοχή';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onNext();
  };

  const inputStyle = (field: keyof ShippingInfo): React.CSSProperties => ({
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: errors[field] ? '1.5px solid #c0392b' : '1.5px solid rgba(33,74,79,0.15)',
    borderRadius: '4px',
    outline: 'none',
    color: '#214A4F',
    backgroundColor: '#fff',
    transition: 'border-color 0.3s ease',
  });

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#214A4F',
    marginBottom: '8px',
  };

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
        Στοιχεία Αποστολής
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* First Name */}
        <div>
          <label style={labelStyle}>Όνομα</label>
          <input
            value={info.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            style={inputStyle('firstName')}
            placeholder="π.χ. Γιάννης"
          />
          {errors.firstName && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label style={labelStyle}>Επώνυμο</label>
          <input
            value={info.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            style={inputStyle('lastName')}
            placeholder="π.χ. Παπαδόπουλος"
          />
          {errors.lastName && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => update('email', e.target.value)}
            style={inputStyle('email')}
            placeholder="email@example.com"
          />
          {errors.email && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle}>Τηλέφωνο</label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => update('phone', e.target.value)}
            style={inputStyle('phone')}
            placeholder="69x xxx xxxx"
          />
          {errors.phone && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
        </div>

        {/* Address - full width */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Διεύθυνση</label>
          <input
            value={info.address}
            onChange={(e) => update('address', e.target.value)}
            style={inputStyle('address')}
            placeholder="Οδός και αριθμός"
          />
          {errors.address && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
        </div>

        {/* City */}
        <div>
          <label style={labelStyle}>Πόλη</label>
          <input
            value={info.city}
            onChange={(e) => update('city', e.target.value)}
            style={inputStyle('city')}
            placeholder="π.χ. Αθήνα"
          />
          {errors.city && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.city}</p>}
        </div>

        {/* Postal Code */}
        <div>
          <label style={labelStyle}>Τ.Κ.</label>
          <input
            value={info.postalCode}
            onChange={(e) => update('postalCode', e.target.value)}
            style={inputStyle('postalCode')}
            placeholder="π.χ. 10564"
            maxLength={5}
          />
          {errors.postalCode && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.postalCode}</p>}
        </div>

        {/* Region */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Περιοχή</label>
          <select
            value={info.region}
            onChange={(e) => update('region', e.target.value)}
            style={{
              ...inputStyle('region'),
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23214A4F' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
            }}
          >
            <option value="">Επιλέξτε περιοχή</option>
            {greekRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {errors.region && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{errors.region}</p>}
        </div>

        {/* Notes */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Σημειώσεις (προαιρετικά)</label>
          <textarea
            value={info.notes}
            onChange={(e) => update('notes', e.target.value)}
            rows={3}
            style={{ ...inputStyle('notes'), resize: 'vertical' }}
            placeholder="π.χ. Κουδούνι 3ου ορόφου"
          />
        </div>
      </div>

      {/* Continue button */}
      <motion.button
        className={dihjauti.className}
        onClick={handleSubmit}
        style={{
          marginTop: '32px',
          width: '100%',
          padding: '16px',
          backgroundColor: '#214A4F',
          color: '#FCFCFC',
          border: 'none',
          borderRadius: '4px',
          fontSize: '12px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
        }}
        whileHover={{ backgroundColor: '#18363A' }}
        whileTap={{ scale: 0.98 }}
      >
        <span>Συνέχεια στην Αποστολή</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
