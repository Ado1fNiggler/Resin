import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaqPageClient from '@/components/FaqPageClient';

export default function FaqPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <FaqPageClient />
      <Footer />
    </main>
  );
}
