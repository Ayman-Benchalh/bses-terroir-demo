'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, MapPin } from 'lucide-react';
import { Product } from '@/lib/types';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Badge } from '@/components/ui/Badge';
import { formatCurrencyMAD, cn } from '@/lib/utils';

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { locale, t } = useLocale();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const [quantity, setQuantity] = useState<number>(product.minQuantity || (product.unitStep || 1));
  const [isAdded, setIsAdded] = useState(false);

  const isFavorite = isWishlisted(product.id);
  const currentPrice = product.isPromo && product.promoPrice ? product.promoPrice : product.pricePerUnit;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = addToCart(product, quantity);
    if (result.success) {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-xl bg-white border border-[#D9E2D7] p-3.5 sm:p-4 shadow-2xs hover:shadow-md hover:border-[#193F30]/40 transition-all duration-200 market-ticket',
        className
      )}
    >
      {/* 1. Media Container */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F6F7F1] mb-3">
        <Link href={`/${locale}/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Minimal Badges Overlay */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1 pointer-events-none">
          {product.isPromo && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#B7DB75] text-[#193F30] shadow-xs">
              Promo
            </span>
          )}
          {!product.inStock && (
            <Badge variant="error" size="sm">
              {t('product.out_of_stock')}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={t('nav.wishlist')}
          className={cn(
            'absolute top-2.5 end-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors cursor-pointer',
            isFavorite ? 'text-[#C03A2B]' : 'text-[#66756B] hover:text-[#C03A2B]'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>
      </div>

      {/* 2. Product Meta & Title */}
      <div className="flex-1 flex flex-col justify-between text-start">
        <div className="space-y-1.5">
          {/* Origin Label */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#193F30]">
            <MapPin className="w-3 h-3 text-[#193F30] shrink-0" />
            <span className="truncate">{product.originRegion[locale]}</span>
          </div>

          {/* Product Title — 2-line clamped with stable height */}
          <Link
            href={`/${locale}/product/${product.slug}`}
            className="block font-heading text-sm sm:text-base font-bold text-[#242D26] group-hover:text-[#193F30] transition-colors line-clamp-2 min-h-[2.5rem] leading-snug"
          >
            {product.name[locale]}
          </Link>
        </div>

        {/* 3. Pricing & Quantity / Quick Add Row */}
        <div className="pt-3 mt-3 border-t border-[#D9E2D7] space-y-2.5">
          {/* Price display with non-breaking tabular currency */}
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <div className="flex items-baseline whitespace-nowrap">
              <span className="text-base sm:text-lg font-bold text-[#193F30] tracking-tight">
                {formatCurrencyMAD(currentPrice, locale)}
              </span>
              <span className="text-xs font-medium text-[#66756B] ms-1">
                / {product.pricingUnit}
              </span>
            </div>

            {product.isPromo && (
              <span className="text-xs text-[#66756B]/70 line-through whitespace-nowrap ms-auto">
                {formatCurrencyMAD(product.pricePerUnit, locale)}
              </span>
            )}
          </div>

          {/* Controls: Stepper + Add Button without collision */}
          <div className="flex items-center gap-2">
            <QuantityStepper
              size="sm"
              value={quantity}
              step={product.unitStep || 1}
              min={product.minQuantity || (product.unitStep || 1)}
              max={product.stockQuantity}
              disabled={!product.inStock}
              onChange={(newQty) => setQuantity(newQty)}
              className="shrink-0"
            />

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              title={t('product.add_to_cart')}
              aria-label={t('product.add_to_cart')}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 h-9 sm:h-10 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] whitespace-nowrap',
                isAdded
                  ? 'bg-[#193F30] text-[#B7DB75] shadow-xs'
                  : 'bg-[#193F30] text-white hover:bg-[#122E23] disabled:bg-black/10 disabled:text-black/30 shadow-2xs'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{t('product.added_to_cart')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">
                    {locale === 'ar' ? 'إضافة' : locale === 'en' ? 'Add' : 'Ajouter'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
