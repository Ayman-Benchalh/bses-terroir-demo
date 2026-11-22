'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Star,
  MapPin,
  ShieldCheck,
  Truck,
  Check,
  ChevronRight,
  Package,
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
      <nav aria-label="Fil d'ariane" className="flex items-center gap-2 text-xs text-[#5D6855]">
        <Link href={`/${locale}`} className="hover:text-[#315B3C]">
          {t('nav.home')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link href={`/${locale}/shop`} className="hover:text-[#315B3C]">
          {t('nav.shop')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <Link href={`/${locale}/shop?cat=${product.category}`} className="hover:text-[#315B3C]">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="font-semibold text-[#282E23] truncate max-w-xs">
          {product.name[locale]}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#F5F0DF] border border-[#E8E1CF] shadow-sm">
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
                <Badge variant="warning" size="md">
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
                isFavorite ? 'text-[#DC2626]' : 'text-[#5D6855] hover:text-[#DC2626]'
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
            <div className="flex items-center gap-2 text-xs font-semibold text-[#315B3C]">
              <MapPin className="w-4 h-4" />
              <span>{product.originRegion[locale]}</span>
              <span className="text-[#E8E1CF]">•</span>
              <span className="font-mono text-[#5D6855]">{product.sku}</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#282E23]">
              {product.name[locale]}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs text-[#5D6855]">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#E7A84C] text-[#E7A84C]" />
                <span className="font-bold text-sm text-[#282E23]">{product.rating}</span>
              </div>
              <span>•</span>
              <span>{product.reviewsCount} {t('product.reviews')}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-[#F5F0DF]/60 border border-[#E8E1CF] flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#315B3C]">
              {formatCurrencyMAD(currentUnitPrice, locale)}
            </span>
            <span className="text-sm text-[#5D6855]">
              / {activeVariant ? activeVariant.name[locale] : product.pricingUnit}
            </span>

            {product.isPromo && !activeVariant && (
              <span className="text-sm text-[#8C9982] line-through">
                {formatCurrencyMAD(product.pricePerUnit, locale)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D6855]">
              {t('product.description')}
            </h3>
            <p className="text-sm text-[#282E23] leading-relaxed">
              {product.description[locale]}
            </p>
          </div>

          {/* Variants Selector if available */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#E8E1CF]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5D6855]">
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
                          ? 'border-[#315B3C] bg-[#315B3C]/5 text-[#315B3C] ring-2 ring-[#315B3C]/20'
                          : 'border-[#E8E1CF] bg-white text-[#282E23] hover:bg-[#F5F0DF]/40'
                      )}
                    >
                      <span className="block truncate">{v.name[locale]}</span>
                      <span className="block text-[11px] font-bold text-[#315B3C] mt-1">
                        {formatCurrencyMAD(v.price, locale)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart */}
          <div className="space-y-3 pt-4 border-t border-[#E8E1CF]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5D6855]">
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
                  'flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-md cursor-pointer min-h-[48px]',
                  isAdded
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-[#315B3C] text-white hover:bg-[#264930] disabled:bg-black/10 disabled:text-black/30'
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

          {/* Storage & Quality Guarantees */}
          <div className="p-4 rounded-2xl bg-[#EEF4E3] border border-[#DDE7C8] space-y-2 text-xs text-[#282E23]">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#315B3C] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#315B3C] font-bold">
                  {t('product.storage')}
                </strong>
                <p className="text-[#5D6855] leading-relaxed mt-0.5">
                  {product.storageAdvice[locale]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-[#E8E1CF] space-y-6">
          <h2 className="font-heading text-2xl font-bold text-[#282E23]">
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
