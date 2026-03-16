'use client';

import { useState } from 'react';
import LoadingScreen from './LoadingScreen';

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.6s ease-in-out',
        }}
      >
        {children}
      </div>
    </>
  );
}
