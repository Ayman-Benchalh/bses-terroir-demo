import { Order } from '@/lib/types';
import { PRODUCTS_SEED } from './products.seed';

export const INITIAL_ORDERS_SEED: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'CMD-2026-1001',
    createdAt: '2026-11-21T14:30:00Z',
    customer: {
      fullName: 'Yassine El Mansouri',
      phone: '+212661234567',
      city: 'Casablanca (Grand Casablanca)',
      address: '24 Boulevard d’Anfa, Étage 4, Appt 12',
      landmark: 'En face de la Mosquée Badr',
      notes: 'Sonner à l’interphone El Mansouri s’il vous plaît.',
    },
    items: [
      {
        id: 'prod-huile-01',
        productId: 'prod-huile-01',
        product: PRODUCTS_SEED[12], // Huile d'olive Ouezzane
        quantity: 1,
        unitPrice: 98,
        lineTotal: 98,
      },
      {
        id: 'prod-miel-01',
        productId: 'prod-miel-01',
        product: PRODUCTS_SEED[17], // Amlou
        quantity: 1,
        unitPrice: 130,
        lineTotal: 130,
      },
      {
        id: 'prod-datte-01',
        productId: 'prod-datte-01',
        product: PRODUCTS_SEED[27], // Dattes Mejhoul
        quantity: 1,
        unitPrice: 125,
        lineTotal: 125,
      },
    ],
    subtotal: 353,
    discountTotal: 35.3,
    appliedPromoCode: 'BIENVENUE10',
    deliveryFee: 0, // Free delivery because > 250 MAD in Casablanca
    total: 317.7,
    paymentMethod: 'cod',
    status: 'delivered',
    deliverySlot: 'Matin (09h00 - 13h00)',
    statusHistory: [
      { status: 'received', timestamp: '2026-11-21T14:30:00Z', note: 'Commande passée en ligne.' },
      { status: 'confirmed', timestamp: '2026-11-21T14:45:00Z', note: 'Confirmation automatique coopérative.' },
      { status: 'preparing', timestamp: '2026-11-21T15:10:00Z', note: 'Préparation et emballage soigné.' },
      { status: 'out_for_delivery', timestamp: '2026-11-21T16:20:00Z', note: 'Coursier en route.' },
      { status: 'delivered', timestamp: '2026-11-21T17:15:00Z', note: 'Livrée avec succès en mains propres.' },
    ],
  },
  {
    id: 'ord-1002',
    orderNumber: 'CMD-2026-1002',
    createdAt: '2026-11-22T09:15:00Z',
    customer: {
      fullName: 'Khadija Benjelloun',
      phone: '+212662987654',
      city: 'Rabat & Agdal',
      address: '15 Avenue Fal Ould Oumeir, Agdal',
      landmark: 'Près du Café Paul',
      notes: 'Livraison au bureau d’études.',
    },
    items: [
      {
        id: 'prod-epice-01',
        productId: 'prod-epice-01',
        product: PRODUCTS_SEED[22], // Safran
        quantity: 2,
        unitPrice: 45,
        lineTotal: 90,
      },
      {
        id: 'prod-huile-02',
        productId: 'prod-huile-02',
        product: PRODUCTS_SEED[13], // Argan culinaire
        quantity: 1,
        unitPrice: 180,
        lineTotal: 180,
      },
    ],
    subtotal: 270,
    discountTotal: 0,
    deliveryFee: 25,
    total: 295,
    paymentMethod: 'cod',
    status: 'out_for_delivery',
    deliverySlot: 'Après-midi (14h00 - 18h00)',
    statusHistory: [
      { status: 'received', timestamp: '2026-11-22T09:15:00Z', note: 'Commande enregistrée.' },
      { status: 'confirmed', timestamp: '2026-11-22T09:30:00Z', note: 'Validée par le service client.' },
      { status: 'preparing', timestamp: '2026-11-22T10:00:00Z', note: 'Conditionnement sous vide des épices.' },
      { status: 'ready_for_delivery', timestamp: '2026-11-22T11:30:00Z', note: 'Prêt pour expédition.' },
      { status: 'out_for_delivery', timestamp: '2026-11-22T13:45:00Z', note: 'En cours d’acheminement sur Rabat.' },
    ],
  },
  {
    id: 'ord-1003',
    orderNumber: 'CMD-2026-1003',
    createdAt: '2026-11-22T11:45:00Z',
    customer: {
      fullName: 'Mehdi Amrani',
      phone: '+212663112233',
      city: 'Marrakech (Guéliz, Hivernage, Palmeraie)',
      address: 'Résidence Majorelle, Rue Yves Saint Laurent',
      landmark: 'Entrée B',
      notes: 'Appeler 10 minutes avant.',
    },
    items: [
      {
        id: 'prod-pan-01',
        productId: 'prod-pan-01',
        product: PRODUCTS_SEED[46], // Panier Semaine Famille
        quantity: 1,
        unitPrice: 220,
        lineTotal: 220,
      },
    ],
    subtotal: 220,
    discountTotal: 0,
    deliveryFee: 30,
    total: 250,
    paymentMethod: 'cod',
    status: 'preparing',
    deliverySlot: 'Soir (18h00 - 21h00)',
    statusHistory: [
      { status: 'received', timestamp: '2026-11-22T11:45:00Z', note: 'Commande reçue.' },
      { status: 'confirmed', timestamp: '2026-11-22T12:00:00Z', note: 'Produits maraîchers réservés.' },
      { status: 'preparing', timestamp: '2026-11-22T13:00:00Z', note: 'Composition du panier en cours.' },
    ],
  },
  {
    id: 'ord-1004',
    orderNumber: 'CMD-2026-1004',
    createdAt: '2026-11-22T14:10:00Z',
    customer: {
      fullName: 'Salma Tazi',
      phone: '+212664556677',
      city: 'Casablanca (Grand Casablanca)',
      address: '45 Rue Jean Jaurès, Gautier',
      notes: 'Déposer à l’accueil si absent.',
    },
    items: [
      {
        id: 'prod-fruit-01',
        productId: 'prod-fruit-01',
        product: PRODUCTS_SEED[0],
        quantity: 3,
        unitPrice: 12,
        lineTotal: 36,
      },
      {
        id: 'prod-legume-01',
        productId: 'prod-legume-01',
        product: PRODUCTS_SEED[6],
        quantity: 2,
        unitPrice: 9,
        lineTotal: 18,
      },
      {
        id: 'prod-lait-01',
        productId: 'prod-lait-01',
        product: PRODUCTS_SEED[32],
        quantity: 2,
        unitPrice: 35,
        lineTotal: 70,
      },
    ],
    subtotal: 124,
    discountTotal: 0,
    deliveryFee: 20,
    total: 144,
    paymentMethod: 'cod',
    status: 'confirmed',
    deliverySlot: 'Matin (09h00 - 13h00)',
    statusHistory: [
      { status: 'received', timestamp: '2026-11-22T14:10:00Z', note: 'Nouvelle commande enregistrée.' },
      { status: 'confirmed', timestamp: '2026-11-22T14:20:00Z', note: 'Validation des stocks effectuée.' },
    ],
  },
  {
    id: 'ord-1005',
    orderNumber: 'CMD-2026-1005',
    createdAt: '2026-11-22T15:05:00Z',
    customer: {
      fullName: 'Othmane Berrada',
      phone: '+212665889900',
      city: 'Tanger (Malabata, Centre & Baie)',
      address: 'Route de Malabata, Résidence Les Perles',
    },
    items: [
      {
        id: 'prod-pan-03',
        productId: 'prod-pan-03',
        product: PRODUCTS_SEED[48], // Coffret Prestige
        quantity: 1,
        unitPrice: 480,
        lineTotal: 480,
      },
    ],
    subtotal: 480,
    discountTotal: 25,
    appliedPromoCode: 'TERROIR25',
    deliveryFee: 0, // Free above 380 MAD
    total: 455,
    paymentMethod: 'cod',
    status: 'received',
    deliverySlot: 'Matin (09h00 - 13h00)',
    statusHistory: [
      { status: 'received', timestamp: '2026-11-22T15:05:00Z', note: 'Commande reçue avec succès.' },
    ],
  },
];
