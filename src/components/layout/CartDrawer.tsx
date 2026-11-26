'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatCurrencyMAD, cn } from '@/lib/utils';

export function CartDrawer() {
  const { locale, isRTL, t } = useLocale();
  const {
    state,
    activePromo,
    cartTotals,
    isCartDrawerOpen,
    closeCartDrawer,
    updateCartQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    currentDeliveryZone,
  } = useStore();

  const [promoInput, setPromoInput] = React.useState('');

  useEffect(() => {
    if (!isCartDrawerOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCartDrawer();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  if (!isCartDrawerOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const freeDeliveryProgress =
    currentDeliveryZone && currentDeliveryZone.freeDeliveryThreshold > 0
      ? Math.min(
          100,
          Math.round((cartTotals.subtotal / currentDeliveryZone.freeDeliveryThreshold) * 100)
        )
      : 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('cart.title')}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Slide-over surface */}
      <div
        className={cn(
          'relative z-10 flex flex-col w-full max-w-md h-[100dvh] bg-[#F8F7F0] shadow-2xl border-[rgba(53,43,62,0.12)]',
          isRTL ? 'mr-auto border-l' : 'ml-auto border-r'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(53,43,62,0.12)] bg-[#352B3E]/5 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#352B3E]" />
            <h2 className="text-lg font-heading font-bold text-[#1C1A22]">
              {t('cart.title')} ({state.cart.length})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            className="w-9 h-9 rounded-sm bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#1C1A22] transition-colors cursor-pointer"
            aria-label={t('nav.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {currentDeliveryZone && (
          <div className="p-3.5 bg-white border-b border-[rgba(53,43,62,0.12)] text-xs space-y-1.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#1C1A22]">
                Livraison à {currentDeliveryZone.cityName[locale]}
              </span>
              <span className="text-[11px] text-[#5C6053]">
                {cartTotals.isFreeDelivery
                  ? '🎉 Livraison offerte !'
                  : `Plus que ${Math.max(0, currentDeliveryZone.freeDeliveryThreshold - cartTotals.subtotal)} MAD pour la gratuité`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#352B3E]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#352B3E] transition-all duration-300"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {state.cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#352B3E]/10 text-[#352B3E] flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 opacity-70" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-bold text-lg text-[#1C1A22]">
                  {t('cart.empty_title')}
                </h3>
                <p className="text-xs text-[#5C6053] max-w-xs">
                  {t('cart.empty_message')}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCartDrawer}
                className="px-5 py-2.5 rounded-sm bg-[#352B3E] text-white font-semibold text-xs hover:bg-[#2a2133] transition-colors cursor-pointer"
              >
                {t('cart.continue_shopping')}
              </button>
            </div>
          ) : (
            state.cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-sm bg-white border border-[rgba(53,43,62,0.12)] shadow-xs"
              >
                <div className="relative w-16 h-16 rounded-sm overflow-hidden bg-[#F8F7F0] shrink-0 border border-[rgba(53,43,62,0.12)]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name[locale]}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-xs font-semibold text-[#1C1A22] truncate">
                      {item.product.name[locale]}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-black/30 hover:text-[#C75E3E] transition-colors p-1"
                      aria-label="Supprimer du panier"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <QuantityStepper
                      size="sm"
                      value={item.quantity}
                      step={item.product.unitStep || 1}
                      min={item.product.minQuantity || (item.product.unitStep || 1)}
                      max={item.product.stockQuantity}
                      unit={item.product.pricingUnit}
                      onChange={(newQty) => updateCartQuantity(item.id, newQty)}
                    />

                    <span className="text-xs font-bold text-[#352B3E]">
                      {formatCurrencyMAD(item.lineTotal, locale)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Actions */}
        {state.cart.length > 0 && (
          <div className="p-4 border-t border-[rgba(53,43,62,0.12)] bg-white space-y-3 shrink-0">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Code promo (ex: BIENVENUE10)"
                className="flex-1 px-3 py-2 rounded-sm border border-[rgba(53,43,62,0.2)] text-xs text-[#1C1A22] focus:outline-none focus:border-[#352B3E]"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-sm bg-[#352B3E] text-white text-xs font-semibold hover:bg-[#2a2133] transition-colors cursor-pointer"
              >
                Appliquer
              </button>
            </form>

            {/* Active Promo Pill */}
            {activePromo && (
              <div className="flex items-center justify-between p-2 rounded-sm bg-[#352B3E]/10 text-xs text-[#352B3E]">
                <span className="flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-[#D4E84A]" />
                  <span>Code {activePromo.code} ({activePromo.discountValue}{activePromo.discountType === 'percentage' ? '%' : ' MAD'} offert)</span>
                </span>
                <button
                  type="button"
                  onClick={removePromoCode}
                  className="text-black/40 hover:text-[#C75E3E] text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1 text-xs text-[#5C6053]">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold text-[#1C1A22]">
                  {formatCurrencyMAD(cartTotals.subtotal, locale)}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-[#2A6B40] font-semibold">
                  <span>{t('cart.discount')}</span>
                  <span>-{formatCurrencyMAD(cartTotals.discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('cart.delivery_fee')}</span>
                <span className="font-semibold text-[#1C1A22]">
                  {cartTotals.isFreeDelivery ? 'Gratuit' : formatCurrencyMAD(cartTotals.deliveryFee, locale)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#1C1A22] pt-2 border-t border-[rgba(53,43,62,0.12)]">
                <span>{t('cart.total')}</span>
                <span className="text-[#352B3E]">
                  {formatCurrencyMAD(cartTotals.total, locale)}
                </span>
              </div>
            </div>

            {/* Direct Checkout Link */}
            <Link
              href={`/${locale}/checkout`}
              onClick={closeCartDrawer}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-sm bg-[#352B3E] text-white font-bold text-sm hover:bg-[#2a2133] transition-colors shadow-xs cursor-pointer min-h-[48px]"
            >
              <span>{t('cart.checkout')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
