import { test, expect } from '@playwright/test';
import fr from '@/lib/i18n/fr.json';
import en from '@/lib/i18n/en.json';
import ar from '@/lib/i18n/ar.json';
import { PRODUCTS_SEED } from '@/data/products.seed';

function getAllKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

test.describe('TERROIR Internationalization & Dictionary Parity', () => {
  test('all French keys exist in English and Arabic dictionaries', () => {
    const frKeys = getAllKeys(fr);
    const enKeys = new Set(getAllKeys(en));
    const arKeys = new Set(getAllKeys(ar));

    const missingInEn: string[] = [];
    const missingInAr: string[] = [];

    frKeys.forEach((key) => {
      if (!enKeys.has(key)) missingInEn.push(key);
      if (!arKeys.has(key)) missingInAr.push(key);
    });

    expect(missingInEn).toEqual([]);
    expect(missingInAr).toEqual([]);
  });

  test('all 50 catalog products have complete localized fields', () => {
    expect(PRODUCTS_SEED.length).toBeGreaterThanOrEqual(48);

    PRODUCTS_SEED.forEach((product) => {
      // Localized name
      expect(product.name.fr).toBeTruthy();
      expect(product.name.en).toBeTruthy();
      expect(product.name.ar).toBeTruthy();

      // Localized description
      expect(product.description.fr).toBeTruthy();
      expect(product.description.en).toBeTruthy();
      expect(product.description.ar).toBeTruthy();

      // Localized origin
      expect(product.originRegion.fr).toBeTruthy();
      expect(product.originRegion.en).toBeTruthy();
      expect(product.originRegion.ar).toBeTruthy();
    });
  });
});
