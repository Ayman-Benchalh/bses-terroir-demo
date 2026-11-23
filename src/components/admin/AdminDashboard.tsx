'use client';

import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  MapPin,
  Clock,
} from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { formatCurrencyMAD } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export function AdminDashboard({ onSelectTab }: { onSelectTab: (tab: string) => void }) {
  const { locale, t } = useLocale();
  const { state } = useStore();

  // Compute consistent KPIs from real orders and inventory
  const totalRevenue = state.orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = state.orders.length;
  const avgBasket = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const totalItemsSold = state.orders.reduce(
    (sum, o) => sum + o.items.reduce((iSum, it) => iSum + it.quantity, 0),
    0
  );

  const lowStockProducts = state.products.filter(
    (p) => p.inStock && p.stockQuantity <= 5
  );
  const outOfStockProducts = state.products.filter(
    (p) => !p.inStock || p.stockQuantity <= 0
  );

  const recentOrders = state.orders.slice(0, 5);

  return (
    <div className="space-y-8 text-start">
      {/* 6 Key Performance Indicators (Consistent arithmetic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
          <div className="flex items-center justify-between text-[#5C6053] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.revenue')}</span>
            <TrendingUp className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="text-xl font-bold text-[#252820]">
            {formatCurrencyMAD(totalRevenue, locale)}
          </div>
          <p className="text-[11px] text-[#2E7D32] mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>Calcul réel démo</span>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
          <div className="flex items-center justify-between text-[#5C6053] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.orders')}</span>
            <ShoppingBag className="w-4 h-4 text-[#233C2E]" />
          </div>
          <div className="text-xl font-bold text-[#252820]">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-[#5C6053] mt-1">
            Session en cours
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
          <div className="flex items-center justify-between text-[#5C6053] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.avg_basket')}</span>
            <TrendingUp className="w-4 h-4 text-[#D58B51]" />
          </div>
          <div className="text-xl font-bold text-[#252820]">
            {formatCurrencyMAD(avgBasket, locale)}
          </div>
          <p className="text-[11px] text-[#5C6053] mt-1">
            Moyenne déterministe
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs">
          <div className="flex items-center justify-between text-[#5C6053] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.items_sold')}</span>
            <Package className="w-4 h-4 text-[#233C2E]" />
          </div>
          <div className="text-xl font-bold text-[#252820]">
            {Math.round(totalItemsSold)}
          </div>
          <p className="text-[11px] text-[#5C6053] mt-1">
            Unités / kg écoulés
          </p>
        </div>

        <div
          onClick={() => onSelectTab('inventory')}
          className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs cursor-pointer hover:border-[#D97706] transition-colors"
        >
          <div className="flex items-center justify-between text-[#D97706] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.low_stock')}</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xl font-bold text-[#D97706]">
            {lowStockProducts.length}
          </div>
          <p className="text-[11px] text-[#5C6053] mt-1 underline">
            Voir les produits
          </p>
        </div>

        <div
          onClick={() => onSelectTab('inventory')}
          className="p-4 rounded-2xl bg-white border border-[#E5DEC9] shadow-xs cursor-pointer hover:border-[#DC2626] transition-colors"
        >
          <div className="flex items-center justify-between text-[#DC2626] text-xs font-semibold mb-2">
            <span>{t('admin.kpi.out_of_stock')}</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-xl font-bold text-[#DC2626]">
            {outOfStockProducts.length}
          </div>
          <p className="text-[11px] text-[#5C6053] mt-1 underline">
            Réapprovisionner
          </p>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Operational Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Ledger */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-[#252820]">
              Commandes récentes en direct
            </h4>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs font-semibold text-[#233C2E] hover:underline cursor-pointer"
            >
              Gérer toutes les commandes ({state.orders.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-[#E5DEC9] text-[#5C6053]">
                  <th className="py-2.5 px-3 text-start">Réf.</th>
                  <th className="py-2.5 px-3 text-start">Client</th>
                  <th className="py-2.5 px-3 text-start">Ville</th>
                  <th className="py-2.5 px-3 text-start">Montant</th>
                  <th className="py-2.5 px-3 text-start">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DEC9]">
                {recentOrders.map((order) => {
                  const statusColors: Record<string, 'default' | 'success' | 'warning' | 'error' | 'honey'> = {
                    received: 'honey',
                    confirmed: 'default',
                    preparing: 'warning',
                    ready_for_delivery: 'default',
                    out_for_delivery: 'default',
                    delivered: 'success',
                  };

                  return (
                    <tr key={order.id} className="hover:bg-[#FAF8F2] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#233C2E]">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#252820]">
                        {order.customer.fullName}
                      </td>
                      <td className="py-3 px-3 text-[#5C6053]">
                        {order.customer.city}
                      </td>
                      <td className="py-3 px-3 font-bold text-[#252820]">
                        {formatCurrencyMAD(order.total, locale)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge variant={statusColors[order.status] || 'default'} size="sm">
                          {order.status.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Zones Activity Summary */}
        <div className="p-5 rounded-3xl bg-white border border-[#E5DEC9] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-base text-[#252820]">
              Zones & Villes actives
            </h4>
            <button
              onClick={() => onSelectTab('delivery')}
              className="text-xs font-semibold text-[#233C2E] hover:underline cursor-pointer"
            >
              Modifier →
            </button>
          </div>

          <div className="space-y-2.5">
            {state.deliveryZones.slice(0, 5).map((zone) => (
              <div
                key={zone.id}
                className="p-3 rounded-xl bg-[#FAF8F2] border border-[#E5DEC9] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#233C2E]" />
                  <span className="font-semibold text-[#252820]">{zone.cityName[locale]}</span>
                </div>
                <div className="text-end">
                  <span className="font-bold text-[#233C2E]">
                    {formatCurrencyMAD(zone.deliveryFee, locale)}
                  </span>
                  <span className="text-[10px] text-[#5C6053] block">
                    Gratuit dès {zone.freeDeliveryThreshold} MAD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
