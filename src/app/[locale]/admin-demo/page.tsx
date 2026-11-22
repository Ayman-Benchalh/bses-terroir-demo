'use client';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Boxes,
  Truck,
  Tag,
  ShoppingBag,
  RotateCcw,
  Sparkles,
  Shield,
  Info,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AdminProducts } from '@/components/admin/AdminProducts';
import { AdminInventory } from '@/components/admin/AdminInventory';
import { AdminDelivery } from '@/components/admin/AdminDelivery';
import { AdminPromotions } from '@/components/admin/AdminPromotions';
import { AdminOrders } from '@/components/admin/AdminOrders';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

export default function AdminDemoPage() {
  const { t } = useLocale();
  const { resetToSeedData } = useStore();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: t('admin.tabs.overview'), icon: LayoutDashboard },
    { id: 'products', label: t('admin.tabs.products'), icon: Package },
    { id: 'inventory', label: t('admin.tabs.inventory'), icon: Boxes },
    { id: 'delivery', label: t('admin.tabs.delivery'), icon: Truck },
    { id: 'promotions', label: t('admin.tabs.promotions'), icon: Tag },
    { id: 'orders', label: t('admin.tabs.orders'), icon: ShoppingBag },
  ];

  const handleConfirmReset = () => {
    resetToSeedData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8E1CF] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#315B3C]/10 text-[#315B3C] text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Console Opérationnelle BSES</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
            {t('admin.title')}
          </h1>
          <p className="text-sm text-[#5D6855] max-w-2xl">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => setIsResetModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#DC2626]/30 text-[#DC2626] bg-[#DC2626]/5 hover:bg-[#DC2626]/10 text-xs font-semibold transition-colors cursor-pointer self-start md:self-auto min-h-[44px]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('admin.actions.reset_seed')}</span>
        </button>
      </div>

      {/* Demo Sandbox Info Callout */}
      <div className="p-4 rounded-2xl bg-[#EEF4E3] border border-[#DDE7C8] text-xs text-[#282E23] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#315B3C] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-[#315B3C] block font-semibold">
            Environnement Bac à Sable Isolé (Browser Sandbox)
          </strong>
          <p className="text-[#5D6855] leading-relaxed">
            Toutes les modifications apportées aux produits, aux stocks, aux frais de livraison et aux commandes sont immédiatement actives dans votre session de navigation et synchronisées entre vos onglets ouverts. Les données peuvent être réinitialisées à tout moment.
          </p>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[42px]',
                isActive
                  ? 'bg-[#315B3C] text-white shadow-xs'
                  : 'text-[#282E23] hover:bg-[#F5F0DF]'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      <div>
        {activeTab === 'overview' && <AdminDashboard onSelectTab={setActiveTab} />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'inventory' && <AdminInventory />}
        {activeTab === 'delivery' && <AdminDelivery />}
        {activeTab === 'promotions' && <AdminPromotions />}
        {activeTab === 'orders' && <AdminOrders />}
      </div>

      {/* Confirm Reset Seed Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Confirmer la réinitialisation"
        description="Cette action rétablira le catalogue initial de 48+ produits, les stocks par défaut, les zones de livraison et les commandes de test d'origine."
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-[#DC2626] font-medium">
            ⚠️ Vos modifications locales et commandes créées durant cette session de démonstration seront réinitialisées.
          </p>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1CF]">
            <button
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-4 py-2 bg-[#DC2626] text-white text-xs font-semibold rounded-xl hover:bg-[#b91c1c]"
            >
              Réinitialiser maintenant
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
