export interface ProductData {
  slug: string;
  name: string;
  menuImage: string;
  category: string;        // category slug
  categoryName: string;    // display name (Greek)
  sizes: string;
  fabrics: string;
  price: string;
  description: string;
  images: {
    'natural-oak': string;
    'caramel-walnut': string;
    'dark-walnut': string;
  };
  hoverImage?: string;
  galleryImages: string[];
  dimensions?: {
    small?: { width: string; depth: string; height: string };
    large?: { width: string; depth: string; height: string };
  };
}

export interface CategoryData {
  slug: string;
  name: string;
  description: string;
  menuImage: string;
  heroImage: string;
}

export const categories: CategoryData[] = [
  {
    slug: 'armchairs',
    name: 'Πολυθρόνες',
    description: 'Πολυτελείς πολυθρόνες που συνδυάζουν κομψότητα και άνεση. Κατασκευασμένες από επιλεγμένα ξύλα και υψηλής ποιότητας υφάσματα.',
    menuImage: '/armchairs.png',
    heroImage: '/armchairs1.png',
  },
  {
    slug: 'sofas',
    name: 'Καναπέδες',
    description: 'Εντυπωσιακοί καναπέδες σχεδιασμένοι για να αναδείξουν τον χώρο σας. Διαθέσιμοι σε πολλαπλά μεγέθη και υφάσματα.',
    menuImage: '/sofas.png',
    heroImage: '/sofa1.png',
  },
  {
    slug: 'dining-tables',
    name: 'Τραπεζαρίες',
    description: 'Χειροποίητες τραπεζαρίες από μασίφ ξύλο. Ιδανικές για κάθε χώρο εστίασης, από μοντέρνο μέχρι κλασικό.',
    menuImage: '/dining-tables.png',
    heroImage: '/dining-tables1.png',
  },
  {
    slug: 'storage',
    name: 'Αποθηκευτικοί χώροι',
    description: 'Κομψές λύσεις αποθήκευσης που συνδυάζουν λειτουργικότητα και αισθητική. Ντουλάπες, κομοδίνα και βιτρίνες.',
    menuImage: '/wardrobes.png',
    heroImage: '/wardrobes.png',
  },
  {
    slug: 'custom-orders',
    name: 'Ειδικές παραγγελίες',
    description: 'Δημιουργήστε το έπιπλο των ονείρων σας με πλήρως εξατομικευμένες διαστάσεις, υλικά και φινίρισμα.',
    menuImage: '/other.png',
    heroImage: '/other.png',
  },
];

export const allProducts: ProductData[] = [
  // ── Πολυθρόνες ──
  {
    slug: 'phantigo',
    name: 'PHANTIGO',
    menuImage: '/armchairs.png',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '750',
    description: 'Ένα κομψό έπιπλο που συνδυάζει την πολυτέλεια με την άνεση. Κυκλικός σχεδιασμός με χειροποίητο ξύλινο σκελετό και αφαιρούμενο μαξιλάρι.',
    images: {
      'natural-oak': '/armchairs1.png',
      'caramel-walnut': '/armchairs2.png',
      'dark-walnut': '/armchairs.png',
    },
    hoverImage: '/armchairs-hover.png',
    galleryImages: ['/armchairs1.png', '/armchairs2.png', '/armchairs.png'],
    dimensions: {
      small: { width: '70cm', depth: '70cm', height: '25cm' },
      large: { width: '90cm', depth: '90cm', height: '30cm' },
    },
  },
  {
    slug: 'athena',
    name: 'ATHENA',
    menuImage: '/armchair1.png',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '1 μέγεθος',
    fabrics: '12 υφάσματα',
    price: '890',
    description: 'Μοντέρνα πολυθρόνα με εργονομικό σχεδιασμό. Ιδανική για χώρους υποδοχής και σαλόνια με σύγχρονη αισθητική.',
    images: {
      'natural-oak': '/armchair1.png',
      'caramel-walnut': '/armchair2.png',
      'dark-walnut': '/armchair1.png',
    },
    galleryImages: ['/armchair1.png', '/armchair2.png'],
    dimensions: {
      small: { width: '75cm', depth: '80cm', height: '85cm' },
    },
  },
  {
    slug: 'aurora',
    name: 'AURORA',
    menuImage: '/armchairs2.png',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '2 μεγέθη',
    fabrics: '15 υφάσματα',
    price: '1.050',
    description: 'Premium πολυθρόνα με βαθύ κάθισμα και αναπαυτική πλάτη. Σχεδιασμένη για μέγιστη χαλάρωση με διαχρονική εμφάνιση.',
    images: {
      'natural-oak': '/armchairs2.png',
      'caramel-walnut': '/armchairs1.png',
      'dark-walnut': '/armchairs.png',
    },
    hoverImage: '/armchairs-hover.png',
    galleryImages: ['/armchairs2.png', '/armchairs1.png', '/armchairs.png'],
    dimensions: {
      small: { width: '80cm', depth: '85cm', height: '90cm' },
      large: { width: '95cm', depth: '95cm', height: '95cm' },
    },
  },

  // ── Καναπέδες ──
  {
    slug: 'violet',
    name: 'VIOLET',
    menuImage: '/sofas.png',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '850',
    description: 'Μοναδικός σχεδιασμός με εξαιρετική ποιότητα κατασκευής. Ο ιδανικός καναπές για κάθε σαλόνι.',
    images: {
      'natural-oak': '/sofa1.png',
      'caramel-walnut': '/sofa3.png',
      'dark-walnut': '/sofa2.png',
    },
    hoverImage: '/sofa-hover.png',
    galleryImages: ['/sofa1.png', '/sofa3.png', '/sofa2.png'],
    dimensions: {
      small: { width: '180cm', depth: '90cm', height: '80cm' },
      large: { width: '220cm', depth: '95cm', height: '80cm' },
    },
  },
  {
    slug: 'elysium',
    name: 'ELYSIUM',
    menuImage: '/sofa.png',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '3 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '1.250',
    description: 'Πολυτελής γωνιακός καναπές με αφαιρούμενα μαξιλάρια. Μέγιστη άνεση για ολόκληρη την οικογένεια.',
    images: {
      'natural-oak': '/sofa.png',
      'caramel-walnut': '/sofa1.png',
      'dark-walnut': '/sofa3.png',
    },
    galleryImages: ['/sofa.png', '/sofa1.png', '/sofa3.png'],
    dimensions: {
      small: { width: '200cm', depth: '90cm', height: '82cm' },
      large: { width: '280cm', depth: '95cm', height: '82cm' },
    },
  },
  {
    slug: 'serenity',
    name: 'SERENITY',
    menuImage: '/sofa2.png',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '14 υφάσματα',
    price: '980',
    description: 'Κλασικός διθέσιος καναπές με μινιμαλιστικό σχεδιασμό. Ιδανικός για μικρότερους χώρους χωρίς συμβιβασμούς στην άνεση.',
    images: {
      'natural-oak': '/sofa2.png',
      'caramel-walnut': '/sofa1.png',
      'dark-walnut': '/sofa3.png',
    },
    hoverImage: '/sofa-hover.png',
    galleryImages: ['/sofa2.png', '/sofa1.png', '/sofa3.png'],
    dimensions: {
      small: { width: '160cm', depth: '85cm', height: '78cm' },
      large: { width: '190cm', depth: '90cm', height: '78cm' },
    },
  },

  // ── Τραπεζαρίες ──
  {
    slug: 'maximillian',
    name: 'MAXIMILLIAN',
    menuImage: '/dining-tables.png',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '950',
    description: 'Κορυφαία ποιότητα και διαχρονικός σχεδιασμός. Τραπεζαρία από μασίφ ξύλο που γίνεται το κεντρικό σημείο κάθε χώρου.',
    images: {
      'natural-oak': '/table1.png',
      'caramel-walnut': '/dining-tables2.png',
      'dark-walnut': '/dining-tables.png',
    },
    hoverImage: '/tables-hover.png',
    galleryImages: ['/table1.png', '/dining-tables2.png', '/dining-tables.png'],
    dimensions: {
      small: { width: '160cm', depth: '90cm', height: '75cm' },
      large: { width: '200cm', depth: '100cm', height: '75cm' },
    },
  },
  {
    slug: 'olympus',
    name: 'OLYMPUS',
    menuImage: '/dining-tables1.png',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.350',
    description: 'Εντυπωσιακή τραπεζαρία με μοναδικό σχεδιασμό βάσης. Ξύλο καρυδιάς με χειροποίητο φινίρισμα και αντοχή στον χρόνο.',
    images: {
      'natural-oak': '/dining-tables1.png',
      'caramel-walnut': '/table.png',
      'dark-walnut': '/dining-tables2.png',
    },
    galleryImages: ['/dining-tables1.png', '/table.png', '/dining-tables2.png'],
    dimensions: {
      small: { width: '180cm', depth: '95cm', height: '76cm' },
      large: { width: '240cm', depth: '110cm', height: '76cm' },
    },
  },

  // ── Αποθηκευτικοί χώροι ──
  {
    slug: 'huxton',
    name: 'HUXTON',
    menuImage: '/wardrobes.png',
    category: 'storage',
    categoryName: 'Αποθηκευτικοί χώροι',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '1.150',
    description: 'Το απόλυτο έπιπλο πολυτελείας για την οικία σας. Ευρύχωρη ντουλάπα με κομψές γραμμές και premium φινίρισμα.',
    images: {
      'natural-oak': '/wardrobes.png',
      'caramel-walnut': '/wardrobes2.png',
      'dark-walnut': '/wardrobes3.png',
    },
    hoverImage: '/wardrobe-hover.png',
    galleryImages: ['/wardrobes.png', '/wardrobes2.png', '/wardrobes3.png'],
    dimensions: {
      small: { width: '120cm', depth: '55cm', height: '180cm' },
      large: { width: '160cm', depth: '60cm', height: '200cm' },
    },
  },
  {
    slug: 'heritage',
    name: 'HERITAGE',
    menuImage: '/wardrobes2.png',
    category: 'storage',
    categoryName: 'Αποθηκευτικοί χώροι',
    sizes: '1 μέγεθος',
    fabrics: '—',
    price: '890',
    description: 'Κλασική βιτρίνα με γυάλινες πόρτες. Ιδανική για την προβολή συλλεκτικών αντικειμένων και βιβλίων.',
    images: {
      'natural-oak': '/wardrobes2.png',
      'caramel-walnut': '/wardrobes3.png',
      'dark-walnut': '/wardrobes.png',
    },
    galleryImages: ['/wardrobes2.png', '/wardrobes3.png', '/wardrobes.png'],
    dimensions: {
      small: { width: '100cm', depth: '40cm', height: '190cm' },
    },
  },

  // ── Ειδικές παραγγελίες ──
  {
    slug: 'custom-orders',
    name: 'ΕΙΔΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ',
    menuImage: '/other.png',
    category: 'custom-orders',
    categoryName: 'Ειδικές παραγγελίες',
    sizes: 'Κατόπιν παραγγελίας',
    fabrics: 'Απεριόριστες επιλογές',
    price: 'Κατόπιν προσφοράς',
    description: 'Δημιουργήστε το έπιπλο των ονείρων σας με πλήρως εξατομικευμένες διαστάσεις, υλικά και φινίρισμα.',
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

export function getProductsByCategory(categorySlug: string): ProductData[] {
  return allProducts.filter((p) => p.category === categorySlug);
}

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return categories.find((c) => c.slug === slug);
}
