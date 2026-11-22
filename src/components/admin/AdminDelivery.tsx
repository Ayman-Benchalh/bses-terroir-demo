'use client';

import React, { useState } from 'react';
import { MapPin, Check, X, Edit2, ShieldAlert } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { DeliveryZone } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatCurrencyMAD } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

export function AdminDelivery() {
  const { locale } = useLocale();
  const { state, updateDeliveryZone, showToast } = useStore();
  const [editingZone, setEditingZone] = useState<DeliveryZone | null>(null);

  const [formFee, setFormFee] = useState(25);
  const [formMinOrder, setFormMinOrder] = useState(100);
  const [formFreeThreshold, setFormFreeThreshold] = useState(250);
  const [formIsActive, setFormIsActive] = useState(true);

  const handleOpenEdit = (zone: DeliveryZone) => {
    setEditingZone(zone);
    setFormFee(zone.deliveryFee);
    setFormMinOrder(zone.minOrder);
    setFormFreeThreshold(zone.freeDeliveryThreshold);
    setFormIsActive(zone.isActive);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingZone) return;

    updateDeliveryZone(editingZone.id, {
      deliveryFee: Number(formFee),
      minOrder: Number(formMinOrder),
      freeDeliveryThreshold: Number(formFreeThreshold),
      isActive: formIsActive,
    });

    setEditingZone(null);
  };

  return (
    <div className="space-y-6 text-start">
      <div className="p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-base text-[#282E23]">
            Matrice des Zones de Livraison Maroc
          </h3>
          <p className="text-xs text-[#5D6855]">
            Configurez les frais, les seuils de gratuité et les statuts d’activité par ville.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {state.deliveryZones.map((zone) => (
          <div
            key={zone.id}
            className={`p-5 rounded-3xl border bg-white shadow-xs transition-all ${
              zone.isActive ? 'border-[#E8E1CF]' : 'border-[#DC2626]/40 bg-[#FFF5F5]'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#315B3C]/10 text-[#315B3C] flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#282E23]">
                    {zone.cityName[locale]}
                  </h4>
                  <span className="text-[10px] text-[#5D6855]">
                    Délai : {zone.estimatedDeliveryHours}
                  </span>
                </div>
              </div>

              <Badge variant={zone.isActive ? 'success' : 'error'} size="sm">
                {zone.isActive ? 'Actif' : 'Inactif'}
              </Badge>
            </div>

            <div className="space-y-1.5 text-xs text-[#5D6855] py-2 border-y border-[#E8E1CF]/60">
              <div className="flex justify-between">
                <span>Frais standards :</span>
                <strong className="text-[#282E23]">{formatCurrencyMAD(zone.deliveryFee, locale)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Commande min :</span>
                <strong className="text-[#282E23]">{formatCurrencyMAD(zone.minOrder, locale)}</strong>
              </div>
              <div className="flex justify-between text-[#2E7D32]">
                <span>Gratuit dès :</span>
                <strong>{formatCurrencyMAD(zone.freeDeliveryThreshold, locale)}</strong>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[10px] text-[#5D6855]">
                {zone.availableSlots.length} créneaux
              </span>
              <button
                onClick={() => handleOpenEdit(zone)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Modifier</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Zone Modal */}
      <Modal
        isOpen={Boolean(editingZone)}
        onClose={() => setEditingZone(null)}
        title={`Paramètres : ${editingZone?.cityName.fr}`}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Frais de livraison (MAD)"
            type="number"
            min={0}
            value={formFee}
            onChange={(e) => setFormFee(Number(e.target.value))}
          />

          <Input
            label="Commande minimale (MAD)"
            type="number"
            min={0}
            value={formMinOrder}
            onChange={(e) => setFormMinOrder(Number(e.target.value))}
          />

          <Input
            label="Seuil de livraison offerte (MAD)"
            type="number"
            min={0}
            value={formFreeThreshold}
            onChange={(e) => setFormFreeThreshold(Number(e.target.value))}
          />

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="zoneActive"
              checked={formIsActive}
              onChange={(e) => setFormIsActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#315B3C]"
            />
            <label htmlFor="zoneActive" className="text-xs font-semibold text-[#282E23]">
              Zone de livraison active et ouverte aux commandes
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1CF]">
            <button
              type="button"
              onClick={() => setEditingZone(null)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930]"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
