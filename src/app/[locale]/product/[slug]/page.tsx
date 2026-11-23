'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  MapPin,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/shop/ProductCard';
import { formatCurrencyMAD, cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = use(params);
  const { t } = useLocale();
  const { state, addToCart, toggleWishlist, isWishlisted } = useStore();

  const product = state.products.find((p) => p.slug === slug);

  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product?.variants && product.variants.length > 0 ? product.variants[0].id : undefined
  );

  const [quantity, setQuantity] = useState<number>(
    product?.minQuantity || (product?.unitStep || 1)
  );
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const isFavorite = isWishlisted(product.id);

  // Variant calculation
  const activeVariant = product.variants?.find((v) => v.id === selectedVariantId);
  const currentUnitPrice = activeVariant
    ? activeVariant.price
    : product.isPromo && product.promoPrice
    ? product.promoPrice
    : product.pricePerUnit;

  const currentAvailableStock = activeVariant ? activeVariant.stock : product.stockQuantity;

  const handleAddToCart = () => {
    const result = addToCart(product, quantity, selectedVariantId);
    if (result.success) {
      setIsAdded(true);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.8 },
        });
      } catch {
        // Fallback
      }
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const relatedProducts = state.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 text-start">
      {/* Breadcrumbs */}
      <nav aria-label="Fil d'ariane" className="flex items-center gap-2 text-xs text-[#5C6053]">
        <Link href={`/${locale}`} className="hover:text-[#233C2E]">
          {t('nav.home')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link href={`/${locale}/shop`} className="hover:text-[#233C2E]">
          {t('nav.shop')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link href={`/${locale}/shop?cat=${product.category}`} className="hover:text-[#233C2E]">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="font-semibold text-[#252820] truncate max-w-xs">
          {product.name[locale]}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Presentation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F7F4EB] border border-[#E5DEC9] shadow-sm">
            <Image
              src={product.image}
              alt={product.name[locale]}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 start-4 flex flex-col gap-2">
              {product.isPromo && (
                <Badge variant="honey" size="md">
                  Promotion Terroir
                </Badge>
              )}
              {product.inStock ? (
                <Badge variant={currentAvailableStock <= 5 ? 'warning' : 'success'} size="md">
                  {currentAvailableStock <= 5 ? 'Stock limité' : 'En stock'}
                </Badge>
              ) : (
                <Badge variant="error" size="md">
                  Rupture de stock
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={cn(
                'absolute top-4 end-4 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md transition-colors cursor-pointer',
                isFavorite ? 'text-[#DC2626]' : 'text-[#5C6053] hover:text-[#DC2626]'
              )}
              aria-label={t('nav.wishlist')}
            >
              <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Right Column: Information & Buying Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#233C2E]">
              <MapPin className="w-4 h-4" />
              <span>{product.originRegion[locale]}</span>
              <span className="text-[#E5DEC9]">•</span>
              <span className="font-mono text-[#5C6053]">{product.sku}</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#252820]">
              {product.name[locale]}
            </h1>

            {/* Terroir Authenticity Note (Replaces Fabricated Review Rating) */}
            <div className="flex items-center gap-2 text-xs text-[#233C2E] font-medium pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D7E4C5]/40 text-[#233C2E]">
                <Sparkles className="w-3.5 h-3.5 text-[#D58B51]" />
                <span>Terroir d’Origine Certifié • Fiche Démo BSES</span>
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#E5DEC9] flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#233C2E]">
              {formatCurrencyMAD(currentUnitPrice, locale)}
            </span>
            <span className="text-sm text-[#5C6053]">
              / {activeVariant ? activeVariant.name[locale] : product.pricingUnit}
            </span>

            {product.isPromo && !activeVariant && (
              <span className="text-sm text-[#8C9183] line-through">
                {formatCurrencyMAD(product.pricePerUnit, locale)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5C6053]">
              {t('product.description')}
            </h3>
            <p className="text-sm text-[#252820] leading-relaxed">
              {product.description[locale]}
            </p>
          </div>

          {/* Variants Selector if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#E5DEC9]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6053]">
                {t('product.select_variant')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((v) => {
                  const isSelected = selectedVariantId === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setSelectedVariantId(v.id);
                        setQuantity(1);
                      }}
                      className={cn(
                        'p-2.5 rounded-xl border text-xs font-semibold transition-all text-start cursor-pointer',
                        isSelected
                          ? 'border-[#233C2E] bg-[#233C2E]/5 text-[#233C2E] ring-2 ring-[#233C2E]/20'
                          : 'border-[#E5DEC9] bg-white text-[#252820] hover:bg-[#FAF8F2]'
                      )}
                    >
                      <span className="block truncate">{v.name[locale]}</span>
                      <span className="block text-[11px] font-bold text-[#233C2E] mt-1">
                        {formatCurrencyMAD(v.price, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart */}
          <div className="space-y-3 pt-4 border-t border-[#E5DEC9]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C6053]">
              {t('product.select_quantity')}
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <QuantityStepper
                size="lg"
                value={quantity}
                step={product.unitStep || 1}
                min={product.minQuantity || (product.unitStep || 1)}
                max={currentAvailableStock}
                unit={activeVariant ? undefined : product.pricingUnit}
                disabled={!product.inStock || currentAvailableStock <= 0}
                onChange={(newQty) => setQuantity(newQty)}
              />

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock || currentAvailableStock <= 0}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-xs cursor-pointer min-h-[48px]',
                  isAdded
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#233C2E] text-white hover:bg-[#1C3025] disabled:bg-black/10 disabled:text-black/30'
                )}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>{t('product.added_to_cart')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>{t('product.add_to_cart')}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Storage & Quality Notes */}
          <div className="p-4 rounded-2xl bg-[#EFF5E8] border border-[#D7E4C5] space-y-2 text-xs text-[#252820]">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#233C2E] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#233C2E] font-bold">
                  {t('product.storage')}
                </strong>
                <p className="text-[#5C6053] leading-relaxed mt-0.5">
                  {product.storageAdvice[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E5DEC9] space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#252820]">
            {t('product.related_products')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
