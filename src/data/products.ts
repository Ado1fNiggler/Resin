export interface ProductData {
  slug: string;
  name: string;
  menuImage: string;
  sizes: string;
  fabrics: string;
  price: string;
  description: string;
  images: {
    'natural-oak': string;
    'caramel-walnut': string;
    'dark-walnut': string;
  };
  galleryImages: string[];
}

export const allProducts: ProductData[] = [
  {
    slug: 'phantigo',
    name: 'PHANTIGO',
    menuImage: '/armchairs.png',
    sizes: '2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7',
    fabrics: '19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1',
    price: '750',
    description: '\u0388\u03BD\u03B1 \u03BA\u03BF\u03BC\u03C8\u03CC \u03AD\u03C0\u03B9\u03C0\u03BB\u03BF \u03C0\u03BF\u03C5 \u03C3\u03C5\u03BD\u03B4\u03C5\u03AC\u03B6\u03B5\u03B9 \u03C4\u03B7\u03BD \u03C0\u03BF\u03BB\u03C5\u03C4\u03AD\u03BB\u03B5\u03B9\u03B1 \u03BC\u03B5 \u03C4\u03B7\u03BD \u03AC\u03BD\u03B5\u03C3\u03B7. \u0394\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF \u03C3\u03B5 2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7 \u03BA\u03B1\u03B9 19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1.',
    images: {
      'natural-oak': '/dining-tables1.png',
      'caramel-walnut': '/dining-tables2.png',
      'dark-walnut': '/dining-tables.png',
    },
    galleryImages: ['/dining-tables1.png', '/dining-tables2.png', '/dining-tables.png'],
  },
  {
    slug: 'violet',
    name: 'VIOLET',
    menuImage: '/sofas.png',
    sizes: '2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7',
    fabrics: '19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1',
    price: '850',
    description: '\u039C\u03BF\u03BD\u03B1\u03B4\u03B9\u03BA\u03CC\u03C2 \u03C3\u03C7\u03B5\u03B4\u03B9\u03B1\u03C3\u03BC\u03CC\u03C2 \u03BC\u03B5 \u03B5\u03BE\u03B1\u03B9\u03C1\u03B5\u03C4\u03B9\u03BA\u03AE \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03BA\u03B1\u03C4\u03B1\u03C3\u03BA\u03B5\u03C5\u03AE\u03C2. \u0394\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF \u03C3\u03B5 2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7 \u03BA\u03B1\u03B9 19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1.',
    images: {
      'natural-oak': '/wardrobes.png',
      'caramel-walnut': '/wardrobes2.png',
      'dark-walnut': '/wardrobes3.png',
    },
    galleryImages: ['/wardrobes.png', '/wardrobes2.png', '/wardrobes3.png'],
  },
  {
    slug: 'maximillian',
    name: 'MAXIMILLIAN',
    menuImage: '/dining-tables.png',
    sizes: '2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7',
    fabrics: '19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1',
    price: '950',
    description: '\u039A\u03BF\u03C1\u03C5\u03C6\u03B1\u03AF\u03B1 \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03BA\u03B1\u03B9 \u03B4\u03B9\u03B1\u03C7\u03C1\u03BF\u03BD\u03B9\u03BA\u03CC\u03C2 \u03C3\u03C7\u03B5\u03B4\u03B9\u03B1\u03C3\u03BC\u03CC\u03C2. \u0394\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF \u03C3\u03B5 2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7 \u03BA\u03B1\u03B9 19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1.',
    images: {
      'natural-oak': '/table1.png',
      'caramel-walnut': '/sofa3.png',
      'dark-walnut': '/sofa2.png',
    },
    galleryImages: ['/table1.png', '/sofa3.png', '/sofa2.png'],
  },
  {
    slug: 'huxton',
    name: 'HUXTON',
    menuImage: '/wardrobes.png',
    sizes: '2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7',
    fabrics: '19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1',
    price: '1.150',
    description: '\u03A4\u03BF \u03B1\u03C0\u03CC\u03BB\u03C5\u03C4\u03BF \u03AD\u03C0\u03B9\u03C0\u03BB\u03BF \u03C0\u03BF\u03BB\u03C5\u03C4\u03B5\u03BB\u03B5\u03AF\u03B1\u03C2 \u03B3\u03B9\u03B1 \u03C4\u03B7\u03BD \u03BF\u03B9\u03BA\u03AF\u03B1 \u03C3\u03B1\u03C2. \u0394\u03B9\u03B1\u03B8\u03AD\u03C3\u03B9\u03BC\u03BF \u03C3\u03B5 2 \u03BC\u03B5\u03B3\u03AD\u03B8\u03B7 \u03BA\u03B1\u03B9 19 \u03C5\u03C6\u03AC\u03C3\u03BC\u03B1\u03C4\u03B1.',
    images: {
      'natural-oak': '/armchairs1.png',
      'caramel-walnut': '/armchairs2.png',
      'dark-walnut': '/armchairs.png',
    },
    galleryImages: ['/armchairs1.png', '/armchairs2.png', '/armchairs.png'],
  },
  {
    slug: 'custom-orders',
    name: '\u0395\u0399\u0394\u0399\u039A\u0395\u03A3 \u03A0\u0391\u03A1\u0391\u0393\u0393\u0395\u039B\u0399\u0395\u03A3',
    menuImage: '/other.png',
    sizes: '\u039A\u03B1\u03C4\u03CC\u03C0\u03B9\u03BD \u03C0\u03B1\u03C1\u03B1\u03B3\u03B3\u03B5\u03BB\u03AF\u03B1\u03C2',
    fabrics: '\u0391\u03C0\u03B5\u03C1\u03B9\u03CC\u03C1\u03B9\u03C3\u03C4\u03B5\u03C2 \u03B5\u03C0\u03B9\u03BB\u03BF\u03B3\u03AD\u03C2',
    price: '\u039A\u03B1\u03C4\u03CC\u03C0\u03B9\u03BD \u03C0\u03C1\u03BF\u03C3\u03C6\u03BF\u03C1\u03AC\u03C2',
    description: '\u0394\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AE\u03C3\u03C4\u03B5 \u03C4\u03BF \u03AD\u03C0\u03B9\u03C0\u03BB\u03BF \u03C4\u03C9\u03BD \u03BF\u03BD\u03B5\u03AF\u03C1\u03C9\u03BD \u03C3\u03B1\u03C2 \u03BC\u03B5 \u03C0\u03BB\u03AE\u03C1\u03C9\u03C2 \u03B5\u03BE\u03B1\u03C4\u03BF\u03BC\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03B5\u03C2 \u03B4\u03B9\u03B1\u03C3\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2, \u03C5\u03BB\u03B9\u03BA\u03AC \u03BA\u03B1\u03B9 \u03C6\u03B9\u03BD\u03AF\u03C1\u03B9\u03C3\u03BC\u03B1.',
    images: {
      'natural-oak': '/other.png',
      'caramel-walnut': '/other.png',
      'dark-walnut': '/other.png',
    },
    galleryImages: ['/other.png'],
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return allProducts.find((p) => p.slug === slug);
}
