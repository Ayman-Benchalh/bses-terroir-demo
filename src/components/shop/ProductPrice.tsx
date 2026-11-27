import React from 'react';
import { SupportedLocale } from '@/lib/types';
import { formatCurrencyMAD, cn } from '@/lib/utils';

export interface ProductPriceProps {
  price: number;
  promoPrice?: number;
  isPromo?: boolean;
  unit?: string;
  locale: SupportedLocale;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable ProductPrice component that strictly prevents wrapping,
 * enforces tabular numbers, and provides clear visual hierarchy for regular & promo prices.
 */
export function ProductPrice({
  price,
  promoPrice,
  isPromo,
  unit,
  locale,
  className,
  size = 'md',
}: ProductPriceProps) {
  const currentPrice = isPromo && promoPrice ? promoPrice : price;

  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={cn('flex items-baseline justify-between gap-1 flex-nowrap min-w-0 w-full', className)}>
      <div className="flex items-baseline whitespace-nowrap min-w-0">
        <span className={cn('font-bold text-[#193F30] tracking-tight tabular-nums', sizeClasses[size])}>
          {formatCurrencyMAD(currentPrice, locale)}
        </span>
        {unit && (
          <span className="text-xs font-medium text-[#66756B] ms-1 whitespace-nowrap">
            / {unit}
          </span>
        )}
      </div>

      {isPromo && (
        <span className="text-xs text-[#66756B]/75 line-through whitespace-nowrap tabular-nums ms-auto shrink-0">
          {formatCurrencyMAD(price, locale)}
        </span>
      )}
    </div>
  );
}
