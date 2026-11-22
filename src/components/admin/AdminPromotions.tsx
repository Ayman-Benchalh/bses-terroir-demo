'use client';

import React, { useState } from 'react';
import { Tag, Plus, Check, Trash2, Sparkles } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Promotion } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

export function AdminPromotions() {
  const { locale } = useLocale();
  const { state, updatePromotion, showToast } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formCode, setFormCode] = useState('');
  const [formType, setFormType] = useState<'percentage' | 'fixed_mad' | 'free_shipping'>('percentage');
  const [formValue, setFormValue] = useState(15);
  const [formMinOrder, setFormMinOrder] = useState(150);
  const [formDesc, setFormDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCode.trim()) {
      showToast('Le code promo est obligatoire.', 'error');
      return;
    }

    const newPromo: Promotion = {
      id: `promo-${Date.now()}`,
      code: formCode.trim().toUpperCase(),
      discountType: formType,
      discountValue: Number(formValue),
      minOrder: Number(formMinOrder),
      description: {
        fr: formDesc || `Offre spéciale ${formCode}`,
        en: formDesc || `Special discount ${formCode}`,
        ar: formDesc || `عرض خاص ${formCode}`,
      },
      isActive: true,
      expiresAt: '2026-12-31',
    };

    updatePromotion(newPromo.id, newPromo);
    setIsAddModalOpen(false);
    showToast(`Code promo "${newPromo.code}" activé !`, 'success');
  };

  return (
    <div className="space-y-6 text-start">
      <div className="p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-heading font-bold text-base text-[#282E23]">
            Codes Promotionnels & Réductions
          </h3>
          <p className="text-xs text-[#5D6855]">
            Gérez les remises en pourcentage, en dirhams fixes ou la gratuité de la livraison.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Code</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {state.promotions.map((promo) => (
          <div
            key={promo.id}
            className="p-5 rounded-3xl border border-[#E8E1CF] bg-white shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono font-bold text-sm text-[#315B3C] px-2.5 py-1 rounded-lg bg-[#315B3C]/10">
                {promo.code}
              </span>
              <Badge variant={promo.isActive ? 'success' : 'error'} size="sm">
                {promo.isActive ? 'Actif' : 'Inactif'}
              </Badge>
            </div>

            <p className="text-xs text-[#282E23] font-medium min-h-[36px]">
              {promo.description[locale]}
            </p>

            <div className="text-xs text-[#5D6855] space-y-1 pt-2 border-t border-[#E8E1CF]">
              <div className="flex justify-between">
                <span>Type :</span>
                <span className="font-semibold text-[#282E23]">
                  {promo.discountType === 'percentage'
                    ? `${promo.discountValue}%`
                    : promo.discountType === 'fixed_mad'
                    ? `${promo.discountValue} MAD`
                    : 'Livraison offerte'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Min. commande :</span>
                <span>{promo.minOrder} MAD</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => updatePromotion(promo.id, { isActive: !promo.isActive })}
                className={`w-full py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  promo.isActive
                    ? 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#fde68a]'
                    : 'bg-[#E8F5E9] text-[#2E7D32] hover:bg-[#c8e6c9]'
                }`}
              >
                {promo.isActive ? 'Désactiver' : 'Activer'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Promo Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Créer une nouvelle promotion"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Code Promo (Majuscules)"
            required
            placeholder="EX: BIENVENUE20"
            value={formCode}
            onChange={(e) => setFormCode(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-[#282E23] mb-1">
              Type de réduction
            </label>
            <select
              value={formType}
              onChange={(e) => setFormType(e.target.value as any)}
              className="w-full h-10 px-3 rounded-xl border border-[#E8E1CF] text-xs bg-white text-[#282E23]"
            >
              <option value="percentage">Pourcentage (%)</option>
              <option value="fixed_mad">Montant fixe (MAD)</option>
              <option value="free_shipping">Livraison Gratuite</option>
            </select>
          </div>

          {formType !== 'free_shipping' && (
            <Input
              label={formType === 'percentage' ? 'Valeur du pourcentage (%)' : 'Montant de la remise (MAD)'}
              type="number"
              min={1}
              value={formValue}
              onChange={(e) => setFormValue(Number(e.target.value))}
            />
          )}

          <Input
            label="Montant minimum d'achat (MAD)"
            type="number"
            min={0}
            value={formMinOrder}
            onChange={(e) => setFormMinOrder(Number(e.target.value))}
          />

          <Input
            label="Description publique"
            placeholder="Ex: 15% de réduction dès 250 MAD"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E8E1CF]">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl hover:bg-black/5"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#315B3C] text-white text-xs font-semibold rounded-xl hover:bg-[#264930]"
            >
              Créer la promotion
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
