import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutPageClient from '@/components/AboutPageClient';

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <AboutPageClient />
      <Footer />
    </main>
  );
}
