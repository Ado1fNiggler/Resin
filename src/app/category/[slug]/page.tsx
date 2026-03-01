import { categories, getProductsByCategory, getCategoryBySlug } from '@/data/products';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import CategoryPageClient from '@/components/CategoryPageClient';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return {
    title: category ? `${category.name} — Resin` : 'Resin',
    description: category?.description || 'Luxury furniture collection',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  if (!category) {
    return (
      <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
        <Navbar alwaysShowSidebar />
        <div style={{ paddingLeft: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1 style={{ color: '#214A4F', fontSize: '24px' }}>Η κατηγορία δεν βρέθηκε</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F7F6F3' }}>
      <Navbar alwaysShowSidebar />
      <CategoryPageClient category={category} products={products} />
      <Footer />
    </main>
  );
}
