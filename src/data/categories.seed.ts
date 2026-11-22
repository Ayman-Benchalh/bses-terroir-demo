import { LocalizedString } from '@/lib/types';

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  iconName: string;
  image: string;
  productCount: number;
}

export const CATEGORIES_SEED: Category[] = [
  {
    id: 'cat-fruits',
    slug: 'fruits-frais',
    name: {
      fr: 'Fruits Frais',
      en: 'Fresh Fruits',
      ar: 'فواكه طازجة',
    },
    description: {
      fr: 'Agrumes de Berkane, grenades de Sefrou et délices gorgés de soleil.',
      en: 'Berkane citrus, Sefrou pomegranates and sun-drenched Moroccan produce.',
      ar: 'حوامض بركان، رمان صفرو وأطايب مغربية غنية بأشعة الشمس.',
    },
    iconName: 'Apple',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    productCount: 6,
  },
  {
    id: 'cat-legumes',
    slug: 'legumes-frais',
    name: {
      fr: 'Légumes du Potager',
      en: 'Fresh Garden Vegetables',
      ar: 'خضار الحقل الطازجة',
    },
    description: {
      fr: 'Légumes croquants cueillis à maturité dans le Souss et le Saïss.',
      en: 'Crisp vegetables harvested at peak maturity in Souss and Saïss valleys.',
      ar: 'خضروات طازجة ومقرمشة تُقطف في أوج نضجها من سهول سوس وسايس.',
    },
    iconName: 'Carrot',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    productCount: 6,
  },
  {
    id: 'cat-huiles',
    slug: 'huiles-argan',
    name: {
      fr: "Huiles d'Olive & Argan",
      en: 'Olive & Argan Oils',
      ar: 'زيت الزيتون والأركان',
    },
    description: {
      fr: 'Pressées à froid par nos coopératives partenaires à Ouezzane et Taroudant.',
      en: 'Cold pressed extra virgin oils by heritage cooperatives in Ouezzane and Taroudant.',
      ar: 'معصورة على البارد بواسطة تعاونيات شريكة في وزان وتارودانت.',
    },
    iconName: 'Droplet',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-miels',
    slug: 'miels-amlou',
    name: {
      fr: 'Miels Purs & Amlou',
      en: 'Raw Honey & Amlou',
      ar: 'العسل الحر وأملو',
    },
    description: {
      fr: 'Miels de montagne de l’Atlas et amlou authentique aux amandes torréfiées.',
      en: 'Atlas mountain honeys and authentic roasted almond amlou.',
      ar: 'عسل حر من جبال الأطلس وأملو بلدي أصيل باللوز المحمص وزيت الأركان.',
    },
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-epices',
    slug: 'epices-aromates',
    name: {
      fr: 'Épices & Aromates',
      en: 'Spices & Herbs',
      ar: 'توابل وأعشاب عطرية',
    },
    description: {
      fr: 'Safran de Taliouine, Ras El Hanout impérial et cumin beldi d’Alnif.',
      en: 'Taliouine pure saffron, imperial Ras El Hanout and Alnif cumin.',
      ar: 'زعفران تاليوين الحر، رأس الحانوت الملكي وكمون بلدي من ألنيف.',
    },
    iconName: 'Flame',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-dattes',
    slug: 'dattes-fruits-secs',
    name: {
      fr: 'Dattes & Fruits Secs',
      en: 'Dates & Dried Fruits',
      ar: 'تمور وفواكه جافة',
    },
    description: {
      fr: 'Mejhoul de Tafilalet, amandes douces de Tafraout et noix de l’Ourika.',
      en: 'Mejhoul dates from Tafilalet, sweet Tafraout almonds and Ourika walnuts.',
      ar: 'تمور المجهول من تافيلالت، لوز بلدي من تافراوت وجوز أوريكة.',
    },
    iconName: 'Nut',
    image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-laitiers',
    slug: 'produits-laitiers',
    name: {
      fr: 'Laiterie & Fromages Beldi',
      en: 'Artisan Dairy & Cheese',
      ar: 'ألبان وأجبان بلدية',
    },
    description: {
      fr: 'Jben frais de Chefchaouen, beurre fermier baratté et lben onctueux.',
      en: 'Fresh artisanal Jben from Chefchaouen, churned farm butter and fresh lben.',
      ar: 'جبن طازج من شفشاون، زبدة بلدية مخفوقة ولبن قروي طبيعي.',
    },
    iconName: 'Milk',
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-epicerie',
    slug: 'epicerie-fine',
    name: {
      fr: 'Épicerie & Conserves',
      en: 'Pantry & Preserves',
      ar: 'بقالة تقليدية ومصبرات',
    },
    description: {
      fr: 'Couscous roulé à la main, olives meslalla marinées et citrons confits.',
      en: 'Hand-rolled semolina couscous, seasoned meslalla olives and preserved lemons.',
      ar: 'كسكس مفتول باليد، زيتون مسلالة متبل وحامض مصير بلدي.',
    },
    iconName: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-artisanat',
    slug: 'artisanat-savoir-faire',
    name: {
      fr: 'Eaux Florales & Terroir',
      en: 'Floral Waters & Heritage',
      ar: 'مقطرات وأعشاب تقليدية',
    },
    description: {
      fr: 'Eau de rose distillée de Kelaat M’Gouna et eau de fleur d’oranger pure.',
      en: 'Steam distilled rose water from Kelaat M’Gouna and authentic orange blossom.',
      ar: 'ماء ورد مقطر من قلعة مكونة وماء زهر الليمون البلدي الصافي.',
    },
    iconName: 'Flower2',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    productCount: 5,
  },
  {
    id: 'cat-paniers',
    slug: 'paniers-coffrets',
    name: {
      fr: 'Paniers & Coffrets',
      en: 'Baskets & Gift Bundles',
      ar: 'سلات وتشكيلات هدايا',
    },
    description: {
      fr: 'Compositions de la semaine et coffrets de dégustation pour vos proches.',
      en: 'Weekly grocery hampers and artisanal tasting gift boxes.',
      ar: 'سلات أسبوعية متوازنة وتشكيلات راقية للتذوق وهدايا الأحباب.',
    },
    iconName: 'Gift',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    productCount: 6,
  },
];
