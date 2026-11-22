export type SupportedLocale = 'fr' | 'en' | 'ar';

export type ProductUnit = 'kg' | 'g' | 'l' | 'ml' | 'piece' | 'pack' | 'bottle' | 'bundle';

export interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
  [key: string]: string;
}

export interface ProductVariant {
  id: string;
  name: LocalizedString;
  unitAmount: number;
  unit: ProductUnit;
  price: number; // in MAD (integers or minor units)
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: LocalizedString;
  description: LocalizedString;
  category: string;
  pricePerUnit: number; // Price in MAD
  baseUnit: ProductUnit;
  pricingUnit: string; // e.g. "kg", "pièce", "bouteille (750ml)"
  unitStep: number; // e.g. 0.5 for 0.5kg, 1 for 1 piece
  minQuantity: number;
  maxQuantity: number;
  stockQuantity: number; // In base units
  inStock: boolean;
  isPromo: boolean;
  promoPrice?: number;
  originRegion: LocalizedString;
  storageAdvice: LocalizedString;
  tags: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  variants?: ProductVariant[];
}

export interface CartItem {
  id: string; // unique item id: productId or productId_variantId
  productId: string;
  product: Product;
  quantity: number;
  selectedVariantId?: string;
  selectedVariantName?: LocalizedString;
  unitPrice: number;
  lineTotal: number;
}

export interface DeliveryZone {
  id: string;
  cityKey: string;
  cityName: LocalizedString;
  deliveryFee: number; // in MAD
  minOrder: number; // in MAD
  freeDeliveryThreshold: number; // in MAD
  isActive: boolean;
  estimatedDeliveryHours: string;
  availableSlots: string[];
}

export interface Promotion {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed_mad' | 'free_shipping';
  discountValue: number; // percent e.g. 15 for 15% or fixed MAD e.g. 30
  minOrder: number; // in MAD
  description: LocalizedString;
  isActive: boolean;
  expiresAt: string;
}

export interface BasketTemplateItem {
  productId: string;
  quantity: number;
  unit: string;
}

export interface BasketTemplate {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  category: string;
  badge: LocalizedString;
  discountPercent: number;
  items: BasketTemplateItem[];
  image: string;
}

export type OrderStatus =
  | 'received'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  landmark?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  appliedPromoCode?: string;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cod'; // Cash on delivery (simulation)
  status: OrderStatus;
  deliverySlot: string;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
}

export interface ShoppingListItem {
  productId: string;
  quantity: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: ShoppingListItem[];
}

export interface StoreState {
  version: number;
  products: Product[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  shoppingLists: ShoppingList[];
  deliveryZones: DeliveryZone[];
  promotions: Promotion[];
  basketTemplates: BasketTemplate[];
  orders: Order[];
  selectedCity: string;
  activePromoCode: string | null;
}
