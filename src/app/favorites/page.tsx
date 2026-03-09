import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FavoritesPageClient from '@/components/FavoritesPageClient';

export default function FavoritesPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <FavoritesPageClient />
      <Footer />
    </main>
  );
}
