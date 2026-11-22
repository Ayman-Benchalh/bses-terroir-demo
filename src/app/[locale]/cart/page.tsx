'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  Sparkles,
  Check,
  PackageOpen,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { formatCurrencyMAD } from '@/lib/utils';

export default function CartPage() {
  const { locale, t } = useLocale();
  const {
    state,
    cartTotals,
    updateCartQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    currentDeliveryZone,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

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

  if (state.cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#F5F0DF] text-[#5D6855] flex items-center justify-center mx-auto">
          <PackageOpen className="w-10 h-10 opacity-40" />
        </div>
        <h1 className="text-2xl font-heading font-bold text-[#282E23]">
          {t('cart.empty_title')}
        </h1>
        <p className="text-sm text-[#5D6855]">
          {t('cart.empty_desc')}
        </p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#315B3C] text-white font-semibold text-sm hover:bg-[#264930] transition-colors"
        >
          <span>{t('cart.start_shopping')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      <div className="border-b border-[#E8E1CF] pb-4">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
          {t('cart.title')} ({state.cart.length} articles)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free delivery progress banner */}
          {currentDeliveryZone && (
            <div className="p-4 rounded-2xl bg-[#EEF4E3] border border-[#DDE7C8] text-xs">
              {cartTotals.isFreeDelivery ? (
                <p className="flex items-center gap-2 font-bold text-[#2E7D32]">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t('cart.free_shipping_reached')}</span>
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-[#282E23] font-semibold">
                    {t('cart.free_shipping_notice', {
                      amount: formatCurrencyMAD(cartTotals.freeDeliveryRemaining, locale),
                    })}
                  </p>
                  <div className="w-full h-2.5 rounded-full bg-white overflow-hidden border border-[#DDE7C8]">
                    <div
                      className="h-full bg-[#315B3C] rounded-full transition-all duration-300"
                      style={{ width: `${freeDeliveryProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Table */}
          <div className="space-y-3">
            {state.cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name[locale]}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-base text-[#282E23]">
                      {item.product.name[locale]}
                    </h3>
                    {item.selectedVariantName && (
                      <p className="text-xs text-[#5D6855]">
                        {item.selectedVariantName[locale]}
                      </p>
                    )}
                    <p className="text-xs text-[#5D6855] mt-1">
                      {formatCurrencyMAD(item.unitPrice, locale)} / {item.product.pricingUnit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-[#E8E1CF]">
                  <QuantityStepper
                    value={item.quantity}
                    step={item.product.unitStep || 1}
                    min={item.product.minQuantity || (item.product.unitStep || 1)}
                    max={item.product.stockQuantity}
                    unit={item.product.pricingUnit}
                    onChange={(newQty) => updateCartQuantity(item.id, newQty)}
                  />

                  <div className="text-end min-w-[80px]">
                    <span className="font-bold text-base text-[#315B3C] block">
                      {formatCurrencyMAD(item.lineTotal, locale)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-[#DC2626] hover:underline mt-1 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{t('cart.remove_item')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-5">
            <h3 className="font-heading font-bold text-lg text-[#282E23]">
              {t('checkout.order_summary')}
            </h3>

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
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#315B3C] text-white hover:bg-[#264930] transition-colors"
              >
                {t('cart.apply_promo')}
              </button>
            </form>

            {/* Active promo badge */}
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

            {/* Price breakdown */}
            <div className="space-y-2 text-xs text-[#5D6855] pt-2 border-t border-[#E8E1CF]">
              <div className="flex justify-between">
                <span>{t('cart.subtotal')}</span>
                <span className="font-semibold text-[#282E23]">
                  {formatCurrencyMAD(cartTotals.subtotal, locale)}
                </span>
              </div>

              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-[#2E7D32] font-semibold">
                  <span>{t('cart.discount')}</span>
                  <span>-{formatCurrencyMAD(cartTotals.discount, locale)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t('cart.delivery_fee')}</span>
                <span className="font-semibold text-[#282E23]">
                  {cartTotals.isFreeDelivery
                    ? 'Offerte'
                    : formatCurrencyMAD(cartTotals.deliveryFee, locale)}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold text-[#282E23] pt-3 border-t border-[#E8E1CF]">
                <span>{t('cart.total')}</span>
                <span className="text-[#315B3C]">
                  {formatCurrencyMAD(cartTotals.total, locale)}
                </span>
              </div>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-2xl bg-[#315B3C] text-white font-bold text-sm hover:bg-[#264930] transition-colors shadow-sm cursor-pointer min-h-[48px]"
            >
              <span>{t('cart.checkout_button')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
