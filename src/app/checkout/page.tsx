import Navbar from '@/components/Navbar';
import CheckoutPageClient from '@/components/checkout/CheckoutPageClient';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Ολοκλήρωση Παραγγελίας - Resin',
  description: 'Ολοκληρώστε την παραγγελία σας στο Resin.',
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <CheckoutPageClient />
      <Footer />
    </main>
  );
}
