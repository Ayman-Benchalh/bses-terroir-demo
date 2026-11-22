'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/lib/types';
import { formatCurrencyMAD, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export default function OrderTrackingPage() {
  const { locale, t } = useLocale();
  const { state } = useStore();

  const [searchRef, setSearchRef] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    state.orders.length > 0 ? state.orders[0].id : ''
  );

  const selectedOrder =
    state.orders.find((o) => o.id === selectedOrderId) ||
    state.orders.find(
      (o) => o.orderNumber.toLowerCase() === searchRef.trim().toLowerCase()
    ) ||
    state.orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = state.orders.find(
      (o) => o.orderNumber.toLowerCase() === searchRef.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrderId(found.id);
    }
  };

  const steps: { key: OrderStatus; label: string; desc: string }[] = [
    {
      key: 'received',
      label: t('tracking.step_received'),
      desc: 'La commande a été enregistrée avec succès dans le système.',
    },
    {
      key: 'confirmed',
      label: t('tracking.step_confirmed'),
      desc: 'Les coopératives partenaires ont validé la disponibilité des lots.',
    },
    {
      key: 'preparing',
      label: t('tracking.step_preparing'),
      desc: 'Les produits frais et emballages sous vide sont en cours de conditionnement.',
    },
    {
      key: 'ready_for_delivery',
      label: t('tracking.step_ready_for_delivery'),
      desc: 'Le colis est scellé et prêt pour la prise en charge logistique.',
    },
    {
      key: 'out_for_delivery',
      label: t('tracking.step_out_for_delivery'),
      desc: 'Notre livreur est en tournée dans votre ville.',
    },
    {
      key: 'delivered',
      label: t('tracking.step_delivered'),
      desc: 'Commande livrée et remise en mains propres.',
    },
  ];

  const stepOrder: OrderStatus[] = [
    'received',
    'confirmed',
    'preparing',
    'ready_for_delivery',
    'out_for_delivery',
    'delivered',
  ];

  const currentStepIndex = selectedOrder
    ? stepOrder.indexOf(selectedOrder.status)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      {/* Title */}
      <div className="border-b border-[#E8E1CF] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315B3C]/10 text-[#315B3C] text-xs font-semibold">
          <Truck className="w-3.5 h-3.5" />
          <span>Suivi Logistique Terroir</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
          {t('tracking.title')}
        </h1>
        <p className="text-sm text-[#5D6855] max-w-2xl">
          {t('tracking.subtitle')}
        </p>
      </div>

      {/* Real-time sync alert */}
      <div className="p-4 rounded-2xl bg-[#EEF4E3] border border-[#DDE7C8] text-xs text-[#282E23] flex items-center gap-2.5">
        <Sparkles className="w-4 h-4 text-[#315B3C] shrink-0" />
        <p>{t('tracking.admin_sync_notice')}</p>
      </div>

      {/* Search Order Reference & Quick Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs">
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto flex-1 max-w-md">
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Rechercher par référence (ex: CMD-2026-1001)"
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E8E1CF] text-xs font-mono uppercase focus:outline-none focus:border-[#315B3C]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors"
          >
            Rechercher
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-[#5D6855] whitespace-nowrap">Mes commandes :</span>
          {state.orders.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelectedOrderId(o.id)}
              className={cn(
                'px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap',
                selectedOrder?.id === o.id
                  ? 'bg-[#315B3C] text-white'
                  : 'bg-[#F5F0DF] text-[#282E23] hover:bg-[#E8DECA]'
              )}
            >
              {o.orderNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Order Detailed Tracking View */}
      {selectedOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline View */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1CF] pb-6">
              <div>
                <span className="font-mono text-xs font-bold text-[#315B3C]">
                  {selectedOrder.orderNumber}
                </span>
                <h3 className="font-heading font-bold text-xl text-[#282E23] mt-0.5">
                  Statut : {selectedOrder.status.replace(/_/g, ' ')}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5D6855]">
                  Créneau : <strong className="text-[#282E23]">{selectedOrder.deliverySlot}</strong>
                </span>
              </div>
            </div>

            {/* Step-by-Step Vertical Milestone Timeline */}
            <div className="relative ps-6 sm:ps-8 space-y-8 border-s-2 border-[#E8E1CF]">
              {steps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative group">
                    {/* Circle Milestone Indicator */}
                    <div
                      className={cn(
                        'absolute -start-[31px] sm:-start-[39px] top-0.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-xs',
                        isCurrent
                          ? 'bg-[#E7A84C] text-[#282E23] ring-4 ring-[#E7A84C]/20 animate-pulse'
                          : isPassed
                          ? 'bg-[#315B3C] text-white'
                          : 'bg-[#F5F0DF] text-[#8C9982] border border-[#E8E1CF]'
                      )}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>

                    {/* Step Content */}
                    <div className="space-y-1">
                      <h4
                        className={cn(
                          'text-sm sm:text-base font-semibold',
                          isCurrent
                            ? 'text-[#315B3C] font-bold'
                            : isPassed
                            ? 'text-[#282E23]'
                            : 'text-[#8C9982]'
                        )}
                      >
                        {step.label}
                      </h4>
                      <p className="text-xs text-[#5D6855] leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Order Details & Customer Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs space-y-4">
              <h4 className="font-heading font-bold text-base text-[#282E23]">
                Détails de la livraison
              </h4>

              <div className="space-y-2 text-xs text-[#5D6855]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#315B3C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#282E23] block">{selectedOrder.customer.fullName}</strong>
                    <span>{selectedOrder.customer.address}</span>
                    <span className="block">{selectedOrder.customer.city}</span>
                    {selectedOrder.customer.landmark && (
                      <span className="block text-[11px] italic">Repère : {selectedOrder.customer.landmark}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#E8E1CF]">
                  <Calendar className="w-4 h-4 text-[#315B3C] shrink-0" />
                  <span>Passée le : {new Date(selectedOrder.createdAt).toLocaleString()}</span>
                </div>
              </div>

              {/* Items summary */}
              <div className="pt-3 border-t border-[#E8E1CF] space-y-2">
                <span className="text-xs font-bold text-[#282E23] block">
                  Contenu du colis ({selectedOrder.items.length} articles) :
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-[#5D6855]">
                      <span className="truncate max-w-[180px]">{it.product.name.fr}</span>
                      <span className="font-semibold text-[#282E23]">
                        {it.quantity} {it.product.pricingUnit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E8E1CF] flex justify-between text-sm font-bold text-[#282E23]">
                  <span>Total commande :</span>
                  <span className="text-[#315B3C]">{formatCurrencyMAD(selectedOrder.total, locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-3xl border border-[#E8E1CF] space-y-3">
          <p className="text-sm text-[#5D6855]">{t('tracking.no_orders')}</p>
          <Link
            href={`/${locale}/shop`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold"
          >
            <span>Passer une commande test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
