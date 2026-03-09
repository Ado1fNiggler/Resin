import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartPageClient from '@/components/CartPageClient';

export default function CartPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <CartPageClient />
      <Footer />
    </main>
  );
}
