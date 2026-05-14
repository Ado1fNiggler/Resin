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
    menuImage: '/armchairs-hero.webp',
    heroImage: '/armchairs-hero.webp',
  },
  {
    slug: 'sofas',
    name: 'Καναπέδες',
    description: 'Εντυπωσιακοί καναπέδες σχεδιασμένοι για να αναδείξουν τον χώρο σας. Διαθέσιμοι σε πολλαπλά μεγέθη και υφάσματα.',
    menuImage: '/sofas-hero.webp',
    heroImage: '/sofas-hero.webp',
  },
  {
    slug: 'dining-tables',
    name: 'Τραπεζαρίες',
    description: 'Χειροποίητες τραπεζαρίες από μασίφ ξύλο. Ιδανικές για κάθε χώρο εστίασης, από μοντέρνο μέχρι κλασικό.',
    menuImage: '/dining-tables-hero.webp',
    heroImage: '/dining-tables-hero.webp',
  },
  {
    slug: 'storage',
    name: 'Αποθηκευτικοί χώροι',
    description: 'Κομψές λύσεις αποθήκευσης που συνδυάζουν λειτουργικότητα και αισθητική. Ντουλάπες, κομοδίνα και βιτρίνες.',
    menuImage: '/storage-hero.webp',
    heroImage: '/storage-hero.webp',
  },
  {
    slug: 'custom-orders',
    name: 'Ειδικές παραγγελίες',
    description: 'Δημιουργήστε το έπιπλο των ονείρων σας με πλήρως εξατομικευμένες διαστάσεις, υλικά και φινίρισμα.',
    menuImage: '/custom-orders-hero.webp',
    heroImage: '/custom-orders-hero.webp',
  },
];

export const allProducts: ProductData[] = [
  // ── Πολυθρόνες ──
  {
    slug: 'phantigo',
    name: 'PHANTIGO',
    menuImage: '/phantigo1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '750',
    description: 'Κυκλική πολυθρόνα με δίσκο-βάση από μασίφ ξύλο. Χαμηλό, αναπαυτικό κάθισμα με αφαιρούμενο μαξιλάρι σε επιλεγμένα υφάσματα.',
    images: {
      'natural-oak': '/phantigo1.webp',
      'caramel-walnut': '/phantigo2.webp',
      'dark-walnut': '/phantigo3.webp',
    },
    galleryImages: ['/phantigo1.webp', '/phantigo2.webp', '/phantigo3.webp'],
    dimensions: {
      small: { width: '75cm', depth: '75cm', height: '70cm' },
      large: { width: '90cm', depth: '90cm', height: '75cm' },
    },
  },
  {
    slug: 'athena',
    name: 'ATHENA',
    menuImage: '/calypso1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '1 μέγεθος',
    fabrics: '12 υφάσματα',
    price: '890',
    description: 'Wingback πολυθρόνα με εντυπωσιακό ύψος πλάτης. Ξύλινα πόδια από μασίφ δρυ και πλούσια επένδυση για βέλτιστη εργονομία.',
    images: {
      'natural-oak': '/calypso1.webp',
      'caramel-walnut': '/calypso2.webp',
      'dark-walnut': '/calypso1.webp',
    },
    galleryImages: ['/calypso1.webp', '/calypso2.webp'],
    dimensions: {
      small: { width: '80cm', depth: '85cm', height: '110cm' },
    },
  },
  {
    slug: 'aurora',
    name: 'AURORA',
    menuImage: '/aurora1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '2 μεγέθη',
    fabrics: '15 υφάσματα',
    price: '1.050',
    description: 'Καπιτονέ πολυθρόνα με button-tufting σε όλη την πλάτη και τα μπράτσα. Βελούδινο αγκάλιασμα και εκτεθειμένα ξύλινα πόδια.',
    images: {
      'natural-oak': '/aurora1.webp',
      'caramel-walnut': '/aurora2.webp',
      'dark-walnut': '/aurora1.webp',
    },
    galleryImages: ['/aurora1.webp', '/aurora2.webp'],
    dimensions: {
      small: { width: '78cm', depth: '82cm', height: '88cm' },
      large: { width: '88cm', depth: '90cm', height: '92cm' },
    },
  },
  {
    slug: 'elara',
    name: 'ELARA',
    menuImage: '/elara1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '1 μέγεθος',
    fabrics: '14 υφάσματα',
    price: '920',
    description: 'Barrel πολυθρόνα με καμπυλωτή πλάτη που αγκαλιάζει το σώμα. Συμπαγής σχεδιασμός με εμφανή ξύλινο σκελετό και ανθεκτικό ύφασμα.',
    images: {
      'natural-oak': '/elara1.webp',
      'caramel-walnut': '/elara2.webp',
      'dark-walnut': '/elara3.webp',
    },
    galleryImages: ['/elara1.webp', '/elara2.webp', '/elara3.webp'],
    dimensions: {
      small: { width: '78cm', depth: '80cm', height: '77cm' },
    },
  },
  {
    slug: 'theron',
    name: 'THERON',
    menuImage: '/theron1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '1 μέγεθος',
    fabrics: '16 υφάσματα',
    price: '1.100',
    description: 'High-back πολυθρόνα με παραδοσιακή τεχνοτροπία και σύγχρονες γραμμές. Ψηλή πλάτη για πλήρη υποστήριξη, με εκτεθειμένα χειροτορναριστά πόδια.',
    images: {
      'natural-oak': '/theron1.webp',
      'caramel-walnut': '/theron2.webp',
      'dark-walnut': '/theron3.webp',
    },
    galleryImages: ['/theron1.webp', '/theron2.webp', '/theron3.webp'],
    dimensions: {
      small: { width: '80cm', depth: '85cm', height: '110cm' },
    },
  },
  {
    slug: 'naxos',
    name: 'NAXOS',
    menuImage: '/naxos1.webp',
    category: 'armchairs',
    categoryName: 'Πολυθρόνες',
    sizes: '1 μέγεθος',
    fabrics: '12 υφάσματα',
    price: '1.350',
    description: 'Lounge πολυθρόνα με ρυθμιζόμενη πλάτη και υποπόδιο. Φαρδύ, βαθύ κάθισμα με premium πάδινγκ για απόλυτη ξεκούραση.',
    images: {
      'natural-oak': '/naxos1.webp',
      'caramel-walnut': '/naxos2.webp',
      'dark-walnut': '/naxos3.webp',
    },
    galleryImages: ['/naxos1.webp', '/naxos2.webp', '/naxos3.webp'],
    dimensions: {
      small: { width: '90cm', depth: '95cm', height: '102cm' },
    },
  },

  // ── Καναπέδες ──
  {
    slug: 'lyra',
    name: 'LYRA',
    menuImage: '/lyra3.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '16 υφάσματα',
    price: '1.100',
    description: 'Τριθέσιος καναπές με εκτεθειμένο ξύλινο σκελετό και οριζόντιες ράβδους στα μπράτσα. Διαχρονικός σχεδιασμός με boucle ύφασμα και κωνικά πόδια.',
    images: {
      'natural-oak': '/lyra3.webp',
      'caramel-walnut': '/lyra1.webp',
      'dark-walnut': '/lyra2.webp',
    },
    galleryImages: ['/lyra3.webp', '/lyra1.webp', '/lyra2.webp'],
    dimensions: {
      small: { width: '195cm', depth: '85cm', height: '78cm' },
      large: { width: '230cm', depth: '90cm', height: '78cm' },
    },
  },
  {
    slug: 'aegis',
    name: 'AEGIS',
    menuImage: '/aegis1.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 διαμορφώσεις',
    fabrics: '14 υφάσματα',
    price: '1.650',
    description: 'Γωνιακός καναπές L-shape με χαμηλό προφίλ και εμφανή ξύλινη βάση. Καθαρές αρχιτεκτονικές γραμμές με βελούδινα μαξιλάρια για μέγιστη άνεση.',
    images: {
      'natural-oak': '/aegis1.webp',
      'caramel-walnut': '/aegis2.webp',
      'dark-walnut': '/aegis3.webp',
    },
    galleryImages: ['/aegis1.webp', '/aegis2.webp', '/aegis3.webp'],
    dimensions: {
      small: { width: '250cm', depth: '200cm', height: '76cm' },
      large: { width: '300cm', depth: '240cm', height: '76cm' },
    },
  },
  {
    slug: 'kronos',
    name: 'KRONOS',
    menuImage: '/kronos1.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: 'Δέρμα & υφάσματα',
    price: '1.450',
    description: 'Βαθύ lounge sofa με χαμηλό προφίλ και ξύλινη βάση-plateau. Φαρδύ κάθισμα με oversized μαξιλάρια πλάτης για την απόλυτη αίσθηση χαλάρωσης.',
    images: {
      'natural-oak': '/kronos1.webp',
      'caramel-walnut': '/kronos2.webp',
      'dark-walnut': '/kronos3.webp',
    },
    galleryImages: ['/kronos1.webp', '/kronos2.webp', '/kronos3.webp'],
    dimensions: {
      small: { width: '240cm', depth: '105cm', height: '68cm' },
      large: { width: '290cm', depth: '115cm', height: '68cm' },
    },
  },
  {
    slug: 'phaedra',
    name: 'PHAEDRA',
    menuImage: '/phaedra1.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '12 υφάσματα',
    price: '1.280',
    description: 'Τριθέσιος καναπές με καπιτονέ πλάτη και κουμπιά. Εντυπωσιακό button-tufting σε όλη την πλάτη με εκτεθειμένο ξύλινο σκελετό — κλασική πολυτέλεια.',
    images: {
      'natural-oak': '/phaedra1.webp',
      'caramel-walnut': '/phaedra2.webp',
      'dark-walnut': '/phaedra3.webp',
    },
    galleryImages: ['/phaedra1.webp', '/phaedra2.webp', '/phaedra3.webp'],
    dimensions: {
      small: { width: '200cm', depth: '88cm', height: '82cm' },
      large: { width: '240cm', depth: '92cm', height: '82cm' },
    },
  },
  {
    slug: 'delos',
    name: 'DELOS',
    menuImage: '/delos1.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '1 μέγεθος',
    fabrics: '15 υφάσματα',
    price: '780',
    description: 'Διθέσιος loveseat με ανοιχτό ξύλινο σκελετό και καμπύλα μπράτσα. Compact διαστάσεις για μικρά σαλόνια χωρίς συμβιβασμούς στη χάρη.',
    images: {
      'natural-oak': '/delos1.webp',
      'caramel-walnut': '/delos2.webp',
      'dark-walnut': '/delos1.webp',
    },
    galleryImages: ['/delos1.webp', '/delos2.webp'],
    dimensions: {
      small: { width: '145cm', depth: '78cm', height: '82cm' },
    },
  },
  {
    slug: 'violet',
    name: 'VIOLET',
    menuImage: '/sofa1.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '850',
    description: 'Μοναδικός σχεδιασμός με εξαιρετική ποιότητα κατασκευής. Ο ιδανικός καναπές για κάθε σαλόνι.',
    images: {
      'natural-oak': '/sofa1.webp',
      'caramel-walnut': '/sofa3.webp',
      'dark-walnut': '/sofa2.webp',
    },
    hoverImage: '/sofa-hover.webp',
    galleryImages: ['/sofa1.webp', '/sofa3.webp', '/sofa2.webp'],
    dimensions: {
      small: { width: '180cm', depth: '90cm', height: '80cm' },
      large: { width: '220cm', depth: '95cm', height: '80cm' },
    },
  },
  {
    slug: 'elysium',
    name: 'ELYSIUM',
    menuImage: '/sofa.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '3 μεγέθη',
    fabrics: '19 υφάσματα',
    price: '1.250',
    description: 'Πολυτελής γωνιακός καναπές με αφαιρούμενα μαξιλάρια. Μέγιστη άνεση για ολόκληρη την οικογένεια.',
    images: {
      'natural-oak': '/sofa.webp',
      'caramel-walnut': '/sofa1.webp',
      'dark-walnut': '/sofa3.webp',
    },
    galleryImages: ['/sofa.webp', '/sofa1.webp', '/sofa3.webp'],
    dimensions: {
      small: { width: '200cm', depth: '90cm', height: '82cm' },
      large: { width: '280cm', depth: '95cm', height: '82cm' },
    },
  },
  {
    slug: 'serenity',
    name: 'SERENITY',
    menuImage: '/sofa2.webp',
    category: 'sofas',
    categoryName: 'Καναπέδες',
    sizes: '2 μεγέθη',
    fabrics: '14 υφάσματα',
    price: '980',
    description: 'Κλασικός διθέσιος καναπές με μινιμαλιστικό σχεδιασμό. Ιδανικός για μικρότερους χώρους χωρίς συμβιβασμούς στην άνεση.',
    images: {
      'natural-oak': '/sofa2.webp',
      'caramel-walnut': '/sofa1.webp',
      'dark-walnut': '/sofa3.webp',
    },
    hoverImage: '/sofa-hover.webp',
    galleryImages: ['/sofa2.webp', '/sofa1.webp', '/sofa3.webp'],
    dimensions: {
      small: { width: '160cm', depth: '85cm', height: '78cm' },
      large: { width: '190cm', depth: '90cm', height: '78cm' },
    },
  },

  // ── Τραπεζαρίες ──
  {
    slug: 'agora',
    name: 'AGORA',
    menuImage: '/agora1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '1 μέγεθος',
    fabrics: '—',
    price: '1.600',
    description: 'Live-edge τραπεζαρία από μονόκομμο κορμό ξύλου καρυδιάς. Κάθε κομμάτι είναι μοναδικό — η φύση σχεδιάζει, εμείς τελειοποιούμε.',
    images: {
      'natural-oak': '/agora1.webp',
      'caramel-walnut': '/agora2.webp',
      'dark-walnut': '/agora3.webp',
    },
    galleryImages: ['/agora1.webp', '/agora2.webp', '/agora3.webp'],
    dimensions: {
      small: { width: '200cm', depth: '95cm', height: '75cm' },
    },
  },
  {
    slug: 'pylos',
    name: 'PYLOS',
    menuImage: '/pylos1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.150',
    description: 'Στρογγυλή τραπεζαρία pedestal με κεντρικό κορμό και σταυρόσχημη βάση. Κλασική κομψότητα που ενθαρρύνει τη συνάθροιση.',
    images: {
      'natural-oak': '/pylos1.webp',
      'caramel-walnut': '/pylos2.webp',
      'dark-walnut': '/pylos3.webp',
    },
    galleryImages: ['/pylos1.webp', '/pylos2.webp', '/pylos3.webp'],
    dimensions: {
      small: { width: '120cm', depth: '120cm', height: '75cm' },
      large: { width: '150cm', depth: '150cm', height: '75cm' },
    },
  },
  {
    slug: 'hermes',
    name: 'HERMES',
    menuImage: '/hermes1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.100',
    description: 'Ελαφρύ και λειτουργικό σχέδιο. Τραπεζαρία με βάση τύπου Α από μασίφ ξύλο, ιδανική για σύγχρονα εσωτερικά.',
    images: {
      'natural-oak': '/hermes1.webp',
      'caramel-walnut': '/hermes2.webp',
      'dark-walnut': '/hermes3.webp',
    },
    galleryImages: ['/hermes1.webp', '/hermes2.webp', '/hermes3.webp'],
    dimensions: {
      small: { width: '160cm', depth: '85cm', height: '75cm' },
      large: { width: '200cm', depth: '95cm', height: '75cm' },
    },
  },
  {
    slug: 'kronion',
    name: 'KRONION',
    menuImage: '/kronion1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.250',
    description: 'Οβάλ σχήμα με κομψό κεντρικό πόδι σε μορφή χελιδονιού. Διαχρονική κομψότητα σε κάθε γεύμα.',
    images: {
      'natural-oak': '/kronion1.webp',
      'caramel-walnut': '/kronion2.webp',
      'dark-walnut': '/kronion3.webp',
    },
    galleryImages: ['/kronion1.webp', '/kronion2.webp', '/kronion3.webp'],
    dimensions: {
      small: { width: '180cm', depth: '100cm', height: '75cm' },
      large: { width: '220cm', depth: '110cm', height: '75cm' },
    },
  },
  {
    slug: 'atlas',
    name: 'ATLAS',
    menuImage: '/atlas2.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.450',
    description: 'Τολμηρός συνδυασμός ζωντανής ακμής ξύλου και μεταλλικής βάσης. Μοναδικό κομμάτι που αναδεικνύει κάθε χώρο.',
    images: {
      'natural-oak': '/atlas1.webp',
      'caramel-walnut': '/atlas2.webp',
      'dark-walnut': '/atlas2.webp',
    },
    galleryImages: ['/atlas1.webp', '/atlas2.webp'],
    dimensions: {
      small: { width: '180cm', depth: '90cm', height: '75cm' },
      large: { width: '220cm', depth: '100cm', height: '75cm' },
    },
  },
  {
    slug: 'maximillian',
    name: 'MAXIMILLIAN',
    menuImage: '/dining-tables.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '950',
    description: 'Κορυφαία ποιότητα και διαχρονικός σχεδιασμός. Τραπεζαρία από μασίφ ξύλο που γίνεται το κεντρικό σημείο κάθε χώρου.',
    images: {
      'natural-oak': '/dining-tables1.webp',
      'caramel-walnut': '/dining-tables2.webp',
      'dark-walnut': '/dining-tables.webp',
    },
    hoverImage: '/tables-hover.webp',
    galleryImages: ['/dining-tables1.webp', '/dining-tables2.webp', '/dining-tables.webp'],
    dimensions: {
      small: { width: '160cm', depth: '90cm', height: '75cm' },
      large: { width: '200cm', depth: '100cm', height: '75cm' },
    },
  },
  {
    slug: 'olympus',
    name: 'OLYMPUS',
    menuImage: '/dining-tables1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.350',
    description: 'Εντυπωσιακή τραπεζαρία με μοναδικό σχεδιασμό βάσης. Ξύλο καρυδιάς με χειροποίητο φινίρισμα και αντοχή στον χρόνο.',
    images: {
      'natural-oak': '/table1.webp',
      'caramel-walnut': '/table.webp',
      'dark-walnut': '/dining-tables2.webp',
    },
    galleryImages: ['/table1.webp', '/table.webp', '/dining-tables2.webp'],
    dimensions: {
      small: { width: '180cm', depth: '95cm', height: '76cm' },
      large: { width: '240cm', depth: '110cm', height: '76cm' },
    },
  },
  {
    slug: 'doric',
    name: 'DORIC',
    menuImage: '/doric1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.050',
    description: 'Ορθογώνια τραπεζαρία με χειροποίητα τορναριστά πόδια. Κλασικός σχεδιασμός με σύγχρονη ψυχή.',
    images: {
      'natural-oak': '/doric1.webp',
      'caramel-walnut': '/doric2.webp',
      'dark-walnut': '/doric3.webp',
    },
    galleryImages: ['/doric1.webp', '/doric2.webp', '/doric3.webp'],
    dimensions: {
      small: { width: '160cm', depth: '90cm', height: '75cm' },
      large: { width: '200cm', depth: '100cm', height: '75cm' },
    },
  },
  {
    slug: 'selini',
    name: 'SELINI',
    menuImage: '/selini1.webp',
    category: 'dining-tables',
    categoryName: 'Τραπεζαρίες',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '900',
    description: 'Στρογγυλή τραπεζαρία με λεπτά κωνικά πόδια. Σκανδιναβική αισθητική που χωράει όλη την παρέα.',
    images: {
      'natural-oak': '/selini1.webp',
      'caramel-walnut': '/selini2.webp',
      'dark-walnut': '/selini3.webp',
    },
    galleryImages: ['/selini1.webp', '/selini2.webp', '/selini3.webp'],
    dimensions: {
      small: { width: '120cm', depth: '120cm', height: '75cm' },
      large: { width: '150cm', depth: '150cm', height: '75cm' },
    },
  },

  // ── Αποθηκευτικοί χώροι ──
  {
    slug: 'huxton',
    name: 'HUXTON',
    menuImage: '/wardrobes.webp',
    category: 'storage',
    categoryName: 'Αποθηκευτικοί χώροι',
    sizes: '2 μεγέθη',
    fabrics: '—',
    price: '1.150',
    description: 'Το απόλυτο έπιπλο πολυτελείας για την οικία σας. Ευρύχωρη ντουλάπα με κομψές γραμμές και premium φινίρισμα.',
    images: {
      'natural-oak': '/wardrobes.webp',
      'caramel-walnut': '/wardrobes2.webp',
      'dark-walnut': '/wardrobes3.webp',
    },
    hoverImage: '/wardrobe-hover.webp',
    galleryImages: ['/wardrobes.webp', '/wardrobes2.webp', '/wardrobes3.webp'],
    dimensions: {
      small: { width: '120cm', depth: '55cm', height: '180cm' },
      large: { width: '160cm', depth: '60cm', height: '200cm' },
    },
  },
  {
    slug: 'heritage',
    name: 'HERITAGE',
    menuImage: '/wardrobes2.webp',
    category: 'storage',
    categoryName: 'Αποθηκευτικοί χώροι',
    sizes: '1 μέγεθος',
    fabrics: '—',
    price: '890',
    description: 'Κλασική βιτρίνα με γυάλινες πόρτες. Ιδανική για την προβολή συλλεκτικών αντικειμένων και βιβλίων.',
    images: {
      'natural-oak': '/wardrobes2.webp',
      'caramel-walnut': '/wardrobes3.webp',
      'dark-walnut': '/wardrobes.webp',
    },
    galleryImages: ['/wardrobes2.webp', '/wardrobes3.webp', '/wardrobes.webp'],
    dimensions: {
      small: { width: '100cm', depth: '40cm', height: '190cm' },
    },
  },

  // ── Ειδικές παραγγελίες ──
  {
    slug: 'custom-orders',
    name: 'ΕΙΔΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ',
    menuImage: '/other.webp',
    category: 'custom-orders',
    categoryName: 'Ειδικές παραγγελίες',
    sizes: 'Κατόπιν παραγγελίας',
    fabrics: 'Απεριόριστες επιλογές',
    price: 'Κατόπιν προσφοράς',
    description: 'Δημιουργήστε το έπιπλο των ονείρων σας με πλήρως εξατομικευμένες διαστάσεις, υλικά και φινίρισμα.',
    images: {
      'natural-oak': '/other.webp',
      'caramel-walnut': '/other.webp',
      'dark-walnut': '/other.webp',
    },
    galleryImages: ['/other.webp'],
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
