import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyMAD(amount: number, locale: string = 'fr'): string {
  const rounded = Math.round(amount * 100) / 100;
  if (locale === 'ar') {
    return `${rounded.toFixed(2)} د.م.`;
  }
  return `${rounded.toFixed(2)} MAD`;
}

export function formatQuantityWithUnit(
  quantity: number,
  unit: string,
  locale: string = 'fr'
): string {
  const cleanQty = Math.round(quantity * 100) / 100;
  if (locale === 'ar') {
    return `${cleanQty} ${unit}`;
  }
  return `${cleanQty} ${unit}`;
}
