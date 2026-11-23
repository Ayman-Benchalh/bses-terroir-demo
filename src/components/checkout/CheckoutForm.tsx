'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertCircle,
  ShoppingBag,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Input } from '@/components/ui/Input';
import { OrderCustomer, Order } from '@/lib/types';
import { formatCurrencyMAD } from '@/lib/utils';
import confetti from 'canvas-confetti';

// Zod validation schema for Moroccan delivery orders
const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Le nom complet doit comporter au moins 3 caractères.'),
  phone: z
    .string()
    .regex(
      /^(?:(?:\+|00)212|0)[67]\d{8}$/,
      'Numéro de téléphone marocain invalide (ex: 0612345678 ou +212612345678).'
    ),
  city: z.string().min(1, 'Veuillez sélectionner une ville de livraison.'),
  address: z.string().min(6, 'Veuillez indiquer une adresse précise (min 6 caractères).'),
  landmark: z.string().optional(),
  notes: z.string().optional(),
  deliverySlot: z.string().min(1, 'Veuillez choisir un créneau de livraison.'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const {
    state,
    cartTotals,
    currentDeliveryZone,
    setSelectedCity,
    placeOrder,
    showToast,
  } = useStore();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    city: state.selectedCity || 'casablanca',
    address: '',
    landmark: '',
    notes: '',
    deliverySlot: currentDeliveryZone?.availableSlots[0] || 'Matin (09h00 - 13h00)',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Sync city selection
  const handleCityChange = (cityKey: string) => {
    setSelectedCity(cityKey);
    const targetZone = state.deliveryZones.find((z) => z.cityKey === cityKey);
    setFormData((prev) => ({
      ...prev,
      city: cityKey,
      deliverySlot: targetZone?.availableSlots[0] || 'Matin (09h00 - 13h00)',
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate with Zod
    const validation = checkoutSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof CheckoutFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      showToast('Veuillez corriger les erreurs dans le formulaire.', 'warning');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const customer: OrderCustomer = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      address: formData.address.trim(),
      landmark: formData.landmark?.trim(),
      notes: formData.notes?.trim(),
    };

    try {
      const result = placeOrder(customer, formData.deliverySlot);
      if (result.success && result.order) {
        setCompletedOrder(result.order);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // Fallback
        }
      } else {
        showToast(result.error || 'Une erreur est survenue lors de la création de la commande.', 'error');
      }
    } catch {
      showToast('Une erreur est survenue lors de la création de la commande.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Order Placed Confirmation Screen
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-[#E5DEC9] shadow-sm text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFF5E8] text-[#2E7D32] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#D58B51] uppercase tracking-wider block">
            Simulation Démo E-Commerce BSES
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#252820]">
            {t('order_confirmation.title')}
          </h2>
          <p className="text-sm text-[#5C6053]">
            {t('order_confirmation.tracking_notice')}
          </p>
        </div>

        {/* Order Details Card */}
        <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E5DEC9] text-start space-y-3 text-xs">
          <div className="flex justify-between border-b border-[#E5DEC9] pb-2">
            <span className="text-[#5C6053]">{t('order_confirmation.order_number')}</span>
            <span className="font-mono font-bold text-[#233C2E]">{completedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between border-b border-[#E5DEC9] pb-2">
            <span className="text-[#5C6053]">Client</span>
            <span className="font-semibold text-[#252820]">{completedOrder.customer.fullName} ({completedOrder.customer.phone})</span>
          </div>
          <div className="flex justify-between border-b border-[#E5DEC9] pb-2">
            <span className="text-[#5C6053]">Ville & Adresse</span>
            <span className="font-semibold text-[#252820]">{completedOrder.customer.city.toUpperCase()} — {completedOrder.customer.address}</span>
          </div>
          <div className="flex justify-between border-b border-[#E5DEC9] pb-2">
            <span className="text-[#5C6053]">{t('checkout.slot')}</span>
            <span className="font-semibold text-[#233C2E]">{completedOrder.deliverySlot}</span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-bold text-[#252820]">
            <span>Montant Total</span>
            <span className="text-[#233C2E]">{formatCurrencyMAD(completedOrder.total, locale)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#EFF5E8] border border-[#D7E4C5] text-xs text-[#233C2E] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#233C2E]" />
          <span>Fiche démonstration interactive • Aucune transaction financière réelle débitée.</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/${locale}/order-tracking?orderId=${completedOrder.id}`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#233C2E] text-white font-semibold text-xs hover:bg-[#1C3025] transition-colors"
          >
            {t('order_confirmation.track_button')}
          </Link>
          <Link
            href={`/${locale}/shop`}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E5DEC9] bg-white text-[#252820] font-semibold text-xs hover:bg-[#FAF8F2] transition-colors"
          >
            {t('order_confirmation.continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  // 2. Empty Cart Guard
  if (state.cart.length === 0) {
    return (
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-[#E5DEC9] text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] text-[#233C2E] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="font-heading font-bold text-lg text-[#252820]">
          {t('cart.empty_title')}
        </h3>
        <p className="text-xs text-[#5C6053]">
          {t('cart.empty_message')}
        </p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#233C2E] text-white font-semibold text-xs hover:bg-[#1C3025] transition-colors"
        >
          <span>{t('cart.continue_shopping')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // 3. Main Checkout Form Layout
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
      {/* Form Left Column */}
      <div className="lg:col-span-7 space-y-6">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5DEC9] shadow-xs space-y-6">
          {/* Header */}
          <div className="border-b border-[#E5DEC9] pb-4">
            <h2 className="font-heading font-bold text-xl text-[#252820]">
              {t('checkout.title')}
            </h2>
            <p className="text-xs text-[#5C6053] mt-1">
              {t('checkout.subtitle')}
            </p>
          </div>

          {/* 1. Customer & Delivery Address */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#252820] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#233C2E] text-white text-xs flex items-center justify-center">1</span>
              <span>{t('checkout.address_section')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nom & Prénom"
                placeholder="Ex: Yassine El Mansouri"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
              />

              <Input
                label="Numéro de Téléphone Marocain"
                placeholder="0612345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
              />
            </div>

            {/* City Selection */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[#252820]">
                {t('checkout.select_city')}
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E5DEC9] bg-white text-[#252820] text-sm focus:outline-none focus:border-[#233C2E] cursor-pointer"
              >
                {state.deliveryZones.map((z) => (
                  <option key={z.cityKey} value={z.cityKey}>
                    {z.cityName[locale]} ({z.deliveryFee} MAD • Gratuit dès {z.freeDeliveryThreshold} MAD)
                  </option>
                ))}
              </select>
              {errors.city && <p className="text-xs text-[#DC2626]">{errors.city}</p>}
            </div>

            <Input
              label="Adresse de Livraison Exacte"
              placeholder="Rue, Numéro, Immeuble, Étage, Appartement..."
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={errors.address}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Repère ou point d'intérêt (Optionnel)"
                placeholder="Ex: En face de la mosquée, près de l'école..."
                value={formData.landmark}
                onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
              />
              <Input
                label="Instructions pour le livreur (Optionnel)"
                placeholder="Ex: Sonner à l'interphone Bennani..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          {/* 2. Delivery Time Slots */}
          <div className="space-y-3 pt-4 border-t border-[#E5DEC9]">
            <h3 className="font-heading font-bold text-base text-[#252820] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#233C2E] text-white text-xs flex items-center justify-center">2</span>
              <span>{t('checkout.slot')}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {(currentDeliveryZone?.availableSlots || [
                'Matin (09h00 - 13h00)',
                'Après-midi (14h00 - 18h00)',
                'Soir (18h00 - 21h00)',
              ]).map((slot) => {
                const isSelected = formData.deliverySlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliverySlot: slot })}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all text-start cursor-pointer ${
                      isSelected
                        ? 'border-[#233C2E] bg-[#233C2E]/5 font-bold text-[#233C2E] ring-1 ring-[#233C2E]'
                        : 'border-[#E5DEC9] hover:bg-[#FAF8F2] text-[#252820]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{slot}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Payment Method Simulation */}
          <div className="space-y-3 pt-4 border-t border-[#E5DEC9]">
            <h3 className="font-heading font-bold text-base text-[#252820] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#233C2E] text-white text-xs flex items-center justify-center">3</span>
              <span>{t('checkout.payment_method')}</span>
            </h3>

            <div className="p-4 rounded-2xl border border-[#233C2E] bg-[#233C2E]/5 flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                id="cod"
                checked
                readOnly
                className="mt-1 accent-[#233C2E]"
              />
              <div>
                <label htmlFor="cod" className="block text-sm font-bold text-[#252820]">
                  {t('checkout.payment_cod')}
                </label>
                <p className="text-xs text-[#5C6053] mt-0.5">
                  {t('checkout.payment_cod_desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Delivery minimum or error */}
          {cartTotals.deliveryError && (
            <div className="p-3.5 rounded-xl bg-[#FEE2E2] border border-[#DC2626]/30 text-xs text-[#991B1B] font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{cartTotals.deliveryError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !cartTotals.isEligibleForDelivery}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#233C2E] text-white font-bold text-base hover:bg-[#1C3025] disabled:bg-black/10 disabled:text-black/30 transition-colors shadow-xs cursor-pointer min-h-[52px]"
          >
            <span>{t('checkout.confirm_button')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 p-6 rounded-3xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
          <h4 className="font-heading font-bold text-lg text-[#252820]">
            {t('checkout.order_summary')} ({state.cart.length})
          </h4>

          {/* Cart Items List */}
          <div className="max-h-72 overflow-y-auto space-y-3 pe-1">
            {state.cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#252820] truncate">
                    {item.product.name[locale]}
                  </p>
                  <p className="text-[#5C6053]">
                    {item.quantity} {item.product.pricingUnit} × {formatCurrencyMAD(item.unitPrice, locale)}
                  </p>
                </div>
                <span className="font-bold text-[#233C2E] shrink-0">
                  {formatCurrencyMAD(item.lineTotal, locale)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-[#E5DEC9] space-y-2 text-xs text-[#5C6053]">
            <div className="flex justify-between">
              <span>{t('cart.subtotal')}</span>
              <span className="font-semibold text-[#252820]">
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
              <span className="font-semibold text-[#252820]">
                {cartTotals.isFreeDelivery ? 'Offerte' : formatCurrencyMAD(cartTotals.deliveryFee, locale)}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#252820] pt-3 border-t border-[#E5DEC9]">
              <span>{t('cart.total')}</span>
              <span className="text-[#233C2E]">
                {formatCurrencyMAD(cartTotals.total, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
