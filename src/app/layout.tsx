import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Resin - \u03A0\u03BF\u03BB\u03C5\u03C4\u03B5\u03BB\u03AE \u038A\u03C0\u03B9\u03C0\u03BB\u03B1',
  description: '\u0397 \u03B1\u03B3\u03AC\u03C0\u03B7 \u03B3\u03B9\u03B1 \u03C4\u03BF \u03C3\u03C0\u03AF\u03C4\u03B9 \u03C3\u03B1\u03C2 \u03B4\u03B5\u03BD \u03C7\u03C9\u03C1\u03AC\u03B5\u03B9 \u03C3\u03C5\u03BC\u03B2\u03B9\u03B2\u03B1\u03C3\u03BC\u03BF\u03CD\u03C2 \u03C3\u03C4\u03B7\u03BD \u03B1\u03B9\u03C3\u03B8\u03B7\u03C4\u03B9\u03BA\u03AE.',
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
