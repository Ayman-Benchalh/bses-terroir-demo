import { test, expect } from '@playwright/test';
import {
  toCentimes,
  fromCentimes,
  formatMAD,
  calculateItemPrice,
  validateQuantity,
  calculateCartTotals,
} from '@/lib/pricingEngine';
import { Product, CartItem, DeliveryZone, Promotion } from '@/lib/types';
import { PRODUCTS_SEED } from '@/data/products.seed';

test.describe('TERROIR Deterministic Pricing Engine (Unit Tests)', () => {
  test('centime normalization handles rounding boundaries accurately', () => {
    expect(toCentimes(14.5)).toBe(1450);
    expect(toCentimes(0.01)).toBe(1);
    expect(toCentimes(0.005)).toBe(1);
    expect(fromCentimes(1450)).toBe(14.5);
    expect(fromCentimes(100)).toBe(1);
  });

  test('fractional quantities calculate correct line totals without floating errors', () => {
    const oranges = PRODUCTS_SEED[0]; // 14 MAD/kg (promo: 12 MAD/kg)
    // Promo is 12 MAD
    const priceHalfKg = calculateItemPrice(oranges, 0.5);
    expect(priceHalfKg.unitPrice).toBe(12);
    expect(priceHalfKg.lineTotal).toBe(6);
    expect(priceHalfKg.centimesTotal).toBe(600);

    const priceOneAndHalf = calculateItemPrice(oranges, 1.5);
    expect(priceOneAndHalf.lineTotal).toBe(18);
    expect(priceOneAndHalf.centimesTotal).toBe(1800);

    const priceThreeKg = calculateItemPrice(oranges, 3);
    expect(priceThreeKg.lineTotal).toBe(36);
  });

  test('variant pricing selects correct variant price when specified', () => {
    const oliveOil = PRODUCTS_SEED[12]; // Huile d'olive extra vierge Ouezzane
    expect(oliveOil.variants).toBeDefined();

    // Select 500ml variant (60 MAD)
    const pricing500ml = calculateItemPrice(oliveOil, 2, 'var-oil-500ml');
    expect(pricing500ml.unitPrice).toBe(60);
    expect(pricing500ml.lineTotal).toBe(120);

    // Select 5L variant (450 MAD)
    const pricing5L = calculateItemPrice(oliveOil, 1, 'var-oil-5l');
    expect(pricing5L.unitPrice).toBe(450);
    expect(pricing5L.lineTotal).toBe(450);
  });

  test('quantity validation enforces available stock and prevents negative values', () => {
    const product = PRODUCTS_SEED[0]; // stockQuantity: 45
    const valid = validateQuantity(product, 2);
    expect(valid.isValid).toBe(true);
    expect(valid.adjustedQuantity).toBe(2);

    // Negative quantity rejected
    const negative = validateQuantity(product, -1);
    expect(negative.isValid).toBe(false);
    expect(negative.adjustedQuantity).toBe(0);

    // Excess stock rejected
    const excess = validateQuantity(product, 100);
    expect(excess.isValid).toBe(false);
    expect(excess.adjustedQuantity).toBe(Math.min(product.maxQuantity, product.stockQuantity));
  });

  test('unified cart calculation applies discounts and delivery fees symmetrically', () => {
    const dummyProductA: Product = {
      ...PRODUCTS_SEED[0],
      pricePerUnit: 100,
      isPromo: false,
    };
    const dummyProductB: Product = {
      ...PRODUCTS_SEED[1],
      pricePerUnit: 50,
      isPromo: false,
    };

    const cart: CartItem[] = [
      {
        id: 'item-1',
        productId: dummyProductA.id,
        product: dummyProductA,
        quantity: 2, // 200 MAD
        unitPrice: 100,
        lineTotal: 200,
      },
      {
        id: 'item-2',
        productId: dummyProductB.id,
        product: dummyProductB,
        quantity: 1, // 50 MAD
        unitPrice: 50,
        lineTotal: 50,
      },
    ];

    const zoneCasa: DeliveryZone = {
      id: 'z-casa',
      cityKey: 'casablanca',
      cityName: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' },
      deliveryFee: 20,
      minOrder: 100,
      freeDeliveryThreshold: 300,
      isActive: true,
      estimatedDeliveryHours: '2h',
      availableSlots: ['Matin'],
    };

    const promo10: Promotion = {
      id: 'p-10',
      code: 'TEST10',
      discountType: 'percentage',
      discountValue: 10, // 10%
      minOrder: 150,
      description: { fr: '10%', en: '10%', ar: '10%' },
      isActive: true,
      expiresAt: '2026-12-31',
    };

    // Subtotal: 250 MAD
    // Discount: 10% of 250 = 25 MAD
    // Delivery fee: 20 MAD (because 250 < 300 threshold)
    // Total: 250 - 25 + 20 = 245 MAD
    const totals = calculateCartTotals(cart, promo10, zoneCasa);
    expect(totals.subtotal).toBe(250);
    expect(totals.discount).toBe(25);
    expect(totals.deliveryFee).toBe(20);
    expect(totals.total).toBe(245);
    expect(totals.freeDeliveryRemaining).toBe(50);
    expect(totals.isFreeDelivery).toBe(false);
  });
});
