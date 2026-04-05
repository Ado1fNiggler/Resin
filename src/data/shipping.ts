export interface ShippingZone {
  id: string;
  name: string;
  description: string;
  deliveryDays: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
}

export const shippingZones: ShippingZone[] = [
  {
    id: 'athens',
    name: 'Αττική',
    description: 'Αθήνα και προάστια',
    deliveryDays: '3-5 εργάσιμες',
  },
  {
    id: 'mainland',
    name: 'Ηπειρωτική Ελλάδα',
    description: 'Θεσσαλονίκη, Πάτρα, Λάρισα κ.ά.',
    deliveryDays: '5-7 εργάσιμες',
  },
  {
    id: 'islands',
    name: 'Νησιά',
    description: 'Κρήτη, Κυκλάδες, Δωδεκάνησα κ.ά.',
    deliveryDays: '7-12 εργάσιμες',
  },
];

export const shippingMethods: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Τυπική Αποστολή',
    description: 'Παράδοση στην είσοδο του κτιρίου',
    price: 45,
    estimatedDays: '5-7 εργάσιμες',
  },
  {
    id: 'express',
    name: 'Express Αποστολή',
    description: 'Ταχεία παράδοση στην είσοδο του κτιρίου',
    price: 85,
    estimatedDays: '2-4 εργάσιμες',
  },
  {
    id: 'white-glove',
    name: 'Premium Παράδοση',
    description: 'Παράδοση στον χώρο σας με τοποθέτηση και αφαίρεση συσκευασίας',
    price: 150,
    estimatedDays: '5-10 εργάσιμες',
  },
];

export const FREE_SHIPPING_THRESHOLD = 500;

export function getShippingCost(methodId: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD && methodId === 'standard') return 0;
  const method = shippingMethods.find((m) => m.id === methodId);
  return method?.price ?? 0;
}
