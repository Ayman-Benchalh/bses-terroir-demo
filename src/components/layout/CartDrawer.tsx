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
          'relative z-10 flex flex-col w-full max-w-md h-[100dvh] bg-[#FFFCF5] shadow-2xl border-[#E8E1CF]',
          isRTL ? 'mr-auto border-l' : 'ml-auto border-r'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8E1CF] bg-[#F5F0DF]/50 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#315B3C]" />
            <h2 className="text-lg font-heading font-bold text-[#282E23]">
              {t('cart.title')} ({state.cart.length})
            </h2>
          </div>
          <button
            onClick={closeCartDrawer}
            className="w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#282E23] transition-colors cursor-pointer"
            aria-label={t('nav.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        {currentDeliveryZone && (
          <div className="p-3 bg-[#EEF4E3] border-b border-[#DDE7C8] text-xs shrink-0">
            {cartTotals.isFreeDelivery ? (
              <p className="flex items-center gap-1.5 font-semibold text-[#2E7D32]">
                <Check className="w-4 h-4 shrink-0" />
                <span>{t('cart.free_shipping_reached')}</span>
              </p>
            ) : (
              <div className="space-y-1.5">
                <p className="text-[#282E23] font-medium">
                  {t('cart.free_shipping_notice', {
                    amount: formatCurrencyMAD(cartTotals.freeDeliveryRemaining, locale),
                  })}
                </p>
                <div className="w-full h-2 rounded-full bg-white/70 overflow-hidden">
                  <div
                    className="h-full bg-[#315B3C] rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {state.cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#F5F0DF] flex items-center justify-center text-[#5D6855]">
                <ShoppingBag className="w-8 h-8 opacity-40" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-[#282E23]">
                {t('cart.empty_title')}
              </h3>
              <p className="text-xs text-[#5D6855] max-w-xs">
                {t('cart.empty_desc')}
              </p>
              <Link
                href={`/${locale}/shop`}
                onClick={closeCartDrawer}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315B3C] text-white text-sm font-semibold hover:bg-[#264930] transition-colors"
              >
                <span>{t('cart.start_shopping')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            state.cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                  <Image
                    src={item.product.image}
                    alt={item.product.name[locale]}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#282E23] truncate">
                    {item.product.name[locale]}
                  </h4>
                  {item.selectedVariantName && (
                    <p className="text-xs text-[#5D6855]">
                      {item.selectedVariantName[locale]}
                    </p>
                  )}
                  <p className="text-xs font-bold text-[#315B3C] mt-0.5">
                    {formatCurrencyMAD(item.lineTotal, locale)}
                  </p>

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

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-black/40 hover:text-[#DC2626] transition-colors"
                      aria-label={t('cart.remove_item')}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary & Checkout Footer */}
        {state.cart.length > 0 && (
          <div className="p-4 border-t border-[#E8E1CF] bg-[#F5F0DF]/60 space-y-3 shrink-0">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={t('cart.promo_placeholder')}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E8E1CF] bg-white text-[#282E23] uppercase placeholder:normal-case focus:outline-none focus:border-[#315B3C]"
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-[#315B3C] text-white hover:bg-[#264930] transition-colors"
              >
                {t('cart.apply_promo')}
              </button>
            </form>

            {/* Active Promo Pill */}
            {state.activePromoCode && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#E8F5E9] text-[#2E7D32] text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Code {state.activePromoCode} activé</span>
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-xs hover:underline text-[#DC2626]"
                >
                  {t('cart.remove_promo')}
                </button>
              </div>
            )}

            {/* Calculation Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5D6855]">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-medium text-[#282E23]">
                  {formatCurrencyMAD(cartTotals.subtotal, locale)}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-[#2E7D32] font-medium">
                  <span>{t('cart.discount')}</span>
                  <span>-{formatCurrencyMAD(cartTotals.discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('cart.delivery_fee')}</span>
                <span className="font-medium text-[#282E23]">
                  {cartTotals.isFreeDelivery
                    ? 'Offerte'
                    : formatCurrencyMAD(cartTotals.deliveryFee, locale)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#282E23] pt-1.5 border-t border-[#E8E1CF]">
                <span>{t('cart.total')}</span>
                <span className="text-[#315B3C]">
                  {formatCurrencyMAD(cartTotals.total, locale)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <Link
              href={`/${locale}/checkout`}
              onClick={closeCartDrawer}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#315B3C] text-white font-semibold text-sm hover:bg-[#264930] transition-colors shadow-sm cursor-pointer min-h-[48px]"
            >
              <span>{t('cart.checkout_button')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
