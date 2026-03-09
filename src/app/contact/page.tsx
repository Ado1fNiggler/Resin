import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactPageClient from '@/components/ContactPageClient';

export default function ContactPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <ContactPageClient />
      <Footer />
    </main>
  );
}
