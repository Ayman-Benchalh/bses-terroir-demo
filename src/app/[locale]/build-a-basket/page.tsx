'use client';

import React from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { BasketBuilder } from '@/components/basket/BasketBuilder';

export default function BuildABasketPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      <div className="border-b border-[#E8E1CF] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7A84C]/20 text-[#855113] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Terroir</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
          {t('basket_builder.title')}
        </h1>
        <p className="text-sm text-[#5D6855] max-w-2xl">
          {t('basket_builder.subtitle')}
        </p>
      </div>

      <BasketBuilder />
    </div>
  );
}
