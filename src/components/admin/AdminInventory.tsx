'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, AlertTriangle, CheckCircle2, Plus, Minus } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { useStore } from '@/context/StoreContext';
import { Badge } from '@/components/ui/Badge';
import { formatCurrencyMAD } from '@/lib/utils';

export function AdminInventory() {
  const { locale } = useLocale();
  const { state, updateStock } = useStore();
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'low' | 'out'>('all');

  const filteredProducts = state.products.filter((p) => {
    const matchesSearch =
      p.name[locale].toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filterMode === 'low') return p.inStock && p.stockQuantity <= 5;
    if (filterMode === 'out') return !p.inStock || p.stockQuantity <= 0;
    return true;
  });

  return (
    <div className="space-y-6 text-start">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E8E1CF] shadow-xs">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrer l'inventaire..."
            className="w-full h-10 ps-9 pe-3 rounded-xl border border-[#E8E1CF] text-xs focus:outline-none focus:border-[#315B3C]"
          />
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D6855]" />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#315B3C] text-white'
                : 'bg-[#F5F0DF]/60 text-[#282E23] hover:bg-[#F5F0DF]'
            }`}
          >
            Tous ({state.products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterMode === 'low'
                ? 'bg-[#D97706] text-white'
                : 'bg-[#FEF3C7] text-[#92400E] hover:bg-[#fde68a]'
            }`}
          >
            Stock faible (&le; 5)
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filterMode === 'out'
                ? 'bg-[#DC2626] text-white'
                : 'bg-[#FEE2E2] text-[#991B1B] hover:bg-[#fecaca]'
            }`}
          >
            Rupture (0)
          </button>
        </div>
      </div>

      {/* Inventory Ledger Table */}
      <div className="p-4 rounded-3xl bg-white border border-[#E8E1CF] shadow-xs overflow-x-auto">
        <table className="w-full text-xs text-start">
          <thead>
            <tr className="border-b border-[#E8E1CF] text-[#5D6855]">
              <th className="py-3 px-3 text-start">Produit</th>
              <th className="py-3 px-3 text-start">SKU</th>
              <th className="py-3 px-3 text-start">Unité de base</th>
              <th className="py-3 px-3 text-start">Stock Actuel</th>
              <th className="py-3 px-3 text-start">Statut</th>
              <th className="py-3 px-3 text-center">Ajustement Rapide (+/-)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E1CF]">
            {filteredProducts.map((p) => {
              const isLow = p.inStock && p.stockQuantity <= 5;
              const isOut = !p.inStock || p.stockQuantity <= 0;

              return (
                <tr key={p.id} className="hover:bg-[#F5F0DF]/40 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F5F0DF] shrink-0 border border-[#E8E1CF]">
                        <Image
                          src={p.image}
                          alt={p.name[locale]}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-[#282E23] block line-clamp-1 max-w-xs">
                          {p.name[locale]}
                        </span>
                        <span className="text-[10px] text-[#5D6855]">
                          {formatCurrencyMAD(p.pricePerUnit, locale)} / {p.pricingUnit}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-[#5D6855]">{p.sku}</td>
                  <td className="py-3 px-3 text-[#5D6855]">{p.pricingUnit}</td>

                  <td className="py-3 px-3">
                    <span className="font-bold text-sm text-[#282E23]">
                      {p.stockQuantity}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    {isOut ? (
                      <Badge variant="error" size="sm">
                        Rupture
                      </Badge>
                    ) : isLow ? (
                      <Badge variant="warning" size="sm">
                        Faible
                      </Badge>
                    ) : (
                      <Badge variant="success" size="sm">
                        Optimal
                      </Badge>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 p-1 rounded-xl border border-[#E8E1CF] bg-white">
                      <button
                        onClick={() => updateStock(p.id, Math.max(0, p.stockQuantity - (p.unitStep || 1)))}
                        className="w-7 h-7 rounded-lg bg-[#F5F0DF] hover:bg-[#E8DECA] flex items-center justify-center text-[#282E23] transition-colors cursor-pointer"
                        title="Diminuer stock"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min={0}
                        value={p.stockQuantity}
                        onChange={(e) => updateStock(p.id, Number(e.target.value))}
                        className="w-16 h-7 text-center font-bold text-xs text-[#282E23] border-0 focus:outline-none"
                      />

                      <button
                        onClick={() => updateStock(p.id, p.stockQuantity + (p.unitStep || 1))}
                        className="w-7 h-7 rounded-lg bg-[#315B3C] text-white hover:bg-[#264930] flex items-center justify-center transition-colors cursor-pointer"
                        title="Augmenter stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
