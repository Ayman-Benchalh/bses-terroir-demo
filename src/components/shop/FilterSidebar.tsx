'use client';

import React from 'react';
import { CATEGORIES_SEED } from '@/data/categories.seed';
import { useLocale } from '@/context/LocaleContext';
import { Check, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterState {
  category: string;
  maxPrice: number;
  inStockOnly: boolean;
  promoOnly: boolean;
  searchQuery: string;
  sortBy: string;
}

export interface FilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  isMobile?: boolean;
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  isMobile = false,
}: FilterSidebarProps) {
  const { locale, t } = useLocale();

  const handleCategorySelect = (slug: string) => {
    onChange({
      ...filters,
      category: filters.category === slug ? '' : slug,
    });
  };

  return (
    <div className={cn('space-y-6 text-start', isMobile ? 'p-1' : '')}>
      {/* Header and Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E1CF]">
        <h3 className="font-heading font-bold text-base text-[#282E23]">
          {t('common.filters')}
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D6855] hover:text-[#DC2626] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('common.clear_filters')}</span>
        </button>
      </div>

      {/* Category List */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#5D6855]">
          {t('sections.categories_title')}
        </label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => handleCategorySelect('')}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-start',
              filters.category === ''
                ? 'bg-[#315B3C] text-white'
                : 'text-[#282E23] hover:bg-[#F5F0DF]'
            )}
          >
            <span>{t('common.all')}</span>
          </button>

          {CATEGORIES_SEED.map((cat) => {
            const isSelected = filters.category === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategorySelect(cat.slug)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-start',
                  isSelected
                    ? 'bg-[#315B3C] text-white'
                    : 'text-[#282E23] hover:bg-[#F5F0DF]'
                )}
              >
                <span>{cat.name[locale]}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <label className="font-bold uppercase tracking-wider text-[#5D6855]">
            Prix maximum
          </label>
          <span className="font-bold text-[#315B3C]">
            {filters.maxPrice} MAD
          </span>
        </div>
        <input
          type="range"
          min={10}
          max={600}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#315B3C] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#5D6855]">
          <span>10 MAD</span>
          <span>600 MAD</span>
        </div>
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2.5 pt-2 border-t border-[#E8E1CF]">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#282E23]">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#315B3C] focus:ring-[#315B3C] border-[#E8E1CF]"
          />
          <span>{t('product.in_stock')} uniquement</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#282E23]">
          <input
            type="checkbox"
            checked={filters.promoOnly}
            onChange={(e) => onChange({ ...filters, promoOnly: e.target.checked })}
            className="w-4 h-4 rounded text-[#315B3C] focus:ring-[#315B3C] border-[#E8E1CF]"
          />
          <span>{t('nav.promotions')} uniquement</span>
        </label>
      </div>
    </div>
  );
}
