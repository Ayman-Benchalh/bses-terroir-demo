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
        'group relative flex flex-col rounded-2xl bg-white border border-[#E5DEC9] p-3 sm:p-3.5 shadow-2xs hover:shadow-md hover:border-[#233C2E]/50 transition-all duration-200',
        className
      )}
    >
      {/* 1. Media Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#FAF8F2] mb-3">
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
        <div className="absolute top-2 start-2 flex flex-col gap-1 pointer-events-none">
          {product.isPromo && (
            <Badge variant="honey" size="sm">
              Promo
            </Badge>
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
            'absolute top-2 end-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors cursor-pointer',
            isFavorite ? 'text-[#DC2626]' : 'text-[#5C6053] hover:text-[#DC2626]'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>
      </div>

      {/* 2. Product Meta & Title */}
      <div className="flex-1 flex flex-col justify-between text-start">
        <div className="space-y-1">
          {/* Origin Label */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-[#5C6053]">
            <MapPin className="w-3 h-3 text-[#233C2E] shrink-0" />
            <span className="truncate">{product.originRegion[locale]}</span>
          </div>

          {/* Product Title */}
          <Link
            href={`/${locale}/product/${product.slug}`}
            className="block font-heading text-sm sm:text-base font-bold text-[#252820] group-hover:text-[#233C2E] transition-colors truncate"
          >
            {product.name[locale]}
          </Link>
        </div>

        {/* 3. Pricing & Quantity / Quick Add Row */}
        <div className="pt-2.5 mt-2.5 border-t border-[#E5DEC9] space-y-2.5">
          {/* Price display */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline">
              <span className="text-base sm:text-lg font-extrabold text-[#233C2E]">
                {formatCurrencyMAD(currentPrice, locale)}
              </span>
              <span className="text-[11px] text-[#5C6053] ms-1">
                / {product.pricingUnit}
              </span>
            </div>

            {product.isPromo && (
              <span className="text-xs text-[#8C9183] line-through">
                {formatCurrencyMAD(product.pricePerUnit, locale)}
              </span>
            )}
          </div>

          {/* Controls: Stepper + Add Button */}
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
                'flex-1 flex items-center justify-center gap-1.5 h-9 sm:h-10 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[36px] whitespace-nowrap',
                isAdded
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-[#233C2E] text-white hover:bg-[#1C3025] disabled:bg-black/10 disabled:text-black/30 shadow-2xs'
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
