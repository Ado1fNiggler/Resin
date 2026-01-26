import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ROOOF - Luxury Furniture for Dogs',
  description: 'Loving your pets doesn\'t mean compromising your style—it means elevating theirs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
