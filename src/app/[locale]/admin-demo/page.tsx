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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5DEC9] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#233C2E]/10 text-[#233C2E] text-xs font-bold">
            <Shield className="w-3.5 h-3.5" />
            <span>Console Opérationnelle BSES</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#252820]">
            {t('admin.title')}
          </h1>
          <p className="text-sm text-[#5C6053] max-w-2xl">
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
      <div className="p-4 rounded-2xl bg-[#EFF5E8] border border-[#D7E4C5] text-xs text-[#252820] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#233C2E] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="text-[#233C2E] block font-semibold">
            Environnement Bac à Sable Isolé (Browser Sandbox)
          </strong>
          <p className="text-[#5C6053] leading-relaxed">
            Toutes les modifications apportées aux produits, aux stocks, aux frais de livraison et aux commandes sont immédiatement actives dans votre session de navigation et synchronisées entre vos onglets ouverts. Les données peuvent être réinitialisées à tout moment.
          </p>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs overflow-x-auto">
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
                  ? 'bg-[#233C2E] text-white shadow-xs'
                  : 'text-[#252820] hover:bg-[#FAF8F2]'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Workspace */}
      <div className="pt-2">
        {activeTab === 'overview' && <AdminDashboard onSelectTab={setActiveTab} />}
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'inventory' && <AdminInventory />}
        {activeTab === 'delivery' && <AdminDelivery />}
        {activeTab === 'promotions' && <AdminPromotions />}
        {activeTab === 'orders' && <AdminOrders />}
      </div>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title={t('admin.actions.reset_seed')}
        description="Cette action réinitialisera l’inventaire, les commandes et les paramètres aux valeurs d'origine de la démonstration."
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-[#5C6053] leading-relaxed">
            Êtes-vous sûr de vouloir réinitialiser les données ? Vos commandes créées durant cette session de navigation seront effacées.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsResetModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#252820] hover:bg-black/5"
            >
              {t('common.cancel')}
            </button>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#DC2626] text-white hover:bg-[#b91c1c] transition-colors"
            >
              {t('common.confirm')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
