import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchPageClient from '@/components/SearchPageClient';

export default function SearchPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <SearchPageClient />
      <Footer />
    </main>
  );
}
