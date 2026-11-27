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
  layout?: 'auto' | 'stacked' | 'inline';
}

/**
 * Reusable ProductPrice component that strictly prevents wrapping,
 * enforces clear visual hierarchy, and provides stacked secondary promo price
 * on constrained cards to prevent colliding with current price and unit.
 */
export function ProductPrice({
  price,
  promoPrice,
  isPromo,
  unit,
  locale,
  className,
  size = 'md',
  layout = 'auto',
}: ProductPriceProps) {
  const currentPrice = isPromo && promoPrice ? promoPrice : price;

  const sizeClasses = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div
      className={cn(
        'w-full min-w-0',
        layout === 'stacked'
          ? 'flex flex-col items-start gap-0.5'
          : 'flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5',
        className
      )}
    >
      {/* Primary Line: Current Price + Unit (never separated, never clipped) */}
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

      {/* Secondary Line: Strikethrough Previous Price */}
      {isPromo && (
        <span
          className={cn(
            'text-xs text-[#66756B]/75 line-through whitespace-nowrap tabular-nums',
            layout === 'auto' ? 'ms-auto' : ''
          )}
        >
          {formatCurrencyMAD(price, locale)}
        </span>
      )}
    </div>
  );
}
