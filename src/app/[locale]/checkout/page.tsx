'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';

export default function CheckoutPage() {
  const { t } = useLocale();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-start">
      <div className="border-b border-[#E8E1CF] pb-4">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#282E23]">
          {t('checkout.title')}
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
