import { Promotion } from '@/lib/types';

export const PROMOTIONS_SEED: Promotion[] = [
  {
    id: 'promo-bienvenue',
    code: 'BIENVENUE10',
    discountType: 'percentage',
    discountValue: 10, // 10%
    minOrder: 150,
    description: {
      fr: '10% de réduction pour votre première découverte du terroir dès 150 MAD.',
      en: '10% off your first Terroir exploration on orders over 150 MAD.',
      ar: 'خصم 10% على أول طلبية تتجاوز 150 درهم.',
    },
    isActive: true,
    expiresAt: '2026-12-31',
  },
  {
    id: 'promo-terroir25',
    code: 'TERROIR25',
    discountType: 'fixed_mad',
    discountValue: 25, // 25 MAD
    minOrder: 200,
    description: {
      fr: '25 MAD de remise immédiate pour tout panier supérieur à 200 MAD.',
      en: '25 MAD instant reduction on orders over 200 MAD.',
      ar: 'خصم فوري بقيمة 25 درهم لكل سلة تفوق 200 درهم.',
    },
    isActive: true,
    expiresAt: '2026-12-31',
  },
  {
    id: 'promo-free-shipping',
    code: 'LIVRAISON_GRATUITE',
    discountType: 'free_shipping',
    discountValue: 0,
    minOrder: 100,
    description: {
      fr: 'Frais de livraison offerts sur votre commande.',
      en: 'Complimentary shipping applied to your order.',
      ar: 'توصيل مجاني ممنوح لطلبيتكم.',
    },
    isActive: true,
    expiresAt: '2026-12-31',
  },
  {
    id: 'promo-atlas15',
    code: 'ATLAS15',
    discountType: 'percentage',
    discountValue: 15,
    minOrder: 300,
    description: {
      fr: '15% de réduction dès 300 MAD d’achats.',
      en: '15% discount on orders over 300 MAD.',
      ar: 'خصم 15% ابتداءً من 300 درهم من المشتريات.',
    },
    isActive: true,
    expiresAt: '2026-12-31',
  },
];
