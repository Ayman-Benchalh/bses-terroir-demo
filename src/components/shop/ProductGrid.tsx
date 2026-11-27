'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/lib/types';
import { useLocale } from '@/context/LocaleContext';
import { PackageOpen } from 'lucide-react';

export function ProductGrid({
  products,
  onResetFilters,
}: {
  products: Product[];
  onResetFilters?: () => void;
}) {
  const { t } = useLocale();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-[#E8E1CF] space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#F5F0DF] flex items-center justify-center text-[#5D6855]">
          <PackageOpen className="w-8 h-8 opacity-40" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-[#282E23]">
          {t('common.no_results')}
        </h3>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-[#315B3C] text-white text-xs font-semibold hover:bg-[#264930] transition-colors"
          >
            {t('common.clear_filters')}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="product-grid" style={{
      // Container-aware grid: cards min 240px, max 1fr
      // Uses minmax with container width awareness
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
      gap: '1.5rem' // 24px = gap-6
    }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
