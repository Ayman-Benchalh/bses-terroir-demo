import { BasketTemplate } from '@/lib/types';

export const BASKET_TEMPLATES_SEED: BasketTemplate[] = [
  {
    id: 'tmpl-famille',
    slug: 'panier-semaine-famille',
    name: {
      fr: 'Panier Semaine Essentiel',
      en: 'Weekly Family Essentials',
      ar: 'سلة الأسبوع الأساسية',
    },
    description: {
      fr: 'Fruits, légumes frais du potager et base de cuisine pour toute la semaine.',
      en: 'Fresh fruits, vegetables, and pantry foundations for the entire family week.',
      ar: 'خضار وفواكه طازجة من الحقل وأساسيات الطهي لجميع أيام الأسبوع.',
    },
    category: 'hebdo',
    badge: {
      fr: 'Le plus populaire',
      en: 'Most Popular',
      ar: 'الأكثر طلباً',
    },
    discountPercent: 10,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'prod-fruit-01', quantity: 2, unit: 'kg' }, // Oranges
      { productId: 'prod-legume-01', quantity: 2, unit: 'kg' }, // Tomates
      { productId: 'prod-legume-02', quantity: 1.5, unit: 'kg' }, // Carottes
      { productId: 'prod-legume-04', quantity: 2, unit: 'kg' }, // Pommes de terre
      { productId: 'prod-legume-05', quantity: 1, unit: 'kg' }, // Oignons
      { productId: 'prod-huile-01', quantity: 1, unit: 'bouteille' }, // Huile d'olive
    ],
  },
  {
    id: 'tmpl-ftour',
    slug: 'panier-ftour-beldi',
    name: {
      fr: 'Panier Ftour & Petit Déjeuner',
      en: 'Beldi Breakfast & Ftour',
      ar: 'سلة الفطور البلدي الملكي',
    },
    description: {
      fr: 'Le rituel matinal gourmand : Amlou, miel pur, beurre fermier, dattes et jben frais.',
      en: 'The wholesome Moroccan breakfast: Amlou, raw honey, churned butter, dates, and fresh curd cheese.',
      ar: 'طقس الصباح اللذيذ: أملو باللوز، عسل حر، زبدة بلدية، تمور المجهول وجبن طازج.',
    },
    category: 'ftour',
    badge: {
      fr: 'Tradition Beldi',
      en: 'Beldi Heritage',
      ar: 'أصالة بلدية',
    },
    discountPercent: 12,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'prod-miel-01', quantity: 1, unit: 'pot' }, // Amlou
      { productId: 'prod-miel-02', quantity: 1, unit: 'pot' }, // Miel thym
      { productId: 'prod-lait-02', quantity: 1, unit: 'pain' }, // Beurre fermier
      { productId: 'prod-lait-01', quantity: 1, unit: 'portion' }, // Jben frais
      { productId: 'prod-datte-01', quantity: 1, unit: 'boîte' }, // Dattes Mejhoul
    ],
  },
  {
    id: 'tmpl-maraicher',
    slug: 'panier-100-potager',
    name: {
      fr: 'Panier 100% Maraîcher Bio-Raisonné',
      en: '100% Fresh Harvest Garden Greens',
      ar: 'سلة الخضار الطازجة 100%',
    },
    description: {
      fr: 'Une abondance de légumes de saison cueillis à point dans nos coopératives partenaires.',
      en: 'An abundance of seasonal vegetables harvested at peak nutrition by partner cooperatives.',
      ar: 'تشكيلة وفيرة من خضروات الموسم الطازجة من مزارعنا الشريكة.',
    },
    category: 'maraicher',
    badge: {
      fr: 'Ultra Frais',
      en: 'Farm Fresh',
      ar: 'طازج جداً',
    },
    discountPercent: 8,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'prod-legume-01', quantity: 2, unit: 'kg' }, // Tomates
      { productId: 'prod-legume-02', quantity: 2, unit: 'kg' }, // Carottes
      { productId: 'prod-legume-03', quantity: 1.5, unit: 'kg' }, // Courgettes
      { productId: 'prod-legume-05', quantity: 2, unit: 'kg' }, // Oignons
      { productId: 'prod-legume-06', quantity: 1, unit: 'kg' }, // Poivrons
    ],
  },
  {
    id: 'tmpl-prestige',
    slug: 'coffret-degustation-prestige',
    name: {
      fr: 'Coffret Terroir Dégustation Prestige',
      en: 'Prestige Artisanal Tasting Box',
      ar: 'تشكيلة التذوق الملكية الفاخرة',
    },
    description: {
      fr: 'Les joyaux de notre gastronomie : Huile d’argan pure, safran de Taliouine et miel d’exception.',
      en: 'The crown jewels of Moroccan culinary arts: pure argan oil, Taliouine saffron, and rare mountain honey.',
      ar: 'أنفس ما جادت به أرض المغرب: زيت أركان معصور على البارد، زعفران حر وعسل دغموس نادر.',
    },
    category: 'prestige',
    badge: {
      fr: 'Édition Spéciale',
      en: 'Special Edition',
      ar: 'إصدار فاخر',
    },
    discountPercent: 15,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    items: [
      { productId: 'prod-huile-02', quantity: 1, unit: 'flacon' }, // Argan
      { productId: 'prod-epice-01', quantity: 1, unit: 'flacon' }, // Safran
      { productId: 'prod-miel-03', quantity: 1, unit: 'pot' }, // Miel daghmous
      { productId: 'prod-datte-01', quantity: 1, unit: 'boîte' }, // Dattes
    ],
  },
];
