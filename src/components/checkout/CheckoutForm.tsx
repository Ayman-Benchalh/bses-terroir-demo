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
      city: currentDeliveryZone ? currentDeliveryZone.cityName.fr : formData.city,
      address: formData.address.trim(),
      landmark: formData.landmark?.trim(),
      notes: formData.notes?.trim(),
    };

    const orderResult = placeOrder(customer, formData.deliverySlot);
    setIsSubmitting(false);

    if (!orderResult.success || !orderResult.order) {
      showToast(orderResult.error || 'Erreur lors de la validation.', 'error');
      return;
    }

    setCompletedOrder(orderResult.order);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  };

  // If order was successfully simulated
  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-[#E8E1CF] shadow-lg text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#282E23]">
            {t('order_confirmation.title')}
          </h2>
          <p className="text-sm text-[#5D6855]">
            {t('order_confirmation.tracking_notice')}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#F5F0DF]/60 border border-[#E8E1CF] inline-block text-start text-xs space-y-1.5 w-full max-w-md">
          <div className="flex justify-between">
            <span className="text-[#5D6855]">Numéro de référence :</span>
            <strong className="text-[#315B3C] font-mono text-sm">{completedOrder.orderNumber}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D6855]">Destinataire :</span>
            <span className="font-semibold text-[#282E23]">{completedOrder.customer.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#5D6855]">Ville & Créneau :</span>
            <span className="text-[#282E23]">{completedOrder.customer.city} • {completedOrder.deliverySlot}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-[#282E23] pt-2 border-t border-[#E8E1CF]">
            <span>Total simulé :</span>
            <span className="text-[#315B3C]">{formatCurrencyMAD(completedOrder.total, locale)}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#D97706]/30 text-xs text-[#92400E]">
          {t('checkout.demo_disclaimer')}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={`/${locale}/order-tracking`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#315B3C] text-white font-semibold text-sm hover:bg-[#264930] transition-colors"
          >
            <span>{t('order_confirmation.track_button')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={`/${locale}/shop`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[#315B3C] text-[#315B3C] font-semibold text-sm hover:bg-[#315B3C]/5 transition-colors"
          >
            {t('order_confirmation.continue_shopping')}
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty
  if (state.cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto p-12 text-center rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F5F0DF] text-[#5D6855] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 opacity-40" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-[#282E23]">
          {t('cart.empty_title')}
        </h3>
        <p className="text-xs text-[#5D6855]">
          {t('cart.empty_desc')}
        </p>
        <Link
          href={`/${locale}/shop`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315B3C] text-white text-sm font-semibold hover:bg-[#264930] transition-colors"
        >
          <span>{t('cart.start_shopping')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
      {/* Form Columns */}
      <div className="lg:col-span-7 space-y-6">
        <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#D97706]/30 text-xs text-[#92400E] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">{t('checkout.demo_disclaimer')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-6">
          {/* 1. Customer Information */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#282E23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#315B3C] text-white text-xs flex items-center justify-center">1</span>
              <span>{t('checkout.personal_info')}</span>
            </h3>

            <div className="space-y-4">
              <Input
                label={t('checkout.full_name')}
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
                placeholder="Ex: Yassine El Mansouri"
              />

              <Input
                label={t('checkout.phone')}
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                helperText={t('checkout.phone_helper')}
                placeholder="0612345678"
              />

              {/* Delivery City */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[#282E23]">
                  {t('checkout.city')}
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="w-full min-h-[48px] px-4 py-2.5 rounded-xl border border-[#E8E1CF] bg-white text-sm text-[#282E23] focus:outline-none focus:border-[#315B3C]"
                >
                  {state.deliveryZones.map((zone) => (
                    <option key={zone.cityKey} value={zone.cityKey}>
                      {zone.cityName[locale]} — Frais: {zone.deliveryFee} MAD (Gratuit dès {zone.freeDeliveryThreshold} MAD)
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label={t('checkout.address')}
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                error={errors.address}
                placeholder="Rue, Numéro d'immeuble, Étage, Numéro d'appartement"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t('checkout.landmark')}
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Ex: Près de la mosquée, en face de l'école..."
                />
                <Input
                  label={t('checkout.notes')}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ex: Appeler avant d'arriver"
                />
              </div>
            </div>
          </div>

          {/* 2. Delivery Slot */}
          <div className="space-y-3 pt-4 border-t border-[#E8E1CF]">
            <h3 className="font-heading font-bold text-base text-[#282E23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#315B3C] text-white text-xs flex items-center justify-center">2</span>
              <span>{t('checkout.delivery_slot')}</span>
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
                        ? 'border-[#315B3C] bg-[#315B3C]/5 font-bold text-[#315B3C] ring-1 ring-[#315B3C]'
                        : 'border-[#E8E1CF] hover:bg-[#F5F0DF]/40 text-[#282E23]'
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
          <div className="space-y-3 pt-4 border-t border-[#E8E1CF]">
            <h3 className="font-heading font-bold text-base text-[#282E23] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#315B3C] text-white text-xs flex items-center justify-center">3</span>
              <span>{t('checkout.payment_method')}</span>
            </h3>

            <div className="p-4 rounded-2xl border border-[#315B3C] bg-[#315B3C]/5 flex items-start gap-3">
              <input
                type="radio"
                name="paymentMethod"
                id="cod"
                checked
                readOnly
                className="mt-1 accent-[#315B3C]"
              />
              <div>
                <label htmlFor="cod" className="block text-sm font-bold text-[#282E23]">
                  {t('checkout.payment_cod')}
                </label>
                <p className="text-xs text-[#5D6855] mt-0.5">
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
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#315B3C] text-white font-bold text-base hover:bg-[#264930] disabled:bg-black/10 disabled:text-black/30 transition-colors shadow-md cursor-pointer min-h-[52px]"
          >
            <span>{t('checkout.confirm_button')}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5">
        <div className="sticky top-28 p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
          <h4 className="font-heading font-bold text-lg text-[#282E23]">
            {t('checkout.order_summary')} ({state.cart.length})
          </h4>

          {/* Cart Items List */}
          <div className="max-h-72 overflow-y-auto space-y-3 pe-1">
            {state.cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#282E23] truncate">
                    {item.product.name[locale]}
                  </p>
                  <p className="text-[#5D6855]">
                    {item.quantity} {item.product.pricingUnit} × {formatCurrencyMAD(item.unitPrice, locale)}
                  </p>
                </div>
                <span className="font-bold text-[#315B3C] shrink-0">
                  {formatCurrencyMAD(item.lineTotal, locale)}
                </span>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="pt-4 border-t border-[#E8E1CF] space-y-2 text-xs text-[#5D6855]">
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
                {cartTotals.isFreeDelivery ? 'Offerte' : formatCurrencyMAD(cartTotals.deliveryFee, locale)}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold text-[#282E23] pt-3 border-t border-[#E8E1CF]">
              <span>{t('cart.total')}</span>
              <span className="text-[#315B3C]">
                {formatCurrencyMAD(cartTotals.total, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
