'use client';

interface ProductStructuredDataProps {
  name: string;
  description: string;
  price: string;
  image: string;
  slug: string;
  category: string;
}

export function ProductStructuredData({ name, description, price, image, slug, category }: ProductStructuredDataProps) {
  const numericPrice = price.replace(/\./g, '').replace(',', '.');

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image.startsWith('/') ? `https://resin.gr${image}` : image,
    url: `https://resin.gr/product/${slug}`,
    brand: {
      '@type': 'Brand',
      name: 'RESIN',
    },
    category,
    offers: {
      '@type': 'Offer',
      price: numericPrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'RESIN',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationStructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RESIN',
    url: 'https://resin.gr',
    logo: 'https://resin.gr/icon.svg',
    description: 'Πολυτελή χειροποίητα έπιπλα. Η αγάπη για το σπίτι σας δεν χωράει συμβιβασμούς στην αισθητική.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('/') ? `https://resin.gr${item.url}` : item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
