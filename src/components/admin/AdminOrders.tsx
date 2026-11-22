'use client';

import React, { useState } from 'react';
import { ShoppingBag, Eye, CheckCircle, Clock, Truck, MapPin, Phone } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { formatCurrencyMAD } from '@/lib/utils';

export function AdminOrders() {
  const { locale, t } = useLocale();
  const { state, updateOrderStatus } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = state.orders.filter((o) => {
    if (statusFilter === 'all') return true;
    return o.status === statusFilter;
  });

  const statuses: { key: OrderStatus; label: string }[] = [
    { key: 'received', label: 'Reçue' },
    { key: 'confirmed', label: 'Confirmée' },
    { key: 'preparing', label: 'En préparation' },
    { key: 'ready_for_delivery', label: 'Prête expédition' },
    { key: 'out_for_delivery', label: 'En cours de livraison' },
    { key: 'delivered', label: 'Livrée' },
  ];

  const statusColors: Record<OrderStatus, 'default' | 'success' | 'warning' | 'error' | 'honey'> = {
    received: 'honey',
    confirmed: 'default',
    preparing: 'warning',
    ready_for_delivery: 'default',
    out_for_delivery: 'default',
    delivered: 'success',
  };

  return (
    <div className="space-y-6 text-start">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs">
        <div>
          <h3 className="font-heading font-bold text-base text-[#282E23]">
            Commandes Clients ({state.orders.length})
          </h3>
          <p className="text-xs text-[#5D6855]">
            Mettez à jour les statuts en direct pour synchroniser le suivi client.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[#315B3C] text-white'
                : 'bg-[#F5F0DF]/60 text-[#282E23] hover:bg-[#F5F0DF]'
            }`}
          >
            Toutes ({state.orders.length})
          </button>
          {statuses.map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === s.key
                  ? 'bg-[#315B3C] text-white'
                  : 'bg-[#F5F0DF]/60 text-[#282E23] hover:bg-[#F5F0DF]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-4 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-start">
          <thead>
            <tr className="border-b border-[#E8E1CF] text-[#5D6855]">
              <th className="py-3 px-3 text-start">Réf.</th>
              <th className="py-3 px-3 text-start">Date</th>
              <th className="py-3 px-3 text-start">Client</th>
              <th className="py-3 px-3 text-start">Ville & Créneau</th>
              <th className="py-3 px-3 text-start">Montant Total</th>
              <th className="py-3 px-3 text-start">Statut Actuel</th>
              <th className="py-3 px-3 text-start">Modifier Statut</th>
              <th className="py-3 px-3 text-end">Détails</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E1CF]">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-[#F5F0DF]/40 transition-colors">
                <td className="py-3 px-3 font-mono font-bold text-[#315B3C]">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-3 text-[#5D6855]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-3">
                  <span className="font-semibold text-[#282E23] block">
                    {order.customer.fullName}
                  </span>
                  <span className="text-[10px] text-[#5D6855] font-mono">
                    {order.customer.phone}
                  </span>
                </td>
                <td className="py-3 px-3 text-[#5D6855]">
                  <span className="font-medium text-[#282E23] block">
                    {order.customer.city}
                  </span>
                  <span className="text-[10px]">{order.deliverySlot}</span>
                </td>
                <td className="py-3 px-3 font-bold text-sm text-[#282E23]">
                  {formatCurrencyMAD(order.total, locale)}
                </td>
                <td className="py-3 px-3">
                  <Badge variant={statusColors[order.status]} size="sm">
                    {order.status.replace(/_/g, ' ')}
                  </Badge>
                </td>
                <td className="py-3 px-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="h-8 px-2 rounded-lg border border-[#E8E1CF] text-[11px] font-semibold bg-white text-[#282E23] focus:outline-none"
                  >
                    {statuses.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-3 text-end">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-1.5 text-[#315B3C] hover:bg-[#315B3C]/10 rounded-lg transition-colors cursor-pointer"
                    aria-label="Voir le bon de commande"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        title={`Commande : ${selectedOrder?.orderNumber}`}
        maxWidth="lg"
      >
        {selectedOrder && (
          <div className="space-y-4 text-xs">
            {/* Customer Info Box */}
            <div className="p-3.5 rounded-2xl bg-[#F5F0DF]/60 border border-[#E8E1CF] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#5D6855]">Destinataire :</span>
                <strong className="text-[#282E23]">{selectedOrder.customer.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D6855]">Téléphone marocain :</span>
                <span className="font-mono text-[#282E23]">{selectedOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D6855]">Ville :</span>
                <span className="text-[#282E23]">{selectedOrder.customer.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5D6855]">Adresse :</span>
                <span className="text-[#282E23] max-w-xs text-end">{selectedOrder.customer.address}</span>
              </div>
              {selectedOrder.customer.landmark && (
                <div className="flex justify-between">
                  <span className="text-[#5D6855]">Repère :</span>
                  <span className="text-[#282E23]">{selectedOrder.customer.landmark}</span>
                </div>
              )}
              {selectedOrder.customer.notes && (
                <div className="flex justify-between">
                  <span className="text-[#5D6855]">Notes livreur :</span>
                  <span className="text-[#282E23] italic">{selectedOrder.customer.notes}</span>
                </div>
              )}
            </div>

            {/* Ordered Items List */}
            <div className="space-y-2">
              <h5 className="font-bold text-[#282E23] uppercase tracking-wider">
                Articles commandés ({selectedOrder.items.length})
              </h5>
              <div className="divide-y divide-[#E8E1CF] border border-[#E8E1CF] rounded-2xl p-2 bg-white max-h-56 overflow-y-auto">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="py-2 px-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-[#282E23]">{item.product.name.fr}</p>
                      <p className="text-[10px] text-[#5D6855]">
                        {item.quantity} {item.product.pricingUnit} × {formatCurrencyMAD(item.unitPrice, locale)}
                      </p>
                    </div>
                    <span className="font-bold text-[#315B3C]">
                      {formatCurrencyMAD(item.lineTotal, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-1 pt-2 border-t border-[#E8E1CF] text-xs">
              <div className="flex justify-between">
                <span>Sous-total :</span>
                <span>{formatCurrencyMAD(selectedOrder.subtotal, locale)}</span>
              </div>
              {selectedOrder.discountTotal > 0 && (
                <div className="flex justify-between text-[#2E7D32]">
                  <span>Remise ({selectedOrder.appliedPromoCode}) :</span>
                  <span>-{formatCurrencyMAD(selectedOrder.discountTotal, locale)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frais de livraison :</span>
                <span>{selectedOrder.deliveryFee === 0 ? 'Offerte' : `${selectedOrder.deliveryFee} MAD`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#282E23] pt-1">
                <span>Total réglé :</span>
                <span className="text-[#315B3C]">{formatCurrencyMAD(selectedOrder.total, locale)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
