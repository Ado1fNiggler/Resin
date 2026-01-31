'use client';

import { motion } from 'framer-motion';
import localFont from 'next/font/local';

const narrenschiff = localFont({
  src: [
    {
      path: '../../public/fonts/Narrenschiff-Regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-narrenschiff',
});

const footerColumns = [
  {
    title: 'ΕΤΑΙΡΕΙΑ',
    links: ['Αρχική', 'Σχετικά με εμάς', 'Press Kit', 'Trade Program', 'Επικοινωνία'],
  },
  {
    title: 'ΠΡΟΪΟΝΤΑ',
    links: ['Πολυθρόνες', 'Καναπέδες', 'Τραπεζαρίες', 'Αποθηκευτικοί χώροι', 'Ειδικές παραγγελίες'],
  },
  {
    title: 'ΥΠΟΣΤΗΡΙΞΗ',
    links: ['Συχνές ερωτήσεις', 'Οδηγός συναρμολόγησης & φροντίδας', 'Εγγύηση', 'Αποστολή & Παράδοση', 'Επιστροφές & Ανταλλαγές'],
  },
  {
    title: 'ΑΚΟΛΟΥΘΗΣΤΕ',
    links: ['Instagram', 'Facebook', 'Pinterest'],
  },
  {
    title: 'ΝΟΜΙΚΑ',
    links: ['Πολιτική απορρήτου', 'Όροι & Προϋποθέσεις'],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{ backgroundColor: '#1A3A3E' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-[100px]">
        <div className="py-16 md:py-20">
          {/* Main columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-10 mb-20">
            {footerColumns.map((column, colIndex) => (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: colIndex * 0.08 }}
              >
                <h5
                  className="text-[13px] font-bold tracking-[0.15em] uppercase mb-8"
                  style={{ color: '#FCFCFC' }}
                >
                  {column.title}
                </h5>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        className="text-[14px] transition-colors duration-300 block"
                        style={{ color: 'rgba(252,252,252,0.6)' }}
                        whileHover={{ color: '#ffffff', x: 2 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: arrow | logo | copyright */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Scroll to top arrow */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="transition-all duration-300"
              whileHover={{ y: -3 }}
              style={{ color: 'rgba(252,252,252,0.5)' }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.button>

            {/* Logo */}
            <a
              href="#"
              className={narrenschiff.className}
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'rgba(252,252,252,0.7)',
              }}
            >
              RESIN
            </a>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Copyright */}
            <p className="text-[12px] tracking-wide" style={{ color: 'rgba(252,252,252,0.35)' }}>
              RESIN&trade; Inc. 2025, All Rights Reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
