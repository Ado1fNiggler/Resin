import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import ProductsSection from '@/components/ProductsSection';
import FeaturesSection from '@/components/FeaturesSection';
import GallerySection from '@/components/GallerySection';
import PurposeSection from '@/components/PurposeSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import PageLoader from '@/components/PageLoader';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <PageLoader />
      <Navbar />
      <HeroSection />
      <CraftsmanshipSection />
      <ProductsSection />
      <FeaturesSection />
      <GallerySection />
      <PurposeSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
