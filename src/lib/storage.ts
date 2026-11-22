import { StoreState } from './types';
import { PRODUCTS_SEED } from '@/data/products.seed';
import { DELIVERY_ZONES_SEED } from '@/data/delivery.seed';
import { PROMOTIONS_SEED } from '@/data/promotions.seed';
import { BASKET_TEMPLATES_SEED } from '@/data/basketTemplates.seed';
import { INITIAL_ORDERS_SEED } from '@/data/initialOrders.seed';

export const STORAGE_KEY = 'BSES_TERROIR_STORE_V1';
export const CURRENT_STORE_VERSION = 1;

export function getInitialSeedState(): StoreState {
  return {
    version: CURRENT_STORE_VERSION,
    products: JSON.parse(JSON.stringify(PRODUCTS_SEED)),
    cart: [],
    wishlist: [],
    shoppingLists: [
      {
        id: 'list-essentiel',
        name: 'Mes essentiels du week-end',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          { productId: 'prod-huile-01', quantity: 1 },
          { productId: 'prod-miel-01', quantity: 1 },
          { productId: 'prod-fruit-01', quantity: 2 },
          { productId: 'prod-legume-01', quantity: 2 },
        ],
      },
      {
        id: 'list-couscous',
        name: 'Courses Couscous du Vendredi',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          { productId: 'prod-epic-01', quantity: 1 },
          { productId: 'prod-legume-02', quantity: 1 },
          { productId: 'prod-legume-03', quantity: 1 },
          { productId: 'prod-legume-04', quantity: 1 },
          { productId: 'prod-legume-05', quantity: 1 },
          { productId: 'prod-lait-03', quantity: 1 },
        ],
      },
    ],
    deliveryZones: JSON.parse(JSON.stringify(DELIVERY_ZONES_SEED)),
    promotions: JSON.parse(JSON.stringify(PROMOTIONS_SEED)),
    basketTemplates: JSON.parse(JSON.stringify(BASKET_TEMPLATES_SEED)),
    orders: JSON.parse(JSON.stringify(INITIAL_ORDERS_SEED)),
    selectedCity: 'casablanca',
    activePromoCode: null,
  };
}

export function loadStoreState(): StoreState {
  if (typeof window === 'undefined') {
    return getInitialSeedState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getInitialSeedState();
      saveStoreState(seed);
      return seed;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== CURRENT_STORE_VERSION || !Array.isArray(parsed.products)) {
      console.warn('[TERROIR] Stale or corrupted store state detected. Re-initializing seed.');
      const seed = getInitialSeedState();
      saveStoreState(seed);
      return seed;
    }

    return parsed;
  } catch (err) {
    console.error('[TERROIR] Error loading state from localStorage:', err);
    const seed = getInitialSeedState();
    saveStoreState(seed);
    return seed;
  }
}

export function saveStoreState(state: StoreState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('[TERROIR] Error saving state to localStorage:', err);
  }
}

export function resetStoreState(): StoreState {
  const seed = getInitialSeedState();
  saveStoreState(seed);
  return seed;
}
