import Navbar from '@/components/Navbar';
import OrderConfirmationClient from '@/components/checkout/OrderConfirmationClient';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Επιβεβαίωση Παραγγελίας - Resin',
  description: 'Η παραγγελία σας ολοκληρώθηκε επιτυχώς.',
};

export default function OrderConfirmationPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <OrderConfirmationClient />
      <Footer />
    </main>
  );
}
