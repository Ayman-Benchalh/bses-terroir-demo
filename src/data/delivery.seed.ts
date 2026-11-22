import { DeliveryZone } from '@/lib/types';

export const DELIVERY_ZONES_SEED: DeliveryZone[] = [
  {
    id: 'zone-casa',
    cityKey: 'casablanca',
    cityName: {
      fr: 'Casablanca (Grand Casablanca)',
      en: 'Casablanca (Greater Area)',
      ar: 'الدار البيضاء الكبرى',
    },
    deliveryFee: 20, // 20 MAD
    minOrder: 100, // 100 MAD
    freeDeliveryThreshold: 250, // Free above 250 MAD
    isActive: true,
    estimatedDeliveryHours: '2h - 4h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
      'Soir (18h00 - 21h00)',
    ],
  },
  {
    id: 'zone-rabat',
    cityKey: 'rabat',
    cityName: {
      fr: 'Rabat & Agdal',
      en: 'Rabat & Agdal',
      ar: 'الرباط وأكدال',
    },
    deliveryFee: 25,
    minOrder: 120,
    freeDeliveryThreshold: 300,
    isActive: true,
    estimatedDeliveryHours: '3h - 5h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
      'Soir (18h00 - 21h00)',
    ],
  },
  {
    id: 'zone-sale',
    cityKey: 'sale',
    cityName: {
      fr: 'Salé & Marina',
      en: 'Salé & Marina',
      ar: 'سلا والمارينا',
    },
    deliveryFee: 25,
    minOrder: 120,
    freeDeliveryThreshold: 300,
    isActive: true,
    estimatedDeliveryHours: '3h - 5h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
    ],
  },
  {
    id: 'zone-marrakech',
    cityKey: 'marrakech',
    cityName: {
      fr: 'Marrakech (Guéliz, Hivernage, Palmeraie)',
      en: 'Marrakech (Gueliz, Hivernage, Palmeraie)',
      ar: 'مراكش (جيليز، الحي الشتوي، النخيل)',
    },
    deliveryFee: 30,
    minOrder: 150,
    freeDeliveryThreshold: 350,
    isActive: true,
    estimatedDeliveryHours: '4h - 6h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
      'Soir (18h00 - 21h00)',
    ],
  },
  {
    id: 'zone-fes',
    cityKey: 'fes',
    cityName: {
      fr: 'Fès (Ville Nouvelle & Médina)',
      en: 'Fes (New City & Medina)',
      ar: 'فاس (المدينة الجديدة والعتيقة)',
    },
    deliveryFee: 30,
    minOrder: 130,
    freeDeliveryThreshold: 320,
    isActive: true,
    estimatedDeliveryHours: '4h - 6h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
    ],
  },
  {
    id: 'zone-meknes',
    cityKey: 'meknes',
    cityName: {
      fr: 'Meknès (Hamria & Al Bassatine)',
      en: 'Meknes (Hamria & Al Bassatine)',
      ar: 'مكناس (حمرية والبساتين)',
    },
    deliveryFee: 30,
    minOrder: 120,
    freeDeliveryThreshold: 300,
    isActive: true,
    estimatedDeliveryHours: '4h - 6h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
    ],
  },
  {
    id: 'zone-tanger',
    cityKey: 'tanger',
    cityName: {
      fr: 'Tanger (Malabata, Centre & Baie)',
      en: 'Tangier (Malabata, Downtown & Bay)',
      ar: 'طنجة (مالاباطا، المركز والخليج)',
    },
    deliveryFee: 35,
    minOrder: 150,
    freeDeliveryThreshold: 380,
    isActive: true,
    estimatedDeliveryHours: '4h - 6h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
      'Soir (18h00 - 21h00)',
    ],
  },
  {
    id: 'zone-agadir',
    cityKey: 'agadir',
    cityName: {
      fr: 'Agadir (Baie, Founty & Sonaba)',
      en: 'Agadir (Bay, Founty & Sonaba)',
      ar: 'أكادير (الخليج، فونتي وسونابا)',
    },
    deliveryFee: 35,
    minOrder: 150,
    freeDeliveryThreshold: 380,
    isActive: true,
    estimatedDeliveryHours: '5h - 7h',
    availableSlots: [
      'Matin (09h00 - 13h00)',
      'Après-midi (14h00 - 18h00)',
    ],
  },
];
