'use client';

import React from 'react';
import { ListTodo, Sparkles } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { ShoppingListManager } from '@/components/shopping-list/ShoppingListManager';

export default function ShoppingListPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      <div className="border-b border-[#E8E1CF] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#315B3C]/10 text-[#315B3C] text-xs font-semibold">
          <ListTodo className="w-3.5 h-3.5" />
          <span>Courses Récurrentes</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
          {t('shopping_list.title')}
        </h1>
        <p className="text-sm text-[#5D6855] max-w-2xl">
          {t('shopping_list.subtitle')}
        </p>
      </div>

      <ShoppingListManager />
    </div>
  );
}
