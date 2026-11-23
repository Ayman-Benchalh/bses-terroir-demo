'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Check, MapPin, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Badge } from '@/components/ui/Badge';
import { formatCurrencyMAD, cn } from '@/lib/utils';

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
    <div className="group relative flex flex-col rounded-2xl bg-white border border-[#E5DEC9] p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-[#233C2E]/40 transition-all duration-200">
      {/* Top Media Container */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F7F4EB] mb-3">
        <Link href={`/${locale}/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 start-2.5 flex flex-col gap-1.5 pointer-events-none">
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
          {product.inStock && product.stockQuantity <= 5 && (
            <Badge variant="warning" size="sm">
              {t('product.low_stock')}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={t('nav.wishlist')}
          className={cn(
            'absolute top-2.5 end-2.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs transition-colors cursor-pointer',
            isFavorite ? 'text-[#DC2626]' : 'text-[#5C6053] hover:text-[#DC2626]'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between text-start">
        <div>
          {/* Origin and Category Tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5C6053] mb-1">
            <MapPin className="w-3 h-3 text-[#233C2E] shrink-0" />
            <span className="truncate">{product.originRegion[locale]}</span>
          </div>

          {/* Product Title */}
          <Link
            href={`/${locale}/product/${product.slug}`}
            className="block font-heading text-base font-semibold text-[#252820] hover:text-[#233C2E] transition-colors line-clamp-1"
          >
            {product.name[locale]}
          </Link>

          {/* Terroir Quality Note (replaces fabricated customer review ratings) */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-[#233C2E] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D58B51]" />
            <span>Récolte Locale Sélectionnée</span>
          </div>
        </div>

        {/* Pricing & Quick Add Section */}
        <div className="pt-3 mt-3 border-t border-[#E5DEC9] space-y-3">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-lg font-bold text-[#233C2E]">
                {formatCurrencyMAD(currentPrice, locale)}
              </span>
              <span className="text-xs text-[#5C6053] ms-1">
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
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[36px]',
                isAdded
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-[#233C2E] text-white hover:bg-[#1C3025] disabled:bg-black/10 disabled:text-black/30'
              )}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t('product.added_to_cart')}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t('product.quick_add')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
