import { CartItem, DeliveryZone, Product, Promotion } from './types';

/**
 * DETERMINISTIC PRICING ENGINE (TERROIR)
 * 
 * Rules:
 * 1. Monetary calculations are normalized to integer centimes (1 MAD = 100 centimes).
 * 2. Zero floating-point accumulation errors.
 * 3. Enforce strict stock boundaries, minimum quantities, and unit step increments.
 * 4. Symmetric subtotal, discount, delivery fee, and grand total calculations across
 *    Storefront, Cart, Checkout, and Admin reports.
 */

export const CENTIMES_PER_MAD = 100;

export function toCentimes(mad: number): number {
  return Math.round(mad * CENTIMES_PER_MAD);
}

export function fromCentimes(centimes: number): number {
  return Math.round(centimes) / CENTIMES_PER_MAD;
}

export function formatMAD(amount: number, locale: string = 'fr'): string {
  const rounded = Math.round(amount * 100) / 100;
  if (locale === 'ar') {
    return `${rounded.toFixed(2)} د.م.`;
  }
  return `${rounded.toFixed(2)} MAD`;
}

/**
 * Calculates item price given product, quantity, and optional variant.
 */
export function calculateItemPrice(
  product: Product,
  quantity: number,
  variantId?: string
): { unitPrice: number; lineTotal: number; centimesTotal: number } {
  // If a variant is selected, use variant's specific price
  if (variantId && product.variants && product.variants.length > 0) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      const unitPriceCentimes = toCentimes(variant.price);
      const centimesTotal = Math.round(unitPriceCentimes * quantity);
      return {
        unitPrice: variant.price,
        lineTotal: fromCentimes(centimesTotal),
        centimesTotal,
      };
    }
  }

  // Base product price calculation (proportional or unit-based)
  const baseUnitPrice = product.isPromo && product.promoPrice ? product.promoPrice : product.pricePerUnit;
  const unitPriceCentimes = toCentimes(baseUnitPrice);
  const centimesTotal = Math.round(unitPriceCentimes * quantity);

  return {
    unitPrice: baseUnitPrice,
    lineTotal: fromCentimes(centimesTotal),
    centimesTotal,
  };
}

/**
 * Validates requested quantity against product limits and available stock.
 */
export function validateQuantity(
  product: Product,
  desiredQuantity: number,
  existingCartQuantity: number = 0,
  variantId?: string
): { isValid: boolean; adjustedQuantity: number; error?: string } {
  if (desiredQuantity <= 0) {
    return {
      isValid: false,
      adjustedQuantity: 0,
      error: 'La quantité doit être supérieure à zéro.',
    };
  }

  // Check variant stock if applicable
  let availableStock = product.stockQuantity;
  if (variantId && product.variants) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) {
      availableStock = variant.stock;
    }
  }

  const step = product.unitStep || 1;
  const min = product.minQuantity || step;
  const max = Math.min(product.maxQuantity || availableStock, availableStock);

  if (availableStock <= 0 || !product.inStock) {
    return {
      isValid: false,
      adjustedQuantity: 0,
      error: 'Produit en rupture de stock.',
    };
  }

  // Check minimum requirement
  if (desiredQuantity < min) {
    return {
      isValid: false,
      adjustedQuantity: min,
      error: `Quantité minimale requise: ${min} ${product.pricingUnit}`,
    };
  }

  // Total quantity including cart cannot exceed available stock
  const totalQuantity = desiredQuantity + existingCartQuantity;
  if (totalQuantity > max) {
    const allowedAdd = Math.max(0, max - existingCartQuantity);
    return {
      isValid: false,
      adjustedQuantity: allowedAdd,
      error: `Stock insuffisant. Maximum disponible: ${max} ${product.pricingUnit}`,
    };
  }

  // Clean precision to avoid float noise (e.g. 0.5 + 0.1)
  const sanitized = Math.round(desiredQuantity * 100) / 100;

  return {
    isValid: true,
    adjustedQuantity: sanitized,
  };
}

export interface CartTotalsResult {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  freeDeliveryRemaining: number;
  isFreeDelivery: boolean;
  isEligibleForDelivery: boolean;
  deliveryError?: string;
}

/**
 * Calculates unified cart totals in integer centimes to guarantee zero rounding errors.
 */
export function calculateCartTotals(
  cart: CartItem[],
  promo: Promotion | null = null,
  deliveryZone: DeliveryZone | null = null
): CartTotalsResult {
  // 1. Calculate Subtotal in centimes
  let subtotalCentimes = 0;
  for (const item of cart) {
    const itemPricing = calculateItemPrice(item.product, item.quantity, item.selectedVariantId);
    subtotalCentimes += itemPricing.centimesTotal;
  }

  const subtotalMAD = fromCentimes(subtotalCentimes);

  // 2. Calculate Delivery Fee & Thresholds
  let deliveryFeeCentimes = 0;
  let isFreeDelivery = false;
  let freeDeliveryRemaining = 0;
  let isEligibleForDelivery = true;
  let deliveryError: string | undefined = undefined;

  if (deliveryZone) {
    if (!deliveryZone.isActive) {
      isEligibleForDelivery = false;
      deliveryError = `Livraison temporairement indisponible pour ${deliveryZone.cityName.fr}.`;
    } else if (subtotalMAD < deliveryZone.minOrder && subtotalMAD > 0) {
      isEligibleForDelivery = false;
      deliveryError = `Commande minimale pour ${deliveryZone.cityName.fr}: ${deliveryZone.minOrder} MAD.`;
    }

    if (subtotalMAD >= deliveryZone.freeDeliveryThreshold && deliveryZone.freeDeliveryThreshold > 0) {
      isFreeDelivery = true;
      deliveryFeeCentimes = 0;
      freeDeliveryRemaining = 0;
    } else {
      deliveryFeeCentimes = toCentimes(deliveryZone.deliveryFee);
      freeDeliveryRemaining = Math.max(0, deliveryZone.freeDeliveryThreshold - subtotalMAD);
    }
  }

  // 3. Calculate Promotion Discount
  let discountCentimes = 0;
  if (promo && promo.isActive && subtotalMAD >= promo.minOrder) {
    if (promo.discountType === 'percentage') {
      // Percentage discount on subtotal
      discountCentimes = Math.round((subtotalCentimes * promo.discountValue) / 100);
    } else if (promo.discountType === 'fixed_mad') {
      discountCentimes = Math.min(toCentimes(promo.discountValue), subtotalCentimes);
    } else if (promo.discountType === 'free_shipping') {
      // Free shipping discount zeroes the delivery fee
      deliveryFeeCentimes = 0;
      isFreeDelivery = true;
    }
  }

  // Guarantee discount never exceeds subtotal
  discountCentimes = Math.min(discountCentimes, subtotalCentimes);

  // 4. Calculate Final Grand Total
  const totalCentimes = Math.max(0, subtotalCentimes - discountCentimes + deliveryFeeCentimes);

  return {
    subtotal: fromCentimes(subtotalCentimes),
    discount: fromCentimes(discountCentimes),
    deliveryFee: fromCentimes(deliveryFeeCentimes),
    total: fromCentimes(totalCentimes),
    freeDeliveryRemaining: Math.round(freeDeliveryRemaining * 100) / 100,
    isFreeDelivery,
    isEligibleForDelivery,
    deliveryError,
  };
}

/**
 * Validates that all items in cart do not exceed current stock inventory.
 */
export function validateCartStock(
  cart: CartItem[],
  inventory: Product[]
): { isValid: boolean; errors: { itemId: string; message: string }[] } {
  const errors: { itemId: string; message: string }[] = [];

  for (const item of cart) {
    const liveProduct = inventory.find((p) => p.id === item.productId);
    if (!liveProduct || !liveProduct.inStock) {
      errors.push({
        itemId: item.id,
        message: `${item.product.name.fr} n'est plus disponible.`,
      });
      continue;
    }

    let maxStock = liveProduct.stockQuantity;
    if (item.selectedVariantId && liveProduct.variants) {
      const v = liveProduct.variants.find((v) => v.id === item.selectedVariantId);
      if (v) {
        maxStock = v.stock;
      }
    }

    if (item.quantity > maxStock) {
      errors.push({
        itemId: item.id,
        message: `Quantité demandée (${item.quantity} ${liveProduct.pricingUnit}) dépasse le stock disponible (${maxStock}).`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
